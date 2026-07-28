/* ============================================================
   Nanda Kot Mountain Explorer — Nanda Kot.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

// ---------- 1. MAP LOCATIONS ----------
const CHANGABANG_LOCATIONS = [
  {
    name: "Nanda Kot Peak",
    lat: 30.5000,
    lng: 79.9250,
    description: "The main summit of Nanda Kot, standing at 6,861 meters, in the Kumaon Himalayas."
  },
  {
    name: "Nanda Devi Sanctuary",
    lat: 30.3120,
    lng: 79.9320,
    description: "A stunning glacial basin surrounded by a ring of peaks including Nanda Kot."
  },
  {
    name: "Rishi Ganga Gorge",
    lat: 30.3450,
    lng: 79.8000,
    description: "A steep and narrow gorge that serves as the treacherous approach to the sanctuary."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const CHANGABANG_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The massive, steep rocky face of Nanda Kot Peak." },
  { src: "../../assets/Manalileh.png", caption: "Glacial routes and crevasse zones on the approach to the peak." },
  { src: "../../assets/Shimlakaza.png", caption: "The Nanda Devi Sanctuary surrounding the mountain." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Panoramic views of the high peaks of the Kumaon Himalayas." }
];

// ---------- 3. DID YOU KNOW FACTS ----------
const CHANGABANG_FACTS = [
  "Nanda Kot Peak stands at 6,861 meters, making it one of the prominent peaks of the Kumaon Himalayas.",
  "The mountain was first successfully scaled in 1936 by a team led by Y. Hotta.",
  "The name 'Nanda Kot' translates to 'Nanda's Fortress', because of its steep rocky profile.",
  "Trekkers and mountaineers approach the peak by hiking through the Rishi Ganga Gorge.",
  "Climbing Nanda Kot is highly technical, featuring steep ice slopes and challenging granite faces."
];

// ---------- 4. FAQ ACCORDION DATA ----------
const CHANGABANG_FAQS = [
  {
    question: "Where is Nanda Kot Peak located?",
    answer: "Nanda Kot Peak is located in the Kumaon Himalayas of Uttarakhand, India, near the Nanda Devi Sanctuary."
  },
  {
    question: "What does the name Nanda Kot mean?",
    answer: "Nanda Kot means 'Nanda's Fortress', reflecting its sheer rock face that shines in the sunlight."
  },
  {
    question: "How high is Nanda Kot Peak?",
    answer: "Nanda Kot stands at an elevation of 6,861 meters (22,520 feet) above sea level."
  },
  {
    question: "What is the difficulty of climbing Nanda Kot?",
    answer: "Climbing Nanda Kot is rated as Extreme. It features steep ice slopes and highly technical rock climbing, making it suitable only for experienced mountaineers."
  },
  {
    question: "How is Nanda Kot Peak accessed?",
    answer: "The approach trek typically starts by passing through the challenging Rishi Ganga Gorge to reach the base."
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
  const container = document.getElementById("nanda-kot-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  CHANGABANG_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "nanda-kot-faq-item";
    
    // Accessibility: Use a button with appropriate aria attributes
    item.innerHTML = `
      <button class="nanda-kot-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="nanda-kot-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".nanda-kot-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      container.querySelectorAll(".nanda-kot-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".nanda-kot-faq-question").setAttribute("aria-expanded", "false");
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
  const grid = document.getElementById("nanda-kot-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  CHANGABANG_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "nanda-kot-gallery-item";
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
  const lightbox = document.getElementById("nanda-kot-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("nanda-kot-lightbox-prev");
  const nextBtn = document.getElementById("nanda-kot-lightbox-next");

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
  const lightbox = document.getElementById("nanda-kot-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("nanda-kot-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = CHANGABANG_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = CHANGABANG_GALLERY[currentGalleryIndex];
  
  const img = document.getElementById("nanda-kot-lightbox-image");
  const caption = document.getElementById("nanda-kot-lightbox-caption");
  
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 10. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("nanda-kot-fact-text");
  const dotsWrap = document.getElementById("nanda-kot-fact-dots");
  if (!factEl) return;

  // Clear any existing dots and interval if running
  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    CHANGABANG_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "nanda-kot-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = CHANGABANG_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % CHANGABANG_FACTS.length), 6000);
}

// ---------- 11. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("nanda-kot-map");
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

  // Set view to Nanda Kot Peak coordinates (30.5000° N, 79.9250° E)
  map = L.map("nanda-kot-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([30.5000, 79.9250], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  CHANGABANG_LOCATIONS.forEach((loc) => {
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
