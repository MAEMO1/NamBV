import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['nl', 'fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'nl';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',

  pathnames: {
    '/': '/',

    // Services
    '/diensten': {
      nl: '/diensten',
      fr: '/services',
      en: '/services',
    },
    '/diensten/totaalrenovatie': {
      nl: '/diensten/totaalrenovatie',
      fr: '/services/renovation-complete',
      en: '/services/full-renovation',
    },
    '/diensten/renovatie': {
      nl: '/diensten/renovatie',
      fr: '/services/renovation',
      en: '/services/renovation',
    },
    '/diensten/afwerking': {
      nl: '/diensten/afwerking',
      fr: '/services/finitions',
      en: '/services/finishing',
    },
    '/diensten/technieken': {
      nl: '/diensten/technieken',
      fr: '/services/techniques',
      en: '/services/technical',
    },

    // Other pages
    '/projecten': {
      nl: '/projecten',
      fr: '/projets',
      en: '/projects',
    },
    '/aanpak': {
      nl: '/aanpak',
      fr: '/approche',
      en: '/approach',
    },
    '/afspraak': {
      nl: '/afspraak',
      fr: '/rendez-vous',
      en: '/appointment',
    },
    '/offerte': {
      nl: '/offerte',
      fr: '/devis',
      en: '/quote',
    },
    '/contact': '/contact',

    // Legal pages
    '/privacy': {
      nl: '/privacy',
      fr: '/confidentialite',
      en: '/privacy',
    },
    '/algemene-voorwaarden': {
      nl: '/algemene-voorwaarden',
      fr: '/conditions-generales',
      en: '/terms-and-conditions',
    },

    // Values section
    '/waarden/[value]': {
      nl: '/waarden/[value]',
      fr: '/valeurs/[value]',
      en: '/values/[value]',
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
