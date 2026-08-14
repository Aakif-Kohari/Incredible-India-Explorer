/**
 * ancient-cities.js
 * India's Lost Cities & Ancient Civilizations Explorer
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Dataset of Ancient Cities & Civilizations
export const ancientCitiesData = [
  {
    id: "dholavira",
    name: "Dholavira",
    civilization: "Harappan / Indus Valley Civilization",
    eraPeriod: "c. 3000 BCE – 1500 BCE",
    location: "Khadirbet, Rann of Kutch, Gujarat",
    region: "West",
    mapCoords: { x: 28, y: 48 },
    icon: "🏺",
    shortSummary: "A masterwork of Bronze Age urban planning and hydraulic engineering featuring 16 monumental stone water reservoirs.",
    archaeologicalDiscoveries: [
      "16 sophisticated stone-cut reservoirs connected to storm-water drains.",
      "A 10-symbol Indus Script signboard (the 'Dholavira Signboard') embedded in wood.",
      "Tripartite fortified city structure built with polished sandstone masonry."
    ],
    excavationFacts: {
      discoveredBy: "J. P. Joshi (Archaeological Survey of India, 1967–68)",
      keyExcavator: "Dr. R. S. Bisht (ASI, 1989–2005)",
      status: "UNESCO World Heritage Site (Inscribed 2021)",
      historicalSignificance: "Demonstrates advanced water conservation techniques adapted to arid island geography in the Rann of Kutch."
    },
    beforeVsToday: {
      ancientLayout: "A thriving Bronze Age metropolis divided into Citadel, Middle Town, and Lower Town surrounded by massive dry-stone walls and grand ceremonial plazas.",
      todayStatus: "Preserved open-air archaeological park showcasing deep stone-cut reservoirs, paved streets, and stone pillar bases."
    }
  },
  {
    id: "lothal",
    name: "Lothal",
    civilization: "Harappan Maritime Port City",
    eraPeriod: "c. 2400 BCE – 1900 BCE",
    location: "Ahmedabad District, Gujarat",
    region: "West",
    mapCoords: { x: 30, y: 52 },
    icon: "⚓",
    shortSummary: "The world's earliest known tidal dockyard connecting the Harappan civilization to ancient Mesopotamia and the Persian Gulf.",
    archaeologicalDiscoveries: [
      "Tidal basin dockyard constructed of burnt bricks with sluice gates.",
      "State-of-the-art bead factory with steatite and carnelian workshops.",
      "Terracotta sealings of Persian Gulf origin confirming international trade."
    ],
    excavationFacts: {
      discoveredBy: "S. R. Rao (Archaeological Survey of India, 1954)",
      keyExcavator: "S. R. Rao (ASI Excavations 1955–1962)",
      status: "Proposed UNESCO World Heritage Site & National Maritime Heritage Complex",
      historicalSignificance: "Proves Bronze Age Indians possessed advanced hydraulic knowledge of river tides and maritime logistics."
    },
    beforeVsToday: {
      ancientLayout: "Bustling port city with a 218m x 37m brick dockyard, elevated warehouse, paved drainage grid, and bead production quarter.",
      todayStatus: "Archaeological excavation site with preserved brick dockyard walls and an ASI Site Museum exhibiting carnelian beads and Indus seals."
    }
  },
  {
    id: "pataliputra",
    name: "Pataliputra",
    civilization: "Magadha, Mauryan & Gupta Empires",
    eraPeriod: "c. 490 BCE – 600 CE",
    location: "Modern Patna, Bihar",
    region: "East",
    mapCoords: { x: 68, y: 42 },
    icon: "🏛️",
    shortSummary: "The imperial seat of Emperor Ashoka and Chandragupta Maurya, recorded by Greek ambassador Megasthenes as the magnificent 'Palibothra'.",
    archaeologicalDiscoveries: [
      "Kumrahar 80-pillared wooden assembly hall of the Mauryan court.",
      "Massive wooden defensive palisade walls stretching over 14 kilometers.",
      "Didarganj Yakshi polished sandstone sculpture and punch-marked silver coins."
    ],
    excavationFacts: {
      discoveredBy: "L. A. Waddell (1892)",
      keyExcavator: "D. B. Spooner & ASI Team (Kumrahar Excavations 1912–1915)",
      status: "Protected State & ASI Monument Complex (Kumrahar & Agam Kuan)",
      historicalSignificance: "Served as the political and intellectual capital of ancient India across Mauryan, Sunga, and Gupta imperial dynasties."
    },
    beforeVsToday: {
      ancientLayout: "Fortified riverine mega-city featuring 64 gates, 570 towers, royal gardens, and timber palaces along the confluence of the Ganges and Sone rivers.",
      todayStatus: "Archaeological park at Kumrahar in modern Patna displaying stone pillar bases, ancient brick monasteries, and historical artifacts."
    }
  },
  {
    id: "vijayanagara",
    name: "Vijayanagara (Hampi)",
    civilization: "Vijayanagara Empire Capital",
    eraPeriod: "c. 1336 CE – 1565 CE",
    location: "Hampi, Vijayanagara District, Karnataka",
    region: "South",
    mapCoords: { x: 42, y: 72 },
    icon: "🏰",
    shortSummary: "The jewel of medieval South India, celebrated by European travelers as one of the largest and wealthiest cities in the 15th-century world.",
    archaeologicalDiscoveries: [
      "Vittala Temple Stone Chariot and musical granite pillars (Saptaswara).",
      "Royal Enclosure step-well (Pushkarani) fed by elevated stone aqueducts.",
      "Lotus Mahal, Elephant Stables, and sprawling international gem/spice bazaars."
    ],
    excavationFacts: {
      discoveredBy: "Colin Mackenzie (First surveyor, 1800)",
      keyExcavator: "Robert Sewell & ASI Hampi National Project",
      status: "UNESCO World Heritage Site (Inscribed 1986)",
      historicalSignificance: "Represented the pinnacle of South Indian Dravidian architecture, military fortification, and global commerce."
    },
    beforeVsToday: {
      ancientLayout: "A metropolis covering 4,100 hectares with seven concentric fort rings, stone aqueducts, palatial complexes, and vibrant riverbank marketplaces.",
      todayStatus: "A world-famous boulder-strewn open-air museum in Hampi featuring standing granite temples, stone chariot, and royal ruins."
    }
  },
  {
    id: "taxila",
    name: "Taxila (Takshashila)",
    civilization: "Gandhara & Ancient Vedic University Center",
    eraPeriod: "c. 1000 BCE – 500 CE",
    location: "Rawalpindi District, Ancient Gandhara",
    region: "Northwest",
    mapCoords: { x: 22, y: 22 },
    icon: "📜",
    shortSummary: "A legendary seat of ancient learning where Chanakya authored the Arthashastra, Panini codified Sanskrit grammar, and Jivaka studied medicine.",
    archaeologicalDiscoveries: [
      "Dharmarajika Stupa built during Emperor Ashoka's reign.",
      "Sirkap gridded city layout showcasing Indo-Greek architectural fusion.",
      "Jaulian Buddhist monastery complex and Greco-Buddhist stone friezes."
    ],
    excavationFacts: {
      discoveredBy: "Alexander Cunningham (1863)",
      keyExcavator: "Sir John Marshall (ASI Director-General, 1913–1934)",
      status: "UNESCO World Heritage Site (Inscribed 1980)",
      historicalSignificance: "Served as the primary intellectual crossroads between India, Persia, Greece, and Central Asia for over a millennium."
    },
    beforeVsToday: {
      ancientLayout: "Sprawling university and trade hub comprising three distinct city mounds (Bhir Mound, Sirkap, Sirsukh) with stone stupas and student cloisters.",
      todayStatus: "Preserved archaeological park featuring standing stupa bases, monastery cell ruins, and a Gandharan art museum."
    }
  },
  {
    id: "pushkalavati",
    name: "Pushkalavati",
    civilization: "Ancient Gandhara Civilization",
    eraPeriod: "c. 6th century BCE – 2nd century CE",
    location: "Charsadda District, Khyber Pakhtunkhwa (Ancient Gandhara)",
    region: "Northwest",
    mapCoords: { x: 20, y: 19 },
    icon: "🏺",
    shortSummary: "A great Gandharan capital at the confluence of the Swat and Kabul rivers, which withstood a month-long siege by Alexander before flourishing as a centre of Gandharan Buddhist art.",
    archaeologicalDiscoveries: [
      "Bala Hisar's fortified mound, occupied continuously from the Achaemenid period through Kushan times.",
      "Shaikhan Dheri's Indo-Greek and Kushan-era city layers, rich in coins and Gandharan sculpture.",
      "Terracotta figurines and pottery sequences spanning nearly a millennium of occupation."
    ],
    excavationFacts: {
      discoveredBy: "Sir Alexander Cunningham (Archaeological Survey, 19th century)",
      keyExcavator: "Sir Mortimer Wheeler (Bala Hisar, 1958) & Ahmad Hassan Dani (Shaikhan Dheri, 1960s)",
      status: "Protected archaeological site under Pakistan's Department of Archaeology",
      historicalSignificance: "A key Gandharan capital whose layered ruins trace the region's transformation from Achaemenid outpost to cradle of Greco-Buddhist art."
    },
    beforeVsToday: {
      ancientLayout: "A fortified river-confluence city of two mounds, ringed by mudbrick walls, sustaining trade routes toward Central Asia and a flourishing Buddhist monastic landscape.",
      todayStatus: "Two excavated mounds — Bala Hisar and Shaikhan Dheri — preserving stratified remains of walls, coins, pottery and Gandharan sculpture fragments."
    },
    exploreUrl: "../pushkalavati-explorer/index.html"
  },
  {
    id: "fatehpur-sikri",
    name: "Fatehpur Sikri",
    civilization: "Mughal Imperial City",
    eraPeriod: "1571 CE – 1585 CE",
    location: "Agra District, Uttar Pradesh",
    region: "North",
    mapCoords: { x: 45, y: 40 },
    icon: "🕌",
    shortSummary: "The red sandstone dream capital of Mughal Emperor Akbar, abandoned after just 14 years due to regional water supply constraints.",
    archaeologicalDiscoveries: [
      "Buland Darwaza — 54-meter high 'Gate of Victory' built to celebrate the Gujarat campaign.",
      "Panch Mahal 5-tiered pillared palace inspired by Buddhist architectural motifs.",
      "Diwan-i-Khas featuring a central carved stone lotus pillar."
    ],
    excavationFacts: {
      discoveredBy: "Mughal Imperial Archives & ASI Preservation Records",
      keyExcavator: "E. W. Smith & Archaeological Survey of India",
      status: "UNESCO World Heritage Site (Inscribed 1986)",
      historicalSignificance: "Reflects Emperor Akbar's vision of cultural synthesis (Din-i-Ilahi), blending Hindu, Persian, and Islamic architectural elements."
    },
    beforeVsToday: {
      ancientLayout: "Planned imperial capital built on a rocky ridge with an artificial lake, royal audience halls, Sufi shrines, and courtly quarters.",
      todayStatus: "A remarkably intact red sandstone ghost city near Agra, recognized as a masterpiece of Mughal urban design."
    }
  },
  {
    id: "rajgir",
    name: "Rajgir",
    civilization: "Magadha Empire & Sacred Buddhist/Jain Landscape",
    eraPeriod: "c. 1000 BCE – 12th century CE",
    location: "Nalanda District, Bihar",
    region: "East",
    mapCoords: { x: 69, y: 44 },
    icon: "🏔️",
    shortSummary: "The ancient valley capital of Magadha nestled within five hills, which evolved from a mighty fortress into a sacred Buddhist and Jain pilgrimage landscape.",
    archaeologicalDiscoveries: [
      "Cyclopean Wall of Rajgir: 40 km long ancient stone fortifications built without mortar.",
      "Gridhrakuta (Vulture Peak) where Gautama Buddha delivered major Mahayana sutras.",
      "Son Bhandar Caves: Rock-cut caves with Jain carvings and ancient inscriptions."
    ],
    excavationFacts: {
      discoveredBy: "Francis Buchanan-Hamilton (1811) & Sir Alexander Cunningham (1861-62)",
      keyExcavator: "John Marshall & Archaeological Survey of India",
      status: "Protected State & ASI Monument Complex",
      historicalSignificance: "Served as the early Magadha capital under Bimbisara and Ajatashatru, and hosted the First Buddhist Council in Saptaparni Cave."
    },
    beforeVsToday: {
      ancientLayout: "A valley surrounded by high stone fortifications, royal palaces, monasteries, and pilgrimage routes frequented by Buddha and Mahavira.",
      todayStatus: "A major historical tourist center featuring the Cyclopean Wall ruins, hot springs, ropeway to Vishwa Shanti Stupa, and ruins of Bimbisara's jail."
    },
    explorerUrl: "../rajgir-explorer/index.html"
  }
];

/**
 * Get city profile by ID.
 */
export function getCityById(id, list = ancientCitiesData) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(c => c.id.toLowerCase() === target || c.name.toLowerCase().includes(target));
}

/**
 * Filter ancient cities by search query and region/civilization.
 */
export function filterCities(query = "", filterTag = "all", list = ancientCitiesData) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  const f = filterTag.trim().toLowerCase();

  return list.filter(city => {
    const matchesQuery = !q || [
      city.name,
      city.civilization,
      city.eraPeriod,
      city.location,
      city.shortSummary,
      ...city.archaeologicalDiscoveries
    ].some(field => field && field.toLowerCase().includes(q));

    const matchesFilter = f === "all" ||
      city.region.toLowerCase() === f ||
      city.civilization.toLowerCase().includes(f);

    return matchesQuery && matchesFilter;
  });
}

/**
 * Get Before vs Today comparison data for a city.
 */
export function compareBeforeVsToday(cityId, list = ancientCitiesData) {
  const city = getCityById(cityId, list);
  if (!city) return null;
  return {
    cityName: city.name,
    civilization: city.civilization,
    before: city.beforeVsToday.ancientLayout,
    today: city.beforeVsToday.todayStatus
  };
}

/* ==========================================================================
   BROWSER DOM & ANCIENT CITIES ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.ancientCitiesData = ancientCitiesData;
  window.getCityById = getCityById;
  window.filterCities = filterCities;
  window.compareBeforeVsToday = compareBeforeVsToday;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const citiesGrid = document.getElementById("cities-cards-grid");
    const searchInput = document.getElementById("ancient-search");
    const filterBtns = document.querySelectorAll(".btn-region-filter");
    const mapPinsContainer = document.getElementById("ancient-map-pins");
    const beforeVsTodayContainer = document.getElementById("before-today-comparison-box");

    let currentFilter = "all";
    let activeCityId = ancientCitiesData[0].id;

    // Render Map Pins
    function renderMapPins() {
      if (!mapPinsContainer) return;
      mapPinsContainer.innerHTML = "";

      ancientCitiesData.forEach(city => {
        const pin = document.createElement("button");
        pin.type = "button";
        pin.className = `map-pin ${city.id === activeCityId ? 'active' : ''}`;
        pin.style.left = `${city.mapCoords.x}%`;
        pin.style.top = `${city.mapCoords.y}%`;
        pin.title = `${city.name} (${city.civilization})`;

        pin.innerHTML = `
          <span class="pin-icon">${city.icon}</span>
          <span class="pin-label">${city.name}</span>
        `;

        pin.addEventListener("click", () => {
          activeCityId = city.id;
          renderMapPins();
          renderBeforeVsToday();
          // Scroll to card
          const cardEl = document.getElementById(`card-${city.id}`);
          cardEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        mapPinsContainer.appendChild(pin);
      });
    }

    // Render Before vs Today Comparison View
    function renderBeforeVsToday() {
      if (!beforeVsTodayContainer) return;
      const comp = compareBeforeVsToday(activeCityId);
      if (!comp) return;

      beforeVsTodayContainer.innerHTML = `
        <div class="comparison-header">
          <h3>🏛️ Before vs Today: <span>${comp.cityName}</span></h3>
          <span class="comp-civ-tag">${comp.civilization}</span>
        </div>

        <div class="comparison-grid">
          <div class="comp-col comp-before">
            <div class="col-header">
              <span class="col-icon">📜</span>
              <h4>Ancient Flourishing Layout</h4>
            </div>
            <p>${comp.before}</p>
          </div>

          <div class="comp-divider">➔</div>

          <div class="comp-col comp-today">
            <div class="col-header">
              <span class="col-icon">🏞️</span>
              <h4>Modern Archaeological Status</h4>
            </div>
            <p>${comp.today}</p>
          </div>
        </div>
      `;
    }

    // Render Cities Cards Grid
    function renderCitiesGrid() {
      if (!citiesGrid) return;
      citiesGrid.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const filtered = filterCities(query, currentFilter);

      if (filtered.length === 0) {
        citiesGrid.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Ancient Cities Found</h3>
            <p>Try adjusting your search query (e.g. Dholavira, Ashoka, Harappan, Hampi).</p>
          </div>
        `;
        return;
      }

      filtered.forEach(city => {
        const card = document.createElement("article");
        card.className = `city-card ${city.id === activeCityId ? 'active-highlight' : ''}`;
        card.id = `card-${city.id}`;

        const discoveriesList = city.archaeologicalDiscoveries
          .map(d => `<li>🔍 ${d}</li>`)
          .join("");

        card.innerHTML = `
          <div class="city-card-header">
            <span class="city-icon">${city.icon}</span>
            <div class="header-titles">
              <h2>${city.name}</h2>
              <span class="civ-tag">${city.civilization}</span>
            </div>
          </div>

          <p class="era-tag">⏳ <strong>Era / Period:</strong> ${city.eraPeriod}</p>
          <p class="location-tag">📍 <strong>Location:</strong> ${city.location}</p>
          <p class="short-summary">${city.shortSummary}</p>

          <div class="discoveries-box">
            <h4>🏺 Archaeological Discoveries:</h4>
            <ul>${discoveriesList}</ul>
          </div>

          <div class="excavation-box">
            <h4>⛏️ Excavation Facts & ASI Record:</h4>
            <p><strong>Discovered By:</strong> ${city.excavationFacts.discoveredBy}</p>
            <p><strong>Key Excavators:</strong> ${city.excavationFacts.keyExcavator}</p>
            <p><strong>Heritage Status:</strong> ${city.excavationFacts.status}</p>
            <p class="significance-text">${city.excavationFacts.historicalSignificance}</p>
          </div>

         <button type="button" class="btn-compare-trigger" data-city="${city.id}">
            🔄 View Before vs Today Comparison
          </button>
          ${city.exploreUrl ? `<a href="${city.exploreUrl}" class="btn-compare-trigger" style="display:block; text-align:center; text-decoration:none; margin-top:10px;">🧭 Explore ${city.name}</a>` : ""}
        `;

        const compareBtn = card.querySelector(".btn-compare-trigger");
        compareBtn?.addEventListener("click", () => {
          activeCityId = city.id;
          renderMapPins();
          renderBeforeVsToday();
          document.getElementById("before-today-comparison-box")?.scrollIntoView({ behavior: 'smooth' });
        });

        citiesGrid.appendChild(card);
      });
    }

    // Filter Button Listeners
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderCitiesGrid();
      });
    });

    // Search Input Listener
    searchInput?.addEventListener("input", renderCitiesGrid);

    // Initializations
    renderMapPins();
    renderBeforeVsToday();
    renderCitiesGrid();
  });
}
