import PublicAppointmentPage from '@/components/public/pages/PublicAppointmentPage';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

const HREF = '/afspraak' as const;

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
      nl: 'Afspraak maken | Gratis adviesgesprek bij Nam Construction',
      fr: 'Prendre rendez-vous | Consultation gratuite avec Nam Construction',
      en: 'Book an appointment | Free consultation with Nam Construction',
    },
    descriptions: {
      nl: 'Plan een vrijblijvend adviesgesprek met Nam Construction. We bespreken je renovatieplannen en geven een eerlijk advies.',
      fr: 'Réservez un entretien sans engagement avec Nam Construction. Nous discutons de votre projet et donnons un conseil honnête.',
      en: 'Book a no-obligation consultation with Nam Construction. We discuss your renovation plans and share honest advice.',
    },
  });
}

export default async function AfspraakPage({
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
      { href: HREF, label: CRUMB_LABELS.appointment },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <PublicAppointmentPage locale={locale} />
    </>
  );
}
