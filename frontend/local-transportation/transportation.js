/**
 * Smart Local Transportation Planner
 */

(function () {
    "use strict";

    const state = {
        destination: "",
        search: "",
        mode: "all",
        accessibility: "all",
        sort: "recommended",
        compareOne: "",
        compareTwo: ""
    };

    const destinationSelect = document.getElementById("destination-select");
    const destinationMessage = document.getElementById("destination-message");
    const searchInput = document.getElementById("transport-search");
    const modeFilter = document.getElementById("mode-filter");
    const accessibilityFilter = document.getElementById("accessibility-filter");
    const sortSelect = document.getElementById("sort-select");
    const transportGrid = document.getElementById("transport-grid");
    const resultsTitle = document.getElementById("results-title");
    const resultsCount = document.getElementById("results-count");
    const emptyState = document.getElementById("empty-state");
    const resetFiltersButton = document.getElementById("reset-filters");

    const compareOne = document.getElementById("compare-one");
    const compareTwo = document.getElementById("compare-two");
    const comparisonResult = document.getElementById("comparison-result");

    const preferenceSelect = document.getElementById("preference-select");
    const savePreference = document.getElementById("save-preference");
    const preferenceStatus = document.getElementById("preference-status");

    function initialize() {
        populateDestinations();
        loadPreference();
        bindEvents();
        render();
    }

    function populateDestinations() {
        TRANSPORT_DESTINATIONS.forEach(destination => {
            const option = document.createElement("option");
            option.value = destination;
            option.textContent = destination;
            destinationSelect.appendChild(option);
        });
    }

    function bindEvents() {
        destinationSelect.addEventListener("change", event => {
            state.destination = event.target.value;
            state.compareOne = "";
            state.compareTwo = "";

            updateDestinationMessage();
            updateComparisonOptions();
            render();
        });

        searchInput.addEventListener("input", event => {
            state.search = event.target.value.toLowerCase().trim();
            render();
        });

        modeFilter.addEventListener("change", event => {
            state.mode = event.target.value;
            render();
        });

        accessibilityFilter.addEventListener("change", event => {
            state.accessibility = event.target.value;
            render();
        });

        sortSelect.addEventListener("change", event => {
            state.sort = event.target.value;
            render();
        });

        resetFiltersButton.addEventListener("click", resetFilters);

        compareOne.addEventListener("change", event => {
            state.compareOne = event.target.value;
            renderComparison();
        });

        compareTwo.addEventListener("change", event => {
            state.compareTwo = event.target.value;
            renderComparison();
        });

        savePreference.addEventListener("click", saveUserPreference);
    }

    function getCurrentOptions() {
        if (!state.destination) {
            return [];
        }

        return TRANSPORTATION_DATA[state.destination] || [];
    }

    function filterOptions(options) {
        return options.filter(option => {

            const matchesSearch =
                !state.search ||
                option.name.toLowerCase().includes(state.search) ||
                option.type.toLowerCase().includes(state.search) ||
                option.description.toLowerCase().includes(state.search);

            const matchesMode =
                state.mode === "all" ||
                option.type === state.mode;

            const matchesAccessibility =
                state.accessibility === "all" ||
                option.accessibility === state.accessibility;

            return (
                matchesSearch &&
                matchesMode &&
                matchesAccessibility
            );
        });
    }

    function sortOptions(options) {
        const sorted = [...options];

        switch (state.sort) {

            case "cost-low":
                return sorted.sort(
                    (a, b) => a.costMin - b.costMin
                );

            case "time-low":
                return sorted.sort(
                    (a, b) => a.duration - b.duration
                );

            case "eco-high":
                return sorted.sort(
                    (a, b) => b.ecoScore - a.ecoScore
                );

            case "convenience-high":
                return sorted.sort(
                    (a, b) => b.convenience - a.convenience
                );

            default:
                return sorted.sort(
                    (a, b) =>
                        (b.convenience + b.ecoScore) -
                        (a.convenience + a.ecoScore)
                );
        }
    }

    function render() {
        const filtered = sortOptions(
            filterOptions(getCurrentOptions())
        );

        resultsTitle.textContent =
            state.destination
                ? `${state.destination} Transportation`
                : "Transportation";

        resultsCount.textContent =
            `${filtered.length} option${filtered.length === 1 ? "" : "s"}`;

        if (!state.destination) {
            transportGrid.innerHTML = "";
            emptyState.classList.remove("hidden");

            emptyState.querySelector("h3").textContent =
                "Select a destination";

            emptyState.querySelector("p").textContent =
                "Choose an Indian destination above to discover local transportation.";

            return;
        }

        if (!filtered.length) {
            transportGrid.innerHTML = "";
            emptyState.classList.remove("hidden");

            emptyState.querySelector("h3").textContent =
                "No transportation options found";

            emptyState.querySelector("p").textContent =
                "Try changing your search or filters.";

            return;
        }

        emptyState.classList.add("hidden");

        transportGrid.innerHTML =
            filtered.map(createTransportCard).join("");

        updateComparisonOptions();
    }

    function createTransportCard(option) {
        const accessibilityBadge =
            option.accessibility === "yes"
                ? `<span class="badge badge-accessible">♿ Accessible</span>`
                : `<span class="badge badge-partial">♿ Partial Access</span>`;

        const ecoBadge =
            option.ecoScore >= 4
                ? `<span class="badge badge-eco">🌱 Eco Friendly</span>`
                : "";

        const suitable =
            option.suitableFor.slice(0, 3).join(" · ");

        return `
            <article class="transport-card">

                <div class="transport-top">
                    <div class="transport-icon">
                        ${option.icon}
                    </div>

                    <span class="transport-type">
                        ${formatType(option.type)}
                    </span>
                </div>

                <h3>${escapeHtml(option.name)}</h3>

                <p class="transport-description">
                    ${escapeHtml(option.description)}
                </p>

                <div class="transport-details">

                    <div class="detail">
                        <span>Estimated Fare</span>
                        <strong>
                            ₹${option.costMin} – ₹${option.costMax}
                        </strong>
                    </div>

                    <div class="detail">
                        <span>Travel Time</span>
                        <strong>
                            ~${option.duration} min
                        </strong>
                    </div>

                    <div class="detail">
                        <span>Operating Hours</span>
                        <strong>
                            ${escapeHtml(option.hours)}
                        </strong>
                    </div>

                    <div class="detail">
                        <span>Convenience</span>
                        <strong>
                            ${"★".repeat(option.convenience)}
                        </strong>
                    </div>

                </div>

                <div class="badges">
                    ${accessibilityBadge}
                    ${ecoBadge}
                </div>

                <div class="suitable-for">
                    <strong>Best for:</strong>
                    ${escapeHtml(suitable)}
                </div>

                <div class="card-actions">
                    <button
                        class="secondary-btn"
                        onclick="selectForComparison('${option.id}')">
                        Compare
                    </button>
                </div>

            </article>
        `;
    }

    function updateComparisonOptions() {
        const options = getCurrentOptions();

        const currentOne = state.compareOne;
        const currentTwo = state.compareTwo;

        compareOne.innerHTML =
            `<option value="">Select option</option>` +
            options.map(option =>
                `<option value="${option.id}">
                    ${escapeHtml(option.name)}
                </option>`
            ).join("");

        compareTwo.innerHTML =
            `<option value="">Select option</option>` +
            options.map(option =>
                `<option value="${option.id}">
                    ${escapeHtml(option.name)}
                </option>`
            ).join("");

        compareOne.value =
            options.some(o => o.id === currentOne)
                ? currentOne
                : "";

        compareTwo.value =
            options.some(o => o.id === currentTwo)
                ? currentTwo
                : "";
    }

    function renderComparison() {
        if (!state.compareOne || !state.compareTwo) {
            comparisonResult.classList.add("hidden");
            comparisonResult.innerHTML = "";
            return;
        }

        if (state.compareOne === state.compareTwo) {
            comparisonResult.classList.remove("hidden");

            comparisonResult.innerHTML = `
                <div style="padding:30px;text-align:center;">
                    <h3>Please select two different options.</h3>
                </div>
            `;

            return;
        }

        const options = getCurrentOptions();

        const first = options.find(
            option => option.id === state.compareOne
        );

        const second = options.find(
            option => option.id === state.compareTwo
        );

        if (!first || !second) {
            comparisonResult.classList.add("hidden");
            return;
        }

        comparisonResult.classList.remove("hidden");

        comparisonResult.innerHTML = `
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>${escapeHtml(first.name)}</th>
                        <th>${escapeHtml(second.name)}</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>Type</td>
                        <td>${formatType(first.type)}</td>
                        <td>${formatType(second.type)}</td>
                    </tr>

                    <tr>
                        <td>Estimated Fare</td>
                        <td>₹${first.costMin} – ₹${first.costMax}</td>
                        <td>₹${second.costMin} – ₹${second.costMax}</td>
                    </tr>

                    <tr>
                        <td>Estimated Duration</td>
                        <td class="${first.duration < second.duration ? "winner" : ""}">
                            ${first.duration} min
                            ${first.duration < second.duration ? " ✓" : ""}
                        </td>
                        <td class="${second.duration < first.duration ? "winner" : ""}">
                            ${second.duration} min
                            ${second.duration < first.duration ? " ✓" : ""}
                        </td>
                    </tr>

                    <tr>
                        <td>Accessibility</td>
                        <td>${accessibilityLabel(first)}</td>
                        <td>${accessibilityLabel(second)}</td>
                    </tr>

                    <tr>
                        <td>Eco Score</td>
                        <td class="${first.ecoScore > second.ecoScore ? "winner" : ""}">
                            ${first.ecoScore}/5
                        </td>
                        <td class="${second.ecoScore > first.ecoScore ? "winner" : ""}">
                            ${second.ecoScore}/5
                        </td>
                    </tr>

                    <tr>
                        <td>Convenience</td>
                        <td>${first.convenience}/5</td>
                        <td>${second.convenience}/5</td>
                    </tr>

                    <tr>
                        <td>Operating Hours</td>
                        <td>${escapeHtml(first.hours)}</td>
                        <td>${escapeHtml(second.hours)}</td>
                    </tr>

                </tbody>
            </table>
        `;
    }

    function selectForComparison(id) {
        if (!state.compareOne) {
            state.compareOne = id;
        } else if (!state.compareTwo && state.compareOne !== id) {
            state.compareTwo = id;
        } else {
            state.compareOne = id;
            state.compareTwo = "";
        }

        updateComparisonOptions();
        renderComparison();

        document
            .querySelector(".comparison-section")
            ?.scrollIntoView({
                behavior: "smooth"
            });
    }

    window.selectForComparison = selectForComparison;

    function updateDestinationMessage() {
        if (!state.destination) {
            destinationMessage.textContent =
                "Select a destination to view transportation options.";
            return;
        }

        const count =
            (TRANSPORTATION_DATA[state.destination] || []).length;

        destinationMessage.textContent =
            `${state.destination} has ${count} transportation options in the current dataset.`;
    }

    function resetFilters() {
        state.search = "";
        state.mode = "all";
        state.accessibility = "all";
        state.sort = "recommended";

        searchInput.value = "";
        modeFilter.value = "all";
        accessibilityFilter.value = "all";
        sortSelect.value = "recommended";

        render();
    }

    function saveUserPreference() {
        const value = preferenceSelect.value;

        if (!value) {
            localStorage.removeItem(
                "iie_transport_preference"
            );

            preferenceStatus.textContent =
                "Transportation preference cleared.";

            return;
        }

        localStorage.setItem(
            "iie_transport_preference",
            value
        );

        preferenceStatus.textContent =
            `Saved preference: ${formatType(value)}.`;
    }

    function loadPreference() {
        const saved =
            localStorage.getItem(
                "iie_transport_preference"
            );

        if (saved) {
            preferenceSelect.value = saved;
            preferenceStatus.textContent =
                `Saved preference: ${formatType(saved)}.`;
        }
    }

    function accessibilityLabel(option) {
        if (option.accessibility === "yes") {
            return "♿ Fully Accessible";
        }

        if (option.accessibility === "partial") {
            return "♿ Partially Accessible";
        }

        return "Not specified";
    }

    function formatType(type) {
        const labels = {
            metro: "Metro",
            bus: "Bus",
            train: "Train",
            auto: "Auto-rickshaw",
            taxi: "Taxi",
            ferry: "Ferry",
            bike: "Bike / Cycle"
        };

        return labels[type] || type;
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    /*
     * Exported helpers make the core logic easy to unit test.
     */
    window.TransportationPlanner = {
        filterOptions,
        sortOptions,
        formatType,
        accessibilityLabel
    };

    initialize();

})();