import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendAppointmentConfirmation, sendAdminNotification } from '@/lib/email'

// Generate reference number for appointments
async function generateAppointmentReference(): Promise<string> {
  const year = new Date().getFullYear()
  const prefix = `AFR-${year}-`

  const lastAppointment = await db.appointment.findFirst({
    where: {
      referenceNumber: {
        startsWith: prefix
      }
    },
    orderBy: {
      referenceNumber: 'desc'
    },
    select: {
      referenceNumber: true
    }
  })

  let nextNumber = 1
  if (lastAppointment) {
    const lastNumber = parseInt(lastAppointment.referenceNumber.split('-')[2], 10)
    nextNumber = lastNumber + 1
  }

  return `${prefix}${nextNumber.toString().padStart(4, '0')}`
}

// POST /api/appointments - Create new appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      gemeente,
      selectedDate,
      selectedTime,
      projectType,
      propertyType,
      propertyAge,
      priorities,
      materialPreference,
      budget,
      timing,
      subsidyInterest,
      paymentSpread,
      motivation,
      message
    } = body

    // Validation
    if (!name || !email || !phone || !gemeente || !selectedDate || !selectedTime) {
      return NextResponse.json(
        { error: 'Alle verplichte velden moeten ingevuld zijn' },
        { status: 400 }
      )
    }

    // Parse the date
    const [year, month, day] = selectedDate.split('-').map(Number)
    const appointmentDate = new Date(year, month - 1, day)

    // Generate reference number
    const referenceNumber = await generateAppointmentReference()

    // Create appointment
    const appointment = await db.appointment.create({
      data: {
        referenceNumber,
        fullName: name,
        email,
        phone,
        gemeente,
        appointmentDate,
        appointmentTime: selectedTime,
        projectType: projectType || null,
        propertyType: propertyType || null,
        propertyAge: propertyAge || null,
        priorities: priorities || [],
        materialPreference: materialPreference || null,
        budget: budget || null,
        timing: timing || null,
        subsidyInterest: subsidyInterest || false,
        paymentSpread: paymentSpread || false,
        motivation: motivation || null,
        message: message || null
      }
    })

    // Prepare email data
    const emailData = {
      referenceNumber: appointment.referenceNumber,
      fullName: appointment.fullName,
      email: appointment.email,
      phone: appointment.phone,
      gemeente: appointment.gemeente,
      appointmentDate: appointment.appointmentDate.toISOString(),
      appointmentTime: appointment.appointmentTime,
      projectType: appointment.projectType || undefined,
      propertyType: appointment.propertyType || undefined,
      message: appointment.message || undefined,
    }

    // Send confirmation email to customer with iCal attachment (async, don't block response)
    sendAppointmentConfirmation(emailData).catch(err => {
      console.error('Failed to send appointment confirmation email:', err)
    })

    // Check admin notification settings and send if enabled
    try {
      const settings = await db.setting.findMany({
        where: {
          key: {
            in: ['notifications.emailOnAppointment', 'notifications.recipientEmail']
          }
        }
      })

      const emailOnAppointment = settings.find(s => s.key === 'notifications.emailOnAppointment')?.value !== 'false'
      const recipientEmail = settings.find(s => s.key === 'notifications.recipientEmail')?.value

      if (emailOnAppointment) {
        // Admin also gets iCal attachment for easy calendar sync
        sendAdminNotification('appointment', emailData, recipientEmail || undefined).catch(err => {
          console.error('Failed to send admin notification:', err)
        })
      }
    } catch (settingsError) {
      console.error('Error fetching notification settings:', settingsError)
      // Still send notification with default email
      sendAdminNotification('appointment', emailData).catch(err => {
        console.error('Failed to send admin notification:', err)
      })
    }

    return NextResponse.json({
      success: true,
      referenceNumber: appointment.referenceNumber,
      id: appointment.id
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het aanmaken van de afspraak' },
      { status: 500 }
    )
  }
}

// GET /api/appointments - List all appointments (admin)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (status && status !== 'all') {
      where.status = status
    }

    const [appointments, total] = await Promise.all([
      db.appointment.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.appointment.count({ where })
    ])

    return NextResponse.json({
      appointments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Kon afspraken niet ophalen' },
      { status: 500 }
    )
  }
}
