import ServiceDetailPage from '@/components/public/ServiceDetailPage';
import { BreadcrumbListJsonLd, ServiceJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import { getPathname, type Locale } from '@/i18n/routing';
import { getV2ServiceDetailContent } from '@/lib/v2/service-content';
import { isV2Locale } from '@/lib/v2/locale';

export const revalidate = 3600;

const HREF = '/diensten/technieken' as const;

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
      nl: 'Technieken in Gent | Elektriciteit, sanitair, ventilatie en HVAC',
      fr: 'Techniques à Gand | Électricité, sanitaire, ventilation et CVC',
      en: 'Technical works in Ghent | Electrics, plumbing, ventilation and HVAC',
    },
    descriptions: {
      nl: 'Technieken voor je renovatie in Gent: elektriciteit, sanitair, ventilatie en HVAC. Veilig, conform en gecertificeerd uitgevoerd.',
      fr: 'Techniques pour votre rénovation à Gand : électricité, sanitaire, ventilation et CVC. Exécution sûre, conforme et certifiée.',
      en: 'Technical works for your Ghent renovation: electrics, plumbing, ventilation and HVAC. Delivered safely, compliantly and certified.',
    },
  });
}

export default async function TechniekenPage({
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
      { href: HREF, label: { nl: 'Technieken', fr: 'Techniques', en: 'Technical works' } },
    ],
  });

  const content = isV2Locale(locale) ? getV2ServiceDetailContent(locale) : null;
  const service = content?.technieken;
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
      <ServiceDetailPage locale={locale} pageKey="service-technical" />
    </>
  );
}
