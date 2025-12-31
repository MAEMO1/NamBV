'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, ArrowRight } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Diensten',
    href: '/diensten',
    children: [
      { name: 'Totaalrenovatie', href: '/diensten/totaalrenovatie', desc: 'Volledige renovatie' },
      { name: 'Renovatie & Verbouwing', href: '/diensten/renovatie', desc: 'Gerichte projecten' },
      { name: 'Afwerking', href: '/diensten/afwerking', desc: 'Tegelwerk, plakwerk' },
      { name: 'Technieken', href: '/diensten/technieken', desc: 'Elektriciteit, sanitair' },
    ],
  },
  { name: 'Duurzaam', href: '/duurzaam' },
  { name: 'Projecten', href: '/projecten' },
  { name: 'Aanpak', href: '/aanpak' },
  { name: 'Over ons', href: '/over-nam' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-organic ${
        scrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-warm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom" aria-label="Global">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group flex items-center gap-3">
              {/* Logo mark */}
              <div className="w-11 h-11 rounded-2xl bg-forest-700 flex items-center justify-center group-hover:bg-forest-800 transition-colors duration-300">
                <span className="text-cream-50 font-display font-bold text-xl">N</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-display font-semibold text-forest-900">
                  Nam
                </span>
                <span className="text-xl font-display font-normal text-forest-600">
                  Construction
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    scrolled
                      ? 'text-stone-700 hover:text-forest-700 hover:bg-forest-50'
                      : 'text-stone-600 hover:text-forest-700 hover:bg-cream-100/50'
                  }`}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {/* Dropdown menu */}
                {item.children && activeDropdown === item.name && (
                  <div className="absolute left-0 top-full pt-3 animate-fade-down">
                    <div className="bg-cream-50 rounded-3xl shadow-warm-lg border border-sand-100 p-3 min-w-[280px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="flex items-center justify-between p-3 rounded-2xl text-stone-700 hover:bg-forest-50 hover:text-forest-800 transition-all duration-300 group"
                        >
                          <div>
                            <p className="font-medium">{child.name}</p>
                            <p className="text-sm text-stone-500">{child.desc}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-forest-600" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-3">
            <a
              href="tel:+32123456789"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 hover:text-forest-700 transition-colors duration-300"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">+32 123 45 67 89</span>
            </a>
            <Link href="/afspraak" className="btn-primary text-sm">
              Plan afspraak
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="w-11 h-11 inline-flex items-center justify-center rounded-2xl text-stone-700 hover:bg-sand-100 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Menu openen</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-organic ${
            mobileMenuOpen ? 'max-h-[calc(100dvh-96px)] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-1 border-t border-sand-200 bg-cream-50 overflow-y-auto max-h-[calc(100dvh-120px)]">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2.5 px-4 text-base font-medium text-stone-700 hover:text-forest-700 hover:bg-forest-50 rounded-xl transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-0.5 border-l-2 border-sand-200 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block py-2 px-3 text-sm text-stone-600 hover:text-forest-700 hover:bg-forest-50 rounded-lg transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 mt-3 border-t border-sand-200 space-y-2">
              <a
                href="tel:+32123456789"
                className="flex items-center gap-3 py-2 px-4 text-stone-700"
              >
                <Phone className="h-5 w-5 text-forest-600" />
                +32 123 45 67 89
              </a>
              <Link
                href="/afspraak"
                className="btn-primary w-full justify-center text-sm py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Plan gratis afspraak
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
