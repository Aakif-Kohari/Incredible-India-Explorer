/**
 * accessibility.js
 *
 * Smart Travel Health and Accessibility Information System
 *
 * Responsibilities:
 * - Accessibility preference management
 * - Destination filtering
 * - Accessibility-aware recommendations
 * - Medical facility discovery
 * - Transport information
 * - Itinerary management
 * - Community accessibility reviews
 * - LocalStorage persistence
 */

(function () {

    "use strict";


    /* ============================================================
       STORAGE
    ============================================================ */

    const STORAGE_KEYS = {
        preferences: "iie_accessibility_preferences",
        itinerary: "iie_accessibility_itinerary",
        reviews: "iie_accessibility_reviews"
    };


    /* ============================================================
       STATE
    ============================================================ */

    let state = {
        preferences: [],
        itinerary: [],
        reviews: []
    };


    /* ============================================================
       DOM HELPERS
    ============================================================ */

    function $(selector) {
        return document.querySelector(selector);
    }


    function $all(selector) {
        return Array.from(document.querySelectorAll(selector));
    }


    function showToast(message) {

        const toast = $("#toast");

        if (!toast) {
            return;
        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(function () {

            toast.classList.remove("show");

        }, 3000);
    }


    /* ============================================================
       STORAGE HELPERS
    ============================================================ */

    function loadStorage() {

        try {

            const preferences =
                localStorage.getItem(
                    STORAGE_KEYS.preferences
                );

            const itinerary =
                localStorage.getItem(
                    STORAGE_KEYS.itinerary
                );

            const reviews =
                localStorage.getItem(
                    STORAGE_KEYS.reviews
                );


            state.preferences =
                preferences
                    ? JSON.parse(preferences)
                    : [];


            state.itinerary =
                itinerary
                    ? JSON.parse(itinerary)
                    : [];


            state.reviews =
                reviews
                    ? JSON.parse(reviews)
                    : [];


        } catch (error) {

            console.warn(
                "Accessibility storage unavailable:",
                error
            );

            state.preferences = [];
            state.itinerary = [];
            state.reviews = [];
        }
    }


    function saveStorage() {

        try {

            localStorage.setItem(
                STORAGE_KEYS.preferences,
                JSON.stringify(state.preferences)
            );


            localStorage.setItem(
                STORAGE_KEYS.itinerary,
                JSON.stringify(state.itinerary)
            );


            localStorage.setItem(
                STORAGE_KEYS.reviews,
                JSON.stringify(state.reviews)
            );

        } catch (error) {

            console.warn(
                "Could not save accessibility data:",
                error
            );
        }
    }


    /* ============================================================
       INITIALIZATION
    ============================================================ */

    function init() {

        loadStorage();

        initializeMobileMenu();

        populateStateFilter();

        populateReviewDestinationFilter();

        restorePreferences();

        renderDestinations();

        renderRecommendations();

        renderItinerary();

        renderMedicalFacilities();

        renderTransport();

        renderReviews();

        bindEvents();

    }


    /* ============================================================
       MOBILE NAVIGATION
    ============================================================ */

    function initializeMobileMenu() {

        const button = $("#mobile-menu-btn");

        const nav = document.querySelector(".nav-links");

        if (!button || !nav) {
            return;
        }


        button.addEventListener("click", function () {

            nav.classList.toggle("open");

        });

    }


    /* ============================================================
       PREFERENCES
    ============================================================ */

    function getSelectedPreferences() {

        return $all(".preference-checkbox")
            .filter(function (checkbox) {
                return checkbox.checked;
            })
            .map(function (checkbox) {
                return checkbox.value;
            });

    }


    function restorePreferences() {

        const preferences =
            state.preferences || [];


        $all(".preference-checkbox")
            .forEach(function (checkbox) {

                checkbox.checked =
                    preferences.includes(
                        checkbox.value
                    );

            });

    }


    function savePreferences() {

        state.preferences =
            getSelectedPreferences();


        saveStorage();

        renderDestinations();

        renderRecommendations();

        showToast(
            "Accessibility preferences saved."
        );

    }


    function clearPreferences() {

        state.preferences = [];

        $all(".preference-checkbox")
            .forEach(function (checkbox) {
                checkbox.checked = false;
            });


        saveStorage();

        renderDestinations();

        renderRecommendations();

        showToast(
            "Accessibility preferences cleared."
        );

    }


    /* ============================================================
       FILTER DROPDOWNS
    ============================================================ */

    function populateStateFilter() {

        const select = $("#state-filter");

        if (!select) {
            return;
        }


        const states =
            [...new Set(
                accessibilityDestinations.map(
                    function (destination) {
                        return destination.state;
                    }
                )
            )].sort();


        states.forEach(function (stateName) {

            const option =
                document.createElement("option");

            option.value = stateName;

            option.textContent = stateName;

            select.appendChild(option);

        });

    }


    function populateReviewDestinationFilter() {

        const select =
            $("#review-destination");

        if (!select) {
            return;
        }


        accessibilityDestinations.forEach(
            function (destination) {

                const option =
                    document.createElement("option");

                option.value = destination.id;

                option.textContent =
                    `${destination.name} — ${destination.city}`;

                select.appendChild(option);

            }
        );

    }


    /* ============================================================
       ACCESSIBILITY MATCHING
    ============================================================ */

    function matchesPreferences(destination) {

        if (!state.preferences.length) {
            return true;
        }


        return state.preferences.every(
            function (preference) {

                return Boolean(
                    destination.accessibility &&
                    destination.accessibility[preference]
                );

            }
        );

    }


    function preferenceMatchCount(destination) {

        if (!state.preferences.length) {
            return 0;
        }


        return state.preferences.reduce(
            function (count, preference) {

                return count +
                    (
                        destination.accessibility &&
                        destination.accessibility[preference]
                            ? 1
                            : 0
                    );

            },
            0
        );

    }


    /* ============================================================
       DESTINATION FILTERING
    ============================================================ */

    function getFilteredDestinations() {

        const stateFilter =
            $("#state-filter")?.value || "all";


        const accessibilityFilter =
            $("#accessibility-filter")?.value || "all";


        const search =
            (
                $("#search-destination")?.value || ""
            )
                .trim()
                .toLowerCase();


        return accessibilityDestinations.filter(
            function (destination) {

                if (
                    stateFilter !== "all" &&
                    destination.state !== stateFilter
                ) {
                    return false;
                }


                if (search) {

                    const searchable =
                        [
                            destination.name,
                            destination.city,
                            destination.state,
                            destination.type,
                            destination.description
                        ]
                            .join(" ")
                            .toLowerCase();


                    if (!searchable.includes(search)) {
                        return false;
                    }
                }


                const accessibility =
                    destination.accessibility;


                if (
                    accessibilityFilter ===
                    "wheelchair" &&
                    !accessibility.wheelchair
                ) {
                    return false;
                }


                if (
                    accessibilityFilter ===
                    "high" &&
                    destination.accessibilityScore < 80
                ) {
                    return false;
                }


                if (
                    accessibilityFilter ===
                    "medical" &&
                    (!destination.nearbyMedical ||
                        destination.nearbyMedical.length === 0)
                ) {
                    return false;
                }


                if (
                    accessibilityFilter ===
                    "low-walking" &&
                    !accessibility.lowWalking
                ) {
                    return false;
                }


                if (
                    state.preferences.length &&
                    !matchesPreferences(destination)
                ) {
                    return false;
                }


                return true;

            }
        );

    }


    /* ============================================================
       DESTINATION RENDERING
    ============================================================ */

    function renderDestinations() {

        const grid =
            $("#destination-grid");

        const empty =
            $("#no-destinations");


        if (!grid) {
            return;
        }


        const destinations =
            getFilteredDestinations();


        grid.innerHTML = "";


        if (!destinations.length) {

            if (empty) {
                empty.classList.remove("hidden");
            }

            return;
        }


        if (empty) {
            empty.classList.add("hidden");
        }


        destinations.forEach(
            function (destination) {

                grid.appendChild(
                    createDestinationCard(
                        destination
                    )
                );

            }
        );

    }


    function createDestinationCard(destination) {

        const card =
            document.createElement("article");

        card.className =
            "destination-card";


        const a =
            destination.accessibility;


        const badges = [];


        if (a.wheelchair) {
            badges.push(
                '<span class="badge good">♿ Wheelchair</span>'
            );
        }


        if (a.accessibleEntrance) {
            badges.push(
                '<span class="badge good">✓ Accessible Entrance</span>'
            );
        }


        if (a.elevator) {
            badges.push(
                '<span class="badge good">🛗 Elevator</span>'
            );
        }


        if (a.accessibleRestroom) {
            badges.push(
                '<span class="badge good">🚻 Accessible Restroom</span>'
            );
        }


        if (a.accessibleParking) {
            badges.push(
                '<span class="badge good">🅿️ Parking</span>'
            );
        }


        if (a.lowWalking) {
            badges.push(
                '<span class="badge good">🚶 Low Walking</span>'
            );
        }


        if (a.accessibleTransport) {
            badges.push(
                '<span class="badge good">🚌 Transport</span>'
            );
        }


        const matchCount =
            preferenceMatchCount(destination);


        card.innerHTML = `

            <div class="destination-top">

                <div class="destination-title-row">

                    <div>

                        <h3>
                            ${escapeHTML(destination.name)}
                        </h3>

                        <div class="destination-location">
                            📍 ${escapeHTML(destination.city)},
                            ${escapeHTML(destination.state)}
                        </div>

                    </div>

                    <div
                        class="accessibility-score"
                        title="Accessibility score">

                        ${destination.accessibilityScore}

                    </div>

                </div>

            </div>


            <div class="destination-body">

                <p class="destination-description">
                    ${escapeHTML(destination.description)}
                </p>


                <div class="badges">
                    ${badges.join("")}
                </div>


                ${
                    state.preferences.length
                        ? `
                            <div class="destination-meta">
                                <span>
                                    Preference match
                                </span>

                                <strong>
                                    ${matchCount}/${state.preferences.length}
                                </strong>
                            </div>
                        `
                        : ""
                }


                <div class="destination-meta">

                    <span>
                        🚶 ${escapeHTML(destination.walkingLevel)}
                    </span>

                    <span>
                        🏥 ${destination.nearbyMedical.length}
                        nearby
                    </span>

                </div>


                <div class="destination-actions">

                    <button
                        type="button"
                        data-action="details"
                        data-id="${destination.id}">
                        View Details
                    </button>

                    <button
                        type="button"
                        data-action="add"
                        data-id="${destination.id}">
                        + Itinerary
                    </button>

                </div>

            </div>

        `;


        return card;

    }


    /* ============================================================
       DESTINATION DETAILS
    ============================================================ */

    function showDestinationDetails(destinationId) {

        const destination =
            accessibilityDestinations.find(
                function (item) {
                    return item.id === destinationId;
                }
            );


        if (!destination) {
            return;
        }


        const facilities =
            destination.facilities
                .map(function (facility) {
                    return `• ${facility}`;
                })
                .join("\n");


        const medical =
            destination.nearbyMedical
                .map(function (facility) {
                    return `• ${facility}`;
                })
                .join("\n");


        alert(
            `${destination.name}\n\n` +
            `${destination.city}, ${destination.state}\n\n` +
            `Accessibility Score: ${destination.accessibilityScore}/100\n\n` +
            `Accessibility Facilities:\n${facilities}\n\n` +
            `Nearby Medical Facilities:\n${medical}\n\n` +
            `Walking Requirement: ${destination.walkingLevel}`
        );

    }


    /* ============================================================
       ITINERARY RECOMMENDATIONS
    ============================================================ */

    function renderRecommendations() {

        const container =
            $("#itinerary-recommendations");


        if (!container) {
            return;
        }


        let destinations =
            accessibilityDestinations.slice();


        if (state.preferences.length) {

            destinations =
                destinations
                    .filter(matchesPreferences)
                    .sort(
                        function (a, b) {

                            const matchDifference =
                                preferenceMatchCount(b) -
                                preferenceMatchCount(a);


                            if (matchDifference !== 0) {
                                return matchDifference;
                            }


                            return (
                                b.accessibilityScore -
                                a.accessibilityScore
                            );

                        }
                    );

        } else {

            destinations.sort(
                function (a, b) {
                    return (
                        b.accessibilityScore -
                        a.accessibilityScore
                    );
                }
            );

        }


        destinations =
            destinations.slice(0, 5);


        container.innerHTML = "";


        if (!destinations.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <div>🧩</div>
                    <p>
                        No destinations match all of your
                        selected requirements.
                    </p>
                </div>
            `;

            return;
        }


        destinations.forEach(
            function (destination) {

                const item =
                    document.createElement("div");

                item.className =
                    "recommendation-item";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${escapeHTML(destination.name)}
                        </strong>

                        <small>
                            ${escapeHTML(destination.city)}
                            · Accessibility
                            ${destination.accessibilityScore}/100
                        </small>

                    </div>


                    <button
                        class="small-btn"
                        data-action="recommend-add"
                        data-id="${destination.id}">

                        Add

                    </button>

                `;


                container.appendChild(item);

            }
        );

    }


    /* ============================================================
       ITINERARY
    ============================================================ */

    function addToItinerary(destinationId) {

        if (
            state.itinerary.includes(destinationId)
        ) {

            showToast(
                "This destination is already in your itinerary."
            );

            return;
        }


        state.itinerary.push(destinationId);

        saveStorage();

        renderItinerary();

        showToast(
            "Destination added to your itinerary."
        );

    }


    function removeFromItinerary(destinationId) {

        state.itinerary =
            state.itinerary.filter(
                function (id) {
                    return id !== destinationId;
                }
            );


        saveStorage();

        renderItinerary();

        showToast(
            "Destination removed."
        );

    }


    function clearItinerary() {

        state.itinerary = [];

        saveStorage();

        renderItinerary();

        showToast(
            "Itinerary cleared."
        );

    }


    function renderItinerary() {

        const container =
            $("#itinerary-list");


        if (!container) {
            return;
        }


        container.innerHTML = "";


        if (!state.itinerary.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <div>📍</div>
                    <p>
                        Your itinerary is empty.
                    </p>
                </div>
            `;

            return;
        }


        state.itinerary.forEach(
            function (destinationId) {

                const destination =
                    accessibilityDestinations.find(
                        function (item) {
                            return item.id === destinationId;
                        }
                    );


                if (!destination) {
                    return;
                }


                const item =
                    document.createElement("div");

                item.className =
                    "itinerary-item";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${escapeHTML(destination.name)}
                        </strong>

                        <small>
                            📍 ${escapeHTML(destination.city)}
                            · ♿ ${destination.accessibilityScore}/100
                        </small>

                    </div>


                    <button
                        class="small-btn"
                        data-action="remove-itinerary"
                        data-id="${destination.id}">

                        Remove

                    </button>

                `;


                container.appendChild(item);

            }
        );

    }


    /* ============================================================
       MEDICAL FACILITIES
    ============================================================ */

    function renderMedicalFacilities() {

        const container =
            $("#medical-grid");


        if (!container) {
            return;
        }


        container.innerHTML = "";


        accessibilityMedicalFacilities
            .forEach(
                function (facility) {

                    const card =
                        document.createElement("article");

                    card.className =
                        "medical-card";


                    card.innerHTML = `

                        <div class="medical-icon">
                            🏥
                        </div>

                        <h3>
                            ${escapeHTML(facility.name)}
                        </h3>

                        <p>
                            ${escapeHTML(facility.city)}
                            · ${escapeHTML(facility.type)}
                        </p>

                        <p style="margin-top: 8px;">
                            ${escapeHTML(facility.description)}
                        </p>


                        <div class="medical-tags">

                            ${
                                facility.emergency
                                    ? `
                                        <span class="medical-tag">
                                            Emergency
                                        </span>
                                    `
                                    : ""
                            }

                            ${
                                facility.wheelchair
                                    ? `
                                        <span class="medical-tag">
                                            ♿ Accessible
                                        </span>
                                    `
                                    : ""
                            }

                            ${
                                facility.pharmacy
                                    ? `
                                        <span class="medical-tag">
                                            💊 Pharmacy
                                        </span>
                                    `
                                    : ""
                            }

                        </div>

                    `;


                    container.appendChild(card);

                }
            );

    }


    /* ============================================================
       TRANSPORT
    ============================================================ */

    function renderTransport() {

        const container =
            $("#transport-grid");


        if (!container) {
            return;
        }


        container.innerHTML = "";


        accessibilityTransportOptions
            .forEach(
                function (transport) {

                    const card =
                        document.createElement("article");

                    card.className =
                        "transport-card";


                    card.innerHTML = `

                        <div class="transport-icon">
                            ${transport.icon}
                        </div>

                        <h3>
                            ${escapeHTML(transport.name)}
                        </h3>

                        <p>
                            ${escapeHTML(transport.description)}
                        </p>

                        <div class="transport-score">
                            Accessibility support:
                            ${transport.score}/100
                        </div>

                        <ul class="transport-features">

                            ${
                                transport.features
                                    .map(function (feature) {
                                        return `
                                            <li>
                                                ${escapeHTML(feature)}
                                            </li>
                                        `;
                                    })
                                    .join("")
                            }

                        </ul>

                    `;


                    container.appendChild(card);

                }
            );

    }


    /* ============================================================
       REVIEWS
    ============================================================ */

    function getAllReviews() {

        return [
            ...accessibilityReviews,
            ...state.reviews
        ];

    }


    function renderReviews() {

        const container =
            $("#reviews-container");


        if (!container) {
            return;
        }


        const reviews =
            getAllReviews()
                .slice()
                .reverse();


        container.innerHTML = "";


        if (!reviews.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <div>💬</div>
                    <p>
                        No accessibility reviews yet.
                    </p>
                </div>
            `;

            return;
        }


        reviews.forEach(
            function (review) {

                const destination =
                    accessibilityDestinations.find(
                        function (item) {
                            return item.id === review.destinationId;
                        }
                    );


                const item =
                    document.createElement("article");

                item.className =
                    "review-item";


                const stars =
                    "★".repeat(review.rating) +
                    "☆".repeat(5 - review.rating);


                item.innerHTML = `

                    <div class="review-item-header">

                        <div>

                            <div class="review-author">
                                ${escapeHTML(review.author)}
                            </div>

                            <div class="review-date">
                                ${
                                    destination
                                        ? escapeHTML(destination.name)
                                        : "Destination"
                                }
                                ·
                                ${escapeHTML(review.date)}
                            </div>

                        </div>

                        <div class="review-stars">
                            ${stars}
                        </div>

                    </div>

                    <p>
                        ${escapeHTML(review.text)}
                    </p>

                `;


                container.appendChild(item);

            }
        );

    }


    function submitReview(event) {

        event.preventDefault();


        const destinationId =
            $("#review-destination").value;


        const rating =
            Number($("#review-rating").value);


        const text =
            $("#review-text").value.trim();


        if (!destinationId || !rating || !text) {

            showToast(
                "Please complete all review fields."
            );

            return;
        }


        const review = {

            id:
                `user-review-${Date.now()}`,

            destinationId,

            rating,

            text,

            author:
                "Community Traveller",

            date:
                new Date()
                    .toISOString()
                    .slice(0, 10)

        };


        state.reviews.push(review);

        saveStorage();

        renderReviews();


        $("#review-form").reset();


        showToast(
            "Thank you! Your accessibility review was added."
        );

    }


    /* ============================================================
       EVENT BINDING
    ============================================================ */

    function bindEvents() {

        const saveButton =
            $("#save-preferences");


        if (saveButton) {

            saveButton.addEventListener(
                "click",
                savePreferences
            );

        }


        const clearButton =
            $("#clear-preferences");


        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearPreferences
            );

        }


        const stateFilter =
            $("#state-filter");


        if (stateFilter) {

            stateFilter.addEventListener(
                "change",
                renderDestinations
            );

        }


        const accessibilityFilter =
            $("#accessibility-filter");


        if (accessibilityFilter) {

            accessibilityFilter.addEventListener(
                "change",
                renderDestinations
            );

        }


        const search =
            $("#search-destination");


        if (search) {

            search.addEventListener(
                "input",
                renderDestinations
            );

        }


        const clearItineraryButton =
            $("#clear-itinerary");


        if (clearItineraryButton) {

            clearItineraryButton.addEventListener(
                "click",
                clearItinerary
            );

        }


        const reviewForm =
            $("#review-form");


        if (reviewForm) {

            reviewForm.addEventListener(
                "submit",
                submitReview
            );

        }


        /*
         * Event delegation for dynamic destination,
         * recommendation and itinerary buttons.
         */

        document.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        "[data-action]"
                    );


                if (!button) {
                    return;
                }


                const action =
                    button.dataset.action;


                const id =
                    button.dataset.id;


                if (action === "details") {

                    showDestinationDetails(id);

                }


                if (
                    action === "add" ||
                    action === "recommend-add"
                ) {

                    addToItinerary(id);

                }


                if (
                    action === "remove-itinerary"
                ) {

                    removeFromItinerary(id);

                }

            }
        );

    }


    /* ============================================================
       SECURITY / TEXT ESCAPING
    ============================================================ */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* ============================================================
       START APPLICATION
    ============================================================ */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }


})();