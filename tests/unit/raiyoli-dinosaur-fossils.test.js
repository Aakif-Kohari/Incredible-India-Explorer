import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Dinosaur Fossils of Raiyoli Gujarat Profile', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, '../../frontend/raiyoli-dinosaur-fossils/index.html');
    const jsPath = path.resolve(__dirname, '../../frontend/raiyoli-dinosaur-fossils/script.js');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const js = fs.readFileSync(jsPath, 'utf-8');

    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;

    dom.window.eval(js);
  });

  it('renders page header and hero information', () => {
    const title = document.querySelector('title').textContent;
    expect(title).toContain('Dinosaur Fossils of Raiyoli');

    const heroHeading = document.querySelector('.hero-text-col h1').textContent;
    expect(heroHeading).toContain('Raiyoli, Gujarat');
  });

  it('handles tab navigation switching properly', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    expect(tabs.length).toBe(6);

    const discoveriesTab = Array.from(tabs).find(t => t.dataset.tab === 'discoveries');
    expect(discoveriesTab).toBeDefined();

    discoveriesTab.click();
    expect(discoveriesTab.classList.contains('active')).toBe(true);

    const activePane = document.getElementById('tab-discoveries');
    expect(activePane.classList.contains('active')).toBe(true);
  });

  it('provides interactive zone selection on locality map', () => {
    const nestingZone = document.querySelector('.zone-node[data-zone="nesting"]');
    expect(nestingZone).not.toBeNull();

    nestingZone.click();
    const zoneTitle = document.getElementById('zone-title').textContent;
    expect(zoneTitle).toContain('Egg Clutch Field');
  });

  it('supports virtual excavation lab interactions', () => {
    const tiles = document.querySelectorAll('.excavation-tile');
    expect(tiles.length).toBe(16);

    // Excavate tile 0 (Horn)
    tiles[0].click();
    expect(tiles[0].classList.contains('excavated')).toBe(true);

    const invHorn = document.getElementById('inv-horn');
    expect(invHorn.classList.contains('found')).toBe(true);
  });

  it('handles knowledge check quiz interactions', () => {
    const quizOpts = document.querySelectorAll('.r-opt-btn');
    expect(quizOpts.length).toBe(4);

    // Correct option is 0 (horn crest)
    quizOpts[0].click();
    const feedback = document.getElementById('r-quiz-feedback');
    expect(feedback.style.display).not.toBe('none');
    expect(feedback.classList.contains('success')).toBe(true);
  });
});
