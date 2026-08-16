/**
 * Munda Ulgulan Explorer
 * Interactive script: parallax, scroll-reveal, section nav,
 * interactive map, Journey bookmarks and search integration.
 */
document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Map location data */
    const mapLocations = {
        ulihatu: {
            title: "Ulihatu",
            desc: "Birsa Munda's birthplace (15 November 1875), in present-day Khunti district. Today it is a pilgrimage site where thousands gather on Janjatiya Gaurav Divas. A memorial commemorates the boy who would become Dharti Aba."
        },
        khunti: {
            title: "Khunti",
            desc: "The administrative centre of Birsa's movement. The town was a hotbed of Birsait activity. Birsa established his headquarters nearby and mobilised followers from the surrounding villages for the Ulgulan."
        },
        ranchi: {
            title: "Ranchi",
            desc: "The colonial district headquarters and site of Ranchi Jail, where Birsa was imprisoned twice. He died here on 9 June 1900, officially from cholera, though many believe he was poisoned. The jail is now the Birsa Munda Memorial Jail."
        },
        chaibasa: {
            title: "Chaibasa",
            desc: "Site of the German Lutheran Mission school where young Birsa studied. His exposure to missionary collaboration with colonial authorities here led to his disillusionment and his eventual rejection of Christianity."
        },
        dombari: {
            title: "Dombari Hill",
            desc: "Site of the decisive battle of January 1900 where British troops massacred over 400 Munda warriors armed with traditional weapons. The hill is now a memorial, and the site is sacred to Munda communities."
        },
        sailrakab: {
            title: "Sailrakab",
            desc: "One of the villages where Birsa established a sarna (sacred grove) and held gatherings. His followers gathered here to hear his prophecies and plan the Ulgulan. The village was a key recruitment centre."
        },
        jamkopai: {
            title: "Jamkopai Forest",
            desc: "Where Birsa Munda was captured by British forces on 3 February 1900, along with his close followers. He had taken refuge in the forest after the Battle of Dombari, but was betrayed by an informant."
        }
    };

    /* Welcome Toast */
    function showWelcomeToast() {
        if (document.getElementById("ulg-welcome-toast")) return;
        const toast = document.createElement("div");
        toast.id = "ulg-welcome-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px);
      background: rgba(15, 26, 18, 0.95); color: #eecb7e; padding: 1rem 1.5rem;
      border-radius: 12px; border: 1px solid rgba(217, 164, 65, 0.3); z-index: 1000;
      font-family: 'Outfit', sans-serif; font-size: 0.9rem; max-width: 500px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: transform 0.4s ease;
      backdrop-filter: blur(10px);`;
        toast.innerHTML = "<strong>🌿 Munda Ulgulan (1899–1900)</strong> — Birsa Munda's Great Tumult that shaped Jharkhand's destiny and won tribal land rights for generations.";
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
        const hero = document.querySelector(".ulg-hero");
        const backdrop = document.querySelector(".ulg-hero-backdrop");
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
        const nav = document.getElementById("ulg-section-nav");
        const links = [...document.querySelectorAll(".ulg-nav-link")];
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
                    explorerPage: "frontend/munda-ulgulan-explorer/index.html",
                    title: "Munda Ulgulan Explorer",
                    thumbnail: "https://placehold.co/100/0f1a12/d9a441?text=Munda+Ulgulan",
                    category: "history"
                });
                updateUI();
            });
        });

        window.Journey.registerSearchItems(
            "frontend/munda-ulgulan-explorer/index.html",
            [
                {
                    id: "munda-ulgulan-main",
                    title: "Munda Ulgulan Explorer",
                    description: "Birsa Munda's Ulgulan (1899–1900) — the Great Tumult that defended Munda land rights, challenged colonial rule, and forged the path to Jharkhand statehood.",
                    link: "frontend/munda-ulgulan-explorer/index.html"
                },
                {
                    id: "munda-ulgulan-society",
                    title: "Munda Society & Khuntkatti System",
                    description: "Explore the traditional Munda society: the communal khuntkatti land system, Sarna faith, sacred groves, and the cultural world that colonial rule threatened.",
                    link: "frontend/munda-ulgulan-explorer/index.html#society"
                },
                {
                    id: "munda-ulgulan-birsa",
                    title: "Birsa Munda: Dharti Aba",
                    description: "The life of Birsa Munda (1875–1900): from his birth at Ulihatu through his mission school years, his prophetic visions, and his leadership of the Ulgulan.",
                    link: "frontend/munda-ulgulan-explorer/index.html#birsa"
                },
                {
                    id: "munda-ulgulan-timeline",
                    title: "Ulgulan Timeline (1875–1908)",
                    description: "From Birsa's birth in 1875 through his arrest, the December 1899 outbreak, the Battle of Dombari, his capture at Jamkopai, and his death in Ranchi Jail in June 1900.",
                    link: "frontend/munda-ulgulan-explorer/index.html#timeline"
                },
                {
                    id: "munda-ulgulan-legacy",
                    title: "Legacy: CNT Act & Jharkhand Statehood",
                    description: "How Birsa's sacrifice led to the Chotanagpur Tenancy Act (1908), inspired the Jharkhand statehood movement, and is now honoured on Janjatiya Gaurav Divas.",
                    link: "frontend/munda-ulgulan-explorer/index.html#legacy"
                }
            ]
        );
    }
    initJourney();
});
