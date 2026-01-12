import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'nam_admin_session'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session?.value
}

// Default availability (Mon-Fri, standard business hours)
const defaultAvailability = [
  { dayOfWeek: 0, timeSlots: [], isActive: false }, // Sunday - closed
  { dayOfWeek: 1, timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'], isActive: true }, // Monday
  { dayOfWeek: 2, timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'], isActive: true }, // Tuesday
  { dayOfWeek: 3, timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'], isActive: true }, // Wednesday
  { dayOfWeek: 4, timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'], isActive: true }, // Thursday
  { dayOfWeek: 5, timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], isActive: true }, // Friday
  { dayOfWeek: 6, timeSlots: [], isActive: false }, // Saturday - closed
]

// GET /api/admin/availability - Get availability settings
export async function GET() {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    // Get availability from database
    const availability = await db.appointmentAvailability.findMany({
      orderBy: { dayOfWeek: 'asc' }
    })

    // Get blocked dates
    const blockedDates = await db.appointmentBlockedDate.findMany({
      where: {
        date: {
          gte: new Date()
        }
      },
      orderBy: { date: 'asc' }
    })

    // If no availability configured, return defaults
    if (availability.length === 0) {
      return NextResponse.json({
        availability: defaultAvailability,
        blockedDates: [],
        isDefault: true
      })
    }

    return NextResponse.json({
      availability: availability.map(a => ({
        dayOfWeek: a.dayOfWeek,
        timeSlots: a.timeSlots,
        isActive: a.isActive
      })),
      blockedDates: blockedDates.map(b => ({
        id: b.id,
        date: b.date.toISOString().split('T')[0],
        blockedTimes: b.blockedTimes,
        reason: b.reason
      })),
      isDefault: false
    })
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Kon beschikbaarheid niet laden' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/availability - Update availability settings
export async function PUT(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { availability } = body

    if (!availability || !Array.isArray(availability)) {
      return NextResponse.json(
        { error: 'Ongeldige beschikbaarheidsgegevens' },
        { status: 400 }
      )
    }

    // Validate availability data
    for (const slot of availability) {
      if (typeof slot.dayOfWeek !== 'number' || slot.dayOfWeek < 0 || slot.dayOfWeek > 6) {
        return NextResponse.json(
          { error: 'Ongeldige dag van de week' },
          { status: 400 }
        )
      }
      if (!Array.isArray(slot.timeSlots)) {
        return NextResponse.json(
          { error: 'Ongeldige tijdsloten' },
          { status: 400 }
        )
      }
    }

    // Upsert each day's availability
    for (const slot of availability) {
      await db.appointmentAvailability.upsert({
        where: { dayOfWeek: slot.dayOfWeek },
        create: {
          dayOfWeek: slot.dayOfWeek,
          timeSlots: slot.timeSlots,
          isActive: slot.isActive ?? true
        },
        update: {
          timeSlots: slot.timeSlots,
          isActive: slot.isActive ?? true
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating availability:', error)
    return NextResponse.json(
      { error: 'Kon beschikbaarheid niet opslaan' },
      { status: 500 }
    )
  }
}

// POST /api/admin/availability - Add blocked date
export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { date, blockedTimes, reason } = body

    if (!date) {
      return NextResponse.json(
        { error: 'Datum is verplicht' },
        { status: 400 }
      )
    }

    const blockedDate = await db.appointmentBlockedDate.upsert({
      where: { date: new Date(date) },
      create: {
        date: new Date(date),
        blockedTimes: blockedTimes || [],
        reason: reason || null
      },
      update: {
        blockedTimes: blockedTimes || [],
        reason: reason || null
      }
    })

    return NextResponse.json({
      success: true,
      blockedDate: {
        id: blockedDate.id,
        date: blockedDate.date.toISOString().split('T')[0],
        blockedTimes: blockedDate.blockedTimes,
        reason: blockedDate.reason
      }
    })
  } catch (error) {
    console.error('Error adding blocked date:', error)
    return NextResponse.json(
      { error: 'Kon geblokkeerde datum niet toevoegen' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/availability - Remove blocked date
export async function DELETE(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const dateStr = searchParams.get('date')
    const id = searchParams.get('id')

    if (!dateStr && !id) {
      return NextResponse.json(
        { error: 'Datum of ID is verplicht' },
        { status: 400 }
      )
    }

    if (id) {
      await db.appointmentBlockedDate.delete({
        where: { id }
      })
    } else if (dateStr) {
      await db.appointmentBlockedDate.delete({
        where: { date: new Date(dateStr) }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing blocked date:', error)
    return NextResponse.json(
      { error: 'Kon geblokkeerde datum niet verwijderen' },
      { status: 500 }
    )
  }
}
