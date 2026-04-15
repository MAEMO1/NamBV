import { notFound } from 'next/navigation';
import PublicProjectDetailPage from '@/components/public/pages/PublicProjectDetailPage';
import { BreadcrumbListJsonLd, ProjectJsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbs, CRUMB_LABELS } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { getSiteUrl } from '@/lib/seo/site-url';
import { getPathname, routing, type Locale } from '@/i18n/routing';
import { getV2ProjectBySlug, getV2Projects } from '@/lib/v2/public-data';
import { isV2Locale } from '@/lib/v2/locale';

export const revalidate = 3600;

export async function generateStaticParams() {
  const locales = routing.locales;
  const results: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of locales) {
    if (!isV2Locale(locale)) continue;
    try {
      const projects = await getV2Projects(locale);
      for (const project of projects) {
        results.push({ locale, slug: project.slug });
      }
    } catch {
      // Skip locales that fail to load; fall back to on-demand rendering.
    }
  }
  return results;
}

type RouteParams = { locale: Locale; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, slug } = await params;
  const project = isV2Locale(locale) ? await getV2ProjectBySlug(slug, locale) : null;
  const translation = project?.translation;

  const fallback = {
    nl: 'Project | Nam Construction',
    fr: 'Projet | Nam Construction',
    en: 'Project | Nam Construction',
  } as const;

  const title = translation?.title ?? fallback[locale] ?? fallback.nl;
  const description =
    translation?.shortDescription ??
    translation?.description ??
    'Een gerealiseerd renovatieproject door Nam Construction in Gent.';

  return buildPageMetadata({
    href: { pathname: '/projecten/[slug]', params: { slug } },
    locale,
    titles: { nl: title, fr: title, en: title },
    descriptions: { nl: description, fr: description, en: description },
    image: project?.coverImageUrl
      ? { url: project.coverImageUrl, alt: title }
      : undefined,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, slug } = await params;
  const siteUrl = await getSiteUrl();
  const project = isV2Locale(locale) ? await getV2ProjectBySlug(slug, locale) : null;

  if (!project) {
    notFound();
  }

  const translation = project.translation;
  const href = { pathname: '/projecten/[slug]', params: { slug } } as const;
  const pageUrl = `${siteUrl}${getPathname({ href, locale })}`;

  const crumbs = buildBreadcrumbs({
    locale,
    siteUrl,
    crumbs: [
      { href: '/', label: CRUMB_LABELS.home },
      { href: '/projecten', label: CRUMB_LABELS.projects },
      {
        href,
        label: { nl: translation.title, fr: translation.title, en: translation.title },
      },
    ],
  });

  return (
    <>
      <BreadcrumbListJsonLd items={crumbs} />
      <ProjectJsonLd
        name={translation.title}
        description={translation.shortDescription ?? translation.description ?? undefined}
        url={pageUrl}
        image={project.coverImageUrl}
        datePublished={project.year}
        location={project.location}
        providerUrl={siteUrl}
      />
      <PublicProjectDetailPage locale={locale} slug={slug} />
    </>
  );
}
