import ServiceDetailPage from '@/components/public/ServiceDetailPage';
import { BreadcrumbListJsonLd, ServiceJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import { getPathname, type Locale } from '@/i18n/routing';
import { getV2ServiceDetailContent } from '@/lib/v2/service-content';
import { isV2Locale } from '@/lib/v2/locale';

export const revalidate = 3600;

const HREF = '/diensten/afwerking' as const;

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
      nl: 'Afwerking in Gent | Schilderwerk, pleister, vloeren en meer',
      fr: 'Finitions à Gand | Peinture, plâtre, sols et plus',
      en: 'Finishing in Ghent | Painting, plaster, floors and more',
    },
    descriptions: {
      nl: 'Strakke afwerking voor jouw woning in Gent: pleisterwerk, schilderwerk, vloeren en maatwerk. Geleverd met oog voor detail.',
      fr: 'Finitions soignées pour votre maison à Gand : plâtre, peinture, sols et sur mesure. Livré avec souci du détail.',
      en: 'Crisp finishing for your home in Ghent: plastering, painting, floors and bespoke work. Delivered with attention to detail.',
    },
  });
}

export default async function AfwerkingPage({
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
      { href: HREF, label: { nl: 'Afwerking', fr: 'Finitions', en: 'Finishing' } },
    ],
  });

  const content = isV2Locale(locale) ? getV2ServiceDetailContent(locale) : null;
  const service = content?.afwerking;
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
      <ServiceDetailPage locale={locale} pageKey="service-finishing" />
    </>
  );
}
