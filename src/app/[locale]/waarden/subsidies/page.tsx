import PublicContentPage from '@/components/public/pages/PublicContentPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = { pathname: '/waarden/[value]', params: { value: 'subsidies' } } as const;

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
      nl: 'Subsidies & premies | Nam Construction',
      fr: 'Subsides & primes | Nam Construction',
      en: 'Subsidies & grants | Nam Construction',
    },
    descriptions: {
      nl: 'Welke premies en subsidies zijn er voor je renovatie in Vlaanderen? Nam Construction begeleidt je bij de aanvraag en documentatie.',
      fr: 'Quelles primes et subsides pour votre rénovation en Flandre ? Nam Construction vous accompagne dans la demande et la documentation.',
      en: 'Which grants and premiums apply to your Flemish renovation? Nam Construction guides you through the application and paperwork.',
    },
  });
}

export default async function SubsidiesPage({
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
      { href: '/aanpak', label: CRUMB_LABELS.approach },
      { href: HREF, label: { nl: 'Subsidies', fr: 'Subsides', en: 'Subsidies' } },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicContentPage locale={locale} pageKey="value-subsidies" />
    </>
  );
}
