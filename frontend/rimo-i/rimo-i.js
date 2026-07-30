/* ============================================================
   Rimo I Mountain Explorer — rimo-i.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

// ---------- 1. MAP LOCATIONS ----------
const RIMO_LOCATIONS = [
  {
    name: "Rimo I Peak",
    lat: 35.3533,
    lng: 77.3681,
    description: "The main summit of the Rimo massif, standing at 7,385 meters. It is the 71st highest peak in the world."
  },
  {
    name: "Rimo II Peak",
    lat: 35.3516,
    lng: 77.3828,
    description: "A subpeak of Rimo I, standing at 7,373 meters, situated immediately to the east of the main summit."
  },
  {
    name: "Rimo Glacier",
    lat: 35.3833,
    lng: 77.3167,
    description: "The major glacier feeding the Shyok River, located on the eastern slopes of the Karakoram range near the Siachen Glacier."
  },
  {
    name: "Shyok River Upper Reaches",
    lat: 35.2000,
    lng: 77.5000,
    description: "A major river flowing through Ladakh, whose upper reaches are fed by meltwater from the Rimo Glacier."
  },
  {
    name: "Depsang Plains",
    lat: 35.2500,
    lng: 77.6000,
    description: "A high-altitude plateau region bordering the eastern flanks of the Karakoram range, close to the Rimo massif."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const RIMO_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The snow-covered peaks of the eastern Karakoram range." },
  { src: "../../assets/Manalileh.png", caption: "Stark mountain ridges and high passes in the Ladakh region." },
  { src: "../../assets/Shimlakaza.png", caption: "Rugged high-altitude valleys and cold desert landscapes." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Hemis Monastery situated in the mountainous valleys of Ladakh." }
];

// ---------- 3. DID YOU KNOW FACTS ----------
const RIMO_FACTS = [
  "Rimo I was first climbed on July 28, 1988, by an Indo-Japanese joint expedition team led by Hukam Singh and Yoshio Ogata.",
  "The name 'Rimo' translates to 'striped mountain' in the local language, describing the visible bands of rock and snow across its steep walls.",
  "Flanked by the massive Rimo Glacier, Rimo I is located just 20 kilometers northeast of the snout of the Siachen Glacier.",
  "Because of its location in a highly sensitive border area of Ladakh, access to the mountain is restricted, requiring special clearances.",
  "Climbers face extreme hazards on Rimo I, including severe sub-zero cold, intense wind storms, and technical ice walls.",
  "Meltwater from the Rimo Glacier acts as a primary source for the Shyok River, which feeds into the mighty Indus River system."
];

// ---------- 4. FAQ ACCORDION DATA ----------
const RIMO_FAQS = [
  {
    question: "Where is Rimo I located?",
    answer: "Rimo I is located in the Rimo Muztagh, a subrange of the eastern Karakoram Range in the union territory of Ladakh, India. It lies near the eastern snout of the Siachen Glacier."
  },
  {
    question: "What is the elevation and global rank of Rimo I?",
    answer: "Rimo I stands at an elevation of 7,385 meters (24,229 feet) above sea level, making it the 71st highest peak in the world."
  },
  {
    question: "Who first climbed Rimo I?",
    answer: "The peak was first scaled on July 28, 1988, by an Indo-Japanese joint expedition team led by Hukam Singh and Yoshio Ogata, following a highly technical and challenging route."
  },
  {
    question: "Can tourists or mountaineers visit Rimo I easily?",
    answer: "No. Due to its close proximity to the sensitive border regions and the Siachen Glacier, expeditions to Rimo I are highly restricted and require special permits and security clearances from the Indian government."
  },
  {
    question: "How does the Rimo massif influence the local water system?",
    answer: "The Rimo Glacier feeds the Shyok River, which flows through the Ladakh region and serves as a vital tributary of the Indus River system, supplying crucial fresh water to downstream communities."
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
  const container = document.getElementById("rimo-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  RIMO_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "rimo-faq-item";
    
    // Accessibility: Use a button with appropriate aria attributes
    item.innerHTML = `
      <button class="rimo-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="rimo-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".rimo-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      container.querySelectorAll(".rimo-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".rimo-faq-question").setAttribute("aria-expanded", "false");
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
  const grid = document.getElementById("rimo-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  RIMO_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "rimo-gallery-item";
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
  const lightbox = document.getElementById("rimo-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("rimo-lightbox-prev");
  const nextBtn = document.getElementById("rimo-lightbox-next");

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
  const lightbox = document.getElementById("rimo-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("rimo-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = RIMO_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = RIMO_GALLERY[currentGalleryIndex];
  
  const img = document.getElementById("rimo-lightbox-image");
  const caption = document.getElementById("rimo-lightbox-caption");
  
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 10. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("rimo-fact-text");
  const dotsWrap = document.getElementById("rimo-fact-dots");
  if (!factEl) return;

  // Clear any existing dots and interval if running
  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    RIMO_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "rimo-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = RIMO_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % RIMO_FACTS.length), 6000);
}

// ---------- 11. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("rimo-map");
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

  // Set view to Rimo I peak coordinates (35.3533° N, 77.3681° E)
  map = L.map("rimo-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([35.3533, 77.3681], 10);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  RIMO_LOCATIONS.forEach((loc) => {
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
