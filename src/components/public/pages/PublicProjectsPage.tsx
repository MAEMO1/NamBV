import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { getV2PageSections, getV2Projects } from '@/lib/v2/public-data';
import { isV2Locale } from '@/lib/v2/locale';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/public/AnimatedSection';

export default async function PublicProjectsPage({
  locale,
}: {
  locale: string;
}) {
  if (!isV2Locale(locale)) {
    return null;
  }

  const sections = await getV2PageSections('projects', locale);
  const projects = await getV2Projects(locale);
  const hero = (sections.find((section) => section.sectionKey === 'hero')?.dataJson ?? {}) as Record<string, unknown>;

  return (
    <>
      {/* Hero section */}
      <section className="relative overflow-hidden bg-noir-950 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,74,71,0.4),transparent_50%),linear-gradient(135deg,rgba(8,13,12,1),rgba(8,13,12,0.85))]" />
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up" delay={0}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">{String(hero.eyebrow ?? '')}</p>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <h1 className="mt-4 text-display-lg font-display font-bold text-white">{String(hero.title ?? '')}</h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300}>
              <p className="mt-4 text-lg leading-8 text-white/70">{String(hero.description ?? '')}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects grid with overlay cards */}
      <section className="container-wide section-padding">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedSection key={project.slug} animation="fade-up" delay={index * 100}>
              <Link
                href={{ pathname: '/projecten/[slug]', params: { slug: project.slug } }}
                locale={locale}
                className="group block relative aspect-[4/3] overflow-hidden rounded-3xl"
              >
                {project.coverImageUrl ? (
                  <Image
                    src={project.coverImageUrl}
                    alt={project.translation.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-noir-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-noir-950/20 to-transparent" />
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                  <span className="inline-block self-start px-2.5 py-0.5 bg-accent-600/90 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
                    {project.category}
                  </span>
                  <h2 className="text-xl font-display font-bold text-white mb-1">
                    {project.translation.title}
                  </h2>
                  <div className="flex items-center gap-1.5 text-white/60 text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{project.location}</span>
                    <span className="text-white/30 mx-1">|</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}
