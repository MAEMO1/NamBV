import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeV2Locale } from './locale';

test('normalizeV2Locale falls back to nl', () => {
  assert.equal(normalizeV2Locale(), 'nl');
  assert.equal(normalizeV2Locale('de'), 'nl');
});

test('normalizeV2Locale keeps known locales', () => {
  assert.equal(normalizeV2Locale('nl'), 'nl');
  assert.equal(normalizeV2Locale('fr'), 'fr');
  assert.equal(normalizeV2Locale('en'), 'en');
});
