import { permanentRedirect } from 'next/navigation';
import { getPathname } from '@/i18n/routing';
import { isV2Locale } from '@/lib/v2/locale';

export const dynamic = 'force-dynamic';

export default async function V2AppointmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isV2Locale(locale)) {
    permanentRedirect('/nl/afspraak');
  }

  permanentRedirect(getPathname({ href: '/afspraak', locale }));
}
