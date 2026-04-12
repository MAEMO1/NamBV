import type { MetadataRoute } from 'next';
import { getV2SettingsMap } from '@/lib/v2/public-data';

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

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin', '/admin-v2', '/v2/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
