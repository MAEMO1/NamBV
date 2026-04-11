import { defineConfig } from '@playwright/test';
import path from 'node:path';

if (typeof process.loadEnvFile === 'function') {
  process.loadEnvFile(path.resolve(process.cwd(), '.env'));
}

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3100';
const useExternalBaseUrl = Boolean(process.env.PLAYWRIGHT_BASE_URL);

export default defineConfig({
  testDir: './tests/smoke',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 120_000,
  expect: {
    timeout: 15_000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL,
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: useExternalBaseUrl
    ? undefined
    : {
        command: 'PORT=3100 npm run build && PORT=3100 npm run start',
        url: `${baseURL}/nl`,
        reuseExistingServer: false,
        timeout: 300_000,
      },
});
