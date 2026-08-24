/* ============================================================
   Tharangambadi Beach Explorer — tharangambadi-beach.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const THARANGAMBADI_LOCATIONS = [
  {
    name: "Tharangambadi Beach",
    lat: 10.95,
    lng: 79.7,
    description: "A pristine beach in Tharangambadi, Tamil Nadu, known for its golden sands, calm waters, and the historic Danish colonial structures along the coastline, including the iconic Fort Dansborg."
  },
  {
    name: "Fort Dansborg",
    lat: 10.9480,
    lng: 79.6950,
    description: "The majestic Danish fort built in 1620, serving as the European headquarters for Danish trade in Tamil Nadu. Also known as Fort Dansborg, it now houses a museum showcasing colonial artifacts, paintings, and the history of Danish presence in South India."
  },
  {
    name: "Dane Church",
    lat: 10.9495,
    lng: 79.6970,
    description: "A beautiful 1740s Danish Evangelical Lutheran church, one of the oldest churches in India. The church features European architectural style with thick walls, teak wood furnishings, and a tranquil cemetery dating back to the colonial era."
  },
  {
    name: "Tharangambadi Palace",
    lat: 10.9510,
    lng: 79.6985,
    description: "The remnants of the Danish governor's residence and administrative complex, offering insight into the colonial governance structure and lifestyle of the Danish settlers in Tharangambadi."
  },
  {
    name: "Shipping Canal",
    lat: 10.9450,
    lng: 79.6900,
    description: "A historic canal built during the Danish period to facilitate inland water transport and connect the agricultural hinterland to the sea, still in use by local fishermen and traders."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const THARANGAMBADI_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Tharangambadi Beach golden sands with Fort Dansborg in the distance" },
  { src: "../../assets/travel_hidden.png", caption: "Historic Fort Dansborg and Danish colonial architecture" },
  { src: "../../assets/river1.png", caption: "Calm waters ideal for swimming and walking along the shore" },
  { src: "../../assets/river2.png", caption: "Sunset views over the coastline from Tharangambadi" }
];

// ---------- 3. INTERESTING FACTS ----------
const THARANGAMBADI_FACTS = [
  "Tharangambadi, also known as Tranquebar, was a Danish colony from 1620 to 1845, making it one of the longest-lasting European settlements on the Coromandel Coast.",
  "Fort Dansborg, built in 1620, was the northernmost Danish trading post in India and served as the residence of the Danish governor.",
  "The name 'Tharangambadi' means 'Place of the Singing Waves' in Tamil, referring to the unique sound of the waves hitting the shore.",
  "The Dane Church, built in 1740s, is one of the oldest Protestant churches in India and still holds regular services.",
  "Danish coins, seals, and manuscripts from the colonial period have been excavated at Tharangambadi, offering glimpses into the trade and administration of the era.",
  "Local fishing communities have inhabited the Tharangambadi coast for centuries, preserving traditional net-weaving and boat-building techniques.",
  "The Danish government officially transferred Tharangambadi to India in 1845, and many colonial-era structures have been preserved as heritage sites."
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
  const tabButtons = document.querySelectorAll(".tharangambadi-tab-btn");
  const tabPanels = document.querySelectorAll(".tharangambadi-tab-panel");

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
  const galleryGrid = document.getElementById("tharangambadi-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  THARANGAMBADI_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "tharangambadi-gallery-item";
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
  const prevBtn = document.getElementById("tharangambadi-lightbox-prev");
  const nextBtn = document.getElementById("tharangambadi-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("tharangambadi-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("tharangambadi-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("tharangambadi-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = THARANGAMBADI_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = THARANGAMBADI_GALLERY[currentGalleryIndex];
  const img = document.getElementById("tharangambadi-lightbox-image");
  const caption = document.getElementById("tharangambadi-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("tharangambadi-fact-text");
  const dotsWrap = document.getElementById("tharangambadi-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    THARANGAMBADI_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "tharangambadi-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = THARANGAMBADI_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % THARANGAMBADI_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("tharangambadi-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("tharangambadi-map", {
    scrollWheelZoom: false,
    minZoom: 8,
  }).setView([10.95, 79.7], 11);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  THARANGAMBADI_LOCATIONS.forEach((loc) => {
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