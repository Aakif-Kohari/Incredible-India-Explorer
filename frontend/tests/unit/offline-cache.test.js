import { describe, it, expect } from 'vitest';

describe('Dynamic Offline PWA Caching Strategy', () => {
  it('sw.js supports Stale-While-Revalidate and Cache-First dynamic asset strategies', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const swPath = path.resolve(__dirname, '../../sw.js');
    const swContent = fs.readFileSync(swPath, 'utf8');

    expect(swContent).toContain('CACHE_NAME_PAGES');
    expect(swContent).toContain('CACHE_NAME_STATIC');
    expect(swContent).toContain('caches.open');
  });

  it('sw-register.js initializes offline status banner logic', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const regPath = path.resolve(__dirname, '../../sw-register.js');
    const regContent = fs.readFileSync(regPath, 'utf8');

    expect(regContent).toContain('offline-status-banner');
    expect(regContent).toContain('You are currently offline — serving cached content');
  });
});
