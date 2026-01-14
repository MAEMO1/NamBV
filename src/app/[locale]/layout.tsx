import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header, Footer, Analytics } from '@/components';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

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
      url: 'https://namconstruction.be',
      siteName: 'Nam Construction',
      title: titles[locale] || titles.nl,
      description: descriptions[locale] || descriptions.nl,
    },
    alternates: {
      canonical: locale === 'nl' ? 'https://namconstruction.be' : `https://namconstruction.be/${locale}`,
      languages: {
        'nl': 'https://namconstruction.be',
        'fr': 'https://namconstruction.be/fr',
        'en': 'https://namconstruction.be/en',
        'x-default': 'https://namconstruction.be',
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

  return (
    <>
      {/* Subtle noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <NextIntlClientProvider messages={messages}>
        <Analytics>
          <Header />
          <main>{children}</main>
          <Footer />
        </Analytics>
      </NextIntlClientProvider>
    </>
  );
}
