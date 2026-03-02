'use client';

import Image from 'next/image';
import { ArrowRight, CheckCircle2, Hammer, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SectionHeader, CTABanner } from '@/components';
import { servicePageImages } from '@/lib/images';

const typeImages = servicePageImages.renovatie.types;

const typeColors = ['forest', 'terracotta', 'sand', 'stone'];

export default function RenovatiePage() {
  const t = useTranslations('serviceDetails');
  const tPage = useTranslations('serviceDetails.renovatie');

  const types = [
    { title: tPage('types.0.title'), description: tPage('types.0.description'), image: typeImages[0], color: typeColors[0] },
    { title: tPage('types.1.title'), description: tPage('types.1.description'), image: typeImages[1], color: typeColors[1] },
    { title: tPage('types.2.title'), description: tPage('types.2.description'), image: typeImages[2], color: typeColors[2] },
    { title: tPage('types.3.title'), description: tPage('types.3.description'), image: typeImages[3], color: typeColors[3] },
  ];

  const benefits = [
    tPage('benefits.0'),
    tPage('benefits.1'),
    tPage('benefits.2'),
    tPage('benefits.3'),
    tPage('benefits.4'),
    tPage('benefits.5'),
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-noir-50 py-20 md:py-28 overflow-hidden">
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <Link
              href="/diensten"
              className="inline-flex items-center text-accent-600 hover:text-accent-700 mb-6 group"
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180 transition-transform group-hover:-translate-x-1" />
              {t('backToServices')}
            </Link>

            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] mb-6">
              <Hammer className="h-4 w-4" />
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
        </div>
      </section>

      {/* Types */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title={tPage('typesTitle')}
            subtitle={tPage('typesSubtitle')}
            badge={tPage('typesBadge')}
          />
          <div className="grid md:grid-cols-2 gap-8">
            {types.map((type) => (
              <div key={type.title} className="group relative bg-noir-50 rounded-2xl overflow-hidden border border-noir-100 hover:shadow-xl transition-all duration-500">
                <div className="relative h-56 overflow-hidden rounded-t-2xl">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-900/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-display font-bold text-white">
                      {type.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-noir-600">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-noir-50 relative overflow-hidden">
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={servicePageImages.renovatie.benefits}
                  alt={tPage('benefitsTitle')}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-block rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] mb-6">
                {tPage('benefitsBadge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-noir-900 mb-6">
                {tPage('benefitsTitle')}
              </h2>
              <p className="text-lg text-noir-600 mb-8">
                {tPage('benefitsDescription')}
              </p>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-soft">
                    <CheckCircle2 className="h-5 w-5 text-accent-600 flex-shrink-0" />
                    <span className="text-noir-700">{benefit}</span>
                  </div>
                ))}
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
