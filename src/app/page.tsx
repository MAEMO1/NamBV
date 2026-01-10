import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';

// Services data
const services = [
  {
    title: 'Totaalrenovatie',
    description: 'Volledige transformatie van uw woning. Van concept tot oplevering onder één dak.',
    href: '/diensten/totaalrenovatie',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  },
  {
    title: 'Renovatie',
    description: 'Gerichte verbouwingen en renovaties. Badkamer, keuken of uitbreiding.',
    href: '/diensten/renovatie',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
  },
  {
    title: 'Afwerking',
    description: 'Tegelwerk, plakwerk en schilderwerk. Vakkundige afwerking die het verschil maakt.',
    href: '/diensten/afwerking',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  },
  {
    title: 'Technieken',
    description: 'Elektriciteit en sanitair door erkende vakmensen. Veilig en conform alle normen.',
    href: '/diensten/technieken',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop',
  },
];

// Featured projects
const projects = [
  {
    title: 'Herenhuis Centrum',
    category: 'Totaalrenovatie',
    location: 'Gent',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
    featured: true,
  },
  {
    title: 'Rijwoning Mariakerke',
    category: 'Renovatie & Afwerking',
    location: 'Mariakerke',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
  },
  {
    title: 'Appartement Zuid',
    category: 'Badkamerrenovatie',
    location: 'Ledeberg',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=800&h=600&fit=crop',
  },
];

// Value propositions
const values = [
  { number: '01', title: 'Vakmanschap', description: 'Ervaren vakmensen met oog voor detail' },
  { number: '02', title: 'Transparantie', description: 'Heldere communicatie en eerlijke prijzen' },
  { number: '03', title: 'Betrouwbaar', description: 'Afspraken nakomen, deadlines halen' },
  { number: '04', title: 'Kwaliteit', description: 'Hoogwaardige materialen en afwerking' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Full viewport, dramatic statement */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
            alt="Gerenoveerd interieur"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-noir-950/90 via-noir-950/70 to-noir-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950/50 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="container-wide relative z-10">
          <div className="max-w-4xl">
            {/* Tagline */}
            <div className="flex items-center gap-4 mb-8 animate-fade-up">
              <div className="w-12 h-px bg-accent-500" />
              <span className="text-sm font-medium text-accent-500 uppercase tracking-[0.2em]">
                Renovatie in Gent
              </span>
            </div>

            {/* Main Statement - Ghelamco style */}
            <h1 className="text-hero font-display text-white mb-8 animate-fade-up animation-delay-200">
              WIJ BOUWEN<br />
              <span className="text-accent-400">UW TOEKOMST</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed font-light animate-fade-up animation-delay-300">
              Vakkundige renovatie met oog voor detail en respect voor uw woning.
              Van totaalrenovatie tot afwerking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-400">
              <Link
                href="/offerte"
                className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-noir-900 font-medium uppercase tracking-wide hover:bg-accent-500 hover:text-white transition-all duration-500"
              >
                Offerte aanvragen
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/projecten"
                className="group inline-flex items-center justify-center gap-3 px-8 py-5 border border-white/30 text-white font-medium uppercase tracking-wide hover:bg-white hover:text-noir-900 transition-all duration-500"
              >
                Bekijk projecten
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/50" />
        </div>
      </section>

      {/* Value Propositions - Clean, minimal */}
      <section className="py-20 md:py-28 bg-white border-b border-noir-100">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {values.map((value, index) => (
              <div key={value.number} className="group">
                <span className="text-sm text-accent-500 font-medium mb-3 block">
                  {value.number}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-medium text-noir-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-noir-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-ivory-200">
        <div className="container-wide">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <span className="text-sm text-accent-500 font-medium uppercase tracking-[0.2em] mb-4 block">
                Diensten
              </span>
              <h2 className="text-display-lg font-display font-medium text-noir-900">
                Wat wij doen
              </h2>
            </div>
            <Link
              href="/diensten"
              className="group inline-flex items-center gap-2 text-noir-600 hover:text-noir-900 font-medium transition-colors duration-300"
            >
              Alle diensten bekijken
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative overflow-hidden bg-white"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-noir-900/30 group-hover:bg-noir-900/50 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-display font-medium text-noir-900 mb-2 group-hover:text-accent-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-noir-500 mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-noir-400 group-hover:text-accent-500 transition-colors duration-300">
                    Meer info
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Portfolio focus */}
      <section className="section-padding bg-noir-900">
        <div className="container-wide">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <span className="text-sm text-accent-500 font-medium uppercase tracking-[0.2em] mb-4 block">
                Portfolio
              </span>
              <h2 className="text-display-lg font-display font-medium text-white">
                Recente projecten
              </h2>
            </div>
            <Link
              href="/projecten"
              className="group inline-flex items-center gap-2 text-white/60 hover:text-white font-medium transition-colors duration-300"
            >
              Alle projecten bekijken
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.title}
                href="/projecten"
                className={`group relative overflow-hidden ${
                  project.featured ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${
                  project.featured ? 'aspect-[16/10] lg:aspect-auto lg:h-full' : 'aspect-[4/3]'
                }`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-900/80 via-noir-900/20 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-xs text-accent-400 font-medium uppercase tracking-wider mb-2">
                    {project.category}
                  </span>
                  <h3 className={`font-display font-medium text-white mb-2 ${
                    project.featured ? 'text-3xl md:text-4xl' : 'text-2xl'
                  }`}>
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean, impactful */}
      <section className="py-32 md:py-40 bg-white relative overflow-hidden">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-xl font-display font-medium text-noir-900 mb-6">
              Klaar om te beginnen?
            </h2>
            <p className="text-xl text-noir-500 mb-12 max-w-xl mx-auto">
              Neem contact op voor een vrijblijvend adviesgesprek.
              Wij denken graag met u mee over uw renovatieproject.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/offerte"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-noir-900 text-white font-medium uppercase tracking-wide hover:bg-accent-500 transition-all duration-500"
              >
                Offerte aanvragen
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/afspraak"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 border border-noir-300 text-noir-900 font-medium uppercase tracking-wide hover:bg-noir-900 hover:text-white hover:border-noir-900 transition-all duration-500"
              >
                Plan afspraak
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
