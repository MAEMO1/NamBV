import { Metadata } from 'next';
import { Calendar, CheckCircle2, Leaf, Recycle, FileCheck, Euro, Shield } from 'lucide-react';
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

export default function AfspraakPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cream-50 via-sand-50 to-forest-50/20 py-16 md:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 pointer-events-none">
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-terracotta-100/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sand-200 text-sm font-medium text-stone-600 mb-6">
              <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
              Direct inplannen
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-stone-900 mb-4">
              Plan uw gratis
              <span className="text-forest-600"> adviesgesprek</span>
            </h1>
            <p className="text-lg text-stone-600">
              Beantwoord enkele vragen over uw project en kies direct een moment dat u past.
              Vrijblijvend en zonder verplichtingen.
            </p>
          </div>

          {/* Benefits bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-sand-100 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="h-5 w-5 text-forest-600" />
                </div>
                <p className="font-semibold text-stone-900 text-sm">{benefit.title}</p>
                <p className="text-xs text-stone-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-white via-cream-50/30 to-sand-50/20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <BookingFlow />
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-16 bg-gradient-to-br from-forest-900 to-forest-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-forest-800/50 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-terracotta-900/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
              Waarom kiezen voor Nam Construction?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-forest-800/50 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-terracotta-500/20 flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-7 w-7 text-terracotta-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Hergebruik materiaal</h3>
              <p className="text-forest-200 text-sm">
                Waar mogelijk hergebruiken we bestaand materiaal. Duurzaam en kostenbesparend.
              </p>
            </div>

            <div className="bg-forest-800/50 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-forest-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-forest-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Volledige attestering</h3>
              <p className="text-forest-200 text-sm">
                AREI-conforme installaties, EPB-attesten en alle nodige certificaten.
              </p>
            </div>

            <div className="bg-forest-800/50 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-sand-500/20 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-7 w-7 text-sand-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Ecologische focus</h3>
              <p className="text-forest-200 text-sm">
                Duurzame en milieuvriendelijke materialen voor een gezonder thuis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
