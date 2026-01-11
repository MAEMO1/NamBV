import { Metadata } from 'next';
import { Calendar, Leaf, Recycle, FileCheck, Euro, Shield, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { BookingFlow } from '@/components';

export const metadata: Metadata = {
  title: 'Gratis Adviesgesprek Boeken | Nam Construction',
  description: 'Plan direct uw gratis en vrijblijvend adviesgesprek. Beantwoord enkele vragen en kies een moment dat u past.',
};

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

export default function AfspraakPage() {
  return (
    <>
      {/* Hero - Clean, professional */}
      <section className="relative bg-ivory-200 pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 pointer-events-none">
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-noir-200/30 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-noir-100 text-sm font-medium text-noir-600 mb-8">
              <span className="w-2 h-2 bg-accent-500 animate-pulse" />
              Direct inplannen
            </span>

            <h1 className="text-display-lg font-display font-medium text-noir-900 mb-6">
              Plan uw gratis
              <span className="text-accent-500"> adviesgesprek</span>
            </h1>
            <p className="text-lg text-noir-500 leading-relaxed">
              Beantwoord enkele vragen over uw project en kies direct een moment dat u past.
              Vrijblijvend en zonder verplichtingen.
            </p>
          </div>

          {/* Benefits bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white p-5 border border-noir-100 text-center"
              >
                <div className="w-12 h-12 bg-noir-900 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-5 w-5 text-white" />
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
          <div className="max-w-3xl mx-auto">
            <BookingFlow />
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-24 md:py-32 bg-noir-950 relative overflow-hidden">
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-noir-800 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <div className="text-center mb-16">
            <span className="text-sm text-accent-500 font-medium uppercase tracking-[0.3em] mb-6 block">
              Onze belofte
            </span>
            <h2 className="text-display-md font-display font-medium text-white">
              Waarom kiezen voor<br />
              <span className="text-white/40">Nam Construction?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trustPoints.map((point) => (
              <div key={point.title} className="bg-noir-900 border border-noir-800 p-8 text-center group hover:border-accent-500/50 transition-colors duration-500">
                <div className="w-16 h-16 bg-accent-500/10 flex items-center justify-center mx-auto mb-6">
                  <point.icon className="h-7 w-7 text-accent-500" />
                </div>
                <h3 className="text-xl font-display font-medium text-white mb-3">{point.title}</h3>
                <p className="text-noir-400 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          {/* Alternative CTA */}
          <div className="mt-16 text-center">
            <p className="text-noir-400 mb-6">
              Liever direct een offerte aanvragen?
            </p>
            <Link
              href="/offerte"
              className="inline-flex items-center gap-3 px-8 py-4 border border-noir-700 text-white font-medium uppercase tracking-wide hover:bg-white hover:text-noir-900 transition-all duration-500"
            >
              Offerte aanvragen
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
