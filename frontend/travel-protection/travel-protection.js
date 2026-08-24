/**
 * Smart Travel Protection
 *
 * Handles:
 * - Destination risk classification
 * - Seasonal risk adjustment
 * - Personalized recommendations
 * - Preparation checklist
 * - LocalStorage persistence
 */

const CHECKLIST_STORAGE_KEY = "incredibleIndiaTravelProtectionChecklist";
const TRIP_STORAGE_KEY = "incredibleIndiaTravelProtectionTrip";


/* =========================================================
   RISK ENGINE
   ========================================================= */

function getRiskLabel(level) {
  if (level >= 3) return "High";
  if (level >= 2) return "Moderate";
  return "Low";
}


function calculateOverallRisk(destination, season) {
  if (!destination || !destination.risks) {
    return 0;
  }

  const baseRisks = [
    destination.risks.weather.level,
    destination.risks.health.level,
    destination.risks.transportation.level,
    destination.risks.safety.level
  ];

  const baseAverage =
    baseRisks.reduce((sum, value) => sum + value, 0) / baseRisks.length;

  const seasonalRisk =
    destination.seasonalRisks &&
    destination.seasonalRisks[season]
      ? destination.seasonalRisks[season]
      : 1;

  const adjustedAverage = (baseAverage + seasonalRisk) / 2;

  if (adjustedAverage >= 2.5) return 3;
  if (adjustedAverage >= 1.5) return 2;

  return 1;
}


function getRiskClass(level) {
  if (level >= 3) return "high";
  if (level >= 2) return "moderate";
  return "low";
}


/* =========================================================
   RECOMMENDATION ENGINE
   ========================================================= */

function generateRecommendations(destination, tripType, season) {
  if (!destination) {
    return [];
  }

  const recommendations = [];

  const typeRecommendations =
    TRIP_TYPE_RECOMMENDATIONS[tripType] ||
    TRIP_TYPE_RECOMMENDATIONS.leisure;

  recommendations.push(...typeRecommendations);

  const overallRisk = calculateOverallRisk(destination, season);

  if (overallRisk >= 3) {
    recommendations.push({
      category: "Risk",
      title: "Build additional travel buffer",
      description:
        "Consider extra time and flexible arrangements because multiple risk factors may affect your itinerary."
    });
  }

  if (destination.risks.weather.level >= 3) {
    recommendations.push({
      category: "Weather",
      title: "Monitor weather conditions",
      description:
        "Check current forecasts before travel and keep alternative indoor or flexible activities available."
    });
  }

  if (destination.risks.health.level >= 2) {
    recommendations.push({
      category: "Health",
      title: "Prepare a basic health kit",
      description:
        "Carry essential medication and follow current local health guidance."
    });
  }

  if (destination.risks.transportation.level >= 3) {
    recommendations.push({
      category: "Transport",
      title: "Allow extra transport time",
      description:
        "Build additional buffer into your itinerary and keep important booking details accessible."
    });
  }

  if (season === "monsoon") {
    recommendations.push({
      category: "Season",
      title: "Prepare for rain-related disruption",
      description:
        "Keep waterproof protection for important documents and check transport conditions before departure."
    });
  }

  return recommendations;
}


/* =========================================================
   CHECKLIST STORAGE
   ========================================================= */

function loadChecklistState() {
  try {
    const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);

    if (!saved) {
      return {};
    }

    return JSON.parse(saved);
  } catch (error) {
    return {};
  }
}


function saveChecklistState(state) {
  localStorage.setItem(
    CHECKLIST_STORAGE_KEY,
    JSON.stringify(state)
  );
}


function resetChecklistState() {
  localStorage.removeItem(CHECKLIST_STORAGE_KEY);
}


function updateChecklistProgress() {
  const checkboxes =
    document.querySelectorAll(".checklist-checkbox");

  const completed =
    Array.from(checkboxes).filter(
      (checkbox) => checkbox.checked
    ).length;

  const total = checkboxes.length;

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const progressBar =
    document.getElementById("checklist-progress");

  const progressText =
    document.getElementById("checklist-progress-text");

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }

  if (progressText) {
    progressText.textContent =
      `${completed} of ${total} completed`;
  }
}


function renderChecklist() {
  const container =
    document.getElementById("checklist-items");

  if (!container) {
    return;
  }

  const state = loadChecklistState();

  container.innerHTML = "";

  BASE_CHECKLIST.forEach((item) => {
    const wrapper = document.createElement("label");

    wrapper.className = "checklist-item";

    const checked = Boolean(state[item.id]);

    wrapper.innerHTML = `
      <input
        type="checkbox"
        class="checklist-checkbox"
        data-id="${item.id}"
        ${checked ? "checked" : ""}
      />

      <span class="custom-checkbox" aria-hidden="true">✓</span>

      <span class="checklist-content">
        <strong>${item.title}</strong>
        <small>${item.category}</small>
      </span>
    `;

    container.appendChild(wrapper);
  });

  container
    .querySelectorAll(".checklist-checkbox")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const currentState = loadChecklistState();

        currentState[checkbox.dataset.id] =
          checkbox.checked;

        saveChecklistState(currentState);

        updateChecklistProgress();
      });
    });

  updateChecklistProgress();
}


/* =========================================================
   DESTINATION UI
   ========================================================= */

function populateDestinations() {
  const select =
    document.getElementById("destination");

  if (!select) {
    return;
  }

  Object.entries(TRAVEL_PROTECTION_DESTINATIONS)
    .sort(([, a], [, b]) =>
      a.name.localeCompare(b.name)
    )
    .forEach(([key, destination]) => {
      const option =
        document.createElement("option");

      option.value = key;
      option.textContent =
        `${destination.name} — ${destination.region}`;

      select.appendChild(option);
    });
}


function setRiskBadge(elementId, level) {
  const element =
    document.getElementById(elementId);

  if (!element) {
    return;
  }

  const riskClass = getRiskClass(level);

  element.textContent =
    getRiskLabel(level);

  element.className =
    `risk-badge ${riskClass}`;
}


function renderRiskProfile(destination, season) {
  const profile =
    document.getElementById("risk-profile");

  if (!profile || !destination) {
    return;
  }

  profile.classList.remove("hidden");

  document.getElementById("profile-title").textContent =
    `${destination.name} Travel Risk Profile`;

  document.getElementById("profile-description").textContent =
    destination.description;


  setRiskBadge(
    "weather-risk",
    destination.risks.weather.level
  );

  document.getElementById("weather-description").textContent =
    destination.risks.weather.description;


  setRiskBadge(
    "health-risk",
    destination.risks.health.level
  );

  document.getElementById("health-description").textContent =
    destination.risks.health.description;


  setRiskBadge(
    "transport-risk",
    destination.risks.transportation.level
  );

  document.getElementById("transport-description").textContent =
    destination.risks.transportation.description;


  setRiskBadge(
    "safety-risk",
    destination.risks.safety.level
  );

  document.getElementById("safety-description").textContent =
    destination.risks.safety.description;


  const overallRisk =
    calculateOverallRisk(destination, season);

  const overallElement =
    document.getElementById("overall-risk");

  overallElement.className =
    `overall-risk ${getRiskClass(overallRisk)}`;

  overallElement.innerHTML = `
    <div class="overall-risk-icon">
      ${overallRisk >= 3 ? "⚠️" : overallRisk === 2 ? "🟡" : "🟢"}
    </div>

    <div>
      <span>Overall preparation level</span>
      <strong>${getRiskLabel(overallRisk)} Risk</strong>
      <p>
        Use this indicator as a preparation guide and verify
        current local conditions before travelling.
      </p>
    </div>
  `;
}


/* =========================================================
   RECOMMENDATION UI
   ========================================================= */

function renderRecommendations(
  destination,
  tripType,
  season
) {
  const section =
    document.getElementById("recommendations");

  const container =
    document.getElementById("recommendation-list");

  if (!section || !container) {
    return;
  }

  const recommendations =
    generateRecommendations(
      destination,
      tripType,
      season
    );

  container.innerHTML = "";

  recommendations.forEach((recommendation) => {
    const card =
      document.createElement("article");

    card.className =
      "recommendation-card";

    card.innerHTML = `
      <span class="recommendation-category">
        ${recommendation.category}
      </span>

      <h3>${recommendation.title}</h3>

      <p>${recommendation.description}</p>
    `;

    container.appendChild(card);
  });

  section.classList.remove("hidden");
}


/* =========================================================
   RISK SUMMARY
   ========================================================= */

function renderRiskSummary(destination, season) {
  const container =
    document.getElementById("risk-result");

  if (!container) {
    return;
  }

  const overallRisk =
    calculateOverallRisk(destination, season);

  const riskClass =
    getRiskClass(overallRisk);

  container.className =
    `risk-result ${riskClass}`;

  container.innerHTML = `
    <div class="result-top">
      <div class="result-location">
        <span>📍</span>
        <div>
          <small>DESTINATION</small>
          <h3>${destination.name}</h3>
        </div>
      </div>

      <div class="result-risk">
        <small>RISK LEVEL</small>
        <strong>${getRiskLabel(overallRisk)}</strong>
      </div>
    </div>

    <div class="result-message">
      <strong>Trip preparation insight</strong>
      <p>
        Your selected trip has a
        <b>${getRiskLabel(overallRisk).toLowerCase()}</b>
        preparation level. Review the risk profile and
        recommendations below before travelling.
      </p>
    </div>

    <a href="#risk-profile" class="text-link">
      View detailed risk profile →
    </a>
  `;
}


/* =========================================================
   TRIP PERSISTENCE
   ========================================================= */

function saveTripPreferences(destination, tripType, season) {
  localStorage.setItem(
    TRIP_STORAGE_KEY,
    JSON.stringify({
      destination,
      tripType,
      season
    })
  );
}


function loadTripPreferences() {
  try {
    const saved =
      localStorage.getItem(TRIP_STORAGE_KEY);

    if (!saved) {
      return null;
    }

    return JSON.parse(saved);
  } catch (error) {
    return null;
  }
}


/* =========================================================
   ANALYZE TRIP
   ========================================================= */

function analyzeTrip() {
  const destinationSelect =
    document.getElementById("destination");

  const tripTypeSelect =
    document.getElementById("trip-type");

  const seasonSelect =
    document.getElementById("season");

  if (
    !destinationSelect ||
    !tripTypeSelect ||
    !seasonSelect
  ) {
    return;
  }

  const destinationKey =
    destinationSelect.value;

  const tripType =
    tripTypeSelect.value;

  const season =
    seasonSelect.value;

  if (!destinationKey) {
    destinationSelect.focus();

    const result =
      document.getElementById("risk-result");

    result.className =
      "risk-result validation-message";

    result.innerHTML = `
      <div class="empty-icon">📍</div>
      <h3>Select a destination first</h3>
      <p>
        Choose your destination to calculate its travel
        preparation profile.
      </p>
    `;

    return;
  }

  const destination =
    TRAVEL_PROTECTION_DESTINATIONS[
      destinationKey
    ];

  saveTripPreferences(
    destinationKey,
    tripType,
    season
  );

  renderRiskSummary(
    destination,
    season
  );

  renderRiskProfile(
    destination,
    season
  );

  renderRecommendations(
    destination,
    tripType,
    season
  );

  document
    .getElementById("risk-profile")
    .scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
}


/* =========================================================
   RESET CHECKLIST
   ========================================================= */

function resetChecklist() {
  resetChecklistState();

  renderChecklist();
}


/* =========================================================
   RESTORE PREVIOUS TRIP
   ========================================================= */

function restorePreviousTrip() {
  const saved =
    loadTripPreferences();

  if (!saved) {
    return;
  }

  const destination =
    document.getElementById("destination");

  const tripType =
    document.getElementById("trip-type");

  const season =
    document.getElementById("season");

  if (
    destination &&
    TRAVEL_PROTECTION_DESTINATIONS[
      saved.destination
    ]
  ) {
    destination.value =
      saved.destination;
  }

  if (
    tripType &&
    saved.tripType
  ) {
    tripType.value =
      saved.tripType;
  }

  if (
    season &&
    saved.season
  ) {
    season.value =
      saved.season;
  }
}


/* =========================================================
   EVENT INITIALIZATION
   ========================================================= */

function initializeTravelProtection() {
  populateDestinations();

  renderChecklist();

  restorePreviousTrip();

  const analyzeButton =
    document.getElementById("analyze-trip");

  if (analyzeButton) {
    analyzeButton.addEventListener(
      "click",
      analyzeTrip
    );
  }

  const resetButton =
    document.getElementById("reset-checklist");

  if (resetButton) {
    resetButton.addEventListener(
      "click",
      resetChecklist
    );
  }
}


/* =========================================================
   BROWSER INITIALIZATION
   ========================================================= */

if (
  typeof document !== "undefined"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeTravelProtection
  );
}


/* =========================================================
   TEST EXPORTS
   ========================================================= */

if (typeof module !== "undefined") {
  module.exports = {
    getRiskLabel,
    getRiskClass,
    calculateOverallRisk,
    generateRecommendations,
    loadChecklistState,
    saveChecklistState,
    resetChecklistState
  };
}