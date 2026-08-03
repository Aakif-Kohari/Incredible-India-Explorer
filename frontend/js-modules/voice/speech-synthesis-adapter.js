/**
 * speech-synthesis-adapter.js
 * Issue #1027 — AI-Powered Voice Travel Assistant.
 *
 * Multilingual replacement for the `speakResponse()` helper that already
 * exists in app.js / js-modules/initBharatGuide.js. That existing function
 * always uses the browser's default voice (effectively English-only,
 * since `SpeechSynthesisUtterance` defaults to the page language). This
 * adapter instead picks the best available voice for a given BCP-47
 * language tag, with a graceful fallback to the default voice when no
 * matching voice is installed — most desktop browsers ship at least a
 * Hindi voice; coverage for other Indian languages varies by OS.
 */

export class SpeechSynthesisAdapter {
  /** @param {object} [options] @param {SpeechSynthesis} [options.synth] injectable for tests */
  constructor(options = {}) {
    this.synth = options.synth || (typeof window !== 'undefined' ? window.speechSynthesis : null);
    this.UtteranceCtor =
      options.UtteranceCtor || (typeof window !== 'undefined' ? window.SpeechSynthesisUtterance : undefined);
  }

  static isSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  getVoices() {
    if (!this.synth) return [];
    return this.synth.getVoices() || [];
  }

  /** Best-effort voice match: exact lang match first, then same base language (e.g. 'hi' matches 'hi-IN'), else null (caller falls back to default). */
  findVoiceForLanguage(langCode) {
    const voices = this.getVoices();
    if (!voices.length) return null;
    const exact = voices.find((v) => v.lang && v.lang.toLowerCase() === langCode.toLowerCase());
    if (exact) return exact;
    const base = langCode.split('-')[0].toLowerCase();
    return voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(base)) || null;
  }

  /**
   * @param {string} text
   * @param {object} [options]
   * @param {string} [options.lang] BCP-47 tag, e.g. 'hi-IN'
   * @param {Function} [options.onEnd]
   * @param {Function} [options.onError]
   */
  speak(text, options = {}) {
    if (!this.synth || !text || !this.UtteranceCtor) return false;

    this.synth.cancel(); // one utterance at a time, matches existing speakResponse() behavior
    const utterance = new this.UtteranceCtor(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    if (options.lang) {
      utterance.lang = options.lang;
      const voice = this.findVoiceForLanguage(options.lang);
      if (voice) utterance.voice = voice;
    }
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;

    this.synth.speak(utterance);
    return true;
  }

  cancel() {
    if (this.synth) this.synth.cancel();
  }
}

export default SpeechSynthesisAdapter;
