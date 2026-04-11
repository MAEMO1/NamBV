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

test('defaultProjects include translations and images', () => {
  assert.ok(defaultProjects.length >= 3);
  for (const project of defaultProjects) {
    assert.ok(project.images.length > 0);
    assert.ok(project.translations.length >= 3);
  }
});
