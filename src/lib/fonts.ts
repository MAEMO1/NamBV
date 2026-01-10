import { DM_Sans, Playfair_Display } from 'next/font/google';

// Primary sans-serif - clean, modern, professional
export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Display font - elegant, refined for headlines
export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
