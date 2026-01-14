'use client';

import { useEffect } from 'react';

export default function OfferteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hide main header and footer on offerte page
    document.body.classList.add('offerte-page');
    return () => {
      document.body.classList.remove('offerte-page');
    };
  }, []);

  return <>{children}</>;
}
