import { PrismaClient } from '@prisma/client';
import { additionalDefaultPageSections } from '../src/lib/v2/content-defaults';
import { toInputJsonValue } from '../src/lib/v2/json';

const prisma = new PrismaClient();

const TARGET_PAGE_KEYS = ['service-renovation', 'service-technical', 'value-reuse'] as const;
const DRY_RUN = process.argv.includes('--dry-run');

async function main() {
  const targets = additionalDefaultPageSections.filter(
    (s) =>
      (TARGET_PAGE_KEYS as readonly string[]).includes(s.pageKey) &&
      s.sectionKey === 'hero',
  );

  if (targets.length === 0) {
    throw new Error('No target hero defaults found — check content-defaults.ts');
  }

  for (const target of targets) {
    const existing = await prisma.v2PageSection.findFirst({
      where: {
        pageKey: target.pageKey,
        sectionKey: 'hero',
        locale: target.locale,
      },
    });

    if (!existing) {
      console.log(
        `[${target.pageKey}/${target.locale}] no existing hero row — will be created`,
      );
      if (!DRY_RUN) {
        await prisma.v2PageSection.create({
          data: {
            pageKey: target.pageKey,
            sectionKey: 'hero',
            locale: target.locale,
            schemaKey: 'hero',
            displayOrder: 0,
            published: true,
            dataJson: toInputJsonValue(target.dataJson),
          },
        });
      }
      continue;
    }

    const currentHref = (existing.dataJson as Record<string, unknown>)
      ?.primaryCtaHref;
    const targetHref = (target.dataJson as Record<string, unknown>)
      ?.primaryCtaHref;

    const desc = `[${target.pageKey}/${target.locale}] primaryCtaHref: ${JSON.stringify(currentHref)} → ${JSON.stringify(targetHref)}`;

    if (DRY_RUN) {
      console.log(`DRY-RUN: ${desc}`);
    } else {
      console.log(`applying: ${desc}`);
      await prisma.v2PageSection.update({
        where: { id: existing.id },
        data: { dataJson: toInputJsonValue(target.dataJson) },
      });
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
