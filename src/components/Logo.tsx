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

  // Optimized NM Symbol paths - bolder strokes for better rendering at small sizes
  // Based on official logo but with 10px stroke width instead of 8px
  const symbolPathN = "M0 0V72H10V22L30 72H40V0H30V50L10 0H0Z";
  const symbolPathM = "M32 72V0H42V50L62 0H72V72H62V22L42 72H32Z";

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
          className="w-18 h-18 mb-3"
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
      {/* Icon mark - larger for better visibility */}
      <svg
        viewBox="0 0 72 72"
        fill="none"
        className="w-10 h-10 md:w-11 md:h-11 flex-shrink-0"
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
