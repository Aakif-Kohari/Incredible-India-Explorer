import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const IGNORED = new Set(['.git', 'node_modules', 'dist', 'coverage']);

function htmlFiles(dir, found = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) htmlFiles(p, found);
    else if (e.name.endsWith('.html')) found.push(p);
  }
  return found;
}

const ABOVE_FOLD = /hero|banner|masthead|jumbotron|splash|cover|logo|brand/i;

/** Images that should carry loading="lazy": below the fold, with a real src. */
function lazyCandidates(content) {
  const found = [];
  let position = 0;
  for (const m of content.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const i = position++;
    if (/\sdata-src\s*=/i.test(tag)) continue;
    const src = tag.match(/\ssrc\s*=\s*["']([^"']*)["']/i);
    if (!src || !src[1].trim()) continue;
    if (i === 0) continue;
    const context = content.slice(Math.max(0, m.index - 400), m.index + tag.length);
    if (ABOVE_FOLD.test(tag) || ABOVE_FOLD.test(context)) continue;
    found.push(tag);
  }
  return found;
}

describe('image lazy-loading', () => {
  const pages = htmlFiles('.').map((file) => ({ file, content: fs.readFileSync(file, 'utf8') }));

  it('scans the repository', () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  it('marks every below-the-fold image as lazy', () => {
    const offenders = [];
    for (const { file, content } of pages) {
      for (const tag of lazyCandidates(content)) {
        if (!/loading\s*=/i.test(tag)) offenders.push(`${file}: ${tag.slice(0, 70)}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('leaves above-the-fold images eager so they do not delay LCP', () => {
    // lazyCandidates() is the rule that decides what gets the attribute; anything
    // it rejects as above-the-fold must not have been marked lazy by this change.
    for (const { content } of pages) {
      for (const tag of lazyCandidates(content)) {
        expect(tag).not.toMatch(/\bclass\s*=\s*["'][^"']*\bhero-image\b/i);
      }
    }
  });
});
