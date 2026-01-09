import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Recycle,
  Leaf,
  Heart,
  Clock,
  ArrowRight,
  Hammer,
  Calendar
} from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Duurzaam & Ecologisch Renoveren',
  description: 'Duurzaam en circulair renoveren in Gent. Hergebruik, gezonde materialen, en premie-proof documentatie. Ontdek onze aanpak.',
};

const principles = [
  {
    icon: Clock,
    title: 'Lange levensduur',
    description: 'We kiezen voor materialen en technieken die jarenlang meegaan. Kwaliteit boven snelle oplossingen.',
    color: 'forest'
  },
  {
    icon: Heart,
    title: 'Gezonde materialen',
    description: 'Waar mogelijk kiezen we voor materialen met lage emissies en gezondere alternatieven voor een beter binnenklimaat.',
    color: 'terracotta'
  },
  {
    icon: Recycle,
    title: 'Hergebruik & recuperatie',
    description: 'Bestaande elementen die nog goed zijn, behouden of herbestemmen we. Minder afval, meer waarde.',
    color: 'sand'
  },
  {
    icon: Hammer,
    title: 'Correcte technische opbouw',
    description: 'Dampdicht waar nodig, dampopen waar mogelijk. De juiste technische keuzes voor een duurzaam resultaat.',
    color: 'stone'
  }
];

const materialExamples = [
  {
    category: 'Isolatie',
    icon: '🌿',
    options: [
      { name: 'Houtvezelisolatie', description: 'Natuurlijk, dampopen en goede geluidsisolatie' },
      { name: 'Cellulose', description: 'Gerecycleerd papier, goede thermische eigenschappen' },
      { name: 'Minerale wol', description: 'Beproefde oplossing met goede prestaties' }
    ]
  },
  {
    category: 'Afwerking',
    icon: '🎨',
    options: [
      { name: 'Natuurverven', description: 'Lage emissies, gezonder binnenklimaat' },
      { name: 'Leempleister', description: 'Vochtreguleerd, natuurlijk en esthetisch' },
      { name: 'FSC-hout', description: 'Gecertificeerd duurzaam beheerd hout' }
    ]
  },
  {
    category: 'Vloeren',
    icon: '🏠',
    options: [
      { name: 'Gerecupereerde tegels', description: 'Authentieke uitstraling, circulair' },
      { name: 'Natuursteen', description: 'Duurzaam en tijdloos' },
      { name: 'Massief parket', description: 'Herstelbaar en lang meegaand' }
    ]
  }
];


export default function DuurzaamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest-50 via-cream-50 to-sand-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-forest-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-64 h-64 bg-terracotta-100/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-forest-100 rounded-full text-sm font-medium text-forest-700 mb-6">
                <Leaf className="h-4 w-4" />
                Onze visie
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                Duurzaam & Ecologisch Renoveren
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                Circulair waar het kan. Perfect afgewerkt waar het moet. We geloven in renoveren
                met respect voor mens, materiaal en milieu—zonder in te boeten op kwaliteit.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Bespreek uw project
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                  alt="Duurzaam renoveren"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-forest-100" />

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-sand-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center">
                    <Recycle className="h-6 w-6 text-forest-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Circulair</p>
                    <p className="text-sm text-stone-500">Hergebruik waar mogelijk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we mean by sustainable */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Wat bedoelen wij met duurzaam?"
            subtitle="Duurzaamheid is voor ons geen marketingterm, maar een bewuste keuze in elk aspect van het renovatieproces."
            badge="Onze principes"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle) => (
              <div key={principle.title} className="group text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 ${
                  principle.color === 'forest' ? 'bg-forest-100' :
                  principle.color === 'terracotta' ? 'bg-terracotta-100' :
                  principle.color === 'sand' ? 'bg-sand-100' :
                  'bg-stone-100'
                }`}>
                  <principle.icon className={`h-8 w-8 ${
                    principle.color === 'forest' ? 'text-forest-600' :
                    principle.color === 'terracotta' ? 'text-terracotta-600' :
                    principle.color === 'sand' ? 'text-sand-700' :
                    'text-stone-600'
                  }`} />
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">{principle.title}</h3>
                <p className="text-stone-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Material examples */}
      <section className="section-padding bg-gradient-to-br from-sand-50 to-cream-50">
        <div className="container-custom">
          <SectionHeader
            title="Materiaalvoorbeelden"
            subtitle="Enkele voorbeelden van duurzame materialen die we adviseren. De juiste keuze hangt af van uw project en budget."
            badge="Materialen"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {materialExamples.map((category) => (
              <div key={category.category} className="bg-white rounded-3xl p-8 border border-sand-100 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-xl font-display font-semibold text-stone-900">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.options.map((option) => (
                    <div key={option.name} className="bg-white rounded-xl p-4 shadow-soft">
                      <p className="font-medium text-stone-900">{option.name}</p>
                      <p className="text-sm text-stone-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-stone-500 mt-8 text-sm">
            Dit is een selectie. We bespreken graag welke materialen het best passen bij uw specifieke situatie.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Interesse in duurzaam renoveren?"
        subtitle="We bespreken graag hoe we uw project kunnen aanpakken met respect voor kwaliteit en duurzaamheid."
      />
    </>
  );
}
