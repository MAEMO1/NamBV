import ServiceDetailPage from '@/components/public/ServiceDetailPage';

export const dynamic = 'force-dynamic';

export default async function TechniekenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ServiceDetailPage locale={locale} pageKey="service-technical" />;
}
