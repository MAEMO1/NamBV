import ServiceDetailPage from '@/components/public/ServiceDetailPage';
import {
  BreadcrumbListJsonLd,
  FaqPageJsonLd,
  ServiceJsonLd,
} from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import { getPathname, type Locale } from '@/i18n/routing';
import { getV2ServiceDetailContent } from '@/lib/v2/service-content';
import { isV2Locale } from '@/lib/v2/locale';

export const revalidate = 3600;

const HREF = '/diensten/totaalrenovatie' as const;

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
      nl: 'Totaalrenovatie in Gent | Sleutel-op-de-deur renovatie',
      fr: 'Rénovation complète à Gand | Rénovation clé en main',
      en: 'Full renovation in Ghent | Turnkey renovation',
    },
    descriptions: {
      nl: 'Sleutel-op-de-deur totaalrenovatie in Gent: één aanspreekpunt, strak budget en transparant tijdspad. Bekijk onze aanpak en veelgestelde vragen.',
      fr: 'Rénovation complète clé en main à Gand : un seul interlocuteur, budget maîtrisé et planning transparent. Découvrez notre approche et FAQ.',
      en: 'Turnkey full renovation in Ghent: one point of contact, tight budget control and transparent timeline. Explore our approach and FAQ.',
    },
  });
}

export default async function TotaalrenovatiePage({
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
      { href: HREF, label: { nl: 'Totaalrenovatie', fr: 'Rénovation complète', en: 'Full renovation' } },
    ],
  });

  const content = isV2Locale(locale) ? getV2ServiceDetailContent(locale) : null;
  const service = content?.totaalrenovatie;
  const pageUrl = `${siteUrl}${getPathname({ href: HREF, locale })}`;

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      {service ? (
        <>
          <ServiceJsonLd
            name={service.title}
            description={service.description}
            url={pageUrl}
            providerUrl={siteUrl}
            locale={locale}
          />
          {service.faqs.length > 0 ? <FaqPageJsonLd faqs={service.faqs} /> : null}
        </>
      ) : null}
      <ServiceDetailPage locale={locale} pageKey="service-full-renovation" />
    </>
  );
}
