import { dmSans, plusJakarta } from '@/lib/fonts';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${dmSans.variable} ${plusJakarta.variable}`}
    >
      <body className="admin-body font-sans">
        <div className="admin-body-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
