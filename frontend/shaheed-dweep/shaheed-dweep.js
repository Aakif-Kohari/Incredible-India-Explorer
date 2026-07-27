/* ============================================================
   Shaheed Dweep (Neil Island) Explorer — shaheed-dweep.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const ANDAMAN_LOCATIONS = [
  {
    name: "Natural Bridge (Howrah Bridge)",
    lat: 11.8494,
    lng: 93.0345,
    description: "A naturally formed rock arch carved by wave and coral erosion, at the edge of Laxmanpur Beach. Best seen at low tide."
  },
  {
    name: "Bharatpur Beach",
    lat: 11.8347,
    lng: 93.0384,
    description: "A calm bay near the jetty, popular for glass-bottom boat rides and shallow-water snorkelling over coral beds."
  },
  {
    name: "Laxmanpur Beach",
    lat: 11.8452,
    lng: 93.0169,
    description: "A long, west-facing stretch of white sand, home to the Natural Bridge and one of the island's best sunset spots."
  },
  {
    name: "Sitapur Beach (Sunrise Point)",
    lat: 11.8223,
    lng: 93.0432,
    description: "A quieter, rockier cove on the island's southeastern tip, known for sunrise views."
  },
  {
    name: "Neil Kendra (Jetty & Market)",
    lat: 11.8358,
    lng: 93.0298,
    description: "The island's small main village, ferry jetty and market — the starting point for exploring the rest of Neil Island."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const ANDAMAN_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Bharatpur Beach, Shaheed Dweep" },
  { src: "../../assets/travel_islands.png", caption: "The Natural Bridge at Laxmanpur Beach" },
  { src: "../../assets/travel_hidden.png", caption: "Coral beds visible from a glass-bottom boat" },
  { src: "../../assets/travel_mountains.png", caption: "Sunset over Laxmanpur Beach" }
];

// ---------- 3. INTERESTING FACTS ----------
const ANDAMAN_FACTS = [
  "Neil Island was officially renamed Shaheed Dweep ('Martyrs' Island') in 2018, in the same announcement that renamed Ross Island and Havelock Island.",
  "The Natural Bridge, nicknamed 'Howrah Bridge' after its namesake in Kolkata, was formed entirely by decades of wave and coral erosion — no human hands involved.",
  "Neil Island is often called the 'vegetable bowl' of the Andaman & Nicobar Islands, supplying much of the fresh produce sold in Port Blair's markets.",
  "Many of the island's farming families are descendants of Bengali and Bihari settlers relocated here after Partition in the 1950s.",
  "At just under 19 square kilometres, Shaheed Dweep is small enough to circle almost entirely by bicycle in a single day.",
  "Sitapur Beach on the island's southeastern tip is nicknamed 'Sunrise Point,' facing the opposite direction from Laxmanpur's sunset views.",
  "Bharatpur Beach's shallow, calm waters make it one of the most beginner-friendly snorkelling spots in the entire Andaman archipelago."
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
  const tabButtons = document.querySelectorAll(".andaman-tab-btn");
  const tabPanels = document.querySelectorAll(".andaman-tab-panel");

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
  const galleryGrid = document.getElementById("andaman-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  ANDAMAN_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "andaman-gallery-item";
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
  const prevBtn = document.getElementById("andaman-lightbox-prev");
  const nextBtn = document.getElementById("andaman-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("andaman-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("andaman-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("andaman-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = ANDAMAN_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = ANDAMAN_GALLERY[currentGalleryIndex];
  const img = document.getElementById("andaman-lightbox-image");
  const caption = document.getElementById("andaman-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("andaman-fact-text");
  const dotsWrap = document.getElementById("andaman-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    ANDAMAN_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "andaman-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = ANDAMAN_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % ANDAMAN_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("andaman-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("andaman-map", {
    scrollWheelZoom: false,
    minZoom: 8,
  }).setView([11.835, 93.03], 13);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  ANDAMAN_LOCATIONS.forEach((loc) => {
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