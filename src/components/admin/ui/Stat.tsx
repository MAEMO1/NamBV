import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type StatProps = {
  label: string;
  value: number | string;
  meta?: string;
  icon?: LucideIcon;
  accent?: boolean;
  footer?: ReactNode;
};

export function Stat({ label, value, meta, icon: Icon, footer }: StatProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 md:p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
        {Icon ? (
          <span className="flex h-6 w-6 items-center justify-center rounded text-slate-400">
            <Icon size={15} strokeWidth={1.75} />
          </span>
        ) : null}
      </div>
      <p className="admin-display admin-numeric mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
        {value}
      </p>
      {meta ? <p className="mt-1.5 text-xs text-slate-500">{meta}</p> : null}
      {footer ? <div className="mt-3">{footer}</div> : null}
    </div>
  );
}
