'use client';

import { useEffect, useState, useRef } from 'react';
import { Calendar, Leaf, Recycle, FileCheck, Euro, Shield, ArrowUpRight, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { BookingFlow } from '@/components';

const quickBenefits = [
  { icon: CheckCircle2, text: 'Gratis & vrijblijvend' },
  { icon: Clock, text: 'Kies zelf uw moment' },
  { icon: Calendar, text: 'Direct bevestiging' },
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
      {/* Main Section - Booking immediately visible */}
      <section className="relative min-h-screen bg-gradient-to-br from-noir-950 via-noir-900 to-noir-950 pt-24 pb-12 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-500/5 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent-600/5 blur-[100px]" />
          {/* Grid lines */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-white/[0.03]" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-white/[0.03]" />
        </div>

        <div className="container-wide relative">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left side - Compact intro */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              {/* Badge */}
              <div
                className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="w-10 h-px bg-accent-400" />
                <span className="text-xs font-medium text-accent-400 uppercase tracking-[0.2em]">
                  Direct inplannen
                </span>
              </div>

              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white mb-5 leading-tight transition-all duration-700 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                Plan uw gratis{' '}
                <span className="text-accent-400 italic">adviesgesprek</span>
              </h1>

              <p
                className={`text-base text-white/60 leading-relaxed mb-8 transition-all duration-700 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                Beantwoord enkele vragen en kies direct een moment dat u past.
              </p>

              {/* Quick benefits */}
              <div
                className={`space-y-3 mb-10 transition-all duration-700 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                {quickBenefits.map((benefit, index) => (
                  <div key={benefit.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent-500/20 flex items-center justify-center">
                      <benefit.icon className="h-4 w-4 text-accent-400" />
                    </div>
                    <span className="text-sm text-white/80">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact alternative */}
              <div
                className={`hidden lg:block p-6 bg-white/[0.03] border border-white/10 transition-all duration-700 ${
                  heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <p className="text-sm text-white/50 mb-3">Liever telefonisch?</p>
                <a
                  href="tel:+32493812789"
                  className="text-xl font-display font-medium text-white hover:text-accent-400 transition-colors"
                >
                  +32 493 81 27 89
                </a>
              </div>
            </div>

            {/* Right side - Booking Form (prominent) */}
            <div
              className={`lg:col-span-3 transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="bg-white rounded-sm shadow-2xl shadow-black/20">
                <BookingFlow />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators - Below booking */}
      <section className="py-20 md:py-28 bg-ivory-100 relative overflow-hidden">
        <div className="container-wide relative">
          <AnimatedSection className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-xs font-medium text-accent-600 uppercase tracking-[0.2em]">
                Onze belofte
              </span>
              <div className="w-10 h-px bg-accent-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-medium text-noir-900">
              Waarom kiezen voor{' '}
              <span className="text-accent-600 italic">NAM Construction</span>?
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {trustPoints.map((point, index) => (
              <AnimatedSection key={point.title} delay={index * 100}>
                <div className="bg-white border border-noir-100 p-8 text-center group hover:border-accent-500/30 hover:shadow-lg transition-all duration-500">
                  <div className="w-14 h-14 bg-accent-500/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent-500/20 transition-colors duration-500">
                    <point.icon className="h-6 w-6 text-accent-600" />
                  </div>
                  <h3 className="text-lg font-display font-medium text-noir-900 mb-2">{point.title}</h3>
                  <p className="text-noir-500 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-accent-500 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/10 rounded-full" />

        <div className="container-wide relative">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-4">
                Liever direct een offerte?
              </h2>
              <p className="text-white/80 mb-8">
                Geen afspraak nodig - vraag direct een vrijblijvende offerte aan.
              </p>
              <Link
                href="/offerte"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-accent-700 font-medium overflow-hidden transition-all duration-500 hover:shadow-xl"
              >
                <span className="absolute inset-0 bg-noir-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                  Offerte aanvragen
                </span>
                <ArrowUpRight className="relative z-10 h-5 w-5 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
