# Intelligent Budget Planner (with Dynamic Trip Cost Forecasting)

Resolves #1028 — Implement Intelligent Budget Planner with Dynamic Trip Cost
Forecasting. Builds on the original Smart Budget Planner (#284) rather than
duplicating it: same rule-based, client-side, no-backend approach ("AI-powered"/
"Intelligent" here means algorithmic/heuristic personalization, consistent with
the rest of the site's rule-based Trip Planner), extended with itinerary-linked
forecasting, cross-destination comparison, budget alerts, and PDF export.

Users enter a destination, trip duration, number of travelers, accommodation
preference, transportation mode, and their own food/sightseeing/shopping/misc
allowances, and get back a full category-wise cost estimate, a comparison
across travel styles, a daily spending guide, and cost-optimization
suggestions — **updating live as any field changes**, not just on submit.
Beyond the single-destination form, the page also offers a side-by-side
**destination comparison** and a **forecast generated directly from a saved
Trip Planner itinerary** (multi-city, using that itinerary's own real
inter-city travel costs). An optional target budget triggers a
healthy/warning/exceeded **alert** that re-evaluates on every recompute.
Plans can be saved, edited, and exported as a text report or as a PDF (via
the browser's print dialog), all via `localStorage` — no account required.

## A pre-existing bug fixed along the way

`budget-planner.html` was **never actually registered** in
`js-modules/router-init.js`'s `ROUTE_INIT_MAP`, despite the original #284 PR's
own documentation describing that registration. That meant
`smart-budget-planner.js` never loaded on the live site and the entire
feature — form submission, saved plans, everything — was dead on arrival.
This PR adds the missing route entry (see below), which is a prerequisite
for any of the new work here to run at all.

Separately, and **not fixed by this PR** (out of scope, and that file is
under heavy concurrent edit from many other in-flight wetland-explorer PRs):
`frontend/wetlands/wetlands-data.js` on `main` currently has a missing `},`
between two entries that breaks the whole file's parsing. Worth a tiny,
dedicated follow-up PR.

## Files added / changed

| File | Purpose |
| ---- | ------- |
| `js-modules/smart-budget-planner.js` | Extended with `calculateItineraryBudget()`, `compareDestinations()`, `getBudgetAlert()`, an itinerary-aware `exportReportText()`, live/debounced recompute on the main form, and the new sections' DOM wiring (`initDestinationCompare()`, `initItineraryForecast()`). |
| `frontend/budget-planner/budget-planner.html` | Added a target-budget field, a "Compare Destinations" section, and a "Forecast From My Itinerary" section. |
| `frontend/budget-planner/budget-planner.css` | Styles for the alert banner, comparison cards, itinerary results, and extended print rules so PDF export only shows whichever result card is populated. |
| `tests/unit/smart-budget-planner.test.js` | 15 new unit tests (30 total) covering the three new functions. |
| `js-modules/router-init.js` (modified) | **Added the missing `budget-planner.html` route entry** (see above), now loading `trip-data.js`, `trip-planner.js` (for itinerary forecasting), and `smart-budget-planner.js`. |

## New capabilities, mapped to issue #1028

| Issue ask | Implementation |
| --- | --- |
| "Budget estimates should automatically update whenever users modify their itinerary" / "Budget updates automatically when trip details change" | Once a first estimate exists, every form field (main form, comparison form, itinerary form) triggers a recompute — debounced ~400ms on free-text/number fields, instant on selects — without needing another explicit submit. |
| "Budget comparison across destinations" | `compareDestinations(baseInput, names)` re-runs the same days/travelers/tier/transport across up to 4 destinations; the UI shows them side-by-side with the cheapest highlighted. |
| "Budget alerts when estimated costs exceed limits" / "Budget alerts when itinerary changes increase costs" | `getBudgetAlert(plan, targetBudget)` returns `healthy`/`warning` (≥85% of target)/`exceeded`, in the same vocabulary as `js-modules/budget-calculator-engine.js`'s `getBudgetHealth()` elsewhere in this codebase. Re-evaluated on every recompute, so it reacts live to itinerary/assumption changes. |
| "Export budget report as PDF" | A print stylesheet hides everything but the populated results card(s); the "🖨️ Export as PDF" button calls `window.print()`, letting the browser's own "Save as PDF" destination produce the file — no PDF library dependency, matching the pattern already used by `trip-expense-splitter`, `trip-planner.js`, and `compare-states-data`. |
| "Users can customize budget assumptions" | Already true of the original form (tier/transport/food/sightseeing/shopping/misc); extended with a target-budget assumption for alerts. |
| Dynamic **trip cost forecasting** tied to a real itinerary (the issue's title) | `calculateItineraryBudget(itinerary, options)` — see below. |

## The itinerary forecast, in detail

`calculateItineraryBudget()` takes a Trip Planner saved-trip's `itinerary`
object directly (`{ destinations: [...], legs: [...], inputs: { travelers } }`,
the exact shape `js-modules/trip-planner.js` already produces and saves) and:

1. For each destination, computes accommodation (using the same
   destination-cost-indexed rate logic as the single-destination planner) and
   food cost based on how many days that itinerary actually assigned to that
   stop (`dest.assignedDays`).
2. For transport, **reuses Trip Planner's own distance-based inter-city leg
   costs** (`itinerary.legs[].cost`, scaled by traveler count) instead of a
   flat per-mode guess — more accurate than the single-destination form's
   transport estimate, since it reflects the itinerary's actual routing.
3. Adds one trip-level sightseeing/shopping/misc allowance (rather than
   per-destination, since the issue describes these as trip-wide
   configurable allowances) and one 8% contingency buffer on the combined
   subtotal.
4. Returns the same `categories`/`categoryPercentages`/`total`/
   `perPersonTotal`/`perDayTotal` shape as `calculateBudget()`, plus a
   `perDestination` array, so the UI can reuse the same category-breakdown
   rendering helper for both.

## Known limitations / good follow-ups

- No live cross-tab sync: if a person edits a trip in Trip Planner in
  another tab, the itinerary-forecast dropdown only picks it up on next
  page load, since this is `localStorage`-only with no backend.
- Costs remain editorial planning estimates, not live pricing — same
  caveat as the original Smart Budget Planner and the Trip Planner it's
  built on.
- The nav link is still only on the pages that already link to it
  (`trip-planner.html`, `india-3d-map.html`) — see #284's docs for why a
  shared header include is the real fix, not attempted here.
- `frontend/wetlands/wetlands-data.js`'s pre-existing syntax bug (see above)
  is unrelated but worth a quick separate PR.

## Testing

```bash
npx vitest run tests/unit/smart-budget-planner.test.js
```

30 unit tests: the original 15 (category totals, destination lookup,
input clamping, room-sharing math, tier comparison, recommendation rules,
daily-plan division, exported report content, save/edit/delete
persistence) plus 15 new ones covering `compareDestinations()` (sorting,
matched-vs-unmatched destinations, blank-entry handling, held-constant
parameters), `calculateItineraryBudget()` (category totals, transport
derived from real leg costs, per-destination day counts, tier scaling,
trip-wide allowances, invalid-itinerary error handling), and
`getBudgetAlert()` (no-target case, exceeded/healthy/warning thresholds,
and status changing correctly as the underlying plan changes).

Full suite (`npx vitest run`): 1331/1342 tests pass. The 11 failures are
all in wetland-explorer test files unrelated to this change (see the
pre-existing `wetlands-data.js` bug noted above) — none touch the budget
planner.


## How it fits into the existing architecture

This site is a fetch-based SPA: `router.js` intercepts internal link
clicks, fetches the target `.html` file, swaps the `<main id="app-root">`
content, and dispatches `app:route-changed`. `js-modules/router-init.js`
listens for that event and, based on `pathname`, looks up the route in
`ROUTE_INIT_MAP`, lazy-loads the right script(s), and calls the page's
`init...Page()` function.

The Smart Budget Planner follows that pattern — though, as noted above,
this route entry was **entirely missing** until this PR:

```js
// js-modules/router-init.js
'budget-planner.html': {
    scripts: ['trip-data.js', 'js-modules/trip-planner.js', 'js-modules/smart-budget-planner.js'],
    initName: 'initBudgetPlannerPage',
    useSafeInit: true,
    name: 'Budget Planner'
},
```

`trip-data.js` and `trip-planner.js` are loaded first — the latter so the
itinerary-forecast section can call `window.TripPlanner.getSavedTrips()` —
and both are awaited before `smart-budget-planner.js` runs. `useSafeInit:
true` wraps initialization in a try/catch so a failure here can't break
navigation to other pages.

## Budgeting algorithm

All of the logic below lives in `js-modules/smart-budget-planner.js` and is
exposed as `window.SmartBudgetPlanner` (and via `new Function(...)`
evaluation for the unit tests, matching the existing `trip-planner.test.js`
convention).

1. **Accommodation.** `accommodationRate(tier, destination)` starts from a
   flat per-person-per-night rate for the chosen tier (`budget` / `standard`
   / `luxury`). If the destination is recognized in `trip-data.js`, the rate
   is scaled by the destination's cost index relative to a national-average
   mid-tier rate (`Math.sqrt(destination.costPerDay.mid / 3500)` — the
   square root dampens the swing so very cheap or very expensive
   destinations don't distort the estimate too aggressively). Cost is then
   `rate × nights × rooms`, where `rooms = ceil(travelers / 2)` assumes
   double occupancy.
2. **Transport.** Each transport mode (`flight`, `train`, `bus`,
   `car_rental`, `own_vehicle`) has a flat trip-level "base" fare plus a
   small per-day local-transport component; total is
   `travelers × (base + perDay × days)`. These are editorial planning
   estimates, not live fares — no destination-to-destination routing is
   attempted here (that's the existing Trip Planner's job); this feature
   estimates a *single* destination trip's cost.
3. **Food.** `dailyFoodBudget × days × travelers`. If the user leaves the
   field blank, a sane per-tier default is used (₹400 budget / ₹800
   standard / ₹1,500 luxury per person per day).
4. **Sightseeing / Shopping / Misc.** Taken directly as user-entered totals
   for the whole trip (clamped to ≥ 0).
5. **Contingency.** 8% of the subtotal is added as a buffer for
   unplanned/surge costs.
6. **Category breakdown & percentages.** The final `categories` object
   (accommodation, transport, food, sightseeing, shopping, misc,
   contingency) and each category's share of the total are returned
   together, ready for the UI's progress-bar rendering.

### Cost comparison (travel styles)

`compareTiers(input)` re-runs `calculateBudget()` once per accommodation
tier (holding every other input constant) and returns the three totals side
by side, so the UI can show a Budget vs Standard vs Luxury comparison at a
glance.

### Recommendations (cost optimization)

`getRecommendations(plan)` is a small rule engine over the computed
breakdown:

- Accommodation > 45% of total *and* not already on the cheapest tier →
  suggests downgrading, with the actual ₹ saving computed by re-running
  `calculateBudget()` at the `budget` tier.
- Flight + trip ≤ 3 days → suggests train as a cheaper, comparably fast
  alternative for short hops.
- Food > 25% of total → suggests mixing in local eateries.
- Shopping > 20% of total → suggests setting a firm spending cap.
- 3+ travelers → suggests shared/homestay-style lodging to reduce
  per-person accommodation cost.
- Always includes one general suggestion about booking accommodation/
  transport 3-4 weeks ahead to avoid surge pricing.

Each suggestion includes a `potentialSaving` figure (₹) where one can be
computed, so the user can weigh which trade-offs are worth making.

### Daily spending plan

`getDailySpendingPlan(plan)` divides every category evenly across the trip
length, giving a simple per-day pacing guide (not a day-by-day itinerary —
that level of detail is the existing Trip Planner's responsibility).

### Saving, editing, and exporting

- **Save** (`savePlan`) / **edit** (`updateSavedPlan`, which recalculates
  the whole plan from new inputs while keeping the same `id`) / **delete**
  (`deleteSavedPlan`) / **list** (`getSavedPlans`) persist plan objects to
  `localStorage['smartBudgetPlannerSavedPlans']`.
- **Export** (`exportReportText`) builds a plain-text report (destination,
  trip details, full category breakdown with percentages, total/per-person/
  per-day figures, and the recommendation list) which the page downloads as
  a `.txt` file via a `Blob` + temporary `<a download>` element. The page
  also has dedicated `@media print` styles in `budget-planner.css` so the
  results card alone (no nav/footer/buttons) prints cleanly.

## Known limitations / good follow-ups

- Costs are editorial planning estimates, not live pricing — same caveat as
  the existing Trip Planner.
- Sightseeing/shopping/misc are entered as trip-total figures rather than
  per-day, since the issue describes them as configurable allowances rather
  than daily rates; this is called out in the form's field labels.
- The nav link was only added to the two pages that already link to Trip
  Planner (`trip-planner.html`, `india-3d-map.html`). Every page's header is
  a separate static copy in this codebase, so surfacing the link sitewide
  means adding the same `<a>` to every page, or — better — extracting the
  header into a shared include/template in a follow-up PR (same limitation
  noted in `docs/TRIP_PLANNER.md`).
- A natural next step is letting the Trip Planner and Budget Planner share
  data: e.g. jumping from a generated itinerary straight into a prefilled
  Budget Planner comparison for that itinerary's destinations.

## Testing

```bash
npx vitest run tests/unit/smart-budget-planner.test.js
```

15 unit tests cover: category totals and percentage sums, destination
lookup and its cost-index fallback, input clamping, multi-traveler
room-sharing math, tier comparison ordering, each recommendation rule,
daily-plan division, exported report content, and the full
save/edit/delete persistence cycle (using an in-memory `localStorage`
polyfill, since vitest's default `node` environment has none).

The full suite (`npm test`) passes at 282/282 with this feature added, with
no changes to any pre-existing test file.
