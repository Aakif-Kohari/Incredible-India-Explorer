document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const stationPins = [...document.querySelectorAll(".riaf-station-pin")];

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
            const title = "RIAF Revolt of 1946 Explorer";
            const thumbnail = "frontend/assets/riaf_revolt_banner.png";
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
                    explorerPage: "frontend/riaf-revolt-1946-explorer/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        // 2. Global search index registration
        window.Journey.registerSearchItems("frontend/riaf-revolt-1946-explorer/index.html", [
            {
                id: "riaf-revolt-main",
                title: "RIAF Revolt of 1946 Explorer",
                description: "Explore the Royal Indian Air Force revolt of January 1946 - grievances, station-by-station protest, and its link to the RIN Mutiny.",
                link: "frontend/riaf-revolt-1946-explorer/index.html"
            },
            {
                id: "riaf-revolt-stations",
                title: "RIAF Revolt Station Map",
                description: "See which air force stations - from Karachi to Calcutta - joined the January 1946 protest.",
                link: "frontend/riaf-revolt-1946-explorer/index.html#stations"
            },
            {
                id: "riaf-revolt-comparison",
                title: "RIAF Revolt vs RIN Mutiny",
                description: "Compare the January 1946 air force revolt with the February 1946 naval mutiny.",
                link: "frontend/riaf-revolt-1946-explorer/index.html#comparison"
            },
            {
                id: "riaf-revolt-timeline",
                title: "RIAF Revolt Timeline",
                description: "Follow the day-by-day timeline of the 1946 air force protest and its aftermath.",
                link: "frontend/riaf-revolt-1946-explorer/index.html#timeline"
            }
        ]);
    }

    // --- Station Pin Modal Logic --------------------------------------
    let lastFocusedElement = null;

    function openModal(item) {
        lastFocusedElement = item;

        modalTitle.textContent = item.dataset.title;
        modalHeading.textContent = item.dataset.role || "Air Force Station";
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

    // Bind station pin click events
    stationPins.forEach((item) => {
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