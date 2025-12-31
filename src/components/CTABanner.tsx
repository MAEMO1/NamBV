import Link from 'next/link';
import { Phone, Calendar } from 'lucide-react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'dark';
}

export default function CTABanner({
  title = "Klaar om te starten met uw renovatieproject?",
  subtitle = "Plan een gratis en vrijblijvend adviesgesprek. We bespreken uw wensen en mogelijkheden.",
  variant = 'default'
}: CTABannerProps) {
  const isDark = variant === 'dark';

  return (
    <section className={`${isDark ? 'bg-primary-900' : 'bg-primary-50'} section-padding`}>
      <div className="container-custom text-center">
        <h2 className={`section-title mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          {title}
        </h2>
        <p className={`section-subtitle mx-auto mb-8 ${isDark ? 'text-primary-100' : 'text-neutral-600'}`}>
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className={isDark
              ? 'btn-primary bg-white text-primary-700 hover:bg-primary-50'
              : 'btn-primary'
            }
          >
            <Calendar className="h-5 w-5 mr-2" />
            Plan adviesgesprek
          </Link>
          <a
            href="tel:+32123456789"
            className={isDark
              ? 'btn-outline border-primary-300 text-white hover:bg-primary-800'
              : 'btn-outline'
            }
          >
            <Phone className="h-5 w-5 mr-2" />
            +32 123 45 67 89
          </a>
        </div>
      </div>
    </section>
  );
}
