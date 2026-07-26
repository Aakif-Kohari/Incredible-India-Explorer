/**
 * route-planner-ui.js
 * Wires RoutePlanner (route-planner.js) to the DOM on route-planner.html.
 * Kept separate from route-planner.js so the routing/optimization logic
 * stays pure and unit-testable in Node without a DOM.
 */
(function () {
const { ROUTE_DESTINATIONS, TRANSPORT_MODES, DESTINATION_INFO, optimizeRoute, getRoute, formatDistance, formatDuration, recommendMode } = window.RoutePlanner;
const { PACE_PRESETS, planMultiDayRoute, getAlternativePlans, exportItineraryText } = window.MultiDayPlanner;
  let stops = [];
  let mode = "road";
  let pace = "standard";
  let lastMultiDayPlan = null;
  let map, routeLayer, markersLayer;

  function initMap() {
    map = L.map("route-map", { scrollWheelZoom: false }).setView([22.5, 79], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    routeLayer = L.layerGroup().addTo(map);
    markersLayer = L.layerGroup().addTo(map);
  }

  function populateStopSelect() {
    const select = document.getElementById("stop-select");
    select.innerHTML = ROUTE_DESTINATIONS
      .map((d) => `<option value="${d.id}">${d.name}, ${d.state}</option>`)
      .join("");
  }

  function renderStopList() {
    const list = document.getElementById("stop-list");
    list.innerHTML = stops
      .map(
        (s, i) => `
        <li class="stop-item" data-id="${s.id}">
          <span class="stop-index">${i + 1}</span>
          <span class="stop-name">${s.name}</span>
          <button type="button" data-remove="${s.id}" aria-label="Remove ${s.name}">✕</button>
        </li>`
      )
      .join("");

    list.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        stops = stops.filter((s) => s.id !== btn.dataset.remove);
        renderStopList();
        renderMarkers();
        renderStopInfo();
        invalidateMultiDayPlan();
      });
    });

    renderStopInfo();
  }

  function renderStopInfo() {
    const container = document.getElementById("stop-info");
    if (!container) return;
    if (!stops.length) {
      container.innerHTML = "";
      return;
    }
    container.innerHTML = stops
      .map((s) => {
        const info = DESTINATION_INFO[s.id];
        if (!info) return "";
        return `
          <div class="stop-info-card">
            <h4>${s.name}</h4>
            <p><strong>Best time to visit:</strong> ${info.bestTime}</p>
            <p><strong>Tip:</strong> ${info.tip}</p>
            <p><strong>Nearby attractions:</strong> ${info.attractions.join(", ")}</p>
          </div>`;
      })
      .join("");
  }

  function renderMarkers() {
    markersLayer.clearLayers();
    stops.forEach((s, i) => {
      L.marker([s.lat, s.lng])
        .addTo(markersLayer)
        .bindTooltip(`${i + 1}. ${s.name}`, { permanent: false });
    });
    if (stops.length) {
      const bounds = L.latLngBounds(stops.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }

  function renderRouteOnMap(geometry) {
    routeLayer.clearLayers();
    if (!geometry) return;
    const latlngs = geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    L.polyline(latlngs, { color: "#FF9933", weight: 4, opacity: 0.85 }).addTo(routeLayer);
  }

  function setStatus(text, isError) {
    const el = document.getElementById("route-status");
    el.textContent = text || "";
    el.classList.toggle("error", !!isError);
  }

function renderSummary(result) {
    document.getElementById("route-summary").hidden = false;
    document.getElementById("summary-distance").textContent = formatDistance(result.distanceKm);
    document.getElementById("summary-duration").textContent = formatDuration(result.durationMinutes);

    const recommended = TRANSPORT_MODES[recommendMode(result.distanceKm)];
    document.getElementById("summary-recommended").textContent = `${recommended.icon} ${recommended.label}`;
    const legList = document.getElementById("route-leg-list");
    legList.innerHTML = result.legs
      .map(
        (leg, i) =>
          `<li>${stops[i].name} → ${stops[i + 1].name}: ${formatDistance(leg.distanceKm)}, ${formatDuration(leg.durationMinutes)}</li>`
      )
      .join("");

    document.getElementById("route-estimated-note").hidden = !result.estimated;
  }

  async function calculateRoute() {
    if (stops.length < 2) {
      setStatus("Add at least two stops to calculate a route.", true);
      return;
    }
    setStatus("Calculating route…");
    try {
      const result = await getRoute(stops, mode);
      renderRouteOnMap(result.geometry);
      renderSummary(result);
      renderMultiDayPlan(result);
      setStatus(result.fromCache ? "Loaded from cache." : "Route calculated.");
    } catch (err) {
      setStatus(err.message || "Could not calculate route.", true);
    }
  }

  // -------------------------------------------------------------------------
  // Multi-day planning: split the calculated route into daily driving legs,
  // suggest overnight stays, flag attraction-hours conflicts, and offer
  // alternative paces. Recalculates from scratch every time it's called, so
  // it always reflects the current stop order, mode, and pace.
  // -------------------------------------------------------------------------
  function renderMultiDayPlan(result) {
    const panel = document.getElementById("multiday-panel");
    if (!panel) return;

    if (stops.length < 2 || !result.legs || !result.legs.length) {
      panel.hidden = true;
      lastMultiDayPlan = null;
      return;
    }

    const plan = planMultiDayRoute(stops, result.legs, {
      maxDrivingMinutesPerDay: PACE_PRESETS[pace].maxDrivingMinutesPerDay,
    });
    lastMultiDayPlan = plan;
    panel.hidden = false;

    document.getElementById("multiday-day-count").textContent =
      `${plan.days.length} day${plan.days.length === 1 ? "" : "s"}`;

    document.getElementById("multiday-days").innerHTML = plan.days
      .map(
        (day) => `
        <div class="day-card">
          <h4>Day ${day.dayNumber}</h4>
          <p class="day-route">${day.stops.map((s) => s.name).join(" → ")}</p>
          <p class="day-stats">${formatDuration(day.drivingMinutes)} driving · ${formatDistance(day.distanceKm)}</p>
          ${day.overnightAt ? `<p class="day-overnight">🌙 Overnight in ${day.overnightAt.name}</p>` : ""}
        </div>`
      )
      .join("");

    const warningsEl = document.getElementById("multiday-warnings");
    warningsEl.innerHTML = plan.warnings.length
      ? `<ul>${plan.warnings.map((w) => `<li>${w}</li>`).join("")}</ul>`
      : "";

    const alternatives = getAlternativePlans(stops, result.legs);
    document.getElementById("multiday-alternatives").innerHTML = alternatives
      .map(
        (alt) =>
          `<li><strong>${alt.label}</strong> (${Math.round(alt.maxDrivingMinutesPerDay / 60)}h/day max): ${alt.dayCount} day${alt.dayCount === 1 ? "" : "s"}, ${formatDuration(alt.totalDrivingMinutes)} total driving</li>`
      )
      .join("");
  }

  function handlePaceChange(e) {
    const btn = e.target.closest(".pace-btn");
    if (!btn) return;
    pace = btn.dataset.pace;
    document.querySelectorAll(".pace-btn").forEach((b) => b.classList.toggle("active", b === btn));
    // Recalculate immediately if we already have a plan on screen.
    if (lastMultiDayPlan) {
      getRoute(stops, mode).then(renderMultiDayPlan).catch(() => {});
    }
  }

  function handleExportItinerary() {
    if (!lastMultiDayPlan) {
      setStatus("Calculate a route first to export an itinerary.", true);
      return;
    }
    const text = exportItineraryText(lastMultiDayPlan, {
      title: "India Road Trip Itinerary",
      mode: TRANSPORT_MODES[mode].label,
    });
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "india-itinerary.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Itinerary changed (stop added/removed/reordered, mode changed) — the
  // route and multi-day plan on screen are now stale until recalculated.
  function invalidateMultiDayPlan() {
    lastMultiDayPlan = null;
    const panel = document.getElementById("multiday-panel");
    if (panel) panel.hidden = true;
  }

  function handleOptimize() {
    if (stops.length < 3) {
      setStatus("Add at least three stops to optimize the order.", true);
      return;
    }
    stops = optimizeRoute(stops);
    renderStopList();
    renderMarkers();
    invalidateMultiDayPlan();
    setStatus("Stop order optimized. Recalculate the route to update distance/time.");
  }

  function handleAddStop() {
    const select = document.getElementById("stop-select");
    const dest = ROUTE_DESTINATIONS.find((d) => d.id === select.value);
    if (!dest || stops.find((s) => s.id === dest.id)) return;
    stops.push(dest);
    renderStopList();
    renderMarkers();
    invalidateMultiDayPlan();
  }

  function handleModeChange(e) {
    const btn = e.target.closest(".mode-btn");
    if (!btn) return;
    mode = btn.dataset.mode;
    document.querySelectorAll(".mode-btn").forEach((b) => b.classList.toggle("active", b === btn));
    invalidateMultiDayPlan();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMap();
    populateStopSelect();
    document.getElementById("add-stop-btn").addEventListener("click", handleAddStop);
    document.getElementById("optimize-btn").addEventListener("click", handleOptimize);
    document.getElementById("calc-route-btn").addEventListener("click", calculateRoute);
    document.getElementById("mode-selector").addEventListener("click", handleModeChange);
    const paceSelector = document.getElementById("pace-selector");
    if (paceSelector) paceSelector.addEventListener("click", handlePaceChange);
    const exportBtn = document.getElementById("export-itinerary-btn");
    if (exportBtn) exportBtn.addEventListener("click", handleExportItinerary);
  });
})();