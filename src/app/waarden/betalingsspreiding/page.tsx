import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  Wallet,
  PiggyBank
} from 'lucide-react';
import { CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Betalingsspreiding | Nam Construction',
  description: 'Betaal in fasen per afgeronde mijlpaal. Transparant, eerlijk en overzichtelijk voor uw budget.',
};

const paymentPhases = [
  { phase: 'Voorschot', percent: '30%', desc: 'Bij ondertekening overeenkomst', detail: 'Start van de samenwerking' },
  { phase: 'Ruwbouw', percent: '30%', desc: 'Na afronding structurele werken', detail: 'Wanneer de basis staat' },
  { phase: 'Afwerking', percent: '30%', desc: 'Na afronding afwerkingen', detail: 'Tegelwerk, pleisterwerk, schilderwerk' },
  { phase: 'Oplevering', percent: '10%', desc: 'Na finale oplevering en goedkeuring', detail: 'Wanneer u volledig tevreden bent' }
];

const benefits = [
  'Geen grote eenmalige betaling',
  'Betaling gekoppeld aan voortgang',
  'Duidelijke mijlpalen vooraf afgesproken',
  'Transparante facturatie per fase',
  'Geen verrassingen achteraf',
  'Budget overzichtelijk spreiden'
];

export default function BetalingsspreidingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sand-50 via-cream-50 to-forest-50/20 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-sand-100/40 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          {/* Breadcrumb */}
          <Link href="/#waarden" className="inline-flex items-center gap-2 text-stone-500 hover:text-sand-700 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            <span>Terug naar onze waarden</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sand-100 rounded-full text-sm font-medium text-sand-700 mb-6">
                <CreditCard className="h-4 w-4" />
                Onze waarden
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                Betalingsspreiding
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                Betaal in fasen per afgeronde mijlpaal.
                Transparant, eerlijk en overzichtelijk voor uw budget.
              </p>
              <Link
                href="/afspraak"
                className="group inline-flex items-center justify-center px-8 py-4 bg-sand-600 text-white rounded-full font-medium hover:bg-sand-700 transition-all duration-300 hover:shadow-lg hover:shadow-sand-600/25"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Plan een adviesgesprek
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
                  alt="Betalingsspreiding"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-sand-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plan */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-sand-400" />
              <span className="text-sm font-medium text-sand-600 tracking-wide uppercase">Betalingsplan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
              Hoe werkt de betaling?
            </h2>
            <p className="text-xl text-stone-500">
              We werken met een gefaseerd betalingsplan dat gekoppeld is aan concrete mijlpalen
              in uw project. Zo betaalt u pas voor werk dat effectief is uitgevoerd.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentPhases.map((item, index) => (
              <div key={item.phase} className="relative bg-cream-50 rounded-3xl p-6 border border-sand-100">
                {/* Progress line */}
                {index < paymentPhases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-sand-200" />
                )}

                <div className="w-16 h-16 rounded-2xl bg-sand-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-display font-bold text-sand-700">{item.percent}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900 mb-2">{item.phase}</h3>
                <p className="text-stone-600 mb-2">{item.desc}</p>
                <p className="text-sm text-stone-400">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Visual timeline */}
          <div className="mt-16 bg-sand-50 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-sand-600">Start project</span>
              <span className="text-sm font-medium text-sand-600">Oplevering</span>
            </div>
            <div className="h-4 bg-sand-100 rounded-full overflow-hidden">
              <div className="h-full flex">
                <div className="w-[30%] bg-sand-400" />
                <div className="w-[30%] bg-sand-500" />
                <div className="w-[30%] bg-sand-600" />
                <div className="w-[10%] bg-sand-700" />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-stone-500">
              <span>30%</span>
              <span>60%</span>
              <span>90%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-cream-50 to-sand-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-sand-400" />
                <span className="text-sm font-medium text-sand-600 tracking-wide uppercase">Voordelen</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
                Waarom gefaseerd betalen?
              </h2>
              <p className="text-xl text-stone-500 mb-8">
                Een renovatie is een grote investering. Met ons betalingsplan houdt u het overzicht
                en betaalt u enkel voor afgerond werk.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-sand-100">
                    <CheckCircle2 className="h-5 w-5 text-sand-600 flex-shrink-0" />
                    <span className="text-stone-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-sand-800 rounded-3xl p-8 text-white">
              <Wallet className="h-12 w-12 text-sand-300 mb-6" />
              <h3 className="text-2xl font-display font-semibold mb-4">Budgetvriendelijk</h3>
              <p className="text-sand-200 mb-6">
                Door de spreiding over meerdere fasen hoeft u niet in één keer een groot bedrag
                te betalen. Ideaal voor uw cashflow en budgetplanning.
              </p>

              <div className="bg-sand-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <PiggyBank className="h-8 w-8 text-sand-300" />
                  <span className="font-semibold">Voorbeeld renovatie €40.000</span>
                </div>
                <div className="space-y-2 text-sand-200 text-sm">
                  <p>Voorschot: €12.000</p>
                  <p>Na ruwbouw: €12.000</p>
                  <p>Na afwerking: €12.000</p>
                  <p>Bij oplevering: €4.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <span className="w-8 h-[2px] bg-sand-400" />
              <span className="text-sm font-medium text-sand-600 tracking-wide uppercase">Transparantie</span>
              <span className="w-8 h-[2px] bg-sand-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
              Geen verrassingen
            </h2>
            <p className="text-xl text-stone-500 mb-12">
              Alle betalingsmomenten worden vooraf afgesproken en vastgelegd in de overeenkomst.
              Meerwerk wordt altijd vooraf besproken en goedgekeurd.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-cream-50 rounded-2xl p-6 border border-sand-100">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-semibold text-stone-900 mb-2">Duidelijke offerte</h3>
                <p className="text-stone-600 text-sm">Gedetailleerde prijsopgave per onderdeel</p>
              </div>
              <div className="bg-cream-50 rounded-2xl p-6 border border-sand-100">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="font-semibold text-stone-900 mb-2">Meerwerk in overleg</h3>
                <p className="text-stone-600 text-sm">Altijd vooraf besproken en goedgekeurd</p>
              </div>
              <div className="bg-cream-50 rounded-2xl p-6 border border-sand-100">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-semibold text-stone-900 mb-2">Betaling na goedkeuring</h3>
                <p className="text-stone-600 text-sm">U betaalt pas na akkoord op de fase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Renoveren op uw tempo?"
        subtitle="Bespreek uw project en ontdek hoe we de betaling kunnen spreiden."
      />
    </>
  );
}
