import { expect, test } from '@playwright/test';

const legacyAdminPassword = process.env.ADMIN_PASSWORD ?? '';
const v2AdminEmail = process.env.V2_ADMIN_EMAIL || 'admin@namconstruction.be';
const v2AdminPassword = process.env.V2_ADMIN_PASSWORD || legacyAdminPassword;

async function expectPageOk(pagePath: string, page: import('@playwright/test').Page) {
  const response = await page.goto(pagePath);
  expect(response, `missing response for ${pagePath}`).not.toBeNull();
  expect(response?.status(), `unexpected status for ${pagePath}`).toBe(200);
}

async function expectVisibleHeading(page: import('@playwright/test').Page) {
  await expect(page.locator('h1:visible').first()).toBeVisible();
}

test('critical public pages render without error', async ({ page }) => {
  await expectPageOk('/nl', page);
  await expectVisibleHeading(page);

  await expectPageOk('/v2/nl', page);
  await expectVisibleHeading(page);

  await expectPageOk('/v2/nl/offerte', page);
  await expectVisibleHeading(page);
  await expect(page.locator('form')).toBeVisible();

  await expectPageOk('/v2/nl/afspraak', page);
  await expectVisibleHeading(page);
  await expect(page.locator('form')).toBeVisible();
});

test('legacy admin login protects appointments data', async ({ page }) => {
  test.skip(!legacyAdminPassword, 'ADMIN_PASSWORD is required for legacy admin smoke tests');

  const unauthResponse = await page.goto('/api/appointments');
  expect(unauthResponse?.status()).toBe(401);

  await expectPageOk('/admin/login', page);
  await page.getByLabel('Wachtwoord').fill(legacyAdminPassword);
  await page.getByRole('button', { name: /inloggen/i }).click();

  await page.waitForURL('**/admin');
  await expect(page.getByText('Dashboard').first()).toBeVisible();

  const apiCheck = await page.evaluate(async () => {
    const response = await fetch('/api/appointments');
    const payload = await response.json();
    return {
      status: response.status,
      hasAppointmentsArray: Array.isArray(payload.appointments),
    };
  });

  expect(apiCheck).toEqual({
    status: 200,
    hasAppointmentsArray: true,
  });
});

test('v2 public APIs and admin login stay healthy', async ({ page, request }) => {
  test.skip(!v2AdminPassword, 'ADMIN_PASSWORD or V2_ADMIN_PASSWORD is required for v2 admin smoke tests');

  for (const path of [
    '/api/v2/public/pages/home?locale=nl',
    '/api/v2/public/projects?locale=nl',
    '/api/v2/public/quote-form',
    '/api/v2/public/availability',
  ]) {
    const response = await request.get(path);
    expect(response.status(), `unexpected status for ${path}`).toBe(200);
  }

  const unauthAdminSession = await request.get('/api/v2/admin/session');
  expect(unauthAdminSession.status()).toBe(401);

  const invalidQuote = await request.post('/api/v2/quotes', {
    data: {},
  });
  expect(invalidQuote.status()).toBe(400);

  const invalidAppointment = await request.post('/api/v2/appointments', {
    data: {},
  });
  expect(invalidAppointment.status()).toBe(400);

  await expectPageOk('/admin-v2/login', page);
  await page.getByLabel('E-mail').fill(v2AdminEmail);
  await page.getByLabel('Wachtwoord').fill(v2AdminPassword);
  await page.getByRole('button', { name: /inloggen/i }).click();

  await page.waitForURL('**/admin-v2');
  const sessionCheck = await page.evaluate(async () => {
    const response = await fetch('/api/v2/admin/session');
    const payload = await response.json();
    return {
      status: response.status,
      authenticated: payload.authenticated === true,
      email: payload.user?.email ?? null,
    };
  });

  expect(sessionCheck).toEqual({
    status: 200,
    authenticated: true,
    email: v2AdminEmail,
  });
});
