import { getPathname, locales, type Locale } from '@/i18n/routing';

// Href accepted by next-intl's getPathname — mirrors the signature used in
// src/app/sitemap.ts so per-locale translated pathnames stay consistent.
type Href =
  | Parameters<typeof getPathname>[0]['href'];

type BuildAlternatesInput = {
  href: Href;
  locale: Locale;
  siteUrl: string;
};

export type Alternates = {
  canonical: string;
  languages: Record<string, string>;
};

// hreflang tags need language-region codes. Keep this in sync with the
// HTML_LANG map in src/app/[locale]/layout.tsx.
const HREFLANG: Record<Locale, string> = {
  nl: 'nl-BE',
  fr: 'fr-BE',
  en: 'en',
};

const trimSlash = (value: string) => value.replace(/\/+$/, '');

function toAbsolute(siteUrl: string, pathname: string) {
  const base = trimSlash(siteUrl);
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

/**
 * Build canonical + hreflang alternates for a page. Uses `getPathname` from
 * next-intl so the per-locale translated pathnames (e.g. /diensten vs
 * /services) are respected.
 */
export function buildAlternates({ href, locale, siteUrl }: BuildAlternatesInput): Alternates {
  const canonical = toAbsolute(siteUrl, getPathname({ href, locale }));

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[HREFLANG[l]] = toAbsolute(siteUrl, getPathname({ href, locale: l }));
  }
  languages['x-default'] = toAbsolute(siteUrl, getPathname({ href, locale: 'nl' }));

  return { canonical, languages };
}
