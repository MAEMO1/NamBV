import assert from 'node:assert/strict';
import test from 'node:test';
import { buildV2ActiveSlotKey } from './mutations';

test('buildV2ActiveSlotKey creates a stable key for a booked slot', () => {
  assert.equal(buildV2ActiveSlotKey('2026-05-14', '09:00'), '2026-05-14T09:00');
});
