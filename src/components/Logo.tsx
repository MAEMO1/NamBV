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

  // Optimized NM Symbol paths - bolder strokes for crisp rendering
  const symbolPathN = "M0 0V72H12V24L32 72H44V0H32V48L12 0H0Z";
  const symbolPathM = "M28 72V0H40V48L60 0H72V72H60V24L40 72H28Z";

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
          className="w-20 h-20 mb-4"
          aria-label="NAM Construction"
        >
          <path d={symbolPathN} fill={primaryColor} />
          <path d={symbolPathM} fill={primaryColor} />
        </svg>
        <div className="flex flex-col items-center">
          <span
            style={{ color: primaryColor }}
            className="text-2xl font-display font-semibold tracking-[0.2em]"
          >
            NAM
          </span>
          <span
            style={{ color: secondaryColor }}
            className="text-[10px] tracking-[0.15em] mt-1"
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
      {/* Icon mark - larger for professional appearance */}
      <svg
        viewBox="0 0 72 72"
        fill="none"
        className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0"
        aria-label="NAM Construction"
      >
        <path d={symbolPathN} fill={primaryColor} />
        <path d={symbolPathM} fill={primaryColor} />
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
            className="text-[9px] md:text-[10px] tracking-[0.15em]"
          >
            CONSTRUCTION
          </span>
        )}
      </div>
    </div>
  );
}
