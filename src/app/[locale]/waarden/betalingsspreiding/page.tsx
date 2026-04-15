import PublicContentPage from '@/components/public/pages/PublicContentPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = { pathname: '/waarden/[value]', params: { value: 'betalingsspreiding' } } as const;

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
      nl: 'Betalingsspreiding | Nam Construction',
      fr: 'Paiement échelonné | Nam Construction',
      en: 'Staged payments | Nam Construction',
    },
    descriptions: {
      nl: 'Bij Nam Construction betaal je in duidelijke schijven volgens de voortgang van de werf. Transparant, voorspelbaar en vertrouwd.',
      fr: 'Chez Nam Construction, vous payez par tranches claires en fonction de l’avancement du chantier. Transparent, prévisible, fiable.',
      en: 'At Nam Construction you pay in clear tranches tied to site progress. Transparent, predictable and dependable.',
    },
  });
}

export default async function BetalingsspreidingPage({
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
      { href: HREF, label: { nl: 'Betalingsspreiding', fr: 'Paiement échelonné', en: 'Staged payments' } },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicContentPage locale={locale} pageKey="value-payment-spread" />
    </>
  );
}
