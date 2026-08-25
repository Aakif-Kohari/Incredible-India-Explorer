import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Biba Fashion Explorer Module', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/biba-fashion-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains required sections and interactive components', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    expect(htmlContent).toContain('Biba');
    expect(htmlContent).toContain('Meena Bindra');
    expect(htmlContent).toContain('origin');
    expect(htmlContent).toContain('products-grid');
    expect(htmlContent).toContain('identity');
    expect(htmlContent).toContain('timeline-container');
    expect(htmlContent).toContain('campaigns');
    expect(htmlContent).toContain('bollywood');
    expect(htmlContent).toContain('biba-modal');
  });

  it('script.js exports comprehensive product, timeline, and campaign datasets', () => {
    const scriptContent = fs.readFileSync(path.join(baseDir, 'script.js'), 'utf-8');

    expect(scriptContent).toContain('productsData');
    expect(scriptContent).toContain('timelineData');
    expect(scriptContent).toContain('campaignsData');
    expect(scriptContent).toContain('openProductModal');
  });
});
