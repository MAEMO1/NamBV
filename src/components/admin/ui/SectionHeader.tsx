import type { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  /**
   * Heading level. Default h1 so each module has one page-level heading
   * (used as the stable smoke-test locator). Use h2 for secondary
   * SectionHeaders within a module (e.g. Beschikbaarheid → Uitzonderingen).
   */
  as?: 'h1' | 'h2';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  as = 'h1',
}: SectionHeaderProps) {
  const Heading = as;
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            {eyebrow}
          </p>
        ) : null}
        <Heading
          data-testid={as === 'h1' ? 'admin-page-title' : undefined}
          className="mt-0.5 text-lg font-semibold text-slate-900 md:text-xl"
        >
          {title}
        </Heading>
        {description ? (
          <p className="mt-1 max-w-prose text-xs leading-relaxed text-slate-500 md:text-sm">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
