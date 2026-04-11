import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { V2Locale } from '@/lib/v2/locale';
import { getV2UiCopy } from '@/lib/v2/locale';

function localizedPath(locale: V2Locale, path = '') {
  return `/v2/${locale}${path}`;
}

export default function V2Header({
  locale,
  company,
}: {
  locale: V2Locale;
  company: Record<string, unknown>;
}) {
  const copy = getV2UiCopy(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-noir-950/90 backdrop-blur">
      <div className="container-wide flex items-center justify-between py-5">
        <div>
          <Link href={localizedPath(locale)} className="text-lg font-display font-bold text-white">
            {String(company.name ?? 'Nam Construction')}
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">v2 preview</p>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href={localizedPath(locale)} className="text-sm text-white/70 transition hover:text-white">
            {copy.nav.home}
          </Link>
          <Link href={localizedPath(locale, '/projecten')} className="text-sm text-white/70 transition hover:text-white">
            {copy.nav.projects}
          </Link>
          <Link href={localizedPath(locale, '/offerte')} className="text-sm text-white/70 transition hover:text-white">
            {copy.nav.quote}
          </Link>
          <Link href={localizedPath(locale, '/afspraak')} className="text-sm text-white/70 transition hover:text-white">
            {copy.nav.appointment}
          </Link>
          <Link
            href={localizedPath(locale, '/offerte')}
            className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-700"
          >
            <span>{copy.common.getQuote}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
