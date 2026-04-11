import test from 'node:test'
import assert from 'node:assert/strict'
import {
  createLegacyAdminSessionToken,
  verifyLegacyAdminSessionToken,
} from './legacy-session'

test('legacy admin session tokens round-trip and preserve the subject', async () => {
  process.env.ADMIN_SESSION_SECRET = 'test-secret'

  const token = await createLegacyAdminSessionToken('user-123')
  const payload = await verifyLegacyAdminSessionToken(token)

  assert.ok(payload)
  assert.equal(payload?.sub, 'user-123')
})

test('legacy admin session tokens reject tampering', async () => {
  process.env.ADMIN_SESSION_SECRET = 'test-secret'

  const token = await createLegacyAdminSessionToken('user-123')
  const tamperedToken = `${token.slice(0, -1)}x`
  const payload = await verifyLegacyAdminSessionToken(tamperedToken)

  assert.equal(payload, null)
})
