'use client';

import Link from 'next/link';
import { Phone, Calendar, ArrowRight } from 'lucide-react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'dark' | 'warm';
}

export default function CTABanner({
  title = "Klaar om te starten met uw renovatieproject?",
  subtitle = "Plan een gratis en vrijblijvend adviesgesprek. We bespreken uw wensen en mogelijkheden.",
  variant = 'default'
}: CTABannerProps) {
  const isDark = variant === 'dark';
  const isWarm = variant === 'warm';

  return (
    <section className={`relative overflow-hidden ${
      isDark
        ? 'bg-forest-900'
        : isWarm
          ? 'bg-gradient-to-br from-terracotta-50 via-cream-50 to-sand-100'
          : 'bg-gradient-to-br from-cream-50 via-sand-50 to-forest-50/30'
    } section-padding`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-forest-800/50 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-terracotta-900/20 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-forest-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-terracotta-200/30 rounded-full blur-3xl" />
            {/* Organic shapes */}
            <svg className="absolute top-0 left-1/4 w-64 h-64 text-sand-200/40" viewBox="0 0 200 200" fill="currentColor">
              <path d="M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,50 50,10 100,10" />
            </svg>
          </>
        )}
      </div>

      <div className="container-custom text-center relative z-10">
        {/* Leaf accent */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
          isDark ? 'bg-forest-800' : 'bg-white shadow-soft'
        }`}>
          <svg
            className={`w-8 h-8 ${isDark ? 'text-terracotta-400' : 'text-forest-600'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.3-.9M12 2c5.5 0 10 4.5 10 10 0 1.5-.3 3-.9 4.3M12 2v10m0 0l7.5 7.5M12 12L4.5 19.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-4 ${
          isDark ? 'text-white' : 'text-stone-900'
        }`}>
          {title}
        </h2>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 ${
          isDark ? 'text-forest-200' : 'text-stone-600'
        }`}>
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/afspraak"
            className={`group inline-flex items-center justify-center px-8 py-4 rounded-full font-medium transition-all duration-300 ${
              isDark
                ? 'bg-terracotta-500 text-white hover:bg-terracotta-400 hover:shadow-lg hover:shadow-terracotta-500/25'
                : 'bg-forest-600 text-white hover:bg-forest-700 hover:shadow-lg hover:shadow-forest-600/25'
            }`}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Plan gratis afspraak
            <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+32123456789"
            className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-medium border-2 transition-all duration-300 ${
              isDark
                ? 'border-forest-600 text-white hover:bg-forest-800 hover:border-forest-500'
                : 'border-stone-300 text-stone-700 hover:border-forest-600 hover:text-forest-700 hover:bg-white'
            }`}
          >
            <Phone className="h-5 w-5 mr-2" />
            +32 123 45 67 89
          </a>
        </div>

        {/* Trust indicators */}
        <div className={`mt-12 pt-8 border-t ${isDark ? 'border-forest-800' : 'border-sand-200'}`}>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {[
              'Gratis adviesgesprek',
              'Lokaal in Gent',
              '10+ jaar ervaring'
            ].map((item) => (
              <div key={item} className={`flex items-center gap-2 ${isDark ? 'text-forest-300' : 'text-stone-500'}`}>
                <svg className={`w-4 h-4 ${isDark ? 'text-terracotta-400' : 'text-forest-500'}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
