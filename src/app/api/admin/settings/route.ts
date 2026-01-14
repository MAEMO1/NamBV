import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'nam_admin_session'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session?.value
}

// Default settings
const defaultSettings: Record<string, { value: string; type: string; category: string; description: string }> = {
  // Contact info
  'contact.phone': { value: '+32 493 81 27 89', type: 'string', category: 'contact', description: 'Telefoonnummer' },
  'contact.email': { value: 'info@namconstruction.be', type: 'string', category: 'contact', description: 'E-mailadres' },
  'contact.address': { value: 'Gent, België', type: 'string', category: 'contact', description: 'Adres' },
  'contact.btw': { value: '', type: 'string', category: 'contact', description: 'BTW-nummer' },

  // Business info
  'business.name': { value: 'NAM Construction', type: 'string', category: 'general', description: 'Bedrijfsnaam' },
  'business.tagline': { value: 'Kwaliteit die je blijft voelen', type: 'string', category: 'general', description: 'Slogan' },
  'business.yearsExperience': { value: '10', type: 'number', category: 'general', description: 'Jaren ervaring' },
  'business.projectsCompleted': { value: '150', type: 'number', category: 'general', description: 'Afgeronde projecten' },

  // Social media
  'social.facebook': { value: '', type: 'string', category: 'social', description: 'Facebook URL' },
  'social.instagram': { value: '', type: 'string', category: 'social', description: 'Instagram URL' },
  'social.linkedin': { value: '', type: 'string', category: 'social', description: 'LinkedIn URL' },

  // Notifications
  'notifications.emailOnQuote': { value: 'true', type: 'boolean', category: 'notifications', description: 'E-mail bij nieuwe offerte' },
  'notifications.emailOnAppointment': { value: 'true', type: 'boolean', category: 'notifications', description: 'E-mail bij nieuwe afspraak' },
  'notifications.recipientEmail': { value: '', type: 'string', category: 'notifications', description: 'Ontvanger e-mailadres' },

  // SEO
  'seo.defaultTitle': { value: 'NAM Construction - Renovatie & Bouw in Gent', type: 'string', category: 'seo', description: 'Standaard paginatitel' },
  'seo.defaultDescription': { value: 'NAM Construction is uw partner voor totaalrenovatie, renovatie en afwerking in Gent en omgeving. Vraag een gratis offerte aan.', type: 'string', category: 'seo', description: 'Standaard meta beschrijving' },
  'seo.ogImage': { value: '/og-image.jpg', type: 'string', category: 'seo', description: 'Open Graph afbeelding' },

  // Legal - Dutch (NL)
  'legal.privacyPolicy.nl': { value: `# Privacybeleid

**Laatst bijgewerkt: januari 2025**

NAM BV (hierna "wij", "ons" of "NAM Construction") respecteert uw privacy en zet zich in voor de bescherming van uw persoonlijke gegevens.

## 1. Welke gegevens verzamelen wij?

Wij verzamelen de volgende gegevens:
- Contactgegevens (naam, e-mail, telefoonnummer, adres)
- Projectinformatie die u met ons deelt
- Technische gegevens (IP-adres, browsertype) voor websiteoptimalisatie

## 2. Waarom verzamelen wij deze gegevens?

Wij gebruiken uw gegevens voor:
- Het opstellen en versturen van offertes
- Het inplannen van afspraken
- Communicatie over uw project
- Het verbeteren van onze dienstverlening

## 3. Hoe lang bewaren wij uw gegevens?

Wij bewaren uw gegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld, met inachtneming van wettelijke bewaartermijnen.

## 4. Uw rechten

U heeft het recht om:
- Uw gegevens in te zien
- Uw gegevens te laten corrigeren
- Uw gegevens te laten verwijderen
- Bezwaar te maken tegen de verwerking

## 5. Contact

Voor vragen over dit privacybeleid kunt u contact opnemen via:
- E-mail: info@namconstruction.be
- Telefoon: +32 493 81 27 89

NAM BV
BTW: BE0792.212.559`, type: 'text', category: 'legal', description: 'Privacybeleid (Nederlands)' },

  'legal.termsConditions.nl': { value: `# Algemene Voorwaarden

**NAM BV - BTW BE0792.212.559**

## 1. Algemeen

Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en werkzaamheden van NAM BV.

## 2. Offertes

- Alle offertes zijn vrijblijvend en geldig gedurende 30 dagen
- Prijzen zijn exclusief BTW tenzij anders vermeld
- Wijzigingen in het werk kunnen leiden tot prijsaanpassingen

## 3. Uitvoering van werkzaamheden

- Wij streven ernaar alle werkzaamheden binnen de afgesproken termijn uit te voeren
- Vertragingen door overmacht of door de klant gevraagde wijzigingen kunnen leiden tot aangepaste termijnen
- De klant zorgt voor vrije toegang tot de werkplek

## 4. Betaling

- Facturen dienen binnen 14 dagen na factuurdatum te worden voldaan
- Bij niet-tijdige betaling zijn wij gerechtigd de wettelijke rente in rekening te brengen
- Bij grote projecten kan een betalingsregeling worden afgesproken

## 5. Garantie

- Wij bieden garantie op ons vakmanschap conform de wettelijke bepalingen
- De garantie is niet van toepassing bij oneigenlijk gebruik of wijzigingen door derden

## 6. Aansprakelijkheid

- Onze aansprakelijkheid is beperkt tot het bedrag dat door onze verzekering wordt gedekt
- Wij zijn niet aansprakelijk voor gevolgschade

## 7. Geschillen

Op deze voorwaarden is Belgisch recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechtbank in Gent.

## Contact

NAM BV
Zwijnaardsesteenweg 683
9000 Gent
info@namconstruction.be
+32 493 81 27 89`, type: 'text', category: 'legal', description: 'Algemene Voorwaarden (Nederlands)' },

  // Legal - French (FR)
  'legal.privacyPolicy.fr': { value: `# Politique de Confidentialité

**Dernière mise à jour : janvier 2025**

NAM BV (ci-après "nous" ou "NAM Construction") respecte votre vie privée et s'engage à protéger vos données personnelles.

## 1. Quelles données collectons-nous ?

Nous collectons les données suivantes :
- Coordonnées (nom, e-mail, numéro de téléphone, adresse)
- Informations sur le projet que vous partagez avec nous
- Données techniques (adresse IP, type de navigateur) pour l'optimisation du site web

## 2. Pourquoi collectons-nous ces données ?

Nous utilisons vos données pour :
- Établir et envoyer des devis
- Planifier des rendez-vous
- Communiquer sur votre projet
- Améliorer nos services

## 3. Combien de temps conservons-nous vos données ?

Nous ne conservons pas vos données plus longtemps que nécessaire aux fins pour lesquelles elles ont été collectées, en tenant compte des délais de conservation légaux.

## 4. Vos droits

Vous avez le droit de :
- Consulter vos données
- Faire corriger vos données
- Faire supprimer vos données
- Vous opposer au traitement

## 5. Contact

Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter via :
- E-mail : info@namconstruction.be
- Téléphone : +32 493 81 27 89

NAM BV
TVA : BE0792.212.559`, type: 'text', category: 'legal', description: 'Politique de Confidentialité (Français)' },

  'legal.termsConditions.fr': { value: `# Conditions Générales

**NAM BV - TVA BE0792.212.559**

## 1. Généralités

Ces conditions générales s'appliquent à tous les devis, contrats et travaux de NAM BV.

## 2. Devis

- Tous les devis sont sans engagement et valables 30 jours
- Les prix sont hors TVA sauf indication contraire
- Les modifications des travaux peuvent entraîner des ajustements de prix

## 3. Exécution des travaux

- Nous nous efforçons d'effectuer tous les travaux dans les délais convenus
- Les retards dus à des cas de force majeure ou à des modifications demandées par le client peuvent entraîner des délais ajustés
- Le client assure le libre accès au chantier

## 4. Paiement

- Les factures doivent être réglées dans les 14 jours suivant la date de facturation
- En cas de retard de paiement, nous sommes en droit de facturer les intérêts légaux
- Pour les grands projets, un plan de paiement peut être convenu

## 5. Garantie

- Nous offrons une garantie sur notre travail conformément aux dispositions légales
- La garantie ne s'applique pas en cas d'utilisation abusive ou de modifications par des tiers

## 6. Responsabilité

- Notre responsabilité est limitée au montant couvert par notre assurance
- Nous ne sommes pas responsables des dommages indirects

## 7. Litiges

Ces conditions sont soumises au droit belge. Les litiges seront soumis au tribunal compétent de Gand.

## Contact

NAM BV
Zwijnaardsesteenweg 683
9000 Gand
info@namconstruction.be
+32 493 81 27 89`, type: 'text', category: 'legal', description: 'Conditions Générales (Français)' },

  // Legal - English (EN)
  'legal.privacyPolicy.en': { value: `# Privacy Policy

**Last updated: January 2025**

NAM BV (hereinafter "we", "us" or "NAM Construction") respects your privacy and is committed to protecting your personal data.

## 1. What data do we collect?

We collect the following data:
- Contact details (name, email, phone number, address)
- Project information you share with us
- Technical data (IP address, browser type) for website optimization

## 2. Why do we collect this data?

We use your data for:
- Preparing and sending quotes
- Scheduling appointments
- Communication about your project
- Improving our services

## 3. How long do we keep your data?

We do not keep your data longer than necessary for the purposes for which it was collected, taking into account legal retention periods.

## 4. Your rights

You have the right to:
- Access your data
- Have your data corrected
- Have your data deleted
- Object to processing

## 5. Contact

For questions about this privacy policy, you can contact us via:
- Email: info@namconstruction.be
- Phone: +32 493 81 27 89

NAM BV
VAT: BE0792.212.559`, type: 'text', category: 'legal', description: 'Privacy Policy (English)' },

  'legal.termsConditions.en': { value: `# Terms and Conditions

**NAM BV - VAT BE0792.212.559**

## 1. General

These terms and conditions apply to all quotes, contracts and work by NAM BV.

## 2. Quotes

- All quotes are non-binding and valid for 30 days
- Prices are exclusive of VAT unless otherwise stated
- Changes to the work may result in price adjustments

## 3. Execution of work

- We strive to complete all work within the agreed timeframe
- Delays due to force majeure or client-requested changes may result in adjusted deadlines
- The client ensures free access to the work site

## 4. Payment

- Invoices must be paid within 14 days of the invoice date
- In case of late payment, we are entitled to charge statutory interest
- For large projects, a payment plan can be agreed upon

## 5. Warranty

- We offer warranty on our workmanship in accordance with legal provisions
- The warranty does not apply in case of improper use or modifications by third parties

## 6. Liability

- Our liability is limited to the amount covered by our insurance
- We are not liable for consequential damages

## 7. Disputes

These conditions are subject to Belgian law. Disputes will be submitted to the competent court in Ghent.

## Contact

NAM BV
Zwijnaardsesteenweg 683
9000 Ghent
info@namconstruction.be
+32 493 81 27 89`, type: 'text', category: 'legal', description: 'Terms and Conditions (English)' },
}

// GET - Get all settings or by category
export async function GET(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    // Get existing settings from database
    const dbSettings = await db.setting.findMany({
      where: category ? { category } : {},
    })

    // Merge with defaults
    const settingsMap: Record<string, { value: string; type: string; category: string; description: string }> = {}

    // First add defaults
    for (const [key, defaultValue] of Object.entries(defaultSettings)) {
      if (!category || defaultValue.category === category) {
        settingsMap[key] = defaultValue
      }
    }

    // Override with database values
    for (const setting of dbSettings) {
      settingsMap[setting.key] = {
        value: setting.value,
        type: setting.type,
        category: setting.category,
        description: setting.description || '',
      }
    }

    // Convert to array format
    const settings = Object.entries(settingsMap).map(([key, data]) => ({
      key,
      ...data,
    }))

    return NextResponse.json({ settings })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Kon instellingen niet laden' },
      { status: 500 }
    )
  }
}

// PUT - Update settings (batch)
export async function PUT(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { settings } = body

    if (!settings || !Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Ongeldige instellingen' },
        { status: 400 }
      )
    }

    // Update each setting
    for (const setting of settings) {
      const { key, value, type, category, description } = setting

      await db.setting.upsert({
        where: { key },
        create: {
          key,
          value: String(value),
          type: type || 'string',
          category: category || 'general',
          description,
        },
        update: {
          value: String(value),
          type: type || 'string',
          category: category || 'general',
          description,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Kon instellingen niet opslaan' },
      { status: 500 }
    )
  }
}
