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
    <section className="min-h-screen bg-ivory-50">
      {/* Hero */}
      <div className="bg-noir-900 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-wide">
          <div className="max-w-4xl">
            <p
              className={`text-accent-400 text-sm font-medium uppercase tracking-[0.3em] mb-6 transition-all duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Contact
            </p>
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-white leading-[1.1] transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {t('title')}{' '}
              <span className="text-accent-400">{t('titleHighlight')}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="container-wide -mt-12 md:-mt-16 pb-24 md:pb-32">
        <div className="grid md:grid-cols-2 gap-px bg-noir-200">
          {/* Phone */}
          <a
            href="tel:+32493812789"
            className={`group bg-white p-8 md:p-12 hover:bg-accent-50 transition-all duration-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-accent-500 flex items-center justify-center">
                <Phone className="h-7 w-7 text-white" />
              </div>
              <ArrowRight className="h-6 w-6 text-noir-300 group-hover:text-accent-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-noir-400 uppercase tracking-[0.2em] mb-3">
              {t('phone')}
            </p>
            <p className="text-2xl md:text-3xl font-display font-medium text-noir-900 mb-2 group-hover:text-accent-600 transition-colors">
              +32 493 81 27 89
            </p>
            <p className="text-noir-500">
              {t('monFri')}
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:info@namconstruction.be"
            className={`group bg-white p-8 md:p-12 hover:bg-accent-50 transition-all duration-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-noir-800 flex items-center justify-center">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <ArrowRight className="h-6 w-6 text-noir-300 group-hover:text-accent-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-noir-400 uppercase tracking-[0.2em] mb-3">
              {t('email')}
            </p>
            <p className="text-2xl md:text-3xl font-display font-medium text-noir-900 mb-2 group-hover:text-accent-600 transition-colors break-all">
              info@namconstruction.be
            </p>
            <p className="text-noir-500">
              {t('responseTime')}
            </p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/32493812789"
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-white p-8 md:p-12 hover:bg-accent-50 transition-all duration-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-emerald-600 flex items-center justify-center">
                <MessageSquare className="h-7 w-7 text-white" />
              </div>
              <ArrowRight className="h-6 w-6 text-noir-300 group-hover:text-accent-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-noir-400 uppercase tracking-[0.2em] mb-3">
              WhatsApp
            </p>
            <p className="text-2xl md:text-3xl font-display font-medium text-noir-900 mb-2 group-hover:text-accent-600 transition-colors">
              {t('directContact')}
            </p>
            <p className="text-noir-500">
              {t('sendPhotos')}
            </p>
          </a>

          {/* Location */}
          <a
            href="https://maps.google.com/?q=Zwijnaardsesteenweg+683+9000+Gent"
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-white p-8 md:p-12 hover:bg-accent-50 transition-all duration-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-amber-500 flex items-center justify-center">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <ArrowRight className="h-6 w-6 text-noir-300 group-hover:text-accent-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-xs text-noir-400 uppercase tracking-[0.2em] mb-3">
              {t('office')}
            </p>
            <p className="text-2xl md:text-3xl font-display font-medium text-noir-900 mb-2 group-hover:text-accent-600 transition-colors">
              Zwijnaardsesteenweg 683
            </p>
            <p className="text-noir-500">
              9000 Gent
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
