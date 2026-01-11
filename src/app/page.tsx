'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, MapPin, Phone, CheckCircle2, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// The 5 Core Values
const kernwaarden = [
  { id: 'attestering', title: 'Volledige Attestering', description: 'AREI-conforme installaties en EPB-attesten' },
  { id: 'circulariteit', title: 'Hergebruik & Circulariteit', description: 'Duurzaam renoveren met respect voor materialen' },
  { id: 'betaling', title: 'Betalingsspreiding', description: 'Transparante 30-30-30-10 betalingsregeling' },
  { id: 'subsidies', title: 'Subsidie-ondersteuning', description: 'Maximaal profiteren van beschikbare premies' },
  { id: 'communicatie', title: 'Heldere Communicatie', description: 'Eén vast aanspreekpunt, wekelijkse updates' },
];

const services = [
  {
    title: 'Totaalrenovatie',
    description: 'Volledige transformatie van uw woning. Van concept tot oplevering onder één dak.',
    href: '/diensten/totaalrenovatie',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  },
  {
    title: 'Renovatie',
    description: 'Gerichte verbouwingen en renovaties. Badkamer, keuken of uitbreiding.',
    href: '/diensten/renovatie',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
  },
  {
    title: 'Afwerking',
    description: 'Tegelwerk, plakwerk en schilderwerk. Vakkundige afwerking die het verschil maakt.',
    href: '/diensten/afwerking',
    image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=800&h=600&fit=crop',
  },
];

const projects = [
  {
    title: 'Herenhuis Centrum',
    category: 'Totaalrenovatie',
    location: 'Gent',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
  },
  {
    title: 'Rijwoning Mariakerke',
    category: 'Renovatie & Afwerking',
    location: 'Mariakerke',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
  },
  {
    title: 'Appartement Zuid',
    category: 'Badkamerrenovatie',
    location: 'Ledeberg',
    image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=800&h=600&fit=crop',
  },
];

const stats = [
  { value: '150+', label: 'Projecten' },
  { value: '12', label: 'Jaar ervaring' },
  { value: '98%', label: 'Tevreden klanten' },
];

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Parallax hook
function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
}

// Animated section component
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

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const parallaxOffset = useParallax(0.3);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section - Dramatic, animated entrance */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-ivory-100">
        {/* Parallax background image */}
        <div
          className="absolute inset-0 w-full h-[120%]"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1200&fit=crop"
            alt="Gerenoveerd interieur"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory-100 via-ivory-100/95 to-ivory-100/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory-100/50 via-transparent to-ivory-100" />
        </div>

        {/* Floating geometric elements */}
        <div className="absolute top-20 right-20 w-72 h-72 border border-accent-300/20 rounded-full animate-pulse-slow opacity-60" />
        <div className="absolute bottom-40 right-40 w-48 h-48 border border-accent-400/30 rounded-full animate-float opacity-40" />

        <div className="container-wide relative z-10 py-32">
          <div className="max-w-3xl">
            {/* Animated tagline */}
            <div
              className={`flex items-center gap-3 mb-8 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-sm font-medium text-accent-600 uppercase tracking-[0.2em]">
                Renovatie & Afwerking Gent
              </span>
            </div>

            {/* Main headline - Staggered reveal */}
            <h1 className="mb-8">
              <span
                className={`block text-[clamp(3rem,8vw,6rem)] font-display font-medium text-noir-900 leading-[0.95] tracking-[-0.03em] transition-all duration-1000 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                De kunst van
              </span>
              <span
                className={`block text-[clamp(3rem,8vw,6rem)] font-display font-medium leading-[0.95] tracking-[-0.03em] transition-all duration-1000 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <span className="text-accent-500">het renoveren</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-xl md:text-2xl text-noir-500 mb-12 max-w-xl leading-relaxed transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              Vakmanschap met respect voor uw woning en oog voor elk detail.
              Van kleine verbouwing tot totaalrenovatie.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-wrap gap-4 mb-16 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <Link
                href="/offerte"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent-500 text-white font-medium rounded-full overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-accent-500/25"
              >
                <span className="relative z-10">Gratis offerte aanvragen</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-accent-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <Link
                href="/projecten"
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-noir-200 text-noir-700 font-medium rounded-full hover:border-accent-500 hover:text-accent-600 transition-all duration-300"
              >
                <Play className="h-4 w-4" />
                Bekijk projecten
              </Link>
            </div>

            {/* Stats row */}
            <div
              className={`flex gap-12 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="relative">
                  <div className="text-4xl md:text-5xl font-display font-medium text-noir-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-noir-400 uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                  {index < stats.length - 1 && (
                    <div className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 w-px h-12 bg-noir-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Floating contact card */}
          <div
            className={`absolute right-8 lg:right-16 bottom-32 bg-white rounded-2xl shadow-soft-xl p-6 max-w-[280px] transition-all duration-1000 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '1400ms' }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-accent-600" />
              </div>
              <div>
                <p className="text-xs text-noir-400 uppercase tracking-wider mb-1">Direct contact</p>
                <p className="font-display text-xl font-medium text-noir-900">+32 493 81 27 89</p>
              </div>
            </div>
            <p className="text-sm text-noir-500 mb-4">
              Bel voor een vrijblijvend adviesgesprek
            </p>
            <Link
              href="/afspraak"
              className="block w-full py-3 text-center text-sm font-medium text-accent-600 border border-accent-200 rounded-lg hover:bg-accent-50 transition-colors"
            >
              Afspraak maken
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-noir-400 uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-noir-300 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-4 bg-accent-500">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-white/90 text-sm">
            {kernwaarden.map((waarde, index) => (
              <div key={waarde.id} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-white/70" />
                <span>{waarde.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-28 md:py-36 bg-white relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ivory-200/50 to-transparent pointer-events-none" />

        <div className="container-wide relative">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
              <div>
                <span className="text-sm text-accent-500 font-medium uppercase tracking-[0.2em] mb-4 block">
                  Onze expertise
                </span>
                <h2 className="text-display-lg font-display font-medium text-noir-900">
                  Van visie tot <br />
                  <span className="text-accent-500">vakkundige uitvoering</span>
                </h2>
              </div>
              <p className="text-lg text-noir-500 lg:max-w-md">
                Elke renovatie is uniek. Wij combineren traditioneel vakmanschap met moderne technieken
                voor een resultaat dat generaties meegaat.
              </p>
            </div>
          </AnimatedSection>

          {/* Services grid with hover effects */}
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 150}>
                <Link href={service.href} className="group block">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir-900/80 via-noir-900/20 to-transparent" />

                    {/* Overlay content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <h3 className="text-2xl font-display font-medium text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                        {service.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 max-w-xs">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-accent-300 text-sm font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <span>Ontdek meer</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={450}>
            <div className="text-center mt-16">
              <Link
                href="/diensten"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-noir-200 text-noir-700 font-medium rounded-full hover:border-accent-500 hover:text-accent-600 transition-all duration-300"
              >
                Alle diensten bekijken
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us - Split section with parallax */}
      <section className="py-28 md:py-36 bg-ivory-200 relative overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image side with overlapping elements */}
            <AnimatedSection>
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=1000&fit=crop"
                    alt="Vakman aan het werk"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-500 rounded-2xl -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-accent-300 rounded-2xl -z-10" />

                {/* Floating badge */}
                <div className="absolute -right-4 top-1/3 bg-white rounded-xl shadow-soft-lg p-4">
                  <div className="text-3xl font-display font-medium text-accent-600">12+</div>
                  <div className="text-xs text-noir-500">Jaar ervaring</div>
                </div>
              </div>
            </AnimatedSection>

            {/* Content side */}
            <div>
              <AnimatedSection>
                <span className="text-sm text-accent-500 font-medium uppercase tracking-[0.2em] mb-4 block">
                  Waarom Nam Construction
                </span>
                <h2 className="text-display-lg font-display font-medium text-noir-900 mb-6">
                  Gebouwd op <span className="text-accent-600">5 pijlers</span>
                </h2>
                <p className="text-lg text-noir-500 mb-12">
                  Elke renovatie rust op een fundament van waarden. Dit is waar wij voor staan.
                </p>
              </AnimatedSection>

              <div className="space-y-6">
                {kernwaarden.map((waarde, index) => (
                  <AnimatedSection key={waarde.id} delay={index * 100}>
                    <div className="group flex gap-5 p-4 -mx-4 rounded-xl hover:bg-white/80 transition-colors duration-300">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center group-hover:bg-accent-500 transition-colors duration-300">
                        <span className="text-sm font-medium text-accent-700 group-hover:text-white transition-colors duration-300">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-noir-900 mb-1 group-hover:text-accent-600 transition-colors duration-300">
                          {waarde.title}
                        </h3>
                        <p className="text-noir-500 text-sm">{waarde.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-28 md:py-36 bg-noir-900 relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 border border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-64 h-64 border border-white rounded-full" />
        </div>

        <div className="container-wide relative">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
              <div>
                <span className="text-sm text-accent-400 font-medium uppercase tracking-[0.2em] mb-4 block">
                  Recente realisaties
                </span>
                <h2 className="text-display-lg font-display font-medium text-white">
                  Ons werk <span className="text-accent-400">spreekt</span>
                </h2>
              </div>
              <Link
                href="/projecten"
                className="inline-flex items-center gap-3 text-white/70 hover:text-white font-medium transition-colors duration-300"
              >
                <span className="border-b border-current pb-1">Alle projecten bekijken</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Projects grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 150}>
                <Link href="/projecten" className="group block">
                  <div className={`relative rounded-2xl overflow-hidden ${index === 0 ? 'md:row-span-2 aspect-[3/4]' : 'aspect-square'}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/30 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <span className="text-xs text-accent-400 font-medium uppercase tracking-wider mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 md:py-36 bg-accent-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />

        <div className="container-wide relative">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-lg md:text-display-xl font-display font-medium text-white mb-6">
                Klaar om uw renovatie te starten?
              </h2>
              <p className="text-xl text-white/80 mb-12">
                Neem vrijblijvend contact op. We bespreken graag uw plannen en mogelijkheden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/offerte"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-accent-700 font-medium rounded-full overflow-hidden transition-all duration-500 hover:shadow-lg"
                >
                  <span className="relative z-10">Offerte aanvragen</span>
                  <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div className="absolute inset-0 bg-ivory-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
                <Link
                  href="/afspraak"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Gratis adviesgesprek
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
