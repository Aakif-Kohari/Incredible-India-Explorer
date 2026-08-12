document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const regionPins = [...document.querySelectorAll(".ina-region-pin")];
    const regimentCards = [...document.querySelectorAll(".ina-regiment-card")];
    const clickableItems = [...regionPins, ...regimentCards];

    const modal = document.getElementById("port-modal");
    const modalClose = document.getElementById("port-modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalHeading = document.getElementById("modal-heading");
    const modalDescription = document.getElementById("modal-description");

    // --- Journey Integration (Bookmarks & Global Search) -------------
    function initJourney() {
        if (!window.Journey) return;

        // 1. Bookmark functionality
        bookmarkButtons.forEach((btn) => {
            const id = btn.dataset.bookmarkId;
            const title = "Indian National Army Explorer";
            const thumbnail = "frontend/assets/ina_explorer_banner.png";
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
                    explorerPage: "frontend/indian-national-army-explorer/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        // 2. Global search index registration
        window.Journey.registerSearchItems("frontend/indian-national-army-explorer/index.html", [
            {
                id: "ina-main",
                title: "Indian National Army Explorer",
                description: "Explore the INA's formation from POW camps in Southeast Asia through the Azad Hind Government to the Red Fort Trials.",
                link: "frontend/indian-national-army-explorer/index.html"
            },
            {
                id: "ina-map",
                title: "INA Southeast Asia Map",
                description: "See the INA's Southeast Asian bases and the Northeast India campaign at Imphal and Kohima.",
                link: "frontend/indian-national-army-explorer/index.html#map"
            },
            {
                id: "ina-structure",
                title: "INA Structure & Rani of Jhansi Regiment",
                description: "Discover the INA's divisions, brigades, and its pioneering all-women Rani of Jhansi Regiment.",
                link: "frontend/indian-national-army-explorer/index.html#structure"
            },
            {
                id: "ina-timeline",
                title: "INA Timeline",
                description: "Follow the INA from the fall of Singapore in 1942 to the Red Fort Trials of 1945-46.",
                link: "frontend/indian-national-army-explorer/index.html#timeline"
            }
        ]);
    }

    // --- Pin / Card Modal Logic -----------------------------------------
    let lastFocusedElement = null;

    function openModal(item) {
        lastFocusedElement = item;

        modalTitle.textContent = item.dataset.title;
        modalHeading.textContent = item.dataset.role || "";
        modalDescription.textContent = item.dataset.desc;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    // Bind pin/card click events
    clickableItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
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