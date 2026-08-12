document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const regionPins = [...document.querySelectorAll(".pgov-region-pin")];

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
            const title = "Parallel Governments of Quit India Explorer";
            const thumbnail = "frontend/assets/parallel_governments_banner.png";
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
                    explorerPage: "frontend/parallel-governments-explorer/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        // 2. Global search index registration
        window.Journey.registerSearchItems("frontend/parallel-governments-explorer/index.html", [
            {
                id: "pgov-main",
                title: "Parallel Governments of Quit India Explorer",
                description: "Explore the Tamralipta Jatiya Sarkar, Satara's Prati Sarkar, and other underground governments of the 1942 Quit India Movement.",
                link: "frontend/parallel-governments-explorer/index.html"
            },
            {
                id: "pgov-map",
                title: "Parallel Governments Regional Map",
                description: "See where parallel governments rose during Quit India, from Midnapore to Satara to Ballia.",
                link: "frontend/parallel-governments-explorer/index.html#map"
            },
            {
                id: "pgov-comparison",
                title: "Tamralipta Sarkar vs Prati Sarkar",
                description: "Compare the two major parallel governments of the Quit India Movement side by side.",
                link: "frontend/parallel-governments-explorer/index.html#comparison"
            },
            {
                id: "pgov-timeline",
                title: "Parallel Governments Timeline",
                description: "Follow the rise and fall of India's underground Quit India-era governments from 1942 to 1945.",
                link: "frontend/parallel-governments-explorer/index.html#timeline"
            }
        ]);
    }

    // --- Region Pin Modal Logic ----------------------------------------
    let lastFocusedElement = null;

    function openModal(item) {
        lastFocusedElement = item;

        modalTitle.textContent = item.dataset.title;
        const place = item.dataset.place || "";
        const duration = item.dataset.duration || "";
        modalHeading.textContent = [place, duration].filter(Boolean).join(" · ");
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

    // Bind region pin click events
    regionPins.forEach((item) => {
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