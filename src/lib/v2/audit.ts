import { db } from '@/lib/db';
import { toInputJsonValue } from './json';

export async function recordV2AuditEvent(input: {
  action: string;
  entityType: string;
  entityId: string;
  actorId?: string | null;
  payload?: Record<string, unknown> | null;
}) {
  await db.v2AuditEvent.create({
    data: {
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      actorId: input.actorId ?? null,
      payload: input.payload ? toInputJsonValue(input.payload) : undefined,
    },
  });
}

export async function recordV2LeadEvent(input: {
  leadType: 'quote' | 'appointment';
  leadId: string;
  eventType: string;
  payload?: Record<string, unknown> | null;
}) {
  await db.v2LeadEvent.create({
    data: {
      leadType: input.leadType,
      leadId: input.leadId,
      eventType: input.eventType,
      quoteId: input.leadType === 'quote' ? input.leadId : null,
      appointmentId: input.leadType === 'appointment' ? input.leadId : null,
      payload: input.payload ? toInputJsonValue(input.payload) : undefined,
    },
  });
}
