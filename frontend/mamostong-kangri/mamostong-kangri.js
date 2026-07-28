/* ============================================================
   Mamostong Kangri Mountain Explorer — mamostong-kangri.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   and accessible FAQ accordion.
   ============================================================ */

// ---------- 1. MAP LOCATIONS ----------
const MAMOSTONG_LOCATIONS = [
  {
    name: "Mamostong Kangri Summit",
    lat: 35.6833,
    lng: 77.0667,
    description: "The main summit of Mamostong Kangri, standing at 7,516 metres. A remote and challenging peak in the eastern Karakoram range of Ladakh."
  },
  {
    name: "Siachen Glacier",
    lat: 35.5833,
    lng: 77.1000,
    description: "The world's longest non-polar glacier at 76 km, flowing south from the Indira Col. A strategically vital and extreme high-altitude zone."
  },
  {
    name: "Saser Kangri",
    lat: 35.5500,
    lng: 77.2167,
    description: "A massif of six peaks in the eastern Karakoram. Saser Kangri I (7,672 m) is the highest peak entirely within Indian-administered Ladakh."
  },
  {
    name: "Nubra Valley",
    lat: 34.7500,
    lng: 77.6000,
    description: "A high-altitude cold desert valley at the confluence of the Shyok and Nubra rivers, known for Bactrian camels and ancient Buddhist monasteries."
  },
  {
    name: "Khardung La",
    lat: 35.0333,
    lng: 77.6500,
    description: "One of the world's highest motorable passes at 5,359 m, serving as the gateway from Leh to the Nubra Valley and Siachen region."
  }
];

// ---------- 2. IMAGE GALLERY ----------
const MAMOSTONG_GALLERY = [
  { src: "../../assets/travel_mountains.png", caption: "The glaciated flanks of Mamostong Kangri rising in the eastern Karakoram range of Ladakh." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Panoramic Himalayan vistas characteristic of the Ladakh and Karakoram region." },
  { src: "../../assets/Kedarnath.png", caption: "Dramatic mountain terrain and glacial valleys of the Siachen region." },
  { src: "../../assets/Manalileh.png", caption: "High-altitude Karakoram landscape on the approach to the Siachen area." }
];

// ---------- 3. DID YOU KNOW FACTS ----------
const MAMOSTONG_FACTS = [
  "Mamostong Kangri at 7,516 m is one of the highest peaks in the eastern Karakoram and among the tallest mountains entirely within Indian-administered territory.",
  "The peak lies near the Siachen Glacier — the world's longest non-polar glacier at 76 km — often called the 'Third Pole' for its massive ice reserves.",
  "The first recorded ascent was achieved in 1981 by an Indo-Japanese expedition, a landmark achievement in Indian high-altitude mountaineering.",
  "Due to its location in the Siachen conflict zone, special military and government permits are required to mount any expedition to Mamostong Kangri.",
  "The peak's glaciated flanks feed tributaries of the Nubra and Shyok rivers, which ultimately join the Indus — the lifeline of Ladakh.",
  "Mamostong Kangri sees far fewer climbing attempts than other 7,000-metre peaks due to its extreme remoteness and the logistical challenges of operating near the world's highest battlefield."
];

// ---------- 4. FAQ ACCORDION DATA ----------
const MAMOSTONG_FAQS = [
  {
    question: "Where is Mamostong Kangri located?",
    answer: "Mamostong Kangri is located in the eastern Karakoram range in the Leh district of Ladakh, India. It stands near the Siachen Glacier and the Nubra Valley, in one of the most remote and geopolitically sensitive regions of the Indian Himalaya."
  },
  {
    question: "What is the elevation of Mamostong Kangri?",
    answer: "Mamostong Kangri stands at 7,516 metres (24,659 feet) above sea level, making it one of the highest peaks in the Karakoram range and among the tallest mountains entirely within Indian-administered territory."
  },
  {
    question: "When was Mamostong Kangri first climbed?",
    answer: "The first recorded ascent was made in 1981 by a joint Indo-Japanese expedition, marking a significant milestone in Indian mountaineering history."
  },
  {
    question: "What permits are required to climb Mamostong Kangri?",
    answer: "Due to its proximity to the Siachen conflict zone, climbers need special permits from the Indian Ministry of Defence, the Ladakh administration, and an NOC from the Indian Army. All logistics must be arranged through approved Ladakhi expedition operators."
  },
  {
    question: "What is the best time to attempt Mamostong Kangri?",
    answer: "The optimal climbing window is June to August, when the Karakoram receives relatively less precipitation and temperatures are marginally less extreme. The peak is virtually inaccessible during winter due to temperatures dropping below -40°C and extreme wind conditions."
  }
];

// ---------- 5. STATE ----------
let map = null;
let currentGalleryIndex = 0;
let factIndex = 0;
let factIntervalId = null;
let lightboxKeydownHandler = null;

// ---------- 6. INITIALIZATION ----------
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

    if (lightboxKeydownHandler) {
      document.removeEventListener("keydown", lightboxKeydownHandler);
      lightboxKeydownHandler = null;
    }

    if (map) {
      map.remove();
      map = null;
    }
  });
}

// ---------- 7. FAQ ACCORDION ----------
function initAccordion() {
  const container = document.getElementById("mamostong-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  MAMOSTONG_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "mamostong-faq-item";

    item.innerHTML = `
      <button class="mamostong-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="mamostong-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".mamostong-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      container.querySelectorAll(".mamostong-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".mamostong-faq-question").setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });

    container.appendChild(item);
  });
}

// ---------- 8. GALLERY GRID ----------
function initGallery() {
  const grid = document.getElementById("mamostong-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  MAMOSTONG_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "mamostong-gallery-item";
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

// ---------- 9. LIGHTBOX ----------
function initLightbox() {
  const lightbox = document.getElementById("mamostong-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("mamostong-lightbox-prev");
  const nextBtn = document.getElementById("mamostong-lightbox-next");

  if (prevBtn) prevBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  lightboxKeydownHandler = (e) => {
    if (lightbox.hidden) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  };

  document.addEventListener("keydown", lightboxKeydownHandler);
}

function openLightbox(index) {
  const lightbox = document.getElementById("mamostong-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("mamostong-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = MAMOSTONG_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = MAMOSTONG_GALLERY[currentGalleryIndex];

  const img = document.getElementById("mamostong-lightbox-image");
  const caption = document.getElementById("mamostong-lightbox-caption");

  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

// ---------- 10. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("mamostong-fact-text");
  const dotsWrap = document.getElementById("mamostong-fact-dots");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    MAMOSTONG_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "mamostong-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = MAMOSTONG_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % MAMOSTONG_FACTS.length), 6000);
}

// ---------- 11. LEAFLET MAP ----------
function initMap() {
  const mapContainer = document.getElementById("mamostong-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try {
      map.remove();
    } catch (e) {
      console.warn("Failed to remove old map instance", e);
    }
    map = null;
  }

  // Center on Mamostong Kangri coordinates (35.6833° N, 77.0667° E)
  map = L.map("mamostong-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([35.6833, 77.0667], 10);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  MAMOSTONG_LOCATIONS.forEach((loc) => {
    const isPeak = loc.name.includes("Summit");
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
