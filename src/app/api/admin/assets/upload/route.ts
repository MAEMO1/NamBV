import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { captureRouteException } from '@/lib/monitoring';
import { createV2AssetRecord } from '@/lib/v2/mutations';
import { requireV2AdminRequest } from '@/lib/v2/request';
import { getSupabaseAdminClient, hasSupabaseAdminStorage } from '@/lib/supabase-admin';
import { getStoragePublicUrl } from '@/lib/supabase';

function sanitizeFileName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function POST(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  if (!hasSupabaseAdminStorage()) {
    return NextResponse.json({ error: 'Supabase admin storage is not configured' }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const bucket = typeof formData.get('bucket') === 'string' && formData.get('bucket')
      ? String(formData.get('bucket'))
      : 'project-photos';
    const alt = typeof formData.get('alt') === 'string' ? String(formData.get('alt')) : null;
    const tags = typeof formData.get('tags') === 'string'
      ? String(formData.get('tags'))
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    const fileName = sanitizeFileName(file.name) || `asset-${Date.now()}`;
    const path = `${new Date().toISOString().slice(0, 10)}/${randomUUID()}-${fileName}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const supabase = getSupabaseAdminClient();
    const upload = await supabase.storage.from(bucket).upload(path, buffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });

    if (upload.error) {
      captureRouteException(upload.error, {
        action: 'admin.asset-upload.storage',
        route: '/api/admin/assets/upload',
      });
      return NextResponse.json({ error: 'Asset upload failed' }, { status: 500 });
    }

    const asset = await createV2AssetRecord({
      filename: fileName,
      originalName: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      bucket,
      path,
      url: getStoragePublicUrl(bucket, path),
      alt,
      width: null,
      height: null,
      tags,
    }, auth.user?.id);

    return NextResponse.json({ asset }, { status: 201 });
  } catch (error) {
    captureRouteException(error, {
      action: 'admin.asset-upload',
      route: '/api/admin/assets/upload',
    });
    return NextResponse.json({ error: 'Asset upload failed' }, { status: 500 });
  }
}
