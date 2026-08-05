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

const THEME_WRITE = /document\.body\.classList\.add\('light-theme'\)/;

describe('theme bootstrap placement', () => {
  const pages = htmlFiles('.').map((file) => {
    const content = fs.readFileSync(file, 'utf8');
    return { file, content };
  });

  it('scans the repository', () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  it('never touches document.body before <body> is parsed', () => {
    const offenders = pages
      .filter(({ content }) => THEME_WRITE.test(content))
      .filter(({ content }) => {
        const write = content.search(THEME_WRITE);
        const bodyTag = content.search(/<body[\s>]/i);
        if (bodyTag < 0) return false;
        if (write > bodyTag) return false;
        // A guarded write (`if (document.body)`) is safe wherever it sits.
        return !/if\s*\(\s*document\.body\s*\)/.test(content);
      })
      .map(({ file }) => file);

    expect(offenders).toEqual([]);
  });
});
