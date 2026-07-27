/* ============================================================
   Satopanth Mountain Explorer — satopanth.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

// ---------- 1. MAP LOCATIONS ----------
const SATOPANTH_LOCATIONS = [
  {
    name: "Satopanth Peak",
    lat: 30.8458,
    lng: 79.2858,
    description: "The main summit of Satopanth, standing at 7,075 meters, in the Gangotri Group."
  },
  {
    name: "Satopanth Tal",
    lat: 30.7431,
    lng: 79.3789,
    description: "A sacred triangular lake of crystalline water situated at an altitude of 4,600 meters."
  },
  {
    name: "Badrinath Temple",
    lat: 30.7433,
    lng: 79.4938,
    description: "A famous ancient temple town dedicated to Lord Vishnu, serving as the starting base for many Satopanth expeditions."
  },
  {
    name: "Vasudhara Falls",
    lat: 30.7674,
    lng: 79.4725,
    description: "A spectacular waterfall located near Mana village, along the trekking route to Satopanth Tal."
  },
  {
    name: "Mana Village",
    lat: 30.7712,
    lng: 79.4947,
    description: "One of the last Indian villages near the Indo-Tibetan border, rich in Mahabharata legends."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const SATOPANTH_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The massive, snow-covered dome of Satopanth Peak." },
  { src: "../../assets/Manalileh.png", caption: "Glacial routes and crevasse zones on the approach to the peak." },
  { src: "../../assets/Shimlakaza.png", caption: "Satopanth Tal, the sacred triangular lake near the mountain glacier." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Panoramic views of the high peaks of the Garhwal Range." }
];

// ---------- 3. DID YOU KNOW FACTS ----------
const SATOPANTH_FACTS = [
  "Satopanth Peak stands at 7,075 meters, making it one of the prominent 7,000-plus-meter peaks of the Garhwal Himalayas.",
  "The mountain was first successfully scaled in August 1947 by a Swiss expedition, just weeks before India gained independence.",
  "The name 'Satopanth' translates from Sanskrit as the 'Path of Truth', representing spiritual purity and sacred journeys.",
  "Trekkers and mountaineers approach the peak by hiking past Vasudhara Falls and crossing the massive moraines of the glacier.",
  "Local folklore claims that the holy trinity of Hindu gods—Brahma, Vishnu, and Shiva—meditated at the corners of Satopanth Tal.",
  "Climbing Satopanth is highly technical, featuring the famous 'knife-edge' ridge route on its North-East side."
];

// ---------- 4. FAQ ACCORDION DATA ----------
const SATOPANTH_FAQS = [
  {
    question: "Where is Satopanth Peak located?",
    answer: "Satopanth Peak is located in the Gangotri region of the Garhwal Himalayas in Uttarakhand, India, close to the sacred pilgrimage site of Badrinath."
  },
  {
    question: "What does the name Satopanth mean?",
    answer: "Satopanth is derived from the Sanskrit words 'Sato' (truth/purity) and 'Panth' (path/way), meaning 'Path of Truth'."
  },
  {
    question: "How high is Satopanth Peak?",
    answer: "Satopanth stands at a towering elevation of 7,075 meters (23,212 feet) above sea level."
  },
  {
    question: "What is the difficulty of climbing Satopanth?",
    answer: "Climbing Satopanth is rated as Grade VI (Extreme / Alpine). It features steep ice slopes, crevasses, and highly technical ridge climbing, making it suitable for experienced mountaineers."
  },
  {
    question: "How is Satopanth Peak accessed?",
    answer: "The approach trek starts from Badrinath, goes through Mana village, past Vasudhara Falls, and runs along the Alaknanda River to the Satopanth Glacier base camp."
  }
];

// ---------- 5. STATE ----------
let map = null;
let currentGalleryIndex = 0;
let factIndex = 0;
let factIntervalId = null;

// ---------- 6. INITIALIZATION ----------
function init() {
  initAccordion();
  initGallery();
  initFactsRotator();
  initMap();
  initLightbox();
}

// Ensure init runs correctly on page load or route change
if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

// Clean up intervals on route changes to prevent memory leaks (managed by SPA router)
if (window.appLifecycle) {
  window.appLifecycle.registerCleanup(() => {
    if (factIntervalId) {
      clearInterval(factIntervalId);
      factIntervalId = null;
    }
  });
}

// ---------- 7. FAQ ACCORDION ----------
function initAccordion() {
  const container = document.getElementById("satopanth-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  SATOPANTH_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "satopanth-faq-item";
    
    // Accessibility: Use a button with appropriate aria attributes
    item.innerHTML = `
      <button class="satopanth-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="satopanth-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".satopanth-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      container.querySelectorAll(".satopanth-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".satopanth-faq-question").setAttribute("aria-expanded", "false");
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });

    container.appendChild(item);
  });
}

// ---------- 8. GALLERY GRID ----------
function initGallery() {
  const grid = document.getElementById("satopanth-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  SATOPANTH_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "satopanth-gallery-item";
    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", `Open image: ${item.caption}`);
    figure.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <figcaption>${item.caption}</figcaption>
    `;

    // Click and Keyboard controls
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

// ---------- 9. LIGHTBOX ----------
function initLightbox() {
  const lightbox = document.getElementById("satopanth-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("satopanth-lightbox-prev");
  const nextBtn = document.getElementById("satopanth-lightbox-next");

  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("satopanth-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("satopanth-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = SATOPANTH_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = SATOPANTH_GALLERY[currentGalleryIndex];
  
  const img = document.getElementById("satopanth-lightbox-image");
  const caption = document.getElementById("satopanth-lightbox-caption");
  
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 10. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("satopanth-fact-text");
  const dotsWrap = document.getElementById("satopanth-fact-dots");
  if (!factEl) return;

  // Clear any existing dots and interval if running
  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    SATOPANTH_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "satopanth-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = SATOPANTH_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % SATOPANTH_FACTS.length), 6000);
}

// ---------- 11. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("satopanth-map");
  if (!mapContainer || typeof L === "undefined") return;

  // Cleanup existing map instance if any to support hot-swapping/re-render
  if (map !== null) {
    try {
      map.remove();
    } catch (e) {
      console.warn("Failed to remove old map instance", e);
    }
    map = null;
  }

  // Set view to Satopanth Peak coordinates (30.8458° N, 79.2858° E)
  map = L.map("satopanth-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([30.8458, 79.2858], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  SATOPANTH_LOCATIONS.forEach((loc) => {
    const isPeak = loc.name.includes("Peak");
    const marker = L.circleMarker([loc.lat, loc.lng], {
      radius: isPeak ? 9 : 7,
      color: isPeak ? "#ff9933" : "#0284c7",
      fillColor: isPeak ? "#ffb01f" : "#38bdf8",
      fillOpacity: 0.85,
      weight: 2,
    }).addTo(map);

    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`);
  });
}
