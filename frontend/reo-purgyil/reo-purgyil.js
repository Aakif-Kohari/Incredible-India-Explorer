const REO_PURGYIL_LOCATIONS = [
  {
    name: "Reo Purgyil Peak",
    lat: 31.884,
    lng: 78.7314,
    description: "The highest peak in Himachal Pradesh, standing at 6,816 meters. Also known as Leo Pargial on older maps."
  },
  {
    name: "Leo Pargial Twin Peak",
    lat: 31.902,
    lng: 78.73,
    description: "The 6,791 m northern twin of Reo Purgyil, together forming the twin-peak massif of the southern Zanskar Range."
  },
  {
    name: "Nako Village",
    lat: 31.8839,
    lng: 78.6239,
    description: "A high-altitude village in Kinnaur at 3,620 m, the primary gateway to the Reo Purgyil massif and home to ancient gompas."
  },
  {
    name: "Spiti River Valley",
    lat: 31.976,
    lng: 78.606,
    description: "The Spiti River drains the northern face of the massif, carving one of the deepest valleys in the Himalaya."
  },
  {
    name: "Shipki La",
    lat: 31.8333,
    lng: 78.7447,
    description: "A historic high pass on the India–Tibet border to the south of Reo Purgyil, once part of the old Sutlej trade route."
  }
];

const REO_PURGYIL_GALLERY = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Peaks_of_Mt_Leo_Purgyil_and_Reo_Purgyil.jpg/960px-Peaks_of_Mt_Leo_Purgyil_and_Reo_Purgyil.jpg", caption: "The twin peaks of the Reo Purgyil massif towering over the Zanskar Range." },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/LeoPargial.jpg/960px-LeoPargial.jpg", caption: "Reo Purgyil as seen across the dramatic valleys of Kinnaur." },
  { src: "../../assets/travel_mountains.png", caption: "The Himalayan crest above the Sutlej gorges near the massif." },
  { src: "../../assets/Hemis_Monastery.png", caption: "Ancient monasteries and high-altitude villages dotting the Kinnaur region." },
  { src: "../../assets/Shimlakaza.png", caption: "Sunrise over the Zanskar Range from the eastern ridgelines." },
  { src: "../../assets/Manalileh.png", caption: "Scenic high passes and valleys surrounding the Reo Purgyil massif." }
];

const REO_PURGYIL_FACTS = [
  "Reo Purgyil (6,816 m) is the highest mountain peak in the entire state of Himachal Pradesh.",
  "Its name means 'the mountain that guards', and the local people have long venerated this dome-shaped peak.",
  "The mountain is often cloaked in swirling clouds, earning it a mysterious, shrouded reputation among mountaineers.",
  "The first official ascent was made in 1971 by a team of the Indo-Tibetan Border Police (ITBP).",
  "Reo Purgyil forms a striking twin-peak massif with its neighbour Leo Pargial (6,791 m), a name born from a colonial-era mix-up of 'Reo' and the nearby village of Leo.",
  "The Spiti River, a right-bank tributary of the Sutlej, drains the northern face of the massif.",
  "Geologically, the peak is a dome structure that rises directly from the banks of the Sutlej River on the India–Tibet border."
];

const REO_PURGYIL_FAQS = [
  {
    question: "Where is Reo Purgyil located?",
    answer: "Reo Purgyil is located at the southern end of the Zanskar Range in the Western Himalaya, in the Kinnaur district of Himachal Pradesh, India, on the border with the Tibet region of China."
  },
  {
    question: "Why is it also called Leo Pargial?",
    answer: "Leo Pargial is a corruption of 'Reo Purgyil' that arose when early surveyors mistook 'Reo' for the nearby village of Leo. The name is now used for the 6,791 m northern twin of the massif."
  },
  {
    question: "What is the elevation of Reo Purgyil?",
    answer: "Reo Purgyil stands at 6,816 meters (22,362 feet) above sea level, making it the highest peak in Himachal Pradesh."
  },
  {
    question: "What is the historical significance of Reo Purgyil?",
    answer: "The first official ascent was achieved in 1971 by the Indo-Tibetan Border Police. The second ascent followed in 1991 by an Indian team led by E. Theophilus."
  },
  {
    question: "How can trekkers experience Reo Purgyil?",
    answer: "The region around Reo Purgyil can be experienced via high-altitude treks in Kinnaur around Nako and the Spiti valley. Climbing the peak itself is an expedition-grade undertaking requiring special permits."
  }
];

let map = null;
let currentGalleryIndex = 0;
let factIndex = 0;
let factIntervalId = null;

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
  const container = document.getElementById("reo-purgyil-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  REO_PURGYIL_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "reo-purgyil-faq-item";
    
    item.innerHTML = `
      <button class="reo-purgyil-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="reo-purgyil-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".reo-purgyil-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      container.querySelectorAll(".reo-purgyil-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".reo-purgyil-faq-question").setAttribute("aria-expanded", "false");
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
  const grid = document.getElementById("reo-purgyil-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  REO_PURGYIL_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "reo-purgyil-gallery-item";
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
  const lightbox = document.getElementById("reo-purgyil-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  const prevBtn = document.getElementById("reo-purgyil-lightbox-prev");
  const nextBtn = document.getElementById("reo-purgyil-lightbox-next");

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
  const lightbox = document.getElementById("reo-purgyil-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("reo-purgyil-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = REO_PURGYIL_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = REO_PURGYIL_GALLERY[currentGalleryIndex];
  
  const img = document.getElementById("reo-purgyil-lightbox-image");
  const caption = document.getElementById("reo-purgyil-lightbox-caption");
  
  if (img) img.src = item.src;
  if (img) img.alt = item.caption;
  if (caption) caption.textContent = item.caption;
}

function initFactsRotator() {
  const factEl = document.getElementById("reo-purgyil-fact-text");
  const dotsWrap = document.getElementById("reo-purgyil-fact-dots");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    REO_PURGYIL_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "reo-purgyil-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = REO_PURGYIL_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % REO_PURGYIL_FACTS.length), 6000);
}

function initMap() {
  const mapContainer = document.getElementById("reo-purgyil-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try {
      map.remove();
    } catch (e) {
      console.warn("Failed to remove old map instance", e);
    }
    map = null;
  }

  map = L.map("reo-purgyil-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([31.884, 78.73], 10);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    maxZoom: 18,
  }).addTo(map);

  REO_PURGYIL_LOCATIONS.forEach((loc) => {
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
