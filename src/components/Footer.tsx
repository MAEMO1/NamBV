import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

const navigation = {
  diensten: [
    { name: 'Totaalrenovatie', href: '/diensten/totaalrenovatie' },
    { name: 'Renovatie & Verbouwing', href: '/diensten/renovatie' },
    { name: 'Afwerking', href: '/diensten/afwerking' },
    { name: 'Technieken', href: '/diensten/technieken' },
  ],
  bedrijf: [
    { name: 'Over Nam', href: '/over-nam' },
    { name: 'Onze Aanpak', href: '/aanpak' },
    { name: 'Projecten', href: '/projecten' },
    { name: 'Contact', href: '/contact' },
  ],
  meer: [
    { name: 'Duurzaam & Ecologisch', href: '/duurzaam' },
    { name: 'Premies & Attesten', href: '/duurzaam#premies' },
    { name: 'FAQ', href: '/aanpak#faq' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand & contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-display font-bold text-white">
                Nam<span className="text-primary-400">Construction</span>
              </span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-sm">
              Duurzaam renoveren in Gent, met kwaliteitsafwerking en heldere opvolging.
              Circulair waar het kan, perfect afgewerkt waar het moet.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+32123456789"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5 text-primary-400" />
                +32 123 45 67 89
              </a>
              <a
                href="mailto:info@namconstruction.be"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 text-primary-400" />
                info@namconstruction.be
              </a>
              <div className="flex items-center gap-3 text-neutral-300">
                <MapPin className="h-5 w-5 text-primary-400" />
                Gent en omstreken
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Clock className="h-5 w-5 text-primary-400" />
                Ma - Vr: 8:00 - 18:00
              </div>
            </div>
          </div>

          {/* Diensten */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Diensten
            </h3>
            <ul className="space-y-3">
              {navigation.diensten.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Bedrijf
            </h3>
            <ul className="space-y-3">
              {navigation.bedrijf.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Meer */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Meer info
            </h3>
            <ul className="space-y-3">
              {navigation.meer.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Nam Construction. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
