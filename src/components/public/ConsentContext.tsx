'use client';

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

type ConsentValue = 'accepted' | 'declined' | null;

const STORAGE_KEY = 'nam_v2_marketing_consent';
const CONSENT_CHANGE_EVENT = 'nam_v2_marketing_consent_change';

type ConsentContextValue = {
  consent: ConsentValue;
  setConsent: (value: 'accepted' | 'declined') => void;
  /**
   * True only after client hydration, when no consent choice has been made yet.
   * Used both to render the cookie banner and to hide other bottom-of-screen
   * UI (e.g. the mobile sticky CTA) so they do not overlap with it.
   */
  bannerVisible: boolean;
};

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  setConsent: () => {},
  bannerVisible: false,
});

type Snapshot = { consent: ConsentValue; hydrated: boolean };

// Cache snapshots so useSyncExternalStore returns stable references between
// renders — new objects would otherwise cause an infinite loop.
let cachedSnapshot: Snapshot = { consent: null, hydrated: true };
let cachedRawValue: string | null = null;

function getClientSnapshot(): Snapshot {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRawValue) {
    return cachedSnapshot;
  }
  cachedRawValue = raw;
  const consent: ConsentValue = raw === 'accepted' || raw === 'declined' ? raw : null;
  cachedSnapshot = { consent, hydrated: true };
  return cachedSnapshot;
}

// On the server (and during initial hydration) we report `hydrated: false`
// so that UI gated on hydration (the cookie banner, the sticky CTA hiding)
// does not flicker or cause hydration mismatches.
const SERVER_SNAPSHOT: Snapshot = { consent: null, hydrated: false };
function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const setConsent = useCallback((value: 'accepted' | 'declined') => {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }, []);

  const bannerVisible = snapshot.hydrated && snapshot.consent === null;

  return (
    <ConsentContext.Provider
      value={{ consent: snapshot.consent, setConsent, bannerVisible }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  return useContext(ConsentContext);
}
