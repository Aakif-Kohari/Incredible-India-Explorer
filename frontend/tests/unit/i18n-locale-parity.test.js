import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const LOCALES_DIR = 'i18n/locales';
const SOURCE_LANG = 'en';

function readLocale(lang) {
  return JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, `${lang}.json`), 'utf8'));
}

/** Flatten nested translation objects into dotted paths: { nav: { home } } -> ['nav.home']. */
function flatten(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out.push(key);
  }
  return out;
}

const languages = fs
  .readdirSync(LOCALES_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace('.json', ''));

const sourceKeys = flatten(readLocale(SOURCE_LANG));

describe('i18n locale files', () => {
  it('ships an English source dictionary', () => {
    expect(languages).toContain(SOURCE_LANG);
    expect(sourceKeys.length).toBeGreaterThan(0);
  });

  it('has no duplicate keys in the English source', () => {
    expect(new Set(sourceKeys).size).toBe(sourceKeys.length);
  });

  for (const lang of languages.filter((l) => l !== SOURCE_LANG)) {
    it(`"${lang}" defines no key that English is missing`, () => {
      // Extra keys are dead weight: nothing can ever look them up.
      const extra = flatten(readLocale(lang)).filter((k) => !sourceKeys.includes(k));
      expect(extra).toEqual([]);
    });
  }
});

describe('homepage translation keys', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  const used = [...html.matchAll(/data-i18n(?:-placeholder|-aria-label)?="([^"]+)"/g)].map((m) => m[1]);

  it('annotates the homepage', () => {
    expect(used.length).toBeGreaterThan(0);
  });

  it('resolves every data-i18n key against the English dictionary', () => {
    const missing = used.filter((k) => !sourceKeys.includes(k));
    expect(missing).toEqual([]);
  });
});
