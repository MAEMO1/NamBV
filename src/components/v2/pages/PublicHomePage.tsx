import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getV2PageSections, getV2Projects } from '@/lib/v2/public-data';
import { isV2Locale, getV2UiCopy } from '@/lib/v2/locale';
import { Link as IntlLink } from '@/i18n/routing';

function asData(section: { dataJson: unknown }) {
  return (section.dataJson ?? {}) as Record<string, unknown>;
}

export default async function PublicHomePage({
  locale,
}: {
  locale: string;
}) {
  if (!isV2Locale(locale)) {
    return null;
  }

  const [sections, projects] = await Promise.all([
    getV2PageSections('home', locale),
    getV2Projects(locale),
  ]);
  const copy = getV2UiCopy(locale);
  const hero = asData(sections.find((section) => section.sectionKey === 'hero') ?? { dataJson: {} });
  const services = asData(sections.find((section) => section.sectionKey === 'services') ?? { dataJson: {} });
  const cta = asData(sections.find((section) => section.sectionKey === 'cta') ?? { dataJson: {} });

  return (
    <>
      <section className="relative overflow-hidden bg-noir-950">
        <div className="absolute inset-0">
          {typeof hero.image === 'string' ? (
            <Image src={hero.image} alt="Nam Construction" fill className="object-cover opacity-40" priority />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-noir-950 via-noir-950/90 to-noir-950/70" />
        </div>

        <div className="container-wide relative grid gap-10 py-24 md:grid-cols-[1.3fr_0.7fr] md:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-300">{String(hero.eyebrow ?? '')}</p>
            <h1 className="mt-6 text-display-xl font-display font-bold text-white">{String(hero.title ?? '')}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{String(hero.description ?? '')}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <IntlLink
                href={String(hero.primaryCtaHref ?? '/offerte') as '/'}
                locale={locale}
                className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700"
              >
                <span>{String(hero.primaryCtaLabel ?? copy.common.getQuote)}</span>
                <ArrowUpRight className="h-4 w-4" />
              </IntlLink>
              <IntlLink
                href={String(hero.secondaryCtaHref ?? '/projecten') as '/'}
                locale={locale}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                {String(hero.secondaryCtaLabel ?? copy.nav.projects)}
              </IntlLink>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="text-sm font-medium text-white/80">{copy.common.trustedBy}</p>
            <p className="mt-4 text-4xl font-display font-bold text-white">NAM</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Canonieke routes, gesplitste publieke read/write endpoints en een veiligere adminbasis op server-side sessies.
            </p>
            <p className="mt-6 text-sm text-accent-200">{copy.common.leadTime}</p>
          </div>
        </div>
      </section>

      <section className="container-wide py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{String(services.eyebrow ?? '')}</p>
          <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{String(services.title ?? '')}</h2>
          <p className="mt-4 text-lg leading-8 text-noir-600">{String(services.description ?? '')}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {Array.isArray(services.items) ? services.items.map((item, index) => (
            <div key={index} className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft">
              <p className="text-lg font-semibold text-noir-900">{String((item as Record<string, unknown>).title ?? '')}</p>
              <p className="mt-3 text-sm leading-6 text-noir-600">{String((item as Record<string, unknown>).description ?? '')}</p>
            </div>
          )) : null}
        </div>
      </section>

      <section className="container-wide py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{copy.nav.projects}</p>
            <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">Recente referenties</h2>
          </div>
          <IntlLink href="/projecten" locale={locale} className="text-sm font-semibold text-accent-700 transition hover:text-accent-900">
            {copy.common.viewAllProjects}
          </IntlLink>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <IntlLink
              key={project.slug}
              href={{ pathname: '/projecten/[slug]', params: { slug: project.slug } }}
              locale={locale}
              className="group overflow-hidden rounded-3xl border border-noir-200 bg-white shadow-soft"
            >
              <div className="relative aspect-[4/3]">
                {project.coverImageUrl ? (
                  <Image src={project.coverImageUrl} alt={project.translation.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                ) : null}
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-accent-700">{project.category}</p>
                <h3 className="mt-2 text-xl font-display font-bold text-noir-900">{project.translation.title}</h3>
                <p className="mt-3 text-sm leading-6 text-noir-600">{project.translation.shortDescription ?? project.translation.description ?? ''}</p>
              </div>
            </IntlLink>
          ))}
        </div>
      </section>

      <section className="container-wide py-16">
        <div className="rounded-[2rem] bg-accent-600 px-8 py-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">{String(cta.title ?? '')}</p>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/85">{String(cta.description ?? '')}</p>
          <IntlLink
            href={String(cta.primaryCtaHref ?? '/afspraak') as '/'}
            locale={locale}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent-700 transition hover:bg-noir-100"
          >
            <span>{String(cta.primaryCtaLabel ?? copy.common.bookAppointment)}</span>
            <ArrowUpRight className="h-4 w-4" />
          </IntlLink>
        </div>
      </section>
    </>
  );
}
