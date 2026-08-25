import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Map Satavahana Coins Across the Deccan Integration (#2081)', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/satavahana-coins-deccan');
  const landingDir = path.resolve(__dirname, '../../frontend/indias-coins-through-time');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains interactive map, symbol hotspots, comparison, and timeline UI', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    // Requirements Validation
    expect(htmlContent).toContain('Satavahana Coins');
    expect(htmlContent).toContain('deccan-map-section');
    expect(htmlContent).toContain('deccan-hotspot');
    expect(htmlContent).toContain('symbols-section');
    expect(htmlContent).toContain('sat-compare-grid');
    expect(htmlContent).toContain('sat-timeline');

    // Theme Placement Safety
    const writePos = htmlContent.indexOf("document.body.classList.add('light-theme')");
    const bodyPos = htmlContent.search(/<body[\s>]/i);
    expect(writePos).toBeGreaterThan(bodyPos);
  });

  it('landing page dataset links Satavahana ship coin explorer', () => {
    const dataContent = fs.readFileSync(path.join(landingDir, 'coins-data.js'), 'utf-8');
    expect(dataContent).toContain('../satavahana-coins-deccan/index.html');
    expect(dataContent).toContain('Satavahana');
  });
});
