/* ============================================================
   Great Nicobar Island Explorer — great-nicobar.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const NICOBAR_LOCATIONS = [
  {
    name: "Campbell Bay",
    lat: 7.0167,
    lng: 93.9333,
    description: "Main settlement and administrative headquarters of Great Nicobar."
  },
  {
    name: "Indira Point",
    lat: 6.7539,
    lng: 93.8264,
    description: "The southernmost tip of India, marked by a lighthouse."
  },
  {
    name: "Campbell Bay National Park",
    lat: 7.0333,
    lng: 93.9167,
    description: "Part of the Great Nicobar Biosphere Reserve, home to tropical evergreen forest."
  },
  {
    name: "Galathea National Park",
    lat: 6.9,
    lng: 93.8833,
    description: "Nesting ground for the Giant Leatherback turtle at Galathea Bay."
  },
  {
    name: "Mount Thullier",
    lat: 7.0833,
    lng: 93.9167,
    description: "The highest peak on Great Nicobar Island at 642 m."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const NICOBAR_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Coastline near Campbell Bay" },
  { src: "../../assets/river6.png", caption: "Galathea River basin" },
  { src: "../../assets/travel_hidden.png", caption: "Tropical evergreen forest interior" },
  { src: "../../assets/travel_mountains.png", caption: "View toward Mount Thullier" }
];

// ---------- 3. INTERESTING FACTS ----------
const NICOBAR_FACTS = [
  "Great Nicobar is the largest island in the Nicobar group and the southernmost island of India, covering roughly 921 sq. km.",
  "Indira Point, at the island's southern tip, is the southernmost point of Indian territory and is closer to Indonesia's Sumatra than to mainland India.",
  "Mount Thullier, at 642 m, is the highest peak on Great Nicobar Island.",
  "Galathea Bay is one of the few nesting sites in the world for the Giant Leatherback turtle, the largest sea turtle species on Earth.",
  "Campbell Bay National Park and the surrounding biosphere reserve were recognised by UNESCO as a Man and Biosphere Reserve in 2013.",
  "The island is home to the Shompen and Nicobarese indigenous communities, among the least-contacted tribal groups in India.",
  "The 2004 Indian Ocean tsunami caused the Indira Point lighthouse to subside by over 4 metres, permanently altering the coastline."
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
  const tabButtons = document.querySelectorAll(".nicobar-tab-btn");
  const tabPanels = document.querySelectorAll(".nicobar-tab-panel");

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
  const galleryGrid = document.getElementById("nicobar-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  NICOBAR_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "nicobar-gallery-item";
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
  const prevBtn = document.getElementById("nicobar-lightbox-prev");
  const nextBtn = document.getElementById("nicobar-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("nicobar-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("nicobar-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("nicobar-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = NICOBAR_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = NICOBAR_GALLERY[currentGalleryIndex];
  const img = document.getElementById("nicobar-lightbox-image");
  const caption = document.getElementById("nicobar-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("nicobar-fact-text");
  const dotsWrap = document.getElementById("nicobar-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    NICOBAR_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "nicobar-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = NICOBAR_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % NICOBAR_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("nicobar-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("nicobar-map", {
    scrollWheelZoom: false,
    minZoom: 8,
  }).setView([6.95, 93.87], 10);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  NICOBAR_LOCATIONS.forEach((loc) => {
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