import Link from 'next/link';
import Image from 'next/image';
import { getV2PageSections, getV2Projects } from '@/lib/v2/public-data';
import { isV2Locale, type V2Locale } from '@/lib/v2/locale';

export const dynamic = 'force-dynamic';

function localizedPath(locale: V2Locale, path: string) {
  return `/v2/${locale}${path}`;
}

export default async function V2ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isV2Locale(locale)) {
    return null;
  }

  const [sections, projects] = await Promise.all([
    getV2PageSections('projects', locale),
    getV2Projects(locale),
  ]);
  const hero = (sections.find((section) => section.sectionKey === 'hero')?.dataJson ?? {}) as Record<string, unknown>;

  return (
    <section className="container-wide py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{String(hero.eyebrow ?? '')}</p>
        <h1 className="mt-4 text-display-lg font-display font-bold text-noir-900">{String(hero.title ?? '')}</h1>
        <p className="mt-4 text-lg leading-8 text-noir-600">{String(hero.description ?? '')}</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.slug} href={localizedPath(locale, `/projecten/${project.slug}`)} className="group overflow-hidden rounded-3xl border border-noir-200 bg-white shadow-soft">
            <div className="relative aspect-[4/3]">
              {project.coverImageUrl ? (
                <Image src={project.coverImageUrl} alt={project.translation.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
              ) : null}
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-accent-700">{project.category}</p>
              <h2 className="mt-2 text-xl font-display font-bold text-noir-900">{project.translation.title}</h2>
              <p className="mt-3 text-sm leading-6 text-noir-600">{project.translation.shortDescription ?? project.translation.description ?? ''}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
