import assert from 'node:assert/strict';
import test from 'node:test';
import { defaultPageSections } from './defaults';
import { getAdminV2Sections, getPublishedV2Sections, getV2PreviewPath } from './sections';

test('getV2PreviewPath maps known page keys to canonical locale-aware paths', () => {
  assert.equal(getV2PreviewPath('home'), '');
  assert.equal(getV2PreviewPath('projects'), '/projecten');
  assert.equal(getV2PreviewPath('service-full-renovation'), '/diensten/totaalrenovatie');
  assert.equal(getV2PreviewPath('terms'), '/algemene-voorwaarden');
});

test('getPublishedV2Sections lets stored unpublished rows suppress default content', () => {
  const defaults = defaultPageSections.filter((section) => section.pageKey === 'home' && section.locale === 'nl');

  const published = getPublishedV2Sections(defaults, [
    {
      id: 'override-hero',
      pageKey: 'home',
      sectionKey: 'hero',
      locale: 'nl',
      schemaKey: 'hero',
      dataJson: { title: 'Hidden hero' },
      displayOrder: 0,
      published: false,
    },
  ]);

  assert.equal(published.some((section) => section.sectionKey === 'hero'), false);
  assert.equal(published.some((section) => section.sectionKey === 'services'), true);
});

test('getAdminV2Sections exposes preview metadata and stored/default origin flags', () => {
  const sections = getAdminV2Sections([
    {
      id: 'stored-cta',
      pageKey: 'home',
      sectionKey: 'cta',
      locale: 'nl',
      schemaKey: 'cta',
      dataJson: { title: 'Stored CTA' },
      displayOrder: 2,
      published: true,
    },
  ]);

  const cta = sections.find((section) => section.id === 'stored-cta');
  const hero = sections.find((section) => section.pageKey === 'home' && section.locale === 'nl' && section.sectionKey === 'hero');

  assert.ok(cta);
  assert.equal(cta?.hasStoredValue, true);
  assert.equal(cta?.previewPath, '');
  assert.ok(hero);
  assert.equal(hero?.isDefault, true);
  assert.equal(hero?.hasStoredValue, false);
});
