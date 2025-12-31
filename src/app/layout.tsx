import type { Metadata } from "next";
import { inter, playfair } from "@/lib/fonts";
import { Header, Footer } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nam Construction | Duurzaam Renoveren in Gent",
    template: "%s | Nam Construction"
  },
  description: "Duurzaam renoveren in Gent met kwaliteitsafwerking en heldere opvolging. Circulair waar het kan, perfect afgewerkt waar het moet. Gratis adviesgesprek.",
  keywords: ["renovatie Gent", "duurzaam renoveren", "aannemer Gent", "totaalrenovatie", "afwerking", "ecologisch bouwen"],
  authors: [{ name: "Nam Construction" }],
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "https://namconstruction.be",
    siteName: "Nam Construction",
    title: "Nam Construction | Duurzaam Renoveren in Gent",
    description: "Duurzaam renoveren in Gent met kwaliteitsafwerking en heldere opvolging. Circulair waar het kan, perfect afgewerkt waar het moet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-white">
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
