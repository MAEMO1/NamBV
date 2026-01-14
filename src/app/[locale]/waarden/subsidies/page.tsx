'use client';

import Image from 'next/image';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  ExternalLink,
  AlertCircle,
  Euro,
  FileCheck,
  ArrowUpRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CTABanner } from '@/components';

const premieLinks = [
  'https://www.vlaanderen.be/premies-voor-renovatie/mijn-verbouwpremie',
  'https://www.vlaanderen.be/lenen-voor-een-woning/mijn-verbouwlening',
  '#'
];

export default function SubsidiesPage() {
  const t = useTranslations('waardenSubsidies');

  const whatWeDo = Array.from({ length: 4 }, (_, i) => t(`whatWeDo.items.${i}`));
  const whatYouDo = Array.from({ length: 2 }, (_, i) => t(`whatYouDo.items.${i}`));

  const premieTypes = Array.from({ length: 3 }, (_, i) => ({
    title: t(`premieTypes.${i}.title`),
    description: t(`premieTypes.${i}.description`),
    link: premieLinks[i],
    linkText: i < 2 ? t(`premieTypes.${i}.linkText`) : undefined
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
                <Shield className="h-4 w-4" />
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
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
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

      {/* What we do / What you do */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
              {t('collaborationSection.badge')}
            </span>
            <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
              {t('collaborationSection.title')}
            </h2>
            <p className="text-xl text-noir-500">
              {t('collaborationSection.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* What we do */}
            <div className="bg-ivory-100 p-10 border border-ivory-200">
              <div className="w-14 h-14 bg-noir-900 flex items-center justify-center mb-6">
                <FileCheck className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-display font-medium text-noir-900 mb-6">
                {t('whatWeDo.title')}
              </h3>
              <div className="space-y-4">
                {whatWeDo.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-noir-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What you do */}
            <div className="bg-ivory-100 p-10 border border-ivory-200">
              <div className="w-14 h-14 bg-accent-500 flex items-center justify-center mb-6">
                <Euro className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-display font-medium text-noir-900 mb-6">
                {t('whatYouDo.title')}
              </h3>
              <div className="space-y-4">
                {whatYouDo.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-noir-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-ivory-300">
                <p className="text-noir-500 text-sm">
                  {t('whatYouDo.footer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premie Types */}
      <section className="py-24 md:py-32 bg-ivory-100">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
              {t('premiesSection.badge')}
            </span>
            <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
              {t('premiesSection.title')}
            </h2>
            <p className="text-xl text-noir-500">
              {t('premiesSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {premieTypes.map((premie) => (
              <div key={premie.title} className="bg-white p-8 border border-ivory-200 hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-display font-medium text-noir-900 mb-3">{premie.title}</h3>
                <p className="text-noir-500 mb-6">{premie.description}</p>
                {premie.link !== '#' && premie.linkText && (
                  <a
                    href={premie.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors"
                  >
                    {premie.linkText}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-24 md:py-32 bg-noir-900">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-6 mb-8">
              <AlertCircle className="h-8 w-8 text-accent-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-4">
                  {t('importantNotice.title')}
                </h2>
                <p className="text-noir-300 text-lg mb-6">
                  {t('importantNotice.description')}
                </p>
                <p className="text-noir-400 mb-8">
                  {t('importantNotice.footer')}
                </p>
                <a
                  href="https://www.vlaanderen.be/premies-voor-renovatie/mijn-verbouwpremie/wijzigingen-mijn-verbouwpremie-vanaf-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-accent-500 hover:text-white transition-colors"
                >
                  {t('importantNotice.linkText')}
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <a
                href="https://www.vlaanderen.be/premies-voor-renovatie/mijn-verbouwpremie"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 border border-noir-700 text-white font-medium uppercase tracking-wide hover:bg-white hover:text-noir-900 hover:border-white transition-all duration-300"
              >
                Mijn VerbouwPremie
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://www.vlaanderen.be/lenen-voor-een-woning/mijn-verbouwlening"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 border border-noir-700 text-white font-medium uppercase tracking-wide hover:bg-white hover:text-noir-900 hover:border-white transition-all duration-300"
              >
                Mijn VerbouwLening
                <ExternalLink className="h-4 w-4" />
              </a>
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
