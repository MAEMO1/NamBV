'use client';

import { useEffect, useState } from 'react';
import { Leaf, Recycle, Shield, ArrowUpRight, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { BookingFlow } from '@/components';

export default function AfspraakPage() {
  const t = useTranslations('appointmentPage');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const trustPoints = [
    {
      icon: Recycle,
      title: t('trustPoints.0.title'),
      description: t('trustPoints.0.description')
    },
    {
      icon: Shield,
      title: t('trustPoints.1.title'),
      description: t('trustPoints.1.description')
    },
    {
      icon: Leaf,
      title: t('trustPoints.2.title'),
      description: t('trustPoints.2.description')
    }
  ];

  return (
    <>
      {/* Hero with booking - Clean, professional */}
      <section className="relative bg-ivory-50 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="container-wide">
          {/* Header */}
          <div className="max-w-2xl mb-10 md:mb-12">
            <div
              className={`flex items-center gap-3 mb-5 transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-xs font-medium text-accent-600 uppercase tracking-[0.2em]">
                {t('badge')}
              </span>
            </div>

            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-display font-medium text-noir-900 mb-4 leading-tight transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {t('title')}{' '}
              <span className="text-accent-600 italic">{t('titleHighlight')}</span>
            </h1>

            <p
              className={`text-noir-500 leading-relaxed transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t('description')}
            </p>
          </div>

          {/* Booking Form - Full width, prominent */}
          <div
            className={`transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-white border border-noir-100 shadow-sm">
              <BookingFlow />
            </div>
          </div>

          {/* Quick contact below form */}
          <div
            className={`mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-noir-900 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent-500 flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/60">{t('preferPhone')}</p>
                <a
                  href="tel:+32493812789"
                  className="text-lg font-medium text-white hover:text-accent-400 transition-colors"
                >
                  +32 493 81 27 89
                </a>
              </div>
            </div>
            <Link
              href="/offerte"
              className="group flex items-center gap-2 text-sm text-white/80 hover:text-accent-400 transition-colors"
            >
              <span>{t('orRequestQuote')}</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-16 md:py-20 bg-white border-t border-noir-100">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {trustPoints.map((point, index) => (
              <div
                key={point.title}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="h-5 w-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-medium text-noir-900 mb-1">{point.title}</h3>
                  <p className="text-sm text-noir-500">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
