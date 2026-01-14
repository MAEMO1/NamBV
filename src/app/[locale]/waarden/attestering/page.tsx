'use client';

import Image from 'next/image';
import {
  FileCheck,
  Shield,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  Award,
  FileText,
  ArrowUpRight
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CTABanner } from '@/components';

const certificationIcons = [Shield, FileText, Award, FileCheck];

export default function AttesteringPage() {
  const t = useTranslations('waardenAttestering');

  const certifications = certificationIcons.map((icon, index) => ({
    icon,
    title: t(`certifications.${index}.title`),
    description: t(`certifications.${index}.description`),
  }));

  const whatWeDo = Array.from({ length: 5 }, (_, i) => t(`whatWeDo.items.${i}`));
  const whatYouGet = Array.from({ length: 4 }, (_, i) => t(`whatYouGet.items.${i}`));
  const withoutItems = Array.from({ length: 3 }, (_, i) => t(`whyImportant.withoutItems.${i}`));
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
                <FileCheck className="h-4 w-4" />
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
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
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

      {/* Certifications Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
              {t('certificatesSection.badge')}
            </span>
            <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
              {t('certificatesSection.title')}
            </h2>
            <p className="text-xl text-noir-500">
              {t('certificatesSection.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert) => (
              <div key={cert.title} className="group bg-ivory-100 p-8 border border-ivory-200 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-noir-900 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <cert.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-display font-medium text-noir-900 mb-3">{cert.title}</h3>
                <p className="text-noir-500">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do / What you get */}
      <section className="py-24 md:py-32 bg-ivory-100">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* What we do */}
            <div className="bg-white p-10 border border-ivory-200">
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

            {/* What you get */}
            <div className="bg-noir-900 p-10 text-white">
              <h3 className="text-2xl font-display font-medium mb-6">
                {t('whatYouGet.title')}
              </h3>
              <div className="space-y-4">
                {whatYouGet.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-noir-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-noir-800">
                <p className="text-noir-400 text-sm">
                  {t('whatYouGet.footer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
                alt={t('imageAlt')}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
                {t('whyImportant.badge')}
              </span>
              <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
                {t('whyImportant.title')}
              </h2>
              <p className="text-lg text-noir-500 mb-8">
                {t('whyImportant.description')}
              </p>

              <div className="bg-ivory-100 p-6 border border-ivory-200">
                <h4 className="font-medium text-noir-900 mb-3">{t('whyImportant.withoutTitle')}</h4>
                <ul className="space-y-2 text-noir-500">
                  {withoutItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-noir-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
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
