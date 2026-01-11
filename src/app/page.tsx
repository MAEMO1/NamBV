'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// The 5 Core Values - Kernwaarden
const kernwaarden = [
  {
    id: 'attestering',
    title: 'Volledige Attestering',
    shortTitle: 'Attestering',
    description: 'AREI-conforme installaties en EPB-attesten',
  },
  {
    id: 'circulariteit',
    title: 'Hergebruik & Circulariteit',
    shortTitle: 'Circulariteit',
    description: 'Duurzaam renoveren met respect voor materialen',
  },
  {
    id: 'betaling',
    title: 'Betalingsspreiding',
    shortTitle: 'Betaling',
    description: 'Transparante 30-30-30-10 betalingsregeling',
  },
  {
    id: 'subsidies',
    title: 'Subsidie-ondersteuning',
    shortTitle: 'Subsidies',
    description: 'Maximaal profiteren van beschikbare premies',
  },
  {
    id: 'communicatie',
    title: 'Heldere Communicatie',
    shortTitle: 'Communicatie',
    description: 'Eén vast aanspreekpunt, wekelijkse updates',
  },
];

// Services data
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
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
  },
  {
    title: 'Afwerking',
    description: 'Tegelwerk, plakwerk en schilderwerk. Vakkundige afwerking die het verschil maakt.',
    href: '/diensten/afwerking',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  },
  {
    title: 'Technieken',
    description: 'Elektriciteit en sanitair door erkende vakmensen. Veilig en conform alle normen.',
    href: '/diensten/technieken',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
  },
];

// Featured projects
const projects = [
  {
    title: 'Herenhuis Centrum',
    category: 'Totaalrenovatie',
    location: 'Gent',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
    featured: true,
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

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Light, warm, inviting */}
      <section className="relative min-h-[90vh] flex items-center bg-ivory-200">
        {/* Background pattern - subtle warmth */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-ivory-300/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent-100/30 to-transparent" />
        </div>

        <div className="container-wide relative z-10 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-accent-500" />
                <span className="text-sm font-medium text-accent-600 uppercase tracking-wider">
                  Renovatie Gent & Omgeving
                </span>
              </div>

              <h1 className="text-display-xl md:text-hero font-display font-medium text-noir-900 mb-6">
                Vakmanschap<br />
                <span className="text-accent-500">voor uw thuis</span>
              </h1>

              <p className="text-lg md:text-xl text-noir-500 mb-10 max-w-lg leading-relaxed">
                Renovatie met respect voor uw woning en oog voor detail.
                Van kleine verbouwing tot totaalrenovatie — altijd met dezelfde toewijding.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/offerte"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent-500 text-white font-medium rounded-lg hover:bg-accent-600 transition-colors duration-300"
                >
                  Gratis offerte aanvragen
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projecten"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-noir-200 text-noir-700 font-medium rounded-lg hover:border-noir-300 hover:bg-ivory-100 transition-all duration-300"
                >
                  Bekijk onze projecten
                </Link>
              </div>

              {/* Quick trust indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-noir-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-500" />
                  <span>12+ jaar ervaring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-500" />
                  <span>150+ projecten</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-500" />
                  <span>Erkende vakmensen</span>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-soft-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop"
                  alt="Gerenoveerd interieur"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-soft-lg p-5 max-w-[220px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-xs text-noir-400">Bel ons</p>
                    <p className="font-medium text-noir-900">0470 123 456</p>
                  </div>
                </div>
                <p className="text-xs text-noir-400">Ma-Vr: 8:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Kernwaarden - Subtle strip */}
      <section className="py-6 bg-ivory-300 border-y border-ivory-400">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {kernwaarden.map((waarde, index) => (
              <div key={waarde.id} className="flex items-center gap-2 text-sm">
                <span className="text-accent-500 font-medium">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-noir-600">{waarde.shortTitle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          {/* Section Header */}
          <div className="max-w-2xl mb-14">
            <span className="text-sm text-accent-500 font-medium uppercase tracking-wider mb-4 block">
              Onze diensten
            </span>
            <h2 className="text-display-lg font-display font-medium text-noir-900 mb-4">
              Van plan tot perfecte afwerking
            </h2>
            <p className="text-noir-500 text-lg">
              Elke renovatie is uniek. Wij bieden de expertise die uw project nodig heeft.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-900/60 to-transparent" />
                </div>
                <h3 className="text-lg font-display font-medium text-noir-900 mb-2 group-hover:text-accent-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-noir-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/diensten"
              className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors"
            >
              Alle diensten bekijken
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Values Section */}
      <section className="py-20 md:py-28 bg-ivory-200">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=800&fit=crop"
                  alt="Vakman aan het werk"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Accent element */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-accent-200 rounded-2xl" />
            </div>

            {/* Right - Content */}
            <div>
              <span className="text-sm text-accent-500 font-medium uppercase tracking-wider mb-4 block">
                Waarom Nam Construction
              </span>
              <h2 className="text-display-lg font-display font-medium text-noir-900 mb-6">
                Gebouwd op <span className="text-accent-600">5 pijlers</span>
              </h2>
              <p className="text-noir-500 text-lg mb-10">
                Elke renovatie rust op een fundament van waarden die we nooit uit het oog verliezen.
              </p>

              <div className="space-y-6">
                {kernwaarden.map((waarde, index) => (
                  <div key={waarde.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-accent-700">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-noir-900 mb-1">{waarde.title}</h3>
                      <p className="text-noir-500 text-sm">{waarde.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="text-sm text-accent-500 font-medium uppercase tracking-wider mb-4 block">
                Recente projecten
              </span>
              <h2 className="text-display-lg font-display font-medium text-noir-900">
                Ons werk spreekt
              </h2>
            </div>
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors"
            >
              Alle projecten
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.title}
                href="/projecten"
                className="group"
              >
                <div className={`relative rounded-xl overflow-hidden mb-4 ${
                  project.featured ? 'aspect-[4/5]' : 'aspect-square'
                }`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-900/70 via-noir-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs text-accent-300 font-medium uppercase tracking-wider mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-display font-medium text-white mb-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/70 text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      {project.location}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-accent-500">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-lg font-display font-medium text-white mb-6">
              Klaar om uw droomrenovatie te starten?
            </h2>
            <p className="text-accent-100 text-lg mb-10">
              Neem vrijblijvend contact op. We bespreken graag uw plannen en mogelijkheden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/offerte"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-accent-700 font-medium rounded-lg hover:bg-ivory-100 transition-colors duration-300"
              >
                Offerte aanvragen
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/afspraak"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Gratis adviesgesprek
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
