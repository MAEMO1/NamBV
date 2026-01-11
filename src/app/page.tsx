'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, MapPin, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// The 5 Core Values - Kernwaarden
const kernwaarden = [
  {
    id: 'attestering',
    title: 'Volledige Attestering',
    shortTitle: 'Attestering',
    description: 'AREI-conforme installaties, EPB-attesten en alle nodige documentatie voor uw gemoedsrust.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" className="text-accent-500/30" />
        <path d="M12 20l5 5 11-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-500" />
        <path d="M20 4v4M20 32v4M4 20h4M32 20h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-accent-500/40" />
      </svg>
    ),
    href: '/waarden/attestering',
  },
  {
    id: 'circulariteit',
    title: 'Hergebruik & Circulariteit',
    shortTitle: 'Circulariteit',
    description: 'Behoud waardevolle materialen, minder afval, meer karakter. Duurzaam renoveren.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M20 6C12.268 6 6 12.268 6 20s6.268 14 14 14 14-6.268 14-14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-500/30" />
        <path d="M34 20c0-7.732-6.268-14-14-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent-500" />
        <path d="M30 16l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-500" />
        <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" className="text-accent-500/50" />
      </svg>
    ),
    href: '/waarden/circulariteit',
  },
  {
    id: 'betaling',
    title: 'Betalingsspreiding',
    shortTitle: 'Betaling',
    description: 'Transparante betaling in fases. 30-30-30-10 gekoppeld aan concrete mijlpalen.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="6" y="10" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-accent-500/30" />
        <path d="M6 16h28" stroke="currentColor" strokeWidth="1.5" className="text-accent-500/50" />
        <rect x="10" y="22" width="8" height="4" rx="1" fill="currentColor" className="text-accent-500" />
        <circle cx="28" cy="24" r="2" stroke="currentColor" strokeWidth="1.5" className="text-accent-500" />
      </svg>
    ),
    href: '/waarden/betaling',
  },
  {
    id: 'subsidies',
    title: 'Subsidie-ondersteuning',
    shortTitle: 'Subsidies',
    description: 'Wij helpen u alle beschikbare premies en voordelen te benutten.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M20 6l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="text-accent-500/30" />
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2" className="text-accent-500" />
        <path d="M18 18h4M20 16v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent-500" />
      </svg>
    ),
    href: '/waarden/subsidies',
  },
  {
    id: 'communicatie',
    title: 'Heldere Communicatie',
    shortTitle: 'Communicatie',
    description: 'Eén vast aanspreekpunt, wekelijkse updates en gegarandeerde bereikbaarheid.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M8 12h24v16H8z" stroke="currentColor" strokeWidth="1.5" className="text-accent-500/30" />
        <path d="M8 12l12 10 12-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-500" />
        <circle cx="20" cy="20" r="2" fill="currentColor" className="text-accent-500/50" />
      </svg>
    ),
    href: '/waarden/communicatie',
  },
];

// Services data
const services = [
  {
    title: 'Totaalrenovatie',
    description: 'Volledige transformatie van uw woning. Van concept tot oplevering onder één dak.',
    href: '/diensten/totaalrenovatie',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    number: '01',
  },
  {
    title: 'Renovatie',
    description: 'Gerichte verbouwingen en renovaties. Badkamer, keuken of uitbreiding.',
    href: '/diensten/renovatie',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    number: '02',
  },
  {
    title: 'Afwerking',
    description: 'Tegelwerk, plakwerk en schilderwerk. Vakkundige afwerking die het verschil maakt.',
    href: '/diensten/afwerking',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    number: '03',
  },
  {
    title: 'Technieken',
    description: 'Elektriciteit en sanitair door erkende vakmensen. Veilig en conform alle normen.',
    href: '/diensten/technieken',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
    number: '04',
  },
];

// Featured projects
const projects = [
  {
    title: 'Herenhuis Centrum',
    category: 'Totaalrenovatie',
    location: 'Gent',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
    featured: true,
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

// Stats
const stats = [
  { number: '150+', label: 'Projecten voltooid' },
  { number: '12', label: 'Jaar ervaring' },
  { number: '98%', label: 'Klanttevredenheid' },
];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section - Cinematic, dramatic entrance */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-20 md:pb-32 overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
            alt="Gerenoveerd interieur"
            fill
            className="object-cover scale-110"
            priority
          />
          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-noir-950 via-noir-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-950/30 to-transparent" />

          {/* Grain texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-noise" />
        </div>

        {/* Five Pillars - Visual representation of 5 core values */}
        <div className="absolute left-6 md:left-12 lg:left-16 top-1/4 bottom-1/4 flex gap-2 md:gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-px bg-gradient-to-b from-transparent via-accent-500 to-transparent"
              style={{
                opacity: 0.15 + (i * 0.1),
                height: `${70 + (i * 6)}%`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
            <span className="text-[10px] text-accent-500/40 font-medium tracking-[0.3em] uppercase whitespace-nowrap">
              5 Pijlers
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="container-wide relative z-10">
          <div className="max-w-5xl">
            {/* Animated tagline */}
            <div className="flex items-center gap-4 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <span className="w-12 h-px bg-accent-500" />
              <span className="text-sm font-medium text-accent-400 uppercase tracking-[0.3em]">
                Renovatie Gent & Omgeving
              </span>
            </div>

            {/* Main headline - Dramatic typography */}
            <h1 className="mb-10">
              <span
                className="block text-[clamp(3.5rem,12vw,10rem)] font-display font-medium text-white leading-[0.9] tracking-[-0.04em] opacity-0 animate-fade-up"
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
              >
                Vakmanschap
              </span>
              <span
                className="block text-[clamp(3.5rem,12vw,10rem)] font-display font-medium leading-[0.9] tracking-[-0.04em] opacity-0 animate-fade-up"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
              >
                <span className="text-accent-400">dat</span>{' '}
                <span className="text-white/40">blijft</span>
              </span>
            </h1>

            {/* Subtitle with elegant reveal */}
            <p
              className="text-xl md:text-2xl text-white/50 max-w-xl mb-14 leading-relaxed font-light opacity-0 animate-fade-up"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              Renovatie met respect voor het verleden en oog voor de toekomst.
              Uw woning in deskundige handen.
            </p>

            {/* CTA Buttons - Refined */}
            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              <Link
                href="/offerte"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-noir-900 font-medium uppercase tracking-wider text-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-white">
                  Offerte aanvragen
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-accent-500 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              </Link>
              <Link
                href="/projecten"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/20 text-white font-medium uppercase tracking-wider text-sm hover:border-white/50 transition-all duration-500"
              >
                <Play className="h-4 w-4" />
                Bekijk projecten
              </Link>
            </div>
          </div>

          {/* Stats bar - Bottom right */}
          <div
            className="absolute right-0 bottom-0 hidden lg:flex items-end gap-16 opacity-0 animate-fade-up"
            style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-right">
                <p className="text-4xl font-display font-medium text-white mb-1">{stat.number}</p>
                <p className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator - Elegant */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
          <span className="text-xs text-white/30 uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Services Section - Architectural grid */}
      <section className="py-32 md:py-40 bg-ivory-200 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-500/5 to-transparent pointer-events-none" />

        <div className="container-wide relative">
          {/* Section Header - Asymmetric */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <div>
              <span className="text-sm text-accent-500 font-medium uppercase tracking-[0.3em] mb-6 block">
                Diensten
              </span>
              <h2 className="text-display-lg font-display font-medium text-noir-900">
                Expertise in elke<br />
                <span className="text-noir-400">renovatiefase</span>
              </h2>
            </div>
            <div className="flex items-end lg:justify-end">
              <Link
                href="/diensten"
                className="group inline-flex items-center gap-3 text-noir-500 hover:text-noir-900 font-medium transition-colors duration-300"
              >
                <span className="border-b border-current pb-1">Alle diensten ontdekken</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>

          {/* Services Grid - Alternating sizes */}
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                className={`group relative overflow-hidden bg-white ${
                  index === 0 || index === 3 ? 'md:row-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${
                  index === 0 || index === 3 ? 'aspect-[4/5]' : 'aspect-[16/10]'
                }`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-900/80 via-noir-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Number badge */}
                  <div className="absolute top-6 left-6">
                    <span className="text-sm font-medium text-white/60 uppercase tracking-wider">{service.number}</span>
                  </div>
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-3 group-hover:text-accent-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 mb-4 max-w-sm">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-accent-400 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Meer ontdekken</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Kernwaarden Section - The 5 Pillars */}
      <section className="py-24 md:py-32 bg-noir-950 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-noir-800 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-noir-800 to-transparent" />

          {/* Pentagon pattern - subtle 5-fold geometry */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02]" viewBox="0 0 400 400">
            <polygon points="200,20 380,140 330,350 70,350 20,140" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent-500" />
            <polygon points="200,60 340,155 300,320 100,320 60,155" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent-500" />
            <polygon points="200,100 300,170 270,290 130,290 100,170" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent-500" />
          </svg>
        </div>

        <div className="container-wide relative">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent-500/50" />
              <span className="text-sm text-accent-500 font-medium uppercase tracking-[0.3em]">
                Onze Waarden
              </span>
              <span className="w-8 h-px bg-accent-500/50" />
            </div>
            <h2 className="text-display-lg font-display font-medium text-white mb-4">
              Gebouwd op <span className="text-accent-400">5 pijlers</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Elke renovatie rust op een fundament van waarden die we nooit uit het oog verliezen.
            </p>
          </div>

          {/* Values Grid - Elegant cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {kernwaarden.map((waarde, index) => (
              <Link
                key={waarde.id}
                href={waarde.href}
                className="group relative bg-noir-900/50 backdrop-blur-sm border border-noir-800/50 p-6 md:p-8 hover:border-accent-500/30 hover:bg-noir-900/80 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Number indicator */}
                <div className="absolute top-4 right-4 text-xs font-medium text-accent-500/30 tracking-wider">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {waarde.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-medium text-white mb-3 group-hover:text-accent-400 transition-colors duration-300">
                  {waarde.shortTitle}
                </h3>

                {/* Description - Hidden on smaller cards, visible on hover */}
                <p className="text-sm text-white/40 leading-relaxed line-clamp-3 group-hover:text-white/60 transition-colors duration-300">
                  {waarde.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center gap-2 text-xs text-accent-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-medium uppercase tracking-wider">Meer info</span>
                  <ArrowRight className="h-3 w-3" />
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <Link
              href="/waarden"
              className="group inline-flex items-center gap-3 text-white/50 hover:text-white font-medium transition-colors duration-300"
            >
              <span className="border-b border-current pb-1">Ontdek al onze waarden</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section - Editorial layout */}
      <section className="py-32 md:py-40 bg-noir-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-noir-700 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-noir-700 to-transparent" />

        <div className="container-wide">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
            <div>
              <span className="text-sm text-accent-500 font-medium uppercase tracking-[0.3em] mb-6 block">
                Portfolio
              </span>
              <h2 className="text-display-lg font-display font-medium text-white">
                Recente<br />
                <span className="text-white/40">realisaties</span>
              </h2>
            </div>
            <Link
              href="/projecten"
              className="group inline-flex items-center gap-3 text-white/50 hover:text-white font-medium transition-colors duration-300"
            >
              <span className="border-b border-current pb-1">Alle projecten bekijken</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>

          {/* Projects Grid - Masonry-like */}
          <div className="grid md:grid-cols-12 gap-4">
            {projects.map((project, index) => (
              <Link
                key={project.title}
                href="/projecten"
                className={`group relative overflow-hidden ${
                  project.featured
                    ? 'md:col-span-8 md:row-span-2'
                    : index === 1 ? 'md:col-span-4' : 'md:col-span-4'
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${
                  project.featured ? 'aspect-[16/10] md:aspect-auto md:h-full min-h-[400px]' : 'aspect-square'
                }`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-900/90 via-noir-900/30 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-xs text-accent-400 font-medium uppercase tracking-[0.2em] mb-3">
                    {project.category}
                  </span>
                  <h3 className={`font-display font-medium text-white mb-3 ${
                    project.featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                  }`}>
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/50 text-sm">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {project.location}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  {/* Hover reveal */}
                  <div className="mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center gap-2 text-sm text-accent-400 font-medium">
                      Bekijk project <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Bold, impactful */}
      <section className="py-40 md:py-56 bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-noir-900 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-noir-900 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-noir-900 rounded-full" />
        </div>

        <div className="container-wide relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Large statement */}
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-medium text-noir-900 leading-[1.1] mb-8">
              Klaar om uw<br />
              <span className="text-accent-500">droom</span> te realiseren?
            </h2>
            <p className="text-xl text-noir-400 mb-14 max-w-xl mx-auto">
              Neem vrijblijvend contact op. We bespreken graag uw plannen
              en mogelijkheden.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/offerte"
                className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-noir-900 text-white font-medium uppercase tracking-wider text-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 transition-colors duration-500">
                  Offerte aanvragen
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-accent-500 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              </Link>
              <Link
                href="/afspraak"
                className="group inline-flex items-center justify-center gap-3 px-12 py-6 border-2 border-noir-200 text-noir-700 font-medium uppercase tracking-wider text-sm hover:border-noir-900 hover:bg-noir-900 hover:text-white transition-all duration-500"
              >
                Gratis adviesgesprek
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
