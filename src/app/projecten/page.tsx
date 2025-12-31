import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, ArrowRight, Calendar } from 'lucide-react';
import { SectionHeader, CTABanner } from '@/components';

export const metadata: Metadata = {
  title: 'Projecten',
  description: 'Bekijk onze renovatieprojecten in Gent en omstreken. Totaalrenovaties, badkamers, keukens en meer.',
};

const projects = [
  {
    id: 1,
    title: 'Herenhuis Gent-centrum',
    category: 'Totaalrenovatie',
    location: 'Gent',
    description: 'Volledige renovatie van een karaktervol herenhuis met behoud van authentieke elementen. Nieuwe technieken, isolatie en moderne afwerking.',
    highlights: ['Behoud originele elementen', 'Energetische upgrade', 'Moderne keuken & badkamers'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    featured: true
  },
  {
    id: 2,
    title: 'Rijwoning Mariakerke',
    category: 'Renovatie & Afwerking',
    location: 'Mariakerke',
    description: 'Grondige renovatie van een jaren 60 rijwoning. Nieuwe indeling, isolatie en complete afwerking met duurzame materialen.',
    highlights: ['Nieuwe indeling', 'Houtvezelisolatie', 'Natuurlijke afwerking'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    title: 'Appartement Ledeberg',
    category: 'Badkamerrenovatie',
    location: 'Ledeberg',
    description: 'Complete badkamerrenovatie met nieuwe sanitaire installatie, betegeling en slimme opbergruimte.',
    highlights: ['Ruimtelijke indeling', 'Kwaliteitstegelwerk', 'Moderne sanitair'],
    image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    title: 'Villa Sint-Martens-Latem',
    category: 'Totaalrenovatie',
    location: 'Sint-Martens-Latem',
    description: 'Luxueuze renovatie van een vrijstaande villa met focus op comfort, energieprestatie en afwerking.',
    highlights: ['Vloerverwarming', 'Hoogwaardige afwerking', 'Domotica-integratie'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
  },
  {
    id: 5,
    title: 'Koppelwoning Drongen',
    category: 'Keukenrenovatie',
    location: 'Drongen',
    description: 'Open keuken met kookeiland, volledig nieuwe elektriciteit en sfeervolle afwerking.',
    highlights: ['Open concept', 'Kookeiland', 'Geïntegreerde verlichting'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'
  },
  {
    id: 6,
    title: 'Stadswoning Muide',
    category: 'Renovatie & Technieken',
    location: 'Gent',
    description: 'Volledige vernieuwing van elektriciteit en sanitair in combinatie met moderne afwerking.',
    highlights: ['Nieuwe technieken', 'AREI-keuring', 'Strakke afwerking'],
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop'
  }
];

const categories = ['Alle', 'Totaalrenovatie', 'Renovatie & Afwerking', 'Badkamerrenovatie', 'Keukenrenovatie'];

const stats = [
  { value: '50+', label: 'Projecten voltooid' },
  { value: '10+', label: 'Jaar ervaring' },
  { value: '100%', label: 'Tevreden klanten' },
  { value: 'Gent', label: 'En omstreken' }
];

export default function ProjectenPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cream-50 via-sand-50 to-forest-50/20 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-forest-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-64 h-64 bg-terracotta-100/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-sand-200 text-sm font-medium text-stone-600 mb-6">
              <span className="w-2 h-2 rounded-full bg-forest-500" />
              Portfolio
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-stone-900 mb-6">
              Onze projecten
            </h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Bekijk een selectie van onze realisaties in Gent en omstreken. Elke renovatie
              is uniek, maar onze aanpak is steeds dezelfde: kwaliteit, duurzaamheid en vakmanschap.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white border-b border-sand-100 py-6 sticky top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === 0
                    ? 'bg-forest-600 text-white shadow-lg shadow-forest-600/25'
                    : 'bg-cream-50 text-stone-600 hover:bg-sand-100 border border-sand-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={`group relative bg-cream-50 rounded-3xl overflow-hidden border border-sand-100 hover:shadow-xl transition-all duration-500 ${
                  project.featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${project.featured ? 'h-80 md:h-full' : 'h-64'}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />

                  {/* Category tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-stone-700">
                      {project.category}
                    </span>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-4 py-1.5 bg-terracotta-500 text-white rounded-full text-sm font-medium">
                        Uitgelicht
                      </span>
                    </div>
                  )}

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                    {project.featured && (
                      <p className="text-white/80 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.slice(0, project.featured ? 3 : 2).map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-forest-900 to-forest-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-forest-800/50 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-terracotta-900/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-forest-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Uw project hier?"
        subtitle="Neem contact op voor een gratis adviesgesprek. We bespreken graag uw plannen."
      />
    </>
  );
}
