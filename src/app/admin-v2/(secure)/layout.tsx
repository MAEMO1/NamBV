import { permanentRedirect } from 'next/navigation';

export default function AdminV2SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  permanentRedirect('/admin');
  return <>{children}</>;
}
