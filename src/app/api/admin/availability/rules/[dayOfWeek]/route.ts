import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { captureRouteException } from '@/lib/monitoring';
import { upsertV2AvailabilityRule } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2AvailabilityRuleSchema } from '@/lib/v2/schemas';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ dayOfWeek: string }> },
) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2AvailabilityRuleSchema.parse(body);
    const { dayOfWeek } = await params;
    const parsedDay = Number.parseInt(dayOfWeek, 10);

    if (parsedDay !== payload.dayOfWeek) {
      return NextResponse.json({ error: 'Day of week mismatch' }, { status: 400 });
    }

    const rule = await upsertV2AvailabilityRule(payload.dayOfWeek, payload.timeSlots, payload.isActive, auth.user?.id);
    return NextResponse.json({ rule });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'Availability rule conflict' }, { status: 409 });
    }

    captureRouteException(error, {
      action: 'admin.availability-rule.patch',
      route: '/api/admin/availability/rules/[dayOfWeek]',
    });
    return NextResponse.json({ error: 'Availability rule update failed' }, { status: 500 });
  }
}
