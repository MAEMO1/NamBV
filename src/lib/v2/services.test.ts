import assert from 'node:assert/strict';
import test from 'node:test';
import { defaultQuoteFormOptions } from './defaults';
import { V2_LOCALES, getV2UiCopy } from './locale';
import { TOP_SERVICE_IDS, getTopServiceIdForQuoteServiceSlug } from './services';

test('quote top-category labels stay aligned with TOP_SERVICE_IDS in every locale', () => {
  for (const locale of V2_LOCALES) {
    assert.deepEqual(
      getV2UiCopy(locale).quote.serviceCategories.map((category) => category.id),
      [...TOP_SERVICE_IDS],
    );
  }
});

test('quote service slugs resolve to the expected top-level service ids', () => {
  assert.equal(getTopServiceIdForQuoteServiceSlug('badkamer'), 'renovatie');
  assert.equal(getTopServiceIdForQuoteServiceSlug('schilderwerk'), 'afwerking');
  assert.equal(getTopServiceIdForQuoteServiceSlug('sanitair'), 'technieken');
  assert.equal(getTopServiceIdForQuoteServiceSlug('anders'), 'anders');

  for (const serviceType of defaultQuoteFormOptions.serviceTypes) {
    assert.equal(getTopServiceIdForQuoteServiceSlug(serviceType.slug), serviceType.slug);
  }
});
