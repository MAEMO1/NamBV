import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { defaultProjects } from '@/lib/v2/defaults';
import { replaceV2Projects } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2ProjectSchema } from '@/lib/v2/schemas';

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
    projects: projects.length > 0 ? projects : defaultProjects,
  });
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

    console.error('v2 projects replace failed', error);
    return NextResponse.json({ error: 'Project update failed' }, { status: 500 });
  }
}

function zArrayProjects(input: unknown) {
  return v2ProjectSchema.array().parse(input);
}
