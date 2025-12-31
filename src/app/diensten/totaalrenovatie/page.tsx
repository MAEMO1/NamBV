import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Clock, Users, Shield, FileCheck } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Totaalrenovatie Gent',
  description: 'Totaalrenovatie in Gent en omstreken. Volledige renovatie van uw woning met één aanspreekpunt, duurzame materialen en premie-proof documentatie.',
};

const features = [
  {
    icon: Users,
    title: 'Eén aanspreekpunt',
    description: 'U heeft één contactpersoon voor uw hele project. Wij coördineren alle vakmensen en leveranciers.'
  },
  {
    icon: Clock,
    title: 'Heldere planning',
    description: 'Duidelijke fasering en regelmatige updates. U weet altijd waar u aan toe bent.'
  },
  {
    icon: Shield,
    title: 'Kwaliteitsgarantie',
    description: 'Vakkundige uitvoering met oog voor detail en gebruik van duurzame materialen.'
  },
  {
    icon: FileCheck,
    title: 'Premie-proof',
    description: 'Correcte documentatie voor Mijn VerbouwPremie en andere subsidies.'
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
      <section className="bg-gradient-to-br from-neutral-50 to-primary-50/30 py-20 md:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Link
                href="/diensten"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Terug naar diensten
              </Link>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                Totaalrenovatie
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Volledige renovatie van uw woning, van ruwbouw tot afwerking. Met één
                aanspreekpunt, duurzame materiaalkeuzes en premie-proof documentatie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary">
                  Gratis adviesgesprek
                </Link>
                <Link href="/projecten" className="btn-secondary">
                  Bekijk projecten
                </Link>
              </div>
            </div>
            <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                alt="Totaalrenovatie"
                fill
                className="object-cover"
                priority
              />
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
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-6">
                Wat omvat een totaalrenovatie?
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Een totaalrenovatie betekent dat we alle aspecten van uw woning onder handen nemen.
                Van structurele werken tot de kleinste afwerkingsdetails.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {scope.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span className="text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
                alt="Renovatie scope"
                fill
                className="object-cover"
              />
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
          />
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-neutral-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-600">{faq.answer}</p>
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
