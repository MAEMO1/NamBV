'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

export type AdminShellModule<K extends string = string> = {
  key: K;
  label: string;
  count?: number;
};

type AdminShellProps<K extends string> = {
  adminName: string;
  modules: ReadonlyArray<AdminShellModule<K>>;
  activeModule: K;
  onChangeModule: (key: K) => void;
  onSignOut: () => void;
  children: ReactNode;
};

export default function AdminShell<K extends string>({
  adminName,
  modules,
  activeModule,
  onChangeModule,
  onSignOut,
  children,
}: AdminShellProps<K>) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLElement | null>(null);

  const activeLabel = modules.find((module) => module.key === activeModule)?.label ?? '';

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDrawerOpen(false);
      }
    }

    window.addEventListener('keydown', handleKey);

    const previouslyFocused = document.activeElement as HTMLElement | null;
    drawerRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      previouslyFocused?.focus?.();
    };
  }, [drawerOpen]);

  function handleSelect(key: K) {
    onChangeModule(key);
    setDrawerOpen(false);
  }

  return (
    <div className="admin-shell">
      {/* Top bar — sticky on mobile/tablet, static on desktop */}
      <header className="sticky top-0 z-30 border-b border-noir-200 bg-white/85 backdrop-blur lg:static lg:bg-white">
        <div className="admin-container flex items-center gap-3 py-3 lg:py-5">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-noir-200 text-noir-700 transition hover:border-noir-300 hover:text-noir-900 lg:hidden"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>

          <div className="min-w-0 flex-1">
            <p className="admin-eyebrow">Admin · {activeLabel}</p>
            <h1 className="truncate text-lg font-display font-bold text-noir-900 lg:text-2xl">
              NamBv console
            </h1>
            <p className="hidden text-xs text-noir-500 lg:block">
              Ingelogd als {adminName}
            </p>
          </div>

          <button
            type="button"
            onClick={onSignOut}
            className="admin-btn-secondary admin-btn-sm"
            aria-label="Uitloggen"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="hidden sm:inline">Uitloggen</span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen ? (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Sluit menu"
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-40 bg-black/40"
          />
          <aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigatie"
            tabIndex={-1}
            className="fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-sm flex-col border-r border-noir-200 bg-white outline-none"
          >
            <div className="flex items-center justify-between border-b border-noir-200 px-5 py-4">
              <div className="min-w-0">
                <p className="admin-eyebrow">Menu</p>
                <p className="truncate text-sm font-semibold text-noir-900">{adminName}</p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-noir-600 transition hover:bg-noir-100 hover:text-noir-900"
                aria-label="Sluit menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3">
              <ModuleNav
                modules={modules}
                activeModule={activeModule}
                onSelect={handleSelect}
              />
            </nav>
          </aside>
        </div>
      ) : null}

      {/* Main layout */}
      <div className="admin-container grid gap-6 py-4 md:py-6 lg:grid-cols-[240px_1fr] lg:gap-8 lg:py-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-2xl border border-noir-200 bg-white p-3 shadow-soft">
            <ModuleNav
              modules={modules}
              activeModule={activeModule}
              onSelect={handleSelect}
            />
          </div>
        </aside>

        {/* Content body */}
        <main className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

function ModuleNav<K extends string>({
  modules,
  activeModule,
  onSelect,
}: {
  modules: ReadonlyArray<AdminShellModule<K>>;
  activeModule: K;
  onSelect: (key: K) => void;
}) {
  return (
    <ul className="grid gap-1">
      {modules.map((module) => {
        const isActive = module.key === activeModule;
        return (
          <li key={module.key}>
            <button
              type="button"
              onClick={() => onSelect(module.key)}
              className={`admin-nav-item ${isActive ? 'admin-nav-item-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="truncate">{module.label}</span>
              {typeof module.count === 'number' ? (
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-noir-100 text-noir-600'
                }`}>
                  {module.count}
                </span>
              ) : null}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
