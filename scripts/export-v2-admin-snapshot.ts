import { exportV2AdminSnapshot, getDefaultSnapshotPath } from '../src/lib/admin-snapshot';

function getOutputPathArg() {
  const outputFlag = process.argv.indexOf('--output');
  if (outputFlag >= 0) {
    return process.argv[outputFlag + 1];
  }

  return process.argv[2] || getDefaultSnapshotPath();
}

async function main() {
  const outputPath = getOutputPathArg();
  const result = await exportV2AdminSnapshot(outputPath);

  console.log(JSON.stringify({
    outputPath: result.outputPath,
    exportedAt: result.snapshot.exportedAt,
    counts: result.snapshot.counts,
  }, null, 2));
}

main().catch((error) => {
  console.error('Admin snapshot export failed', error);
  process.exitCode = 1;
});
