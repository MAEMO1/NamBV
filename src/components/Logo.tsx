'use client';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'stacked';
  color?: 'light' | 'dark';
  showTagline?: boolean;
}

export default function Logo({
  className = '',
  variant = 'full',
  color = 'dark',
  showTagline = true
}: LogoProps) {
  const textColor = color === 'light' ? '#ffffff' : '#1c1917';
  const textColorMuted = color === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(28,25,23,0.5)';
  const accentColor = '#6b7f54';

  // Icon only version
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className={className}
        aria-label="NAM Construction"
      >
        <g>
          {/* Left pillar */}
          <rect x="8" y="14" width="7" height="28" fill={textColor} />
          {/* Diagonal connector */}
          <polygon points="15,14 15,24 33,42 33,32" fill={textColor} />
          {/* Right pillar */}
          <rect x="33" y="14" width="7" height="28" fill={textColor} />
          {/* Roof accent */}
          <polygon points="4,14 24,2 44,14 40,14 24,6 8,14" fill={accentColor} />
        </g>
      </svg>
    );
  }

  // Stacked version for footer
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col ${className}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="w-12 h-12 mb-3"
          aria-label="NAM Construction"
        >
          <g>
            <rect x="8" y="14" width="7" height="28" fill={textColor} />
            <polygon points="15,14 15,24 33,42 33,32" fill={textColor} />
            <rect x="33" y="14" width="7" height="28" fill={textColor} />
            <polygon points="4,14 24,2 44,14 40,14 24,6 8,14" fill={accentColor} />
          </g>
        </svg>
        <div className="flex flex-col">
          <span style={{ color: textColor }} className="text-xl font-display font-semibold tracking-tight">
            NAM
          </span>
          <span style={{ color: textColorMuted }} className="text-xs uppercase tracking-[0.2em]">
            Construction
          </span>
        </div>
      </div>
    );
  }

  // Full horizontal version (default)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon mark */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
        aria-label="NAM Construction"
      >
        <g>
          {/* Left pillar */}
          <rect x="8" y="14" width="7" height="28" fill={textColor} />
          {/* Diagonal connector */}
          <polygon points="15,14 15,24 33,42 33,32" fill={textColor} />
          {/* Right pillar */}
          <rect x="33" y="14" width="7" height="28" fill={textColor} />
          {/* Roof accent */}
          <polygon points="4,14 24,2 44,14 40,14 24,6 8,14" fill={accentColor} />
        </g>
      </svg>

      {/* Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span style={{ color: textColor }} className="text-xl md:text-2xl font-display font-semibold tracking-tight">
            NAM
          </span>
          <span style={{ color: textColorMuted }} className="text-xl md:text-2xl font-display font-normal tracking-tight">
            CONSTRUCTION
          </span>
        </div>
        {showTagline && (
          <span style={{ color: accentColor }} className="text-[10px] uppercase tracking-[0.15em]">
            Renovatie & Afwerking
          </span>
        )}
      </div>
    </div>
  );
}
