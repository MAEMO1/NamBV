import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { getV2PageSections } from '@/lib/v2/public-data';
import { isV2Locale, type V2Locale } from '@/lib/v2/locale';
import { getV2ServicesPageContent, type V2ServicesOverviewEntry } from '@/lib/v2/service-content';
import { Link as IntlLink } from '@/i18n/routing';
import AnimatedSection from '@/components/public/AnimatedSection';
import { servicePageImages, siteImages } from '@/lib/images';

const SERVICE_CARD_IMAGES: Record<string, string> = {
  fullRenovation: servicePageImages.totaalrenovatie.card,
  renovation: servicePageImages.renovatie.card,
  finishing: servicePageImages.afwerking.card,
  technical: servicePageImages.technieken.card,
};

type PageSection = {
  sectionKey: string;
  dataJson: unknown;
};

function asData(section: PageSection | undefined) {
  return (section?.dataJson ?? {}) as Record<string, unknown>;
}

const SERVICE_ROUTES: Record<string, string> = {
  fullRenovation: '/diensten/totaalrenovatie',
  renovation: '/diensten/renovatie',
  finishing: '/diensten/afwerking',
  technical: '/diensten/technieken',
};

export default async function ServicesOverviewPage({
  locale,
}: {
  locale: string;
}) {
  if (!isV2Locale(locale)) return null;

  const sections = await getV2PageSections('services', locale);
  const content = getV2ServicesPageContent(locale);

  const hero = asData(sections.find((s) => s.sectionKey === 'hero'));
  const cta = sections.find((s) => s.sectionKey === 'cta');

  const serviceEntries: [string, V2ServicesOverviewEntry][] = [
    ['fullRenovation', content.services.fullRenovation],
    ['renovation', content.services.renovation],
    ['finishing', content.services.finishing],
    ['technical', content.services.technical],
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-noir-950 pt-28 pb-20 md:pt-36 md:pb-28">
        <Image
          src={siteImages.heroHome}
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir-950/92 via-noir-950/78 to-noir-950/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,122,59,0.25),transparent_40%)]" />
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up" delay={0}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-300">
                {String(hero.eyebrow || content.hero.badge)}
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <h1 className="mt-5 text-display-lg font-display font-bold text-white">
                {String(hero.title || `${content.hero.titlePrefix} ${content.hero.titleHighlight}`)}
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300}>
              <p className="mt-5 text-lg leading-8 text-white/90">
                {String(hero.description || content.hero.description)}
              </p>
            </AnimatedSection>
            {hero.primaryCtaHref || hero.secondaryCtaHref ? (
              <AnimatedSection animation="fade-up" delay={450}>
                <div className="mt-10 flex flex-wrap gap-4">
                  {typeof hero.primaryCtaHref === 'string' ? (
                    <IntlLink
                      href={hero.primaryCtaHref as '/'}
                      locale={locale}
                      className="group inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700"
                    >
                      <span>{String(hero.primaryCtaLabel ?? '')}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </IntlLink>
                  ) : null}
                  {typeof hero.secondaryCtaHref === 'string' ? (
                    <IntlLink
                      href={hero.secondaryCtaHref as '/'}
                      locale={locale}
                      className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                    >
                      {String(hero.secondaryCtaLabel ?? '')}
                    </IntlLink>
                  ) : null}
                </div>
              </AnimatedSection>
            ) : null}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="container-wide section-padding">
        <div className="grid gap-6 md:grid-cols-2">
          {serviceEntries.map(([key, service], i) => (
            <AnimatedSection key={key} animation="fade-up" delay={i * 100}>
              <IntlLink
                href={SERVICE_ROUTES[key] as '/'}
                locale={locale}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-noir-200 bg-white shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:border-accent-600/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-noir-100">
                  <Image
                    src={SERVICE_CARD_IMAGES[key]}
                    alt={service.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950/40 via-transparent to-transparent" />
                  {service.tag ? (
                    <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700 shadow-soft">
                      {service.tag}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-display font-bold text-noir-900">{service.title}</h2>
                      <p className="mt-1 text-sm font-medium text-accent-700">{service.subtitle}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-noir-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-600" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-noir-600">{service.description}</p>
                  <ul className="mt-5 grid gap-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-noir-700">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </IntlLink>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-noir-50 section-padding">
        <div className="container-wide">
          <AnimatedSection animation="fade-up">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{content.whyUs.badge}</p>
              <h2 className="mt-4 text-display-md font-display font-bold text-noir-900">{content.whyUs.title}</h2>
              <p className="mt-4 text-lg leading-8 text-noir-600">{content.whyUs.description}</p>
            </div>
          </AnimatedSection>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {content.whyUs.items.map((item, i) => (
              <AnimatedSection key={item.title} animation="fade-up" delay={i * 100}>
                <div className="rounded-3xl border border-noir-200 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:border-accent-600/30 h-full">
                  <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent-50 rounded-xl text-sm font-bold text-accent-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-lg font-display font-bold text-noir-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-noir-600">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {cta ? (
        <section className="section-padding bg-accent-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
          <div className="container-wide relative">
            <AnimatedSection animation="fade-up">
              <div className="max-w-3xl mx-auto text-center">
                {(() => {
                  const d = asData(cta);
                  return (
                    <>
                      <h2 className="text-display-lg font-display font-bold text-white">{String(d.title ?? content.cta.title)}</h2>
                      <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-white/80">{String(d.description ?? content.cta.description)}</p>
                      {typeof d.primaryCtaHref === 'string' ? (
                        <IntlLink
                          href={d.primaryCtaHref as '/'}
                          locale={locale}
                          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-accent-700 transition hover:bg-white/90"
                        >
                          <span>{String(d.primaryCtaLabel ?? content.cta.buttonPrimary)}</span>
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </IntlLink>
                      ) : null}
                    </>
                  );
                })()}
              </div>
            </AnimatedSection>
          </div>
        </section>
      ) : null}
    </>
  );
}
