import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { ReactNode } from 'react';

type Variant = 'info' | 'success' | 'warning' | 'danger';

const variantClass: Record<Variant, string> = {
  info: 'border-sky-200 bg-sky-50 text-sky-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  danger: 'border-rose-200 bg-rose-50 text-rose-900',
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
  return (
    <div
      className={`flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${variantClass[variant]}`}
      role={variant === 'danger' || variant === 'warning' ? 'alert' : undefined}
    >
      <Icon size={15} strokeWidth={2} className="mt-0.5 shrink-0" />
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}
