import type { ReactNode } from 'react';

import { getStatusMeta, type StatusVariant } from '../statusMeta';

type StatusChipProps = {
  kind: 'quote' | 'appointment';
  status: string;
  showIcon?: boolean;
};

export function StatusChip({ kind, status, showIcon = false }: StatusChipProps) {
  const meta = getStatusMeta(kind, status);
  const Icon = meta.icon;

  return (
    <span className={`admin-chip admin-chip-${meta.variant}`}>
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
  return <span className={`admin-chip admin-chip-${variant}`}>{children}</span>;
}
