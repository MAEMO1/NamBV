import assert from 'node:assert/strict';
import test from 'node:test';
import { defaultPageSections, defaultProjects } from './defaults';

test('defaultPageSections cover every locale for core pages', () => {
  const keys = new Set(defaultPageSections.map((section) => `${section.pageKey}:${section.locale}`));
  assert.ok(keys.has('home:nl'));
  assert.ok(keys.has('home:fr'));
  assert.ok(keys.has('home:en'));
  assert.ok(keys.has('quote:nl'));
  assert.ok(keys.has('appointment:en'));
});

test('approach defaults expose the restored section set for every locale', () => {
  for (const locale of ['nl', 'fr', 'en'] as const) {
    const sections = defaultPageSections
      .filter((section) => section.pageKey === 'approach' && section.locale === locale)
      .sort((left, right) => left.displayOrder - right.displayOrder);

    assert.deepEqual(
      sections.map((section) => `${section.displayOrder}:${section.sectionKey}:${section.schemaKey}`),
      [
        '0:hero:hero',
        '1:steps:feature-list',
        '2:value-highlights:feature-list',
        '3:principles:content',
        '4:guarantees:feature-list',
        '5:faq:faq',
        '6:cta:cta',
      ],
    );
  }
});

test('defaultProjects include translations and images', () => {
  assert.ok(defaultProjects.length >= 3);
  for (const project of defaultProjects) {
    assert.ok(project.images.length > 0);
    assert.ok(project.translations.length >= 3);
  }
});
