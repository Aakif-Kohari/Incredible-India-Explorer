(function () {
    "use strict";

    const state = {
        destination: "all",
        travelStyle: "all",
        budget: "all",
        type: "all",
        amenities: [],
        comparison: []
    };

    const destinationSelect =
        document.getElementById("destination");

    const travelStyleSelect =
        document.getElementById("travel-style");

    const budgetSelect =
        document.getElementById("budget");

    const typeSelect =
        document.getElementById("type");

    const grid =
        document.getElementById("accommodation-grid");

    const resultCount =
        document.getElementById("result-count");

    const recommendationMessage =
        document.getElementById("recommendation-message");

    const emptyState =
        document.getElementById("empty-state");

    const clearFiltersButton =
        document.getElementById("clear-filters");

    const emptyClearButton =
        document.getElementById("empty-clear");

    const comparisonPanel =
        document.getElementById("comparison-panel");

    const comparisonContent =
        document.getElementById("comparison-content");

    const closeComparisonButton =
        document.getElementById("close-comparison");

    const toast =
        document.getElementById("toast");


    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2400);
    }


    function formatPrice(value) {
        return new Intl.NumberFormat("en-IN").format(value);
    }


    function getDestinationOptions() {
        const cities = [
            ...new Set(
                accommodationData.map(
                    item => `${item.city}|${item.state}`
                )
            )
        ];

        cities
            .sort()
            .forEach(value => {

                const [city, state] =
                    value.split("|");

                const option =
                    document.createElement("option");

                option.value = city.toLowerCase();

                option.textContent =
                    `${city}, ${state}`;

                destinationSelect.appendChild(option);
            });
    }


    function getSelectedAmenities() {
        return Array.from(
            document.querySelectorAll(
                ".amenity-checkbox:checked"
            )
        ).map(input => input.value);
    }


    function calculateScore(item) {
        let score = 0;

        if (
            state.destination !== "all" &&
            item.city.toLowerCase() === state.destination
        ) {
            score += 30;
        }

        if (
            state.travelStyle !== "all" &&
            item.suitableFor.includes(state.travelStyle)
        ) {
            score += 20;
        }

        if (
            state.budget !== "all" &&
            item.price <= Number(state.budget)
        ) {
            score += 20;
        }

        if (
            state.type !== "all" &&
            item.type === state.type
        ) {
            score += 10;
        }

        const matchingAmenities =
            state.amenities.filter(
                amenity =>
                    item.amenities.includes(amenity)
            );

        score +=
            matchingAmenities.length * 5;

        score += item.rating * 2;

        score -= item.distance;

        return Math.round(score * 10) / 10;
    }


    function getRecommendationText(item) {
        const reasons = [];

        if (
            state.destination !== "all" &&
            item.city.toLowerCase() === state.destination
        ) {
            reasons.push("matches your destination");
        }

        if (
            state.travelStyle !== "all" &&
            item.suitableFor.includes(state.travelStyle)
        ) {
            reasons.push(
                `suits ${state.travelStyle} travel`
            );
        }

        if (
            state.budget !== "all" &&
            item.price <= Number(state.budget)
        ) {
            reasons.push("fits your budget");
        }

        if (item.rating >= 4.6) {
            reasons.push("has a high guest rating");
        }

        if (item.distance <= 2) {
            reasons.push("is close to attractions");
        }

        if (reasons.length === 0) {
            return "Recommended based on rating, price and location.";
        }

        return `Recommended because it ${reasons.slice(0, 3).join(", ")}.`;
    }


    function filterAndRank() {

        state.destination =
            destinationSelect.value;

        state.travelStyle =
            travelStyleSelect.value;

        state.budget =
            budgetSelect.value;

        state.type =
            typeSelect.value;

        state.amenities =
            getSelectedAmenities();


        const filtered =
            accommodationData
                .filter(item => {

                    if (
                        state.destination !== "all" &&
                        item.city.toLowerCase() !==
                        state.destination
                    ) {
                        return false;
                    }

                    if (
                        state.travelStyle !== "all" &&
                        !item.suitableFor.includes(
                            state.travelStyle
                        )
                    ) {
                        return false;
                    }

                    if (
                        state.budget !== "all" &&
                        item.price >
                        Number(state.budget)
                    ) {
                        return false;
                    }

                    if (
                        state.type !== "all" &&
                        item.type !== state.type
                    ) {
                        return false;
                    }

                    const hasAllAmenities =
                        state.amenities.every(
                            amenity =>
                                item.amenities.includes(
                                    amenity
                                )
                        );

                    return hasAllAmenities;
                })
                .map(item => ({
                    ...item,
                    score: calculateScore(item)
                }))
                .sort(
                    (a, b) =>
                        b.score - a.score
                );


        render(filtered);
    }


    function render(items) {

        resultCount.textContent =
            `${items.length} ${items.length === 1 ? "stay" : "stays"}`;


        if (items.length === 0) {

            grid.innerHTML = "";

            emptyState.hidden = false;

            recommendationMessage.textContent =
                "Try adjusting your filters.";

            return;
        }


        emptyState.hidden = true;

        recommendationMessage.textContent =
            "Results are ranked according to your preferences.";


        grid.innerHTML =
            items.map(renderCard).join("");


        attachCardEvents();
    }


    function renderCard(item) {

        const saved =
            window.Journey &&
            window.Journey.isSaved(item.id);


        const amenityLabels = {
            wifi: "Wi-Fi",
            pool: "Pool",
            parking: "Parking",
            restaurant: "Restaurant",
            ac: "AC"
        };


        return `
            <article
                class="accommodation-card"
                data-id="${item.id}"
            >

                <div class="accommodation-media">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        loading="lazy"
                    >

                    <span class="type-badge">
                        ${item.type}
                    </span>

                    <button
                        type="button"
                        class="bookmark-button ${saved ? "saved" : ""}"
                        data-action="bookmark"
                        data-id="${item.id}"
                        aria-pressed="${saved}"
                        aria-label="${saved ? "Remove from" : "Save to"} My Journey"
                    >
                        ${saved ? "★" : "☆"}
                    </button>

                </div>


                <div class="accommodation-body">

                    <h3>${item.name}</h3>

                    <p class="location">
                        ${item.city}, ${item.state}
                    </p>


                    <div class="rating-row">

                        <span class="rating">
                            ${item.rating.toFixed(1)}
                        </span>

                        <span class="distance">
                            ${item.distance} km from major attractions
                        </span>

                    </div>


                    <div class="price">

                        <strong>
                            ₹${formatPrice(item.price)}
                        </strong>

                        <span>
                            / night
                        </span>

                    </div>


                    <p class="description">
                        ${item.description}
                    </p>


                    <div class="amenity-list">

                        ${item.amenities
                            .map(
                                amenity =>
                                    `<span class="amenity">
                                        ${amenityLabels[amenity] || amenity}
                                    </span>`
                            )
                            .join("")}

                    </div>


                    <div class="recommendation">
                        ${getRecommendationText(item)}
                    </div>


                    <div class="card-actions">

                        <button
                            type="button"
                            class="compare-button"
                            data-action="compare"
                            data-id="${item.id}"
                        >
                            Compare
                        </button>

                        <button
                            type="button"
                            data-action="journey"
                            data-id="${item.id}"
                        >
                            Add to Journey
                        </button>

                    </div>

                </div>

            </article>
        `;
    }


    function attachCardEvents() {

        document
            .querySelectorAll("[data-action]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset.id;

                        const item =
                            accommodationData.find(
                                accommodation =>
                                    accommodation.id === id
                            );

                        if (!item) {
                            return;
                        }


                        if (
                            button.dataset.action ===
                            "bookmark"
                        ) {
                            toggleJourney(item);
                        }


                        if (
                            button.dataset.action ===
                            "journey"
                        ) {
                            toggleJourney(item);
                        }


                        if (
                            button.dataset.action ===
                            "compare"
                        ) {
                            toggleComparison(item);
                        }

                    }
                );

            });
    }


    function toggleJourney(item) {

        if (!window.Journey) {
            showToast(
                "My Journey is not available."
            );

            return;
        }


        const saved =
            window.Journey.toggle({

                id: item.id,

                explorerPage:
                    "accommodation.html",

                title: item.name,

                thumbnail: item.image,

                category:
                    `Accommodation • ${item.type}`,

                description:
                    item.description,

                link:
                    `accommodation.html#${item.id}`
            });


        showToast(
            saved
                ? `${item.name} added to My Journey.`
                : `${item.name} removed from My Journey.`
        );


        filterAndRank();
    }


    function toggleComparison(item) {

        const index =
            state.comparison.findIndex(
                selected =>
                    selected.id === item.id
            );


        if (index >= 0) {

            state.comparison.splice(
                index,
                1
            );

            showToast(
                `${item.name} removed from comparison.`
            );

        } else {

            if (state.comparison.length >= 3) {

                showToast(
                    "You can compare up to 3 stays."
                );

                return;
            }

            state.comparison.push(item);

            showToast(
                `${item.name} added to comparison.`
            );
        }


        renderComparison();
    }


    function renderComparison() {

        if (
            state.comparison.length === 0
        ) {

            comparisonPanel.hidden = true;

            return;
        }


        comparisonPanel.hidden = false;


        comparisonContent.innerHTML =
            state.comparison
                .map(item => {

                    const amenities =
                        item.amenities
                            .map(
                                amenity =>
                                    amenity
                            )
                            .join(", ");


                    return `
                        <article class="comparison-card">

                            <span class="section-badge">
                                ${item.type}
                            </span>

                            <h3>
                                ${item.name}
                            </h3>

                            <div class="comparison-row">
                                <span>Location</span>
                                <strong>
                                    ${item.city}
                                </strong>
                            </div>

                            <div class="comparison-row">
                                <span>Price</span>
                                <strong>
                                    ₹${formatPrice(item.price)}
                                </strong>
                            </div>

                            <div class="comparison-row">
                                <span>Rating</span>
                                <strong>
                                    ${item.rating.toFixed(1)}
                                </strong>
                            </div>

                            <div class="comparison-row">
                                <span>Distance</span>
                                <strong>
                                    ${item.distance} km
                                </strong>
                            </div>

                            <div class="comparison-row">
                                <span>Amenities</span>
                                <strong>
                                    ${amenities}
                                </strong>
                            </div>

                            <button
                                type="button"
                                class="secondary-button remove-comparison"
                                data-id="${item.id}"
                            >
                                Remove
                            </button>

                        </article>
                    `;

                })
                .join("");


        document
            .querySelectorAll(
                ".remove-comparison"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset.id;

                        state.comparison =
                            state.comparison.filter(
                                item =>
                                    item.id !== id
                            );

                        renderComparison();
                    }
                );

            });
    }


    function clearFilters() {

        destinationSelect.value = "all";
        travelStyleSelect.value = "all";
        budgetSelect.value = "all";
        typeSelect.value = "all";


        document
            .querySelectorAll(
                ".amenity-checkbox"
            )
            .forEach(
                checkbox =>
                    checkbox.checked = false
            );


        state.amenities = [];

        filterAndRank();
    }


    [
        destinationSelect,
        travelStyleSelect,
        budgetSelect,
        typeSelect
    ].forEach(select => {

        select.addEventListener(
            "change",
            filterAndRank
        );

    });


    document
        .querySelectorAll(
            ".amenity-checkbox"
        )
        .forEach(checkbox => {

            checkbox.addEventListener(
                "change",
                filterAndRank
            );

        });


    clearFiltersButton.addEventListener(
        "click",
        clearFilters
    );


    emptyClearButton.addEventListener(
        "click",
        clearFilters
    );


    closeComparisonButton.addEventListener(
        "click",
        () => {
            comparisonPanel.hidden = true;
        }
    );


    function initializeJourneySearch() {

        if (!window.Journey) {
            return;
        }


        window.Journey.registerSearchItems(
            "accommodation.html",
            accommodationData.map(item => ({

                id: item.id,

                title: item.name,

                description:
                    `${item.city}, ${item.state}. ${item.description}`,

                category:
                    `Accommodation • ${item.type}`,

                image: item.image,

                link:
                    `accommodation.html#${item.id}`
            }))
        );

    }


    function init() {

        getDestinationOptions();

        initializeJourneySearch();

        filterAndRank();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();