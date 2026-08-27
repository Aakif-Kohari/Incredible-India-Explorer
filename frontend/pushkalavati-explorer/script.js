document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const galleryItems = [...document.querySelectorAll(".pushk-gallery-item")];

    const modal = document.getElementById("pushk-modal");
    const modalClose = document.getElementById("pushk-modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalHeading = document.getElementById("modal-heading");
    const modalDescription = document.getElementById("modal-description");

    // --- Ancient City Map Data -------------------------------------------
    const placeData = {
        "place-bala-hisar": {
            name: "Bala Hisar",
            date: "c. 6th century BCE – Kushan era",
            text: "The site's earliest and largest mound, continuously occupied from the Achaemenid period through Kushan times, and excavated by Mortimer Wheeler in 1958."
        },
        "place-shaikhan-dheri": {
            name: "Shaikhan Dheri",
            date: "c. 2nd century BCE onward",
            text: "A separate, later mound representing the Indo-Greek and Kushan-period city, excavated by Ahmad Hassan Dani in the 1960s, yielding coins, sculpture and terracotta figurines."
        },
        "place-mir-ziyarat": {
            name: "Mir Ziyarat",
            date: "Ancient Gandhara period",
            text: "A smaller mound in the wider Pushkalavati settlement complex, contributing to the site's overall archaeological footprint."
        },
        "place-shahji-dheri": {
            name: "Shahji-ki-Dheri",
            date: "Kushan era",
            text: "Site of a great stupa associated with Kanishka near Peshawar, illustrating the wider Buddhist landscape that grew up around Pushkalavati."
        },
        "place-khyber": {
            name: "Khyber Pass",
            date: "Trade route",
            text: "The mountain corridor connecting Pushkalavati to Afghanistan, Persia and the wider Silk Road network to the west."
        },
        "place-taxila": {
            name: "Taxila",
            date: "Trade route",
            text: "Another major Gandharan centre of learning and trade, linked to Pushkalavati by routes running east."
        },
        "place-peshawar": {
            name: "Peshawar (Purushapura)",
            date: "c. 2nd century CE",
            text: "The city that eventually succeeded Pushkalavati as Gandhara's regional capital, a short distance to the south."
        }
    };

    const mapNodes = [...document.querySelectorAll(".pushk-map-node")];
    const placeDetail = document.getElementById("place-detail-display");

    function showPlace(placeId) {
        const data = placeData[placeId];
        if (!data || !placeDetail) return;

        placeDetail.innerHTML = `
      <h3>${data.name}</h3>
      <span class="pushk-city-date">${data.date}</span>
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

    // --- Settlement-Layer Visualization (Settlement / Trade / Buddhist) --
    const layerButtons = [...document.querySelectorAll(".pushk-layer-btn")];

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
            const title = "Pushkalavati Explorer | Ancient City of Gandhara";
            const thumbnail = "frontend/assets/pushk_bala_hisar.svg";
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
                    explorerPage: "frontend/pushkalavati-explorer/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        window.Journey.registerSearchItems("frontend/pushkalavati-explorer/index.html", [
            {
                id: "pushkalavati-main",
                title: "Pushkalavati Explorer | Ancient City of Gandhara",
                description: "From Bala Hisar to Shaikhan Dheri — explore Pushkalavati, one of ancient Gandhara's great urban centres, its trade routes, Buddhist heritage, and archaeological legacy.",
                link: "frontend/pushkalavati-explorer/index.html"
            },
            {
                id: "pushkalavati-map",
                title: "Ancient City Map of Pushkalavati",
                description: "Settlement mounds, trade routes and Buddhist sites across Bala Hisar, Shaikhan Dheri, the Khyber Pass, Taxila and Peshawar.",
                link: "frontend/pushkalavati-explorer/index.html#city-map"
            },
            {
                id: "pushkalavati-trade",
                title: "Pushkalavati Trade Route Explorer",
                description: "How Pushkalavati connected the Indus plains to Central Asia and the wider Silk Road network.",
                link: "frontend/pushkalavati-explorer/index.html#trade-routes"
            },
            {
                id: "pushkalavati-buddhist",
                title: "Buddhist Heritage of Pushkalavati",
                description: "Stupas, monasteries and the rise of Gandharan Buddhist art around ancient Pushkalavati.",
                link: "frontend/pushkalavati-explorer/index.html#buddhist-heritage"
            },
            {
                id: "pushkalavati-timeline",
                title: "Pushkalavati Archaeological Timeline",
                description: "A chronology from the 6th century BCE Achaemenid settlement to the Wheeler and Dani excavations.",
                link: "frontend/pushkalavati-explorer/index.html#timeline"
            }
        ]);
    }

    // --- Gallery Modal Logic -----------------------------------------
    let lastFocusedElement = null;
    let pushkModalFocusTrap = null;

    function openModal(item) {
        lastFocusedElement = item;

        modalTitle.textContent = item.dataset.title;
        modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
        modalDescription.textContent = item.dataset.desc;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        if (typeof window.setupFocusTrap === "function") {
            pushkModalFocusTrap = window.setupFocusTrap(modal);
        }

        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        if (pushkModalFocusTrap) {
            pushkModalFocusTrap.deactivate();
            pushkModalFocusTrap = null;
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    galleryItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-haspopup", "dialog");
        item.setAttribute("aria-controls", "pushk-modal");
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