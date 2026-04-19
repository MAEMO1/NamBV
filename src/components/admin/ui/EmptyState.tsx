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
      className={`flex flex-col items-center justify-center gap-2.5 rounded-md border border-dashed text-center ${
        compact ? 'px-4 py-6' : 'px-6 py-10'
      }`}
      style={{
        borderColor: 'var(--adm-border-strong)',
        background: 'var(--adm-surface-2)',
      }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full"
        style={{
          background: 'var(--adm-surface)',
          border: '1px solid var(--adm-border)',
          color: 'var(--adm-text-3)',
        }}
      >
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <div className="grid gap-1">
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--adm-text)' }}>{title}</p>
        <p
          className="max-w-sm"
          style={{ fontSize: 12.5, color: 'var(--adm-text-3)', lineHeight: 1.5 }}
        >
          {description}
        </p>
      </div>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
