import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Default availability (Mon-Fri, standard business hours)
const defaultAvailability: Record<number, string[]> = {
  0: [], // Sunday - closed
  1: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'], // Monday
  2: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'], // Tuesday
  3: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'], // Wednesday
  4: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'], // Thursday
  5: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], // Friday
  6: [], // Saturday - closed
}

// GET /api/availability - Get available slots for a date range
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDateStr = searchParams.get('startDate')
    const endDateStr = searchParams.get('endDate')
    const month = searchParams.get('month') // Format: YYYY-MM

    let startDate: Date
    let endDate: Date

    if (month) {
      // Get entire month
      const [year, monthNum] = month.split('-').map(Number)
      startDate = new Date(year, monthNum - 1, 1)
      endDate = new Date(year, monthNum, 0) // Last day of month
    } else if (startDateStr && endDateStr) {
      startDate = new Date(startDateStr)
      endDate = new Date(endDateStr)
    } else {
      // Default: next 3 months
      startDate = new Date()
      endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 3)
    }

    // Get availability settings from database
    const availabilitySettings = await db.appointmentAvailability.findMany()

    // Convert to map for easy lookup
    const availabilityMap: Record<number, { timeSlots: string[], isActive: boolean }> = {}
    for (const setting of availabilitySettings) {
      availabilityMap[setting.dayOfWeek] = {
        timeSlots: setting.timeSlots,
        isActive: setting.isActive
      }
    }

    // Get blocked dates in range
    const blockedDates = await db.appointmentBlockedDate.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      }
    })

    // Create map of blocked dates
    const blockedMap: Record<string, string[]> = {}
    for (const blocked of blockedDates) {
      const dateKey = blocked.date.toISOString().split('T')[0]
      // Empty array means whole day is blocked
      blockedMap[dateKey] = blocked.blockedTimes.length > 0 ? blocked.blockedTimes : ['all']
    }

    // Get existing appointments in range
    const appointments = await db.appointment.findMany({
      where: {
        appointmentDate: {
          gte: startDate,
          lte: endDate
        },
        status: {
          notIn: ['CANCELLED']
        }
      },
      select: {
        appointmentDate: true,
        appointmentTime: true
      }
    })

    // Create map of booked slots
    const bookedMap: Record<string, string[]> = {}
    for (const appointment of appointments) {
      const dateKey = appointment.appointmentDate.toISOString().split('T')[0]
      if (!bookedMap[dateKey]) {
        bookedMap[dateKey] = []
      }
      bookedMap[dateKey].push(appointment.appointmentTime)
    }

    // Generate availability for each day in range
    const availability: Record<string, { available: string[], booked: string[], isOpen: boolean }> = {}

    const currentDate = new Date(startDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split('T')[0]
      const dayOfWeek = currentDate.getDay()

      // Check if day is in the past
      const isPast = currentDate < today

      // Get base availability for this day of week
      const daySettings = availabilityMap[dayOfWeek]
      const baseSlots = daySettings
        ? (daySettings.isActive ? daySettings.timeSlots : [])
        : (defaultAvailability[dayOfWeek] || [])

      // Check if entire day is blocked
      const blockedTimes = blockedMap[dateKey] || []
      const isDayBlocked = blockedTimes.includes('all')

      // Get booked times
      const bookedTimes = bookedMap[dateKey] || []

      // Calculate available slots
      let availableSlots: string[] = []
      if (!isPast && !isDayBlocked && baseSlots.length > 0) {
        availableSlots = baseSlots.filter(time => {
          // Not blocked
          if (blockedTimes.includes(time)) return false
          // Not booked
          if (bookedTimes.includes(time)) return false
          // If today, check if time has passed
          if (dateKey === today.toISOString().split('T')[0]) {
            const [hours, minutes] = time.split(':').map(Number)
            const slotTime = new Date(currentDate)
            slotTime.setHours(hours, minutes, 0, 0)
            if (slotTime <= new Date()) return false
          }
          return true
        })
      }

      availability[dateKey] = {
        available: availableSlots,
        booked: bookedTimes,
        isOpen: !isPast && !isDayBlocked && baseSlots.length > 0
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return NextResponse.json({ availability })
  } catch (error) {
    console.error('Error fetching availability:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Kon beschikbaarheid niet laden', details: errorMessage },
      { status: 500 }
    )
  }
}
