import { expect, test } from '@playwright/test';

const adminEmail = process.env.V2_ADMIN_EMAIL || 'admin@namconstruction.be';
const adminPassword = process.env.V2_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || '';

async function expectPageOk(pagePath: string, page: import('@playwright/test').Page) {
  const response = await page.goto(pagePath);
  expect(response, `missing response for ${pagePath}`).not.toBeNull();
  expect(response?.status(), `unexpected status for ${pagePath}`).toBe(200);
}

async function expectVisibleHeading(page: import('@playwright/test').Page) {
  await expect(page.locator('h1:visible').first()).toBeVisible();
}

test('canonical public pages render without error', async ({ page, request }) => {
  for (const path of ['/nl', '/nl/offerte', '/nl/afspraak', '/nl/projecten', '/nl/diensten', '/nl/contact']) {
    await expectPageOk(path, page);
    await expectVisibleHeading(page);
  }

  for (const path of ['/v2/nl', '/v2/nl/offerte', '/v2/nl/projecten', '/admin-v2/login']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), `unexpected redirect status for ${path}`).toBe(308);
  }
});

test('canonical public APIs stay healthy', async ({ request }) => {
  for (const path of [
    '/api/public/pages/home?locale=nl',
    '/api/public/projects?locale=nl',
    '/api/public/quote-form',
    '/api/public/availability',
  ]) {
    const response = await request.get(path);
    expect(response.status(), `unexpected status for ${path}`).toBe(200);
  }

  const legacyProjects = await request.get('/api/projects?locale=nl');
  expect(legacyProjects.status()).toBe(200);

  const legacyAvailability = await request.get('/api/availability');
  expect(legacyAvailability.status()).toBe(200);

  const invalidQuote = await request.post('/api/quotes', { data: {} });
  expect(invalidQuote.status()).toBe(400);

  const invalidAppointment = await request.post('/api/appointments', { data: {} });
  expect(invalidAppointment.status()).toBe(400);

  const wrongGetAppointments = await request.get('/api/appointments');
  expect(wrongGetAppointments.status()).toBe(405);
});

test('admin login uses canonical session contract and protects admin data', async ({ page, request }) => {
  test.skip(!adminPassword, 'V2_ADMIN_PASSWORD or ADMIN_PASSWORD is required for admin smoke tests');

  const unauthSession = await request.get('/api/admin/session');
  expect(unauthSession.status()).toBe(401);

  const unauthAppointments = await request.get('/api/admin/appointments');
  expect(unauthAppointments.status()).toBe(401);

  await expectPageOk('/admin/login', page);
  await page.getByLabel('E-mail').fill(adminEmail);
  await page.getByLabel('Wachtwoord').fill(adminPassword);
  await page.getByRole('button', { name: /inloggen/i }).click();

  await page.waitForURL('**/admin');

  const sessionCheck = await page.evaluate(async () => {
    const sessionResponse = await fetch('/api/admin/session');
    const sessionPayload = await sessionResponse.json();
    const appointmentsResponse = await fetch('/api/admin/appointments');
    const appointmentsPayload = await appointmentsResponse.json();

    return {
      sessionStatus: sessionResponse.status,
      authenticated: sessionPayload.authenticated === true,
      email: sessionPayload.user?.email ?? null,
      appointmentsStatus: appointmentsResponse.status,
      hasAppointmentsArray: Array.isArray(appointmentsPayload.appointments),
    };
  });

  expect(sessionCheck).toEqual({
    sessionStatus: 200,
    authenticated: true,
    email: adminEmail,
    appointmentsStatus: 200,
    hasAppointmentsArray: true,
  });
});
