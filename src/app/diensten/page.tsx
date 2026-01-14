'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Home, Hammer, Paintbrush, Zap, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const services = [
  {
    icon: Home,
    title: 'Totaalrenovatie',
    subtitle: 'Complete transformatie',
    description: 'Volledige renovatie van uw woning, van ruwbouw tot afwerking. We coördineren alle aspecten van uw project met één aanspreekpunt.',
    features: [
      'Volledige projectcoördinatie',
      'Ruwbouw en structurele werken',
      'Technieken (elektriciteit, sanitair)',
      'Afwerking en interieur',
      'Premie-proof documentatie'
    ],
    href: '/diensten/totaalrenovatie',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop',
    tag: 'Meest gevraagd'
  },
  {
    icon: Hammer,
    title: 'Renovatie & Verbouwing',
    subtitle: 'Gerichte aanpassingen',
    description: 'Gerichte renovaties en verbouwingen voor specifieke ruimtes of delen van uw woning. Van badkamer tot uitbreiding.',
    features: [
      'Badkamerrenovatie',
      'Keukenrenovatie',
      'Uitbreidingen en aanbouw',
      'Kelderrenovatie',
      'Zolderinrichting'
    ],
    href: '/diensten/renovatie',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=1000&fit=crop',
  },
  {
    icon: Paintbrush,
    title: 'Afwerking',
    subtitle: 'Het verschil zit in de details',
    description: 'Vakkundige afwerking die het verschil maakt. Tegelwerk, plakwerk, schilderwerk en meer met oog voor detail.',
    features: [
      'Tegelwerk (vloer en wand)',
      'Plakwerk en gyproc',
      'Schilderwerk',
      'Chapewerk',
      'Decoratieve afwerking'
    ],
    href: '/diensten/afwerking',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop',
  },
  {
    icon: Zap,
    title: 'Technieken',
    subtitle: 'Veilig & conform',
    description: 'Elektriciteit en sanitair door erkende vakmensen. Veilig, conform alle normen en met de juiste attesten.',
    features: [
      'Elektriciteitswerken (AREI-conform)',
      'Sanitaire installaties',
      'Verwarming',
      'Ventilatie',
      'Keuringsattesten'
    ],
    href: '/diensten/technieken',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=1000&fit=crop',
  }
];

const whyUs = [
  {
    number: '01',
    title: 'Duurzame keuzes',
    description: 'We kiezen bewust voor materialen met een lange levensduur en gezonde eigenschappen.',
    icon: '🌿'
  },
  {
    number: '02',
    title: 'Premie-proof dossier',
    description: 'Correcte offerte, factuur en attesten zodat uw premieaanvraag vlot verloopt.',
    icon: '📋'
  },
  {
    number: '03',
    title: 'Gefaseerde betaling',
    description: 'Flexibele betalingsregeling gekoppeld aan concrete mijlpalen in uw project.',
    icon: '💳'
  },
  {
    number: '04',
    title: 'Eén aanspreekpunt',
    description: 'Directe communicatie met uw projectleider. Geen gedoe met tussenpersonen.',
    icon: '👤'
  }
];

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

export default function DienstenPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-ivory-100 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-64 h-64 bg-accent-200/30 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-sm font-medium text-accent-600 uppercase tracking-[0.2em]">
                Onze expertise
              </span>
            </div>

            <h1
              className={`text-display-lg md:text-display-xl font-display font-medium text-noir-900 mb-6 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Diensten voor elke{' '}
              <span className="text-accent-600 italic">renovatie</span>
            </h1>

            <p
              className={`text-xl text-noir-500 leading-relaxed transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Van totaalrenovatie tot vakkundige afwerking. We begeleiden u door elk aspect van
              uw renovatieproject met duurzame materiaalkeuzes en heldere communicatie.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Premium cards */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 100}>
                <Link href={service.href} className="group block">
                  <div className="relative bg-ivory-100 overflow-hidden h-full">
                    {/* Image section */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir-900/80 via-noir-900/20 to-transparent" />

                      {/* Tag */}
                      {service.tag && (
                        <span className="absolute top-6 left-6 px-4 py-2 bg-accent-500 text-white text-xs font-medium uppercase tracking-wider">
                          {service.tag}
                        </span>
                      )}

                      {/* Icon */}
                      <div className="absolute bottom-6 right-6 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-accent-500 transition-colors duration-500">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <span className="text-xs text-accent-600 uppercase tracking-wider mb-2 block">
                        {service.subtitle}
                      </span>
                      <h2 className="text-2xl font-display font-medium text-noir-900 mb-4 group-hover:text-accent-600 transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-noir-500 mb-6 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Features preview */}
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-noir-600">
                            <CheckCircle2 className="h-4 w-4 text-accent-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-accent-600 font-medium group-hover:gap-4 transition-all duration-300">
                        <span className="text-sm uppercase tracking-wider">Meer info</span>
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
      <section className="py-20 md:py-28 bg-ivory-100 relative overflow-hidden">
        <div className="container-wide relative">
          <AnimatedSection className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-sm font-medium text-accent-600 uppercase tracking-[0.2em]">
                Onze aanpak
              </span>
            </div>
            <h2 className="text-display-lg font-display font-medium text-noir-900 mb-4">
              Waarom{' '}
              <span className="text-accent-600 italic">NAM Construction</span>?
            </h2>
            <p className="text-lg text-noir-500 max-w-2xl">
              Wat ons onderscheidt van andere aannemers in de regio.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 100}>
                <div className="group relative bg-white p-8 border border-noir-100 hover:border-accent-500 transition-all duration-500 h-full">
                  {/* Accent corner */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-l-[3px] border-t-[3px] border-accent-500 opacity-0 group-hover:w-8 group-hover:h-8 group-hover:opacity-100 transition-all duration-500" />

                  {/* Icon */}
                  <span className="text-3xl mb-4 block">{item.icon}</span>

                  {/* Number tag */}
                  <span className="inline-block px-2 py-1 bg-accent-50 text-accent-600 text-xs font-medium tracking-wider mb-4">
                    {item.number}
                  </span>

                  <h3 className="text-lg font-display font-medium text-noir-900 mb-3 group-hover:text-accent-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-noir-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-accent-500 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />

        <div className="container-wide relative">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-lg font-display font-medium text-white mb-6">
                Benieuwd wat we voor u kunnen betekenen?
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Plan een gratis adviesgesprek en we bespreken uw project.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/offerte"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-accent-700 font-medium overflow-hidden transition-all duration-500 hover:shadow-xl"
                >
                  <span className="absolute inset-0 bg-noir-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                    Offerte aanvragen
                  </span>
                  <ArrowUpRight className="relative z-10 h-5 w-5 group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="/afspraak"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                  <span className="uppercase tracking-wider text-sm">Gratis adviesgesprek</span>
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
