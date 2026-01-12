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
