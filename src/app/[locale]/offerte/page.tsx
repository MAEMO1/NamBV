import OfferteFormulier from '@/components/offerte/OfferteFormulier'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'offertePage' })
  return {
    title: `${t('metaTitle')} | NAM Construction`,
    description: t('metaDescription'),
  }
}

export default function OffertePage() {
  return <OfferteFormulier />
}
