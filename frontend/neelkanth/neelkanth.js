/* ============================================================
   Neelkanth Mountain Explorer — neelkanth-i.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

const NEELKANTH_LOCATIONS = [
  {
    name: "Neelkanth Peak",
    lat: 30.1333,
    lng: 80.1333,
    description: "The main summit of Neelkanth, standing at 6,596 meters in the Garhwal Himalayas of Uttarakhand."
  },
  {
    name: "Munsiyari",
    lat: 30.0634,
    lng: 80.2332,
    description: "A gateway town for high Himalayan journeys in the Kumaon region, known for its remote landscapes and trail access."
  },
  {
    name: "Milam Glacier Region",
    lat: 30.1500,
    lng: 80.2000,
    description: "A glacial landscape near the broader Neelkanth massif, offering dramatic alpine terrain and panoramic views."
  },
  {
    name: "High-Altitude Meadows",
    lat: 30.1100,
    lng: 80.1700,
    description: "Open alpine pasturelands that frame the mountain and support trekking routes in the area."
  },
  {
    name: "Kumaon Himalayan Valleys",
    lat: 30.0800,
    lng: 80.2800,
    description: "Deep valleys and forested approaches that define the transition from foothills to alpine terrain."
  }
];

const NEELKANTH_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The broad mountain horizon of the Garhwal Himalayas." },
  { src: "../../assets/Manalileh.png", caption: "High-altitude trail scenery linked to remote Himalayan travel." },
  { src: "../../assets/Shimlakaza.png", caption: "Alpine valleys and rugged landscapes surrounding the mountain region." },
  { src: "../../assets/Hemis_Monastery.png", caption: "A broader Himalayan landscape that reflects the area’s dramatic terrain." }
];

const NEELKANTH_FACTS = [
  "Neelkanth is located in Uttarakhand and is associated with the Kumaon Himalayan range, known for its distinct ridge lines and high alpine setting.",
  "The mountain is often admired for its dramatic presence above the valleys and glacial approaches that frame the broader Himalayan landscape.",
  "Treks in this region often combine forests, high passes, and remote villages with the striking scenery of the upper mountain terrain.",
  "The surrounding area is deeply tied to Uttarakhand’s trekking culture, where alpine weather, valleys, and remote routes shape the overall experience."
];

const NEELKANTH_FAQS = [
  {
    question: "Where is Neelkanth located?",
    answer: "Neelkanth is located in Uttarakhand, in the Garhwal Himalayas, where high ridges and glacial valleys define the landscape."
  },
  {
    question: "What is the elevation of Neelkanth?",
    answer: "Neelkanth rises to 6,596 meters (21,640 feet) above sea level."
  },
  {
    question: "Why is it notable for trekkers?",
    answer: "It is notable for its dramatic Himalayan setting, alpine terrain, and the broad scenic views it offers from the surrounding high-altitude routes."
  },
  {
    question: "What kind of landscape surrounds the mountain?",
    answer: "The region features forests, river valleys, meadows, glacial terrain, and remote trekking approaches that add to its alpine character."
  },
  {
    question: "How should visitors plan a trip?",
    answer: "Visitors should prepare for cold weather, remote conditions, and changing mountain terrain by planning guide support, permits, and sufficient supplies."
  }
];

let map = null;
let currentGalleryIndex = 0;
let factIndex = 0;
let factIntervalId = null;
let lastFocusedElement = null;

function init() {
  initAccordion();
  initGallery();
  initFactsRotator();
  initMap();
  initLightbox();
}

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init);
}

if (window.appLifecycle) {
  window.appLifecycle.registerCleanup(() => {
    if (factIntervalId) {
      clearInterval(factIntervalId);
      factIntervalId = null;
    }
  });
}

function initAccordion() {
  const container = document.getElementById("neelkanth-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  NEELKANTH_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "neelkanth-faq-item";

    item.innerHTML = `
      <button class="neelkanth-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="neelkanth-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".neelkanth-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      container.querySelectorAll(".neelkanth-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".neelkanth-faq-question").setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });

    container.appendChild(item);
  });
}

function initGallery() {
  const grid = document.getElementById("neelkanth-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  NEELKANTH_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "neelkanth-gallery-item";
    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", `Open image: ${item.caption}`);
    figure.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <figcaption>${item.caption}</figcaption>
    `;

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

function initLightbox() {
  const lightbox = document.getElementById("neelkanth-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("neelkanth-lightbox-prev");
  const nextBtn = document.getElementById("neelkanth-lightbox-next");

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
  const lightbox = document.getElementById("neelkanth-lightbox");
  if (!lightbox) return;

  lastFocusedElement = document.activeElement;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    const closeBtn = document.querySelector(".neelkanth-lightbox-close");
    if (closeBtn) closeBtn.focus();
  }, 50);
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("neelkanth-lightbox");
  if (!lightbox) return;

  lightbox.hidden = true;
  document.body.style.overflow = "";
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function showGalleryImage(index) {
  const total = NEELKANTH_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = NEELKANTH_GALLERY[currentGalleryIndex];

  const img = document.getElementById("neelkanth-lightbox-image");
  const caption = document.getElementById("neelkanth-lightbox-caption");

  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

function initFactsRotator() {
  const factEl = document.getElementById("neelkanth-fact-text");
  const dotsWrap = document.getElementById("neelkanth-fact-dots");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    NEELKANTH_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "neelkanth-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = NEELKANTH_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % NEELKANTH_FACTS.length), 6000);
}

function initMap() {
  const mapContainer = document.getElementById("neelkanth-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try {
      map.remove();
    } catch (e) {
      console.warn("Failed to remove old map instance", e);
    }
    map = null;
  }

  map = L.map("neelkanth-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([30.11, 80.21], 9);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  NEELKANTH_LOCATIONS.forEach((loc) => {
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
