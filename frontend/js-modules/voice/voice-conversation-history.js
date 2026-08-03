/**
 * voice-conversation-history.js
 * Issue #1027 — AI-Powered Voice Travel Assistant.
 *
 * Persists a bounded log of conversation turns (both typed and spoken) so
 * a returning visitor's chat history survives a page reload. Same
 * storage-injectable, bounded-log convention as InteractionTracker (#864)
 * and I18nEngine (#771), so it's directly unit testable without a browser.
 */

export const HISTORY_STORAGE_KEY = 'incredible-india-voice-history';
export const MAX_TURNS = 200;

function memoryStorage() {
  const store = new Map();
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, value),
  };
}

function safeLocalStorage() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage;
  } catch {
    return null;
  }
}

export class VoiceConversationHistory {
  /** @param {object} [options] @param {{getItem,setItem}} [options.storage] */
  constructor(options = {}) {
    this.storage = options.storage || safeLocalStorage() || memoryStorage();
  }

  _read() {
    try {
      const raw = this.storage.getItem(HISTORY_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  _write(turns) {
    const trimmed = turns.slice(-MAX_TURNS);
    this.storage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
    return trimmed;
  }

  /**
   * @param {object} turn
   * @param {'user'|'assistant'} turn.speaker
   * @param {string} turn.text
   * @param {string} [turn.intent]
   * @param {boolean} [turn.viaVoice] true if this turn came from speech, not typing
   */
  append(turn) {
    const record = { timestamp: Date.now(), viaVoice: false, ...turn };
    const turns = this._read();
    turns.push(record);
    return this._write(turns);
  }

  getTurns() {
    return this._read();
  }

  clear() {
    return this._write([]);
  }
}

export default VoiceConversationHistory;
