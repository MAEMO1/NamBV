import type { HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

type FieldLabelProps = {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function FieldLabel({ label, hint, children, className = '' }: FieldLabelProps) {
  return (
    <label className={`admin-field ${className}`}>
      <span className="admin-field-label">{label}</span>
      {children}
      {hint ? <span className="admin-field-hint">{hint}</span> : null}
    </label>
  );
}

type LabeledInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
};

export function LabeledInput({ label, hint, value, onChange, className, ...rest }: LabeledInputProps) {
  return (
    <FieldLabel label={label} hint={hint}>
      <input
        {...rest}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`admin-input ${className ?? ''}`}
      />
    </FieldLabel>
  );
}

type LabeledTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
};

export function LabeledTextarea({ label, hint, value, onChange, className, rows = 4, ...rest }: LabeledTextareaProps) {
  return (
    <FieldLabel label={label} hint={hint}>
      <textarea
        {...rest}
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className={`admin-input ${className ?? ''}`}
        style={{ minHeight: 96, resize: 'vertical' }}
      />
    </FieldLabel>
  );
}

type LabeledSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
  label: string;
  hint?: string;
  value: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  onChange: (value: string) => void;
};

export function LabeledSelect({ label, hint, value, options, onChange, className, ...rest }: LabeledSelectProps) {
  return (
    <FieldLabel label={label} hint={hint}>
      <select
        {...rest}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`admin-input ${className ?? ''}`}
        style={{ paddingRight: 34, appearance: 'none', WebkitAppearance: 'none', backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23697386' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldLabel>
  );
}

type ToggleFieldProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function ToggleField({ label, description, checked, onChange }: ToggleFieldProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`admin-toggle ${checked ? 'on' : ''}`}
      role="switch"
      aria-checked={checked}
      style={{ textAlign: 'left' }}
    >
      <span className="admin-toggle-switch" aria-hidden="true" />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3, gap: 2 }}>
        <span style={{ fontSize: 13, color: 'var(--adm-text)', fontWeight: 500 }}>{label}</span>
        {description ? (
          <span style={{ fontSize: 12, color: 'var(--adm-text-3)' }}>{description}</span>
        ) : null}
      </span>
    </button>
  );
}

export const inputClassName = 'admin-input';

export function FieldGroup({
  children,
  className = '',
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${className}`} {...rest}>
      {children}
    </div>
  );
}
