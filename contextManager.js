/**
 * Client-side session state, persisted to localStorage so context
 * (itinerary, preferences, history, last recommendations) survives
 * page reloads — no backend needed.
 */
const ContextManager = (() => {
  const STORAGE_KEY = "ta_session_v1";

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* corrupt storage, fall through to fresh session */ }
    return {
      history: [],
      itinerary: null,
      preferences: {},
      lastMentionedCity: null,
      lastRecommendedIds: []
    };
  }

  let session = load();

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  return {
    getSession() {
      return session;
    },
    addMessage(role, text) {
      session.history.push({ role, text, timestamp: Date.now() });
      if (session.history.length > 20) session.history.shift();
      save();
    },
    updateItinerary(itinerary) {
      session.itinerary = { ...session.itinerary, ...itinerary };
      if (itinerary.city) session.lastMentionedCity = itinerary.city;
      save();
    },
    updatePreferences(preferences) {
      session.preferences = { ...session.preferences, ...preferences };
      save();
    },
    setLastRecommendations(ids) {
      session.lastRecommendedIds = ids;
      save();
    },
    clear() {
      localStorage.removeItem(STORAGE_KEY);
      session = load();
    }
  };
})();