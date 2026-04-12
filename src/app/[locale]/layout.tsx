import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import Footer from '@/components/public/Footer';
import Header from '@/components/public/Header';
import MarketingAnalytics from '@/components/public/MarketingAnalytics';
import { getV2SettingsMap } from '@/lib/v2/public-data';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getV2SettingsMap();
  const seo = (settings.seo as Record<string, unknown> | undefined) ?? {};
  const siteName = typeof seo.siteName === 'string' ? seo.siteName : 'Nam Construction';
  const siteUrl = typeof seo.siteUrl === 'string' ? seo.siteUrl : 'https://namconstruction.be';

  const titles: Record<string, string> = {
    nl: 'Nam Construction | Vakkundige Renovatie in Gent',
    fr: 'Nam Construction | Rénovation Experte à Gand',
    en: 'Nam Construction | Expert Renovation in Ghent',
  };

  const descriptions: Record<string, string> = {
    nl: 'Vakkundige renovatie in Gent met oog voor detail en duurzaamheid. Van totaalrenovatie tot afwerking.',
    fr: 'Rénovation experte à Gand avec attention aux détails et durabilité. De la rénovation complète aux finitions.',
    en: 'Expert renovation in Ghent with attention to detail and sustainability. From full renovation to finishing.',
  };

  const ogLocales: Record<string, string> = {
    nl: 'nl_BE',
    fr: 'fr_BE',
    en: 'en',
  };

  return {
    title: {
      default: titles[locale] || titles.nl,
      template: '%s | Nam Construction',
    },
    description: descriptions[locale] || descriptions.nl,
    openGraph: {
      type: 'website',
      locale: ogLocales[locale] || ogLocales.nl,
      url: siteUrl,
      siteName,
      title: titles[locale] || titles.nl,
      description: descriptions[locale] || descriptions.nl,
    },
    alternates: {
      canonical: locale === 'nl' ? siteUrl : `${siteUrl}/${locale}`,
      languages: {
        'nl': siteUrl,
        'fr': `${siteUrl}/fr`,
        'en': `${siteUrl}/en`,
        'x-default': siteUrl,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();
  const settings = await getV2SettingsMap();
  const company = (settings.company as Record<string, unknown> | undefined) ?? {};
  const analytics = (settings.analytics as Record<string, unknown> | undefined) ?? {};

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <div className="min-h-screen bg-noir-50 text-noir-900">
          <MarketingAnalytics gtmId={typeof analytics.gtmId === 'string' ? analytics.gtmId : null} />
          <Header locale={locale as 'nl' | 'fr' | 'en'} company={company} />
          <main>{children}</main>
          <Footer locale={locale as 'nl' | 'fr' | 'en'} company={company} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
