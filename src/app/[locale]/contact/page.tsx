import PublicContentPage from '@/components/public/pages/PublicContentPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = '/contact' as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    href: HREF,
    locale,
    titles: {
      nl: 'Contact | Bereik Nam Construction in Gent',
      fr: 'Contact | Joindre Nam Construction à Gand',
      en: 'Contact | Reach Nam Construction in Ghent',
    },
    descriptions: {
      nl: 'Neem contact op met Nam Construction in Gent. Mail, bel of vul het contactformulier in — we reageren snel.',
      fr: 'Contactez Nam Construction à Gand. Email, téléphone ou formulaire — nous répondons rapidement.',
      en: 'Get in touch with Nam Construction in Ghent. Email, phone or contact form — we reply quickly.',
    },
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const siteUrl = await getSiteUrl();
  const crumbs = buildBreadcrumbs({
    locale,
    siteUrl,
    crumbs: [
      { href: '/', label: CRUMB_LABELS.home },
      { href: HREF, label: CRUMB_LABELS.contact },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicContentPage locale={locale} pageKey="contact" />
    </>
  );
}
