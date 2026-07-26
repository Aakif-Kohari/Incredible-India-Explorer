/**
 * monsoon-farming-cycle script.js
 * Animated Explainer: How the Monsoon Farming Cycle Works (#581).
 * Features an interactive circular calendar wheel rotating through 12 months,
 * representing Kharif, Rabi, and Zaid agricultural seasons, crops, and irrigation.
 */

const SEASONS_DATA = {
  kharif: {
    id: "kharif",
    name: "Kharif Season (Monsoon Crops)",
    months: "June – October",
    sowingMonths: "June - July (Onset of SW Monsoon)",
    harvestMonths: "September - October",
    waterDependence: "High (Direct Monsoon Rain dependent)",
    description: "Sown at the onset of the southwest monsoon rains, Kharif crops require high temperatures and abundant moisture during growth.",
    color: "#4ade80"
  },
  rabi: {
    id: "rabi",
    name: "Rabi Season (Winter Crops)",
    months: "October – March",
    sowingMonths: "October - November (Post-Monsoon)",
    harvestMonths: "March - April",
    waterDependence: "Moderate (Residual Soil Moisture + Irrigation / Western Disturbances)",
    description: "Sown after the monsoon rains recede, Rabi crops ripen during winter and spring under cooler temperatures.",
    color: "#38bdf8"
  },
  zaid: {
    id: "zaid",
    name: "Zaid Season (Summer Crops)",
    months: "March – June",
    sowingMonths: "March - April",
    harvestMonths: "May - June",
    waterDependence: "Irrigation Dependent (Canals / Tube-wells)",
    description: "A short summer cropping window between Rabi harvest and Kharif sowing, characterized by warm dry weather.",
    color: "#facc15"
  }
};

const CROPS_DATA = [
  {
    id: "rice-paddy",
    name: "Rice / Paddy (Oryza sativa)",
    season: "kharif",
    sowing: "June - July",
    harvest: "October - November",
    rainfallReq: "100 - 200 cm (High)",
    tempReq: "22°C - 32°C",
    majorStates: "West Bengal, Punjab, Uttar Pradesh, Andhra Pradesh, Odisha",
    icon: "fa-seedling",
    notes: "Requires standing water; heavily dependent on timely monsoon onset."
  },
  {
    id: "cotton",
    name: "Cotton (Gossypium)",
    season: "kharif",
    sowing: "May - June",
    harvest: "October - December",
    rainfallReq: "50 - 100 cm",
    tempReq: "21°C - 30°C (Requires 210 frost-free days)",
    majorStates: "Gujarat, Maharashtra, Telangana, Rajasthan",
    icon: "fa-cloud",
    notes: "Thrives in black regur soil; needs bright sunshine during boll ripening."
  },
  {
    id: "maize",
    name: "Maize (Zea mays)",
    season: "kharif",
    sowing: "June - July",
    harvest: "September - October",
    rainfallReq: "60 - 110 cm",
    tempReq: "21°C - 27°C",
    majorStates: "Karnataka, Madhya Pradesh, Bihar, Maharashtra",
    icon: "fa-wheat-awn",
    notes: "Versatile cereal crop used for food, fodder, and industrial starch."
  },
  {
    id: "jowar-bajra",
    name: "Jowar & Bajra (Millet)",
    season: "kharif",
    sowing: "June - July",
    harvest: "October - November",
    rainfallReq: "40 - 75 cm (Drought tolerant)",
    tempReq: "26°C - 33°C",
    majorStates: "Rajasthan, Maharashtra, Karnataka, Haryana",
    icon: "fa-plant-wilt",
    notes: "Nutri-cereals resilient to dry spells and lower soil fertility."
  },
  {
    id: "wheat",
    name: "Wheat (Triticum aestivum)",
    season: "rabi",
    sowing: "October - November",
    harvest: "March - April",
    rainfallReq: "50 - 75 cm (Winter showers beneficial)",
    tempReq: "10°C - 15°C (Sowing), 21°C - 26°C (Harvest)",
    majorStates: "Punjab, Haryana, Uttar Pradesh, Madhya Pradesh",
    icon: "fa-wheat-awn-circle-exclamation",
    notes: "India's staple winter cereal; benefits from winter showers (Western Disturbances)."
  },
  {
    id: "mustard",
    name: "Mustard & Rapeseed",
    season: "rabi",
    sowing: "October - November",
    harvest: "February - March",
    rainfallReq: "25 - 40 cm",
    tempReq: "15°C - 25°C",
    majorStates: "Rajasthan, Haryana, Madhya Pradesh, Uttar Pradesh",
    icon: "fa-sun",
    notes: "Key rabi oilseed sensitive to frost during flowering stage."
  },
  {
    id: "gram-chickpea",
    name: "Gram / Chickpea (Cicer arietinum)",
    season: "rabi",
    sowing: "October - November",
    harvest: "March - April",
    rainfallReq: "40 - 50 cm",
    tempReq: "15°C - 25°C",
    majorStates: "Madhya Pradesh, Maharashtra, Rajasthan, Karnataka",
    icon: "fa-circle-dot",
    notes: "Important pulse crop that fixes atmospheric nitrogen into soil."
  },
  {
    id: "watermelon-cucumber",
    name: "Watermelon & Muskmelon",
    season: "zaid",
    sowing: "March",
    harvest: "May - June",
    rainfallReq: "Low (Irrigation based)",
    tempReq: "25°C - 35°C",
    majorStates: "Uttar Pradesh, Punjab, Andhra Pradesh, Tamil Nadu",
    icon: "fa-apple-whole",
    notes: "Fast-growing summer cash crops grown in riverine sandy beds."
  }
];

const IRRIGATION_METHODS = [
  {
    name: "Canal Networks",
    coverage: "30% of irrigated land",
    desc: "Perennial river canals fed by Himalayan glaciers and dams."
  },
  {
    name: "Tube-wells & Groundwater",
    coverage: "62% of irrigated land",
    desc: "Electric and solar pumps tapping underground aquifers."
  },
  {
    name: "Drip & Micro-Irrigation",
    coverage: "Rapidly Growing",
    desc: "Precision water delivery to plant roots saving up to 50% water."
  }
];

/**
 * Validates agricultural crop and season dataset integrity.
 */
function validateFarmingCycleData(crops, seasons) {
  if (!Array.isArray(crops)) return { isValid: false, errors: ["Crops is not an array"] };
  const errors = [];
  if (crops.length < 6) errors.push("Fewer than 6 crops represented");

  crops.forEach((c, idx) => {
    if (!c.id) errors.push(`Crop ${idx} missing id`);
    if (!c.name) errors.push(`Crop ${c.id || idx} missing name`);
    if (!c.season || !seasons[c.season]) errors.push(`Crop ${c.id || idx} invalid season ${c.season}`);
  });

  return { isValid: errors.length === 0, errors };
}

/**
 * Filters crops by agricultural season key ('all', 'kharif', 'rabi', 'zaid').
 */
function filterCropsBySeason(seasonKey, dataset = CROPS_DATA) {
  if (!seasonKey || seasonKey === 'all') return dataset;
  return dataset.filter(c => c.season === seasonKey.toLowerCase());
}

/**
 * Calculates rotation angle (in degrees) for month index 0-11.
 */
function calculateCalendarRotationAngle(monthIndex) {
  const bounded = Math.max(0, Math.min(11, monthIndex));
  return Math.round((bounded / 12) * 360);
}

// Browser Controller Logic
let activeMonthIndex = 5; // June (Monsoon onset)

function renderFarmingCycleUI(monthIdx) {
  activeMonthIndex = monthIdx % 12;
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Determine active season from month index
  // June - Oct (5-9) -> Kharif; Oct - March (9-2) -> Rabi; March - June (2-5) -> Zaid
  let currentSeasonKey = "kharif";
  if (monthIdx >= 2 && monthIdx < 5) currentSeasonKey = "zaid";
  else if (monthIdx >= 5 && monthIdx <= 9) currentSeasonKey = "kharif";
  else currentSeasonKey = "rabi";

  const activeSeason = SEASONS_DATA[currentSeasonKey];
  const seasonCrops = filterCropsBySeason(currentSeasonKey);

  const angle = calculateCalendarRotationAngle(activeMonthIndex);
  const wheel = document.getElementById('calendar-wheel-svg');
  if (wheel) {
    wheel.style.transform = `rotate(${angle}deg)`;
  }

  const monthLabel = document.getElementById('active-month-label');
  const seasonTitle = document.getElementById('active-season-title');
  const seasonDesc = document.getElementById('active-season-desc');
  const cropsList = document.getElementById('crops-grid-list');

  if (monthLabel) monthLabel.textContent = monthNames[activeMonthIndex];
  if (seasonTitle) seasonTitle.textContent = activeSeason.name;
  if (seasonDesc) seasonDesc.textContent = activeSeason.description;

  if (cropsList) {
    cropsList.innerHTML = seasonCrops.map(crop => `
      <div class="crop-card" style="border-top: 3px solid ${activeSeason.color};">
        <div class="crop-header">
          <span class="crop-icon"><i class="fas ${crop.icon}" style="color: ${activeSeason.color}"></i></span>
          <h3 class="crop-title">${crop.name}</h3>
        </div>
        <div class="crop-meta">
          <div><strong>Sowing:</strong> ${crop.sowing}</div>
          <div><strong>Harvest:</strong> ${crop.harvest}</div>
          <div><strong>Rainfall:</strong> ${crop.rainfallReq}</div>
        </div>
        <p class="crop-notes">${crop.notes}</p>
        <div class="crop-states"><strong>Major States:</strong> ${crop.majorStates}</div>
      </div>
    `).join('');
  }

  // Update month buttons active state
  document.querySelectorAll('.month-step-btn').forEach((btn, idx) => {
    if (idx === activeMonthIndex) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });
}

function initMonsoonFarmingApp() {
  const monthNav = document.getElementById('month-stepper');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (monthNav) {
    monthNav.innerHTML = monthNames.map((m, idx) => `
      <button class="month-step-btn ${idx === 5 ? 'active' : ''}" data-index="${idx}" aria-label="Month ${m}">
        ${m}
      </button>
    `).join('');

    monthNav.addEventListener('click', e => {
      const btn = e.target.closest('.month-step-btn');
      if (btn) {
        renderFarmingCycleUI(parseInt(btn.dataset.index, 10));
      }
    });
  }

  const rotateNext = document.getElementById('wheel-rotate-next');
  const rotatePrev = document.getElementById('wheel-rotate-prev');

  if (rotateNext) {
    rotateNext.addEventListener('click', () => {
      renderFarmingCycleUI(activeMonthIndex + 1);
    });
  }

  if (rotatePrev) {
    rotatePrev.addEventListener('click', () => {
      renderFarmingCycleUI(activeMonthIndex - 1 < 0 ? 11 : activeMonthIndex - 1);
    });
  }

  renderFarmingCycleUI(5);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initMonsoonFarmingApp);
}

export {
  SEASONS_DATA,
  CROPS_DATA,
  IRRIGATION_METHODS,
  validateFarmingCycleData,
  filterCropsBySeason,
  calculateCalendarRotationAngle
};
