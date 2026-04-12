import { readFile } from 'node:fs/promises';
import { REQUIRED_READY_ENV_KEYS } from '../src/lib/runtime-env';

type Args = {
  filePath: string;
  target: string;
};

function parseArgs(): Args {
  const fileFlag = process.argv.indexOf('--file');
  const targetFlag = process.argv.indexOf('--target');

  return {
    filePath: fileFlag >= 0 ? process.argv[fileFlag + 1] : '.env.vercel.preview.local',
    target: targetFlag >= 0 ? process.argv[targetFlag + 1] : 'preview',
  };
}

function extractKeys(text: string) {
  return new Set(
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('#'))
      .map((line) => line.split('=')[0]),
  );
}

async function main() {
  const { filePath, target } = parseArgs();
  const text = await readFile(filePath, 'utf8');
  const keys = extractKeys(text);
  const missing = REQUIRED_READY_ENV_KEYS.filter((key) => !keys.has(key));
  const adminSmokeKeys = ['V2_ADMIN_PASSWORD', 'ADMIN_PASSWORD', 'V2_ADMIN_EMAIL', 'ADMIN_EMAIL'].filter((key) => keys.has(key));

  const payload = {
    target,
    filePath,
    ready: missing.length === 0,
    missing,
    adminSmokeKeys,
  };

  console.log(JSON.stringify(payload, null, 2));

  if (missing.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('Release env check failed', error);
  process.exitCode = 1;
});
