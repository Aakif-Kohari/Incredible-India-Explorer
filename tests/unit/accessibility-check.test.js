import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
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

describe('accessibility-check CLI', () => {
  const run = (args) => {
    try {
      const stdout = execFileSync('node', ['scripts/accessibility-check.js', ...args], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
      });
      return { code: 0, output: stdout };
    } catch (err) {
      return { code: err.status, output: `${err.stdout || ''}${err.stderr || ''}` };
    }
  };

  it('fails loudly when an explicitly named file does not exist', () => {
    // Silently scanning nothing would report a clean bill of health for a file
    // that was never read.
    const { code, output } = run(['definitely-not-a-real-page.html']);
    expect(code).toBe(1);
    expect(output).toMatch(/not found/i);
  });

  it('scans an existing file that is passed explicitly', () => {
    const { code, output } = run(['login.html']);
    expect(code).toBe(0);
    expect(output).toMatch(/scanned 1 page/);
  });
});
