import { redirect } from 'next/navigation';
import AdminConsole from '@/components/v2/admin/AdminConsole';
import { getV2AdminUserFromCookieStore } from '@/lib/v2/auth';
import { getV2AdminConsoleSnapshot } from '@/lib/v2/public-data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin | Nam Construction',
  description: 'Beheer leads, content en instellingen.',
};

export default async function AdminPage() {
  const [user, snapshot] = await Promise.all([
    getV2AdminUserFromCookieStore(),
    getV2AdminConsoleSnapshot(),
  ]);

  if (!user) {
    redirect('/admin/login');
  }

  return <AdminConsole adminName={user.fullName ?? 'admin'} initialData={snapshot} />;
}
