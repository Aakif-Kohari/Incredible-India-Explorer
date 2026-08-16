# Real-Time Crowd Density Prediction & Smart Visit Scheduling

Resolves #769 — Implement Real-Time Crowd Density Prediction and Smart
Visit Scheduling.

## What it does

Adds a Crowd Density Predictor (`frontend/crowd-density/index.html`) that,
for a chosen destination and date, shows:

- A **Low / Moderate / High crowd indicator** with a 0-100 score and a
  breakdown of the factors that produced it.
- **Best visiting hours** — the quietest hours of the day, plus the single
  busiest hour to avoid.
- A **7-day crowd forecast** bar chart for trend visualization.
- **Less-crowded nearby alternatives**, only shown when they're actually
  predicted quieter than the primary destination on the same date.
- A **crowd-aware itinerary planner** — add stops with planned dates and
  any stop predicted High gets a suggested nearby date with a lower score.
- A **feedback control** ("Quieter / About right / Busier than shown")
  that nudges future predictions for that destination.

Predictions refresh automatically on an interval (`startAutoRefresh` in
the service layer) as well as whenever the destination or date changes,
covering the "dynamic prediction updates" requirement.

## Why no backend

Consistent with the rest of this project (see `ROUTE_PLANNER.md`'s "Why
no backend" section and `SUSTAINABILITY_SCORING.md`), this is a static,
buildless site with no crowd-sensing hardware or ticketing-system
integration to draw real footfall counts from. The feature is therefore a
**rule-based estimator** built from public signals (day of week, the
public holiday calendar, seasonal tourism trends, and live weather) —
directionally useful for travel planning, but not a measured or
ML-trained crowd count. If a real footfall data source (venue APIs,
anonymized mobility data, etc.) becomes available later, only
`crowd-density-service.js`'s `predict()` method needs to change; the
engine's public interface (`predictCrowdLevel`, `getForecast`, etc.) is
designed to work the same way with better-calibrated inputs.

## Architecture

```
js-modules/crowd-density-data.js     Curated dataset (destinations, 2026
                                      holiday calendar, nearby alternatives)
        │
        ▼
js-modules/crowd-density-engine.js   Pure scoring/recommendation logic.
                                      No DOM, no network, no localStorage
                                      — unit tested directly (see
                                      tests/unit/crowd-density-engine.test.js)
        │
        ▼
js-modules/crowd-density-service.js  DOM/network-facing wrapper: wires the
                                      engine to the dataset, fetches live
                                      weather via WeatherService
                                      (weather-service.js / Open-Meteo),
                                      caches predictions in localStorage,
                                      persists feedback, and drives
                                      auto-refresh via a timer.
        │
        ▼
frontend/crowd-density/script.js     UI layer — renders the indicator,
                                      best-hours chips, forecast chart,
                                      alternatives list, and itinerary
                                      planner, and wires up DOM events.
```

This mirrors the split already used for weather (`weather-core.js` pure
rules vs. `weather-service.js` fetch+cache) and for the Route Planner
(`sustainability-engine.js` pure scoring vs. `route-planner-ui.js` DOM
wiring): keep anything that needs to be unit tested free of I/O, and keep
I/O concerns in a thin wrapper on top.

## Prediction model

`CrowdDensityEngine.predictCrowdLevel(destinationId, date, {weather})`
computes a 0-100 score as the sum of five factors, each clamped
individually before summing, then the total is clamped to [0, 100]:

| Factor | Range | What it captures |
| --- | --- | --- |
| Baseline popularity | 0 to 30 | Editorial 1-10 popularity rating × 3 — how busy the site typically runs regardless of date |
| Weekend effect | 0 or 25 | +25 if the date is a Saturday or Sunday |
| Holiday proximity | 0 to 30 | Strongest match across the holiday calendar: national vs. regional (state-scoped) holidays, decayed by how many days away the date is (full weight on the holiday itself, ~55% one day out, ~25% two days out — models long-weekend travel) |
| Seasonal trend | -10 to 15 | +15 if the date's month is in the destination's curated peak season, -10 if it's off-season |
| Weather | -15 to 10 | +10 for clear weather, -15 for rain/extreme weather (via live forecast from `WeatherService`, mapped from Open-Meteo's WMO weather codes), 0 if no forecast is available |
| Learned feedback adjustment | -15 to 15 | A bounded exponential moving average of `(actual − predicted)` from user feedback, see below |

Scores map to indicators as: **0-35 Low 🟢, 36-65 Moderate 🟡, 66-100 High
🔴** (`CrowdDensityEngine.levelForScore`).

### Best visiting hours

Each destination has a `siteType` (`monument`, `spiritual`, `hillstation`,
`beach`, `wildlife`) mapped to an editorial 24-hour relative-crowd curve
(e.g. monuments peak late morning, spiritual sites peak at dawn/dusk
aarti timings, wildlife parks peak during morning/evening safari slots).
`getBestVisitingHours()` returns the quietest N hours (chronologically
sorted) plus the single busiest hour.

### Nearby alternatives

`suggestAlternatives()` looks up a curated `nearbyAlternatives` map
(destination → nearby destination ids + approximate distance), predicts
each candidate for the same date, and returns only the ones scoring
*lower* than the primary destination — so users are never pointed toward
something equally or more crowded.

### Crowd-aware itinerary optimization

`optimizeItinerary(stops, {flexibilityDays})` walks an ordered list of
`{destinationId, date}` stops. Any stop predicted **High** is re-evaluated
across a ±`flexibilityDays` window (default 2 days) around its planned
date, and if a lower-scoring nearby date exists, that's returned as a
suggestion (date, predicted score/level, and the score reduction) without
silently moving the trip — the itinerary order and all non-High stops are
left untouched.

### Feedback loop

`recordFeedback(destinationId, predictedScore, actualScore)` updates a
per-destination adjustment: `adjustment += (actual − predicted) × weight`
(default weight 0.2), clamped to ±15 so a handful of outlier reports
can't dominate the model. `crowd-density-service.js` persists this to
`localStorage` (`crowdDensityFeedback`) so it survives reloads, and
reloads it into the engine on startup via `loadFeedbackAdjustments()`.

## Testing

`tests/unit/crowd-density-engine.test.js` covers scoring bounds, the
weekday/weekend and holiday/season deltas, regional-vs-national holiday
scoping, weather's effect, best-hours ordering, forecast length, the
"alternatives are always lower-scoring" invariant, itinerary suggestions,
and feedback bounding/persistence-round-trip — all against small inline
fixtures (no dependency on the real dataset), consistent with
`tests/unit/event-recommendation-engine.test.js`.

Run with:

```
npm run test:unit
```

## Limitations & future work

- Holiday dates for 2026 are editorial estimates for lunar/regional
  festivals (matching the precision already used by `event-data.js` and
  `festivalsData`), not authoritative government notifications.
- The hourly crowd curves and nearby-alternatives map currently cover 20
  popular destinations; extending coverage just means adding entries to
  `crowd-density-data.js`.
- There's no real-time occupancy sensor or ticketing-API integration yet
  — see "Why no backend" above for how one could be layered in without
  changing the engine's public interface.
