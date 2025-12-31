import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  MessageSquare,
  FileText,
  Hammer,
  CheckCircle,
  Phone,
  Calendar,
  ClipboardCheck,
  Users,
  Shield,
  Clock
} from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Onze Aanpak',
  description: 'Ontdek hoe we werken: van eerste contact tot oplevering. Heldere communicatie, duidelijke planning en kwaliteitsgarantie.',
};

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Intake & Kennismaking',
    description: 'We starten met een gratis en vrijblijvend adviesgesprek. Telefonisch, via video of bij u thuis. We luisteren naar uw wensen, bekijken de situatie en bespreken de mogelijkheden.',
    details: [
      'Vrijblijvend en gratis',
      'Uw wensen en prioriteiten',
      'Eerste inschatting haalbaarheid',
      'Kennismaking met onze aanpak'
    ]
  },
  {
    icon: FileText,
    step: '02',
    title: 'Voorstel & Offerte',
    description: 'Na het plaatsbezoek stellen we een gedetailleerd voorstel op. Met duidelijke scope, materiaalopties en premie-proof offerte. Geen verrassingen achteraf.',
    details: [
      'Gedetailleerde scope',
      'Materiaalopties met prijzen',
      'Premie-proof opmaak',
      'Duidelijke planning'
    ]
  },
  {
    icon: Hammer,
    step: '03',
    title: 'Uitvoering',
    description: 'Tijdens de uitvoering bent u altijd op de hoogte. Regelmatige updates, één aanspreekpunt en vakkundige uitvoering door ons team en vaste partners.',
    details: [
      'Eén vast aanspreekpunt',
      'Regelmatige updates',
      'Gecoördineerde planning',
      'Kwaliteitscontrole'
    ]
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Oplevering & Nazorg',
    description: 'Bij oplevering lopen we alles samen door. We zorgen voor de nodige attesten en begeleiden u bij premieaanvragen. Ook na oplevering staan we paraat.',
    details: [
      'Grondige oplevering',
      'Attesten en documenten',
      'Ondersteuning premies',
      'Nazorg en garantie'
    ]
  }
];

const guarantees = [
  {
    icon: Shield,
    title: 'Kwaliteitsgarantie',
    description: 'We staan achter ons werk. Bij problemen lossen we die op, ook na oplevering.'
  },
  {
    icon: Clock,
    title: 'Heldere planning',
    description: 'Duidelijke mijlpalen en realistische timing. U weet waar u aan toe bent.'
  },
  {
    icon: Users,
    title: 'Eén aanspreekpunt',
    description: 'Geen gedoe met verschillende contactpersonen. U heeft één vaste contactpersoon.'
  },
  {
    icon: ClipboardCheck,
    title: 'Transparante prijs',
    description: 'Gedetailleerde offerte zonder verborgen kosten. Meerwerk alleen in overleg.'
  }
];

const faqs = [
  {
    question: 'Hoe lang duurt het voor ik een offerte krijg?',
    answer: 'Na het plaatsbezoek ontvangt u binnen 1 à 2 weken een gedetailleerde offerte. Voor complexere projecten kan dit iets langer duren.'
  },
  {
    question: 'Werken jullie met vaste prijzen of nacalculatie?',
    answer: 'We werken met een gedetailleerde offerte op basis van vaste prijzen. Meerwerk wordt altijd vooraf besproken en goedgekeurd.'
  },
  {
    question: 'Hoe verloopt de communicatie tijdens het project?',
    answer: 'U heeft één vast aanspreekpunt. We geven regelmatige updates (telefonisch, per mail of via WhatsApp) en zijn bereikbaar voor vragen.'
  },
  {
    question: 'Wat als er iets misgaat of niet naar wens is?',
    answer: 'We lossen problemen snel en correct op. Bij oplevering lopen we alles samen door en puntjes worden aangepakt voor finale goedkeuring.'
  },
  {
    question: 'Helpen jullie met vergunningen?',
    answer: 'We adviseren over vergunningsplicht en kunnen doorverwijzen naar architecten indien nodig. De vergunningsaanvraag zelf valt buiten onze scope.'
  },
  {
    question: 'Kunnen jullie ook enkel een deel van de werken uitvoeren?',
    answer: 'Ja, we doen ook gerichte renovaties en afwerking. Bespreek uw specifieke wensen tijdens het adviesgesprek.'
  }
];

export default function AanpakPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-50 to-primary-50/30 py-20 md:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                Onze aanpak
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Van eerste contact tot oplevering: een helder proces met duidelijke communicatie.
                Zodat u weet wat u mag verwachten en geen verrassingen tegenkomt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary">
                  <Calendar className="h-5 w-5 mr-2" />
                  Plan adviesgesprek
                </Link>
                <a href="tel:+32123456789" className="btn-secondary">
                  <Phone className="h-5 w-5 mr-2" />
                  Bel ons
                </a>
              </div>
            </div>
            <div className="relative h-80 lg:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                alt="Onze aanpak"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Het proces in 4 stappen"
            subtitle="Zo verloopt een project bij Nam Construction. Overzichtelijk en voorspelbaar."
          />
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-6xl font-display font-bold text-primary-100">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-neutral-600 mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                        <span className="text-neutral-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`relative h-72 lg:h-80 rounded-2xl overflow-hidden bg-neutral-100 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <step.icon className="h-24 w-24 text-primary-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            title="Wat u mag verwachten"
            subtitle="Onze garanties voor een zorgeloze samenwerking."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee) => (
              <div key={guarantee.title} className="bg-white rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-5">
                  <guarantee.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{guarantee.title}</h3>
                <p className="text-neutral-600">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Veelgestelde vragen"
            subtitle="Antwoorden op de meest voorkomende vragen over onze werkwijze."
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
