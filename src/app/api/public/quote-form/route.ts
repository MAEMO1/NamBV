import { NextResponse } from 'next/server';
import { getV2QuoteFormOptions } from '@/lib/v2/public-data';

export async function GET() {
  const formOptions = await getV2QuoteFormOptions();
  return NextResponse.json(formOptions);
}
