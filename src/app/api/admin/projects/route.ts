import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'nam_admin_session'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session?.value
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// GET - List all projects
export async function GET(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get('all') === 'true'

    const projects = await db.project.findMany({
      where: includeUnpublished ? {} : { isPublished: true },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { sortOrder: 'asc' },
        { year: 'desc' },
      ],
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Kon projecten niet laden' },
      { status: 500 }
    )
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      title,
      description,
      shortDescription,
      category,
      location,
      year,
      featured,
      isPublished,
      mainImage,
      images,
    } = body

    if (!title || !category || !location || !year) {
      return NextResponse.json(
        { error: 'Titel, categorie, locatie en jaar zijn verplicht' },
        { status: 400 }
      )
    }

    // Generate unique slug
    let slug = generateSlug(title)
    const existingSlug = await db.project.findUnique({ where: { slug } })
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString(36)}`
    }

    // Get max sort order
    const maxSortOrder = await db.project.aggregate({
      _max: { sortOrder: true },
    })

    const project = await db.project.create({
      data: {
        title,
        slug,
        description,
        shortDescription,
        category,
        location,
        year: parseInt(year),
        featured: featured || false,
        isPublished: isPublished !== false,
        mainImage,
        sortOrder: (maxSortOrder._max.sortOrder || 0) + 1,
        images: images?.length > 0 ? {
          create: images.map((img: { url: string; alt?: string; caption?: string; isBefore?: boolean; isAfter?: boolean }, index: number) => ({
            url: img.url,
            alt: img.alt,
            caption: img.caption,
            sortOrder: index,
            isBefore: img.isBefore || false,
            isAfter: img.isAfter || false,
          })),
        } : undefined,
      },
      include: {
        images: true,
      },
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Kon project niet aanmaken' },
      { status: 500 }
    )
  }
}
