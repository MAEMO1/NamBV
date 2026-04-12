import type { MetadataRoute } from 'next';
import { getPathname, locales } from '@/i18n/routing';
import { getV2Projects, getV2SettingsMap } from '@/lib/v2/public-data';

const staticRoutes = [
  '/',
  '/diensten',
  '/diensten/totaalrenovatie',
  '/diensten/renovatie',
  '/diensten/afwerking',
  '/diensten/technieken',
  '/projecten',
  '/aanpak',
  '/afspraak',
  '/offerte',
  '/contact',
  '/privacy',
  '/algemene-voorwaarden',
] as const;

const valueRoutes = [
  'attestering',
  'betalingsspreiding',
  'communicatie',
  'hergebruik',
  'subsidies',
] as const;

async function getSiteUrl() {
  try {
    const settings = await getV2SettingsMap();
    const seo = (settings.seo as Record<string, unknown> | undefined) ?? {};
    const siteUrl = typeof seo.siteUrl === 'string' ? seo.siteUrl : 'https://namconstruction.be';
    return siteUrl.replace(/\/+$/, '');
  } catch {
    return 'https://namconstruction.be';
  }
}

function toAbsoluteUrl(siteUrl: string, pathname: string) {
  return new URL(pathname, `${siteUrl}/`).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of locales) {
    for (const href of staticRoutes) {
      entries.push({
        url: toAbsoluteUrl(siteUrl, getPathname({ href, locale })),
        lastModified: now,
      });
    }

    for (const value of valueRoutes) {
      entries.push({
        url: toAbsoluteUrl(
          siteUrl,
          getPathname({
            href: { pathname: '/waarden/[value]', params: { value } },
            locale,
          }),
        ),
        lastModified: now,
      });
    }

    const projects = await getV2Projects(locale);
    for (const project of projects) {
      entries.push({
        url: toAbsoluteUrl(
          siteUrl,
          getPathname({
            href: { pathname: '/projecten/[slug]', params: { slug: project.slug } },
            locale,
          }),
        ),
        lastModified: now,
      });
    }
  }

  return entries;
}
