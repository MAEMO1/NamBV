'use client';

import Script from 'next/script';
import { Suspense, useEffect, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initDataLayer, trackPageView as gtmTrackPageView } from '@/lib/analytics';
import { useScrollTracking } from '@/hooks/useScrollTracking';

// Replace with your GTM Container ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

// ============================================================================
// PRIVACY-FRIENDLY ANALYTICS (Built-in, no cookies)
// ============================================================================

// Generate a session ID that persists for 30 minutes
function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes
  const stored = sessionStorage.getItem('nam_session')

  if (stored) {
    const { id, timestamp } = JSON.parse(stored)
    if (Date.now() - timestamp < SESSION_DURATION) {
      sessionStorage.setItem('nam_session', JSON.stringify({ id, timestamp: Date.now() }))
      return id
    }
  }

  const newId = Math.random().toString(36).substring(2) + Date.now().toString(36)
  sessionStorage.setItem('nam_session', JSON.stringify({ id: newId, timestamp: Date.now() }))
  return newId
}

// Track a page view to our internal analytics
async function trackInternalPageView(path: string, referrer: string | null, params: URLSearchParams | null) {
  try {
    const sessionId = getSessionId()

    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        path,
        referrer,
        sessionId,
        utmSource: params?.get('utm_source'),
        utmMedium: params?.get('utm_medium'),
        utmCampaign: params?.get('utm_campaign'),
      }),
      keepalive: true,
    })
  } catch {
    // Silent fail
  }
}

// Track a custom event
export async function trackInternalEvent(
  eventName: string,
  eventType: string = 'custom',
  eventData?: Record<string, unknown>
) {
  try {
    const sessionId = getSessionId()
    const path = typeof window !== 'undefined' ? window.location.pathname : ''

    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'event',
        eventType,
        eventName,
        eventData,
        path,
        sessionId,
      }),
      keepalive: true,
    })
  } catch {
    // Silent fail
  }
}

// Conversion tracking helpers
export const trackQuoteSubmit = (data?: Record<string, unknown>) => {
  trackInternalEvent('quote_submit', 'conversion', data)
}

export const trackAppointmentSubmit = (data?: Record<string, unknown>) => {
  trackInternalEvent('appointment_submit', 'conversion', data)
}

export const trackInternalCTAClick = (ctaName: string, location: string) => {
  trackInternalEvent('cta_click', 'engagement', { ctaName, location })
}

export const trackPhoneClick = (phoneNumber: string) => {
  trackInternalEvent('phone_click', 'engagement', { phoneNumber })
}

export const trackEmailClick = (email: string) => {
  trackInternalEvent('email_click', 'engagement', { email })
}

// ============================================================================
// GTM INTEGRATION
// ============================================================================

/**
 * Google Tag Manager component
 */
export function GoogleTagManager() {
  if (GTM_ID === 'GTM-XXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

// ============================================================================
// ANALYTICS PROVIDER
// ============================================================================

/**
 * Internal Analytics Tracker - privacy-friendly, no cookies
 */
function InternalAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPathRef = useRef<string>('');

  const handlePageView = useCallback(() => {
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    const referrer = document.referrer || null;
    trackInternalPageView(pathname, referrer, searchParams);
  }, [pathname, searchParams]);

  useEffect(() => {
    handlePageView();
  }, [handlePageView]);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      if (timeOnPage > 0) {
        trackInternalEvent('page_exit', 'engagement', { timeOnPage, path: pathname });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pathname]);

  return null;
}

/**
 * Analytics Provider - handles page view tracking and scroll tracking
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Initialize dataLayer for GTM
  useEffect(() => {
    initDataLayer();
  }, []);

  // Track page views on route change (GTM)
  useEffect(() => {
    if (pathname) {
      const timer = setTimeout(() => {
        gtmTrackPageView(pathname, document.title);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Track scroll depth
  useScrollTracking();

  return <>{children}</>;
}

/**
 * Combined Analytics component for easy setup
 */
export default function Analytics({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleTagManager />
      <Suspense fallback={null}>
        <InternalAnalyticsTracker />
      </Suspense>
      <AnalyticsProvider>{children}</AnalyticsProvider>
    </>
  );
}
