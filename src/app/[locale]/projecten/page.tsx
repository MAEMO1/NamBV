import PublicProjectsPage from '@/components/public/pages/PublicProjectsPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = '/projecten' as const;

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
      nl: 'Projecten | Renovatieprojecten in Gent en omstreken',
      fr: 'Projets | Projets de rénovation à Gand et environs',
      en: 'Projects | Renovation projects in Ghent and surroundings',
    },
    descriptions: {
      nl: 'Ontdek uitgevoerde renovatieprojecten van Nam Construction: totaalrenovaties, afwerking en technische realisaties in Gent.',
      fr: 'Découvrez les projets de rénovation réalisés par Nam Construction : rénovations complètes, finitions et réalisations techniques à Gand.',
      en: 'Browse completed renovation projects by Nam Construction: full renovations, finishings and technical realisations in Ghent.',
    },
  });
}

export default async function ProjectenPage({
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
      { href: HREF, label: CRUMB_LABELS.projects },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicProjectsPage locale={locale} />
    </>
  );
}
