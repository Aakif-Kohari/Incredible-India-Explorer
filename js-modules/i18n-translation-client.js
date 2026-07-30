/**
 * i18n-translation-client.js
 * Issue #771 — on-demand AI translation for dynamic, user-generated content
 * (currently: destination reviews) that isn't covered by the shipped locale
 * dictionaries in i18n/locales/*.json.
 *
 * Talks to the serverless endpoint in api/translate.js and caches results in
 * localStorage so the same review/description is never re-translated twice
 * for a given visitor.
 */

const CACHE_KEY = 'incredible-india-ai-translation-cache';
const CACHE_LIMIT = 500; // simple FIFO cap so localStorage doesn't grow unbounded

function loadCache() {
  try {
    if (typeof localStorage === 'undefined') return {};
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveCache(cache) {
  try {
    if (typeof localStorage === 'undefined') return;
    const keys = Object.keys(cache);
    if (keys.length > CACHE_LIMIT) {
      // drop the oldest entries (insertion order) to bound storage size
      for (const key of keys.slice(0, keys.length - CACHE_LIMIT)) delete cache[key];
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* localStorage full or unavailable — degrade to no caching */
  }
}

function cacheKeyFor(text, targetLang) {
  // Cheap, dependency-free hash; collisions just mean an extra API call, never wrong data,
  // because we still store/verify the original text alongside the hash.
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return `${targetLang}:${hash}`;
}

export class TranslationClient {
  /**
   * @param {object} [options]
   * @param {string} [options.endpoint] defaults to '/api/translate'
   * @param {typeof fetch} [options.fetchImpl] injectable for tests
   */
  constructor(options = {}) {
    this.endpoint = options.endpoint || '/api/translate';
    this.fetchImpl = options.fetchImpl || (typeof fetch !== 'undefined' ? fetch.bind(globalThis) : null);
    this.cache = loadCache();
    this.pending = new Map(); // de-dupe concurrent requests for the same text+lang
  }

  /**
   * Translate one piece of dynamic content (e.g. a review body) on demand.
   * Returns { text, source: 'cache'|'ai'|'error', targetLang }.
   */
  async translate(text, targetLang, { sourceLang = 'en', context } = {}) {
    if (!text || targetLang === sourceLang) {
      return { text, source: 'skip', targetLang };
    }

    const key = cacheKeyFor(text, targetLang);
    if (this.cache[key] && this.cache[key].original === text) {
      return { text: this.cache[key].translated, source: 'cache', targetLang };
    }

    if (this.pending.has(key)) return this.pending.get(key);

    const requestPromise = this._request(text, targetLang, sourceLang, context)
      .then((translated) => {
        this.cache[key] = { original: text, translated };
        saveCache(this.cache);
        return { text: translated, source: 'ai', targetLang };
      })
      .catch(() => ({ text, source: 'error', targetLang })) // graceful fallback: show original
      .finally(() => this.pending.delete(key));

    this.pending.set(key, requestPromise);
    return requestPromise;
  }

  async _request(text, targetLang, sourceLang, context) {
    if (!this.fetchImpl) throw new Error('fetch is not available in this environment');

    const res = await this.fetchImpl(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang, sourceLang, context }),
    });

    if (!res.ok) throw new Error(`Translation request failed: ${res.status}`);
    const data = await res.json();
    if (!data || typeof data.translatedText !== 'string') {
      throw new Error('Malformed translation response');
    }
    return data.translatedText;
  }
}

export default TranslationClient;
