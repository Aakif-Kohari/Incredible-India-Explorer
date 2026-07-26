# 🌶️ Spice Route Challenge

A map-based game for the **Incredible India Explorer**, built to close the
"Add Spice Route Challenge" issue.

Players are shown a clue about a famous Indian spice and must click the
state on an accurate map of India where it originates. After each guess the
game reveals the historic sea/land route the spice traveled to reach the
wider world, plus a short, factual history note. A separate **Learning
Cards** tab lets you browse all spices at any time, flip-card style.

## Features (per the issue)

- **Spice matching** — click-to-guess gameplay against clue cards, with
  scoring and a streak counter.
- **Historical trade routes** — an animated route line from the spice's
  origin state to the historic port that carried it to world markets
  (e.g. Muziris for pepper, Surat for saffron/mustard).
- **Interactive map** — a real, clickable SVG map of India built from actual
  district boundary data (see "Map accuracy" below), not a rough
  hand-drawn shape.
- **Learning cards** — flip cards with the history and a fun fact for every
  spice, browsable independently of the game.

## Map accuracy

`map-data.js` is **generated from real geographic data**, not hand-traced:

1. Source: district-level GeoJSON from the public
   [`udit-001/india-maps-data`](https://github.com/udit-001/india-maps-data)
   dataset (Survey of India / Census 2011 district boundaries).
2. Districts are dissolved into their parent state with
   [Shapely](https://shapely.readthedocs.io/), then lightly simplified.
3. Coordinates are projected with an equirectangular projection scaled by
   `cos(mean latitude)` so state shapes keep the correct aspect ratio.
4. All 36 states/UTs are included, and the resulting bounding box
   (68.10°E–97.39°E, 6.77°N–37.08°N) matches India's real extent.

To regenerate the map data yourself:

```bash
pip install shapely --break-system-packages
curl -O https://raw.githubusercontent.com/udit-001/india-maps-data/main/geojson/india.geojson
python3 scripts/build-map-data.py india.geojson map-data.js
```

Historic port markers (Muziris, Kozhikode/Calicut, Surat, Masulipatnam,
Old Goa) are plotted using the real coordinates of those cities, run
through the exact same projection, so they line up correctly with the
state shapes.

## Files

```
frontend/spice-route/
├── index.html          # Game UI + Learning Cards tab
├── style.css           # Styling
├── script.js           # Game logic, map rendering, route animation
├── map-data.js          # Generated accurate India map (see above)
├── spice-data.js        # Spice facts, origins, ports, history notes
├── scripts/
│   └── build-map-data.py  # Reproducible map-data.js generator
└── README.md
```

No build step or external dependencies — pure HTML/CSS/JS, consistent with
the rest of the project.

## Content notes

A couple of spices (chilli, clove) are not originally native to India;
this is called out explicitly in their clue/history text rather than
glossed over, since chilli came from the Americas via Portuguese Goa and
clove originated in Indonesia's Maluku Islands before being transplanted to
Tamil Nadu.
