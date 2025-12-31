import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, Home, Hammer, Paintbrush, Zap, Leaf, CheckCircle2 } from 'lucide-react';
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
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
    color: 'forest',
    tag: 'Meest gevraagd'
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
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=500&fit=crop',
    color: 'terracotta'
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    color: 'sand'
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
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=500&fit=crop',
    color: 'stone'
  }
];

const whyUs = [
  {
    icon: Leaf,
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
];

export default function DienstenPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cream-50 via-sand-50 to-forest-50/20 py-20 md:py-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-64 h-64 bg-terracotta-100/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sand-200 text-sm font-medium text-stone-600 mb-6">
              <span className="w-2 h-2 rounded-full bg-forest-500" />
              Wat we doen
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
              Onze diensten
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Van totaalrenovatie tot vakkundige afwerking. We begeleiden u door elk aspect van
              uw renovatieproject met duurzame materiaalkeuzes en heldere communicatie.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  {/* Tag */}
                  {service.tag && (
                    <span className="inline-block px-4 py-1.5 bg-terracotta-100 text-terracotta-700 rounded-full text-sm font-medium mb-4">
                      {service.tag}
                    </span>
                  )}

                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      service.color === 'forest' ? 'bg-forest-100' :
                      service.color === 'terracotta' ? 'bg-terracotta-100' :
                      service.color === 'sand' ? 'bg-sand-100' :
                      'bg-stone-100'
                    }`}>
                      <service.icon className={`h-7 w-7 ${
                        service.color === 'forest' ? 'text-forest-600' :
                        service.color === 'terracotta' ? 'text-terracotta-600' :
                        service.color === 'sand' ? 'text-sand-700' :
                        'text-stone-600'
                      }`} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-stone-700">
                        <div className={`w-2 h-2 rounded-full ${
                          service.color === 'forest' ? 'bg-forest-500' :
                          service.color === 'terracotta' ? 'bg-terracotta-500' :
                          service.color === 'sand' ? 'bg-sand-600' :
                          'bg-stone-500'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="group inline-flex items-center px-6 py-3 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
                  >
                    Meer over {service.title.toLowerCase()}
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="relative h-80 lg:h-[450px] rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent" />
                  </div>
                  {/* Decorative accent */}
                  <div className={`absolute -z-10 -bottom-4 ${index % 2 === 1 ? '-left-4' : '-right-4'} w-full h-full rounded-3xl ${
                    service.color === 'forest' ? 'bg-forest-100' :
                    service.color === 'terracotta' ? 'bg-terracotta-100' :
                    service.color === 'sand' ? 'bg-sand-100' :
                    'bg-stone-100'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-padding bg-gradient-to-br from-cream-50 to-sand-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-forest-100/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <SectionHeader
            title="Waarom Nam Construction?"
            subtitle="Wat ons onderscheidt van andere aannemers in de regio."
            badge="Onze aanpak"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {whyUs.map((item, index) => (
              <div key={item.title} className="relative bg-white rounded-3xl p-8 shadow-soft border border-sand-100">
                {/* Number */}
                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-forest-600 text-white flex items-center justify-center font-display font-semibold text-lg">
                  {index + 1}
                </span>
                <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-600">{item.description}</p>
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
