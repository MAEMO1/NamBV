import assert from 'node:assert/strict';
import test from 'node:test';
import { v2AppointmentCreateSchema, v2QuoteCreateSchema } from './schemas';

test('v2QuoteCreateSchema accepts valid quote payload', () => {
  const payload = v2QuoteCreateSchema.parse({
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '0493123456',
    postalCode: '9000',
    city: 'Gent',
    propertyTypeId: 'appartement',
    serviceTypeIds: ['totaalrenovatie'],
    description: 'We would like to renovate our kitchen and bathroom during the summer.',
    preferredStart: 'September 2026',
    budgetRange: 'RANGE_25K_50K',
    gdprConsent: true,
  });

  assert.equal(payload.email, 'test@example.com');
  assert.equal(payload.serviceTypeIds.length, 1);
});

test('v2AppointmentCreateSchema rejects invalid phone numbers', () => {
  assert.throws(() => {
    v2AppointmentCreateSchema.parse({
      name: 'Test User',
      email: 'test@example.com',
      phone: '123',
      gemeente: 'Gent',
      selectedDate: '2026-05-01',
      selectedTime: '09:00',
    });
  });
});
