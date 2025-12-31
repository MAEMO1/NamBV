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
  Clock,
  CheckCircle2,
  ArrowRight,
  CreditCard,
  Mail,
  Smartphone
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
    ],
    color: 'forest'
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
    ],
    color: 'terracotta'
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
    ],
    color: 'sand'
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
    ],
    color: 'stone'
  }
];

const guarantees = [
  {
    icon: Shield,
    title: 'Kwaliteitsgarantie',
    description: 'We staan achter ons werk. Bij problemen lossen we die op, ook na oplevering.',
    color: 'forest'
  },
  {
    icon: Clock,
    title: 'Heldere planning',
    description: 'Duidelijke mijlpalen en realistische timing. U weet waar u aan toe bent.',
    color: 'terracotta'
  },
  {
    icon: Users,
    title: 'Eén aanspreekpunt',
    description: 'Geen gedoe met verschillende contactpersonen. U heeft één vaste contactpersoon.',
    color: 'sand'
  },
  {
    icon: ClipboardCheck,
    title: 'Transparante prijs',
    description: 'Gedetailleerde offerte zonder verborgen kosten. Meerwerk alleen in overleg.',
    color: 'stone'
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
      <section className="relative bg-gradient-to-br from-cream-50 via-sand-50 to-forest-50/20 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sand-200 text-sm font-medium text-stone-600 mb-6">
                <span className="w-2 h-2 rounded-full bg-forest-500" />
                Werkwijze
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                Onze aanpak
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                Van eerste contact tot oplevering: een helder proces met duidelijke communicatie.
                Zodat u weet wat u mag verwachten en geen verrassingen tegenkomt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Plan adviesgesprek
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+32123456789"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-stone-200 text-stone-700 rounded-full font-medium hover:border-forest-600 hover:text-forest-700 transition-all duration-300"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Bel ons
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                  alt="Onze aanpak"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-forest-100" />
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
            badge="Stappen"
          />
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  {/* Step number and icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl md:text-7xl font-display font-bold text-sand-100">
                      {step.step}
                    </span>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      step.color === 'forest' ? 'bg-forest-100' :
                      step.color === 'terracotta' ? 'bg-terracotta-100' :
                      step.color === 'sand' ? 'bg-sand-100' :
                      'bg-stone-100'
                    }`}>
                      <step.icon className={`h-7 w-7 ${
                        step.color === 'forest' ? 'text-forest-600' :
                        step.color === 'terracotta' ? 'text-terracotta-600' :
                        step.color === 'sand' ? 'text-sand-700' :
                        'text-stone-600'
                      }`} />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-semibold text-stone-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-stone-600 mb-6">{step.description}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-3 bg-cream-50 rounded-xl px-4 py-3">
                        <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${
                          step.color === 'forest' ? 'text-forest-600' :
                          step.color === 'terracotta' ? 'text-terracotta-600' :
                          step.color === 'sand' ? 'text-sand-700' :
                          'text-stone-600'
                        }`} />
                        <span className="text-stone-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual placeholder */}
                <div className={`relative h-72 lg:h-80 rounded-3xl overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    step.color === 'forest' ? 'bg-forest-50' :
                    step.color === 'terracotta' ? 'bg-terracotta-50' :
                    step.color === 'sand' ? 'bg-sand-50' :
                    'bg-stone-50'
                  }`}>
                    <step.icon className={`h-32 w-32 ${
                      step.color === 'forest' ? 'text-forest-200' :
                      step.color === 'terracotta' ? 'text-terracotta-200' :
                      step.color === 'sand' ? 'text-sand-200' :
                      'text-stone-200'
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section id="garanties" className="section-padding bg-gradient-to-br from-cream-50 to-sand-50 relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-forest-100/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <SectionHeader
            title="Wat u mag verwachten"
            subtitle="Onze garanties voor een zorgeloze samenwerking."
            badge="Garanties"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee) => (
              <div key={guarantee.title} className="group bg-white rounded-3xl p-8 shadow-soft border border-sand-100 text-center hover:-translate-y-1 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 ${
                  guarantee.color === 'forest' ? 'bg-forest-100' :
                  guarantee.color === 'terracotta' ? 'bg-terracotta-100' :
                  guarantee.color === 'sand' ? 'bg-sand-100' :
                  'bg-stone-100'
                }`}>
                  <guarantee.icon className={`h-8 w-8 ${
                    guarantee.color === 'forest' ? 'text-forest-600' :
                    guarantee.color === 'terracotta' ? 'text-terracotta-600' :
                    guarantee.color === 'sand' ? 'text-sand-700' :
                    'text-stone-600'
                  }`} />
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">{guarantee.title}</h3>
                <p className="text-stone-600">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section id="betaling" className="section-padding bg-white relative overflow-hidden scroll-mt-24">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-sand-100/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <SectionHeader
            title="Betalingsspreiding"
            subtitle="Betaal in fasen per afgeronde mijlpaal. Transparant en overzichtelijk."
            badge="Betaling"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-display font-semibold text-stone-900 mb-6">
                Hoe werkt de betaling?
              </h3>
              <p className="text-lg text-stone-600 mb-8">
                We werken met een gefaseerd betalingsplan dat gekoppeld is aan concrete mijlpalen
                in uw project. Zo betaalt u pas voor werk dat effectief is uitgevoerd.
              </p>

              <div className="space-y-4">
                {[
                  { phase: 'Voorschot', percent: '30%', desc: 'Bij ondertekening overeenkomst' },
                  { phase: 'Ruwbouw', percent: '30%', desc: 'Na afronding structurele werken' },
                  { phase: 'Afwerking', percent: '30%', desc: 'Na afronding afwerkingen' },
                  { phase: 'Oplevering', percent: '10%', desc: 'Na finale oplevering en goedkeuring' }
                ].map((item, index) => (
                  <div key={item.phase} className="flex items-center gap-3 sm:gap-4 bg-cream-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-sand-100">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-sand-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-base sm:text-xl font-display font-bold text-sand-700">{item.percent}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm sm:text-base">{item.phase}</p>
                      <p className="text-xs sm:text-sm text-stone-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-forest-900 rounded-3xl p-8 text-white">
              <CreditCard className="h-12 w-12 text-terracotta-400 mb-6" />
              <h3 className="text-2xl font-display font-semibold mb-4">Voordelen</h3>
              <ul className="space-y-4">
                {[
                  'Geen grote eenmalige betaling',
                  'Betaling gekoppeld aan voortgang',
                  'Duidelijke mijlpalen vooraf afgesproken',
                  'Transparante facturatie per fase',
                  'Geen verrassingen achteraf'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-terracotta-400 flex-shrink-0 mt-0.5" />
                    <span className="text-forest-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Communication Section */}
      <section id="communicatie" className="section-padding bg-gradient-to-br from-sand-50 to-cream-50 relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-forest-100/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <SectionHeader
            title="Heldere Communicatie"
            subtitle="Eén aanspreekpunt, regelmatige updates en duidelijke afspraken."
            badge="Communicatie"
          />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-sand-100">
              <div className="w-14 h-14 rounded-2xl bg-forest-100 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-forest-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">
                Eén vast aanspreekpunt
              </h3>
              <p className="text-stone-600">
                U communiceert steeds met dezelfde projectverantwoordelijke.
                Geen gedoe met verschillende contactpersonen.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-soft border border-sand-100">
              <div className="w-14 h-14 rounded-2xl bg-terracotta-100 flex items-center justify-center mb-6">
                <Smartphone className="h-7 w-7 text-terracotta-600" />
              </div>
              <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">
                Regelmatige updates
              </h3>
              <p className="text-stone-600">
                Wekelijkse voortgangsrapporten via telefoon, e-mail of WhatsApp.
                U kiest het kanaal dat u prefereert.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-soft border border-sand-100">
              <div className="w-14 h-14 rounded-2xl bg-sand-100 flex items-center justify-center mb-6">
                <Mail className="h-7 w-7 text-sand-700" />
              </div>
              <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">
                Bereikbaarheid
              </h3>
              <p className="text-stone-600">
                Snelle reactie op vragen of opmerkingen.
                Geen weken wachten op antwoord.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-3xl p-8 shadow-soft border border-sand-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-display font-semibold text-stone-900 mb-4">
                  Wat u mag verwachten
                </h3>
                <ul className="space-y-3">
                  {[
                    'Wekelijks voortgangsrapport',
                    'Directe lijn met projectverantwoordelijke',
                    'Proactieve communicatie bij wijzigingen',
                    'Duidelijke planning en tijdlijn',
                    'Foto-updates van de werken'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-forest-600 flex-shrink-0" />
                      <span className="text-stone-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-forest-100 mb-4">
                  <MessageSquare className="h-12 w-12 text-forest-600" />
                </div>
                <p className="text-lg font-medium text-stone-900">Altijd op de hoogte</p>
                <p className="text-stone-600">U weet altijd waar uw project staat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding bg-white scroll-mt-24">
        <div className="container-custom">
          <SectionHeader
            title="Veelgestelde vragen"
            subtitle="Antwoorden op de meest voorkomende vragen over onze werkwijze."
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
