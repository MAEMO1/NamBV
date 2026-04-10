'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { ArrowUpRight, Phone } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const tHeader = useTranslations('header');

  // Pages with full-screen dark heroes get a transparent header
  const hasTransparentHero = pathname === '/' || (pathname.startsWith('/projecten/') && pathname !== '/projecten');

  const navigation = [
    { name: t('home'), href: '/' as const },
    { name: t('services'), href: '/diensten' as const },
    { name: t('projects'), href: '/projecten' as const },
    { name: t('appointment'), href: '/afspraak' as const },
    { name: t('contact'), href: '/contact' as const },
  ];

  // Don't render header on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hasTransparentHero && !scrolled && !mobileMenuOpen
            ? 'bg-transparent'
            : 'bg-white ' + (scrolled ? 'shadow-soft' : 'shadow-sm')
        }`}
      >
        <nav className="container-wide" aria-label="Global">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-10 group">
              <Logo color={hasTransparentHero && !scrolled && !mobileMenuOpen ? 'light' : 'dark'} showTagline={!scrolled} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const isTransparent = hasTransparentHero && !scrolled;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isTransparent
                        ? isActive ? 'text-white' : 'text-white/70 hover:text-white'
                        : isActive ? 'text-accent-600' : 'text-noir-600 hover:text-noir-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button & Language Switcher - Desktop */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <LanguageSwitcher variant={hasTransparentHero && !scrolled ? 'light' : 'dark'} />
              <a
                href="tel:+32493812789"
                className={`hidden xl:flex items-center gap-2 text-sm transition-colors ${
                  hasTransparentHero && !scrolled
                    ? 'text-white/70 hover:text-white'
                    : 'text-noir-600 hover:text-noir-900'
                }`}
              >
                <Phone className="h-4 w-4" />
                +32 493 81 27 89
              </a>
              <Link
                href="/offerte"
                className={`inline-flex items-center gap-2 px-6 py-2.5 border-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  hasTransparentHero && !scrolled
                    ? 'border-white/40 text-white hover:bg-white hover:text-noir-900'
                    : 'border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white'
                }`}
              >
                <span>{tHeader('ctaButton')}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className={`relative z-10 lg:hidden w-12 h-12 flex items-center justify-center transition-colors duration-300 ${
                hasTransparentHero && !scrolled && !mobileMenuOpen ? 'text-white' : 'text-noir-900'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? tHeader('menuClose') : tHeader('menuOpen')}
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
                  <span className={`text-3xl md:text-4xl font-display font-bold transition-colors duration-300 ${
                    isActive ? 'text-accent-600' : 'text-noir-900 group-hover:text-accent-600'
                  }`}>
                    {item.name}
                  </span>
                  <ArrowUpRight className={`h-6 w-6 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    isActive ? 'text-accent-600' : 'text-noir-300 group-hover:text-accent-600'
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
              className="block w-full py-5 text-center text-lg font-semibold bg-accent-600 text-white rounded-full hover:bg-accent-700 transition-colors duration-300"
            >
              {tHeader('ctaButton')}
            </Link>
          </div>

          {/* Language Switcher - Mobile */}
          <div
            className={`mt-4 flex justify-center transition-all duration-500 ${
              mobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? '550ms' : '0ms' }}
          >
            <LanguageSwitcher variant="dark" />
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
