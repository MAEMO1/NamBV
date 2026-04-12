import { permanentRedirect } from 'next/navigation';
import { getPathname } from '@/i18n/routing';
import { isV2Locale } from '@/lib/v2/locale';

export const dynamic = 'force-dynamic';

export default async function V2ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isV2Locale(locale)) {
    permanentRedirect('/nl/projecten');
  }

  permanentRedirect(
    getPathname({
      href: { pathname: '/projecten/[slug]', params: { slug } },
      locale,
    }),
  );
}
