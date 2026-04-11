import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { defaultSettings } from '@/lib/v2/defaults';
import { replaceV2Settings } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2SiteSettingSchema } from '@/lib/v2/schemas';

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const settings = await db.v2SiteSetting.findMany({
    orderBy: [{ category: 'asc' }, { key: 'asc' }],
  });

  return NextResponse.json({
    settings: settings.length > 0 ? settings : defaultSettings,
  });
}

export async function PUT(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2SiteSettingSchema.array().parse(body);
    await replaceV2Settings(payload, auth.user?.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    console.error('v2 settings replace failed', error);
    return NextResponse.json({ error: 'Setting update failed' }, { status: 500 });
  }
}
