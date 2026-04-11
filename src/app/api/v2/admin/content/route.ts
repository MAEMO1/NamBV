import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { defaultPageSections } from '@/lib/v2/defaults';
import { replaceV2PageSections } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2PageSectionSchema } from '@/lib/v2/schemas';

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const sections = await db.v2PageSection.findMany({
    orderBy: [{ pageKey: 'asc' }, { locale: 'asc' }, { displayOrder: 'asc' }],
  });

  return NextResponse.json({
    sections: sections.length > 0 ? sections : defaultPageSections,
  });
}

export async function PUT(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2PageSectionSchema.array().parse(body);
    await replaceV2PageSections(payload, auth.user?.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    console.error('v2 content replace failed', error);
    return NextResponse.json({ error: 'Content update failed' }, { status: 500 });
  }
}
