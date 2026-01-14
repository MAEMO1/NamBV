import { db } from '@/lib/db'
import LegalPageLayout from '@/components/LegalPageLayout'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacyPage' })
  return {
    title: `${t('title')} | NAM Construction`,
    description: t('subtitle'),
  }
}

async function getPrivacyContent() {
  try {
    const setting = await db.setting.findUnique({
      where: { key: 'legal.privacyPolicy' },
      select: { value: true }
    })

    if (setting?.value) {
      return setting.value
    }
  } catch (error) {
    console.error('Error fetching privacy content:', error)
  }

  // Fallback content
  return `# Privacybeleid

## Inleiding

NAM BV (hierna "wij", "ons" of "NAM Construction") respecteert uw privacy en zet zich in voor de bescherming van uw persoonlijke gegevens. Dit privacybeleid informeert u over hoe wij omgaan met uw persoonsgegevens.

## Welke gegevens verzamelen wij?

Wij verzamelen de volgende gegevens:

- Contactgegevens (naam, e-mail, telefoonnummer, adres)
- Projectinformatie die u met ons deelt
- Technische gegevens (IP-adres, browsertype) voor websiteoptimalisatie

## Waarom verzamelen wij deze gegevens?

Wij gebruiken uw gegevens voor:

- Het opstellen en versturen van offertes
- Het inplannen van afspraken
- Communicatie over uw project
- Het verbeteren van onze dienstverlening

## Bewaartermijn

Wij bewaren uw gegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld, met inachtneming van wettelijke bewaartermijnen.

## Uw rechten

U heeft het recht om:

- Uw gegevens in te zien
- Uw gegevens te laten corrigeren
- Uw gegevens te laten verwijderen
- Bezwaar te maken tegen de verwerking

## Contact

Voor vragen over dit privacybeleid kunt u contact opnemen via info@namconstruction.be of +32 493 81 27 89.`
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacyPage')
  const content = await getPrivacyContent()

  return (
    <LegalPageLayout
      title={t('title')}
      subtitle={t('subtitle')}
      lastUpdated={t('lastUpdated')}
      content={content}
      icon="privacy"
    />
  )
}
