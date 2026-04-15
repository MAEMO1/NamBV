/**
 * Shared top-level service taxonomy used across the appointment and quote flows.
 *
 * The appointment wizard uses only this broad layer (single-select) since a sales
 * rep fleshes out the details during the consultation. The quote flow groups its
 * more granular services (badkamer, keuken, sanitair, vloeren, …) under these
 * same category ids — see `quote.serviceCategories` in `locale.ts`.
 *
 * Keeping the ids in one place prevents drift between the two flows.
 */
export const TOP_SERVICE_IDS = [
  'totaalrenovatie',
  'renovatie',
  'afwerking',
  'technieken',
  'anders',
] as const;

export type TopServiceId = (typeof TOP_SERVICE_IDS)[number];

export function isTopServiceId(value: string): value is TopServiceId {
  return (TOP_SERVICE_IDS as readonly string[]).includes(value);
}

/**
 * Maps granular quote-service slugs to the same top-level taxonomy that the
 * appointment flow uses. This lets the quote UI keep granular choices while the
 * visible grouping stays aligned with the appointment categories.
 */
export const QUOTE_SERVICE_TO_TOP_SERVICE_ID = {
  totaalrenovatie: 'totaalrenovatie',
  renovatie: 'renovatie',
  badkamer: 'renovatie',
  keuken: 'renovatie',
  toilet: 'renovatie',
  woonkamer: 'renovatie',
  slaapkamer: 'renovatie',
  'uitbouw-zolder': 'renovatie',
  afwerking: 'afwerking',
  vloeren: 'afwerking',
  schilderwerk: 'afwerking',
  technieken: 'technieken',
  elektriciteit: 'technieken',
  sanitair: 'technieken',
  anders: 'anders',
} as const satisfies Record<string, TopServiceId>;

export function getTopServiceIdForQuoteServiceSlug(serviceSlug: string): TopServiceId | null {
  if (serviceSlug in QUOTE_SERVICE_TO_TOP_SERVICE_ID) {
    return QUOTE_SERVICE_TO_TOP_SERVICE_ID[serviceSlug as keyof typeof QUOTE_SERVICE_TO_TOP_SERVICE_ID];
  }

  return isTopServiceId(serviceSlug) ? serviceSlug : null;
}
