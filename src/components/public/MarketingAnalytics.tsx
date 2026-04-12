'use client';

import Script from 'next/script';
import { useState } from 'react';

const STORAGE_KEY = 'nam_v2_marketing_consent';

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export function trackV2Conversion(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
  });
}

export default function MarketingAnalytics({
  gtmId,
}: {
  gtmId?: string | null;
}) {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted' || stored === 'declined') {
      return stored;
    }

    return null;
  });
  const effectiveGtmId = gtmId || process.env.NEXT_PUBLIC_GTM_ID || null;

  const updateConsent = (nextValue: 'accepted' | 'declined') => {
    window.localStorage.setItem(STORAGE_KEY, nextValue);
    setConsent(nextValue);
  };

  return (
    <>
      {consent === 'accepted' && effectiveGtmId ? (
        <>
          <Script
            id="v2-gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'consent_granted', consent_scope: 'v2' });
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${effectiveGtmId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${effectiveGtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      ) : null}

      {consent === null ? (
        <div className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-noir-200 bg-white/95 p-4 shadow-soft-lg backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-noir-900">Marketingcookies voor v2</p>
              <p className="mt-1 max-w-2xl text-sm text-noir-600">
                GTM en GA4 worden pas geladen na expliciete toestemming. Operationele lead-events blijven server-side gelogd.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => updateConsent('declined')}
                className="rounded-full border border-noir-200 px-4 py-2 text-sm font-medium text-noir-700 transition hover:border-noir-300 hover:text-noir-900"
              >
                Weigeren
              </button>
              <button
                type="button"
                onClick={() => updateConsent('accepted')}
                className="rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-700"
              >
                Toestaan
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
