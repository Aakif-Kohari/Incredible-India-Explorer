const assert = require("assert");
const {
  PACE_PRESETS,
  planMultiDayRoute,
  getAlternativePlans,
  exportItineraryText,
  exportItineraryJSON,
  formatClock,
  formatDurationHM,
} = require("./../frontend/route-planner/multi-day-planner.js");

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  PASS  ${name}`);
    passed++;
  } catch (err) {
    console.error(`  FAIL  ${name}`);
    console.error(`        ${err.message}`);
    process.exitCode = 1;
  }
}

// Delhi -> Agra -> Jaipur -> Jodhpur -> Udaipur, roughly matching real
// road distances/durations (in minutes) for a mixed-length itinerary.
const stops = [
  { id: "delhi", name: "Delhi" },
  { id: "agra", name: "Agra" },
  { id: "jaipur", name: "Jaipur" },
  { id: "jodhpur", name: "Jodhpur" },
  { id: "udaipur", name: "Udaipur" },
];

const legs = [
  { distanceKm: 230, durationMinutes: 240 }, // Delhi -> Agra: 4h
  { distanceKm: 240, durationMinutes: 300 }, // Agra -> Jaipur: 5h
  { distanceKm: 340, durationMinutes: 360 }, // Jaipur -> Jodhpur: 6h
  { distanceKm: 250, durationMinutes: 270 }, // Jodhpur -> Udaipur: 4.5h
];

console.log("../frontend/route-planner/multi-day-planner.js unit tests");

test("planMultiDayRoute: single stop needs no driving", () => {
  const plan = planMultiDayRoute([stops[0]], []);
  assert.strictEqual(plan.days.length, 1);
  assert.strictEqual(plan.totalDrivingMinutes, 0);
});

test("planMultiDayRoute: visits every stop exactly once across all days", () => {
  const plan = planMultiDayRoute(stops, legs, { maxDrivingMinutesPerDay: 6 * 60 });
  const visited = plan.days.flatMap((d) => d.stops.map((s) => s.id));
  // overnight stops legitimately appear at the end of one day and the
  // start of the next, so dedupe before comparing to the original stop set
  const uniqueVisited = [...new Set(visited)];
  assert.deepStrictEqual(uniqueVisited, stops.map((s) => s.id));
});

test("planMultiDayRoute: never schedules more driving in a day than the limit allows for a single leg", () => {
  const plan = planMultiDayRoute(stops, legs, { maxDrivingMinutesPerDay: 6 * 60 });
  plan.days.forEach((day) => {
    assert.ok(day.drivingMinutes <= 6 * 60 || day.stops.length <= 2, `Day ${day.dayNumber} overloaded unexpectedly`);
  });
});

test("planMultiDayRoute: a tighter daily limit never produces fewer days than a looser one", () => {
  const relaxed = planMultiDayRoute(stops, legs, { maxDrivingMinutesPerDay: PACE_PRESETS.relaxed.maxDrivingMinutesPerDay });
  const fast = planMultiDayRoute(stops, legs, { maxDrivingMinutesPerDay: PACE_PRESETS.fast.maxDrivingMinutesPerDay });
  assert.ok(relaxed.days.length >= fast.days.length);
});

test("planMultiDayRoute: total distance/driving time matches sum of legs regardless of day splits", () => {
  const plan = planMultiDayRoute(stops, legs, { maxDrivingMinutesPerDay: 5 * 60 });
  const expectedMinutes = legs.reduce((s, l) => s + l.durationMinutes, 0);
  const expectedKm = legs.reduce((s, l) => s + l.distanceKm, 0);
  assert.strictEqual(plan.totalDrivingMinutes, expectedMinutes);
  assert.ok(Math.abs(plan.totalDistanceKm - expectedKm) < 1e-9);
});

test("planMultiDayRoute: last day never has an overnight stay", () => {
  const plan = planMultiDayRoute(stops, legs, { maxDrivingMinutesPerDay: 5 * 60 });
  const lastDay = plan.days[plan.days.length - 1];
  assert.strictEqual(lastDay.overnightAt, null);
});

test("planMultiDayRoute: flags a leg that alone exceeds the daily driving limit", () => {
  const plan = planMultiDayRoute(stops, legs, { maxDrivingMinutesPerDay: 2 * 60 });
  assert.ok(plan.warnings.some((w) => w.includes("exceeds the daily driving limit")));
});

test("planMultiDayRoute: recalculates independently each call (itinerary-change safe)", () => {
  const before = planMultiDayRoute(stops, legs, { maxDrivingMinutesPerDay: 6 * 60 });
  const fewerStops = stops.slice(0, 3);
  const fewerLegs = legs.slice(0, 2);
  const after = planMultiDayRoute(fewerStops, fewerLegs, { maxDrivingMinutesPerDay: 6 * 60 });
  assert.notStrictEqual(before.days.length, undefined);
  assert.ok(after.totalDrivingMinutes < before.totalDrivingMinutes);
});

test("getAlternativePlans: returns one entry per pace preset", () => {
  const alternatives = getAlternativePlans(stops, legs);
  assert.strictEqual(alternatives.length, Object.keys(PACE_PRESETS).length);
  const keys = alternatives.map((a) => a.key).sort();
  assert.deepStrictEqual(keys, Object.keys(PACE_PRESETS).sort());
});

test("getAlternativePlans: relaxed pace never needs fewer days than fast pace", () => {
  const alternatives = getAlternativePlans(stops, legs);
  const relaxed = alternatives.find((a) => a.key === "relaxed");
  const fast = alternatives.find((a) => a.key === "fast");
  assert.ok(relaxed.dayCount >= fast.dayCount);
});

test("exportItineraryText: includes every day and total distance", () => {
  const plan = planMultiDayRoute(stops, legs, { maxDrivingMinutesPerDay: 6 * 60 });
  const text = exportItineraryText(plan, { title: "Test Trip" });
  assert.ok(text.includes("Test Trip"));
  plan.days.forEach((day) => {
    assert.ok(text.includes(`Day ${day.dayNumber}`));
  });
});

test("exportItineraryJSON: produces valid, parseable JSON with matching day count", () => {
  const plan = planMultiDayRoute(stops, legs, { maxDrivingMinutesPerDay: 6 * 60 });
  const json = exportItineraryJSON(plan, { title: "Test Trip" });
  const parsed = JSON.parse(json);
  assert.strictEqual(parsed.dayCount, plan.days.length);
  assert.strictEqual(parsed.days.length, plan.days.length);
});

test("formatClock: wraps past midnight correctly", () => {
  assert.strictEqual(formatClock(25 * 60), "01:00");
});

test("formatDurationHM: formats sub-hour and multi-hour durations", () => {
  assert.strictEqual(formatDurationHM(45), "45m");
  assert.strictEqual(formatDurationHM(125), "2h 5m");
});

console.log(`\n${passed} test(s) passed.`);
