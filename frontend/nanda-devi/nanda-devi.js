const NANDA_DEVI_LOCATIONS = [
  {
    name: "Nanda Devi Summit",
    lat: 30.3753,
    lng: 79.8670,
    description: "The main summit at 7,816 m, the highest peak located entirely within India."
  },
  {
    name: "Nanda Devi East",
    lat: 30.3653,
    lng: 79.8870,
    description: "The eastern twin peak at 7,434 m, first climbed in 1939 by a Swiss expedition."
  },
  {
    name: "Nanda Devi Inner Sanctuary",
    lat: 30.3800,
    lng: 79.8500,
    description: "A natural amphitheater surrounded by a 7,000 m ring of peaks, once considered unclimbable."
  },
  {
    name: "Rishi Gorge",
    lat: 30.3950,
    lng: 79.8300,
    description: "The dramatic gorge carved by the Rishi Ganga River, the only entry into the inner sanctuary."
  },
  {
    name: "Lata Village",
    lat: 30.4100,
    lng: 79.7900,
    description: "A traditional Kumaoni village and starting point for treks at 2,100 m."
  },
  {
    name: "Tapovan",
    lat: 30.4300,
    lng: 79.7600,
    description: "An alpine meadow at 4,400 m known for hot springs and stunning mountain views."
  },
  {
    name: "Joshimath",
    lat: 30.5563,
    lng: 79.5640,
    description: "A historic town at 1,890 m and gateway to Badrinath, base for Nanda Devi expeditions."
  }
];

const NANDA_DEVI_GALLERY = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/df/Nanda_devi.jpg",
    caption: "Nanda Devi (7,816 m) — India's highest peak entirely within its borders and the 23rd highest in the world."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Nanda_devi.jpg/1280px-Nanda_devi.jpg",
    caption: "The majestic Nanda Devi summit pyramid as seen from the surrounding Garhwal Himalayas."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nanda_Devi_Biosphere_Reserve_-_Chamoli.jpg",
    caption: "Nanda Devi Biosphere Reserve near Trishul peak, on the way to Roopkund, Chamoli district."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/17/Reflection_of_Nanda_Devi_Hills_on_Hemkund_Sahib_Lake_Chamoli%2C_India.jpg",
    caption: "Reflection of Nanda Devi Hills on Hemkund Sahib Lake, Chamoli — a sacred alpine lake at 4,300 m."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Rishi_Ganga_gorge_-_Shipton-Tilman_team_climbing_buttress.jpg",
    caption: "Shipton-Tilman 1934 Nanda Devi Sanctuary expedition — hauling loads in the Rishi Ganga gorge."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Dhauliganga_and_Rishiganga_Valleys.jpg",
    caption: "The Dhauliganga and Rishiganga river valleys in the Garhwal Himalayas, Uttarakhand."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/de/Garhwal_Himalayas_Uttarakhand_India.jpg",
    caption: "Panoramic view of the Garhwal Himalayas in Uttarakhand — home to Nanda Devi and surrounding peaks."
  }
];

const NANDA_DEVI_FACTS = [
  "Nanda Devi means 'Bliss-Giving Goddess' in Sanskrit. The mountain is revered as the embodiment of Goddess Parvati, consort of Lord Shiva, and is sacred to the people of Kumaon and Garhwal.",
  "The inner sanctuary of Nanda Devi was considered unclimbable for decades because it is surrounded by a nearly impenetrable ring of peaks exceeding 7,000 meters, with only one narrow entry through the Rishi Gorge.",
  "In 1936, Eric Shipton and H.W. Tilman became the first to reach the summit, making Nanda Devi the highest peak climbed at that time (above 7,620 m).",
  "The 1939 German expedition led by Karl Wien vanished in the inner sanctuary. Their remains and equipment were not found until 1959, 20 years later, when glacial recession revealed the wreckage.",
  "Nanda Devi and its surrounding Valley of Flowers were jointly designated a UNESCO World Heritage Site in 1988, recognizing their outstanding natural beauty and biodiversity.",
  "The Nanda Devi Biosphere Reserve spans 6,407 sq km and is home to over 800 plant species, 114 bird species, and rare mammals including snow leopards, Himalayan tahr, and Asiatic black bears.",
  "The 2013 Kedarnath disaster and 2021 Chamoli flood significantly impacted the region, destroying the Rishi Ganga National Park but also revealing the fragility of this mountain ecosystem."
];

const NANDA_DEVI_FAQS = [
  {
    question: "Where is Nanda Devi located?",
    answer: "Nanda Devi is located in the Garhwal Himalayas of Uttarakhand, India, spanning the Chamoli and Pithoragarh districts. It stands at 7,816 meters above sea level."
  },
  {
    question: "How tall is Nanda Devi?",
    answer: "Nanda Devi stands at an elevation of 7,816 meters (25,643 feet), making it the second-highest mountain in India and the 23rd highest in the world."
  },
  {
    question: "Is Nanda Devi higher than Kanchenjunga?",
    answer: "No, Nanda Devi (7,816 m) is lower than Kanchenjunga (8,586 m). Nanda Devi is India's second-highest peak, while Kanchenjunga is the highest."
  },
  {
    question: "What is the Nanda Devi Inner Sanctuary?",
    answer: "The Inner Sanctuary is a natural amphitheater surrounded by a ring of peaks exceeding 7,000 meters, with only one narrow entry through the Rishi Gorge. It was once considered the most formidable mountain fortress in the Himalayas."
  },
  {
    question: "When is the best time to trek near Nanda Devi?",
    answer: "The best seasons are pre-monsoon (May to June) when alpine wildflowers are in bloom, and post-monsoon (September to October) when skies are clear and views are at their best."
  },
  {
    question: "Do I need a permit to trek in the Nanda Devi area?",
    answer: "Yes, special permits are required for trekking in the Nanda Devi Biosphere Reserve. The inner sanctuary requires a Forest Department permit, and trekkers must travel with a registered guide."
  },
  {
    question: "Is Nanda Devi a UNESCO World Heritage Site?",
    answer: "Yes, Nanda Devi and the Valley of Flowers were jointly designated a UNESCO World Heritage Site in 1988, recognized for outstanding natural beauty and exceptional biodiversity."
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
  initScrollReveal();
  initParallax();
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

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initParallax() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < 800) {
          hero.style.setProperty("--parallax-y", scrollY * 0.35 + "px");
          hero.style.setProperty("--parallax-opacity", 1 - scrollY / 700);
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initAccordion() {
  const container = document.getElementById("nanda-devi-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  NANDA_DEVI_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "nanda-devi-faq-item reveal";
    item.style.transitionDelay = (index * 0.05) + "s";

    item.innerHTML = `
      <button class="nanda-devi-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="nanda-devi-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".nanda-devi-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      container.querySelectorAll(".nanda-devi-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".nanda-devi-faq-question").setAttribute("aria-expanded", "false");
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
  const grid = document.getElementById("nanda-devi-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  NANDA_DEVI_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "nanda-devi-gallery-item reveal";
    figure.style.transitionDelay = (index * 0.08) + "s";
    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", "Open image: " + item.caption);
    figure.innerHTML =
      '<img src="' + item.src + '" alt="' + item.caption + '" loading="lazy">' +
      '<figcaption>' + item.caption + '</figcaption>';

    figure.addEventListener("click", function() { openLightbox(index); });
    figure.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });

    grid.appendChild(figure);
  });
}

function initLightbox() {
  const lightbox = document.getElementById("nanda-devi-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach(function(el) {
    el.addEventListener("click", closeLightbox);
  });

  lightbox.addEventListener("click", function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  var prevBtn = document.getElementById("nanda-devi-lightbox-prev");
  var nextBtn = document.getElementById("nanda-devi-lightbox-next");

  if (prevBtn) prevBtn.addEventListener("click", function(e) { e.stopPropagation(); showGalleryImage(currentGalleryIndex - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function(e) { e.stopPropagation(); showGalleryImage(currentGalleryIndex + 1); });

  document.addEventListener("keydown", function(e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  var lightbox = document.getElementById("nanda-devi-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  var lightbox = document.getElementById("nanda-devi-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  var total = NANDA_DEVI_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  var item = NANDA_DEVI_GALLERY[currentGalleryIndex];

  var img = document.getElementById("nanda-devi-lightbox-image");
  var caption = document.getElementById("nanda-devi-lightbox-caption");

  if (img) {
    img.style.opacity = "0";
    img.src = item.src;
    img.alt = item.caption;
    img.onload = function() { img.style.opacity = "1"; };
  }
  if (caption) caption.textContent = item.caption;
}

function initFactsRotator() {
  var factEl = document.getElementById("nanda-devi-fact-text");
  var dotsWrap = document.getElementById("nanda-devi-fact-dots");
  var counterEl = document.getElementById("nanda-devi-fact-counter");
  var prevBtn = document.getElementById("nanda-devi-fact-prev");
  var nextBtn = document.getElementById("nanda-devi-fact-next");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    NANDA_DEVI_FACTS.forEach(function(_, i) {
      var dot = document.createElement("button");
      dot.className = "nanda-devi-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", function() { showFact(i); resetInterval(); });
      dotsWrap.appendChild(dot);
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", function() { showFact((factIndex - 1 + NANDA_DEVI_FACTS.length) % NANDA_DEVI_FACTS.length); resetInterval(); });
  if (nextBtn) nextBtn.addEventListener("click", function() { showFact((factIndex + 1) % NANDA_DEVI_FACTS.length); resetInterval(); });

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    factEl.style.transform = "translateY(8px)";
    setTimeout(function() {
      factEl.textContent = NANDA_DEVI_FACTS[factIndex];
      factEl.style.opacity = "1";
      factEl.style.transform = "translateY(0)";
    }, 250);
    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach(function(dot, di) { dot.classList.toggle("active", di === factIndex); });
    }
    if (counterEl) {
      counterEl.textContent = (factIndex + 1) + " / " + NANDA_DEVI_FACTS.length;
    }
  }

  function resetInterval() {
    if (factIntervalId) clearInterval(factIntervalId);
    factIntervalId = setInterval(function() { showFact((factIndex + 1) % NANDA_DEVI_FACTS.length); }, 6000);
  }

  showFact(0);
  factIntervalId = setInterval(function() { showFact((factIndex + 1) % NANDA_DEVI_FACTS.length); }, 6000);
}

function initMap() {
  var mapContainer = document.getElementById("nanda-devi-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try { map.remove(); } catch (e) { /* ignore */ }
    map = null;
  }

  map = L.map("nanda-devi-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([30.3753, 79.8670], 11);

  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 18,
  }).addTo(map);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png", {
    attribution: "",
    maxZoom: 18,
    pane: "overlayPane",
  }).addTo(map);

  NANDA_DEVI_LOCATIONS.forEach(function(loc) {
    var isSummit = loc.name.includes("Summit");
    var marker = L.circleMarker([loc.lat, loc.lng], {
      radius: isSummit ? 10 : 7,
      color: isSummit ? "#ff9933" : "#0284c7",
      fillColor: isSummit ? "#ffb01f" : "#38bdf8",
      fillOpacity: 0.9,
      weight: 2,
    }).addTo(map);

    marker.bindTooltip("<strong>" + loc.name + "</strong><br><small>" + loc.description + "</small>", {
      direction: "top",
      offset: [0, -10],
      opacity: 1,
      className: "nanda-devi-map-tooltip",
    });

    marker.bindPopup("<strong>" + loc.name + "</strong><br>" + loc.description);
  });
}
