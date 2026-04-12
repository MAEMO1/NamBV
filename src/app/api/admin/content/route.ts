import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { captureRouteException } from '@/lib/monitoring';
import { replaceV2PageSections, upsertV2PageSection } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2PageSectionSchema } from '@/lib/v2/schemas';
import { getAdminV2Sections, getV2AdminPageOptions } from '@/lib/v2/sections';

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const sections = await db.v2PageSection.findMany({
    orderBy: [{ pageKey: 'asc' }, { locale: 'asc' }, { displayOrder: 'asc' }],
  });

  return NextResponse.json({
    sections: getAdminV2Sections(sections),
    pages: getV2AdminPageOptions(sections.map((section) => section.pageKey)),
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2PageSectionSchema.parse(body);
    const section = await upsertV2PageSection(payload, auth.user?.id);
    return NextResponse.json({ section }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    captureRouteException(error, {
      action: 'admin.content.upsert',
      route: '/api/admin/content',
    });
    return NextResponse.json({ error: 'Content section upsert failed' }, { status: 500 });
  }
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

    captureRouteException(error, {
      action: 'admin.content.replace',
      route: '/api/admin/content',
    });
    return NextResponse.json({ error: 'Content update failed' }, { status: 500 });
  }
}
