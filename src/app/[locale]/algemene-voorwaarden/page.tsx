import PublicContentPage from '@/components/public/pages/PublicContentPage';

export const dynamic = 'force-dynamic';

export default async function AlgemeneVoorwaardenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PublicContentPage locale={locale} pageKey="terms" />;
}
