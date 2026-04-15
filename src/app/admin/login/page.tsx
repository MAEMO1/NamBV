import { redirect } from 'next/navigation';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import Logo from '@/components/Logo';
import { getV2AdminUserFromCookieStore } from '@/lib/v2/auth';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const user = await getV2AdminUserFromCookieStore();

  if (user) {
    redirect('/admin');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2">
          <Logo variant="icon" className="h-7 w-7" />
          <span className="text-sm font-semibold text-slate-900">Nam Construction</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Sign in to Backoffice
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Beheer offertes, afspraken en content.
        </p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Nam Construction · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
