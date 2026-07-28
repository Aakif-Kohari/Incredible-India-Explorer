/**
 * frontend/crowd-density/script.js
 * UI layer for the Crowd Density Prediction demo page. Talks only to
 * CrowdDensityService (js-modules/crowd-density-service.js) — all scoring
 * logic lives in js-modules/crowd-density-engine.js, and this file's job
 * is DOM rendering + wiring events, matching the split used by
 * frontend/route-planner/route-planner-ui.js.
 */
import { CrowdDensityService } from "../../js-modules/crowd-density-service.js";

const service = new CrowdDensityService();

const destinationSelect = document.getElementById("crowd-destination-select");
const dateInput = document.getElementById("crowd-date-input");
const statusEl = document.getElementById("crowd-status");
const indicatorEmoji = document.getElementById("crowd-indicator-emoji");
const indicatorLevel = document.getElementById("crowd-indicator-level");
const indicatorScore = document.getElementById("crowd-indicator-score");
const factorList = document.getElementById("crowd-factor-list");
const hoursRow = document.getElementById("crowd-hours-row");
const busiestNote = document.getElementById("crowd-busiest-note");
const forecastRow = document.getElementById("crowd-forecast-row");
const alternativesList = document.getElementById("crowd-alternatives-list");
const feedbackButtons = document.querySelectorAll("[data-feedback]");
const feedbackThanks = document.getElementById("crowd-feedback-thanks");

const itineraryDestinationSelect = document.getElementById("itinerary-destination-select");
const itineraryDateInput = document.getElementById("itinerary-date-input");
const itineraryAddBtn = document.getElementById("itinerary-add-btn");
const itineraryStopList = document.getElementById("itinerary-stop-list");

let stopAutoRefresh = null;
let latestPrediction = null;
let itineraryStops = [];

const FACTOR_LABELS = {
  popularity: "Baseline popularity",
  dayOfWeek: "Weekend effect",
  holiday: "Holiday proximity",
  season: "Seasonal trend",
  weather: "Weather",
  feedbackAdjustment: "Learned from feedback"
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function populateDestinationOptions(selectEl) {
  selectEl.innerHTML = "";
  const destinations = (window.crowdDestinations || []).slice().sort((a, b) => a.name.localeCompare(b.name));
  for (const dest of destinations) {
    const opt = document.createElement("option");
    opt.value = dest.id;
    opt.textContent = dest.name;
    selectEl.appendChild(opt);
  }
}

function renderPrediction(prediction) {
  if (!prediction) {
    statusEl.textContent = "Couldn't generate a prediction for that destination/date.";
    return;
  }
  latestPrediction = prediction;
  statusEl.textContent = `Updated ${new Date().toLocaleTimeString()}`;

  indicatorEmoji.textContent = prediction.level.emoji;
  indicatorLevel.textContent = prediction.level.label;
  indicatorLevel.className = `crowd-indicator-level ${prediction.level.key}`;
  indicatorScore.textContent = `Score: ${prediction.score}/100`;

  factorList.innerHTML = "";
  for (const [key, value] of Object.entries(prediction.factors)) {
    const li = document.createElement("li");
    const sign = value > 0 ? "+" : "";
    li.innerHTML = `<span>${FACTOR_LABELS[key] || key}</span><span>${sign}${Math.round(value)}</span>`;
    factorList.appendChild(li);
  }
}

function renderBestHours(result) {
  hoursRow.innerHTML = "";
  if (!result) return;
  for (const hour of result.recommendedHours) {
    const chip = document.createElement("span");
    chip.className = "crowd-hour-chip";
    chip.textContent = hour.label;
    hoursRow.appendChild(chip);
  }
  busiestNote.textContent = `Busiest around ${result.busiestHour.label} — consider avoiding that window.`;
}

function renderForecast(forecast) {
  forecastRow.innerHTML = "";
  for (const day of forecast) {
    const wrap = document.createElement("div");
    wrap.className = "crowd-forecast-bar-wrap";
    const bar = document.createElement("div");
    bar.className = `crowd-forecast-bar ${day.level.key}`;
    bar.style.height = `${Math.max(6, day.score)}%`;
    bar.title = `${day.date}: ${day.level.label} (${day.score})`;
    const label = document.createElement("div");
    label.className = "crowd-forecast-label";
    const d = new Date(day.date);
    label.textContent = d.toLocaleDateString(undefined, { weekday: "short" });
    wrap.appendChild(bar);
    wrap.appendChild(label);
    forecastRow.appendChild(wrap);
  }
}

function renderAlternatives(alternatives) {
  alternativesList.innerHTML = "";
  if (!alternatives || alternatives.length === 0) {
    alternativesList.innerHTML = '<p class="crowd-empty-note">No configured nearby alternatives for this destination, or none are currently quieter.</p>';
    return;
  }
  for (const alt of alternatives) {
    const card = document.createElement("div");
    card.className = "crowd-alt-card";
    card.innerHTML = `
      <div>
        <div class="crowd-alt-name">${alt.name}</div>
        <div class="crowd-alt-meta">${alt.distanceKm} km away</div>
      </div>
      <div class="crowd-indicator-level ${alt.prediction.level.key}" style="font-size:0.95rem;">${alt.prediction.level.emoji} ${alt.prediction.level.label}</div>
    `;
    alternativesList.appendChild(card);
  }
}

async function refreshAll() {
  const destinationId = destinationSelect.value;
  const date = dateInput.value || todayIso();
  if (!destinationId) return;

  statusEl.textContent = "Loading prediction…";
  const [prediction, bestHours, forecast, alternatives] = await Promise.all([
    service.predict(destinationId, date),
    Promise.resolve(service.getBestVisitingHours(destinationId, date)),
    service.getForecast(destinationId, date, 7),
    Promise.resolve(service.suggestAlternatives(destinationId, date))
  ]);

  renderPrediction(prediction);
  renderBestHours(bestHours);
  renderForecast(forecast);
  renderAlternatives(alternatives);
}

function setupAutoRefresh() {
  const destinationId = destinationSelect.value;
  const date = dateInput.value || todayIso();
  if (stopAutoRefresh) stopAutoRefresh();
  stopAutoRefresh = service.startAutoRefresh(destinationId, date, (prediction) => {
    renderPrediction(prediction);
  });
}

function onSelectionChange() {
  refreshAll();
  setupAutoRefresh();
}

// --------------------------------------------------------------------
// Feedback
// --------------------------------------------------------------------

feedbackButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!latestPrediction) return;
    const kind = btn.getAttribute("data-feedback");
    const delta = kind === "lower" ? -20 : kind === "higher" ? 20 : 0;
    const actualScore = Math.max(0, Math.min(100, latestPrediction.score + delta));
    service.submitFeedback(latestPrediction.destinationId, latestPrediction.score, actualScore);
    feedbackThanks.style.display = "block";
    setTimeout(() => (feedbackThanks.style.display = "none"), 3000);
    refreshAll();
  });
});

// --------------------------------------------------------------------
// Crowd-aware itinerary planner
// --------------------------------------------------------------------

function renderItinerary() {
  itineraryStopList.innerHTML = "";
  const optimized = service.optimizeItinerary(itineraryStops);
  optimized.forEach((stop, index) => {
    const destination = (window.crowdDestinations || []).find((d) => d.id === stop.destinationId);
    const card = document.createElement("div");
    card.className = "itinerary-stop-card";
    const levelKey = stop.prediction ? stop.prediction.level.key : "moderate";
    const levelLabel = stop.prediction ? `${stop.prediction.level.emoji} ${stop.prediction.level.label} (${stop.prediction.score})` : "—";
    card.innerHTML = `
      <div class="stop-header">
        <span>${destination ? destination.name : stop.destinationId} — ${stop.date}</span>
        <button class="remove-stop" data-index="${index}" aria-label="Remove stop">✕</button>
      </div>
      <div class="crowd-indicator-level ${levelKey}" style="font-size:0.85rem;">${levelLabel}</div>
      ${stop.suggestion ? `<div class="suggestion">💡 Try ${stop.suggestion.suggestedDate} instead — predicted ${stop.suggestion.predictedLevel.label} (${stop.suggestion.predictedScore}), ${stop.suggestion.scoreReduction} points lower.</div>` : ""}
    `;
    itineraryStopList.appendChild(card);
  });

  itineraryStopList.querySelectorAll(".remove-stop").forEach((btn) => {
    btn.addEventListener("click", () => {
      itineraryStops.splice(Number(btn.getAttribute("data-index")), 1);
      renderItinerary();
    });
  });
}

itineraryAddBtn.addEventListener("click", () => {
  const destinationId = itineraryDestinationSelect.value;
  const date = itineraryDateInput.value;
  if (!destinationId || !date) return;
  itineraryStops.push({ destinationId, date });
  renderItinerary();
});

// --------------------------------------------------------------------
// Init
// --------------------------------------------------------------------

function init() {
  populateDestinationOptions(destinationSelect);
  populateDestinationOptions(itineraryDestinationSelect);
  dateInput.value = todayIso();
  itineraryDateInput.value = todayIso();
  destinationSelect.addEventListener("change", onSelectionChange);
  dateInput.addEventListener("change", onSelectionChange);
  onSelectionChange();
}

init();
