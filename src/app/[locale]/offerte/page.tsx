import PublicQuotePage from '@/components/v2/pages/PublicQuotePage';

export const dynamic = 'force-dynamic';

export default async function OffertePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PublicQuotePage locale={locale} />;
}
