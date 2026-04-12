import PublicContentPage from '@/components/v2/pages/PublicContentPage';

export const dynamic = 'force-dynamic';

export default async function DienstenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PublicContentPage locale={locale} pageKey="services" />;
}
