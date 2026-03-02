'use client';

import Image from 'next/image';
import { ArrowRight, ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { trackCTAClick, trackClickToCall, CTALocation } from '@/lib/analytics';
import { homepageImages } from '@/lib/images';

// Tracked Link component for CTA buttons
function TrackedCTA({
  href,
  children,
  className,
  location,
  label,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  location: CTALocation;
  label: string;
  external?: boolean;
}) {
  const handleClick = () => {
    if (href.startsWith('tel:')) {
      trackClickToCall(href.replace('tel:', ''), location);
    } else {
      trackCTAClick(label, location, href);
    }
  };

  if (external || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href as '/offerte' | '/projecten' | '/afspraak' | '/diensten' | '/'} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

// Static data (non-translatable parts like images)
const serviceImages = homepageImages.services;
const projectImagesArr = homepageImages.projects;

// Scroll animation hook
function useScrollAnimation(options = { threshold: 0.1, rootMargin: '0px' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      options
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
}

// Animated section with stagger support
function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const { ref, isVisible } = useScrollAnimation();

  const transforms = {
    up: 'translateY(60px)',
    down: 'translateY(-60px)',
    left: 'translateX(60px)',
    right: 'translateX(-60px)',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : transforms[direction],
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  // Translated data
  const kernwaarden = [
    { id: 'attestering', title: t('values.attestering.title'), description: t('values.attestering.description'), icon: '01' },
    { id: 'circulariteit', title: t('values.circulariteit.title'), description: t('values.circulariteit.description'), icon: '02' },
    { id: 'betaling', title: t('values.betaling.title'), description: t('values.betaling.description'), icon: '03' },
    { id: 'subsidies', title: t('values.subsidies.title'), description: t('values.subsidies.description'), icon: '04' },
    { id: 'communicatie', title: t('values.communicatie.title'), description: t('values.communicatie.description'), icon: '05' },
  ];

  const services = [
    {
      title: t('services.items.fullRenovation.title'),
      subtitle: t('services.items.fullRenovation.subtitle'),
      description: t('services.items.fullRenovation.description'),
      href: '/diensten/totaalrenovatie' as const,
      image: serviceImages[0],
    },
    {
      title: t('services.items.renovation.title'),
      subtitle: t('services.items.renovation.subtitle'),
      description: t('services.items.renovation.description'),
      href: '/diensten/renovatie' as const,
      image: serviceImages[1],
    },
    {
      title: t('services.items.finishing.title'),
      subtitle: t('services.items.finishing.subtitle'),
      description: t('services.items.finishing.description'),
      href: '/diensten/afwerking' as const,
      image: serviceImages[2],
    },
  ];

  const projects = [
    {
      title: t('projects.items.0.title'),
      category: t('projects.items.0.category'),
      location: t('projects.items.0.location'),
      year: '2024',
      image: projectImagesArr[0],
      slug: 'meulemanstraat-34',
    },
    {
      title: t('projects.items.1.title'),
      category: t('projects.items.1.category'),
      location: t('projects.items.1.location'),
      year: '2024',
      image: projectImagesArr[1],
      slug: 'reginald-warnefordstraat',
    },
    {
      title: t('projects.items.2.title'),
      category: t('projects.items.2.category'),
      location: t('projects.items.2.location'),
      year: '2023',
      image: projectImagesArr[2],
      slug: 'afwerking-parijs',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ===== HERO SECTION - Clean, full-screen ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={homepageImages.hero}
            alt="Gerenoveerde gevel Meulemanstraat"
            fill
            className="object-cover"
            priority
          />
          {/* Single clean overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-noir-950/80 via-noir-950/50 to-noir-950/30" />
        </div>

        {/* Content */}
        <div className="container-wide relative z-10 pt-32 pb-32">
          <div className="max-w-3xl">
            {/* Main headline */}
            <h1 className="mb-8">
              <span
                className={`block text-[clamp(3rem,8vw,5.5rem)] font-display font-bold text-white leading-[1.05] tracking-[-0.02em] transition-all duration-700 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                {t('hero.title1')}
              </span>
              <span
                className={`block text-[clamp(3rem,8vw,5.5rem)] font-display font-bold leading-[1.05] tracking-[-0.02em] transition-all duration-700 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '450ms' }}
              >
                <span className="text-accent-400">{t('hero.title2')}</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg md:text-xl text-white/70 mb-10 max-w-lg leading-relaxed transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '750ms' }}
            >
              <TrackedCTA
                href="/offerte"
                location="hero"
                label={t('hero.ctaPrimary')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-600 text-white font-semibold rounded-full hover:bg-accent-500 transition-all duration-300"
              >
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </TrackedCTA>

              <TrackedCTA
                href="/projecten"
                location="hero"
                label={t('hero.ctaSecondary')}
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white hover:text-noir-900 transition-all duration-300"
              >
                <span>{t('hero.ctaSecondary')}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </TrackedCTA>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-10 bg-noir-950/60 backdrop-blur-md border-t border-white/10 transition-all duration-700 ${
            heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="container-wide py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-display font-bold text-white">10+</span>
                <span className="text-xs md:text-sm text-white/50 uppercase tracking-wider">{t('hero.stats.years')}</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-display font-bold text-white">50+</span>
                <span className="text-xs md:text-sm text-white/50 uppercase tracking-wider">{t('hero.stats.projects')}</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-display font-bold text-white">100%</span>
                <span className="text-xs md:text-sm text-white/50 uppercase tracking-wider">{t('hero.stats.satisfaction')}</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-display font-bold text-accent-400">&#10003;</span>
                <span className="text-xs md:text-sm text-white/50 uppercase tracking-wider">{t('hero.stats.certified')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY US SECTION - Split layout with image ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Image side */}
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={homepageImages.whyUs}
                  alt="Moderne keuken renovatie"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            {/* Content side */}
            <div>
              <AnimatedSection>
                <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-6">
                  {t('whyUs.badge')}
                </span>
                <h2 className="text-display-lg font-display font-bold text-noir-900 mb-6">
                  {t('whyUs.titlePrefix')}{' '}
                  <span className="text-accent-600">{t('whyUs.titleHighlight')}</span>
                </h2>
                <p className="text-lg text-noir-500 mb-10 leading-relaxed">
                  {t('whyUs.description')}
                </p>
              </AnimatedSection>

              {/* Values list */}
              <div className="space-y-3">
                {kernwaarden.map((waarde, index) => (
                  <AnimatedSection key={waarde.id} delay={index * 100}>
                    <div className="group flex gap-5 p-4 bg-noir-50 rounded-xl hover:bg-accent-50 transition-all duration-300 cursor-default">
                      {/* Number */}
                      <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-white rounded-lg group-hover:bg-accent-600 transition-colors duration-300">
                        <span className="text-sm font-semibold text-noir-400 group-hover:text-white transition-colors">
                          {waarde.icon}
                        </span>
                      </div>
                      {/* Content */}
                      <div>
                        <h3 className="font-semibold text-noir-900 mb-0.5 group-hover:text-accent-700 transition-colors">
                          {waarde.title}
                        </h3>
                        <p className="text-noir-500 text-sm">{waarde.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* CTA */}
              <AnimatedSection delay={600} className="mt-8">
                <TrackedCTA
                  href="/afspraak"
                  location="services"
                  label={t('whyUs.cta')}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-600 text-white font-semibold rounded-full hover:bg-accent-500 transition-all duration-300"
                >
                  <span>{t('whyUs.cta')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </TrackedCTA>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION - Split layout De Raedt style ===== */}
      <section className="section-padding bg-noir-50 relative overflow-hidden">
        <div className="container-wide">
          {/* Header */}
          <AnimatedSection className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <div>
                <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-6">
                  {t('services.badge')}
                </span>
                <h2 className="text-display-lg font-display font-bold text-noir-900">
                  {t('services.titlePrefix')}{' '}
                  <span className="text-accent-600">{t('services.titleHighlight')}</span>{' '}
                  {t('services.titleSuffix')}
                </h2>
              </div>
              <p className="text-lg text-noir-500 lg:pl-12 leading-relaxed">
                {t('services.description')}
              </p>
            </div>
          </AnimatedSection>

          {/* Services — split layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: large image */}
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={serviceImages[0]}
                  alt={services[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 bg-accent-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                    {t('services.badge')}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                    {t('services.titlePrefix')} {t('services.titleHighlight')}
                  </h3>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: services list with separator lines */}
            <div className="flex flex-col justify-center">
              {services.map((service, index) => (
                <AnimatedSection key={service.title} delay={index * 100}>
                  <Link
                    href={service.href}
                    className="group flex items-center justify-between py-6 border-b border-noir-200 hover:border-accent-400 transition-colors duration-300"
                  >
                    <div className="flex-1">
                      <span className="text-xs text-accent-600 font-semibold uppercase tracking-wider mb-1 block">
                        {service.subtitle}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-noir-900 group-hover:text-accent-600 transition-colors duration-300 mb-1">
                        {service.title}
                      </h3>
                      <p className="text-noir-500 text-sm max-w-md">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-6 w-10 h-10 flex items-center justify-center rounded-full border border-noir-200 group-hover:bg-accent-600 group-hover:border-accent-600 transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4 text-noir-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </Link>
                </AnimatedSection>
              ))}

              {/* View all link */}
              <AnimatedSection delay={400} className="mt-8">
                <Link
                  href="/diensten"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
                >
                  <span className="uppercase tracking-wider">{t('services.viewAll')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION - Light background, editorial grid ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-wide">
          {/* Header */}
          <AnimatedSection className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-6">
                  {t('projects.badge')}
                </span>
                <h2 className="text-display-lg font-display font-bold text-noir-900">
                  {t('projects.titlePrefix')}{' '}
                  <span className="text-accent-600">{t('projects.titleHighlight')}</span>
                </h2>
              </div>
              <Link
                href="/projecten"
                className="group inline-flex items-center gap-3 text-noir-500 hover:text-accent-600 transition-colors"
              >
                <span className="text-sm font-semibold uppercase tracking-wider">
                  {t('projects.viewAll')}
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Projects grid - Editorial layout */}
          <div className="grid md:grid-cols-12 gap-6 lg:gap-8">
            {/* Large featured project */}
            <AnimatedSection className="md:col-span-7">
              <Link href={{ pathname: '/projecten/[slug]', params: { slug: projects[0].slug } }} className="group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={projects[0].image}
                    alt={projects[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-noir-950/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <span className="inline-block self-start px-3 py-1 bg-accent-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                      {projects[0].category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                      {projects[0].title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {projects[0].location}
                      </div>
                      <span className="text-white/30">|</span>
                      <span>{projects[0].year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>

            {/* Smaller projects */}
            <div className="md:col-span-5 grid gap-6 lg:gap-8">
              {projects.slice(1).map((project, index) => (
                <AnimatedSection key={project.title} delay={(index + 1) * 150}>
                  <Link href={{ pathname: '/projecten/[slug]', params: { slug: project.slug } }} className="group block">
                    <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-noir-950/10 to-transparent" />

                      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                        <span className="inline-block self-start px-2.5 py-0.5 bg-accent-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-lg md:text-xl font-display font-bold text-white mb-1">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-white/50 text-sm">
                          <MapPin className="h-3 w-3" />
                          {project.location}
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION - Solid navy background ===== */}
      <section className="section-padding bg-noir-900 relative overflow-hidden">
        <div className="container-wide relative">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-lg md:text-display-xl font-display font-bold text-white mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-lg md:text-xl text-noir-400 mb-10 leading-relaxed">
                {t('cta.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <TrackedCTA
                  href="/offerte"
                  location="cta_banner"
                  label={t('cta.button')}
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent-600 text-white font-semibold rounded-full hover:bg-accent-500 transition-all duration-300"
                >
                  <span>{t('cta.button')}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </TrackedCTA>

                <TrackedCTA
                  href="tel:+32493812789"
                  location="cta_banner"
                  label={tCommon('callUs')}
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-noir-700 text-white font-semibold rounded-full hover:bg-white hover:text-noir-900 hover:border-white transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  <span>+32 493 81 27 89</span>
                </TrackedCTA>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
