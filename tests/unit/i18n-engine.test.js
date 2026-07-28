import { describe, it, expect, beforeEach, vi } from 'vitest';
import { I18nEngine, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../js-modules/i18n-engine.js';

function makeEngine(overrides = {}) {
  return new I18nEngine({
    loadDictionary: async (lang) => overrides[lang] || {},
  });
}

describe('I18nEngine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to English when nothing is persisted and locale is unsupported', () => {
    const engine = makeEngine();
    expect(engine.getCurrentLanguage()).toBe(DEFAULT_LANGUAGE);
  });

  it('exposes every supported language with a native label', () => {
    const engine = makeEngine();
    const codes = engine.getLanguages().map((l) => l.code);
    expect(codes).toContain('hi');
    expect(codes).toContain('ta');
    expect(SUPPORTED_LANGUAGES.find((l) => l.code === 'hi').nativeLabel).toBe('हिन्दी');
  });

  it('falls back to English when a key is missing in the active language', async () => {
    const engine = makeEngine({
      en: { nav: { home: 'Home' } },
      hi: {},
    });
    await engine.setLanguage('hi');
    expect(engine.translate('nav.home')).toBe('Home');
    expect(engine.getStatus('nav.home', 'hi')).toBe('missing');
  });

  it('prefers the active language dictionary over the English fallback', async () => {
    const engine = makeEngine({
      en: { nav: { home: 'Home' } },
      hi: { nav: { home: 'होम' } },
    });
    await engine.setLanguage('hi');
    expect(engine.translate('nav.home')).toBe('होम');
  });

  it('returns the key itself when no translation and no fallback exist anywhere', async () => {
    const engine = makeEngine({ en: {} });
    expect(engine.translate('does.not.exist')).toBe('does.not.exist');
  });

  it('interpolates {{vars}} into the resolved string', async () => {
    const engine = makeEngine({ en: { greeting: 'Hello, {{name}}!' } });
    await engine.setLanguage('en');
    expect(engine.translate('greeting', { vars: { name: 'Asha' } })).toBe('Hello, Asha!');
  });

  it('layers AI translations below human overrides', async () => {
    const engine = makeEngine({ en: { title: 'Title' }, hi: {} });
    await engine.setLanguage('hi');

    engine.setAiTranslation('hi', 'title', 'शीर्षक (AI)');
    expect(engine.translate('title')).toBe('शीर्षक (AI)');
    expect(engine.getStatus('title')).toBe('ai');

    engine.setOverride('hi', 'title', 'शीर्षक');
    expect(engine.translate('title')).toBe('शीर्षक');
    expect(engine.getStatus('title')).toBe('human');
  });

  it('persists the selected language across engine instances via localStorage', async () => {
    const engineA = makeEngine({ hi: {} });
    await engineA.setLanguage('hi');

    const engineB = makeEngine({ hi: {} });
    expect(engineB.getCurrentLanguage()).toBe('hi');
  });

  it('persists manual overrides across engine instances (simulating dashboard edits)', async () => {
    const engineA = makeEngine({ en: { nav: { home: 'Home' } }, hi: {} });
    await engineA.setLanguage('hi');
    engineA.setOverride('hi', 'nav.home', 'होम (सही किया गया)');

    const engineB = makeEngine({ en: { nav: { home: 'Home' } }, hi: {} });
    await engineB.setLanguage('hi');
    expect(engineB.translate('nav.home')).toBe('होम (सही किया गया)');
    expect(engineB.getStatus('nav.home')).toBe('human');
  });

  it('notifies listeners and dispatches a window event on language change', async () => {
    const engine = makeEngine({ hi: {} });
    const listener = vi.fn();
    engine.on('languagechange', listener);

    const windowListener = vi.fn();
    window.addEventListener('i18n:languagechange', windowListener);

    await engine.setLanguage('hi');

    expect(listener).toHaveBeenCalledWith({ language: 'hi' });
    expect(windowListener).toHaveBeenCalledTimes(1);
  });

  it('applyToDOM translates [data-i18n] elements within a subtree', async () => {
    document.body.innerHTML = `
      <div id="scope">
        <h1 data-i18n="nav.home"></h1>
        <input data-i18n-placeholder="common.searchPlaceholder" />
      </div>
    `;
    const engine = makeEngine({
      en: { nav: { home: 'Home' }, common: { searchPlaceholder: 'Search...' } },
    });
    await engine.setLanguage('en');
    engine.applyToDOM(document.getElementById('scope'));

    expect(document.querySelector('h1').textContent).toBe('Home');
    expect(document.querySelector('input').getAttribute('placeholder')).toBe('Search...');
  });
});
