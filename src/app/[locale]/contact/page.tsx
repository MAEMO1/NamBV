'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const contacts = [
    {
      icon: Phone,
      label: t('phone'),
      value: '+32 493 81 27 89',
      href: 'tel:+32493812789',
      description: t('monFri'),
      color: 'bg-accent-500',
    },
    {
      icon: Mail,
      label: t('email'),
      value: 'info@namconstruction.be',
      href: 'mailto:info@namconstruction.be',
      description: t('responseTime'),
      color: 'bg-noir-800',
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      value: t('directContact'),
      href: 'https://wa.me/32493812789',
      description: t('sendPhotos'),
      color: 'bg-emerald-600',
      external: true,
    },
    {
      icon: MapPin,
      label: t('office'),
      value: 'Zwijnaardsesteenweg 683',
      href: 'https://maps.google.com/?q=Zwijnaardsesteenweg+683+9000+Gent',
      description: '9000 Gent',
      color: 'bg-amber-500',
      external: true,
    },
  ];

  return (
    <section className="min-h-[calc(100vh-80px)] bg-noir-950 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-wide relative py-24 md:py-32 lg:py-40">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-6 transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t('title')}{' '}
            <span className="text-accent-400 italic">{t('titleHighlight')}</span>
          </h1>
          <p
            className={`text-lg md:text-xl text-white/50 max-w-md mx-auto transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            {t('description')}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {contacts.map((contact, index) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.external ? '_blank' : undefined}
              rel={contact.external ? 'noopener noreferrer' : undefined}
              className={`group relative p-6 md:p-8 bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${contact.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <contact.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <p className="text-sm text-white/40 uppercase tracking-wider">
                  {contact.label}
                </p>
                <p className="text-xl md:text-2xl font-medium text-white group-hover:text-accent-400 transition-colors">
                  {contact.value}
                </p>
                <p className="text-sm text-white/50">
                  {contact.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-accent-500/50">
                <ArrowUpRight className="h-4 w-4 text-accent-400" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
