import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { captureRouteException } from '@/lib/monitoring';
import { updateV2Quote } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2QuoteUpdateSchema } from '@/lib/v2/schemas';

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
    const payload = v2QuoteUpdateSchema.parse(body);
    const { id } = await params;

    const quote = await updateV2Quote({
      quoteId: id,
      actorId: auth.user?.id,
      status: payload.status,
      adminNotes: payload.adminNotes,
    });

    return NextResponse.json({ quote });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    captureRouteException(error, {
      action: 'admin.quote.patch',
      route: '/api/admin/quotes/[id]',
    });
    return NextResponse.json({ error: 'Quote update failed' }, { status: 500 });
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
  await db.v2QuoteRequest.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
