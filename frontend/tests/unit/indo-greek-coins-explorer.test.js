import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Indo-Greek Coins & Royal Portraits Explorer Integration (#2078)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/indo-greek-coins-explorer');
  const landingDir = path.resolve(__dirname, '../../frontend/indias-coins-through-time');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains required rulers, hotspots, comparison, and timeline UI', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Section Checks
    expect(htmlContent).toContain('Indo-Greek Coins');
    expect(htmlContent).toContain('ruler-pills-nav');
    expect(htmlContent).toContain('coin-3d-wrapper');
    expect(htmlContent).toContain('btn-flip-coin');
    expect(htmlContent).toContain('inscription-inspection-box');
    expect(htmlContent).toContain('compare-results-grid');
    expect(htmlContent).toContain('timeline-slider');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    expect(writePos).toBeGreaterThan(bodyPos);
  });

  it('landing page includes Indo-Greek coins card', () => {
    const dataContent = fs.readFileSync(path.join(landingDir, 'coins-data.js'), 'utf-8');
    expect(dataContent).toContain('../indo-greek-coins-explorer/index.html');
    expect(dataContent).toContain('Indo-Greek');
  });
});
