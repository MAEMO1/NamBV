import { redirect } from 'next/navigation';
import AdminLoginForm from '@/components/v2/admin/AdminLoginForm';
import { getV2AdminUserFromCookieStore } from '@/lib/v2/auth';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const user = await getV2AdminUserFromCookieStore();

  if (user) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-noir-50">
      <div className="container-wide grid min-h-screen items-center py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">Admin</p>
          <h1 className="mt-4 text-display-lg font-display font-bold text-noir-900">Veilige toegang tot de backoffice</h1>
          <p className="mt-4 text-lg leading-8 text-noir-600">
            Deze login gebruikt een database-backed admingebruiker, server-side sessies en rate limiting.
          </p>
        </div>
        <div className="mt-10 lg:mt-0">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
