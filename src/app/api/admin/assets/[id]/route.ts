import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { captureRouteException } from '@/lib/monitoring';
import { deleteV2Asset, updateV2Asset } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2AssetUpdateSchema } from '@/lib/v2/schemas';
import {
  getSupabaseAdminClient,
  hasSupabaseAdminStorage,
  isSupabaseManagedBucket,
} from '@/lib/supabase-admin';

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
    const payload = v2AssetUpdateSchema.parse(body);
    const { id } = await params;
    const asset = await updateV2Asset(id, payload, auth.user?.id);
    return NextResponse.json({ asset });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    captureRouteException(error, {
      action: 'admin.asset.patch',
      route: '/api/admin/assets/[id]',
    });
    return NextResponse.json({ error: 'Asset update failed' }, { status: 500 });
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

  try {
    const { id } = await params;
    const asset = await db.v2Asset.findUnique({
      where: { id },
    });

    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    if (hasSupabaseAdminStorage() && isSupabaseManagedBucket(asset.bucket)) {
      const supabase = getSupabaseAdminClient();
      const removal = await supabase.storage.from(asset.bucket).remove([asset.path]);
      if (removal.error) {
        captureRouteException(removal.error, {
          action: 'admin.asset.delete.storage',
          route: '/api/admin/assets/[id]',
        });
      }
    }

    await deleteV2Asset(id, auth.user?.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    captureRouteException(error, {
      action: 'admin.asset.delete',
      route: '/api/admin/assets/[id]',
    });
    return NextResponse.json({ error: 'Asset delete failed' }, { status: 500 });
  }
}
