import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

type Variant = 'info' | 'success' | 'warning' | 'danger';

const variantStyle: Record<Variant, { bg: string; fg: string; accent: string }> = {
  info:    { bg: 'var(--adm-info-soft)',    fg: 'var(--adm-info)',    accent: 'var(--adm-info)' },
  success: { bg: 'var(--adm-success-soft)', fg: '#0B6E4F',            accent: 'var(--adm-success)' },
  warning: { bg: 'var(--adm-warning-soft)', fg: '#8A3F04',            accent: 'var(--adm-warning)' },
  danger:  { bg: 'var(--adm-danger-soft)',  fg: 'var(--adm-danger)',  accent: 'var(--adm-danger)' },
};

const variantIcon: Record<Variant, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertTriangle,
};

export function Banner({
  variant = 'info',
  children,
}: {
  variant?: Variant;
  children: ReactNode;
}) {
  const Icon = variantIcon[variant];
  const style: CSSProperties = {
    background: variantStyle[variant].bg,
    color: variantStyle[variant].fg,
    borderLeft: `2px solid ${variantStyle[variant].accent}`,
    borderRadius: 6,
    fontSize: 13,
    lineHeight: 1.5,
  };
  return (
    <div
      className="flex items-start gap-2 px-3 py-2.5"
      style={style}
      role={variant === 'danger' || variant === 'warning' ? 'alert' : undefined}
    >
      <Icon size={15} strokeWidth={2} className="mt-0.5 shrink-0" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}
