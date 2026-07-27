# Sustainability Scoring

Resolves #691 — Sustainable Travel Scoring and Eco-Friendly Route
Recommendations.

## What it does

Sits alongside the Multi-Day Plan panel on the Route Planner page. For the
currently planned stops, transport mode, and a user-selected accommodation
type, it shows:

- A **0-100 sustainability score** and badge (🌱 Eco Champion / 🌿 Green
  Traveler / 🌍 Getting Greener / ⚠️ High Impact).
- An **estimated carbon footprint** in kg CO2e for the trip.
- A **transport-mode comparison** — the same stops, same order, showing
  what the footprint would be under road / rail / air / bus.
- **Itinerary-specific eco tips**, e.g. suggesting rail over a short-haul
  flight, or flagging that a chosen destination has limited local public
  transport.

Like the Multi-Day Plan panel, everything recalculates from scratch on every
change (stop added/removed/reordered, mode changed, accommodation changed)
— there's no stale cached score.

## Why no backend

Consistent with the rest of this project (see `ROUTE_PLANNER.md`'s "Why no
backend" section): this is a static, buildless site. The scoring engine
(`frontend/route-planner/sustainability-engine.js`) is a pure, client-side
module with no network calls — it only needs the stop list and per-leg
distances the Route Planner has already computed.

## Scoring methodology

The 0-100 score is a weighted sum of five components:

| Component | Weight | What it measures |
| --------- | ------ | ----------------- |
| Transport emissions | 40 pts | Chosen mode's g CO2e/passenger-km, scaled between rail (best reference, full marks) and a short-haul flight (worst reference, zero marks) |
| Trip compactness | 15 pts | Average distance per leg — shorter hops between nearby stops score higher than long cross-country jumps |
| Accommodation type | 20 pts | Eco-certified (20) > Homestay (16) > Mid-range hotel (10) > Luxury resort (4) |
| Local public transport | 15 pts | Average of each visited destination's public-transport-availability rating |
| Destination practices | 10 pts | Average of each visited destination's general sustainable-tourism-practices rating |

### Carbon footprint

`carbonKg = totalDistanceKm × emissionFactor(mode) × travelers / 1000`

Per-passenger-km emission factors (grams CO2e/km), rounded editorial
averages:

| Mode | g CO2e/passenger-km | Source basis |
| ---- | -------------------- | ------------- |
| Rail | 45 | Mixed electric/diesel intercity rail, in line with published UK/EU rail figures |
| Bus | 80 | Shared public bus |
| Road | 120 | Average petrol/diesel car, moderate occupancy |
| Air | 245 | Short/medium-haul domestic flight |

These come from widely published transport-emissions research (UK
government/DEFRA statistics, the International Council on Clean
Transportation, and Our World in Data's transport carbon-footprint
comparisons) — **not** live measurements, **not** India-specific telemetry,
and they don't account for a specific vehicle's occupancy, engine type, or
the electricity grid mix on a given route. Treat the score and footprint as
a *relative*, planning-stage signal for comparing travel choices, the same
honest framing this project already applies to its rail/air distance
estimates ("estimates only; no free timetable API exists" — see
`ROUTE_PLANNER.md`).

### Destination sustainability data

`DESTINATION_SUSTAINABILITY` in `sustainability-engine.js` holds two
editorial 0–10 ratings per destination (public transport availability,
general sustainable-tourism practices) plus a short tip. Curated by hand,
the same way `DESTINATION_INFO` (best time to visit, local tips) already
works elsewhere in `route-planner.js` — not sourced from a live
sustainability index.

## Files added

| File | Purpose |
| ---- | ------- |
| `frontend/route-planner/sustainability-engine.js` | Pure scoring/footprint/recommendation logic, no DOM dependency |
| `docs/sustainability-engine.test.js` | Node-runnable unit tests |
| `frontend/route-planner/route-planner-ui.js` (modified) | Wires the panel into the existing add/remove/optimize/mode/pace flow |
| `frontend/route-planner/route-planner.html` (modified) | Sustainability panel markup + styles, accommodation selector |

## Known limitations / future work

- Emission factors are flat per-mode averages, not per-vehicle or
  per-flight-class figures. A full car vs. an EV, or economy vs. business
  class, would have meaningfully different footprints this model doesn't
  distinguish.
- `DESTINATION_SUSTAINABILITY` only covers the same ~30 destinations
  `ROUTE_DESTINATIONS` does. Extending the Route Planner's destination list
  means extending this dataset too.
- No accommodation *search* — the user picks a category (eco-certified,
  homestay, etc.), not a specific verified-green property. Wiring in real
  eco-certification data (e.g. Green Key, EarthCheck) would need a backend
  or a licensed data source this project doesn't have.
- Carbon-offset purchase is only mentioned as a generic tip, not an
  integrated flow — there's no backend to process a real transaction here.

## Testing

```bash
node docs/sustainability-engine.test.js
```

13 unit tests cover footprint math (mode differences, traveler scaling,
unknown-mode fallback, zero-leg edge case), the transport-mode comparison
ordering, score bounds and mode/accommodation sensitivity, badge tier
mapping, and recommendation content.

> Note: as with `route-planner.test.js`, running `docs/*.test.js` directly
> currently hits `require is not defined` on Node versions where
> `package.json`'s `"type": "module"` changes `require`-of-ESM behavior
> (a pre-existing repo issue, not introduced here). Logic was verified by
> direct execution during development; see #693's notes for the same caveat.
