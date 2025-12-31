import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle2, MapPin, Users, Award, Heart, Leaf, Calendar, ArrowRight } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Over Nam Construction',
  description: 'Leer Nam Construction kennen. Lokaal verankerd in Gent, met passie voor duurzaam renoveren en kwaliteitsafwerking.',
};

const values = [
  {
    icon: Heart,
    title: 'Passie voor kwaliteit',
    description: 'We doen geen halve dingen. Elk project krijgt onze volle aandacht en vakmanschap.',
    color: 'terracotta'
  },
  {
    icon: Users,
    title: 'Klantgericht',
    description: 'Uw wensen staan centraal. We luisteren, adviseren en denken mee over de beste oplossingen.',
    color: 'forest'
  },
  {
    icon: Award,
    title: 'Vakmanschap',
    description: 'Technisch correct en esthetisch sterk. We zijn trots op ons werk en dat zie je terug.',
    color: 'sand'
  },
  {
    icon: MapPin,
    title: 'Lokaal verankerd',
    description: 'We kennen de regio en werken met lokale partners. Korte lijnen, betrouwbare netwerken.',
    color: 'stone'
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

const partners = [
  { title: 'Elektriciteit', desc: 'Erkende elektriciens voor AREI-conforme installaties' },
  { title: 'Sanitair', desc: 'Ervaren loodgieters voor alle sanitaire werken' },
  { title: 'Materialen', desc: 'Lokale leveranciers met kwalitatieve producten' }
];

export default function OverNamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cream-50 via-sand-50 to-terracotta-50/20 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-terracotta-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-64 h-64 bg-forest-100/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta-100 rounded-full text-sm font-medium text-terracotta-700 mb-6">
                <Heart className="h-4 w-4" />
                Wie we zijn
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
                Over Nam Construction
              </h1>
              <p className="text-xl text-stone-600 leading-relaxed mb-6">
                Nam Construction is een Gentse renovatie-onderneming met passie voor kwaliteit,
                duurzaamheid en vakmanschap. We renoveren woningen met respect voor materiaal,
                mens en milieu.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Onze aanpak is persoonlijk: we geloven in nauwe samenwerking met onze klanten,
                heldere communicatie en afwerking die blijft.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                  alt="Nam Construction team"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-terracotta-100" />
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
            badge="Waarden"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="group text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 ${
                  value.color === 'forest' ? 'bg-forest-100' :
                  value.color === 'terracotta' ? 'bg-terracotta-100' :
                  value.color === 'sand' ? 'bg-sand-100' :
                  'bg-stone-100'
                }`}>
                  <value.icon className={`h-8 w-8 ${
                    value.color === 'forest' ? 'text-forest-600' :
                    value.color === 'terracotta' ? 'text-terracotta-600' :
                    value.color === 'sand' ? 'text-sand-700' :
                    'text-stone-600'
                  }`} />
                </div>
                <h3 className="text-xl font-display font-semibold text-stone-900 mb-3">{value.title}</h3>
                <p className="text-stone-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="section-padding bg-gradient-to-br from-cream-50 to-sand-50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-forest-100/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-forest-100 text-forest-700 rounded-full text-sm font-medium mb-6">
                Ons verhaal
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mb-6">
                Ons verhaal
              </h2>
              <p className="text-lg text-stone-600 mb-6">
                Nam Construction is gegroeid uit een passie voor renovatie en de overtuiging
                dat het anders kan: persoonlijker, duurzamer en met meer aandacht voor kwaliteit.
              </p>
              <p className="text-lg text-stone-600 mb-8">
                Vandaag zijn we een hecht team dat trots is op elke renovatie die we opleveren.
                We kiezen bewust voor projecten waar we het verschil kunnen maken en voor
                klanten die kwaliteit verkiezen boven de laagste prijs.
              </p>

              {/* Timeline */}
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white rounded-xl px-4 py-3 shadow-soft">
                    <span className="w-16 text-sm font-semibold text-forest-600">{milestone.year}</span>
                    <span className="text-stone-700">{milestone.event}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative h-80 lg:h-[550px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                  alt="Ons verhaal"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full rounded-3xl bg-forest-100" />
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
            badge="Werkgebied"
          />
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {regions.map((region) => (
                <div key={region} className="flex items-center gap-3 bg-cream-50 rounded-xl px-4 py-3 border border-sand-100">
                  <MapPin className="h-4 w-4 text-forest-500 flex-shrink-0" />
                  <span className="text-stone-700">{region}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-stone-500 mt-8">
              Ligt uw gemeente er niet bij? Neem contact op—we kijken graag of we kunnen helpen.
            </p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-gradient-to-br from-cream-50 to-sand-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-terracotta-100/30 to-transparent rounded-full blur-3xl" />

        <div className="container-custom relative">
          <SectionHeader
            title="Onze partners"
            subtitle="We werken samen met betrouwbare lokale vakmensen en leveranciers."
            badge="Netwerk"
          />
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-stone-600 mb-10">
              Voor gespecialiseerde technieken en materialen werken we met vaste partners.
              Vakmensen die we kennen, vertrouwen en die dezelfde standaarden hanteren.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {partners.map((partner) => (
                <div key={partner.title} className="bg-white rounded-3xl p-8 shadow-soft border border-sand-100">
                  <h3 className="font-display font-semibold text-stone-900 mb-2">{partner.title}</h3>
                  <p className="text-sm text-stone-600">{partner.desc}</p>
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
