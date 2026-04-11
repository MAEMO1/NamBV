import { getV2PageSections } from '@/lib/v2/public-data';
import { getV2UiCopy, isV2Locale } from '@/lib/v2/locale';
import V2AppointmentForm from '@/components/v2/AppointmentForm';

export const dynamic = 'force-dynamic';

export default async function V2AppointmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isV2Locale(locale)) {
    return null;
  }

  const sections = await getV2PageSections('appointment', locale);
  const hero = (sections.find((section) => section.sectionKey === 'hero')?.dataJson ?? {}) as Record<string, unknown>;
  const copy = getV2UiCopy(locale);

  return (
    <section className="container-wide py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-700">{String(hero.eyebrow ?? '')}</p>
        <h1 className="mt-4 text-display-lg font-display font-bold text-noir-900">{String(hero.title ?? copy.appointment.title)}</h1>
        <p className="mt-4 text-lg leading-8 text-noir-600">{String(hero.description ?? copy.appointment.description)}</p>
      </div>
      <div className="mt-10">
        <V2AppointmentForm locale={locale} />
      </div>
    </section>
  );
}
