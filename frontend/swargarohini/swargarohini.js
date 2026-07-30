/* ============================================================
   Swargarohini Mountain Explorer — swargarohini.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

// ---------- 1. MAP LOCATIONS ----------
const SWARGAROHINI_LOCATIONS = [
  {
    name: "Swargarohini I Summit",
    lat: 31.1000,
    lng: 78.5161,
    description: "The main summit of Swargarohini massif (6,252 m), legendary as the mythological stairway to heaven."
  },
  {
    name: "Har Ki Dun Valley",
    lat: 31.1500,
    lng: 78.4333,
    description: "A gorgeous cradle-shaped hanging valley at 3,566 m, offering direct views of the Swargarohini peaks."
  },
  {
    name: "Ruinsara Tal",
    lat: 31.1167,
    lng: 78.5000,
    description: "A pristine high-altitude lake at 3,500 m, located at the base of the Swargarohini massif."
  },
  {
    name: "Sankri Village",
    lat: 30.9667,
    lng: 78.3333,
    description: "The base village and starting trailhead for all Har Ki Dun and Swargarohini area treks."
  },
  {
    name: "Tons River Source",
    lat: 31.0667,
    lng: 78.4667,
    description: "Formed by the confluence of the Rupin and Supin rivers, carrying glacial meltwaters from Swargarohini."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const SWARGAROHINI_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The jagged snow-clad peaks of the Swargarohini massif." },
  { src: "../../assets/Manalileh.png", caption: "Alpine valleys leading towards the base of Swargarohini." },
  { src: "../../assets/Kedarnath.png", caption: "Scenic Himalayan ridges surrounding the Saraswati range." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Glacial streams carrying runoff from the Swargarohini slopes." }
];

// ---------- 3. DID YOU KNOW FACTS ----------
const SWARGAROHINI_FACTS = [
  "Swargarohini is legendary in Hindu mythology as the literal 'Pathway to Heaven'. It is believed the Pandavas attempted to ascend to heaven via this mountain.",
  "According to the Mahabharata epic, only Yudhishthira and a dog survived the trek up the peak, while the other Pandavas fell on the mountain's steep slopes.",
  "The Swargarohini massif has four distinct peaks, with the westernmost peak, Swargarohini I (6,252 m), being the highest and most difficult to climb.",
  "Its northern face is a legendary climbing objective, dropping almost vertically for 2,000 meters into the Tons River valley.",
  "The peak was first climbed successfully in October 1974 by an Indian expedition team led by the legendary instructor/climber from Nehru Institute of Mountaineering.",
  "The glacier waters of Swargarohini feed the Supin River, which is a major headwater tributary of the sacred Tons and Yamuna rivers."
];

// ---------- 4. FAQ ACCORDION DATA ----------
const SWARGAROHINI_FAQS = [
  {
    question: "Where is Swargarohini Mountain located?",
    answer: "Swargarohini lies in the Uttarkashi district of Uttarakhand, India, forming part of the Saraswati (or Bandarpunch) range of the western Garhwal Himalayas."
  },
  {
    question: "What is the height of Swargarohini?",
    answer: "The highest peak of the massif, Swargarohini I, stands at an elevation of 6,252 meters (20,512 feet) above sea level."
  },
  {
    question: "What is the mythological significance of Swargarohini?",
    answer: "Its name means 'Pathway to Heaven'. According to the Mahabharata, the Pandavas scaled Swargarohini to reach heaven in their physical forms. Yudhishthira was the only Pandava to reach the summit successfully."
  },
  {
    question: "Can beginners climb Swargarohini?",
    answer: "No, Swargarohini is highly technical and dangerous. Its steep rock faces, hanging glaciers, and frequent avalanches make it suitable only for highly experienced alpine mountaineers. However, intermediate trekkers can easily trek to the Har Ki Dun valley at its base."
  },
  {
    question: "Where do you get the best views of the mountain?",
    answer: "The most popular vantage point is the Har Ki Dun valley trek and the scenic Ruinsara Tal trek, which both offer stunning, close-up panoramic views of the Swargarohini massif."
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
  const container = document.getElementById("swargarohini-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  SWARGAROHINI_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "swargarohini-faq-item";

    // Accessibility: Use a button with appropriate aria attributes
    item.innerHTML = `
      <button class="swargarohini-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="swargarohini-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".swargarohini-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      container.querySelectorAll(".swargarohini-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".swargarohini-faq-question").setAttribute("aria-expanded", "false");
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
  const grid = document.getElementById("swargarohini-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  SWARGAROHINI_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "swargarohini-gallery-item";
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
  const lightbox = document.getElementById("swargarohini-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("swargarohini-lightbox-prev");
  const nextBtn = document.getElementById("swargarohini-lightbox-next");

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
  const lightbox = document.getElementById("swargarohini-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("swargarohini-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = SWARGAROHINI_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = SWARGAROHINI_GALLERY[currentGalleryIndex];

  const img = document.getElementById("swargarohini-lightbox-image");
  const caption = document.getElementById("swargarohini-lightbox-caption");

  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 10. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("swargarohini-fact-text");
  const dotsWrap = document.getElementById("swargarohini-fact-dots");
  if (!factEl) return;

  // Clear any existing dots and interval if running
  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    SWARGAROHINI_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "swargarohini-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = SWARGAROHINI_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % SWARGAROHINI_FACTS.length), 6000);
}

// ---------- 11. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("swargarohini-map");
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

  // Set view to Swargarohini coordinates (31.1000° N, 78.5161° E)
  map = L.map("swargarohini-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([31.1000, 78.5161], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  SWARGAROHINI_LOCATIONS.forEach((loc) => {
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
