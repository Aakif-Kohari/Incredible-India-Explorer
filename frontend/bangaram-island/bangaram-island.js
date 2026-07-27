/* ============================================================
   Bangaram Island Explorer — bangaram-island.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const BANGARAM_LOCATIONS = [
  {
    name: "Bangaram Island",
    lat: 10.9526,
    lng: 72.2708,
    description: "The largest island in the atoll, uninhabited apart from resort staff and visitors, ringed by a shallow coral lagoon."
  },
  {
    name: "Bangaram Lagoon",
    lat: 10.9550,
    lng: 72.2650,
    description: "A shallow, crystal-clear lagoon enclosed by coral reef, shared with the neighbouring islets of the atoll."
  },
  {
    name: "Thinnakara Island",
    lat: 10.9280,
    lng: 72.2450,
    description: "A tiny, teardrop-shaped islet just across the lagoon from Bangaram, sharing the same coralline bank."
  },
  {
    name: "Agatti Island (Gateway)",
    lat: 10.8467,
    lng: 72.1833,
    description: "Home to the nearest airport and jetty; visitors reach Bangaram from here by boat."
  },
  {
    name: "Parali Islets",
    lat: 10.9700,
    lng: 72.2900,
    description: "A string of small, uninhabited islets — Parali I, II and III — on the northern edge of the shared lagoon."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const BANGARAM_GALLERY = [
  { src: "../../assets/travel_islands.png", caption: "Bangaram Island's coral atoll from above" },
  { src: "../../assets/travel_beaches.png", caption: "White-sand beach fringed by coconut palms" },
  { src: "../../assets/travel_hidden.png", caption: "The secluded lagoon shared with Thinnakara" },
  { src: "../../assets/river1.png", caption: "Crystal-clear waters ideal for snorkelling" }
];

// ---------- 3. INTERESTING FACTS ----------
const BANGARAM_FACTS = [
  "Bangaram is uninhabited except for resort staff and visitors — there is no permanent civilian population on the island.",
  "The island's shared lagoon spans roughly 125 square kilometres, ringed by a coral reef connecting Bangaram to Thinnakara, the Parali islets and Kalpitty.",
  "A shallow submarine ridge links the Bangaram atoll's reef to the reef of neighbouring Agatti Island.",
  "Lagoon visibility around Bangaram can reach 20 to 30 metres on a calm day, letting snorkellers see coral gardens straight from the shore.",
  "At night, bioluminescent plankton sometimes washes ashore, giving the waterline a faint bluish glow.",
  "Coral reefs here were affected by bleaching linked to the 1998 El Niño, and recovery has been gradual due to the atoll's shallow, sun-warmed waters.",
  "The island's centre holds a long brackish pond fringed by screw pine and coconut palms, adding to Bangaram's quiet, undeveloped character."
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
  const tabButtons = document.querySelectorAll(".bangaram-tab-btn");
  const tabPanels = document.querySelectorAll(".bangaram-tab-panel");

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
  const galleryGrid = document.getElementById("bangaram-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  BANGARAM_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "bangaram-gallery-item";
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
  const prevBtn = document.getElementById("bangaram-lightbox-prev");
  const nextBtn = document.getElementById("bangaram-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("bangaram-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("bangaram-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("bangaram-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = BANGARAM_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = BANGARAM_GALLERY[currentGalleryIndex];
  const img = document.getElementById("bangaram-lightbox-image");
  const caption = document.getElementById("bangaram-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("bangaram-fact-text");
  const dotsWrap = document.getElementById("bangaram-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    BANGARAM_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "bangaram-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = BANGARAM_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % BANGARAM_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("bangaram-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("bangaram-map", {
    scrollWheelZoom: false,
    minZoom: 8,
  }).setView([10.93, 72.24], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  BANGARAM_LOCATIONS.forEach((loc) => {
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