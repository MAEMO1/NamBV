'use client';

import Image from 'next/image';
import {
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  Users,
  Smartphone,
  Mail,
  Phone,
  ArrowUpRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CTABanner } from '@/components';

const pillarIcons = [Users, Smartphone, Mail];

export default function CommunicatiePage() {
  const t = useTranslations('waardenCommunicatie');

  const communicationPillars = pillarIcons.map((icon, index) => ({
    icon,
    title: t(`pillars.${index}.title`),
    description: t(`pillars.${index}.description`),
  }));

  const expectations = Array.from({ length: 5 }, (_, i) => t(`expectations.items.${i}`));
  const channels = Array.from({ length: 3 }, (_, i) => t(`alwaysInformed.channels.${i}`));
  const timelineItems = Array.from({ length: 4 }, (_, i) => ({
    week: t(`timeline.items.${i}.week`),
    title: t(`timeline.items.${i}.title`),
    description: t(`timeline.items.${i}.description`)
  }));
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ivory-100 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          {/* Breadcrumb */}
          <Link href="/" className="inline-flex items-center gap-2 text-noir-500 hover:text-accent-500 transition-colors mb-8 text-sm uppercase tracking-wide">
            <ArrowLeft className="h-4 w-4" />
            <span>{t('backToValues')}</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-noir-200 text-sm font-medium text-noir-600 mb-6 uppercase tracking-wide">
                <MessageSquare className="h-4 w-4" />
                {t('badge')}
              </span>

              <h1 className="text-display-lg font-display font-medium text-noir-900 mb-6">
                {t('title')}
              </h1>
              <p className="text-xl text-noir-500 leading-relaxed mb-10">
                {t('description')}
              </p>
              <Link
                href="/afspraak"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-noir-900 text-white font-medium uppercase tracking-wide hover:bg-accent-500 transition-all duration-500"
              >
                {t('cta')}
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                  alt={t('imageAlt')}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Communication Pillars */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
              {t('pillarsSection.badge')}
            </span>
            <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
              {t('pillarsSection.title')}
            </h2>
            <p className="text-xl text-noir-500">
              {t('pillarsSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {communicationPillars.map((pillar) => (
              <div key={pillar.title} className="bg-ivory-100 p-8 border border-ivory-200">
                <div className="w-14 h-14 bg-noir-900 flex items-center justify-center mb-6">
                  <pillar.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-display font-medium text-noir-900 mb-3">{pillar.title}</h3>
                <p className="text-noir-500">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-24 md:py-32 bg-ivory-100">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
                {t('expectations.badge')}
              </span>
              <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
                {t('expectations.title')}
              </h2>
              <p className="text-xl text-noir-500 mb-8">
                {t('expectations.subtitle')}
              </p>

              <div className="space-y-4">
                {expectations.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white px-5 py-4 border border-ivory-200">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0" />
                    <span className="text-noir-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-noir-900 p-10 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-noir-800 mb-6">
                <MessageSquare className="h-8 w-8 text-accent-500" />
              </div>
              <h3 className="text-2xl font-display font-medium mb-4">{t('alwaysInformed.title')}</h3>
              <p className="text-noir-400 mb-6">
                {t('alwaysInformed.description')}
              </p>

              <div className="space-y-4 pt-6 border-t border-noir-800">
                {[Phone, Mail, Smartphone].map((Icon, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-accent-500" />
                    <span className="text-noir-300">{channels[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline example */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
                {t('timeline.badge')}
              </span>
              <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
                {t('timeline.title')}
              </h2>
            </div>

            <div className="space-y-6">
              {timelineItems.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="w-28 text-right text-noir-400 text-sm pt-4 uppercase tracking-wide">{item.week}</div>
                  <div className="flex-1 bg-ivory-100 p-6 border border-ivory-200">
                    <h4 className="font-medium text-noir-900 mb-2">{item.title}</h4>
                    <p className="text-noir-500 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title={t('ctaBanner.title')}
        subtitle={t('ctaBanner.subtitle')}
      />
    </>
  );
}
