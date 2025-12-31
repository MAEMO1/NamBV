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

      {/* Circular approach - Hergebruik section */}
      <section id="hergebruik" className="section-padding bg-gradient-to-br from-cream-50 to-sand-50 relative overflow-hidden scroll-mt-24">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-forest-100/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <SectionHeader
            title="Onze circulaire aanpak"
            subtitle="Waar het technisch en esthetisch kan, hergebruiken we bestaande elementen of recupereren we ze zorgvuldig."
            badge="Werkwijze"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {circularApproach.map((step, index) => (
              <div key={step.step} className="relative bg-white rounded-3xl p-8 shadow-soft border border-sand-100">
                <span className="text-5xl font-display font-bold text-forest-100">{step.step}</span>
                <h3 className="text-xl font-display font-semibold text-stone-900 mt-4 mb-2">{step.title}</h3>
                <p className="text-stone-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After - Material Reuse Showcase */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-terracotta-100/20 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <SectionHeader
            title="Hergebruik in de praktijk"
            subtitle="Bestaand materiaal krijgt een tweede leven. Bekijk hoe we waardevolle elementen behouden en integreren in het nieuwe ontwerp."
            badge="Realisatie"
          />

          {/* Before/After Cards */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Example 1: Kitchen with original tiles */}
            <div className="bg-cream-50 rounded-3xl overflow-hidden border border-sand-100 shadow-soft">
              <div className="grid grid-cols-2">
                {/* Before - Old kitchen */}
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
                      alt="Oude keuken voor renovatie met originele tegelvloer"
                      fill
                      className="object-cover brightness-90 sepia-[0.2]"
                    />
                    <div className="absolute inset-0 bg-stone-900/30" />
                  </div>
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-stone-800/80 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full">
                      Voor
                    </span>
                  </div>
                </div>
                {/* After - Renovated kitchen with same tiles */}
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=300&fit=crop"
                      alt="Gerenoveerde keuken met behouden originele tegelvloer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-forest-600 text-white text-xs sm:text-sm font-medium rounded-full">
                      Na
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-display font-semibold text-stone-900 mb-2">
                  Keuken met behouden tegelvloer
                </h3>
                <p className="text-sm sm:text-base text-stone-600 mb-3 sm:mb-4">
                  Complete keukenrenovatie waarbij de originele cementtegels uit 1920 werden gereinigd
                  en gerestaureerd. Nieuwe keuken, authentieke vloer.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-terracotta-100 text-terracotta-700 text-xs sm:text-sm rounded-full">
                    Cementtegels behouden
                  </span>
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-forest-100 text-forest-700 text-xs sm:text-sm rounded-full">
                    Keukenrenovatie
                  </span>
                </div>
              </div>
            </div>

            {/* Example 2: Living room with exposed beams */}
            <div className="bg-cream-50 rounded-3xl overflow-hidden border border-sand-100 shadow-soft">
              <div className="grid grid-cols-2">
                {/* Before - Old attic/room */}
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop"
                      alt="Oude zolder met houten balken voor renovatie"
                      fill
                      className="object-cover brightness-75 sepia-[0.3]"
                    />
                    <div className="absolute inset-0 bg-stone-900/30" />
                  </div>
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-stone-800/80 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full">
                      Voor
                    </span>
                  </div>
                </div>
                {/* After - Modern living with exposed beams */}
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=300&fit=crop"
                      alt="Moderne woonkamer met gerestaureerde houten balken"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-forest-600 text-white text-xs sm:text-sm font-medium rounded-full">
                      Na
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-display font-semibold text-stone-900 mb-2">
                  Zolder tot living met originele balken
                </h3>
                <p className="text-sm sm:text-base text-stone-600 mb-3 sm:mb-4">
                  Volledige transformatie van zolder naar woonruimte. De originele eiken dakbalken
                  werden geschuurd en behandeld als karakteristiek element.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-terracotta-100 text-terracotta-700 text-xs sm:text-sm rounded-full">
                    Eiken balken
                  </span>
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-forest-100 text-forest-700 text-xs sm:text-sm rounded-full">
                    Zolderrenovatie
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="bg-forest-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
              <div>
                <p className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-terracotta-400 mb-1 sm:mb-2">70%</p>
                <p className="text-xs sm:text-sm md:text-base text-forest-200">minder afval</p>
              </div>
              <div>
                <p className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-terracotta-400 mb-1 sm:mb-2">€2.500+</p>
                <p className="text-xs sm:text-sm md:text-base text-forest-200">besparing</p>
              </div>
              <div>
                <p className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-terracotta-400 mb-1 sm:mb-2">100%</p>
                <p className="text-xs sm:text-sm md:text-base text-forest-200">authentiek</p>
              </div>
            </div>
          </div>

          <p className="text-center text-stone-500 mt-8 text-sm">
            * Voorbeeldfoto&apos;s ter illustratie. Elke woning is uniek—we bekijken samen wat hergebruikt kan worden.
          </p>
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

      {/* Premies section */}
      <section id="premies" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-forest-900">
          <div className="absolute top-0 left-0 w-1/2 h-full">
            <div className="absolute top-20 left-20 w-96 h-96 bg-forest-800/50 rounded-full blur-3xl" />
          </div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/2">
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-terracotta-900/30 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-forest-800 rounded-full text-forest-300 text-sm font-medium mb-8">
                <FileCheck className="h-4 w-4" />
                Premies & subsidies
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-white mb-6">
                Premies, Leningen & Attesten
              </h2>
              <p className="text-forest-200 text-lg mb-10">
                We helpen u wegwijs in het premie-landschap en leveren de juiste documenten
                zodat uw dossier vlot kan verlopen.
              </p>

              <div className="space-y-8 mb-10">
                <div>
                  <h3 className="text-xl font-display font-semibold text-white mb-4">Wat wij doen</h3>
                  <div className="space-y-3">
                    {[
                      'Premie-proof offerte en factuur (correct opgesplitst per categorie)',
                      'Aannemersattesten ingevuld en ondertekend',
                      'Coördinatie van keuringen via erkende partners',
                      'Advies over welke werken in aanmerking komen'
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-terracotta-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-forest-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-display font-semibold text-white mb-4">Wat u doet</h3>
                  <div className="space-y-3">
                    {[
                      'Premieaanvraag indienen via Mijn VerbouwPremie',
                      'Eventuele leningaanvraag via het Energiehuis'
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-forest-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-forest-100">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.vlaanderen.be/premies-voor-renovatie/mijn-verbouwpremie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white/10 border border-forest-600 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Mijn VerbouwPremie
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
                <a
                  href="https://www.vlaanderen.be/lenen-voor-een-woning/mijn-verbouwlening"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white/10 border border-forest-600 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Mijn VerbouwLening
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>

            <div className="bg-forest-800/50 backdrop-blur-sm rounded-3xl p-8 border border-forest-700">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-terracotta-400 flex-shrink-0 mt-0.5" />
                <h3 className="text-xl font-display font-semibold text-white">Belangrijke wijzigingen 2026</h3>
              </div>
              <p className="text-forest-200 mb-6">
                Vanaf 1 maart 2026 wijzigt Mijn VerbouwPremie. Eigenaar-bewoners in de hoogste
                inkomenscategorieën komen dan enkel nog in aanmerking voor warmtepomp en warmtepompboiler.
              </p>
              <p className="text-forest-200 mb-6">
                Wij houden u op de hoogte van de actuele voorwaarden en zetten eerlijke verwachtingen.
              </p>
              <a
                href="https://www.vlaanderen.be/premies-voor-renovatie/mijn-verbouwpremie/wijzigingen-mijn-verbouwpremie-vanaf-2026"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-terracotta-400 hover:text-terracotta-300 transition-colors"
              >
                Lees meer over de wijzigingen
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
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
