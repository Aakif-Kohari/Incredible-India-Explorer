/**
 * conversation-context.js
 * Issue #1027 — AI-Powered Voice Travel Assistant.
 *
 * Gives the voice assistant short-term memory within a session: what place
 * was last discussed (so "plan a trip there" resolves "there"), and a
 * bounded turn history (so multi-turn conversations, e.g. "tell me about
 * Kerala" -> "what's the best time to visit?", can be handled without the
 * caller re-stating the destination every time).
 *
 * Pure and DOM-free — no import of speech APIs — so it's directly unit
 * testable, same convention as AdaptivePreferenceEngine (#864) and
 * I18nEngine (#771).
 */

const DEFAULT_MAX_TURNS = 20;

// Words that stand in for "the place we were just talking about". Matched
// case-insensitively as whole words so e.g. "Itanagar" isn't mangled.
const REFERENCE_WORDS = ['there', 'it', 'that place', 'this place', 'that', 'this'];

function buildReferencePattern() {
  const escaped = REFERENCE_WORDS.slice().sort((a, b) => b.length - a.length).map((w) =>
    w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

export class ConversationContext {
  /** @param {object} [options] @param {number} [options.maxTurns] */
  constructor(options = {}) {
    this.maxTurns = options.maxTurns || DEFAULT_MAX_TURNS;
    this.turns = [];
    this.lastEntity = null; // { name, type } e.g. { name: 'Kerala', type: 'destination' }
    this.lastIntent = null;
  }

  /**
   * Rewrites referring pronouns ("there", "it", "that place") in `text`
   * with the last-known entity name, if one exists. Leaves text untouched
   * when there's nothing to resolve against, so the caller can safely
   * always run input through this before parsing.
   */
  resolveReferences(text) {
    if (!this.lastEntity || !this.lastEntity.name) return text;
    const pattern = buildReferencePattern();
    if (!pattern.test(text)) return text;
    pattern.lastIndex = 0;
    return text.replace(pattern, this.lastEntity.name);
  }

  /** Record a completed turn and update short-term memory. */
  remember({ speaker, text, intent, entity }) {
    this.turns.push({ speaker, text, intent, entity, timestamp: Date.now() });
    if (this.turns.length > this.maxTurns) this.turns.shift();

    if (entity && entity.name) this.lastEntity = entity;
    if (intent) this.lastIntent = intent;
  }

  getHistory() {
    return this.turns.slice();
  }

  getLastEntity() {
    return this.lastEntity;
  }

  reset() {
    this.turns = [];
    this.lastEntity = null;
    this.lastIntent = null;
  }
}

export default ConversationContext;
