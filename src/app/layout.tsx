import type { Metadata } from "next";
import { dmSans, playfair } from "@/lib/fonts";
import { Header, Footer, Analytics } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nam Construction | Vakkundige Renovatie in Gent",
    template: "%s | Nam Construction"
  },
  description: "Vakkundige renovatie in Gent met oog voor detail en duurzaamheid. Van totaalrenovatie tot afwerking. Vraag een gratis adviesgesprek aan.",
  keywords: ["renovatie Gent", "aannemer Gent", "totaalrenovatie", "verbouwing", "renovatiebedrijf"],
  authors: [{ name: "Nam Construction" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "https://namconstruction.be",
    siteName: "Nam Construction",
    title: "Nam Construction | Vakkundige Renovatie in Gent",
    description: "Vakkundige renovatie in Gent met oog voor detail en duurzaamheid. Van totaalrenovatie tot afwerking.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {/* Subtle noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        <Analytics>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Analytics>
      </body>
    </html>
  );
}
