/* Issue #771 — Language Switcher widget */

import { I18nEngine } from './i18n-engine.js';

(function () {
  'use strict';

  const engine = new I18nEngine();
  window.I18n = engine; // shared singleton, mirrors window.Journey / window.SmartBudgetPlanner

  function buildSwitcher() {
    const wrapper = document.createElement('div');
    wrapper.className = 'lang-switcher';
    wrapper.setAttribute('data-testid', 'language-switcher');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lang-switcher__button';
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');

    const menu = document.createElement('ul');
    menu.className = 'lang-switcher__menu';
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;

    function renderButtonLabel() {
      const active = engine.getLanguages().find((l) => l.code === engine.getCurrentLanguage());
      button.textContent = `🌐 ${active ? active.nativeLabel : 'English'}`;
    }

    function renderMenu() {
      menu.innerHTML = '';
      engine.getLanguages().forEach((lang) => {
        const item = document.createElement('li');
        item.setAttribute('role', 'option');
        // Options must be focusable, or keyboard users can open the menu but
        // never reach the choices inside it.
        item.tabIndex = -1;
        item.dataset.langCode = lang.code;
        item.setAttribute('aria-selected', String(lang.code === engine.getCurrentLanguage()));
        item.textContent = `${lang.nativeLabel} (${lang.label})`;

        async function select() {
          await engine.setLanguage(lang.code);
          engine.applyToDOM(document);
          renderButtonLabel();
          renderMenu();
          closeMenu();
          button.focus();
        }

        item.addEventListener('click', select);
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            select();
          }
        });
        menu.appendChild(item);
      });
    }

    function options() {
      return Array.from(menu.querySelectorAll('[role="option"]'));
    }

    /** Focus the option `delta` steps from the focused one, wrapping at both ends. */
    function moveFocus(delta) {
      const items = options();
      if (!items.length) return;
      const current = items.indexOf(document.activeElement);
      const next = (current + delta + items.length) % items.length;
      items[next].focus();
    }

    function focusEdge(which) {
      const items = options();
      if (!items.length) return;
      items[which === 'last' ? items.length - 1 : 0].focus();
    }

    function openMenu() {
      menu.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    }

    button.addEventListener('click', () => (menu.hidden ? openMenu() : closeMenu()));

    button.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        openMenu();
        focusEdge(e.key === 'ArrowDown' ? 'first' : 'last');
      }
    });

    menu.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveFocus(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveFocus(-1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        button.focus();
      } else if (e.key === 'Tab') {
        closeMenu();
      }
    });

    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) closeMenu();
    });

    renderButtonLabel();
    renderMenu();

    wrapper.appendChild(button);
    wrapper.appendChild(menu);
    return wrapper;
  }

  async function init() {
    await engine.setLanguage(engine.getCurrentLanguage());
    engine.applyToDOM(document);

    const mountPoint =
      document.querySelector('[data-lang-switcher-mount]') ||
      document.querySelector('.navbar, nav, header');
    if (mountPoint) mountPoint.appendChild(buildSwitcher());

    // Re-translate content injected by other lazily-loaded page scripts.
    engine.on('languagechange', () => engine.applyToDOM(document));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
