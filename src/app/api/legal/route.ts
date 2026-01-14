import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Default legal content (fallback if not in database)
const defaultLegalContent = {
  privacyPolicy: `# Privacybeleid

**Laatst bijgewerkt: januari 2025**

NAM BV respecteert uw privacy en zet zich in voor de bescherming van uw persoonlijke gegevens.

## 1. Welke gegevens verzamelen wij?

Wij verzamelen de volgende gegevens:
- Contactgegevens (naam, e-mail, telefoonnummer, adres)
- Projectinformatie die u met ons deelt
- Technische gegevens (IP-adres, browsertype) voor websiteoptimalisatie

## 2. Contact

Voor vragen over dit privacybeleid kunt u contact opnemen via info@namconstruction.be`,

  termsConditions: `# Algemene Voorwaarden

**NAM BV - BTW BE0792.212.559**

## 1. Algemeen

Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en werkzaamheden van NAM BV.

## Contact

NAM BV
info@namconstruction.be
+32 493 81 27 89`
}

// GET - Get legal content (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'privacy' or 'terms'

    const key = type === 'terms' ? 'legal.termsConditions' : 'legal.privacyPolicy'
    const defaultValue = type === 'terms' ? defaultLegalContent.termsConditions : defaultLegalContent.privacyPolicy

    // Try to get from database
    const setting = await db.setting.findUnique({
      where: { key },
      select: { value: true }
    })

    return NextResponse.json({
      content: setting?.value || defaultValue
    })
  } catch (error) {
    console.error('Error fetching legal content:', error)
    return NextResponse.json(
      { error: 'Kon inhoud niet laden' },
      { status: 500 }
    )
  }
}
