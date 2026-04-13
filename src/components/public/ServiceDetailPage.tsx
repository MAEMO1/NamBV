import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronDown, Shield } from 'lucide-react';
import { getV2PageSections } from '@/lib/v2/public-data';
import { isV2Locale, type V2Locale } from '@/lib/v2/locale';
import {
  getV2ServiceDetailContent,
  PAGE_KEY_TO_SERVICE,
  type V2ServiceCategory,
  type V2TotaalrenovatieContent,
  type V2RenovatieContent,
  type V2AfwerkingContent,
  type V2TechniekenContent,
  type V2ServiceKey,
} from '@/lib/v2/service-content';
import { servicePageImages } from '@/lib/images';
import { Link as IntlLink } from '@/i18n/routing';
import AnimatedSection from '@/components/public/AnimatedSection';

const SERVICE_HERO_IMAGES: Record<V2ServiceKey, string> = {
  totaalrenovatie: servicePageImages.totaalrenovatie.hero,
  renovatie: servicePageImages.renovatie.hero,
  afwerking: servicePageImages.afwerking.hero,
  technieken: servicePageImages.technieken.hero,
};

type PageSection = {
  sectionKey: string;
  schemaKey: string;
  dataJson: unknown;
};

function asData(section: PageSection | undefined) {
  return (section?.dataJson ?? {}) as Record<string, unknown>;
}

export default async function ServiceDetailPage({
  locale,
  pageKey,
}: {
  locale: string;
  pageKey: string;
}) {
  if (!isV2Locale(locale)) return null;

  const serviceKey = PAGE_KEY_TO_SERVICE[pageKey];
  if (!serviceKey) return null;

  const sections = await getV2PageSections(pageKey, locale);
  const content = getV2ServiceDetailContent(locale);
  const service = content[serviceKey];

  const hero = asData(sections.find((s) => s.sectionKey === 'hero'));
  const cta = sections.find((s) => s.sectionKey === 'cta');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-noir-950 pt-28 pb-20 md:pt-36 md:pb-28">
        <Image
          src={SERVICE_HERO_IMAGES[serviceKey]}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir-950/90 via-noir-950/70 to-noir-950/50" />
        <div className="container-wide relative">
          <AnimatedSection animation="fade-up" delay={0}>
            <IntlLink
              href="/diensten"
              locale={locale}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{content.backToServices}</span>
            </IntlLink>
          </AnimatedSection>
          <div className="mt-6 max-w-3xl">
            {typeof hero.eyebrow === 'string' ? (
              <AnimatedSection animation="fade-up" delay={100}>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-300">{hero.eyebrow}</p>
              </AnimatedSection>
            ) : (
              <AnimatedSection animation="fade-up" delay={100}>
                <span className="inline-flex items-center rounded-full bg-accent-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-300">
                  {service.badge}
                </span>
              </AnimatedSection>
            )}
            <AnimatedSection animation="fade-up" delay={200}>
              <h1 className="mt-5 text-display-lg font-display font-bold text-white">
                {String(hero.title || service.title)}
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300}>
              <p className="mt-5 text-lg leading-8 text-white/72">
                {String(hero.description || service.description)}
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="mt-10 flex flex-wrap gap-4">
                {typeof hero.primaryCtaHref === 'string' ? (
                  <IntlLink
                    href={hero.primaryCtaHref as '/'}
                    locale={locale}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700"
                  >
                    <span>{String(hero.primaryCtaLabel ?? content.freeConsultation)}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </IntlLink>
                ) : null}
                {typeof hero.secondaryCtaHref === 'string' ? (
                  <IntlLink
                    href={hero.secondaryCtaHref as '/'}
                    locale={locale}
                    className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                  >
                    {String(hero.secondaryCtaLabel ?? content.viewProjects)}
                  </IntlLink>
                ) : null}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Service-specific body */}
      {serviceKey === 'totaalrenovatie' && (
        <TotaalrenovatieBody locale={locale} data={service as V2TotaalrenovatieContent} />
      )}
      {serviceKey === 'renovatie' && (
        <RenovatieBody locale={locale} data={service as V2RenovatieContent} />
      )}
      {serviceKey === 'afwerking' && (
        <AfwerkingBody locale={locale} data={service as V2AfwerkingContent} />
      )}
      {serviceKey === 'technieken' && (
        <TechniekenBody locale={locale} data={service as V2TechniekenContent} />
      )}

      {/* CTA */}
      {cta ? (
        <CtaSection locale={locale} data={asData(cta)} />
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Totaalrenovatie                                                    */
/* ------------------------------------------------------------------ */

function TotaalrenovatieBody({
  locale,
  data,
}: {
  locale: V2Locale;
  data: V2TotaalrenovatieContent;
}) {
  return (
    <>
      {/* Features */}
      <section className="container-wide section-padding">
        <AnimatedSection animation="fade-up">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{data.featuresBadge}</p>
            <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{data.featuresTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-noir-600">{data.featuresSubtitle}</p>
          </div>
        </AnimatedSection>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {data.features.map((feature, i) => (
            <AnimatedSection key={feature.title} animation="fade-up" delay={i * 100}>
              <div className="group rounded-3xl border border-noir-200 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:border-accent-600/30">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent-50 rounded-xl text-sm font-bold text-accent-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl font-display font-bold text-noir-900">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-noir-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Scope */}
      <section className="bg-noir-50 section-padding">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <AnimatedSection animation="fade-up">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{data.scopeBadge}</p>
                <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{data.scopeTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-noir-600">{data.scopeDescription}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.scope.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-noir-200 bg-white px-4 py-3 transition-all duration-300 hover:border-accent-600/30 hover:shadow-soft"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent-600" />
                    <span className="text-sm text-noir-700">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-wide section-padding">
        <AnimatedSection animation="fade-up">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{data.faqBadge}</p>
            <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{data.faqTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-noir-600">{data.faqSubtitle}</p>
          </div>
        </AnimatedSection>
        <div className="mt-10 max-w-3xl grid gap-3">
          {data.faqs.map((faq, i) => (
            <AnimatedSection key={faq.question} animation="fade-up" delay={i * 80}>
              <details className="group rounded-2xl border border-noir-200 bg-white transition-all duration-300 hover:border-accent-600/30 hover:shadow-soft open:shadow-soft-lg open:border-accent-600/30">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-noir-900 marker:content-[''] [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-noir-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-sm leading-7 text-noir-600">{faq.answer}</p>
                </div>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Renovatie & Verbouwing                                             */
/* ------------------------------------------------------------------ */

function RenovatieBody({
  locale,
  data,
}: {
  locale: V2Locale;
  data: V2RenovatieContent;
}) {
  return (
    <>
      {/* Types */}
      <section className="container-wide section-padding">
        <AnimatedSection animation="fade-up">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{data.typesBadge}</p>
            <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{data.typesTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-noir-600">{data.typesSubtitle}</p>
          </div>
        </AnimatedSection>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {data.types.map((type, i) => (
            <AnimatedSection key={type.title} animation="fade-up" delay={i * 100}>
              <div className="group rounded-3xl border border-noir-200 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:border-accent-600/30">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent-50 rounded-xl text-sm font-bold text-accent-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl font-display font-bold text-noir-900">{type.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-noir-600">{type.description}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-noir-50 section-padding">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <AnimatedSection animation="fade-up">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{data.benefitsBadge}</p>
                <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{data.benefitsTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-noir-600">{data.benefitsDescription}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <div className="grid gap-3">
                {data.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 rounded-2xl border border-noir-200 bg-white px-4 py-3 transition-all duration-300 hover:border-accent-600/30 hover:shadow-soft"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent-600" />
                    <span className="text-sm text-noir-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Afwerking                                                          */
/* ------------------------------------------------------------------ */

function AfwerkingBody({
  locale,
  data,
}: {
  locale: V2Locale;
  data: V2AfwerkingContent;
}) {
  return (
    <>
      {/* Service categories */}
      <ServiceCategoriesSection
        badge={data.servicesBadge}
        title={data.servicesTitle}
        subtitle={data.servicesSubtitle}
        services={data.services}
      />

      {/* Quality */}
      <section className="bg-noir-50 section-padding">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <AnimatedSection animation="fade-up">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{data.qualityBadge}</p>
                <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{data.qualityTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-noir-600">{data.qualityDescription}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <div className="grid gap-3">
                {data.qualityPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-2xl border border-noir-200 bg-white px-4 py-3 transition-all duration-300 hover:border-accent-600/30 hover:shadow-soft"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent-600" />
                    <span className="text-sm text-noir-700">{point}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Technieken                                                         */
/* ------------------------------------------------------------------ */

function TechniekenBody({
  locale,
  data,
}: {
  locale: V2Locale;
  data: V2TechniekenContent;
}) {
  return (
    <>
      {/* Service categories */}
      <ServiceCategoriesSection
        badge={data.servicesBadge}
        title={data.servicesTitle}
        subtitle={data.servicesSubtitle}
        services={data.services}
      />

      {/* Certifications */}
      <section className="bg-noir-50 section-padding">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <AnimatedSection animation="fade-up">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{data.certBadge}</p>
                <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{data.certTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-noir-600">{data.certDescription}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <div className="grid gap-3">
                {data.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-3 rounded-2xl border border-noir-200 bg-white px-4 py-3 transition-all duration-300 hover:border-accent-600/30 hover:shadow-soft"
                  >
                    <Shield className="h-5 w-5 flex-shrink-0 text-accent-600" />
                    <span className="text-sm text-noir-700">{cert}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared: Service categories (Afwerking + Technieken)                */
/* ------------------------------------------------------------------ */

function ServiceCategoriesSection({
  badge,
  title,
  subtitle,
  services,
}: {
  badge: string;
  title: string;
  subtitle: string;
  services: V2ServiceCategory[];
}) {
  return (
    <section className="container-wide section-padding">
      <AnimatedSection animation="fade-up">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{badge}</p>
          <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-noir-600">{subtitle}</p>
        </div>
      </AnimatedSection>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {services.map((svc, i) => (
          <AnimatedSection key={svc.title} animation="fade-up" delay={i * 100}>
            <div className="group rounded-3xl border border-noir-200 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:border-accent-600/30 h-full">
              <h3 className="text-xl font-display font-bold text-noir-900">{svc.title}</h3>
              <p className="mt-3 text-sm leading-7 text-noir-600">{svc.description}</p>
              <ul className="mt-5 grid gap-2">
                {svc.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-noir-700">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA (reused from DB)                                               */
/* ------------------------------------------------------------------ */

function CtaSection({
  locale,
  data,
}: {
  locale: V2Locale;
  data: Record<string, unknown>;
}) {
  return (
    <section className="section-padding bg-accent-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="container-wide relative">
        <AnimatedSection animation="fade-up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-lg font-display font-bold text-white">{String(data.title ?? '')}</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-white/80">{String(data.description ?? '')}</p>
            {typeof data.primaryCtaHref === 'string' ? (
              <IntlLink
                href={data.primaryCtaHref as '/'}
                locale={locale}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-accent-700 transition hover:bg-white/90"
              >
                <span>{String(data.primaryCtaLabel ?? '')}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </IntlLink>
            ) : null}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
