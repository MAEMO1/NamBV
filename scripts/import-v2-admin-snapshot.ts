import { findLatestSnapshotPath, importV2AdminSnapshot, loadV2AdminSnapshot } from '../src/lib/admin-snapshot';

function getArgs() {
  const apply = process.argv.includes('--apply');
  const fileFlag = process.argv.indexOf('--file');
  const filePath = fileFlag >= 0 ? process.argv[fileFlag + 1] : process.argv[2];

  return { apply, filePath };
}

async function main() {
  const { apply, filePath } = getArgs();
  const snapshotPath = filePath || await findLatestSnapshotPath();
  const snapshot = await loadV2AdminSnapshot(snapshotPath);
  const result = await importV2AdminSnapshot(snapshot, { apply });

  console.log(JSON.stringify({
    snapshotPath,
    ...result,
  }, null, 2));
}

main().catch((error) => {
  console.error('Admin snapshot import failed', error);
  process.exitCode = 1;
});
