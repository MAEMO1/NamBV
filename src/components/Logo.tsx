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
  // Official brand colors
  const primaryColor = color === 'light' ? '#ffffff' : '#2d4a47';
  const secondaryColor = color === 'light' ? 'rgba(255,255,255,0.7)' : '#5a7a6b';

  // NM Symbol path - N + mirrored N
  const symbolPath = `
    M 0 0 L 12 0 L 12 60 L 0 60 Z
    M 0 0 L 12 0 L 32 60 L 20 60 Z
    M 26 0 L 38 0 L 38 60 L 26 60 Z
    M 32 60 L 44 60 L 64 0 L 52 0 Z
    M 52 0 L 64 0 L 64 60 L 52 60 Z
  `;

  // Icon only version
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 64 60"
        fill="none"
        className={className}
        aria-label="NAM Construction"
      >
        <path d={symbolPath} fill={primaryColor} fillRule="nonzero" />
      </svg>
    );
  }

  // Stacked version (like in the PDF - symbol on top, text below)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <svg
          viewBox="0 0 64 60"
          fill="none"
          className="w-16 h-14 mb-4"
          aria-label="NAM Construction"
        >
          <path d={symbolPath} fill={primaryColor} fillRule="nonzero" />
        </svg>
        <div className="flex flex-col items-center">
          <span
            style={{ color: primaryColor }}
            className="text-2xl font-display font-semibold tracking-[0.3em]"
          >
            NAM
          </span>
          <span
            style={{ color: secondaryColor }}
            className="text-sm tracking-[0.25em] mt-1"
          >
            CONSTRUCTION
          </span>
        </div>
      </div>
    );
  }

  // Full horizontal version (default)
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Icon mark */}
      <svg
        viewBox="0 0 64 60"
        fill="none"
        className="w-10 h-9 md:w-12 md:h-11 flex-shrink-0"
        aria-label="NAM Construction"
      >
        <path d={symbolPath} fill={primaryColor} fillRule="nonzero" />
      </svg>

      {/* Text */}
      <div className="flex flex-col">
        <span
          style={{ color: primaryColor }}
          className="text-xl md:text-2xl font-display font-semibold tracking-[0.2em]"
        >
          NAM
        </span>
        {showTagline && (
          <span
            style={{ color: secondaryColor }}
            className="text-[10px] md:text-xs tracking-[0.05em] italic"
          >
            Kwaliteit die je blijft voelen
          </span>
        )}
      </div>
    </div>
  );
}
