'use client';

import Image from 'next/image';
import {
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  Wallet,
  PiggyBank,
  ArrowUpRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CTABanner } from '@/components';
import { waardenImages } from '@/lib/images';

export default function BetalingsspreidingPage() {
  const t = useTranslations('waardenBetalingsspreiding');

  const paymentPhases = Array.from({ length: 4 }, (_, i) => ({
    phase: t(`phases.${i}.phase`),
    icon: String(i + 1),
    desc: t(`phases.${i}.desc`),
    detail: t(`phases.${i}.detail`)
  }));

  const benefits = Array.from({ length: 6 }, (_, i) => t(`benefits.items.${i}`));
  const howItWorksItems = Array.from({ length: 4 }, (_, i) => t(`budgetFriendly.howItWorksItems.${i}`));
  const transparencySteps = Array.from({ length: 3 }, (_, i) => ({
    title: t(`transparency.steps.${i}.title`),
    description: t(`transparency.steps.${i}.description`)
  }));
  return (
    <>
      {/* Hero */}
      <section className="relative bg-noir-50 py-24 md:py-32 overflow-hidden">
        <div className="container-wide relative">
          {/* Breadcrumb */}
          <Link href="/" className="inline-flex items-center gap-2 text-noir-500 hover:text-accent-500 transition-colors mb-8 text-sm uppercase tracking-wide">
            <ArrowLeft className="h-4 w-4" />
            <span>{t('backToValues')}</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-accent-100 text-xs font-semibold text-accent-700 mb-6 uppercase tracking-[0.15em]">
                <CreditCard className="h-4 w-4" />
                {t('badge')}
              </span>

              <h1 className="text-display-lg font-display font-bold text-noir-900 mb-6">
                {t('title')}
              </h1>
              <p className="text-xl text-noir-500 leading-relaxed mb-10">
                {t('description')}
              </p>
              <Link
                href="/afspraak"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-noir-900 text-white font-semibold uppercase tracking-wide rounded-full hover:bg-accent-600 transition-all duration-500"
              >
                {t('cta')}
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] overflow-hidden rounded-2xl">
                <Image
                  src={waardenImages.betalingsspreiding.hero}
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

      {/* Payment Plan */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="inline-flex rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              {t('paymentPlan.badge')}
            </span>
            <h2 className="text-display-md font-display font-bold text-noir-900 mb-6">
              {t('paymentPlan.title')}
            </h2>
            <p className="text-xl text-noir-500">
              {t('paymentPlan.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentPhases.map((item, index) => (
              <div key={item.phase} className="relative bg-noir-50 p-6 rounded-2xl">
                {/* Progress line */}
                {index < paymentPhases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-noir-200" />
                )}

                <div className="w-16 h-16 bg-noir-900 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-xl font-display font-bold text-white">{item.icon}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-noir-900 mb-2">{item.phase}</h3>
                <p className="text-noir-600 mb-2">{item.desc}</p>
                <p className="text-sm text-noir-400">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Info box */}
          <div className="mt-16 bg-accent-50 p-8 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-noir-900 mb-2">
                  {t('infoBox.title')}
                </h3>
                <p className="text-noir-600">
                  {t('infoBox.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-32 bg-noir-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
                {t('benefits.badge')}
              </span>
              <h2 className="text-display-md font-display font-bold text-noir-900 mb-6">
                {t('benefits.title')}
              </h2>
              <p className="text-xl text-noir-500 mb-8">
                {t('benefits.subtitle')}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0" />
                    <span className="text-noir-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-noir-900 p-10 rounded-2xl text-white">
              <Wallet className="h-12 w-12 text-accent-500 mb-6" />
              <h3 className="text-2xl font-display font-bold mb-4">{t('budgetFriendly.title')}</h3>
              <p className="text-noir-400 mb-6">
                {t('budgetFriendly.description')}
              </p>

              <div className="bg-noir-800 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <PiggyBank className="h-8 w-8 text-accent-500" />
                  <span className="font-medium">{t('budgetFriendly.howItWorks')}</span>
                </div>
                <div className="space-y-2 text-noir-300 text-sm">
                  {howItWorksItems.map((item, index) => (
                    <p key={index}>• {item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              {t('transparency.badge')}
            </span>
            <h2 className="text-display-md font-display font-bold text-noir-900 mb-6">
              {t('transparency.title')}
            </h2>
            <p className="text-xl text-noir-500 mb-12">
              {t('transparency.subtitle')}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {transparencySteps.map((step, index) => (
                <div key={index} className="bg-noir-50 p-8 rounded-2xl">
                  <div className={`w-14 h-14 ${index === 2 ? 'bg-accent-600' : 'bg-noir-900'} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    {index === 2 ? (
                      <CheckCircle2 className="h-7 w-7 text-white" />
                    ) : (
                      <span className="text-2xl text-white">{index + 1}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-noir-900 mb-2">{step.title}</h3>
                  <p className="text-noir-500 text-sm">{step.description}</p>
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
