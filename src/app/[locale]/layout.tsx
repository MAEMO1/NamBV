import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import Footer from '@/components/public/Footer';
import Header from '@/components/public/Header';
import MarketingAnalytics from '@/components/public/MarketingAnalytics';
import MobileStickyCta from '@/components/public/MobileStickyCta';
import { MobileMenuProvider } from '@/components/public/MobileMenuContext';
import { ConsentProvider } from '@/components/public/ConsentContext';
import { getV2SettingsMap } from '@/lib/v2/public-data';
import { dmSans, plusJakarta } from '@/lib/fonts';
import { LocalBusinessJsonLd, OrganizationJsonLd } from '@/components/seo/JsonLd';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const HTML_LANG: Record<string, string> = {
  nl: 'nl-BE',
  fr: 'fr-BE',
  en: 'en',
};

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

  const canonicalUrl = `${siteUrl}/${locale}`;
  const title = titles[locale] || titles.nl;
  const description = descriptions[locale] || descriptions.nl;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: '%s | Nam Construction',
    },
    description,
    openGraph: {
      type: 'website',
      locale: ogLocales[locale] || ogLocales.nl,
      url: canonicalUrl,
      siteName,
      title,
      description,
      // images are auto-resolved from src/app/[locale]/opengraph-image.tsx
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // images auto-resolved from src/app/[locale]/twitter-image.tsx
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'nl-BE': `${siteUrl}/nl`,
        'fr-BE': `${siteUrl}/fr`,
        en: `${siteUrl}/en`,
        'x-default': `${siteUrl}/nl`,
      },
    },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      apple: '/favicon.svg',
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
  const companyLegal = (settings.companyLegal as Record<string, unknown> | undefined) ?? {};
  const analytics = (settings.analytics as Record<string, unknown> | undefined) ?? {};
  const seo = (settings.seo as Record<string, unknown> | undefined) ?? {};
  const siteUrl = (typeof seo.siteUrl === 'string' ? seo.siteUrl : 'https://namconstruction.be').replace(/\/+$/, '');

  // Narrow settings maps to the primitive-string shape the JSON-LD helpers expect.
  const companyForLd = {
    name: typeof company.name === 'string' ? company.name : undefined,
    phone: typeof company.phone === 'string' ? company.phone : undefined,
    email: typeof company.email === 'string' ? company.email : undefined,
    address: typeof company.address === 'string' ? company.address : undefined,
    instagram: typeof company.instagram === 'string' ? company.instagram : undefined,
    whatsapp: typeof company.whatsapp === 'string' ? company.whatsapp : undefined,
  };
  const legalForLd = {
    legalName: typeof companyLegal.legalName === 'string' ? companyLegal.legalName : undefined,
    vatNumber: typeof companyLegal.vatNumber === 'string' ? companyLegal.vatNumber : undefined,
    enterpriseNumber: typeof companyLegal.enterpriseNumber === 'string' ? companyLegal.enterpriseNumber : undefined,
    foundedDate: typeof companyLegal.foundedDate === 'string' ? companyLegal.foundedDate : undefined,
    registeredSeat: typeof companyLegal.registeredSeat === 'string' ? companyLegal.registeredSeat : undefined,
  };

  return (
    <html lang={HTML_LANG[locale] || 'nl-BE'} className={`${dmSans.variable} ${plusJakarta.variable}`}>
      <body className="font-sans">
        <OrganizationJsonLd company={companyForLd} legal={legalForLd} siteUrl={siteUrl} />
        <LocalBusinessJsonLd company={companyForLd} legal={legalForLd} siteUrl={siteUrl} />
        <NextIntlClientProvider messages={messages}>
          <ConsentProvider>
            <MobileMenuProvider>
              <div className="min-h-screen bg-white text-noir-900">
                <MarketingAnalytics gtmId={typeof analytics.gtmId === 'string' ? analytics.gtmId : null} />
                <Header locale={locale as 'nl' | 'fr' | 'en'} company={company} />
                <main>{children}</main>
                <Footer locale={locale as 'nl' | 'fr' | 'en'} company={company} />
                <MobileStickyCta
                  locale={locale as 'nl' | 'fr' | 'en'}
                  phone={typeof company.phone === 'string' ? company.phone : null}
                />
              </div>
            </MobileMenuProvider>
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
