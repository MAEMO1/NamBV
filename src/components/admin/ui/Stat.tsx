import { ArrowDownRight, ArrowUpRight, Minus, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type StatProps = {
  label: string;
  value: number | string;
  meta?: string;
  icon?: LucideIcon;
  accent?: boolean;
  footer?: ReactNode;
  /** Percentage delta. Positive = up, negative = down, 0/undefined omitted. */
  delta?: number;
  /** Override delta direction sentiment (e.g. fewer complaints = good) */
  deltaSentiment?: 'auto' | 'positive-up' | 'positive-down';
  /** Helper line below delta (e.g. "vs. vorige 30d") */
  deltaLabel?: string;
};

function deltaClass(delta: number, sentiment: 'auto' | 'positive-up' | 'positive-down') {
  if (delta === 0) return 'admin-stat-delta-flat';
  const isUp = delta > 0;
  if (sentiment === 'positive-up' || sentiment === 'auto') {
    return isUp ? 'admin-stat-delta-up' : 'admin-stat-delta-down';
  }
  return isUp ? 'admin-stat-delta-down' : 'admin-stat-delta-up';
}

export function Stat({
  label,
  value,
  meta,
  icon: Icon,
  footer,
  delta,
  deltaSentiment = 'auto',
  deltaLabel,
}: StatProps) {
  const hasDelta = typeof delta === 'number';
  const DeltaIcon = !hasDelta ? null : delta === 0 ? Minus : delta > 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="admin-stat">
      <div className="flex items-center justify-between">
        <p className="admin-stat-label">{label}</p>
        {Icon ? (
          <span
            className="flex h-6 w-6 items-center justify-center rounded"
            style={{ color: 'var(--adm-text-4)' }}
          >
            <Icon size={15} strokeWidth={1.75} />
          </span>
        ) : null}
      </div>
      <p className="admin-stat-value">{value}</p>
      {hasDelta ? (
        <p className={`admin-stat-delta ${deltaClass(delta!, deltaSentiment)}`}>
          {DeltaIcon ? <DeltaIcon size={13} strokeWidth={2} /> : null}
          {delta! > 0 ? '+' : ''}
          {delta!.toFixed(1)}%
          {deltaLabel ? (
            <span style={{ color: 'var(--adm-text-3)', fontWeight: 400, marginLeft: 4 }}>
              {deltaLabel}
            </span>
          ) : null}
        </p>
      ) : meta ? (
        <p className="admin-stat-meta">{meta}</p>
      ) : null}
      {footer ? <div className="mt-2">{footer}</div> : null}
    </div>
  );
}
