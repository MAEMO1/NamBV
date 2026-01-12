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
  const primaryColor = color === 'light' ? '#ffffff' : '#1e3a36';
  const secondaryColor = color === 'light' ? 'rgba(255,255,255,0.7)' : '#5a7c6f';

  // Official NM Symbol paths (from nam-symbol.svg)
  const symbolPathN = "M0 0V72H8V18L28 72H36V0H28V54L8 0H0Z";
  const symbolPathM = "M35 72V0H44V54L64 0H72V72H64V18L44 72H35Z";

  // Icon only version
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 72 72"
        fill="none"
        className={className}
        aria-label="NAM Construction"
      >
        <path d={symbolPathN} fill={primaryColor} />
        <path d={symbolPathM} fill={primaryColor} />
      </svg>
    );
  }

  // Stacked version (symbol on top, text below - like in the official logo)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <svg
          viewBox="0 0 72 72"
          fill="none"
          className="w-16 h-16 mb-3"
          aria-label="NAM Construction"
        >
          <path d={symbolPathN} fill={primaryColor} />
          <path d={symbolPathM} fill={primaryColor} />
        </svg>
        <div className="flex flex-col items-center">
          <span
            style={{ color: primaryColor }}
            className="text-xl font-display font-semibold tracking-[0.2em]"
          >
            NAM
          </span>
          <span
            style={{ color: secondaryColor }}
            className="text-[9px] tracking-[0.15em] mt-0.5"
          >
            CONSTRUCTION
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
        viewBox="0 0 72 72"
        fill="none"
        className="w-9 h-9 md:w-10 md:h-10 flex-shrink-0"
        aria-label="NAM Construction"
      >
        <path d={symbolPathN} fill={primaryColor} />
        <path d={symbolPathM} fill={primaryColor} />
      </svg>

      {/* Text */}
      <div className="flex flex-col">
        <span
          style={{ color: primaryColor }}
          className="text-lg md:text-xl font-display font-semibold tracking-[0.2em]"
        >
          NAM
        </span>
        {showTagline && (
          <span
            style={{ color: secondaryColor }}
            className="text-[8px] md:text-[9px] tracking-[0.15em]"
          >
            CONSTRUCTION
          </span>
        )}
      </div>
    </div>
  );
}
