import { getV2PageSections, getV2QuoteFormOptions } from '@/lib/v2/public-data';
import { getV2UiCopy, isV2Locale } from '@/lib/v2/locale';
import V2QuoteForm from '@/components/v2/QuoteForm';

export const dynamic = 'force-dynamic';

export default async function V2QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isV2Locale(locale)) {
    return null;
  }

  const [sections, formOptions] = await Promise.all([
    getV2PageSections('quote', locale),
    getV2QuoteFormOptions(),
  ]);
  const hero = (sections.find((section) => section.sectionKey === 'hero')?.dataJson ?? {}) as Record<string, unknown>;
  const copy = getV2UiCopy(locale);

  return (
    <section className="container-wide py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{String(hero.eyebrow ?? '')}</p>
        <h1 className="mt-4 text-display-lg font-display font-bold text-noir-900">{String(hero.title ?? copy.quote.title)}</h1>
        <p className="mt-4 text-lg leading-8 text-noir-600">{String(hero.description ?? copy.quote.description)}</p>
      </div>
      <div className="mt-10">
        <V2QuoteForm locale={locale} serviceTypes={formOptions.serviceTypes} propertyTypes={formOptions.propertyTypes} />
      </div>
    </section>
  );
}
