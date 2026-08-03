/**
 * i18n-engine.js
 * Issue #771 — Multi-Language Content Management with AI-Powered Translation Support
 *
 * Framework-free translation engine for the static, fetch-based SPA. It layers
 * three sources of truth per language, highest priority first:
 *
 *   1. "human"  — manually reviewed/edited translations (locale JSON files,
 *                 or admin overrides saved via the Translation Dashboard)
 *   2. "ai"     — machine translations fetched on demand from /frontend/api/translate
 *                 and cached client-side
 *   3. "en"     — the English source string, used whenever nothing else exists
 *
 * The engine has no build step and no framework dependency, matching the
 * rest of the site (see js-modules/budget-calculator-engine.js for the same
 * plain-class-with-named-export convention).
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
  { code: 'ur', label: 'Urdu', nativeLabel: 'اردو' },
];

export const DEFAULT_LANGUAGE = 'en';
export const LANGUAGE_STORAGE_KEY = 'incredible-india-language';
const OVERRIDE_STORAGE_PREFIX = 'incredible-india-i18n-overrides:';

function getByPath(obj, path) {
  if (!obj) return undefined;
  return path.split('.').reduce((acc, part) => (acc && typeof acc === 'object' ? acc[part] : undefined), obj);
}

function setByPath(obj, path, value) {
  const parts = path.split('.');
  let cursor = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (typeof cursor[part] !== 'object' || cursor[part] === null) cursor[part] = {};
    cursor = cursor[part];
  }
  cursor[parts[parts.length - 1]] = value;
}

function interpolate(str, vars) {
  if (!vars || typeof str !== 'string') return str;
  return str.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match
  );
}

function safeStorage() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

export class I18nEngine {
  /**
   * @param {object} [options]
   * @param {string} [options.defaultLanguage]
   * @param {string[]} [options.supportedCodes] restrict which languages are offered
   * @param {(lang:string)=>Promise<object>} [options.loadDictionary] loader for
   *        locale JSON (defaults to fetch('./frontend/i18n/locales/{lang}.json'))
   */
  constructor(options = {}) {
    this.defaultLanguage = options.defaultLanguage || DEFAULT_LANGUAGE;
    this.supportedCodes = options.supportedCodes || SUPPORTED_LANGUAGES.map((l) => l.code);
    this.loadDictionary = options.loadDictionary || this._defaultLoadDictionary.bind(this);

    /** @type {Record<string, object>} human/manual + shipped dictionaries, keyed by lang */
    this.dictionaries = { [this.defaultLanguage]: {} };
    /** @type {Record<string, object>} AI-generated translations, keyed by lang */
    this.aiCache = {};
    /** @type {Record<string, 'human'|'ai'|'missing'>} last-known status per "lang:key" */
    this.status = {};

    this.currentLanguage = this._readPersistedLanguage();
    this._listeners = new Set();
  }

  async _defaultLoadDictionary(lang) {
    if (typeof fetch === 'undefined') return {};
    try {
      const res = await fetch(`./frontend/i18n/locales/${lang}.json`);
      if (!res.ok) return {};
      return await res.json();
    } catch {
      return {};
    }
  }

  _readPersistedLanguage() {
    const store = safeStorage();
    const saved = store ? store.getItem(LANGUAGE_STORAGE_KEY) : null;
    if (saved && this.isSupported(saved)) return saved;

    if (typeof navigator !== 'undefined' && navigator.language) {
      const short = navigator.language.slice(0, 2).toLowerCase();
      if (this.isSupported(short)) return short;
    }
    return this.defaultLanguage;
  }

  isSupported(code) {
    return this.supportedCodes.includes(code);
  }

  getLanguages() {
    return SUPPORTED_LANGUAGES.filter((l) => this.isSupported(l.code));
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /** Load (or reuse) the human/base dictionary for a language, then activate it. */
  async setLanguage(lang) {
    if (!this.isSupported(lang)) lang = this.defaultLanguage;

    // The English dictionary is the universal fallback, so it must be loaded
    // before we can reliably resolve *any* language's missing keys.
    if (!this.dictionaries[this.defaultLanguage] || Object.keys(this.dictionaries[this.defaultLanguage]).length === 0) {
      this.dictionaries[this.defaultLanguage] = await this.loadDictionary(this.defaultLanguage);
    }

    if (!this.dictionaries[lang]) {
      this.dictionaries[lang] = await this.loadDictionary(lang);
    }
    this.currentLanguage = lang;

    const store = safeStorage();
    if (store) store.setItem(LANGUAGE_STORAGE_KEY, lang);

    this._applyLocalOverrides(lang);
    this._emit('languagechange', { language: lang });
    return lang;
  }

  /** Merge admin/manual overrides saved locally (Translation Dashboard) on top of the shipped dictionary. */
  _applyLocalOverrides(lang) {
    const store = safeStorage();
    if (!store) return;
    try {
      const raw = store.getItem(OVERRIDE_STORAGE_PREFIX + lang);
      if (!raw) return;
      const overrides = JSON.parse(raw);
      this.dictionaries[lang] = this.dictionaries[lang] || {};
      for (const key of Object.keys(overrides)) {
        setByPath(this.dictionaries[lang], key, overrides[key]);
        this.status[`${lang}:${key}`] = 'human';
      }
    } catch {
      /* ignore malformed local overrides */
    }
  }

  /** Persist a manual/admin correction for one key, marking it "human" from now on. */
  setOverride(lang, key, value) {
    this.dictionaries[lang] = this.dictionaries[lang] || {};
    setByPath(this.dictionaries[lang], key, value);
    this.status[`${lang}:${key}`] = 'human';

    const store = safeStorage();
    if (!store) return;
    const storageKey = OVERRIDE_STORAGE_PREFIX + lang;
    const existing = JSON.parse(store.getItem(storageKey) || '{}');
    existing[key] = value;
    store.setItem(storageKey, JSON.stringify(existing));
  }

  /** Record an AI-generated translation in the in-memory cache for this session. */
  setAiTranslation(lang, key, value) {
    this.aiCache[lang] = this.aiCache[lang] || {};
    setByPath(this.aiCache[lang], key, value);
    if (this.status[`${lang}:${key}`] !== 'human') {
      this.status[`${lang}:${key}`] = 'ai';
    }
  }

  /**
   * Resolve a translation key against: human override -> AI cache -> English
   * source -> the key itself (so missing strings are visible, not blank).
   */
  translate(key, { lang, vars, fallback } = {}) {
    const targetLang = lang || this.currentLanguage;

    const human = getByPath(this.dictionaries[targetLang], key);
    if (human !== undefined) return interpolate(human, vars);

    const ai = getByPath(this.aiCache[targetLang], key);
    if (ai !== undefined) return interpolate(ai, vars);

    const english = getByPath(this.dictionaries[this.defaultLanguage], key);
    if (english !== undefined) return interpolate(english, vars);

    if (!this.status[`${targetLang}:${key}`]) {
      this.status[`${targetLang}:${key}`] = 'missing';
    }
    return interpolate(fallback !== undefined ? fallback : key, vars);
  }

  /** e.g. 'ai' | 'human' | 'missing' — used by the Translation Dashboard. */
  getStatus(key, lang) {
    return this.status[`${(lang || this.currentLanguage)}:${key}`] || 'missing';
  }

  /** Walk a DOM subtree and translate every [data-i18n] element in place. */
  applyToDOM(root) {
    if (typeof document === 'undefined') return;
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.translate(key);
    });
    scope.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', this.translate(el.getAttribute('data-i18n-placeholder')));
    });
    scope.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      el.setAttribute('aria-label', this.translate(el.getAttribute('data-i18n-aria-label')));
    });
  }

  on(event, callback) {
    this._listeners.add({ event, callback });
    return () => this._listeners.delete({ event, callback });
  }

  _emit(event, detail) {
    for (const listener of this._listeners) {
      if (listener.event === event) listener.callback(detail);
    }
    if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
      window.dispatchEvent(new CustomEvent(`i18n:${event}`, { detail }));
    }
  }
}

export default I18nEngine;
