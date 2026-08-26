document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const galleryItems = [...document.querySelectorAll(".rin-gallery-item")];

    const modal = document.getElementById("rin-modal");
    const modalClose = document.getElementById("rin-modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalHeading = document.getElementById("modal-heading");
    const modalDescription = document.getElementById("modal-description");

    // --- Naval Establishment Map Data -------------------------------------
    const placeData = {
        "place-talwar": {
            name: "HMIS Talwar",
            date: "18 February 1946",
            text: "The mutiny's starting point: ratings at this Bombay signals establishment refused food and duty, launching the strike that spread across the fleet."
        },
        "place-castle-barracks": {
            name: "Castle Barracks",
            date: "19 February 1946",
            text: "A major Bombay shore establishment that joined the strike within a day of HMIS Talwar's ratings walking out."
        },
        "place-bombay-streets": {
            name: "Bombay Streets",
            date: "21 February 1946",
            text: "Mill workers, students and residents launched a citywide hartal and clashed with British troops in solidarity with the ratings."
        },
        "place-bombay-harbour": {
            name: "Bombay Harbour Fleet",
            date: "19–20 February 1946",
            text: "Dozens of ships at anchor in Bombay harbour joined the strike, hoisting strike flags and refusing orders from British officers."
        },
        "place-karachi": {
            name: "Karachi",
            date: "20 February 1946",
            text: "Ratings aboard HMIS Hindustan exchanged fire with British troops sent to retake the ship, among the mutiny's most violent episodes."
        },
        "place-calcutta": {
            name: "Calcutta",
            date: "22 February 1946",
            text: "Naval establishments in Calcutta joined the sympathy strikes as news of the mutiny spread across India."
        },
        "place-madras": {
            name: "Madras",
            date: "22 February 1946",
            text: "Ratings in Madras joined the strike, extending the mutiny's reach down India's eastern coastline."
        },
        "place-vizag": {
            name: "Vishakhapatnam",
            date: "22 February 1946",
            text: "This major naval base saw ratings join the strike in solidarity with Bombay and Karachi."
        },
        "place-cochin": {
            name: "Cochin",
            date: "22 February 1946",
            text: "Naval personnel in Cochin joined the sympathy strikes spreading along India's southern coast."
        },
        "place-delhi": {
            name: "Delhi",
            date: "22 February 1946",
            text: "Naval headquarters staff in Delhi joined the wider strike, underscoring how far the mutiny had spread beyond the coast."
        }
    };

    const mapNodes = [...document.querySelectorAll(".rin-map-node")];
    const placeDetail = document.getElementById("place-detail-display");

    function showPlace(placeId) {
        const data = placeData[placeId];
        if (!data || !placeDetail) return;

        placeDetail.innerHTML = `
      <h3>${data.name}</h3>
      <span class="rin-city-date">${data.date}</span>
      <p>${data.text}</p>
    `;

        mapNodes.forEach((node) => {
            node.classList.toggle("active", node.dataset.place === placeId);
        });
    }

    mapNodes.forEach((node) => {
        node.setAttribute("tabindex", "0");
        node.setAttribute("role", "button");
        node.addEventListener("click", () => showPlace(node.dataset.place));
        node.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                showPlace(node.dataset.place);
            }
        });
    });

    // --- Spread Animation via Layer Toggle (Day 1 / 2-3 / 4-5 / Civilian) --
    const layerButtons = [...document.querySelectorAll(".rin-layer-btn")];

    function applyLayer(layer) {
        layerButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.layer === layer));
        mapNodes.forEach((node) => {
            const matches = layer === "all" || node.dataset.layer === layer;
            node.classList.toggle("layer-hidden", !matches);
        });
    }

    layerButtons.forEach((btn) => {
        btn.addEventListener("click", () => applyLayer(btn.dataset.layer));
    });

    // --- Journey Integration (Bookmarks & Global Search) -------------
    function initJourney() {
        if (!window.Journey) return;

        bookmarkButtons.forEach((btn) => {
            const id = btn.dataset.bookmarkId;
            const title = "Royal Indian Navy Mutiny (1946) Explorer";
            const thumbnail = "frontend/assets/rin_hmis_talwar.svg";
            const category = "history";

            const updateBookmarkUI = () => {
                const isSaved = window.Journey.isSaved(id);
                btn.classList.toggle("is-saved", isSaved);
                btn.setAttribute("aria-pressed", String(isSaved));
                btn.innerHTML = isSaved ? "♥ Saved to Journey" : "♡ Save to Journey";
            };

            updateBookmarkUI();

            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                window.Journey.toggle({
                    id,
                    explorerPage: "frontend/royal-indian-navy-mutiny/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        window.Journey.registerSearchItems("frontend/royal-indian-navy-mutiny/index.html", [
            {
                id: "rin-mutiny-main",
                title: "Royal Indian Navy Mutiny (1946) Explorer",
                description: "From HMIS Talwar to a fleet-wide strike across India — explore the Royal Indian Navy Mutiny of February 1946 and its role in hastening the end of British rule.",
                link: "frontend/royal-indian-navy-mutiny/index.html"
            },
            {
                id: "rin-mutiny-map",
                title: "Naval Establishment Map of the RIN Mutiny",
                description: "Day-by-day spread of the mutiny across Bombay, Karachi, Calcutta, Madras, Vishakhapatnam, Cochin and Delhi.",
                link: "frontend/royal-indian-navy-mutiny/index.html#mutiny-map"
            },
            {
                id: "rin-mutiny-political",
                title: "Political Responses to the RIN Mutiny",
                description: "How Congress, the Muslim League, the Communist Party of India and the Naval Central Strike Committee responded.",
                link: "frontend/royal-indian-navy-mutiny/index.html#political-responses"
            },
            {
                id: "rin-mutiny-significance",
                title: "Historical Significance of the RIN Mutiny",
                description: "Why the 1946 mutiny is seen as a factor accelerating Britain's decision to leave India.",
                link: "frontend/royal-indian-navy-mutiny/index.html#significance"
            },
            {
                id: "rin-mutiny-timeline",
                title: "Royal Indian Navy Mutiny Timeline",
                description: "A day-by-day chronology from the 18 February 1946 strike at HMIS Talwar to the 23 February surrender.",
                link: "frontend/royal-indian-navy-mutiny/index.html#timeline"
            }
        ]);
    }

    // --- Gallery Modal Logic -----------------------------------------
    let lastFocusedElement = null;
    let rinModalFocusTrap = null;

    function openModal(item) {
        lastFocusedElement = item;

        modalTitle.textContent = item.dataset.title;
        modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
        modalDescription.textContent = item.dataset.desc;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        if (typeof window.setupFocusTrap === "function") {
            rinModalFocusTrap = window.setupFocusTrap(modal);
        }

        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        if (rinModalFocusTrap) {
            rinModalFocusTrap.deactivate();
            rinModalFocusTrap = null;
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    galleryItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-haspopup", "dialog");
        item.setAttribute("aria-controls", "rin-modal");
        item.addEventListener("click", () => openModal(item));
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(item);
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("open")) {
            closeModal();
        }
    });

    // Run initialization
    initJourney();
});