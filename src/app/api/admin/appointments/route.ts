import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireV2AdminRequest } from '@/lib/v2/request';

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const includeDeleted = request.nextUrl.searchParams.get('includeDeleted') === 'true';
  const appointments = await db.v2Appointment.findMany({
    where: includeDeleted ? undefined : { deletedAt: null },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ appointments });
}
