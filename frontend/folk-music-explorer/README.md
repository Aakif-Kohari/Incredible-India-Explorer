# Interactive Indian Folk Music and Instruments Explorer

Frontend implementation for the Incredible India Explorer folk-music feature.

## Files

- `index.html` — semantic page structure, controls, cards, modal and footer.
- `folk-music.css` — responsive explorer styles.
- `folk-music-data.js` — local data source for folk traditions.
- `folk-music.js` — search, filtering, favourites, random discovery and modal logic.
- `folk-music.test.js` — Vitest unit tests for search, filtering and bookmarks.

## Data structure

Each entry in `window.FOLK_MUSIC_DATA` uses:

```js
{
  id: "unique-slug",
  name: "Tradition name",
  state: "State / UT",
  region: "North | South | East | West | Central | Northeast",
  category: "Music category",
  instrumentTypes: ["String", "Percussion", "Wind"],
  instruments: ["Instrument 1", "Instrument 2"],
  festival: "Festival association",
  significance: "Cultural significance",
  history: "Historical background",
  performance: "Performance style",
  image: "Image URL",
  audio: "Optional audio URL"
}
```

`audio` is optional. If it is omitted, the audio player is not rendered.

## Behaviour

- Search matches name, state, region, category, festival, instruments and descriptive text.
- State, region, category and instrument-type filters can be combined.
- Favourites are persisted in `localStorage` under `iie-folk-music-favorites`.
- Random discovery respects the currently selected filters.
- Empty results show a recovery state and reset action.
- The details modal is keyboard accessible and closes with Escape.
- Layout adapts from desktop to mobile.

## Integration

Place this folder at:

```text
frontend/folk-music-explorer/
```

The page expects the repository's existing `../../styles.css`.

Run the repository's existing Vitest suite to include:

```text
frontend/folk-music-explorer/folk-music.test.js
```

The current repository Vitest configuration already includes `frontend/tests/**/*.test.{js,mjs}` and `tests/**/*.test.{js,mjs}`. If the project does not discover this feature test automatically, move/copy the test to `frontend/tests/folk-music-explorer.test.js`.
