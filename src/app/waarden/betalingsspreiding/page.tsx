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
  PiggyBank,
  ArrowUpRight
} from 'lucide-react';
import { CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Betalingsspreiding | Nam Construction',
  description: 'Betaal in fasen per afgeronde mijlpaal. Transparant, eerlijk en overzichtelijk voor uw budget.',
};

const paymentPhases = [
  { phase: 'Voorschot', icon: '1', desc: 'Bij ondertekening overeenkomst', detail: 'Start van de samenwerking' },
  { phase: 'Ruwbouw', icon: '2', desc: 'Na afronding structurele werken', detail: 'Wanneer de basis staat' },
  { phase: 'Afwerking', icon: '3', desc: 'Na afronding afwerkingen', detail: 'Tegelwerk, pleisterwerk, schilderwerk' },
  { phase: 'Oplevering', icon: '4', desc: 'Na finale oplevering en goedkeuring', detail: 'Wanneer u volledig tevreden bent' }
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
      <section className="relative bg-ivory-100 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          {/* Breadcrumb */}
          <Link href="/#waarden" className="inline-flex items-center gap-2 text-noir-500 hover:text-accent-500 transition-colors mb-8 text-sm uppercase tracking-wide">
            <ArrowLeft className="h-4 w-4" />
            <span>Terug naar onze waarden</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 border border-noir-200 text-sm font-medium text-noir-600 mb-6 uppercase tracking-wide">
                <CreditCard className="h-4 w-4" />
                Onze waarden
              </span>

              <h1 className="text-display-lg font-display font-medium text-noir-900 mb-6">
                Betalingsspreiding
              </h1>
              <p className="text-xl text-noir-500 leading-relaxed mb-10">
                Betaal in fasen per afgeronde mijlpaal.
                Transparant, eerlijk en overzichtelijk voor uw budget.
              </p>
              <Link
                href="/afspraak"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-noir-900 text-white font-medium uppercase tracking-wide hover:bg-accent-500 transition-all duration-500"
              >
                Plan een adviesgesprek
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
                  alt="Betalingsspreiding"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plan */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
              Betalingsplan
            </span>
            <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
              Hoe werkt de betaling?
            </h2>
            <p className="text-xl text-noir-500">
              We werken met een gefaseerd betalingsplan dat gekoppeld is aan concrete mijlpalen
              in uw project. Zo betaalt u pas voor werk dat effectief is uitgevoerd.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentPhases.map((item, index) => (
              <div key={item.phase} className="relative bg-ivory-100 p-6 border border-ivory-200">
                {/* Progress line */}
                {index < paymentPhases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-noir-200" />
                )}

                <div className="w-16 h-16 bg-noir-900 flex items-center justify-center mb-4">
                  <span className="text-xl font-display font-medium text-white">{item.icon}</span>
                </div>
                <h3 className="text-xl font-display font-medium text-noir-900 mb-2">{item.phase}</h3>
                <p className="text-noir-600 mb-2">{item.desc}</p>
                <p className="text-sm text-noir-400">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Info box */}
          <div className="mt-16 bg-accent-50 p-8 border border-accent-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent-500 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-display font-medium text-noir-900 mb-2">
                  Spreiding op maat van uw project
                </h3>
                <p className="text-noir-600">
                  De exacte verdeling bespreken we samen en stemmen we af op de aard en omvang van uw project.
                  Zo zorgen we voor een betalingsplan dat past bij uw situatie en budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-32 bg-ivory-100">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
                Voordelen
              </span>
              <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
                Waarom gefaseerd betalen?
              </h2>
              <p className="text-xl text-noir-500 mb-8">
                Een renovatie is een grote investering. Met ons betalingsplan houdt u het overzicht
                en betaalt u enkel voor afgerond werk.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 bg-white px-5 py-4 border border-ivory-200">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0" />
                    <span className="text-noir-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-noir-900 p-10 text-white">
              <Wallet className="h-12 w-12 text-accent-500 mb-6" />
              <h3 className="text-2xl font-display font-medium mb-4">Budgetvriendelijk</h3>
              <p className="text-noir-400 mb-6">
                Door de spreiding over meerdere fasen hoeft u niet in één keer een groot bedrag
                te betalen. Ideaal voor uw cashflow en budgetplanning.
              </p>

              <div className="bg-noir-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <PiggyBank className="h-8 w-8 text-accent-500" />
                  <span className="font-medium">Hoe werkt het?</span>
                </div>
                <div className="space-y-2 text-noir-300 text-sm">
                  <p>• Spreiding over meerdere mijlpalen</p>
                  <p>• Verdeling afgestemd op uw project</p>
                  <p>• Betaling pas na afronding fase</p>
                  <p>• Altijd vooraf duidelijk afgesproken</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
              Transparantie
            </span>
            <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
              Geen verrassingen
            </h2>
            <p className="text-xl text-noir-500 mb-12">
              Alle betalingsmomenten worden vooraf afgesproken en vastgelegd in de overeenkomst.
              Meerwerk wordt altijd vooraf besproken en goedgekeurd.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-ivory-100 p-8 border border-ivory-200">
                <div className="w-14 h-14 bg-noir-900 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="font-medium text-noir-900 mb-2">Duidelijke offerte</h3>
                <p className="text-noir-500 text-sm">Gedetailleerde prijsopgave per onderdeel</p>
              </div>
              <div className="bg-ivory-100 p-8 border border-ivory-200">
                <div className="w-14 h-14 bg-noir-900 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="font-medium text-noir-900 mb-2">Meerwerk in overleg</h3>
                <p className="text-noir-500 text-sm">Altijd vooraf besproken en goedgekeurd</p>
              </div>
              <div className="bg-ivory-100 p-8 border border-ivory-200">
                <div className="w-14 h-14 bg-accent-500 flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle2 className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-medium text-noir-900 mb-2">Betaling na goedkeuring</h3>
                <p className="text-noir-500 text-sm">U betaalt pas na akkoord op de fase</p>
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
