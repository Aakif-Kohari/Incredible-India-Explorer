/* ============================================================
   Hardeol Peak Explorer — hardeol.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

// ---------- 1. MAP LOCATIONS ----------
const HARDEOL_LOCATIONS = [
  {
    name: "Hardeol Peak",
    lat: 30.3833,
    lng: 80.1333,
    description: "The main summit of Hardeol, standing at 7,151 meters, crowning the northeast corner of the Nanda Devi Sanctuary."
  },
  {
    name: "Nanda Devi Sanctuary",
    lat: 30.3120,
    lng: 79.9320,
    description: "A stunning glacial basin surrounded by a ring of peaks, with Hardeol at its northeast corner."
  },
  {
    name: "Milam Valley",
    lat: 30.3500,
    lng: 80.1000,
    description: "The remote valley providing access to Hardeol's base camp, starting from Munsiyari."
  },
  {
    name: "Munsiyari",
    lat: 30.0667,
    lng: 80.2333,
    description: "The gateway town for Hardeol expeditions, located in the Pithoragarh district of Uttarakhand."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const HARDEOL_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The majestic Hardeol Peak rising above the Kumaon Himalayas." },
  { src: "../../assets/Manalileh.png", caption: "Glacial routes and high-altitude terrain on the approach to Hardeol." },
  { src: "../../assets/Shimlakaza.png", caption: "The Nanda Devi Sanctuary ring visible from the Milam valley." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Panoramic views of the Kumaon Himalayan peaks at sunrise." }
];

// ---------- 3. DID YOU KNOW FACTS ----------
const HARDEOL_FACTS = [
  "Hardeol stands at 7,151 meters, making it one of the highest peaks in the Kumaon Himalayas.",
  "The name 'Hardeol' translates to 'Temple of God', reflecting its sacred status among local communities.",
  "Hardeol was first summited in 1978 by an ITBP (Indo-Tibetan Border Police) expedition.",
  "Only two recorded ascents exist — ITBP (1978) and BSF (1991) — making it one of the rarely climbed 7,000 m peaks.",
  "The peak crowns the northeast corner of the Nanda Devi Sanctuary ring, a UNESCO World Heritage Site.",
  "The approach trek through the Milam valley is one of the most remote and pristine routes in Uttarakhand."
];

// ---------- 4. FAQ ACCORDION DATA ----------
const HARDEOL_FAQS = [
  {
    question: "Where is Hardeol Peak located?",
    answer: "Hardeol is located in the Kumaon Himalayas of Uttarakhand, India, at the northern end of the Milam valley in the Pithoragarh district. It stands at the northeast corner of the Nanda Devi Sanctuary."
  },
  {
    question: "What does the name Hardeol mean?",
    answer: "Hardeol translates to 'Temple of God' in the local language, reflecting the sacred significance the peak holds for the communities living in its shadow."
  },
  {
    question: "How high is Hardeol Peak?",
    answer: "Hardeol stands at an elevation of 7,151 meters (23,461 feet) above sea level, making it a prominent peak of the Kumaon Himalayas."
  },
  {
    question: "When was Hardeol first climbed?",
    answer: "Hardeol was first summited in 1978 by an ITBP (Indo-Tibetan Border Police) expedition. Only one other recorded ascent was made by a BSF expedition in 1991."
  },
  {
    question: "How difficult is it to climb Hardeol?",
    answer: "Climbing Hardeol is rated as Hard. The expedition involves glacier travel, ice walls, and steep snow slopes. Technical mountaineering experience and high-altitude acclimatization are essential."
  },
  {
    question: "What is the best time to attempt Hardeol?",
    answer: "The ideal climbing window is from May to October, with September offering the most stable weather. Pre-monsoon (May-June) and post-monsoon (September-October) are the recommended seasons."
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

// Clean up intervals on route changes to prevent memory leaks
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
  const container = document.getElementById("hardeol-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  HARDEOL_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "hardeol-faq-item";
    
    item.innerHTML = `
      <button class="hardeol-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="hardeol-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".hardeol-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      container.querySelectorAll(".hardeol-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".hardeol-faq-question").setAttribute("aria-expanded", "false");
      });

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
  const grid = document.getElementById("hardeol-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  HARDEOL_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "hardeol-gallery-item";
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

// ---------- 9. LIGHTBOX ----------
function initLightbox() {
  const lightbox = document.getElementById("hardeol-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("hardeol-lightbox-prev");
  const nextBtn = document.getElementById("hardeol-lightbox-next");

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
  const lightbox = document.getElementById("hardeol-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("hardeol-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = HARDEOL_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = HARDEOL_GALLERY[currentGalleryIndex];
  
  const img = document.getElementById("hardeol-lightbox-image");
  const caption = document.getElementById("hardeol-lightbox-caption");
  
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 10. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("hardeol-fact-text");
  const dotsWrap = document.getElementById("hardeol-fact-dots");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    HARDEOL_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "hardeol-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = HARDEOL_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % HARDEOL_FACTS.length), 6000);
}

// ---------- 11. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("hardeol-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try {
      map.remove();
    } catch (e) {
      console.warn("Failed to remove old map instance", e);
    }
    map = null;
  }

  // Set view to Hardeol Peak coordinates (30.3833° N, 80.1333° E)
  map = L.map("hardeol-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([30.3833, 80.1333], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  HARDEOL_LOCATIONS.forEach((loc) => {
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
