import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { captureRouteException } from '@/lib/monitoring';
import { createV2AssetRecord, replaceV2Assets } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { v2AssetSchema } from '@/lib/v2/schemas';
import {
  getSupabaseAdminClient,
  hasSupabaseAdminStorage,
  isSupabaseManagedBucket,
} from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const assets = await db.v2Asset.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    assets,
    storageEnabled: hasSupabaseAdminStorage(),
    uploadBucket: 'project-photos',
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2AssetSchema.parse(body);
    const asset = await createV2AssetRecord(payload, auth.user?.id);
    return NextResponse.json({ asset }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    captureRouteException(error, {
      action: 'admin.asset.create',
      route: '/api/admin/assets',
    });
    return NextResponse.json({ error: 'Asset create failed' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const existingAssets = await db.v2Asset.findMany({
      select: {
        bucket: true,
        path: true,
      },
    });
    const body = await request.json();
    const payload = v2AssetSchema.array().parse(body);
    await replaceV2Assets(payload, auth.user?.id);

    const retainedAssetKeys = new Set(payload.map((asset) => `${asset.bucket}:${asset.path}`));
    const removedAssets = existingAssets.filter((asset) => (
      isSupabaseManagedBucket(asset.bucket)
      && !retainedAssetKeys.has(`${asset.bucket}:${asset.path}`)
    ));

    if (removedAssets.length > 0 && hasSupabaseAdminStorage()) {
      const supabase = getSupabaseAdminClient();
      const pathsByBucket = new Map<string, string[]>();

      for (const asset of removedAssets) {
        const currentPaths = pathsByBucket.get(asset.bucket) ?? [];
        currentPaths.push(asset.path);
        pathsByBucket.set(asset.bucket, currentPaths);
      }

      for (const [bucket, paths] of pathsByBucket) {
        const removal = await supabase.storage.from(bucket).remove(paths);
        if (removal.error) {
          captureRouteException(removal.error, {
            action: 'admin.asset.replace.cleanup',
            route: '/api/admin/assets',
            extra: {
              bucket,
              pathCount: paths.length,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    captureRouteException(error, {
      action: 'admin.asset.replace',
      route: '/api/admin/assets',
    });
    return NextResponse.json({ error: 'Asset update failed' }, { status: 500 });
  }
}
