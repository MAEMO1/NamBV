export type ModuleKey =
  | 'analytics'
  | 'quotes'
  | 'appointments'
  | 'content'
  | 'projects'
  | 'assets'
  | 'settings'
  | 'availability';

export type AnalyticsOverview = {
  totals: {
    quotes: number;
    appointments: number;
  };
  quoteStatuses: Array<{ status: string; _count: number | { _all?: number } }>;
  appointmentStatuses: Array<{ status: string; _count: number | { _all?: number } }>;
};

export type QuoteRecord = {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  adminNotes: string | null;
  createdAt: string;
};

export type AppointmentRecord = {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  municipality: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  adminNotes: string | null;
  proposedDate: string | null;
  proposedTime: string | null;
  createdAt: string;
};

export type ContentSchemaKey = 'hero' | 'feature-list' | 'content' | 'contact' | 'cta' | 'legal';

export type Locale = 'nl' | 'fr' | 'en';

export type ContentSection = {
  id: string | null;
  pageKey: string;
  sectionKey: string;
  locale: Locale;
  schemaKey: ContentSchemaKey;
  displayOrder: number;
  published: boolean;
  dataJson: Record<string, unknown>;
  hasStoredValue: boolean;
  isDefault: boolean;
  previewPath: string;
};

export type ProjectTranslation = {
  locale: Locale;
  title: string;
  shortDescription?: string | null;
  description?: string | null;
  challengeText?: string | null;
  approachText?: string | null;
  resultText?: string | null;
  projectType?: string | null;
  duration?: string | null;
  surface?: string | null;
  completionDate?: string | null;
};

export type ProjectImage = {
  imageUrl: string;
  alt?: string | null;
  caption?: string | null;
  sortOrder: number;
  kind?: string | null;
};

export type ProjectRecord = {
  id: string | null;
  slug: string;
  category: string;
  location: string;
  year: number;
  featured: boolean;
  isPublished: boolean;
  sortOrder: number;
  coverImageUrl?: string | null;
  translations: ProjectTranslation[];
  images: ProjectImage[];
  hasStoredValue: boolean;
};

export type AssetRecord = {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  bucket: string;
  path: string;
  url: string;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type SettingRecord = {
  id: string | null;
  key: string;
  category: string;
  description?: string | null;
  valueJson: Record<string, unknown>;
  hasStoredValue: boolean;
  isKnownKey: boolean;
};

export type AvailabilityRule = {
  id?: string;
  dayOfWeek: number;
  timeSlots: string[];
  isActive: boolean;
};

export type AvailabilityException = {
  id: string;
  date: string;
  blockedTimes: string[];
  reason?: string | null;
};

export type PageOption = {
  key: string;
  previewPath: string;
};

export type AssetResponseMeta = {
  storageEnabled: boolean;
  uploadBucket: string;
};

export const locales: ReadonlyArray<{ value: Locale; label: string }> = [
  { value: 'nl', label: 'NL' },
  { value: 'fr', label: 'FR' },
  { value: 'en', label: 'EN' },
];

export const contentSchemaOptions: ReadonlyArray<{ value: ContentSchemaKey; label: string }> = [
  { value: 'hero', label: 'Hero' },
  { value: 'feature-list', label: 'Feature list' },
  { value: 'content', label: 'Content' },
  { value: 'contact', label: 'Contact' },
  { value: 'cta', label: 'CTA' },
  { value: 'legal', label: 'Legal' },
];

export const quoteStatusOptions = [
  'NEW',
  'CONTACTED',
  'SITE_VISIT',
  'QUOTE_SENT',
  'NEGOTIATING',
  'WON',
  'LOST',
  'CANCELLED',
] as const;

export const appointmentStatusOptions = [
  'PENDING',
  'CONFIRMED',
  'RESCHEDULED',
  'COMPLETED',
  'CANCELLED',
  'REJECTED',
  'NO_SHOW',
] as const;

export const weekdays = [
  'Zondag',
  'Maandag',
  'Dinsdag',
  'Woensdag',
  'Donderdag',
  'Vrijdag',
  'Zaterdag',
] as const;
