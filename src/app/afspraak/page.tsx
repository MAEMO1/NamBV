'use client';

import { useEffect, useState, useRef } from 'react';
import { Metadata } from 'next';
import { Calendar, Leaf, Recycle, FileCheck, Euro, Shield, ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BookingFlow } from '@/components';

const benefits = [
  {
    icon: Calendar,
    title: 'Gratis & vrijblijvend',
    description: 'Geen kosten, geen verplichtingen'
  },
  {
    icon: Recycle,
    title: 'Hergebruik advies',
    description: 'We bekijken mogelijkheden voor hergebruik'
  },
  {
    icon: FileCheck,
    title: 'Attestering & premies',
    description: 'Hulp bij subsidieaanvragen'
  },
  {
    icon: Euro,
    title: 'Betalingsspreiding',
    description: 'Flexibele betalingsmogelijkheden'
  }
];

const trustPoints = [
  {
    icon: Recycle,
    title: 'Hergebruik materiaal',
    description: 'Waar mogelijk hergebruiken we bestaand materiaal. Duurzaam en kostenbesparend.'
  },
  {
    icon: Shield,
    title: 'Volledige attestering',
    description: 'AREI-conforme installaties, EPB-attesten en alle nodige certificaten.'
  },
  {
    icon: Leaf,
    title: 'Ecologische focus',
    description: 'Duurzame en milieuvriendelijke materialen voor een gezonder thuis.'
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

export default function AfspraakPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  return (
    <>
      {/* Hero - Clean, professional */}
      <section className="relative bg-ivory-100 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent-100/50 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 pointer-events-none">
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-noir-200/30 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            {/* Badge */}
            <div
              className={`flex items-center justify-center gap-3 mb-8 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-sm font-medium text-accent-600 uppercase tracking-[0.2em]">
                Direct inplannen
              </span>
              <div className="w-12 h-px bg-accent-500" />
            </div>

            <h1
              className={`text-display-lg md:text-display-xl font-display font-medium text-noir-900 mb-6 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Plan uw gratis{' '}
              <span className="text-accent-600 italic">adviesgesprek</span>
            </h1>

            <p
              className={`text-lg text-noir-500 leading-relaxed transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Beantwoord enkele vragen over uw project en kies direct een moment dat u past.
              Vrijblijvend en zonder verplichtingen.
            </p>
          </div>

          {/* Benefits bar */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-1000 ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white p-6 border border-noir-100 text-center group hover:border-accent-500/50 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-noir-900 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500 transition-colors duration-500">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <p className="font-medium text-noir-900 text-sm mb-1">{benefit.title}</p>
                <p className="text-xs text-noir-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <AnimatedSection className="max-w-3xl mx-auto">
            <BookingFlow />
          </AnimatedSection>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-24 md:py-32 bg-noir-950 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-px h-full bg-white/5" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-white/5" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-white/5" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <AnimatedSection className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-accent-400" />
              <span className="text-sm font-medium text-accent-400 uppercase tracking-[0.2em]">
                Onze belofte
              </span>
              <div className="w-12 h-px bg-accent-400" />
            </div>
            <h2 className="text-display-md md:text-display-lg font-display font-medium text-white mb-4">
              Waarom kiezen voor{' '}
              <span className="text-accent-400 italic">NAM Construction</span>?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {trustPoints.map((point, index) => (
              <AnimatedSection key={point.title} delay={index * 150}>
                <div className="bg-noir-900 border border-noir-800 p-8 text-center group hover:border-accent-500/50 transition-colors duration-500">
                  <div className="w-16 h-16 bg-accent-500/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-500/30 transition-colors duration-500">
                    <point.icon className="h-7 w-7 text-accent-400" />
                  </div>
                  <h3 className="text-xl font-display font-medium text-white mb-3">{point.title}</h3>
                  <p className="text-noir-400 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Alternative CTA */}
          <AnimatedSection delay={450} className="mt-16 text-center">
            <p className="text-noir-400 mb-6">
              Liever direct een offerte aanvragen?
            </p>
            <Link
              href="/offerte"
              className="group relative inline-flex items-center gap-3 px-10 py-5 border border-noir-700 text-white font-medium overflow-hidden transition-all duration-500"
            >
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 uppercase tracking-wider text-sm group-hover:text-noir-900 transition-colors">
                Offerte aanvragen
              </span>
              <ArrowUpRight className="relative z-10 h-5 w-5 group-hover:text-noir-900 transition-colors" />
            </Link>
          </AnimatedSection>
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
                Vragen? Neem contact op.
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Wilt u liever eerst telefonisch overleggen? Geen probleem, we staan voor u klaar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-accent-700 font-medium overflow-hidden transition-all duration-500 hover:shadow-xl"
                >
                  <span className="absolute inset-0 bg-noir-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                    Contacteer ons
                  </span>
                  <ArrowRight className="relative z-10 h-5 w-5 group-hover:text-white transition-colors" />
                </Link>
                <a
                  href="tel:+32493812789"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                  <span className="uppercase tracking-wider text-sm">+32 493 81 27 89</span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
