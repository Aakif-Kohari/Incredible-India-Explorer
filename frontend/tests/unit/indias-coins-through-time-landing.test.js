import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe("India's Coins Through Time Landing Page Integration (#2076)", () => {
  const baseDir = path.resolve(__dirname, '../../frontend/indias-coins-through-time');

  it('contains index.html, style.css, script.js, and coins-data.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'coins-data.js'))).toBe(true);
  });

  it('index.html contains required sections and accessibility tags', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Hero Section Requirements
    expect(htmlContent).toContain("India's Coins");
    expect(htmlContent).toContain("Through Time");
    expect(htmlContent).toContain('btn-start-exploring');

    // Filter Controls
    expect(htmlContent).toContain('coin-search-input');
    expect(htmlContent).toContain('period-filter');
    expect(htmlContent).toContain('dynasty-filter');
    expect(htmlContent).toContain('region-filter');
    expect(htmlContent).toContain('metal-filter');

    // Map Section & Cards Grid
    expect(htmlContent).toContain('india-mint-map');
    expect(htmlContent).toContain('coin-cards-grid');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    expect(writePos).toBeGreaterThan(bodyPos);
  });

  it('coins-data.js exposes COINS_DATA array with required fields', () => {
    const dataContent = fs.readFileSync(path.join(baseDir, 'coins-data.js'), 'utf-8');
    expect(dataContent).toContain('window.COINS_DATA');
    expect(dataContent).toContain('Indo-Greek');
    expect(dataContent).toContain('Satavahana');
    expect(dataContent).toContain('Gupta');
  });
});
