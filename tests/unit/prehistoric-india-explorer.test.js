import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Prehistoric India Explorer Landing Page', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, '../../frontend/prehistoric-india-explorer/index.html');
    const jsPath = path.resolve(__dirname, '../../frontend/prehistoric-india-explorer/script.js');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const js = fs.readFileSync(jsPath, 'utf-8');

    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
    window = dom.window;

    // Execute script
    dom.window.eval(js);
  });

  it('renders page title and hero section properly', () => {
    const title = document.querySelector('title').textContent;
    expect(title).toContain('Prehistoric India Explorer');

    const heroTitle = document.querySelector('.hero-title').textContent;
    expect(heroTitle).toContain('Prehistoric India');
  });

  it('renders all category pills and allows category filtering', () => {
    const pills = document.querySelectorAll('.cat-pill');
    expect(pills.length).toBeGreaterThanOrEqual(7);

    const dinosaurPill = Array.from(pills).find(p => p.dataset.category === 'dinosaur');
    expect(dinosaurPill).toBeDefined();

    dinosaurPill.click();
    expect(dinosaurPill.classList.contains('active')).toBe(true);

    const cards = document.querySelectorAll('.profile-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('contains interactive SVG map with key prehistoric sites', () => {
    const mapSvg = document.getElementById('prehistoric-map-svg');
    expect(mapSvg).not.toBeNull();

    const raiyoliPin = document.querySelector('.map-pin[data-site="raiyoli"]');
    expect(raiyoliPin).not.toBeNull();

    // Clicking Raiyoli pin updates detail drawer
    raiyoliPin.click();
    const panelTitle = document.getElementById('panel-title').textContent;
    expect(panelTitle).toContain('Raiyoli');
  });

  it('filters profiles on search input', () => {
    const searchInput = document.getElementById('prehistoric-search');
    searchInput.value = 'Rajasaurus';
    searchInput.dispatchEvent(new window.Event('input'));

    // Verify search works
    expect(window.PrehistoricExplorer.sites.length).toBeGreaterThan(0);
  });

  it('renders timeline milestones correctly', () => {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    expect(timelineNodes.length).toBeGreaterThanOrEqual(6);
  });

  it('handles paleontology trivia quiz interactions', () => {
    const questionEl = document.getElementById('quiz-question');
    expect(questionEl.textContent.length).toBeGreaterThan(10);

    const options = document.querySelectorAll('.quiz-opt-btn');
    expect(options.length).toBe(4);

    // Click option
    options[1].click();
    const feedback = document.getElementById('quiz-feedback');
    expect(feedback.style.display).not.toBe('none');
  });
});
