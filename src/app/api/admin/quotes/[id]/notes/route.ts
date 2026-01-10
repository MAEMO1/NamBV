import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthUser, unauthorizedResponse } from '@/lib/auth'
import { QuoteNoteSchema } from '@/lib/validations/quote'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/admin/quotes/[id]/notes - Get all notes for a quote
export async function GET(request: NextRequest, { params }: RouteParams) {
  const user = await getAuthUser(request)
  if (!user) {
    return unauthorizedResponse()
  }

  const { id } = await params

  try {
    const notes = await db.quoteNote.findMany({
      where: { quoteId: id },
      include: {
        user: {
          select: { id: true, fullName: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ notes })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { error: 'Kon notities niet ophalen' },
      { status: 500 }
    )
  }
}

// POST /api/admin/quotes/[id]/notes - Add a note to a quote
export async function POST(request: NextRequest, { params }: RouteParams) {
  const user = await getAuthUser(request)
  if (!user) {
    return unauthorizedResponse()
  }

  const { id } = await params

  try {
    const body = await request.json()

    const validationResult = QuoteNoteSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Ongeldige notitie', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    // Check if quote exists
    const quote = await db.quoteRequest.findUnique({
      where: { id },
      select: { id: true }
    })

    if (!quote) {
      return NextResponse.json(
        { error: 'Aanvraag niet gevonden' },
        { status: 404 }
      )
    }

    const note = await db.quoteNote.create({
      data: {
        quoteId: id,
        userId: user.id,
        content: validationResult.data.content
      },
      include: {
        user: {
          select: { id: true, fullName: true }
        }
      }
    })

    return NextResponse.json(
      { success: true, note },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json(
      { error: 'Kon notitie niet toevoegen' },
      { status: 500 }
    )
  }
}
