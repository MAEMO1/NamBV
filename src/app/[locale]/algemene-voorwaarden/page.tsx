import PublicContentPage from '@/components/public/pages/PublicContentPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = '/algemene-voorwaarden' as const;

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
      nl: 'Algemene voorwaarden | Nam Construction',
      fr: 'Conditions générales | Nam Construction',
      en: 'Terms and conditions | Nam Construction',
    },
    descriptions: {
      nl: 'De algemene voorwaarden van Nam Construction voor offertes, opdrachten en uitvoering van renovatiewerken in België.',
      fr: 'Les conditions générales de Nam Construction pour devis, commandes et exécution de travaux de rénovation en Belgique.',
      en: 'The terms and conditions of Nam Construction for quotes, orders and renovation works executed in Belgium.',
    },
  });
}

export default async function AlgemeneVoorwaardenPage({
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
      { href: HREF, label: CRUMB_LABELS.terms },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicContentPage locale={locale} pageKey="terms" />
    </>
  );
}
