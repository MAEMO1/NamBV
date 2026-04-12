import type { V2Locale } from '@/lib/v2/locale';
import { getV2UiCopy } from '@/lib/v2/locale';
import { Link } from '@/i18n/routing';

export default function V2Footer({
  locale,
  company,
}: {
  locale: V2Locale;
  company: Record<string, unknown>;
}) {
  const copy = getV2UiCopy(locale);

  return (
    <footer className="border-t border-noir-200 bg-white">
      <div className="container-wide grid gap-10 py-12 md:grid-cols-[1.6fr_1fr]">
        <div>
          <p className="text-lg font-display font-bold text-noir-900">{String(company.name ?? 'Nam Construction')}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-noir-600">
            Een slanke, veiligere renovatiesite met canonieke publieke routes, beheersbare content en een compacte backoffice.
          </p>
        </div>

        <div className="grid gap-2 text-sm text-noir-600">
          <Link href="/" locale={locale} className="transition hover:text-noir-900">
            {copy.nav.home}
          </Link>
          <Link href="/diensten" locale={locale} className="transition hover:text-noir-900">
            {copy.nav.services}
          </Link>
          <Link href="/projecten" locale={locale} className="transition hover:text-noir-900">
            {copy.nav.projects}
          </Link>
          <Link href="/contact" locale={locale} className="transition hover:text-noir-900">
            {copy.nav.contact}
          </Link>
          <Link href="/privacy" locale={locale} className="transition hover:text-noir-900">
            Privacy
          </Link>
          <a href={String(company.phone ?? '#')} className="transition hover:text-noir-900">
            {String(company.phone ?? '')}
          </a>
          <a href={`mailto:${String(company.email ?? '')}`} className="transition hover:text-noir-900">
            {String(company.email ?? '')}
          </a>
        </div>
      </div>
    </footer>
  );
}
