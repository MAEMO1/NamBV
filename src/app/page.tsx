'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, MapPin, Phone, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { trackCTAClick, trackClickToCall, CTALocation } from '@/lib/analytics';

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
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

// The 5 Core Values
const kernwaarden = [
  { id: 'attestering', title: 'Volledige Attestering', description: 'AREI-conforme installaties en EPB-attesten', icon: '01' },
  { id: 'circulariteit', title: 'Hergebruik & Circulariteit', description: 'Duurzaam renoveren met respect voor materialen', icon: '02' },
  { id: 'betaling', title: 'Betalingsspreiding', description: 'Betaal in fasen, afgestemd op uw project', icon: '03' },
  { id: 'subsidies', title: 'Subsidie-ondersteuning', description: 'Maximaal profiteren van beschikbare premies', icon: '04' },
  { id: 'communicatie', title: 'Heldere Communicatie', description: 'Eén vast aanspreekpunt, wekelijkse updates', icon: '05' },
];

const services = [
  {
    title: 'Totaalrenovatie',
    subtitle: 'Complete transformatie',
    description: 'Volledige transformatie van uw woning. Van concept tot oplevering onder één dak.',
    href: '/diensten/totaalrenovatie',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop',
  },
  {
    title: 'Renovatie',
    subtitle: 'Gerichte verbouwing',
    description: 'Gerichte verbouwingen en renovaties. Badkamer, keuken of uitbreiding.',
    href: '/diensten/renovatie',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=1000&fit=crop',
  },
  {
    title: 'Afwerking',
    subtitle: 'Premium details',
    description: 'Tegelwerk, plakwerk en schilderwerk. Vakkundige afwerking die het verschil maakt.',
    href: '/diensten/afwerking',
    image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=800&h=1000&fit=crop',
  },
];

const projects = [
  {
    title: 'Herenhuis Centrum',
    category: 'Totaalrenovatie',
    location: 'Gent',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
  },
  {
    title: 'Rijwoning Mariakerke',
    category: 'Renovatie & Afwerking',
    location: 'Mariakerke',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
  },
  {
    title: 'Appartement Zuid',
    category: 'Badkamerrenovatie',
    location: 'Ledeberg',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=800&h=600&fit=crop',
  },
];

// Text reveal animation - character by character (Bouw-ID inspired)
function AnimatedText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(100%) rotateX(-90deg)',
            transitionDelay: `${delay + index * 30}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// Scroll animation hook with parallax
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

// Multi-layer parallax hook
function useParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
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
    up: 'translateY(80px)',
    down: 'translateY(-80px)',
    left: 'translateX(80px)',
    right: 'translateX(-80px)',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
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

// SVG Line draw animation (Bouw-ID inspired)
function AnimatedLine({ className = '' }: { className?: string }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <svg
      ref={ref as any}
      className={className}
      viewBox="0 0 2 100"
      preserveAspectRatio="none"
    >
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="100"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-1500"
        style={{
          strokeDasharray: 100,
          strokeDashoffset: isVisible ? 0 : 100,
        }}
      />
    </svg>
  );
}

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const scrollY = useParallax();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax for hero
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX - innerWidth / 2) / 50,
      y: (clientY - innerHeight / 2) / 50,
    });
  }, []);

  return (
    <>
      {/* ===== HERO SECTION - Cinematic, full-screen (Beneens + Bouw-ID style) ===== */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Background layers with parallax */}
        <div className="absolute inset-0">
          {/* Main background image */}
          <div
            className="absolute inset-0 scale-110"
            style={{ transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1200&fit=crop"
              alt="Gerenoveerd interieur"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Dark cinematic overlay (Beneens style) */}
          <div className="absolute inset-0 bg-noir-950/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-noir-950/80 via-noir-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-transparent to-noir-950/30" />
        </div>

        {/* Animated geometric shapes (Be Factory style) */}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 border border-white/5 rounded-full transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-64 h-64 border border-accent-500/20 rounded-full transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` }}
        />

        {/* Content */}
        <div className="container-wide relative z-10 pt-32 pb-24">
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
            {/* Left content */}
            <div className="lg:col-span-7">
              {/* Main headline - Character animation (Bouw-ID inspired) */}
              <h1 className="mb-8">
                <span
                  className={`block text-[clamp(3.5rem,10vw,7rem)] font-display font-medium text-white leading-[0.9] tracking-[-0.03em] transition-all duration-1000 ${
                    heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                  }`}
                  style={{ transitionDelay: '500ms' }}
                >
                  Kwaliteit die je
                </span>
                <span
                  className={`block text-[clamp(3.5rem,10vw,7rem)] font-display font-medium leading-[0.9] tracking-[-0.03em] transition-all duration-1000 ${
                    heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                  }`}
                  style={{ transitionDelay: '700ms' }}
                >
                  <span className="text-accent-400">blijft voelen</span>
                </span>
              </h1>

              {/* Subtitle with reveal */}
              <p
                className={`text-xl md:text-2xl text-white/70 mb-12 max-w-lg leading-relaxed transition-all duration-1000 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '900ms' }}
              >
                Vakmanschap met respect voor elk detail. Van concept tot oplevering,
                wij realiseren uw droomwoning.
              </p>

              {/* CTA Buttons with complex hover (Beneens style) */}
              <div
                className={`flex flex-wrap gap-4 transition-all duration-1000 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '1100ms' }}
              >
                {/* Primary CTA with sweep animation - SINGLE FOCUS */}
                <TrackedCTA
                  href="/offerte"
                  location="hero"
                  label="Gratis offerte aanvragen"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 bg-accent-600 text-white font-medium overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent-500/30"
                >
                  {/* Sweep effect */}
                  <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                  <span className="relative z-10 uppercase tracking-wider text-sm">Gratis offerte aanvragen</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </TrackedCTA>

                {/* Secondary - subtle text link, not competing conversion */}
                <TrackedCTA
                  href="/projecten"
                  location="hero"
                  label="Bekijk projecten"
                  className="group inline-flex items-center gap-2 px-4 py-5 text-white/70 hover:text-white font-medium transition-colors duration-300"
                >
                  <span className="text-sm">of bekijk ons werk</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </TrackedCTA>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 ${
            heroLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1500ms' }}
        >
          <span className="text-xs text-white/50 uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-5 w-5 text-white/50 animate-bounce" />
        </div>
      </section>

      {/* ===== WHY US SECTION - Split layout with image ===== */}
      <section className="py-32 bg-ivory-100 relative overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image side with decorative elements */}
            <AnimatedSection direction="left">
              <div className="relative">
                {/* Main image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=1000&fit=crop"
                    alt="Vakman aan het werk"
                    fill
                    className="object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-900/30 to-transparent" />
                </div>

                {/* Decorative frame */}
                <div className="absolute -top-8 -left-8 w-full h-full border-2 border-accent-400 -z-10" />
              </div>
            </AnimatedSection>

            {/* Content side */}
            <div className="lg:pl-8">
              <AnimatedSection>
                <span className="inline-block px-4 py-2 bg-accent-100 text-accent-700 text-xs font-medium uppercase tracking-[0.2em] rounded-full mb-6">
                  Waarom NAM Construction
                </span>
                <h2 className="text-display-lg font-display font-medium text-noir-900 mb-6">
                  Gebouwd op{' '}
                  <span className="text-accent-600">5 pijlers</span>
                </h2>
                <p className="text-lg text-noir-500 mb-12">
                  Elke renovatie rust op een fundament van waarden. Dit is waar wij voor staan.
                </p>
              </AnimatedSection>

              {/* Values list */}
              <div className="space-y-4">
                {kernwaarden.map((waarde, index) => (
                  <AnimatedSection key={waarde.id} delay={index * 100}>
                    <div className="group flex gap-6 p-5 bg-white hover:bg-accent-50 border border-transparent hover:border-accent-200 transition-all duration-500 cursor-default">
                      {/* Number */}
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-noir-100 group-hover:bg-accent-500 transition-colors duration-500">
                        <span className="text-sm font-medium text-noir-500 group-hover:text-white transition-colors">
                          {waarde.icon}
                        </span>
                      </div>
                      {/* Content */}
                      <div>
                        <h3 className="font-medium text-noir-900 mb-1 group-hover:text-accent-700 transition-colors">
                          {waarde.title}
                        </h3>
                        <p className="text-noir-500 text-sm">{waarde.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* CTA */}
              <AnimatedSection delay={600} className="mt-10">
                <TrackedCTA
                  href="/afspraak"
                  location="services"
                  label="Boek een gratis adviesgesprek"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent-600 text-white font-medium overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-accent-500/20"
                >
                  <span className="absolute inset-0 bg-accent-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 uppercase tracking-wider text-sm">Boek een gratis adviesgesprek</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                </TrackedCTA>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION - Premium cards with hover reveal ===== */}
      <section className="py-32 bg-ivory-200 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(107,127,84,0.05),transparent_50%)]" />

        <div className="container-wide relative">
          {/* Header */}
          <AnimatedSection className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <div>
                <span className="inline-block px-4 py-2 bg-accent-100 text-accent-700 text-xs font-medium uppercase tracking-[0.2em] rounded-full mb-6">
                  Onze expertise
                </span>
                <h2 className="text-display-lg font-display font-medium text-noir-900">
                  Van visie tot{' '}
                  <span className="text-accent-600 italic">vakkundige</span>{' '}
                  uitvoering
                </h2>
              </div>
              <p className="text-lg text-noir-500 lg:pl-12">
                Elke renovatie is uniek. Wij combineren traditioneel vakmanschap
                met moderne technieken voor een resultaat dat generaties meegaat.
              </p>
            </div>
          </AnimatedSection>

          {/* Services grid - Tall cards with overlay */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 150}>
                <Link href={service.href} className="group block relative">
                  {/* Card container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {/* Image with zoom */}
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Gradient overlay - stronger on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Content overlay */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      {/* Category tag */}
                      <span className="inline-block self-start px-3 py-1 bg-accent-500 text-white text-xs uppercase tracking-wider mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {service.subtitle}
                      </span>

                      {/* Title */}
                      <h3 className="text-3xl font-display font-medium text-white mb-3 transition-transform duration-500 group-hover:-translate-y-2">
                        {service.title}
                      </h3>

                      {/* Description - hidden by default */}
                      <p className="text-white/70 mb-6 max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500">
                        {service.description}
                      </p>

                      {/* CTA link */}
                      <div className="flex items-center gap-2 text-accent-400 font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <span className="text-sm uppercase tracking-wider">Ontdek meer</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 m-4" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION - Dark background, editorial grid ===== */}
      <section className="py-32 bg-noir-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-px h-full bg-white/5" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-white/5" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-white/5" />
        </div>

        <div className="container-wide relative">
          {/* Header */}
          <AnimatedSection className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <span className="inline-block px-4 py-2 bg-white/10 text-accent-400 text-xs font-medium uppercase tracking-[0.2em] rounded-full mb-6">
                  Portfolio
                </span>
                <h2 className="text-display-lg font-display font-medium text-white">
                  Recente{' '}
                  <span className="text-accent-400 italic">realisaties</span>
                </h2>
              </div>
              <Link
                href="/projecten"
                className="group inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <span className="text-sm uppercase tracking-wider border-b border-current pb-1">
                  Alle projecten
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Projects grid - Editorial layout */}
          <div className="grid md:grid-cols-12 gap-8">
            {/* Large featured project */}
            <AnimatedSection className="md:col-span-7">
              <Link href="/projecten" className="group block relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={projects[0].image}
                    alt={projects[0].title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="inline-block self-start px-3 py-1 bg-accent-500 text-white text-xs uppercase tracking-wider mb-4">
                      {projects[0].category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-medium text-white mb-3">
                      {projects[0].title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {projects[0].location}
                      </div>
                      <span>|</span>
                      <span>{projects[0].year}</span>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 border-2 border-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 m-4 pointer-events-none" />
                </div>
              </Link>
            </AnimatedSection>

            {/* Smaller projects */}
            <div className="md:col-span-5 grid gap-8">
              {projects.slice(1).map((project, index) => (
                <AnimatedSection key={project.title} delay={(index + 1) * 150}>
                  <Link href="/projecten" className="group block relative">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-noir-950/20 to-transparent" />

                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <span className="text-xs text-accent-400 uppercase tracking-wider mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-display font-medium text-white mb-1">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
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

      {/* ===== CTA SECTION - Bold, full-width, SINGLE FOCUS ===== */}
      <section className="relative py-32 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=800&fit=crop"
            alt="Modern interieur"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-accent-600/90" />
        </div>

        <div className="container-wide relative">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-lg md:text-display-xl font-display font-medium text-white mb-6">
                Klaar om uw renovatie te starten?
              </h2>
              <p className="text-xl text-white/80 mb-12">
                Vraag een vrijblijvende offerte aan. We bespreken graag uw plannen en mogelijkheden.
              </p>

              {/* Single Primary CTA - No competing options */}
              <TrackedCTA
                href="/offerte"
                location="cta_banner"
                label="Offerte aanvragen"
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-white text-accent-700 font-medium overflow-hidden transition-all duration-500 hover:shadow-2xl"
              >
                <span className="absolute inset-0 bg-noir-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 uppercase tracking-wider group-hover:text-white transition-colors duration-500">Gratis offerte aanvragen</span>
                <ArrowUpRight className="relative z-10 h-5 w-5 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </TrackedCTA>

              {/* Alternative contact - NOT competing conversion, just contact option */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-white/60 text-sm mb-4">Liever eerst bellen?</p>
                <TrackedCTA
                  href="tel:+32493812789"
                  location="cta_banner"
                  label="Bel direct"
                  className="inline-flex items-center gap-3 text-white hover:text-accent-200 transition-colors text-lg group"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-accent-300 group-hover:bg-white/10 transition-all">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="font-display">+32 493 81 27 89</span>
                </TrackedCTA>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
