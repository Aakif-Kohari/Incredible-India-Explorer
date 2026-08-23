import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Mother Dairy Explorer Module', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/mother-dairy-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains required sections and token booth simulator components', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    expect(htmlContent).toContain('Mother Dairy');
    expect(htmlContent).toContain('Operation Flood');
    expect(htmlContent).toContain('white-revolution');
    expect(htmlContent).toContain('timeline-container');
    expect(htmlContent).toContain('products-grid');
    expect(htmlContent).toContain('booth-simulator-card');
    expect(htmlContent).toContain('coin-slot');
    expect(htmlContent).toContain('network');
    expect(htmlContent).toContain('identity');
    expect(htmlContent).toContain('product-modal');
  });

  it('script.js exports comprehensive datasets and simulator handlers', () => {
    const scriptContent = fs.readFileSync(path.join(baseDir, 'script.js'), 'utf-8');

    expect(scriptContent).toContain('timelineData');
    expect(scriptContent).toContain('productsData');
    expect(scriptContent).toContain('supplyFlowData');
    expect(scriptContent).toContain('setupTokenBoothSimulator');
    expect(scriptContent).toContain('openProductModal');
  });
});
