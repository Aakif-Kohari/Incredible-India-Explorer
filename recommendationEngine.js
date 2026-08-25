const WEATHER_TAG_MAP = {
  rain: { indoorOnly: true, extraTags: ["museum", "indoor-friendly", "rainy-day"] },
  clear: {},
  clouds: {}
};

const BUDGET_CAPS = { low: 400, medium: 1000, high: Infinity };

function recommend({ intent, session }) {
  const city = intent.city || session.lastMentionedCity || session.itinerary?.city;
  const prefs = session.preferences || {};
  const filters = { city };

  if (intent.weather && WEATHER_TAG_MAP[intent.weather]) {
    const w = WEATHER_TAG_MAP[intent.weather];
    if (w.indoorOnly) filters.indoorOnly = true;
    if (w.extraTags) filters.tags = w.extraTags;
  }

  if (intent.budgetFriendly || prefs.budget) {
    const budgetKey = intent.budgetFriendly ? "low" : prefs.budget;
    filters.maxBudget = BUDGET_CAPS[budgetKey] ?? BUDGET_CAPS.medium;
  }

  if (intent.tags?.length) {
    filters.tags = [...(filters.tags || []), ...intent.tags];
  }

  let results = KnowledgeBase.search(filters);

  if (intent.near && session.lastRecommendedIds?.length) {
    const nearby = session.lastRecommendedIds.flatMap((id) => KnowledgeBase.near(id));
    const nearbyIds = new Set(nearby.map((d) => d.id));
    results = results.sort((a, b) => (nearbyIds.has(b.id) ? 1 : 0) - (nearbyIds.has(a.id) ? 1 : 0));
  }

  if (!results.length && city) {
    results = KnowledgeBase.byCity(city);
  }

  return results.slice(0, 5);
}