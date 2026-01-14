'use client';

import { useEffect, useState, useRef } from 'react';
import { Calendar, Leaf, Recycle, Shield, ArrowUpRight, Phone, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { BookingFlow } from '@/components';

const trustPoints = [
  {
    icon: Recycle,
    title: 'Hergebruik materiaal',
    description: 'Duurzaam en kostenbesparend'
  },
  {
    icon: Shield,
    title: 'Volledige attestering',
    description: 'AREI-conform & EPB-attesten'
  },
  {
    icon: Leaf,
    title: 'Ecologische focus',
    description: 'Milieuvriendelijke materialen'
  }
];

export default function AfspraakPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Hero with booking - Clean, professional */}
      <section className="relative bg-ivory-50 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="container-wide">
          {/* Header */}
          <div className="max-w-2xl mb-10 md:mb-12">
            <div
              className={`flex items-center gap-3 mb-5 transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-xs font-medium text-accent-600 uppercase tracking-[0.2em]">
                Gratis adviesgesprek
              </span>
            </div>

            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-display font-medium text-noir-900 mb-4 leading-tight transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Plan uw{' '}
              <span className="text-accent-600 italic">afspraak</span>
            </h1>

            <p
              className={`text-noir-500 leading-relaxed transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Selecteer het type project en kies een moment dat u past.
              Vrijblijvend en zonder verplichtingen.
            </p>
          </div>

          {/* Booking Form - Full width, prominent */}
          <div
            className={`transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-white border border-noir-100 shadow-sm">
              <BookingFlow />
            </div>
          </div>

          {/* Quick contact below form */}
          <div
            className={`mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-noir-900 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent-500 flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/60">Liever telefonisch?</p>
                <a
                  href="tel:+32493812789"
                  className="text-lg font-medium text-white hover:text-accent-400 transition-colors"
                >
                  +32 493 81 27 89
                </a>
              </div>
            </div>
            <Link
              href="/offerte"
              className="group flex items-center gap-2 text-sm text-white/80 hover:text-accent-400 transition-colors"
            >
              <span>Of vraag direct een offerte aan</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-16 md:py-20 bg-white border-t border-noir-100">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {trustPoints.map((point, index) => (
              <div
                key={point.title}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="h-5 w-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-medium text-noir-900 mb-1">{point.title}</h3>
                  <p className="text-sm text-noir-500">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
