import { describe, it, expect } from 'vitest';
import { RULES, auditAccessibility } from '../../scripts/accessibility-check.js';

const rule = (id) => RULES.find((r) => r.id === id);
const ids = (html, id) => rule(id).run(html).length;

describe('accessibility-check rules', () => {
  it('flags <img> without alt but accepts alt="" for decorative images', () => {
    expect(ids('<img src="a.png">', 'img-alt')).toBe(1);
    expect(ids('<img src="a.png" alt="">', 'img-alt')).toBe(0);
    expect(ids('<img src="a.png" alt="Taj Mahal">', 'img-alt')).toBe(0);
  });

  it('flags a missing lang attribute on <html>', () => {
    expect(ids('<html>', 'html-lang')).toBe(1);
    expect(ids('<html lang="en">', 'html-lang')).toBe(0);
  });

  it('flags a missing or empty <title>', () => {
    expect(ids('<head></head>', 'page-title')).toBe(1);
    expect(ids('<title>   </title>', 'page-title')).toBe(1);
    expect(ids('<title>Incredible India</title>', 'page-title')).toBe(0);
  });

  it('flags reused id attributes', () => {
    expect(ids('<section id="overview"></section><div id="overview"></div>', 'duplicate-id')).toBe(1);
    expect(ids('<section id="overview"></section><div id="history"></div>', 'duplicate-id')).toBe(0);
  });

  it('flags controls with no accessible name', () => {
    expect(ids('<button></button>', 'control-name')).toBe(1);
    expect(ids('<button><svg></svg></button>', 'control-name')).toBe(1);
    expect(ids('<a href="/x"></a>', 'control-name')).toBe(1);

    expect(ids('<button>Search</button>', 'control-name')).toBe(0);
    expect(ids('<button aria-label="Clear search"><svg></svg></button>', 'control-name')).toBe(0);
    expect(ids('<button aria-labelledby="lbl"></button>', 'control-name')).toBe(0);
    expect(ids('<a href="/x"><img src="logo.png" alt="Home"></a>', 'control-name')).toBe(0);
    // An anchor without href is a link target, not an interactive control.
    expect(ids('<a name="top"></a>', 'control-name')).toBe(0);
  });
});

describe('accessibility-check reporting', () => {
  it('reports the line number from the original file, not the stripped one', () => {
    const html = ['<html lang="en">', '<script>', 'let x = 1;', '</script>', '<img src="a.png">'].join('\n');
    const [issue] = rule('img-alt').run(
      html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (m) => m.replace(/[^\n]/g, ' '))
    );
    expect(issue.line).toBe(5);
  });

  it('ignores markup that only appears inside <script> or comments', () => {
    const inScript = '<script>const t = `<button></button>`;</script>'.replace(
      /<script\b[^>]*>[\s\S]*?<\/script>/gi,
      (m) => m.replace(/[^\n]/g, ' ')
    );
    expect(rule('control-name').run(inScript)).toEqual([]);

    const inComment = '<!-- <img src="old.png"> -->'.replace(/<!--[\s\S]*?-->/g, (m) =>
      m.replace(/[^\n]/g, ' ')
    );
    expect(rule('img-alt').run(inComment)).toEqual([]);
  });

  it('finds no violations across the repository', () => {
    const { totalScanned, violations } = auditAccessibility();
    expect(totalScanned).toBeGreaterThan(0);
    expect(violations).toEqual([]);
  });
});
