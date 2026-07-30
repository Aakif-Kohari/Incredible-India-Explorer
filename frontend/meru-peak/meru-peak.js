/* ============================================================
   Meru Peak Mountain Explorer — meru-peak.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

// ---------- 1. MAP LOCATIONS ----------
const MERU_PEAK_LOCATIONS = [
  {
    name: "Meru Peak",
    lat: 30.8675,
    lng: 79.0332,
    description: "The highest point of the Meru massif, the South Peak standing at 6,660 meters."
  },
  {
    name: "Tapovan Meadow",
    lat: 30.8938,
    lng: 79.0784,
    description: "A high-altitude alpine meadow often used as a base camp for expeditions in the Gangotri group."
  },
  {
    name: "Gaumukh",
    lat: 30.9264,
    lng: 79.0805,
    description: "The terminus snout of the Gangotri Glacier, which serves as the traditional geographical source of the Bhagirathi (Ganga) River."
  },
  {
    name: "Mount Shivling",
    lat: 30.8753,
    lng: 79.0656,
    description: "A prominent neighboring peak situated close to Meru Peak."
  },
  {
    name: "Gangotri Glacier",
    lat: 30.83,
    lng: 79.17,
    description: "One of the largest glaciers in the Himalayas, flowing through the Garhwal region."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const MERU_PEAK_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The stunning three-peaked profile of the Meru massif." },
  { src: "../../assets/Manalileh.png", caption: "High-altitude trails leading towards the base of the mountain." },
  { src: "../../assets/Shimlakaza.png", caption: "Expedition staging grounds below the vertical walls of Meru Peak." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Scenic Himalayan glaciers surrounding the Gangotri group." }
];

// ---------- 3. DID YOU KNOW FACTS ----------
const MERU_PEAK_FACTS = [
  "Meru Peak is famous worldwide for the 'Shark's Fin' on its central peak, considered one of the hardest big-wall climbs in the Himalayas.",
  "The highest point of the mountain is the South Peak at 6,660 meters, first climbed in 1980 by a Japanese expedition.",
  "The notorious Shark's Fin route on Meru Central (6,310m) remained unclimbed despite numerous attempts until October 2011.",
  "The 2011 historic first ascent of the Shark's Fin was accomplished by American climbers Conrad Anker, Jimmy Chin, and Renan Ozturk.",
  "Meru Peak consists of three distinct summits: South (6,660m), Central (6,310m), and North (6,450m).",
  "Unlike many peaks of its height, Meru Peak demands extreme technical rock, ice, and big-wall climbing skills."
];

// ---------- 4. FAQ ACCORDION DATA ----------
const MERU_PEAK_FAQS = [
  {
    question: "Where is Meru Peak located?",
    answer: "Meru Peak lies in the Gangotri Group of peaks in the western Garhwal Himalayas in Uttarakhand, India."
  },
  {
    question: "What are the three peaks of Meru?",
    answer: "The massif consists of three distinct summits: the South Peak (6,660 m), the North Peak (6,450 m), and the Central Peak (6,310 m), which hosts the famous Shark's Fin."
  },
  {
    question: "What is the elevation of Meru Peak?",
    answer: "The highest point, Meru South, stands at a height of 6,660 meters (21,850 feet) above sea level."
  },
  {
    question: "Is Meru Peak considered a difficult climb?",
    answer: "Yes, it is exceptionally technical. Its steep granite walls and overhanging ice columns, particularly the Shark's Fin, make it one of the most formidable targets for advanced alpine mountaineers globally."
  },
  {
    question: "Who first climbed the Shark's Fin?",
    answer: "After numerous failed attempts by world-class teams over decades, the Shark's Fin on Meru Central was finally successfully climbed in October 2011 by Conrad Anker, Jimmy Chin, and Renan Ozturk."
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
  const container = document.getElementById("meru-peak-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  MERU_PEAK_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "meru-peak-faq-item";
    
    // Accessibility: Use a button with appropriate aria attributes
    item.innerHTML = `
      <button class="meru-peak-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="meru-peak-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".meru-peak-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      container.querySelectorAll(".meru-peak-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".meru-peak-faq-question").setAttribute("aria-expanded", "false");
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
  const grid = document.getElementById("meru-peak-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  MERU_PEAK_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "meru-peak-gallery-item";
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
  const lightbox = document.getElementById("meru-peak-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("meru-peak-lightbox-prev");
  const nextBtn = document.getElementById("meru-peak-lightbox-next");

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
  const lightbox = document.getElementById("meru-peak-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("meru-peak-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = MERU_PEAK_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = MERU_PEAK_GALLERY[currentGalleryIndex];
  
  const img = document.getElementById("meru-peak-lightbox-image");
  const caption = document.getElementById("meru-peak-lightbox-caption");
  
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 10. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("meru-peak-fact-text");
  const dotsWrap = document.getElementById("meru-peak-fact-dots");
  if (!factEl) return;

  // Clear any existing dots and interval if running
  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    MERU_PEAK_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "meru-peak-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = MERU_PEAK_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % MERU_PEAK_FACTS.length), 6000);
}

// ---------- 11. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("meru-peak-map");
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

  // Set view to Meru Peak coordinates
  map = L.map("meru-peak-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([30.8675, 79.0332], 12);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  MERU_PEAK_LOCATIONS.forEach((loc) => {
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
