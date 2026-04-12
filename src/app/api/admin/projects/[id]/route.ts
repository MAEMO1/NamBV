import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { captureRouteException } from '@/lib/monitoring';
import { deleteV2Project, updateV2Project } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2ProjectWriteSchema } from '@/lib/v2/schemas';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2ProjectWriteSchema.parse(body);
    const { id } = await params;
    const project = await updateV2Project(id, payload, auth.user?.id);
    return NextResponse.json({ project });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    captureRouteException(error, {
      action: 'admin.project.patch',
      route: '/api/admin/projects/[id]',
    });
    return NextResponse.json({ error: 'Project update failed' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const { id } = await params;
    await deleteV2Project(id, auth.user?.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    captureRouteException(error, {
      action: 'admin.project.delete',
      route: '/api/admin/projects/[id]',
    });
    return NextResponse.json({ error: 'Project delete failed' }, { status: 500 });
  }
}
