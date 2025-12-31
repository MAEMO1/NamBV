import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, ArrowRight } from 'lucide-react';
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
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 2,
    title: 'Rijwoning Mariakerke',
    category: 'Renovatie & Afwerking',
    location: 'Mariakerke',
    description: 'Grondige renovatie van een jaren 60 rijwoning. Nieuwe indeling, isolatie en complete afwerking met duurzame materialen.',
    highlights: ['Nieuwe indeling', 'Houtvezelisolatie', 'Natuurlijke afwerking'],
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    images: []
  },
  {
    id: 3,
    title: 'Appartement Ledeberg',
    category: 'Badkamerrenovatie',
    location: 'Ledeberg',
    description: 'Complete badkamerrenovatie met nieuwe sanitaire installatie, betegeling en slimme opbergruimte.',
    highlights: ['Ruimtelijke indeling', 'Kwaliteitstegelwerk', 'Moderne sanitair'],
    image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=800&h=600&fit=crop',
    images: []
  },
  {
    id: 4,
    title: 'Villa Sint-Martens-Latem',
    category: 'Totaalrenovatie',
    location: 'Sint-Martens-Latem',
    description: 'Luxueuze renovatie van een vrijstaande villa met focus op comfort, energieprestatie en afwerking.',
    highlights: ['Vloerverwarming', 'Hoogwaardige afwerking', 'Domotica-integratie'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    images: []
  },
  {
    id: 5,
    title: 'Koppelwoning Drongen',
    category: 'Keukenrenovatie',
    location: 'Drongen',
    description: 'Open keuken met kookeiland, volledig nieuwe elektriciteit en sfeervolle afwerking.',
    highlights: ['Open concept', 'Kookeiland', 'Geïntegreerde verlichting'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    images: []
  },
  {
    id: 6,
    title: 'Stadswoning Muide',
    category: 'Renovatie & Technieken',
    location: 'Gent',
    description: 'Volledige vernieuwing van elektriciteit en sanitair in combinatie met moderne afwerking.',
    highlights: ['Nieuwe technieken', 'AREI-keuring', 'Strakke afwerking'],
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop',
    images: []
  }
];

const categories = ['Alle', 'Totaalrenovatie', 'Renovatie & Afwerking', 'Badkamerrenovatie', 'Keukenrenovatie'];

export default function ProjectenPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-neutral-50 to-primary-50/30 py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Onze projecten
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Bekijk een selectie van onze realisaties in Gent en omstreken. Elke renovatie
              is uniek, maar onze aanpak is steeds dezelfde: kwaliteit, duurzaamheid en vakmanschap.
            </p>
          </div>
        </div>
      </section>

      {/* Filter (static for now) */}
      <section className="bg-white border-b border-neutral-100 py-6">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
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
            {projects.map((project) => (
              <article key={project.id} className="card group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-700">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-neutral-500 text-sm mb-4">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </div>
                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.highlights.slice(0, 2).map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2 py-1 bg-neutral-100 rounded text-xs text-neutral-600"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50+', label: 'Projecten voltooid' },
              { value: '10+', label: 'Jaar ervaring' },
              { value: '100%', label: 'Tevreden klanten' },
              { value: 'Gent', label: 'En omstreken' }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-display font-bold text-primary-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-neutral-600">{stat.label}</p>
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
