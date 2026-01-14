import { db } from '@/lib/db'
import LegalPageLayout from '@/components/LegalPageLayout'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'termsPage' })
  return {
    title: `${t('title')} | NAM Construction`,
    description: t('subtitle'),
  }
}

async function getTermsContent(locale: string) {
  // Try to get locale-specific content first
  const localeKey = `legal.termsConditions.${locale}`

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
        where: { key: 'legal.termsConditions.nl' },
        select: { value: true }
      })
      if (nlSetting?.value) {
        return nlSetting.value
      }
    }
  } catch (error) {
    console.error('Error fetching terms content:', error)
  }

  // Fallback content based on locale
  const fallbackContent: Record<string, string> = {
    nl: `# Algemene Voorwaarden

## Algemeen

Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en werkzaamheden van NAM BV (BTW BE0792.212.559).

## Offertes

Alle offertes zijn vrijblijvend en geldig gedurende 30 dagen. Prijzen zijn exclusief BTW tenzij anders vermeld.

## Contact

Voor vragen over deze voorwaarden kunt u contact opnemen via info@namconstruction.be of +32 493 81 27 89.`,
    fr: `# Conditions Générales

## Généralités

Ces conditions générales s'appliquent à tous les devis, contrats et travaux de NAM BV (TVA BE0792.212.559).

## Devis

Tous les devis sont sans engagement et valables 30 jours. Les prix sont hors TVA sauf indication contraire.

## Contact

Pour toute question, contactez-nous via info@namconstruction.be ou +32 493 81 27 89.`,
    en: `# Terms and Conditions

## General

These terms and conditions apply to all quotes, contracts and work by NAM BV (VAT BE0792.212.559).

## Quotes

All quotes are non-binding and valid for 30 days. Prices are exclusive of VAT unless otherwise stated.

## Contact

For questions about these terms, contact us via info@namconstruction.be or +32 493 81 27 89.`
  }

  return fallbackContent[locale] || fallbackContent['nl']
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('termsPage')
  const content = await getTermsContent(locale)

  return (
    <LegalPageLayout
      title={t('title')}
      subtitle={t('subtitle')}
      lastUpdated={t('lastUpdated')}
      content={content}
      icon="terms"
    />
  )
}
