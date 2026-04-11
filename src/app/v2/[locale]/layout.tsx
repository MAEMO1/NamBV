import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import V2Header from '@/components/v2/Header';
import V2Footer from '@/components/v2/Footer';
import MarketingAnalytics from '@/components/v2/MarketingAnalytics';
import { getV2SettingsMap } from '@/lib/v2/public-data';
import { isV2Locale, type V2Locale } from '@/lib/v2/locale';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isV2Locale(locale)) {
    return {};
  }

  return {
    title: `v2 Preview (${locale.toUpperCase()}) | Nam Construction`,
    description: 'Parallelle v2-preview voor de herbouw van Nam Construction.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function V2LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isV2Locale(locale)) {
    notFound();
  }

  const settings = await getV2SettingsMap();
  const company = (settings.company as Record<string, unknown> | undefined) ?? {};
  const analytics = (settings.analytics as Record<string, unknown> | undefined) ?? {};

  return (
    <div className="min-h-screen bg-noir-50 text-noir-900">
      <MarketingAnalytics gtmId={typeof analytics.gtmId === 'string' ? analytics.gtmId : null} />
      <V2Header locale={locale as V2Locale} company={company} />
      <main>{children}</main>
      <V2Footer locale={locale as V2Locale} company={company} />
    </div>
  );
}
