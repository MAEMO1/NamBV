'use client';

import Image from 'next/image';
import { ArrowRight, CheckCircle2, Paintbrush, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SectionHeader, CTABanner } from '@/components';
import { servicePageImages } from '@/lib/images';

const serviceColors = ['forest', 'terracotta', 'sand', 'stone'];

export default function AfwerkingPage() {
  const t = useTranslations('serviceDetails');
  const tPage = useTranslations('serviceDetails.afwerking');

  const services = [
    {
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
      title: tPage('services.3.title'),
      description: tPage('services.3.description'),
      items: [
        tPage('services.3.items.0'),
        tPage('services.3.items.1'),
        tPage('services.3.items.2'),
        tPage('services.3.items.3'),
      ],
      color: serviceColors[3]
    }
  ];

  const qualityPoints = [
    tPage('qualityPoints.0'),
    tPage('qualityPoints.1'),
    tPage('qualityPoints.2'),
    tPage('qualityPoints.3'),
    tPage('qualityPoints.4'),
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
                <Paintbrush className="h-4 w-4" />
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
                  src={servicePageImages.afwerking.hero}
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

      {/* Quality */}
      <section className="section-padding bg-noir-50 relative overflow-hidden">
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={servicePageImages.afwerking.quality}
                  alt={tPage('qualityTitle')}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <span className="inline-block rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] mb-6">
                {tPage('qualityBadge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-noir-900 mb-6">
                {tPage('qualityTitle')}
              </h2>
              <p className="text-lg text-noir-600 mb-8">
                {tPage('qualityDescription')}
              </p>
              <div className="space-y-4">
                {qualityPoints.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-soft">
                    <CheckCircle2 className="h-5 w-5 text-accent-700 flex-shrink-0" />
                    <span className="text-noir-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner variant="accent" />
    </>
  );
}
