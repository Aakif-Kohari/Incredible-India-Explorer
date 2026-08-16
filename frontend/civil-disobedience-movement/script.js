document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const galleryItems = [...document.querySelectorAll(".civil-gallery-item")];

    const modal = document.getElementById("civil-modal");
    const modalClose = document.getElementById("civil-modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalHeading = document.getElementById("modal-heading");
    const modalDescription = document.getElementById("modal-description");

    // --- India-Wide Movement Map Data -----------------------------------
    const placeData = {
        "place-dandi": {
            name: "Dandi",
            date: "6 April 1930",
            text: "Gandhi breaks the Salt Act by picking up natural salt from the shore, launching the nationwide movement."
        },
        "place-dharasana": {
            name: "Dharasana",
            date: "May 1930",
            text: "Sarojini Naidu and Abbas Tyabji lead an unarmed attempt to occupy the government salt works; police beat volunteers with steel-tipped lathis."
        },
        "place-vedaranyam": {
            name: "Vedaranyam",
            date: "1930",
            text: "C. Rajagopalachari leads a parallel salt march from Trichinopoly to Vedaranyam, extending the Dandi model to Tamil Nadu."
        },
        "place-peshawar": {
            name: "Peshawar",
            date: "23 April 1930",
            text: "Police open fire on unarmed Khudai Khidmatgar demonstrators in Qissa Khwani Bazaar, killing an unconfirmed but substantial number of protestors."
        },
        "place-sholapur": {
            name: "Sholapur",
            date: "May 1930",
            text: "News of Gandhi's arrest triggers a worker-led uprising that briefly takes control of the city, prompting the imposition of martial law."
        },
        "place-bardoli": {
            name: "Bardoli",
            date: "1930–1931",
            text: "Peasants refuse to pay land revenue in solidarity with the movement, echoing the district's earlier 1928 no-tax satyagraha."
        },
        "place-chittagong": {
            name: "Chittagong",
            date: "18 April 1930",
            text: "Revolutionaries led by Surya Sen raid the local armoury in a parallel, more militant strand of anti-colonial resistance."
        },
        "place-manipur": {
            name: "Manipur & Naga Hills",
            date: "1931–1932",
            text: "Rani Gaidinliu leads tribal resistance in the region, blending anti-colonial politics with local identity movements."
        },
        "place-up": {
            name: "United Provinces",
            date: "1930–1931",
            text: "Peasants launch no-tax and no-rent campaigns against land revenue demands, broadening the movement's rural base."
        }
    };

    const mapNodes = [...document.querySelectorAll(".civil-map-node")];
    const placeDetail = document.getElementById("place-detail-display");

    function showPlace(placeId) {
        const data = placeData[placeId];
        if (!data || !placeDetail) return;

        placeDetail.innerHTML = `
      <h3>${data.name}</h3>
      <span class="civil-city-date">${data.date}</span>
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

    // --- Map Layer Toggle ------------------------------------------------
    const layerButtons = [...document.querySelectorAll(".civil-layer-btn")];

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
            const title = "Civil Disobedience Movement (1930–1934) Explorer";
            const thumbnail = "frontend/assets/civil_dandi_march.svg";
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
                    explorerPage: "frontend/civil-disobedience-movement/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        window.Journey.registerSearchItems("frontend/civil-disobedience-movement/index.html", [
            {
                id: "civil-disobedience-main",
                title: "Civil Disobedience Movement (1930–1934) Explorer",
                description: "From the Dandi March to regional uprisings, boycotts, women's and peasant participation, and the Gandhi-Irwin Pact — explore India's largest mass movement to date.",
                link: "frontend/civil-disobedience-movement/index.html"
            },
            {
                id: "civil-disobedience-dandi",
                title: "The Dandi March Route",
                description: "Day-by-day route of Gandhi's 1930 march from Sabarmati Ashram to Dandi to break the salt law.",
                link: "frontend/civil-disobedience-movement/index.html#dandi-march"
            },
            {
                id: "civil-disobedience-map",
                title: "India-Wide Movement Map",
                description: "Salt satyagrahas, regional uprisings and British repression across Dandi, Dharasana, Vedaranyam, Peshawar, Sholapur, Bardoli, Chittagong and Manipur.",
                link: "frontend/civil-disobedience-movement/index.html#movement-map"
            },
            {
                id: "civil-disobedience-women",
                title: "Women's Participation in the Civil Disobedience Movement",
                description: "Sarojini Naidu, Kamaladevi Chattopadhyay and Kasturba Gandhi led women into mass political action for the first time.",
                link: "frontend/civil-disobedience-movement/index.html#womens-participation"
            },
            {
                id: "civil-disobedience-pact",
                title: "The Gandhi-Irwin Pact and Round Table Conference",
                description: "How the March 1931 pact paused the movement and sent Gandhi to the Second Round Table Conference in London.",
                link: "frontend/civil-disobedience-movement/index.html#gandhi-irwin-pact"
            },
            {
                id: "civil-disobedience-timeline",
                title: "Civil Disobedience Movement Timeline",
                description: "A chronology from the 1929 Purna Swaraj resolution to the movement's formal withdrawal in 1934.",
                link: "frontend/civil-disobedience-movement/index.html#timeline"
            }
        ]);
    }

    // --- Gallery Modal Logic -----------------------------------------
    let lastFocusedElement = null;
    let civilModalFocusTrap = null;

    function openModal(item) {
        lastFocusedElement = item;

        modalTitle.textContent = item.dataset.title;
        modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
        modalDescription.textContent = item.dataset.desc;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        if (typeof window.setupFocusTrap === "function") {
            civilModalFocusTrap = window.setupFocusTrap(modal);
        }

        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        if (civilModalFocusTrap) {
            civilModalFocusTrap.deactivate();
            civilModalFocusTrap = null;
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    galleryItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-haspopup", "dialog");
        item.setAttribute("aria-controls", "civil-modal");
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