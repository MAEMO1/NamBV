'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Diensten',
    href: '/diensten',
    children: [
      { name: 'Totaalrenovatie', href: '/diensten/totaalrenovatie' },
      { name: 'Renovatie & Verbouwing', href: '/diensten/renovatie' },
      { name: 'Afwerking', href: '/diensten/afwerking' },
      { name: 'Technieken', href: '/diensten/technieken' },
    ],
  },
  { name: 'Duurzaam', href: '/duurzaam' },
  { name: 'Projecten', href: '/projecten' },
  { name: 'Aanpak', href: '/aanpak' },
  { name: 'Over Nam', href: '/over-nam' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <nav className="container-custom" aria-label="Global">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-display font-bold text-primary-700">
                Nam<span className="text-primary-500">Construction</span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
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

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors py-2"
                >
                  {item.name}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>
                {item.children && activeDropdown === item.name && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="bg-white rounded-xl shadow-lg border border-neutral-100 py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <a
              href="tel:+32123456789"
              className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
              +32 123 45 67 89
            </a>
            <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
              Gratis adviesgesprek
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-100">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-medium text-neutral-700 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-2 text-sm text-neutral-600 hover:text-primary-600"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-100">
              <Link
                href="/contact"
                className="btn-primary w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gratis adviesgesprek
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
