/**
 * Pollywood (Punjabi Cinema) Explorer - Interactive Logic & Exported Data
 * Handles gallery modal popups, bookmark/journey integration,
 * global search index registration, and scroll utilities.
 *
 * Follows the same architecture as dogri-cinema-explorer/script.js
 */

/* =====================================================================
   Data exports (consumed by unit tests via script loading)
   ===================================================================== */

const POLLYWOOD_CINEMA_INFO = {
    id: 'pollywood-cinema',
    name: 'Pollywood (Punjabi Cinema)',
    language: 'Punjabi',
    region: 'Punjab, India',
    schedule: 'Eighth Schedule, Constitution of India',
    hub: 'SAS Nagar (Mohali), Ludhiana, Amritsar',
    pioneerEra: '1930s–Present',
    culturalRoots: ['Bhangra Dance', 'Giddha Dance', 'Punjabi Lok Geet (Folk Songs)', 'Sufi Traditions']
};

const POLLYWOOD_FILMS = [
    {
        id: 'sheila-1935',
        title: 'Sheila (Pind Di Kuri)',
        year: 1935,
        genre: 'Romantic Drama',
        significance: 'The first Punjabi sound film, produced by K.D. Mehra in Calcutta.'
    },
    {
        id: 'chaudhary-karnail-singh',
        title: 'Chaudhary Karnail Singh',
        year: 1960,
        genre: 'Historical / Social',
        significance: 'Set against the backdrop of partition, it won the National Film Award for Best Feature Film in Punjabi.'
    },
    {
        id: 'chann-pardesi',
        title: 'Chann Pardesi',
        year: 1981,
        genre: 'Social Drama / Action',
        significance: 'First Punjabi film to win a National Film Award, showcasing top actors Raj Babbar, Om Puri, and Amrish Puri.'
    },
    {
        id: 'jee-aayan-nu',
        title: 'Jee Aayan Nu',
        year: 2002,
        genre: 'Musical Drama',
        significance: 'Revived the modern Punjabi film industry with premium production values, directed by Manmohan Singh.'
    },
    {
        id: 'jatt-and-juliet',
        title: 'Jatt & Juliet',
        year: 2012,
        genre: 'Romantic Comedy',
        significance: 'A massive commercial blockbuster starring Diljit Dosanjh, redefining Punjabi romantic comedy.'
    },
    {
        id: 'angrej',
        title: 'Angrej',
        year: 2015,
        genre: 'Period Romance',
        significance: 'Set in 1940s rural Punjab, celebrated for its authentic cultural detail and outstanding musical score.'
    }
];

const POLLYWOOD_ARTISTS = [
    {
        id: 'kd-mehra',
        name: 'K.D. Mehra',
        role: 'Pioneer Filmmaker',
        contribution: 'Directed Sheila (1935) and Heer Syal (1938), establishing Punjabi cinema\'s foundations.'
    },
    {
        id: 'gurdas-maan',
        name: 'Gurdas Maan',
        role: 'Legendary Actor & Singer',
        contribution: 'Sustained Punjabi cinema through difficult decades, starring in Boota Singh (1999) and other classics.'
    },
    {
        id: 'harbhajan-mann',
        name: 'Harbhajan Mann',
        role: 'Singer-Actor',
        contribution: 'Spearheaded the 21st-century revival of Pollywood with a string of NRI-themed musical blockbusters.'
    },
    {
        id: 'diljit-dosanjh',
        name: 'Diljit Dosanjh',
        role: 'Global Icon & Actor',
        contribution: 'Redefined commercial Punjabi cinema with blockbusters and successfully transitioned to national and global fame.'
    }
];

const POLLYWOOD_TIMELINE = [
    {
        id: 'early-talkies',
        period: '1930s–1940s',
        era: 'Early Talkies & Lahore Hub',
        description: 'First films emerge in Lahore before Partition, setting up early musical and theatrical foundations.'
    },
    {
        id: 'post-partition',
        period: '1950s–1960s',
        era: 'Partition Recovery & New Hubs',
        description: 'Filmmakers rebuild the industry in Mumbai and Punjab, producing national award-winning classics.'
    },
    {
        id: 'golden-era',
        period: '1970s–1980s',
        era: 'The Golden Age of Social Dramas',
        description: 'Films like Chann Pardesi (1981) and Long Da Lishkara (1986) bring social realism and stellar writing to screen.'
    },
    {
        id: 'decline-era',
        period: '1990s',
        era: 'Turbulent Years & Decline',
        description: 'Political instability and low production standards trigger a decline, save for isolated masterpieces.'
    },
    {
        id: 'modern-revival',
        period: '2000s–Present',
        era: 'Modern Resurgence & Global Reach',
        description: 'High-definition digital production and NRI crossover success establish Pollywood as a global box-office force.'
    }
];

const POLLYWOOD_GALLERY = [
    { id: 'bhangra-on-screen', title: 'Bhangra Dance on Screen', subtitle: 'Vibrant Celebration of Life' },
    { id: 'mustard-fields', title: 'Golden Mustard Fields', subtitle: 'Nature as a Cultural Canvas' },
    { id: 'dhol-rhythms', title: 'Dhol Rhythms', subtitle: 'The Heartbeat of Punjabi Music' },
    { id: 'global-triumph', title: 'Global Box Office', subtitle: 'Pollywood\'s International Crossover' }
];

const POLLYWOOD_REFERENCES = [
    { id: 'nfai', source: 'National Film Archive of India (NFAI)', title: 'Punjabi Cinema Heritage Archive' },
    { id: 'sahitya-akademi', source: 'Sahitya Akademi', title: 'Punjabi Literature and Cinematic Adaptations' },
    { id: 'punjabi-university', source: 'Punjabi University, Patiala', title: 'Department of Theatre and Television Studies' },
    { id: 'ptc-archives', source: 'PTC Network Archives', title: 'PTC Punjabi Film Awards & History Documentation' }
];

/* =====================================================================
   DOM Interaction Logic (Wrapped to prevent errors in Node/Vitest)
   ===================================================================== */

function initPollywoodExplorer() {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const galleryItems = [...document.querySelectorAll(".pollywood-cinema-gallery-item")];

    const modal = document.getElementById("pollywood-cinema-modal");
    const modalClose = document.getElementById("pollywood-cinema-modal-close");
    const modalTitle = document.getElementById("pollywood-modal-title");
    const modalHeading = document.getElementById("pollywood-modal-heading");
    const modalDescription = document.getElementById("pollywood-modal-description");

    // -----------------------------------------------------------------
    // Journey Integration (Bookmarks & Global Search)
    // -----------------------------------------------------------------
    function initJourney() {
        if (!window.Journey) return;

        // 1. Bookmark functionality
        bookmarkButtons.forEach((btn) => {
            const id = btn.dataset.bookmarkId;
            const title = "Pollywood (Punjabi Cinema) Explorer";
            const thumbnail = "frontend/assets/pollywood_banner.webp";
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
                    explorerPage: "frontend/pollywood-cinema-explorer/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateBookmarkUI();
            });
        });

        // 2. Global search index registration
        window.Journey.registerSearchItems("frontend/pollywood-cinema-explorer/index.html", [
            {
                id: "pollywood-cinema-main",
                title: "Pollywood (Punjabi Cinema) Explorer",
                description: "Discover Pollywood — the Punjabi film industry highlighting its music-driven culture, cinema evolution from Sheila (1935) to modern global crossover blockbusters.",
                link: "frontend/pollywood-cinema-explorer/index.html"
            },
            {
                id: "pollywood-cinema-films",
                title: "Top Punjabi Films",
                description: "From Sheila (1935) and Chann Pardesi (1981) to Jatt & Juliet and Angrej — the landmark films of Punjabi cinema history.",
                link: "frontend/pollywood-cinema-explorer/index.html#films"
            },
            {
                id: "pollywood-cinema-artists",
                title: "Pollywood Pioneers & Artists",
                description: "K.D. Mehra, Gurdas Maan, Harbhajan Mann, and Diljit Dosanjh — the artists who built Punjabi cinema's global legacy.",
                link: "frontend/pollywood-cinema-explorer/index.html#artists"
            },
            {
                id: "pollywood-cinema-music",
                title: "Music Influence in Punjabi Cinema",
                description: "Explore the deep connection between Bhangra, Giddha, and Sufi folk music with Pollywood's box-office triumphs.",
                link: "frontend/pollywood-cinema-explorer/index.html#music"
            },
            {
                id: "pollywood-cinema-timeline",
                title: "Punjabi Cinema Timeline",
                description: "A chronological journey from pre-partition Lahore talkies, recovery years, the social realism age, to the digital resurgence.",
                link: "frontend/pollywood-cinema-explorer/index.html#timeline"
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
        const subtitle = item.querySelector(".pollywood-cinema-gallery-overlay p")?.textContent || "";

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
    initPollywoodExplorer();
});

// Run on page load
if (typeof document !== 'undefined') {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPollywoodExplorer);
    } else {
        initPollywoodExplorer();
    }
}
