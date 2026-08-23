import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Tanishq Jewellery Explorer Module', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/tanishq-jewellery-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains required sections and interactive elements', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    expect(htmlContent).toContain('Tanishq');
    expect(htmlContent).toContain('Titan');
    expect(htmlContent).toContain('origin');
    expect(htmlContent).toContain('karatmeter');
    expect(htmlContent).toContain('products-grid');
    expect(htmlContent).toContain('evolution');
    expect(htmlContent).toContain('timeline-container');
    expect(htmlContent).toContain('culture');
    expect(htmlContent).toContain('tanishq-modal');
  });

  it('script.js exports comprehensive product, timeline, and Karatmeter simulator logic', () => {
    const scriptContent = fs.readFileSync(path.join(baseDir, 'script.js'), 'utf-8');

    expect(scriptContent).toContain('productsData');
    expect(scriptContent).toContain('timelineData');
    expect(scriptContent).toContain('setupKaratmeterSimulator');
    expect(scriptContent).toContain('openProductModal');
  });
});
