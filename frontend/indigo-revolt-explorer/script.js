document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const galleryItems = [...document.querySelectorAll(".indigo-gallery-item")];

    const modal = document.getElementById("indigo-modal");
    const modalClose = document.getElementById("indigo-modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalHeading = document.getElementById("modal-heading");
    const modalDescription = document.getElementById("modal-description");

    // --- Bengal Resistance Map Data -------------------------------------
    const regionData = {
        "region-nadia": {
            name: "Nadia",
            date: "1859 · Epicentre",
            text: "The revolt is traditionally traced to Govindpur village in Nadia district, where cultivators led by Digambar Biswas and Bishnu Biswas refused to sow indigo in 1859, sparking resistance that spread across Bengal."
        },
        "region-pabna": {
            name: "Pabna",
            date: "Late 1859",
            text: "Cultivators across Pabna coordinated a mass refusal to accept fresh dadon advances, denying planters the leverage the debt system depended on."
        },
        "region-murshidabad": {
            name: "Murshidabad",
            date: "1859–1860",
            text: "One of Bengal's oldest indigo-growing districts saw significant unrest among ryots tied to long-established plantation networks."
        },
        "region-jessore": {
            name: "Jessore",
            date: "Early 1860",
            text: "Village-level boycotts and social non-cooperation with planters spread through Jessore and the wider Bengal delta."
        },
        "region-khulna": {
            name: "Khulna",
            date: "1860",
            text: "A delta district with dense plantation presence, where cultivators sustained social boycotts of planters and their agents."
        },
        "region-barasat": {
            name: "Barasat",
            date: "1860",
            text: "Its proximity to Calcutta meant unrest here drew early and sustained attention from the city's press and intelligentsia."
        },
        "region-faridpur": {
            name: "Faridpur",
            date: "1860",
            text: "Cultivators in Faridpur joined the wider refusal, adding to the pressure that led the government to appoint the Indigo Commission."
        },
        "region-calcutta": {
            name: "Calcutta",
            date: "1860",
            text: "Not a plantation district itself, but the centre of the press campaign — home to 'The Hindoo Patriot', Dinabandhu Mitra's 'Nil Darpan', and the Indigo Commission's proceedings."
        }
    };

    const mapNodes = [...document.querySelectorAll(".indigo-map-node")];
    const regionDetail = document.getElementById("region-detail-display");
    const timelineSteps = [...document.querySelectorAll(".indigo-timeline-step[data-region]")];

    function showRegion(regionId) {
        const data = regionData[regionId];
        if (!data || !regionDetail) return;

        regionDetail.innerHTML = `
      <h3>${data.name}</h3>
      <span class="indigo-city-date">${data.date}</span>
      <p>${data.text}</p>
    `;

        mapNodes.forEach((node) => {
            node.classList.toggle("active", node.dataset.region === regionId);
        });
    }

    // Map markers drive the detail panel
    mapNodes.forEach((node) => {
        node.setAttribute("tabindex", "0");
        node.setAttribute("role", "button");
        node.addEventListener("click", () => showRegion(node.dataset.region));
        node.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                showRegion(node.dataset.region);
            }
        });
    });

    // Timeline entries also drive the map + detail panel (map/timeline interaction)
    timelineSteps.forEach((step) => {
        step.style.cursor = "pointer";
        step.setAttribute("tabindex", "0");
        step.addEventListener("click", () => {
            showRegion(step.dataset.region);
            document.getElementById("resistance-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        step.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                showRegion(step.dataset.region);
                document.getElementById("resistance-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // --- Affected-Region Chips (simple highlight on click) --------------
    const regionChips = [...document.querySelectorAll(".indigo-region-chip")];
    regionChips.forEach((chip) => {
        chip.setAttribute("tabindex", "0");
        chip.addEventListener("click", () => {
            regionChips.forEach((c) => c.classList.remove("active"));
            chip.classList.add("active");
        });
    });

    // --- Journey Integration (Bookmarks & Global Search) -------------
    function initJourney() {
        if (!window.Journey) return;

        bookmarkButtons.forEach((btn) => {
            const id = btn.dataset.bookmarkId;
            const title = "Indigo Revolt (1859–1860) Explorer";
            const thumbnail = "frontend/assets/indigo_plantation.svg";
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
                    explorerPage: "frontend/indigo-revolt-explorer/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        window.Journey.registerSearchItems("frontend/indigo-revolt-explorer/index.html", [
            {
                id: "indigo-revolt-main",
                title: "Indigo Revolt (1859–1860) Explorer",
                description: "Forced indigo cultivation, cultivator debt bondage, and the Bengal-wide peasant resistance that produced the 1860 Indigo Commission.",
                link: "frontend/indigo-revolt-explorer/index.html"
            },
            {
                id: "indigo-revolt-map",
                title: "Bengal Resistance Map",
                description: "City-by-city Indigo Revolt resistance across Nadia, Pabna, Jessore, Murshidabad, Khulna, Barasat, Faridpur and Calcutta.",
                link: "frontend/indigo-revolt-explorer/index.html#resistance-map"
            },
            {
                id: "indigo-revolt-press",
                title: "Journalists and Intellectuals of the Indigo Revolt",
                description: "Harish Chandra Mukherjee, Dinabandhu Mitra's Nil Darpan, and Reverend James Long's translation and trial.",
                link: "frontend/indigo-revolt-explorer/index.html#press-role"
            },
            {
                id: "indigo-revolt-commission",
                title: "The Indigo Commission of 1860",
                description: "How Lord Canning's government investigated planter coercion and produced Act XI of 1860.",
                link: "frontend/indigo-revolt-explorer/index.html#indigo-commission"
            },
            {
                id: "indigo-revolt-timeline",
                title: "Indigo Revolt Timeline",
                description: "A chronology from the 1859 refusal in Nadia to the 1917 Champaran Satyagraha.",
                link: "frontend/indigo-revolt-explorer/index.html#timeline"
            }
        ]);
    }

    // --- Gallery Modal Logic -----------------------------------------
    let lastFocusedElement = null;
    let indigoModalFocusTrap = null;

    function openModal(item) {
        lastFocusedElement = item;

        modalTitle.textContent = item.dataset.title;
        modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
        modalDescription.textContent = item.dataset.desc;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        if (typeof window.setupFocusTrap === "function") {
            indigoModalFocusTrap = window.setupFocusTrap(modal);
        }

        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        if (indigoModalFocusTrap) {
            indigoModalFocusTrap.deactivate();
            indigoModalFocusTrap = null;
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    galleryItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-haspopup", "dialog");
        item.setAttribute("aria-controls", "indigo-modal");
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