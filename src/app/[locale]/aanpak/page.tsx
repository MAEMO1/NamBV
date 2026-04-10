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
import { aanpakImages } from '@/lib/images';

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
      <section className="relative bg-white py-20 md:py-28 overflow-hidden">
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-600" />
                {t('badge')}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-noir-900 mb-6">
                {t('title')}
              </h1>
              <p className="text-xl text-noir-500 leading-relaxed mb-8">
                {t('description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-accent-600 text-white rounded-full font-semibold hover:bg-accent-700 transition-all duration-300 hover:shadow-lg hover:shadow-accent-600/25"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {t('planConsultation')}
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+32493812789"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-noir-200 text-noir-700 rounded-full font-semibold hover:border-accent-600 hover:text-accent-700 transition-all duration-300"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {t('callUs')}
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={aanpakImages.hero}
                  alt={t('title')}
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
                    <span className="text-6xl md:text-7xl font-display font-bold text-noir-100">
                      {step.step}
                    </span>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-accent-100">
                      <step.icon className="h-7 w-7 text-accent-600" />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-bold text-noir-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-noir-500 mb-6">{step.description}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-3 bg-noir-50 rounded-xl px-4 py-3">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent-600" />
                        <span className="text-noir-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual placeholder */}
                <div className={`relative h-72 lg:h-80 rounded-2xl overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="absolute inset-0 flex items-center justify-center bg-noir-50">
                    <step.icon className="h-32 w-32 text-noir-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section id="garanties" className="section-padding bg-noir-50 relative overflow-hidden scroll-mt-24">
        <div className="container-custom relative">
          <SectionHeader
            title={t('guaranteesTitle')}
            subtitle={t('guaranteesSubtitle')}
            badge={t('guaranteesBadge')}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee) => (
              <div key={guarantee.title} className="group bg-white rounded-2xl p-8 shadow-soft border border-noir-100 text-center hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 bg-accent-100">
                  <guarantee.icon className="h-8 w-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-noir-900 mb-3">{guarantee.title}</h3>
                <p className="text-noir-500">{guarantee.description}</p>
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
                <div key={index} className="bg-noir-50 rounded-2xl p-6 border border-noir-100">
                  <h3 className="text-lg font-display font-bold text-noir-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-noir-500">{faq.answer}</p>
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
