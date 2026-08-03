/**
 * js-modules/crowd-density-data.js
 * Curated dataset for the Real-Time Crowd Density Prediction & Smart Visit
 * Scheduling feature (js-modules/crowd-density-engine.js).
 *
 * Consistent with trip-data.js and event-data.js: this is a rule-based,
 * client-side-only dataset (no live crowd-sensing backend exists), so
 * numbers here are editorial estimates meant to produce *directionally
 * useful* predictions (low/moderate/high + best hours), not measured
 * footfall counts.
 *
 * `id` cross-references trip-data.js's `tripDestinations` ids where the
 * attraction maps onto an existing planner destination, so this feature
 * can be layered onto Trip Planner / Route Planner itineraries later.
 *
 * Holiday dates are approximate/editorial for the 2026 calendar year,
 * matching the precision already used elsewhere in this project for
 * lunar/regional festivals (see event-data.js's header note). The engine
 * only needs day-level granularity, not astronomical precision.
 */
(function (root) {
  "use strict";

  /**
   * siteType drives the default hourly crowd shape (see
   * crowd-density-engine.js#HOURLY_PATTERNS):
   *  - "monument": classic single midday peak (Taj Mahal, forts, palaces)
   *  - "spiritual": dawn + dusk peaks (aarti/darshan timings)
   *  - "hillstation": gentle late-morning-to-evening plateau
   *  - "beach": afternoon-into-sunset peak
   *  - "wildlife": early-morning + late-afternoon safari peaks
   */
  const crowdDestinations = [
    { id: "agra", name: "Taj Mahal, Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, popularity: 10, siteType: "monument", peakMonths: [10, 11, 12, 1, 2, 3], region: "North" },
    { id: "delhi", name: "Red Fort, Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090, popularity: 10, siteType: "monument", peakMonths: [10, 11, 12, 1, 2, 3], region: "North" },
    { id: "jaipur", name: "Amber Fort, Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, popularity: 9, siteType: "monument", peakMonths: [10, 11, 12, 1, 2, 3], region: "North" },
    { id: "jodhpur", name: "Mehrangarh Fort, Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243, popularity: 7, siteType: "monument", peakMonths: [10, 11, 12, 1, 2, 3], region: "North" },
    { id: "jaisalmer", name: "Jaisalmer Fort", state: "Rajasthan", lat: 26.9157, lng: 70.9083, popularity: 8, siteType: "monument", peakMonths: [11, 12, 1, 2], region: "North" },
    { id: "udaipur", name: "City Palace, Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, popularity: 9, siteType: "monument", peakMonths: [10, 11, 12, 1, 2, 3], region: "North" },
    { id: "varanasi", name: "Kashi Vishwanath & Ghats, Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, popularity: 9, siteType: "spiritual", peakMonths: [10, 11, 12, 1, 2, 3], region: "North" },
    { id: "amritsar", name: "Golden Temple, Amritsar", state: "Punjab", lat: 31.6200, lng: 74.8765, popularity: 9, siteType: "spiritual", peakMonths: [10, 11, 12, 1, 2, 3], region: "North" },
    { id: "shimla", name: "Mall Road, Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, popularity: 7, siteType: "hillstation", peakMonths: [4, 5, 6, 12], region: "North" },
    { id: "manali", name: "Old Manali & Solang Valley", state: "Himachal Pradesh", lat: 32.2432, lng: 77.1892, popularity: 8, siteType: "hillstation", peakMonths: [4, 5, 6, 12], region: "North" },
    { id: "darjeeling", name: "Tiger Hill, Darjeeling", state: "West Bengal", lat: 27.0410, lng: 88.2663, popularity: 7, siteType: "hillstation", peakMonths: [3, 4, 5, 10], region: "East" },
    { id: "goa", name: "Baga & Calangute Beaches, Goa", state: "Goa", lat: 15.5527, lng: 73.7517, popularity: 9, siteType: "beach", peakMonths: [11, 12, 1], region: "West" },
    { id: "mumbai", name: "Gateway of India, Mumbai", state: "Maharashtra", lat: 18.9220, lng: 72.8347, popularity: 8, siteType: "monument", peakMonths: [11, 12, 1, 2], region: "West" },
    { id: "kochi", name: "Fort Kochi", state: "Kerala", lat: 9.9658, lng: 76.2422, popularity: 7, siteType: "beach", peakMonths: [11, 12, 1, 2], region: "South" },
    { id: "munnar", name: "Tea Gardens, Munnar", state: "Kerala", lat: 10.0889, lng: 77.0595, popularity: 7, siteType: "hillstation", peakMonths: [9, 10, 11, 12], region: "South" },
    { id: "ooty", name: "Botanical Gardens, Ooty", state: "Tamil Nadu", lat: 11.4102, lng: 76.6950, popularity: 7, siteType: "hillstation", peakMonths: [4, 5, 6, 12], region: "South" },
    { id: "madurai", name: "Meenakshi Temple, Madurai", state: "Tamil Nadu", lat: 9.9195, lng: 78.1193, popularity: 8, siteType: "spiritual", peakMonths: [10, 11, 12, 1], region: "South" },
    { id: "hampi", name: "Hampi Ruins", state: "Karnataka", lat: 15.3350, lng: 76.4600, popularity: 6, siteType: "monument", peakMonths: [10, 11, 12, 1, 2], region: "South" },
    { id: "ranthambore", name: "Ranthambore National Park", state: "Rajasthan", lat: 26.0173, lng: 76.5026, popularity: 7, siteType: "wildlife", peakMonths: [11, 12, 1, 2, 3], region: "North" },
    { id: "jim-corbett", name: "Jim Corbett National Park", state: "Uttarakhand", lat: 29.5300, lng: 78.7747, popularity: 6, siteType: "wildlife", peakMonths: [11, 12, 1, 2, 3], region: "North" }
  ];

  /**
   * National holidays apply an impact multiplier everywhere; regional
   * holidays only apply within their `states` list. `impact` is a 0-1
   * multiplier fed into the engine's holiday scoring term.
   */
  const holidays2026 = [
    { name: "Republic Day", date: "2026-01-26", scope: "national", impact: 0.8 },
    { name: "Maha Shivratri", date: "2026-02-15", scope: "national", impact: 0.6 },
    { name: "Holi", date: "2026-03-04", scope: "national", impact: 1.0 },
    { name: "Ram Navami", date: "2026-03-26", scope: "national", impact: 0.6 },
    { name: "Good Friday", date: "2026-04-03", scope: "national", impact: 0.4 },
    { name: "Eid al-Fitr", date: "2026-03-20", scope: "national", impact: 0.8 },
    { name: "Buddha Purnima", date: "2026-05-01", scope: "national", impact: 0.5 },
    { name: "Eid al-Adha", date: "2026-05-27", scope: "national", impact: 0.7 },
    { name: "Independence Day", date: "2026-08-15", scope: "national", impact: 0.9 },
    { name: "Raksha Bandhan", date: "2026-08-28", scope: "national", impact: 0.5 },
    { name: "Janmashtami", date: "2026-09-04", scope: "national", impact: 0.6 },
    { name: "Ganesh Chaturthi", date: "2026-09-14", scope: "regional", states: ["Maharashtra"], impact: 1.0 },
    { name: "Gandhi Jayanti", date: "2026-10-02", scope: "national", impact: 0.7 },
    { name: "Dussehra", date: "2026-10-20", scope: "national", impact: 0.9 },
    { name: "Diwali", date: "2026-11-08", scope: "national", impact: 1.0 },
    { name: "Bhai Dooj", date: "2026-11-10", scope: "national", impact: 0.6 },
    { name: "Guru Nanak Jayanti", date: "2026-11-24", scope: "regional", states: ["Punjab"], impact: 1.0 },
    { name: "Christmas", date: "2026-12-25", scope: "national", impact: 0.7 },
    { name: "New Year's Day", date: "2026-01-01", scope: "national", impact: 0.8 },
    { name: "New Year's Eve / Year-end break", date: "2026-12-31", scope: "national", impact: 0.9 }
  ];

  /**
   * Geographically/thematically nearby alternates for each destination,
   * used to power "suggest a less-crowded nearby attraction" without
   * needing a live places API. distanceKm is an approximate straight-line
   * editorial figure.
   */
  const nearbyAlternatives = {
    agra: [{ id: "jaipur", distanceKm: 240 }, { id: "delhi", distanceKm: 230 }],
    delhi: [{ id: "agra", distanceKm: 230 }, { id: "jaipur", distanceKm: 280 }],
    jaipur: [{ id: "jodhpur", distanceKm: 340 }, { id: "udaipur", distanceKm: 395 }, { id: "agra", distanceKm: 240 }],
    jodhpur: [{ id: "jaisalmer", distanceKm: 285 }, { id: "udaipur", distanceKm: 250 }, { id: "jaipur", distanceKm: 340 }],
    jaisalmer: [{ id: "jodhpur", distanceKm: 285 }],
    udaipur: [{ id: "jodhpur", distanceKm: 250 }, { id: "jaipur", distanceKm: 395 }],
    varanasi: [{ id: "jim-corbett", distanceKm: 650 }],
    amritsar: [{ id: "shimla", distanceKm: 340 }],
    shimla: [{ id: "manali", distanceKm: 245 }],
    manali: [{ id: "shimla", distanceKm: 245 }],
    darjeeling: [{ id: "munnar", distanceKm: 2600 }],
    goa: [{ id: "mumbai", distanceKm: 460 }, { id: "kochi", distanceKm: 585 }],
    mumbai: [{ id: "goa", distanceKm: 460 }],
    kochi: [{ id: "munnar", distanceKm: 130 }, { id: "goa", distanceKm: 585 }],
    munnar: [{ id: "kochi", distanceKm: 130 }, { id: "ooty", distanceKm: 260 }],
    ooty: [{ id: "munnar", distanceKm: 260 }, { id: "madurai", distanceKm: 210 }],
    madurai: [{ id: "hampi", distanceKm: 500 }, { id: "ooty", distanceKm: 210 }],
    hampi: [{ id: "madurai", distanceKm: 500 }],
    ranthambore: [{ id: "jim-corbett", distanceKm: 480 }, { id: "jaipur", distanceKm: 180 }],
    "jim-corbett": [{ id: "ranthambore", distanceKm: 480 }]
  };

  const api = { crowdDestinations, holidays2026, nearbyAlternatives };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (typeof root !== "undefined") {
    root.crowdDestinations = crowdDestinations;
    root.crowdHolidays2026 = holidays2026;
    root.crowdNearbyAlternatives = nearbyAlternatives;
    root.CrowdDensityData = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
