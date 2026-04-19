import { db } from '@/lib/db';
import { AppointmentStatus, BudgetRange, Prisma, QuoteStatus } from '@prisma/client';
import type {
  V2AppointmentCreateInput,
  V2AssetInput,
  V2AssetUpdateInput,
  V2AvailabilityExceptionWriteInput,
  V2PageSectionInput,
  V2PageSectionUpdateInput,
  V2ProjectInput,
  V2ProjectWriteInput,
  V2SiteSettingInput,
  V2SiteSettingUpdateInput,
} from './schemas';
import type { V2QuoteCreateInput } from './schemas';
import { recordV2AuditEvent, recordV2LeadEvent } from './audit';
import { defaultAvailabilityRules } from './defaults';
import { toInputJsonValue } from './json';

const INACTIVE_APPOINTMENT_STATUSES: AppointmentStatus[] = [
  AppointmentStatus.CANCELLED,
  AppointmentStatus.REJECTED,
];
const MAX_PRISMA_RETRIES = 3;

export function buildV2ActiveSlotKey(selectedDate: string, selectedTime: string) {
  return `${selectedDate}T${selectedTime}`;
}

function shouldReserveAppointmentSlot(status: AppointmentStatus | string) {
  return status !== AppointmentStatus.CANCELLED && status !== AppointmentStatus.REJECTED;
}

function toCalendarDate(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function isRetryablePrismaError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError
    && (error.code === 'P2002' || error.code === 'P2034');
}

async function withPrismaRetry<T>(operation: () => Promise<T>, maxAttempts = MAX_PRISMA_RETRIES): Promise<T> {
  let attempt = 0;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      attempt += 1;
      if (!isRetryablePrismaError(error) || attempt >= maxAttempts) {
        throw error;
      }
    }
  }
}

async function nextReference(prefix: string, model: 'quote' | 'appointment') {
  const currentYear = new Date().getFullYear();
  const yearlyPrefix = `${prefix}-${currentYear}-`;
  const counterKey = `${model}:${currentYear}`;

  const nextNumber = await withPrismaRetry(async () => {
    const value = await db.$transaction(async (tx) => {
      const existingCounter = await tx.v2SequenceCounter.findUnique({
        where: { key: counterKey },
      });

      if (existingCounter) {
        const updatedCounter = await tx.v2SequenceCounter.update({
          where: { key: counterKey },
          data: { value: { increment: 1 } },
        });
        return updatedCounter.value;
      }

      const current = model === 'quote'
        ? await tx.v2QuoteRequest.findFirst({
            where: { referenceNumber: { startsWith: yearlyPrefix } },
            orderBy: { referenceNumber: 'desc' },
          })
        : await tx.v2Appointment.findFirst({
            where: { referenceNumber: { startsWith: yearlyPrefix } },
            orderBy: { referenceNumber: 'desc' },
          });

      const initialValue = current
        ? Number.parseInt(current.referenceNumber.split('-')[2] ?? '0', 10) + 1
        : 1;

      const createdCounter = await tx.v2SequenceCounter.create({
        data: {
          key: counterKey,
          value: initialValue,
        },
      });

      return createdCounter.value;
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    });

    return value;
  });

  return `${yearlyPrefix}${String(nextNumber).padStart(4, '0')}`;
}

async function ensureV2AppointmentSlotAvailable(
  tx: Prisma.TransactionClient,
  selectedDate: string,
  selectedTime: string,
) {
  const appointmentDate = toCalendarDate(selectedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (appointmentDate < today) {
    throw new Error('selected_slot_unavailable');
  }

  const [rule, exception, existingAppointment] = await Promise.all([
    tx.v2AvailabilityRule.findUnique({
      where: { dayOfWeek: appointmentDate.getDay() },
    }),
    tx.v2AvailabilityException.findUnique({
      where: { date: appointmentDate },
    }),
    tx.v2Appointment.findFirst({
      where: {
        appointmentDate,
        appointmentTime: selectedTime,
        deletedAt: null,
        status: { notIn: INACTIVE_APPOINTMENT_STATUSES },
      },
      select: { id: true },
    }),
  ]);

  const fallbackRule = defaultAvailabilityRules.find((entry) => entry.dayOfWeek === appointmentDate.getDay());
  const effectiveRule = rule ?? fallbackRule;
  const blockedTimes = exception?.blockedTimes ?? [];

  if (!effectiveRule?.isActive || !effectiveRule.timeSlots.includes(selectedTime)) {
    throw new Error('selected_slot_unavailable');
  }

  if (blockedTimes.includes('all') || blockedTimes.includes(selectedTime)) {
    throw new Error('selected_slot_unavailable');
  }

  if (existingAppointment) {
    throw new Error('selected_slot_unavailable');
  }
}

export async function createV2QuoteRequest(input: V2QuoteCreateInput) {
  const referenceNumber = await nextReference('V2Q', 'quote');

  const quote = await db.v2QuoteRequest.create({
    data: {
      referenceNumber,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      postalCode: input.postalCode,
      city: input.city || null,
      propertyTypeId: input.propertyTypeId,
      serviceTypeIds: input.serviceTypeIds,
      description: input.description,
      preferredStart: input.preferredStart || null,
      budgetRange: input.budgetRange ? (input.budgetRange as BudgetRange) : null,
      gdprConsent: input.gdprConsent,
    },
  });

  await recordV2LeadEvent({
    leadType: 'quote',
    leadId: quote.id,
    eventType: 'submitted',
    payload: {
      referenceNumber: quote.referenceNumber,
      serviceTypeIds: input.serviceTypeIds,
      propertyTypeId: input.propertyTypeId,
    },
  });

  return quote;
}

export async function createV2Appointment(input: V2AppointmentCreateInput) {
  const appointment = await withPrismaRetry(async () => {
    const referenceNumber = await nextReference('V2A', 'appointment');
    const appointmentDate = toCalendarDate(input.selectedDate);

    return db.$transaction(async (tx) => {
      await ensureV2AppointmentSlotAvailable(tx, input.selectedDate, input.selectedTime);

      return tx.v2Appointment.create({
        data: {
          referenceNumber,
          activeSlotKey: buildV2ActiveSlotKey(input.selectedDate, input.selectedTime),
          fullName: input.name,
          email: input.email,
          phone: input.phone,
          municipality: input.gemeente,
          appointmentDate,
          appointmentTime: input.selectedTime,
          projectType: input.projectTypeId || null,
          propertyType: input.propertyType || null,
          propertyAge: input.propertyAge || null,
          priorities: input.priorities,
          materialPreference: input.materialPreference || null,
          budget: input.budget || null,
          timing: input.timing || null,
          subsidyInterest: input.subsidyInterest,
          paymentSpread: input.paymentSpread,
          motivation: input.motivation || null,
          message: input.message || null,
        },
      });
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    });
  });

  await recordV2LeadEvent({
    leadType: 'appointment',
    leadId: appointment.id,
    eventType: 'submitted',
    payload: {
      referenceNumber: appointment.referenceNumber,
      selectedDate: input.selectedDate,
      selectedTime: input.selectedTime,
      projectTypeId: input.projectTypeId || null,
    },
  });

  return appointment;
}

export async function updateV2Quote(input: {
  quoteId: string;
  actorId?: string | null;
  status?: string;
  adminNotes?: string | null;
}) {
  const currentQuote = await db.v2QuoteRequest.findFirst({
    where: {
      id: input.quoteId,
      deletedAt: null,
    },
    select: { id: true },
  });

  if (!currentQuote) {
    throw new Error('quote_not_found');
  }

  const quote = await db.v2QuoteRequest.update({
    where: { id: input.quoteId },
    data: {
      status: input.status as QuoteStatus | undefined,
      adminNotes: input.adminNotes,
    },
  });

  await recordV2AuditEvent({
    action: 'quote.updated',
    entityType: 'quote',
    entityId: quote.id,
    actorId: input.actorId,
    payload: {
      status: input.status,
    },
  });

  return quote;
}

export async function deleteV2Quote(quoteId: string, actorId?: string | null) {
  const quote = await db.$transaction(async (tx) => {
    const currentQuote = await tx.v2QuoteRequest.findFirst({
      where: {
        id: quoteId,
        deletedAt: null,
      },
    });

    if (!currentQuote) {
      throw new Error('quote_not_found');
    }

    return tx.v2QuoteRequest.update({
      where: { id: quoteId },
      data: {
        deletedAt: new Date(),
      },
    });
  });

  await recordV2AuditEvent({
    action: 'quote.deleted',
    entityType: 'quote',
    entityId: quote.id,
    actorId,
    payload: {
      referenceNumber: quote.referenceNumber,
      status: quote.status,
      email: quote.email,
    },
  });

  return quote;
}

export async function updateV2Appointment(input: {
  appointmentId: string;
  actorId?: string | null;
  status: string;
  adminNotes?: string | null;
  proposedDate?: string | null;
  proposedTime?: string | null;
}) {
  const currentAppointment = await db.v2Appointment.findUnique({
    where: { id: input.appointmentId },
    select: {
      appointmentDate: true,
      appointmentTime: true,
      activeSlotKey: true,
      deletedAt: true,
    },
  });

  if (!currentAppointment || currentAppointment.deletedAt) {
    throw new Error('appointment_not_found');
  }

  const nextStatus = input.status as AppointmentStatus;
  const nextActiveSlotKey = shouldReserveAppointmentSlot(nextStatus)
    ? (currentAppointment.activeSlotKey ?? buildV2ActiveSlotKey(
        currentAppointment.appointmentDate.toISOString().slice(0, 10),
        currentAppointment.appointmentTime,
      ))
    : null;

  if (nextActiveSlotKey && !currentAppointment.activeSlotKey) {
    const conflictingAppointment = await db.v2Appointment.findFirst({
      where: {
        id: { not: input.appointmentId },
        appointmentDate: currentAppointment.appointmentDate,
        appointmentTime: currentAppointment.appointmentTime,
        deletedAt: null,
        status: { notIn: INACTIVE_APPOINTMENT_STATUSES },
      },
      select: { id: true },
    });

    if (conflictingAppointment) {
      throw new Error('selected_slot_unavailable');
    }
  }

  const appointment = await db.v2Appointment.update({
    where: { id: input.appointmentId },
    data: {
      status: nextStatus,
      activeSlotKey: nextActiveSlotKey,
      adminNotes: input.adminNotes,
      proposedDate: input.proposedDate ? new Date(input.proposedDate) : null,
      proposedTime: input.proposedTime ?? null,
      confirmedAt: input.status === 'CONFIRMED' ? new Date() : null,
    },
  });

  await recordV2AuditEvent({
    action: 'appointment.updated',
    entityType: 'appointment',
    entityId: appointment.id,
    actorId: input.actorId,
    payload: {
      status: input.status,
      proposedDate: input.proposedDate,
      proposedTime: input.proposedTime,
    },
  });

  return appointment;
}

export async function deleteV2Appointment(appointmentId: string, actorId?: string | null) {
  const appointment = await db.$transaction(async (tx) => {
    const currentAppointment = await tx.v2Appointment.findFirst({
      where: {
        id: appointmentId,
        deletedAt: null,
      },
    });

    if (!currentAppointment) {
      throw new Error('appointment_not_found');
    }

    return tx.v2Appointment.update({
      where: { id: appointmentId },
      data: {
        deletedAt: new Date(),
        activeSlotKey: null,
      },
    });
  });

  await recordV2AuditEvent({
    action: 'appointment.deleted',
    entityType: 'appointment',
    entityId: appointment.id,
    actorId,
    payload: {
      referenceNumber: appointment.referenceNumber,
      status: appointment.status,
      appointmentDate: appointment.appointmentDate.toISOString().slice(0, 10),
      appointmentTime: appointment.appointmentTime,
      email: appointment.email,
    },
  });

  return appointment;
}

export async function replaceV2PageSections(items: V2PageSectionInput[], actorId?: string | null) {
  await db.$transaction(async (tx) => {
    await tx.v2PageSection.deleteMany({});

    if (items.length > 0) {
      await tx.v2PageSection.createMany({
        data: items.map((item) => ({
          pageKey: item.pageKey,
          sectionKey: item.sectionKey,
          locale: item.locale,
          schemaKey: item.schemaKey,
          dataJson: toInputJsonValue(item.dataJson),
          displayOrder: item.displayOrder,
          published: item.published,
        })),
      });
    }
  });

  await recordV2AuditEvent({
    action: 'content.replaced',
    entityType: 'page-section',
    entityId: 'bulk',
    actorId,
    payload: { count: items.length },
  });
}

export async function replaceV2Assets(items: V2AssetInput[], actorId?: string | null) {
  await db.$transaction(async (tx) => {
    await tx.v2Asset.deleteMany({});

    if (items.length > 0) {
      await tx.v2Asset.createMany({
        data: items.map((item) => ({
          filename: item.filename,
          originalName: item.originalName,
          mimeType: item.mimeType,
          size: item.size,
          bucket: item.bucket,
          path: item.path,
          url: item.url,
          alt: item.alt ?? null,
          width: item.width ?? null,
          height: item.height ?? null,
          tags: item.tags,
        })),
      });
    }
  });

  await recordV2AuditEvent({
    action: 'assets.replaced',
    entityType: 'asset',
    entityId: 'bulk',
    actorId,
    payload: { count: items.length },
  });
}

export async function replaceV2Settings(items: V2SiteSettingInput[], actorId?: string | null) {
  await db.$transaction(async (tx) => {
    await tx.v2SiteSetting.deleteMany({});

    if (items.length > 0) {
      await tx.v2SiteSetting.createMany({
        data: items.map((item) => ({
          key: item.key,
          category: item.category,
          description: item.description ?? null,
          valueJson: toInputJsonValue(item.valueJson),
        })),
      });
    }
  });

  await recordV2AuditEvent({
    action: 'settings.replaced',
    entityType: 'site-setting',
    entityId: 'bulk',
    actorId,
    payload: { count: items.length },
  });
}

export async function replaceV2Availability(input: {
  rules: Array<{ dayOfWeek: number; timeSlots: string[]; isActive: boolean }>;
  exceptions: Array<{ date: string; blockedTimes: string[]; reason?: string | null }>;
}, actorId?: string | null) {
  await db.$transaction(async (tx) => {
    await tx.v2AvailabilityRule.deleteMany({});
    await tx.v2AvailabilityException.deleteMany({});

    if (input.rules.length > 0) {
      await tx.v2AvailabilityRule.createMany({
        data: input.rules.map((rule) => ({
          dayOfWeek: rule.dayOfWeek,
          timeSlots: rule.timeSlots,
          isActive: rule.isActive,
        })),
      });
    }

    if (input.exceptions.length > 0) {
      await tx.v2AvailabilityException.createMany({
        data: input.exceptions.map((exception) => ({
          date: new Date(exception.date),
          blockedTimes: exception.blockedTimes,
          reason: exception.reason ?? null,
        })),
      });
    }
  });

  await recordV2AuditEvent({
    action: 'availability.replaced',
    entityType: 'availability',
    entityId: 'bulk',
    actorId,
    payload: {
      ruleCount: input.rules.length,
      exceptionCount: input.exceptions.length,
    },
  });
}

export async function replaceV2Projects(items: V2ProjectInput[], actorId?: string | null) {
  await db.$transaction(async (tx) => {
    await tx.v2ProjectImage.deleteMany({});
    await tx.v2ProjectTranslation.deleteMany({});
    await tx.v2Project.deleteMany({});

    for (const item of items) {
      const project = await tx.v2Project.create({
        data: {
          slug: item.slug,
          category: item.category,
          location: item.location,
          year: item.year,
          featured: item.featured,
          isPublished: item.isPublished,
          sortOrder: item.sortOrder,
          coverImageUrl: item.coverImageUrl ?? null,
        },
      });

      if (item.translations.length > 0) {
        await tx.v2ProjectTranslation.createMany({
          data: item.translations.map((translation) => ({
            projectId: project.id,
            locale: translation.locale,
            title: translation.title,
            shortDescription: translation.shortDescription ?? null,
            description: translation.description ?? null,
            challengeText: translation.challengeText ?? null,
            approachText: translation.approachText ?? null,
            resultText: translation.resultText ?? null,
            projectType: translation.projectType ?? null,
            duration: translation.duration ?? null,
            surface: translation.surface ?? null,
            completionDate: translation.completionDate ?? null,
          })),
        });
      }

      if (item.images.length > 0) {
        await tx.v2ProjectImage.createMany({
          data: item.images.map((image) => ({
            projectId: project.id,
            imageUrl: image.imageUrl,
            alt: image.alt ?? null,
            caption: image.caption ?? null,
            sortOrder: image.sortOrder,
            kind: image.kind ?? 'gallery',
          })),
        });
      }
    }
  });

  await recordV2AuditEvent({
    action: 'projects.replaced',
    entityType: 'project',
    entityId: 'bulk',
    actorId,
    payload: { count: items.length },
  });
}

export async function upsertV2PageSection(input: V2PageSectionInput, actorId?: string | null) {
  const section = await db.v2PageSection.upsert({
    where: {
      pageKey_sectionKey_locale_displayOrder: {
        pageKey: input.pageKey,
        sectionKey: input.sectionKey,
        locale: input.locale,
        displayOrder: input.displayOrder,
      },
    },
    update: {
      schemaKey: input.schemaKey,
      dataJson: toInputJsonValue(input.dataJson),
      published: input.published,
    },
    create: {
      pageKey: input.pageKey,
      sectionKey: input.sectionKey,
      locale: input.locale,
      schemaKey: input.schemaKey,
      dataJson: toInputJsonValue(input.dataJson),
      displayOrder: input.displayOrder,
      published: input.published,
    },
  });

  await recordV2AuditEvent({
    action: 'content.upserted',
    entityType: 'page-section',
    entityId: section.id,
    actorId,
    payload: {
      pageKey: section.pageKey,
      sectionKey: section.sectionKey,
      locale: section.locale,
      schemaKey: section.schemaKey,
    },
  });

  return section;
}

export async function updateV2PageSection(
  sectionId: string,
  input: V2PageSectionUpdateInput,
  actorId?: string | null,
) {
  const section = await db.v2PageSection.update({
    where: { id: sectionId },
    data: {
      dataJson: toInputJsonValue(input.dataJson),
      displayOrder: input.displayOrder,
      published: input.published,
    },
  });

  await recordV2AuditEvent({
    action: 'content.updated',
    entityType: 'page-section',
    entityId: section.id,
    actorId,
    payload: {
      pageKey: section.pageKey,
      sectionKey: section.sectionKey,
      locale: section.locale,
      displayOrder: section.displayOrder,
      published: section.published,
    },
  });

  return section;
}

export async function deleteV2PageSection(sectionId: string, actorId?: string | null) {
  const section = await db.v2PageSection.delete({
    where: { id: sectionId },
  });

  await recordV2AuditEvent({
    action: 'content.deleted',
    entityType: 'page-section',
    entityId: section.id,
    actorId,
    payload: {
      pageKey: section.pageKey,
      sectionKey: section.sectionKey,
      locale: section.locale,
    },
  });

  return section;
}

async function createOrReplaceV2Project(
  tx: Prisma.TransactionClient,
  projectId: string,
  input: V2ProjectWriteInput,
) {
  await tx.v2Project.update({
    where: { id: projectId },
    data: {
      slug: input.slug,
      category: input.category,
      location: input.location,
      year: input.year,
      featured: input.featured,
      isPublished: input.isPublished,
      sortOrder: input.sortOrder,
      coverImageUrl: input.coverImageUrl ?? null,
    },
  });

  await tx.v2ProjectTranslation.deleteMany({
    where: { projectId },
  });
  await tx.v2ProjectImage.deleteMany({
    where: { projectId },
  });

  if (input.translations.length > 0) {
    await tx.v2ProjectTranslation.createMany({
      data: input.translations.map((translation) => ({
        projectId,
        locale: translation.locale,
        title: translation.title,
        shortDescription: translation.shortDescription ?? null,
        description: translation.description ?? null,
        challengeText: translation.challengeText ?? null,
        approachText: translation.approachText ?? null,
        resultText: translation.resultText ?? null,
        projectType: translation.projectType ?? null,
        duration: translation.duration ?? null,
        surface: translation.surface ?? null,
        completionDate: translation.completionDate ?? null,
      })),
    });
  }

  if (input.images.length > 0) {
    await tx.v2ProjectImage.createMany({
      data: input.images.map((image) => ({
        projectId,
        imageUrl: image.imageUrl,
        alt: image.alt ?? null,
        caption: image.caption ?? null,
        sortOrder: image.sortOrder,
        kind: image.kind ?? 'gallery',
      })),
    });
  }
}

export async function createV2Project(input: V2ProjectWriteInput, actorId?: string | null) {
  const project = await db.$transaction(async (tx) => {
    const created = await tx.v2Project.create({
      data: {
        slug: input.slug,
        category: input.category,
        location: input.location,
        year: input.year,
        featured: input.featured,
        isPublished: input.isPublished,
        sortOrder: input.sortOrder,
        coverImageUrl: input.coverImageUrl ?? null,
      },
    });

    await createOrReplaceV2Project(tx, created.id, input);

    return tx.v2Project.findUniqueOrThrow({
      where: { id: created.id },
      include: {
        translations: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
    });
  });

  await recordV2AuditEvent({
    action: 'project.created',
    entityType: 'project',
    entityId: project.id,
    actorId,
    payload: {
      slug: project.slug,
      featured: project.featured,
      isPublished: project.isPublished,
    },
  });

  return project;
}

export async function updateV2Project(
  projectId: string,
  input: V2ProjectWriteInput,
  actorId?: string | null,
) {
  const project = await db.$transaction(async (tx) => {
    await createOrReplaceV2Project(tx, projectId, input);

    return tx.v2Project.findUniqueOrThrow({
      where: { id: projectId },
      include: {
        translations: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
    });
  });

  await recordV2AuditEvent({
    action: 'project.updated',
    entityType: 'project',
    entityId: project.id,
    actorId,
    payload: {
      slug: project.slug,
      featured: project.featured,
      isPublished: project.isPublished,
      sortOrder: project.sortOrder,
    },
  });

  return project;
}

export async function deleteV2Project(projectId: string, actorId?: string | null) {
  const project = await db.v2Project.delete({
    where: { id: projectId },
  });

  await recordV2AuditEvent({
    action: 'project.deleted',
    entityType: 'project',
    entityId: project.id,
    actorId,
    payload: {
      slug: project.slug,
    },
  });

  return project;
}

export async function upsertV2SiteSetting(
  key: string,
  input: V2SiteSettingUpdateInput,
  actorId?: string | null,
) {
  const setting = await db.v2SiteSetting.upsert({
    where: { key },
    update: {
      category: input.category,
      description: input.description ?? null,
      valueJson: toInputJsonValue(input.valueJson),
    },
    create: {
      key,
      category: input.category,
      description: input.description ?? null,
      valueJson: toInputJsonValue(input.valueJson),
    },
  });

  await recordV2AuditEvent({
    action: 'setting.upserted',
    entityType: 'site-setting',
    entityId: setting.id,
    actorId,
    payload: {
      key: setting.key,
      category: setting.category,
    },
  });

  return setting;
}

export async function upsertV2AvailabilityRule(
  dayOfWeek: number,
  timeSlots: string[],
  isActive: boolean,
  actorId?: string | null,
) {
  const rule = await db.v2AvailabilityRule.upsert({
    where: { dayOfWeek },
    update: {
      timeSlots,
      isActive,
    },
    create: {
      dayOfWeek,
      timeSlots,
      isActive,
    },
  });

  await recordV2AuditEvent({
    action: 'availability.rule.upserted',
    entityType: 'availability-rule',
    entityId: rule.id,
    actorId,
    payload: {
      dayOfWeek: rule.dayOfWeek,
      isActive: rule.isActive,
      slotCount: rule.timeSlots.length,
    },
  });

  return rule;
}

export async function createV2AvailabilityException(
  input: V2AvailabilityExceptionWriteInput,
  actorId?: string | null,
) {
  const exception = await db.v2AvailabilityException.create({
    data: {
      date: new Date(input.date),
      blockedTimes: input.blockedTimes,
      reason: input.reason ?? null,
    },
  });

  await recordV2AuditEvent({
    action: 'availability.exception.created',
    entityType: 'availability-exception',
    entityId: exception.id,
    actorId,
    payload: {
      date: input.date,
      blockedTimes: input.blockedTimes,
    },
  });

  return exception;
}

export async function updateV2AvailabilityException(
  exceptionId: string,
  input: V2AvailabilityExceptionWriteInput,
  actorId?: string | null,
) {
  const exception = await db.v2AvailabilityException.update({
    where: { id: exceptionId },
    data: {
      date: new Date(input.date),
      blockedTimes: input.blockedTimes,
      reason: input.reason ?? null,
    },
  });

  await recordV2AuditEvent({
    action: 'availability.exception.updated',
    entityType: 'availability-exception',
    entityId: exception.id,
    actorId,
    payload: {
      date: input.date,
      blockedTimes: input.blockedTimes,
    },
  });

  return exception;
}

export async function deleteV2AvailabilityException(exceptionId: string, actorId?: string | null) {
  const exception = await db.v2AvailabilityException.delete({
    where: { id: exceptionId },
  });

  await recordV2AuditEvent({
    action: 'availability.exception.deleted',
    entityType: 'availability-exception',
    entityId: exception.id,
    actorId,
    payload: {
      date: exception.date.toISOString().slice(0, 10),
    },
  });

  return exception;
}

export async function createV2AssetRecord(input: V2AssetInput, actorId?: string | null) {
  const asset = await db.v2Asset.create({
    data: {
      filename: input.filename,
      originalName: input.originalName,
      mimeType: input.mimeType,
      size: input.size,
      bucket: input.bucket,
      path: input.path,
      url: input.url,
      alt: input.alt ?? null,
      width: input.width ?? null,
      height: input.height ?? null,
      tags: input.tags,
    },
  });

  await recordV2AuditEvent({
    action: 'asset.created',
    entityType: 'asset',
    entityId: asset.id,
    actorId,
    payload: {
      bucket: asset.bucket,
      path: asset.path,
      mimeType: asset.mimeType,
    },
  });

  return asset;
}

export async function updateV2Asset(
  assetId: string,
  input: V2AssetUpdateInput,
  actorId?: string | null,
) {
  const asset = await db.v2Asset.update({
    where: { id: assetId },
    data: {
      filename: input.filename,
      originalName: input.originalName,
      mimeType: input.mimeType,
      size: input.size,
      bucket: input.bucket,
      path: input.path,
      url: input.url,
      alt: input.alt ?? null,
      width: input.width ?? null,
      height: input.height ?? null,
      tags: input.tags,
    },
  });

  await recordV2AuditEvent({
    action: 'asset.updated',
    entityType: 'asset',
    entityId: asset.id,
    actorId,
    payload: {
      bucket: asset.bucket,
      path: asset.path,
      mimeType: asset.mimeType,
      tagCount: asset.tags.length,
    },
  });

  return asset;
}

export async function deleteV2Asset(assetId: string, actorId?: string | null) {
  const asset = await db.v2Asset.delete({
    where: { id: assetId },
  });

  await recordV2AuditEvent({
    action: 'asset.deleted',
    entityType: 'asset',
    entityId: asset.id,
    actorId,
    payload: {
      bucket: asset.bucket,
      path: asset.path,
    },
  });

  return asset;
}
