import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Renovatie & Verbouwing Gent',
  description: 'Renovatie en verbouwing in Gent. Badkamerrenovatie, keukenrenovatie, uitbreidingen en meer. Vakkundige uitvoering met duurzame materialen.',
};

const types = [
  {
    title: 'Badkamerrenovatie',
    description: 'Uw badkamer volledig vernieuwen met kwalitatieve materialen en vakkundige afwerking.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop'
  },
  {
    title: 'Keukenrenovatie',
    description: 'Een functionele en stijlvolle keuken die perfect aansluit bij uw levensstijl.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop'
  },
  {
    title: 'Uitbreidingen',
    description: 'Extra leefruimte creëren met een aanbouw of veranda, naadloos geïntegreerd.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=400&fit=crop'
  },
  {
    title: 'Zolderinrichting',
    description: 'Uw zolder omtoveren tot een volwaardige leefruimte met alle comfort.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=400&fit=crop'
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
      <section className="bg-gradient-to-br from-neutral-50 to-primary-50/30 py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <Link
              href="/diensten"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Terug naar diensten
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              Renovatie & Verbouwing
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed mb-8">
              Gerichte renovaties en verbouwingen voor specifieke ruimtes of delen van uw woning.
              Van badkamerrenovatie tot uitbreiding—vakkundig uitgevoerd.
            </p>
            <Link href="/contact" className="btn-primary">
              Gratis adviesgesprek
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
          />
          <div className="grid md:grid-cols-2 gap-8">
            {types.map((type) => (
              <div key={type.title} className="card">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{type.title}</h3>
                  <p className="text-neutral-600">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
                alt="Renovatie voordelen"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-6">
                Voordelen van gerichte renovatie
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Een gerichte renovatie is ideaal wanneer u specifieke ruimtes wilt vernieuwen
                zonder uw hele woning onder handen te nemen.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span className="text-neutral-700">{benefit}</span>
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
