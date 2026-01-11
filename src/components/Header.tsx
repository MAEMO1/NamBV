'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Diensten', href: '/diensten' },
  { name: 'Projecten', href: '/projecten' },
  { name: 'Afspraak', href: '/afspraak' },
  { name: 'Contact', href: '/contact' },
];

// Pages with dark hero backgrounds where transparent header with white text works
const darkHeroPages: string[] = ['/', '/projecten'];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Check if current page has a dark hero
  const hasDarkHero = darkHeroPages.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Determine if we should use dark text (scrolled OR on light pages)
  const useDarkText = scrolled || !hasDarkHero;
  const logoColor = (useDarkText || mobileMenuOpen) ? 'dark' : 'light';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-smooth ${
          scrolled || !hasDarkHero
            ? 'bg-white/95 backdrop-blur-md shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-wide" aria-label="Global">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-10 group">
              <Logo color={logoColor} showTagline={!scrolled} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                      useDarkText
                        ? isActive
                          ? 'text-accent-600'
                          : 'text-noir-600 hover:text-noir-900'
                        : isActive
                          ? 'text-accent-400'
                          : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent-500" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              <Link
                href="/offerte"
                className={`group relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-wide overflow-hidden transition-all duration-500 ${
                  useDarkText
                    ? 'bg-accent-500 text-white hover:bg-accent-600'
                    : 'bg-white text-noir-900 hover:bg-accent-500 hover:text-white'
                }`}
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                <span className="relative z-10">Offerte aanvragen</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className={`relative z-10 lg:hidden w-12 h-12 flex items-center justify-center transition-colors duration-300 ${
                useDarkText || mobileMenuOpen
                  ? 'text-noir-900'
                  : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Menu sluiten' : 'Menu openen'}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 h-0.5 bg-current transition-all duration-300 ease-smooth ${
                    mobileMenuOpen
                      ? 'top-1/2 w-6 -rotate-45 -translate-y-1/2'
                      : 'top-1 w-6'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-current transition-all duration-300 ease-smooth ${
                    mobileMenuOpen ? 'w-0 opacity-0' : 'w-4 opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 bg-current transition-all duration-300 ease-smooth ${
                    mobileMenuOpen
                      ? 'bottom-1/2 w-6 rotate-45 translate-y-1/2'
                      : 'bottom-1 w-5'
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ease-smooth ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-white" />

        {/* Content */}
        <div className="relative h-full flex flex-col pt-32 pb-8 px-8">
          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col justify-center -mt-20">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between py-4 border-b border-noir-100 transition-all duration-500 ${
                    mobileMenuOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: mobileMenuOpen ? `${150 + index * 75}ms` : '0ms' }}
                >
                  <span className={`text-3xl md:text-4xl font-display font-medium transition-colors duration-300 ${
                    isActive ? 'text-accent-600' : 'text-noir-900 group-hover:text-accent-500'
                  }`}>
                    {item.name}
                  </span>
                  <ArrowUpRight className={`h-6 w-6 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    isActive ? 'text-accent-500' : 'text-noir-300 group-hover:text-accent-500'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div
            className={`transition-all duration-500 ${
              mobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? '500ms' : '0ms' }}
          >
            <Link
              href="/offerte"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-5 text-center text-lg font-medium uppercase tracking-wide bg-accent-500 text-white hover:bg-accent-600 transition-colors duration-300"
            >
              Offerte aanvragen
            </Link>
          </div>

          {/* Contact Info */}
          <div
            className={`mt-8 flex flex-col gap-2 text-sm text-noir-500 transition-all duration-500 ${
              mobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? '600ms' : '0ms' }}
          >
            <a href="tel:+32493812789" className="hover:text-noir-900 transition-colors">
              +32 493 81 27 89
            </a>
            <a href="mailto:info@namconstruction.be" className="hover:text-noir-900 transition-colors">
              info@namconstruction.be
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
