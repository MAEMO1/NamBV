import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, Home, Hammer, Paintbrush, Zap } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Diensten',
  description: 'Ontdek onze diensten: totaalrenovatie, renovatie & verbouwing, afwerking en technieken. Vakkundige uitvoering in Gent en omstreken.',
};

const services = [
  {
    icon: Home,
    title: 'Totaalrenovatie',
    description: 'Volledige renovatie van uw woning, van ruwbouw tot afwerking. We coördineren alle aspecten van uw project met één aanspreekpunt.',
    features: [
      'Volledige projectcoördinatie',
      'Ruwbouw en structurele werken',
      'Technieken (elektriciteit, sanitair)',
      'Afwerking en interieur',
      'Premie-proof documentatie'
    ],
    href: '/diensten/totaalrenovatie',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop'
  },
  {
    icon: Hammer,
    title: 'Renovatie & Verbouwing',
    description: 'Gerichte renovaties en verbouwingen voor specifieke ruimtes of delen van uw woning. Van badkamer tot uitbreiding.',
    features: [
      'Badkamerrenovatie',
      'Keukenrenovatie',
      'Uitbreidingen en aanbouw',
      'Kelderrenovatie',
      'Zolderinrichting'
    ],
    href: '/diensten/renovatie',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=500&fit=crop'
  },
  {
    icon: Paintbrush,
    title: 'Afwerking',
    description: 'Vakkundige afwerking die het verschil maakt. Tegelwerk, plakwerk, schilderwerk en meer met oog voor detail.',
    features: [
      'Tegelwerk (vloer en wand)',
      'Plakwerk en gyproc',
      'Schilderwerk',
      'Chapewerk',
      'Decoratieve afwerking'
    ],
    href: '/diensten/afwerking',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop'
  },
  {
    icon: Zap,
    title: 'Technieken',
    description: 'Elektriciteit en sanitair door erkende vakmensen. Veilig, conform alle normen en met de juiste attesten.',
    features: [
      'Elektriciteitswerken (AREI-conform)',
      'Sanitaire installaties',
      'Verwarming',
      'Ventilatie',
      'Keuringsattesten'
    ],
    href: '/diensten/technieken',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=500&fit=crop'
  }
];

export default function DienstenPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-50 to-primary-50/30 py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Onze diensten
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Van totaalrenovatie tot vakkundige afwerking. We begeleiden u door elk aspect van
              uw renovatieproject met duurzame materiaalkeuzes en heldere communicatie.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h2 className="text-3xl font-display font-semibold text-neutral-900">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-neutral-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href} className="btn-primary">
                    Meer over {service.title.toLowerCase()}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </div>
                <div className={`relative h-80 lg:h-96 rounded-2xl overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            title="Waarom Nam Construction?"
            subtitle="Wat ons onderscheidt van andere aannemers in de regio."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Duurzame keuzes',
                description: 'We kiezen bewust voor materialen met een lange levensduur en gezonde eigenschappen.'
              },
              {
                title: 'Premie-proof dossier',
                description: 'Correcte offerte, factuur en attesten zodat uw premieaanvraag vlot verloopt.'
              },
              {
                title: 'Lokaal verankerd',
                description: 'We werken met betrouwbare lokale vakmensen en leveranciers uit Gent en omstreken.'
              }
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Benieuwd wat we voor u kunnen betekenen?"
        subtitle="Plan een gratis adviesgesprek en we bespreken uw project."
      />
    </>
  );
}
