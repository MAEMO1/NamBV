interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  badge?: string;
  dark?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = '',
  badge,
  dark = false
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      {/* Optional badge */}
      {badge && (
        <span className={`inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] rounded-full mb-4 ${
          dark
            ? 'bg-white/10 text-accent-400'
            : 'bg-accent-100 text-accent-700'
        }`}>
          {badge}
        </span>
      )}

      {/* Title */}
      <h2 className={`text-display-lg font-display font-bold text-balance ${
        dark ? 'text-white' : 'text-noir-900'
      }`}>
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-lg md:text-xl mt-4 leading-relaxed ${centered ? 'mx-auto max-w-2xl' : 'max-w-3xl'} ${
          dark ? 'text-noir-300' : 'text-noir-500'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
