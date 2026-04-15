import PublicContentPage from '@/components/public/pages/PublicContentPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = { pathname: '/waarden/[value]', params: { value: 'communicatie' } } as const;

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
      nl: 'Communicatie | Nam Construction',
      fr: 'Communication | Nam Construction',
      en: 'Communication | Nam Construction',
    },
    descriptions: {
      nl: 'Duidelijke en snelle communicatie tijdens je renovatie: vast aanspreekpunt, regelmatige updates en geen verrassingen.',
      fr: 'Communication claire et rapide pendant votre rénovation : un interlocuteur unique, des mises à jour régulières, sans surprise.',
      en: 'Clear and responsive communication during your renovation: single point of contact, regular updates and no surprises.',
    },
  });
}

export default async function CommunicatiePage({
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
      { href: HREF, label: { nl: 'Communicatie', fr: 'Communication', en: 'Communication' } },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicContentPage locale={locale} pageKey="value-communication" />
    </>
  );
}
