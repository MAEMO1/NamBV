'use client';

import Image from 'next/image';
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  featured?: boolean;
}

// Fallback projects for when database is empty
const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Herenhuis Gent-centrum',
    category: 'Totaalrenovatie',
    location: 'Gent',
    year: '2024',
    description: 'Volledige renovatie van een karaktervol herenhuis met behoud van authentieke elementen.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
    featured: true
  },
  {
    id: '2',
    title: 'Rijwoning Mariakerke',
    category: 'Renovatie & Afwerking',
    location: 'Mariakerke',
    year: '2024',
    description: 'Grondige renovatie van een jaren 60 rijwoning met nieuwe indeling.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    title: 'Appartement Ledeberg',
    category: 'Badkamerrenovatie',
    location: 'Ledeberg',
    year: '2024',
    description: 'Complete badkamerrenovatie met moderne sanitaire installatie.',
    image: 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=800&h=600&fit=crop'
  },
  {
    id: '4',
    title: 'Villa Sint-Martens-Latem',
    category: 'Totaalrenovatie',
    location: 'Sint-Martens-Latem',
    year: '2023',
    description: 'Luxueuze renovatie van een vrijstaande villa met focus op comfort.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
  },
  {
    id: '5',
    title: 'Koppelwoning Drongen',
    category: 'Keukenrenovatie',
    location: 'Drongen',
    year: '2023',
    description: 'Open keuken met kookeiland en sfeervolle afwerking.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'
  },
  {
    id: '6',
    title: 'Stadswoning Muide',
    category: 'Renovatie & Technieken',
    location: 'Gent',
    year: '2023',
    description: 'Volledige vernieuwing van elektriciteit en sanitair.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop'
  }
];

const fallbackCategories = ['Alle', 'Totaalrenovatie', 'Renovatie & Afwerking', 'Badkamerrenovatie', 'Keukenrenovatie'];

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function ProjectenPage() {
  const t = useTranslations('projectsPage');
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [scrollY, setScrollY] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(fallbackCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHeroLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch projects from API
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          // Use fetched projects if available, otherwise use fallback
          if (data.projects && data.projects.length > 0) {
            setProjects(data.projects);
            setCategories(data.categories || fallbackCategories);
          } else {
            setProjects(fallbackProjects);
            setCategories(fallbackCategories);
          }
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'Alle' || activeCategory === t('filterAll')
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Hero Section - Dark cinematic style */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 scale-110"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1200&fit=crop"
            alt={t('titleHighlight')}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-noir-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/50 to-transparent" />

        {/* Content */}
        <div className="container-wide relative z-10 pb-20 pt-40">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-12 h-px bg-accent-400" />
              <span className="text-sm font-medium text-accent-400 uppercase tracking-[0.2em]">
                {t('badge')}
              </span>
            </div>

            <h1
              className={`text-display-lg md:text-display-xl font-display font-medium text-white mb-6 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t('title')}{' '}
              <span className="text-accent-400 italic">{t('titleHighlight')}</span>
            </h1>

            <p
              className={`text-xl text-white/70 leading-relaxed transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-noir-900 border-b border-white/10 py-6 sticky top-20 z-30">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-accent-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category === 'Alle' ? t('filterAll') : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="container-wide">
          {loading ? (
            <div className="grid md:grid-cols-12 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={i === 1 || i === 4 ? 'md:col-span-7' : 'md:col-span-5'}>
                  <div className="aspect-[4/3] bg-noir-100 animate-pulse" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-noir-500 text-lg">{t('noProjects')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-12 gap-8">
              {filteredProjects.map((project, index) => {
                const isLarge = index === 0 || index === 3;
                const gridSpan = isLarge ? 'md:col-span-7' : 'md:col-span-5';

                return (
                  <AnimatedSection
                    key={project.id}
                    delay={index * 100}
                    className={gridSpan}
                  >
                    <article className="group relative h-full">
                      <div className={`relative overflow-hidden ${isLarge ? 'aspect-[4/3]' : 'aspect-square'}`}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                        {/* Category tag */}
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-accent-500 text-white text-xs font-medium uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>

                        {/* Hover border */}
                        <div className="absolute inset-4 border-2 border-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-3 group-hover:-translate-y-2 transition-transform duration-500">
                            {project.title}
                          </h3>

                          <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {project.location}
                            </div>
                            <span>|</span>
                            <span>{project.year}</span>
                          </div>

                          {/* Description - visible on hover */}
                          <p className="text-white/70 text-sm mb-4 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                            {project.description}
                          </p>

                          {/* CTA */}
                          <div className="flex items-center gap-2 text-accent-400 font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <span className="text-sm uppercase tracking-wider">{t('viewProject')}</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-accent-500 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />

        <div className="container-wide relative">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-lg font-display font-medium text-white mb-6">
                {t('ctaTitle')}
              </h2>
              <p className="text-xl text-white/80 mb-10">
                {t('ctaDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/offerte"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-accent-700 font-medium overflow-hidden transition-all duration-500 hover:shadow-xl"
                >
                  <span className="absolute inset-0 bg-noir-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                    {t('ctaPrimary')}
                  </span>
                  <ArrowUpRight className="relative z-10 h-5 w-5 group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="/afspraak"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                  <span className="uppercase tracking-wider text-sm">{t('ctaSecondary')}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
