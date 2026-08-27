import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe("The Lameta Formation & India's Dinosaur Record Profile", () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, '../../frontend/lameta-formation-dinosaur-record/index.html');
    const jsPath = path.resolve(__dirname, '../../frontend/lameta-formation-dinosaur-record/script.js');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const js = fs.readFileSync(jsPath, 'utf-8');

    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;

    dom.window.eval(js);
  });

  it('renders page header and hero information', () => {
    const title = document.querySelector('title').textContent;
    expect(title).toContain('The Lameta Formation');

    const heroHeading = document.querySelector('.hero-content-wrap h1').textContent;
    expect(heroHeading).toContain('The Lameta Formation');
  });

  it('handles tab switching properly', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    expect(tabs.length).toBe(6);

    const faunaTab = Array.from(tabs).find(t => t.dataset.tab === 'fauna');
    expect(faunaTab).toBeDefined();

    faunaTab.click();
    expect(faunaTab.classList.contains('active')).toBe(true);

    const activePane = document.getElementById('tab-fauna');
    expect(activePane.classList.contains('active')).toBe(true);
  });

  it('renders interactive stratigraphic column layers and selection', () => {
    const layers = document.querySelectorAll('.column-layer-btn');
    expect(layers.length).toBe(5);

    // Select layer 2 (Green Sandstone)
    layers[2].click();
    expect(layers[2].classList.contains('active')).toBe(true);

    const panelTitle = document.getElementById('cdp-title').textContent;
    expect(panelTitle).toContain('Green Sandstone');
  });

  it('handles the Lameta formation quiz interaction properly', () => {
    const quizOpts = document.querySelectorAll('.lam-opt-btn');
    expect(quizOpts.length).toBe(4);

    // Option 0 is correct
    quizOpts[0].click();
    const feedback = document.getElementById('lameta-quiz-feedback');
    expect(feedback.style.display).not.toBe('none');
    expect(feedback.classList.contains('success')).toBe(true);
  });
});
