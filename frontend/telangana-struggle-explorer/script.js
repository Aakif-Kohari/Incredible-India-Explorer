document.documentElement.classList.add("ts-js-ready");

document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".ts-gallery-item")];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("ts-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "ts-welcome-toast";
    toast.className = "ts-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>🚩 Telangana Armed Struggle</strong> — From the vetti-bound villages of Nalgonda to the tanks of Operation Polo: \"Vettichakiri Virodham!\" — no more forced labour.";
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 500);
    }, 3800);
  }

  showWelcomeToast();

  // --- Hero parallax -------------------------------------------------
  function initParallax() {
    const hero = document.querySelector(".ts-hero");
    const backdrop = document.querySelector(".ts-hero-backdrop");
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
    const nav = document.getElementById("ts-section-nav");
    const navLinks = [...document.querySelectorAll(".ts-section-nav-link")];
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
  const lightbox = document.getElementById("ts-lightbox");
  const lightboxImg = document.getElementById("ts-lightbox-img");
  const lightboxCaption = document.getElementById("ts-lightbox-caption");
  const lightboxClose = document.getElementById("ts-lightbox-close");
  const lightboxPrev = document.getElementById("ts-lightbox-prev");
  const lightboxNext = document.getElementById("ts-lightbox-next");

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
    const captionDesc = item.dataset.desc || item.querySelector("p")?.textContent || "";

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
    document.body.classList.add("ts-modal-open");

    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.classList.remove("ts-modal-open");

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

  // --- Interactive Telangana Map (Leaflet satellite) --------------------
  const MAP_POINTS = {
    hyderabad: {
      title: "Hyderabad City",
      tag: "🏰 The Nizam's Capital",
      body: "The seat of the Nizam, the court of the Asaf Jahs, and the capital of the princely state. From the Charminar to Golconda, this was the heart of the power the Telangana peasantry rose against — and the object of the Police Action of 1948.",
      coords: [17.385, 78.4867],
      category: "capital",
      markerClass: "is-capital"
    },
    secunderabad: {
      title: "Secunderabad",
      tag: "🏰 The Cantonment",
      body: "The twin city of the British and Indian cantonment in the Nizam's state — where Indian troops were stationed across the border of Hyderabad, and from where columns of the Police Action would eventually advance.",
      coords: [17.4399, 78.4983],
      category: "capital",
      markerClass: "is-capital"
    },
    golconda: {
      title: "Golconda Fort",
      tag: "🏰 The Old Fortress",
      body: "The great diamond fortress of the Qutb Shahis beneath which the city of the Nizams grew. Golconda stands as the symbol of the Deccan's sovereign past that the Asaf Jahs inherited.",
      coords: [17.3833, 78.4011],
      category: "capital",
      markerClass: "is-capital"
    },
    nalgonda: {
      title: "Nalgonda District",
      tag: "🚩 Epicentre of the Struggle",
      body: "Where it all began — the jagir villages of Nalgonda refused vetti and seized land in the summer of 1946. Kadivendi, Devarakonda and the tank country of the district became the heartland of the movement and its gram rajyams.",
      coords: [17.0579, 79.2675],
      category: "core",
      markerClass: "is-core"
    },
    warangal: {
      title: "Warangal District",
      tag: "🚩 Core District",
      body: "The country of the Kakatiyas and one of the three great districts of the struggle. Warangal's villages, dominated by deshmukhs and jagirdars, rose alongside Nalgonda and were among the fiercest guerrilla zones of 1948–51.",
      coords: [17.9689, 79.5941],
      category: "core",
      markerClass: "is-core"
    },
    khammam: {
      title: "Khammam District",
      tag: "🚩 Core District",
      body: "The forested eastern district of the struggle, where the movement's guerrilla zones stretched toward the Godavari. Khammam's adivasi and peasant villages were among the last to be ground down by the military operations.",
      coords: [17.2473, 80.1514],
      category: "core",
      markerClass: "is-core"
    },
    mahabubnagar: {
      title: "Mahabubnagar",
      tag: "🗺️ Area of Spread",
      body: "The southern district of the state where the movement and the Razakar raids spread beyond the three core districts, drawing the countryside of the Raichur doab into the confrontation.",
      coords: [16.7486, 77.9848],
      category: "spread",
      markerClass: "is-spread"
    },
    karimnagar: {
      title: "Karimnagar",
      tag: "🗺️ Area of Spread",
      body: "The northern district of the deshmukh country, where peasant organizing and the wider agitation against the Nizam's rule extended the struggle's reach beyond the heartland of the south.",
      coords: [18.4386, 79.1288],
      category: "spread",
      markerClass: "is-spread"
    },
    medak: {
      title: "Medak",
      tag: "🗺️ Area of Spread",
      body: "The district between Hyderabad and the core country, through which the agitation and the military operations of 1948 passed — part of the wider geography over which the struggle and its suppression rolled.",
      coords: [18.0449, 78.2883],
      category: "spread",
      markerClass: "is-spread"
    },
    adilabad: {
      title: "Adilabad",
      tag: "🗺️ Area of Spread",
      body: "The far north of the state, where the movement and the later guerrilla operations reached into the forest and teak country of the Godavari valley, far from the capital.",
      coords: [19.6715, 78.5366],
      category: "spread",
      markerClass: "is-spread"
    }
  };

  const mapDetailTitle = document.getElementById("ts-map-detail-title");
  const mapDetailBody = document.getElementById("ts-map-detail-body");
  const mapDetailTag = document.getElementById("ts-map-detail-tag");
  const mapContainer = document.getElementById("ts-telangana-map");

  let telanganaMap = null;
  let telanganaMarkers = {};

  function showMapPoint(pointId, { flyTo = false, openPopup = false } = {}) {
    const point = MAP_POINTS[pointId];
    if (!point) return;

    if (mapDetailTitle) mapDetailTitle.textContent = point.title;
    if (mapDetailBody) mapDetailBody.textContent = point.body;
    if (mapDetailTag) {
      mapDetailTag.textContent = point.tag;
      mapDetailTag.style.color = "var(--ts-gold)";
    }

    if (telanganaMap && point.coords) {
      if (flyTo) telanganaMap.flyTo(point.coords, Math.max(telanganaMap.getZoom(), 9), { duration: 0.9 });
      const marker = telanganaMarkers[pointId];
      if (openPopup && marker) marker.openPopup();
    }
  }

  function initTelanganaMap() {
    if (!mapContainer || telanganaMap) return;
    if (typeof L === "undefined") return;

    telanganaMap = L.map(mapContainer, {
      center: [18.2, 79.3],
      zoom: 7,
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: false
    });

    L.control.zoom({ position: "bottomleft" }).addTo(telanganaMap);

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19,
      attribution: "Tiles © Esri"
    }).addTo(telanganaMap);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors © CARTO"
    }).addTo(telanganaMap);

    const letterFor = {};
    Object.keys(MAP_POINTS).forEach((id, i) => {
      letterFor[id] = String.fromCharCode(65 + i);
    });

    Object.entries(MAP_POINTS).forEach(([id, point]) => {
      const icon = L.divIcon({
        className: `ts-map-marker ${point.markerClass}`,
        html: `<span aria-hidden="true">${letterFor[id]}</span>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -12]
      });

      const marker = L.marker(point.coords, { icon, title: point.title, alt: point.title, keyboard: true }).addTo(telanganaMap);

      marker.bindTooltip(point.title, { direction: "top", offset: [0, -10], className: "ts-map-tooltip" });

      const popupContent = document.createElement("div");
      popupContent.innerHTML = `<p class="ts-popup-title">${point.title}</p><p class="ts-popup-desc">${point.body}</p><span class="ts-popup-tag">${point.tag}</span>`;
      marker.bindPopup(popupContent, { className: "ts-map-popup", closeButton: true, maxWidth: 280 });

      marker.on("click", () => showMapPoint(id));
      marker.on("keydown", (e) => {
        if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
          e.originalEvent.preventDefault();
          showMapPoint(id, { openPopup: true });
        }
      });

      telanganaMarkers[id] = marker;
    });

    showMapPoint("hyderabad");

    requestAnimationFrame(() => telanganaMap.invalidateSize());
    setTimeout(() => telanganaMap.invalidateSize(), 400);

    const canvas = mapContainer.closest(".ts-map-canvas");
    if (canvas && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) telanganaMap.invalidateSize();
        });
      }, { threshold: 0.05 });
      revealObserver.observe(canvas);
    }
  }

  initTelanganaMap();

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Telangana Armed Struggle — The Land That Rose";
      const thumbnail = "frontend/telangana-struggle-explorer/assets/golconda-fort.jpg";
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
          explorerPage: "frontend/telangana-struggle-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems(
      "frontend/telangana-struggle-explorer/index.html",
      [
        {
          id: "telangana-struggle-main",
          title: "Telangana Armed Struggle — The Land That Rose",
          description: "Explore the Telangana Armed Struggle of 1946-51: the peasant rising of Telangana against the jagirdari and vetti of the Nizam of Hyderabad, the villages of Nalgonda, Warangal and Khammam, the Razakars, the dalams, Operation Polo of 1948, and the end of the princely-state phase.",
          link: "frontend/telangana-struggle-explorer/index.html"
        },
        {
          id: "telangana-struggle-hyderabad",
          title: "Hyderabad State under the Nizam",
          description: "The largest princely state in India — the Asaf Jahi dynasty, Mir Osman Ali Khan, the Hyderabadi rupee and railways, the lapse of paramountcy in 1946, and the world the Telangana peasantry rose against.",
          link: "frontend/telangana-struggle-explorer/index.html#hyderabad"
        },
        {
          id: "telangana-struggle-social-structure",
          title: "Rural Social Structure of Telangana",
          description: "The pyramid of the countryside: jagirdars, deshmukhs and doras, pattadars and sub-tenants, and the landless labourers bound by vetti — the social order the movement rose against.",
          link: "frontend/telangana-struggle-explorer/index.html#social-structure"
        },
        {
          id: "telangana-struggle-landlordism",
          title: "Landlordism and the Agrarian Order",
          description: "The jagir and peshkashi systems, crop shares of half or more, absentee lordship and the village power of the deshmukhs and doras of Nalgonda and Warangal.",
          link: "frontend/telangana-struggle-explorer/index.html#landlordism"
        },
        {
          id: "telangana-struggle-grievances",
          title: "Peasant Grievances — Vetti and Its World",
          description: "Vetti forced labour, the shares and illegal cesses, debt and bondage, and the seizure of land — the catalogue of wrongs the peasants of Telangana named in 1946.",
          link: "frontend/telangana-struggle-explorer/index.html#grievances"
        },
        {
          id: "telangana-struggle-organizations",
          title: "Political Organizations of the Movement",
          description: "The Andhra Mahasabha, the Communist Party of India, the Hyderabad State Congress and the Majlis-e-Ittehadul Muslimeen — the currents that met in Telangana.",
          link: "frontend/telangana-struggle-explorer/index.html#organizations"
        },
        {
          id: "telangana-struggle-razakars",
          title: "The Razakars of Hyderabad",
          description: "The paramilitary volunteers of the Majlis-e-Ittehadul Muslimeen under Kasim Razvi — their terror against Hindu villagers and peasant organizers, and its role in India's decision to intervene.",
          link: "frontend/telangana-struggle-explorer/index.html#razakars"
        },
        {
          id: "telangana-struggle-beginning",
          title: "The Rising at Kadivendi, 1946",
          description: "How the movement began: the refusal of vetti and the seizure of jagir lands in Nalgonda district, the gram rajyams, and the armed dalams of the villages.",
          link: "frontend/telangana-struggle-explorer/index.html#beginning"
        },
        {
          id: "telangana-struggle-timeline",
          title: "Timeline of the Telangana Struggle (1724–2014)",
          description: "From the founding of the Asaf Jahi dynasty and the Andhra Mahasabha to the rising of 1946, the Standstill Agreement, Operation Polo, the guerrilla war of 1949-51, the withdrawal of 1951, and the state of Telangana.",
          link: "frontend/telangana-struggle-explorer/index.html#timeline"
        },
        {
          id: "telangana-struggle-map",
          title: "Telangana Map — The Districts of the Struggle",
          description: "Interactive satellite map of Hyderabad State and Telangana: the Nizam's capital, the core districts of Nalgonda, Warangal and Khammam, and the areas over which the movement and the Razakar terror spread.",
          link: "frontend/telangana-struggle-explorer/index.html#map"
        },
        {
          id: "telangana-struggle-operation-polo",
          title: "Operation Polo — The Indian Intervention of 1948",
          description: "The economic blockade, the decision of Sardar Patel, and the five-day Police Action under General Chaudhuri that ended the princely state of Hyderabad in September 1948.",
          link: "frontend/telangana-struggle-explorer/index.html#operation-polo"
        },
        {
          id: "telangana-struggle-aftermath",
          title: "The End of the Princely-State Phase",
          description: "How the movement turned on the Indian state after 1948, the guerrilla war of 1949-51, the military suppression, and the CPI's withdrawal of the struggle in October 1951.",
          link: "frontend/telangana-struggle-explorer/index.html#aftermath"
        },
        {
          id: "telangana-struggle-legacy",
          title: "Legacy — Land Reform to the State of Telangana",
          description: "Jagir abolition, the making of Andhra Pradesh, the statehood movement and the creation of Telangana in 2014, and the contested memory of the struggle.",
          link: "frontend/telangana-struggle-explorer/index.html#legacy"
        },
        {
          id: "telangana-struggle-interpretations",
          title: "Historical Interpretations of the Struggle",
          description: "The nationalist, communist, Hyderabad-state, peasant/subaltern, liberal and Telangana readings of the armed struggle — one rising, many histories.",
          link: "frontend/telangana-struggle-explorer/index.html#interpretations"
        }
      ]
    );
  }

  // Run initialization
  initJourney();
});
