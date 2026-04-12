import PublicHomePage from '@/components/v2/pages/PublicHomePage';

export const dynamic = 'force-dynamic';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PublicHomePage locale={locale} />;
}
