'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Phone, Mail, MapPin, ArrowUpRight, Instagram } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations('footer');

  const navigation = {
    diensten: [
      { name: t('services.fullRenovation'), href: '/diensten/totaalrenovatie' as const },
      { name: t('services.renovation'), href: '/diensten/renovatie' as const },
      { name: t('services.finishing'), href: '/diensten/afwerking' as const },
      { name: t('services.technical'), href: '/diensten/technieken' as const },
    ],
    bedrijf: [
      { name: t('company.projects'), href: '/projecten' as const },
      { name: t('company.contact'), href: '/contact' as const },
      { name: t('company.quote'), href: '/offerte' as const },
    ],
  };

  // Don't render footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-noir-950 text-white">
      {/* Main Footer */}
      <div className="container-wide py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand & CTA */}
          <div className="lg:col-span-5">
            {/* Logo */}
            <Link href="/" className="inline-block mb-8">
              <Logo color="light" showTagline={true} />
            </Link>

            <p className="text-noir-400 mb-8 max-w-sm leading-relaxed">
              {t('tagline')}
            </p>

            {/* CTA Button */}
            <Link
              href="/offerte"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-500 text-white font-medium uppercase tracking-wide hover:bg-accent-400 transition-all duration-500"
            >
              {t('ctaButton')}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-6">
              {t('servicesTitle')}
            </h3>
            <ul className="space-y-4">
              {navigation.diensten.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-noir-400 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-6">
              {t('companyTitle')}
            </h3>
            <ul className="space-y-4">
              {navigation.bedrijf.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-noir-400 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-6">
              {t('contactTitle')}
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+32493812789"
                className="flex items-center gap-3 text-noir-400 hover:text-white transition-colors duration-300"
              >
                <Phone className="h-4 w-4 text-accent-500" />
                +32 493 81 27 89
              </a>
              <a
                href="mailto:info@namconstruction.be"
                className="flex items-center gap-3 text-noir-400 hover:text-white transition-colors duration-300"
              >
                <Mail className="h-4 w-4 text-accent-500" />
                info@namconstruction.be
              </a>
              <div className="flex items-start gap-3 text-noir-400">
                <MapPin className="h-4 w-4 text-accent-500 mt-0.5 flex-shrink-0" />
                <span>
                  Zwijnaardsesteenweg 683<br />
                  9000 Gent
                </span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://wa.me/32493812789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-noir-700 text-noir-400 hover:bg-accent-500 hover:border-accent-500 hover:text-white transition-all duration-300"
                aria-label="WhatsApp"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/namconstruction.be/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-noir-700 text-noir-400 hover:bg-accent-500 hover:border-accent-500 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@namconstruction.be"
                className="w-10 h-10 flex items-center justify-center border border-noir-700 text-noir-400 hover:bg-accent-500 hover:border-accent-500 hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-noir-800">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-noir-500">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <span>&copy; {new Date().getFullYear()} NAM BV</span>
              <span className="hidden md:inline">|</span>
              <span>BTW: BE0792.212.559</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/algemene-voorwaarden" className="hover:text-white transition-colors">
                {t('termsLink')}
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                {t('privacyLink')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
