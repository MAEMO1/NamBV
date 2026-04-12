import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { captureRouteException } from '@/lib/monitoring';
import { updateV2Appointment } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2AppointmentUpdateSchema } from '@/lib/v2/schemas';

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
    const payload = v2AppointmentUpdateSchema.parse(body);
    const { id } = await params;

    const appointment = await updateV2Appointment({
      appointmentId: id,
      actorId: auth.user?.id,
      status: payload.status,
      adminNotes: payload.adminNotes,
      proposedDate: payload.proposedDate,
      proposedTime: payload.proposedTime,
    });

    return NextResponse.json({ appointment });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    if (error instanceof Error && error.message === 'selected_slot_unavailable') {
      return NextResponse.json({ error: 'Selected slot is no longer available' }, { status: 409 });
    }

    if (error instanceof Error && error.message === 'appointment_not_found') {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    captureRouteException(error, {
      action: 'admin.appointment.patch',
      route: '/api/admin/appointments/[id]',
    });
    return NextResponse.json({ error: 'Appointment update failed' }, { status: 500 });
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

  const { id } = await params;
  await db.v2Appointment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
