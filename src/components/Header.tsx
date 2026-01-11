'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Diensten', href: '/diensten' },
  { name: 'Projecten', href: '/projecten' },
  { name: 'Afspraak', href: '/afspraak' },
  { name: 'Contact', href: '/contact' },
];

// Pages with dark hero backgrounds where transparent header with white text works
const darkHeroPages: string[] = [];

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-smooth ${
          scrolled || !hasDarkHero
            ? 'bg-white/95 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-wide" aria-label="Global">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-10 group">
              <div className="flex items-center gap-1">
                <span className={`text-2xl md:text-3xl font-display font-semibold tracking-tight transition-colors duration-500 ${
                  useDarkText || mobileMenuOpen ? 'text-noir-900' : 'text-white'
                }`}>
                  NAM
                </span>
                <span className={`text-2xl md:text-3xl font-display font-normal tracking-tight transition-colors duration-500 ${
                  useDarkText || mobileMenuOpen ? 'text-noir-400' : 'text-white/60'
                }`}>
                  CONSTRUCTION
                </span>
              </div>
              <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                useDarkText || mobileMenuOpen ? 'text-accent-500' : 'text-accent-400'
              }`}>
                Renovatie & Afwerking
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                    useDarkText
                      ? 'text-noir-600 hover:text-noir-900'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              <Link
                href="/offerte"
                className={`group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-wide rounded-lg transition-all duration-500 ${
                  useDarkText
                    ? 'bg-accent-500 text-white hover:bg-accent-600'
                    : 'bg-white text-noir-900 hover:bg-accent-500 hover:text-white'
                }`}
              >
                Offerte aanvragen
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            {navigation.map((item, index) => (
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
                <span className="text-3xl md:text-4xl font-display font-medium text-noir-900 group-hover:text-accent-500 transition-colors duration-300">
                  {item.name}
                </span>
                <ArrowUpRight className="h-6 w-6 text-noir-300 group-hover:text-accent-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ))}
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
              className="block w-full py-5 text-center text-lg font-medium uppercase tracking-wide rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors duration-300"
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
