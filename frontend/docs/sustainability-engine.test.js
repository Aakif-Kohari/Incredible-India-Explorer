const assert = require("assert");
const {
  EMISSION_FACTORS_G_PER_KM,
  ACCOMMODATION_TYPES,
  calculateCarbonFootprint,
  compareTransportModes,
  calculateSustainabilityScore,
  getSustainabilityBadge,
  getRecommendations,
} = require("./../frontend/route-planner/sustainability-engine.js");

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

const stops = [
  { id: "delhi", name: "Delhi" },
  { id: "agra", name: "Agra" },
  { id: "jaipur", name: "Jaipur" },
];
const legs = [
  { distanceKm: 230 }, // Delhi -> Agra
  { distanceKm: 240 }, // Agra -> Jaipur
];

console.log("../frontend/route-planner/sustainability-engine.js unit tests");

test("calculateCarbonFootprint: rail is cheaper in carbon than air for the same distance", () => {
  const rail = calculateCarbonFootprint(legs, "rail");
  const air = calculateCarbonFootprint(legs, "air");
  assert.ok(rail.carbonKg < air.carbonKg);
});

test("calculateCarbonFootprint: scales linearly with traveler count", () => {
  const solo = calculateCarbonFootprint(legs, "road", 1);
  const group = calculateCarbonFootprint(legs, "road", 4);
  assert.ok(Math.abs(group.carbonKg - solo.carbonKg * 4) < 1e-9);
});

test("calculateCarbonFootprint: falls back to road factor for an unknown mode", () => {
  const unknown = calculateCarbonFootprint(legs, "hoverboard");
  const road = calculateCarbonFootprint(legs, "road");
  assert.strictEqual(unknown.avgGPerKm, road.avgGPerKm);
});

test("calculateCarbonFootprint: zero legs produces zero footprint, not NaN", () => {
  const result = calculateCarbonFootprint([], "road");
  assert.strictEqual(result.totalDistanceKm, 0);
  assert.strictEqual(result.carbonKg, 0);
});

test("compareTransportModes: returns one entry per known mode, sorted cleanest-first", () => {
  const comparison = compareTransportModes(legs);
  assert.strictEqual(comparison.length, Object.keys(EMISSION_FACTORS_G_PER_KM).length);
  for (let i = 1; i < comparison.length; i++) {
    assert.ok(comparison[i - 1].carbonKg <= comparison[i].carbonKg);
  }
  assert.strictEqual(comparison[0].mode, "rail");
});

test("calculateSustainabilityScore: is always within 0-100", () => {
  const result = calculateSustainabilityScore(stops, legs, { mode: "air", accommodationType: "luxuryResort" });
  assert.ok(result.score >= 0 && result.score <= 100);
});

test("calculateSustainabilityScore: rail scores higher than air for an identical itinerary", () => {
  const rail = calculateSustainabilityScore(stops, legs, { mode: "rail" });
  const air = calculateSustainabilityScore(stops, legs, { mode: "air" });
  assert.ok(rail.score > air.score);
});

test("calculateSustainabilityScore: eco-certified accommodation scores higher than luxury resort, all else equal", () => {
  const eco = calculateSustainabilityScore(stops, legs, { mode: "road", accommodationType: "ecoCertified" });
  const luxury = calculateSustainabilityScore(stops, legs, { mode: "road", accommodationType: "luxuryResort" });
  assert.ok(eco.score > luxury.score);
});

test("calculateSustainabilityScore: unknown accommodation type falls back to a valid default", () => {
  const result = calculateSustainabilityScore(stops, legs, { mode: "road", accommodationType: "space_hotel" });
  assert.ok(ACCOMMODATION_TYPES[result.accommodationType]);
});

test("calculateSustainabilityScore: recalculates independently on itinerary change", () => {
  const before = calculateSustainabilityScore(stops, legs, { mode: "road" });
  const fewerStops = stops.slice(0, 2);
  const fewerLegs = legs.slice(0, 1);
  const after = calculateSustainabilityScore(fewerStops, fewerLegs, { mode: "road" });
  assert.notStrictEqual(before.footprint.carbonKg, after.footprint.carbonKg);
});

test("getSustainabilityBadge: maps score ranges to the right tier", () => {
  assert.strictEqual(getSustainabilityBadge(90).tier, "excellent");
  assert.strictEqual(getSustainabilityBadge(65).tier, "good");
  assert.strictEqual(getSustainabilityBadge(45).tier, "fair");
  assert.strictEqual(getSustainabilityBadge(10).tier, "poor");
});

test("getRecommendations: suggests rail for a short-to-medium air itinerary", () => {
  const tips = getRecommendations(stops, legs, { mode: "air" });
  assert.ok(tips.some((t) => t.toLowerCase().includes("rail")));
});

test("getRecommendations: always includes at least the generic eco tips", () => {
  const tips = getRecommendations(stops, legs, { mode: "rail", accommodationType: "ecoCertified" });
  assert.ok(tips.length >= 3);
});

console.log(`\n${passed} test(s) passed.`);
