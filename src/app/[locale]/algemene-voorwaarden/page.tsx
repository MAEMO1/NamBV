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

async function getTermsContent() {
  try {
    const setting = await db.setting.findUnique({
      where: { key: 'legal.termsConditions' },
      select: { value: true }
    })

    if (setting?.value) {
      return setting.value
    }
  } catch (error) {
    console.error('Error fetching terms content:', error)
  }

  // Fallback content
  return `# Algemene Voorwaarden

## Algemeen

Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en werkzaamheden van NAM BV (BTW BE0792.212.559).

## Offertes

Alle offertes zijn vrijblijvend en geldig gedurende 30 dagen. Prijzen zijn exclusief BTW tenzij anders vermeld. Wijzigingen in het werk kunnen leiden tot prijsaanpassingen.

## Uitvoering van werkzaamheden

Wij streven ernaar alle werkzaamheden binnen de afgesproken termijn uit te voeren. Vertragingen door overmacht of door de klant gevraagde wijzigingen kunnen leiden tot aangepaste termijnen. De klant zorgt voor vrije toegang tot de werkplek.

## Betaling

- Facturen dienen binnen 14 dagen na factuurdatum te worden voldaan
- Bij niet-tijdige betaling zijn wij gerechtigd de wettelijke rente in rekening te brengen
- Bij grote projecten kan een betalingsregeling worden afgesproken

## Garantie

Wij bieden garantie op ons vakmanschap conform de wettelijke bepalingen. De garantie is niet van toepassing bij oneigenlijk gebruik of wijzigingen door derden.

## Aansprakelijkheid

Onze aansprakelijkheid is beperkt tot het bedrag dat door onze verzekering wordt gedekt. Wij zijn niet aansprakelijk voor gevolgschade.

## Geschillen

Op deze voorwaarden is Belgisch recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechtbank in Gent.

## Contact

Voor vragen over deze voorwaarden kunt u contact opnemen via info@namconstruction.be of +32 493 81 27 89.`
}

export default async function TermsPage() {
  const t = await getTranslations('termsPage')
  const content = await getTermsContent()

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
