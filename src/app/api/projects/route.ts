import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/projects - Get published projects (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const where: {
      isPublished: boolean
      category?: string
      featured?: boolean
    } = {
      isPublished: true,
    }

    if (category && category !== 'Alle') {
      where.category = category
    }

    if (featured === 'true') {
      where.featured = true
    }

    const projects = await db.project.findMany({
      where,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { year: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    // Transform to frontend format
    const transformedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      category: project.category,
      location: project.location,
      year: project.year,
      description: project.description,
      image: project.mainImage || project.images[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      images: project.images.map(img => img.url),
      featured: project.featured,
    }))

    // Get unique categories for filters
    const allProjects = await db.project.findMany({
      where: { isPublished: true },
      select: { category: true },
      distinct: ['category'],
    })

    const categories = ['Alle', ...allProjects.map(p => p.category).filter(Boolean)]

    return NextResponse.json({
      projects: transformedProjects,
      categories,
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Kon projecten niet laden' },
      { status: 500 }
    )
  }
}
