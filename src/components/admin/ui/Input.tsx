import type { HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

const fieldBase =
  'w-full min-h-[38px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 disabled:opacity-60';

type FieldLabelProps = {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function FieldLabel({ label, hint, children, className = '' }: FieldLabelProps) {
  return (
    <label className={`grid gap-1 text-sm text-slate-800 ${className}`}>
      <span className="text-xs font-medium text-slate-700">{label}</span>
      {children}
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
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
        className={`${fieldBase} ${className ?? ''}`}
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
        className={`${fieldBase} min-h-[96px] resize-y ${className ?? ''}`}
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
        className={`${fieldBase} pr-8 ${className ?? ''}`}
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
    <label className="flex cursor-pointer items-start gap-2.5 rounded-md border border-slate-200 bg-white px-3 py-2.5 transition hover:border-slate-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-slate-900 focus:ring-slate-900/30"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-slate-900">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs text-slate-500">{description}</span>
        ) : null}
      </span>
    </label>
  );
}

export const inputClassName = fieldBase;

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
