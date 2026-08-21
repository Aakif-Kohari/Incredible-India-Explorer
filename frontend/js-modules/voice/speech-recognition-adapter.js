/**
 * speech-recognition-adapter.js
 * Issue #1027 — AI-Powered Voice Travel Assistant.
 *
 * Thin wrapper around the browser's SpeechRecognition /
 * webkitSpeechRecognition API: feature detection, language switching, and
 * a simple callback API (onResult/onError/onEnd) instead of the raw event
 * object. The recognition constructor is injectable so this is unit
 * testable with a fake implementation, without needing a real browser.
 *
 * Browser support is uneven (Chrome/Edge: yes; Firefox: no; Safari:
 * partial/prefixed) — see docs/VOICE_ASSISTANT.md for the honest support
 * matrix. `SpeechRecognitionAdapter.isSupported()` lets callers degrade
 * gracefully (e.g. hide the mic button) rather than throwing.
 */

export class SpeechRecognitionAdapter {
  /**
   * @param {object} [options]
   * @param {Function} [options.RecognitionCtor] injectable SpeechRecognition constructor (for tests)
   * @param {string} [options.lang] BCP-47 language tag, e.g. 'en-US', 'hi-IN'
   * @param {boolean} [options.interimResults]
   * @param {boolean} [options.continuous]
   */
  constructor(options = {}) {
    this.RecognitionCtor =
      options.RecognitionCtor ||
      (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) ||
      null;
    this.lang = options.lang || 'en-US';
    this.interimResults = options.interimResults ?? true;
    this.continuous = options.continuous ?? false;
    this.recognition = null;
    this.listening = false;

    this._onResult = null;
    this._onError = null;
    this._onEnd = null;
  }

  static isSupported() {
    return typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  onResult(callback) {
    this._onResult = callback;
  }
  onError(callback) {
    this._onError = callback;
  }
  onEnd(callback) {
    this._onEnd = callback;
  }

  setLanguage(lang) {
    this.lang = lang;
    if (this.recognition) this.recognition.lang = lang;
  }

  start() {
    if (!this.RecognitionCtor) {
      if (this._onError) this._onError({ error: 'unsupported', message: 'Speech recognition is not supported in this browser.' });
      return false;
    }
    if (this.listening) return true;

    this.recognition = new this.RecognitionCtor();
    this.recognition.lang = this.lang;
    this.recognition.interimResults = this.interimResults;
    this.recognition.continuous = this.continuous;

    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const isFinal = Boolean(result.isFinal);
      if (this._onResult) this._onResult({ transcript, isFinal });
    };
    this.recognition.onerror = (event) => {
      if (this._onError) this._onError({ error: event.error, message: `Speech recognition error: ${event.error}` });
    };
    this.recognition.onend = () => {
      this.listening = false;
      if (this._onEnd) this._onEnd();
    };

    this.recognition.start();
    this.listening = true;
    return true;
  }

  stop() {
    if (this.recognition && this.listening) {
      this.recognition.stop();
    }
    this.listening = false;
  }
}

export default SpeechRecognitionAdapter;
