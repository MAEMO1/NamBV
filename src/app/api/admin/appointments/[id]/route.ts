import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import {
  sendAppointmentStatusEmail,
  sendWhatsAppNotification
} from '@/lib/notifications'

const SESSION_COOKIE_NAME = 'nam_admin_session'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session?.value
}

// GET /api/admin/appointments/[id] - Get single appointment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { id } = await params
    const appointment = await db.appointment.findUnique({
      where: { id }
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Afspraak niet gevonden' }, { status: 404 })
    }

    return NextResponse.json({ appointment })
  } catch (error) {
    console.error('Error fetching appointment:', error)
    return NextResponse.json(
      { error: 'Kon afspraak niet laden' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/appointments/[id] - Update appointment (accept/reject/reschedule)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { action, proposedDate, proposedTime, rejectionReason, adminNotes } = body

    const appointment = await db.appointment.findUnique({
      where: { id }
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Afspraak niet gevonden' }, { status: 404 })
    }

    let updateData: Record<string, unknown> = {}
    let notificationType: 'confirmed' | 'rejected' | 'rescheduled' = 'confirmed'

    switch (action) {
      case 'confirm':
        updateData = {
          status: 'CONFIRMED',
          confirmedAt: new Date(),
          adminNotes: adminNotes || null
        }
        notificationType = 'confirmed'
        break

      case 'reject':
        if (!rejectionReason) {
          return NextResponse.json(
            { error: 'Reden voor weigering is verplicht' },
            { status: 400 }
          )
        }
        updateData = {
          status: 'REJECTED',
          rejectionReason,
          adminNotes: adminNotes || null
        }
        notificationType = 'rejected'
        break

      case 'reschedule':
        if (!proposedDate || !proposedTime) {
          return NextResponse.json(
            { error: 'Voorgestelde datum en tijd zijn verplicht' },
            { status: 400 }
          )
        }
        updateData = {
          status: 'RESCHEDULED',
          proposedDate: new Date(proposedDate),
          proposedTime,
          adminNotes: adminNotes || null
        }
        notificationType = 'rescheduled'
        break

      case 'complete':
        updateData = {
          status: 'COMPLETED',
          adminNotes: adminNotes || null
        }
        break

      case 'cancel':
        updateData = {
          status: 'CANCELLED',
          adminNotes: adminNotes || null
        }
        break

      case 'no_show':
        updateData = {
          status: 'NO_SHOW',
          adminNotes: adminNotes || null
        }
        break

      default:
        return NextResponse.json(
          { error: 'Ongeldige actie' },
          { status: 400 }
        )
    }

    // Update appointment
    const updatedAppointment = await db.appointment.update({
      where: { id },
      data: updateData
    })

    // Send notifications to user (email + WhatsApp)
    if (['confirm', 'reject', 'reschedule'].includes(action)) {
      try {
        await sendAppointmentStatusEmail({
          type: notificationType,
          appointment: updatedAppointment,
          proposedDate: proposedDate ? new Date(proposedDate) : undefined,
          proposedTime: proposedTime || undefined,
          rejectionReason: rejectionReason || undefined
        })

        // Send WhatsApp notification to user
        await sendWhatsAppNotification({
          to: appointment.phone,
          type: notificationType,
          appointment: updatedAppointment,
          proposedDate: proposedDate ? new Date(proposedDate) : undefined,
          proposedTime: proposedTime || undefined
        })
      } catch (notifError) {
        console.error('Error sending notifications:', notifError)
        // Don't fail the request if notifications fail
      }
    }

    return NextResponse.json({
      success: true,
      appointment: updatedAppointment
    })
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json(
      { error: 'Kon afspraak niet updaten' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/appointments/[id] - Delete appointment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { id } = await params

    const appointment = await db.appointment.findUnique({
      where: { id }
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Afspraak niet gevonden' }, { status: 404 })
    }

    await db.appointment.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Afspraak verwijderd'
    })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json(
      { error: 'Kon afspraak niet verwijderen' },
      { status: 500 }
    )
  }
}
