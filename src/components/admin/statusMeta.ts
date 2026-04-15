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
  neutral: 'bg-slate-100 text-slate-700',
  info: 'bg-sky-100 text-sky-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-rose-100 text-rose-700',
  accent: 'bg-slate-100 text-slate-800',
};

export const variantDotColor: Record<StatusVariant, string> = {
  neutral: '#64748b',
  info: '#0284c7',
  success: '#059669',
  warning: '#b45309',
  danger: '#e11d48',
  accent: '#0f172a',
};
