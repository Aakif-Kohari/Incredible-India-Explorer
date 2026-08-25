/**
 * Smart Emergency Assistance and Location-Based SOS
 *
 * No backend is required.
 *
 * Uses:
 * - Browser Geolocation API
 * - Google Maps search URLs
 * - Local emergency contact data
 * - localStorage for last known location
 *
 * Important:
 * The application does NOT automatically transmit the user's
 * location to a third party.
 */

(function () {

    "use strict";


    /* =========================================
       CONFIGURATION
    ========================================= */

    const STORAGE_KEY = "iie_emergency_last_location";

    const data = window.EmergencyData || {
        contacts: []
    };


    /* =========================================
       DOM
    ========================================= */

    const contactGrid =
        document.getElementById("contactGrid");

    const modalContactList =
        document.getElementById("modalContactList");

    const sosButton =
        document.getElementById("sosButton");

    const sosModal =
        document.getElementById("sosModal");

    const closeSosModal =
        document.getElementById("closeSosModal");

    const locationButton =
        document.getElementById("locationButton");

    const refreshLocationButton =
        document.getElementById("refreshLocationButton");

    const modalLocationButton =
        document.getElementById("modalLocationButton");

    const mapButton =
        document.getElementById("mapButton");

    const locationText =
        document.getElementById("locationText");

    const locationDescription =
        document.getElementById("locationDescription");

    const toast =
        document.getElementById("toast");


    /* =========================================
       STATE
    ========================================= */

    let currentLocation = null;


    /* =========================================
       INITIALIZATION
    ========================================= */

    function init() {

        renderContacts();

        renderModalContacts();

        setupEventListeners();

        loadSavedLocation();

    }


    /* =========================================
       CONTACTS
    ========================================= */

    function renderContacts() {

        if (!contactGrid) {
            return;
        }

        contactGrid.innerHTML = "";

        data.contacts.forEach(function (contact) {

            const article =
                document.createElement("article");

            article.className = "contact-card";

            article.innerHTML = `

                <div class="contact-top">

                    <div class="contact-icon">
                        ${escapeHTML(contact.icon)}
                    </div>

                </div>

                <h3>
                    ${escapeHTML(contact.name)}
                </h3>

                <p class="contact-description">
                    ${escapeHTML(contact.description)}
                </p>

                <a
                    href="tel:${escapeHTML(contact.number)}"
                    class="contact-number"
                    aria-label="Call ${escapeHTML(contact.name)}"
                >
                    ${escapeHTML(contact.number)}
                </a>

                <a
                    href="tel:${escapeHTML(contact.number)}"
                    class="call-button"
                >
                    📞 Call Now
                </a>
            `;

            contactGrid.appendChild(article);

        });

    }


    function renderModalContacts() {

        if (!modalContactList) {
            return;
        }

        modalContactList.innerHTML = "";

        data.contacts
            .filter(function (contact) {

                return (
                    contact.priority === "critical" ||
                    contact.priority === "high"
                );

            })
            .forEach(function (contact) {

                const item =
                    document.createElement("div");

                item.className = "modal-contact";

                item.innerHTML = `

                    <div class="modal-contact-info">

                        <span class="modal-contact-icon">
                            ${escapeHTML(contact.icon)}
                        </span>

                        <div>

                            <div class="modal-contact-name">
                                ${escapeHTML(contact.name)}
                            </div>

                            <div class="modal-contact-number">
                                ${escapeHTML(contact.number)}
                            </div>

                        </div>

                    </div>

                    <a
                        href="tel:${escapeHTML(contact.number)}"
                        class="modal-call"
                    >
                        📞 Call
                    </a>

                `;

                modalContactList.appendChild(item);

            });

    }


    /* =========================================
       LOCATION
    ========================================= */

    function requestLocation() {

        if (!navigator.geolocation) {

            showToast(
                "Location services are not supported by this browser."
            );

            updateLocationUI(
                "Location unavailable",
                false
            );

            return;
        }


        updateLocationUI(
            "Detecting your location...",
            false
        );


        navigator.geolocation.getCurrentPosition(

            handleLocationSuccess,

            handleLocationError,

            {
                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 300000
            }

        );

    }


    function handleLocationSuccess(position) {

        const latitude =
            Number(position.coords.latitude.toFixed(6));

        const longitude =
            Number(position.coords.longitude.toFixed(6));

        currentLocation = {

            latitude: latitude,

            longitude: longitude,

            accuracy: Math.round(
                position.coords.accuracy
            ),

            timestamp: Date.now()

        };


        saveLocation();

        updateLocationUI(
            `Location detected • Accuracy ±${currentLocation.accuracy}m`,
            true
        );


        if (locationDescription) {

            locationDescription.textContent =
                `Your location has been detected. You can now search for emergency facilities near ${latitude}, ${longitude}.`;

        }


        showToast(
            "Your location has been detected."
        );

    }


    function handleLocationError(error) {

        let message =
            "Unable to detect your location.";

        switch (error.code) {

            case error.PERMISSION_DENIED:

                message =
                    "Location permission was denied. Please allow location access in your browser.";

                break;

            case error.POSITION_UNAVAILABLE:

                message =
                    "Your location is currently unavailable.";

                break;

            case error.TIMEOUT:

                message =
                    "Location request timed out. Please try again.";

                break;

        }


        updateLocationUI(
            "Location unavailable",
            false
        );

        showToast(message);

    }


    function updateLocationUI(text, active) {

        if (locationText) {

            locationText.textContent = text;

        }

        const statusDot =
            document.querySelector(".status-dot");

        if (statusDot) {

            statusDot.style.background =
                active ? "#22c55e" : "#fbbf24";

            statusDot.style.boxShadow =
                active
                    ? "0 0 0 4px rgba(34,197,94,0.2)"
                    : "0 0 0 4px rgba(251,191,36,0.2)";

        }

    }


    /* =========================================
       LOCATION STORAGE
    ========================================= */

    function saveLocation() {

        if (!currentLocation) {
            return;
        }

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(currentLocation)
            );

        } catch (error) {

            console.warn(
                "Could not save emergency location.",
                error
            );

        }

    }


    function loadSavedLocation() {

        try {

            const raw =
                localStorage.getItem(STORAGE_KEY);

            if (!raw) {
                return;
            }

            const saved =
                JSON.parse(raw);

            if (
                !saved ||
                typeof saved.latitude !== "number" ||
                typeof saved.longitude !== "number"
            ) {
                return;
            }


            currentLocation = saved;


            updateLocationUI(
                "Last known location available",
                true
            );


            if (locationDescription) {

                locationDescription.textContent =
                    `A previously detected location is available. Refresh to obtain your current location.`;

            }

        } catch (error) {

            console.warn(
                "Could not load saved location.",
                error
            );

        }

    }


    /* =========================================
       GOOGLE MAPS
    ========================================= */

    function openMapsSearch(service) {

        const query =
            getSearchQuery(service);


        let url;


        if (currentLocation) {

            url =
                "https://www.google.com/maps/search/" +
                encodeURIComponent(query) +
                "/@" +
                currentLocation.latitude +
                "," +
                currentLocation.longitude +
                ",14z";

        } else {

            url =
                "https://www.google.com/maps/search/" +
                encodeURIComponent(query);

        }


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    function getSearchQuery(service) {

        const normalized =
            String(service || "")
                .toLowerCase();


        if (
            normalized.includes("hospital")
        ) {
            return "hospitals near me";
        }


        if (
            normalized.includes("police")
        ) {
            return "police stations near me";
        }


        if (
            normalized.includes("pharmacy")
        ) {
            return "pharmacies near me";
        }


        if (
            normalized.includes("fire")
        ) {
            return "fire stations near me";
        }


        if (
            normalized.includes("tourist")
        ) {
            return "tourist information centers near me";
        }


        return "emergency services near me";

    }


    function openGeneralMap() {

        if (currentLocation) {

            const url =
                "https://www.google.com/maps/search/emergency+services/@" +
                currentLocation.latitude +
                "," +
                currentLocation.longitude +
                ",14z";

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

            return;
        }


        openMapsSearch("emergency services");

    }


    /* =========================================
       SOS MODAL
    ========================================= */

    function openSosModal() {

        if (!sosModal) {
            return;
        }

        sosModal.classList.add("active");

        sosModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

        if (closeSosModal) {

            setTimeout(function () {

                closeSosModal.focus();

            }, 50);

        }

    }


    function closeModal() {

        if (!sosModal) {
            return;
        }

        sosModal.classList.remove("active");

        sosModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    /* =========================================
       EVENT LISTENERS
    ========================================= */

    function setupEventListeners() {

        if (sosButton) {

            sosButton.addEventListener(
                "click",
                openSosModal
            );

        }


        if (closeSosModal) {

            closeSosModal.addEventListener(
                "click",
                closeModal
            );

        }


        if (sosModal) {

            sosModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === sosModal
                    ) {

                        closeModal();

                    }

                }
            );

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    sosModal &&
                    sosModal.classList.contains("active")
                ) {

                    closeModal();

                }

            }
        );


        if (locationButton) {

            locationButton.addEventListener(
                "click",
                requestLocation
            );

        }


        if (refreshLocationButton) {

            refreshLocationButton.addEventListener(
                "click",
                requestLocation
            );

        }


        if (modalLocationButton) {

            modalLocationButton.addEventListener(
                "click",
                requestLocation
            );

        }


        if (mapButton) {

            mapButton.addEventListener(
                "click",
                openGeneralMap
            );

        }


        document
            .querySelectorAll(".facility-button")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const service =
                            button.dataset.service;

                        if (!currentLocation) {

                            showToast(
                                "Detecting your location first..."
                            );

                            requestLocation();

                            setTimeout(
                                function () {

                                    if (currentLocation) {

                                        openMapsSearch(
                                            service
                                        );

                                    }

                                },
                                1200
                            );

                            return;

                        }


                        openMapsSearch(service);

                    }
                );

            });

    }


    /* =========================================
       TOAST
    ========================================= */

    let toastTimer = null;


    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(function () {

                toast.classList.remove(
                    "show"
                );

            }, 4000);

    }


    /* =========================================
       SECURITY
    ========================================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================================
       START
    ========================================= */

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