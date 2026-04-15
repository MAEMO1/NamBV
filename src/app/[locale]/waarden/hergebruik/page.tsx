import PublicContentPage from '@/components/public/pages/PublicContentPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = { pathname: '/waarden/[value]', params: { value: 'hergebruik' } } as const;

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
      nl: 'Hergebruik & duurzaamheid | Nam Construction',
      fr: 'Réemploi & durabilité | Nam Construction',
      en: 'Reuse & sustainability | Nam Construction',
    },
    descriptions: {
      nl: 'Duurzaam renoveren: materialen hergebruiken waar mogelijk, afval beperken en bewust omgaan met wat al goed is.',
      fr: 'Rénover durablement : réemployer les matériaux quand c’est possible, réduire les déchets et respecter ce qui est encore bon.',
      en: 'Renovating sustainably: reusing materials where possible, reducing waste and respecting what’s already in place.',
    },
  });
}

export default async function HergebruikPage({
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
      { href: HREF, label: { nl: 'Hergebruik', fr: 'Réemploi', en: 'Reuse' } },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicContentPage locale={locale} pageKey="value-reuse" />
    </>
  );
}
