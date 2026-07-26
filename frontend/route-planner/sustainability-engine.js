/**
 * sustainability-engine.js
 * Sustainable Travel Scoring & Eco-Friendly Route Recommendations for
 * Incredible India Explorer.
 *
 * Like multi-day-planner.js, this sits on top of RoutePlanner's output
 * (ordered stops + per-leg distance) rather than duplicating routing logic.
 * It's a pure, dependency-free module — unit-testable in Node without a
 * DOM — that turns a route + accommodation choice into:
 *   - a 0-100 sustainability score
 *   - an estimated carbon footprint (kg CO2e)
 *   - a same-stops, same-order comparison across transport modes
 *   - practical, itinerary-specific recommendations
 *
 * ---------------------------------------------------------------------
 * Methodology & sources (see docs/SUSTAINABILITY_SCORING.md for detail)
 * ---------------------------------------------------------------------
 * Per-passenger-km emission factors are rounded, editorial averages drawn
 * from widely published transport-emissions research (UK DEFRA/BEIS
 * national statistics, the International Council on Clean Transportation,
 * and Our World in Data's transport carbon footprint comparisons). They
 * are NOT live measurements, NOT India-specific telemetry, and do not
 * account for vehicle occupancy, engine type, or grid mix on a given
 * route. Treat the resulting score and footprint as a *relative*,
 * planning-stage signal for comparing travel choices — the same honest
 * framing this project already uses for rail/air distance estimates in
 * route-planner.js ("estimates only; no free timetable API exists").
 */

// ---------------------------------------------------------------------------
// 1. Emission factors (grams CO2e per passenger-km)
// ---------------------------------------------------------------------------
const EMISSION_FACTORS_G_PER_KM = {
  road: 120, // average petrol/diesel car, moderate occupancy
  bus: 80, // shared public bus
  rail: 45, // mixed electric/diesel intercity rail
  air: 245, // short/medium-haul domestic flight
};

// A rough "worst case" reference (short-haul flight) used to normalize the
// transport component of the sustainability score onto a 0-100 scale.
const REFERENCE_WORST_G_PER_KM = EMISSION_FACTORS_G_PER_KM.air;
const REFERENCE_BEST_G_PER_KM = EMISSION_FACTORS_G_PER_KM.rail;

// ---------------------------------------------------------------------------
// 2. Accommodation impact tiers
// ---------------------------------------------------------------------------
const ACCOMMODATION_TYPES = {
  ecoCertified: { label: "Eco-certified stay", score: 20 },
  homestay: { label: "Homestay / guesthouse", score: 16 },
  midRangeHotel: { label: "Mid-range hotel", score: 10 },
  luxuryResort: { label: "Luxury resort", score: 4 },
};
const DEFAULT_ACCOMMODATION_TYPE = "midRangeHotel";

// ---------------------------------------------------------------------------
// 3. Destination sustainability metadata
// ---------------------------------------------------------------------------
// Editorial, illustrative scores (0-10) — same curation approach this
// project already uses for DESTINATION_INFO (best time to visit, tips) in
// route-planner.js: human-curated, not sourced from a live sustainability
// index. publicTransport reflects how easy it typically is to get around
// locally without a private vehicle; practices reflects general awareness
// of conservation/heritage-preservation efforts at the destination.
const DESTINATION_SUSTAINABILITY = {
  delhi: { publicTransport: 9, practices: 6, tip: "The Delhi Metro covers most major sights — skip the cab." },
  agra: { publicTransport: 6, practices: 7, tip: "Only battery-operated vehicles are allowed near the Taj Mahal itself." },
  jaipur: { publicTransport: 6, practices: 6, tip: "Jaipur Metro and city buses connect most of the old city." },
  jodhpur: { publicTransport: 4, practices: 6, tip: "The old city forts are best explored on foot — most sights are walkable." },
  udaipur: { publicTransport: 4, practices: 7, tip: "Lake Pichola's boat operators increasingly run electric boats." },
  jaisalmer: { publicTransport: 3, practices: 5, tip: "Choose desert camps that use solar power and limit vehicle safaris." },
  pushkar: { publicTransport: 4, practices: 6, tip: "The town centre is compact and walkable around the lake." },
  amritsar: { publicTransport: 5, practices: 7, tip: "The Golden Temple langar runs largely on volunteer, low-waste practices." },
  shimla: { publicTransport: 6, practices: 6, tip: "The Mall Road area is pedestrian-only — leave the car at the hotel." },
  manali: { publicTransport: 5, practices: 5, tip: "Local buses connect Manali to Solang Valley and nearby villages." },
  kaza: { publicTransport: 2, practices: 6, tip: "Spiti's homestays are a genuinely low-impact way to visit remote villages." },
  leh: { publicTransport: 3, practices: 6, tip: "Carry a reusable bottle — Ladakh has an active plastic-reduction drive." },
  rishikesh: { publicTransport: 6, practices: 7, tip: "Many ashrams and cafés here actively discourage single-use plastic." },
  varanasi: { publicTransport: 5, practices: 5, tip: "Explore the ghats on foot or by shared cycle-rickshaw." },
  khajuraho: { publicTransport: 3, practices: 6, tip: "The temple complexes are close together and easily walkable." },
  mumbai: { publicTransport: 9, practices: 6, tip: "Local trains and the metro cover the city far better than cabs." },
  goa: { publicTransport: 5, practices: 5, tip: "Rent a bicycle for short beach-to-beach hops instead of a scooter." },
  hampi: { publicTransport: 4, practices: 7, tip: "Hampi's ruins are protected — stick to marked paths and rent a bicycle." },
  mysore: { publicTransport: 7, practices: 7, tip: "City buses connect the palace, market, and Chamundi Hills." },
  kochi: { publicTransport: 7, practices: 7, tip: "Fort Kochi is very walkable, and ferries beat road transport across the harbour." },
  munnar: { publicTransport: 4, practices: 8, tip: "Many tea-estate stays support local plantation-worker communities directly." },
  alleppey: { publicTransport: 4, practices: 6, tip: "Look for houseboats that advertise solar power or reduced-plastic policies." },
  trivandrum: { publicTransport: 6, practices: 6, tip: "City buses cover most sights well if you're not in a hurry." },
  kanyakumari: { publicTransport: 4, practices: 6, tip: "The town centre near the memorials is compact and walkable." },
  madurai: { publicTransport: 6, practices: 6, tip: "Local buses and shared autos connect the temple area efficiently." },
  chennai: { publicTransport: 8, practices: 6, tip: "The Chennai Metro and suburban rail cover most visitor routes." },
  kolkata: { publicTransport: 8, practices: 6, tip: "The Kolkata Metro is one of India's oldest and most extensive." },
  darjeeling: { publicTransport: 5, practices: 7, tip: "The toy train is a heritage line — a lower-impact way to see the hills." },
  gangtok: { publicTransport: 5, practices: 8, tip: "Sikkim was India's first fully organic state — look for eco-lodges." },
  shillong: { publicTransport: 4, practices: 7, tip: "Community-run homestays near the living root bridges directly fund conservation." },
};
const DEFAULT_DESTINATION_SUSTAINABILITY = { publicTransport: 5, practices: 5, tip: null };

// ---------------------------------------------------------------------------
// 4. Carbon footprint
// ---------------------------------------------------------------------------
/**
 * @param {Array} legs - [{ distanceKm }] for each consecutive stop pair
 * @param {string} mode - "road" | "rail" | "air" | "bus"
 * @param {number} [travelers=1]
 * @returns {{ totalDistanceKm: number, carbonKg: number, avgGPerKm: number }}
 */
function calculateCarbonFootprint(legs, mode, travelers = 1) {
  const factor = EMISSION_FACTORS_G_PER_KM[mode] ?? EMISSION_FACTORS_G_PER_KM.road;
  const totalDistanceKm = (legs || []).reduce((sum, leg) => sum + leg.distanceKm, 0);
  const carbonKg = (totalDistanceKm * factor * Math.max(1, travelers)) / 1000;
  return { totalDistanceKm, carbonKg, avgGPerKm: factor };
}

/** Same stops, same order — how would the footprint change per transport mode? */
function compareTransportModes(legs, travelers = 1) {
  return Object.keys(EMISSION_FACTORS_G_PER_KM)
    .map((mode) => ({ mode, ...calculateCarbonFootprint(legs, mode, travelers) }))
    .sort((a, b) => a.carbonKg - b.carbonKg);
}

// ---------------------------------------------------------------------------
// 5. Sustainability score (0-100)
// ---------------------------------------------------------------------------
/**
 * @param {Array} stops - ordered stops with `.id`
 * @param {Array} legs - [{ distanceKm }] per consecutive pair
 * @param {Object} [options]
 * @param {string} [options.mode="road"]
 * @param {string} [options.accommodationType="midRangeHotel"]
 * @param {number} [options.travelers=1]
 */
function calculateSustainabilityScore(stops, legs, options = {}) {
  const mode = options.mode || "road";
  const accommodationType = ACCOMMODATION_TYPES[options.accommodationType]
    ? options.accommodationType
    : DEFAULT_ACCOMMODATION_TYPE;
  const travelers = options.travelers || 1;

  const footprint = calculateCarbonFootprint(legs, mode, travelers);

  // Transport component (40 pts): scaled between the best (rail) and worst
  // (air) reference emission factors. Anything at/better than rail scores
  // full marks; anything at/worse than air scores zero.
  const gPerKm = footprint.avgGPerKm;
  const transportRatio = Math.min(
    1,
    Math.max(0, (REFERENCE_WORST_G_PER_KM - gPerKm) / (REFERENCE_WORST_G_PER_KM - REFERENCE_BEST_G_PER_KM))
  );
  const transportScore = transportRatio * 40;

  // Compactness component (15 pts): average leg distance. Short hops
  // between nearby stops score higher than long cross-country jumps.
  const avgLegKm = legs && legs.length ? footprint.totalDistanceKm / legs.length : 0;
  const compactnessRatio = Math.min(1, Math.max(0, (700 - avgLegKm) / 700));
  const compactnessScore = compactnessRatio * 15;

  // Accommodation component (20 pts)
  const accommodationScore = ACCOMMODATION_TYPES[accommodationType].score;

  // Destination-quality components (15 + 10 pts): average across visited stops
  const destInfo = (stops || []).map(
    (s) => DESTINATION_SUSTAINABILITY[s.id] || DEFAULT_DESTINATION_SUSTAINABILITY
  );
  const avgPublicTransport = destInfo.length
    ? destInfo.reduce((s, d) => s + d.publicTransport, 0) / destInfo.length
    : DEFAULT_DESTINATION_SUSTAINABILITY.publicTransport;
  const avgPractices = destInfo.length
    ? destInfo.reduce((s, d) => s + d.practices, 0) / destInfo.length
    : DEFAULT_DESTINATION_SUSTAINABILITY.practices;
  const publicTransportScore = (avgPublicTransport / 10) * 15;
  const practicesScore = (avgPractices / 10) * 10;

  const total = transportScore + compactnessScore + accommodationScore + publicTransportScore + practicesScore;
  const score = Math.round(Math.min(100, Math.max(0, total)));

  return {
    score,
    breakdown: {
      transport: Math.round(transportScore * 10) / 10,
      compactness: Math.round(compactnessScore * 10) / 10,
      accommodation: accommodationScore,
      publicTransport: Math.round(publicTransportScore * 10) / 10,
      practices: Math.round(practicesScore * 10) / 10,
    },
    footprint,
    accommodationType,
    mode,
  };
}

// ---------------------------------------------------------------------------
// 6. Badges
// ---------------------------------------------------------------------------
function getSustainabilityBadge(score) {
  if (score >= 80) return { label: "Eco Champion", icon: "🌱", tier: "excellent" };
  if (score >= 60) return { label: "Green Traveler", icon: "🌿", tier: "good" };
  if (score >= 40) return { label: "Getting Greener", icon: "🌍", tier: "fair" };
  return { label: "High Impact", icon: "⚠️", tier: "poor" };
}

// ---------------------------------------------------------------------------
// 7. Recommendations
// ---------------------------------------------------------------------------
const GENERIC_ECO_TIPS = [
  "Pack a reusable water bottle and bag — many Indian cities now restrict single-use plastic.",
  "Group nearby destinations together to cut backtracking and total distance travelled.",
  "If a flight is unavoidable, consider a verified carbon-offset program for that leg.",
];

/**
 * Produces itinerary-specific tips based on the weakest components of the
 * score, plus a couple of evergreen suggestions.
 */
function getRecommendations(stops, legs, options = {}) {
  const result = calculateSustainabilityScore(stops, legs, options);
  const tips = [];

  if (result.mode === "air" && result.footprint.totalDistanceKm > 0 && result.footprint.totalDistanceKm < 800) {
    const railFootprint = calculateCarbonFootprint(legs, "rail", options.travelers || 1);
    const savingsKg = result.footprint.carbonKg - railFootprint.carbonKg;
    if (savingsKg > 0) {
      tips.push(
        `This route is ${result.footprint.totalDistanceKm.toFixed(0)} km — well within rail range. Switching from air to rail would cut roughly ${savingsKg.toFixed(0)} kg CO2e for this trip.`
      );
    }
  } else if (result.mode === "road") {
    const busFootprint = calculateCarbonFootprint(legs, "bus", options.travelers || 1);
    const savingsKg = result.footprint.carbonKg - busFootprint.carbonKg;
    if (savingsKg > 0) {
      tips.push(
        `Where a public bus route exists, it would cut roughly ${savingsKg.toFixed(0)} kg CO2e compared to a private car for this distance.`
      );
    }
  }

  if (result.accommodationType === "luxuryResort" || result.accommodationType === "midRangeHotel") {
    tips.push("Looking for an eco-certified stay or homestay along your route would meaningfully raise your score — they also tend to put more money directly into the local community.");
  }

  if (result.breakdown.publicTransport < 7.5) {
    tips.push("Some of your stops have limited local public transport — book those legs of the trip a little further in advance so you're not relying on last-minute private cabs.");
  }

  return [...tips, ...GENERIC_ECO_TIPS];
}

// ---------------------------------------------------------------------------
// Export for both browser (global) and Node (tests)
// ---------------------------------------------------------------------------
const SustainabilityEngine = {
  EMISSION_FACTORS_G_PER_KM,
  ACCOMMODATION_TYPES,
  DESTINATION_SUSTAINABILITY,
  calculateCarbonFootprint,
  compareTransportModes,
  calculateSustainabilityScore,
  getSustainabilityBadge,
  getRecommendations,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = SustainabilityEngine;
} else {
  window.SustainabilityEngine = SustainabilityEngine;
}
