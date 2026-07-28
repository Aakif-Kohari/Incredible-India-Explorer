/* ============================================================
   Swaraj Dweep (Havelock Island) Explorer — swaraj-dweep.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const SWARAJ_LOCATIONS = [
  {
    name: "Radhanagar Beach (Beach No. 7)",
    lat: 11.982,
    lng: 92.964,
    description: "Named Asia's Best Beach by Time magazine in 2004 and Blue Flag certified in 2020 — 2 km of white sand backed by forest, best known for its sunsets."
  },
  {
    name: "Elephant Beach",
    lat: 12.0097,
    lng: 92.9477,
    description: "The island's water-sports hub on the northwest coast, reached by boat or forest trek, with shallow coral gardens ideal for snorkelling."
  },
  {
    name: "Kalapathar Beach",
    lat: 12.001,
    lng: 93.033,
    description: "A quieter beach on the southeastern coast, named for the large black rocks along its white-sand shoreline — a favourite sunrise spot."
  },
  {
    name: "Govind Nagar Jetty & Market",
    lat: 12.033,
    lng: 92.986,
    description: "The island's main jetty, market and transport hub, connected to Port Blair and Shaheed Dweep (Neil Island) by regular ferries."
  },
  {
    name: "Nemo Reef",
    lat: 12.02,
    lng: 92.978,
    description: "A popular beginner-friendly dive and snorkel site near Govind Nagar, named for the clownfish that live among its coral."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const SWARAJ_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Radhanagar Beach, Swaraj Dweep" },
  { src: "../../assets/travel_islands.png", caption: "Coastline near Elephant Beach" },
  { src: "../../assets/travel_hidden.png", caption: "Lush forest interior, a short trek from the beaches" }
];

// ---------- 3. INTERESTING FACTS ----------
const SWARAJ_FACTS = [
  "Havelock Island was renamed Swaraj Dweep ('Independence Island') in December 2018, on the 75th anniversary of Netaji Subhas Chandra Bose hoisting the Indian flag at Port Blair.",
  "Radhanagar Beach was named Asia's Best Beach by Time magazine in 2004 and earned international Blue Flag certification in 2020.",
  "Swaraj Dweep offers access to more than 20 scuba diving sites, making it the most popular diving destination in the Andaman Islands.",
  "The island's six villages are still home to descendants of Bengali refugee families resettled here after the Partition of India in 1947.",
  "Elephant Beach gets its name from elephants once used in logging that would swim across to the beach — the island later became famous for Rajan, a beloved swimming elephant.",
  "Underwater visibility around Swaraj Dweep can reach 15 to 30 metres during the October–May dive season.",
  "Swaraj Dweep and neighbouring Shaheed Dweep (Neil Island) are both part of Ritchie's Archipelago and are connected to each other by daily ferries."
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
  const tabButtons = document.querySelectorAll(".swaraj-tab-btn");
  const tabPanels = document.querySelectorAll(".swaraj-tab-panel");

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
  const galleryGrid = document.getElementById("swaraj-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  SWARAJ_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "swaraj-gallery-item";
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
  const prevBtn = document.getElementById("swaraj-lightbox-prev");
  const nextBtn = document.getElementById("swaraj-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("swaraj-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("swaraj-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("swaraj-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = SWARAJ_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = SWARAJ_GALLERY[currentGalleryIndex];
  const img = document.getElementById("swaraj-lightbox-image");
  const caption = document.getElementById("swaraj-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("swaraj-fact-text");
  const dotsWrap = document.getElementById("swaraj-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    SWARAJ_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "swaraj-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = SWARAJ_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % SWARAJ_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("swaraj-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("swaraj-map", {
    scrollWheelZoom: false,
    minZoom: 8,
  }).setView([12.0, 92.98], 12);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  SWARAJ_LOCATIONS.forEach((loc) => {
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