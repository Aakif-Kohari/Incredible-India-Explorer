/**
 * js-modules/weather-ui.js
 * DOM layer for the Weather-Aware Itinerary Adjustment feature
 * (originally issue #286; extended for issue #1029's "Smart
 * Weather-Aware Itinerary Optimization"). Listens for the
 * `tripplanner:itinerary-rendered` event dispatched by
 * js-modules/trip-planner.js, fetches forecasts via weather-service.js,
 * evaluates them via weather-core.js, and renders:
 *   - a daily weather summary strip
 *   - adverse-weather alerts (banner + one-shot toast + optional browser
 *     Notification for "poor" days, if the user grants permission)
 *   - an on-demand hourly breakdown for a given day ("worst window")
 *   - indoor-activity suggestions alongside alternative-destination
 *     suggestions for "poor" days
 *   - within-city reorder suggestions
 *   - a user-editable preview of applied adjustments
 *
 * Scope note: "applying" a suggestion updates an advisory preview (and
 * persists the decision in localStorage, keyed by itinerary id) rather
 * than mutating the core itinerary's budget/legs/destinations, which are
 * owned by trip-planner.js. Swapping in a different city outright would
 * change trip cost and travel legs — safer to keep that a separate,
 * explicit action (regenerate/remove-city, already supported) than to
 * silently recompute budget numbers from this add-on layer. See
 * docs/WEATHER_AWARE_ITINERARY.md for the full rationale.
 */
(function () {
    "use strict";

    const Core = window.WeatherCore;
    const Service = window.WeatherService;
    const TripPlanner = window.TripPlanner;

    if (!Core || !Service || !TripPlanner) {
        console.error("[WeatherUI] Missing dependency (WeatherCore/WeatherService/TripPlanner) — weather panel disabled.");
        return;
    }

    const ALERT_PREFS_KEY = "weatherAlertPreferences";
    const ADJUSTMENTS_KEY_PREFIX = "weatherAdjustments:";

    const panel = document.getElementById("weather-panel");
    const startDateInput = document.getElementById("trip-start-date");
    if (!panel || !startDateInput) return; // page markup not present — nothing to wire up

    // Default the start date to tomorrow if the user hasn't picked one.
    if (!startDateInput.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        startDateInput.value = tomorrow.toISOString().slice(0, 10);
    }
    const today = new Date().toISOString().slice(0, 10);
    startDateInput.min = today;

    let toastedSignatures = new Set(); // avoid re-toasting the same alert every re-render

    function showToast(message, isError) {
        document.querySelectorAll(".toast").forEach((el) => el.remove());
        const toast = document.createElement("div");
        toast.className = "toast" + (isError ? " error" : "");
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4500);
    }

    /**
     * Best-effort native browser notification for adverse weather, so the
     * alert is visible even if the user has switched tabs — mirrors the
     * existing pattern in frontend/event-discovery/script.js. Silently
     * does nothing if Notification isn't supported or permission is
     * denied; the in-page toast/banner always fires regardless, so this
     * is purely additive. (No `icon` option — this project doesn't
     * currently ship a notification icon asset.)
     */
    function tryShowWeatherNotification(title, body) {
        if (typeof Notification === "undefined") return;
        if (Notification.permission === "granted") {
            new Notification(title, { body });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(title, { body });
                }
            });
        }
    }

    function loadAlertPrefs() {
        try {
            return localStorage.getItem(ALERT_PREFS_KEY) || "all";
        } catch (e) {
            return "all";
        }
    }
    function saveAlertPrefs(value) {
        try { localStorage.setItem(ALERT_PREFS_KEY, value); } catch (e) { /* ignore */ }
    }

    function loadAdjustments(itineraryId) {
        try {
            const raw = localStorage.getItem(ADJUSTMENTS_KEY_PREFIX + itineraryId);
            return raw ? JSON.parse(raw) : { swaps: {}, appliedReorders: [], dismissedReorders: [], dismissedSwaps: [] };
        } catch (e) {
            return { swaps: {}, appliedReorders: [], dismissedReorders: [], dismissedSwaps: [] };
        }
    }
    function saveAdjustments(itineraryId, adjustments) {
        try {
            localStorage.setItem(ADJUSTMENTS_KEY_PREFIX + itineraryId, JSON.stringify(adjustments));
        } catch (e) { /* storage unavailable — adjustments just won't persist across reloads */ }
    }

    function statusLabel(status) {
        return { good: "Good", caution: "Caution", poor: "Poor", unknown: "No forecast" }[status] || "Unknown";
    }
    function statusClass(status) {
        return "weather-status-" + (status || "unknown");
    }
    function fmtDate(iso) {
        const d = new Date(iso + "T00:00:00");
        return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    }

    // ------------------------------------------------------------------
    // Main entry point — runs every time trip-planner.js renders an itinerary
    // ------------------------------------------------------------------
    let requestToken = 0;

    async function handleItineraryRendered(evt) {
        const itinerary = evt.detail && evt.detail.itinerary;
        if (!itinerary) return;

        const myToken = ++requestToken; // guards against out-of-order responses if the user regenerates quickly
        const adjustments = loadAdjustments(itinerary.id);

        panel.hidden = false;
        panel.innerHTML = renderLoadingState();

        let forecastsByDestId, failed;
        try {
            const result = await Service.fetchForecastsForDestinations(itinerary.destinations);
            forecastsByDestId = result.forecastsByDestId;
            failed = result.failed;
        } catch (err) {
            if (myToken !== requestToken) return;
            panel.innerHTML = renderErrorState();
            showToast("Couldn't load weather forecasts. You can still view your itinerary without weather info.", true);
            return;
        }

        if (myToken !== requestToken) return; // a newer itinerary render superseded this one

        if (failed.length) {
            showToast(`Weather unavailable for ${failed.map((f) => f.name).join(", ")} — showing what we could fetch.`, true);
        }

        const destinationsById = {};
        itinerary.destinations.forEach((d) => { destinationsById[d.id] = d; });

        const schedule = TripPlanner.buildDailySchedule(itinerary);
        let evaluated;
        try {
            evaluated = Core.evaluateItineraryWeather(schedule, destinationsById, forecastsByDestId, startDateInput.value);
        } catch (err) {
            panel.innerHTML = renderErrorState("Please choose a trip start date to see weather-aware suggestions.");
            return;
        }

        // Re-apply any previously-approved reorder suggestions so the preview
        // survives a re-render (e.g. after removing an unrelated city).
        adjustments.appliedReorders.forEach((destId) => {
            const suggestion = Core.suggestReorder(evaluated).find((s) => s.destId === destId);
            if (suggestion) evaluated = Core.applyReorder(evaluated, suggestion);
        });

        renderPanel({ itinerary, destinationsById, forecastsByDestId, evaluated, adjustments });
    }

    function renderLoadingState() {
        return `<div class="weather-panel-inner">
            <div class="weather-loading"><span class="weather-spinner"></span> Fetching weather forecasts for your itinerary…</div>
        </div>`;
    }

    function renderErrorState(message) {
        return `<div class="weather-panel-inner">
            <p class="weather-error">⚠️ ${message || "Something went wrong loading weather data."}</p>
        </div>`;
    }

    // ------------------------------------------------------------------
    // Rendering
    // ------------------------------------------------------------------
    function renderPanel(ctx) {
        const { itinerary, evaluated, adjustments } = ctx;
        const prefs = loadAlertPrefs();
        const summary = Core.buildWeatherSummary(evaluated);
        const poorDays = summary.filter((s) => s.status === "poor");
        const reorderSuggestions = Core.suggestReorder(evaluated).filter((s) => adjustments.appliedReorders.indexOf(s.destId) === -1 && adjustments.dismissedReorders.indexOf(s.destId) === -1);

        maybeToastAlerts(itinerary.id, poorDays, prefs);

        panel.innerHTML = `
            <div class="weather-panel-inner">
                <div class="weather-panel-header">
                    <h4>🌦️ Weather-Aware Plan</h4>
                    <label class="weather-pref-select">
                        Alerts:
                        <select id="weather-alert-pref">
                            <option value="all">All changes</option>
                            <option value="severe">Poor weather only</option>
                            <option value="off">Off</option>
                        </select>
                    </label>
                </div>

                ${prefs !== "off" && poorDays.length ? renderAlertBanner(poorDays) : ""}

                <div class="weather-day-strip">
                    ${summary.map(renderDayChip).join("")}
                </div>

                ${prefs !== "off" ? renderPoorDaySections(ctx, summary) : ""}
                ${prefs !== "off" && reorderSuggestions.length ? renderReorderSuggestions(reorderSuggestions) : ""}
            </div>
        `;

        const prefSelect = document.getElementById("weather-alert-pref");
        if (prefSelect) {
            prefSelect.value = prefs;
            prefSelect.addEventListener("change", () => {
                saveAlertPrefs(prefSelect.value);
                renderPanel(ctx);
            });
        }

        panel.querySelectorAll("[data-alt-action]").forEach((btn) => {
            btn.addEventListener("click", () => handleAlternativeAction(btn, ctx));
        });
        panel.querySelectorAll("[data-reorder-action]").forEach((btn) => {
            btn.addEventListener("click", () => handleReorderAction(btn, ctx));
        });
        panel.querySelectorAll("[data-show-alts]").forEach((btn) => {
            btn.addEventListener("click", () => handleShowAlternatives(btn, ctx));
        });
        panel.querySelectorAll("[data-show-hourly]").forEach((btn) => {
            btn.addEventListener("click", () => handleShowHourly(btn, ctx));
        });
    }

    function renderAlertBanner(poorDays) {
        const cities = Array.from(new Set(poorDays.map((d) => d.city)));
        return `<div class="weather-alert-banner">
            ⚠️ Adverse weather expected in ${cities.join(", ")} — see suggestions below before you finalize your plan.
        </div>`;
    }

    function renderDayChip(day) {
        const icon = day.weather ? day.weather.icon : "❔";
        return `<div class="weather-day-chip ${statusClass(day.status)}">
            <span class="weather-day-date">${fmtDate(day.date)}</span>
            <span class="weather-day-icon">${icon}</span>
            <span class="weather-day-city">${escapeHtml(day.city)}</span>
            <span class="weather-day-status">${statusLabel(day.status)}</span>
        </div>`;
    }

    function renderPoorDaySections(ctx, summary) {
        const poorDays = summary.filter((s) => s.status === "poor");
        if (!poorDays.length) return "";
        return `<div class="weather-poor-days">
            ${poorDays.map((day) => renderPoorDayCard(day, ctx)).join("")}
        </div>`;
    }

    function renderPoorDayCard(day, ctx) {
        const destId = findDestIdForDay(ctx.evaluated, day.day);
        const destination = destId ? ctx.destinationsById[destId] : null;
        const adjustments = ctx.adjustments;
        const applied = adjustments.swaps[day.day];
        const indoorSuggestions = destination ? Core.suggestIndoorActivities(destination.categories) : [];
        return `<div class="weather-poor-card" data-day="${day.day}">
            <div class="weather-poor-card-head">
                <strong>Day ${day.day} · ${escapeHtml(day.city)}</strong>
                <span class="weather-status-pill ${statusClass(day.status)}">${statusLabel(day.status)}</span>
            </div>
            <p class="weather-poor-reasons">${escapeHtml(day.reasons.join(", ") || "Conditions look unfavorable for outdoor plans.")}</p>
            ${indoorSuggestions.length
                ? `<p class="weather-indoor-suggestion">🏛️ Indoor options for today: ${escapeHtml(indoorSuggestions.join("; "))}.</p>`
                : ""}
            <div class="weather-hourly-toggle-row">
                <button type="button" class="map3d-btn weather-hourly-btn" data-show-hourly data-day="${day.day}" data-dest-id="${escapeHtml(destId || "")}">See hourly breakdown</button>
            </div>
            <div class="weather-hourly-results" id="weather-hourly-results-${day.day}"></div>
            ${applied
                ? `<p class="weather-applied-note">✓ Applied: showing "${escapeHtml(applied.name)}" as an alternative for this day. <button type="button" class="weather-link-btn" data-alt-action="revert" data-day="${day.day}">Revert</button></p>`
                : `<button type="button" class="map3d-btn weather-show-alts-btn" data-show-alts data-day="${day.day}" data-dest-id="${escapeHtml(destId || "")}">Show alternatives nearby</button>
                   <div class="weather-alt-results" id="weather-alt-results-${day.day}"></div>`
            }
        </div>`;
    }

    function findDestIdForDay(evaluated, day) {
        const item = evaluated.find((i) => i.day === day && i.type === "stay");
        return item ? item.destId : null;
    }

    function handleShowAlternatives(btn, ctx) {
        const day = Number(btn.dataset.day);
        const destId = btn.dataset.destId;
        const origin = ctx.destinationsById[destId];
        const dayEntry = ctx.evaluated.find((i) => i.day === day);
        if (!origin || !dayEntry) return;

        const alternatives = Core.findAlternativeDestinations({
            origin,
            pool: window.tripDestinations || [],
            forecastsByDestId: ctx.forecastsByDestId,
            date: dayEntry.date,
            tier: ctx.itinerary.tier,
            preferredCategories: ctx.itinerary.inputs.categories,
            haversineDistanceKm: TripPlanner.haversineDistanceKm
        });

        const resultsEl = document.getElementById("weather-alt-results-" + day);
        if (!resultsEl) return;

        if (!alternatives.length) {
            resultsEl.innerHTML = `<p class="weather-note">No good-weather alternatives found within range for this day.</p>`;
            return;
        }

        resultsEl.innerHTML = alternatives.map((alt) => `
            <div class="weather-alt-card">
                <div>
                    <strong>${escapeHtml(alt.destination.name)}</strong>
                    <span class="weather-status-pill ${statusClass(alt.suitability.status)}">${statusLabel(alt.suitability.status)}</span>
                    <p class="weather-alt-meta">${Math.round(alt.distanceKm)} km away${alt.categoryMatch ? " · matches your preferences" : ""}</p>
                </div>
                <div class="weather-alt-actions">
                    <button type="button" class="map3d-btn active" data-alt-action="apply" data-day="${day}" data-dest-id="${escapeHtml(alt.destination.id)}" data-name="${escapeHtml(alt.destination.name)}">Apply</button>
                    <button type="button" class="map3d-btn" data-alt-action="dismiss" data-day="${day}">Dismiss</button>
                </div>
            </div>
        `).join("");

        resultsEl.querySelectorAll("[data-alt-action]").forEach((b) => b.addEventListener("click", () => handleAlternativeAction(b, ctx)));
    }

    async function handleShowHourly(btn, ctx) {
        const day = Number(btn.dataset.day);
        const destId = btn.dataset.destId;
        const origin = ctx.destinationsById[destId];
        const dayEntry = ctx.evaluated.find((i) => i.day === day);
        const resultsEl = document.getElementById("weather-hourly-results-" + day);
        if (!origin || !dayEntry || !resultsEl) return;

        resultsEl.innerHTML = `<p class="weather-note">Loading hourly forecast…</p>`;
        btn.disabled = true;

        try {
            const hourlyForecast = await Service.fetchHourlyForecast(origin.lat, origin.lng);
            const hourlyDay = hourlyForecast.find((h) => h.date === dayEntry.date) || null;
            const risk = Core.summarizeHourlyRisk(hourlyDay);

            if (!hourlyDay) {
                resultsEl.innerHTML = `<p class="weather-note">Hourly detail isn't available for this date (only the next few days are covered).</p>`;
            } else {
                resultsEl.innerHTML = `
                    <p class="weather-hourly-summary">${escapeHtml(risk.label)}</p>
                    <div class="weather-hourly-strip">
                        ${hourlyDay.hours.map((h) => `
                            <div class="weather-hourly-chip${risk.worstHours.includes(h.time) ? " weather-hourly-chip-risky" : ""}">
                                <span>${escapeHtml(h.time)}</span>
                                <span>${classifyWeatherIconSafe(h.weatherCode)}</span>
                                <span>${Math.round(h.tempC)}°C</span>
                            </div>
                        `).join("")}
                    </div>
                `;
            }
        } catch (err) {
            resultsEl.innerHTML = `<p class="weather-note">Couldn't load the hourly forecast right now.</p>`;
        } finally {
            btn.disabled = false;
        }
    }

    function classifyWeatherIconSafe(code) {
        const info = Core.classifyWeatherCode(code);
        return info ? info.icon : "❔";
    }

    function handleAlternativeAction(btn, ctx) {
        const action = btn.dataset.altAction;
        const day = Number(btn.dataset.day);
        const adjustments = ctx.adjustments;

        if (action === "apply") {
            adjustments.swaps[day] = { destId: btn.dataset.destId, name: btn.dataset.name };
            showToast(`Applied "${btn.dataset.name}" as an alternative for Day ${day}. This is a suggestion — your saved itinerary and budget are unchanged.`);
        } else if (action === "revert" || action === "dismiss") {
            delete adjustments.swaps[day];
        }
        saveAdjustments(ctx.itinerary.id, adjustments);
        renderPanel(ctx);
    }

    function renderReorderSuggestions(suggestions) {
        return `<div class="weather-reorder-section">
            <h5>Suggested reordering</h5>
            ${suggestions.map((s) => `
                <div class="weather-reorder-card" data-dest-id="${escapeHtml(s.destId)}">
                    <p>${escapeHtml(s.reason)}</p>
                    <div class="weather-alt-actions">
                        <button type="button" class="map3d-btn active" data-reorder-action="apply" data-dest-id="${escapeHtml(s.destId)}">Apply</button>
                        <button type="button" class="map3d-btn" data-reorder-action="dismiss" data-dest-id="${escapeHtml(s.destId)}">Dismiss</button>
                    </div>
                </div>
            `).join("")}
        </div>`;
    }

    function handleReorderAction(btn, ctx) {
        const action = btn.dataset.reorderAction;
        const destId = btn.dataset.destId;
        const adjustments = ctx.adjustments;

        if (action === "apply") {
            adjustments.appliedReorders.push(destId);
            showToast("Reorder applied to the weather-aware preview below.");
        } else {
            adjustments.dismissedReorders.push(destId);
        }
        saveAdjustments(ctx.itinerary.id, adjustments);
        // Re-run the full handler so the evaluated schedule picks up the reorder cleanly.
        handleItineraryRendered({ detail: { itinerary: ctx.itinerary } });
    }

    function maybeToastAlerts(itineraryId, poorDays, prefs) {
        if (prefs === "off" || !poorDays.length) return;
        const signature = itineraryId + ":" + poorDays.map((d) => d.day).join(",");
        if (toastedSignatures.has(signature)) return;
        toastedSignatures.add(signature);
        const message = `⚠️ ${poorDays.length} day${poorDays.length > 1 ? "s" : ""} in your itinerary may have unfavorable weather. Check the Weather-Aware Plan below.`;
        showToast(message);
        tryShowWeatherNotification("Weather alert for your trip", message);
    }

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = String(str == null ? "" : str);
        return div.innerHTML;
    }

    document.addEventListener("tripplanner:itinerary-rendered", handleItineraryRendered);
    startDateInput.addEventListener("change", () => {
        showToast("Start date changed — click Regenerate to refresh weather suggestions for the new dates.");
    });
})();