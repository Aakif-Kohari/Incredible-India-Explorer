/* ============================================================
   Kanyakumari Beach Explorer — kanyakumari-beach.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const KANYAKUMARI_LOCATIONS = [
  {
    name: "Kanyakumari Beach",
    lat: 8.0883,
    lng: 77.5341,
    description: "The southernmost tip of peninsular India where three seas confluence — Arabian Sea, Bay of Bengal and Indian Ocean — famous for sunrise and sunset spectacles."
  },
  {
    name: "Vivekananda Rock Memorial",
    lat: 8.0810,
    lng: 77.5430,
    description: "Built in 1970 to commemorate Swami Vivekananda's meditation on the rock. Accessible by ferry, the memorial offers panoramic views of the coastline and is a spiritual and tourist landmark."
  },
  {
    name: "Thiruvalluvar Statue",
    lat: 8.0825,
    lng: 77.5450,
    description: "A 133-foot tall stone statue of the celebrated Tamil poet and philosopher Thiruvalluvar, standing on two rocks near the coastline. Inaugurated in 2000, it symbolizes Tamil cultural heritage."
  },
  {
    name: "Gandhi Memorial",
    lat: 8.0785,
    lng: 77.5400,
    description: "Built at the spot where Mahatma Gandhi's ashes were immersed in the sea in 1948. The memorial architecture is designed so that on Gandhi's birthday (October 2), the sun rays fall exactly on the spot where the ashes were placed."
  },
  {
    name: "Bhagavathy Amman Temple",
    lat: 8.0850,
    lng: 77.5300,
    description: "The ancient temple dedicated to goddess Kanyaka Parameswari, after whom the town of Kanyakumari is named. The temple overlooks the sea and has been a pilgrimage site for centuries."
  },
  {
    name: "Sunset Point",
    lat: 8.0700,
    lng: 77.5600,
    description: "A popular viewpoint for watching the sunset over the three-sea confluence. During winter months, the sunset aligns perfectly with the horizon, creating a spectacle photographed by visitors from around the world."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const KANYAKUMARI_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Kanyakumari Beach three-sea confluence at sunrise" },
  { src: "../../assets/travel_hidden.png", caption: "Vivekananda Rock Memorial rising from the sea" },
  { src: "../../assets/river1.png", caption: "Calm waters ideal for swimming and boat rides" },
  { src: "../../assets/river2.png", caption: "Spectacular sunset over the ocean horizon" }
];

// ---------- 3. INTERESTING FACTS ----------
const KANYAKUMARI_FACTS = [
  "Kanyakumari is one of the few places in the world where both sunrise and sunset can be seen over the ocean.",
  "The name Kanyakumari derives from the Hindu goddess Devi Kanyaka Parameswari, whose temple overlooks the sea.",
  "On Mahatma Gandhi's birthday (October 2), sun rays fall exactly on the spot where his ashes were immersed at the Gandhi Memorial.",
  "Vivekananda Rock Memorial was built in 1970 to commemorate Swami Vivekananda's visit and meditation on the rock.",
  "The confluence of Arabian Sea, Bay of Bengal and Indian Ocean creates unique tidal patterns not found elsewhere on the Indian coast.",
  "Olive ridley sea turtles nest on Kanyakumari Beach during winter months, though their numbers are monitored by conservation groups.",
  "The Gandhi Memorial's architecture is designed so that on October 2, sun rays illuminate the exact spot where Gandhi's ashes were placed."
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
  const tabButtons = document.querySelectorAll(".kanyakumari-tab-btn");
  const tabPanels = document.querySelectorAll(".kanyakumari-tab-panel");

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
  const galleryGrid = document.getElementById("kanyakumari-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  KANYAKUMARI_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "kanyakumari-gallery-item";
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
  const prevBtn = document.getElementById("kanyakumari-lightbox-prev");
  const nextBtn = document.getElementById("kanyakumari-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("kanyakumari-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("kanyakumari-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("kanyakumari-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = KANYAKUMARI_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = KANYAKUMARI_GALLERY[currentGalleryIndex];
  const img = document.getElementById("kanyakumari-lightbox-image");
  const caption = document.getElementById("kanyakumari-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("kanyakumari-fact-text");
  const dotsWrap = document.getElementById("kanyakumari-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    KANYAKUMARI_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "kanyakumari-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = KANYAKUMARI_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % KANYAKUMARI_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("kanyakumari-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("kanyakumari-map", {
    scrollWheelZoom: false,
    minZoom: 8,
  }).setView([8.08, 77.53], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  KANYAKUMARI_LOCATIONS.forEach((loc) => {
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