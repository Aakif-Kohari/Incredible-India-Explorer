/**
 * literacy-chart-race.js
 * Data Viz: Literacy Rate Growth by State (Animated Bar-Chart Race)
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Census Years Dataset
export const censusYears = [1951, 1961, 1971, 1981, 1991, 2001, 2011];

// Verified Literacy Data (Census of India Archives)
export const stateLiteracyData = [
  {
    state: "Kerala",
    region: "South",
    flag: "🌴",
    rates: { 1951: 47.18, 1961: 55.08, 1971: 69.75, 1981: 78.85, 1991: 89.81, 2001: 90.86, 2011: 94.00 }
  },
  {
    state: "Mizoram",
    region: "Northeast",
    flag: "⛰️",
    rates: { 1951: 31.14, 1961: 44.01, 1971: 53.80, 1981: 59.88, 1991: 82.27, 2001: 88.80, 2011: 91.33 }
  },
  {
    state: "Goa",
    region: "West",
    flag: "🏖️",
    rates: { 1951: 23.48, 1961: 30.75, 1971: 44.75, 1981: 56.66, 1991: 75.51, 2001: 82.01, 2011: 88.70 }
  },
  {
    state: "Tripura",
    region: "Northeast",
    flag: "🌿",
    rates: { 1951: 15.52, 1961: 20.24, 1971: 30.98, 1981: 42.58, 1991: 60.44, 2001: 73.19, 2011: 87.20 }
  },
  {
    state: "Himachal Pradesh",
    region: "North",
    flag: "🏔️",
    rates: { 1951: 7.71, 1961: 21.27, 1971: 31.96, 1981: 42.48, 1991: 63.86, 2001: 76.48, 2011: 82.80 }
  },
  {
    state: "Maharashtra",
    region: "West",
    flag: "🏙️",
    rates: { 1951: 27.91, 1961: 35.08, 1971: 45.77, 1981: 55.83, 1991: 64.87, 2001: 76.88, 2011: 82.34 }
  },
  {
    state: "Tamil Nadu",
    region: "South",
    flag: "🏛️",
    rates: { 1951: 20.86, 1961: 36.39, 1971: 45.40, 1981: 54.39, 1991: 62.66, 2001: 73.45, 2011: 80.09 }
  },
  {
    state: "Gujarat",
    region: "West",
    flag: "🏭",
    rates: { 1951: 21.82, 1961: 30.45, 1971: 35.79, 1981: 43.70, 1991: 61.29, 2001: 69.14, 2011: 78.03 }
  },
  {
    state: "West Bengal",
    region: "East",
    flag: "🐯",
    rates: { 1951: 24.61, 1961: 34.46, 1971: 38.86, 1981: 48.65, 1991: 57.70, 2001: 68.64, 2011: 76.26 }
  },
  {
    state: "Punjab",
    region: "North",
    flag: "🌾",
    rates: { 1951: 15.24, 1961: 24.23, 1971: 33.67, 1981: 40.86, 1991: 58.51, 2001: 69.65, 2011: 75.84 }
  },
  {
    state: "Haryana",
    region: "North",
    flag: "🏎️",
    rates: { 1951: 12.00, 1961: 19.90, 1971: 26.89, 1981: 36.14, 1991: 55.85, 2001: 67.91, 2011: 75.55 }
  },
  {
    state: "Karnataka",
    region: "South",
    flag: "💻",
    rates: { 1951: 19.30, 1961: 29.80, 1971: 36.83, 1981: 46.21, 1991: 56.04, 2001: 66.64, 2011: 75.36 }
  },
  {
    state: "National Average (All India)",
    region: "National",
    flag: "🇮🇳",
    rates: { 1951: 18.33, 1961: 28.30, 1971: 34.45, 1981: 43.57, 1991: 52.21, 2001: 64.83, 2011: 74.04 }
  },
  {
    state: "Odisha",
    region: "East",
    flag: "🛕",
    rates: { 1951: 15.80, 1961: 21.66, 1971: 26.18, 1981: 34.23, 1991: 49.09, 2001: 63.08, 2011: 72.87 }
  },
  {
    state: "Madhya Pradesh",
    region: "Central",
    flag: "🌲",
    rates: { 1951: 13.16, 1961: 17.13, 1971: 22.14, 1981: 27.87, 1991: 44.20, 2001: 63.74, 2011: 69.32 }
  },
  {
    state: "Uttar Pradesh",
    region: "North",
    flag: "🏰",
    rates: { 1951: 12.02, 1961: 17.63, 1971: 21.70, 1981: 27.16, 1991: 40.71, 2001: 56.27, 2011: 67.68 }
  },
  {
    state: "Rajasthan",
    region: "West",
    flag: "🐪",
    rates: { 1951: 8.95, 1961: 15.21, 1971: 19.05, 1981: 24.38, 1991: 38.55, 2001: 60.41, 2011: 66.11 }
  },
  {
    state: "Bihar",
    region: "East",
    flag: "📜",
    rates: { 1951: 13.49, 1961: 18.40, 1971: 19.94, 1981: 26.20, 1991: 37.49, 2001: 47.00, 2011: 61.80 }
  }
];

// Data Sourcing Disclaimer
export const sourcingDisclaimer = {
  text: "Data compiled from official Census of India records (1951–2011). Literacy is defined as the percentage of population aged 7 and above who can read and write with understanding in any language.",
  disclaimer: "Data as of Census 2011; newer national sample survey (NSSO) estimates and pending census data may exist by the time users view it."
};

/**
 * Get sorted & ranked list of states for a specific census year.
 */
export function getRankedStatesByYear(year = 2011, list = stateLiteracyData) {
  if (!Array.isArray(list)) return [];
  const validYear = censusYears.includes(year) ? year : 2011;

  return [...list]
    .map(item => ({
      state: item.state,
      region: item.region,
      flag: item.flag,
      rate: item.rates[validYear] || 0
    }))
    .sort((a, b) => b.rate - a.rate);
}

/**
 * Interpolate values between two census years for smooth bar race animation.
 */
export function interpolateYearData(startYear, endYear, progress = 0.5, list = stateLiteracyData) {
  if (!Array.isArray(list)) return [];
  const p = Math.max(0, Math.min(1, progress));

  return list
    .map(item => {
      const startRate = item.rates[startYear] || 0;
      const endRate = item.rates[endYear] || startRate;
      const currentRate = parseFloat((startRate + (endRate - startRate) * p).toFixed(2));
      return {
        state: item.state,
        region: item.region,
        flag: item.flag,
        rate: currentRate
      };
    })
    .sort((a, b) => b.rate - a.rate);
}

/**
 * Calculate total literacy growth percentage from 1951 to 2011.
 */
export function calculateLiteracyGrowth(startValue, endValue) {
  if (!startValue || startValue <= 0) return 0;
  return parseFloat(((endValue - startValue)).toFixed(2));
}

/**
 * Filter states data by search query.
 */
export function filterStatesData(query = "", list = stateLiteracyData) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q) return list;

  return list.filter(item => 
    item.state.toLowerCase().includes(q) || item.region.toLowerCase().includes(q)
  );
}

/* ==========================================================================
   BROWSER DOM & ANIMATED BAR CHART RACE ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.literacyCensusYears = censusYears;
  window.literacyStateData = stateLiteracyData;
  window.literacySourcing = sourcingDisclaimer;
  window.getRankedStatesByYear = getRankedStatesByYear;
  window.interpolateYearData = interpolateYearData;
  window.calculateLiteracyGrowth = calculateLiteracyGrowth;
  window.filterStatesData = filterStatesData;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const chartBarsContainer = document.getElementById("race-bars-container");
    const yearDisplay = document.getElementById("current-year-display");
    const btnPlay = document.getElementById("btn-race-play");
    const btnPause = document.getElementById("btn-race-pause");
    const btnReplay = document.getElementById("btn-race-replay");
    const yearSelect = document.getElementById("race-year-select");
    const searchInput = document.getElementById("race-search");

    let animationTimer = null;
    let currentYearIndex = 0;
    let stepProgress = 0;
    let isPlaying = false;

    // Render Bar Chart Race State
    function renderRaceBars(itemsData) {
      if (!chartBarsContainer) return;
      chartBarsContainer.innerHTML = "";

      const maxRate = 100; // max percentage 100%

      itemsData.forEach((item, rank) => {
        const barRow = document.createElement("div");
        barRow.className = "race-bar-row";
        barRow.style.transform = `translateY(${rank * 52}px)`;

        const isNational = item.state.includes("National");

        barRow.innerHTML = `
          <div class="bar-label-col ${isNational ? 'label-national' : ''}">
            <span class="rank-badge">#${rank + 1}</span>
            <span class="state-flag">${item.flag}</span>
            <span class="state-name">${item.state}</span>
          </div>

          <div class="bar-track">
            <div class="bar-fill ${isNational ? 'fill-national' : ''}" style="width: ${(item.rate / maxRate) * 100}%"></div>
            <span class="bar-val-tag">${item.rate.toFixed(1)}%</span>
          </div>
        `;

        chartBarsContainer.appendChild(barRow);
      });

      // Adjust container height based on bar count
      chartBarsContainer.style.height = `${itemsData.length * 52}px`;
    }

    // Update Year Display
    function updateYearUI(yearVal) {
      if (yearDisplay) yearDisplay.textContent = Math.round(yearVal);
      if (yearSelect) {
        const matchingYear = censusYears.find(y => Math.abs(y - yearVal) < 2);
        if (matchingYear) yearSelect.value = matchingYear;
      }
    }

    // Step Animation Timer
    function stepAnimation() {
      if (!isPlaying) return;

      stepProgress += 0.08;
      if (stepProgress >= 1) {
        stepProgress = 0;
        currentYearIndex++;

        if (currentYearIndex >= censusYears.length - 1) {
          // Finished race
          currentYearIndex = censusYears.length - 1;
          const finalData = getRankedStatesByYear(censusYears[currentYearIndex]);
          renderRaceBars(finalData);
          updateYearUI(censusYears[currentYearIndex]);
          pauseRace();
          return;
        }
      }

      const startY = censusYears[currentYearIndex];
      const endY = censusYears[currentYearIndex + 1];
      const currentYearDecimal = startY + (endY - startY) * stepProgress;

      const interpolated = interpolateYearData(startY, endY, stepProgress);
      renderRaceBars(interpolated);
      updateYearUI(currentYearDecimal);
    }

    // Control Functions
    function playRace() {
      if (isPlaying) return;
      if (currentYearIndex >= censusYears.length - 1) {
        currentYearIndex = 0;
        stepProgress = 0;
      }

      isPlaying = true;
      btnPlay?.classList.add("active");
      btnPause?.classList.remove("active");

      clearInterval(animationTimer);
      animationTimer = setInterval(stepAnimation, 50);
    }

    function pauseRace() {
      isPlaying = false;
      btnPlay?.classList.remove("active");
      btnPause?.classList.add("active");
      clearInterval(animationTimer);
    }

    function replayRace() {
      pauseRace();
      currentYearIndex = 0;
      stepProgress = 0;
      const initialData = getRankedStatesByYear(censusYears[0]);
      renderRaceBars(initialData);
      updateYearUI(censusYears[0]);
      playRace();
    }

    // Select Specific Year
    function setSpecificYear(year) {
      pauseRace();
      const idx = censusYears.indexOf(parseInt(year));
      if (idx !== -1) {
        currentYearIndex = idx;
        stepProgress = 0;
        const data = getRankedStatesByYear(censusYears[idx]);
        renderRaceBars(data);
        updateYearUI(censusYears[idx]);
      }
    }

    // Event Listeners
    btnPlay?.addEventListener("click", playRace);
    btnPause?.addEventListener("click", pauseRace);
    btnReplay?.addEventListener("click", replayRace);
    yearSelect?.addEventListener("change", (e) => setSpecificYear(e.target.value));

    searchInput?.addEventListener("input", () => {
      pauseRace();
      const query = searchInput.value;
      const filtered = filterStatesData(query);
      const year = censusYears[currentYearIndex];
      const ranked = getRankedStatesByYear(year, filtered);
      renderRaceBars(ranked);
    });

    // Initializations
    const initialData = getRankedStatesByYear(censusYears[0]);
    renderRaceBars(initialData);
    updateYearUI(censusYears[0]);
  });
}
