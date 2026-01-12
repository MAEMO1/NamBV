import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'nam_admin_session'

async function isAuthenticated() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return !!session?.value
}

// GET - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { id } = await params

    const project = await db.project.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project niet gevonden' }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Kon project niet laden' },
      { status: 500 }
    )
  }
}

// PUT - Update project
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
      sortOrder,
      images,
    } = body

    // Check if project exists
    const existingProject = await db.project.findUnique({ where: { id } })
    if (!existingProject) {
      return NextResponse.json({ error: 'Project niet gevonden' }, { status: 404 })
    }

    // Update project
    const project = await db.project.update({
      where: { id },
      data: {
        title,
        description,
        shortDescription,
        category,
        location,
        year: year ? parseInt(year) : undefined,
        featured,
        isPublished,
        mainImage,
        sortOrder,
      },
      include: {
        images: true,
      },
    })

    // Update images if provided
    if (images !== undefined) {
      // Delete existing images
      await db.projectImage.deleteMany({
        where: { projectId: id },
      })

      // Create new images
      if (images.length > 0) {
        await db.projectImage.createMany({
          data: images.map((img: { url: string; alt?: string; caption?: string; isBefore?: boolean; isAfter?: boolean }, index: number) => ({
            projectId: id,
            url: img.url,
            alt: img.alt,
            caption: img.caption,
            sortOrder: index,
            isBefore: img.isBefore || false,
            isAfter: img.isAfter || false,
          })),
        })
      }

      // Fetch updated project with images
      const updatedProject = await db.project.findUnique({
        where: { id },
        include: {
          images: {
            orderBy: { sortOrder: 'asc' },
          },
        },
      })

      return NextResponse.json({ project: updatedProject })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Kon project niet bijwerken' },
      { status: 500 }
    )
  }
}

// DELETE - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  try {
    const { id } = await params

    // Check if project exists
    const existingProject = await db.project.findUnique({ where: { id } })
    if (!existingProject) {
      return NextResponse.json({ error: 'Project niet gevonden' }, { status: 404 })
    }

    // Delete project (cascade deletes images)
    await db.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Kon project niet verwijderen' },
      { status: 500 }
    )
  }
}
