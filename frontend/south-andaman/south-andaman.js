/* ============================================================
   South Andaman Explorer — south-andaman.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const ANDAMAN_LOCATIONS = [
  {
    name: "Port Blair",
    lat: 11.6234,
    lng: 92.7265,
    description: "Capital of the Andaman & Nicobar Islands and the main gateway for visitors."
  },
  {
    name: "Cellular Jail",
    lat: 11.6742,
    lng: 92.7458,
    description: "Colonial-era prison, now a national memorial to India's freedom fighters."
  },
  {
    name: "Ross Island (Netaji Subhas Chandra Bose Dweep)",
    lat: 11.6775,
    lng: 92.7572,
    description: "Former British administrative headquarters, now atmospheric colonial ruins."
  },
  {
    name: "Chidiya Tapu",
    lat: 11.4926,
    lng: 92.6280,
    description: "Known as 'Bird Island' — a birdwatching haven and popular sunset point."
  },
  {
    name: "Corbyn's Cove Beach",
    lat: 11.6395,
    lng: 92.7469,
    description: "A palm-fringed beach close to Port Blair, popular for swimming and water sports."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const ANDAMAN_GALLERY = [
  { src: "../../assets/travel_beaches.png", caption: "Corbyn's Cove Beach, Port Blair" },
  { src: "../../assets/Taj_Mahal.png", caption: "Cellular Jail National Memorial" },
  { src: "../../assets/travel_hidden.png", caption: "Colonial ruins on Ross Island" },
  { src: "../../assets/travel_mountains.png", caption: "Sunset view from Chidiya Tapu" }
];

// ---------- 3. INTERESTING FACTS ----------
const ANDAMAN_FACTS = [
  "The Cellular Jail's three-storeyed building originally had 698 cells arranged in a starfish shape, designed so no prisoner could see or communicate with another.",
  "Ross Island served as the British administrative headquarters for the entire Andaman & Nicobar Islands before Independence, and is now officially renamed Netaji Subhas Chandra Bose Dweep.",
  "Chidiya Tapu, meaning 'Bird Island,' is home to over 46 species of birds and is one of the best sunset points in the Andamans.",
  "Port Blair is also nicknamed 'Mini India' for the diversity of communities who settled there from across the mainland.",
  "The Cellular Jail's evening Light & Sound Show retells the story of India's freedom struggle at the very site where many freedom fighters were imprisoned.",
  "Samudrika Naval Marine Museum in Port Blair displays marine life, shells, and the geography of the Andaman & Nicobar Islands.",
  "Ross Island's old buildings are now entwined with the roots of giant banyan and rubber trees, reclaimed slowly by the forest."
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
  }).setView([11.62, 92.72], 11);

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