import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'quiet';
type Size = 'sm' | 'md';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
};

const sizeClass: Record<Size, string> = {
  sm: 'admin-btn-sm',
  md: '',
};

const variantClass: Record<Variant, string> = {
  primary: 'admin-btn-primary',
  secondary: 'admin-btn-secondary',
  ghost: 'admin-btn-ghost',
  danger: 'admin-btn-danger',
  quiet: 'admin-btn-secondary',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`admin-btn ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
