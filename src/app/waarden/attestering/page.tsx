import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  FileCheck,
  Shield,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  Award,
  FileText,
  ArrowUpRight
} from 'lucide-react';
import { CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Volledige Attestering | Nam Construction',
  description: 'AREI-conforme installaties, EPB-attesten en alle nodige certificaten. Premie-proof en zonder zorgen.',
};

const certifications = [
  {
    icon: Shield,
    title: 'AREI-conformiteit',
    description: 'Elektrische installaties volgens het Algemeen Reglement op de Elektrische Installaties. Veilig en gekeurd.',
  },
  {
    icon: FileText,
    title: 'EPB-attesten',
    description: 'Energie Prestatie en Binnenklimaat documentatie voor uw renovatieproject.',
  },
  {
    icon: Award,
    title: 'Aannemersattesten',
    description: 'Alle nodige attesten voor uw premieaanvragen, correct ingevuld en ondertekend.',
  },
  {
    icon: FileCheck,
    title: 'Keuringsrapporten',
    description: 'Coördinatie van alle nodige keuringen via onze erkende partners.',
  }
];

const whatWeDo = [
  'Premie-proof offerte en factuur (correct opgesplitst per categorie)',
  'Aannemersattesten ingevuld en ondertekend',
  'Coördinatie van keuringen via erkende partners',
  'Advies over welke werken in aanmerking komen',
  'Documentatie voor BTW-attest bij renovatie'
];

const whatYouGet = [
  'Alle documenten voor premieaanvraag',
  'AREI-keuringsattest',
  'Facturen conform premievereisten',
  'Ondersteuning bij het indienen'
];

export default function AttesteringPage() {
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
                <FileCheck className="h-4 w-4" />
                Onze waarden
              </span>

              <h1 className="text-display-lg font-display font-medium text-noir-900 mb-6">
                Volledige Attestering
              </h1>
              <p className="text-xl text-noir-500 leading-relaxed mb-10">
                AREI-conforme installaties, EPB-attesten en alle nodige certificaten.
                Premie-proof en zonder zorgen.
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
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
                  alt="Attestering en documenten"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
              Certificaten
            </span>
            <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
              Alle documenten in orde
            </h2>
            <p className="text-xl text-noir-500">
              Wij zorgen voor alle nodige attesten en certificaten zodat u zich geen zorgen hoeft te maken.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert) => (
              <div key={cert.title} className="group bg-ivory-100 p-8 border border-ivory-200 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-noir-900 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <cert.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-display font-medium text-noir-900 mb-3">{cert.title}</h3>
                <p className="text-noir-500">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do / What you get */}
      <section className="py-24 md:py-32 bg-ivory-100">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* What we do */}
            <div className="bg-white p-10 border border-ivory-200">
              <h3 className="text-2xl font-display font-medium text-noir-900 mb-6">
                Wat wij doen
              </h3>
              <div className="space-y-4">
                {whatWeDo.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-noir-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What you get */}
            <div className="bg-noir-900 p-10 text-white">
              <h3 className="text-2xl font-display font-medium mb-6">
                Wat u krijgt
              </h3>
              <div className="space-y-4">
                {whatYouGet.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-noir-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-noir-800">
                <p className="text-noir-400 text-sm">
                  Al onze werken worden uitgevoerd volgens de geldende normen en regelgeving.
                  U ontvangt alle nodige documenten voor uw premieaanvragen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
                alt="Documenten en certificaten"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em] mb-4 block">
                Waarom belangrijk
              </span>
              <h2 className="text-display-md font-display font-medium text-noir-900 mb-6">
                Premie-proof renoveren
              </h2>
              <p className="text-lg text-noir-500 mb-8">
                Veel renovatiepremies vereisen specifieke documenten en attesten.
                Wij zorgen ervoor dat al uw paperassen in orde zijn, zodat u maximaal
                kunt profiteren van beschikbare subsidies.
              </p>

              <div className="bg-ivory-100 p-6 border border-ivory-200">
                <h4 className="font-medium text-noir-900 mb-3">Zonder correcte attestering:</h4>
                <ul className="space-y-2 text-noir-500">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-noir-400 rounded-full" />
                    Geen toegang tot premies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-noir-400 rounded-full" />
                    Problemen bij verkoop woning
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-noir-400 rounded-full" />
                    Risico op boetes bij keuring
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Zekerheid over uw documenten?"
        subtitle="Wij zorgen voor alle nodige attesten en certificaten bij uw renovatieproject."
      />
    </>
  );
}
