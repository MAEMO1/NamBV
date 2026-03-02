'use client';

import Image from 'next/image';
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { projectImages, siteImages } from '@/lib/images';

interface Project {
  id: string;
  title: string;
  slug?: string;
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
    title: 'Meulemanstraat 34',
    slug: 'meulemanstraat-34',
    category: 'Totaalrenovatie',
    location: 'Gavere',
    year: '2024',
    description: 'Volledige renovatie van een karaktervol herenhuis met behoud van authentieke elementen.',
    image: projectImages.meulemanstraat.main,
    featured: true
  },
  {
    id: '2',
    title: 'Renovatie Oostende',
    slug: 'renovatie-oostende',
    category: 'Renovatie',
    location: 'Oostende',
    year: '2024',
    description: 'Grondige renovatie met nieuwe indeling en moderne afwerking.',
    image: projectImages.oostende.main
  },
  {
    id: '3',
    title: 'Afwerking Parijs',
    slug: 'afwerking-parijs',
    category: 'Afwerking',
    location: 'Parijs',
    year: '2024',
    description: 'Complete afwerking met hoogwaardige materialen en stijlvol design.',
    image: projectImages.parijs.main
  },
  {
    id: '4',
    title: 'Reginald Warnefordstraat',
    slug: 'reginald-warnefordstraat',
    category: 'Totaalrenovatie',
    location: 'Gent',
    year: '2023',
    description: 'Totaalrenovatie van een stadswoning met focus op modern comfort.',
    image: projectImages.reginaldWarneford.main
  },
  {
    id: '5',
    title: 'Markt 6 Gavere',
    slug: 'markt-gavere',
    category: 'Ruwbouw',
    location: 'Gavere',
    year: '2023',
    description: 'Ruwbouwwerken voor een volledige heropbouw in het centrum.',
    image: projectImages.gavere.main
  },
  {
    id: '6',
    title: 'Visitatiestraat',
    slug: 'visitatiestraat',
    category: 'Totaalrenovatie',
    location: 'Gent',
    year: '2023',
    description: 'Volledige vernieuwing van een historisch pand met moderne technieken.',
    image: projectImages.visitatiestraat.main
  }
];


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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHeroLoaded(true);
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
          } else {
            setProjects(fallbackProjects);
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

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-noir-50 overflow-hidden">
        <div className="container-wide relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <span
              className={`inline-block px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-6 transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('badge')}
            </span>

            <h1
              className={`text-display-lg md:text-display-xl font-display font-bold text-noir-900 mb-6 transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              {t('title')}{' '}
              <span className="text-accent-600">{t('titleHighlight')}</span>
            </h1>

            <p
              className={`text-lg md:text-xl text-noir-500 leading-relaxed transition-all duration-700 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {loading ? (
            <div className="grid md:grid-cols-12 gap-6 lg:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={i === 1 || i === 4 ? 'md:col-span-7' : 'md:col-span-5'}>
                  <div className="aspect-[4/3] bg-noir-100 rounded-2xl animate-pulse" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-noir-500 text-lg">{t('noProjects')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-12 gap-6 lg:gap-8">
              {projects.map((project, index) => {
                const isLarge = index === 0 || index === 3;
                const gridSpan = isLarge ? 'md:col-span-7' : 'md:col-span-5';

                return (
                  <AnimatedSection
                    key={project.id}
                    delay={index * 100}
                    className={gridSpan}
                  >
                    <Link href={{ pathname: '/projecten/[slug]', params: { slug: project.slug || project.id } }} className="group block h-full">
                      <div className={`relative rounded-2xl overflow-hidden ${isLarge ? 'aspect-[4/3]' : 'aspect-square'}`}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-noir-950/20 to-transparent" />

                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                          <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
                            {project.title}
                          </h3>

                          <div className="flex items-center gap-3 text-white/60 text-sm mb-3">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5" />
                              {project.location}
                            </div>
                            <span className="text-white/30">|</span>
                            <span>{project.year}</span>
                          </div>

                          {/* CTA */}
                          <div className="flex items-center gap-2 text-accent-400 font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <span className="text-sm">{t('viewProject')}</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-noir-900 relative overflow-hidden">
        <div className="container-wide relative">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-lg font-display font-bold text-white mb-6">
                {t('ctaTitle')}
              </h2>
              <p className="text-lg md:text-xl text-noir-400 mb-10 leading-relaxed">
                {t('ctaDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/offerte"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-accent-600 text-white font-semibold rounded-full hover:bg-accent-500 transition-all duration-300"
                >
                  <span>{t('ctaPrimary')}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/afspraak"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-noir-700 text-white font-semibold rounded-full hover:bg-white hover:text-noir-900 hover:border-white transition-all duration-300"
                >
                  <span>{t('ctaSecondary')}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
