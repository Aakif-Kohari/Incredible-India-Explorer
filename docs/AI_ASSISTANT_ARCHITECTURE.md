# AI Travel Assistant — Architecture (client-only)

No backend exists in this project, so the whole pipeline runs in the browser.

## Flow
1. User types a message in the widget (`assistant-widget.js`).
2. `intentParser.js` extracts intent (city, weather, budget, near-me, food, timeframe) with regex — no network call needed.
3. `knowledgeBase.js` filters a static `destinations.js` dataset (retrieval step).
4. `recommendationEngine.js` ranks/filters results using session context from `contextManager.js` (itinerary city, budget preference, last recommendations for "near me" follow-ups).
5. `assistantService.js` turns the ranked results into a reply string. This is fully rule-based, satisfying the "useful fallback" acceptance criterion without any external dependency.
6. `contextManager.js` persists history/itinerary/preferences to `localStorage`, so context (and the visible chat) survives a page reload.

## Adding a real LLM later
Doing this safely requires a backend, because calling an LLM API directly from client-side JS would expose the API key to anyone viewing page source. If a backend is added:
- Keep `knowledgeBase.js`'s `search()` interface as-is.
- Add a server endpoint that takes `{ message, retrievedDestinations, history }`, calls the LLM with that as grounding context, and returns the text.
- Have `assistantService.js` call that endpoint, falling back to the current rule-based `buildReply()` on any failure.

## Testing
`recommendationEngine.js` and `intentParser.js` are pure functions with no DOM/localStorage dependency, so they're unit-testable in isolation (see `tests/`).