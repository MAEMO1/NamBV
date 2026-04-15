import ServiceDetailPage from '@/components/public/ServiceDetailPage';
import { BreadcrumbListJsonLd, ServiceJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import { getPathname, type Locale } from '@/i18n/routing';
import { getV2ServiceDetailContent } from '@/lib/v2/service-content';
import { isV2Locale } from '@/lib/v2/locale';

export const revalidate = 3600;

const HREF = '/diensten/renovatie' as const;

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
      nl: 'Renovatie in Gent | Gerichte verbouwingen en uitbreidingen',
      fr: 'Rénovation à Gand | Transformations et extensions ciblées',
      en: 'Renovation in Ghent | Targeted remodels and extensions',
    },
    descriptions: {
      nl: 'Gerichte renovatie in Gent: keuken, badkamer, uitbreidingen of energetische upgrades. Vakkundig uitgevoerd door Nam Construction.',
      fr: 'Rénovations ciblées à Gand : cuisine, salle de bain, extensions ou rénovations énergétiques. Exécution experte par Nam Construction.',
      en: 'Targeted renovations in Ghent: kitchen, bathroom, extensions or energy upgrades. Delivered with care by Nam Construction.',
    },
  });
}

export default async function RenovatiePage({
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
      { href: '/diensten', label: CRUMB_LABELS.services },
      { href: HREF, label: { nl: 'Renovatie', fr: 'Rénovation', en: 'Renovation' } },
    ],
  });

  const content = isV2Locale(locale) ? getV2ServiceDetailContent(locale) : null;
  const service = content?.renovatie;
  const pageUrl = `${siteUrl}${getPathname({ href: HREF, locale })}`;

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      {service ? (
        <ServiceJsonLd
          name={service.title}
          description={service.description}
          url={pageUrl}
          providerUrl={siteUrl}
          locale={locale}
        />
      ) : null}
      <ServiceDetailPage locale={locale} pageKey="service-renovation" />
    </>
  );
}
