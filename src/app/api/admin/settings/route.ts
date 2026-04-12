import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { db } from '@/lib/db';
import { captureRouteException } from '@/lib/monitoring';
import { defaultSettings } from '@/lib/v2/defaults';
import { replaceV2Settings } from '@/lib/v2/mutations';
import { requireV2AdminRequest, zodErrorResponse } from '@/lib/v2/request';
import { V2_ADMIN_KNOWN_SETTING_KEYS, v2SiteSettingSchema } from '@/lib/v2/schemas';

type AdminSettingResponse = {
  id: string | null;
  key: string;
  category: string;
  description: string | null;
  valueJson: Record<string, unknown>;
  hasStoredValue: boolean;
  isKnownKey: boolean;
};

function toSettingValue(value: unknown) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

export async function GET(request: NextRequest) {
  const auth = await requireV2AdminRequest(request);
  if (auth.response) {
    return auth.response;
  }

  const settings = await db.v2SiteSetting.findMany({
    orderBy: [{ category: 'asc' }, { key: 'asc' }],
  });

  const merged = new Map<string, AdminSettingResponse>(
    defaultSettings.map((setting) => [
      setting.key,
      {
        ...setting,
        id: null,
        description: setting.description ?? null,
        valueJson: toSettingValue(setting.valueJson),
        hasStoredValue: false,
        isKnownKey: true,
      },
    ]),
  );

  for (const setting of settings) {
    merged.set(setting.key, {
        ...setting,
        description: setting.description ?? null,
        valueJson: toSettingValue(setting.valueJson),
        hasStoredValue: true,
        isKnownKey: (V2_ADMIN_KNOWN_SETTING_KEYS as readonly string[]).includes(setting.key),
      });
  }

  return NextResponse.json({
    settings: Array.from(merged.values()).sort((left, right) => left.key.localeCompare(right.key)),
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

    captureRouteException(error, {
      action: 'admin.settings.replace',
      route: '/api/admin/settings',
    });
    return NextResponse.json({ error: 'Setting update failed' }, { status: 500 });
  }
}
