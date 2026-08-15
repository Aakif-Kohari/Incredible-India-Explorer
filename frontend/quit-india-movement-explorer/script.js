document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".qi-gallery-item")];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("qi-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "qi-welcome-toast";
    toast.className = "qi-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>🇮🇳 Quit India Movement</strong> — Launched at Gowalia Tank Maidan, Bombay, 8 August 1942. Gandhi's call: \"Do or Die.\"";
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 500);
    }, 3200);
  }

  showWelcomeToast();

  // --- Hero parallax -------------------------------------------------
  function initParallax() {
    const hero = document.querySelector(".qi-hero");
    const backdrop = document.querySelector(".qi-hero-backdrop");
    if (!hero || !backdrop || prefersReducedMotion) return;

    const applyParallax = () => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = window.scrollY;
      const maxShift = 90;
      const shift = Math.min(Math.max(offset * 0.3, 0), maxShift);
      backdrop.style.transform = `translateY(${shift}px) scale(1.12)`;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        applyParallax();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    applyParallax();
  }

  initParallax();

  // --- Scroll-reveal -------------------------------------------------
  let revealObserver = null;

  function initReveal() {
    const revealEls = [...document.querySelectorAll(".reveal")];

    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    if (revealObserver) revealObserver.disconnect();

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  initReveal();

  // --- Sticky section nav active state --------------------------------
  let navObserver = null;

  function initSectionNav() {
    const nav = document.getElementById("qi-section-nav");
    const navLinks = [...document.querySelectorAll(".qi-section-nav-link")];
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if (!nav || !sections.length) return;

    if (navObserver) navObserver.disconnect();

    const setActive = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.navTarget === id);
      });
    };

    navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: "-35% 0px -60% 0px", threshold: 0 });

    sections.forEach((section) => navObserver.observe(section));
  }

  initSectionNav();

  // --- Gallery Lightbox ------------------------------------------------
  const lightbox = document.getElementById("qi-lightbox");
  const lightboxImg = document.getElementById("qi-lightbox-img");
  const lightboxCaption = document.getElementById("qi-lightbox-caption");
  const lightboxClose = document.getElementById("qi-lightbox-close");
  const lightboxPrev = document.getElementById("qi-lightbox-prev");
  const lightboxNext = document.getElementById("qi-lightbox-next");

  let currentIndex = 0;
  let lastFocusedElement = null;

  function getFocusableItems() {
    return galleryItems.filter((item) => item.dataset && item.dataset.title);
  }

  function updateLightbox(index) {
    const items = getFocusableItems();
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;

    const item = items[currentIndex];
    const img = item.querySelector("img");
    const captionTitle = item.dataset.title || "";
    const captionDesc = item.querySelector("p")?.textContent || "";

    lightboxImg.src = img ? img.src : "";
    lightboxImg.alt = img ? img.alt : "";
    lightboxCaption.textContent = captionDesc ? `${captionTitle} — ${captionDesc}` : captionTitle;
  }

  function openLightbox(item) {
    if (!lightbox) return;

    const items = getFocusableItems();
    currentIndex = items.indexOf(item);
    lastFocusedElement = item;

    updateLightbox(currentIndex);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("qi-modal-open");

    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.classList.remove("qi-modal-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  galleryItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.addEventListener("click", () => openLightbox(item));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex + 1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target.matches("[data-lightbox-close]")) closeLightbox();
    });

    lightbox.addEventListener("keydown", (e) => {
      const focusables = [lightboxClose, lightboxPrev, lightboxNext].filter(Boolean);

      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        updateLightbox(currentIndex - 1);
        if (lightboxPrev) lightboxPrev.focus();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        updateLightbox(currentIndex + 1);
        if (lightboxNext) lightboxNext.focus();
        return;
      }

      if (e.key === "Tab" && focusables.length > 1) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // --- Interactive Historical Bombay Map (Leaflet satellite) -----------
  const MAP_POINTS = {
    maidan: {
      title: "Gowalia Tank Maidan",
      tag: "📍 Resolution Venue",
      body: "The AICC pandal rose here on 7–8 August 1942. The Quit India resolution was passed and Gandhi's \"Do or Die\" speech delivered on this ground; today it is August Kranti Maidan.",
      coords: [18.9625, 72.8097],
      category: "maidan",
      markerClass: "is-maidan"
    },
    "birla-house": {
      title: "Birla House",
      tag: "🚨 Gandhi's Residence",
      body: "Gandhi's Bombay residence on Mount Pleasant Road. In the early hours of 9 August, police surrounded the house and arrested Gandhi, Nehru, Patel, Azad, Naidu, Prasad and Kripalani.",
      coords: [18.9464, 72.7935],
      category: "arrest",
      markerClass: "is-arrest"
    },
    "congress-house": {
      title: "AICC Congress House",
      tag: "🏛️ Party Headquarters",
      body: "The All India Congress Committee's Bombay office. Within days of the resolution, the government declared the Congress unlawful, seized its offices and confiscated its funds.",
      coords: [18.9589, 72.8153],
      category: "city",
      markerClass: "is-city"
    },
    vt: {
      title: "Victoria Terminus",
      tag: "🚉 Gateway of the Arrests",
      body: "From this station, the arrested leaders were put aboard a special train on the morning of 9 August 1942 and carried to Aga Khan Palace, Poona.",
      coords: [18.9398, 72.8355],
      category: "city",
      markerClass: "is-city"
    },
    "town-hall": {
      title: "Bombay Town Hall",
      tag: "🏛️ Civic Landmark",
      body: "The civic heart of colonial Bombay, home of the Asiatic Society. Its steps and the surrounding Fort district saw huge crowds gather as news of the arrests spread on 9 August.",
      coords: [18.9323, 72.8324],
      category: "city",
      markerClass: "is-city"
    },
    "high-court": {
      title: "Bombay High Court",
      tag: "⚖️ Colonial Justice",
      body: "The seat of the Bombay judiciary. Quit India prisoners were tried and sentenced here in the weeks after the launch, part of the state's crackdown on the movement.",
      coords: [18.925, 72.8313],
      category: "city",
      markerClass: "is-city"
    },
    gateway: {
      title: "Gateway of India",
      tag: "🛡️ Imperial Bombay",
      body: "The grand arch of imperial Bombay, completed in 1924. Its presence symbolised the British power the Quit India resolution of 8 August 1942 demanded be ended.",
      coords: [18.922, 72.8347],
      category: "city",
      markerClass: "is-city"
    },
    "marine-drive": {
      title: "Marine Drive",
      tag: "🌊 The City's Spine",
      body: "The great reclamation road along Back Bay. On the morning of 9 August, its length filled with processions and police — the whole city was on the move.",
      coords: [18.9436, 72.8224],
      category: "city",
      markerClass: "is-city"
    }
  };

  const mapDetailTitle = document.getElementById("qi-map-detail-title");
  const mapDetailBody = document.getElementById("qi-map-detail-body");
  const mapDetailTag = document.getElementById("qi-map-detail-tag");
  const mapContainer = document.getElementById("qi-bombay-map");

  let bombayMap = null;
  let bombayMarkers = {};

  function showMapPoint(pointId, { flyTo = false, openPopup = false } = {}) {
    const point = MAP_POINTS[pointId];
    if (!point) return;

    if (mapDetailTitle) mapDetailTitle.textContent = point.title;
    if (mapDetailBody) mapDetailBody.textContent = point.body;
    if (mapDetailTag) {
      mapDetailTag.textContent = point.tag;
      mapDetailTag.style.color = "var(--qi-gold)";
    }

    if (bombayMap && point.coords) {
      if (flyTo) bombayMap.flyTo(point.coords, Math.max(bombayMap.getZoom(), 14), { duration: 0.9 });
      const marker = bombayMarkers[pointId];
      if (openPopup && marker) marker.openPopup();
    }
  }

  function initBombayMap() {
    if (!mapContainer || bombayMap) return;
    if (typeof L === "undefined") return;

    bombayMap = L.map(mapContainer, {
      center: [18.9435, 72.8245],
      zoom: 13,
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: false
    });

    L.control.zoom({ position: "bottomleft" }).addTo(bombayMap);

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19,
      attribution: "Tiles © Esri"
    }).addTo(bombayMap);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors © CARTO"
    }).addTo(bombayMap);

    const letterFor = {};
    Object.keys(MAP_POINTS).forEach((id, i) => {
      letterFor[id] = String.fromCharCode(65 + i);
    });

    Object.entries(MAP_POINTS).forEach(([id, point]) => {
      const icon = L.divIcon({
        className: `qi-map-marker ${point.markerClass}`,
        html: `<span aria-hidden="true">${letterFor[id]}</span>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -12]
      });

      const marker = L.marker(point.coords, { icon, title: point.title, alt: point.title, keyboard: true }).addTo(bombayMap);

      marker.bindTooltip(point.title, { direction: "top", offset: [0, -10], className: "qi-map-tooltip" });

      const popupContent = document.createElement("div");
      popupContent.innerHTML = `<p class="qi-popup-title">${point.title}</p><p class="qi-popup-desc">${point.body}</p><span class="qi-popup-tag">${point.tag}</span>`;
      marker.bindPopup(popupContent, { className: "qi-map-popup", closeButton: true, maxWidth: 280 });

      marker.on("click", () => showMapPoint(id));
      marker.on("keydown", (e) => {
        if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
          e.originalEvent.preventDefault();
          showMapPoint(id, { openPopup: true });
        }
      });

      bombayMarkers[id] = marker;
    });

    showMapPoint("maidan");

    requestAnimationFrame(() => bombayMap.invalidateSize());
    setTimeout(() => bombayMap.invalidateSize(), 400);

    const canvas = mapContainer.closest(".qi-map-canvas");
    if (canvas && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) bombayMap.invalidateSize();
        });
      }, { threshold: 0.05 });
      revealObserver.observe(canvas);
    }
  }

  initBombayMap();

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Quit India Movement — Bombay Launch";
      const thumbnail = "https://placehold.co/100/0f0c07/f5c36b?text=QuitIndia";
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
          explorerPage: "frontend/quit-india-movement-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems(
      "frontend/quit-india-movement-explorer/index.html",
      [
        {
          id: "quit-india-movement-main",
          title: "Quit India Movement — Bombay Launch",
          description: "Explore the Bombay launch of the Quit India Movement: the AICC session at Gowalia Tank Maidan on 8 August 1942, the Quit India resolution moved by Nehru, Gandhi's 'Do or Die' call, the arrests of 9 August and the nationwide storm that followed.",
          link: "frontend/quit-india-movement-explorer/index.html"
        },
        {
          id: "quit-india-movement-context",
          title: "Bombay Political Context of 1942",
          description: "Why the Congress launched Quit India from Bombay in 1942: the World War at India's gates, the failure of the Cripps Mission, and the Wardha draft of July 1942.",
          link: "frontend/quit-india-movement-explorer/index.html#context"
        },
        {
          id: "quit-india-movement-maidan",
          title: "Gowalia Tank Maidan, Bombay",
          description: "The ground where the AICC passed the Quit India resolution on 8 August 1942 — today August Kranti Maidan, where Aruna Asaf Ali hoisted the flag on 9 August.",
          link: "frontend/quit-india-movement-explorer/index.html#maidan"
        },
        {
          id: "quit-india-movement-resolution",
          title: "The Quit India Resolution",
          description: "The resolution moved by Nehru and seconded by Patel demanding the immediate end of British rule in India, passed by the AICC at Bombay on 8 August 1942.",
          link: "frontend/quit-india-movement-explorer/index.html#resolution"
        },
        {
          id: "quit-india-movement-speech",
          title: "Gandhi's 'Do or Die' Speech",
          description: "Mahatma Gandhi's 'Karo Ya Maro' (Do or Die) speech at Gowalia Tank Maidan, Bombay, on 8 August 1942 — the mantra that became the movement's battle cry.",
          link: "frontend/quit-india-movement-explorer/index.html#speech"
        },
        {
          id: "quit-india-movement-leaders",
          title: "Congress Leadership at the Bombay Session",
          description: "The leaders of the 8 August 1942 AICC session: Gandhi, Nehru, Patel, Azad, Sarojini Naidu, Aruna Asaf Ali, Yusuf Meherally and J. B. Kripalani.",
          link: "frontend/quit-india-movement-explorer/index.html#leaders"
        },
        {
          id: "quit-india-movement-timeline",
          title: "Quit India Launch Timeline (8–9 August 1942)",
          description: "From the Wardha draft of 14 July 1942, the Bombay session of 7–8 August, the resolution and Gandhi's speech, the dawn arrests of 9 August, to the nationwide protests.",
          link: "frontend/quit-india-movement-explorer/index.html#timeline"
        },
        {
          id: "quit-india-movement-map",
          title: "Historical Bombay Map, August 1942",
          description: "Interactive map of Bombay in 1942: Gowalia Tank Maidan, Birla House, AICC Congress House, Victoria Terminus, Town Hall, High Court, Gateway of India and Marine Drive.",
          link: "frontend/quit-india-movement-explorer/index.html#map"
        },
        {
          id: "quit-india-movement-aftermath",
          title: "Arrests of 9 August & Nationwide Protests",
          description: "The pre-dawn arrests of the Congress leadership on 9 August 1942 and the nationwide storm that followed, from Bombay's mills to the villages of Bihar and the Central Provinces.",
          link: "frontend/quit-india-movement-explorer/index.html#aftermath"
        }
      ]
    );
  }

  // Run initialization
  initJourney();
});
