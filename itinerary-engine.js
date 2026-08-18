/**
 * itinerary-engine.js
 * ------------------------------------------------------------------
 * Rule-based AI itinerary generation engine for Incredible India
 * Explorer. Pure vanilla JS, no build step — same pattern as
 * story-engine.js / chatbot-data.js elsewhere in this repo.
 *
 * Implements the acceptance criteria of issue #2695:
 *   - generate a day-by-day itinerary from destination/duration/
 *     interests/budget
 *   - order attractions logically by location & opening hours
 *   - regenerate a single day without rebuilding the whole trip
 *   - persist (save/load) itineraries client-side
 *
 * Public API (window.ItineraryEngine):
 *   generateItinerary(preferences) -> Itinerary
 *   regenerateDay(itinerary, dayIndex) -> Itinerary (new object)
 *   saveItinerary(itinerary) -> string id
 *   loadItinerary(id) -> Itinerary | null
 *   listSavedItineraries() -> Array<{id, title, savedAt}>
 *   deleteItinerary(id) -> void
 *   exportItineraryText(itinerary) -> string (used for PDF export
 *     via the browser's print-to-PDF, keeping the site's "no build
 *     tools" philosophy)
 * ------------------------------------------------------------------
 */
(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(require("./itinerary-data.js"));
  } else {
    root.ItineraryEngine = factory(root.ItineraryData);
  }
})(typeof window !== "undefined" ? window : globalThis, function (ItineraryData) {
  "use strict";

  const STORAGE_KEY = "iie_itineraries";
  const EARTH_RADIUS_KM = 6371;

  // ---------------------------------------------------------------
  // Geometry helpers
  // ---------------------------------------------------------------
  function toRad(deg) {
    return (deg * Math.PI) / 180;
  }

  function haversineKm(a, b) {
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
  }

  // Rough local travel-time estimate: 25 km/h average incl. traffic/stops.
  function travelMinutes(a, b) {
    const km = haversineKm(a, b);
    return Math.max(5, Math.round((km / 25) * 60));
  }

  // ---------------------------------------------------------------
  // Scoring & filtering
  // ---------------------------------------------------------------
  function budgetMaxTier(budgetId) {
    const b = (ItineraryData.BUDGETS || []).find((x) => x.id === budgetId);
    return b ? b.maxTier : 2;
  }

  function interestScore(attraction, interests) {
    if (!interests || interests.length === 0) return 1;
    const matches = attraction.interests.filter((t) => interests.includes(t)).length;
    return matches; // 0 = no overlap
  }

  function eligibleAttractions(destination, preferences) {
    const maxTier = budgetMaxTier(preferences.budget);
    return destination.attractions
      .filter((a) => a.costTier <= maxTier)
      .map((a) => ({ attraction: a, score: interestScore(a, preferences.interests) }))
      .filter((entry) => (preferences.interests && preferences.interests.length ? entry.score > 0 : true))
      .sort((x, y) => y.score - x.score)
      .map((entry) => entry.attraction);
  }

  // Attractions-per-day by pace.
  const PACE_COUNTS = { relaxed: 2, moderate: 3, packed: 4 };

  // ---------------------------------------------------------------
  // Sequencing (nearest-neighbour, respecting opening hours)
  // ---------------------------------------------------------------
  function sequenceDay(startPoint, candidates, count, dayStartHour) {
    const pool = candidates.slice();
    const chosen = [];
    let current = startPoint;
    let clock = dayStartHour;

    while (chosen.length < count && pool.length > 0) {
      // filter to attractions still open by the time we'd arrive
      let bestIdx = -1;
      let bestDist = Infinity;
      for (let i = 0; i < pool.length; i++) {
        const candidate = pool[i];
        const arrival = clock + travelMinutes(current, candidate) / 60;
        const fitsOpenHours = arrival <= candidate.closeHour;
        const dist = haversineKm(current, candidate);
        if (fitsOpenHours && dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      // if nothing fits remaining open hours, relax the constraint and
      // just take the nearest unused attraction (better than an empty day)
      if (bestIdx === -1) {
        let nearestIdx = -1;
        let nearestDist = Infinity;
        for (let i = 0; i < pool.length; i++) {
          const dist = haversineKm(current, pool[i]);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearestIdx = i;
          }
        }
        bestIdx = nearestIdx;
      }
      if (bestIdx === -1) break;

      const attraction = pool.splice(bestIdx, 1)[0];
      const travel = current === startPoint ? 0 : travelMinutes(current, attraction);
      const arrivalHour = Math.max(clock + travel / 60, attraction.openHour);
      const departHour = arrivalHour + attraction.visitMinutes / 60;

      chosen.push({
        attractionId: attraction.id,
        name: attraction.name,
        description: attraction.description,
        interests: attraction.interests,
        costTier: attraction.costTier,
        lat: attraction.lat,
        lng: attraction.lng,
        travelMinutesFromPrevious: travel,
        startTime: formatHour(arrivalHour),
        endTime: formatHour(departHour),
        visitMinutes: attraction.visitMinutes
      });

      clock = departHour;
      current = attraction;
    }

    return chosen;
  }

  function formatHour(hourFloat) {
    let h = Math.floor(hourFloat);
    let m = Math.round((hourFloat - h) * 60);
    if (m === 60) {
      m = 0;
      h += 1;
    }
    h = ((h % 24) + 24) % 24;
    const period = h >= 12 ? "PM" : "AM";
    let displayHour = h % 12;
    if (displayHour === 0) displayHour = 12;
    return `${displayHour}:${String(m).padStart(2, "0")} ${period}`;
  }

  // ---------------------------------------------------------------
  // Cost estimation
  // ---------------------------------------------------------------
  const TIER_COST_INR = { 0: 0, 1: 400, 2: 1200, 3: 3500 };

  function estimateDayCost(stops) {
    return stops.reduce((sum, s) => sum + (TIER_COST_INR[s.costTier] || 0), 0);
  }

  // ---------------------------------------------------------------
  // Public: generateItinerary
  // ---------------------------------------------------------------
  function generateItinerary(preferences) {
    const destination = (ItineraryData.DESTINATIONS || []).find((d) => d.id === preferences.destinationId);
    if (!destination) {
      throw new Error(`Unknown destination: ${preferences.destinationId}`);
    }

    const days = Math.max(1, Math.min(14, parseInt(preferences.days, 10) || 3));
    const perDay = PACE_COUNTS[preferences.pace] || PACE_COUNTS.moderate;
    const dayStartHour = 9;

    let pool = eligibleAttractions(destination, preferences);
    // Fallback: if interests filtered out everything, fall back to all
    // budget-eligible attractions so the trip is never empty.
    if (pool.length === 0) {
      pool = destination.attractions.filter((a) => a.costTier <= budgetMaxTier(preferences.budget));
    }

    const usedIds = new Set();
    const itineraryDays = [];

    for (let d = 0; d < days; d++) {
      const remaining = pool.filter((a) => !usedIds.has(a.id));
      const candidatePool = remaining.length > 0 ? remaining : pool.filter((a) => a); // allow repeats only if truly out of options
      const stops = sequenceDay(destination.center, candidatePool, perDay, dayStartHour);
      stops.forEach((s) => usedIds.add(s.attractionId));
      itineraryDays.push({
        dayNumber: d + 1,
        title: `Day ${d + 1}`,
        stops,
        estimatedCostInr: estimateDayCost(stops)
      });
    }

    return {
      id: null,
      title: `${days}-Day ${destination.name} Itinerary`,
      destinationId: destination.id,
      destinationName: destination.name,
      preferences: {
        days,
        interests: preferences.interests || [],
        budget: preferences.budget || "mid",
        pace: preferences.pace || "moderate"
      },
      days: itineraryDays,
      generatedAt: new Date().toISOString()
    };
  }

  // ---------------------------------------------------------------
  // Public: regenerateDay — rebuild only one day, keeping every
  // other day's stops locked so previously chosen attractions on
  // other days aren't reused for the new day's plan.
  // ---------------------------------------------------------------
  function regenerateDay(itinerary, dayIndex) {
    if (!itinerary || !itinerary.days[dayIndex]) {
      throw new Error("Invalid itinerary or day index");
    }
    const destination = (ItineraryData.DESTINATIONS || []).find((d) => d.id === itinerary.destinationId);
    if (!destination) throw new Error("Unknown destination on itinerary");

    const preferences = itinerary.preferences;
    const perDay = PACE_COUNTS[preferences.pace] || PACE_COUNTS.moderate;

    const usedElsewhere = new Set();
    itinerary.days.forEach((day, idx) => {
      if (idx === dayIndex) return;
      day.stops.forEach((s) => usedElsewhere.add(s.attractionId));
    });

    let pool = eligibleAttractions(destination, preferences).filter((a) => !usedElsewhere.has(a.id));
    if (pool.length === 0) {
      pool = destination.attractions.filter((a) => a.costTier <= budgetMaxTier(preferences.budget) && !usedElsewhere.has(a.id));
    }
    if (pool.length === 0) {
      // every attraction already used elsewhere — allow reuse as last resort
      pool = destination.attractions;
    }

    const stops = sequenceDay(destination.center, pool, perDay, 9);
    const newDays = itinerary.days.map((day, idx) =>
      idx === dayIndex
        ? { ...day, stops, estimatedCostInr: estimateDayCost(stops) }
        : day
    );

    return { ...itinerary, days: newDays, generatedAt: new Date().toISOString() };
  }

  // ---------------------------------------------------------------
  // Persistence (client-side, consistent with the rest of the site's
  // localStorage-based "My Journey" feature — no backend exists).
  // ---------------------------------------------------------------
  function readStore() {
    try {
      const raw = (typeof localStorage !== "undefined") ? localStorage.getItem(STORAGE_KEY) : null;
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writeStore(store) {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  function saveItinerary(itinerary) {
    const store = readStore();
    const id = itinerary.id || `itin_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const record = { ...itinerary, id, savedAt: new Date().toISOString() };
    store[id] = record;
    writeStore(store);
    return id;
  }

  function loadItinerary(id) {
    const store = readStore();
    return store[id] || null;
  }

  function listSavedItineraries() {
    const store = readStore();
    return Object.values(store)
      .map((it) => ({ id: it.id, title: it.title, savedAt: it.savedAt, destinationName: it.destinationName }))
      .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
  }

  function deleteItinerary(id) {
    const store = readStore();
    delete store[id];
    writeStore(store);
  }

  // ---------------------------------------------------------------
  // Export — plain-text/HTML representation. The itinerary.html page
  // wraps this in a print-friendly view and calls window.print(),
  // since the repo has no build tools / PDF library dependency.
  // ---------------------------------------------------------------
  function exportItineraryText(itinerary) {
    const lines = [];
    lines.push(itinerary.title);
    lines.push(`Destination: ${itinerary.destinationName}`);
    lines.push(`Pace: ${itinerary.preferences.pace} | Budget: ${itinerary.preferences.budget}`);
    lines.push("");
    itinerary.days.forEach((day) => {
      lines.push(`${day.title} (est. cost: ₹${day.estimatedCostInr})`);
      day.stops.forEach((s) => {
        lines.push(`  ${s.startTime} - ${s.endTime}  ${s.name}`);
        lines.push(`    ${s.description}`);
      });
      lines.push("");
    });
    return lines.join("\n");
  }

  return {
    generateItinerary,
    regenerateDay,
    saveItinerary,
    loadItinerary,
    listSavedItineraries,
    deleteItinerary,
    exportItineraryText,
    // exposed for unit testing
    _internal: { haversineKm, travelMinutes, formatHour, eligibleAttractions, sequenceDay }
  };
});