'use client';

import Image from 'next/image';
import { ArrowRight, CheckCircle2, Clock, Users, Shield, FileCheck, Home, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SectionHeader, CTABanner } from '@/components';
import { servicePageImages } from '@/lib/images';

export default function TotaalrenovatiePage() {
  const t = useTranslations('serviceDetails');
  const tPage = useTranslations('serviceDetails.totaalrenovatie');

  const features = [
    {
      icon: Users,
      title: tPage('features.singleContact.title'),
      description: tPage('features.singleContact.description'),
      color: 'forest'
    },
    {
      icon: Clock,
      title: tPage('features.planning.title'),
      description: tPage('features.planning.description'),
      color: 'terracotta'
    },
    {
      icon: Shield,
      title: tPage('features.quality.title'),
      description: tPage('features.quality.description'),
      color: 'sand'
    },
    {
      icon: FileCheck,
      title: tPage('features.subsidy.title'),
      description: tPage('features.subsidy.description'),
      color: 'stone'
    }
  ];

  const scope = [
    tPage('scope.0'),
    tPage('scope.1'),
    tPage('scope.2'),
    tPage('scope.3'),
    tPage('scope.4'),
    tPage('scope.5'),
    tPage('scope.6'),
    tPage('scope.7'),
    tPage('scope.8'),
    tPage('scope.9'),
    tPage('scope.10'),
  ];

  const faqs = [
    { question: tPage('faqs.0.question'), answer: tPage('faqs.0.answer') },
    { question: tPage('faqs.1.question'), answer: tPage('faqs.1.answer') },
    { question: tPage('faqs.2.question'), answer: tPage('faqs.2.answer') },
    { question: tPage('faqs.3.question'), answer: tPage('faqs.3.answer') },
    { question: tPage('faqs.4.question'), answer: tPage('faqs.4.answer') },
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
                <Home className="h-4 w-4" />
                {tPage('badge')}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-noir-900 mb-6">
                {tPage('title')}
              </h1>
              <p className="text-xl text-noir-600 leading-relaxed mb-8">
                {tPage('description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-accent-600 text-white rounded-full font-semibold hover:bg-accent-700 transition-all duration-300 hover:shadow-lg hover:shadow-accent-600/25"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {t('freeConsultation')}
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projecten"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-noir-200 text-noir-700 rounded-full font-semibold hover:border-accent-600 hover:text-accent-700 transition-all duration-300"
                >
                  {t('viewProjects')}
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={servicePageImages.totaalrenovatie.hero}
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

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title={tPage('featuresTitle')}
            subtitle={tPage('featuresSubtitle')}
            badge={tPage('featuresBadge')}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="group text-center rounded-2xl bg-noir-50 p-6 border border-noir-100">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 ${
                  feature.color === 'forest' ? 'bg-accent-100' :
                  feature.color === 'terracotta' ? 'bg-accent-100' :
                  feature.color === 'sand' ? 'bg-accent-100' :
                  'bg-noir-100'
                }`}>
                  <feature.icon className={`h-8 w-8 ${
                    feature.color === 'forest' ? 'text-accent-600' :
                    feature.color === 'terracotta' ? 'text-accent-600' :
                    feature.color === 'sand' ? 'text-accent-700' :
                    'text-noir-600'
                  }`} />
                </div>
                <h3 className="text-lg font-display font-bold text-noir-900 mb-2">{feature.title}</h3>
                <p className="text-noir-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="section-padding bg-noir-50 relative overflow-hidden">
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] mb-6">
                {tPage('scopeBadge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-noir-900 mb-6">
                {tPage('scopeTitle')}
              </h2>
              <p className="text-lg text-noir-600 mb-8">
                {tPage('scopeDescription')}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {scope.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-soft">
                    <CheckCircle2 className="h-5 w-5 text-accent-600 flex-shrink-0" />
                    <span className="text-noir-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={servicePageImages.totaalrenovatie.scope}
                  alt={tPage('scopeTitle')}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title={tPage('faqTitle')}
            subtitle={tPage('faqSubtitle')}
            badge={tPage('faqBadge')}
          />
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-2xl bg-noir-50 border border-noir-100 p-6">
                  <h3 className="text-lg font-display font-bold text-noir-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-noir-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner variant="accent" />
    </>
  );
}
