/* ============================================================
   Bheemili Beach Explorer — bheemili-beach.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const BHEEMILI_LOCATIONS = [
  {
    name: "Bheemili Beach",
    lat: 17.8897,
    lng: 83.3373,
    description: "A pristine beach in Bheemunipatnam, Andhra Pradesh, known for its golden sands, calm waters, and the historic Dutch and French colonial remnants along the coastline."
  },
  {
    name: "Bheemunipatnam Fort",
    lat: 17.8920,
    lng: 83.3400,
    description: "The ruins of the 17th-century fort built by the Dutch East India Company, overlooking the Bay of Bengal."
  },
  {
    name: "Kailasagiri Hill Viewpoint",
    lat: 17.6875,
    lng: 83.2145,
    description: "A Hill park overlooking the coast and city of Visakhapatnam, offering panoramic views of Bheemili Beach and the surrounding coastline."
  },
  {
    name: "Submarine Museum",
    lat: 17.6800,
    lng: 83.2200,
    description: "India's first submarine museum located at Ramakrishna Beach, showcasing a decommissioned Russian submarine and naval artifacts."
  },
  {
    name: "Dolphin's Nose Lighthouse",
    lat: 17.6935,
    lng: 83.2360,
    description: "A prominent lighthouse at Dolphin's Nose headland, guiding ships along the Andhra coastline and offering views of the merging of the Bay of Bengal and the sea."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const BHEEMILI_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Bheemili Beach golden sands stretching along the Bay of Bengal" },
  { src: "../../assets/travel_hidden.png", caption: "Historic Dutch and French colonial ruins at Bheemunipatnam" },
  { src: "../../assets/river1.png", caption: "Calm waters ideal for swimming and water sports" },
  { src: "../../assets/river2.png", caption: "Sunset views over the coastline from Bheemili" }
];

// ---------- 3. INTERESTING FACTS ----------
const BHEEMILI_FACTS = [
  "Bheemili Beach, also known as Bheemunipatnam, was a major port during the Dutch and French colonial era in the 17th and 18th centuries.",
  "The name 'Bheemili' is derived from the legend of Bhima, one of the Pandava brothers from the Mahabharata, who is said to have visited the site.",
  "The beach's golden sands are composed of crushed shells and coral, giving it a unique sparkling appearance under the sun.",
  "Bheemunipatnam was one of the first Indian coastlines where the Dutch East India Company established a trading post in 1659.",
  "The area is known for its shipbuilding history, with ancient shipyards operating along the creek during the colonial period.",
  "Local fishing communities have inhabited the Bheemili coast for centuries, preserving traditional boat-building and net-weaving techniques.",
  "The beach is part of the larger Visakhapatnam coastline, which is being developed as a major tourism and recreational hub for Andhra Pradesh."
];

// ---------- 4. STATE ----------
let map;
let currentGalleryIndex = 0;
let factIndex = 0;

// ---------- 5. DOM READY ----------
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initGallery();
  initFactsRotator();
  initMap();
  initLightbox();
});

// ---------- 6. TAB NAVIGATION ----------
function initTabs() {
  const tabButtons = document.querySelectorAll(".bheemili-tab-btn");
  const tabPanels = document.querySelectorAll(".bheemili-tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      tabPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === "tab-" + target);
      });
    });
  });
}

// ---------- 7. IMAGE GALLERY ----------
function initGallery() {
  const galleryGrid = document.getElementById("bheemili-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  BHEEMILI_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "bheemili-gallery-item";
    fig.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <figcaption>${item.caption}</figcaption>
    `;
    fig.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(fig);
  });
}

// ---------- 8. LIGHTBOX ----------
function initLightbox() {
  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });
  const prevBtn = document.getElementById("bheemili-lightbox-prev");
  const nextBtn = document.getElementById("bheemili-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("bheemili-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("bheemili-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("bheemili-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = BHEEMILI_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = BHEEMILI_GALLERY[currentGalleryIndex];
  const img = document.getElementById("bheemili-lightbox-image");
  const caption = document.getElementById("bheemili-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("bheemili-fact-text");
  const dotsWrap = document.getElementById("bheemili-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    BHEEMILI_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "bheemili-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = BHEEMILI_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % BHEEMILI_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("bheemili-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("bheemili-map", {
    scrollWheelZoom: false,
    minZoom: 8,
  }).setView([17.88, 83.33], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  BHEEMILI_LOCATIONS.forEach((loc) => {
    const marker = L.circleMarker([loc.lat, loc.lng], {
      radius: 8,
      color: "#ff9933",
      fillColor: "#ffb01f",
      fillOpacity: 0.85,
      weight: 2,
    }).addTo(map);

    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`);
  });
}