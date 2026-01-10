import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight, Instagram } from 'lucide-react';

const navigation = {
  diensten: [
    { name: 'Totaalrenovatie', href: '/diensten/totaalrenovatie' },
    { name: 'Renovatie & Verbouwing', href: '/diensten/renovatie' },
    { name: 'Afwerking', href: '/diensten/afwerking' },
    { name: 'Technieken', href: '/diensten/technieken' },
  ],
  bedrijf: [
    { name: 'Projecten', href: '/projecten' },
    { name: 'Contact', href: '/contact' },
    { name: 'Offerte aanvragen', href: '/offerte' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-noir-950 text-white">
      {/* Main Footer */}
      <div className="container-wide py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand & CTA */}
          <div className="lg:col-span-5">
            {/* Logo */}
            <Link href="/" className="inline-block mb-8">
              <div className="flex items-center gap-1">
                <span className="text-3xl font-display font-semibold tracking-tight text-white">
                  NAM
                </span>
                <span className="text-3xl font-display font-normal tracking-tight text-white/40">
                  CONSTRUCTION
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent-500">
                Renovatie & Afwerking
              </span>
            </Link>

            <p className="text-noir-400 mb-8 max-w-sm leading-relaxed">
              Vakkundige renovatie in Gent met oog voor detail en respect voor uw woning.
              Van totaalrenovatie tot afwerking.
            </p>

            {/* CTA Button */}
            <Link
              href="/offerte"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-500 text-white font-medium uppercase tracking-wide hover:bg-accent-400 transition-all duration-500"
            >
              Offerte aanvragen
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-6">
              Diensten
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
              Bedrijf
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
              Contact
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
                Algemene Voorwaarden
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
