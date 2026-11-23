// Entry program for make.fun "The agent builds a game from one prompt".
// The entry is the X post itself: this program only hands the gate the post's
// address, by copying POST.json from the repository root to /output/POST.json.
// Standard library only. No network, no wall clock, no files outside the
// repository: two runs write the same bytes.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const postPath = join(BOT_DIR, 'POST.json');
const post = JSON.parse(readFileSync(postPath, 'utf8'));
if (typeof post.url !== 'string' || !post.url.startsWith('https://x.com/') && !post.url.startsWith('https://twitter.com/')) {
  console.error('POST.json must name one X post: https://x.com/<handle>/status/<id>');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
