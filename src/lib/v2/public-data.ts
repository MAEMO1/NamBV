import { cache } from 'react';
import { db } from '@/lib/db';
import { defaultAvailabilityRules, defaultPageSections, defaultProjects, defaultQuoteFormOptions, defaultSettings } from './defaults';
import type { V2Locale } from './locale';
import { getPublishedV2Sections } from './sections';

export async function getV2PageSections(pageKey: string, locale: V2Locale) {
  const stored = await db.v2PageSection.findMany({
    where: {
      pageKey,
      locale,
    },
    orderBy: [{ displayOrder: 'asc' }, { sectionKey: 'asc' }],
  });
  const defaults = defaultPageSections.filter((section) => section.pageKey === pageKey && section.locale === locale);

  return getPublishedV2Sections(defaults, stored);
}

const getCachedV2SettingsMap = cache(async () => {
  const rows = await db.v2SiteSetting.findMany();
  const base = Object.fromEntries(defaultSettings.map((setting) => [setting.key, setting.valueJson]));
  const overrides = Object.fromEntries(rows.map((row) => [row.key, row.valueJson]));

  return {
    ...base,
    ...overrides,
  };
});

export async function getV2SettingsMap() {
  return getCachedV2SettingsMap();
}

function withProjectTranslation<T extends { locale: string }>(translations: T[], locale: V2Locale) {
  return translations.find((translation) => translation.locale === locale)
    ?? translations.find((translation) => translation.locale === 'nl')
    ?? translations[0];
}

export async function getV2Projects(locale: V2Locale) {
  const projects = await db.v2Project.findMany({
    where: { isPublished: true },
    include: {
      translations: true,
      images: {
        orderBy: { sortOrder: 'asc' },
      },
    },
    orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { year: 'desc' }],
  });

  const source = projects.length > 0
    ? projects.map((project) => {
        const translation = withProjectTranslation(project.translations, locale);
        return {
          id: project.id,
          slug: project.slug,
          category: project.category,
          location: project.location,
          year: project.year,
          featured: project.featured,
          coverImageUrl: project.coverImageUrl ?? project.images[0]?.imageUrl ?? null,
          images: project.images,
          translation,
        };
      })
    : defaultProjects.map((project) => {
        const translation = withProjectTranslation(project.translations, locale);
        return {
          id: project.slug,
          slug: project.slug,
          category: project.category,
          location: project.location,
          year: project.year,
          featured: project.featured,
          coverImageUrl: project.coverImageUrl ?? project.images[0]?.imageUrl ?? null,
          images: project.images,
          translation,
        };
      });

  return source;
}

export async function getV2ProjectBySlug(slug: string, locale: V2Locale) {
  const project = await db.v2Project.findUnique({
    where: { slug },
    include: {
      translations: true,
      images: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  if (project) {
    return {
      ...project,
      translation: withProjectTranslation(project.translations, locale),
    };
  }

  const fallback = defaultProjects.find((entry) => entry.slug === slug);
  if (!fallback) {
    return null;
  }

  return {
    id: fallback.slug,
    slug: fallback.slug,
    category: fallback.category,
    location: fallback.location,
    year: fallback.year,
    featured: fallback.featured,
    isPublished: fallback.isPublished,
    sortOrder: fallback.sortOrder,
    coverImageUrl: fallback.coverImageUrl ?? fallback.images[0]?.imageUrl ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
    images: fallback.images,
    translations: fallback.translations,
    translation: withProjectTranslation(fallback.translations, locale),
  };
}

export async function getV2QuoteFormOptions() {
  const serviceTypes = await db.serviceType.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true, slug: true, icon: true },
  });
  const propertyTypes = await db.propertyType.findMany({
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true, slug: true },
  });

  return {
    serviceTypes: serviceTypes.length > 0 ? serviceTypes : defaultQuoteFormOptions.serviceTypes,
    propertyTypes: propertyTypes.length > 0 ? propertyTypes : defaultQuoteFormOptions.propertyTypes,
  };
}

export async function getV2Availability(month?: string) {
  let startDate: Date;
  let endDate: Date;

  if (month) {
    const [year, monthNumber] = month.split('-').map(Number);
    startDate = new Date(year, monthNumber - 1, 1);
    endDate = new Date(year, monthNumber, 0);
  } else {
    startDate = new Date();
    endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
  }

  const rules = await db.v2AvailabilityRule.findMany({
    orderBy: { dayOfWeek: 'asc' },
  });
  const exceptions = await db.v2AvailabilityException.findMany({
    where: { date: { gte: startDate, lte: endDate } },
    orderBy: { date: 'asc' },
  });
  const appointments = await db.v2Appointment.findMany({
    where: {
      appointmentDate: { gte: startDate, lte: endDate },
      status: { notIn: ['CANCELLED', 'REJECTED'] },
    },
    select: {
      appointmentDate: true,
      appointmentTime: true,
    },
  });

  const effectiveRules = rules.length > 0 ? rules : defaultAvailabilityRules;
  const rulesByDay = new Map(effectiveRules.map((rule) => [rule.dayOfWeek, rule]));
  const exceptionMap = new Map(exceptions.map((entry) => [entry.date.toISOString().slice(0, 10), entry]));

  const bookedMap = new Map<string, string[]>();
  for (const appointment of appointments) {
    const dateKey = appointment.appointmentDate.toISOString().slice(0, 10);
    const current = bookedMap.get(dateKey) ?? [];
    current.push(appointment.appointmentTime);
    bookedMap.set(dateKey, current);
  }

  const availability: Record<string, { available: string[]; booked: string[]; isOpen: boolean }> = {};
  const current = new Date(startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  while (current <= endDate) {
    const dateKey = current.toISOString().slice(0, 10);
    const dayRule = rulesByDay.get(current.getDay()) ?? { dayOfWeek: current.getDay(), timeSlots: [], isActive: false };
    const exception = exceptionMap.get(dateKey);
    const booked = bookedMap.get(dateKey) ?? [];
    const blockedTimes = exception?.blockedTimes ?? [];
    const isPast = current < today;

    const available = !isPast && dayRule.isActive
      ? dayRule.timeSlots.filter((time) => {
          if (blockedTimes.includes(time) || blockedTimes.includes('all')) {
            return false;
          }

          if (booked.includes(time)) {
            return false;
          }

          return true;
        })
      : [];

    availability[dateKey] = {
      available,
      booked,
      isOpen: !isPast && dayRule.isActive && !blockedTimes.includes('all'),
    };

    current.setDate(current.getDate() + 1);
  }

  return availability;
}

export async function getV2AnalyticsOverview() {
  const [quotes, appointments, quoteStatuses, appointmentStatuses] = await Promise.all([
    db.v2QuoteRequest.count(),
    db.v2Appointment.count(),
    db.v2QuoteRequest.groupBy({
      by: ['status'],
      _count: true,
    }),
    db.v2Appointment.groupBy({
      by: ['status'],
      _count: true,
    }),
  ]);

  return {
    totals: {
      quotes,
      appointments,
    },
    quoteStatuses,
    appointmentStatuses,
  };
}

export async function getV2AdminConsoleSnapshot() {
  const [quotes, appointments, sections, projects, assets, settings, analytics, availabilityRules, availabilityExceptions] = await Promise.all([
    db.v2QuoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    db.v2Appointment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    db.v2PageSection.findMany({
      orderBy: [{ pageKey: 'asc' }, { locale: 'asc' }, { displayOrder: 'asc' }],
    }),
    db.v2Project.findMany({
      include: {
        translations: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { sortOrder: 'asc' },
    }),
    db.v2Asset.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    db.v2SiteSetting.findMany({
      orderBy: { category: 'asc' },
    }),
    getV2AnalyticsOverview(),
    db.v2AvailabilityRule.findMany({
      orderBy: { dayOfWeek: 'asc' },
    }),
    db.v2AvailabilityException.findMany({
      orderBy: { date: 'asc' },
    }),
  ]);

  return {
    quotes,
    appointments,
    sections,
    projects,
    assets,
    settings,
    analytics,
    availability: {
      rules: availabilityRules.length > 0 ? availabilityRules : defaultAvailabilityRules,
      exceptions: availabilityExceptions,
    },
  };
}
