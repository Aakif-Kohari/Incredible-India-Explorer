/**
 * Deccan Riots 1875 Explorer
 * Interactive script: parallax, scroll-reveal, section nav,
 * interactive map, Journey bookmarks and search integration.
 */
document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Map location data */
    const mapLocations = {
        supa: {
            title: "Supa (Pune district)",
            desc: "The birthplace of the Deccan Riots. In 1874, villagers here boycotted moneylender Kalaram after he refused partial debt repayment. The successful social boycott strategy spread from here across the Deccan."
        },
        pune: {
            title: "Pune (Poona)",
            desc: "A major centre of the riots. Multiple villages in Pune taluka experienced bond burnings and social boycotts. The Deccan Riots Commission conducted extensive interviews here, and the British administration centre watched the unrest with alarm."
        },
        satara: {
            title: "Satara",
            desc: "A key affected district where the riot movement spread rapidly in mid-1875. Kunbi peasants organized coordinated social boycotts against Marwari and Brahmin moneylenders. Several villages saw public burnings of debt documents."
        },
        ahmednagar: {
            title: "Ahmednagar",
            desc: "Along with Pune and Satara, Ahmednagar was one of the three main districts affected. The riots here were characterised by disciplined, non-violent resistance — peasants targeted documents rather than people."
        },
        baramati: {
            title: "Baramati",
            desc: "A market town in Pune district where moneylenders from outside the community had established dominant positions. The riots targeted their account books and forced many to flee back to their native regions."
        },
        indapur: {
            title: "Indapur",
            desc: "One of the worst-affected talukas in Pune district. Peasants here had accumulated heavy debts during the cotton boom, and the post-1865 crash left them desperate. Social boycotts and bond burnings were widespread."
        }
    };

    /* Welcome Toast */
    function showWelcomeToast() {
        if (document.getElementById("deccan-welcome-toast")) return;
        const toast = document.createElement("div");
        toast.id = "deccan-welcome-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px);
      background: rgba(26, 20, 8, 0.95); color: #f0c97e; padding: 1rem 1.5rem;
      border-radius: 12px; border: 1px solid rgba(212, 168, 86, 0.3); z-index: 1000;
      font-family: 'Outfit', sans-serif; font-size: 0.9rem; max-width: 500px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: transform 0.4s ease;
      backdrop-filter: blur(10px);`;
        toast.innerHTML = "<strong>🌾 Deccan Riots (1875)</strong> — Maharashtra's kunbi peasants rose against moneylender tyranny, sparking India's first class-based agrarian movement.";
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.transform = "translateX(-50%) translateY(0)";
        });
        setTimeout(() => {
            toast.style.transform = "translateX(-50%) translateY(100px)";
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
    showWelcomeToast();

    /* Hero Parallax */
    function initParallax() {
        const hero = document.querySelector(".deccan-hero");
        const backdrop = document.querySelector(".deccan-hero-backdrop");
        if (!hero || !backdrop || prefersReducedMotion) return;
        const apply = () => {
            const rect = hero.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
            const shift = Math.min(Math.max(window.scrollY * 0.3, 0), 90);
            backdrop.style.transform = `translateY(${shift}px) scale(1.12)`;
        };
        let ticking = false;
        window.addEventListener("scroll", () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => { apply(); ticking = false; });
        }, { passive: true });
        apply();
    }
    initParallax();

    /* Scroll Reveal */
    let revealObserver = null;
    function initReveal() {
        const els = [...document.querySelectorAll(".reveal")];
        if (prefersReducedMotion) {
            els.forEach(el => el.classList.add("is-visible"));
            return;
        }
        if (revealObserver) revealObserver.disconnect();
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        els.forEach(el => revealObserver.observe(el));
    }
    initReveal();

    /* Section Nav Active State */
    let navObserver = null;
    function initSectionNav() {
        const nav = document.getElementById("deccan-section-nav");
        const links = [...document.querySelectorAll(".deccan-nav-link")];
        const sections = links.map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);
        if (!nav || !sections.length) return;
        if (navObserver) navObserver.disconnect();
        const setActive = (id) => {
            links.forEach(link => link.classList.toggle("active", link.dataset.navTarget === id));
        };
        navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: "-35% 0px -60% 0px", threshold: 0 });
        sections.forEach(s => navObserver.observe(s));
    }
    initSectionNav();

    /* Interactive Map */
    function initMap() {
        const markers = [...document.querySelectorAll(".map-marker")];
        const title = document.getElementById("map-info-title");
        const desc = document.getElementById("map-info-desc");
        if (!title || !desc) return;
        const updateInfo = (key) => {
            const loc = mapLocations[key];
            if (!loc) return;
            title.textContent = loc.title;
            desc.textContent = loc.desc;
        };
        markers.forEach(m => {
            const key = m.dataset.location;
            m.addEventListener("click", () => updateInfo(key));
            m.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    updateInfo(key);
                }
            });
        });
    }
    initMap();

    /* Scroll Top Button */
    const scrollTopBtn = document.getElementById("btn-scroll-top");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            scrollTopBtn.classList.toggle("visible", window.scrollY > 500);
        }, { passive: true });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* Journey Integration */
    function initJourney() {
        if (!window.Journey) return;

        bookmarkButtons.forEach(btn => {
            const id = btn.dataset.bookmarkId;
            const updateUI = () => {
                const saved = window.Journey.isSaved(id);
                btn.classList.toggle("is-saved", saved);
                btn.setAttribute("aria-pressed", String(saved));
                btn.innerHTML = saved ? "♥ Saved to Journey" : "♡ Save to Journey";
            };
            updateUI();
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                window.Journey.toggle({
                    id,
                    explorerPage: "frontend/deccan-riots-explorer/index.html",
                    title: "Deccan Riots 1875 Explorer",
                    thumbnail: "https://placehold.co/100/1a1408/d4a856?text=Deccan+1875",
                    category: "history"
                });
                updateUI();
            });
        });

        window.Journey.registerSearchItems(
            "frontend/deccan-riots-explorer/index.html",
            [
                {
                    id: "deccan-riots-main",
                    title: "Deccan Riots 1875 Explorer",
                    description: "The 1875 agrarian uprising of Maharashtra's kunbi peasants against moneylender tyranny and colonial revenue policies. Covers causes, events, map, timeline and the Deccan Agriculturists Relief Act.",
                    link: "frontend/deccan-riots-explorer/index.html"
                },
                {
                    id: "deccan-riots-economy",
                    title: "Deccan Agrarian Economy (1870s)",
                    description: "The economic context of the Deccan Riots: kunbi peasantry, cotton boom and crash, ryotwari revenue, and the debt trap created by outside moneylenders.",
                    link: "frontend/deccan-riots-explorer/index.html#economy"
                },
                {
                    id: "deccan-riots-causes",
                    title: "Causes of the Deccan Riots",
                    description: "Revenue pressures, bond fraud, moneylender dominance, colonial legal bias, and the post-cotton crash debt crisis that sparked the 1875 uprising.",
                    link: "frontend/deccan-riots-explorer/index.html#causes"
                },
                {
                    id: "deccan-riots-timeline",
                    title: "Deccan Riots Timeline (1865–1879)",
                    description: "From the 1865 cotton crash through the 1874 Supa boycott, the May–September 1875 riots, and the 1876 Deccan Agriculturists Relief Act.",
                    link: "frontend/deccan-riots-explorer/index.html#timeline"
                },
                {
                    id: "deccan-riots-outcomes",
                    title: "Deccan Agriculturists Relief Act 1876",
                    description: "How the 1875 riots forced the British to pass legislation protecting cultivators from usurious debts and setting a precedent for future agrarian reforms.",
                    link: "frontend/deccan-riots-explorer/index.html#outcomes"
                }
            ]
        );
    }
    initJourney();
});

