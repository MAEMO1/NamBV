'use client';

import { LogOut, Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

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
  /** When false, the main area is rendered flush to the edges (for modules that manage their own chrome/topbar). */
  padded?: boolean;
  children: ReactNode;
};

// Group modules into two logical sections
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

function avatarInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '•';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminShell({
  adminName,
  modules,
  activeModule,
  onChangeModule,
  onSignOut,
  padded = true,
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
  const initials = avatarInitials(adminName);

  return (
    <div className="admin-shell">
      {/* Mobile-only top bar — hamburger + brand. Desktop uses sidebar only. */}
      <header
        className="sticky top-0 z-30 flex items-center gap-3 border-b px-4 py-2.5 lg:hidden"
        style={{ background: 'var(--adm-bone-2)', borderColor: 'var(--adm-rule)' }}
      >
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md transition"
          style={{ color: 'var(--adm-graphite)' }}
          aria-label="Open menu"
        >
          <Menu size={18} strokeWidth={2} />
        </button>
        <BrandMark />
      </header>

      {/* Mobile drawer */}
      {drawerOpen ? (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Sluit menu"
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-40 backdrop-blur-sm"
            style={{ background: 'rgba(15, 13, 9, 0.35)' }}
          />
          <aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigatie"
            tabIndex={-1}
            className="fixed inset-y-0 left-0 z-50 flex w-[82vw] max-w-xs flex-col border-r outline-none"
            style={{ background: 'var(--adm-bone-2)', borderColor: 'var(--adm-rule)' }}
          >
            <div
              className="flex items-center justify-between border-b px-4 py-3"
              style={{ borderColor: 'var(--adm-rule)' }}
            >
              <BrandMark />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md transition"
                style={{ color: 'var(--adm-graphite)' }}
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
            <SidebarFoot adminName={adminName} initials={initials} onSignOut={onSignOut} />
          </aside>
        </div>
      ) : null}

      {/* Main layout */}
      <div className="grid lg:grid-cols-[216px_1fr]">
        {/* Desktop sidebar */}
        <aside
          className="hidden border-r lg:block"
          style={{ background: 'var(--adm-bone-2)', borderColor: 'var(--adm-rule)' }}
        >
          <div className="sticky top-0 flex h-screen flex-col">
            <div
              className="flex items-baseline gap-2 border-b px-5 py-4"
              style={{ borderColor: 'var(--adm-rule)' }}
            >
              <BrandMark />
            </div>

            <nav className="flex-1 overflow-y-auto px-3.5 py-4">
              <ModuleNav
                moduleCountMap={moduleCountMap}
                activeModule={activeModule}
                onSelect={handleSelect}
              />
            </nav>

            <SidebarFoot adminName={adminName} initials={initials} onSignOut={onSignOut} />
          </div>
        </aside>

        {/* Content body */}
        <main
          className={`min-w-0 ${padded ? 'px-4 py-6 sm:px-6 lg:px-8 lg:py-8' : ''}`}
          style={{ minHeight: 'calc(100vh)', background: 'var(--adm-bone)' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <span className="flex items-baseline gap-2">
      <span
        style={{
          fontFamily: 'var(--adm-display)',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 22,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: 'var(--adm-ink)',
        }}
      >
        Nam<span style={{ color: 'var(--adm-terra)' }}>.</span>
      </span>
      <span
        style={{
          fontFamily: 'var(--adm-mono)',
          fontSize: 9.5,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--adm-stone)',
          transform: 'translateY(-1px)',
        }}
      >
        Studio · v2
      </span>
    </span>
  );
}

function SidebarFoot({
  adminName,
  initials,
  onSignOut,
}: {
  adminName: string;
  initials: string;
  onSignOut: () => void;
}) {
  return (
    <div className="border-t px-3.5 py-3" style={{ borderColor: 'var(--adm-rule)' }}>
      <div className="flex items-center gap-2.5 px-1.5 py-1">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-medium"
          style={{
            background: 'var(--adm-ink)',
            color: 'var(--adm-paper)',
            fontFamily: 'var(--adm-display)',
          }}
        >
          {initials}
        </span>
        <div className="flex min-w-0 flex-col leading-tight">
          <span
            className="truncate"
            style={{ fontSize: 12.5, color: 'var(--adm-ink)', fontWeight: 500 }}
          >
            {adminName}
          </span>
          <span
            style={{
              fontFamily: 'var(--adm-mono)',
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--adm-stone)',
            }}
          >
            Eigenaar
          </span>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-md transition"
          style={{ color: 'var(--adm-stone)' }}
          aria-label="Uitloggen"
          title="Uitloggen"
          onMouseOver={(event) => {
            event.currentTarget.style.color = 'var(--adm-terra)';
            event.currentTarget.style.background = 'var(--adm-terra-tint)';
          }}
          onMouseOut={(event) => {
            event.currentTarget.style.color = 'var(--adm-stone)';
            event.currentTarget.style.background = 'transparent';
          }}
        >
          <LogOut size={14} strokeWidth={1.8} />
        </button>
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
    <div className="grid gap-4">
      {moduleGroups.map((group) => (
        <div key={group.label}>
          <p
            className="mb-1.5 px-2.5"
            style={{
              fontFamily: 'var(--adm-mono)',
              fontSize: 9.5,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--adm-stone-2)',
            }}
          >
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
                    className={`admin-nav-item ${isActive ? 'admin-nav-item-active' : ''}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon
                        size={15}
                        strokeWidth={1.6}
                        style={{ color: isActive ? 'var(--adm-terra)' : 'var(--adm-stone)' }}
                      />
                      <span className="truncate">{moduleLabels[key]}</span>
                    </span>
                    {typeof count === 'number' && count > 0 ? (
                      <span
                        className="admin-numeric"
                        style={{
                          fontFamily: 'var(--adm-mono)',
                          fontSize: 10.5,
                          color: 'var(--adm-stone)',
                          letterSpacing: '0.02em',
                        }}
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
