'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Phone, ArrowRight, ArrowUpRight } from 'lucide-react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'dark' | 'accent';
}

export default function CTABanner({
  title,
  subtitle,
  variant = 'default'
}: CTABannerProps) {
  const t = useTranslations('ctaBanner');
  const isDark = variant === 'dark';
  const isAccent = variant === 'accent';

  // Use provided props or fall back to translations
  const displayTitle = title || t('title');
  const displaySubtitle = subtitle || t('subtitle');

  return (
    <section className={`relative overflow-hidden ${
      isAccent ? 'bg-accent-700' : isDark ? 'bg-noir-900' : 'bg-noir-50'
    } section-padding`}>
      {isAccent && (
        <div className="absolute inset-0 opacity-[0.03] bg-noise mix-blend-overlay pointer-events-none" />
      )}
      <div className="container-wide text-center relative z-10">
        <h2 className={`text-display-xl font-display font-bold mb-6 ${
          isDark || isAccent ? 'text-white' : 'text-noir-900'
        }`}>
          {displayTitle}
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 ${
          isAccent ? 'text-white/70' : isDark ? 'text-noir-400' : 'text-noir-500'
        }`}>
          {displaySubtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/offerte"
            className={`group inline-flex items-center justify-center gap-3 px-10 py-5 font-semibold rounded-full transition-all duration-300 ${
              isAccent
                ? 'bg-white text-accent-700 hover:bg-white/90'
                : isDark
                  ? 'bg-accent-600 text-white hover:bg-accent-500'
                  : 'bg-accent-600 text-white hover:bg-accent-700'
            }`}
          >
            {t('quoteButton')}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/afspraak"
            className={`group inline-flex items-center justify-center gap-3 px-10 py-5 border-2 font-semibold rounded-full transition-all duration-300 ${
              isAccent
                ? 'border-white/30 text-white hover:bg-white hover:text-accent-700 hover:border-white'
                : isDark
                  ? 'border-noir-700 text-white hover:bg-white hover:text-noir-900 hover:border-white'
                  : 'border-noir-200 text-noir-900 hover:border-accent-600 hover:text-accent-600'
            }`}
          >
            {t('appointmentButton')}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Contact */}
        <div className={`mt-12 pt-8 border-t ${
          isAccent ? 'border-white/20' : isDark ? 'border-noir-800' : 'border-noir-200'
        }`}>
          <a
            href="tel:+32493812789"
            className={`inline-flex items-center gap-2 text-sm ${
              isAccent ? 'text-white/60 hover:text-white' : isDark ? 'text-noir-400 hover:text-white' : 'text-noir-500 hover:text-noir-900'
            } transition-colors`}
          >
            <Phone className="h-4 w-4" />
            +32 493 81 27 89
          </a>
        </div>
      </div>
    </section>
  );
}
