import { z } from 'zod';
import { BudgetRangeSchema, QuoteStatusSchema } from '@/lib/validations/quote';
import { V2_LOCALES } from './locale';

const v2LocaleSchema = z.enum(V2_LOCALES);

const emailSchema = z
  .string()
  .min(1)
  .email()
  .transform((value) => value.toLowerCase().trim());

const phoneSchema = z
  .string()
  .min(1)
  .transform((value) => value.replace(/\s+/g, ''))
  .refine((value) => /^(\+32|0)\d{8,9}$/.test(value), {
    message: 'Invalid Belgian phone number',
  });

export const v2AdminLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
});

export const v2QuoteCreateSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: emailSchema,
  phone: phoneSchema,
  postalCode: z.string().regex(/^\d{4}$/),
  city: z.string().max(100).optional().or(z.literal('')),
  propertyTypeId: z.string().min(1),
  serviceTypeIds: z.array(z.string()).min(1),
  description: z.string().min(20).max(5000),
  preferredStart: z.string().max(100).optional().or(z.literal('')),
  budgetRange: BudgetRangeSchema.optional(),
  gdprConsent: z.literal(true),
});

export const v2QuoteUpdateSchema = z.object({
  status: QuoteStatusSchema.optional(),
  adminNotes: z.string().max(5000).nullable().optional(),
});

export const v2AppointmentCreateSchema = z.object({
  name: z.string().min(2).max(100),
  email: emailSchema,
  phone: phoneSchema,
  gemeente: z.string().min(2).max(120),
  selectedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  selectedTime: z.string().regex(/^\d{2}:\d{2}$/),
  projectType: z.string().max(100).optional().or(z.literal('')),
  propertyType: z.string().max(100).optional().or(z.literal('')),
  propertyAge: z.string().max(100).optional().or(z.literal('')),
  priorities: z.array(z.string()).default([]),
  materialPreference: z.string().max(100).optional().or(z.literal('')),
  budget: z.string().max(100).optional().or(z.literal('')),
  timing: z.string().max(100).optional().or(z.literal('')),
  subsidyInterest: z.boolean().default(false),
  paymentSpread: z.boolean().default(false),
  motivation: z.string().max(2000).optional().or(z.literal('')),
  message: z.string().max(5000).optional().or(z.literal('')),
});

export const v2AppointmentUpdateSchema = z.object({
  status: z.enum([
    'PENDING',
    'CONFIRMED',
    'RESCHEDULED',
    'COMPLETED',
    'CANCELLED',
    'REJECTED',
    'NO_SHOW',
  ]),
  adminNotes: z.string().max(5000).nullable().optional(),
  proposedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  proposedTime: z.string().regex(/^\d{2}:\d{2}$/).nullable().optional(),
});

export const v2PageSectionSchema = z.object({
  id: z.string().optional(),
  pageKey: z.string().min(1).max(100),
  sectionKey: z.string().min(1).max(100),
  locale: v2LocaleSchema,
  schemaKey: z.string().min(1).max(100),
  displayOrder: z.number().int().min(0).default(0),
  published: z.boolean().default(true),
  dataJson: z.record(z.string(), z.any()),
});

export const v2AssetSchema = z.object({
  id: z.string().optional(),
  filename: z.string().min(1),
  originalName: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().int().min(0),
  bucket: z.string().min(1).default('project-photos'),
  path: z.string().min(1),
  url: z.string().url(),
  alt: z.string().max(255).nullable().optional(),
  width: z.number().int().nullable().optional(),
  height: z.number().int().nullable().optional(),
  tags: z.array(z.string()).default([]),
});

export const v2ProjectTranslationSchema = z.object({
  locale: v2LocaleSchema,
  title: z.string().min(1),
  shortDescription: z.string().max(500).optional().nullable(),
  description: z.string().max(10000).optional().nullable(),
  challengeText: z.string().max(10000).optional().nullable(),
  approachText: z.string().max(10000).optional().nullable(),
  resultText: z.string().max(10000).optional().nullable(),
  projectType: z.string().max(100).optional().nullable(),
  duration: z.string().max(100).optional().nullable(),
  surface: z.string().max(100).optional().nullable(),
  completionDate: z.string().max(100).optional().nullable(),
});

export const v2ProjectImageSchema = z.object({
  imageUrl: z.string().url(),
  alt: z.string().max(255).optional().nullable(),
  caption: z.string().max(500).optional().nullable(),
  sortOrder: z.number().int().min(0),
  kind: z.string().max(50).optional().nullable(),
});

export const v2ProjectSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  category: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  year: z.number().int().min(2000).max(2100),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  coverImageUrl: z.string().url().optional().nullable(),
  translations: z.array(v2ProjectTranslationSchema).min(1),
  images: z.array(v2ProjectImageSchema).default([]),
});

export const v2SiteSettingSchema = z.object({
  id: z.string().optional(),
  key: z.string().min(1).max(120),
  category: z.string().min(1).max(120),
  description: z.string().max(500).optional().nullable(),
  valueJson: z.any(),
});

export const v2AvailabilityRuleSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  timeSlots: z.array(z.string().regex(/^\d{2}:\d{2}$/)),
  isActive: z.boolean(),
});

export const v2AvailabilityExceptionSchema = z.object({
  id: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  blockedTimes: z.array(z.string().regex(/^\d{2}:\d{2}$/)).default([]),
  reason: z.string().max(255).optional().nullable(),
});

export const v2AvailabilityPayloadSchema = z.object({
  rules: z.array(v2AvailabilityRuleSchema),
  exceptions: z.array(v2AvailabilityExceptionSchema).default([]),
});

export type V2QuoteCreateInput = z.infer<typeof v2QuoteCreateSchema>;
export type V2AppointmentCreateInput = z.infer<typeof v2AppointmentCreateSchema>;
export type V2ProjectInput = z.infer<typeof v2ProjectSchema>;
export type V2PageSectionInput = z.infer<typeof v2PageSectionSchema>;
export type V2AssetInput = z.infer<typeof v2AssetSchema>;
export type V2SiteSettingInput = z.infer<typeof v2SiteSettingSchema>;
