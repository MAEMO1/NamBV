import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { captureRouteException } from '@/lib/monitoring';
import { defaultProjects } from '@/lib/v2/defaults';
import { createV2Project, replaceV2Projects } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2ProjectSchema, v2ProjectWriteSchema } from '@/lib/v2/schemas';

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const projects = await db.v2Project.findMany({
    include: {
      translations: true,
      images: { orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { sortOrder: 'asc' },
  });

  return NextResponse.json({
    projects: projects.length > 0
      ? projects.map((project) => ({
          ...project,
          hasStoredValue: true,
        }))
      : defaultProjects.map((project) => ({
          ...project,
          id: null,
          hasStoredValue: false,
        })),
    categories: Array.from(new Set([
      ...defaultProjects.map((project) => project.category),
      ...projects.map((project) => project.category),
    ])).sort(),
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2ProjectWriteSchema.parse(body);
    const project = await createV2Project(payload, auth.user?.id);
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    captureRouteException(error, {
      action: 'admin.project.create',
      route: '/api/admin/projects',
    });
    return NextResponse.json({ error: 'Project create failed' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = zArrayProjects(body);
    await replaceV2Projects(payload, auth.user?.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    captureRouteException(error, {
      action: 'admin.project.replace',
      route: '/api/admin/projects',
    });
    return NextResponse.json({ error: 'Project update failed' }, { status: 500 });
  }
}

function zArrayProjects(input: unknown) {
  return v2ProjectSchema.array().parse(input);
}
