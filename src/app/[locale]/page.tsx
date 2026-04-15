import PublicHomePage from '@/components/public/pages/PublicHomePage';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import type { Locale } from '@/i18n/routing';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({
    href: '/',
    locale,
    titles: {
      nl: 'Nam Construction | Vakkundige renovatie in Gent',
      fr: 'Nam Construction | Rénovation experte à Gand',
      en: 'Nam Construction | Expert renovation in Ghent',
    },
    descriptions: {
      nl: 'Nam Construction is jouw aannemer voor totaalrenovatie, afwerking en technieken in Gent en Oost-Vlaanderen. Transparant, vakkundig en duurzaam.',
      fr: 'Nam Construction, votre entrepreneur pour rénovation complète, finitions et techniques à Gand et en Flandre orientale. Transparent, expert, durable.',
      en: 'Nam Construction — your contractor for full renovation, finishing and technical works in Ghent and East Flanders. Transparent, skilled, sustainable.',
    },
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PublicHomePage locale={locale} />;
}
