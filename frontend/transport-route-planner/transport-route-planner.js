/**
 * frontend/transport-route-planner/transport-route-planner.js
 *
 * Multi-modal Public Transport & Route Recommendation planner
 * (resolves GitHub issue #2697).
 *
 * This project is a static, no-backend site (see README.md /
 * CONTRIBUTING.md — "no complex build tools or backend frameworks").
 * There is no live transit API, routing microservice, or backend to
 * synchronize with. So this feature is scoped down to what the site's
 * architecture actually supports, following the same pattern already
 * used by frontend/trains-map/script.js and
 * frontend/travel-search/search-reccomendation-engine.html:
 *
 *   - A curated, static dataset of city pairs and the transport
 *     "legs" available between them (walk / bus / metro / cab /
 *     train), each with an estimated duration, cost, and distance.
 *   - A pure, client-side multi-modal route builder that combines
 *     legs into route options and a preference-based ranking engine
 *     (lowest cost / shortest time / least walking / balanced).
 *   - "Real-time service updates" is implemented as a lightweight
 *     mock live-status layer (per-mode delay/crowding flags that
 *     change on a timer) rather than a real transit API integration,
 *     since no such backend exists in this project.
 *
 * All pure logic is exposed on window.TransportPlanner so it can be
 * unit tested outside the DOM (see
 * frontend/tests/unit/transport-route-planner.test.js), the same way
 * js-modules/trip-planner.js exposes window.TripPlanner.
 */
(function (root) {
    "use strict";

    const SAVED_ROUTES_KEY = "transportPlannerSavedRoutes";

    // ------------------------------------------------------------------
    // Static data: supported cities + inter/intra-city transport legs
    // ------------------------------------------------------------------
    // Coordinates reused from the same India-wide destination set as
    // trip-data.js so this feature stays consistent with Trip Planner.
    const CITIES = [
        { id: "delhi", name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090 },
        { id: "agra", name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081 },
        { id: "jaipur", name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
        { id: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777 },
        { id: "goa", name: "Goa", state: "Goa", lat: 15.2993, lng: 74.1240 },
        { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739 },
        { id: "kolkata", name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 },
        { id: "bengaluru", name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946 },
        { id: "udaipur", name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125 },
        { id: "amritsar", name: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723 }
    ];

    // Transport modes: base speed (km/h), per-km cost (INR), flat base
    // fee (INR, booking/boarding overhead), and a walking-distance
    // proxy in km used for the "minimum walking" preference.
    const MODES = {
        walk:  { id: "walk",  label: "Walking",   icon: "🚶", speedKmh: 4.5,  costPerKm: 0,   baseFee: 0,   maxKm: 4,     walkKm: (km) => km },
        metro: { id: "metro", label: "Metro",     icon: "🚇", speedKmh: 33,   costPerKm: 2.1, baseFee: 10,  minKm: 1,     walkKm: () => 0.6 },
        bus:   { id: "bus",   label: "Bus",       icon: "🚌", speedKmh: 22,   costPerKm: 1.2, baseFee: 5,   minKm: 1,     walkKm: () => 0.4 },
        cab:   { id: "cab",   label: "Cab / Taxi", icon: "🚕", speedKmh: 28,  costPerKm: 14,  baseFee: 60,  minKm: 0.5,   walkKm: () => 0 },
        train: { id: "train", label: "Train",     icon: "🚆", speedKmh: 65,  costPerKm: 1.5, baseFee: 40,  minKm: 80,    walkKm: () => 1.2 }
    };

    // ------------------------------------------------------------------
    // Geometry helpers
    // ------------------------------------------------------------------
    function haversineKm(a, b) {
        const R = 6371;
        const dLat = ((b.lat - a.lat) * Math.PI) / 180;
        const dLng = ((b.lng - a.lng) * Math.PI) / 180;
        const lat1 = (a.lat * Math.PI) / 180;
        const lat2 = (b.lat * Math.PI) / 180;
        const h =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
        return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    }

    function findCity(id) {
        return CITIES.find((c) => c.id === id) || null;
    }

    // ------------------------------------------------------------------
    // Pure route-generation logic
    // ------------------------------------------------------------------
    /**
     * Builds one leg estimate for a given mode over a given distance.
     * Returns null if the mode isn't a sane fit for that distance
     * (e.g. walking 300km, or a train for a 2km hop).
     */
    function estimateLeg(mode, distanceKm) {
        const m = MODES[mode];
        if (!m) return null;
        if (m.maxKm && distanceKm > m.maxKm) return null;
        if (m.minKm && distanceKm < m.minKm) return null;

        const durationHr = distanceKm / m.speedKmh;
        const cost = Math.round(m.baseFee + distanceKm * m.costPerKm);
        const walkingKm = Math.round(m.walkKm(distanceKm) * 10) / 10;

        return {
            mode: m.id,
            label: m.label,
            icon: m.icon,
            distanceKm: Math.round(distanceKm * 10) / 10,
            durationMin: Math.max(3, Math.round(durationHr * 60)),
            cost,
            walkingKm
        };
    }

    /**
     * Generates every viable single-mode and simple two-leg
     * (walk + transit) route option between two cities/points.
     */
    function generateRoutes(originId, destinationId) {
        const origin = findCity(originId);
        const destination = findCity(destinationId);
        if (!origin || !destination) {
            throw new Error("generateRoutes requires valid origin and destination city ids");
        }
        if (origin.id === destination.id) {
            throw new Error("Origin and destination must be different");
        }

        const distanceKm = haversineKm(origin, destination);
        const routes = [];

        // Direct single-mode options
        Object.keys(MODES).forEach((modeId) => {
            const leg = estimateLeg(modeId, distanceKm);
            if (leg) {
                routes.push({
                    id: `${modeId}-direct`,
                    legs: [leg],
                    totalDistanceKm: leg.distanceKm,
                    totalDurationMin: leg.durationMin,
                    totalCost: leg.cost,
                    totalWalkingKm: leg.walkingKm,
                    transfers: 0
                });
            }
        });

        // Two-leg combos for longer hops: short walk to a transit hub,
        // then the main transit mode (mirrors how a real commuter trip
        // is actually taken — walk to the metro/bus stop first).
        if (distanceKm > 4) {
            ["metro", "bus", "train"].forEach((mainMode) => {
                const mainLeg = estimateLeg(mainMode, distanceKm * 0.94);
                const walkLeg = estimateLeg("walk", Math.min(1.5, distanceKm * 0.03));
                if (mainLeg && walkLeg) {
                    routes.push({
                        id: `walk-${mainMode}-combo`,
                        legs: [walkLeg, mainLeg],
                        totalDistanceKm: Math.round((walkLeg.distanceKm + mainLeg.distanceKm) * 10) / 10,
                        totalDurationMin: walkLeg.durationMin + mainLeg.durationMin + 5, // +5 min transfer buffer
                        totalCost: walkLeg.cost + mainLeg.cost,
                        totalWalkingKm: walkLeg.walkingKm + mainLeg.walkingKm,
                        transfers: 1
                    });
                }
            });
        }

        return routes;
    }

    /**
     * Ranks a list of routes by a preference: "cost" | "time" | "walking" | "balanced".
     * Returns a new array (input is not mutated), sorted best-first,
     * each entry annotated with a 0-100 score for display.
     */
    function rankRoutes(routes, preference) {
        if (!Array.isArray(routes) || routes.length === 0) return [];
        const pref = preference || "balanced";

        const maxCost = Math.max(...routes.map((r) => r.totalCost), 1);
        const maxDuration = Math.max(...routes.map((r) => r.totalDurationMin), 1);
        const maxWalk = Math.max(...routes.map((r) => r.totalWalkingKm), 0.1);

        const weights = {
            cost: { cost: 0.7, time: 0.2, walking: 0.1 },
            time: { cost: 0.15, time: 0.75, walking: 0.1 },
            walking: { cost: 0.15, time: 0.2, walking: 0.65 },
            balanced: { cost: 0.34, time: 0.34, walking: 0.32 }
        }[pref] || { cost: 0.34, time: 0.34, walking: 0.32 };

        const scored = routes.map((r) => {
            // Normalized 0-1 "badness" per dimension, then inverted to a
            // 0-100 "goodness" score so higher is always better.
            const costNorm = r.totalCost / maxCost;
            const timeNorm = r.totalDurationMin / maxDuration;
            const walkNorm = r.totalWalkingKm / maxWalk;
            const badness = weights.cost * costNorm + weights.time * timeNorm + weights.walking * walkNorm;
            const score = Math.round((1 - badness) * 100);
            return Object.assign({}, r, { score: Math.max(0, Math.min(100, score)) });
        });

        return scored.sort((a, b) => b.score - a.score);
    }

    /**
     * Mock "real-time" service status per mode. Not a live transit API
     * (this project has no backend) — a deterministic-but-time-varying
     * mock so the UI can demonstrate delay/crowding updates, clearly
     * labelled as simulated in the UI copy.
     */
    function getMockLiveStatus(mode, now) {
        const t = now || Date.now();
        const bucket = Math.floor(t / (2 * 60 * 1000)); // changes every 2 minutes
        const seed = (bucket + hashString(mode)) % 5;
        const statuses = [
            { level: "on-time", label: "On time", delayMin: 0 },
            { level: "on-time", label: "On time", delayMin: 0 },
            { level: "minor", label: "Minor delay", delayMin: 3 },
            { level: "minor", label: "Slightly crowded", delayMin: 0 },
            { level: "delay", label: "Delayed", delayMin: 8 }
        ];
        return statuses[seed];
    }

    function hashString(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = (h * 31 + str.charCodeAt(i)) >>> 0;
        }
        return h;
    }

    function formatDuration(min) {
        if (min < 60) return `${min} min`;
        const h = Math.floor(min / 60);
        const m = min % 60;
        return m ? `${h}h ${m}m` : `${h}h`;
    }

    function formatCost(inr) {
        return inr === 0 ? "Free" : `₹${inr.toLocaleString("en-IN")}`;
    }

    // ------------------------------------------------------------------
    // Saved routes (localStorage) + Journey integration
    // ------------------------------------------------------------------
    function readSavedRoutes() {
        try {
            const raw = localStorage.getItem(SAVED_ROUTES_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function writeSavedRoutes(list) {
        try {
            localStorage.setItem(SAVED_ROUTES_KEY, JSON.stringify(list));
        } catch (e) {
            /* storage unavailable — no-op */
        }
    }

    function saveRouteToItinerary(routeSummary) {
        const list = readSavedRoutes();
        const withId = Object.assign({ id: `${routeSummary.origin}-${routeSummary.destination}-${Date.now()}` }, routeSummary);
        list.unshift(withId);
        writeSavedRoutes(list.slice(0, 30));

        // Integrate with the shared "My India Journey" bookmark store so
        // the route also shows up alongside other saved itinerary items.
        if (root.Journey && typeof root.Journey.saveToJourney === "function") {
            root.Journey.saveToJourney({
                id: `transport-route-${withId.id}`,
                explorerPage: "transport-route-planner/index.html",
                title: `${routeSummary.originName} → ${routeSummary.destinationName} (${routeSummary.modeLabel})`,
                description: `${formatDuration(routeSummary.totalDurationMin)} · ${formatCost(routeSummary.totalCost)}`,
                category: "Transport Route"
            });
        }
        return list;
    }

    function removeSavedRoute(id) {
        const list = readSavedRoutes().filter((r) => r.id !== id);
        writeSavedRoutes(list);
        return list;
    }

    // ------------------------------------------------------------------
    // DOM wiring (guarded — safe to load in non-browser test contexts)
    // ------------------------------------------------------------------
    function initTransportPlannerPage() {
        if (typeof document === "undefined") return;

        const originSelect = document.getElementById("tp-origin");
        const destinationSelect = document.getElementById("tp-destination");
        const preferenceButtons = document.querySelectorAll(".tp-pref-btn");
        const form = document.getElementById("tp-form");
        const resultsEl = document.getElementById("tp-results");
        const savedListEl = document.getElementById("tp-saved-list");
        const swapBtn = document.getElementById("tp-swap");

        if (!form || !originSelect || !destinationSelect || !resultsEl) return;

        // Populate city dropdowns
        CITIES.forEach((city) => {
            const opt1 = document.createElement("option");
            opt1.value = city.id;
            opt1.textContent = `${city.name}, ${city.state}`;
            originSelect.appendChild(opt1);

            const opt2 = opt1.cloneNode(true);
            destinationSelect.appendChild(opt2);
        });
        originSelect.value = "delhi";
        destinationSelect.value = "agra";

        let preference = "balanced";
        preferenceButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                preferenceButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                preference = btn.dataset.pref;
                if (resultsEl.dataset.hasResults === "true") renderResults();
            });
        });

        if (swapBtn) {
            swapBtn.addEventListener("click", () => {
                const tmp = originSelect.value;
                originSelect.value = destinationSelect.value;
                destinationSelect.value = tmp;
            });
        }

        let lastRanked = [];

        function renderResults() {
            const originId = originSelect.value;
            const destinationId = destinationSelect.value;
            const origin = findCity(originId);
            const destination = findCity(destinationId);

            if (originId === destinationId) {
                resultsEl.innerHTML = `<p class="tp-error">Please choose two different cities.</p>`;
                resultsEl.dataset.hasResults = "false";
                return;
            }

            const routes = generateRoutes(originId, destinationId);
            const ranked = rankRoutes(routes, preference);
            lastRanked = ranked;
            resultsEl.dataset.hasResults = "true";

            resultsEl.innerHTML = ranked
                .map((route, idx) => {
                    const legsHtml = route.legs
                        .map(
                            (leg) => `
                        <span class="tp-leg">
                            <span class="tp-leg-icon">${leg.icon}</span>
                            ${leg.label} · ${formatDuration(leg.durationMin)} · ${formatCost(leg.cost)}
                        </span>`
                        )
                        .join('<span class="tp-leg-arrow">→</span>');

                    const status = getMockLiveStatus(route.legs[route.legs.length - 1].mode);

                    return `
                    <article class="tp-route-card ${idx === 0 ? "tp-route-best" : ""}" data-route-idx="${idx}">
                        <div class="tp-route-header">
                            <span class="tp-route-score">Score ${route.score}</span>
                            ${idx === 0 ? '<span class="tp-route-badge">Recommended</span>' : ""}
                            <span class="tp-route-status tp-status-${status.level}">${status.label}${status.delayMin ? " +" + status.delayMin + "m" : ""}</span>
                        </div>
                        <div class="tp-route-legs">${legsHtml}</div>
                        <div class="tp-route-summary">
                            <span>⏱ ${formatDuration(route.totalDurationMin)}</span>
                            <span>💰 ${formatCost(route.totalCost)}</span>
                            <span>🚶 ${route.totalWalkingKm.toFixed(1)} km walk</span>
                            <span>🔁 ${route.transfers} transfer${route.transfers === 1 ? "" : "s"}</span>
                        </div>
                        <button type="button" class="tp-save-btn" data-route-idx="${idx}">Save to My Journey</button>
                    </article>`;
                })
                .join("");

            resultsEl.querySelectorAll(".tp-save-btn").forEach((btn) => {
                btn.addEventListener("click", () => {
                    const route = lastRanked[Number(btn.dataset.routeIdx)];
                    saveRouteToItinerary({
                        origin: originId,
                        destination: destinationId,
                        originName: origin.name,
                        destinationName: destination.name,
                        modeLabel: route.legs.map((l) => l.label).join(" + "),
                        totalDurationMin: route.totalDurationMin,
                        totalCost: route.totalCost
                    });
                    btn.textContent = "Saved ✓";
                    btn.disabled = true;
                    renderSavedList();
                });
            });
        }

        function renderSavedList() {
            if (!savedListEl) return;
            const saved = readSavedRoutes();
            if (saved.length === 0) {
                savedListEl.innerHTML = `<p class="tp-empty">No saved routes yet — plan a route above and save it here.</p>`;
                return;
            }
            savedListEl.innerHTML = saved
                .map(
                    (r) => `
                <div class="tp-saved-item">
                    <span>${r.originName} → ${r.destinationName} <em>(${r.modeLabel})</em></span>
                    <span>${formatDuration(r.totalDurationMin)} · ${formatCost(r.totalCost)}</span>
                    <button type="button" class="tp-remove-btn" data-id="${r.id}" aria-label="Remove saved route">✕</button>
                </div>`
                )
                .join("");

            savedListEl.querySelectorAll(".tp-remove-btn").forEach((btn) => {
                btn.addEventListener("click", () => {
                    removeSavedRoute(btn.dataset.id);
                    renderSavedList();
                });
            });
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            renderResults();
        });

        // Register this page's saved routes into the site-wide cross
        // explorer search index, same convention as other pages.
        if (root.Journey && typeof root.Journey.registerSearchItems === "function") {
            root.Journey.registerSearchItems(
                "transport-route-planner/index.html",
                CITIES.map((c) => ({
                    id: `transport-city-${c.id}`,
                    title: `Transport routes to ${c.name}`,
                    description: `Plan multi-modal public transport routes to/from ${c.name}, ${c.state}.`,
                    category: "Transport Route"
                }))
            );
        }

        renderSavedList();
        renderResults();
    }

    // ------------------------------------------------------------------
    // Public API
    // ------------------------------------------------------------------
    const TransportPlanner = {
        CITIES,
        MODES,
        haversineKm,
        findCity,
        estimateLeg,
        generateRoutes,
        rankRoutes,
        getMockLiveStatus,
        formatDuration,
        formatCost,
        saveRouteToItinerary,
        removeSavedRoute,
        readSavedRoutes,
        initTransportPlannerPage
    };

    root.TransportPlanner = TransportPlanner;

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TransportPlanner;
    }
})(typeof window !== "undefined" ? window : globalThis);