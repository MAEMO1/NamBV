import PublicContentPage from '@/components/public/pages/PublicContentPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = '/aanpak' as const;

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
      nl: 'Onze aanpak | Zo werkt Nam Construction aan jouw renovatie',
      fr: 'Notre approche | Comment Nam Construction réalise votre rénovation',
      en: 'Our approach | How Nam Construction delivers your renovation',
    },
    descriptions: {
      nl: 'Van intake tot oplevering: ontdek de stapsgewijze aanpak van Nam Construction voor transparante en stressvrije renovaties in Gent.',
      fr: 'De l’analyse à la livraison : découvrez l’approche étape par étape de Nam Construction pour des rénovations transparentes et sereines à Gand.',
      en: 'From intake to handover: discover Nam Construction’s step-by-step approach for transparent, stress-free renovations in Ghent.',
    },
  });
}

export default async function AanpakPage({
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
      { href: HREF, label: CRUMB_LABELS.approach },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicContentPage locale={locale} pageKey="approach" />
    </>
  );
}
