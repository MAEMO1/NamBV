'use client';

import { useEffect, useState } from 'react';
import { Phone, CalendarDays } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import type { V2Locale } from '@/lib/v2/locale';
import { getV2UiCopy } from '@/lib/v2/locale';

type Props = {
  locale: V2Locale;
  phone: string | null;
};

// Pages where the sticky bar should hide (the forms themselves).
const HIDDEN_PATHS = new Set(['/offerte', '/afspraak']);

// Show the bar only after the user has scrolled past the initial fold.
// Using a simple threshold keeps this robust across pages with varying hero
// heights (homepage hero is full-screen, other pages have shorter heros).
const SCROLL_REVEAL_PX = 200;

export default function MobileStickyCta({ locale, phone }: Props) {
  const pathname = usePathname();
  const [revealed, setRevealed] = useState(false);
  const copy = getV2UiCopy(locale);

  useEffect(() => {
    const handleScroll = () => setRevealed(window.scrollY > SCROLL_REVEAL_PX);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (HIDDEN_PATHS.has(pathname)) {
    return null;
  }

  const telHref = phone ? `tel:${phone.replace(/\s+/g, '')}` : null;

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)] transition-all duration-300 ease-out ${
        revealed ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'
      }`}
      aria-hidden={!revealed}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-noir-100 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="flex items-stretch gap-2 px-3 py-2.5">
          {telHref && (
            <a
              href={telHref}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-4 rounded-full border-2 border-noir-900 text-noir-900 font-semibold text-sm hover:bg-noir-900 hover:text-white transition-colors"
              aria-label={copy.common.callUs}
            >
              <Phone className="h-4 w-4" />
              <span>{copy.common.callUs}</span>
            </a>
          )}
          <Link
            href="/afspraak"
            locale={locale}
            className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-4 rounded-full bg-accent-600 text-white font-semibold text-sm hover:bg-accent-500 transition-colors ${
              telHref ? 'flex-1' : 'w-full'
            }`}
          >
            <CalendarDays className="h-4 w-4" />
            <span>{copy.common.bookAppointment}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
