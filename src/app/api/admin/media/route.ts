import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'nam_admin_session'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session?.value
}

// GET - List media files
export async function GET(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder') || '/'
    const mimeType = searchParams.get('type') // image, video, document
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: Record<string, unknown> = {}

    if (folder !== '/') {
      where.folder = folder
    }

    if (mimeType) {
      if (mimeType === 'image') {
        where.mimeType = { startsWith: 'image/' }
      } else if (mimeType === 'video') {
        where.mimeType = { startsWith: 'video/' }
      } else if (mimeType === 'document') {
        where.mimeType = {
          in: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ],
        }
      }
    }

    const [files, total] = await Promise.all([
      db.mediaFile.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.mediaFile.count({ where }),
    ])

    // Get unique folders
    const folders = await db.mediaFile.groupBy({
      by: ['folder'],
      _count: { folder: true },
    })

    return NextResponse.json({
      files,
      folders: folders.map(f => ({ name: f.folder, count: f._count.folder })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { error: 'Kon media niet laden' },
      { status: 500 }
    )
  }
}

// POST - Upload media file (metadata only, actual upload to external storage)
export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      filename,
      originalName,
      mimeType,
      size,
      url,
      width,
      height,
      alt,
      folder,
      tags,
    } = body

    if (!filename || !originalName || !mimeType || !size || !url) {
      return NextResponse.json(
        { error: 'Bestandsinformatie ontbreekt' },
        { status: 400 }
      )
    }

    const mediaFile = await db.mediaFile.create({
      data: {
        filename,
        originalName,
        mimeType,
        size,
        url,
        width,
        height,
        alt,
        folder: folder || '/',
        tags: tags || [],
      },
    })

    return NextResponse.json({ file: mediaFile }, { status: 201 })
  } catch (error) {
    console.error('Error creating media:', error)
    return NextResponse.json(
      { error: 'Kon bestand niet opslaan' },
      { status: 500 }
    )
  }
}

// DELETE - Delete media file
export async function DELETE(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Bestand ID ontbreekt' },
        { status: 400 }
      )
    }

    await db.mediaFile.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting media:', error)
    return NextResponse.json(
      { error: 'Kon bestand niet verwijderen' },
      { status: 500 }
    )
  }
}

// PUT - Update media file metadata
export async function PUT(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, alt, folder, tags } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Bestand ID ontbreekt' },
        { status: 400 }
      )
    }

    const mediaFile = await db.mediaFile.update({
      where: { id },
      data: {
        alt,
        folder,
        tags,
      },
    })

    return NextResponse.json({ file: mediaFile })
  } catch (error) {
    console.error('Error updating media:', error)
    return NextResponse.json(
      { error: 'Kon bestand niet bijwerken' },
      { status: 500 }
    )
  }
}
