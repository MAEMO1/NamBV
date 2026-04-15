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
  const metadata = await buildPageMetadata({
    href: '/',
    locale,
    titles: {
      nl: 'Nam Construction',
      fr: 'Nam Construction',
      en: 'Nam Construction',
    },
    descriptions: {
      nl: 'Nam Construction is jouw aannemer voor totaalrenovatie, afwerking en technieken in Gent en Oost-Vlaanderen. Transparant, vakkundig en duurzaam.',
      fr: 'Nam Construction, votre entrepreneur pour rénovation complète, finitions et techniques à Gand et en Flandre orientale. Transparent, expert, durable.',
      en: 'Nam Construction — your contractor for full renovation, finishing and technical works in Ghent and East Flanders. Transparent, skilled, sustainable.',
    },
  });
  // Bypass the parent layout's `%s | Nam Construction` template on the home page
  // so the browser tab reads "Nam Construction" and not "Nam Construction | Nam Construction".
  return { ...metadata, title: { absolute: 'Nam Construction' } };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PublicHomePage locale={locale} />;
}
