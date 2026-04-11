import AdminConsole from '@/components/v2/admin/AdminConsole';
import { getV2AdminUserFromCookieStore } from '@/lib/v2/auth';
import { getV2AdminConsoleSnapshot } from '@/lib/v2/public-data';

export const dynamic = 'force-dynamic';

export default async function AdminV2Page() {
  const [user, snapshot] = await Promise.all([
    getV2AdminUserFromCookieStore(),
    getV2AdminConsoleSnapshot(),
  ]);

  return <AdminConsole adminName={user?.fullName ?? 'admin'} initialData={snapshot} />;
}
