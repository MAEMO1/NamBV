import { redirect } from 'next/navigation';
import { getV2AdminUserFromCookieStore } from '@/lib/v2/auth';

export const dynamic = 'force-dynamic';

export default async function AdminV2SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getV2AdminUserFromCookieStore();

  if (!user) {
    redirect('/admin-v2/login');
  }

  return <>{children}</>;
}
