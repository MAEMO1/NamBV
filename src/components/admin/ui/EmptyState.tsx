import type { LucideIcon } from 'lucide-react';
import { FileQuestion } from 'lucide-react';
import type { ReactNode } from 'react';

type EmptyStateProps = {
  title?: string;
  description: string;
  icon?: LucideIcon;
  action?: ReactNode;
  compact?: boolean;
};

export function EmptyState({
  title = 'Niets te tonen',
  description,
  icon: Icon = FileQuestion,
  action,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 bg-slate-50/50 text-center ${
        compact ? 'px-4 py-6' : 'px-6 py-10'
      }`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 text-slate-500">
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <div className="grid gap-0.5">
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="max-w-sm text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
