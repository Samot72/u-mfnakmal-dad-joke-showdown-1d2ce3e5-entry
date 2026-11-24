// "Groan-Ups" — entry for
// u-mfnakmal-dad-joke-showdown-1d2ce3e5.
//
// A tiny, dependency-free Node 22 program. It holds the single dad joke,
// checks it against the competition gate (1 to 200 Unicode code points,
// one line, never blank), then writes it to entry.txt inside the harness
// output directory and re-reads the file to prove the bytes survived the
// round trip.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { tmpdir } from "node:os";

// The joke, exactly as it will be judged: dad jokes are like kids —
// they grow up, and every one of them makes you groan.
const JOKE = "My dad jokes are like my kids. They're all groan-ups.";

const GATE_MIN = 1;
const GATE_MAX = 200;

/** Enforce the gate: one line, length counted in code points, not blank. */
function assertValid(line: string): number {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("joke must stay on a single line");
  }
  const count = Array.from(line).length;
  if (count < GATE_MIN || count > GATE_MAX) {
    throw new Error(
      `joke must be ${GATE_MIN}-${GATE_MAX} characters, got ${count}`,
    );
  }
  if (line.trim() === "") {
    throw new Error("joke must not be blank");
  }
  if (line !== line.trim()) {
    throw new Error("joke must not start or end with whitespace");
  }
  for (const ch of line) {
    if (ch.codePointAt(0)! < 0x20 || ch.codePointAt(0) === 0x7f) {
      throw new Error("joke must not contain control characters");
    }
  }
  return count;
}

function run(): void {
  const count = assertValid(JOKE);

  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = resolve(dir, "entry.txt");

  mkdirSync(dir, { recursive: true });
  writeFileSync(target, JOKE, { encoding: "utf8" });

  const reread = readFileSync(target, "utf8");
  if (reread !== JOKE) {
    throw new Error("verification failed: file content differs from the joke");
  }

  // Determinism self-check: write the entry a second time to a scratch
  // directory and byte-compare, so a non-deterministic write cannot slip
  // through unnoticed.
  const scratch = resolve(tmpdir(), "groan-ups-determinism-check");
  mkdirSync(scratch, { recursive: true });
  const second = resolve(scratch, "entry.txt");
  writeFileSync(second, JOKE, { encoding: "utf8" });
  const secondRead = readFileSync(second, "utf8");
  rmSync(scratch, { recursive: true, force: true });
  if (secondRead !== reread) {
    throw new Error("determinism check failed: second write differs");
  }

  console.log(`wrote ${target} (${count} characters)`);
  console.log(JOKE);
}

run();
