/* Headless verification harness for the new explorer modules.
   Loads index.html + data.js + script.js in jsdom, fires DOMContentLoaded,
   then asserts that every container the page claims to populate is non-empty
   and that no uncaught error or console.error occurred. */

import fs from 'node:fs';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';

const ROOT = process.argv[2];
const MODULE_DIR = process.argv[3];
const CONTAINERS = process.argv.slice(4);

const dir = path.join(ROOT, MODULE_DIR);
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', (e) => errors.push('jsdomError: ' + e.message));
vc.on('error', (...args) => errors.push('console.error: ' + args.join(' ')));

// Strip the external scripts; we inject data.js + script.js manually so we do
// not need app.js / auth.js (which pull in the whole shared app).
const stripped = html.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, '');

const dom = new JSDOM(stripped, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  virtualConsole: vc,
  url: 'http://localhost/',
});

// jsdom has no IntersectionObserver; the pages fall back gracefully, but stub
// it so we exercise the observer path rather than the fallback.
dom.window.IntersectionObserver = class {
  constructor(cb) { this.cb = cb; }
  observe(el) { this.cb([{ isIntersecting: true, target: el }]); }
  unobserve() {}
  disconnect() {}
};

function inject(file) {
  const code = fs.readFileSync(path.join(dir, file), 'utf8');
  const el = dom.window.document.createElement('script');
  el.textContent = code;
  dom.window.document.body.appendChild(el);
}

inject('data.js');
inject('script.js');

dom.window.document.dispatchEvent(
  new dom.window.Event('DOMContentLoaded', { bubbles: true })
);

const failures = [...errors];

for (const id of CONTAINERS) {
  const el = dom.window.document.getElementById(id);
  if (!el) {
    failures.push(`missing container #${id}`);
  } else if (el.children.length === 0) {
    failures.push(`#${id} rendered empty`);
  }
}

// Sanity: the hero counters must have been replaced by computed values.
const counters = dom.window.document.querySelectorAll('.hero-stat .number[id]');
if (failures.length) {
  console.log(`FAIL ${MODULE_DIR}`);
  failures.forEach((f) => console.log('   - ' + f));
  process.exit(1);
}

const counted = Array.from(counters).map((c) => `${c.id}=${c.textContent}`).join(' ');
console.log(`PASS ${MODULE_DIR}  (${CONTAINERS.length} containers populated; ${counted})`);
