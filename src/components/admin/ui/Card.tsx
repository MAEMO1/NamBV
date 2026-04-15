import type { HTMLAttributes, ReactNode } from 'react';

type Variant = 'default' | 'muted' | 'accent';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
};

const variantStyle: Record<Variant, React.CSSProperties> = {
  default: { background: 'var(--adm-surface)', borderColor: 'var(--adm-border)' },
  muted:   { background: 'var(--adm-surface-2)', borderColor: 'var(--adm-border)' },
  accent:  { background: 'var(--adm-surface)', borderColor: 'var(--adm-accent)' },
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
  style,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={`rounded-lg border ${paddingClass[padding]} ${className}`.trim()}
      style={{ boxShadow: 'var(--adm-shadow-sm)', ...variantStyle[variant], ...style }}
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
        {eyebrow ? <p className="admin-eyebrow">{eyebrow}</p> : null}
        <h3
          className="mt-0.5"
          style={{
            fontFamily: 'var(--adm-sans)',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '-0.005em',
            color: 'var(--adm-text)',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        {description ? (
          <p
            className="mt-1 max-w-prose"
            style={{ fontSize: 13, color: 'var(--adm-text-3)', lineHeight: 1.5 }}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
