/**
 * intent-parser.js
 * Issue #1027 — AI-Powered Voice Travel Assistant.
 *
 * A small, deterministic, offline rule-based NLU layer that sits in front
 * of the existing Bharat AI Q&A engine (chatbot-data.js's
 * `findBestResponse`). Most voice phrases are open-ended travel questions
 * that engine already answers well — this parser only needs to catch the
 * *actionable* commands the issue calls out (navigation, bookmarking,
 * search, itinerary planning, language switching) and hand everything
 * else through as QA_FALLBACK.
 *
 * Runs entirely offline (no network, no AI call) — this is the part of the
 * feature that can genuinely work without connectivity, which is what the
 * issue's "Offline voice command support for basic operations" criterion
 * asks for. Pure/DOM-free so it's directly unit testable.
 */

export const INTENTS = Object.freeze({
  NAVIGATE: 'NAVIGATE',
  BOOKMARK: 'BOOKMARK',
  SEARCH: 'SEARCH',
  ITINERARY: 'ITINERARY',
  LANGUAGE_SWITCH: 'LANGUAGE_SWITCH',
  QA_FALLBACK: 'QA_FALLBACK',
});

// Illustrative route map using the root-relative paths the app's existing
// chat action buttons already navigate with (see chatbot-data.js). Extend
// this as more sections get voice shortcuts — a full site-wide route audit
// is out of scope for this PR (188+ pages).
export const NAVIGATION_ROUTES = Object.freeze({
  home: '/',
  cuisine: '/frontend/cuisine/cuisine.html',
  festivals: '/frontend/festivals/festivals.html',
  culture: '/frontend/culture/culture.html',
  wildlife: '/frontend/wildlife/wildlife.html',
  monuments: '/frontend/monuments/monuments.html',
  travel: '/frontend/travel/travel.html',
  'route planner': '/frontend/route-planner/route-planner.html',
  'trip planner': '/frontend/travel/travel.html',
});

// Small, self-contained language map so this module has no hard dependency
// on the i18n engine from #771. If that PR has landed, prefer wiring the
// widget to `window.I18n`'s SUPPORTED_LANGUAGES instead (see docs).
export const VOICE_LANGUAGES = Object.freeze({
  english: 'en', hindi: 'hi', bengali: 'bn', tamil: 'ta', telugu: 'te',
  marathi: 'mr', gujarati: 'gu', kannada: 'kn', malayalam: 'ml', punjabi: 'pa', urdu: 'ur',
});

function includesAny(text, phrases) {
  return phrases.some((p) => text.includes(p));
}

function findNavigationTarget(text) {
  for (const key of Object.keys(NAVIGATION_ROUTES)) {
    if (text.includes(key)) return { key, path: NAVIGATION_ROUTES[key] };
  }
  return null;
}

function findLanguageTarget(text) {
  for (const name of Object.keys(VOICE_LANGUAGES)) {
    if (text.includes(name)) return { name, code: VOICE_LANGUAGES[name] };
  }
  return null;
}

function extractAfter(text, markers) {
  for (const marker of markers) {
    const idx = text.indexOf(marker);
    if (idx !== -1) {
      const rest = text.slice(idx + marker.length).trim();
      if (rest) return rest;
    }
  }
  return null;
}

function extractDays(text) {
  const match = text.match(/(\d+)\s*[- ]?day/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * @param {string} inputText the transcript, ideally already passed through
 *   ConversationContext#resolveReferences so pronouns are substituted for
 *   slot extraction (e.g. "plan a trip there" -> "plan a trip Kerala")
 * @param {string} [originalText] the transcript *before* reference
 *   resolution. Needed because some trigger phrases (e.g. "bookmark it",
 *   "save this") contain the very pronoun that resolution replaces —
 *   matching against the resolved text alone would silently miss them.
 *   Defaults to `inputText` when not provided.
 * @returns {{intent:string, slots:object, confidence:number}}
 */
export function parseIntent(inputText, originalText) {
  const text = (inputText || '').trim().toLowerCase();
  const rawText = (originalText !== undefined ? originalText : inputText || '').trim().toLowerCase();
  if (!text) return { intent: INTENTS.QA_FALLBACK, slots: {}, confidence: 0 };

  // --- Language switch ---
  if (includesAny(text, ['speak in', 'speak to me in', 'switch to', 'change language to', 'talk to me in'])) {
    const lang = findLanguageTarget(text);
    if (lang) return { intent: INTENTS.LANGUAGE_SWITCH, slots: { language: lang }, confidence: 0.9 };
  }

  // --- Itinerary planning (checked before generic navigation/search so
  // "plan a trip to Kerala" isn't swallowed by the "trip planner" route) ---
  if (includesAny(text, ['plan a trip', 'plan a', 'itinerary', 'build me a trip'])) {
    const days = extractDays(text);
    const destination = extractAfter(text, ['trip to ', 'itinerary for ', 'trip for ']);
    return {
      intent: INTENTS.ITINERARY,
      slots: { destination, days },
      confidence: destination ? 0.85 : 0.5,
    };
  }

  // --- Bookmark / save shortcuts ---
  // Matched against `rawText` (pre-resolution) because these phrases are
  // defined by their pronoun ("this"/"it"), which resolveReferences()
  // would otherwise have already replaced with an entity name.
  if (includesAny(rawText, ['bookmark this', 'save this', 'add this to my journey', 'remember this place', 'bookmark it']) ||
      text.includes('bookmark')) {
    return { intent: INTENTS.BOOKMARK, slots: {}, confidence: 0.9 };
  }

  // --- Search ---
  if (includesAny(text, ['search for ', 'find ', 'look up '])) {
    const query = extractAfter(text, ['search for ', 'look up ', 'find ']);
    if (query) return { intent: INTENTS.SEARCH, slots: { query }, confidence: 0.8 };
  }

  // --- Navigation ---
  if (includesAny(text, ['go to ', 'open ', 'take me to ', 'navigate to ', 'show me the '])) {
    const target = findNavigationTarget(text);
    if (target) return { intent: INTENTS.NAVIGATE, slots: { target }, confidence: 0.85 };
  }

  return { intent: INTENTS.QA_FALLBACK, slots: {}, confidence: 0 };
}

export default parseIntent;
