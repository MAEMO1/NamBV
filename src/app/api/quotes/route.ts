import { NextRequest, NextResponse } from 'next/server'
import { db, generateReferenceNumber } from '@/lib/db'
import { QuoteRequestInputSchema, budgetRangeLabels } from '@/lib/validations/quote'
import { Prisma } from '@prisma/client'
import { sendQuoteConfirmation, sendAdminNotification } from '@/lib/email'

// POST /api/quotes - Submit a new quote request (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = QuoteRequestInputSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validatie mislukt',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Generate reference number
    const referenceNumber = await generateReferenceNumber()

    // Create quote request with services
    const quote = await db.quoteRequest.create({
      data: {
        referenceNumber,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        postalCode: data.postalCode,
        city: data.city,
        streetAddress: data.streetAddress,
        propertyTypeId: data.propertyTypeId,
        description: data.description,
        preferredStart: data.preferredStart,
        budgetRange: data.budgetRange,
        gdprConsent: data.gdprConsent,
        services: {
          create: data.serviceTypeIds.map(serviceTypeId => ({
            serviceTypeId
          }))
        }
      },
      include: {
        services: {
          include: {
            serviceType: true
          }
        },
        propertyType: true
      }
    })

    // Prepare email data
    const emailData = {
      referenceNumber: quote.referenceNumber,
      fullName: quote.fullName,
      email: quote.email,
      phone: quote.phone,
      postalCode: quote.postalCode,
      city: quote.city || undefined,
      propertyType: quote.propertyType?.name,
      services: quote.services.map(s => s.serviceType.name),
      description: quote.description,
      budgetRange: quote.budgetRange ? budgetRangeLabels[quote.budgetRange] : undefined,
    }

    // Send confirmation email to customer (async, don't block response)
    sendQuoteConfirmation(emailData).catch(err => {
      console.error('Failed to send quote confirmation email:', err)
    })

    // Check admin notification settings and send if enabled
    try {
      const settings = await db.setting.findMany({
        where: {
          key: {
            in: ['notifications.emailOnQuote', 'notifications.recipientEmail']
          }
        }
      })

      const emailOnQuote = settings.find(s => s.key === 'notifications.emailOnQuote')?.value !== 'false'
      const recipientEmail = settings.find(s => s.key === 'notifications.recipientEmail')?.value

      if (emailOnQuote) {
        sendAdminNotification('quote', emailData, recipientEmail || undefined).catch(err => {
          console.error('Failed to send admin notification:', err)
        })
      }
    } catch (settingsError) {
      console.error('Error fetching notification settings:', settingsError)
      // Still send notification with default email
      sendAdminNotification('quote', emailData).catch(err => {
        console.error('Failed to send admin notification:', err)
      })
    }

    return NextResponse.json(
      {
        success: true,
        referenceNumber: quote.referenceNumber,
        message: 'Uw aanvraag is succesvol ontvangen. We nemen binnen 24 uur contact met u op.'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Quote submission error:', error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Er is een conflict opgetreden. Probeer het opnieuw.' },
          { status: 409 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Er is een fout opgetreden. Probeer het later opnieuw.' },
      { status: 500 }
    )
  }
}

// GET /api/quotes - Get service types and property types for the form (public)
export async function GET() {
  try {
    const [serviceTypes, propertyTypes] = await Promise.all([
      db.serviceType.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
          description: true
        }
      }),
      db.propertyType.findMany({
        orderBy: { sortOrder: 'asc' },
        select: {
          id: true,
          name: true,
          slug: true
        }
      })
    ])

    return NextResponse.json({
      serviceTypes,
      propertyTypes
    })
  } catch (error) {
    console.error('Error fetching form data:', error)
    return NextResponse.json(
      { error: 'Kon gegevens niet ophalen' },
      { status: 500 }
    )
  }
}
