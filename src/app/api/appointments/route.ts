import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { sendAdminNotification, sendAppointmentConfirmation } from '@/lib/email';
import { captureRouteException } from '@/lib/monitoring';
import { getAppointmentProjectTypeLabel, resolveAppointmentProjectTypeId } from '@/lib/v2/locale';
import { createV2Appointment } from '@/lib/v2/mutations';
import {
  getPublicWriteMetaFromRequest,
  hasTriggeredHoneypot,
  isPublicSubmissionRateLimited,
  normalizeSubmissionEmail,
  recordPublicSubmissionAttempt,
} from '@/lib/v2/public-write';
import { zodErrorResponse } from '@/lib/v2/request';
import { v2AppointmentCreateSchema } from '@/lib/v2/schemas';

async function sendAppointmentNotifications(input: {
  name: string;
  email: string;
  phone: string;
  gemeente: string;
  selectedDate: string;
  selectedTime: string;
  projectTypeLabel?: string;
  propertyType?: string;
  message?: string;
  referenceNumber: string;
}) {
  try {
    const [adminResult, confirmationResult] = await Promise.all([
      sendAdminNotification('appointment', {
        referenceNumber: input.referenceNumber,
        fullName: input.name,
        email: input.email,
        phone: input.phone,
        gemeente: input.gemeente,
        appointmentDate: input.selectedDate,
        appointmentTime: input.selectedTime,
        projectType: input.projectTypeLabel,
        propertyType: input.propertyType,
        message: input.message,
      }),
      sendAppointmentConfirmation({
        referenceNumber: input.referenceNumber,
        fullName: input.name,
        email: input.email,
        phone: input.phone,
        gemeente: input.gemeente,
        appointmentDate: input.selectedDate,
        appointmentTime: input.selectedTime,
        projectType: input.projectTypeLabel,
        propertyType: input.propertyType,
        message: input.message,
      }),
    ]);

    if (!adminResult.success) {
      captureRouteException(new Error(adminResult.error ?? 'appointment admin notification failed'), {
        action: 'appointment.notification.admin',
        route: '/api/appointments',
        extra: {
          referenceNumber: input.referenceNumber,
          recipient: 'ADMIN_EMAIL',
        },
      });
    }

    if (!confirmationResult.success) {
      captureRouteException(new Error(confirmationResult.error ?? 'appointment confirmation failed'), {
        action: 'appointment.notification.customer',
        route: '/api/appointments',
        extra: {
          referenceNumber: input.referenceNumber,
          recipient: input.email,
        },
      });
    }
  } catch (error) {
    captureRouteException(error, {
      action: 'appointment.notification',
      route: '/api/appointments',
      extra: {
        referenceNumber: input.referenceNumber,
      },
    });
  }
}

export async function POST(request: NextRequest) {
  let meta = getPublicWriteMetaFromRequest(request);

  try {
    const body = await request.json();
    const email = normalizeSubmissionEmail(body.email);
    meta = getPublicWriteMetaFromRequest(request, email);

    if (hasTriggeredHoneypot(body.website)) {
      await recordPublicSubmissionAttempt({
        kind: 'appointment',
        meta,
        wasAccepted: false,
        reason: 'honeypot',
      });
      return NextResponse.json({ success: true }, { status: 202 });
    }

    if (await isPublicSubmissionRateLimited('appointment', meta)) {
      await recordPublicSubmissionAttempt({
        kind: 'appointment',
        meta,
        wasAccepted: false,
        reason: 'rate_limited',
      });
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    const payload = v2AppointmentCreateSchema.parse(body);
    const appointment = await createV2Appointment(payload);
    const canonicalProjectTypeId = resolveAppointmentProjectTypeId(payload.projectTypeId);
    const projectTypeLabel = canonicalProjectTypeId
      ? getAppointmentProjectTypeLabel(payload.locale, canonicalProjectTypeId)
      : undefined;
    await recordPublicSubmissionAttempt({
      kind: 'appointment',
      meta,
      wasAccepted: true,
      reason: 'accepted',
    });
    await sendAppointmentNotifications({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      gemeente: payload.gemeente,
      selectedDate: payload.selectedDate,
      selectedTime: payload.selectedTime,
      referenceNumber: appointment.referenceNumber,
      projectTypeLabel,
      propertyType: payload.propertyType || undefined,
      message: payload.message || undefined,
    });

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
      await recordPublicSubmissionAttempt({
        kind: 'appointment',
        meta,
        wasAccepted: false,
        reason: 'validation_failed',
      });
      return zodErrorResponse(error);
    }

    if (error instanceof Error && error.message === 'selected_slot_unavailable') {
      await recordPublicSubmissionAttempt({
        kind: 'appointment',
        meta,
        wasAccepted: false,
        reason: 'slot_unavailable',
      });
      return NextResponse.json({ error: 'Selected slot is no longer available' }, { status: 409 });
    }

    captureRouteException(error, {
      action: 'appointment.create',
      route: '/api/appointments',
    });

    return NextResponse.json({ error: 'Appointment submission failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Use GET /api/public/availability for public availability and GET /api/admin/appointments for admin data.',
    },
    { status: 405 },
  );
}
