import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Paintbrush, Calendar } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Afwerking Gent | Tegelwerk, Plakwerk, Schilderwerk',
  description: 'Professionele afwerking in Gent. Tegelwerk, plakwerk, schilderwerk en chapewerk. Vakkundige uitvoering met oog voor detail.',
};

const services = [
  {
    title: 'Tegelwerk',
    description: 'Vakkundig gelegd tegelwerk voor vloer en wand. Van klassiek tot modern, met oog voor patroon en voegen.',
    items: ['Vloertegels', 'Wandtegels', 'Mozaïek', 'Natuursteen', 'Grote formaten'],
    color: 'forest'
  },
  {
    title: 'Plakwerk & Gyproc',
    description: 'Strakke wanden en plafonds met gyproc of traditioneel pleisterwerk.',
    items: ['Gyprocwanden', 'Verlaagde plafonds', 'Pleisterwerk', 'Schuurwerk', 'Sierpleister'],
    color: 'terracotta'
  },
  {
    title: 'Schilderwerk',
    description: 'Professioneel schilderwerk voor binnen en buiten. Met kwalitatieve verven en gezonde alternatieven.',
    items: ['Binnenschilderwerk', 'Buitenschilderwerk', 'Lakwerk', 'Behang', 'Decoratieve technieken'],
    color: 'sand'
  },
  {
    title: 'Chapewerk',
    description: 'Egale ondervloeren voor een perfecte afwerking van uw vloerbekleding.',
    items: ['Traditionele chape', 'Vloerverwarming-chape', 'Egalisatie', 'Sneldrogende chape'],
    color: 'stone'
  }
];

const qualityPoints = [
  'Gebruik van kwalitatieve materialen',
  'Vakkundige toepassing en verwerking',
  'Oog voor detail en afwerking',
  'Gezonde materialen waar mogelijk',
  'Strakke oplevering'
];

export default function AfwerkingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cream-50 via-sand-100 to-sand-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-sand-200/50 rounded-full blur-3xl" />
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
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-sand-200 rounded-full text-sm font-medium text-sand-800 mb-6">
                <Paintbrush className="h-4 w-4" />
                Detail & precisie
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                Afwerking
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-8">
                Vakkundige afwerking die het verschil maakt. Tegelwerk, plakwerk, schilderwerk
                en meer—met oog voor detail en kwaliteitsvolle materialen.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-forest-600 text-white rounded-full font-medium hover:bg-forest-700 transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Gratis adviesgesprek
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
                  alt="Afwerking"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-sand-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Onze afwerkingsdiensten"
            subtitle="Van tegelwerk tot schilderwerk—alles voor een perfecte afwerking."
            badge="Diensten"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="relative bg-cream-50 rounded-3xl p-8 border border-sand-100 hover:shadow-lg transition-all duration-300"
              >
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-3xl opacity-50 ${
                  service.color === 'forest' ? 'bg-forest-100' :
                  service.color === 'terracotta' ? 'bg-terracotta-100' :
                  service.color === 'sand' ? 'bg-sand-100' :
                  'bg-stone-100'
                }`} />

                <h3 className="text-2xl font-display font-semibold text-stone-900 mb-3">{service.title}</h3>
                <p className="text-stone-600 mb-6">{service.description}</p>
                <div className="space-y-2">
                  {service.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${
                        service.color === 'forest' ? 'text-forest-600' :
                        service.color === 'terracotta' ? 'text-terracotta-600' :
                        service.color === 'sand' ? 'text-sand-700' :
                        'text-stone-600'
                      }`} />
                      <span className="text-stone-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="section-padding bg-gradient-to-br from-cream-50 to-sand-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-sand-200/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative h-80 lg:h-[450px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop"
                  alt="Kwaliteitsafwerking"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-3xl bg-sand-200" />
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 bg-sand-200 text-sand-800 rounded-full text-sm font-medium mb-6">
                Kwaliteit
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
                Afwerking die blijft
              </h2>
              <p className="text-lg text-stone-600 mb-8">
                De afwerking bepaalt het eindresultaat van uw renovatie. Daarom besteden we
                extra aandacht aan materialen, technieken en details.
              </p>
              <div className="space-y-4">
                {qualityPoints.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-soft">
                    <CheckCircle2 className="h-5 w-5 text-sand-700 flex-shrink-0" />
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner variant="dark" />
    </>
  );
}
