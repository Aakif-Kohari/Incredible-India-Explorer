/**
 * Bengali Cinema Explorer - Interactive Logic & Exported Data
 * Handles gallery modal popups, bookmark/journey integration,
 * global search index registration, and scroll utilities.
 *
 * Follows the same architecture as dogri-cinema-explorer/script.js and
 * pollywood-cinema-explorer/script.js.
 */

/* =====================================================================
   Data exports (consumed by unit tests via script loading)
   ===================================================================== */

const BENGALI_CINEMA_INFO = {
    id: 'bengali-cinema',
    name: 'Bengali Cinema (Tollywood)',
    language: 'Bengali',
    region: 'West Bengal, India',
    schedule: 'Eighth Schedule, Constitution of India',
    hub: 'Tollygunge, Kolkata',
    pioneerEra: '1910s–Present',
    culturalRoots: ['Madan Theatre', 'New Theatres', 'Parallel Cinema (Indian New Wave)', 'Rabindra Sangeet']
};

const BENGALI_FILMS = [
    {
        id: 'pather-panchali-1955',
        title: 'Pather Panchali',
        year: 1955,
        genre: 'Parallel Cinema / Realism',
        significance: 'Directed by Satyajit Ray, won "Best Human Document" at Cannes, placing Indian cinema on the global map.'
    },
    {
        id: 'kabuliwala-1957',
        title: 'Kabuliwala',
        year: 1957,
        genre: 'Social Drama',
        significance: 'Directed by Tapan Sinha, adapting Rabindranath Tagore\'s short story about an Afghan merchant and mini.'
    },
    {
        id: 'jalsaghar-1958',
        title: 'Jalsaghar (The Music Room)',
        year: 1958,
        genre: 'Musical Drama',
        significance: 'Satyajit Ray\'s poignant exploration of the decline of feudal zamindari systems, featuring legendary classical musicians.'
    },
    {
        id: 'meghe-dhaka-tara-1960',
        title: 'Meghe Dhaka Tara',
        year: 1960,
        genre: 'Social Drama / Melodrama',
        significance: 'Ritwik Ghatak\'s masterpiece reflecting the tragic social realities of post-partition refugee life in Bengal.'
    },
    {
        id: 'nayak-1966',
        title: 'Nayak (The Hero)',
        year: 1966,
        genre: 'Psychological Drama',
        significance: 'Satyajit Ray\'s masterclass on superstardom and vulnerability, starring Bengali cinema icon Uttam Kumar.'
    },
    {
        id: 'bhuvan-shome-1969',
        title: 'Bhuvan Shome',
        year: 1969,
        genre: 'Satirical Drama',
        significance: 'Directed by Mrinal Sen, officially initiating the Indian New Wave (Parallel Cinema) movement.'
    }
];

const BENGALI_FILMMAKERS = [
    {
        id: 'satyajit-ray',
        name: 'Satyajit Ray',
        role: 'Auteur / Director',
        contribution: 'Academy Honorary Award recipient, creator of the Apu Trilogy, pioneer of cinematic realism in India.'
    },
    {
        id: 'ritwik-ghatak',
        name: 'Ritwik Ghatak',
        role: 'Avant-garde Filmmaker',
        contribution: 'Directed Meghe Dhaka Tara; explored partition trauma, displacing myths, and post-war socio-economic struggles.'
    },
    {
        id: 'mrinal-sen',
        name: 'Mrinal Sen',
        role: 'Parallel Cinema Pioneer',
        contribution: 'Initiated the New Wave with Bhuvan Shome; known for his politically charged Calcutta Trilogy.'
    },
    {
        id: 'tapan-sinha',
        name: 'Tapan Sinha',
        role: 'Humanist Director',
        contribution: 'Successfully balanced art and commercial appeal; directed classics like Kabuliwala and Jhinder Bandi.'
    }
];

const BENGALI_TIMELINE = [
    {
        id: 'silent-era',
        period: '1910s–1920s',
        era: 'Silent Era & Madan Theatre',
        description: 'First silent feature Billwamangal (1919) is produced. Madan Theatre in Calcutta becomes the primary distribution hub.'
    },
    {
        id: 'early-talkies',
        period: '1930s–1940s',
        era: 'Sound Transition & New Theatres',
        description: 'First talkie Jamai Sasthi (1931) releases. New Theatres studio pioneers playback singing and literary adaptations.'
    },
    {
        id: 'golden-era',
        period: '1950s–1960s',
        era: 'The Golden Age of Parallel Cinema',
        description: 'Satyajit Ray, Ritwik Ghatak, and Mrinal Sen emerge. Golden couple Uttam Kumar and Suchitra Sen dominate screens.'
    },
    {
        id: 'political-cinema',
        period: '1970s–1980s',
        era: 'Middle Cinema & Political Turmoil',
        description: 'Films shift focus to urban unrest and Naxalite movements. Directors like Tarun Majumdar gain popularity.'
    },
    {
        id: 'modern-renaissance',
        period: '1990s–Present',
        era: 'Literary Resurgence & Digital Revival',
        description: 'Rituparno Ghosh revives intelligent urban cinema. Modern directors cross over globally with digital formats.'
    }
];

const BENGALI_GALLERY = [
    { id: 'apu-train-scene', title: 'The Train Scene in Pather Panchali', subtitle: 'Cinematic Poetry' },
    { id: 'uttam-suchitra', title: 'Uttam-Suchitra Chemistry', subtitle: 'The Golden Couples Legacy' },
    { id: 'tollygunge-studios', title: 'Tollygunge Studios', subtitle: 'The Physical Cradle of Tollywood' },
    { id: 'cannes-recognition', title: 'Cannes Film Festival Recognition', subtitle: 'Art Cinema on the Global Stage' }
];

const BENGALI_REFERENCES = [
    { id: 'our-films', source: 'Satyajit Ray Memoirs', title: 'Our Films, Their Films (Orient Blackswan)' },
    { id: 'nfai-catalogs', source: 'National Film Archive of India (NFAI)', title: 'Bengali Cinema Heritage Index' },
    { id: 'new-theatres-docs', source: 'New Theatres Archives', title: 'Early Sound Recording and Playback Systems (1930s)' },
    { id: 'calcutta-uni', source: 'University of Calcutta', title: 'Department of Film Studies Research Journal on Parallel Cinema' }
];

/* =====================================================================
   DOM Interaction Logic (Wrapped to prevent errors in Node/Vitest)
   ===================================================================== */

function initBengaliExplorer() {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const galleryItems = [...document.querySelectorAll(".bengali-cinema-gallery-item")];

    const modal = document.getElementById("bengali-cinema-modal");
    const modalClose = document.getElementById("bengali-cinema-modal-close");
    const modalTitle = document.getElementById("bengali-modal-title");
    const modalHeading = document.getElementById("bengali-modal-heading");
    const modalDescription = document.getElementById("bengali-modal-description");

    // -----------------------------------------------------------------
    // Journey Integration (Bookmarks & Global Search)
    // -----------------------------------------------------------------
    function initJourney() {
        if (!window.Journey) return;

        // 1. Bookmark functionality
        bookmarkButtons.forEach((btn) => {
            const id = btn.dataset.bookmarkId;
            const title = "Bengali Cinema (Tollywood) Explorer";
            const thumbnail = "frontend/assets/bengali_banner.webp";
            const category = "culture";

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
                    explorerPage: "frontend/bengali-cinema-explorer/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        // 2. Global search index registration
        window.Journey.registerSearchItems("frontend/bengali-cinema-explorer/index.html", [
            {
                id: "bengali-cinema-main",
                title: "Bengali Cinema (Tollywood) Explorer",
                description: "Explore the artistic heritage of Bengali Cinema — Satyajit Ray's Pather Panchali, Ritwik Ghatak, Mrinal Sen, the Golden couple Uttam-Suchitra, and the evolution of Tollywood.",
                link: "frontend/bengali-cinema-explorer/index.html"
            },
            {
                id: "bengali-cinema-films",
                title: "Bengali Masterpiece Films",
                description: "Discover classic films like Pather Panchali, Meghe Dhaka Tara, Nayak, and Bhuvan Shome.",
                link: "frontend/bengali-cinema-explorer/index.html#films"
            },
            {
                id: "bengali-cinema-filmmakers",
                title: "Legendary Bengali Directors",
                description: "Study the pioneering work of Satyajit Ray, Ritwik Ghatak, Mrinal Sen, and Tapan Sinha.",
                link: "frontend/bengali-cinema-explorer/index.html#filmmakers"
            },
            {
                id: "bengali-cinema-timeline",
                title: "Bengali Cinema Timeline",
                description: "Historical chronology of Tollywood — from Madan Theatre silent films to New Theatres musicals and Parallel Cinema.",
                link: "frontend/bengali-cinema-explorer/index.html#timeline"
            }
        ]);
    }

    // -----------------------------------------------------------------
    // Gallery Modal Logic
    // -----------------------------------------------------------------
    let lastFocusedElement = null;

    function openModal(item) {
        if (!modal) return;
        lastFocusedElement = item;

        const title = item.getAttribute("data-title") || "";
        const desc = item.getAttribute("data-desc") || "";
        const subtitle = item.querySelector(".bengali-cinema-gallery-overlay p")?.textContent || "";

        if (modalTitle) modalTitle.textContent = title;
        if (modalHeading) modalHeading.textContent = subtitle;
        if (modalDescription) modalDescription.textContent = desc;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    galleryItems.forEach((item) => {
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
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // -----------------------------------------------------------------
    // Smooth scroll for anchor links
    // -----------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

    // Run initialization
    initJourney();
}

// Listen to SPA router transitions
document.addEventListener("app:route-changed", () => {
    initBengaliExplorer();
});

// Run on page load
if (typeof document !== 'undefined') {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initBengaliExplorer);
    } else {
        initBengaliExplorer();
    }
}
