# Smart Weather-Aware Itinerary Optimization

Resolves #1029 — Implement Smart Weather-Aware Itinerary Optimization.
Builds on the Weather-Aware Itinerary Adjustment work from #286
(`weather-core.js`, `weather-service.js`, `weather-ui.js`,
`weather-planner.css`), which this PR both **extends** and — importantly
— **actually connects to a live page** for the first time. See "Why this
PR looks partly like a bug fix" below.

## What it does

On the Trip Planner page, once an itinerary is generated:

- Fetches a weather forecast for every city in the itinerary and maps
  each "stay" day to a calendar date (using an optional **Trip Start
  Date** field).
- Scores each day **Good / Caution / Poor** based on the destination's
  outdoor-activity sensitivity (a beach day is far more weather-sensitive
  than a museum day) and the forecast's severity.
- Shows a day-by-day weather strip plus a banner + toast + (opt-in)
  **browser notification** when any day looks unfavorable.
- For each "Poor" day: suggests **indoor-friendly activities** in the
  same city, an **hourly breakdown** of exactly when conditions look
  worst, and **nearby alternative destinations** with better forecasts —
  the user can apply or dismiss any suggestion, and the choice persists.
- Suggests **reordering** itinerary days when swapping the order would
  avoid bad weather, again as an accept/reject suggestion.

## Why this PR looks partly like a bug fix

Investigating this issue turned up something worth being upfront about:
**the weather-aware engine, service layer, UI, and CSS already existed**
in this repo from #286, complete with 30 passing unit tests — but
`frontend/trip-planner/trip-planner.html` never included `trip-data.js`,
`trip-planner.js`, or any of the weather files, and `trip-planner.js`
never dispatched the `tripplanner:itinerary-rendered` event that
`weather-ui.js` was listening for. In practice this meant:

- The Trip Planner page's form did nothing at all (no script loaded to
  handle its submit event).
- Even if it had been wired up, the weather panel had no way to hear
  about a newly generated itinerary.

This PR fixes both of those (see `trip-planner.html` and the one-line
addition to `renderItinerary()` in `trip-planner.js`) as a prerequisite
to actually shipping #1029 — without it, none of the weather-aware
features below would ever run in a browser. The rest of this PR is the
genuinely new work: hourly forecasts, indoor suggestions, and the
notification alert.

## Architecture

```
trip-data.js                      Destination catalog (lat/lng, categories).
        │
        ▼
js-modules/trip-planner.js        Generates the itinerary + daily schedule,
                                   dispatches `tripplanner:itinerary-rendered`
                                   on the document once rendered.
        │
        ▼
js-modules/weather-service.js     DOM/network layer: fetches + caches daily
                                   AND hourly forecasts per destination via
                                   Open-Meteo (no API key, no backend).
        │
        ▼
js-modules/weather-core.js        Pure, DOM-free logic: weather-code
                                   classification, per-day suitability
                                   scoring, hourly "worst window"
                                   summarization, indoor-activity
                                   suggestions, alternative-destination
                                   search, and reorder suggestions. Unit
                                   tested directly (weather-core.test.js).
        │
        ▼
js-modules/weather-ui.js          DOM layer: renders the weather panel,
                                   wires up apply/dismiss buttons, shows
                                   alerts (banner/toast/notification),
                                   persists user decisions to localStorage.
        │
        ▼
frontend/trip-planner/            #weather-panel + #trip-start-date
  trip-planner.html                markup, script includes, page init.
```

This mirrors the pure-engine/DOM-service split used throughout this
project (Crowd Density Predictor, Offline Region Downloads, Route
Planner): `weather-core.js` has no DOM/network/localStorage dependency
and is fully unit-testable; `weather-service.js` and `weather-ui.js` own
all the I/O.

## Weather scoring model

`evaluateItineraryWeather()` walks the itinerary's daily schedule and,
for each "stay" day, calls `computeDaySuitability()` with that day's
forecast and the destination's `categories` (from `trip-data.js`).
Suitability depends on:

- **Weather severity** — `classifyWeatherCode()` maps Open-Meteo's WMO
  weather codes to none/moderate/severe, and precipitation probability
  is checked against a "high rain" threshold.
- **Destination sensitivity** — `destinationOutdoorSensitivity()` looks
  at the destination's categories (beaches/wildlife/adventure are
  "high" sensitivity; heritage/spiritual sites are "low", since most of
  the visit is indoors) via a curated `CATEGORY_OUTDOOR_SENSITIVITY`
  table.

A day is **Poor** if severe weather coincides with a high-sensitivity
destination (or a severe/extreme code regardless of sensitivity),
**Caution** for moderate mismatches, and **Good** otherwise.

## Hourly forecast integration

`weather-service.js#fetchHourlyForecast(lat, lng)` fetches Open-Meteo's
hourly `weathercode`/`temperature_2m`/`precipitation_probability` for
the next 3 days (kept short — hourly detail is only really actionable
for imminent days) and groups it by date. `weather-core.js#summarizeHourlyRisk(hourlyDay)`
scans a day's hours for the ones that look risky (severe/moderate
weather or high rain probability) and returns the earliest–latest risky
window as a plain-language label (e.g. *"Conditions look worst between
14:00 and 17:00."*). This is deliberately kept separate from the
day-level Good/Caution/Poor scoring — it's supplementary "when exactly"
detail, fetched on demand via the "See hourly breakdown" button so a
full day's itinerary doesn't require an hourly fetch per city up front.

## Indoor activity recommendations

`weather-core.js#suggestIndoorActivities(categories)` returns 2-3
indoor-friendly suggestions for a destination's categories from a
curated `INDOOR_ALTERNATIVES_BY_CATEGORY` table (e.g. beaches →
*"a nearby aquarium or marine museum"*). This is deliberately a
category-level heuristic, not a per-destination points-of-interest
database — `trip-data.js` doesn't carry named indoor venues per
destination, so the suggestions describe activity *types* rather than
specific named places. It's shown alongside (not instead of) the
existing alternative-destination suggestions, since "stay in the same
city but do something indoors" and "go to a nearby city with better
weather" are different trade-offs the user should choose between.

## Alerts & notifications

Adverse-weather alerts fire three ways, in increasing visibility:
1. An in-panel banner (`renderAlertBanner`), always shown if any day is
   Poor.
2. A one-shot toast per itinerary+day-set (`maybeToastAlerts`, deduped
   via a signature so regenerating the same itinerary doesn't re-toast).
3. A best-effort **browser Notification** (`tryShowWeatherNotification`),
   reusing the exact pattern already used in
   `frontend/event-discovery/script.js` — silently does nothing if
   `Notification` is unsupported or the user has denied permission; the
   banner/toast always fire regardless, so this is purely additive.

## Accept/reject suggestions

Every suggestion — an alternative destination, an indoor-activity note,
or a reorder — is advisory. Applying one only updates a preview stored
in `localStorage` (keyed by itinerary id) and re-renders the panel; it
never mutates the itinerary's actual budget, travel legs, or destination
list, which stay owned by `trip-planner.js`. Swapping in a different
city outright would change trip cost and travel legs — that's
intentionally left to the itinerary's existing explicit actions
(Regenerate / Remove city), not silently recomputed by this add-on
layer. Every applied suggestion has a visible "Revert" action.

## Testing

- `tests/unit/weather-core.test.js` — the original 30 tests (weather-code
  classification, suitability scoring, alternative search, reorder
  suggestions, summary building) plus new tests for
  `suggestIndoorActivities()` and `summarizeHourlyRisk()`.
- `tests/unit/weather-service.test.js` — new: URL building and response
  normalization for both daily and hourly forecasts, against fixture
  Open-Meteo-shaped JSON (no live network calls).
- `tests/unit/trip-planner.test.js` — existing itinerary-generation tests,
  confirming the new event dispatch didn't change any of the pure logic.

Run with:

```
npm run test:unit
```

## Limitations & future work

- Weather data comes from Open-Meteo's free forecast API (no API key,
  matching this project's "no backend" convention) — forecasts beyond
  ~16 days aren't available, so a far-future trip start date will show
  "Good" days by default rather than a real forecast.
- Indoor-activity suggestions are category-level heuristics, not a real
  points-of-interest database — see "Indoor activity recommendations"
  above.
- Browser Notifications require the user to grant permission and only
  fire while the tab/browser is capable of delivering them (no push
  subscription/server round-trip is used here, unlike `sw.js`'s existing
  push-notification scaffolding for other features).
