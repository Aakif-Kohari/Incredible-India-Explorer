/* ============================================================
   Middle Andaman Explorer — middle-andaman.js
   Handles: tab navigation, image gallery lightbox, facts
   rotator, and the Leaflet map with key-location markers.
   ============================================================ */

// ---------- 1. KEY LOCATIONS FOR THE MAP ----------
const MIDDLE_ANDAMAN_LOCATIONS = [
  {
    name: "Baratang Island",
    lat: 12.1167,
    lng: 92.7500,
    description: "Known for its limestone caves, mud volcanoes and mangrove creeks."
  },
  {
    name: "Limestone Caves, Baratang",
    lat: 12.1500,
    lng: 92.8167,
    description: "Reached via a boat ride through mangrove creeks followed by a jungle walk to Nayadera Jetty."
  },
  {
    name: "Rangat",
    lat: 12.4667,
    lng: 92.9333,
    description: "A quiet town surrounded by greenery, gateway to Amkunj and Dhani Nallah beaches."
  },
  {
    name: "Mayabunder",
    lat: 12.9167,
    lng: 92.9333,
    description: "A coastal town on the northern edge of Middle Andaman, close to Karmatang Beach."
  },
  {
    name: "Karmatang Beach",
    lat: 12.9333,
    lng: 92.9500,
    description: "A long sandy beach near Mayabunder, an important sea turtle nesting site."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const MIDDLE_ANDAMAN_GALLERY = [
  { src: "../../assets/travel_hidden.png", caption: "Limestone Caves, Baratang Island" },
  { src: "../../assets/river6.png", caption: "Mangrove creek boat ride, Baratang" },
  { src: "../../assets/travel_beaches.png", caption: "Karmatang Beach, near Mayabunder" },
  { src: "../../assets/travel_mountains.png", caption: "Tropical forest along the Andaman Trunk Road" }
];

// ---------- 3. INTERESTING FACTS ----------
const MIDDLE_ANDAMAN_FACTS = [
  "The Baratang limestone caves were formed over thousands of years by the slow deposition of calcium carbonate, creating stalactite and stalagmite formations.",
  "Reaching the limestone caves involves a boat ride through narrow mangrove creeks followed by a jungle walk — often described by visitors as feeling like a survival show.",
  "Baratang is also home to active mud volcanoes, where mud and gases bubble up naturally from underground.",
  "The Andaman Trunk Road connecting Middle Andaman to Port Blair passes through the Jarawa Tribal Reserve, and vehicles must travel in escorted convoys.",
  "Karmatang Beach near Mayabunder is an important nesting site for sea turtles.",
  "Middle Andaman's mangrove forests are among the most extensive in India, forming a rich nursery habitat for fish, crabs and birds.",
  "Rangat and Mayabunder are the two main towns of Middle Andaman, both surrounded by dense tropical forest and small fishing and farming villages."
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
  const tabButtons = document.querySelectorAll(".mandaman-tab-btn");
  const tabPanels = document.querySelectorAll(".mandaman-tab-panel");

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
  const galleryGrid = document.getElementById("mandaman-gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";
  MIDDLE_ANDAMAN_GALLERY.forEach((item, index) => {
    const fig = document.createElement("figure");
    fig.className = "mandaman-gallery-item";
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
  const prevBtn = document.getElementById("mandaman-lightbox-prev");
  const nextBtn = document.getElementById("mandaman-lightbox-next");
  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("mandaman-lightbox");
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("mandaman-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("mandaman-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = MIDDLE_ANDAMAN_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = MIDDLE_ANDAMAN_GALLERY[currentGalleryIndex];
  const img = document.getElementById("mandaman-lightbox-image");
  const caption = document.getElementById("mandaman-lightbox-caption");
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 9. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("mandaman-fact-text");
  const dotsWrap = document.getElementById("mandaman-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    MIDDLE_ANDAMAN_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "mandaman-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = MIDDLE_ANDAMAN_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % MIDDLE_ANDAMAN_FACTS.length), 6000);
}

// ---------- 10. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("mandaman-map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("mandaman-map", {
    scrollWheelZoom: false,
    minZoom: 7,
  }).setView([12.55, 92.85], 9);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  MIDDLE_ANDAMAN_LOCATIONS.forEach((loc) => {
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