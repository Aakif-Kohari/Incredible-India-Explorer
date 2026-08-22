document.addEventListener("app:route-changed", () => {
  const bookmarkButtons = [...document.querySelectorAll(".journey-bookmark-btn")];
  const galleryItems = [...document.querySelectorAll(".tb-gallery-item")];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Welcome Toast (auto-dismisses) -------------------------------
  function showWelcomeToast() {
    if (document.getElementById("tb-welcome-toast")) return;

    const toast = document.createElement("div");
    toast.id = "tb-welcome-toast";
    toast.className = "tb-welcome-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML = "<strong>🌾 Tebhaga Movement</strong> — In the winter harvest of 1946, the bargadars of Bengal carried their paddy to their own khamars and demanded their two-thirds: \"Adhi noy, Tebhaga chai.\"";
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));

    setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.addEventListener("transitionend", () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 500);
    }, 3600);
  }

  showWelcomeToast();

  // --- Hero parallax -------------------------------------------------
  function initParallax() {
    const hero = document.querySelector(".tb-hero");
    const backdrop = document.querySelector(".tb-hero-backdrop");
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
    const nav = document.getElementById("tb-section-nav");
    const navLinks = [...document.querySelectorAll(".tb-section-nav-link")];
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
  const lightbox = document.getElementById("tb-lightbox");
  const lightboxImg = document.getElementById("tb-lightbox-img");
  const lightboxCaption = document.getElementById("tb-lightbox-caption");
  const lightboxClose = document.getElementById("tb-lightbox-close");
  const lightboxPrev = document.getElementById("tb-lightbox-prev");
  const lightboxNext = document.getElementById("tb-lightbox-next");

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
    document.body.classList.add("tb-modal-open");

    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.classList.remove("tb-modal-open");

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

  // --- Interactive Bengal Map (Leaflet satellite) --------------------
  const MAP_POINTS = {
    dinajpur: {
      title: "Dinajpur",
      tag: "📍 Epicentre",
      body: "The epicentre of the Tebhaga Movement. Around Atwari the bargadars first carried the winter paddy to their own khamars in late 1946; Talpukur and Khanpur here would become shrines of the movement's martyrs.",
      coords: [25.6171, 88.6386],
      category: "epicentre",
      markerClass: "is-epicentre"
    },
    rangpur: {
      title: "Rangpur",
      tag: "🗺️ District of the Struggle",
      body: "One of the fiercest districts of the movement, sharing Dinajpur's northern paddy country. Rangpur's bargadars and tribal peasants joined the khamar campaign from the first winter of 1946.",
      coords: [25.7439, 89.2752],
      category: "district",
      markerClass: "is-district"
    },
    jalpaiguri: {
      title: "Jalpaiguri",
      tag: "🗺️ District of the Struggle",
      body: "The tea-garden country where the young organizer Charu Majumdar worked among peasants and workers during Tebhaga — an experience that later shaped the Naxalite movement.",
      coords: [26.5305, 88.7139],
      category: "district",
      markerClass: "is-district"
    },
    malda: {
      title: "Malda",
      tag: "🗺️ District of the Struggle",
      body: "A northern district swept into the movement's orbit. On 29 March 1947 four Santal peasants were killed at Charu beel — the tribals of the northern paddy country paid a heavy price.",
      coords: [25.011, 88.1415],
      category: "district",
      markerClass: "is-district"
    },
    mymensingh: {
      title: "Mymensingh",
      tag: "🗺️ District of the Struggle",
      body: "The border country where Moni Singh organized tribal and sharecropping peasants. Mymensingh's struggles fed the movement's eastern wing along the Brahmaputra.",
      coords: [24.7539, 90.4073],
      category: "district",
      markerClass: "is-district"
    },
    jessore: {
      title: "Jessore",
      tag: "🗺️ District of the Struggle",
      body: "A south-western district where bargadars took the khamar campaign into the paddy country around the capital's hinterland, part of the movement's spread across nineteen districts.",
      coords: [23.1667, 89.2083],
      category: "district",
      markerClass: "is-district"
    },
    khulna: {
      title: "Khulna",
      tag: "🗺️ District of the Struggle",
      body: "The riverine south-west where sharecroppers rose alongside their northern comrades, carrying the Tebhaga demand into the delta country of the Sundarbans fringe.",
      coords: [22.8456, 89.5403],
      category: "district",
      markerClass: "is-district"
    },
    "24-parganas": {
      title: "24 Parganas",
      tag: "⛈️ Storm Centre",
      body: "A storm centre of the movement. Around Kakdwip the peasantry mobilized with exceptional militancy and sustained the struggle — under Kansari Halder — well into the post-independence years.",
      coords: [21.8792, 88.1826],
      category: "storm",
      markerClass: "is-storm"
    },
    contai: {
      title: "Midnapore / Contai",
      tag: "🗺️ District of the Struggle",
      body: "In the south, Contai and the Midnapore coast saw the movement's fires spread from the northern khamar campaign to the rice fields of the eastern littoral.",
      coords: [21.775, 87.7525],
      category: "district",
      markerClass: "is-district"
    },
    namkhana: {
      title: "Sundarbans / Namkhana",
      tag: "⛈️ Storm Centre",
      body: "The southern-most storm centre. In the Sundarbans and Namkhana, the Communist Party's famine-relief networks fed directly into a peasant struggle that burned hottest and lasted longest.",
      coords: [21.7519, 88.5722],
      category: "storm",
      markerClass: "is-storm"
    }
  };

  const mapDetailTitle = document.getElementById("tb-map-detail-title");
  const mapDetailBody = document.getElementById("tb-map-detail-body");
  const mapDetailTag = document.getElementById("tb-map-detail-tag");
  const mapContainer = document.getElementById("tb-bengal-map");

  let bengalMap = null;
  let bengalMarkers = {};

  function showMapPoint(pointId, { flyTo = false, openPopup = false } = {}) {
    const point = MAP_POINTS[pointId];
    if (!point) return;

    if (mapDetailTitle) mapDetailTitle.textContent = point.title;
    if (mapDetailBody) mapDetailBody.textContent = point.body;
    if (mapDetailTag) {
      mapDetailTag.textContent = point.tag;
      mapDetailTag.style.color = "var(--tb-gold)";
    }

    if (bengalMap && point.coords) {
      if (flyTo) bengalMap.flyTo(point.coords, Math.max(bengalMap.getZoom(), 10), { duration: 0.9 });
      const marker = bengalMarkers[pointId];
      if (openPopup && marker) marker.openPopup();
    }
  }

  function initBengalMap() {
    if (!mapContainer || bengalMap) return;
    if (typeof L === "undefined") return;

    bengalMap = L.map(mapContainer, {
      center: [24.4, 89.2],
      zoom: 7,
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: false
    });

    L.control.zoom({ position: "bottomleft" }).addTo(bengalMap);

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 19,
      attribution: "Tiles © Esri"
    }).addTo(bengalMap);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors © CARTO"
    }).addTo(bengalMap);

    const letterFor = {};
    Object.keys(MAP_POINTS).forEach((id, i) => {
      letterFor[id] = String.fromCharCode(65 + i);
    });

    Object.entries(MAP_POINTS).forEach(([id, point]) => {
      const icon = L.divIcon({
        className: `tb-map-marker ${point.markerClass}`,
        html: `<span aria-hidden="true">${letterFor[id]}</span>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -12]
      });

      const marker = L.marker(point.coords, { icon, title: point.title, alt: point.title, keyboard: true }).addTo(bengalMap);

      marker.bindTooltip(point.title, { direction: "top", offset: [0, -10], className: "tb-map-tooltip" });

      const popupContent = document.createElement("div");
      popupContent.innerHTML = `<p class="tb-popup-title">${point.title}</p><p class="tb-popup-desc">${point.body}</p><span class="tb-popup-tag">${point.tag}</span>`;
      marker.bindPopup(popupContent, { className: "tb-map-popup", closeButton: true, maxWidth: 280 });

      marker.on("click", () => showMapPoint(id));
      marker.on("keydown", (e) => {
        if (e.originalEvent.key === "Enter" || e.originalEvent.key === " ") {
          e.originalEvent.preventDefault();
          showMapPoint(id, { openPopup: true });
        }
      });

      bengalMarkers[id] = marker;
    });

    showMapPoint("dinajpur");

    requestAnimationFrame(() => bengalMap.invalidateSize());
    setTimeout(() => bengalMap.invalidateSize(), 400);

    const canvas = mapContainer.closest(".tb-map-canvas");
    if (canvas && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) bengalMap.invalidateSize();
        });
      }, { threshold: 0.05 });
      revealObserver.observe(canvas);
    }
  }

  initBengalMap();

  // --- Journey Integration (Bookmarks & Global Search) -------------
  function initJourney() {
    if (!window.Journey) return;

    // 1. Bookmark functionality
    bookmarkButtons.forEach((btn) => {
      const id = btn.dataset.bookmarkId;
      const title = "Tebhaga Movement — The Sharecroppers' Uprising";
      const thumbnail = "frontend/tebhaga-movement-explorer/assets/hero-bg.jpg";
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
          explorerPage: "frontend/tebhaga-movement-explorer/index.html",
          title,
          thumbnail,
          category
        });
        updateBookmarkUI();
      });
    });

    // 2. Global search index registration
    window.Journey.registerSearchItems(
      "frontend/tebhaga-movement-explorer/index.html",
      [
        {
          id: "tebhaga-movement-main",
          title: "Tebhaga Movement — The Sharecroppers' Uprising",
          description: "Explore the Tebhaga Movement of 1946-47: the bargadars of Bengal who refused to hand half their harvest to the jotedars, demanded two-thirds under the cry 'Adhi noy, Tebhaga chai', carried the paddy to their own khamars, and turned the winter of 1946 into the greatest peasant uprising of the Raj.",
          link: "frontend/tebhaga-movement-explorer/index.html"
        },
        {
          id: "tebhaga-movement-context",
          title: "The Countryside That Rose — Bengal's Agrarian Order",
          description: "The world of the bargadar: the Permanent Settlement of 1793, the jotedars of North Bengal, the illegal cesses called abwabs, and the Bengal Famine of 1943 that turned the countryside's trust toward the Kisan Sabha.",
          link: "frontend/tebhaga-movement-explorer/index.html#context"
        },
        {
          id: "tebhaga-movement-demand",
          title: "The Tebhaga Demand — 'Not Half, Two-Thirds'",
          description: "The central demand of the movement: the harvest shared three ways — two parts for the tiller, one for the landlord — with the paddy stored in the sharecropper's own khamar, backed by the shelved Floud Commission report.",
          link: "frontend/tebhaga-movement-explorer/index.html#demand"
        },
        {
          id: "tebhaga-movement-call",
          title: "'Nij Khamare Dhan Tulo' — The Kisan Sabha's Call of September 1946",
          description: "The Bengal Provincial Kisan Sabha's call to take the paddy to the sharecropper's own granary, the cadres and pala-gaan that carried it into the villages, and the tebhaga elakas — the liberated zones of North Bengal.",
          link: "frontend/tebhaga-movement-explorer/index.html#call"
        },
        {
          id: "tebhaga-movement-leaders",
          title: "The Leaders of the Tebhaga Movement",
          description: "Haji Mohammad Danesh, Kansari Halder, Ila Mitra 'Rani Ma', Moni Singh, Charu Majumdar, Nripen Chakraborty, Hare Krishna Konar — and the women's brigades, the Nari Bahini, led by Manikuntala Sen and others.",
          link: "frontend/tebhaga-movement-explorer/index.html#leaders"
        },
        {
          id: "tebhaga-movement-timeline",
          title: "Tebhaga Movement Timeline (1885–1977)",
          description: "From the Bengal Tenancy Act and the Floud Commission to the call of September 1946, the harvest that erupted in Dinajpur, the Bargadars Bill, the Khanpur firing, partition, the Bargadari Act of 1950 and Operation Barga.",
          link: "frontend/tebhaga-movement-explorer/index.html#timeline"
        },
        {
          id: "tebhaga-movement-map",
          title: "Bengal Map — The Nineteen Districts of Tebhaga",
          description: "Interactive satellite map of undivided Bengal: the epicentre of Dinajpur, the storm centres of the Sundarbans and 24 Parganas, and the districts of the struggle from Rangpur to Midnapore.",
          link: "frontend/tebhaga-movement-explorer/index.html#map"
        },
        {
          id: "tebhaga-movement-martyrs",
          title: "Martyrs and Repression of Tebhaga",
          description: "The first martyrs Samir Uddin and Shivram Majhi at Talpukur, the firing at Khanpur that cost some twenty-two lives, the Santals killed at Charu beel, and the prison lists of the movement.",
          link: "frontend/tebhaga-movement-explorer/index.html#martyrs"
        },
        {
          id: "tebhaga-movement-legacy",
          title: "Legacy of Tebhaga — From the Khamar to Operation Barga",
          description: "How the two-thirds demand became the Bargadari Act of 1950, how partition split the struggle between two Bengals, and how Operation Barga finally recorded the bargadar's name in the land ledgers of West Bengal.",
          link: "frontend/tebhaga-movement-explorer/index.html#legacy"
        }
      ]
    );
  }

  // Run initialization
  initJourney();
});
