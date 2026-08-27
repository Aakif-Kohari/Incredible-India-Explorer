import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe("India's Dinosaur Egg Fossils Profile", () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, '../../frontend/india-dinosaur-egg-fossils/index.html');
    const jsPath = path.resolve(__dirname, '../../frontend/india-dinosaur-egg-fossils/script.js');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const js = fs.readFileSync(jsPath, 'utf-8');

    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;

    dom.window.eval(js);
  });

  it('renders page header and hero information', () => {
    const title = document.querySelector('title').textContent;
    expect(title).toContain("India's Dinosaur Egg Fossils");

    const heroHeading = document.querySelector('.hero-content-wrap h1').textContent;
    expect(heroHeading).toContain('Dinosaur Egg Fossils');
  });

  it('handles tab switching properly', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    expect(tabs.length).toBe(6);

    const ootaxonomyTab = Array.from(tabs).find(t => t.dataset.tab === 'ootaxonomy');
    expect(ootaxonomyTab).toBeDefined();

    ootaxonomyTab.click();
    expect(ootaxonomyTab.classList.contains('active')).toBe(true);

    const activePane = document.getElementById('tab-ootaxonomy');
    expect(activePane.classList.contains('active')).toBe(true);
  });

  it('renders ootaxonomy table with Megaloolithus entries', () => {
    const table = document.querySelector('.ootaxonomy-table');
    expect(table).not.toBeNull();
    expect(table.textContent).toContain('Megaloolithus cylindricus');
  });

  it('provides interactive clutch analyzer egg selection', () => {
    const eggs = document.querySelectorAll('.interactive-egg');
    expect(eggs.length).toBe(6);

    // Click egg #3
    eggs[2].click();
    expect(eggs[2].classList.contains('active')).toBe(true);

    const eggTitle = document.getElementById('egg-select-title').textContent;
    expect(eggTitle).toContain('Clutch Egg #3');
  });

  it('handles oology quiz answer correctly', () => {
    const quizOpts = document.querySelectorAll('.q-opt-btn');
    expect(quizOpts.length).toBe(4);

    // Option 0 is correct
    quizOpts[0].click();
    const feedback = document.getElementById('egg-quiz-feedback');
    expect(feedback.style.display).not.toBe('none');
    expect(feedback.classList.contains('success')).toBe(true);
  });
});
