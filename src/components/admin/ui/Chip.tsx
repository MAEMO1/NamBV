import type { ReactNode } from 'react';

import { getStatusMeta, variantClassName, type StatusVariant } from '../statusMeta';

type StatusChipProps = {
  kind: 'quote' | 'appointment';
  status: string;
  showIcon?: boolean;
};

export function StatusChip({ kind, status, showIcon = true }: StatusChipProps) {
  const meta = getStatusMeta(kind, status);
  const Icon = meta.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium ${variantClassName[meta.variant]}`}
    >
      {showIcon ? <Icon size={11} strokeWidth={2} /> : null}
      {meta.label}
    </span>
  );
}

type ChipProps = {
  variant?: StatusVariant;
  children: ReactNode;
};

export function Chip({ variant = 'neutral', children }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium ${variantClassName[variant]}`}
    >
      {children}
    </span>
  );
}
