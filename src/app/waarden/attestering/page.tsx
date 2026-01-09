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
  FileText
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
    color: 'forest'
  },
  {
    icon: FileText,
    title: 'EPB-attesten',
    description: 'Energie Prestatie en Binnenklimaat documentatie voor uw renovatieproject.',
    color: 'terracotta'
  },
  {
    icon: Award,
    title: 'Aannemersattesten',
    description: 'Alle nodige attesten voor uw premieaanvragen, correct ingevuld en ondertekend.',
    color: 'sand'
  },
  {
    icon: FileCheck,
    title: 'Keuringsrapporten',
    description: 'Coördinatie van alle nodige keuringen via onze erkende partners.',
    color: 'stone'
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
      <section className="relative bg-gradient-to-br from-forest-50 via-cream-50 to-sand-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-forest-100/40 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          {/* Breadcrumb */}
          <Link href="/#waarden" className="inline-flex items-center gap-2 text-stone-500 hover:text-forest-600 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            <span>Terug naar onze waarden</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-forest-100 rounded-full text-sm font-medium text-forest-700 mb-6">
                <FileCheck className="h-4 w-4" />
                Onze waarden
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                Volledige Attestering
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                AREI-conforme installaties, EPB-attesten en alle nodige certificaten.
                Premie-proof en zonder zorgen.
              </p>
              <Link
                href="/afspraak"
                className="group inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
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
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
                  alt="Attestering en documenten"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-forest-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-forest-500" />
              <span className="text-sm font-medium text-forest-600 tracking-wide uppercase">Certificaten</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
              Alle documenten in orde
            </h2>
            <p className="text-xl text-stone-500">
              Wij zorgen voor alle nodige attesten en certificaten zodat u zich geen zorgen hoeft te maken.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert) => (
              <div key={cert.title} className="group bg-cream-50 rounded-3xl p-8 border border-sand-100 hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                  cert.color === 'forest' ? 'bg-forest-100' :
                  cert.color === 'terracotta' ? 'bg-terracotta-100' :
                  cert.color === 'sand' ? 'bg-sand-100' :
                  'bg-stone-100'
                }`}>
                  <cert.icon className={`h-7 w-7 ${
                    cert.color === 'forest' ? 'text-forest-600' :
                    cert.color === 'terracotta' ? 'text-terracotta-600' :
                    cert.color === 'sand' ? 'text-sand-700' :
                    'text-stone-600'
                  }`} />
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">{cert.title}</h3>
                <p className="text-stone-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do / What you get */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-cream-50 to-sand-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* What we do */}
            <div className="bg-white rounded-3xl p-8 border border-sand-100">
              <h3 className="text-2xl font-display font-semibold text-stone-900 mb-6">
                Wat wij doen
              </h3>
              <div className="space-y-4">
                {whatWeDo.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-forest-600" />
                    </div>
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What you get */}
            <div className="bg-forest-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-display font-semibold mb-6">
                Wat u krijgt
              </h3>
              <div className="space-y-4">
                {whatYouGet.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-terracotta-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-forest-100">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-forest-700">
                <p className="text-forest-200 text-sm">
                  Al onze werken worden uitgevoerd volgens de geldende normen en regelgeving.
                  U ontvangt alle nodige documenten voor uw premieaanvragen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop"
                alt="Documenten en certificaten"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-forest-500" />
                <span className="text-sm font-medium text-forest-600 tracking-wide uppercase">Waarom belangrijk</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
                Premie-proof renoveren
              </h2>
              <p className="text-lg text-stone-600 mb-8">
                Veel renovatiepremies vereisen specifieke documenten en attesten.
                Wij zorgen ervoor dat al uw paperassen in orde zijn, zodat u maximaal
                kunt profiteren van beschikbare subsidies.
              </p>

              <div className="bg-cream-50 rounded-2xl p-6 border border-sand-100">
                <h4 className="font-semibold text-stone-900 mb-3">Zonder correcte attestering:</h4>
                <ul className="space-y-2 text-stone-600">
                  <li>• Geen toegang tot premies</li>
                  <li>• Problemen bij verkoop woning</li>
                  <li>• Risico op boetes bij keuring</li>
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
