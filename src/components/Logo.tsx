interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function Logo({ className = '', size = 40, color = 'currentColor' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      className={className}
      aria-label="Nam Construction logo"
    >
      <path
        d="M0 0V72H8V18L28 72H36V0H28V54L8 0H0Z"
        fill={color}
      />
      <path
        d="M36 72V0H44V54L64 0H72V72H64V18L44 72H36Z"
        fill={color}
      />
    </svg>
  );
}
