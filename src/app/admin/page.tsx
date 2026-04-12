import { redirect } from 'next/navigation';
import AdminConsole from '@/components/admin/AdminConsole';
import { getV2AdminUserFromCookieStore } from '@/lib/v2/auth';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin | Nam Construction',
  description: 'Beheer leads, content en instellingen.',
};

export default async function AdminPage() {
  const user = await getV2AdminUserFromCookieStore();

  if (!user) {
    redirect('/admin/login');
  }

  return <AdminConsole adminName={user.fullName ?? 'admin'} />;
}
