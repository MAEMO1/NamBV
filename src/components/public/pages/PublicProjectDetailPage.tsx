import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getV2ProjectBySlug } from '@/lib/v2/public-data';
import { isV2Locale } from '@/lib/v2/locale';
import { Link } from '@/i18n/routing';

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

  return (
    <>
      <section className="relative overflow-hidden bg-noir-950 py-20">
        <div className="absolute inset-0">
          {project.coverImageUrl ? (
            <Image src={project.coverImageUrl} alt={translation.title} fill className="object-cover opacity-35" />
          ) : null}
          <div className="absolute inset-0 bg-noir-950/75" />
        </div>
        <div className="container-wide relative">
          <Link href="/projecten" locale={locale} className="text-sm font-semibold text-white/70 transition hover:text-white">
            ← {copy.back}
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">{project.category}</p>
          <h1 className="mt-4 max-w-3xl text-display-lg font-display font-bold text-white">{translation.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">{translation.shortDescription ?? translation.description ?? ''}</p>
        </div>
      </section>

      <section className="container-wide grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft">
          <dl className="grid gap-4 text-sm text-noir-700">
            <MetadataRow label={copy.location} value={project.location} />
            <MetadataRow label={copy.year} value={project.year} />
            <MetadataRow label={copy.type} value={translation.projectType ?? '-'} />
            <MetadataRow label={copy.duration} value={translation.duration ?? '-'} />
            <MetadataRow label={copy.surface} value={translation.surface ?? '-'} />
          </dl>
        </div>

        <div className="grid gap-8">
          {translation.description ? (
            <ProjectTextCard title={copy.context} body={translation.description} />
          ) : null}
          {translation.challengeText ? (
            <ProjectTextCard title={copy.challenge} body={translation.challengeText} />
          ) : null}
          {translation.approachText ? (
            <ProjectTextCard title={copy.approach} body={translation.approachText} />
          ) : null}
          {translation.resultText ? (
            <ProjectTextCard title={copy.result} body={translation.resultText} />
          ) : null}
        </div>
      </section>

      <section className="container-wide pb-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {project.images.map((image, index) => (
            <div key={`${image.imageUrl}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-noir-200 bg-white shadow-soft">
              <Image src={image.imageUrl} alt={image.alt ?? translation.title} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function MetadataRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between gap-4">
      <dt>{label}</dt>
      <dd className="font-medium text-noir-900">{value}</dd>
    </div>
  );
}

function ProjectTextCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft">
      <h2 className="text-xl font-display font-bold text-noir-900">{title}</h2>
      <p className="mt-4 leading-8 text-noir-600">{body}</p>
    </article>
  );
}
