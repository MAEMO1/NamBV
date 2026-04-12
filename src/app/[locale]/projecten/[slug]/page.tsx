import PublicProjectDetailPage from '@/components/public/pages/PublicProjectDetailPage';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <PublicProjectDetailPage locale={locale} slug={slug} />;
}
