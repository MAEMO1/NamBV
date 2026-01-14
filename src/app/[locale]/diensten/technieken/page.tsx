'use client';

import Image from 'next/image';
import { ArrowRight, CheckCircle2, Zap, Droplets, Thermometer, Wind, ShieldCheck, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SectionHeader, CTABanner } from '@/components';

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
      <section className="relative bg-gradient-to-br from-cream-50 via-stone-50 to-forest-50/20 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-stone-100/50 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href="/diensten"
                className="inline-flex items-center text-forest-600 hover:text-forest-700 mb-6 group"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180 transition-transform group-hover:-translate-x-1" />
                {t('backToServices')}
              </Link>

              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full text-sm font-medium text-stone-700 mb-6">
                <Zap className="h-4 w-4" />
                {tPage('badge')}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                {tPage('title')}
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                {tPage('description')}
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t('freeConsultation')}
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop"
                  alt={tPage('title')}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-stone-100" />
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
                className="relative bg-cream-50 rounded-3xl p-8 border border-sand-100 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                  service.color === 'forest' ? 'bg-forest-100' :
                  service.color === 'terracotta' ? 'bg-terracotta-100' :
                  service.color === 'sand' ? 'bg-sand-100' :
                  'bg-stone-100'
                }`}>
                  <service.icon className={`h-7 w-7 ${
                    service.color === 'forest' ? 'text-forest-600' :
                    service.color === 'terracotta' ? 'text-terracotta-600' :
                    service.color === 'sand' ? 'text-sand-700' :
                    'text-stone-600'
                  }`} />
                </div>

                <h3 className="text-2xl font-display font-semibold text-stone-900 mb-3">{service.title}</h3>
                <p className="text-stone-600 mb-6">{service.description}</p>
                <div className="space-y-2">
                  {service.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${
                        service.color === 'forest' ? 'text-forest-600' :
                        service.color === 'terracotta' ? 'text-terracotta-600' :
                        service.color === 'sand' ? 'text-sand-700' :
                        'text-stone-600'
                      }`} />
                      <span className="text-stone-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-forest-900">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-0 left-0 w-1/2 h-full">
            <div className="absolute top-20 left-20 w-96 h-96 bg-forest-800/50 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-forest-800 rounded-full text-forest-300 text-sm font-medium mb-8">
                <ShieldCheck className="h-4 w-4" />
                {tPage('certBadge')}
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white mb-6">
                {tPage('certTitle')}
              </h2>
              <p className="text-forest-200 text-lg mb-10">
                {tPage('certDescription')}
              </p>
              <div className="space-y-4">
                {certifications.map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-terracotta-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-forest-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
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
