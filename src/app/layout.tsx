import "./globals.css";

// The real <html>/<body> wrappers live in nested layouts so that `lang` can
// reflect the active locale: see src/app/[locale]/layout.tsx and
// src/app/admin/layout.tsx. This root layout intentionally just passes
// children through — this is the pattern documented by next-intl for
// i18n routing with dynamic locale prefixes.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
