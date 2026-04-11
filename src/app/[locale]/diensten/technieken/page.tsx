'use client';

import Image from 'next/image';
import { ArrowRight, CheckCircle2, Zap, Droplets, Thermometer, Wind, ShieldCheck, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SectionHeader, CTABanner } from '@/components';
import { servicePageImages } from '@/lib/images';

const serviceIcons = [Zap, Droplets, Thermometer, Wind];
const serviceColors = ['forest', 'terracotta', 'sand', 'stone'];

export default function TechniekenPage() {
  const t = useTranslations('serviceDetails');
  const tPage = useTranslations('serviceDetails.technieken');

  const services = [
    {
      icon: serviceIcons[0],
      title: tPage('services.0.title'),
      description: tPage('services.0.description'),
      items: [
        tPage('services.0.items.0'),
        tPage('services.0.items.1'),
        tPage('services.0.items.2'),
        tPage('services.0.items.3'),
        tPage('services.0.items.4'),
      ],
      color: serviceColors[0]
    },
    {
      icon: serviceIcons[1],
      title: tPage('services.1.title'),
      description: tPage('services.1.description'),
      items: [
        tPage('services.1.items.0'),
        tPage('services.1.items.1'),
        tPage('services.1.items.2'),
        tPage('services.1.items.3'),
        tPage('services.1.items.4'),
      ],
      color: serviceColors[1]
    },
    {
      icon: serviceIcons[2],
      title: tPage('services.2.title'),
      description: tPage('services.2.description'),
      items: [
        tPage('services.2.items.0'),
        tPage('services.2.items.1'),
        tPage('services.2.items.2'),
        tPage('services.2.items.3'),
        tPage('services.2.items.4'),
      ],
      color: serviceColors[2]
    },
    {
      icon: serviceIcons[3],
      title: tPage('services.3.title'),
      description: tPage('services.3.description'),
      items: [
        tPage('services.3.items.0'),
        tPage('services.3.items.1'),
        tPage('services.3.items.2'),
        tPage('services.3.items.3'),
        tPage('services.3.items.4'),
      ],
      color: serviceColors[3]
    }
  ];

  const certifications = [
    tPage('certifications.0'),
    tPage('certifications.1'),
    tPage('certifications.2'),
    tPage('certifications.3'),
    tPage('certifications.4'),
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-noir-50 py-16 md:py-24 overflow-hidden">
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href="/diensten"
                className="inline-flex items-center text-accent-600 hover:text-accent-700 mb-6 group"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180 transition-transform group-hover:-translate-x-1" />
                {t('backToServices')}
              </Link>

              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] mb-6">
                <Zap className="h-4 w-4" />
                {tPage('badge')}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-noir-900 mb-6">
                {tPage('title')}
              </h1>
              <p className="text-xl text-noir-600 leading-relaxed mb-8">
                {tPage('description')}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-accent-600 text-white rounded-full font-semibold hover:bg-accent-700 transition-all duration-300 hover:shadow-lg hover:shadow-accent-600/25"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t('freeConsultation')}
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={servicePageImages.technieken.hero}
                  alt={tPage('title')}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-900/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title={tPage('servicesTitle')}
            subtitle={tPage('servicesSubtitle')}
            badge={tPage('servicesBadge')}
          />
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="relative bg-noir-50 rounded-2xl p-8 border border-noir-100 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                  service.color === 'forest' ? 'bg-accent-100' :
                  service.color === 'terracotta' ? 'bg-accent-100' :
                  service.color === 'sand' ? 'bg-accent-100' :
                  'bg-noir-100'
                }`}>
                  <service.icon className={`h-7 w-7 ${
                    service.color === 'forest' ? 'text-accent-600' :
                    service.color === 'terracotta' ? 'text-accent-600' :
                    service.color === 'sand' ? 'text-accent-700' :
                    'text-noir-600'
                  }`} />
                </div>

                <h3 className="text-2xl font-display font-bold text-noir-900 mb-3">{service.title}</h3>
                <p className="text-noir-600 mb-6">{service.description}</p>
                <div className="space-y-2">
                  {service.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${
                        service.color === 'forest' ? 'text-accent-600' :
                        service.color === 'terracotta' ? 'text-accent-600' :
                        service.color === 'sand' ? 'text-accent-700' :
                        'text-noir-600'
                      }`} />
                      <span className="text-noir-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-noir-900">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={servicePageImages.technieken.certBackground}
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-noir-800 text-noir-300 text-xs font-semibold uppercase tracking-[0.15em] mb-8">
                <ShieldCheck className="h-4 w-4" />
                {tPage('certBadge')}
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                {tPage('certTitle')}
              </h2>
              <p className="text-noir-300 text-lg mb-10">
                {tPage('certDescription')}
              </p>
              <div className="space-y-4">
                {certifications.map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-accent-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-noir-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={servicePageImages.technieken.certifications}
                  alt={tPage('certTitle')}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
