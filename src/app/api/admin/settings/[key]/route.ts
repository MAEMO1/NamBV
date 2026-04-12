import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { captureRouteException } from '@/lib/monitoring';
import { upsertV2SiteSetting } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import {
  getV2KnownSettingValueSchema,
  V2_ADMIN_KNOWN_SETTING_KEYS,
  v2KnownSettingKeySchema,
  v2SiteSettingUpdateSchema,
} from '@/lib/v2/schemas';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> },
) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const payload = v2SiteSettingUpdateSchema.parse(body);
    const { key } = await params;

    if ((V2_ADMIN_KNOWN_SETTING_KEYS as readonly string[]).includes(key)) {
      const knownKey = v2KnownSettingKeySchema.parse(key);
      payload.valueJson = getV2KnownSettingValueSchema(knownKey).parse(payload.valueJson);
    }

    const setting = await upsertV2SiteSetting(key, payload, auth.user?.id);
    return NextResponse.json({ setting });
  } catch (error) {
    if (error instanceof ZodError) {
      return zodErrorResponse(error);
    }

    captureRouteException(error, {
      action: 'admin.setting.patch',
      route: '/api/admin/settings/[key]',
    });
    return NextResponse.json({ error: 'Setting update failed' }, { status: 500 });
  }
}
