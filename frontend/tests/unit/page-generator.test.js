import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const LAYOUT = fs.readFileSync('scripts/layout.html', 'utf8');
const GENERATED_DIR = 'dist/states';
const pages = fs.readdirSync(GENERATED_DIR).filter((f) => f.endsWith('.html'));

describe('page layout template', () => {
  it('applies the theme class to body, matching the CSS selectors', () => {
    // Every light-mode rule in styles/ is written as `[data-theme="light"]`, so the
    // bootstrap must class the body. Targeting documentElement silently no-ops.
    expect(LAYOUT).toMatch(/document\.body\.classList\.add\('light-theme'\)/);
    expect(LAYOUT).not.toMatch(/document\.documentElement\.classList\.add\('light-theme'\)/);
  });

  it('runs the theme bootstrap after <body> so document.body exists', () => {
    const script = LAYOUT.search(/document\.body\.classList\.add\('light-theme'\)/);
    const body = LAYOUT.search(/<body[\s>]/i);
    expect(script).toBeGreaterThan(body);
  });

  it('sets a Content-Security-Policy', () => {
    expect(LAYOUT).toMatch(/http-equiv="Content-Security-Policy"/);
  });
});

describe('generated state pages', () => {
  it('generates a page per state', () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  it('escapes HTML metacharacters from the data source', () => {
    // data.js contains values like "Machher Jhol & Rasgulla"; an unescaped &
    // produces invalid markup and can break downstream parsing.
    const withAmp = pages
      .map((p) => fs.readFileSync(path.join(GENERATED_DIR, p), 'utf8'))
      .filter((html) => /Machher Jhol/.test(html));
    expect(withAmp.length).toBeGreaterThan(0);
    for (const html of withAmp) {
      expect(html).toMatch(/Machher Jhol &amp; Rasgulla/);
    }
  });

  it('carries the shared chrome on every page', () => {
    for (const page of pages) {
      const html = fs.readFileSync(path.join(GENERATED_DIR, page), 'utf8');
      expect(html, page).toMatch(/<header class="navbar"/);
      expect(html, page).toMatch(/<footer class="footer">/);
      expect(html, page).toMatch(/http-equiv="Content-Security-Policy"/);
    }
  });

  it('leaves no unsubstituted template placeholders', () => {
    for (const page of pages) {
      const html = fs.readFileSync(path.join(GENERATED_DIR, page), 'utf8');
      expect(html.match(/\{\{\w+\}\}/g), page).toBeNull();
    }
  });

  it('is in sync with the current layout', () => {
    // Fails if someone edits layout.html without regenerating — the exact drift
    // that left dist/ stale and light mode broken on these pages.
    expect(() => execFileSync('node', ['scripts/generate.cjs', '--check'])).not.toThrow();
  });
});
