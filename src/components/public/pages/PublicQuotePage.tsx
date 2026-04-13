import { Clock, Shield, MessageSquare } from 'lucide-react';
import { getV2QuoteFormOptions } from '@/lib/v2/public-data';
import { getV2UiCopy, isV2Locale } from '@/lib/v2/locale';
import V2QuoteForm from '@/components/public/QuoteForm';

const trustSignals = {
  nl: [
    { icon: Clock, text: 'Reactie binnen 24 uur' },
    { icon: Shield, text: 'Vrijblijvende offerte' },
    { icon: MessageSquare, text: 'Persoonlijk adviesgesprek' },
  ],
  fr: [
    { icon: Clock, text: 'R\u00e9ponse sous 24 heures' },
    { icon: Shield, text: 'Devis sans engagement' },
    { icon: MessageSquare, text: 'Consultation personnelle' },
  ],
  en: [
    { icon: Clock, text: 'Response within 24 hours' },
    { icon: Shield, text: 'No-obligation quote' },
    { icon: MessageSquare, text: 'Personal consultation' },
  ],
};

export default async function PublicQuotePage({
  locale,
}: {
  locale: string;
}) {
  if (!isV2Locale(locale)) {
    return null;
  }

  const formOptions = await getV2QuoteFormOptions();
  const copy = getV2UiCopy(locale);
  const signals = trustSignals[locale];

  return (
    <section className="relative min-h-screen bg-white pt-20">
      {/* Immersive heading */}
      <div className="flex flex-col items-center px-6 pt-12 text-center">
        <h1 className="text-display-lg font-display font-bold italic text-noir-900">
          {copy.quote.title}
        </h1>
        <p className="mt-3 text-lg text-noir-500">
          {copy.quote.description}
        </p>

        {/* Trust signals strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-noir-500">
          {signals.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <s.icon className="h-3.5 w-3.5" />
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <V2QuoteForm locale={locale} serviceTypes={formOptions.serviceTypes} propertyTypes={formOptions.propertyTypes} />
    </section>
  );
}
