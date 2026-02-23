'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler, Clock, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { realProjects } from '@/lib/projects-data';

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
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

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations('projectDetail');

  const [heroLoaded, setHeroLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setHeroLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find the project by slug
  const projectIndex = realProjects.findIndex((p) => p.slug === slug);
  const project = projectIndex !== -1 ? realProjects[projectIndex] : null;

  // Find next project (wrap around)
  const nextProject = project
    ? realProjects[(projectIndex + 1) % realProjects.length]
    : null;

  // Collect all images
  const allImages = project
    ? [
        ...(project.images.before || []),
        ...(project.images.after || []),
        ...((project.images as { photos?: string[] }).photos || []),
      ]
    : [];

  const hasBefore = project && project.images.before && project.images.before.length > 0;
  const hasAfter = project && project.images.after && project.images.after.length > 0;
  const beforeImages = project?.images.before || [];
  const afterImages = project?.images.after || [];

  // 404-style message if project not found
  if (!project) {
    return (
      <section className="min-h-screen bg-noir-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-lg font-display font-medium text-white mb-6">
            Project niet gevonden
          </h1>
          <p className="text-ivory-300 text-lg mb-10">
            Het project dat u zoekt bestaat niet of is verplaatst.
          </p>
          <Link
            href="/projecten"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent-400 text-noir-900 font-medium hover:bg-accent-300 transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="uppercase tracking-wider text-sm">{t('backToProjects')}</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ============================================ */}
      {/* Section 1: Hero */}
      {/* ============================================ */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        {/* Background image with parallax */}
        <div
          className="absolute inset-0 scale-110"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.15}px)` }}
        >
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-noir-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/40 to-transparent" />

        {/* Content */}
        <div className="container-wide relative z-10 pb-20 pt-40">
          {/* Back link */}
          <Link
            href="/projecten"
            className={`inline-flex items-center gap-2 text-white/60 hover:text-accent-400 transition-colors duration-300 mb-8 text-sm uppercase tracking-wider font-medium ${
              heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-1000`}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToProjects')}
          </Link>

          <div className="max-w-3xl">
            {/* Category badge */}
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="w-12 h-px bg-accent-400" />
              <span className="text-sm font-medium text-accent-400 uppercase tracking-[0.2em]">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className={`text-display-lg md:text-display-xl font-display font-medium text-white mb-6 transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {project.title}
            </h1>

            {/* Location */}
            <div
              className={`flex items-center gap-2 text-white/70 text-lg transition-all duration-1000 ${
                heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <MapPin className="h-5 w-5 text-accent-400" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Section 2: Project Info Sidebar + Content */}
      {/* ============================================ */}
      <section className="py-20 md:py-28 bg-noir-950">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Content - Left Column */}
            <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
              {/* Short description */}
              <AnimatedSection>
                <p className="text-xl md:text-2xl text-ivory-300 leading-relaxed mb-16 font-light">
                  {project.shortDescription}
                </p>
              </AnimatedSection>

              {/* ============================================ */}
              {/* Section 3: "De Uitdaging" */}
              {/* ============================================ */}
              <AnimatedSection className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-px bg-accent-400" />
                  <h2 className="text-sm font-medium text-accent-400 uppercase tracking-[0.2em]">
                    {t('challengeTitle')}
                  </h2>
                </div>
                <p className="text-ivory-300 text-lg leading-relaxed">
                  {project.challengeText}
                </p>
              </AnimatedSection>

              {/* ============================================ */}
              {/* Section 4: Before/After Gallery */}
              {/* ============================================ */}
              {hasBefore && hasAfter && (
                <AnimatedSection className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-px bg-accent-400" />
                    <h2 className="text-sm font-medium text-accent-400 uppercase tracking-[0.2em]">
                      {t('before')} / {t('after')}
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Before images */}
                    {beforeImages.map((img, idx) => (
                      <div key={`before-${idx}`} className="relative group">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={img}
                            alt={`${project.title} - ${t('before')} ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-noir-950/60 to-transparent" />
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1.5 bg-noir-900/90 text-ivory-100 text-xs font-medium uppercase tracking-wider">
                            {t('before')}
                          </span>
                        </div>
                      </div>
                    ))}
                    {/* After images */}
                    {afterImages.map((img, idx) => (
                      <div key={`after-${idx}`} className="relative group">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={img}
                            alt={`${project.title} - ${t('after')} ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-noir-950/60 to-transparent" />
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1.5 bg-accent-500/90 text-white text-xs font-medium uppercase tracking-wider">
                            {t('after')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* ============================================ */}
              {/* Section 5: "Onze Aanpak" */}
              {/* ============================================ */}
              <AnimatedSection className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-px bg-accent-400" />
                  <h2 className="text-sm font-medium text-accent-400 uppercase tracking-[0.2em]">
                    {t('approachTitle')}
                  </h2>
                </div>
                <p className="text-ivory-300 text-lg leading-relaxed">
                  {project.approachText}
                </p>
              </AnimatedSection>

              {/* ============================================ */}
              {/* Section 6: Photo Gallery */}
              {/* ============================================ */}
              {allImages.length > 0 && (
                <AnimatedSection className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-px bg-accent-400" />
                    <h2 className="text-sm font-medium text-accent-400 uppercase tracking-[0.2em]">
                      {t('gallery')}
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allImages.map((img, idx) => (
                      <div
                        key={`gallery-${idx}`}
                        className="relative group overflow-hidden"
                      >
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={img}
                            alt={`${project.title} - ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-noir-950/0 group-hover:bg-noir-950/20 transition-colors duration-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* ============================================ */}
              {/* Section 7: "Het Resultaat" */}
              {/* ============================================ */}
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-px bg-accent-400" />
                  <h2 className="text-sm font-medium text-accent-400 uppercase tracking-[0.2em]">
                    {t('resultTitle')}
                  </h2>
                </div>
                <p className="text-ivory-300 text-lg leading-relaxed">
                  {project.resultText}
                </p>
              </AnimatedSection>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
              <div className="lg:sticky lg:top-28">
                <AnimatedSection delay={200}>
                  <div className="bg-noir-900 border border-white/10 p-8">
                    <h3 className="text-lg font-display font-medium text-white mb-6">
                      {t('projectInfo')}
                    </h3>

                    <div className="space-y-5">
                      {/* Location */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent-400/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-accent-400" />
                        </div>
                        <div>
                          <p className="text-xs text-ivory-300/60 uppercase tracking-wider mb-0.5">
                            {t('location')}
                          </p>
                          <p className="text-ivory-100 font-medium">{project.location}</p>
                        </div>
                      </div>

                      {/* Year */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent-400/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-5 w-5 text-accent-400" />
                        </div>
                        <div>
                          <p className="text-xs text-ivory-300/60 uppercase tracking-wider mb-0.5">
                            {t('year')}
                          </p>
                          <p className="text-ivory-100 font-medium">{project.year}</p>
                        </div>
                      </div>

                      {/* Type */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent-400/10 flex items-center justify-center flex-shrink-0">
                          <ChevronRight className="h-5 w-5 text-accent-400" />
                        </div>
                        <div>
                          <p className="text-xs text-ivory-300/60 uppercase tracking-wider mb-0.5">
                            {t('type')}
                          </p>
                          <p className="text-ivory-100 font-medium">{project.projectType}</p>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent-400/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-accent-400" />
                        </div>
                        <div>
                          <p className="text-xs text-ivory-300/60 uppercase tracking-wider mb-0.5">
                            {t('duration')}
                          </p>
                          <p className="text-ivory-100 font-medium">{project.duration}</p>
                        </div>
                      </div>

                      {/* Surface */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-accent-400/10 flex items-center justify-center flex-shrink-0">
                          <Ruler className="h-5 w-5 text-accent-400" />
                        </div>
                        <div>
                          <p className="text-xs text-ivory-300/60 uppercase tracking-wider mb-0.5">
                            {t('surface')}
                          </p>
                          <p className="text-ivory-100 font-medium">{project.surface}</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA in sidebar */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <Link
                        href="/offerte"
                        className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-accent-400 text-noir-900 font-medium hover:bg-accent-300 transition-colors duration-300"
                      >
                        <span className="uppercase tracking-wider text-sm">
                          {t('ctaTitle').split('?')[0]}?
                        </span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* Section 8: Next Project Navigation */}
      {/* ============================================ */}
      {nextProject && (
        <section className="bg-noir-900 border-t border-white/10">
          <Link
            href={{
              pathname: '/projecten/[slug]',
              params: { slug: nextProject.slug },
            }}
            className="group block"
          >
            <div className="container-wide py-16 md:py-20">
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7">
                  <p className="text-sm text-accent-400 uppercase tracking-[0.2em] mb-4">
                    {t('nextProject')}
                  </p>
                  <h2 className="text-display-md md:text-display-lg font-display font-medium text-white mb-4 group-hover:text-accent-400 transition-colors duration-500">
                    {nextProject.title}
                  </h2>
                  <div className="flex items-center gap-3 text-ivory-300/60">
                    <span className="text-sm uppercase tracking-wider">
                      {nextProject.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-ivory-300/40" />
                    <span className="text-sm">{nextProject.location}</span>
                  </div>
                </div>
                <div className="md:col-span-5">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={nextProject.mainImage}
                      alt={nextProject.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-noir-950/30 group-hover:bg-noir-950/10 transition-colors duration-500" />

                    {/* Arrow indicator */}
                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-accent-400 flex items-center justify-center group-hover:bg-accent-300 transition-colors duration-300">
                      <ArrowRight className="h-5 w-5 text-noir-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ============================================ */}
      {/* Section 9: CTA */}
      {/* ============================================ */}
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
                    Offerte aanvragen
                  </span>
                  <ArrowRight className="relative z-10 h-5 w-5 group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="/afspraak"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                  <span className="uppercase tracking-wider text-sm">{t('backToProjects')}</span>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
