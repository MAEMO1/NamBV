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
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
          dark
            ? 'bg-forest-800 text-forest-300'
            : 'bg-forest-100 text-forest-700'
        }`}>
          {badge}
        </span>
      )}

      {/* Title with decorative line */}
      <div className={`relative ${centered ? 'inline-block' : ''}`}>
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-balance ${
          dark ? 'text-white' : 'text-stone-900'
        }`}>
          {title}
        </h2>
        {centered && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className={`w-12 h-0.5 rounded-full ${dark ? 'bg-terracotta-400' : 'bg-terracotta-400'}`} />
            <svg
              className={`w-5 h-5 ${dark ? 'text-terracotta-400' : 'text-terracotta-500'}`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" opacity="0.3"/>
              <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
            </svg>
            <span className={`w-12 h-0.5 rounded-full ${dark ? 'bg-terracotta-400' : 'bg-terracotta-400'}`} />
          </div>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-lg md:text-xl mt-6 ${centered ? 'mx-auto max-w-2xl' : 'max-w-3xl'} ${
          dark ? 'text-forest-200' : 'text-stone-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
