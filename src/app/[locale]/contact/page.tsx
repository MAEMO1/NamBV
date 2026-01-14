'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
  FileText,
  Calendar,
} from 'lucide-react';

const regions = ['Gent', 'Mariakerke', 'Drongen', 'Sint-Martens-Latem', 'Ledeberg', 'Gentbrugge', 'Merelbeke'];

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-ivory-100 to-white overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent-100/40 rounded-full blur-3xl" />

        <div className="container-wide relative">
          <div className="max-w-3xl">
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-sm font-medium text-accent-600 uppercase tracking-[0.2em]">
                {t('badge')}
              </span>
            </div>

            <h1
              className={`text-display-lg md:text-display-xl font-display font-medium text-noir-900 mb-6 transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {t('title')}{' '}
              <span className="text-accent-600 italic">{t('titleHighlight')}</span>
            </h1>

            <p
              className={`text-xl text-noir-500 leading-relaxed transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone */}
            <a
              href="tel:+32493812789"
              className="group p-6 bg-ivory-50 border border-noir-100 hover:border-accent-500 hover:bg-accent-50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-medium text-noir-900 mb-1">{t('phone')}</h3>
              <p className="text-accent-600 font-medium mb-2">+32 493 81 27 89</p>
              <p className="text-sm text-noir-500">{t('monFri')}</p>
            </a>

            {/* Email */}
            <a
              href="mailto:info@namconstruction.be"
              className="group p-6 bg-ivory-50 border border-noir-100 hover:border-accent-500 hover:bg-accent-50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-medium text-noir-900 mb-1">{t('email')}</h3>
              <p className="text-accent-600 font-medium mb-2">info@namconstruction.be</p>
              <p className="text-sm text-noir-500">{t('responseTime')}</p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/32493812789"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-ivory-50 border border-noir-100 hover:border-accent-500 hover:bg-accent-50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-medium text-noir-900 mb-1">{t('whatsapp')}</h3>
              <p className="text-accent-600 font-medium mb-2">{t('directContact')}</p>
              <p className="text-sm text-noir-500">{t('sendPhotos')}</p>
            </a>

            {/* Address */}
            <div className="p-6 bg-ivory-50 border border-noir-100">
              <div className="w-12 h-12 bg-noir-800 flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-medium text-noir-900 mb-1">{t('office')}</h3>
              <p className="text-noir-700 mb-2">Zwijnaardsesteenweg 683</p>
              <p className="text-sm text-noir-500">9000 Gent</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Cards - Request Quote or Book Appointment */}
      <section className="py-16 md:py-20 bg-noir-900">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              {t('ctaDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Quote Request */}
            <Link
              href="/offerte"
              className="group relative p-8 bg-white/5 border border-white/10 hover:border-accent-500/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-accent-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-medium text-white mb-2">
                    {t('ctaPrimary')}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Ontvang een vrijblijvende offerte voor uw renovatieproject
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent-400 font-medium text-sm group-hover:gap-3 transition-all">
                    Start aanvraag
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Book Appointment */}
            <Link
              href="/afspraak"
              className="group relative p-8 bg-white/5 border border-white/10 hover:border-accent-500/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-accent-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-medium text-white mb-2">
                    {t('ctaSecondary')}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Plan een gratis adviesgesprek met onze experts
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent-400 font-medium text-sm group-hover:gap-3 transition-all">
                    Plan afspraak
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-20 bg-ivory-50">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Opening Hours */}
            <div className="bg-white p-8 border border-noir-100">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-5 w-5 text-accent-600" />
                <h3 className="text-lg font-display font-medium text-noir-900">
                  {t('openingHours')}
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-noir-100">
                  <span className="text-noir-600">{t('monday-friday')}</span>
                  <span className="font-medium text-noir-900 bg-accent-50 px-3 py-1 text-sm">
                    8:00 - 18:00
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-noir-100">
                  <span className="text-noir-600">{t('saturday')}</span>
                  <span className="font-medium text-noir-700 bg-ivory-100 px-3 py-1 text-sm">
                    {t('byAppointment')}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-noir-600">{t('sunday')}</span>
                  <span className="font-medium text-noir-500 bg-noir-100 px-3 py-1 text-sm">
                    {t('closed')}
                  </span>
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div className="bg-white p-8 border border-noir-100">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-5 w-5 text-accent-600" />
                <h3 className="text-lg font-display font-medium text-noir-900">
                  {t('regionTitle')}
                </h3>
              </div>
              <p className="text-noir-600 mb-6">
                {t('regionDescription')}
              </p>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <span
                    key={region}
                    className="px-3 py-1.5 bg-accent-50 text-sm text-accent-700 border border-accent-100"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
