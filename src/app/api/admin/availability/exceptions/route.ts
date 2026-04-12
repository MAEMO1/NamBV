import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { captureRouteException } from '@/lib/monitoring';
import { createV2AvailabilityException } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2AvailabilityExceptionWriteSchema } from '@/lib/v2/schemas';

export async function POST(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2AvailabilityExceptionWriteSchema.parse(body);
    const exception = await createV2AvailabilityException(payload, auth.user?.id);
    return NextResponse.json({ exception }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'An exception already exists for this date' }, { status: 409 });
    }

    captureRouteException(error, {
      action: 'admin.availability-exception.create',
      route: '/api/admin/availability/exceptions',
    });
    return NextResponse.json({ error: 'Availability exception create failed' }, { status: 500 });
  }
}
