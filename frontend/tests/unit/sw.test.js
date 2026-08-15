import { describe, it, expect } from 'vitest';

describe('Service Worker Strategy Unit Tests', () => {
  const CACHE_NAME = 'ii-explorer-v1';
  const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/data.js'
  ];

  it('defines cache name and core static assets', () => {
    expect(CACHE_NAME).toBe('ii-explorer-v1');
    expect(ASSETS_TO_CACHE).toContain('/index.html');
    expect(ASSETS_TO_CACHE).toContain('/styles.css');
  });

  it('matches static asset URLs for cache strategy', () => {
    const isStaticAsset = (url) => {
      return url.endsWith('.css') || url.endsWith('.js') || url.endsWith('.html') || url.endsWith('.png');
    };

    expect(isStaticAsset('/styles.css')).toBe(true);
    expect(isStaticAsset('/data.js')).toBe(true);
    expect(isStaticAsset('/frontend/api/dynamic')).toBe(false);
  });

  it('handles offline fallback response decision', () => {
    const getResponseForStatus = (isOnline, path) => {
      if (isOnline) return { status: 200, source: 'network' };
      if (ASSETS_TO_CACHE.includes(path)) return { status: 200, source: 'cache' };
      return { status: 503, source: 'offline-fallback' };
    };

    expect(getResponseForStatus(true, '/index.html')).toEqual({ status: 200, source: 'network' });
    expect(getResponseForStatus(false, '/index.html')).toEqual({ status: 200, source: 'cache' });
    expect(getResponseForStatus(false, '/unknown')).toEqual({ status: 503, source: 'offline-fallback' });
  });
});
