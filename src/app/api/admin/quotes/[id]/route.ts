import { NextRequest, NextResponse } from 'next/server'
import { db, softDeleteQuote } from '@/lib/db'
import { getAuthUser, unauthorizedResponse, forbiddenResponse, isSuperAdmin } from '@/lib/auth'
import { QuoteUpdateSchema, StatusChangeSchema } from '@/lib/validations/quote'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/admin/quotes/[id] - Get single quote with full details
export async function GET(request: NextRequest, { params }: RouteParams) {
  const user = await getAuthUser(request)
  if (!user) {
    return unauthorizedResponse()
  }

  const { id } = await params

  try {
    const quote = await db.quoteRequest.findUnique({
      where: { id },
      include: {
        propertyType: true,
        services: {
          include: {
            serviceType: true
          }
        },
        photos: true,
        notes: {
          include: {
            user: {
              select: { id: true, fullName: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        statusHistory: {
          include: {
            changedBy: {
              select: { id: true, fullName: true }
            }
          },
          orderBy: { changedAt: 'desc' }
        },
        assignedTo: {
          select: { id: true, fullName: true, email: true }
        }
      }
    })

    if (!quote) {
      return NextResponse.json(
        { error: 'Aanvraag niet gevonden' },
        { status: 404 }
      )
    }

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Error fetching quote:', error)
    return NextResponse.json(
      { error: 'Kon aanvraag niet ophalen' },
      { status: 500 }
    )
  }
}

// PATCH /api/admin/quotes/[id] - Update quote (status, assignment, etc.)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const user = await getAuthUser(request)
  if (!user) {
    return unauthorizedResponse()
  }

  const { id } = await params

  try {
    const body = await request.json()

    // Check if this is a status change
    if (body.status) {
      const statusResult = StatusChangeSchema.safeParse(body)
      if (!statusResult.success) {
        return NextResponse.json(
          { error: 'Ongeldige status', details: statusResult.error.flatten() },
          { status: 400 }
        )
      }

      const { status, reason } = statusResult.data

      // Get current quote
      const currentQuote = await db.quoteRequest.findUnique({
        where: { id },
        select: { status: true }
      })

      if (!currentQuote) {
        return NextResponse.json(
          { error: 'Aanvraag niet gevonden' },
          { status: 404 }
        )
      }

      // Update status and create history entry in a transaction
      const updatedQuote = await db.$transaction(async (tx) => {
        // Update quote status
        const quote = await tx.quoteRequest.update({
          where: { id },
          data: {
            status,
            // Set convertedAt when status becomes WON
            ...(status === 'WON' && !currentQuote.status ? { convertedAt: new Date() } : {})
          }
        })

        // Create status history entry
        await tx.quoteStatusHistory.create({
          data: {
            quoteId: id,
            fromStatus: currentQuote.status,
            toStatus: status,
            reason,
            changedById: user.id
          }
        })

        return quote
      })

      return NextResponse.json({
        success: true,
        quote: updatedQuote
      })
    }

    // General update (assignment, etc.)
    const updateResult = QuoteUpdateSchema.safeParse(body)
    if (!updateResult.success) {
      return NextResponse.json(
        { error: 'Ongeldige gegevens', details: updateResult.error.flatten() },
        { status: 400 }
      )
    }

    const updatedQuote = await db.quoteRequest.update({
      where: { id },
      data: updateResult.data
    })

    return NextResponse.json({
      success: true,
      quote: updatedQuote
    })
  } catch (error) {
    console.error('Error updating quote:', error)
    return NextResponse.json(
      { error: 'Kon aanvraag niet bijwerken' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/quotes/[id] - Soft delete quote (superadmin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const user = await getAuthUser(request)
  if (!user) {
    return unauthorizedResponse()
  }

  // Only superadmins can delete
  if (!isSuperAdmin(user)) {
    return forbiddenResponse()
  }

  const { id } = await params

  try {
    const quote = await db.quoteRequest.findUnique({
      where: { id },
      select: { id: true, deletedAt: true }
    })

    if (!quote) {
      return NextResponse.json(
        { error: 'Aanvraag niet gevonden' },
        { status: 404 }
      )
    }

    if (quote.deletedAt) {
      return NextResponse.json(
        { error: 'Aanvraag is al verwijderd' },
        { status: 400 }
      )
    }

    await softDeleteQuote(id)

    return NextResponse.json({
      success: true,
      message: 'Aanvraag verwijderd'
    })
  } catch (error) {
    console.error('Error deleting quote:', error)
    return NextResponse.json(
      { error: 'Kon aanvraag niet verwijderen' },
      { status: 500 }
    )
  }
}
