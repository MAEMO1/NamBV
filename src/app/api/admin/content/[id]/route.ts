import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { captureRouteException } from '@/lib/monitoring';
import { deleteV2PageSection, updateV2PageSection } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2PageSectionUpdateSchema } from '@/lib/v2/schemas';

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
    const payload = v2PageSectionUpdateSchema.parse(body);
    const { id } = await params;
    const section = await updateV2PageSection(id, payload, auth.user?.id);
    return NextResponse.json({ section });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Content section not found' }, { status: 404 });
    }

    captureRouteException(error, {
      action: 'admin.content.patch',
      route: '/api/admin/content/[id]',
    });
    return NextResponse.json({ error: 'Content section update failed' }, { status: 500 });
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
    await deleteV2PageSection(id, auth.user?.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Content section not found' }, { status: 404 });
    }

    captureRouteException(error, {
      action: 'admin.content.delete',
      route: '/api/admin/content/[id]',
    });
    return NextResponse.json({ error: 'Content section delete failed' }, { status: 500 });
  }
}
