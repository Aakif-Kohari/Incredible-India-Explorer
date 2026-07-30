/* ============================================================
   Indrasan Mountain Explorer — indrasan.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

// ---------- 1. MAP LOCATIONS ----------
const INDRASAN_LOCATIONS = [
  {
    name: "Indrasan Summit",
    lat: 32.3833,
    lng: 77.6333,
    description: "The main summit of Indrasan, standing at 6,221 metres. Named after Lord Indra, the king of gods in Hindu mythology."
  },
  {
    name: "Deo Tibba",
    lat: 32.3667,
    lng: 77.6000,
    description: "A 6,001 m peak adjacent to Indrasan in the Pir Panjal range, popular among intermediate mountaineers."
  },
  {
    name: "Chandra Tal",
    lat: 32.4833,
    lng: 77.5333,
    description: "The enchanting crescent-shaped moon lake at 4,300 m, fed by glacial melt from the Bara Shigri glacier."
  },
  {
    name: "Keylong",
    lat: 32.5667,
    lng: 77.0333,
    description: "The administrative headquarters of Lahaul-Spiti district, the last major town before the approach trek."
  },
  {
    name: "Rohtang Pass",
    lat: 32.3722,
    lng: 77.2472,
    description: "A high mountain pass at 3,978 m connecting the Kullu Valley to the Lahaul-Spiti valley."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const INDRASAN_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The imposing slopes of Indrasan rising above the Chandra valley in the Pir Panjal range." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Panoramic Himalayan vistas characteristic of the Lahaul-Spiti region." },
  { src: "../../assets/Kedarnath.png", caption: "Glacial terrain and snow-capped peaks of the western Pir Panjal range." },
  { src: "../../assets/Manalileh.png", caption: "High-altitude landscape on the approach to the Chandra glacier system." }
];

// ---------- 3. DID YOU KNOW FACTS ----------
const INDRASAN_FACTS = [
  "Indrasan is named after Lord Indra, the Hindu god of thunder and rain, who is believed to have his celestial throne atop this remote Himalayan summit.",
  "At 6,221 m, Indrasan is one of the highest peaks in the Pir Panjal range, which forms the southernmost ridge of the western Himalaya in Himachal Pradesh.",
  "The first recorded ascent was achieved in 1963 by a joint Indo-German expedition, marking an important chapter in Indian mountaineering history.",
  "The mountain stands at the confluence of the Chandra and Bhaga river valleys, whose waters eventually form the Chenab — one of the five great rivers of Punjab.",
  "Indrasan remains one of the least-climbed 6,000-metre peaks in India due to its remote location in the Lahaul-Spiti restricted zone.",
  "The approach trek passes through Keylong and past the Chandra Tal moon lake, one of the most sacred and photogenic high-altitude lakes in the Himalaya."
];

// ---------- 4. FAQ ACCORDION DATA ----------
const INDRASAN_FAQS = [
  {
    question: "Where is Indrasan located?",
    answer: "Indrasan is located in the Lahaul-Spiti district of Himachal Pradesh, India, in the Pir Panjal range of the western Himalaya. It stands at the confluence of the Chandra and Bhaga river valleys."
  },
  {
    question: "What is the elevation of Indrasan?",
    answer: "Indrasan stands at 6,221 metres (20,410 feet) above sea level, making it one of the highest peaks in the Pir Panjal range of Himachal Pradesh."
  },
  {
    question: "When was Indrasan first climbed?",
    answer: "The first recorded ascent was made in 1963 by a joint Indo-German expedition, which explored several unclimbed summits in the Pir Panjal range."
  },
  {
    question: "What permits are needed to climb Indrasan?",
    answer: "An Inner Line Permit from the District Magistrate's office in Keylong is required for trekking in the Lahaul-Spiti restricted zone. Forest department entry permits and a registration fee are also mandatory."
  },
  {
    question: "What is the best season to attempt Indrasan?",
    answer: "The optimal climbing window is June to September, when the Pir Panjal receives relatively less precipitation and the Chandra glacier approach is accessible. Winter months see extreme cold and heavy snowfall, making the route impassable."
  }
];

// ---------- 5. STATE ----------
let map = null;
let currentGalleryIndex = 0;
let factIndex = 0;
let factIntervalId = null;
let lightboxKeydownHandler = null;

// ---------- 6. INITIALIZATION ----------
function init() {
  initAccordion();
  initGallery();
  initFactsRotator();
  initMap();
  initLightbox();
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

    if (lightboxKeydownHandler) {
      document.removeEventListener("keydown", lightboxKeydownHandler);
      lightboxKeydownHandler = null;
    }

    if (map) {
      map.remove();
      map = null;
    }
  });
}

// ---------- 7. FAQ ACCORDION ----------
function initAccordion() {
  const container = document.getElementById("indrasan-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  INDRASAN_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "indrasan-faq-item";

    item.innerHTML = `
      <button class="indrasan-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="indrasan-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".indrasan-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      container.querySelectorAll(".indrasan-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".indrasan-faq-question").setAttribute("aria-expanded", "false");
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
  const grid = document.getElementById("indrasan-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  INDRASAN_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "indrasan-gallery-item";
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
  const lightbox = document.getElementById("indrasan-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("indrasan-lightbox-prev");
  const nextBtn = document.getElementById("indrasan-lightbox-next");

  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  lightboxKeydownHandler = (e) => {
    if (lightbox.hidden) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  };

  document.addEventListener("keydown", lightboxKeydownHandler);
}

function openLightbox(index) {
  const lightbox = document.getElementById("indrasan-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("indrasan-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = INDRASAN_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = INDRASAN_GALLERY[currentGalleryIndex];

  const img = document.getElementById("indrasan-lightbox-image");
  const caption = document.getElementById("indrasan-lightbox-caption");

  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 10. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("indrasan-fact-text");
  const dotsWrap = document.getElementById("indrasan-fact-dots");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    INDRASAN_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "indrasan-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = INDRASAN_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % INDRASAN_FACTS.length), 6000);
}

// ---------- 11. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("indrasan-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try {
      map.remove();
    } catch (e) {
      console.warn("Failed to remove old map instance", e);
    }
    map = null;
  }

  // Center on Indrasan coordinates (32.3833° N, 77.6333° E)
  map = L.map("indrasan-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([32.3833, 77.6333], 10);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  INDRASAN_LOCATIONS.forEach((loc) => {
    const isPeak = loc.name.includes("Summit");
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
