'use client';

import { ChevronDown, LogOut, Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import Logo from '@/components/Logo';

import { moduleIcons, moduleLabels } from './icons';
import type { ModuleKey } from './types';

export type AdminShellModule = {
  key: ModuleKey;
  count?: number;
};

type AdminShellProps = {
  adminName: string;
  modules: ReadonlyArray<AdminShellModule>;
  activeModule: ModuleKey;
  onChangeModule: (key: ModuleKey) => void;
  onSignOut: () => void;
  children: ReactNode;
};

// Group modules into two logical sections, Voyage-style
const moduleGroups: Array<{ label: string; keys: ModuleKey[] }> = [
  {
    label: 'Werk',
    keys: ['analytics', 'quotes', 'appointments', 'availability'],
  },
  {
    label: 'Beheer',
    keys: ['content', 'projects', 'assets', 'settings'],
  },
];

export default function AdminShell({
  adminName,
  modules,
  activeModule,
  onChangeModule,
  onSignOut,
  children,
}: AdminShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLElement | null>(null);

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

  function handleSelect(key: ModuleKey) {
    onChangeModule(key);
    setDrawerOpen(false);
  }

  const moduleCountMap = new Map(modules.map((module) => [module.key, module.count]));

  return (
    <div className="admin-shell">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white lg:static">
        <div className="flex items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} strokeWidth={2} />
          </button>

          <div className="flex items-center gap-2 lg:hidden">
            <Logo variant="icon" className="h-6 w-6" />
            <span className="text-sm font-semibold text-slate-900">Nam Construction</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
              aria-label="Gebruikersmenu"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold uppercase text-white">
                {adminName.charAt(0)}
              </span>
              <span className="max-w-[160px] truncate text-slate-800">{adminName}</span>
              <ChevronDown size={14} strokeWidth={2} className="text-slate-500" />
            </button>
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
              aria-label="Uitloggen"
            >
              <LogOut size={13} strokeWidth={2} />
              <span className="hidden sm:inline">Uitloggen</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen ? (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Sluit menu"
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
          />
          <aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigatie"
            tabIndex={-1}
            className="fixed inset-y-0 left-0 z-50 flex w-[82vw] max-w-xs flex-col border-r border-slate-200 bg-slate-50 outline-none"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Logo variant="icon" className="h-6 w-6" />
                <span className="text-sm font-semibold text-slate-900">Nam Construction</span>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Sluit menu"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ModuleNav
                moduleCountMap={moduleCountMap}
                activeModule={activeModule}
                onSelect={handleSelect}
              />
            </nav>
          </aside>
        </div>
      ) : null}

      {/* Main layout */}
      <div className="grid lg:grid-cols-[220px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden border-r border-slate-200 bg-slate-50 lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
              <Logo variant="icon" className="h-6 w-6" />
              <span className="text-sm font-semibold text-slate-900">Nam Construction</span>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ModuleNav
                moduleCountMap={moduleCountMap}
                activeModule={activeModule}
                onSelect={handleSelect}
              />
            </nav>

            <div className="border-t border-slate-200 px-4 py-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Ingelogd
              </p>
              <p className="mt-0.5 truncate text-xs font-medium text-slate-800">{adminName}</p>
            </div>
          </div>
        </aside>

        {/* Content body */}
        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function ModuleNav({
  moduleCountMap,
  activeModule,
  onSelect,
}: {
  moduleCountMap: Map<ModuleKey, number | undefined>;
  activeModule: ModuleKey;
  onSelect: (key: ModuleKey) => void;
}) {
  return (
    <div className="grid gap-5">
      {moduleGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {group.label}
          </p>
          <ul className="grid gap-0.5">
            {group.keys.map((key) => {
              const Icon = moduleIcons[key];
              const isActive = key === activeModule;
              const count = moduleCountMap.get(key);
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => onSelect(key)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-slate-200'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.75}
                      className={isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}
                    />
                    <span className="flex-1 truncate text-left">{moduleLabels[key]}</span>
                    {typeof count === 'number' && count > 0 ? (
                      <span
                        className={`admin-numeric rounded px-1.5 py-px text-[10px] font-semibold ${
                          isActive
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {count}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
