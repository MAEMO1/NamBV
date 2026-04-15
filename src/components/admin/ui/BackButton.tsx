import { ChevronLeft } from 'lucide-react';

type BackButtonProps = {
  onClick: () => void;
  label?: string;
};

export function BackButton({ onClick, label = 'Terug' }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 transition lg:hidden"
      style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--adm-text-2)' }}
      onMouseOver={(e) => (e.currentTarget.style.color = 'var(--adm-text)')}
      onMouseOut={(e) => (e.currentTarget.style.color = 'var(--adm-text-2)')}
    >
      <ChevronLeft size={14} strokeWidth={2} />
      {label}
    </button>
  );
}
