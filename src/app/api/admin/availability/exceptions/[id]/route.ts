import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { captureRouteException } from '@/lib/monitoring';
import {
  deleteV2AvailabilityException,
  updateV2AvailabilityException,
} from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2AvailabilityExceptionWriteSchema } from '@/lib/v2/schemas';

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
    const payload = v2AvailabilityExceptionWriteSchema.parse(body);
    const { id } = await params;
    const exception = await updateV2AvailabilityException(id, payload, auth.user?.id);
    return NextResponse.json({ exception });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Availability exception not found' }, { status: 404 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'An exception already exists for this date' }, { status: 409 });
    }

    captureRouteException(error, {
      action: 'admin.availability-exception.patch',
      route: '/api/admin/availability/exceptions/[id]',
    });
    return NextResponse.json({ error: 'Availability exception update failed' }, { status: 500 });
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
    await deleteV2AvailabilityException(id, auth.user?.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Availability exception not found' }, { status: 404 });
    }

    captureRouteException(error, {
      action: 'admin.availability-exception.delete',
      route: '/api/admin/availability/exceptions/[id]',
    });
    return NextResponse.json({ error: 'Availability exception delete failed' }, { status: 500 });
  }
}
