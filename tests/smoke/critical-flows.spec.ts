import { expect, test } from '@playwright/test';

const adminEmail = process.env.V2_ADMIN_EMAIL || 'admin@namconstruction.be';
const adminPassword = process.env.V2_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || '';
const runMutatingAdminSmoke = process.env.ADMIN_SMOKE_MUTATIONS === '1';
const runAssetSmoke = process.env.RUN_ASSET_SMOKE === '1';
const vercelShareUrl = process.env.VERCEL_SHARE_URL || '';
const playwrightBaseUrl = process.env.PLAYWRIGHT_BASE_URL || '';

async function bootstrapProtectedDeploymentAccess(page: import('@playwright/test').Page) {
  if (!vercelShareUrl) {
    if (page.url() === 'about:blank') {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
    }
    return;
  }

  await page.goto(vercelShareUrl);
  await page.waitForLoadState('networkidle');
}

async function browserRequest<T = unknown>(
  page: import('@playwright/test').Page,
  url: string,
  init?: RequestInit,
) {
  return page.evaluate(
    async ({ url: targetUrl, init: requestInit, baseUrl }) => {
      const resolvedUrl = targetUrl.startsWith('http://') || targetUrl.startsWith('https://')
        ? targetUrl
        : new URL(targetUrl, baseUrl || window.location.href).toString();
      const response = await fetch(resolvedUrl, requestInit);
      const text = await response.text();
      let json: T | null = null;

      if (text) {
        try {
          json = JSON.parse(text) as T;
        } catch {
          json = null;
        }
      }

      return {
        status: response.status,
        text,
        json,
      };
    },
    { url, init, baseUrl: playwrightBaseUrl },
  );
}

async function expectPageOk(pagePath: string, page: import('@playwright/test').Page) {
  const response = await page.goto(pagePath);
  expect(response, `missing response for ${pagePath}`).not.toBeNull();
  expect(response?.status(), `unexpected status for ${pagePath}`).toBe(200);
  await page.waitForLoadState('networkidle');
}

async function expectVisibleHeading(page: import('@playwright/test').Page) {
  await expect(page.locator('h1:visible').first()).toBeVisible();
}

async function loginAsAdmin(page: import('@playwright/test').Page) {
  await bootstrapProtectedDeploymentAccess(page);
  await expectPageOk('/admin/login', page);
  await page.getByLabel('E-mail').fill(adminEmail);
  await page.getByLabel('Wachtwoord').fill(adminPassword);
  await page.getByRole('button', { name: /inloggen/i }).click();
  await page.waitForURL('**/admin');
}

test('canonical public pages render without error', async ({ page }) => {
  await bootstrapProtectedDeploymentAccess(page);

  for (const path of ['/nl', '/nl/offerte', '/nl/afspraak', '/nl/projecten', '/nl/diensten', '/nl/contact']) {
    await expectPageOk(path, page);
    await expectVisibleHeading(page);
  }
});

test('canonical public APIs and health stay healthy', async ({ page }) => {
  await bootstrapProtectedDeploymentAccess(page);

  for (const path of [
    '/api/public/pages/home?locale=nl',
    '/api/public/projects?locale=nl',
    '/api/public/quote-form',
    '/api/public/availability',
    '/api/health/live',
    '/api/health/ready',
    '/robots.txt',
    '/sitemap.xml',
  ]) {
    const response = await browserRequest(page, path);
    expect(response.status, `unexpected status for ${path}`).toBe(200);
  }

  const invalidQuote = await browserRequest(page, '/api/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  expect(invalidQuote.status).toBe(400);

  const invalidAppointment = await browserRequest(page, '/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  expect(invalidAppointment.status).toBe(400);

  const wrongGetAppointments = await browserRequest(page, '/api/appointments');
  expect(wrongGetAppointments.status).toBe(405);

  const removedLegacyAnalytics = await browserRequest(page, '/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'event', eventName: 'smoke_test_probe', path: '/nl' }),
  });
  expect(removedLegacyAnalytics.status).toBe(410);
});

test('admin login uses canonical session contract and protects admin data', async ({ page }) => {
  test.skip(!adminPassword, 'V2_ADMIN_PASSWORD or ADMIN_PASSWORD is required for admin smoke tests');

  await bootstrapProtectedDeploymentAccess(page);

  const unauthSession = await browserRequest(page, '/api/admin/session');
  expect(unauthSession.status).toBe(401);

  const unauthAppointments = await browserRequest(page, '/api/admin/appointments');
  expect(unauthAppointments.status).toBe(401);

  await loginAsAdmin(page);
  await expect(page.getByTestId('admin-page-title')).toBeVisible();
  await expect(page.getByRole('button', { name: /content/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /projecten/i })).toBeVisible();

  const sessionCheck = await page.evaluate(async () => {
    const sessionResponse = await fetch('/api/admin/session');
    const sessionText = await sessionResponse.text();
    const sessionPayload = sessionText ? JSON.parse(sessionText) : null;
    const appointmentsResponse = await fetch('/api/admin/appointments');
    const appointmentsText = await appointmentsResponse.text();
    const appointmentsPayload = appointmentsText ? JSON.parse(appointmentsText) : null;

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

test('admin mutation smoke exercises canonical item-level contracts', async ({ page }) => {
  test.skip(!adminPassword, 'V2_ADMIN_PASSWORD or ADMIN_PASSWORD is required for admin smoke tests');
  test.skip(!runMutatingAdminSmoke, 'Set ADMIN_SMOKE_MUTATIONS=1 to run mutating admin smoke.');

  await loginAsAdmin(page);

  const smokeSlug = `smoke-project-${Date.now()}`;
  const smokeDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const created = await page.evaluate(async ({ smokeSlug, smokeDate, runAssetSmoke }) => {
    async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
      const response = await fetch(url, init);
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || `${url} failed with ${response.status}`);
      }

      return payload as T;
    }

    const settingsPayload = await fetchJson<{ settings: Array<Record<string, unknown>> }>('/api/admin/settings');
    const company = settingsPayload.settings.find((setting) => setting.key === 'company');
    if (!company) {
      throw new Error('Missing company setting');
    }

    await fetchJson('/api/admin/settings/company', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: company.category,
        description: company.description ?? null,
        valueJson: company.valueJson,
      }),
    });

    const contentPayload = await fetchJson<{ sections: Array<Record<string, unknown>> }>('/api/admin/content');
    const section = contentPayload.sections.find((entry) => typeof entry.id === 'string');
    if (!section || typeof section.id !== 'string') {
      throw new Error('Missing content section');
    }

    await fetchJson(`/api/admin/content/${section.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        displayOrder: section.displayOrder,
        published: section.published,
        dataJson: section.dataJson,
      }),
    });

    let uploadedAsset: null | { id: string; url: string } = null;

    if (runAssetSmoke) {
      const formData = new FormData();
      formData.append('file', new File(['smoke asset'], 'smoke.txt', { type: 'text/plain' }));
      formData.append('alt', 'Smoke asset');
      formData.append('tags', 'smoke,admin');

      const assetResponse = await fetch('/api/admin/assets/upload', {
        method: 'POST',
        body: formData,
      });

      const assetPayload = await assetResponse.json().catch(() => null);
      if (!assetResponse.ok) {
        throw new Error(assetPayload?.error || `asset upload failed with ${assetResponse.status}`);
      }

      uploadedAsset = {
        id: assetPayload.asset.id,
        url: assetPayload.asset.url,
      };
    }

    const projectPayload = {
      slug: smokeSlug,
      category: 'Smoke test',
      location: 'Gent',
      year: new Date().getFullYear(),
      featured: false,
      isPublished: true,
      sortOrder: 9999,
      coverImageUrl: uploadedAsset?.url ?? 'https://example.com/smoke.jpg',
      translations: [
        {
          locale: 'nl',
          title: 'Smoke test project',
          shortDescription: 'Tijdelijk project voor smoke tests',
          description: 'Tijdelijk project voor smoke tests',
        },
        {
          locale: 'fr',
          title: 'Projet smoke test',
          shortDescription: 'Projet temporaire de smoke test',
          description: 'Projet temporaire de smoke test',
        },
        {
          locale: 'en',
          title: 'Smoke test project',
          shortDescription: 'Temporary smoke test project',
          description: 'Temporary smoke test project',
        },
      ],
      images: uploadedAsset ? [
        {
          imageUrl: uploadedAsset.url,
          alt: 'Smoke asset',
          caption: 'Smoke asset',
          sortOrder: 0,
          kind: 'gallery',
        },
      ] : [],
    };

    const projectResponse = await fetchJson<{ project: { id: string; slug: string } }>('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectPayload),
    });

    const exceptionResponse = await fetchJson<{ exception: { id: string } }>('/api/admin/availability/exceptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: smokeDate,
        blockedTimes: ['all'],
        reason: 'Smoke test block',
      }),
    });

    return {
      projectId: projectResponse.project.id,
      projectSlug: projectResponse.project.slug,
      availabilityExceptionId: exceptionResponse.exception.id,
      assetId: uploadedAsset?.id ?? null,
      assetUrl: uploadedAsset?.url ?? null,
    };
  }, { smokeSlug, smokeDate, runAssetSmoke });

  const publicProjectPage = await browserRequest(page, `/nl/projecten/${created.projectSlug}`);
  expect(publicProjectPage.status).toBe(200);

  const publicProjectsResponse = await browserRequest<{ projects: Array<{ slug: string }> }>(page, '/api/public/projects?locale=nl');
  expect(publicProjectsResponse.status).toBe(200);
  expect(publicProjectsResponse.json?.projects.some((project) => project.slug === created.projectSlug)).toBe(true);

  await page.evaluate(async ({ projectId, availabilityExceptionId, assetId }) => {
    async function cleanup(url: string) {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || `${url} cleanup failed with ${response.status}`);
      }
    }

    await cleanup(`/api/admin/availability/exceptions/${availabilityExceptionId}`);
    await cleanup(`/api/admin/projects/${projectId}`);

    if (assetId) {
      await cleanup(`/api/admin/assets/${assetId}`);
    }
  }, created);
});
