/**
 * js-modules/smart-budget-planner.js
 * AI-Powered Smart Budget Planner — resolves issue #284.
 *
 * Estimates total trip cost from user-provided trip parameters
 * (destination, duration, travelers, accommodation tier, transport mode,
 * daily food budget, sightseeing/shopping/misc allowances), returning a
 * category-wise breakdown, a cost comparison across travel styles, daily
 * spending guidance, and rule-based cost-optimization suggestions.
 *
 * Rule-based, client-side only — no backend, same pattern as
 * js-modules/trip-planner.js. Reuses trip-data.js's per-destination
 * costPerDay figures (when a known destination is picked) to make the
 * accommodation estimate location-aware; falls back to flat national
 * averages otherwise so the planner still works for any destination name.
 *
 * All pure logic is exposed on window.SmartBudgetPlanner so it can be
 * unit tested outside the DOM (see tests/unit/smart-budget-planner.test.js).
 * DOM wiring lives in initBudgetPlannerPage(), loaded on demand by
 * router-init.js when the route is budget-planner.html.
 */
(function (root) {
    "use strict";

    const SAVED_PLANS_KEY = "smartBudgetPlannerSavedPlans";
    const CONTINGENCY_RATE = 0.08; // 8% buffer for unplanned/surge costs

    // Fallback accommodation rate (INR per person per night) when the chosen
    // destination isn't in trip-data.js, or no destination was specified.
    const ACCOMMODATION_BASE_RATE = { budget: 1200, standard: 3000, luxury: 7500 };

    // Baseline "mid" accommodation cost used to derive a destination's
    // relative cost index (expensive cities like Mumbai/Goa cost more than
    // this; smaller towns cost less), applied on top of ACCOMMODATION_BASE_RATE.
    const NATIONAL_AVG_MID_RATE = 3500;

    // Transport cost model: a flat booking/fare "base" for the whole trip
    // (per traveler) plus a small per-day local-transport component. These
    // are editorial planning estimates, not live fares.
    const TRANSPORT_MODES = {
        flight: { label: "Flight", base: 8000, perDay: 300 },
        train: { label: "Train", base: 2200, perDay: 200 },
        bus: { label: "Bus", base: 1100, perDay: 150 },
        car_rental: { label: "Rental Car / Cab", base: 3200, perDay: 500 },
        own_vehicle: { label: "Own Vehicle", base: 1500, perDay: 350 },
    };

    const ACCOMMODATION_TIERS = ["budget", "standard", "luxury"];

    // --------------------------------------------------------------------
    // Helpers
    // --------------------------------------------------------------------

    function clampPositive(n, fallback = 0) {
        const v = Number(n);
        return Number.isFinite(v) && v >= 0 ? v : fallback;
    }

    function findDestination(destinationName) {
        if (!destinationName) return null;
        const pool = root.tripDestinations || [];
        const needle = String(destinationName).trim().toLowerCase();
        if (!needle) return null;
        return (
            pool.find((d) => d.name.toLowerCase() === needle) ||
            pool.find((d) => d.id.toLowerCase() === needle) ||
            pool.find((d) => d.name.toLowerCase().includes(needle)) ||
            null
        );
    }

    /** Rooms needed assuming double occupancy (2 travelers share a room). */
    function roomsNeeded(travelers) {
        return Math.max(1, Math.ceil(travelers / 2));
    }

    /**
     * Per-person-per-night accommodation rate for a tier, adjusted for the
     * destination's relative cost (if the destination is recognized).
     */
    function accommodationRate(tier, destination) {
        const base = ACCOMMODATION_BASE_RATE[tier] || ACCOMMODATION_BASE_RATE.standard;
        if (destination && destination.costPerDay && destination.costPerDay.mid) {
            const costIndex = destination.costPerDay.mid / NATIONAL_AVG_MID_RATE;
            // Dampen the swing slightly (sqrt) so very cheap/expensive destinations
            // don't distort the estimate too aggressively.
            const dampened = Math.sqrt(costIndex);
            return Math.round(base * dampened);
        }
        return base;
    }

    // --------------------------------------------------------------------
    // Core calculation
    // --------------------------------------------------------------------

    /**
     * @param {Object} input
     * @param {string} [input.destination] - destination name (free text; matched against trip-data.js when possible)
     * @param {number} input.days - trip duration in days
     * @param {number} [input.travelers=1]
     * @param {'budget'|'standard'|'luxury'} [input.accommodationTier='standard']
     * @param {'flight'|'train'|'bus'|'car_rental'|'own_vehicle'} [input.transportMode='train']
     * @param {number} [input.dailyFoodBudget] - INR per person per day
     * @param {number} [input.sightseeing] - INR, total for the trip
     * @param {number} [input.shopping] - INR, total for the trip
     * @param {number} [input.misc] - INR, total for the trip
     * @returns {Object} budget plan
     */
    function calculateBudget(input) {
        const days = Math.max(1, Math.round(clampPositive(input.days, 1)));
        const travelers = Math.max(1, Math.round(clampPositive(input.travelers, 1)));
        const tier = ACCOMMODATION_TIERS.includes(input.accommodationTier) ? input.accommodationTier : "standard";
        const modeKey = TRANSPORT_MODES[input.transportMode] ? input.transportMode : "train";
        const destination = findDestination(input.destination);

        const nightlyRate = accommodationRate(tier, destination);
        const nights = Math.max(0, days - 1) || days; // single-day trip still needs 1 unit of lodging cost basis
        const accommodation = Math.round(nightlyRate * nights * roomsNeeded(travelers));

        const mode = TRANSPORT_MODES[modeKey];
        const transport = Math.round(travelers * (mode.base + mode.perDay * days));

        const dailyFoodBudget = clampPositive(input.dailyFoodBudget, tier === "luxury" ? 1500 : tier === "budget" ? 400 : 800);
        const food = Math.round(dailyFoodBudget * days * travelers);

        const sightseeing = Math.round(clampPositive(input.sightseeing, 0));
        const shopping = Math.round(clampPositive(input.shopping, 0));
        const misc = Math.round(clampPositive(input.misc, 0));

        const subtotal = accommodation + transport + food + sightseeing + shopping + misc;
        const contingency = Math.round(subtotal * CONTINGENCY_RATE);
        const total = subtotal + contingency;

        const categories = { accommodation, transport, food, sightseeing, shopping, misc, contingency };
        const categoryPercentages = {};
        Object.keys(categories).forEach((k) => {
            categoryPercentages[k] = total > 0 ? Math.round((categories[k] / total) * 1000) / 10 : 0;
        });

        return {
            id: "budget_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
            createdAt: new Date().toISOString(),
            inputs: {
                destination: input.destination || "",
                days,
                travelers,
                accommodationTier: tier,
                transportMode: modeKey,
                dailyFoodBudget,
                sightseeing,
                shopping,
                misc,
            },
            matchedDestination: destination ? destination.name : null,
            categories,
            categoryPercentages,
            subtotal,
            total,
            perPersonTotal: Math.round(total / travelers),
            perDayTotal: Math.round(total / days),
        };
    }

    /**
     * Recomputes the estimate at each accommodation tier so the user can
     * compare Budget vs Standard vs Luxury travel styles at a glance.
     */
    function compareTiers(input) {
        return ACCOMMODATION_TIERS.map((tier) => {
            const plan = calculateBudget(Object.assign({}, input, { accommodationTier: tier }));
            return { tier, total: plan.total, perPersonTotal: plan.perPersonTotal, categories: plan.categories };
        });
    }

    /**
     * Recomputes the same trip parameters (days, travelers, tier,
     * transport, allowances) across a list of candidate destinations, so
     * a user deciding *where* to go can see a side-by-side cost
     * comparison — not just a style comparison for one place.
     *
     * @param {Object} baseInput - same shape as calculateBudget()'s input, minus `destination`
     * @param {Array<string>} destinationNames
     * @returns {Array} plans sorted cheapest-first
     */
    function compareDestinations(baseInput, destinationNames) {
        const names = (destinationNames || []).map((n) => (n || "").trim()).filter(Boolean);
        return names
            .map((name) => {
                const plan = calculateBudget(Object.assign({}, baseInput, { destination: name }));
                return {
                    destination: plan.matchedDestination || name,
                    requested: name,
                    matched: !!plan.matchedDestination,
                    total: plan.total,
                    perPersonTotal: plan.perPersonTotal,
                    perDayTotal: plan.perDayTotal,
                    categories: plan.categories,
                    plan,
                };
            })
            .sort((a, b) => a.total - b.total);
    }

    /**
     * Category-wise cost forecast for a real, saved, multi-city Trip
     * Planner itinerary (js-modules/trip-planner.js's saved-trip shape),
     * rather than the single-destination form above. This is the
     * "dynamic trip cost forecasting" piece of issue #1028: it reuses
     * Trip Planner's own per-leg, distance-based inter-city travel costs
     * (more accurate than a flat per-mode guess) for the transport
     * category, and applies the same accommodation/food logic as
     * calculateBudget() per destination, based on how many days the
     * itinerary actually assigns to each stop.
     *
     * Recompute this whenever the itinerary or the options below change
     * to keep the forecast in sync — see initBudgetPlannerPage()'s
     * itinerary-forecast section for the live-update wiring.
     *
     * @param {Object} itinerary - a Trip Planner itinerary: { title?, inputs:{travelers}, destinations:[{name,state,assignedDays,costPerDay,...}], legs:[{cost,distanceKm,...}] }
     * @param {Object} [options]
     * @param {'budget'|'standard'|'luxury'} [options.accommodationTier='standard']
     * @param {number} [options.dailyFoodBudget] - INR per person per day; defaults per tier like calculateBudget()
     * @param {number} [options.sightseeing] - INR, total for the whole itinerary
     * @param {number} [options.shopping] - INR, total for the whole itinerary
     * @param {number} [options.misc] - INR, total for the whole itinerary
     */
    function calculateItineraryBudget(itinerary, options) {
        options = options || {};
        if (!itinerary || !Array.isArray(itinerary.destinations) || !itinerary.destinations.length) {
            throw new Error("calculateItineraryBudget: itinerary with at least one destination is required");
        }

        const travelers = Math.max(1, Math.round(clampPositive((itinerary.inputs && itinerary.inputs.travelers) || 1, 1)));
        const tier = ACCOMMODATION_TIERS.includes(options.accommodationTier) ? options.accommodationTier : "standard";
        const dailyFoodBudget = clampPositive(options.dailyFoodBudget, tier === "luxury" ? 1500 : tier === "budget" ? 400 : 800);
        const sightseeing = Math.round(clampPositive(options.sightseeing, 0));
        const shopping = Math.round(clampPositive(options.shopping, 0));
        const misc = Math.round(clampPositive(options.misc, 0));

        const perDestination = itinerary.destinations.map((dest) => {
            const days = Math.max(1, Math.round(dest.assignedDays || 1));
            const nightlyRate = accommodationRate(tier, dest.costPerDay ? dest : findDestination(dest.name));
            const nights = Math.max(0, days - 1) || days;
            const accommodation = Math.round(nightlyRate * nights * roomsNeeded(travelers));
            const food = Math.round(dailyFoodBudget * days * travelers);
            return { name: dest.name, state: dest.state || null, days, accommodation, food, total: accommodation + food };
        });

        const accommodationTotal = perDestination.reduce((s, d) => s + d.accommodation, 0);
        const foodTotal = perDestination.reduce((s, d) => s + d.food, 0);
        // Reuse Trip Planner's own distance-based inter-city leg costs
        // instead of a flat per-mode guess — leg.cost is per-person (see
        // trip-planner.js#estimateTravelLeg), so scale by travelers here.
        const legs = Array.isArray(itinerary.legs) ? itinerary.legs : [];
        const transportTotal = Math.round(legs.reduce((s, l) => s + (l.cost || 0), 0) * travelers);

        const subtotal = accommodationTotal + transportTotal + foodTotal + sightseeing + shopping + misc;
        const contingency = Math.round(subtotal * CONTINGENCY_RATE);
        const total = subtotal + contingency;
        const totalDays = perDestination.reduce((s, d) => s + d.days, 0);

        const categories = { accommodation: accommodationTotal, transport: transportTotal, food: foodTotal, sightseeing, shopping, misc, contingency };
        const categoryPercentages = {};
        Object.keys(categories).forEach((k) => {
            categoryPercentages[k] = total > 0 ? Math.round((categories[k] / total) * 1000) / 10 : 0;
        });

        return {
            id: "itin_budget_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
            createdAt: new Date().toISOString(),
            tripTitle: itinerary.title || null,
            inputs: { accommodationTier: tier, travelers, dailyFoodBudget, sightseeing, shopping, misc },
            perDestination,
            categories,
            categoryPercentages,
            subtotal,
            total,
            days: totalDays,
            perPersonTotal: Math.round(total / travelers),
            perDayTotal: Math.round(total / Math.max(1, totalDays)),
        };
    }

    // Same healthy/warning/exceeded convention as
    // js-modules/budget-calculator-engine.js's getBudgetHealth(), so
    // alert styling is consistent with the rest of the site's budget
    // tooling rather than inventing a fourth vocabulary.
    const ALERT_WARNING_RATIO = 0.85;

    /**
     * Compares an estimated plan's total against a user-set target
     * budget and returns an alert status. Call this again after any
     * recompute (itinerary change, assumption change) to get a live
     * "budget alert when estimated costs exceed limits" — see
     * initBudgetPlannerPage() for where this re-renders automatically.
     *
     * @param {Object} plan - anything with a `.total` (calculateBudget() or calculateItineraryBudget() output)
     * @param {number} targetBudget - INR; 0/blank means "no target set"
     * @returns {null|{status:'healthy'|'warning'|'exceeded', ratio:number, target:number, total:number, difference:number, message:string}}
     */
    function getBudgetAlert(plan, targetBudget) {
        const target = clampPositive(targetBudget, 0);
        if (!target || !plan) return null;

        const ratio = plan.total / target;
        const difference = target - plan.total;
        let status, message;
        if (ratio > 1) {
            status = "exceeded";
            message = `This estimate is ${fmtINR(Math.abs(difference))} over your ${fmtINR(target)} budget.`;
        } else if (ratio >= ALERT_WARNING_RATIO) {
            status = "warning";
            message = `This estimate is close to your ${fmtINR(target)} budget cap (${Math.round(ratio * 100)}% used).`;
        } else {
            status = "healthy";
            message = `This estimate is within your ${fmtINR(target)} budget, with ${fmtINR(difference)} to spare.`;
        }

        return { status, ratio: Math.round(ratio * 1000) / 1000, target, total: plan.total, difference, message };
    }

    /**
     * Rule-based cost optimization suggestions derived from the breakdown.
     * Each suggestion includes an estimated saving where applicable so the
     * user can judge which trade-offs are worth making.
     */
    function getRecommendations(plan) {
        const suggestions = [];
        const { categories, categoryPercentages, inputs, total } = plan;

        if (categoryPercentages.accommodation > 45 && inputs.accommodationTier !== "budget") {
            const cheaper = calculateBudget(Object.assign({}, inputs, { accommodationTier: "budget" }));
            suggestions.push({
                category: "accommodation",
                message: "Accommodation is your biggest expense. Switching to a Budget-tier stay could bring costs down significantly.",
                potentialSaving: Math.max(0, total - cheaper.total),
            });
        }

        if (inputs.transportMode === "flight" && inputs.days <= 3) {
            const trainPlan = calculateBudget(Object.assign({}, inputs, { transportMode: "train" }));
            suggestions.push({
                category: "transport",
                message: "For short trips, train travel is often nearly as fast door-to-door and considerably cheaper than flying.",
                potentialSaving: Math.max(0, total - trainPlan.total),
            });
        }

        if (categoryPercentages.food > 25) {
            suggestions.push({
                category: "food",
                message: "Food spending is on the higher side. Mixing in local eateries alongside restaurants can meaningfully cut this category without sacrificing the experience.",
                potentialSaving: Math.round(categories.food * 0.25),
            });
        }

        if (categoryPercentages.shopping > 20) {
            suggestions.push({
                category: "shopping",
                message: "Shopping allowance is a large share of this budget. Consider setting a firm per-item cap or a running tally while traveling.",
                potentialSaving: Math.round(categories.shopping * 0.3),
            });
        }

        if (inputs.travelers >= 3) {
            suggestions.push({
                category: "accommodation",
                message: "With a larger group, booking multi-bed rooms or a homestay/apartment instead of individual rooms usually reduces the per-person lodging cost.",
                potentialSaving: Math.round(categories.accommodation * 0.15),
            });
        }

        suggestions.push({
            category: "general",
            message: "Booking accommodation and long-distance transport at least 3-4 weeks in advance typically avoids peak/surge pricing.",
            potentialSaving: Math.round((categories.accommodation + categories.transport) * 0.1),
        });

        return suggestions;
    }

    /** Even, per-day spending guidance for pacing money across the trip. */
    function getDailySpendingPlan(plan) {
        const days = plan.inputs.days;
        const perDay = {};
        Object.keys(plan.categories).forEach((k) => {
            perDay[k] = Math.round(plan.categories[k] / days);
        });
        perDay.total = Math.round(plan.total / days);
        return perDay;
    }

    // --------------------------------------------------------------------
    // Persistence (localStorage — no backend)
    // --------------------------------------------------------------------

    function getSavedPlans() {
        try {
            const raw = localStorage.getItem(SAVED_PLANS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("[SmartBudgetPlanner] Failed to read saved plans", e);
            return [];
        }
    }

    function defaultPlanTitle(plan) {
        const dest = plan.matchedDestination || plan.inputs.destination || "Trip";
        return `${plan.inputs.days}-Day ${dest} Budget`;
    }

    function savePlan(plan, title) {
        const plans = getSavedPlans();
        const record = {
            id: plan.id,
            title: title || defaultPlanTitle(plan),
            savedAt: new Date().toISOString(),
            plan,
        };
        const existingIndex = plans.findIndex((p) => p.id === record.id);
        if (existingIndex >= 0) {
            plans[existingIndex] = record;
        } else {
            plans.unshift(record);
        }
        try {
            localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(plans));
            return true;
        } catch (e) {
            console.error("[SmartBudgetPlanner] Failed to save plan", e);
            return false;
        }
    }

    /** Update an existing saved plan in place (used by the "edit" flow). */
    function updateSavedPlan(id, newInput) {
        const plans = getSavedPlans();
        const idx = plans.findIndex((p) => p.id === id);
        if (idx === -1) return null;
        const recalculated = calculateBudget(newInput);
        recalculated.id = id; // keep the same identity
        plans[idx].plan = recalculated;
        plans[idx].savedAt = new Date().toISOString();
        try {
            localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(plans));
            return plans[idx];
        } catch (e) {
            console.error("[SmartBudgetPlanner] Failed to update plan", e);
            return null;
        }
    }

    function deleteSavedPlan(id) {
        const plans = getSavedPlans().filter((p) => p.id !== id);
        try {
            localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(plans));
            return true;
        } catch (e) {
            console.error("[SmartBudgetPlanner] Failed to delete plan", e);
            return false;
        }
    }

    // --------------------------------------------------------------------
    // Export
    // --------------------------------------------------------------------

    function fmtINR(n) {
        return "Rs. " + Math.round(n).toLocaleString("en-IN");
    }

    const CATEGORY_LABELS = {
        accommodation: "Accommodation",
        transport: "Transport",
        food: "Food",
        sightseeing: "Sightseeing",
        shopping: "Shopping",
        misc: "Miscellaneous",
        contingency: "Contingency Buffer",
    };

    /** Builds a plain-text report string suitable for downloading/printing. */
    function exportReportText(plan, recommendations, alert) {
        const isItinerary = Array.isArray(plan.perDestination);
        const lines = [];
        const dest = isItinerary ? plan.tripTitle || "Multi-City Itinerary" : plan.matchedDestination || plan.inputs.destination || "Your Trip";
        lines.push(`${isItinerary ? "ITINERARY BUDGET FORECAST" : "SMART BUDGET PLAN"} - ${dest}`);
        lines.push("=".repeat(40));
        if (isItinerary) {
            lines.push(`Stops: ${plan.perDestination.map((d) => d.name).join(", ")}`);
            lines.push(`Total duration: ${plan.days} day(s)`);
        } else {
            lines.push(`Duration: ${plan.inputs.days} day(s)`);
        }
        lines.push(`Travelers: ${plan.inputs.travelers}`);
        lines.push(`Accommodation tier: ${plan.inputs.accommodationTier}`);
        if (!isItinerary) {
            lines.push(`Transport mode: ${TRANSPORT_MODES[plan.inputs.transportMode].label}`);
        }
        lines.push("");

        if (isItinerary) {
            lines.push("PER-DESTINATION BREAKDOWN");
            lines.push("-".repeat(40));
            plan.perDestination.forEach((d) => {
                lines.push(`${d.name} (${d.days} day${d.days === 1 ? "" : "s"}): ${fmtINR(d.total)} (accommodation ${fmtINR(d.accommodation)} + food ${fmtINR(d.food)})`);
            });
            lines.push("");
        }

        lines.push("CATEGORY BREAKDOWN");
        lines.push("-".repeat(40));
        Object.keys(plan.categories).forEach((k) => {
            lines.push(
                `${CATEGORY_LABELS[k]}: ${fmtINR(plan.categories[k])} (${plan.categoryPercentages[k]}%)`
            );
        });
        lines.push("-".repeat(40));
        lines.push(`TOTAL ESTIMATED COST: ${fmtINR(plan.total)}`);
        lines.push(`Per person: ${fmtINR(plan.perPersonTotal)}`);
        lines.push(`Per day: ${fmtINR(plan.perDayTotal)}`);

        if (alert) {
            lines.push("");
            lines.push("BUDGET ALERT");
            lines.push("-".repeat(40));
            lines.push(alert.message);
        }

        if (recommendations && recommendations.length) {
            lines.push("");
            lines.push("COST OPTIMIZATION SUGGESTIONS");
            lines.push("-".repeat(40));
            recommendations.forEach((r, i) => {
                lines.push(`${i + 1}. ${r.message}`);
                if (r.potentialSaving > 0) {
                    lines.push(`   Potential saving: ${fmtINR(r.potentialSaving)}`);
                }
            });
        }

        lines.push("");
        lines.push("Generated by Incredible India Explorer - Intelligent Budget Planner");
        return lines.join("\n");
    }

    // --------------------------------------------------------------------
    // Public API (also unit-testable via window.SmartBudgetPlanner)
    // --------------------------------------------------------------------

    const SmartBudgetPlanner = {
        TRANSPORT_MODES,
        ACCOMMODATION_TIERS,
        calculateBudget,
        compareTiers,
        compareDestinations,
        calculateItineraryBudget,
        getBudgetAlert,
        getRecommendations,
        getDailySpendingPlan,
        getSavedPlans,
        savePlan,
        updateSavedPlan,
        deleteSavedPlan,
        defaultPlanTitle,
        exportReportText,
        fmtINR,
    };

    root.SmartBudgetPlanner = SmartBudgetPlanner;

    // --------------------------------------------------------------------
    // UI wiring — runs once per route load (called by app.js as
    // initBudgetPlannerPage(), following the site's existing lazy-load
    // convention, see router-init.js)
    // --------------------------------------------------------------------

    function initBudgetPlannerPage() {
        const form = document.getElementById("budget-planner-form");
        if (!form) return; // not on this page

        const resultsEl = document.getElementById("budget-results");
        const savedListEl = document.getElementById("budget-saved-list");
        const errorEl = document.getElementById("budget-form-error");

        let currentPlan = null;
        let currentRecommendations = [];

        const destinationList = document.getElementById("budget-destination-list");
        if (destinationList && Array.isArray(root.tripDestinations)) {
            destinationList.innerHTML = root.tripDestinations
                .map((d) => `<option value="${d.name}"></option>`)
                .join("");
        }

        function readForm() {
            return {
                destination: document.getElementById("budget-destination").value,
                days: parseInt(document.getElementById("budget-days").value, 10),
                travelers: parseInt(document.getElementById("budget-travelers").value, 10) || 1,
                accommodationTier: document.getElementById("budget-accommodation").value,
                transportMode: document.getElementById("budget-transport").value,
                dailyFoodBudget: parseFloat(document.getElementById("budget-food").value) || undefined,
                sightseeing: parseFloat(document.getElementById("budget-sightseeing").value) || 0,
                shopping: parseFloat(document.getElementById("budget-shopping").value) || 0,
                misc: parseFloat(document.getElementById("budget-misc").value) || 0,
            };
        }

        function readTargetBudget() {
            const el = document.getElementById("budget-target");
            return el ? parseFloat(el.value) || 0 : 0;
        }

        function renderAlert(plan, targetBudget) {
            const alert = SmartBudgetPlanner.getBudgetAlert(plan, targetBudget);
            if (!alert) return "";
            return `
                <div class="bp-alert bp-alert-${alert.status}" role="status">
                    <span class="bp-alert-icon">${alert.status === "exceeded" ? "🚨" : alert.status === "warning" ? "⚠️" : "✅"}</span>
                    <span>${alert.message}</span>
                </div>`;
        }

        function renderBar(label, amount, percent, extraClass) {
            return `
                <div class="bp-bar-row">
                    <div class="bp-bar-label">
                        <span>${label}</span>
                        <span>${SmartBudgetPlanner.fmtINR(amount)} <em>(${percent}%)</em></span>
                    </div>
                    <div class="bp-bar-track">
                        <div class="bp-bar-fill ${extraClass || ""}" style="width:${Math.min(100, percent)}%"></div>
                    </div>
                </div>`;
        }

        function renderResults(plan) {
            currentRecommendations = SmartBudgetPlanner.getRecommendations(plan);
            const tiers = SmartBudgetPlanner.compareTiers(plan.inputs);
            const dailyPlan = SmartBudgetPlanner.getDailySpendingPlan(plan);

            const breakdownHtml = Object.keys(plan.categories)
                .map((k) => renderBar(CATEGORY_LABELS[k], plan.categories[k], plan.categoryPercentages[k], "bp-fill-" + k))
                .join("");

            const tiersHtml = tiers
                .map(
                    (t) => `
                    <div class="bp-tier-card ${t.tier === plan.inputs.accommodationTier ? "bp-tier-active" : ""}">
                        <span class="bp-tier-name">${t.tier}</span>
                        <span class="bp-tier-total">${SmartBudgetPlanner.fmtINR(t.total)}</span>
                        <span class="bp-tier-sub">${SmartBudgetPlanner.fmtINR(t.perPersonTotal)} / person</span>
                    </div>`
                )
                .join("");

            const recsHtml = currentRecommendations
                .map(
                    (r) => `
                    <li class="bp-rec-item">
                        <p>${r.message}</p>
                        ${r.potentialSaving > 0 ? `<span class="bp-rec-saving">Potential saving: ${SmartBudgetPlanner.fmtINR(r.potentialSaving)}</span>` : ""}
                    </li>`
                )
                .join("");

            const dailyHtml = Object.keys(dailyPlan)
                .filter((k) => k !== "total")
                .map((k) => `<div class="bp-daily-item"><span>${CATEGORY_LABELS[k] || k}</span><span>${SmartBudgetPlanner.fmtINR(dailyPlan[k])}/day</span></div>`)
                .join("");

            resultsEl.innerHTML = `
                <div class="bp-summary-card">
                    <div class="bp-summary-header">
                        <h3>${plan.matchedDestination || plan.inputs.destination || "Your Trip"} <span class="bp-tier-badge bp-tier-badge-${plan.inputs.accommodationTier}">${plan.inputs.accommodationTier}</span></h3>
                        <span class="bp-total-badge">${SmartBudgetPlanner.fmtINR(plan.total)} total</span>
                    </div>
                    <p class="bp-summary-sub">${plan.inputs.days} day(s) &middot; ${plan.inputs.travelers} traveler(s) &middot; ${SmartBudgetPlanner.fmtINR(plan.perPersonTotal)} per person &middot; ${SmartBudgetPlanner.fmtINR(plan.perDayTotal)} per day</p>

                    ${renderAlert(plan, readTargetBudget())}

                    <h4 class="bp-section-title">Category Breakdown</h4>
                    <div class="bp-breakdown">${breakdownHtml}</div>

                    <h4 class="bp-section-title">Compare Travel Styles</h4>
                    <div class="bp-tier-compare">${tiersHtml}</div>

                    <h4 class="bp-section-title">Daily Spending Guide</h4>
                    <div class="bp-daily-grid">${dailyHtml}</div>

                    <h4 class="bp-section-title">Cost Optimization Suggestions</h4>
                    <ul class="bp-rec-list">${recsHtml}</ul>

                    <div class="bp-actions bp-print-hide">
                        <button type="button" class="btn btn-secondary" id="bp-save-btn">💾 Save Plan</button>
                        <button type="button" class="btn btn-secondary" id="bp-export-btn">⬇️ Export Report</button>
                        <button type="button" class="btn btn-secondary" id="bp-export-pdf-btn">🖨️ Export as PDF</button>
                    </div>
                </div>`;
            resultsEl.hidden = false;

            const saveBtn = document.getElementById("bp-save-btn");
            const exportBtn = document.getElementById("bp-export-btn");
            const exportPdfBtn = document.getElementById("bp-export-pdf-btn");
            if (saveBtn) {
                saveBtn.addEventListener("click", () => {
                    SmartBudgetPlanner.savePlan(currentPlan);
                    renderSavedList();
                    if (window.ToastNotifier) window.ToastNotifier.success("Budget plan saved.");
                });
            }
            if (exportBtn) {
                exportBtn.addEventListener("click", () => exportCurrentPlan());
            }
            if (exportPdfBtn) {
                // No PDF library dependency, consistent with how this project
                // already handles PDF export elsewhere (trip-expense-splitter,
                // trip-planner.js, compare-states-data): a print stylesheet
                // hides everything but the results card, and the browser's
                // own "Save as PDF" print destination produces the file.
                exportPdfBtn.addEventListener("click", () => window.print());
            }
        }

        function exportCurrentPlan() {
            if (!currentPlan) return;
            const alert = SmartBudgetPlanner.getBudgetAlert(currentPlan, readTargetBudget());
            const text = SmartBudgetPlanner.exportReportText(currentPlan, currentRecommendations, alert);
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `budget-plan-${currentPlan.id}.txt`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }

        function renderSavedList() {
            if (!savedListEl) return;
            const plans = SmartBudgetPlanner.getSavedPlans();
            if (!plans.length) {
                savedListEl.innerHTML = `<p class="bp-empty">No saved budget plans yet.</p>`;
                return;
            }
            savedListEl.innerHTML = plans
                .map(
                    (p) => `
                    <div class="bp-saved-card" data-id="${p.id}">
                        <div>
                            <h4>${p.title}</h4>
                            <p>${SmartBudgetPlanner.fmtINR(p.plan.total)} &middot; ${p.plan.inputs.days} day(s) &middot; saved ${new Date(p.savedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="bp-saved-actions">
                            <button type="button" class="btn-icon bp-load-btn" data-id="${p.id}" title="Load">📂</button>
                            <button type="button" class="btn-icon bp-delete-btn" data-id="${p.id}" title="Delete">🗑️</button>
                        </div>
                    </div>`
                )
                .join("");

            savedListEl.querySelectorAll(".bp-delete-btn").forEach((btn) => {
                btn.addEventListener("click", () => {
                    SmartBudgetPlanner.deleteSavedPlan(btn.dataset.id);
                    renderSavedList();
                });
            });
            savedListEl.querySelectorAll(".bp-load-btn").forEach((btn) => {
                btn.addEventListener("click", () => {
                    const plans = SmartBudgetPlanner.getSavedPlans();
                    const record = plans.find((p) => p.id === btn.dataset.id);
                    if (!record) return;
                    currentPlan = record.plan;
                    document.getElementById("budget-destination").value = record.plan.inputs.destination;
                    document.getElementById("budget-days").value = record.plan.inputs.days;
                    document.getElementById("budget-travelers").value = record.plan.inputs.travelers;
                    document.getElementById("budget-accommodation").value = record.plan.inputs.accommodationTier;
                    document.getElementById("budget-transport").value = record.plan.inputs.transportMode;
                    document.getElementById("budget-food").value = record.plan.inputs.dailyFoodBudget;
                    document.getElementById("budget-sightseeing").value = record.plan.inputs.sightseeing;
                    document.getElementById("budget-shopping").value = record.plan.inputs.shopping;
                    document.getElementById("budget-misc").value = record.plan.inputs.misc;
                    renderResults(currentPlan);
                    resultsEl.scrollIntoView({ behavior: "smooth" });
                });
            });
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (errorEl) errorEl.hidden = true;

            const input = readForm();
            if (!input.days || input.days < 1) {
                if (errorEl) {
                    errorEl.textContent = "Please enter a valid number of days.";
                    errorEl.hidden = false;
                }
                return;
            }

            currentPlan = SmartBudgetPlanner.calculateBudget(input);
            renderResults(currentPlan);
            resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        // -- Dynamic forecasting: once a first estimate exists, keep it in
        // sync as the user tweaks any assumption (including the target
        // budget, so the alert banner updates too), without requiring
        // another explicit submit. Debounced on free-text/number fields so
        // it doesn't recompute on every keystroke; instant on selects.
        let recomputeTimer = null;
        function recomputeIfLive(immediate) {
            if (!currentPlan) return; // nothing generated yet — wait for the first submit
            const input = readForm();
            if (!input.days || input.days < 1) return;
            clearTimeout(recomputeTimer);
            const run = () => {
                currentPlan = SmartBudgetPlanner.calculateBudget(input);
                renderResults(currentPlan);
            };
            if (immediate) run();
            else recomputeTimer = setTimeout(run, 400);
        }
        form.querySelectorAll("input, select").forEach((field) => {
            const isSelect = field.tagName === "SELECT";
            field.addEventListener(isSelect ? "change" : "input", () => recomputeIfLive(isSelect));
        });
        const targetBudgetField = document.getElementById("budget-target");
        if (targetBudgetField) {
            targetBudgetField.addEventListener("input", () => recomputeIfLive(false));
        }

        renderSavedList();
        initDestinationCompare();
        initItineraryForecast();
    }

    // --------------------------------------------------------------------
    // Destination comparison section — "budget comparison across
    // destinations" (issue #1028). Reuses the main form's days/travelers/
    // tier/transport/allowances as the shared baseline.
    // --------------------------------------------------------------------
    function initDestinationCompare() {
        const form = document.getElementById("budget-compare-form");
        const resultsEl = document.getElementById("budget-compare-results");
        if (!form || !resultsEl) return;

        const inputs = Array.from(form.querySelectorAll("[data-compare-destination]"));
        const list = document.getElementById("budget-compare-destination-list");
        if (list && Array.isArray(root.tripDestinations)) {
            list.innerHTML = root.tripDestinations.map((d) => `<option value="${d.name}"></option>`).join("");
        }

        function readBaseInput() {
            return {
                days: parseInt(document.getElementById("budget-compare-days").value, 10) || 5,
                travelers: parseInt(document.getElementById("budget-compare-travelers").value, 10) || 1,
                accommodationTier: document.getElementById("budget-compare-accommodation").value,
                transportMode: document.getElementById("budget-compare-transport").value,
            };
        }

        function render() {
            const names = inputs.map((el) => el.value).filter((v) => v && v.trim());
            if (names.length < 2) {
                resultsEl.hidden = true;
                resultsEl.innerHTML = "";
                return;
            }
            const results = SmartBudgetPlanner.compareDestinations(readBaseInput(), names);
            const cheapest = results[0];
            resultsEl.innerHTML = `
                <div class="bp-compare-grid">
                    ${results
                        .map(
                            (r) => `
                        <div class="bp-compare-card ${r.destination === cheapest.destination ? "bp-compare-cheapest" : ""}">
                            ${r.destination === cheapest.destination ? '<span class="bp-compare-badge">Cheapest</span>' : ""}
                            <h4>${r.destination}${!r.matched ? " <small>(estimated)</small>" : ""}</h4>
                            <p class="bp-compare-total">${SmartBudgetPlanner.fmtINR(r.total)}</p>
                            <p class="bp-compare-sub">${SmartBudgetPlanner.fmtINR(r.perPersonTotal)} / person &middot; ${SmartBudgetPlanner.fmtINR(r.perDayTotal)} / day</p>
                        </div>`
                        )
                        .join("")}
                </div>`;
            resultsEl.hidden = false;
        }

        form.addEventListener("input", render);
        form.addEventListener("change", render);
        form.addEventListener("submit", (e) => e.preventDefault());
    }

    // --------------------------------------------------------------------
    // Itinerary forecast section — "dynamic trip cost forecasting" tied
    // to a real, saved Trip Planner itinerary (issue #1028). Recomputes
    // whenever the selected trip or any assumption changes.
    // --------------------------------------------------------------------
    function initItineraryForecast() {
        const select = document.getElementById("budget-itinerary-select");
        const form = document.getElementById("budget-itinerary-form");
        const resultsEl = document.getElementById("budget-itinerary-results");
        if (!select || !form || !resultsEl) return;

        function refreshTripList() {
            if (!root.TripPlanner) {
                select.innerHTML = `<option disabled selected>Trip Planner isn't loaded</option>`;
                select.disabled = true;
                return;
            }
            const trips = root.TripPlanner.getSavedTrips();
            if (!trips.length) {
                select.innerHTML = `<option disabled selected>No saved trips yet — plan one in Trip Planner</option>`;
                select.disabled = true;
                return;
            }
            select.disabled = false;
            select.innerHTML =
                `<option value="" disabled selected>Choose a saved trip…</option>` +
                trips.map((t) => `<option value="${t.id}">${t.title}</option>`).join("");
        }
        refreshTripList();

        function readOptions() {
            return {
                accommodationTier: document.getElementById("budget-itinerary-accommodation").value,
                dailyFoodBudget: parseFloat(document.getElementById("budget-itinerary-food").value) || undefined,
                sightseeing: parseFloat(document.getElementById("budget-itinerary-sightseeing").value) || 0,
                shopping: parseFloat(document.getElementById("budget-itinerary-shopping").value) || 0,
                misc: parseFloat(document.getElementById("budget-itinerary-misc").value) || 0,
            };
        }

        let currentItineraryPlan = null;
        let currentRecs = [];

        function render() {
            if (!select.value || !root.TripPlanner) {
                resultsEl.hidden = true;
                resultsEl.innerHTML = "";
                return;
            }
            const trips = root.TripPlanner.getSavedTrips();
            const record = trips.find((t) => t.id === select.value);
            if (!record) return;

            let plan;
            try {
                plan = SmartBudgetPlanner.calculateItineraryBudget(record.itinerary, readOptions());
            } catch (err) {
                resultsEl.hidden = false;
                resultsEl.innerHTML = `<p class="bp-empty">Couldn't forecast this trip: ${err.message}</p>`;
                return;
            }
            currentItineraryPlan = plan;
            currentRecs = SmartBudgetPlanner.getRecommendations(
                Object.assign({}, plan, { inputs: Object.assign({}, plan.inputs, { transportMode: "train", days: plan.days }) })
            );

            const targetBudget = parseFloat(document.getElementById("budget-itinerary-target").value) || 0;
            const alertHtml = renderAlertStandalone(plan, targetBudget);

            const breakdownHtml = Object.keys(plan.categories)
                .map((k) => renderBarStandalone(CATEGORY_LABELS[k], plan.categories[k], plan.categoryPercentages[k]))
                .join("");

            const perDestHtml = plan.perDestination
                .map(
                    (d) => `
                    <div class="bp-itin-dest-row">
                        <span>${d.name} <small>(${d.days} day${d.days === 1 ? "" : "s"})</small></span>
                        <span>${SmartBudgetPlanner.fmtINR(d.total)}</span>
                    </div>`
                )
                .join("");

            resultsEl.innerHTML = `
                <div class="bp-summary-card">
                    <div class="bp-summary-header">
                        <h3>${plan.tripTitle || "Itinerary Forecast"}</h3>
                        <span class="bp-total-badge">${SmartBudgetPlanner.fmtINR(plan.total)} total</span>
                    </div>
                    <p class="bp-summary-sub">${plan.days} day(s) &middot; ${plan.inputs.travelers} traveler(s) &middot; ${SmartBudgetPlanner.fmtINR(plan.perPersonTotal)} per person &middot; ${SmartBudgetPlanner.fmtINR(plan.perDayTotal)} per day</p>

                    ${alertHtml}

                    <h4 class="bp-section-title">Per-Destination Cost</h4>
                    <div class="bp-itin-dest-list">${perDestHtml}</div>

                    <h4 class="bp-section-title">Category Breakdown</h4>
                    <div class="bp-breakdown">${breakdownHtml}</div>

                    <div class="bp-actions bp-print-hide">
                        <button type="button" class="btn btn-secondary" id="bp-itin-export-btn">⬇️ Export Report</button>
                        <button type="button" class="btn btn-secondary" id="bp-itin-export-pdf-btn">🖨️ Export as PDF</button>
                    </div>
                </div>`;
            resultsEl.hidden = false;

            const exportBtn = document.getElementById("bp-itin-export-btn");
            const exportPdfBtn = document.getElementById("bp-itin-export-pdf-btn");
            if (exportBtn) {
                exportBtn.addEventListener("click", () => {
                    const alert = SmartBudgetPlanner.getBudgetAlert(currentItineraryPlan, targetBudget);
                    const text = SmartBudgetPlanner.exportReportText(currentItineraryPlan, currentRecs, alert);
                    const blob = new Blob([text], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `itinerary-budget-${currentItineraryPlan.id}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                });
            }
            if (exportPdfBtn) {
                exportPdfBtn.addEventListener("click", () => window.print());
            }
        }

        select.addEventListener("change", render);
        form.addEventListener("input", render);
        form.addEventListener("change", render);
        form.addEventListener("submit", (e) => e.preventDefault());

        // If the person saves/edits a trip in Trip Planner in another tab
        // and comes back, the list should reflect it next time this page
        // loads — no live cross-tab sync is attempted (localStorage only,
        // no backend), see docs/BUDGET_PLANNER.md.
    }

    function renderBarStandalone(label, amount, percent) {
        return `
            <div class="bp-bar-row">
                <div class="bp-bar-label">
                    <span>${label}</span>
                    <span>${SmartBudgetPlanner.fmtINR(amount)} <em>(${percent}%)</em></span>
                </div>
                <div class="bp-bar-track">
                    <div class="bp-bar-fill" style="width:${Math.min(100, percent)}%"></div>
                </div>
            </div>`;
    }

    function renderAlertStandalone(plan, targetBudget) {
        const alert = SmartBudgetPlanner.getBudgetAlert(plan, targetBudget);
        if (!alert) return "";
        return `
            <div class="bp-alert bp-alert-${alert.status}" role="status">
                <span class="bp-alert-icon">${alert.status === "exceeded" ? "🚨" : alert.status === "warning" ? "⚠️" : "✅"}</span>
                <span>${alert.message}</span>
            </div>`;
    }

    root.initBudgetPlannerPage = initBudgetPlannerPage;
})(typeof window !== "undefined" ? window : globalThis);
