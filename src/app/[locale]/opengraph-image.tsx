import { ImageResponse } from 'next/og';
import { routing, type Locale } from '@/i18n/routing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Nam Construction — Vakkundige renovatie in Gent';

const TAGLINES: Record<Locale, string> = {
  nl: 'Vakkundige renovatie in Gent',
  fr: 'Rénovation experte à Gand',
  en: 'Expert renovation in Ghent',
};

type Props = { params: Promise<{ locale: string }> };

export default async function OpengraphImage({ params }: Props) {
  const { locale } = await params;
  const safeLocale: Locale = (routing.locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : 'nl';
  const tagline = TAGLINES[safeLocale];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0b0b0c 0%, #1a1a1c 60%, #2a2a2e 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              background: '#d6a85a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 42,
              fontWeight: 800,
              color: '#0b0b0c',
              letterSpacing: -1,
            }}
          >
            N
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Nam Construction
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#d6a85a',
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            namconstruction.be
          </div>
        </div>
      </div>
    ),
    size,
  );
}
