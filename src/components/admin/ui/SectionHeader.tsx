import type { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  hairline?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="admin-display mt-0.5 text-lg font-semibold text-slate-900 md:text-xl">
          {title}
        </h2>
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
