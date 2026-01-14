import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Clock, Users, Shield, FileCheck, Home, Calendar } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Totaalrenovatie Gent',
  description: 'Totaalrenovatie in Gent en omstreken. Volledige renovatie van uw woning met één aanspreekpunt, duurzame materialen en premie-proof documentatie.',
};

const features = [
  {
    icon: Users,
    title: 'Eén aanspreekpunt',
    description: 'U heeft één contactpersoon voor uw hele project. Wij coördineren alle vakmensen en leveranciers.',
    color: 'forest'
  },
  {
    icon: Clock,
    title: 'Heldere planning',
    description: 'Duidelijke fasering en regelmatige updates. U weet altijd waar u aan toe bent.',
    color: 'terracotta'
  },
  {
    icon: Shield,
    title: 'Kwaliteitsgarantie',
    description: 'Vakkundige uitvoering met oog voor detail en gebruik van duurzame materialen.',
    color: 'sand'
  },
  {
    icon: FileCheck,
    title: 'Premie-proof',
    description: 'Correcte documentatie voor Mijn VerbouwPremie en andere subsidies.',
    color: 'stone'
  }
];

const scope = [
  'Structurele werken en ruwbouw',
  'Isolatie (dak, gevel, vloer)',
  'Ramen en deuren',
  'Elektriciteit (AREI-conform)',
  'Sanitair en verwarming',
  'Ventilatie',
  'Tegelwerk en vloeren',
  'Plakwerk en gyproc',
  'Schilderwerk',
  'Keuken en badkamer',
  'Buitenafwerking'
];

const faqs = [
  {
    question: 'Hoe lang duurt een totaalrenovatie?',
    answer: 'De duur hangt af van de scope en complexiteit van uw project. Een gemiddelde totaalrenovatie duurt 3 tot 6 maanden. We maken een gedetailleerde planning bij de start.'
  },
  {
    question: 'Kan ik blijven wonen tijdens de renovatie?',
    answer: 'Dit hangt af van de omvang van de werken. We bespreken dit tijdens het adviesgesprek en zoeken samen naar de beste oplossing.'
  },
  {
    question: 'Hoe werkt de betalingsregeling?',
    answer: 'We werken met een betalingsplan in schijven, gekoppeld aan mijlpalen in het project. Zo heeft u budgetzekerheid en transparantie.'
  },
  {
    question: 'Helpen jullie met premieaanvragen?',
    answer: 'Ja, we leveren premie-proof offertes en facturen, en helpen met de nodige attesten. U dient de aanvraag zelf in via het loket.'
  },
  {
    question: 'Werken jullie met onderaannemers?',
    answer: 'Voor gespecialiseerde technieken werken we met vaste, betrouwbare partners. Zij werken onder onze coördinatie en kwaliteitscontrole.'
  }
];

export default function TotaalrenovatiePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cream-50 via-sand-50 to-forest-50/20 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href="/diensten"
                className="inline-flex items-center text-forest-600 hover:text-forest-700 mb-6 group"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180 transition-transform group-hover:-translate-x-1" />
                Terug naar diensten
              </Link>

              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-forest-100 rounded-full text-sm font-medium text-forest-700 mb-6">
                <Home className="h-4 w-4" />
                Meest gevraagd
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                Totaalrenovatie
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                Volledige renovatie van uw woning, van ruwbouw tot afwerking. Met één
                aanspreekpunt, duurzame materiaalkeuzes en premie-proof documentatie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Gratis adviesgesprek
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projecten"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-stone-200 text-stone-700 rounded-full font-medium hover:border-forest-600 hover:text-forest-700 transition-all duration-300"
                >
                  Bekijk projecten
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                  alt="Totaalrenovatie"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
              </div>
              {/* Decorative accent */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-forest-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Wat mag u verwachten?"
            subtitle="Onze totaalrenovaties kenmerken zich door kwaliteit, communicatie en duurzaamheid."
            badge="Voordelen"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="group text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 ${
                  feature.color === 'forest' ? 'bg-forest-100' :
                  feature.color === 'terracotta' ? 'bg-terracotta-100' :
                  feature.color === 'sand' ? 'bg-sand-100' :
                  'bg-stone-100'
                }`}>
                  <feature.icon className={`h-8 w-8 ${
                    feature.color === 'forest' ? 'text-forest-600' :
                    feature.color === 'terracotta' ? 'text-terracotta-600' :
                    feature.color === 'sand' ? 'text-sand-700' :
                    'text-stone-600'
                  }`} />
                </div>
                <h3 className="text-lg font-display font-semibold text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-stone-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="section-padding bg-gradient-to-br from-cream-50 to-sand-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-forest-100/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-forest-100 text-forest-700 rounded-full text-sm font-medium mb-6">
                Scope
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
                Wat omvat een totaalrenovatie?
              </h2>
              <p className="text-lg text-stone-600 mb-8">
                Een totaalrenovatie betekent dat we alle aspecten van uw woning onder handen nemen.
                Van structurele werken tot de kleinste afwerkingsdetails.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {scope.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-soft">
                    <CheckCircle2 className="h-5 w-5 text-forest-600 flex-shrink-0" />
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
                  alt="Renovatie scope"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-3xl bg-terracotta-100" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Veelgestelde vragen"
            subtitle="Antwoorden op de meest voorkomende vragen over totaalrenovatie."
            badge="FAQ"
          />
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-cream-50 rounded-2xl p-6 border border-sand-100">
                  <h3 className="text-lg font-display font-semibold text-stone-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-stone-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner variant="dark" />
    </>
  );
}
