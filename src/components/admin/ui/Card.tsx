import type { HTMLAttributes, ReactNode } from 'react';

type Variant = 'default' | 'muted' | 'accent';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
};

const variantClass: Record<Variant, string> = {
  default: 'border-slate-200 bg-white',
  muted: 'border-slate-200 bg-slate-50',
  accent: 'border-slate-300 bg-white',
};

const paddingClass = {
  none: '',
  sm: 'p-3',
  md: 'p-4 md:p-5',
  lg: 'p-5 md:p-6',
};

export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={`rounded-lg border ${variantClass[variant]} ${paddingClass[padding]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="admin-display mt-0.5 text-base font-semibold text-slate-900 md:text-lg">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 max-w-prose text-xs leading-relaxed text-slate-500 md:text-sm">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
