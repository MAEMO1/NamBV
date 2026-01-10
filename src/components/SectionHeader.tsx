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
        <span className={`inline-block text-sm font-medium uppercase tracking-[0.2em] mb-4 ${
          dark
            ? 'text-accent-500'
            : 'text-accent-500'
        }`}>
          {badge}
        </span>
      )}

      {/* Title */}
      <h2 className={`text-display-lg font-display font-medium text-balance ${
        dark ? 'text-white' : 'text-noir-900'
      }`}>
        {title}
      </h2>

      {/* Subtle divider */}
      {centered && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`w-12 h-px ${dark ? 'bg-accent-500' : 'bg-accent-500'}`} />
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-lg md:text-xl mt-6 leading-relaxed ${centered ? 'mx-auto max-w-2xl' : 'max-w-3xl'} ${
          dark ? 'text-noir-300' : 'text-noir-500'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
