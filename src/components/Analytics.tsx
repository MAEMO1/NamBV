'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initDataLayer, trackPageView } from '@/lib/analytics';
import { useScrollTracking } from '@/hooks/useScrollTracking';

// Replace with your GTM Container ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';

/**
 * Google Tag Manager component
 *
 * Setup:
 * 1. Create GTM account at tagmanager.google.com
 * 2. Create a container for your website
 * 3. Add your GTM ID to .env.local: NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
 * 4. In GTM, create a GA4 Configuration tag with your GA4 Measurement ID
 * 5. Create triggers for the custom events defined in analytics.ts
 */
export function GoogleTagManager() {
  // Only render GTM in production or when GTM_ID is set
  if (GTM_ID === 'GTM-XXXXXXX') {
    return null;
  }

  return (
    <>
      {/* GTM Script */}
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
      {/* GTM NoScript Fallback - for users with JS disabled */}
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

/**
 * Analytics Provider - handles page view tracking and scroll tracking
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Initialize dataLayer
  useEffect(() => {
    initDataLayer();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (pathname) {
      // Small delay to ensure page title is updated
      const timer = setTimeout(() => {
        trackPageView(pathname, document.title);
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
      <AnalyticsProvider>{children}</AnalyticsProvider>
    </>
  );
}
