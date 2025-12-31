import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle2, MapPin, Users, Award, Heart } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Over Nam Construction',
  description: 'Leer Nam Construction kennen. Lokaal verankerd in Gent, met passie voor duurzaam renoveren en kwaliteitsafwerking.',
};

const values = [
  {
    icon: Heart,
    title: 'Passie voor kwaliteit',
    description: 'We doen geen halve dingen. Elk project krijgt onze volle aandacht en vakmanschap.'
  },
  {
    icon: Users,
    title: 'Klantgericht',
    description: 'Uw wensen staan centraal. We luisteren, adviseren en denken mee over de beste oplossingen.'
  },
  {
    icon: Award,
    title: 'Vakmanschap',
    description: 'Technisch correct en esthetisch sterk. We zijn trots op ons werk en dat zie je terug.'
  },
  {
    icon: MapPin,
    title: 'Lokaal verankerd',
    description: 'We kennen de regio en werken met lokale partners. Korte lijnen, betrouwbare netwerken.'
  }
];

const milestones = [
  { year: '2014', event: 'Oprichting Nam Construction' },
  { year: '2016', event: 'Eerste totaalrenovatie voltooid' },
  { year: '2018', event: 'Uitbreiding team en diensten' },
  { year: '2020', event: 'Focus op duurzame materialen' },
  { year: '2022', event: '40+ projecten gerealiseerd' },
  { year: 'Nu', event: '50+ tevreden klanten in Gent en omstreken' }
];

const regions = [
  'Gent-centrum',
  'Mariakerke',
  'Drongen',
  'Ledeberg',
  'Gentbrugge',
  'Sint-Amandsberg',
  'Wondelgem',
  'Sint-Denijs-Westrem',
  'Zwijnaarde',
  'Afsnee',
  'Sint-Martens-Latem',
  'De Pinte'
];

export default function OverNamPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-50 to-primary-50/30 py-20 md:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                Over Nam Construction
              </h1>
              <p className="text-xl text-neutral-600 leading-relaxed mb-6">
                Nam Construction is een Gentse renovatie-onderneming met passie voor kwaliteit,
                duurzaamheid en vakmanschap. We renoveren woningen met respect voor materiaal,
                mens en milieu.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Onze aanpak is persoonlijk: we geloven in nauwe samenwerking met onze klanten,
                heldere communicatie en afwerking die blijft.
              </p>
            </div>
            <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                alt="Nam Construction team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Onze waarden"
            subtitle="Waar we voor staan en hoe we werken."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-5">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-neutral-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-6">
                Ons verhaal
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                Nam Construction is gegroeid uit een passie voor renovatie en de overtuiging
                dat het anders kan: persoonlijker, duurzamer en met meer aandacht voor kwaliteit.
              </p>
              <p className="text-lg text-neutral-600 mb-8">
                Vandaag zijn we een hecht team dat trots is op elke renovatie die we opleveren.
                We kiezen bewust voor projecten waar we het verschil kunnen maken en voor
                klanten die kwaliteit verkiezen boven de laagste prijs.
              </p>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="w-16 text-sm font-semibold text-primary-600">{milestone.year}</span>
                    <span className="text-neutral-700">{milestone.event}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                alt="Ons verhaal"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Actief in Gent en omstreken"
            subtitle="We werken in heel Gent en de randgemeenten."
          />
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {regions.map((region) => (
                <div key={region} className="flex items-center gap-2 text-neutral-700">
                  <MapPin className="h-4 w-4 text-primary-500 flex-shrink-0" />
                  {region}
                </div>
              ))}
            </div>
            <p className="text-center text-neutral-500 mt-8">
              Ligt uw gemeente er niet bij? Neem contact op—we kijken graag of we kunnen helpen.
            </p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            title="Onze partners"
            subtitle="We werken samen met betrouwbare lokale vakmensen en leveranciers."
          />
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-neutral-600 mb-8">
              Voor gespecialiseerde technieken en materialen werken we met vaste partners.
              Vakmensen die we kennen, vertrouwen en die dezelfde standaarden hanteren.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Elektriciteit', desc: 'Erkende elektriciens voor AREI-conforme installaties' },
                { title: 'Sanitair', desc: 'Ervaren loodgieters voor alle sanitaire werken' },
                { title: 'Materialen', desc: 'Lokale leveranciers met kwalitatieve producten' }
              ].map((partner) => (
                <div key={partner.title} className="bg-white rounded-xl p-6">
                  <h3 className="font-semibold text-neutral-900 mb-2">{partner.title}</h3>
                  <p className="text-sm text-neutral-600">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Zin om samen te werken?"
        subtitle="Neem contact op voor een kennismaking. We kijken graag hoe we u kunnen helpen."
      />
    </>
  );
}
