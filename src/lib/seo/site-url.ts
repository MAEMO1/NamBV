import { getV2SettingsMap } from '@/lib/v2/public-data';

/**
 * Fetch the site origin from settings, trimmed of trailing slashes, with a
 * safe production fallback. This mirrors the helper already used in
 * src/app/sitemap.ts and src/app/robots.ts.
 */
export async function getSiteUrl(): Promise<string> {
  try {
    const settings = await getV2SettingsMap();
    const seo = (settings.seo as Record<string, unknown> | undefined) ?? {};
    const siteUrl = typeof seo.siteUrl === 'string' ? seo.siteUrl : 'https://namconstruction.be';
    return siteUrl.replace(/\/+$/, '');
  } catch {
    return 'https://namconstruction.be';
  }
}
