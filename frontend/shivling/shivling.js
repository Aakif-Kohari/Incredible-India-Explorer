/* ============================================================
   Shivling Mountain Explorer — shivling.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

// ---------- 1. MAP LOCATIONS ----------
const SHIVLING_LOCATIONS = [
  {
    name: "Shivling Peak",
    lat: 30.875323,
    lng: 79.065582,
    description: "The main summit of Shivling, standing at 6,543 meters, famed for its perfect pyramid shape."
  },
  {
    name: "Tapovan Meadow",
    lat: 30.8938,
    lng: 79.0784,
    description: "A high-altitude alpine meadow directly below Shivling, famous for spiritual meditation and scenic views of the peak."
  },
  {
    name: "Gaumukh",
    lat: 30.9264,
    lng: 79.0805,
    description: "The terminus snout of the Gangotri Glacier, which serves as the traditional geographical source of the Bhagirathi (Ganga) River."
  },
  {
    name: "Bhagirathi Peaks",
    lat: 30.8583,
    lng: 79.1333,
    description: "A prominent group of peaks situated opposite Shivling across the Gangotri Glacier."
  },
  {
    name: "Gangotri Glacier",
    lat: 30.83,
    lng: 79.17,
    description: "One of the largest glaciers in the Himalayas, flanking the eastern and northern base of Shivling."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const SHIVLING_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The striking pyramid silhouette of Shivling Peak." },
  { src: "../../assets/Manalileh.png", caption: "High-altitude trails leading towards the base of the mountain." },
  { src: "../../assets/Shimlakaza.png", caption: "Tapovan meadow situated at the foot of Shivling's vertical walls." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Scenic Himalayan glaciers surrounding the Gangotri group." }
];

// ---------- 3. DID YOU KNOW FACTS ----------
const SHIVLING_FACTS = [
  "Shivling is often called the 'Matterhorn of India' due to its steep, pyramid-like structure that closely resembles the Swiss Alps icon.",
  "The mountain was first climbed on June 3, 1974, by a team of the Indo-Tibetan Border Police (ITBP) led by Hukam Singh.",
  "Shivling is a twin-peaked mountain, with the main western summit standing at 6,543 meters and the lower eastern summit at 6,501 meters.",
  "It is located directly above Tapovan, a grassy meadow at 4,460 meters that is a sacred destination for ascetics and trekkers.",
  "The legendary mountaineer Valeri Babanov was awarded the Piolet d'Or (climbing's highest honor) in 2002 for his solo first ascent of the north face of Shivling.",
  "Unlike many peaks of its height, Shivling represents a highly technical rock, ice, and mixed climb from almost all approach routes."
];

// ---------- 4. FAQ ACCORDION DATA ----------
const SHIVLING_FAQS = [
  {
    question: "Where is Shivling Mountain located?",
    answer: "Shivling lies in the Gangotri Group of peaks in the western Garhwal Himalayas in Uttarakhand, India, close to the snout of the Gangotri Glacier at Gaumukh."
  },
  {
    question: "Why is it called Shivling?",
    answer: "The mountain's shape resembles the 'Shiva Lingam', the sacred symbol of Lord Shiva, who is traditionally believed to reside in the high Himalayas."
  },
  {
    question: "What is the elevation of Shivling?",
    answer: "Shivling stands at a height of 6,543 meters (21,467 feet) above sea level."
  },
  {
    question: "Is Shivling considered a difficult climb?",
    answer: "Yes, it is exceptionally technical. Its steep granite walls and overhanging ice columns make it a coveted and formidable target for advanced alpine mountaineers globally."
  },
  {
    question: "How do trekkers view Shivling?",
    answer: "Most trekkers hike from Gangotri town to Gaumukh and continue up the steep moraine to Tapovan, which offers a close-up, panoramic view of the entire peak."
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
  const container = document.getElementById("shivling-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  SHIVLING_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "shivling-faq-item";
    
    // Accessibility: Use a button with appropriate aria attributes
    item.innerHTML = `
      <button class="shivling-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="shivling-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".shivling-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      container.querySelectorAll(".shivling-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".shivling-faq-question").setAttribute("aria-expanded", "false");
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
  const grid = document.getElementById("shivling-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  SHIVLING_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "shivling-gallery-item";
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
  const lightbox = document.getElementById("shivling-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("shivling-lightbox-prev");
  const nextBtn = document.getElementById("shivling-lightbox-next");

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
  const lightbox = document.getElementById("shivling-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("shivling-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = SHIVLING_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = SHIVLING_GALLERY[currentGalleryIndex];
  
  const img = document.getElementById("shivling-lightbox-image");
  const caption = document.getElementById("shivling-lightbox-caption");
  
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 10. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("shivling-fact-text");
  const dotsWrap = document.getElementById("shivling-fact-dots");
  if (!factEl) return;

  // Clear any existing dots and interval if running
  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    SHIVLING_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "shivling-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = SHIVLING_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % SHIVLING_FACTS.length), 6000);
}

// ---------- 11. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("shivling-map");
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

  // Set view to Shivling Peak coordinates (30.875323° N, 79.065582° E)
  map = L.map("shivling-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([30.875323, 79.065582], 12);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  SHIVLING_LOCATIONS.forEach((loc) => {
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
