import { ArrowUpRight, Phone, Mail, MapPin, Instagram } from 'lucide-react';
import type { V2Locale } from '@/lib/v2/locale';
import { getV2UiCopy } from '@/lib/v2/locale';
import { Link } from '@/i18n/routing';
import Logo from '@/components/Logo';

const footerTaglines: Record<V2Locale, string> = {
  nl: 'Vakkundige renovatie in Gent met oog voor detail en duurzaamheid.',
  fr: 'Rénovation experte à Gand avec attention aux détails et durabilité.',
  en: 'Expert renovation in Ghent with attention to detail and sustainability.',
};

export default function V2Footer({
  locale,
  company,
}: {
  locale: V2Locale;
  company: Record<string, unknown>;
}) {
  const copy = getV2UiCopy(locale);
  const phone = String(company.phone ?? '');
  const email = String(company.email ?? '');
  const address = String(company.address ?? '');
  const companyName = String(company.name ?? 'Nam Construction');

  return (
    <footer className="bg-noir-950 text-white">
      {/* Main Footer */}
      <div className="container-wide py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand & CTA */}
          <div className="lg:col-span-5">
            <Link href="/" locale={locale} className="inline-block mb-8">
              <Logo color="light" showTagline />
            </Link>

            <p className="text-noir-400 mb-8 max-w-sm leading-relaxed">
              {footerTaglines[locale]}
            </p>

            <Link
              href="/offerte"
              locale={locale}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent-600 text-white font-semibold rounded-full hover:bg-accent-500 transition-all duration-300"
            >
              {copy.common.getQuote}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-6">
              {copy.nav.services}
            </h3>
            <ul className="space-y-4">
              {[
                { href: '/diensten/totaalrenovatie' as const, label: 'Totaalrenovatie' },
                { href: '/diensten/renovatie' as const, label: 'Renovatie' },
                { href: '/diensten/afwerking' as const, label: 'Afwerking' },
                { href: '/diensten/technieken' as const, label: 'Technieken' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    locale={locale}
                    className="text-noir-400 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-6">
              {locale === 'fr' ? 'Entreprise' : locale === 'en' ? 'Company' : 'Bedrijf'}
            </h3>
            <ul className="space-y-4">
              {[
                { href: '/' as const, label: copy.nav.home },
                { href: '/aanpak' as const, label: copy.nav.approach },
                { href: '/projecten' as const, label: copy.nav.projects },
                { href: '/contact' as const, label: copy.nav.contact },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    locale={locale}
                    className="text-noir-400 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-6">
              {copy.nav.contact}
            </h3>
            <div className="space-y-4">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-noir-400 hover:text-white transition-colors duration-300"
                >
                  <Phone className="h-4 w-4 text-accent-400" />
                  {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-noir-400 hover:text-white transition-colors duration-300"
                >
                  <Mail className="h-4 w-4 text-accent-400" />
                  {email}
                </a>
              )}
              {address && (
                <div className="flex items-start gap-3 text-noir-400">
                  <MapPin className="h-4 w-4 text-accent-400 mt-0.5 flex-shrink-0" />
                  <span>{address}</span>
                </div>
              )}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-8">
              {phone && (
                <a
                  href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-noir-700 text-noir-400 hover:bg-accent-600 hover:border-accent-600 hover:text-white transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <Phone className="h-4 w-4" />
                </a>
              )}
              <a
                href="https://www.instagram.com/namconstruction.be/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-noir-700 text-noir-400 hover:bg-accent-600 hover:border-accent-600 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-noir-700 text-noir-400 hover:bg-accent-600 hover:border-accent-600 hover:text-white transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-noir-800">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-noir-400">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <span>&copy; {new Date().getFullYear()} {companyName}</span>
              <span className="hidden md:inline">|</span>
              <span>BTW: BE0792.212.559</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/algemene-voorwaarden" locale={locale} className="hover:text-white transition-colors">
                {locale === 'fr' ? 'Conditions générales' : locale === 'en' ? 'Terms & Conditions' : 'Algemene voorwaarden'}
              </Link>
              <Link href="/privacy" locale={locale} className="hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
