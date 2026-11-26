// Fridge Roast: One Line, Biggest Laugh
// Writes a single one-line roast of a smart fridge to /output/entry.txt.
// The entry is a fixed, original line: a firmware update that teaches the
// fridge nothing except how to beep louder at 3 a.m.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "My smart fridge updated its firmware for 40 minutes and all it learned was how to beep louder at 3 a.m.";

const OUTPUT_PATH = "/output/entry.txt";

// Guard the gate before writing: the entry must be UTF-8 text of 1-200
// characters, not only whitespace, and a single line. Anything else is a
// bug in the entry, not something to ship to the judge.
function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Round-trip through UTF-8: a lone surrogate or other non-UTF-8 content
  // would not survive the encode/decode unchanged.
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    throw new Error("entry must be valid UTF-8 text");
  }
}

validateEntry(ENTRY);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
