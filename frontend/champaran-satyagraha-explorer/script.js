/**
 * Champaran Satyagraha Explorer
 * Interactive script: parallax, scroll-reveal, section nav,
 * interactive map, Journey bookmarks and search integration.
 */
document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Map location data */
    const mapLocations = {
        motihari: {
            title: "Motihari",
            desc: "The district headquarters of Champaran and the operational base of Gandhi's satyagraha. Here, Gandhi appeared in court on 18 April 1917 and refused to leave Champaran. His famous statement — 'I have entered the country to render humanitarian and national service' — was read here. The court case was dropped, marking the first victory of Indian satyagraha."
        },
        bettiah: {
            title: "Bettiah",
            desc: "A major subdivision of Champaran where Gandhi visited several villages to record testimonies. The Bettiah Raj was one of the largest zamindaris, and many planter atrocities occurred in its territory. Gandhi held public meetings here that drew thousands of ryots."
        },
        narkatiaganj: {
            title: "Narkatiaganj",
            desc: "Home village of Raj Kumar Shukla, the peasant who brought Gandhi to Champaran. Shukla had met Gandhi at the 1916 Lucknow Congress and persisted in urging him to visit. From here, the movement's first local support network was built."
        },
        ratanpur: {
            title: "Ratanpur",
            desc: "A village where Gandhi recorded detailed testimonies about planter atrocities. The evidence gathered here — including accounts of forced labour, illegal cesses, and physical assaults — was crucial for the Champaran Agrarian Committee's report."
        },
        jasaulipatti: {
            title: "Jasaulipatti",
            desc: "The first village Gandhi visited on arrival in Champaran, where a ryot named Rai Bahadur Dharanidhar had been assaulted by planter agents. This incident triggered Gandhi's decision to stay and investigate — and led to the British order for him to leave."
        },
        turkaulia: {
            title: "Turkaulia",
            desc: "Site of one of the most notorious indigo factories. Gandhi visited the factory and surrounding villages, recording testimonies about the tinkathia system's harshest effects. Turkaulia became a symbol of the planter oppression that the movement fought against."
        }
    };

    /* Welcome Toast */
    function showWelcomeToast() {
        if (document.getElementById("cmp-welcome-toast")) return;
        const toast = document.createElement("div");
        toast.id = "cmp-welcome-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px);
      background: rgba(10, 26, 42, 0.95); color: #f8edb8; padding: 1rem 1.5rem;
      border-radius: 12px; border: 1px solid rgba(244, 224, 168, 0.3); z-index: 1000;
      font-family: 'Outfit', sans-serif; font-size: 0.9rem; max-width: 500px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: transform 0.4s ease;
      backdrop-filter: blur(10px);`;
        toast.innerHTML = "<strong>🌾 Champaran Satyagraha (1917)</strong> — Gandhi's first satyagraha in India, where he stood with indigo ryots against the exploitative tinkathia system.";
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
        const hero = document.querySelector(".cmp-hero");
        const backdrop = document.querySelector(".cmp-hero-backdrop");
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
        const nav = document.getElementById("cmp-section-nav");
        const links = [...document.querySelectorAll(".cmp-nav-link")];
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
                    explorerPage: "frontend/champaran-satyagraha-explorer/index.html",
                    title: "Champaran Satyagraha Explorer",
                    thumbnail: "https://placehold.co/100/0a1a2a/f4e0a8?text=Champaran+1917",
                    category: "history"
                });
                updateUI();
            });
        });

        window.Journey.registerSearchItems(
            "frontend/champaran-satyagraha-explorer/index.html",
            [
                {
                    id: "champaran-main",
                    title: "Champaran Satyagraha Explorer",
                    description: "Gandhi's first satyagraha on Indian soil (1917) — standing with indigo cultivators against the exploitative tinkathia system of British planters in Champaran, Bihar.",
                    link: "frontend/champaran-satyagraha-explorer/index.html"
                },
                {
                    id: "champaran-indigo",
                    title: "The Tinkathia Indigo System",
                    description: "How the tinkathia system forced ryots to plant indigo on 15% of their land for British planters, with below-cost prices, illegal cesses, and forced labour.",
                    link: "frontend/champaran-satyagraha-explorer/index.html#indigo"
                },
                {
                    id: "champaran-people",
                    title: "Key People of Champaran",
                    description: "Meet Raj Kumar Shukla (who brought Gandhi to Champaran), Gandhi himself, Rajendra Prasad, J.B. Kripalani, Mazharul Haque, and Kasturba Gandhi — the team behind the satyagraha.",
                    link: "frontend/champaran-satyagraha-explorer/index.html#people"
                },
                {
                    id: "champaran-timeline",
                    title: "Champaran Satyagraha Timeline (1916–1918)",
                    description: "From Raj Kumar Shukla's invitation at Lucknow Congress (1916) through Gandhi's arrival in April 1917, the court case, mass testimony campaign, and the Champaran Agrarian Act of 1918.",
                    link: "frontend/champaran-satyagraha-explorer/index.html#timeline"
                },
                {
                    id: "champaran-legacy",
                    title: "Champaran Legacy & Significance",
                    description: "How Champaran launched Gandhi's Indian career, established satyagraha as a method of resistance, built the leadership team for Indian freedom, and inspired all future Gandhian movements.",
                    link: "frontend/champaran-satyagraha-explorer/index.html#legacy"
                }
            ]
        );
    }
    initJourney();
});

