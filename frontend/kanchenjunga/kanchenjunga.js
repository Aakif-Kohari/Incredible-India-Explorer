/* ============================================================
   Kanchenjunga Mountain Explorer — kanchenjunga.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   scroll reveal animations, and accessible FAQ accordion.
   ============================================================ */

const KANCHENJUNGA_LOCATIONS = [
  {
    name: "Kanchenjunga Main Summit",
    lat: 27.7025,
    lng: 88.1475,
    description: "The main summit at 8,586 m, the third highest peak in the world and the highest in India."
  },
  {
    name: "Yalung Face (South)",
    lat: 27.6850,
    lng: 88.1350,
    description: "The dramatic south face rising over 3,000 m from the Yalung Glacier. First climbed in 1973."
  },
  {
    name: "Pangpema North Base Camp",
    lat: 27.7200,
    lng: 88.1200,
    description: "Nepal-side north base camp at ~5,143 m, offering iconic views of the north face."
  },
  {
    name: "Oktang South Viewpoint",
    lat: 27.6700,
    lng: 88.1500,
    description: "A viewpoint at 4,730 m providing spectacular close-up views of the Yalung Face."
  },
  {
    name: "Goecha La Pass",
    lat: 27.6900,
    lng: 88.1600,
    description: "A high mountain pass at 4,940 m on the Indian side with panoramic views."
  },
  {
    name: "Gangtok",
    lat: 27.3389,
    lng: 88.6065,
    description: "The capital city of Sikkim at 1,650 m. Gateway to Kanchenjunga."
  },
  {
    name: "Yuksom",
    lat: 27.3500,
    lng: 88.2167,
    description: "Historic first capital of Sikkim, starting point for the Base Camp trek."
  }
];

const KANCHENJUNGA_GALLERY = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Panorama_Kangchenjunga_from_Darjeeling.jpg",
    caption: "Panoramic view of Kanchenjunga from Tiger Hill, Darjeeling — golden sunrise illuminating the five peaks."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/da/The_sleeping_Buddha_Mt_kanchenjunga.jpg",
    caption: "The 'Sleeping Buddha' formation of Kanchenjunga's five peaks as seen from Sikkim."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/db/Mt_Kangchenjunga%2C_3rd_highest_mountain_in_the_world_%288131409349%29.jpg",
    caption: "Kangchenjunga towering above the clouds — the 3rd highest mountain in the world at 8,586 m."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/83/Kangchenjunga_%28Kanchenjunga%29_from_Singalila_National_Park%2C_Sandakphu.jpg",
    caption: "Kanchenjunga from Sandakphu, Singalila National Park — the highest point in West Bengal."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Kangchenjunga-from-Darjeeling.jpg",
    caption: "Clear-day view of Kangchenjunga massif from Darjeeling, West Bengal, India."
  }
];

const KANCHENJUNGA_FACTS = [
  "Kanchenjunga means 'Five Treasures of the Great Snow' in Tibetan, referring to its five summits which represent gold, silver, gems, grain, and holy books.",
  "The first successful ascent was on May 25, 1955, by British climbers Joe Brown and George Band, who stopped just short of the summit to honor local religious beliefs.",
  "Kanchenjunga is considered sacred by the people of Sikkim, who believe that the mountain deity guards the treasures hidden within the five peaks.",
  "Out of respect for local sentiments, most climbing expeditions stop a few feet below the actual summit, making it one of the few 8,000-meter peaks where the true summit is rarely touched.",
  "The Kanchenjunga Conservation Area spans 2,035 sq km and is home to endangered species including snow leopards, red pandas, and Himalayan black bears.",
  "Kanchenjunga was believed to be the highest mountain in the world until 1852, when calculations confirmed Mount Everest as taller.",
  "The mountain has five distinct peaks: Main (8,586 m), West (8,476 m), Central (8,473 m), South (8,476 m), and Kangbachen (7,903 m)."
];

const KANCHENJUNGA_FAQS = [
  {
    question: "Where is Kanchenjunga located?",
    answer: "Kanchenjunga is located on the border between Nepal's Taplejung District and India's state of Sikkim, in the Kangchenjunga Himalayas of the greater Himalayan range."
  },
  {
    question: "How tall is Kanchenjunga?",
    answer: "Kanchenjunga stands at an elevation of 8,586 meters (28,169 feet) above sea level, making it the third highest mountain in the world after Mount Everest and K2."
  },
  {
    question: "Is Kanchenjunga the highest mountain in India?",
    answer: "Yes, Kanchenjunga is the highest peak located within Indian territory and is the tallest mountain in India."
  },
  {
    question: "Why do climbers stop short of the summit?",
    answer: "Out of respect for the religious beliefs of the people of Sikkim, who consider the mountain sacred, most climbing expeditions stop a few feet below the actual summit. This tradition has been followed since the first ascent in 1955."
  },
  {
    question: "When is the best time to trek near Kanchenjunga?",
    answer: "The best seasons are spring (March to May) when rhododendrons are in bloom, and autumn (October to November) when the skies are clear and views are at their best."
  },
  {
    question: "Do I need a permit to trek near Kanchenjunga?",
    answer: "Yes, special permits are required. Indian nationals need an Inner Line Permit, and foreign nationals need a Restricted Area Permit. A registered trekking agency and a licensed guide are mandatory."
  }
];

let map = null;
let currentGalleryIndex = 0;
let factIndex = 0;
let factIntervalId = null;

function init() {
  initAccordion();
  initGallery();
  initFactsRotator();
  initMap();
  initLightbox();
  initScrollReveal();
  initParallax();
}

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

if (window.appLifecycle) {
  window.appLifecycle.registerCleanup(() => {
    if (factIntervalId) {
      clearInterval(factIntervalId);
      factIntervalId = null;
    }
  });
}

/* ---------- SCROLL REVEAL ANIMATIONS ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---------- PARALLAX HERO ---------- */
function initParallax() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < 800) {
          hero.style.setProperty("--parallax-y", scrollY * 0.35 + "px");
          hero.style.setProperty("--parallax-opacity", 1 - scrollY / 700);
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---------- FAQ ACCORDION ---------- */
function initAccordion() {
  const container = document.getElementById("kanchenjunga-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  KANCHENJUNGA_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "kanchenjunga-faq-item reveal";
    item.style.transitionDelay = (index * 0.05) + "s";

    item.innerHTML = `
      <button class="kanchenjunga-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="kanchenjunga-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".kanchenjunga-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      container.querySelectorAll(".kanchenjunga-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".kanchenjunga-faq-question").setAttribute("aria-expanded", "false");
      });
      if (!isActive) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });

    container.appendChild(item);
  });
}

/* ---------- GALLERY GRID ---------- */
function initGallery() {
  const grid = document.getElementById("kanchenjunga-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  KANCHENJUNGA_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "kanchenjunga-gallery-item reveal";
    figure.style.transitionDelay = (index * 0.08) + "s";
    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", `Open image: ${item.caption}`);
    figure.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <figcaption>${item.caption}</figcaption>
    `;

    figure.addEventListener("click", () => openLightbox(index));
    figure.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    grid.appendChild(figure);
  });
}

/* ---------- LIGHTBOX ---------- */
function initLightbox() {
  const lightbox = document.getElementById("kanchenjunga-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  const prevBtn = document.getElementById("kanchenjunga-lightbox-prev");
  const nextBtn = document.getElementById("kanchenjunga-lightbox-next");

  if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showGalleryImage(currentGalleryIndex - 1); });
  if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showGalleryImage(currentGalleryIndex + 1); });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("kanchenjunga-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("kanchenjunga-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = KANCHENJUNGA_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = KANCHENJUNGA_GALLERY[currentGalleryIndex];

  const img = document.getElementById("kanchenjunga-lightbox-image");
  const caption = document.getElementById("kanchenjunga-lightbox-caption");

  if (img) {
    img.style.opacity = "0";
    img.src = item.src;
    img.alt = item.caption;
    img.onload = () => { img.style.opacity = "1"; };
  }
  if (caption) caption.textContent = item.caption;
}

/* ---------- FACTS ROTATOR ---------- */
function initFactsRotator() {
  const factEl = document.getElementById("kanchenjunga-fact-text");
  const dotsWrap = document.getElementById("kanchenjunga-fact-dots");
  const counterEl = document.getElementById("kanchenjunga-fact-counter");
  const prevBtn = document.getElementById("kanchenjunga-fact-prev");
  const nextBtn = document.getElementById("kanchenjunga-fact-next");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    KANCHENJUNGA_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "kanchenjunga-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => { showFact(i); resetInterval(); });
      dotsWrap.appendChild(dot);
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { showFact((factIndex - 1 + KANCHENJUNGA_FACTS.length) % KANCHENJUNGA_FACTS.length); resetInterval(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { showFact((factIndex + 1) % KANCHENJUNGA_FACTS.length); resetInterval(); });

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    factEl.style.transform = "translateY(8px)";
    setTimeout(() => {
      factEl.textContent = KANCHENJUNGA_FACTS[factIndex];
      factEl.style.opacity = "1";
      factEl.style.transform = "translateY(0)";
    }, 250);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
    if (counterEl) {
      counterEl.textContent = (factIndex + 1) + " / " + KANCHENJUNGA_FACTS.length;
    }
  }

  function resetInterval() {
    if (factIntervalId) clearInterval(factIntervalId);
    factIntervalId = setInterval(() => showFact((factIndex + 1) % KANCHENJUNGA_FACTS.length), 6000);
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % KANCHENJUNGA_FACTS.length), 6000);
}

/* ---------- LEAFLET MAP ---------- */
function initMap() {
  const mapContainer = document.getElementById("kanchenjunga-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try { map.remove(); } catch (e) { /* ignore */ }
    map = null;
  }

  map = L.map("kanchenjunga-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([27.7025, 88.1475], 11);

  // Esri World Imagery - Satellite tiles
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 18,
  }).addTo(map);

  // Add labels layer on top
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png", {
    attribution: "",
    maxZoom: 18,
    pane: "overlayPane",
  }).addTo(map);

  KANCHENJUNGA_LOCATIONS.forEach((loc) => {
    const isSummit = loc.name.includes("Summit");
    const marker = L.circleMarker([loc.lat, loc.lng], {
      radius: isSummit ? 10 : 7,
      color: isSummit ? "#ff9933" : "#0284c7",
      fillColor: isSummit ? "#ffb01f" : "#38bdf8",
      fillOpacity: 0.9,
      weight: 2,
    }).addTo(map);

    marker.bindTooltip(`<strong>${loc.name}</strong><br><small>${loc.description}</small>`, {
      direction: "top",
      offset: [0, -10],
      opacity: 1,
      className: "kanchenjunga-map-tooltip",
    });

    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`);
  });
}
