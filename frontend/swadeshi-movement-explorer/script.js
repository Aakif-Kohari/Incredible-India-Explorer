/**
 * Swadeshi Movement Explorer
 * Interactive script: parallax, scroll-reveal, section nav,
 * interactive map, Journey bookmarks and search integration.
 */
document.addEventListener("app:route-changed", () => {
    const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Map location data */
    const mapLocations = {
        calcutta: {
            title: "Calcutta (Kolkata)",
            desc: "The epicentre of the Swadeshi Movement. On 16 October 1905 (partition day), Tagore led a huge Raksha Bandhan procession through the city. Foreign goods were publicly burned at the Maidan. The Bengal National College, Dawn Society, and Swadeshi stores were all based here."
        },
        dacca: {
            title: "Dacca (Dhaka)",
            desc: "The capital of the new province of East Bengal and Assam. Despite being a partition creation, Dacca became a strong Swadeshi centre. Nawab Salimullah initially supported partition, but Swadeshi activists won over many Bengali Muslims through inclusive campaigns."
        },
        barisal: {
            title: "Barisal",
            desc: "One of the strongest Swadeshi centres in East Bengal. Ashwini Kumar Dutt built the Swaraj Sangha here, with volunteer corps enforcing boycotts. Barisal's rural mobilisation made the movement genuinely mass-based, reaching villages that elite Calcutta could not."
        },
        bombay: {
            title: "Bombay (Mumbai)",
            desc: "The Swadeshi message spread to Bombay, where Bal Gangadhar Tilak had already been building mass politics through Ganpati and Shivaji festivals. Bombay industrialists supported Swadeshi enterprises financially, and Swadeshi shops opened across the city."
        },
        pune: {
            title: "Pune (Poona)",
            desc: "Tilak's home base and a major Swadeshi centre in Maharashtra. The Kesari newspaper spread the movement's message. Tilak used cultural festivals to mobilise the masses. His 1908 imprisonment in Mandalay jail marked a turning point in the movement's decline."
        },
        lahore: {
            title: "Lahore",
            desc: "Punjab's Swadeshi hub. Lala Lajpat Rai mobilised Punjabis through his newspaper Punjabee and the Arya Samaj network. The movement reached students, workers, and soldiers. Lajpat Rai's deportation to Burma in 1907 weakened Punjab's resistance."
        },
        madras: {
            title: "Madras (Chennai)",
            desc: "The southern extension of Swadeshi. Bipin Chandra Pal's tour of Madras in 1907 sparked the movement. V.O. Chidambaram Pillai (VOC) led Swadeshi in Tamil Nadu, establishing the Swadeshi Steam Navigation Company, which competed with British shipping."
        }
    };

    /* Welcome Toast */
    function showWelcomeToast() {
        if (document.getElementById("swd-welcome-toast")) return;
        const toast = document.createElement("div");
        toast.id = "swd-welcome-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(100px);
      background: rgba(20, 8, 10, 0.95); color: #f0c97e; padding: 1rem 1.5rem;
      border-radius: 12px; border: 1px solid rgba(244, 232, 200, 0.3); z-index: 1000;
      font-family: 'Outfit', sans-serif; font-size: 0.9rem; max-width: 500px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: transform 0.4s ease;
      backdrop-filter: blur(10px);`;
        toast.innerHTML = "<strong>🔥 Swadeshi Movement (1905–1911)</strong> — India's first mass movement against the Partition of Bengal. Boycotts, bonfires, and the birth of revolutionary nationalism.";
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
        const hero = document.querySelector(".swd-hero");
        const backdrop = document.querySelector(".swd-hero-backdrop");
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
        const nav = document.getElementById("swd-section-nav");
        const links = [...document.querySelectorAll(".swd-nav-link")];
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
                    explorerPage: "frontend/swadeshi-movement-explorer/index.html",
                    title: "Swadeshi Movement Explorer",
                    thumbnail: "https://placehold.co/100/14080a/f4e8c8?text=Swadeshi+1905",
                    category: "history"
                });
                updateUI();
            });
        });

        window.Journey.registerSearchItems(
            "frontend/swadeshi-movement-explorer/index.html",
            [
                {
                    id: "swadeshi-main",
                    title: "Swadeshi Movement Explorer",
                    description: "India's first mass movement against the Partition of Bengal (1905–1911). Boycotts, national education, Swadeshi production, and the rise of revolutionary nationalism.",
                    link: "frontend/swadeshi-movement-explorer/index.html"
                },
                {
                    id: "swadeshi-partition",
                    title: "Partition of Bengal (1905)",
                    description: "Lord Curzon's Partition of Bengal on 16 October 1905: the event that sparked the Swadeshi Movement. Official reason vs political motive, and Bengali outrage.",
                    link: "frontend/swadeshi-movement-explorer/index.html#partition"
                },
                {
                    id: "swadeshi-leaders",
                    title: "Leaders of the Swadeshi Movement",
                    description: "Bipin Chandra Pal, Aurobindo Ghosh, Tilak, Lajpat Rai, Tagore and Ashwini Kumar Dutt — the Lal-Bal-Pal extremists and cultural leaders who shaped Swadeshi.",
                    link: "frontend/swadeshi-movement-explorer/index.html#leaders"
                },
                {
                    id: "swadeshi-timeline",
                    title: "Swadeshi Movement Timeline (1905–1911)",
                    description: "From the July 1905 partition announcement through the 1906 Congress resolutions, the 1907 Surat Split, Tilak's 1908 imprisonment, and the 1911 annulment of partition.",
                    link: "frontend/swadeshi-movement-explorer/index.html#timeline"
                },
                {
                    id: "swadeshi-legacy",
                    title: "Swadeshi Legacy & Impact",
                    description: "How Swadeshi gave Gandhi the template for Non-Cooperation, birthed the revolutionary movement, and transformed Indian nationalism from elite petitions to mass agitation.",
                    link: "frontend/swadeshi-movement-explorer/index.html#legacy"
                }
            ]
        );
    }
    initJourney();
});

