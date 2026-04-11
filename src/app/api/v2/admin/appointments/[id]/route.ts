import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
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

    console.error('v2 appointment update failed', error);
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
