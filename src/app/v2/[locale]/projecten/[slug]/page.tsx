import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getV2ProjectBySlug } from '@/lib/v2/public-data';
import { isV2Locale, type V2Locale } from '@/lib/v2/locale';

export const dynamic = 'force-dynamic';

function localizedPath(locale: V2Locale, path: string) {
  return `/v2/${locale}${path}`;
}

export default async function V2ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isV2Locale(locale)) {
    return null;
  }

  const project = await getV2ProjectBySlug(slug, locale);
  if (!project) {
    notFound();
  }

  const translation = project.translation;

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
          <Link href={localizedPath(locale, '/projecten')} className="text-sm font-semibold text-white/70 transition hover:text-white">
            ← Terug naar projecten
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">{project.category}</p>
          <h1 className="mt-4 max-w-3xl text-display-lg font-display font-bold text-white">{translation.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">{translation.shortDescription ?? translation.description ?? ''}</p>
        </div>
      </section>

      <section className="container-wide grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft">
          <dl className="grid gap-4 text-sm text-noir-700">
            <div className="flex justify-between gap-4">
              <dt>Locatie</dt>
              <dd className="font-medium text-noir-900">{project.location}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Jaar</dt>
              <dd className="font-medium text-noir-900">{project.year}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Type</dt>
              <dd className="font-medium text-noir-900">{translation.projectType ?? '-'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Duur</dt>
              <dd className="font-medium text-noir-900">{translation.duration ?? '-'}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Oppervlakte</dt>
              <dd className="font-medium text-noir-900">{translation.surface ?? '-'}</dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-8">
          {translation.description ? (
            <article className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-display font-bold text-noir-900">Context</h2>
              <p className="mt-4 leading-8 text-noir-600">{translation.description}</p>
            </article>
          ) : null}
          {translation.challengeText ? (
            <article className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-display font-bold text-noir-900">Uitdaging</h2>
              <p className="mt-4 leading-8 text-noir-600">{translation.challengeText}</p>
            </article>
          ) : null}
          {translation.approachText ? (
            <article className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-display font-bold text-noir-900">Aanpak</h2>
              <p className="mt-4 leading-8 text-noir-600">{translation.approachText}</p>
            </article>
          ) : null}
          {translation.resultText ? (
            <article className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-display font-bold text-noir-900">Resultaat</h2>
              <p className="mt-4 leading-8 text-noir-600">{translation.resultText}</p>
            </article>
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
