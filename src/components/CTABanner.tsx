'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Phone, ArrowRight, ArrowUpRight } from 'lucide-react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'dark' | 'warm';
}

export default function CTABanner({
  title,
  subtitle,
  variant = 'default'
}: CTABannerProps) {
  const t = useTranslations('ctaBanner');
  const isDark = variant === 'dark';

  // Use provided props or fall back to translations
  const displayTitle = title || t('title');
  const displaySubtitle = subtitle || t('subtitle');

  return (
    <section className={`relative overflow-hidden ${
      isDark ? 'bg-noir-950' : 'bg-ivory-200'
    } section-padding`}>
      <div className="container-wide text-center relative z-10">
        <h2 className={`text-display-xl font-display font-medium mb-6 ${
          isDark ? 'text-white' : 'text-noir-900'
        }`}>
          {displayTitle}
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 ${
          isDark ? 'text-noir-400' : 'text-noir-500'
        }`}>
          {displaySubtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/offerte"
            className={`group inline-flex items-center justify-center gap-3 px-10 py-5 font-medium uppercase tracking-wide transition-all duration-500 ${
              isDark
                ? 'bg-accent-500 text-white hover:bg-accent-400'
                : 'bg-noir-900 text-white hover:bg-accent-500'
            }`}
          >
            {t('quoteButton')}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/afspraak"
            className={`group inline-flex items-center justify-center gap-3 px-10 py-5 border font-medium uppercase tracking-wide transition-all duration-500 ${
              isDark
                ? 'border-noir-700 text-white hover:bg-white hover:text-noir-900 hover:border-white'
                : 'border-noir-300 text-noir-900 hover:bg-noir-900 hover:text-white hover:border-noir-900'
            }`}
          >
            {t('appointmentButton')}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Contact */}
        <div className={`mt-12 pt-8 border-t ${isDark ? 'border-noir-800' : 'border-noir-200'}`}>
          <a
            href="tel:+32493812789"
            className={`inline-flex items-center gap-2 text-sm ${
              isDark ? 'text-noir-400 hover:text-white' : 'text-noir-500 hover:text-noir-900'
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
