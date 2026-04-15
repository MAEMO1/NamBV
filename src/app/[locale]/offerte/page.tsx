import PublicQuotePage from '@/components/public/pages/PublicQuotePage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = '/offerte' as const;

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
      nl: 'Offerte aanvragen | Transparante prijs voor jouw renovatie',
      fr: 'Demander un devis | Prix transparent pour votre rénovation',
      en: 'Request a quote | Transparent pricing for your renovation',
    },
    descriptions: {
      nl: 'Vraag een transparante en vrijblijvende offerte aan bij Nam Construction. Heldere prijzen voor jouw renovatieproject in Gent.',
      fr: 'Demandez un devis transparent et sans engagement auprès de Nam Construction. Des prix clairs pour votre projet à Gand.',
      en: 'Request a transparent, no-obligation quote from Nam Construction. Clear pricing for your Ghent renovation project.',
    },
  });
}

export default async function OffertePage({
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
      { href: HREF, label: CRUMB_LABELS.quote },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicQuotePage locale={locale} />
    </>
  );
}
