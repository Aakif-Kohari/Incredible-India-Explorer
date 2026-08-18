document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const galleryItems = [...document.querySelectorAll(".simon-gallery-item")];

    const modal = document.getElementById("simon-modal");
    const modalClose = document.getElementById("simon-modal-close");
    const modalTitle = document.getElementById("modal-title");
    const modalHeading = document.getElementById("modal-heading");
    const modalDescription = document.getElementById("modal-description");

    // --- City-by-City Protest Map Data ---------------------------------
    const cityData = {
        "city-lahore": {
            name: "Lahore",
            date: "30 October 1928",
            text: "The Commission's Lahore visit drew the movement's largest and most consequential procession, led by Lala Lajpat Rai. Police met the marchers with a lathi charge that left Lajpat Rai severely injured; he died seventeen days later."
        },
        "city-delhi": {
            name: "Delhi",
            date: "February 1928",
            text: "Black-flag demonstrations and hartals greeted the Commission, with processions chanting 'Simon, Go Back' through the capital's streets."
        },
        "city-lucknow": {
            name: "Lucknow",
            date: "30 November 1928",
            text: "A large protest procession was met with a police lathi charge; both Jawaharlal Nehru and Govind Ballabh Pant were injured while marching against the Commission."
        },
        "city-allahabad": {
            name: "Allahabad",
            date: "1928",
            text: "As the base of the Nehru family and a Congress stronghold, Allahabad saw sustained hartals and organisational planning for the boycott, including work on the Nehru Report."
        },
        "city-calcutta": {
            name: "Calcutta",
            date: "February 1928",
            text: "One of the largest hartals of the boycott shut down the city, with massive black-flag processions and student participation."
        },
        "city-bombay": {
            name: "Bombay",
            date: "3 February 1928",
            text: "The Commission's port of arrival saw an immediate, city-wide hartal and black-flag demonstrations the day it landed in India."
        },
        "city-poona": {
            name: "Poona",
            date: "1928",
            text: "Poona's protests drew on the city's long tradition of nationalist organising, with hartals and public meetings condemning the Commission's composition."
        },
        "city-madras": {
            name: "Madras",
            date: "1928–1929",
            text: "Demonstrations and hartals accompanied the Commission's visits to the Madras Presidency, with local leaders boycotting official proceedings."
        }
    };

    const mapNodes = [...document.querySelectorAll(".simon-map-node")];
    const cityDetail = document.getElementById("city-detail-display");

    function showCity(cityId) {
        const data = cityData[cityId];
        if (!data || !cityDetail) return;

        cityDetail.innerHTML = `
      <h3>${data.name}</h3>
      <span class="simon-city-date">${data.date}</span>
      <p>${data.text}</p>
    `;

        mapNodes.forEach((node) => {
            node.classList.toggle("active", node.dataset.city === cityId);
        });
    }

    mapNodes.forEach((node) => {
        node.setAttribute("tabindex", "0");
        node.setAttribute("role", "button");
        node.addEventListener("click", () => showCity(node.dataset.city));
        node.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                showCity(node.dataset.city);
            }
        });
    });

    // --- Participation Bar Chart Animation ------------------------------
    const barChart = document.getElementById("participation-chart");
    if (barChart) {
        const bars = [...barChart.querySelectorAll(".simon-bar-fill")];
        const animateBars = () => {
            bars.forEach((bar) => {
                const value = bar.dataset.value || "0";
                bar.style.width = `${value}%`;
            });
        };

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateBars();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(barChart);
        } else {
            animateBars();
        }
    }

    // --- Journey Integration (Bookmarks & Global Search) -------------
    function initJourney() {
        if (!window.Journey) return;

        bookmarkButtons.forEach((btn) => {
            const id = btn.dataset.bookmarkId;
            const title = "Simon Commission Protests (1928) Explorer";
            const thumbnail = "frontend/assets/simon_protest_hartal.svg";
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
                    explorerPage: "frontend/simon-commission-protests/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        window.Journey.registerSearchItems("frontend/simon-commission-protests/index.html", [
            {
                id: "simon-commission-main",
                title: "Simon Commission Protests (1928) Explorer",
                description: "An all-white Commission, a nationwide 'Simon Go Back' boycott, and the Lahore lathi charge that killed Lala Lajpat Rai and radicalised a generation.",
                link: "frontend/simon-commission-protests/index.html"
            },
            {
                id: "simon-commission-map",
                title: "Simon Commission Protest Centres",
                description: "City-by-city protests against the Simon Commission across Lahore, Delhi, Lucknow, Calcutta, Bombay, Poona and Madras.",
                link: "frontend/simon-commission-protests/index.html#protest-map"
            },
            {
                id: "simon-commission-lajpat-rai",
                title: "Lala Lajpat Rai and the Lahore Protest",
                description: "How 'Punjab Kesari' Lala Lajpat Rai led the 1928 Lahore march and died from injuries sustained in the police lathi charge.",
                link: "frontend/simon-commission-protests/index.html#lajpat-rai"
            },
            {
                id: "simon-commission-revolutionary",
                title: "Revolutionary Consequences of the Simon Commission Protests",
                description: "How Bhagat Singh, Rajguru and the HSRA responded to Lajpat Rai's death, from the Saunders shooting to the Central Assembly bombing.",
                link: "frontend/simon-commission-protests/index.html#revolutionary-consequences"
            },
            {
                id: "simon-commission-timeline",
                title: "Simon Commission Protests Timeline",
                description: "A chronology from the Commission's 1927 appointment to the 1931 execution of Bhagat Singh, Rajguru and Sukhdev.",
                link: "frontend/simon-commission-protests/index.html#timeline"
            }
        ]);
    }

    // --- Gallery Modal Logic -----------------------------------------
    let lastFocusedElement = null;
    let simonModalFocusTrap = null;

    function openModal(item) {
        lastFocusedElement = item;

        modalTitle.textContent = item.dataset.title;
        modalHeading.textContent = item.querySelector("p")?.textContent || "Gallery Highlight";
        modalDescription.textContent = item.dataset.desc;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        if (typeof window.setupFocusTrap === "function") {
            simonModalFocusTrap = window.setupFocusTrap(modal);
        }

        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        if (simonModalFocusTrap) {
            simonModalFocusTrap.deactivate();
            simonModalFocusTrap = null;
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    galleryItems.forEach((item) => {
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-haspopup", "dialog");
        item.setAttribute("aria-controls", "simon-modal");
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