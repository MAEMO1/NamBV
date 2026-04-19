import assert from 'node:assert/strict';
import test from 'node:test';
import { v2AppointmentCreateSchema, v2PageSectionSchema, v2QuoteCreateSchema } from './schemas';

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

test('v2AppointmentCreateSchema normalizes a localized project type label to a canonical id', () => {
  const payload = v2AppointmentCreateSchema.parse({
    locale: 'fr',
    name: 'Test User',
    email: 'test@example.com',
    phone: '0493123456',
    gemeente: 'Gent',
    selectedDate: '2026-05-01',
    selectedTime: '09:00',
    projectType: 'Rénovation & transformation',
  });

  assert.equal(payload.locale, 'fr');
  assert.equal(payload.projectTypeId, 'renovatie');
});

test('v2AppointmentCreateSchema rejects unknown project type ids', () => {
  assert.throws(() => {
    v2AppointmentCreateSchema.parse({
      locale: 'nl',
      name: 'Test User',
      email: 'test@example.com',
      phone: '0493123456',
      gemeente: 'Gent',
      selectedDate: '2026-05-01',
      selectedTime: '09:00',
      projectTypeId: 'keuken',
    });
  });
});

test('v2PageSectionSchema accepts valid faq section data and rejects incomplete faq items', () => {
  const payload = v2PageSectionSchema.parse({
    pageKey: 'approach',
    sectionKey: 'faq',
    locale: 'nl',
    schemaKey: 'faq',
    displayOrder: 4,
    published: true,
    dataJson: {
      eyebrow: 'FAQ',
      title: 'Veelgestelde vragen',
      description: 'Antwoorden op de meest voorkomende vragen.',
      items: [
        {
          question: 'Hoe lang duurt het voor ik een offerte krijg?',
          answer: 'Na het plaatsbezoek ontvangt u binnen 1 à 2 weken een gedetailleerde offerte.',
        },
      ],
    },
  });

  assert.equal(payload.schemaKey, 'faq');
  assert.equal(Array.isArray(payload.dataJson.items), true);

  assert.throws(() => {
    v2PageSectionSchema.parse({
      pageKey: 'approach',
      sectionKey: 'faq',
      locale: 'nl',
      schemaKey: 'faq',
      displayOrder: 4,
      published: true,
      dataJson: {
        items: [
          {
            question: 'Vraag zonder antwoord',
          },
        ],
      },
    });
  });
});
