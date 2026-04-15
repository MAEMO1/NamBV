import PublicContentPage from '@/components/public/pages/PublicContentPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = { pathname: '/waarden/[value]', params: { value: 'attestering' } } as const;

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
      nl: 'Attestering & conformiteit | Nam Construction',
      fr: 'Attestations & conformité | Nam Construction',
      en: 'Certification & compliance | Nam Construction',
    },
    descriptions: {
      nl: 'Waarom Nam Construction inzet op attestering: conformiteit voor elektriciteit, sanitair, ventilatie en meer — jouw zekerheid bij renovatie.',
      fr: 'Pourquoi Nam Construction mise sur les attestations : conformité électrique, sanitaire, ventilation… Votre tranquillité lors de la rénovation.',
      en: 'Why Nam Construction invests in certification: compliance for electrics, plumbing, ventilation and more — your peace of mind during renovation.',
    },
  });
}

export default async function AttesteringPage({
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
      { href: HREF, label: { nl: 'Attestering', fr: 'Attestations', en: 'Certification' } },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicContentPage locale={locale} pageKey="value-certification" />
    </>
  );
}
