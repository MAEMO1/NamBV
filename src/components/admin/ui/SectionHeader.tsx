import type { ReactNode } from 'react';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  /**
   * Heading level. Default h1 so each module has one page-level heading
   * (used as the stable smoke-test locator). Use h2 for secondary
   * SectionHeaders within a module (e.g. Beschikbaarheid → Uitzonderingen).
   */
  as?: 'h1' | 'h2';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  as = 'h1',
}: SectionHeaderProps) {
  const Heading = as;
  return (
    <header
      className="flex flex-wrap items-start justify-between gap-3 pb-4"
      style={{ borderBottom: '1px solid var(--adm-border)' }}
    >
      <div className="min-w-0">
        {eyebrow ? <p className="admin-eyebrow">{eyebrow}</p> : null}
        <Heading
          data-testid={as === 'h1' ? 'admin-page-title' : undefined}
          className="mt-1"
          style={{
            fontFamily: 'var(--adm-sans)',
            fontWeight: 600,
            fontSize: as === 'h1' ? 20 : 16,
            letterSpacing: '-0.01em',
            color: 'var(--adm-text)',
            lineHeight: 1.2,
          }}
        >
          {title}
        </Heading>
        {description ? (
          <p
            className="mt-1.5 max-w-prose"
            style={{ fontSize: 13, color: 'var(--adm-text-3)', lineHeight: 1.5 }}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
