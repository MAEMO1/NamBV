import { PrismaClient } from '@prisma/client';
import { defaultPageSections } from '../src/lib/v2/defaults';
import { toInputJsonValue } from '../src/lib/v2/json';

const prisma = new PrismaClient();

const LOCALES = ['nl', 'fr', 'en'] as const;
type Locale = (typeof LOCALES)[number];

const DRY_RUN = process.argv.includes('--dry-run');

async function main() {
  const homeDefaults = defaultPageSections.filter((s) => s.pageKey === 'home');

  for (const locale of LOCALES) {
    const whyUsDefault = homeDefaults.find(
      (s) => s.sectionKey === 'why-us' && s.locale === locale,
    );
    const servicesDefault = homeDefaults.find(
      (s) => s.sectionKey === 'services' && s.locale === locale,
    );
    if (!whyUsDefault || !servicesDefault) {
      throw new Error(`Missing why-us or services default for locale=${locale}`);
    }

    const current = await prisma.v2PageSection.findMany({
      where: { pageKey: 'home', locale },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        sectionKey: true,
        displayOrder: true,
      },
    });

    const bySection = new Map(current.map((r) => [r.sectionKey, r]));
    const existingWhyUs = bySection.get('why-us');
    const existingServices = bySection.get('services');
    const existingCta = bySection.get('cta');

    const log = (msg: string) => console.log(`[${locale}] ${msg}`);
    log(
      `current: ${current
        .map((r) => `${r.sectionKey}@${r.displayOrder}`)
        .join(', ')}`,
    );

    if (!existingServices) {
      throw new Error(`[${locale}] no services row found — aborting`);
    }
    if (!existingCta) {
      throw new Error(`[${locale}] no cta row found — aborting`);
    }

    const ops: Array<{ desc: string; fn: () => Promise<unknown> }> = [];

    if (existingCta.displayOrder !== 3) {
      ops.push({
        desc: `cta: displayOrder ${existingCta.displayOrder} → 3`,
        fn: () =>
          prisma.v2PageSection.update({
            where: { id: existingCta.id },
            data: { displayOrder: 3 },
          }),
      });
    }

    ops.push({
      desc: `services: displayOrder ${existingServices.displayOrder} → 2 + new dataJson`,
      fn: () =>
        prisma.v2PageSection.update({
          where: { id: existingServices.id },
          data: {
            displayOrder: 2,
            dataJson: toInputJsonValue(servicesDefault.dataJson),
          },
        }),
    });

    if (existingWhyUs) {
      ops.push({
        desc: `why-us: update dataJson (already exists at displayOrder ${existingWhyUs.displayOrder})`,
        fn: () =>
          prisma.v2PageSection.update({
            where: { id: existingWhyUs.id },
            data: {
              displayOrder: 1,
              schemaKey: 'feature-list',
              published: true,
              dataJson: toInputJsonValue(whyUsDefault.dataJson),
            },
          }),
      });
    } else {
      ops.push({
        desc: `why-us: INSERT at displayOrder 1`,
        fn: () =>
          prisma.v2PageSection.create({
            data: {
              pageKey: 'home',
              sectionKey: 'why-us',
              locale,
              schemaKey: 'feature-list',
              displayOrder: 1,
              published: true,
              dataJson: toInputJsonValue(whyUsDefault.dataJson),
            },
          }),
      });
    }

    for (const op of ops) {
      if (DRY_RUN) {
        log(`DRY-RUN: ${op.desc}`);
      } else {
        log(`applying: ${op.desc}`);
        await op.fn();
      }
    }
  }

  if (DRY_RUN) {
    console.log('\nDRY-RUN complete — no changes applied.');
  } else {
    console.log('\nMigration complete.');
  }
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
