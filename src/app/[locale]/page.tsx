import PublicHomePage from '@/components/public/pages/PublicHomePage';

export const dynamic = 'force-dynamic';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PublicHomePage locale={locale} />;
}
