import { isV2Locale } from '@/lib/v2/locale';
import V2AppointmentForm from '@/components/public/AppointmentForm';

const trustSignals = {
  nl: [
    { icon: 'Calendar' as const, text: 'Kies uw ideale datum en tijdstip' },
    { icon: 'Clock' as const, text: 'Consultatie van 30\u201345 minuten' },
    { icon: 'Shield' as const, text: 'Gratis en vrijblijvend' },
    { icon: 'Mail' as const, text: 'Bevestiging per e-mail' },
  ],
  fr: [
    { icon: 'Calendar' as const, text: 'Choisissez votre date et heure' },
    { icon: 'Clock' as const, text: 'Consultation de 30\u201345 minutes' },
    { icon: 'Shield' as const, text: 'Gratuit et sans engagement' },
    { icon: 'Mail' as const, text: 'Confirmation par e-mail' },
  ],
  en: [
    { icon: 'Calendar' as const, text: 'Choose your ideal date and time' },
    { icon: 'Clock' as const, text: '30\u201345 minute consultation' },
    { icon: 'Shield' as const, text: 'Free and no obligation' },
    { icon: 'Mail' as const, text: 'Email confirmation' },
  ],
};

export default async function PublicAppointmentPage({
  locale,
}: {
  locale: string;
}) {
  if (!isV2Locale(locale)) {
    return null;
  }

  const signals = trustSignals[locale];

  return (
    <section className="relative min-h-screen bg-white pt-20">
      {/* Full-page immersive wizard */}
      <V2AppointmentForm locale={locale} trustSignals={signals} />
    </section>
  );
}
