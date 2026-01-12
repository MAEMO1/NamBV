import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { statusConfig, budgetRangeLabels } from '@/lib/validations/quote'

const SESSION_COOKIE_NAME = 'nam_admin_session'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session?.value
}

// Convert array of objects to CSV string
function toCSV(data: Record<string, unknown>[], headers: { key: string; label: string }[]): string {
  const headerRow = headers.map(h => `"${h.label}"`).join(',')

  const rows = data.map(row => {
    return headers.map(h => {
      const value = row[h.key]
      if (value === null || value === undefined) return '""'
      if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`
      if (Array.isArray(value)) return `"${value.join(', ')}"`
      return `"${String(value)}"`
    }).join(',')
  })

  return [headerRow, ...rows].join('\n')
}

// GET - Export data to CSV
export async function GET(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // quotes, appointments, analytics

    if (!type) {
      return NextResponse.json(
        { error: 'Export type is verplicht' },
        { status: 400 }
      )
    }

    let csv = ''
    let filename = ''

    if (type === 'quotes') {
      const quotes = await db.quoteRequest.findMany({
        where: { deletedAt: null },
        include: {
          propertyType: true,
          services: {
            include: { serviceType: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      })

      const headers = [
        { key: 'referenceNumber', label: 'Referentie' },
        { key: 'status', label: 'Status' },
        { key: 'fullName', label: 'Naam' },
        { key: 'email', label: 'E-mail' },
        { key: 'phone', label: 'Telefoon' },
        { key: 'postalCode', label: 'Postcode' },
        { key: 'city', label: 'Stad' },
        { key: 'propertyTypeName', label: 'Type woning' },
        { key: 'serviceNames', label: 'Diensten' },
        { key: 'budgetRangeLabel', label: 'Budget' },
        { key: 'description', label: 'Omschrijving' },
        { key: 'createdAt', label: 'Aangemaakt op' },
      ]

      const data = quotes.map(q => ({
        referenceNumber: q.referenceNumber,
        status: statusConfig[q.status]?.label || q.status,
        fullName: q.fullName,
        email: q.email,
        phone: q.phone,
        postalCode: q.postalCode,
        city: q.city || '',
        propertyTypeName: q.propertyType?.name || '',
        serviceNames: q.services.map(s => s.serviceType.name),
        budgetRangeLabel: q.budgetRange ? budgetRangeLabels[q.budgetRange] : '',
        description: q.description,
        createdAt: q.createdAt.toLocaleString('nl-BE'),
      }))

      csv = toCSV(data, headers)
      filename = `offertes-${new Date().toISOString().split('T')[0]}.csv`

    } else if (type === 'appointments') {
      const appointments = await db.appointment.findMany({
        orderBy: { createdAt: 'desc' },
      })

      const statusLabels: Record<string, string> = {
        PENDING: 'In afwachting',
        CONFIRMED: 'Bevestigd',
        COMPLETED: 'Afgerond',
        CANCELLED: 'Geannuleerd',
        NO_SHOW: 'Niet verschenen',
      }

      const headers = [
        { key: 'referenceNumber', label: 'Referentie' },
        { key: 'status', label: 'Status' },
        { key: 'fullName', label: 'Naam' },
        { key: 'email', label: 'E-mail' },
        { key: 'phone', label: 'Telefoon' },
        { key: 'gemeente', label: 'Gemeente' },
        { key: 'appointmentDate', label: 'Datum' },
        { key: 'appointmentTime', label: 'Tijd' },
        { key: 'projectType', label: 'Project type' },
        { key: 'budget', label: 'Budget' },
        { key: 'message', label: 'Bericht' },
        { key: 'createdAt', label: 'Aangemaakt op' },
      ]

      const data = appointments.map(a => ({
        referenceNumber: a.referenceNumber,
        status: statusLabels[a.status] || a.status,
        fullName: a.fullName,
        email: a.email,
        phone: a.phone,
        gemeente: a.gemeente,
        appointmentDate: a.appointmentDate.toLocaleDateString('nl-BE'),
        appointmentTime: a.appointmentTime,
        projectType: a.projectType || '',
        budget: a.budget || '',
        message: a.message || '',
        createdAt: a.createdAt.toLocaleString('nl-BE'),
      }))

      csv = toCSV(data, headers)
      filename = `afspraken-${new Date().toISOString().split('T')[0]}.csv`

    } else if (type === 'analytics') {
      const dailyStats = await db.dailyStats.findMany({
        orderBy: { date: 'desc' },
        take: 90,
      })

      const headers = [
        { key: 'date', label: 'Datum' },
        { key: 'pageViews', label: 'Paginaweergaves' },
        { key: 'uniqueVisitors', label: 'Unieke bezoekers' },
        { key: 'sessions', label: 'Sessies' },
        { key: 'quoteRequests', label: 'Offerteaanvragen' },
        { key: 'appointments', label: 'Afspraken' },
        { key: 'desktopVisits', label: 'Desktop' },
        { key: 'mobileVisits', label: 'Mobiel' },
        { key: 'tabletVisits', label: 'Tablet' },
      ]

      const data = dailyStats.map(s => ({
        date: s.date.toLocaleDateString('nl-BE'),
        pageViews: s.pageViews,
        uniqueVisitors: s.uniqueVisitors,
        sessions: s.sessions,
        quoteRequests: s.quoteRequests,
        appointments: s.appointments,
        desktopVisits: s.desktopVisits,
        mobileVisits: s.mobileVisits,
        tabletVisits: s.tabletVisits,
      }))

      csv = toCSV(data, headers)
      filename = `analytics-${new Date().toISOString().split('T')[0]}.csv`

    } else {
      return NextResponse.json(
        { error: 'Ongeldig export type' },
        { status: 400 }
      )
    }

    // Return CSV as downloadable file
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { error: 'Kon data niet exporteren' },
      { status: 500 }
    )
  }
}
