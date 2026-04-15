// Twitter re-uses the OpenGraph image. By re-exporting we avoid duplicating
// the generation logic while still producing a dedicated /twitter-image URL
// for crawlers that prefer it.
export {
  default,
  size,
  contentType,
  alt,
} from './opengraph-image';
