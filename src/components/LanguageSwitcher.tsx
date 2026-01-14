'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, locales, type Locale } from '@/i18n/routing';
import { useTransition } from 'react';

const localeNames: Record<Locale, string> = {
  nl: 'NL',
  fr: 'FR',
  en: 'EN',
};

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function LanguageSwitcher({ variant = 'dark', className = '' }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(() => {
      // Use type assertion since pathname from usePathname is always a valid route
      router.replace(pathname as Parameters<typeof router.replace>[0], { locale: newLocale });
    });
  };

  const baseTextColor = variant === 'light' ? 'text-white/70' : 'text-noir-500';
  const activeTextColor = variant === 'light' ? 'text-white' : 'text-accent-600';
  const hoverTextColor = variant === 'light' ? 'hover:text-white' : 'hover:text-noir-900';

  return (
    <div className={`flex items-center gap-1 ${isPending ? 'opacity-50' : ''} ${className}`}>
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => handleLocaleChange(loc)}
            disabled={isPending}
            className={`px-1.5 py-1 text-sm font-medium transition-colors duration-300 ${
              locale === loc
                ? activeTextColor
                : `${baseTextColor} ${hoverTextColor}`
            }`}
            aria-current={locale === loc ? 'true' : undefined}
            aria-label={`Switch to ${localeNames[loc]}`}
          >
            {localeNames[loc]}
          </button>
          {index < locales.length - 1 && (
            <span className={`${baseTextColor} text-xs`}>|</span>
          )}
        </span>
      ))}
    </div>
  );
}
