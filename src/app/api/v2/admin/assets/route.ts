import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { replaceV2Assets } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2AssetSchema } from '@/lib/v2/schemas';

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const assets = await db.v2Asset.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ assets });
}

export async function PUT(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2AssetSchema.array().parse(body);
    await replaceV2Assets(payload, auth.user?.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    console.error('v2 assets replace failed', error);
    return NextResponse.json({ error: 'Asset update failed' }, { status: 500 });
  }
}
