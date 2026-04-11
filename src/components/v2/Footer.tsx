import Link from 'next/link';
import type { V2Locale } from '@/lib/v2/locale';
import { getV2UiCopy } from '@/lib/v2/locale';

function localizedPath(locale: V2Locale, path = '') {
  return `/v2/${locale}${path}`;
}

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
            v2-preview voor een veiligere, beter beheersbare renovatiesite. Legacy blijft naast deze flow bestaan tot cutover.
          </p>
        </div>

        <div className="grid gap-2 text-sm text-noir-600">
          <Link href={localizedPath(locale)} className="transition hover:text-noir-900">
            {copy.nav.home}
          </Link>
          <Link href={localizedPath(locale, '/projecten')} className="transition hover:text-noir-900">
            {copy.nav.projects}
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
