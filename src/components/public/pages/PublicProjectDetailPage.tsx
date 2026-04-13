import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getV2ProjectBySlug } from '@/lib/v2/public-data';
import { isV2Locale } from '@/lib/v2/locale';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/public/AnimatedSection';

const projectDetailCopy = {
  nl: {
    back: 'Terug naar projecten',
    location: 'Locatie',
    year: 'Jaar',
    type: 'Type',
    duration: 'Duur',
    surface: 'Oppervlakte',
    context: 'Context',
    challenge: 'Uitdaging',
    approach: 'Aanpak',
    result: 'Resultaat',
  },
  fr: {
    back: 'Retour aux projets',
    location: 'Lieu',
    year: 'Année',
    type: 'Type',
    duration: 'Durée',
    surface: 'Surface',
    context: 'Contexte',
    challenge: 'Défi',
    approach: 'Approche',
    result: 'Résultat',
  },
  en: {
    back: 'Back to projects',
    location: 'Location',
    year: 'Year',
    type: 'Type',
    duration: 'Duration',
    surface: 'Surface',
    context: 'Context',
    challenge: 'Challenge',
    approach: 'Approach',
    result: 'Result',
  },
} as const;

export default async function PublicProjectDetailPage({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  if (!isV2Locale(locale)) {
    return null;
  }

  const project = await getV2ProjectBySlug(slug, locale);
  if (!project) {
    notFound();
  }

  const translation = project.translation;
  const copy = projectDetailCopy[locale];

  const metadataItems = [
    { label: copy.location, value: project.location },
    { label: copy.year, value: project.year },
    { label: copy.type, value: translation.projectType ?? '-' },
    { label: copy.duration, value: translation.duration ?? '-' },
    { label: copy.surface, value: translation.surface ?? '-' },
  ];

  const textSections = [
    { title: copy.context, body: translation.description },
    { title: copy.challenge, body: translation.challengeText },
    { title: copy.approach, body: translation.approachText },
    { title: copy.result, body: translation.resultText },
  ].filter((s) => s.body);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-noir-950 min-h-[50vh] md:min-h-[60vh] flex items-end">
        <div className="absolute inset-0">
          {project.coverImageUrl ? (
            <Image src={project.coverImageUrl} alt={translation.title} fill className="object-cover opacity-35" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/60 to-noir-950/40" />
        </div>
        <div className="container-wide relative pb-16 pt-32">
          <AnimatedSection animation="fade-up" delay={0}>
            <Link href="/projecten" locale={locale} className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white mb-8">
              &larr; {copy.back}
            </Link>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={150}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">{project.category}</p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={300}>
            <h1 className="mt-4 max-w-3xl text-display-lg font-display font-bold text-white">{translation.title}</h1>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={450}>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">{translation.shortDescription ?? translation.description ?? ''}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Metadata bar + text sections */}
      <section className="container-wide section-padding">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Metadata card */}
          <AnimatedSection animation="fade-up">
            <div className="rounded-3xl border-t-4 border-t-accent-600 border border-noir-200 bg-white p-6 shadow-soft">
              <dl className="grid gap-4 text-sm text-noir-700">
                {metadataItems.map((item) => (
                  <div key={item.label} className="flex justify-between gap-4 py-2 border-b border-noir-100 last:border-b-0">
                    <dt className="text-noir-500">{item.label}</dt>
                    <dd className="font-medium text-noir-900 text-right">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </AnimatedSection>

          {/* Text sections */}
          <div className="grid gap-8">
            {textSections.map((section, index) => (
              <AnimatedSection key={section.title} animation="fade-up" delay={index * 100}>
                <article className="rounded-3xl border-l-4 border-l-accent-600 border border-noir-200 bg-white p-6 shadow-soft">
                  <h2 className="text-xl font-display font-bold text-noir-900">{section.title}</h2>
                  <p className="mt-4 leading-8 text-noir-600">{section.body}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Image gallery */}
      {project.images.length > 0 && (
        <section className="container-wide pb-16 md:pb-24">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {project.images.map((image, index) => (
              <AnimatedSection key={`${image.imageUrl}-${index}`} animation="fade-up" delay={index * 80}>
                <div className={`relative overflow-hidden rounded-3xl border border-noir-200 bg-white shadow-soft group ${
                  index === 0 ? 'md:col-span-2 aspect-cinema' : 'aspect-[4/3]'
                }`}>
                  <Image
                    src={image.imageUrl}
                    alt={image.alt ?? translation.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-noir-950/0 group-hover:bg-noir-950/10 transition-colors duration-300" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
