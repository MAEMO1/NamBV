import { getPathname, type Locale } from '@/i18n/routing';
import type { BreadcrumbItem } from '@/components/seo/JsonLd';

type Href = Parameters<typeof getPathname>[0]['href'];

type LocalizedLabel = Partial<Record<Locale, string>> & { nl: string };

type Crumb = {
  href: Href;
  label: LocalizedLabel;
};

const trimSlash = (value: string) => value.replace(/\/+$/, '');

// Common labels used across many pages. Centralising them avoids per-page
// duplication of translations.
export const CRUMB_LABELS = {
  home: { nl: 'Home', fr: 'Accueil', en: 'Home' },
  services: { nl: 'Diensten', fr: 'Services', en: 'Services' },
  projects: { nl: 'Projecten', fr: 'Projets', en: 'Projects' },
  approach: { nl: 'Aanpak', fr: 'Approche', en: 'Approach' },
  appointment: { nl: 'Afspraak', fr: 'Rendez-vous', en: 'Appointment' },
  quote: { nl: 'Offerte', fr: 'Devis', en: 'Quote' },
  contact: { nl: 'Contact', fr: 'Contact', en: 'Contact' },
  privacy: { nl: 'Privacy', fr: 'Confidentialité', en: 'Privacy' },
  terms: { nl: 'Algemene voorwaarden', fr: 'Conditions générales', en: 'Terms and conditions' },
  values: { nl: 'Waarden', fr: 'Valeurs', en: 'Values' },
} satisfies Record<string, LocalizedLabel>;

export function buildBreadcrumbs({
  crumbs,
  locale,
  siteUrl,
}: {
  crumbs: Crumb[];
  locale: Locale;
  siteUrl: string;
}): BreadcrumbItem[] {
  const base = trimSlash(siteUrl);
  return crumbs.map(({ href, label }) => ({
    name: label[locale] ?? label.nl,
    url: `${base}${getPathname({ href, locale })}`,
  }));
}
