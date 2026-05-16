import { geistMono } from '@/lib/fonts';
import { Analytics } from '@vercel/analytics/next';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={geistMono.variable}
    >
      <head>
        {/* General Sans — admin UI font (Fontshare CDN) */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body className="admin-body font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
