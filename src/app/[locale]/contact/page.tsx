'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-noir-50 pt-28 pb-12 md:pt-40 md:pb-20">
        <div className="container-wide">
          <div className="max-w-4xl">
            <span
              className={`inline-block px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-6 transition-all duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Contact
            </span>
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-noir-900 leading-[1.1] transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {t('title')}{' '}
              <span className="text-accent-600">{t('titleHighlight')}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="container-wide py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Phone */}
          <a
            href="tel:+32493812789"
            className={`group bg-white rounded-2xl border border-noir-100 p-8 md:p-10 hover:border-accent-200 hover:shadow-soft transition-all duration-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-accent-600 rounded-xl flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <ArrowRight className="h-5 w-5 text-noir-300 group-hover:text-accent-600 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-noir-400 font-semibold uppercase tracking-[0.15em] mb-2">
              {t('phone')}
            </p>
            <p className="text-2xl md:text-3xl font-display font-bold text-noir-900 mb-1 group-hover:text-accent-600 transition-colors">
              +32 493 81 27 89
            </p>
            <p className="text-noir-500 text-sm">
              {t('monFri')}
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:info@namconstruction.be"
            className={`group bg-white rounded-2xl border border-noir-100 p-8 md:p-10 hover:border-accent-200 hover:shadow-soft transition-all duration-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-noir-800 rounded-xl flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <ArrowRight className="h-5 w-5 text-noir-300 group-hover:text-accent-600 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-noir-400 font-semibold uppercase tracking-[0.15em] mb-2">
              {t('email')}
            </p>
            <p className="text-2xl md:text-3xl font-display font-bold text-noir-900 mb-1 group-hover:text-accent-600 transition-colors break-words">
              info@namconstruction.be
            </p>
            <p className="text-noir-500 text-sm">
              {t('responseTime')}
            </p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/32493812789"
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-white rounded-2xl border border-noir-100 p-8 md:p-10 hover:border-accent-200 hover:shadow-soft transition-all duration-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <ArrowRight className="h-5 w-5 text-noir-300 group-hover:text-accent-600 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-noir-400 font-semibold uppercase tracking-[0.15em] mb-2">
              WhatsApp
            </p>
            <p className="text-2xl md:text-3xl font-display font-bold text-noir-900 mb-1 group-hover:text-accent-600 transition-colors">
              {t('directContact')}
            </p>
            <p className="text-noir-500 text-sm">
              {t('sendPhotos')}
            </p>
          </a>

          {/* Location */}
          <a
            href="https://maps.google.com/?q=Zwijnaardsesteenweg+683+9000+Gent"
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-white rounded-2xl border border-noir-100 p-8 md:p-10 hover:border-accent-200 hover:shadow-soft transition-all duration-300 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <ArrowRight className="h-5 w-5 text-noir-300 group-hover:text-accent-600 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-noir-400 font-semibold uppercase tracking-[0.15em] mb-2">
              {t('office')}
            </p>
            <p className="text-2xl md:text-3xl font-display font-bold text-noir-900 mb-1 group-hover:text-accent-600 transition-colors">
              Zwijnaardsesteenweg 683
            </p>
            <p className="text-noir-500 text-sm">
              9000 Gent
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
