import { NextResponse } from 'next/server';
import { getV2QuoteFormOptions, getV2SettingsMap } from '@/lib/v2/public-data';

export async function GET() {
  const [formOptions, settings] = await Promise.all([
    getV2QuoteFormOptions(),
    getV2SettingsMap(),
  ]);

  return NextResponse.json({
    ...formOptions,
    settings,
  });
}
