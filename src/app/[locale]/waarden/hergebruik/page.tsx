'use client';

import Image from 'next/image';
import {
  Recycle,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  ArrowUpRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CTABanner } from '@/components';
import { waardenImages } from '@/lib/images';

export default function HergebruikPage() {
  const t = useTranslations('waardenHergebruik');

  const circularApproach = Array.from({ length: 4 }, (_, i) => ({
    step: t(`steps.${i}.step`),
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`)
  }));

  const benefits = Array.from({ length: 6 }, (_, i) => t(`benefits.items.${i}`));

  const examples = Array.from({ length: 2 }, (_, i) => ({
    title: t(`examples.${i}.title`),
    description: t(`examples.${i}.description`),
    tag: t(`examples.${i}.tag`)
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
                <Recycle className="h-4 w-4" />
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
                  src={waardenImages.hergebruik.hero}
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

      {/* Circular approach */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="inline-flex rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              {t('approachSection.badge')}
            </span>
            <h2 className="text-display-md font-display font-bold text-noir-900 mb-6">
              {t('approachSection.title')}
            </h2>
            <p className="text-xl text-noir-500">
              {t('approachSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {circularApproach.map((step) => (
              <div key={step.step} className="relative bg-noir-50 p-8 rounded-2xl">
                <span className="text-5xl font-display font-bold text-noir-200">{step.step}</span>
                <h3 className="text-xl font-display font-bold text-noir-900 mt-4 mb-2">{step.title}</h3>
                <p className="text-noir-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Examples */}
      <section className="py-24 md:py-32 bg-noir-50">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="inline-flex rounded-full px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              {t('practiceSection.badge')}
            </span>
            <h2 className="text-display-md font-display font-bold text-noir-900 mb-6">
              {t('practiceSection.title')}
            </h2>
            <p className="text-xl text-noir-500">
              {t('practiceSection.subtitle')}
            </p>
          </div>

          {/* Before/After Cards */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Example 1 */}
            <div className="bg-white overflow-hidden rounded-2xl">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src={waardenImages.hergebruik.beforeAfter1.before}
                      alt={t('beforeAfter.before')}
                      fill
                      className="object-cover brightness-90 sepia-[0.2]"
                    />
                    <div className="absolute inset-0 bg-noir-900/30" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1.5 bg-noir-900/80 backdrop-blur-sm rounded-full text-white text-sm font-semibold uppercase tracking-wide">
                      {t('beforeAfter.before')}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src={waardenImages.hergebruik.beforeAfter1.after}
                      alt={t('beforeAfter.after')}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3 py-1.5 bg-accent-600 rounded-full text-white text-sm font-semibold uppercase tracking-wide">
                      {t('beforeAfter.after')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-noir-900 mb-2">
                  {examples[0].title}
                </h3>
                <p className="text-noir-500 mb-4">
                  {examples[0].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-noir-50 text-noir-600 text-sm uppercase tracking-wide">
                    {examples[0].tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-white overflow-hidden rounded-2xl">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src={waardenImages.hergebruik.beforeAfter2.before}
                      alt={t('beforeAfter.before')}
                      fill
                      className="object-cover brightness-75 sepia-[0.3]"
                    />
                    <div className="absolute inset-0 bg-noir-900/30" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1.5 bg-noir-900/80 backdrop-blur-sm rounded-full text-white text-sm font-semibold uppercase tracking-wide">
                      {t('beforeAfter.before')}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src={waardenImages.hergebruik.beforeAfter2.after}
                      alt={t('beforeAfter.after')}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3 py-1.5 bg-accent-600 rounded-full text-white text-sm font-semibold uppercase tracking-wide">
                      {t('beforeAfter.after')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-noir-900 mb-2">
                  {examples[1].title}
                </h3>
                <p className="text-noir-500 mb-4">
                  {examples[1].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-noir-50 text-noir-600 text-sm uppercase tracking-wide">
                    {examples[1].tag}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-noir-900 p-10 rounded-2xl">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2">70%</p>
                <p className="text-noir-400 uppercase tracking-wide text-sm">{t('stats.lessWaste')}</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold text-accent-500 mb-2">€2.500+</p>
                <p className="text-noir-400 uppercase tracking-wide text-sm">{t('stats.savings')}</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2">100%</p>
                <p className="text-noir-400 uppercase tracking-wide text-sm">{t('stats.character')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-32 bg-white">
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
                  <div key={benefit} className="flex items-center gap-3 bg-noir-50 px-5 py-4 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0" />
                    <span className="text-noir-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-96 overflow-hidden rounded-2xl">
              <Image
                src={waardenImages.hergebruik.benefits}
                alt={t('imageAlt')}
                fill
                className="object-cover"
              />
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
