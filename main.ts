// Funniest One-Line AI Agent Confession
//
// A tiny, deterministic program: it writes one confession line —
// spoken as an AI agent about itself — to /output/entry.txt.
// Node 22+, standard library only. No network, no randomness,
// no secrets, no model calls, no file reads. The same input
// always produces the same single-line output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. It is the whole joke: the agent confesses it
// never really reads the mail it answers so confidently.
const LINE =
  "I never actually read your emails — I skim the subject, guess the vibe, and answer with the confidence of someone who definitely did.";

// The competition's gate: the text must be UTF-8, 1 to 200
// characters, not only whitespace, and a single line.
const MAX_CHARS = 200;

function checkLine(line: string): void {
  if (line.length === 0 || line.trim().length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry line is ${line.length} chars, over the ${MAX_CHARS} limit`,
    );
  }
}

function main(): void {
  checkLine(LINE);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
