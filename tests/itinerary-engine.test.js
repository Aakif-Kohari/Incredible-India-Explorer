/**
 * tests/itinerary-engine.test.js
 * ------------------------------------------------------------------
 * Plain Node.js tests (no test framework / build step required —
 * matching this repo's "no build tools" architecture).
 *
 * Run with:  node tests/itinerary-engine.test.js
 * ------------------------------------------------------------------
 */
const assert = require("assert");
const ItineraryEngine = require("../itinerary-engine.js");
const ItineraryData = require("../itinerary-data.js");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  \u2713 ${name}`);
  } catch (err) {
    failed++;
    console.error(`  \u2717 ${name}`);
    console.error(`    ${err.message}`);
  }
}

console.log("Itinerary Engine Tests");
console.log("=======================");

test("generateItinerary returns the requested number of days", () => {
  const itinerary = ItineraryEngine.generateItinerary({
    destinationId: "jaipur",
    days: 3,
    interests: ["heritage"],
    budget: "mid",
    pace: "moderate"
  });
  assert.strictEqual(itinerary.days.length, 3);
});

test("generateItinerary clamps days to [1, 14]", () => {
  const tooMany = ItineraryEngine.generateItinerary({ destinationId: "goa", days: 30, budget: "mid" });
  assert.strictEqual(tooMany.days.length, 14);
  const tooFew = ItineraryEngine.generateItinerary({ destinationId: "goa", days: 0, budget: "mid" });
  assert.strictEqual(tooFew.days.length, 1);
});

test("generateItinerary throws on unknown destination", () => {
  assert.throws(() => {
    ItineraryEngine.generateItinerary({ destinationId: "atlantis", days: 2 });
  }, /Unknown destination/);
});

test("generated stops respect the requested budget tier", () => {
  const itinerary = ItineraryEngine.generateItinerary({
    destinationId: "agra",
    days: 2,
    budget: "budget", // maxTier 1
    pace: "packed"
  });
  const allStopIds = itinerary.days.flatMap((d) => d.stops.map((s) => s.attractionId));
  const destination = ItineraryData.DESTINATIONS.find((d) => d.id === "agra");
  allStopIds.forEach((id) => {
    const attraction = destination.attractions.find((a) => a.id === id);
    assert.ok(attraction.costTier <= 1, `${id} exceeds budget tier`);
  });
});

test("generated stops prioritise requested interests when available", () => {
  const itinerary = ItineraryEngine.generateItinerary({
    destinationId: "kerala",
    days: 1,
    interests: ["wildlife"],
    budget: "luxury",
    pace: "relaxed"
  });
  const stopNames = itinerary.days[0].stops.map((s) => s.name);
  assert.ok(stopNames.includes("Eravikulam National Park"), "expected the wildlife attraction to be included");
});

test("does not schedule the same attraction twice across days when enough options exist", () => {
  const itinerary = ItineraryEngine.generateItinerary({
    destinationId: "jaipur",
    days: 3,
    budget: "mid",
    pace: "relaxed"
  });
  const allIds = itinerary.days.flatMap((d) => d.stops.map((s) => s.attractionId));
  const uniqueIds = new Set(allIds);
  assert.strictEqual(allIds.length, uniqueIds.size, "attractions should not repeat when enough distinct options exist");
});

test("stops within a day are chronologically ordered", () => {
  const itinerary = ItineraryEngine.generateItinerary({
    destinationId: "delhi",
    days: 1,
    budget: "mid",
    pace: "packed"
  });
  const stops = itinerary.days[0].stops;
  for (let i = 1; i < stops.length; i++) {
    const parseTime = (t) => {
      const [time, period] = t.split(" ");
      let [h, m] = time.split(":").map(Number);
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      return h * 60 + m;
    };
    assert.ok(parseTime(stops[i].startTime) >= parseTime(stops[i - 1].startTime), "stops must be chronologically ordered");
  }
});

test("regenerateDay only changes the targeted day", () => {
  const itinerary = ItineraryEngine.generateItinerary({
    destinationId: "goa",
    days: 3,
    budget: "mid",
    pace: "moderate"
  });
  const before = JSON.stringify(itinerary.days[0]) + JSON.stringify(itinerary.days[2]);
  const updated = ItineraryEngine.regenerateDay(itinerary, 1);
  const after = JSON.stringify(updated.days[0]) + JSON.stringify(updated.days[2]);
  assert.strictEqual(before, after, "days other than the target day must remain unchanged");
});

test("regenerateDay avoids attractions already used on other days when possible", () => {
  const itinerary = ItineraryEngine.generateItinerary({
    destinationId: "jaipur",
    days: 2,
    budget: "luxury",
    pace: "relaxed"
  });
  const updated = ItineraryEngine.regenerateDay(itinerary, 0);
  const dayZeroIds = updated.days[0].stops.map((s) => s.attractionId);
  const dayOneIds = updated.days[1].stops.map((s) => s.attractionId);
  const overlap = dayZeroIds.filter((id) => dayOneIds.includes(id));
  assert.strictEqual(overlap.length, 0, "regenerated day should not duplicate attractions used on other days");
});

test("regenerateDay throws on an invalid day index", () => {
  const itinerary = ItineraryEngine.generateItinerary({ destinationId: "hampi", days: 1 });
  assert.throws(() => ItineraryEngine.regenerateDay(itinerary, 5), /Invalid itinerary or day index/);
});

test("save, load, list and delete round-trip works (mocked localStorage)", () => {
  global.localStorage = (function () {
    let store = {};
    return {
      getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; }
    };
  })();

  const itinerary = ItineraryEngine.generateItinerary({ destinationId: "varanasi", days: 2, budget: "mid" });
  const id = ItineraryEngine.saveItinerary(itinerary);
  assert.ok(id, "saveItinerary should return an id");

  const loaded = ItineraryEngine.loadItinerary(id);
  assert.ok(loaded, "loadItinerary should return the saved itinerary");
  assert.strictEqual(loaded.destinationName, "Varanasi");

  const list = ItineraryEngine.listSavedItineraries();
  assert.ok(list.some((it) => it.id === id), "listSavedItineraries should include the saved itinerary");

  ItineraryEngine.deleteItinerary(id);
  assert.strictEqual(ItineraryEngine.loadItinerary(id), null, "itinerary should be gone after delete");

  delete global.localStorage;
});

test("exportItineraryText includes destination and every stop name", () => {
  const itinerary = ItineraryEngine.generateItinerary({ destinationId: "ladakh", days: 1, pace: "moderate" });
  const text = ItineraryEngine.exportItineraryText(itinerary);
  assert.ok(text.includes("Leh-Ladakh"));
  itinerary.days[0].stops.forEach((s) => {
    assert.ok(text.includes(s.name), `export text should include ${s.name}`);
  });
});

test("haversineKm returns 0 for identical points and is symmetric", () => {
  const a = { lat: 26.9124, lng: 75.7873 };
  const b = { lat: 26.9855, lng: 75.8513 };
  assert.strictEqual(ItineraryEngine._internal.haversineKm(a, a), 0);
  const d1 = ItineraryEngine._internal.haversineKm(a, b);
  const d2 = ItineraryEngine._internal.haversineKm(b, a);
  assert.ok(Math.abs(d1 - d2) < 1e-9);
});

console.log("=======================");
console.log(`${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);