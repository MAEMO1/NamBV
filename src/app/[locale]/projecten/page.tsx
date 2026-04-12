import PublicProjectsPage from '@/components/public/pages/PublicProjectsPage';

export const dynamic = 'force-dynamic';

export default async function ProjectenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PublicProjectsPage locale={locale} />;
}
