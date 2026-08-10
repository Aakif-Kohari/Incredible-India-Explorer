/**
 * Santhal Hul Explorer - Interactive script
 * Handles parallax, scroll-reveal, section nav, interactive map,
 * journey bookmarks and global search integration.
 */
document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Map location data ---------- */
    const mapLocations = {
        bhognadih: {
            title: "Bhognadih",
            desc: "The village where Sidhu and Kanhu Murmu were born. On 30 June 1855, they gathered 60,000 Santhals here and formally declared the Hul. The gathering site is now a memorial called the Hul Sthal, visited annually on Hul Diwas."
        },
        pirpainti: {
            title: "Pirpainti",
            desc: "A key battle site where Santhal forces defeated the local Darogha (police officer) and his men in July 1855. The victory opened up the route toward Bhagalpur and showed the British that the uprising was well-coordinated."
        },
        kahalgaon: {
            title: "Kahalgaon",
            desc: "Site of a major confrontation in August 1855 where the Santhals clashed with British forces. Despite fierce resistance, the warriors — armed mainly with bows and arrows — were outgunned by musket-armed troops."
        },
        rajmahal: {
            title: "Rajmahal Hills",
            desc: "The ancestral homeland of the Santhals in the early 19th century. The Daman-i-Koh (skirts of the hills) was the forested area they were encouraged to clear by the British, only to later be dispossessed by dikus."
        },
        bhagalpur: {
            title: "Bhagalpur",
            desc: "Where Santhal delegations presented petitions to the British Collector — only to be dismissed. Later, Sidhu Murmu was captured and hanged here in November 1855. Kanhu and the other brothers were also executed at Bhagalpur."
        },
        dumka: {
            title: "Dumka",
            desc: "The administrative centre of the Santhal Parganas, created in 1856 as a direct response to the Hul. It became the seat of the Deputy Commissioner who governed this non-regulation district with special protections for Santhal land."
        }
    };

    /* ---------- Welcome Toast ---------- */
    function showWelcomeToast() {
        if (document.getElementById("hul-welcome-toast")) return;
        const toast = document.createElement("div");
        toast.id = "hul-welcome-toast";
        toast.className = "hul-welcome-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px);
      background: rgba(26, 15, 8, 0.95); color: #f0c97e; padding: 1rem 1.5rem;
      border-radius: 12px; border: 1px solid rgba(212, 168, 86, 0.3); z-index: 1000;
      font-family: 'Outfit', sans-serif; font-size: 0.9rem; max-width: 500px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: transform 0.4s ease;
      backdrop-filter: blur(10px);`;
        toast.innerHTML = "<strong>🌾 Santhal Hul (1855–1856)</strong> — the great tribal uprising that forced the British to create the Santhal Parganas.";
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

    /* ---------- Hero Parallax ---------- */
    function initParallax() {
        const hero = document.querySelector(".hul-hero");
        const backdrop = document.querySelector(".hul-hero-backdrop");
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

    /* ---------- Scroll Reveal ---------- */
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

    /* ---------- Sticky Section Nav ---------- */
    let navObserver = null;
    function initSectionNav() {
        const nav = document.getElementById("hul-section-nav");
        const navLinks = [...document.querySelectorAll(".hul-section-nav-link")];
        const sections = navLinks.map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);
        if (!nav || !sections.length) return;
        if (navObserver) navObserver.disconnect();
        const setActive = (id) => {
            navLinks.forEach(link => {
                link.classList.toggle("active", link.dataset.navTarget === id);
            });
        };
        navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: "-35% 0px -60% 0px", threshold: 0 });
        sections.forEach(s => navObserver.observe(s));
    }
    initSectionNav();

    /* ---------- Interactive Map ---------- */
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

    /* ---------- Scroll Top Button ---------- */
    const scrollTopBtn = document.getElementById("btn-scroll-top");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            scrollTopBtn.classList.toggle("visible", window.scrollY > 500);
        }, { passive: true });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---------- Journey Integration ---------- */
    function initJourney() {
        if (!window.Journey) return;

        bookmarkButtons.forEach(btn => {
            const id = btn.dataset.bookmarkId;
            const title = "Santhal Hul Explorer";
            const thumbnail = "https://placehold.co/100/1a0f08/d4a856?text=Santhal+Hul";
            const category = "history";

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
                    explorerPage: "frontend/santhal-hul-explorer/index.html",
                    title,
                    thumbnail,
                    category
                });
                updateUI();
            });
        });

        window.Journey.registerSearchItems(
            "frontend/santhal-hul-explorer/index.html",
            [
                {
                    id: "santhal-hul-main",
                    title: "Santhal Hul Explorer",
                    description: "The great tribal uprising (1855–1856) led by Sidhu, Kanhu, Chand and Bhairav Murmu against colonial exploitation, zamindari oppression and moneylender tyranny in eastern India.",
                    link: "frontend/santhal-hul-explorer/index.html"
                },
                {
                    id: "santhal-hul-causes",
                    title: "Causes of the Santhal Hul",
                    description: "Explore the roots of the Hul: zamindari exploitation, moneylender tyranny, colonial indifference, loss of land and forests, and denial of justice to the Santhal people.",
                    link: "frontend/santhal-hul-explorer/index.html#causes"
                },
                {
                    id: "santhal-hul-leaders",
                    title: "Leaders of the Santhal Hul",
                    description: "Meet the Murmu brothers — Sidhu, Kanhu, Chand and Bhairav — and their sisters Phulo and Jhano, who led 60,000 Santhals in rebellion.",
                    link: "frontend/santhal-hul-explorer/index.html#leaders"
                },
                {
                    id: "santhal-hul-timeline",
                    title: "Santhal Hul Timeline",
                    description: "From the Permanent Settlement of 1793 to the declaration of Hul on 30 June 1855, through the battles and executions, to the creation of the Santhal Parganas in 1856.",
                    link: "frontend/santhal-hul-explorer/index.html#timeline"
                },
                {
                    id: "santhal-hul-legacy",
                    title: "Legacy of the Santhal Hul",
                    description: "How the Hul inspired later tribal movements, influenced land rights legislation like the Chotanagpur Tenancy Act, and shaped Jharkhand's identity.",
                    link: "frontend/santhal-hul-explorer/index.html#legacy"
                }
            ]
        );
    }
    initJourney();
});
