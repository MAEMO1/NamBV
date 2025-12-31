import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Afwerking Gent | Tegelwerk, Plakwerk, Schilderwerk',
  description: 'Professionele afwerking in Gent. Tegelwerk, plakwerk, schilderwerk en chapewerk. Vakkundige uitvoering met oog voor detail.',
};

const services = [
  {
    title: 'Tegelwerk',
    description: 'Vakkundig gelegd tegelwerk voor vloer en wand. Van klassiek tot modern, met oog voor patroon en voegen.',
    items: ['Vloertegels', 'Wandtegels', 'Mozaïek', 'Natuursteen', 'Grote formaten']
  },
  {
    title: 'Plakwerk & Gyproc',
    description: 'Strakke wanden en plafonds met gyproc of traditioneel pleisterwerk.',
    items: ['Gyprocwanden', 'Verlaagde plafonds', 'Pleisterwerk', 'Schuurwerk', 'Sierpleister']
  },
  {
    title: 'Schilderwerk',
    description: 'Professioneel schilderwerk voor binnen en buiten. Met kwalitatieve verven en gezonde alternatieven.',
    items: ['Binnenschilderwerk', 'Buitenschilderwerk', 'Lakwerk', 'Behang', 'Decoratieve technieken']
  },
  {
    title: 'Chapewerk',
    description: 'Egale ondervloeren voor een perfecte afwerking van uw vloerbekleding.',
    items: ['Traditionele chape', 'Vloerverwarming-chape', 'Egalisatie', 'Sneldrogende chape']
  }
];

export default function AfwerkingPage() {
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
                Afwerking
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Vakkundige afwerking die het verschil maakt. Tegelwerk, plakwerk, schilderwerk
                en meer—met oog voor detail en kwaliteitsvolle materialen.
              </p>
              <Link href="/contact" className="btn-primary">
                Gratis adviesgesprek
              </Link>
            </div>
            <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
                alt="Afwerking"
                fill
                className="object-cover"
                priority
              />
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
          />
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-neutral-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-3">{service.title}</h3>
                <p className="text-neutral-600 mb-6">{service.description}</p>
                <div className="space-y-2">
                  {service.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary-600 flex-shrink-0" />
                      <span className="text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 lg:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&h=600&fit=crop"
                alt="Kwaliteitsafwerking"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-6">
                Afwerking die blijft
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                De afwerking bepaalt het eindresultaat van uw renovatie. Daarom besteden we
                extra aandacht aan materialen, technieken en details.
              </p>
              <div className="space-y-4">
                {[
                  'Gebruik van kwalitatieve materialen',
                  'Vakkundige toepassing en verwerking',
                  'Oog voor detail en afwerking',
                  'Gezonde materialen waar mogelijk',
                  'Strakke oplevering'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span className="text-neutral-700">{item}</span>
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
