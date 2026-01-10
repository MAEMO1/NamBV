import { z } from 'zod'

// ============================================================================
// ENUMS (mirror Prisma enums)
// ============================================================================

export const QuoteStatusSchema = z.enum([
  'NEW',
  'CONTACTED',
  'SITE_VISIT',
  'QUOTE_SENT',
  'NEGOTIATING',
  'WON',
  'LOST',
  'CANCELLED'
])

export const BudgetRangeSchema = z.enum([
  'UNDER_10K',
  'RANGE_10K_25K',
  'RANGE_25K_50K',
  'RANGE_50K_100K',
  'OVER_100K',
  'UNKNOWN'
])

export const UserRoleSchema = z.enum(['SUPERADMIN', 'ADMIN'])

// ============================================================================
// SHARED FIELD SCHEMAS
// ============================================================================

const belgianPostalCode = z
  .string()
  .min(1, 'Postcode is verplicht')
  .regex(/^\d{4}$/, 'Ongeldige Belgische postcode (4 cijfers)')

const belgianPhone = z
  .string()
  .min(1, 'Telefoonnummer is verplicht')
  .regex(
    /^(\+32|0)\d{8,9}$/,
    'Ongeldig telefoonnummer (gebruik +32 of 0 formaat)'
  )
  .transform((val) => val.replace(/\s/g, '')) // Remove spaces

const email = z
  .string()
  .min(1, 'E-mailadres is verplicht')
  .email('Ongeldig e-mailadres')
  .toLowerCase()

// ============================================================================
// QUOTE REQUEST - Customer form submission
// ============================================================================

export const QuoteRequestInputSchema = z.object({
  // Contact info
  fullName: z
    .string()
    .min(1, 'Naam is verplicht')
    .min(2, 'Naam moet minimaal 2 karakters zijn')
    .max(100, 'Naam is te lang'),
  email: email,
  phone: belgianPhone,
  postalCode: belgianPostalCode,
  city: z.string().optional(),
  streetAddress: z.string().max(255).optional(),

  // Project details
  propertyTypeId: z.string().min(1, 'Selecteer uw woningtype'),
  serviceTypeIds: z
    .array(z.string())
    .min(1, 'Selecteer minimaal één type renovatie'),
  description: z
    .string()
    .min(1, 'Omschrijving is verplicht')
    .min(20, 'Geef minimaal 20 karakters omschrijving')
    .max(5000, 'Omschrijving is te lang'),
  preferredStart: z.string().max(100).optional(),
  budgetRange: BudgetRangeSchema.optional(),

  // Consent
  gdprConsent: z.literal(true, {
    errorMap: () => ({ message: 'U moet akkoord gaan met de privacyverklaring' })
  })
})

export type QuoteRequestInput = z.infer<typeof QuoteRequestInputSchema>

// ============================================================================
// QUOTE REQUEST - Admin update
// ============================================================================

export const QuoteUpdateSchema = z.object({
  status: QuoteStatusSchema.optional(),
  assignedToId: z.string().nullable().optional(),
  city: z.string().max(100).optional(),
  streetAddress: z.string().max(255).optional()
})

export type QuoteUpdate = z.infer<typeof QuoteUpdateSchema>

// ============================================================================
// QUOTE NOTE - Admin internal notes
// ============================================================================

export const QuoteNoteSchema = z.object({
  content: z
    .string()
    .min(1, 'Notitie mag niet leeg zijn')
    .max(10000, 'Notitie is te lang')
})

export type QuoteNoteInput = z.infer<typeof QuoteNoteSchema>

// ============================================================================
// STATUS CHANGE - With optional reason
// ============================================================================

export const StatusChangeSchema = z.object({
  status: QuoteStatusSchema,
  reason: z.string().max(1000).optional()
})

export type StatusChangeInput = z.infer<typeof StatusChangeSchema>

// ============================================================================
// SERVICE TYPE - Admin CRUD
// ============================================================================

export const ServiceTypeSchema = z.object({
  name: z
    .string()
    .min(1, 'Naam is verplicht')
    .max(100, 'Naam is te lang'),
  slug: z
    .string()
    .min(1, 'Slug is verplicht')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug mag alleen kleine letters, cijfers en koppeltekens bevatten'),
  description: z.string().max(500).optional(),
  icon: z.string().max(50).optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0)
})

export type ServiceTypeInput = z.infer<typeof ServiceTypeSchema>

// ============================================================================
// USER - Admin management
// ============================================================================

export const UserCreateSchema = z.object({
  email: email,
  password: z
    .string()
    .min(8, 'Wachtwoord moet minimaal 8 karakters zijn')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Wachtwoord moet een hoofdletter, kleine letter en cijfer bevatten'
    ),
  fullName: z
    .string()
    .min(2, 'Naam moet minimaal 2 karakters zijn')
    .max(100),
  role: UserRoleSchema.default('ADMIN')
})

export type UserCreateInput = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = z.object({
  email: email.optional(),
  fullName: z.string().min(2).max(100).optional(),
  role: UserRoleSchema.optional(),
  isActive: z.boolean().optional()
})

export type UserUpdateInput = z.infer<typeof UserUpdateSchema>

// ============================================================================
// QUERY PARAMS - For list endpoints
// ============================================================================

export const QuoteQuerySchema = z.object({
  status: QuoteStatusSchema.optional(),
  assignedToId: z.string().optional(),
  postalCode: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sortBy: z.enum(['createdAt', 'updatedAt', 'referenceNumber']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  includeDeleted: z.coerce.boolean().default(false)
})

export type QuoteQuery = z.infer<typeof QuoteQuerySchema>

// ============================================================================
// FORM STEP VALIDATION - For multi-step form
// ============================================================================

export const Step1Schema = QuoteRequestInputSchema.pick({
  serviceTypeIds: true,
  propertyTypeId: true
})

export const Step2Schema = QuoteRequestInputSchema.pick({
  description: true,
  preferredStart: true,
  budgetRange: true
})

export const Step3Schema = QuoteRequestInputSchema.pick({
  fullName: true,
  email: true,
  phone: true,
  postalCode: true
})

export const Step4Schema = QuoteRequestInputSchema.pick({
  gdprConsent: true
})

// ============================================================================
// HELPER: Budget range labels (Dutch)
// ============================================================================

export const budgetRangeLabels: Record<z.infer<typeof BudgetRangeSchema>, string> = {
  UNDER_10K: '< €10.000',
  RANGE_10K_25K: '€10.000 - €25.000',
  RANGE_25K_50K: '€25.000 - €50.000',
  RANGE_50K_100K: '€50.000 - €100.000',
  OVER_100K: '> €100.000',
  UNKNOWN: 'Nog geen idee'
}

// ============================================================================
// HELPER: Status labels and colors (Dutch)
// ============================================================================

export const statusConfig: Record<
  z.infer<typeof QuoteStatusSchema>,
  { label: string; color: string; bg: string }
> = {
  NEW: { label: 'Nieuw', color: '#3b82f6', bg: '#eff6ff' },
  CONTACTED: { label: 'Gecontacteerd', color: '#8b5cf6', bg: '#f5f3ff' },
  SITE_VISIT: { label: 'Plaatsbezoek', color: '#f59e0b', bg: '#fffbeb' },
  QUOTE_SENT: { label: 'Offerte verstuurd', color: '#06b6d4', bg: '#ecfeff' },
  NEGOTIATING: { label: 'In onderhandeling', color: '#ec4899', bg: '#fdf2f8' },
  WON: { label: 'Gewonnen', color: '#10b981', bg: '#ecfdf5' },
  LOST: { label: 'Verloren', color: '#ef4444', bg: '#fef2f2' },
  CANCELLED: { label: 'Geannuleerd', color: '#6b7280', bg: '#f3f4f6' }
}
