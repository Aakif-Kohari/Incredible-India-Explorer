/**
 * himalayan-life-scrollytelling script.js
 * Scrollytelling: Life Along the Himalayas (#580).
 * Parallax mountain layers, altitude gauge updates, and authentic cultural narrative.
 */

const HIMALAYAN_ALTITUDE_ZONES = [
  {
    id: "foothills",
    name: "Foothills & Terai-Shiwaliks",
    altitudeRange: "300m - 1,500m",
    minAltitudeMeters: 300,
    maxAltitudeMeters: 1500,
    geography: "Duar valleys, swampy grasslands, Sal (Shorea robusta) forests, and outer Siwalik sandstone ridges.",
    communities: ["Tharu", "Van Gujjar", "Raji"],
    dailyLife: "Subtropical agriculture growing paddy, sugarcane, and mustard. Seasonal transhumant pastoralism where Van Gujjars move cattle up towards summer alpine pastures.",
    culturalNotes: "Vibrant oral folk traditions, timber craftsmanship, and sacred grove (Devbhumi) preservation customs.",
    keyHighlight: "The lush eco-tone connecting the Indo-Gangetic plains with the rising mountain walls.",
    layerTransformSpeed: 0.15,
    themeColor: "#4ade80"
  },
  {
    id: "mid-altitude",
    name: "Mid-Altitude Towns & Lesser Himalayas",
    altitudeRange: "1,500m - 3,000m",
    minAltitudeMeters: 1500,
    maxAltitudeMeters: 3000,
    geography: "Dense forests of Deodar cedar, Blue Pine, and Himalayan Oak, carved by deep river gorges.",
    communities: ["Pahari", "Garhwali", "Kumaoni", "Himachali"],
    dailyLife: "Meticulous step-terrace farming (Rajma, Millets, Apples, Plums). Traditional Kath-Kuni (wood-and-stone timber-bonded) earthquake-resistant architecture.",
    culturalNotes: "Village deity (Palki Devta) governance, Jagara music nights, and seasonal Harvest festivals like Phool Dei and Harela.",
    keyHighlight: "Heartland of Himalayan mountain farming communities and ancient trade villages.",
    layerTransformSpeed: 0.3,
    themeColor: "#38bdf8"
  },
  {
    id: "high-altitude",
    name: "High-Altitude Villages & Greater Himalayas",
    altitudeRange: "3,000m - 5,000m",
    minAltitudeMeters: 3000,
    maxAltitudeMeters: 5000,
    geography: "High alpine meadows (Bugyals), dwarf rhododendron scrub, granite cliffs, and permanent snowline borders.",
    communities: ["Bhotia", "Kinnauri", "Monpa", "Sherpa"],
    dailyLife: "Barley and buckwheat cultivation in brief summer months; Yak breeding, wool spinning, and trans-Himalayan wool trade history.",
    culturalNotes: "Intricate silver jewelry, hand-woven carpet looms (Thulma & Chutka blankets), and sacred mountain pass worship (La-tse chortens).",
    keyHighlight: "Surviving in thin air: ancient adaptation to harsh alpine winters and high-altitude transhumance.",
    layerTransformSpeed: 0.5,
    themeColor: "#a855f7"
  },
  {
    id: "glacial-zone",
    name: "Glacial & Trans-Himalayan Cold Deserts",
    altitudeRange: "Above 5,000m",
    minAltitudeMeters: 5000,
    maxAltitudeMeters: 7500,
    geography: "Cold high-altitude desert plateaus (Ladakh, Spiti, Zanskar), glacial ice-falls (Siachen, Gangotri), and saline lakes.",
    communities: ["Changpa Nomads", "Ladakhi", "Spitian"],
    dailyLife: "Nomadic tent-dwelling (Rebo tents made of yak hair) on the Changthang plateau; herding high-altitude Changthangi Pashmina goats.",
    culturalNotes: "Mahayana & Vajrayana Buddhist monastic culture, Losar New Year celebrations, mud-brick solar architecture, and prayer flag traditions.",
    keyHighlight: "The extreme limit of human habitation, where culture harmonizes with ice and silence.",
    layerTransformSpeed: 0.75,
    themeColor: "#e2e8f0"
  }
];

/**
 * Validates Himalayan altitude zones dataset.
 */
function validateHimalayanData(data) {
  if (!Array.isArray(data)) return { isValid: false, errors: ["Data is not an array"] };
  const errors = [];
  data.forEach((zone, idx) => {
    if (!zone.id) errors.push(`Zone at ${idx} missing id`);
    if (!zone.name) errors.push(`Zone ${zone.id || idx} missing name`);
    if (typeof zone.minAltitudeMeters !== 'number' || typeof zone.maxAltitudeMeters !== 'number') {
      errors.push(`Zone ${zone.id || idx} missing altitude bounds`);
    }
    if (!Array.isArray(zone.communities) || zone.communities.length === 0) {
      errors.push(`Zone ${zone.id || idx} missing communities`);
    }
  });
  return { isValid: errors.length === 0, errors };
}

/**
 * Interpolates altitude meter readout based on scroll progress percentage.
 */
function calculateAltitudeFromScroll(scrollPercent, minAlt = 300, maxAlt = 6500) {
  const bounded = Math.max(0, Math.min(100, scrollPercent));
  return Math.round(minAlt + (bounded / 100) * (maxAlt - minAlt));
}

/**
 * Determines current zone based on calculated altitude meters.
 */
function getZoneForAltitude(altitudeMeters, dataset = HIMALAYAN_ALTITUDE_ZONES) {
  if (altitudeMeters <= 1500) return dataset[0];
  if (altitudeMeters <= 3000) return dataset[1];
  if (altitudeMeters <= 5000) return dataset[2];
  return dataset[3];
}

/**
 * Calculates parallax translateY offset for background silhouette layers.
 */
function calculateParallaxTranslateY(scrollPercent, speedMultiplier) {
  const bounded = Math.max(0, Math.min(100, scrollPercent));
  return Math.round(bounded * speedMultiplier * 2.5 * 100) / 100;
}

// Browser Interactive Scrollytelling Engine
function initHimalayanScrollytelling() {
  const altitudeVal = document.getElementById('altitude-val');
  const activeZoneTitle = document.getElementById('active-zone-title');
  const activeZoneRange = document.getElementById('active-zone-range');
  const layer1 = document.getElementById('para-layer-1');
  const layer2 = document.getElementById('para-layer-2');
  const layer3 = document.getElementById('para-layer-3');

  function onScroll() {
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    if (totalScroll <= 0) return;

    const scrollPercent = (window.scrollY / totalScroll) * 100;
    const currentAltitude = calculateAltitudeFromScroll(scrollPercent);
    const activeZone = getZoneForAltitude(currentAltitude);

    if (altitudeVal) altitudeVal.textContent = currentAltitude.toLocaleString() + ' m';
    if (activeZoneTitle) activeZoneTitle.textContent = activeZone.name;
    if (activeZoneRange) activeZoneRange.textContent = activeZone.altitudeRange;

    // Parallax Transforms
    if (layer1) {
      const y1 = calculateParallaxTranslateY(scrollPercent, 0.15);
      layer1.style.transform = `translateY(${y1}px)`;
    }
    if (layer2) {
      const y2 = calculateParallaxTranslateY(scrollPercent, 0.35);
      layer2.style.transform = `translateY(${y2}px)`;
    }
    if (layer3) {
      const y3 = calculateParallaxTranslateY(scrollPercent, 0.6);
      layer3.style.transform = `translateY(${y3}px)`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initHimalayanScrollytelling);
}

export {
  HIMALAYAN_ALTITUDE_ZONES,
  validateHimalayanData,
  calculateAltitudeFromScroll,
  getZoneForAltitude,
  calculateParallaxTranslateY
};
