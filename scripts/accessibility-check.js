#!/usr/bin/env node
/**
 * Accessibility checker for the static HTML pages in this repo.
 *
 * Replaces the previous workflow-inlined script, which only looked at a
 * hardcoded list of four files (three of which no longer exist) and could
 * never exit non-zero.
 *
 * Usage:
 *   node scripts/accessibility-check.js              # scan every page
 *   node scripts/accessibility-check.js a.html b.html # scan specific pages
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const IGNORED_DIRS = new Set(['.git', 'node_modules', 'dist', 'coverage']);

export function collectHtmlFiles(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(full, found);
    else if (entry.name.endsWith('.html')) found.push(full);
  }
  return found;
}

/**
 * Blank out comments and <script>/<style> bodies so their contents aren't parsed
 * as markup. Newlines are preserved and every other character becomes a space, so
 * offsets stay aligned with the original file and reported line numbers are correct.
 */
function stripNonMarkup(html) {
  const blank = (match) => match.replace(/[^\n]/g, ' ');
  return html
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, blank)
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, blank);
}

function lineOf(content, index) {
  return content.slice(0, index).split('\n').length;
}

export const RULES = [
  {
    id: 'img-alt',
    describe: 'every <img> needs an alt attribute (use alt="" if decorative)',
    run(html) {
      const issues = [];
      for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
        if (!/\salt\s*=/i.test(m[0])) {
          issues.push({ line: lineOf(html, m.index), detail: m[0].slice(0, 80) });
        }
      }
      return issues;
    }
  },
  {
    id: 'html-lang',
    describe: '<html> needs a lang attribute so screen readers pick the right voice',
    run(html) {
      if (!/<html\b[^>]*\slang\s*=\s*["'][^"']+["']/i.test(html)) {
        return [{ line: lineOf(html, Math.max(0, html.search(/<html/i))), detail: '<html> has no lang' }];
      }
      return [];
    }
  },
  {
    id: 'page-title',
    describe: '<title> must be present and non-empty',
    run(html) {
      const m = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
      if (!m || !m[1].trim()) {
        return [{ line: m ? lineOf(html, m.index) : 1, detail: 'missing or empty <title>' }];
      }
      return [];
    }
  },
  {
    id: 'duplicate-id',
    describe: 'id attributes must be unique (aria references resolve to the first match)',
    run(html) {
      const issues = [];
      const seen = new Map();
      for (const m of html.matchAll(/\sid\s*=\s*["']([^"']+)["']/gi)) {
        const id = m[1];
        if (seen.has(id)) {
          issues.push({ line: lineOf(html, m.index), detail: `id "${id}" also used on line ${seen.get(id)}` });
        } else {
          seen.set(id, lineOf(html, m.index));
        }
      }
      return issues;
    }
  },
  {
    id: 'control-name',
    describe: 'buttons and links need an accessible name (text, aria-label, or title)',
    run(html) {
      const issues = [];
      const pattern = /<(button|a)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
      for (const m of html.matchAll(pattern)) {
        const [full, tag, attrs, inner] = m;
        if (/\saria-label\s*=\s*["']\s*\S/i.test(attrs)) continue;
        if (/\saria-labelledby\s*=/i.test(attrs)) continue;
        if (/\stitle\s*=\s*["']\s*\S/i.test(attrs)) continue;
        if (/\saria-hidden\s*=\s*["']true["']/i.test(attrs)) continue;
        // An <a> without href is not an interactive control.
        if (tag.toLowerCase() === 'a' && !/\shref\s*=/i.test(attrs)) continue;
        // Nested media with alt text supplies the name.
        if (/<img\b[^>]*\salt\s*=\s*["']\s*\S/i.test(inner)) continue;
        if (inner.replace(/<[^>]*>/g, '').trim()) continue;
        issues.push({ line: lineOf(html, m.index), detail: full.slice(0, 80).replace(/\s+/g, ' ') });
      }
      return issues;
    }
  }
];

/**
 * Run every rule over the given pages (defaults to the whole repo).
 * Returns { totalScanned, violations: [{ file, line, rule, detail, describe }] }.
 */
export function auditAccessibility(files = collectHtmlFiles('.')) {
  const violations = [];
  for (const file of files) {
    const markup = stripNonMarkup(fs.readFileSync(file, 'utf8'));
    for (const rule of RULES) {
      for (const issue of rule.run(markup)) {
        violations.push({ file, line: issue.line, rule: rule.id, detail: issue.detail, describe: rule.describe });
      }
    }
  }
  return { totalScanned: files.length, violations };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const args = process.argv.slice(2).filter((a) => a.endsWith('.html'));
  const files = args.length ? args.filter((f) => fs.existsSync(f)) : collectHtmlFiles('.');
  const { totalScanned, violations } = auditAccessibility(files);

  for (const v of violations) {
    console.error(`${v.file}:${v.line}  [${v.rule}] ${v.detail}`);
    console.error(`    ${v.describe}`);
  }

  console.log(`\nAccessibility check: scanned ${totalScanned} page(s), found ${violations.length} violation(s).`);

  if (violations.length > 0) {
    console.error('\nFix the violations above, or justify an exception in the PR description.');
    process.exit(1);
  }
}
