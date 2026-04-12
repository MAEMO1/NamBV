import PublicAppointmentPage from '@/components/v2/pages/PublicAppointmentPage';

export const dynamic = 'force-dynamic';

export default async function AfspraakPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PublicAppointmentPage locale={locale} />;
}
