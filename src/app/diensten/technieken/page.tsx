import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Zap, Droplets, Thermometer, Wind, ShieldCheck } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Technieken Gent | Elektriciteit & Sanitair',
  description: 'Elektriciteit en sanitair in Gent. AREI-conforme installaties, sanitaire werken en verwarmingsinstallaties door erkende vakmensen.',
};

const services = [
  {
    icon: Zap,
    title: 'Elektriciteit',
    description: 'Volledige elektrische installaties, conform AREI-normen. Van basisinstallatie tot domotica.',
    items: ['Nieuwe installaties', 'Renovatie bestaande installatie', 'Verlichting', 'Stopcontacten & schakelaars', 'Elektrische keuring']
  },
  {
    icon: Droplets,
    title: 'Sanitair',
    description: 'Sanitaire installaties van hoge kwaliteit. Leidingwerk, aansluitingen en toestellen.',
    items: ['Leidingwerk (koper, kunststof)', 'Badkamerinstallaties', 'Keukeninstallaties', 'Afvoersystemen', 'Regenwatersystemen']
  },
  {
    icon: Thermometer,
    title: 'Verwarming',
    description: 'Verwarmingsinstallaties voor comfort en efficiëntie. Van radiatoren tot vloerverwarming.',
    items: ['Centrale verwarming', 'Vloerverwarming', 'Radiatoren', 'Warmtepomp-ready', 'Thermostaatregeling']
  },
  {
    icon: Wind,
    title: 'Ventilatie',
    description: 'Ventilatiesystemen voor een gezond binnenklimaat. Van basis tot systeem D.',
    items: ['Mechanische ventilatie', 'Systeem C en D', 'Dampkappen', 'Badkamerventilatie', 'Vraaggestuurde ventilatie']
  }
];

export default function TechniekenPage() {
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
                Technieken
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                Elektriciteit, sanitair, verwarming en ventilatie door erkende vakmensen.
                Veilig, conform alle normen en met de juiste attesten.
              </p>
              <Link href="/contact" className="btn-primary">
                Gratis adviesgesprek
              </Link>
            </div>
            <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop"
                alt="Technieken"
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
            title="Onze technische diensten"
            subtitle="Alle technische installaties voor uw renovatieproject."
          />
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-neutral-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900">{service.title}</h3>
                </div>
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

      {/* Certifications */}
      <section className="section-padding bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="h-8 w-8 text-primary-400" />
                <h2 className="text-3xl md:text-4xl font-display font-semibold">
                  Conform alle normen
                </h2>
              </div>
              <p className="text-primary-100 text-lg mb-8">
                Onze technische installaties worden uitgevoerd door erkende vakmensen en
                voldoen aan alle geldende normen en voorschriften.
              </p>
              <div className="space-y-4">
                {[
                  'AREI-conforme elektrische installaties',
                  'Erkende keuringsorganismen voor attesten',
                  'Premie-proof documentatie',
                  'Garantie op materialen en uitvoering',
                  'Nazorg en ondersteuning'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-400 flex-shrink-0" />
                    <span className="text-primary-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 lg:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
                alt="Certificering"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
