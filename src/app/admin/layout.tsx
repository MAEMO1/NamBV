import { fraunces, geist, geistMono } from '@/lib/fonts';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${geist.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <body className="admin-body font-sans">
        {children}
      </body>
    </html>
  );
}
