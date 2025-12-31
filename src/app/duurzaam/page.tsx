import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Recycle,
  Leaf,
  Heart,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileCheck,
  ExternalLink,
  AlertCircle,
  Hammer
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
    description: 'We kiezen voor materialen en technieken die jarenlang meegaan. Kwaliteit boven snelle oplossingen.'
  },
  {
    icon: Heart,
    title: 'Gezonde materialen',
    description: 'Waar mogelijk kiezen we voor materialen met lage emissies en gezondere alternatieven voor een beter binnenklimaat.'
  },
  {
    icon: Recycle,
    title: 'Hergebruik & recuperatie',
    description: 'Bestaande elementen die nog goed zijn, behouden of herbestemmen we. Minder afval, meer waarde.'
  },
  {
    icon: Hammer,
    title: 'Correcte technische opbouw',
    description: 'Dampdicht waar nodig, dampopen waar mogelijk. De juiste technische keuzes voor een duurzaam resultaat.'
  }
];

const materialExamples = [
  {
    category: 'Isolatie',
    options: [
      { name: 'Houtvezelisolatie', description: 'Natuurlijk, dampopen en goede geluidsisolatie' },
      { name: 'Cellulose', description: 'Gerecycleerd papier, goede thermische eigenschappen' },
      { name: 'Minerale wol', description: 'Beproefde oplossing met goede prestaties' }
    ]
  },
  {
    category: 'Afwerking',
    options: [
      { name: 'Natuurverven', description: 'Lage emissies, gezonder binnenklimaat' },
      { name: 'Leempleister', description: 'Vochtreguleerd, natuurlijk en esthetisch' },
      { name: 'FSC-hout', description: 'Gecertificeerd duurzaam beheerd hout' }
    ]
  },
  {
    category: 'Vloeren',
    options: [
      { name: 'Gerecupereerde tegels', description: 'Authentieke uitstraling, circulair' },
      { name: 'Natuursteen', description: 'Duurzaam en tijdloos' },
      { name: 'Massief parket', description: 'Herstelbaar en lang meegaand' }
    ]
  }
];

const circularApproach = [
  {
    step: '01',
    title: 'Hergebruikscan',
    description: 'Bij de start inventariseren we wat kan blijven, wat hergebruikt kan worden en wat naar recuperatie gaat.'
  },
  {
    step: '02',
    title: 'Selectieve demontage',
    description: 'Waar zinvol demonteren we zorgvuldig in plaats van brute afbraak. Zo behouden materialen hun waarde.'
  },
  {
    step: '03',
    title: 'Materialenkeuze',
    description: 'We adviseren over duurzame alternatieven met aandacht voor prestaties, budget en beschikbaarheid.'
  },
  {
    step: '04',
    title: 'Afvalbeheer',
    description: 'Correcte sortering en afvoer. Wat gerecupereerd kan worden, gaat niet naar het stort.'
  }
];

export default function DuurzaamPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100/30 py-20 md:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
                Onze visie
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                Duurzaam & Ecologisch Renoveren
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Circulair waar het kan. Perfect afgewerkt waar het moet. We geloven in renoveren
                met respect voor mens, materiaal en milieu—zonder in te boeten op kwaliteit.
              </p>
              <Link href="/contact" className="btn-primary">
                Bespreek uw project
              </Link>
            </div>
            <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                alt="Duurzaam renoveren"
                fill
                className="object-cover"
                priority
              />
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
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle) => (
              <div key={principle.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-5">
                  <principle.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{principle.title}</h3>
                <p className="text-neutral-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Circular approach */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            title="Onze circulaire aanpak"
            subtitle="Waar het technisch en esthetisch kan, hergebruiken we bestaande elementen of recupereren we ze zorgvuldig."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {circularApproach.map((step) => (
              <div key={step.step}>
                <span className="text-5xl font-display font-bold text-primary-100">{step.step}</span>
                <h3 className="text-xl font-semibold text-neutral-900 mt-4 mb-2">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material examples */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Materiaalvoorbeelden"
            subtitle="Enkele voorbeelden van duurzame materialen die we adviseren. De juiste keuze hangt af van uw project en budget."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {materialExamples.map((category) => (
              <div key={category.category} className="bg-neutral-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Leaf className="h-6 w-6 text-primary-600" />
                  <h3 className="text-xl font-semibold text-neutral-900">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.options.map((option) => (
                    <div key={option.name}>
                      <p className="font-medium text-neutral-900">{option.name}</p>
                      <p className="text-sm text-neutral-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-neutral-500 mt-8 text-sm">
            Dit is een selectie. We bespreken graag welke materialen het best passen bij uw specifieke situatie.
          </p>
        </div>
      </section>

      {/* Premies section */}
      <section id="premies" className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileCheck className="h-8 w-8 text-primary-400" />
                <h2 className="text-3xl md:text-4xl font-display font-semibold">
                  Premies, Leningen & Attesten
                </h2>
              </div>
              <p className="text-primary-100 text-lg mb-8">
                We helpen u wegwijs in het premie-landschap en leveren de juiste documenten
                zodat uw dossier vlot kan verlopen.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Wat wij doen</h3>
                  <ul className="space-y-2">
                    {[
                      'Premie-proof offerte en factuur (correct opgesplitst per categorie)',
                      'Aannemersattesten ingevuld en ondertekend',
                      'Coördinatie van keuringen via erkende partners',
                      'Advies over welke werken in aanmerking komen'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span className="text-primary-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Wat u doet</h3>
                  <ul className="space-y-2">
                    {[
                      'Premieaanvraag indienen via Mijn VerbouwPremie',
                      'Eventuele leningaanvraag via het Energiehuis'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span className="text-primary-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.vlaanderen.be/premies-voor-renovatie/mijn-verbouwpremie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline border-primary-400 text-white hover:bg-primary-800"
                >
                  Mijn VerbouwPremie
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
                <a
                  href="https://www.vlaanderen.be/lenen-voor-een-woning/mijn-verbouwlening"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline border-primary-400 text-white hover:bg-primary-800"
                >
                  Mijn VerbouwLening
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>

            <div className="bg-primary-800 rounded-2xl p-8">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                <h3 className="text-xl font-semibold text-white">Belangrijke wijzigingen 2026</h3>
              </div>
              <p className="text-primary-200 mb-6">
                Vanaf 1 maart 2026 wijzigt Mijn VerbouwPremie. Eigenaar-bewoners in de hoogste
                inkomenscategorieën komen dan enkel nog in aanmerking voor warmtepomp en warmtepompboiler.
              </p>
              <p className="text-primary-200 mb-6">
                Wij houden u op de hoogte van de actuele voorwaarden en zetten eerlijke verwachtingen.
              </p>
              <a
                href="https://www.vlaanderen.be/premies-voor-renovatie/mijn-verbouwpremie/wijzigingen-mijn-verbouwpremie-vanaf-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-300 hover:text-white transition-colors"
              >
                Lees meer over de wijzigingen
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
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
