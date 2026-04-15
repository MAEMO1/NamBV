#!/usr/bin/env node
// Converts the large JPG hero slides in public/hero/ to WebP (and a smaller,
// further-optimized JPG fallback) so the LCP hero doesn't ship 1.6 MB images.
//
// Usage: node scripts/optimize-hero.mjs
//
// Produces, for each slide-N.jpg:
//   - slide-N.webp  (quality 80, max width 2000)
//   - slide-N.jpg   (overwritten: mozjpeg quality 78, progressive, max width 2000)
//
// Re-running is safe: outputs are regenerated deterministically from the
// existing JPGs.

import { readdir, stat } from 'node:fs/promises';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HERO_DIR = join(__dirname, '..', 'public', 'hero');
const MAX_WIDTH = 2000;

async function main() {
  const entries = await readdir(HERO_DIR);
  const slides = entries.filter((f) => /^slide-\d+\.(jpe?g)$/i.test(f));
  if (slides.length === 0) {
    console.log(`No slide JPGs found in ${HERO_DIR}`);
    return;
  }

  for (const file of slides) {
    const inputPath = join(HERO_DIR, file);
    const base = basename(file, extname(file));
    const webpPath = join(HERO_DIR, `${base}.webp`);
    const jpegPath = join(HERO_DIR, `${base}.jpg`);

    const before = (await stat(inputPath)).size;
    const buf = await sharp(inputPath)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .toBuffer();

    await sharp(buf).webp({ quality: 80, effort: 5 }).toFile(webpPath);
    await sharp(buf)
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toFile(jpegPath);

    const afterWebp = (await stat(webpPath)).size;
    const afterJpeg = (await stat(jpegPath)).size;
    console.log(
      `${file}: ${(before / 1024).toFixed(0)} KB  ->  .webp ${(afterWebp / 1024).toFixed(0)} KB, .jpg ${(afterJpeg / 1024).toFixed(0)} KB`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
