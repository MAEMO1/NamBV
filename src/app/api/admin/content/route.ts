import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'nam_admin_session'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session?.value
}

// GET - Get content blocks
export async function GET(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')

    const contentBlocks = await db.contentBlock.findMany({
      where: page ? { page } : {},
      orderBy: [{ page: 'asc' }, { section: 'asc' }, { key: 'asc' }],
    })

    return NextResponse.json({ contentBlocks })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Kon content niet laden' },
      { status: 500 }
    )
  }
}

// PUT - Update content block
export async function PUT(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { page, section, key, content, type } = body

    if (!page || !section || !key) {
      return NextResponse.json(
        { error: 'Page, section en key zijn verplicht' },
        { status: 400 }
      )
    }

    const contentBlock = await db.contentBlock.upsert({
      where: {
        page_section_key: { page, section, key },
      },
      create: {
        page,
        section,
        key,
        content: content || '',
        type: type || 'text',
      },
      update: {
        content: content || '',
        type: type || 'text',
      },
    })

    return NextResponse.json({ contentBlock })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Kon content niet opslaan' },
      { status: 500 }
    )
  }
}

// POST - Batch update content blocks
export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { contentBlocks } = body

    if (!contentBlocks || !Array.isArray(contentBlocks)) {
      return NextResponse.json(
        { error: 'Ongeldige content blocks' },
        { status: 400 }
      )
    }

    // Update each content block
    const results = []
    for (const block of contentBlocks) {
      const { page, section, key, content, type } = block

      if (!page || !section || !key) continue

      const contentBlock = await db.contentBlock.upsert({
        where: {
          page_section_key: { page, section, key },
        },
        create: {
          page,
          section,
          key,
          content: content || '',
          type: type || 'text',
        },
        update: {
          content: content || '',
          type: type || 'text',
        },
      })

      results.push(contentBlock)
    }

    return NextResponse.json({ contentBlocks: results })
  } catch (error) {
    console.error('Error batch updating content:', error)
    return NextResponse.json(
      { error: 'Kon content niet opslaan' },
      { status: 500 }
    )
  }
}
