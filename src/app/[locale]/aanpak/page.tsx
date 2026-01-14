'use client';

import Image from 'next/image';
import {
  MessageSquare,
  FileText,
  Hammer,
  CheckCircle,
  Phone,
  Calendar,
  ClipboardCheck,
  Users,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SectionHeader, CTABanner } from '@/components';

const stepIcons = [MessageSquare, FileText, Hammer, CheckCircle];
const stepColors = ['forest', 'terracotta', 'sand', 'stone'] as const;

const guaranteeIcons = [Shield, Clock, Users, ClipboardCheck];
const guaranteeColors = ['forest', 'terracotta', 'sand', 'stone'] as const;

export default function AanpakPage() {
  const t = useTranslations('aanpakPage');

  const steps = stepIcons.map((icon, index) => ({
    icon,
    step: String(index + 1).padStart(2, '0'),
    title: t(`steps.${index}.title`),
    description: t(`steps.${index}.description`),
    details: [
      t(`steps.${index}.details.0`),
      t(`steps.${index}.details.1`),
      t(`steps.${index}.details.2`),
      t(`steps.${index}.details.3`)
    ],
    color: stepColors[index]
  }));

  const guarantees = guaranteeIcons.map((icon, index) => ({
    icon,
    title: t(`guarantees.${index}.title`),
    description: t(`guarantees.${index}.description`),
    color: guaranteeColors[index]
  }));

  const faqs = Array.from({ length: 6 }, (_, index) => ({
    question: t(`faqs.${index}.question`),
    answer: t(`faqs.${index}.answer`)
  }));
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cream-50 via-sand-50 to-forest-50/20 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sand-200 text-sm font-medium text-stone-600 mb-6">
                <span className="w-2 h-2 rounded-full bg-forest-500" />
                {t('badge')}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                {t('title')}
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                {t('description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {t('planConsultation')}
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+32493812789"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-stone-200 text-stone-700 rounded-full font-medium hover:border-forest-600 hover:text-forest-700 transition-all duration-300"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {t('callUs')}
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                  alt={t('title')}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-forest-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title={t('stepsTitle')}
            subtitle={t('stepsSubtitle')}
            badge={t('stepsBadge')}
          />
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  {/* Step number and icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl md:text-7xl font-display font-bold text-sand-100">
                      {step.step}
                    </span>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      step.color === 'forest' ? 'bg-forest-100' :
                      step.color === 'terracotta' ? 'bg-terracotta-100' :
                      step.color === 'sand' ? 'bg-sand-100' :
                      'bg-stone-100'
                    }`}>
                      <step.icon className={`h-7 w-7 ${
                        step.color === 'forest' ? 'text-forest-600' :
                        step.color === 'terracotta' ? 'text-terracotta-600' :
                        step.color === 'sand' ? 'text-sand-700' :
                        'text-stone-600'
                      }`} />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-stone-600 mb-6">{step.description}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-3 bg-cream-50 rounded-xl px-4 py-3">
                        <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${
                          step.color === 'forest' ? 'text-forest-600' :
                          step.color === 'terracotta' ? 'text-terracotta-600' :
                          step.color === 'sand' ? 'text-sand-700' :
                          'text-stone-600'
                        }`} />
                        <span className="text-stone-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual placeholder */}
                <div className={`relative h-72 lg:h-80 rounded-3xl overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    step.color === 'forest' ? 'bg-forest-50' :
                    step.color === 'terracotta' ? 'bg-terracotta-50' :
                    step.color === 'sand' ? 'bg-sand-50' :
                    'bg-stone-50'
                  }`}>
                    <step.icon className={`h-32 w-32 ${
                      step.color === 'forest' ? 'text-forest-200' :
                      step.color === 'terracotta' ? 'text-terracotta-200' :
                      step.color === 'sand' ? 'text-sand-200' :
                      'text-stone-200'
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section id="garanties" className="section-padding bg-gradient-to-br from-cream-50 to-sand-50 relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-forest-100/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <SectionHeader
            title={t('guaranteesTitle')}
            subtitle={t('guaranteesSubtitle')}
            badge={t('guaranteesBadge')}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee) => (
              <div key={guarantee.title} className="group bg-white rounded-3xl p-8 shadow-soft border border-sand-100 text-center hover:-translate-y-1 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 ${
                  guarantee.color === 'forest' ? 'bg-forest-100' :
                  guarantee.color === 'terracotta' ? 'bg-terracotta-100' :
                  guarantee.color === 'sand' ? 'bg-sand-100' :
                  'bg-stone-100'
                }`}>
                  <guarantee.icon className={`h-8 w-8 ${
                    guarantee.color === 'forest' ? 'text-forest-600' :
                    guarantee.color === 'terracotta' ? 'text-terracotta-600' :
                    guarantee.color === 'sand' ? 'text-sand-700' :
                    'text-stone-600'
                  }`} />
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">{guarantee.title}</h3>
                <p className="text-stone-600">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <SectionHeader
            title={t('faqTitle')}
            subtitle={t('faqSubtitle')}
            badge={t('faqBadge')}
          />
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-cream-50 rounded-2xl p-6 border border-sand-100">
                  <h3 className="text-lg font-display font-semibold text-stone-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-stone-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner variant="dark" />
    </>
  );
}
