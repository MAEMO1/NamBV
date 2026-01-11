'use client';

import Link from 'next/link';
import { useCallback } from 'react';
import { handleLinkClick, CTALocation, trackCTAClick } from '@/lib/analytics';

interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  trackingLocation: CTALocation;
  trackingText?: string;
  target?: string;
  rel?: string;
}

/**
 * Link component with automatic analytics tracking
 *
 * Usage:
 * <TrackedLink href="/offerte" trackingLocation="hero">
 *   Offerte aanvragen
 * </TrackedLink>
 */
export function TrackedLink({
  href,
  children,
  className,
  trackingLocation,
  trackingText,
  target,
  rel,
}: TrackedLinkProps) {
  const handleClick = useCallback(() => {
    const text = trackingText || (typeof children === 'string' ? children : 'Link Click');
    handleLinkClick(href, text, trackingLocation);
  }, [href, trackingLocation, trackingText, children]);

  // External links
  if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  // Internal links
  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

interface TrackedButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  trackingLocation: CTALocation;
  trackingText?: string;
  trackingDestination?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

/**
 * Button component with automatic analytics tracking
 *
 * Usage:
 * <TrackedButton trackingLocation="hero" trackingText="Submit Form">
 *   Verstuur
 * </TrackedButton>
 */
export function TrackedButton({
  onClick,
  children,
  className,
  trackingLocation,
  trackingText,
  trackingDestination,
  type = 'button',
  disabled,
}: TrackedButtonProps) {
  const handleClick = useCallback(() => {
    const text = trackingText || (typeof children === 'string' ? children : 'Button Click');
    trackCTAClick(text, trackingLocation, trackingDestination || 'in-page');

    if (onClick) {
      onClick();
    }
  }, [onClick, trackingLocation, trackingText, trackingDestination, children]);

  return (
    <button
      type={type}
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
