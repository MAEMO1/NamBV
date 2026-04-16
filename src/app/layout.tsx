import type { Viewport } from "next";
import "./globals.css";

// `viewport-fit=cover` is required for `env(safe-area-inset-*)` to return
// real values on iOS. Without it, the mobile sticky CTA bar ends up pinned
// to the layout viewport (below the Safari URL bar) instead of the visual
// viewport, causing it to appear "detached" from the bottom on scroll.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
