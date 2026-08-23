import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Fabindia Craft Explorer Module', () => {
  const baseDir = path.resolve(__dirname, '../../frontend/fabindia-craft-explorer');

  it('contains index.html, style.css, and script.js files', () => {
    expect(fs.existsSync(path.join(baseDir, 'index.html'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'style.css'))).toBe(true);
    expect(fs.existsSync(path.join(baseDir, 'script.js'))).toBe(true);
  });

  it('index.html contains required sections and craft components', () => {
    const htmlContent = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf-8');

    expect(htmlContent).toContain('Fabindia');
    expect(htmlContent).toContain('origin');
    expect(htmlContent).toContain('crafts-grid');
    expect(htmlContent).toContain('textiles');
    expect(htmlContent).toContain('artisans');
    expect(htmlContent).toContain('timeline-container');
    expect(htmlContent).toContain('expansion');
    expect(htmlContent).toContain('craft-modal');
  });

  it('script.js exports comprehensive craft & textile datasets', () => {
    const scriptContent = fs.readFileSync(path.join(baseDir, 'script.js'), 'utf-8');

    expect(scriptContent).toContain('craftsData');
    expect(scriptContent).toContain('textileData');
    expect(scriptContent).toContain('timelineData');
    expect(scriptContent).toContain('openCraftModal');
  });
});
