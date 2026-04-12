import assert from 'node:assert/strict';
import test from 'node:test';
import { hasTriggeredHoneypot, normalizeSubmissionEmail } from './public-write';

test('normalizeSubmissionEmail lowercases and trims incoming values', () => {
  assert.equal(normalizeSubmissionEmail('  USER@Example.com '), 'user@example.com');
  assert.equal(normalizeSubmissionEmail(''), null);
  assert.equal(normalizeSubmissionEmail(null), null);
});

test('hasTriggeredHoneypot only flags non-empty values', () => {
  assert.equal(hasTriggeredHoneypot(''), false);
  assert.equal(hasTriggeredHoneypot('   '), false);
  assert.equal(hasTriggeredHoneypot('https://spam.example'), true);
});
