import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { createV2Appointment } from '@/lib/v2/mutations';
import { v2AppointmentCreateSchema } from '@/lib/v2/schemas';
import { zodErrorResponse } from '@/lib/v2/request';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = v2AppointmentCreateSchema.parse(body);
    const appointment = await createV2Appointment(payload);

    return NextResponse.json(
      {
        success: true,
        id: appointment.id,
        referenceNumber: appointment.referenceNumber,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    if (error instanceof Error && error.message === 'selected_slot_unavailable') {
      return NextResponse.json({ error: 'Selected slot is no longer available' }, { status: 409 });
    }

    console.error('v2 appointment create failed', error);
    return NextResponse.json({ error: 'Appointment submission failed' }, { status: 500 });
  }
}
