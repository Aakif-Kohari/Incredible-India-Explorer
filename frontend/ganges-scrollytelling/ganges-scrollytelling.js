/**
 * ganges-scrollytelling.js
 * Scrollytelling: Journey of the Ganges
 *
 * Source-to-sea guided narrative dataset, scroll position tracker,
 * animated SVG river path line drawing, elevation & distance gauge calculators.
 */

export const GANGES_STOPS = [
  {
    id: "stop-1",
    stopNumber: 1,
    name: "Gangotri Glacier & Gaumukh",
    location: "Uttarkashi District, Uttarakhand",
    elevation: "4,100 m (13,450 ft)",
    elevationMeters: 4100,
    distanceKm: 0,
    coordinates: "30.92° N, 78.93° E",
    tag: "Glacial Origin & Alpine Source",
    summary: "The river originates as the Bhagirathi at Gaumukh ('Mouth of the Cow'), the terminus of the Gangotri Glacier in the Garhwal Himalayas.",
    details: "Emerging from the high Garhwal Himalayas at an altitude of 4,100 meters, the Bhagirathi River rushes through steep mountain gorges. At Devprayag, it merges with the Alaknanda River—which originates from the Satopanth Glacier—and from this confluence onward, the river is officially named the Ganges (Ganga).",
    culturalNote: "Gaumukh and Gangotri are historic pilgrimage destinations, celebrating the alpine birth of India's sacred river.",
    svgPoint: { x: 90, y: 50 }
  },
  {
    id: "stop-2",
    stopNumber: 2,
    name: "Haridwar & Rishikesh",
    location: "Haridwar & Dehradun, Uttarakhand",
    elevation: "314 m (1,030 ft)",
    elevationMeters: 314,
    distanceKm: 290,
    coordinates: "29.94° N, 78.16° E",
    tag: "Descent to Northern Plains",
    summary: "Flowing past Rishikesh, the Ganges emerges from the Himalayan foothills onto the flat plains at Haridwar.",
    details: "After descending through the wooded hills of Rishikesh—celebrated for yoga tradition and suspension bridges like Lakshman Jhula—the Ganges enters the vast Indo-Gangetic Plains at Haridwar ('Gateway to the Gods'). Here, the river transitions from a rushing mountain torrent into a wide, serene river, supplying the Upper Ganges Canal constructed in the 1850s.",
    culturalNote: "Haridwar's Har Ki Pauri ghat is renowned for the evening Ganga Aarti, where floating oil lamps light up the river currents at dusk.",
    svgPoint: { x: 130, y: 130 }
  },
  {
    id: "stop-3",
    stopNumber: 3,
    name: "Prayagraj (Triveni Sangam)",
    location: "Prayagraj District, Uttar Pradesh",
    elevation: "98 m (321 ft)",
    elevationMeters: 98,
    distanceKm: 780,
    coordinates: "25.43° N, 81.84° E",
    tag: "Sacred Confluence & Yamuna Merge",
    summary: "The historic confluence of the pale green Ganges and deep blue Yamuna rivers.",
    details: "Prayagraj marks the Triveni Sangam, where the Ganges merges with its largest tributary, the Yamuna River (originating from Yamunotri and flowing past Delhi and Agra). The distinct color boundary between the two rivers is visible at the confluence point. The combined river carries immense volume eastward across the alluvial plains.",
    culturalNote: "The Sangam is the primary venue for the Kumbh Mela, recognized by UNESCO as Intangible Cultural Heritage, attracting millions of peaceful gathering participants.",
    svgPoint: { x: 250, y: 260 }
  },
  {
    id: "stop-4",
    stopNumber: 4,
    name: "Varanasi (Kashi)",
    location: "Varanasi District, Uttar Pradesh",
    elevation: "81 m (265 ft)",
    elevationMeters: 81,
    distanceKm: 990,
    coordinates: "25.31° N, 83.01° E",
    tag: "Cultural & Spiritual Heartland",
    summary: "One of the world's oldest continuously inhabited cities, stretching along a majestic crescent bend of the Ganges.",
    details: "In Varanasi, the Ganges turns northward (Uttaravahini), an orientation considered auspicious in classical Indian geography. Eighty-eight stone ghats line the riverfront, serving as centers for morning prayers, classical Hindustani music, Banarasi silk weaving, and historic literary traditions.",
    culturalNote: "Ghats such as Dashashwamedh and Manikarnika reflect the town's central role in Indian heritage, philosophy, and literature for millennia.",
    svgPoint: { x: 320, y: 290 }
  },
  {
    id: "stop-5",
    stopNumber: 5,
    name: "Patna & Middle Plains",
    location: "Patna District, Bihar",
    elevation: "53 m (174 ft)",
    elevationMeters: 53,
    distanceKm: 1480,
    coordinates: "25.59° N, 85.13° E",
    tag: "Ancient Imperial Cradle & Agriculture",
    summary: "Passing ancient Pataliputra, the Ganges expands into a vast watercourse joined by major Himalayan tributaries.",
    details: "As the river traverses Bihar, it absorbs major tributaries including the Ghaghara, Gandak, and Kosi rivers. The surrounding fertile floodplains form one of the world's most productive agricultural zones, sustaining rice, wheat, and sugarcane farming for thousands of years.",
    culturalNote: "Patna (historic Pataliputra) served as the imperial capital of the Maurya and Gupta empires, connecting ancient riverine trade networks.",
    svgPoint: { x: 400, y: 320 }
  },
  {
    id: "stop-6",
    stopNumber: 6,
    name: "Bengal Delta & Sundarbans",
    location: "West Bengal & Bay of Bengal",
    elevation: "0 m (Sea Level)",
    elevationMeters: 0,
    distanceKm: 2525,
    coordinates: "21.94° N, 89.18° E",
    tag: "World's Largest River Delta",
    summary: "Splitting into distributaries like the Hooghly and Padma, the Ganges empties into the Bay of Bengal through the Sundarbans.",
    details: "Near Farakka, the river branches: the Hooghly flows south past Kolkata, while the Padma flows into Bangladesh to join the Brahmaputra (Jamuna) and Meghna. Together, they form the 350-km-wide Ganges-Brahmaputra Delta, entering the sea through the UNESCO World Heritage Sundarbans mangrove forest, home to the Royal Bengal Tiger.",
    culturalNote: "Kolkata's Hooghly riverfront features the iconic Howrah Bridge and centuries of maritime trade heritage.",
    svgPoint: { x: 470, y: 430 }
  }
];

/**
 * Calculates current active stop index based on scroll position.
 *
 * @param {number} scrollTop - Current window scroll position
 * @param {Array<{id: string, top: number, height: number}>} stopElementOffsets - Array of element positions
 * @returns {number} Active stop index (0 to stops.length - 1)
 */
export function getActiveStopIndex(scrollTop = 0, stopElementOffsets = []) {
  if (!stopElementOffsets || stopElementOffsets.length === 0) return 0;

  const viewportMiddle = scrollTop + (window.innerHeight || 600) * 0.4;
  let activeIndex = 0;

  for (let i = 0; i < stopElementOffsets.length; i++) {
    const stop = stopElementOffsets[i];
    if (viewportMiddle >= stop.top) {
      activeIndex = i;
    }
  }

  return activeIndex;
}

/**
 * Calculates percentage completion along the river path (0% to 100%).
 *
 * @param {number} stopIndex - 0-based stop index
 * @param {number} totalStops - Total number of stops
 * @returns {number} Percentage completion (0 to 100)
 */
export function calculateRiverPathProgress(stopIndex = 0, totalStops = 6) {
  const safeTotal = Math.max(1, totalStops - 1);
  const safeIndex = Math.max(0, Math.min(safeTotal, stopIndex));
  return Math.round((safeIndex / safeTotal) * 100);
}

/**
 * Computes summary statistics for the Ganges River journey.
 *
 * @param {Array<Object>} stops - River stops array
 * @returns {Object} Ganges stats object
 */
export function getGangesStats(stops = GANGES_STOPS) {
  const totalStops = stops.length;
  const totalLengthKm = totalStops > 0 ? stops[totalStops - 1].distanceKm : 2525;
  const originElevation = totalStops > 0 ? stops[0].elevation : "4,100 m";
  const seaElevation = totalStops > 0 ? stops[totalStops - 1].elevation : "0 m";

  return {
    totalStops,
    totalLengthKm,
    originElevation,
    seaElevation,
    statesTraversed: ["Uttarakhand", "Uttar Pradesh", "Bihar", "Jharkhand", "West Bengal"]
  };
}

/* --- Interactive DOM Scrollytelling Controller --- */

class GangesScrollytellingApp {
  constructor() {
    this.activeStopIndex = 0;
    this.stopOffsets = [];
    this.observer = null;

    this.initElements();
    this.bindEvents();
    this.renderStops();
    this.initIntersectionObserver();
    this.updateActiveStop(0);
  }

  initElements() {
    this.narrativeContainer = document.getElementById("narrative-panels-container");
    this.jumpNavContainer = document.getElementById("jump-nav-container");

    this.meterDistanceEl = document.getElementById("meter-distance");
    this.meterElevationEl = document.getElementById("meter-elevation");
    this.meterLocationEl = document.getElementById("meter-location");
    this.pathProgressBar = document.getElementById("river-progress-fill");

    this.svgPath = document.getElementById("ganges-svg-path");
    this.svgNodeMarker = document.getElementById("svg-node-marker");
  }

  bindEvents() {
    window.addEventListener("scroll", () => this.handleScroll(), { passive: true });
    window.addEventListener("resize", () => this.recalculateOffsets(), { passive: true });

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
      });
    }
  }

  renderStops() {
    if (!this.narrativeContainer) return;
    this.narrativeContainer.innerHTML = "";

    if (this.jumpNavContainer) this.jumpNavContainer.innerHTML = "";

    GANGES_STOPS.forEach((stop, index) => {
      // Narrative card element
      const card = document.createElement("article");
      card.className = "stop-card";
      card.id = stop.id;
      card.dataset.stopIndex = index;

      card.innerHTML = `
        <div class="card-tag-badge">${stop.tag}</div>
        <div class="card-header">
          <span class="stop-num-badge">Stop ${stop.stopNumber} of ${GANGES_STOPS.length}</span>
          <span class="stop-dist-pill">📍 ${stop.distanceKm} km from origin</span>
        </div>
        <h2 class="stop-title">${stop.name}</h2>
        <div class="stop-meta-line">
          <span>🏞️ ${stop.location}</span> • <span>⛰️ ${stop.elevation}</span>
        </div>
        <p class="stop-summary">${stop.summary}</p>
        <p class="stop-details">${stop.details}</p>
        <div class="cultural-box">
          <span class="cultural-icon">🏛️</span>
          <p class="cultural-text"><strong>Heritage & Culture:</strong> ${stop.culturalNote}</p>
        </div>
      `;

      this.narrativeContainer.appendChild(card);

      // Jump nav button
      if (this.jumpNavContainer) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `jump-btn ${index === 0 ? 'active' : ''}`;
        btn.dataset.stopIndex = index;
        btn.textContent = `${index + 1}. ${stop.name.split(' ')[0]}`;

        btn.addEventListener("click", () => {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
        });

        this.jumpNavContainer.appendChild(btn);
      }
    });

    this.recalculateOffsets();
  }

  recalculateOffsets() {
    const cards = document.querySelectorAll(".stop-card");
    this.stopOffsets = Array.from(cards).map(card => {
      const rect = card.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      return {
        id: card.id,
        top: rect.top + scrollTop,
        height: rect.height
      };
    });
  }

  initIntersectionObserver() {
    if (typeof IntersectionObserver === "undefined") return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.stopIndex, 10);
          if (!isNaN(idx)) {
            this.updateActiveStop(idx);
          }
        }
      });
    }, {
      rootMargin: "-20% 0px -40% 0px",
      threshold: 0.2
    });

    const cards = document.querySelectorAll(".stop-card");
    cards.forEach(card => this.observer.observe(card));
  }

  handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const newIdx = getActiveStopIndex(scrollTop, this.stopOffsets);
    if (newIdx !== this.activeStopIndex) {
      this.updateActiveStop(newIdx);
    }
  }

  updateActiveStop(index) {
    this.activeStopIndex = index;
    const stop = GANGES_STOPS[index];
    if (!stop) return;

    // Update gauge meters
    if (this.meterDistanceEl) this.meterDistanceEl.textContent = `${stop.distanceKm} km`;
    if (this.meterElevationEl) this.meterElevationEl.textContent = stop.elevation;
    if (this.meterLocationEl) this.meterLocationEl.textContent = stop.name;

    // Update river progress bar
    if (this.pathProgressBar) {
      const pct = calculateRiverPathProgress(index, GANGES_STOPS.length);
      this.pathProgressBar.style.width = `${pct}%`;
    }

    // Highlight active jump button
    if (this.jumpNavContainer) {
      const btns = this.jumpNavContainer.querySelectorAll(".jump-btn");
      btns.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
      });
    }

    // Highlight active stop card
    const cards = document.querySelectorAll(".stop-card");
    cards.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });

    // Move SVG node marker dot
    if (this.svgNodeMarker && stop.svgPoint) {
      this.svgNodeMarker.setAttribute("cx", stop.svgPoint.x);
      this.svgNodeMarker.setAttribute("cy", stop.svgPoint.y);
    }
  }
}

// Auto-initialize on DOM load in browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.GangesScrollytelling = {
    GANGES_STOPS,
    getActiveStopIndex,
    calculateRiverPathProgress,
    getGangesStats,
    GangesScrollytellingApp
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("narrative-panels-container")) {
      new GangesScrollytellingApp();
    }
  });
}
