import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Hammer, Calendar } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Renovatie & Verbouwing Gent',
  description: 'Renovatie en verbouwing in Gent. Badkamerrenovatie, keukenrenovatie, uitbreidingen en meer. Vakkundige uitvoering met duurzame materialen.',
};

const types = [
  {
    title: 'Badkamerrenovatie',
    description: 'Uw badkamer volledig vernieuwen met kwalitatieve materialen en vakkundige afwerking.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop',
    color: 'forest'
  },
  {
    title: 'Keukenrenovatie',
    description: 'Een functionele en stijlvolle keuken die perfect aansluit bij uw levensstijl.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    color: 'terracotta'
  },
  {
    title: 'Uitbreidingen',
    description: 'Extra leefruimte creëren met een aanbouw of veranda, naadloos geïntegreerd.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop',
    color: 'sand'
  },
  {
    title: 'Zolderinrichting',
    description: 'Uw zolder omtoveren tot een volwaardige leefruimte met alle comfort.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=400&fit=crop',
    color: 'stone'
  }
];

const benefits = [
  'Gerichte aanpak voor specifieke ruimtes',
  'Minder overlast dan bij totaalrenovatie',
  'Duidelijke scope en budget',
  'Vakkundige afwerking en materialen',
  'Coördinatie van alle vakmensen',
  'Premie-proof documentatie waar van toepassing'
];

export default function RenovatiePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cream-50 via-sand-50 to-terracotta-50/20 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-terracotta-100/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <Link
              href="/diensten"
              className="inline-flex items-center text-forest-600 hover:text-forest-700 mb-6 group"
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180 transition-transform group-hover:-translate-x-1" />
              Terug naar diensten
            </Link>

            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta-100 rounded-full text-sm font-medium text-terracotta-700 mb-6">
              <Hammer className="h-4 w-4" />
              Gerichte renovaties
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
              Renovatie & Verbouwing
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed mb-8">
              Gerichte renovaties en verbouwingen voor specifieke ruimtes of delen van uw woning.
              Van badkamerrenovatie tot uitbreiding—vakkundig uitgevoerd.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Gratis adviesgesprek
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Mogelijkheden"
            subtitle="Ontdek de verschillende renovatie- en verbouwingsprojecten die we uitvoeren."
            badge="Opties"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {types.map((type) => (
              <div key={type.title} className="group relative bg-cream-50 rounded-3xl overflow-hidden border border-sand-100 hover:shadow-xl transition-all duration-500">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-display font-semibold text-white">
                      {type.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-stone-600">{type.description}</p>
                </div>
                {/* Decorative dot */}
                <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                  type.color === 'forest' ? 'bg-forest-500' :
                  type.color === 'terracotta' ? 'bg-terracotta-500' :
                  type.color === 'sand' ? 'bg-sand-600' :
                  'bg-stone-500'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-gradient-to-br from-cream-50 to-sand-50 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-terracotta-100/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative h-80 lg:h-[450px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
                  alt="Renovatie voordelen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-3xl bg-terracotta-100" />
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 bg-terracotta-100 text-terracotta-700 rounded-full text-sm font-medium mb-6">
                Voordelen
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
                Voordelen van gerichte renovatie
              </h2>
              <p className="text-lg text-stone-600 mb-8">
                Een gerichte renovatie is ideaal wanneer u specifieke ruimtes wilt vernieuwen
                zonder uw hele woning onder handen te nemen.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-soft">
                    <CheckCircle2 className="h-5 w-5 text-terracotta-600 flex-shrink-0" />
                    <span className="text-stone-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
