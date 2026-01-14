import type { Metadata } from "next";
import { dmSans, playfair } from "@/lib/fonts";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
