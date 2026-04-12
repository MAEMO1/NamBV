import type { ReactNode } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { getV2PageSections, getV2SettingsMap } from '@/lib/v2/public-data';
import { getV2UiCopy, isV2Locale, type V2Locale } from '@/lib/v2/locale';
import { Link as IntlLink } from '@/i18n/routing';

type PageSection = {
  sectionKey: string;
  schemaKey: string;
  dataJson: unknown;
};

function asData(section: PageSection | undefined) {
  return (section?.dataJson ?? {}) as Record<string, unknown>;
}

function asItems(value: unknown) {
  return Array.isArray(value) ? value as Array<Record<string, unknown>> : [];
}

export default async function PublicContentPage({
  locale,
  pageKey,
}: {
  locale: string;
  pageKey: string;
}) {
  if (!isV2Locale(locale)) {
    return null;
  }

  const [sections, settings] = await Promise.all([
    getV2PageSections(pageKey, locale),
    getV2SettingsMap(),
  ]);

  const hero = asData(sections.find((section) => section.sectionKey === 'hero'));
  const company = (settings.company as Record<string, unknown> | undefined) ?? {};
  const copy = getV2UiCopy(locale);

  return (
    <>
      <HeroSection locale={locale} data={hero} />

      {sections
        .filter((section) => section.sectionKey !== 'hero')
        .map((section, index) => (
          <SectionRenderer
            key={`${pageKey}-${section.sectionKey}-${index}`}
            locale={locale}
            schemaKey={section.schemaKey}
            data={asData(section)}
            company={company}
            fallbackQuoteLabel={copy.common.getQuote}
          />
        ))}
    </>
  );
}

function HeroSection({
  locale,
  data,
}: {
  locale: V2Locale;
  data: Record<string, unknown>;
}) {
  return (
    <section className="relative overflow-hidden bg-noir-950 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,122,59,0.28),transparent_35%),linear-gradient(135deg,rgba(8,13,12,1),rgba(8,13,12,0.85))]" />
      <div className="container-wide relative">
        <div className="max-w-3xl">
          {typeof data.eyebrow === 'string' ? (
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-300">{data.eyebrow}</p>
          ) : null}
          <h1 className="mt-5 text-display-lg font-display font-bold text-white">{String(data.title ?? '')}</h1>
          {typeof data.description === 'string' ? (
            <p className="mt-5 text-lg leading-8 text-white/72">{data.description}</p>
          ) : null}
          {data.primaryCtaHref || data.secondaryCtaHref ? (
            <div className="mt-10 flex flex-wrap gap-4">
              {typeof data.primaryCtaHref === 'string' ? (
                <IntlLink
                  href={data.primaryCtaHref as '/'}
                  locale={locale}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700"
                >
                  <span>{String(data.primaryCtaLabel ?? '')}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </IntlLink>
              ) : null}
              {typeof data.secondaryCtaHref === 'string' ? (
                <IntlLink
                  href={data.secondaryCtaHref as '/'}
                  locale={locale}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  {String(data.secondaryCtaLabel ?? '')}
                </IntlLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SectionRenderer({
  locale,
  schemaKey,
  data,
  company,
  fallbackQuoteLabel,
}: {
  locale: V2Locale;
  schemaKey: string;
  data: Record<string, unknown>;
  company: Record<string, unknown>;
  fallbackQuoteLabel: string;
}) {
  switch (schemaKey) {
    case 'feature-list':
      return <FeatureListSection locale={locale} data={data} />;
    case 'content':
      return <ContentSection data={data} />;
    case 'contact':
      return <ContactSection locale={locale} data={data} company={company} fallbackQuoteLabel={fallbackQuoteLabel} />;
    case 'cta':
      return <CtaSection locale={locale} data={data} />;
    case 'legal':
      return <LegalSection data={data} />;
    default:
      return null;
  }
}

function FeatureListSection({
  locale,
  data,
}: {
  locale: V2Locale;
  data: Record<string, unknown>;
}) {
  const items = asItems(data.items);

  return (
    <section className="container-wide py-16">
      <SectionHeading data={data} />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <div key={`${String(item.title ?? 'item')}-${index}`} className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-display font-bold text-noir-900">{String(item.title ?? '')}</h2>
            <p className="mt-3 text-sm leading-7 text-noir-600">{String(item.description ?? '')}</p>
            {typeof item.href === 'string' ? (
              <IntlLink
                href={item.href as '/'}
                locale={locale}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-700 transition hover:text-accent-900"
              >
                <span>{String(item.ctaLabel ?? 'Meer lezen')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </IntlLink>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function ContentSection({ data }: { data: Record<string, unknown> }) {
  const paragraphs = Array.isArray(data.paragraphs) ? data.paragraphs : [];
  const items = asItems(data.items);

  return (
    <section className="container-wide py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading data={data} />
        </div>
        <div className="grid gap-6">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-8 text-noir-600">
              {String(paragraph)}
            </p>
          ))}

          {items.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((item, index) => (
                <div key={`${String(item.title ?? 'detail')}-${index}`} className="rounded-3xl border border-noir-200 bg-noir-50 p-5">
                  <h3 className="text-base font-semibold text-noir-900">{String(item.title ?? '')}</h3>
                  <p className="mt-2 text-sm leading-6 text-noir-600">{String(item.description ?? '')}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ContactSection({
  locale,
  data,
  company,
  fallbackQuoteLabel,
}: {
  locale: V2Locale;
  data: Record<string, unknown>;
  company: Record<string, unknown>;
  fallbackQuoteLabel: string;
}) {
  const highlights = Array.isArray(data.highlights) ? data.highlights : [];
  const contactItems = [
    {
      icon: Phone,
      label: 'Phone',
      value: String(company.phone ?? ''),
      href: `tel:${String(company.phone ?? '').replace(/\s+/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: String(company.email ?? ''),
      href: `mailto:${String(company.email ?? '')}`,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: String(company.address ?? ''),
      href: undefined,
    },
  ].filter((item) => item.value);

  return (
    <section className="container-wide py-16">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading data={data} />
          {highlights.length > 0 ? (
            <ul className="mt-8 grid gap-3">
              {highlights.map((highlight, index) => (
                <li key={index} className="rounded-2xl border border-noir-200 bg-noir-50 px-4 py-3 text-sm text-noir-700">
                  {String(highlight)}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="rounded-[2rem] border border-noir-200 bg-white p-8 shadow-soft-lg">
          <div className="grid gap-4">
            {contactItems.map((item) => {
              const content: ReactNode = item.href ? (
                <a href={item.href} className="text-sm leading-6 text-noir-700 transition hover:text-noir-900">
                  {item.value}
                </a>
              ) : (
                <p className="text-sm leading-6 text-noir-700">{item.value}</p>
              );

              return (
                <div key={item.label} className="flex gap-4 rounded-2xl border border-noir-200 px-4 py-4">
                  <item.icon className="mt-0.5 h-5 w-5 text-accent-700" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-noir-500">{item.label}</p>
                    <div className="mt-1">{content}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <IntlLink
            href={(data.primaryCtaHref as '/') ?? '/offerte'}
            locale={locale}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700"
          >
            <span>{String(data.primaryCtaLabel ?? fallbackQuoteLabel)}</span>
            <ArrowUpRight className="h-4 w-4" />
          </IntlLink>
        </div>
      </div>
    </section>
  );
}

function CtaSection({
  locale,
  data,
}: {
  locale: V2Locale;
  data: Record<string, unknown>;
}) {
  return (
    <section className="container-wide py-16">
      <div className="rounded-[2rem] bg-accent-600 px-8 py-10 text-white">
        <h2 className="text-display-sm font-display font-bold">{String(data.title ?? '')}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/85">{String(data.description ?? '')}</p>
        {typeof data.primaryCtaHref === 'string' ? (
          <IntlLink
            href={data.primaryCtaHref as '/'}
            locale={locale}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-accent-700 transition hover:bg-noir-100"
          >
            <span>{String(data.primaryCtaLabel ?? '')}</span>
            <ArrowUpRight className="h-4 w-4" />
          </IntlLink>
        ) : null}
      </div>
    </section>
  );
}

function LegalSection({ data }: { data: Record<string, unknown> }) {
  const sections = asItems(data.sections);

  return (
    <section className="container-wide py-16">
      <div className="max-w-4xl rounded-[2rem] border border-noir-200 bg-white p-8 shadow-soft-lg lg:p-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-noir-500">
          <span className="rounded-full bg-noir-100 px-3 py-1">
            {typeof data.updatedAt === 'string' ? `Updated ${data.updatedAt}` : 'Updated recently'}
          </span>
        </div>
        {typeof data.introduction === 'string' ? (
          <p className="mt-6 text-base leading-8 text-noir-600">{data.introduction}</p>
        ) : null}
        <div className="mt-10 grid gap-8">
          {sections.map((section, index) => (
            <article key={`${String(section.title ?? 'section')}-${index}`} className="rounded-3xl border border-noir-200 bg-noir-50 p-6">
              <h2 className="text-xl font-display font-bold text-noir-900">{String(section.title ?? '')}</h2>
              <p className="mt-3 text-sm leading-7 text-noir-600">{String(section.body ?? '')}</p>
              {Array.isArray(section.items) ? (
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-noir-600">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>• {String(item)}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="max-w-3xl">
      {typeof data.eyebrow === 'string' ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{data.eyebrow}</p>
      ) : null}
      {typeof data.title === 'string' ? (
        <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{data.title}</h2>
      ) : null}
      {typeof data.description === 'string' ? (
        <p className="mt-4 text-lg leading-8 text-noir-600">{data.description}</p>
      ) : null}
    </div>
  );
}
