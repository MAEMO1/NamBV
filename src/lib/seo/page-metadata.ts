import type { Metadata } from 'next';
import { buildAlternates } from './alternates';
import { getV2SettingsMap } from '@/lib/v2/public-data';
import { locales, type Locale } from '@/i18n/routing';
import type { getPathname } from '@/i18n/routing';

type Href = Parameters<typeof getPathname>[0]['href'];

const OG_LOCALES: Record<Locale, string> = {
  nl: 'nl_BE',
  fr: 'fr_BE',
  en: 'en',
};

export type LocalizedString = Partial<Record<Locale, string>> & { nl: string };

type BuildPageMetadataInput = {
  href: Href;
  locale: Locale;
  titles: LocalizedString;
  descriptions: LocalizedString;
  /**
   * Optional absolute or root-relative URL to an OG image specific to this
   * page. When omitted, Next auto-resolves the nearest `opengraph-image.tsx`
   * in the route segment — which for all public pages is the locale-level
   * default at `src/app/[locale]/opengraph-image.tsx`.
   */
  image?: { url: string; width?: number; height?: number; alt?: string };
};

export function pickLocalized(str: LocalizedString, locale: Locale): string {
  return str[locale] ?? str.nl;
}

export async function buildPageMetadata({
  href,
  locale,
  titles,
  descriptions,
  image,
}: BuildPageMetadataInput): Promise<Metadata> {
  const settings = await getV2SettingsMap();
  const seo = (settings.seo as Record<string, unknown> | undefined) ?? {};
  const siteName = typeof seo.siteName === 'string' ? seo.siteName : 'Nam Construction';
  const siteUrl = typeof seo.siteUrl === 'string' ? seo.siteUrl : 'https://namconstruction.be';

  if (!locales.includes(locale)) {
    // Shouldn't happen given middleware guards, but fall back to NL to avoid
    // throwing during metadata generation.
    locale = 'nl';
  }

  const alternates = buildAlternates({ href, locale, siteUrl });
  const title = pickLocalized(titles, locale);
  const description = pickLocalized(descriptions, locale);

  return {
    title,
    description,
    alternates,
    openGraph: {
      type: 'website',
      locale: OG_LOCALES[locale],
      url: alternates.canonical,
      siteName,
      title,
      description,
      ...(image
        ? {
            images: [
              {
                url: image.url,
                width: image.width ?? 1200,
                height: image.height ?? 630,
                alt: image.alt ?? title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}
