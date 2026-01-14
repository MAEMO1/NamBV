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

async function getPrivacyContent(locale: string) {
  // Try to get locale-specific content first
  const localeKey = `legal.privacyPolicy.${locale}`

  try {
    const setting = await db.setting.findUnique({
      where: { key: localeKey },
      select: { value: true }
    })

    if (setting?.value) {
      return setting.value
    }

    // Fallback to Dutch if locale-specific content not found
    if (locale !== 'nl') {
      const nlSetting = await db.setting.findUnique({
        where: { key: 'legal.privacyPolicy.nl' },
        select: { value: true }
      })
      if (nlSetting?.value) {
        return nlSetting.value
      }
    }
  } catch (error) {
    console.error('Error fetching privacy content:', error)
  }

  // Fallback content based on locale
  const fallbackContent: Record<string, string> = {
    nl: `# Privacybeleid

## Inleiding

NAM BV (hierna "wij", "ons" of "NAM Construction") respecteert uw privacy en zet zich in voor de bescherming van uw persoonlijke gegevens.

## Welke gegevens verzamelen wij?

Wij verzamelen contactgegevens, projectinformatie en technische gegevens voor websiteoptimalisatie.

## Contact

Voor vragen over dit privacybeleid kunt u contact opnemen via info@namconstruction.be of +32 493 81 27 89.`,
    fr: `# Politique de Confidentialité

## Introduction

NAM BV (ci-après "nous" ou "NAM Construction") respecte votre vie privée et s'engage à protéger vos données personnelles.

## Quelles données collectons-nous ?

Nous collectons des coordonnées, des informations sur le projet et des données techniques pour l'optimisation du site web.

## Contact

Pour toute question, contactez-nous via info@namconstruction.be ou +32 493 81 27 89.`,
    en: `# Privacy Policy

## Introduction

NAM BV (hereinafter "we" or "NAM Construction") respects your privacy and is committed to protecting your personal data.

## What data do we collect?

We collect contact details, project information and technical data for website optimization.

## Contact

For questions about this privacy policy, contact us via info@namconstruction.be or +32 493 81 27 89.`
  }

  return fallbackContent[locale] || fallbackContent['nl']
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('privacyPage')
  const content = await getPrivacyContent(locale)

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
