import { db } from '@/lib/db';
import { AppointmentStatus, BudgetRange, QuoteStatus } from '@prisma/client';
import type { V2AppointmentCreateInput, V2AssetInput, V2PageSectionInput, V2ProjectInput, V2SiteSettingInput } from './schemas';
import type { V2QuoteCreateInput } from './schemas';
import { getV2Availability } from './public-data';
import { recordV2AuditEvent, recordV2LeadEvent } from './audit';
import { toInputJsonValue } from './json';

async function nextReference(prefix: string, model: 'quote' | 'appointment') {
  const currentYear = new Date().getFullYear();
  const yearlyPrefix = `${prefix}-${currentYear}-`;

  const current = model === 'quote'
    ? await db.v2QuoteRequest.findFirst({
        where: { referenceNumber: { startsWith: yearlyPrefix } },
        orderBy: { referenceNumber: 'desc' },
      })
    : await db.v2Appointment.findFirst({
        where: { referenceNumber: { startsWith: yearlyPrefix } },
        orderBy: { referenceNumber: 'desc' },
      });

  const nextNumber = current
    ? Number.parseInt(current.referenceNumber.split('-')[2] ?? '0', 10) + 1
    : 1;

  return `${yearlyPrefix}${String(nextNumber).padStart(4, '0')}`;
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
  const availability = await getV2Availability(input.selectedDate.slice(0, 7));
  const slot = availability[input.selectedDate];

  if (!slot?.available.includes(input.selectedTime)) {
    throw new Error('selected_slot_unavailable');
  }

  const referenceNumber = await nextReference('V2A', 'appointment');
  const [year, month, day] = input.selectedDate.split('-').map(Number);

  const appointment = await db.v2Appointment.create({
    data: {
      referenceNumber,
      fullName: input.name,
      email: input.email,
      phone: input.phone,
      municipality: input.gemeente,
      appointmentDate: new Date(year, month - 1, day),
      appointmentTime: input.selectedTime,
      projectType: input.projectType || null,
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

  await recordV2LeadEvent({
    leadType: 'appointment',
    leadId: appointment.id,
    eventType: 'submitted',
    payload: {
      referenceNumber: appointment.referenceNumber,
      selectedDate: input.selectedDate,
      selectedTime: input.selectedTime,
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

export async function updateV2Appointment(input: {
  appointmentId: string;
  actorId?: string | null;
  status: string;
  adminNotes?: string | null;
  proposedDate?: string | null;
  proposedTime?: string | null;
}) {
  const appointment = await db.v2Appointment.update({
    where: { id: input.appointmentId },
    data: {
      status: input.status as AppointmentStatus,
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
