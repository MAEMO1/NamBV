import type { ContentSchemaKey, ContentSection, Locale, ProjectRecord } from './types';
import { locales } from './types';

export async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    cache: 'no-store',
    ...init,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error((payload as { error?: string }).error || 'Request failed');
  }

  return payload as T;
}

export function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function getSelectionKey(value: {
  id: string | null;
  pageKey?: string;
  locale?: string;
  sectionKey?: string;
  displayOrder?: number;
  slug?: string;
}) {
  if (value.id) {
    return value.id;
  }

  if (value.slug) {
    return `slug:${value.slug}`;
  }

  return `${value.pageKey}:${value.locale}:${value.sectionKey}:${value.displayOrder}`;
}

export function ensureString(value: unknown) {
  return typeof value === 'string' ? value : '';
}

export function ensureStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((entry) => String(entry ?? '')) : [];
}

export function ensureItemArray(value: unknown) {
  return Array.isArray(value)
    ? value.map((entry) => (entry && typeof entry === 'object' ? { ...(entry as Record<string, unknown>) } : {}))
    : [];
}

export function createEmptySectionData(schemaKey: ContentSchemaKey): Record<string, unknown> {
  switch (schemaKey) {
    case 'hero':
      return {
        eyebrow: '',
        title: '',
        description: '',
        primaryCtaLabel: '',
        primaryCtaHref: '',
        secondaryCtaLabel: '',
        secondaryCtaHref: '',
        image: '',
      };
    case 'feature-list':
      return {
        eyebrow: '',
        title: '',
        description: '',
        items: [],
      };
    case 'content':
      return {
        eyebrow: '',
        title: '',
        description: '',
        paragraphs: [],
        items: [],
      };
    case 'contact':
      return {
        eyebrow: '',
        title: '',
        description: '',
        highlights: [],
        primaryCtaLabel: '',
        primaryCtaHref: '',
      };
    case 'cta':
      return {
        title: '',
        description: '',
        primaryCtaLabel: '',
        primaryCtaHref: '',
      };
    case 'faq':
      return {
        eyebrow: '',
        title: '',
        description: '',
        items: [],
      };
    case 'legal':
      return {
        updatedAt: '',
        introduction: '',
        sections: [],
      };
  }
}

export function createNewSection(pageKey: string, locale: Locale, sections: ContentSection[]): ContentSection {
  const maxDisplayOrder =
    sections.length > 0 ? Math.max(...sections.map((section) => section.displayOrder)) : -1;

  return {
    id: null,
    pageKey,
    sectionKey: `section-${Date.now()}`,
    locale,
    schemaKey: 'content',
    displayOrder: maxDisplayOrder + 1,
    published: true,
    dataJson: createEmptySectionData('content'),
    hasStoredValue: false,
    isDefault: false,
    previewPath: '',
  };
}

export function createEmptyProject(sortOrder: number): ProjectRecord {
  return {
    id: null,
    slug: `nieuw-project-${Date.now()}`,
    category: '',
    location: '',
    year: new Date().getFullYear(),
    featured: false,
    isPublished: true,
    sortOrder,
    coverImageUrl: '',
    translations: locales.map((locale) => ({
      locale: locale.value,
      title: '',
      shortDescription: '',
      description: '',
      challengeText: '',
      approachText: '',
      resultText: '',
      projectType: '',
      duration: '',
      surface: '',
      completionDate: '',
    })),
    images: [],
    hasStoredValue: false,
  };
}

export function buildPreviewUrl(locale: string, previewPath: string) {
  const path = previewPath || '';
  return path ? `/${locale}${path}` : `/${locale}`;
}

export function parseTags(value: string) {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function formatDate(value?: string | null) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleDateString('nl-BE');
}

export function formatDateLong(value?: string | null) {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleDateString('nl-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getStatusCountValue(value: number | { _all?: number }) {
  if (typeof value === 'number') {
    return value;
  }

  return value?._all ?? 0;
}
