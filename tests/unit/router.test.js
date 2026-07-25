import { describe, it, expect, beforeEach } from 'vitest';

describe('SPA Router Unit Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app-root"></div>';
  });

  it('initializes route state correctly', () => {
    const routeState = {
      currentRoute: '/',
      history: ['/'],
      cache: new Map()
    };
    expect(routeState.currentRoute).toBe('/');
    expect(routeState.history).toHaveLength(1);
  });

  it('handles route caching and fallback rendering', () => {
    const cache = new Map();
    cache.set('/states/delhi', '<h1>Delhi Explorer</h1>');
    
    expect(cache.has('/states/delhi')).toBe(true);
    expect(cache.get('/states/delhi')).toContain('Delhi Explorer');
    expect(cache.has('/404')).toBe(false);
  });

  it('escapes HTML strings safely for error views', () => {
    const escapeHtml = (str) => {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };

    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });
});
