/* ============================================================
   Bandarpoonch Mountain Explorer — bandarpoonch.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

// ---------- 1. MAP LOCATIONS ----------
const BANDARPOONCH_LOCATIONS = [
  {
    name: "Bandarpoonch Summit",
    lat: 31.0167,
    lng: 78.3667,
    description: "The main summit of Bandarpoonch, standing at 6,316 metres. Its long ridge resembles a monkey's tail, giving the peak its distinctive name."
  },
  {
    name: "Kalanag (Black Peak)",
    lat: 31.0667,
    lng: 78.3000,
    description: "Kalanag (6,387 m), also called Black Peak, is Bandarpoonch's prominent northern neighbour and is often climbed from the same base camp."
  },
  {
    name: "Yamunotri",
    lat: 31.0133,
    lng: 78.4600,
    description: "The sacred source of the Yamuna River and the westernmost of the Char Dham pilgrimage sites, fed by glaciers from the Bandarpoonch massif."
  },
  {
    name: "Sankri Village",
    lat: 30.9667,
    lng: 78.3333,
    description: "The main trailhead village at 1,920 m, serving as the last motorable point for most Bandarpoonch and Kedarkantha treks in the region."
  },
  {
    name: "Govind Pashu Vihar",
    lat: 31.1000,
    lng: 78.2500,
    description: "A national park and wildlife sanctuary encompassing the Bandarpoonch massif, protecting snow leopard, musk deer, and Himalayan tahr habitats."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const BANDARPOONCH_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The sweeping ridgeline of Bandarpoonch peak in the western Garhwal Himalayas." },
  { src: "../../assets/Manalileh.png", caption: "High-altitude Himalayan terrain on the approach to Bandarpoonch base camp." },
  { src: "../../assets/Kedarnath.png", caption: "Sacred peaks of Uttarakhand rising above the Yamunotri valley." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Panoramic Himalayan vistas characteristic of the Garhwal range." }
];

// ---------- 3. DID YOU KNOW FACTS ----------
const BANDARPOONCH_FACTS = [
  "The name 'Bandarpoonch' comes from Sanskrit: 'Vanara' (monkey) and 'Puchcha' (tail) — the mountain's long, curving ridge resembles the tail of Hanuman, the monkey god.",
  "Bandarpoonch's glaciers are among the source tributaries of the Yamuna River, making it hydrologically and spiritually significant for millions of Indians.",
  "The first recorded ascent of Bandarpoonch was completed in 1950 by a Swiss expedition, decades before many other Garhwal peaks were climbed.",
  "The mountain lies entirely within Govind Pashu Vihar National Park — one of the largest protected areas in Uttarakhand, home to snow leopards and Himalayan brown bears.",
  "Bandarpoonch's neighbour, Kalanag (Black Peak, 6,387 m), is often climbed as a paired summit from the same high camp due to their proximity.",
  "Unlike many technical Himalayan peaks, Bandarpoonch is graded PD (Peu Difficile), making it a popular objective for intermediate mountaineers with basic glacier and crampon skills."
];

// ---------- 4. FAQ ACCORDION DATA ----------
const BANDARPOONCH_FAQS = [
  {
    question: "Where is Bandarpoonch Mountain located?",
    answer: "Bandarpoonch is located in Uttarkashi district of Uttarakhand, India, within the Govind Pashu Vihar National Park in the western Garhwal Himalayas, close to the Yamunotri pilgrimage area."
  },
  {
    question: "What does 'Bandarpoonch' mean?",
    answer: "The name derives from Sanskrit: 'Vanara' meaning monkey and 'Puchcha' meaning tail. The mountain's elongated, sweeping ridgeline is said to resemble the tail of the monkey god Hanuman, who is believed to have meditated here."
  },
  {
    question: "What is the elevation of Bandarpoonch?",
    answer: "Bandarpoonch stands at 6,316 metres (20,722 feet) above sea level. Its neighbour Kalanag (Black Peak) is slightly higher at 6,387 metres."
  },
  {
    question: "Is Bandarpoonch suitable for beginner mountaineers?",
    answer: "Bandarpoonch is graded PD (Peu Difficile / somewhat difficult), making it accessible to mountaineers with intermediate skills including glacier travel, crampon use, and rope work. It is not a technical climb, but high-altitude experience is strongly recommended."
  },
  {
    question: "What is the best route to trek to Bandarpoonch?",
    answer: "The standard approach starts from Sankri village (1,920 m), proceeds through Taluka and Seema, and reaches the glacier base camp at around 4,500 m. Two high camps are then established at ~5,200 m and ~5,800 m before a summit push."
  }
];

// ---------- 5. STATE ----------
let map = null;
let currentGalleryIndex = 0;
let factIndex = 0;
let factIntervalId = null;
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
  const container = document.getElementById("bandarpoonch-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  BANDARPOONCH_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "bandarpoonch-faq-item";

    // Accessibility: Use a button with appropriate aria attributes
    item.innerHTML = `
      <button class="bandarpoonch-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="bandarpoonch-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".bandarpoonch-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      container.querySelectorAll(".bandarpoonch-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".bandarpoonch-faq-question").setAttribute("aria-expanded", "false");
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
  const grid = document.getElementById("bandarpoonch-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  BANDARPOONCH_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "bandarpoonch-gallery-item";
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
  const lightbox = document.getElementById("bandarpoonch-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("bandarpoonch-lightbox-prev");
  const nextBtn = document.getElementById("bandarpoonch-lightbox-next");

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
  const lightbox = document.getElementById("bandarpoonch-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("bandarpoonch-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = BANDARPOONCH_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = BANDARPOONCH_GALLERY[currentGalleryIndex];

  const img = document.getElementById("bandarpoonch-lightbox-image");
  const caption = document.getElementById("bandarpoonch-lightbox-caption");

  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 10. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("bandarpoonch-fact-text");
  const dotsWrap = document.getElementById("bandarpoonch-fact-dots");
  if (!factEl) return;

  // Clear any existing dots and interval if running
  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    BANDARPOONCH_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "bandarpoonch-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = BANDARPOONCH_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % BANDARPOONCH_FACTS.length), 6000);
}

// ---------- 11. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("bandarpoonch-map");
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

  // Set view to Bandarpoonch Summit coordinates (31.0167° N, 78.3667° E)
  map = L.map("bandarpoonch-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([31.0167, 78.3667], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  BANDARPOONCH_LOCATIONS.forEach((loc) => {
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
