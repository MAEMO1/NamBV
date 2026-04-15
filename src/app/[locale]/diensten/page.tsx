import ServicesOverviewPage from '@/components/public/ServicesOverviewPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = '/diensten' as const;

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
      nl: 'Onze diensten | Totaalrenovatie, renovatie, afwerking en technieken',
      fr: 'Nos services | Rénovation complète, rénovation, finitions et techniques',
      en: 'Our services | Full renovation, renovation, finishing and technical works',
    },
    descriptions: {
      nl: 'Ontdek de diensten van Nam Construction: totaalrenovaties, renovaties, afwerking en technieken. Altijd maatwerk, afgestemd op jouw woning in Gent.',
      fr: 'Découvrez les services de Nam Construction : rénovations complètes, rénovations, finitions et techniques. Toujours sur mesure, pour votre maison à Gand.',
      en: 'Explore Nam Construction services: full renovations, renovations, finishing and technical works. Tailored to your home in Ghent.',
    },
  });
}

export default async function DienstenPage({
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
      { href: HREF, label: CRUMB_LABELS.services },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <ServicesOverviewPage locale={locale} />
    </>
  );
}
