import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'nam_admin_session'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session?.value
}

export async function GET() {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    // =====================================================================
    // QUOTE REQUEST STATISTICS
    // =====================================================================

    // Get all quotes (exclude soft deleted)
    const quotes = await db.quoteRequest.findMany({
      where: { deletedAt: null },
      include: {
        propertyType: true,
        services: {
          include: {
            serviceType: true
          }
        }
      }
    })

    // Property Type distribution (quotes)
    const quotePropertyTypes = quotes.reduce((acc, quote) => {
      const type = quote.propertyType?.name || 'Onbekend'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Service Type distribution (quotes)
    const quoteServiceTypes: Record<string, number> = {}
    quotes.forEach(quote => {
      quote.services.forEach(s => {
        const name = s.serviceType.name
        quoteServiceTypes[name] = (quoteServiceTypes[name] || 0) + 1
      })
    })

    // Budget Range distribution (quotes)
    const quoteBudgetRanges = quotes.reduce((acc, quote) => {
      const range = quote.budgetRange || 'UNKNOWN'
      acc[range] = (acc[range] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Postal Code / Region distribution (quotes)
    const quotePostalCodes = quotes.reduce((acc, quote) => {
      // Group by first 2 digits of postal code (Belgian province level)
      const region = quote.postalCode.substring(0, 2)
      acc[region] = (acc[region] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // =====================================================================
    // APPOINTMENT STATISTICS
    // =====================================================================

    const appointments = await db.appointment.findMany()

    // Project Type distribution (appointments)
    const appointmentProjectTypes = appointments.reduce((acc, apt) => {
      const type = apt.projectType || 'Onbekend'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Property Type distribution (appointments)
    const appointmentPropertyTypes = appointments.reduce((acc, apt) => {
      const type = apt.propertyType || 'Onbekend'
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Property Age distribution (appointments)
    const appointmentPropertyAges = appointments.reduce((acc, apt) => {
      const age = apt.propertyAge || 'Onbekend'
      acc[age] = (acc[age] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Budget distribution (appointments)
    const appointmentBudgets = appointments.reduce((acc, apt) => {
      const budget = apt.budget || 'Onbekend'
      acc[budget] = (acc[budget] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Priorities distribution (appointments)
    const appointmentPriorities: Record<string, number> = {}
    appointments.forEach(apt => {
      apt.priorities.forEach(priority => {
        appointmentPriorities[priority] = (appointmentPriorities[priority] || 0) + 1
      })
    })

    // Material Preference distribution (appointments)
    const appointmentMaterials = appointments.reduce((acc, apt) => {
      const material = apt.materialPreference || 'Onbekend'
      acc[material] = (acc[material] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Motivation distribution (appointments)
    const appointmentMotivations = appointments.reduce((acc, apt) => {
      const motivation = apt.motivation || 'Onbekend'
      acc[motivation] = (acc[motivation] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Gemeente/Region distribution (appointments)
    const appointmentGemeentes = appointments.reduce((acc, apt) => {
      const gemeente = apt.gemeente || 'Onbekend'
      acc[gemeente] = (acc[gemeente] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Subsidy Interest (appointments)
    const subsidyInterestCount = appointments.filter(apt => apt.subsidyInterest).length
    const subsidyInterestPercentage = appointments.length > 0
      ? Math.round((subsidyInterestCount / appointments.length) * 100)
      : 0

    // Payment Spread Interest (appointments)
    const paymentSpreadCount = appointments.filter(apt => apt.paymentSpread).length
    const paymentSpreadPercentage = appointments.length > 0
      ? Math.round((paymentSpreadCount / appointments.length) * 100)
      : 0

    // =====================================================================
    // COMBINED STATISTICS
    // =====================================================================

    // Combined Budget analysis
    const allBudgets: Record<string, number> = {}

    // Add quote budgets
    Object.entries(quoteBudgetRanges).forEach(([key, value]) => {
      allBudgets[key] = (allBudgets[key] || 0) + value
    })

    // Add appointment budgets
    Object.entries(appointmentBudgets).forEach(([key, value]) => {
      allBudgets[key] = (allBudgets[key] || 0) + value
    })

    // Combined Property Type analysis
    const allPropertyTypes: Record<string, number> = {}

    Object.entries(quotePropertyTypes).forEach(([key, value]) => {
      allPropertyTypes[key] = (allPropertyTypes[key] || 0) + value
    })

    Object.entries(appointmentPropertyTypes).forEach(([key, value]) => {
      allPropertyTypes[key] = (allPropertyTypes[key] || 0) + value
    })

    // Helper function to convert object to sorted array
    const toSortedArray = (obj: Record<string, number>) => {
      return Object.entries(obj)
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count)
    }

    return NextResponse.json({
      totals: {
        quotes: quotes.length,
        appointments: appointments.length,
        total: quotes.length + appointments.length
      },
      quotes: {
        propertyTypes: toSortedArray(quotePropertyTypes),
        serviceTypes: toSortedArray(quoteServiceTypes),
        budgetRanges: toSortedArray(quoteBudgetRanges),
        postalCodeRegions: toSortedArray(quotePostalCodes)
      },
      appointments: {
        projectTypes: toSortedArray(appointmentProjectTypes),
        propertyTypes: toSortedArray(appointmentPropertyTypes),
        propertyAges: toSortedArray(appointmentPropertyAges),
        budgets: toSortedArray(appointmentBudgets),
        priorities: toSortedArray(appointmentPriorities),
        materials: toSortedArray(appointmentMaterials),
        motivations: toSortedArray(appointmentMotivations),
        gemeentes: toSortedArray(appointmentGemeentes),
        subsidyInterest: {
          count: subsidyInterestCount,
          percentage: subsidyInterestPercentage,
          total: appointments.length
        },
        paymentSpread: {
          count: paymentSpreadCount,
          percentage: paymentSpreadPercentage,
          total: appointments.length
        }
      },
      combined: {
        propertyTypes: toSortedArray(allPropertyTypes),
        budgets: toSortedArray(allBudgets)
      }
    })
  } catch (error) {
    console.error('Insights error:', error)
    return NextResponse.json(
      { error: 'Kon inzichten niet laden' },
      { status: 500 }
    )
  }
}
