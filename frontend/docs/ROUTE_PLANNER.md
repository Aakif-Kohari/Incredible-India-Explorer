# Route Planner

## What it does

Lets users pick multiple destinations, choose a transport mode (road/rail/air),
and see the route on a map with total distance and estimated travel time.

## Why no backend

This project is a static, buildless site with no server. All routing runs
in the browser:

| Mode | Data source | Notes |
| ---- | ----------- | ----- |
| Road | [OSRM](https://router.project-osrm.org) public demo API | Real road-network routing, free, no key. Rate-limited — see below. |
| Rail | Great-circle distance × 1.2 detour factor ÷ 55 km/h + 30 min overhead | Estimate only; no free Indian Railways routing API exists. |
| Air | Great-circle distance × 1.05 ÷ 700 km/h + 120 min overhead | Estimate only; no free flight-routing API exists. |

## Caching

Routes are cached in `localStorage`, keyed by `mode + ordered stop IDs`,
with a 7-day TTL. This avoids re-hitting OSRM for a route the user has
already calculated in this browser.

## Optimization strategy

For 3+ stops, "Optimize Order" runs:

1. **Nearest-neighbor** construction — builds an initial tour by always
   jumping to the closest unvisited stop.
2. **2-opt local search** — repeatedly removes crossing segments until no
   improvement is found.

The first stop is treated as a fixed starting point. This runs client-side
in milliseconds for itinerary-sized inputs (≤ ~12 stops) — no server needed.

## Multi-day planning (`multi-day-planner.js`)

For road trips with several stops, the "Multi-Day Plan" panel splits the
optimized route into days automatically:

1. Legs are accumulated into a day until adding the next one would exceed
   a **daily driving limit** (Relaxed 4h / Standard 6h / Fast 8h — pick a
   pace, or pass a custom `maxDrivingMinutesPerDay`).
2. When a day's limit is reached, the stop the trip is at becomes that
   day's **overnight stay**, and the next day starts from there.
3. Assuming a 09:00 daily departure and ~2.5h sightseeing per stop, arrivals
   that fall outside typical visiting hours (09:00–18:00) surface as a
   warning — a lightweight stand-in for real attraction opening-hours data,
   which this project doesn't have a source for yet (see limitations below).
4. **Alternative route suggestions**: `getAlternativePlans()` runs the same
   split at all three paces so users can compare day counts before
   committing to one.
5. **Recalculation**: nothing is cached across itinerary edits — adding,
   removing, or reordering stops (or changing pace) simply re-runs
   `planMultiDayRoute()` on the current stop list, so it's always in sync.
6. **Export for offline use**: `exportItineraryText()` / `exportItineraryJSON()`
   produce a plain-text or JSON itinerary; the UI downloads the text version
   as a `.txt` file via a `Blob` URL — no server involved, consistent with
   the rest of this static site.

Like `route-planner.js`, this module is pure/dependency-free and unit-tested
in Node (`docs/multi-day-planner.test.js`) independent of the DOM.

## Known limitations / future work

- OSRM's public demo server is rate-limited and not meant for heavy
  production traffic. If usage grows, self-host OSRM or switch to a
  commercial provider (Mapbox Directions, OpenRouteService, Google Routes).
- Rail/air numbers are rough estimates, not real timetables.
- Optimization is heuristic (2-opt), not a guaranteed-optimal TSP solve —
  fine at itinerary scale, not meant for dozens of stops.
- Multi-day splitting has no real traffic, road-closure, or per-attraction
  opening-hours data — it uses a generic 09:00–18:00 sightseeing window and
  flat daily-limit heuristic. Good enough for a first-pass itinerary, not a
  substitute for checking actual hours before a trip.
- Overnight-stay suggestions are always the stop where the daily limit was
  hit; the planner doesn't yet suggest a *town along the route* that isn't
  already one of the chosen stops.