import PublicContentPage from '@/components/public/pages/PublicContentPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = '/privacy' as const;

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
      nl: 'Privacybeleid | Nam Construction',
      fr: 'Politique de confidentialité | Nam Construction',
      en: 'Privacy policy | Nam Construction',
    },
    descriptions: {
      nl: 'Lees hoe Nam Construction omgaat met jouw persoonsgegevens, in lijn met de GDPR en Belgische wetgeving.',
      fr: 'Découvrez comment Nam Construction traite vos données personnelles, conformément au RGPD et à la loi belge.',
      en: 'Learn how Nam Construction handles your personal data, in line with GDPR and Belgian legislation.',
    },
  });
}

export default async function PrivacyPage({
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
      { href: HREF, label: CRUMB_LABELS.privacy },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicContentPage locale={locale} pageKey="privacy" />
    </>
  );
}
