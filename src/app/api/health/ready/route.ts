import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getMissingEnvVars } from '@/lib/runtime-env';

export async function GET() {
  const missingEnv = getMissingEnvVars();
  const enforceReadyEnv = Boolean(process.env.VERCEL);

  try {
    await db.$queryRawUnsafe('SELECT 1');
  } catch {
    return NextResponse.json({
      ok: false,
      checkedAt: new Date().toISOString(),
      database: 'unreachable',
      missingEnv,
    }, { status: 503 });
  }

  if (missingEnv.length > 0 && enforceReadyEnv) {
    return NextResponse.json({
      ok: false,
      checkedAt: new Date().toISOString(),
      database: 'reachable',
      missingEnv,
      envStatus: 'missing_required_runtime_env',
    }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    checkedAt: new Date().toISOString(),
    database: 'reachable',
    missingEnv,
    envStatus: missingEnv.length > 0 ? 'warning_local_missing_env' : 'ready',
  });
}
