'use client';

import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Home, Hammer, Paintbrush, Zap, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { servicePageImages } from '@/lib/images';

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Animated section
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const serviceImages = [
  servicePageImages.totaalrenovatie.card,
  servicePageImages.renovatie.card,
  servicePageImages.afwerking.card,
  servicePageImages.technieken.card,
];

const serviceIcons = [Home, Hammer, Paintbrush, Zap];
const serviceHrefs = [
  '/diensten/totaalrenovatie',
  '/diensten/renovatie',
  '/diensten/afwerking',
  '/diensten/technieken',
] as const;

export default function DienstenPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const t = useTranslations('servicesPage');
  const tCommon = useTranslations('common');

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  const services = [
    {
      icon: serviceIcons[0],
      title: t('services.fullRenovation.title'),
      subtitle: t('services.fullRenovation.subtitle'),
      description: t('services.fullRenovation.description'),
      features: [
        t('services.fullRenovation.features.0'),
        t('services.fullRenovation.features.1'),
        t('services.fullRenovation.features.2'),
        t('services.fullRenovation.features.3'),
        t('services.fullRenovation.features.4'),
      ],
      href: serviceHrefs[0],
      image: serviceImages[0],
      tag: t('services.fullRenovation.tag'),
    },
    {
      icon: serviceIcons[1],
      title: t('services.renovation.title'),
      subtitle: t('services.renovation.subtitle'),
      description: t('services.renovation.description'),
      features: [
        t('services.renovation.features.0'),
        t('services.renovation.features.1'),
        t('services.renovation.features.2'),
        t('services.renovation.features.3'),
        t('services.renovation.features.4'),
      ],
      href: serviceHrefs[1],
      image: serviceImages[1],
    },
    {
      icon: serviceIcons[2],
      title: t('services.finishing.title'),
      subtitle: t('services.finishing.subtitle'),
      description: t('services.finishing.description'),
      features: [
        t('services.finishing.features.0'),
        t('services.finishing.features.1'),
        t('services.finishing.features.2'),
        t('services.finishing.features.3'),
        t('services.finishing.features.4'),
      ],
      href: serviceHrefs[2],
      image: serviceImages[2],
    },
    {
      icon: serviceIcons[3],
      title: t('services.technical.title'),
      subtitle: t('services.technical.subtitle'),
      description: t('services.technical.description'),
      features: [
        t('services.technical.features.0'),
        t('services.technical.features.1'),
        t('services.technical.features.2'),
        t('services.technical.features.3'),
        t('services.technical.features.4'),
      ],
      href: serviceHrefs[3],
      image: serviceImages[3],
    },
  ];

  const whyUs = [
    {
      number: '01',
      title: t('whyUs.items.0.title'),
      description: t('whyUs.items.0.description'),
    },
    {
      number: '02',
      title: t('whyUs.items.1.title'),
      description: t('whyUs.items.1.description'),
    },
    {
      number: '03',
      title: t('whyUs.items.2.title'),
      description: t('whyUs.items.2.description'),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-noir-50 overflow-hidden">
        <div className="container-wide relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <span
              className={`inline-block px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-6 transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('hero.badge')}
            </span>

            <h1
              className={`text-display-lg md:text-display-xl font-display font-bold text-noir-900 mb-6 transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              {t('hero.titlePrefix')}{' '}
              <span className="text-accent-600">{t('hero.titleHighlight')}</span>
            </h1>

            <p
              className={`text-lg md:text-xl text-noir-500 leading-relaxed transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Premium cards */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Link href={service.href} className="group block">
                  <div className="relative bg-white rounded-2xl border border-noir-100 overflow-hidden h-full hover:border-noir-200 hover:shadow-soft transition-all duration-300">
                    {/* Image section */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir-900/60 via-noir-900/10 to-transparent" />

                      {/* Tag */}
                      {service.tag && (
                        <span className="absolute top-5 left-5 px-3 py-1.5 bg-accent-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                          {service.tag}
                        </span>
                      )}

                      {/* Icon */}
                      <div className="absolute bottom-5 right-5 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center group-hover:bg-accent-600 transition-colors duration-300">
                        <service.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <span className="text-xs text-accent-600 font-semibold uppercase tracking-wider mb-2 block">
                        {service.subtitle}
                      </span>
                      <h2 className="text-xl md:text-2xl font-display font-bold text-noir-900 mb-3 group-hover:text-accent-600 transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-noir-500 mb-5 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Features preview */}
                      <ul className="space-y-2 mb-5">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-noir-600">
                            <CheckCircle2 className="h-4 w-4 text-accent-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-accent-600 font-semibold group-hover:gap-3 transition-all duration-300">
                        <span className="text-sm">{tCommon('learnMore')}</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-noir-950 relative overflow-hidden">
        {/* Architectural grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[25%] w-px h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-[50%] w-px h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-[75%] w-px h-full bg-white/[0.03]" />
          <div className="absolute top-[33%] left-0 w-full h-px bg-white/[0.03]" />
          <div className="absolute top-[66%] left-0 w-full h-px bg-white/[0.03]" />
        </div>

        {/* Accent gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-accent-600/10 to-transparent" />

        <div className="container-wide relative">
          {/* Section header */}
          <AnimatedSection className="mb-20">
            <div className="max-w-xl">
              <span className="text-accent-400 text-sm font-medium uppercase tracking-[0.3em] mb-4 block">
                {t('whyUs.badge')}
              </span>
              <h2 className="text-display-lg font-display text-white mb-6">
                {t('whyUs.title')}
              </h2>
              <p className="text-noir-400 text-lg leading-relaxed">
                {t('whyUs.description')}
              </p>
            </div>
          </AnimatedSection>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-px bg-white/[0.05]">
            {whyUs.map((item, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="group relative bg-noir-950 p-10 md:p-12 h-full hover:bg-noir-900 transition-colors duration-500">
                  {/* Large number */}
                  <span className="absolute top-8 right-8 text-[120px] font-display font-medium leading-none text-white/[0.03] group-hover:text-accent-500/10 transition-colors duration-500 select-none">
                    {item.number}
                  </span>

                  {/* Content */}
                  <div className="relative">
                    {/* Number indicator */}
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-accent-400 font-display text-sm tracking-wider">
                        {item.number}
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-accent-500/50 to-transparent" />
                    </div>

                    <h3 className="text-2xl font-display text-white mb-4 group-hover:text-accent-300 transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-noir-400 leading-relaxed group-hover:text-noir-300 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-500 group-hover:w-full transition-all duration-700" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-noir-900 relative overflow-hidden">
        <div className="container-wide relative">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-lg font-display font-bold text-white mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-lg md:text-xl text-noir-400 mb-10 leading-relaxed">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/offerte"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent-600 text-white font-semibold rounded-full hover:bg-accent-500 transition-all duration-300"
                >
                  <span>{t('cta.buttonPrimary')}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/afspraak"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-noir-700 text-white font-semibold rounded-full hover:bg-white hover:text-noir-900 hover:border-white transition-all duration-300"
                >
                  <span>{t('cta.buttonSecondary')}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
