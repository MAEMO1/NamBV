import Image from 'next/image';
import { ArrowUpRight, ArrowRight, MapPin, Phone } from 'lucide-react';
import { getV2PageSections, getV2Projects } from '@/lib/v2/public-data';
import { isV2Locale, getV2UiCopy } from '@/lib/v2/locale';
import { Link as IntlLink } from '@/i18n/routing';
import { homepageImages } from '@/lib/images';
import HeroSlider from '@/components/public/HeroSlider';
import AnimatedSection from '@/components/public/AnimatedSection';

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

  const sections = await getV2PageSections('home', locale);
  const projects = await getV2Projects(locale);
  const copy = getV2UiCopy(locale);
  const hero = asData(sections.find((section) => section.sectionKey === 'hero') ?? { dataJson: {} });
  const whyUs = asData(sections.find((section) => section.sectionKey === 'why-us') ?? { dataJson: {} });
  const services = asData(sections.find((section) => section.sectionKey === 'services') ?? { dataJson: {} });
  const cta = asData(sections.find((section) => section.sectionKey === 'cta') ?? { dataJson: {} });

  const whyUsItems = Array.isArray(whyUs.items) ? whyUs.items as Array<Record<string, unknown>> : [];
  const serviceItems = Array.isArray(services.items) ? services.items as Array<Record<string, unknown>> : [];

  return (
    <>
      {/* ===== HERO SECTION - Full-screen slider ===== */}
      <HeroSlider slides={homepageImages.heroSlides}>
        <div className="max-w-3xl">
          <AnimatedSection animation="fade-up" delay={0}>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-300">
              {String(hero.eyebrow ?? '')}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={150}>
            <h1 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-display font-bold text-white leading-[1.05] tracking-[-0.02em]">
              {String(hero.title ?? '')}
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
              {String(hero.description ?? '')}
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={450}>
            <div className="mt-10 flex flex-wrap gap-4">
              <IntlLink
                href={String(hero.primaryCtaHref ?? '/offerte') as '/'}
                locale={locale}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-600 text-white font-semibold rounded-full hover:bg-accent-500 transition-all duration-300"
              >
                <span>{String(hero.primaryCtaLabel ?? copy.common.getQuote)}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </IntlLink>
              <IntlLink
                href={String(hero.secondaryCtaHref ?? '/afspraak') as '/'}
                locale={locale}
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white hover:text-noir-900 transition-all duration-300"
              >
                <span>{String(hero.secondaryCtaLabel ?? copy.common.bookAppointment)}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </IntlLink>
            </div>
          </AnimatedSection>
        </div>
      </HeroSlider>

      {/* ===== WHY US SECTION - Split layout with image ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Image side */}
            <AnimatedSection animation="slide-left">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={homepageImages.whyUs}
                  alt="NAM Construction renovatie"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            {/* Content side */}
            <div>
              <AnimatedSection animation="fade-up">
                <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-6">
                  {String(whyUs.eyebrow ?? '')}
                </span>
                <h2 className="text-display-lg font-display font-bold text-noir-900 mb-6">
                  {String(whyUs.title ?? '')}
                </h2>
                <p className="text-lg text-noir-500 mb-10 leading-relaxed">
                  {String(whyUs.description ?? '')}
                </p>
              </AnimatedSection>

              {/* Values list */}
              <div className="space-y-3">
                {whyUsItems.map((item, index) => (
                  <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                    <IntlLink
                      href={String(item.href ?? '/') as '/'}
                      locale={locale}
                      className="group flex gap-5 p-4 bg-noir-50 rounded-xl hover:bg-accent-50 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-white rounded-lg group-hover:bg-accent-600 transition-colors duration-300">
                        <span className="text-sm font-semibold text-noir-400 group-hover:text-white transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-noir-900 mb-0.5 group-hover:text-accent-700 transition-colors">
                          {String(item.title ?? '')}
                        </h3>
                        <p className="text-noir-500 text-sm">{String(item.description ?? '')}</p>
                      </div>
                    </IntlLink>
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection animation="fade-up" delay={whyUsItems.length * 100 + 100} className="mt-8">
                <IntlLink
                  href="/afspraak"
                  locale={locale}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-600 text-white font-semibold rounded-full hover:bg-accent-500 transition-all duration-300"
                >
                  <span>{copy.common.bookAppointment}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </IntlLink>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION - Editorial split ===== */}
      <section className="section-padding bg-noir-50 relative overflow-hidden">
        <div className="container-wide">
          {/* Header */}
          <AnimatedSection animation="fade-up" className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <div>
                <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-6">
                  {copy.nav.services}
                </span>
                <h2 className="text-display-lg font-display font-bold text-noir-900">
                  {String(services.title ?? '')}
                </h2>
              </div>
              <p className="text-lg text-noir-500 lg:pl-12 leading-relaxed">
                {String(services.description ?? '')}
              </p>
            </div>
          </AnimatedSection>

          {/* Split layout: image + service list */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: large image */}
            <AnimatedSection animation="slide-left">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                <Image
                  src={homepageImages.services[0]}
                  alt="Totaalrenovatie"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 bg-accent-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                    {copy.nav.services}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                    {serviceItems[0] ? String(serviceItems[0].title ?? '') : ''}
                  </h3>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: service list */}
            <div className="flex flex-col justify-center">
              {serviceItems.map((item, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                  <IntlLink
                    href={String(item.href ?? '/diensten') as '/'}
                    locale={locale}
                    className="group flex items-center justify-between py-6 border-b border-noir-200 hover:border-accent-400 transition-colors duration-300"
                  >
                    <div className="flex-1">
                      <span className="text-xs text-accent-600 font-semibold uppercase tracking-wider mb-1 block">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-noir-900 group-hover:text-accent-600 transition-colors duration-300 mb-1">
                        {String(item.title ?? '')}
                      </h3>
                      <p className="text-noir-500 text-sm max-w-md">
                        {String(item.description ?? '')}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-6 w-10 h-10 flex items-center justify-center rounded-full border border-noir-200 group-hover:bg-accent-600 group-hover:border-accent-600 transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4 text-noir-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </IntlLink>
                </AnimatedSection>
              ))}

              <AnimatedSection animation="fade-up" delay={serviceItems.length * 100 + 100} className="mt-8">
                <IntlLink
                  href="/diensten"
                  locale={locale}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
                >
                  <span className="uppercase tracking-wider">
                    {locale === 'fr' ? 'Voir tous les services' : locale === 'en' ? 'View all services' : 'Bekijk alle diensten'}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </IntlLink>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION - Editorial asymmetric grid ===== */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-wide">
          {/* Header */}
          <AnimatedSection animation="fade-up" className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-6">
                  {copy.nav.projects}
                </span>
                <h2 className="text-display-lg font-display font-bold text-noir-900">
                  {locale === 'fr' ? 'Références récentes' : locale === 'en' ? 'Recent references' : 'Recente referenties'}
                </h2>
              </div>
              <IntlLink
                href="/projecten"
                locale={locale}
                className="group inline-flex items-center gap-3 text-noir-500 hover:text-accent-600 transition-colors"
              >
                <span className="text-sm font-semibold uppercase tracking-wider">
                  {copy.common.viewAllProjects}
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </IntlLink>
            </div>
          </AnimatedSection>

          {/* Asymmetric grid */}
          <div className="grid md:grid-cols-12 gap-6 lg:gap-8">
            {/* Large featured project */}
            {projects[0] && (
              <AnimatedSection animation="fade-up" className="md:col-span-7">
                <IntlLink
                  href={{ pathname: '/projecten/[slug]', params: { slug: projects[0].slug } }}
                  locale={locale}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    {projects[0].coverImageUrl && (
                      <Image
                        src={projects[0].coverImageUrl}
                        alt={projects[0].translation.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-noir-950/20 to-transparent" />
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                      <span className="inline-block self-start px-3 py-1 bg-accent-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                        {projects[0].category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                        {projects[0].translation.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/60 text-sm">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {projects[0].location}
                        </div>
                        <span className="text-white/30">|</span>
                        <span>{projects[0].year}</span>
                      </div>
                    </div>
                  </div>
                </IntlLink>
              </AnimatedSection>
            )}

            {/* Smaller projects */}
            <div className="md:col-span-5 grid gap-6 lg:gap-8">
              {projects.slice(1, 3).map((project, index) => (
                <AnimatedSection key={project.slug} animation="fade-up" delay={(index + 1) * 150}>
                  <IntlLink
                    href={{ pathname: '/projecten/[slug]', params: { slug: project.slug } }}
                    locale={locale}
                    className="group block"
                  >
                    <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
                      {project.coverImageUrl && (
                        <Image
                          src={project.coverImageUrl}
                          alt={project.translation.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-noir-950/70 via-noir-950/10 to-transparent" />
                      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                        <span className="inline-block self-start px-2.5 py-0.5 bg-accent-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-lg md:text-xl font-display font-bold text-white mb-1">
                          {project.translation.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-white/50 text-sm">
                          <MapPin className="h-3 w-3" />
                          {project.location}
                        </div>
                      </div>
                    </div>
                  </IntlLink>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION - Full-width accent background ===== */}
      <section className="section-padding bg-accent-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="container-wide relative">
          <AnimatedSection animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-lg md:text-display-xl font-display font-bold text-white mb-6">
                {String(cta.title ?? '')}
              </h2>
              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
                {String(cta.description ?? '')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <IntlLink
                  href={String(cta.primaryCtaHref ?? '/offerte') as '/'}
                  locale={locale}
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-accent-700 font-semibold rounded-full hover:bg-white/90 transition-all duration-300"
                >
                  <span>{String(cta.primaryCtaLabel ?? copy.common.getQuote)}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </IntlLink>

                <IntlLink
                  href="/afspraak"
                  locale={locale}
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white hover:text-accent-700 hover:border-white transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  <span>{copy.common.bookAppointment}</span>
                </IntlLink>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
