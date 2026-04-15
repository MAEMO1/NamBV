import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';

// Primary sans-serif - clean, modern, professional (body text, UI)
export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Display font for the public site - bold geometric sans-serif for headlines
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});
