import { defaultPageSections, type V2DefaultPageSection } from './defaults';

export type V2SectionRecord = {
  id?: string | null;
  pageKey: string;
  sectionKey: string;
  locale: string;
  schemaKey: string;
  dataJson: unknown;
  displayOrder: number;
  published: boolean;
};

export type V2AdminSectionRecord = V2SectionRecord & {
  id: string | null;
  hasStoredValue: boolean;
  isDefault: boolean;
  previewPath: string;
};

function getSectionKey(section: Pick<V2SectionRecord, 'pageKey' | 'sectionKey' | 'locale' | 'displayOrder'>) {
  return `${section.pageKey}:${section.sectionKey}:${section.locale}:${section.displayOrder}`;
}

function normalizeLegacySection<T extends V2SectionRecord>(section: T): T {
  if (
    section.pageKey === 'approach'
    && section.sectionKey === 'cta'
    && (section.displayOrder === 3 || section.displayOrder === 5)
  ) {
    return {
      ...section,
      displayOrder: 6,
    };
  }

  return section;
}

function sortSections<T extends Pick<V2SectionRecord, 'displayOrder' | 'sectionKey'>>(items: T[]) {
  return [...items].sort((left, right) => {
    if (left.displayOrder !== right.displayOrder) {
      return left.displayOrder - right.displayOrder;
    }

    return left.sectionKey.localeCompare(right.sectionKey);
  });
}

export function getV2PreviewPath(pageKey: string) {
  switch (pageKey) {
    case 'home':
      return '';
    case 'projects':
      return '/projecten';
    case 'quote':
      return '/offerte';
    case 'appointment':
      return '/afspraak';
    case 'approach':
      return '/aanpak';
    case 'contact':
      return '/contact';
    case 'services':
      return '/diensten';
    case 'service-full-renovation':
      return '/diensten/totaalrenovatie';
    case 'service-renovation':
      return '/diensten/renovatie';
    case 'service-finishing':
      return '/diensten/afwerking';
    case 'service-technical':
      return '/diensten/technieken';
    case 'privacy':
      return '/privacy';
    case 'terms':
      return '/algemene-voorwaarden';
    case 'value-certification':
      return '/waarden/attestering';
    case 'value-communication':
      return '/waarden/communicatie';
    case 'value-payment-spread':
      return '/waarden/betalingsspreiding';
    case 'value-reuse':
      return '/waarden/hergebruik';
    case 'value-subsidies':
      return '/waarden/subsidies';
    default:
      return '/';
  }
}

export function mergeV2Sections(
  defaults: V2DefaultPageSection[],
  stored: V2SectionRecord[],
) {
  const merged = new Map<string, V2SectionRecord>();

  for (const section of defaults) {
    const normalized = normalizeLegacySection(section);
    merged.set(getSectionKey(normalized), { ...normalized });
  }

  for (const section of stored) {
    const normalized = normalizeLegacySection(section);
    merged.set(getSectionKey(normalized), {
      ...normalized,
      dataJson: normalized.dataJson && typeof normalized.dataJson === 'object' && !Array.isArray(normalized.dataJson)
        ? normalized.dataJson
        : {},
    });
  }

  return sortSections(Array.from(merged.values()));
}

export function getPublishedV2Sections(
  defaults: V2DefaultPageSection[],
  stored: V2SectionRecord[],
) {
  return mergeV2Sections(defaults, stored).filter((section) => section.published);
}

export function getAdminV2Sections(stored: V2SectionRecord[]) {
  const merged = mergeV2Sections(defaultPageSections, stored);
  const storedKeys = new Set(stored.map((section) => getSectionKey(normalizeLegacySection(section))));
  const defaultKeys = new Set(defaultPageSections.map((section) => getSectionKey(section)));

  return merged.map((section) => ({
    ...section,
    id: section.id ?? null,
    hasStoredValue: storedKeys.has(getSectionKey(section)),
    isDefault: defaultKeys.has(getSectionKey(section)),
    previewPath: getV2PreviewPath(section.pageKey),
  })) satisfies V2AdminSectionRecord[];
}

export function getV2AdminPageOptions(extraPageKeys: string[] = []) {
  const pageKeys = new Set<string>([
    ...defaultPageSections.map((section) => section.pageKey),
    ...extraPageKeys,
  ]);

  return Array.from(pageKeys)
    .sort()
    .map((pageKey) => ({
      key: pageKey,
      previewPath: getV2PreviewPath(pageKey),
    }));
}
