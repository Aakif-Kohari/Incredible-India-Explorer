/* ============================================================
   Kinnaur Kailash Mountain Explorer — kinnaur-kailash.js
   Handles: Leaflet map, auto-rotating facts, gallery lightbox,
   scroll reveal animations, and accessible FAQ accordion.
   ============================================================ */

const KINNAUR_KAILASH_LOCATIONS = [
  {
    name: "Kinnaur Kailash Summit (Shivalinga)",
    lat: 31.5000,
    lng: 78.3333,
    description: "The sacred summit at 6,050 m featuring the natural 79-ft monolithic Shivalinga rock formation."
  },
  {
    name: "Tangling Village (Base Camp)",
    lat: 31.5200,
    lng: 78.3000,
    description: "Traditional base village for the Kinnaur Kailash parikrama at approx. 3,500 m elevation."
  },
  {
    name: "Charang Village",
    lat: 31.5300,
    lng: 78.3500,
    description: "Ancient village on the parikrama route with a historic monastery and stunning valley views."
  },
  {
    name: "Lalanti Meadow",
    lat: 31.5100,
    lng: 78.3800,
    description: "High-altitude alpine meadow at ~4,800 m on the parikrama route, known for wildflowers."
  },
  {
    name: "Jorkanden Peak (6,473 m)",
    lat: 31.4800,
    lng: 78.3500,
    description: "Highest peak in the Kinnaur Kailash Range, visible from Kalpa and the parikrama route."
  },
  {
    name: "Raldang Peak (5,499 m)",
    lat: 31.5200,
    lng: 78.3800,
    description: "Neighboring sacred peak often visited during the Kailash parikrama circuit."
  },
  {
    name: "Kalpa Village",
    lat: 31.5333,
    lng: 78.2500,
    description: "Picturesque village at 2,960 m with panoramic views of the Kinner Kailash range and ancient temples."
  },
  {
    name: "Reckong Peo (District HQ)",
    lat: 31.5500,
    lng: 78.2667,
    description: "Administrative headquarters of Kinnaur district at 2,290 m, gateway to the Kailash region."
  },
  {
    name: "Sangla Valley (Baspa Valley)",
    lat: 31.4200,
    lng: 78.2700,
    description: "Scenic valley famous for apple orchards, Kamru Fort, and traditional Kinnauri architecture."
  },
  {
    name: "Narayan Nagini Temple, Kalpa",
    lat: 31.5350,
    lng: 78.2480,
    description: "Ancient temple complex dedicated to Lord Vishnu and Goddess Nagini with pagoda-style architecture."
  }
];

const KINNAUR_KAILASH_GALLERY = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Kinnaur_kailash%286050m%29_and_Jorkanden_%286473_m%29_from_Kalpa_photographed_By_Sumita_Roy.jpg/960px-Kinnaur_kailash%286050m%29_and_Jorkanden_%286473_m%29_from_Kalpa_photographed_By_Sumita_Roy.jpg",
    caption: "Kinnaur Kailash (6,050 m) and Jorkanden (6,473 m) as seen from Kalpa village."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Kinner_Kailash_Mountain_Range.jpg/960px-Kinner_Kailash_Mountain_Range.jpg",
    caption: "The Kinnaur Kailash Range with its sacred peaks towering above the Kinnaur valley."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Kinner_Kailash_Mountain_Range_%28edited%29.jpg/960px-Kinner_Kailash_Mountain_Range_%28edited%29.jpg",
    caption: "Kinner Kailash and Jorkanden at dawn, with Kalpa town in the foreground."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Kinner_kailash_and_jorkanden.jpg/960px-Kinner_kailash_and_jorkanden.jpg",
    caption: "Mount Kinner Kailash and Mount Jorkanden captured from the Kinnaur valley."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/960px-Kinnaur_Kailash.jpg",
    caption: "Mount Kinnaur Kailash rising majestically — the sacred abode of Lord Shiva."
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Morning_View_of_Mount_Kinner_Kailash.jpg/960px-Morning_View_of_Mount_Kinner_Kailash.jpg",
    caption: "Morning view of Mount Kinner Kailash glowing with the first rays of sunrise."
  }
];

const KINNAUR_KAILASH_FACTS = [
  "Kinnaur Kailash is one of the Panch Kailash — five sacred peaks associated with Lord Shiva in the Himalayas, alongside Mount Kailash (Tibet), Adi Kailash (Uttarakhand), Shrikhand Kailash (Himachal), and Manimahesh Kailash (Himachal).",
  "The mountain's most distinctive feature is a 79-foot (24-meter) tall natural monolithic rock pillar at its summit that resembles a Shivalinga. This swayambhu (self-manifested) formation is worshipped as Lord Shiva himself.",
  "The Shivalinga rock formation appears to change colors throughout the day: white at dawn, golden-yellow at noon, saffron/orange in the afternoon, and reddish at sunset — a phenomenon attributed to mineral composition and sunlight angles.",
  "The annual Kinnaur Kailash Yatra takes place in August during the Hindu month of Shravan. Thousands of pilgrims undertake the challenging 4-5 day parikrama (circumambulation) around the sacred peak.",
  "Despite its modest height of 6,050 m compared to 8,000 m peaks, Kinnaur Kailash has never been climbed to its summit out of deep respect for its sacred status. All expeditions stop at the base of the Shivalinga formation.",
  "The mountain lies in the Kinnaur district, a region with a unique blend of Hindu and Buddhist cultures. The local Kinnauri people follow both traditions, and the area is dotted with both temples and monasteries.",
  "The parikrama route crosses high-altitude terrain up to 5,200 m, passing through glacial streams, alpine meadows (like Lalanti), and ancient villages such as Charang with its 11th-century monastery.",
  "The Sutlej River, one of the five rivers of Punjab, originates near Mount Kailash in Tibet and flows through the Kinnaur valley, carving deep gorges before reaching the plains. The river valley forms a dramatic backdrop to the sacred peak."
];

const KINNAUR_KAILASH_FAQS = [
  {
    question: "Where is Kinnaur Kailash located?",
    answer: "Kinnaur Kailash is located in the Kinnaur district of Himachal Pradesh, India, near the Indo-Tibetan border. It stands at 6,050 m in the Kinnaur Kailash Range of the Himalayas."
  },
  {
    question: "Why is Kinnaur Kailash considered sacred?",
    answer: "Kinnaur Kailash is revered as one of the abodes of Lord Shiva. Its summit features a natural 79-foot monolithic rock formation resembling a Shivalinga that changes color through the day. It is one of the Panch Kailash (five sacred Kailash peaks) and attracts thousands of pilgrims annually."
  },
  {
    question: "Can you climb to the summit of Kinnaur Kailash?",
    answer: "No, summit climbing is strictly prohibited and has never been attempted out of respect for the mountain's sacred status. The peak is considered the dwelling place of Lord Shiva, and the natural Shivalinga formation at the summit is worshipped from a distance."
  },
  {
    question: "What is the Kinnaur Kailash Parikrama?",
    answer: "The Parikrama is a sacred circumambulation trek around the mountain, covering 40-50 km over 4-5 days. It passes through high-altitude terrain (up to 5,200 m), alpine meadows, glacial streams, and ancient villages like Charang. It is undertaken by pilgrims seeking spiritual merit."
  },
  {
    question: "When is the best time to visit Kinnaur Kailash?",
    answer: "The best season is June to September. June-July offers clear views and blooming meadows; August hosts the major annual Yatra; September has post-monsoon clarity. Winters (Nov-Apr) are extremely harsh with heavy snowfall closing access routes."
  },
  {
    question: "What permits are required for the Kinnaur Kailash trek?",
    answer: "Indian nationals from outside Himachal Pradesh need an Inner Line Permit (obtainable at Reckong Peo or Shimla). Foreign nationals require a Restricted Area Permit. A registered local guide is mandatory for the parikrama trek. Permits should be arranged 2-3 weeks in advance."
  },
  {
    question: "How do I reach Kinnaur Kailash?",
    answer: "Nearest airport: Shimla (235 km) or Chandigarh (320 km). Nearest railhead: Shimla (narrow gauge) or Chandigarh. From Shimla/Chandigarh, take NH5 to Reckong Peo (district HQ), then local transport to Tangling village (base for parikrama). The road journey takes 10-12 hours from Chandigarh."
  },
  {
    question: "What is the difficulty level of the Kinnaur Kailash Parikrama?",
    answer: "The parikrama is rated strenuous due to high altitude (max 5,200 m), steep ascents/descents, unpredictable weather, and basic camping conditions. It requires good physical fitness, prior high-altitude trekking experience, and proper acclimatization (2-3 days at Reckong Peo/Kalpa recommended)."
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
  initParticles();
  initHeroScroll();
  initHeroBg();
}

/* ---------- HERO REAL BACKGROUND LOADER ----------
   Only real Kinnaur Kailash photos are used. The first image that
   successfully loads becomes the hero background; if none load,
   a gradient is shown (never a random/unsplash image). */
function initHeroBg() {
  const el = document.getElementById("hero-bg");
  if (!el) return;

  const KINNAUR_KAILASH_REAL_IMAGES = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinnaur_Kailash.jpg/1920px-Kinnaur_Kailash.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Kinner_kailash_and_jorkanden.jpg/1920px-Kinner_kailash_and_jorkanden.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Kinner_Kailash_Mountain_Range.jpg/1920px-Kinner_Kailash_Mountain_Range.jpg"
  ];

  let settled = false;
  let idx = 0;

  function tryNext() {
    if (settled || idx >= KINNAUR_KAILASH_REAL_IMAGES.length) {
      if (!settled) {
        el.style.background =
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)";
      }
      return;
    }
    const url = KINNAUR_KAILASH_REAL_IMAGES[idx];
    idx += 1;
    const img = new Image();
    img.onload = () => {
      settled = true;
      el.style.backgroundImage =
        "linear-gradient(180deg, rgba(8,15,26,0.35) 0%, rgba(8,15,26,0.5) 50%, rgba(8,15,26,0.75) 100%), url(\"" + url + "\")";
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
    };
    img.onerror = tryNext;
    img.src = url;
  }

  tryNext();
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

/* ---------- SCROLL REVEAL ANIMATIONS ---------- */
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

/* ---------- PARALLAX HERO ---------- */
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

/* ---------- HERO PARTICLES ---------- */
function initParticles() {
  const wrap = document.getElementById("hero-particles");
  if (!wrap) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const count = window.innerWidth < 600 ? 18 : 36;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "kk-particle";
    const size = 2 + Math.random() * 5;
    const duration = 9 + Math.random() * 14;
    const left = Math.random() * 100;
    const delay = Math.random() * duration;
    const opacity = 0.3 + Math.random() * 0.5;
    const drift = (Math.random() * 120 - 60) + "px";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = left + "%";
    p.style.animationDuration = duration + "s";
    p.style.animationDelay = delay + "s";
    p.style.setProperty("--p-opacity", opacity.toFixed(2));
    p.style.setProperty("--p-drift", drift);
    wrap.appendChild(p);
  }
}

/* ---------- HERO SCROLL CTA ---------- */
function initHeroScroll() {
  const btn = document.querySelector(".kinnaur-kailash-hero-scroll");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const next = document.querySelector("#kinnaur-kailash-religious") ||
                 document.querySelector(".kinnaur-kailash-section");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------- FAQ ACCORDION ---------- */
function initAccordion() {
  const container = document.getElementById("kinnaur-kailash-faq-accordion");
  if (!container) return;

  container.innerHTML = "";
  KINNAUR_KAILASH_FAQS.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "kinnaur-kailash-faq-item reveal";
    item.style.transitionDelay = (index * 0.05) + "s";

    item.innerHTML = `
      <button class="kinnaur-kailash-faq-question" id="faq-q-${index}" aria-expanded="false" aria-controls="faq-a-${index}">
        ${faq.question}
      </button>
      <div class="kinnaur-kailash-faq-answer" id="faq-a-${index}" role="region" aria-labelledby="faq-q-${index}">
        <p>${faq.answer}</p>
      </div>
    `;

    const button = item.querySelector(".kinnaur-kailash-faq-question");
    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      container.querySelectorAll(".kinnaur-kailash-faq-item").forEach((otherItem) => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".kinnaur-kailash-faq-question").setAttribute("aria-expanded", "false");
      });
      if (!isActive) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });

    container.appendChild(item);
  });
}

/* ---------- GALLERY GRID ---------- */
function initGallery() {
  const grid = document.getElementById("kinnaur-kailash-gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";
  KINNAUR_KAILASH_GALLERY.forEach((item, index) => {
    const figure = document.createElement("figure");
    figure.className = "kinnaur-kailash-gallery-item reveal";
    figure.style.transitionDelay = (index * 0.08) + "s";
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

/* ---------- LIGHTBOX ---------- */
function initLightbox() {
  const lightbox = document.getElementById("kinnaur-kailash-lightbox");
  if (!lightbox) return;

  document.querySelectorAll("[data-close-lightbox]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  const prevBtn = document.getElementById("kinnaur-kailash-lightbox-prev");
  const nextBtn = document.getElementById("kinnaur-kailash-lightbox-next");

  if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showGalleryImage(currentGalleryIndex - 1); });
  if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showGalleryImage(currentGalleryIndex + 1); });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showGalleryImage(currentGalleryIndex + 1);
    if (e.key === "ArrowLeft") showGalleryImage(currentGalleryIndex - 1);
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("kinnaur-kailash-lightbox");
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showGalleryImage(index);
}

function closeLightbox() {
  const lightbox = document.getElementById("kinnaur-kailash-lightbox");
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function showGalleryImage(index) {
  const total = KINNAUR_KAILASH_GALLERY.length;
  currentGalleryIndex = (index + total) % total;
  const item = KINNAUR_KAILASH_GALLERY[currentGalleryIndex];

  const img = document.getElementById("kinnaur-kailash-lightbox-image");
  const caption = document.getElementById("kinnaur-kailash-lightbox-caption");

  if (img) {
    img.style.opacity = "0";
    img.src = item.src;
    img.alt = item.caption;
    img.onload = () => { img.style.opacity = "1"; };
  }
  if (caption) caption.textContent = item.caption;
}

/* ---------- FACTS ROTATOR ---------- */
function initFactsRotator() {
  const factEl = document.getElementById("kinnaur-kailash-fact-text");
  const dotsWrap = document.getElementById("kinnaur-kailash-fact-dots");
  const counterEl = document.getElementById("kinnaur-kailash-fact-counter");
  const prevBtn = document.getElementById("kinnaur-kailash-fact-prev");
  const nextBtn = document.getElementById("kinnaur-kailash-fact-next");
  if (!factEl) return;

  if (dotsWrap) dotsWrap.innerHTML = "";
  if (factIntervalId) clearInterval(factIntervalId);

  if (dotsWrap) {
    KINNAUR_KAILASH_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "kinnaur-kailash-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => { showFact(i); resetInterval(); });
      dotsWrap.appendChild(dot);
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { showFact((factIndex - 1 + KINNAUR_KAILASH_FACTS.length) % KINNAUR_KAILASH_FACTS.length); resetInterval(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { showFact((factIndex + 1) % KINNAUR_KAILASH_FACTS.length); resetInterval(); });

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    factEl.style.transform = "translateY(8px)";
    setTimeout(() => {
      factEl.textContent = KINNAUR_KAILASH_FACTS[factIndex];
      factEl.style.opacity = "1";
      factEl.style.transform = "translateY(0)";
    }, 250);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
    if (counterEl) {
      counterEl.textContent = (factIndex + 1) + " / " + KINNAUR_KAILASH_FACTS.length;
    }
  }

  function resetInterval() {
    if (factIntervalId) clearInterval(factIntervalId);
    factIntervalId = setInterval(() => showFact((factIndex + 1) % KINNAUR_KAILASH_FACTS.length), 6000);
  }

  showFact(0);
  factIntervalId = setInterval(() => showFact((factIndex + 1) % KINNAUR_KAILASH_FACTS.length), 6000);
}

/* ---------- LEAFLET MAP ---------- */
function initMap() {
  const mapContainer = document.getElementById("kinnaur-kailash-map");
  if (!mapContainer || typeof L === "undefined") return;

  if (map !== null) {
    try { map.remove(); } catch (e) { /* ignore */ }
    map = null;
  }

  map = L.map("kinnaur-kailash-map", {
    scrollWheelZoom: false,
    minZoom: 6,
  }).setView([31.5000, 78.3333], 11);

  // Esri World Imagery - Satellite tiles
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 18,
  }).addTo(map);

  // Add labels layer on top
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png", {
    attribution: "",
    maxZoom: 18,
    pane: "overlayPane",
  }).addTo(map);

  KINNAUR_KAILASH_LOCATIONS.forEach((loc) => {
    const isSummit = loc.name.includes("Summit") || loc.name.includes("Shivalinga");
    const marker = L.circleMarker([loc.lat, loc.lng], {
      radius: isSummit ? 10 : 7,
      color: isSummit ? "#ff9933" : "#0284c7",
      fillColor: isSummit ? "#ffb01f" : "#38bdf8",
      fillOpacity: 0.9,
      weight: 2,
    }).addTo(map);

    marker.bindTooltip(`<strong>${loc.name}</strong><br><small>${loc.description}</small>`, {
      direction: "top",
      offset: [0, -10],
      opacity: 1,
      className: "kinnaur-kailash-map-tooltip",
    });

    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`);
  });
}