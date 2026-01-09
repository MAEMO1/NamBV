import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  ExternalLink,
  AlertCircle,
  Euro,
  FileCheck
} from 'lucide-react';
import { CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Subsidie-ondersteuning | Nam Construction',
  description: 'We helpen bij het aanvragen van beschikbare premies en subsidies. Maximaal voordeel uit uw investering.',
};

const whatWeDo = [
  'Premie-proof offerte en factuur (correct opgesplitst per categorie)',
  'Aannemersattesten ingevuld en ondertekend',
  'Coördinatie van keuringen via erkende partners',
  'Advies over welke werken in aanmerking komen'
];

const whatYouDo = [
  'Premieaanvraag indienen via Mijn VerbouwPremie',
  'Eventuele leningaanvraag via het Energiehuis'
];

const premieTypes = [
  {
    title: 'Mijn VerbouwPremie',
    description: 'Premie voor dakisolatie, muurisolatie, vloerisolatie, hoogrendementsglas en meer.',
    link: 'https://www.vlaanderen.be/premies-voor-renovatie/mijn-verbouwpremie',
    color: 'forest'
  },
  {
    title: 'Mijn VerbouwLening',
    description: 'Voordelige lening voor energiebesparende renovaties via het Energiehuis.',
    link: 'https://www.vlaanderen.be/lenen-voor-een-woning/mijn-verbouwlening',
    color: 'terracotta'
  },
  {
    title: 'Gemeentelijke premies',
    description: 'Extra premies van uw gemeente bovenop de Vlaamse premies.',
    link: '#',
    color: 'sand'
  }
];

export default function SubsidiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-terracotta-50 via-cream-50 to-sand-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-terracotta-100/40 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          {/* Breadcrumb */}
          <Link href="/#waarden" className="inline-flex items-center gap-2 text-stone-500 hover:text-terracotta-600 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            <span>Terug naar onze waarden</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta-100 rounded-full text-sm font-medium text-terracotta-700 mb-6">
                <Shield className="h-4 w-4" />
                Onze waarden
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                Subsidie-ondersteuning
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                We helpen bij het aanvragen van beschikbare premies en subsidies.
                Maximaal voordeel uit uw investering.
              </p>
              <Link
                href="/afspraak"
                className="group inline-flex items-center justify-center px-8 py-4 bg-terracotta-500 text-white rounded-full font-medium hover:bg-terracotta-600 transition-all duration-300 hover:shadow-lg hover:shadow-terracotta-500/25"
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
                  alt="Subsidies en premies"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-terracotta-100" />
            </div>
          </div>
        </div>
      </section>

      {/* What we do / What you do */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-terracotta-400" />
              <span className="text-sm font-medium text-terracotta-600 tracking-wide uppercase">Samenwerking</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
              Premies, Leningen & Attesten
            </h2>
            <p className="text-xl text-stone-500">
              We helpen u wegwijs in het premie-landschap en leveren de juiste documenten
              zodat uw dossier vlot kan verlopen.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* What we do */}
            <div className="bg-cream-50 rounded-3xl p-8 border border-sand-100">
              <div className="w-14 h-14 rounded-2xl bg-terracotta-100 flex items-center justify-center mb-6">
                <FileCheck className="h-7 w-7 text-terracotta-600" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-stone-900 mb-6">
                Wat wij doen
              </h3>
              <div className="space-y-4">
                {whatWeDo.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-terracotta-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-terracotta-600" />
                    </div>
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What you do */}
            <div className="bg-cream-50 rounded-3xl p-8 border border-sand-100">
              <div className="w-14 h-14 rounded-2xl bg-forest-100 flex items-center justify-center mb-6">
                <Euro className="h-7 w-7 text-forest-600" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-stone-900 mb-6">
                Wat u doet
              </h3>
              <div className="space-y-4">
                {whatYouDo.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-forest-600" />
                    </div>
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-sand-200">
                <p className="text-stone-500 text-sm">
                  De premieaanvraag zelf dient u in via de officiële kanalen.
                  Wij zorgen voor alle nodige documenten en attesten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premie Types */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-cream-50 to-sand-50">
        <div className="container-custom">
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-terracotta-400" />
              <span className="text-sm font-medium text-terracotta-600 tracking-wide uppercase">Overzicht</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
              Beschikbare premies
            </h2>
            <p className="text-xl text-stone-500">
              Een overzicht van de belangrijkste premies waarvoor uw renovatie mogelijk in aanmerking komt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {premieTypes.map((premie) => (
              <div key={premie.title} className="bg-white rounded-3xl p-8 border border-sand-100 hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">{premie.title}</h3>
                <p className="text-stone-600 mb-6">{premie.description}</p>
                {premie.link !== '#' && (
                  <a
                    href={premie.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center text-sm font-medium transition-colors ${
                      premie.color === 'forest' ? 'text-forest-600 hover:text-forest-700' :
                      premie.color === 'terracotta' ? 'text-terracotta-600 hover:text-terracotta-700' :
                      'text-sand-700 hover:text-sand-800'
                    }`}
                  >
                    Meer info
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 md:py-28 bg-terracotta-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <AlertCircle className="h-8 w-8 text-terracotta-300 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
                  Belangrijke wijzigingen 2026
                </h2>
                <p className="text-terracotta-200 text-lg mb-6">
                  Vanaf 1 maart 2026 wijzigt Mijn VerbouwPremie. Eigenaar-bewoners in de hoogste
                  inkomenscategorieën komen dan enkel nog in aanmerking voor warmtepomp en warmtepompboiler.
                </p>
                <p className="text-terracotta-200 mb-8">
                  Wij houden u op de hoogte van de actuele voorwaarden en zetten eerlijke verwachtingen.
                </p>
                <a
                  href="https://www.vlaanderen.be/premies-voor-renovatie/mijn-verbouwpremie/wijzigingen-mijn-verbouwpremie-vanaf-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-terracotta-300 hover:text-white transition-colors"
                >
                  Lees meer over de wijzigingen
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <a
                href="https://www.vlaanderen.be/premies-voor-renovatie/mijn-verbouwpremie"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border border-terracotta-700 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300"
              >
                Mijn VerbouwPremie
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://www.vlaanderen.be/lenen-voor-een-woning/mijn-verbouwlening"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border border-terracotta-700 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300"
              >
                Mijn VerbouwLening
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Maximaal profiteren van premies?"
        subtitle="We bespreken graag welke premies van toepassing zijn op uw renovatieproject."
      />
    </>
  );
}
