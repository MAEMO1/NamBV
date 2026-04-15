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
      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 transition hover:text-slate-900 lg:hidden"
    >
      <ChevronLeft size={14} strokeWidth={2} />
      {label}
    </button>
  );
}
