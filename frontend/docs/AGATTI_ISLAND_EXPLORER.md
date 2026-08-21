# Agatti Island Explorer

Resolves #683 — feat: Create Agatti Island Explorer.

## What it is

A dedicated deep-dive page at `frontend/agatti-island-explorer/index.html`
covering everything the issue asked for: Airport, Coral Reefs, Beaches,
Water Sports, Tourism, and Marine Life — plus a link from the existing
Island Explorer landing page (`frontend/island-explorer/index.html`).

## Design notes

The page's signature element is a "runway-to-reef" cross-section diagram:
an SVG strip showing open sea → reef → lagoon → airstrip → village →
lagoon → reef → open sea. This isn't decorative — it's Agatti's actual
shape. The island is narrow enough that the airport runway has lagoon
water close on both sides, which is the single most distinctive fact
about the place. Each segment of the diagram links to the matching
section, so it doubles as in-page navigation.

Two other content-specific motifs:
- **Airport section**: a departures-board-styled fact panel (dark
  background, monospace-leaning type) for route/runway details — a
  visual metaphor grounded in the subject rather than a generic stat grid.
- **Plan Your Trip section**: a boarding-pass-styled card for permit and
  seasonal information, again tying the visual form to air travel, which
  is how nearly everyone actually reaches Agatti.

Colors, type (Playfair Display + Outfit), navbar, and footer follow this
project's existing shared `styles.css` and the lighter navbar pattern
already used by `island-explorer/index.html`, rather than introducing a
new design system — this is an addition to an existing multi-page
product, not a freestanding brief.

## Content accuracy

Agatti is a real place, so factual claims (airport code AGX, only
airstrip in Lakshadweep, approximate distance from Kochi, runway length,
permit requirement, dive site names, marine species) were checked against
multiple independent sources before writing. Two things worth flagging
for reviewers:
- Published runway-length figures vary slightly across sources
  (~1.2–1.3 km); the page uses that range rather than picking one
  disputed exact number.
- The airline currently operating the Kochi–Agatti route has changed
  over the years across sources; the page describes the route and
  aircraft type (turboprop-only) rather than naming a specific current
  carrier, since that's the kind of detail most likely to go stale.

## Page Integration

Per the issue's acceptance criteria, an "Agatti Island" card link was
added to the Islands Landing Page. The existing `island-explorer/index.html`
already had an Agatti entry as a quiz card (from a prior "Island Explorer
Challenge" feature); rather than duplicating that, this adds an optional
`explorerUrl` field to island data entries and renders a "Full Explorer ↗"
link on any card that has one — additive, and reusable for the sibling
island-explorer issues (#675 Neil Island, #684 Bangaram Island) once those
pages exist.

## Files added/changed
| File | Change |
| ---- | ------ |
| `frontend/agatti-island-explorer/index.html` | **new** — the explorer page |
| `frontend/agatti-island-explorer/script.js` | **new** — smooth-scroll + active-segment highlight for the cross-section nav |
| `frontend/island-explorer/script.js` | adds `explorerUrl` to Agatti's entry; renders a "Full Explorer" link when present |
| `frontend/island-explorer/style.css` | styles for `.island-card-full-link` |

## Known limitations / follow-ups
- Only Agatti has a dedicated deep-dive page so far; #675 (Neil Island)
  and #684 (Bangaram Island) are separate issues that would each add
  their own page and `explorerUrl`, using this same pattern.
- No bespoke Agatti photography is available in this repo's `assets/`
  folder; the hero reuses the existing generic beach image rather than
  a real photo of the island.
