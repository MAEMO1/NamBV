import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Instagram } from 'lucide-react';
import Logo from './Logo';

const navigation = {
  diensten: [
    { name: 'Totaalrenovatie', href: '/diensten/totaalrenovatie' },
    { name: 'Renovatie & Verbouwing', href: '/diensten/renovatie' },
    { name: 'Afwerking', href: '/diensten/afwerking' },
    { name: 'Technieken', href: '/diensten/technieken' },
  ],
  bedrijf: [
    { name: 'Over ons', href: '/over-nam' },
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
    <footer className="bg-forest-950 text-cream-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-forest-900/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-800/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* CTA Section */}
      <div className="relative border-b border-forest-800">
        <div className="container-custom py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-display-sm font-display text-cream-50 mb-4">
                Klaar voor uw renovatieproject?
              </h2>
              <p className="text-forest-300 text-lg">
                Plan een gratis adviesgesprek en ontdek hoe we uw woning kunnen transformeren.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 rounded-full font-medium transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start uw project
              <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand & contact */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-2xl bg-forest-700 flex items-center justify-center group-hover:bg-forest-600 transition-colors duration-300">
                <Logo size={30} color="#faf9f7" />
              </div>
              <div>
                <span className="text-2xl font-display font-semibold text-cream-50">Nam</span>
                <span className="text-2xl font-display font-normal text-forest-300">Construction</span>
              </div>
            </Link>
            <p className="text-forest-300 mb-8 max-w-md leading-relaxed">
              Duurzaam renoveren in Gent, met kwaliteitsafwerking en heldere opvolging.
              Circulair waar het kan, perfect afgewerkt waar het moet.
            </p>
            <div className="space-y-4">
              <a
                href="tel:+32493812789"
                className="flex items-center gap-4 text-forest-200 hover:text-cream-50 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center group-hover:bg-forest-700 transition-colors duration-300">
                  <Phone className="h-5 w-5 text-terracotta-400" />
                </div>
                +32 (0) 493 81 27 89
              </a>
              <a
                href="mailto:info@namconstruction.be"
                className="flex items-center gap-4 text-forest-200 hover:text-cream-50 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center group-hover:bg-forest-700 transition-colors duration-300">
                  <Mail className="h-5 w-5 text-terracotta-400" />
                </div>
                info@namconstruction.be
              </a>
              <div className="flex items-center gap-4 text-forest-200">
                <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-terracotta-400" />
                </div>
                Zwijnaardsesteenweg 683, 9000 Gent
              </div>
              <div className="flex items-center gap-4 text-forest-200">
                <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-terracotta-400" />
                </div>
                Ma - Vr: 8:00 - 18:00
              </div>
            </div>
          </div>

          {/* Diensten */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-cream-50 uppercase tracking-wider mb-6">
              Diensten
            </h3>
            <ul className="space-y-4">
              {navigation.diensten.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-forest-300 hover:text-cream-50 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bedrijf */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-cream-50 uppercase tracking-wider mb-6">
              Bedrijf
            </h3>
            <ul className="space-y-4">
              {navigation.bedrijf.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-forest-300 hover:text-cream-50 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Meer info */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-cream-50 uppercase tracking-wider mb-6">
              Meer info
            </h3>
            <ul className="space-y-4">
              {navigation.meer.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-forest-300 hover:text-cream-50 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="mt-8 pt-8 border-t border-forest-800">
              <p className="text-sm text-forest-400 mb-4">Volg ons</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/32493812789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-800 text-forest-300 hover:bg-forest-700 hover:text-cream-50 transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/namconstruction.be/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-800 text-forest-300 hover:bg-forest-700 hover:text-cream-50 transition-all duration-300"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-forest-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-sm text-forest-500">
              &copy; {new Date().getFullYear()} NAM BV. Alle rechten voorbehouden.
            </p>
            <p className="text-sm text-forest-500">
              BTW: BE0792.212.559
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-forest-500">
              <Link href="/algemene-voorwaarden" className="hover:text-cream-50 transition-colors">
                Algemene Voorwaarden
              </Link>
              <Link href="/privacy" className="hover:text-cream-50 transition-colors">
                Privacyverklaring
              </Link>
              <Link href="/cookies" className="hover:text-cream-50 transition-colors">
                Cookiebeleid
              </Link>
            </div>
            <p className="text-sm text-forest-600">
              NAM BV - voor bouwen zonder zorgen
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
