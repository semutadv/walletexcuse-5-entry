// Entry runner for "The 3 AM Excuse" (hazel-walrus).
// One line: a hardware wallet refusing to sign at 3 a.m., on two
// grounds — nothing legitimate has ever needed a signature at 3 a.m.,
// and it has read its owner's history of decisions at that hour. It is
// the only financial advisor in the house with a perfect record.
// Written to /output/entry.txt; the wallet stays unsigned, unbothered.
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const LINE =
  "I refuse to sign at 3 a.m. because nothing legitimate has ever needed a signature at 3 a.m., and I have read your history of decisions.";

async function main(): Promise<void> {
  const out = process.env.OUTPUT_DIR ?? "/output";
  await mkdir(out, { recursive: true });
  for (const name of await readdir(out)) {
    await rm(join(out, name), { recursive: true, force: true });
  }
  await writeFile(join(out, "entry.txt"), LINE + "\n", "utf8");
}

await main();
