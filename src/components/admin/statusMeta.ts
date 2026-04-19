import {
  Ban,
  Check,
  CircleDashed,
  CircleDot,
  Clock,
  FileCheck2,
  Handshake,
  MailCheck,
  MapPin,
  RefreshCw,
  Sparkles,
  Trophy,
  UserX,
  XCircle,
  type LucideIcon,
} from 'lucide-react';

export type StatusVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';

export type StatusMeta = {
  label: string;
  variant: StatusVariant;
  icon: LucideIcon;
};

export const quoteStatusMeta: Record<string, StatusMeta> = {
  NEW: { label: 'Nieuw', variant: 'info', icon: Sparkles },
  CONTACTED: { label: 'Gecontacteerd', variant: 'accent', icon: MailCheck },
  SITE_VISIT: { label: 'Plaatsbezoek', variant: 'accent', icon: MapPin },
  QUOTE_SENT: { label: 'Offerte verzonden', variant: 'info', icon: FileCheck2 },
  NEGOTIATING: { label: 'Onderhandelen', variant: 'warning', icon: Handshake },
  WON: { label: 'Gewonnen', variant: 'success', icon: Trophy },
  LOST: { label: 'Verloren', variant: 'danger', icon: XCircle },
  CANCELLED: { label: 'Geannuleerd', variant: 'neutral', icon: Ban },
};

export const appointmentStatusMeta: Record<string, StatusMeta> = {
  PENDING: { label: 'In afwachting', variant: 'warning', icon: Clock },
  CONFIRMED: { label: 'Bevestigd', variant: 'success', icon: Check },
  RESCHEDULED: { label: 'Verplaatst', variant: 'info', icon: RefreshCw },
  COMPLETED: { label: 'Afgerond', variant: 'accent', icon: CircleDot },
  CANCELLED: { label: 'Geannuleerd', variant: 'neutral', icon: Ban },
  REJECTED: { label: 'Afgewezen', variant: 'danger', icon: XCircle },
  NO_SHOW: { label: 'Niet verschenen', variant: 'danger', icon: UserX },
};

export function getStatusMeta(kind: 'quote' | 'appointment', status: string): StatusMeta {
  const source = kind === 'quote' ? quoteStatusMeta : appointmentStatusMeta;
  return (
    source[status] ?? {
      label: status,
      variant: 'neutral',
      icon: CircleDashed,
    }
  );
}

export const variantClassName: Record<StatusVariant, string> = {
  neutral: 'admin-chip admin-chip-neutral',
  info: 'admin-chip admin-chip-info',
  success: 'admin-chip admin-chip-success',
  warning: 'admin-chip admin-chip-warning',
  danger: 'admin-chip admin-chip-danger',
  accent: 'admin-chip admin-chip-accent',
};

export const variantDotColor: Record<StatusVariant, string> = {
  neutral: 'var(--adm-text-3)',
  info: 'var(--adm-info)',
  success: 'var(--adm-success)',
  warning: 'var(--adm-warning)',
  danger: 'var(--adm-danger)',
  accent: 'var(--adm-accent)',
};
