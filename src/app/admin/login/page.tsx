import { redirect } from 'next/navigation';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { getV2AdminUserFromCookieStore } from '@/lib/v2/auth';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const user = await getV2AdminUserFromCookieStore();

  if (user) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-noir-50">
      <div className="admin-container grid gap-10 py-10 md:py-16 lg:min-h-screen lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:py-20">
        <div className="max-w-md">
          <p className="admin-eyebrow text-accent-700">Admin</p>
          <h1 className="mt-4 text-display-md font-display font-bold text-noir-900 md:text-display-lg">
            Veilige toegang tot de backoffice
          </h1>
          <p className="mt-4 text-base leading-7 text-noir-600 md:text-lg md:leading-8">
            Deze login gebruikt een database-backed admingebruiker, server-side sessies en rate limiting.
          </p>
        </div>
        <div>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
