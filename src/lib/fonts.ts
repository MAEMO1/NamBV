import { DM_Sans, Playfair_Display, Fraunces, Geist, Geist_Mono } from 'next/font/google';

// Primary sans-serif - clean, modern, professional (body text, UI)
export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Display font for the public site - elegant serif for headlines
export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Admin display — editorial serif, variable optical sizing for crisp UI titles.
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
  style: ['normal', 'italic'],
});

// Admin body — Geist sans, precision UI type.
export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Admin mono — for technical fields (keys, hrefs, IDs) and meta labels.
export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  weight: ['400', '500'],
});
