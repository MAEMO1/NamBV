import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Recycle,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  ArrowUpRight
} from 'lucide-react';
import { CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Hergebruik & Circulariteit | Nam Construction',
  description: 'Waar mogelijk behouden en hergebruiken we bestaand materiaal. Minder afval, meer karakter, lagere kosten.',
};

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

const benefits = [
  'Minder afval naar het stort',
  'Behoud van authentieke elementen',
  'Lagere materiaalkosten',
  'Uniek karakter voor uw woning',
  'Duurzamer renoveren',
  'Minder CO2-uitstoot'
];

export default function HergebruikPage() {
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
                <Recycle className="h-4 w-4" />
                Onze waarden
              </span>

              <h1 className="text-display-lg font-display font-medium text-noir-900 mb-6">
                Hergebruik & Circulariteit
              </h1>
              <p className="text-xl text-noir-500 leading-relaxed mb-10">
                Waar mogelijk behouden en hergebruiken we bestaand materiaal.
                Minder afval, meer karakter, lagere kosten.
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
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                  alt="Hergebruik van materialen"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Circular approach */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
              Werkwijze
            </span>
            <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
              Onze circulaire aanpak
            </h2>
            <p className="text-xl text-noir-500">
              Waar het technisch en esthetisch kan, hergebruiken we bestaande elementen of recupereren we ze zorgvuldig.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {circularApproach.map((step) => (
              <div key={step.step} className="relative bg-ivory-100 p-8 border border-ivory-200">
                <span className="text-5xl font-display font-medium text-noir-200">{step.step}</span>
                <h3 className="text-xl font-display font-medium text-noir-900 mt-4 mb-2">{step.title}</h3>
                <p className="text-noir-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Examples */}
      <section className="py-24 md:py-32 bg-ivory-100">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
              Realisatie
            </span>
            <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
              Hergebruik in de praktijk
            </h2>
            <p className="text-xl text-noir-500">
              Bestaand materiaal krijgt een tweede leven.
            </p>
          </div>

          {/* Before/After Cards */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Example 1 */}
            <div className="bg-white overflow-hidden border border-ivory-200">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
                      alt="Voor renovatie"
                      fill
                      className="object-cover brightness-90 sepia-[0.2]"
                    />
                    <div className="absolute inset-0 bg-noir-900/30" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1.5 bg-noir-900/80 backdrop-blur-sm text-white text-sm font-medium uppercase tracking-wide">
                      Voor
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=300&fit=crop"
                      alt="Na renovatie"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3 py-1.5 bg-accent-500 text-white text-sm font-medium uppercase tracking-wide">
                      Na
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-medium text-noir-900 mb-2">
                  Keuken met behouden tegelvloer
                </h3>
                <p className="text-noir-500 mb-4">
                  Complete keukenrenovatie waarbij de originele cementtegels uit 1920 werden gereinigd
                  en gerestaureerd. Nieuwe keuken, authentieke vloer.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 border border-noir-200 text-noir-600 text-sm uppercase tracking-wide">
                    Cementtegels behouden
                  </span>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-white overflow-hidden border border-ivory-200">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop"
                      alt="Oude zolder"
                      fill
                      className="object-cover brightness-75 sepia-[0.3]"
                    />
                    <div className="absolute inset-0 bg-noir-900/30" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1.5 bg-noir-900/80 backdrop-blur-sm text-white text-sm font-medium uppercase tracking-wide">
                      Voor
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=300&fit=crop"
                      alt="Moderne living"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3 py-1.5 bg-accent-500 text-white text-sm font-medium uppercase tracking-wide">
                      Na
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-medium text-noir-900 mb-2">
                  Zolder tot living met originele balken
                </h3>
                <p className="text-noir-500 mb-4">
                  Volledige transformatie van zolder naar woonruimte. De originele eiken dakbalken
                  werden geschuurd en behandeld als karakteristiek element.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 border border-noir-200 text-noir-600 text-sm uppercase tracking-wide">
                    Eiken balken behouden
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-noir-900 p-10">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-display font-medium text-white mb-2">70%</p>
                <p className="text-noir-400 uppercase tracking-wide text-sm">minder afval</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-display font-medium text-accent-500 mb-2">€2.500+</p>
                <p className="text-noir-400 uppercase tracking-wide text-sm">besparing mogelijk</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-display font-medium text-white mb-2">100%</p>
                <p className="text-noir-400 uppercase tracking-wide text-sm">authentiek karakter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
                Voordelen
              </span>
              <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
                Waarom kiezen voor hergebruik?
              </h2>
              <p className="text-xl text-noir-500 mb-8">
                Circulair renoveren biedt voordelen voor uw portemonnee, uw woning en het milieu.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 bg-ivory-100 px-5 py-4 border border-ivory-200">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0" />
                    <span className="text-noir-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-96 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
                alt="Duurzame materialen"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Interesse in circulair renoveren?"
        subtitle="We bespreken graag hoe we uw project kunnen aanpakken met aandacht voor hergebruik."
      />
    </>
  );
}
