// gta6-meme-x-01 v2 entrypoint (Node 22, standard library only).
//
// The entry is the X post itself: the house reads the post from X and the
// judge sees its first picture plus its text. This program only hands the
// post's address to the gate: it reads POST.json from the repository root,
// checks it is valid JSON whose url is an X post address, and copies it to
// the output directory. A bad POST.json fails loudly (exit 1) instead of
// silently producing an entry the gate would refuse.
//
// Local run (the way the grader does it):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// No network, no wall clock, no files outside the repository, and the
// output directory itself is never removed (the grader mounts it).

import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// An X post address as X shows it: https://x.com/<handle>/status/<digits>.
// The status id is an X snowflake: 18-19 digits in practice, so require
// 15-20 digits to reject placeholders like .../status/0 or .../status/123
// while leaving room for future ids. Query strings and fragments are
// rejected by the end anchor: the gate reads the bare post address.
const POST_URL = /^https:\/\/(www\.|mobile\.)?(x|twitter)\.com\/[^/]+\/status\/(\d{15,20})$/;

function fail(message) {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

let raw;
try {
  raw = readFileSync(join(BOT_DIR, 'POST.json'), 'utf8');
} catch (err) {
  fail(`could not read POST.json from ${BOT_DIR}: ${err.message}`);
}

let post;
try {
  post = JSON.parse(raw);
} catch (err) {
  fail(`POST.json is not valid JSON: ${err.message}`);
}

if (!post || typeof post !== 'object' || typeof post.url !== 'string') {
  fail('POST.json must be an object like {"url": "https://x.com/<handle>/status/<id>"}');
}

if (!POST_URL.test(post.url)) {
  fail(`POST.json url is not an X post address: ${JSON.stringify(post.url)}`);
}

// The judge sees the post's first picture: the entry is broken if the
// meme image is missing or empty, so check it before producing output.
let memeSize;
try {
  memeSize = statSync(join(BOT_DIR, 'meme.png')).size;
} catch (err) {
  fail(`could not find meme.png in ${BOT_DIR}: ${err.message}`);
}
if (memeSize === 0) {
  fail('meme.png is empty');
}

try {
  writeFileSync(join(OUTPUT_DIR, 'POST.json'), raw, 'utf8');
} catch (err) {
  fail(`could not write POST.json to ${OUTPUT_DIR}: ${err.message}`);
}

console.log(`main.ts: OK, wrote POST.json for ${post.url} (meme.png ${memeSize} bytes)`);
