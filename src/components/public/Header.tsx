'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import type { V2Locale } from '@/lib/v2/locale';
import { getV2UiCopy } from '@/lib/v2/locale';
import { Link, usePathname } from '@/i18n/routing';
import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function V2Header({
  locale,
  company,
}: {
  locale: V2Locale;
  company: Record<string, unknown>;
}) {
  const copy = getV2UiCopy(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phone = String(company.phone ?? '');
  const hasTransparentHero = pathname === '/' || (pathname.startsWith('/projecten/') && pathname !== '/projecten');

  const navigation = [
    { name: copy.nav.home, href: '/' as const },
    { name: copy.nav.services, href: '/diensten' as const },
    { name: copy.nav.approach, href: '/aanpak' as const },
    { name: copy.nav.projects, href: '/projecten' as const },
    { name: copy.nav.contact, href: '/contact' as const },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isTransparent = hasTransparentHero && !scrolled && !mobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md ' + (scrolled ? 'shadow-soft' : 'shadow-sm')
        }`}
      >
        <nav className="container-wide" aria-label="Global">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" locale={locale} className="relative z-10 group">
              <Logo color={isTransparent ? 'light' : 'dark'} showTagline={!scrolled} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    locale={locale}
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

            {/* CTA, Phone, Language - Desktop */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <LanguageSwitcher variant={isTransparent ? 'light' : 'dark'} />
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className={`hidden xl:flex items-center gap-2 text-sm transition-colors ${
                    isTransparent
                      ? 'text-white/70 hover:text-white'
                      : 'text-noir-600 hover:text-noir-900'
                  }`}
                >
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              )}
              <Link
                href="/offerte"
                locale={locale}
                className={`inline-flex items-center gap-2 px-6 py-2.5 border-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isTransparent
                    ? 'border-white/40 text-white hover:bg-white hover:text-noir-900'
                    : 'border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white'
                }`}
              >
                <span>{copy.common.getQuote}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className={`relative z-10 lg:hidden w-12 h-12 flex items-center justify-center transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-noir-900'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Menu sluiten' : 'Menu openen'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 h-0.5 bg-current transition-all duration-300 ease-smooth ${
                    mobileMenuOpen ? 'top-1/2 w-6 -rotate-45 -translate-y-1/2' : 'top-1 w-6'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-current transition-all duration-300 ease-smooth ${
                    mobileMenuOpen ? 'w-0 opacity-0' : 'w-4 opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 bg-current transition-all duration-300 ease-smooth ${
                    mobileMenuOpen ? 'bottom-1/2 w-6 rotate-45 translate-y-1/2' : 'bottom-1 w-5'
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
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-white" />

        <div className="relative h-full flex flex-col pt-32 pb-8 px-8">
          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col justify-center -mt-20">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  locale={locale}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between py-4 border-b border-noir-100 transition-all duration-500 ${
                    mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
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

          {/* Bottom section: CTA + phone + language */}
          <div
            className={`space-y-4 transition-all duration-500 ${
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? '600ms' : '0ms' }}
          >
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 text-noir-600"
              >
                <Phone className="h-5 w-5" />
                <span className="text-lg font-medium">{phone}</span>
              </a>
            )}
            <LanguageSwitcher variant="dark" />
            <Link
              href="/offerte"
              locale={locale}
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center justify-center gap-3 w-full px-8 py-4 bg-accent-600 text-white font-semibold rounded-full hover:bg-accent-500 transition-all duration-300"
            >
              <span>{copy.common.getQuote}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
