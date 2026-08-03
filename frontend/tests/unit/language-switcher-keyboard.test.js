import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const LOCALES = 'i18n/locales';

/**
 * Loads language-switcher.js against a minimal DOM. The module is an IIFE with
 * side effects on import, so each test gets a fresh module registry.
 */
async function mountSwitcher() {
  document.body.innerHTML = '<header class="navbar"></header>';

  globalThis.fetch = vi.fn(async (url) => {
    const lang = String(url).match(/([a-z]{2})\.json$/)?.[1];
    const file = path.join(LOCALES, `${lang}.json`);
    if (!lang || !fs.existsSync(file)) return { ok: false, json: async () => ({}) };
    return { ok: true, json: async () => JSON.parse(fs.readFileSync(file, 'utf8')) };
  });

  vi.resetModules();
  await import('../../frontend/js-modules/language-switcher.js');
  // Let the module's async init() settle.
  await new Promise((r) => setTimeout(r, 0));

  const wrapper = document.querySelector('[data-testid="language-switcher"]');
  return {
    wrapper,
    button: wrapper.querySelector('.lang-switcher__button'),
    menu: wrapper.querySelector('.lang-switcher__menu'),
    options: () => Array.from(wrapper.querySelectorAll('[role="option"]'))
  };
}

const key = (el, k) => el.dispatchEvent(new window.KeyboardEvent('keydown', { key: k, bubbles: true }));

describe('language switcher keyboard access', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('mounts a switcher with one option per available language', async () => {
    const { options } = await mountSwitcher();
    expect(options().length).toBeGreaterThan(1);
  });

  it('makes every option focusable', async () => {
    // role="option" on a plain <li> is not focusable by default, so keyboard
    // users could open the menu but never reach a choice. The tabindex
    // attribute must be present — reading el.tabIndex alone reports -1 for
    // elements that have no attribute at all, which would pass vacuously.
    const { options } = await mountSwitcher();
    for (const option of options()) {
      expect(option.hasAttribute('tabindex')).toBe(true);
      expect(option.tabIndex).toBe(-1);
    }
  });

  it('opens the menu and focuses the first option on ArrowDown', async () => {
    const { button, menu, options } = await mountSwitcher();
    expect(menu.hidden).toBe(true);

    key(button, 'ArrowDown');
    expect(menu.hidden).toBe(false);
    expect(document.activeElement).toBe(options()[0]);
  });

  it('opens the menu and focuses the last option on ArrowUp', async () => {
    const { button, options } = await mountSwitcher();
    key(button, 'ArrowUp');
    const items = options();
    expect(document.activeElement).toBe(items[items.length - 1]);
  });

  it('cycles focus through the options and wraps at the ends', async () => {
    const { button, options } = await mountSwitcher();
    key(button, 'ArrowDown');
    const items = options();

    key(items[0], 'ArrowDown');
    expect(document.activeElement).toBe(items[1]);

    key(items[1], 'ArrowUp');
    expect(document.activeElement).toBe(items[0]);

    key(items[0], 'ArrowUp');
    expect(document.activeElement).toBe(items[items.length - 1]);
  });

  it('closes on Escape and returns focus to the button', async () => {
    const { button, menu, options } = await mountSwitcher();
    key(button, 'ArrowDown');

    key(options()[0], 'Escape');
    expect(menu.hidden).toBe(true);
    expect(document.activeElement).toBe(button);
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('selects a language with Enter', async () => {
    const { button, menu, options } = await mountSwitcher();
    key(button, 'ArrowDown');

    const hindi = options().find((o) => o.dataset.langCode === 'hi');
    key(hindi, 'Enter');
    await new Promise((r) => setTimeout(r, 0));

    expect(localStorage.getItem('incredible-india-language')).toBe('hi');
    expect(menu.hidden).toBe(true);
  });

  it('selects a language with Space', async () => {
    const { button, options } = await mountSwitcher();
    key(button, 'ArrowDown');

    const tamil = options().find((o) => o.dataset.langCode === 'ta');
    key(tamil, ' ');
    await new Promise((r) => setTimeout(r, 0));

    expect(localStorage.getItem('incredible-india-language')).toBe('ta');
  });
});
