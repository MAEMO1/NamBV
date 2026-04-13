import ServicesOverviewPage from '@/components/public/ServicesOverviewPage';

export const dynamic = 'force-dynamic';

export default async function DienstenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ServicesOverviewPage locale={locale} />;
}
