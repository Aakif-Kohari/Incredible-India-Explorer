import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Dinosaur Nesting Sites of India Profile', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, '../../frontend/dinosaur-nesting-sites-india/index.html');
    const jsPath = path.resolve(__dirname, '../../frontend/dinosaur-nesting-sites-india/script.js');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const js = fs.readFileSync(jsPath, 'utf-8');

    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;

    dom.window.eval(js);
  });

  it('renders page header and hero information', () => {
    const title = document.querySelector('title').textContent;
    expect(title).toContain('Dinosaur Nesting Sites of India');

    const heroHeading = document.querySelector('.hero-content h1').textContent;
    expect(heroHeading).toContain('Dinosaur Nesting Sites');
  });

  it('handles tab navigation switching properly', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    expect(tabs.length).toBe(6);

    const archTab = Array.from(tabs).find(t => t.dataset.tab === 'architecture');
    expect(archTab).toBeDefined();

    archTab.click();
    expect(archTab.classList.contains('active')).toBe(true);

    const activePane = document.getElementById('tab-architecture');
    expect(activePane.classList.contains('active')).toBe(true);
  });

  it('renders interactive nesting map and pin selection', () => {
    const pins = document.querySelectorAll('.nest-pin');
    expect(pins.length).toBe(4);

    const raiyoliPin = Array.from(pins).find(p => p.dataset.site === 'raiyoli');
    expect(raiyoliPin).toBeDefined();

    raiyoliPin.click();
    const title = document.getElementById('nest-info-title').textContent;
    expect(title).toContain('Raiyoli Hatcheries');
  });

  it('handles dinosaur nesting quiz interaction properly', () => {
    const quizOpts = document.querySelectorAll('.nest-opt-btn');
    expect(quizOpts.length).toBe(4);

    // Option 0 is correct
    quizOpts[0].click();
    const feedback = document.getElementById('nest-quiz-feedback');
    expect(feedback.style.display).not.toBe('none');
    expect(feedback.classList.contains('success')).toBe(true);
  });
});
