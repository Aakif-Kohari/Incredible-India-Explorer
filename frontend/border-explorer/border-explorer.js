/**
 * border-explorer.js
 * India's Border Explorer — Dataset, Interactive Map Engine, and Country Comparison
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Dataset of India's International Borders
export const bordersData = [
  {
    id: "india-pakistan",
    country: "Pakistan",
    borderName: "Radcliffe Line / Line of Control (LoC)",
    borderLength: 3323,
    unit: "km",
    direction: "West & Northwest",
    flag: "🇵🇰",
    borderForce: "Border Security Force (BSF)",
    borderingStates: ["Gujarat", "Rajasthan", "Punjab", "Jammu & Kashmir"],
    majorCheckpoints: [
      { name: "Wagah-Attari Border", state: "Punjab", type: "Road", description: "Famous for the daily flag-lowering ceremony; primary road crossing between India and Pakistan." },
      { name: "Munabao-Khokhrapar", state: "Rajasthan", type: "Rail", description: "Thar Express rail crossing connecting Jodhpur to Karachi via the Thar Desert." }
    ],
    importantTowns: ["Attari", "Fazilka", "Munabao", "Barmer", "Jammu"],
    description: "India's western border with Pakistan, established through the Radcliffe Line in 1947 during partition. The LoC in Jammu & Kashmir is a de facto border established after the 1972 Simla Agreement.",
    geographicFeatures: "Spans the Thar Desert, Punjab plains, Rann of Kutch marshlands, and the Himalayan foothills of Kashmir."
  },
  {
    id: "india-china",
    country: "China",
    borderName: "Line of Actual Control (LAC)",
    borderLength: 3488,
    unit: "km",
    direction: "North & Northeast",
    flag: "🇨🇳",
    borderForce: "Indo-Tibetan Border Police (ITBP)",
    borderingStates: ["Jammu & Kashmir (Ladakh)", "Himachal Pradesh", "Uttarakhand", "Sikkim", "Arunachal Pradesh"],
    majorCheckpoints: [
      { name: "Nathu La Pass", state: "Sikkim", type: "Road", description: "Reopened in 2006 for border trade between Sikkim and Tibet at an elevation of 4,310 m." },
      { name: "Lipulekh Pass", state: "Uttarakhand", type: "Road", description: "Ancient trade and pilgrimage route at 5,334 m, used for Kailash Mansarovar Yatra." },
      { name: "Shipki La Pass", state: "Himachal Pradesh", type: "Road", description: "Trade route at 4,023 m connecting Kinnaur with Tibet." }
    ],
    importantTowns: ["Leh", "Tawang", "Gangtok", "Pithoragarh", "Keylong"],
    description: "India's longest border, spanning five states and union territories along the Himalayan range. The LAC remains disputed in parts, with no formally demarcated boundary line.",
    geographicFeatures: "Traverses the highest terrain of any international border: the Karakoram, western Himalayas, and eastern Himalayas including the Aksai Chin plateau."
  },
  {
    id: "india-nepal",
    country: "Nepal",
    borderName: "India-Nepal Open Border",
    borderLength: 1751,
    unit: "km",
    direction: "North",
    flag: "🇳🇵",
    borderForce: "Sashastra Seema Bal (SSB)",
    borderingStates: ["Uttarakhand", "Uttar Pradesh", "Bihar", "West Bengal", "Sikkim"],
    majorCheckpoints: [
      { name: "Raxaul-Birgunj", state: "Bihar", type: "Road & Rail", description: "Primary trade and passenger corridor; handles over 60% of Indo-Nepal bilateral trade." },
      { name: "Sunauli-Bhairahawa", state: "Uttar Pradesh", type: "Road", description: "Major tourist crossing for visitors heading to Lumbini, the birthplace of Gautama Buddha." },
      { name: "Jogbani-Biratnagar", state: "Bihar", type: "Road", description: "Eastern trade corridor connecting Bihar to Nepal's second-largest city." }
    ],
    importantTowns: ["Raxaul", "Sunauli", "Jogbani", "Banbasa", "Kakarbhitta"],
    description: "An open border with free movement of people between the two countries under the 1950 Treaty of Peace and Friendship. Citizens of both countries can cross without passports or visas.",
    geographicFeatures: "Runs along the Indo-Gangetic plains in the south and the Himalayan foothills (Terai and Siwalik ranges) in the north."
  },
  {
    id: "india-bhutan",
    country: "Bhutan",
    borderName: "India-Bhutan Border",
    borderLength: 699,
    unit: "km",
    direction: "Northeast",
    flag: "🇧🇹",
    borderForce: "Sashastra Seema Bal (SSB)",
    borderingStates: ["Sikkim", "West Bengal", "Assam", "Arunachal Pradesh"],
    majorCheckpoints: [
      { name: "Jaigaon-Phuentsholing", state: "West Bengal", type: "Road", description: "Principal gateway to Bhutan; serves as the main trade and passenger checkpoint." },
      { name: "Samdrup Jongkhar", state: "Assam", type: "Road", description: "Eastern entry point to Bhutan from India, connecting Assam to southeastern Bhutan." }
    ],
    importantTowns: ["Jaigaon", "Samdrup Jongkhar", "Gelephu", "Haa"],
    description: "India and Bhutan share a peaceful border governed by the India-Bhutan Treaty of Friendship (2007). India is Bhutan's largest trade partner, and the two nations maintain a special bilateral relationship.",
    geographicFeatures: "Passes through dense sub-Himalayan forests, riverine plains, and the foothills of the eastern Himalayan range."
  },
  {
    id: "india-bangladesh",
    country: "Bangladesh",
    borderName: "India-Bangladesh Border",
    borderLength: 4096,
    unit: "km",
    direction: "East",
    flag: "🇧🇩",
    borderForce: "Border Security Force (BSF)",
    borderingStates: ["West Bengal", "Assam", "Meghalaya", "Tripura", "Mizoram"],
    majorCheckpoints: [
      { name: "Petrapole-Benapole", state: "West Bengal", type: "Road", description: "Largest land port of South Asia; handles the majority of Indo-Bangladesh bilateral trade." },
      { name: "Agartala-Akhaura", state: "Tripura", type: "Road & Rail", description: "Strategic northeastern crossing connecting Tripura to Chittagong region of Bangladesh." },
      { name: "Dawki-Tamabil", state: "Meghalaya", type: "Road", description: "Scenic crossing at the Umngot River; serves as the gateway between Shillong and Sylhet." }
    ],
    importantTowns: ["Petrapole", "Hili", "Agartala", "Dawki", "Sabroom"],
    description: "India's longest international border, shared across five states. The border was historically complex, featuring 162 enclaves that were resolved through the historic Land Boundary Agreement of 2015.",
    geographicFeatures: "Crosses the Gangetic delta, Brahmaputra floodplains, Meghalaya plateau, and the Mizo Hills."
  },
  {
    id: "india-myanmar",
    country: "Myanmar",
    borderName: "India-Myanmar Border",
    borderLength: 1643,
    unit: "km",
    direction: "East",
    flag: "🇲🇲",
    borderForce: "Assam Rifles",
    borderingStates: ["Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram"],
    majorCheckpoints: [
      { name: "Moreh-Tamu", state: "Manipur", type: "Road", description: "Primary crossing point on the India-Myanmar-Thailand Trilateral Highway (Asian Highway 1)." },
      { name: "Zokhawthar-Rih", state: "Mizoram", type: "Road", description: "Southern crossing connecting Mizoram to Chin State in Myanmar." }
    ],
    importantTowns: ["Moreh", "Zokhawthar", "Mon", "Champhai"],
    description: "India's eastern border with Myanmar, spanning four northeastern states. Under the Free Movement Regime (FMR), people living within 16 km of the border can cross without visas for up to 72 hours.",
    geographicFeatures: "Traverses dense tropical and subtropical forests, the Patkai and Naga hills, and the Chin Hills — some of the most biodiverse regions in Asia."
  },
  {
    id: "india-sri-lanka",
    country: "Sri Lanka",
    borderName: "Palk Strait Maritime Border",
    borderLength: 30,
    unit: "km (narrowest point)",
    direction: "South",
    flag: "🇱🇰",
    borderForce: "Indian Coast Guard / Indian Navy",
    borderingStates: ["Tamil Nadu"],
    majorCheckpoints: [
      { name: "Tuticorin Port", state: "Tamil Nadu", type: "Sea", description: "Major seaport for cargo and passenger ferry services between India and Sri Lanka." },
      { name: "Rameswaram", state: "Tamil Nadu", type: "Sea", description: "Historical ferry point; closest Indian town to Sri Lanka, connected by the mythological Ram Setu (Adam's Bridge)." }
    ],
    importantTowns: ["Rameswaram", "Tuticorin", "Dhanushkodi"],
    description: "India and Sri Lanka are separated by the Palk Strait (30 km at narrowest point) and the Gulf of Mannar. The two countries are connected by Adam's Bridge (Ram Setu), a chain of limestone shoals.",
    geographicFeatures: "Maritime border across the Palk Strait, featuring Adam's Bridge — a 48 km chain of limestone shoals between Rameswaram (India) and Mannar Island (Sri Lanka)."
  }
];

/**
 * Get border record by ID.
 */
export function getBorderById(id, list = bordersData) {
  if (!id || !Array.isArray(list)) return undefined;
  const target = id.trim().toLowerCase();
  return list.find(item =>
    item.id.toLowerCase() === target ||
    item.country.toLowerCase() === target
  );
}

/**
 * Filter borders by search query.
 */
export function filterBorders(query = "", list = bordersData) {
  if (!Array.isArray(list)) return [];
  const q = query.trim().toLowerCase();
  if (!q) return [...list];

  return list.filter(item => {
    const searchable = [
      item.country,
      item.borderName,
      item.borderForce,
      item.direction,
      item.description,
      item.geographicFeatures,
      ...item.borderingStates,
      ...item.importantTowns,
      ...item.majorCheckpoints.map(c => c.name),
      ...item.majorCheckpoints.map(c => c.description)
    ];
    return searchable.some(field => field && field.toLowerCase().includes(q));
  });
}

/**
 * Sort borders by border length (descending).
 */
export function getBordersByLength(list = bordersData) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => b.borderLength - a.borderLength);
}

/**
 * Get total border length of India across all neighbors.
 */
export function getTotalBorderLength(list = bordersData) {
  if (!Array.isArray(list)) return 0;
  return list.reduce((sum, item) => sum + item.borderLength, 0);
}

/**
 * Get all unique border forces.
 */
export function getAllBorderForces(list = bordersData) {
  if (!Array.isArray(list)) return [];
  const forces = new Set(list.map(item => item.borderForce));
  return [...forces];
}

/**
 * Get all unique bordering states across all neighbors.
 */
export function getAllBorderingStates(list = bordersData) {
  if (!Array.isArray(list)) return [];
  const states = new Set(list.flatMap(item => item.borderingStates));
  return [...states];
}

/**
 * Country comparison: returns an object comparing two border records.
 */
export function compareBorders(id1, id2, list = bordersData) {
  const border1 = getBorderById(id1, list);
  const border2 = getBorderById(id2, list);
  if (!border1 || !border2) return null;

  return {
    countries: [border1.country, border2.country],
    borderLengths: [border1.borderLength, border2.borderLength],
    longerBorder: border1.borderLength >= border2.borderLength ? border1.country : border2.country,
    borderForces: [border1.borderForce, border2.borderForce],
    checkpointCounts: [border1.majorCheckpoints.length, border2.majorCheckpoints.length],
    statesCounts: [border1.borderingStates.length, border2.borderingStates.length]
  };
}

/* ==========================================================================
   BROWSER DOM & BORDER EXPLORER ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.bordersData = bordersData;
  window.getBorderById = getBorderById;
  window.filterBorders = filterBorders;
  window.getBordersByLength = getBordersByLength;
  window.getTotalBorderLength = getTotalBorderLength;
  window.getAllBorderForces = getAllBorderForces;
  window.getAllBorderingStates = getAllBorderingStates;
  window.compareBorders = compareBorders;

  document.addEventListener("DOMContentLoaded", () => {
    const cardsGrid = document.getElementById("borders-cards-grid");
    const searchInput = document.getElementById("borders-search");
    const compareSelect1 = document.getElementById("compare-select-1");
    const compareSelect2 = document.getElementById("compare-select-2");
    const compareResultBox = document.getElementById("compare-result-box");
    const btnCompare = document.getElementById("btn-compare");
    const mapContainer = document.getElementById("border-map-container");

    // Animated counter
    function animateCounter(el, target, suffix = "") {
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current.toLocaleString("en-IN") + suffix;
      }, 18);
    }

    // Animate hero stats
    document.querySelectorAll("[data-counter]").forEach(el => {
      const target = parseInt(el.dataset.counter, 10);
      const suffix = el.dataset.suffix || "";
      animateCounter(el, target, suffix);
    });

    // Render border cards
    function renderCards() {
      if (!cardsGrid) return;
      cardsGrid.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const filtered = filterBorders(query);

      if (filtered.length === 0) {
        cardsGrid.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Borders Found</h3>
            <p>Try searching for a country, checkpoint, border force, or bordering state.</p>
          </div>`;
        return;
      }

      filtered.forEach(item => {
        const card = document.createElement("article");
        card.className = "border-card";

        card.innerHTML = `
          <div class="card-header">
            <span class="country-flag">${item.flag}</span>
            <div class="header-info">
              <h3>${item.country}</h3>
              <span class="border-name-tag">${item.borderName}</span>
            </div>
            <span class="direction-badge">${item.direction}</span>
          </div>

          <div class="border-stats-row">
            <div class="mini-stat">
              <strong>${item.borderLength.toLocaleString("en-IN")}</strong>
              <span>${item.unit}</span>
            </div>
            <div class="mini-stat">
              <strong>${item.majorCheckpoints.length}</strong>
              <span>Checkpoints</span>
            </div>
            <div class="mini-stat">
              <strong>${item.borderingStates.length}</strong>
              <span>States</span>
            </div>
          </div>

          <p class="card-desc">${item.description}</p>

          <div class="card-section">
            <h4>🛡️ Border Force</h4>
            <span class="force-badge">${item.borderForce}</span>
          </div>

          <div class="card-section">
            <h4>🗺️ Bordering States</h4>
            <div class="tags-row">${item.borderingStates.map(s => `<span class="state-tag">${s}</span>`).join("")}</div>
          </div>

          <div class="card-section">
            <h4>🚏 Major Checkpoints</h4>
            <div class="checkpoints-list">
              ${item.majorCheckpoints.map(cp => `
                <div class="checkpoint-item">
                  <strong>${cp.name}</strong> <span class="cp-type">${cp.type}</span>
                  <p>${cp.description}</p>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="card-section">
            <h4>🏘️ Important Border Towns</h4>
            <div class="tags-row">${item.importantTowns.map(t => `<span class="town-tag">${t}</span>`).join("")}</div>
          </div>

          <div class="card-section geo-section">
            <h4>🌍 Geographic Features</h4>
            <p>${item.geographicFeatures}</p>
          </div>
        `;

        cardsGrid.appendChild(card);
      });
    }

    // Render interactive map (SVG-based simplified)
    function renderMap() {
      if (!mapContainer) return;

      const mapPins = bordersData.map(item => {
        const positions = {
          "Pakistan": { left: "15%", top: "35%" },
          "China": { left: "50%", top: "8%" },
          "Nepal": { left: "55%", top: "28%" },
          "Bhutan": { left: "72%", top: "28%" },
          "Bangladesh": { left: "78%", top: "42%" },
          "Myanmar": { left: "88%", top: "48%" },
          "Sri Lanka": { left: "52%", top: "88%" }
        };
        const pos = positions[item.country] || { left: "50%", top: "50%" };

        return `
          <div class="map-pin" style="left:${pos.left}; top:${pos.top}" data-country="${item.country}" title="${item.country}">
            <span class="pin-flag">${item.flag}</span>
            <div class="pin-tooltip">
              <strong>${item.country}</strong>
              <p>${item.borderLength.toLocaleString("en-IN")} ${item.unit}</p>
              <p>${item.borderName}</p>
              <p>Force: ${item.borderForce}</p>
            </div>
          </div>
        `;
      }).join("");

      mapContainer.innerHTML = `
        <div class="map-label">🇮🇳 India</div>
        ${mapPins}
      `;
    }

    // Populate comparison dropdowns
    function populateCompareDropdowns() {
      if (!compareSelect1 || !compareSelect2) return;
      bordersData.forEach(item => {
        const opt1 = new Option(`${item.flag} ${item.country}`, item.id);
        const opt2 = new Option(`${item.flag} ${item.country}`, item.id);
        compareSelect1.appendChild(opt1);
        compareSelect2.appendChild(opt2);
      });
      if (bordersData.length >= 2) {
        compareSelect2.selectedIndex = 1;
      }
    }

    // Compare handler
    function handleCompare() {
      if (!compareResultBox || !compareSelect1 || !compareSelect2) return;
      const id1 = compareSelect1.value;
      const id2 = compareSelect2.value;

      if (id1 === id2) {
        compareResultBox.innerHTML = `<p class="compare-warning">⚠️ Please select two different countries to compare.</p>`;
        return;
      }

      const result = compareBorders(id1, id2);
      if (!result) {
        compareResultBox.innerHTML = `<p class="compare-warning">⚠️ Could not compare. Please try again.</p>`;
        return;
      }

      compareResultBox.innerHTML = `
        <table class="compare-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>${result.countries[0]}</th>
              <th>${result.countries[1]}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Border Length</td>
              <td>${result.borderLengths[0].toLocaleString("en-IN")} km</td>
              <td>${result.borderLengths[1].toLocaleString("en-IN")} km</td>
            </tr>
            <tr>
              <td>Border Force</td>
              <td>${result.borderForces[0]}</td>
              <td>${result.borderForces[1]}</td>
            </tr>
            <tr>
              <td>Major Checkpoints</td>
              <td>${result.checkpointCounts[0]}</td>
              <td>${result.checkpointCounts[1]}</td>
            </tr>
            <tr>
              <td>Bordering States</td>
              <td>${result.statesCounts[0]}</td>
              <td>${result.statesCounts[1]}</td>
            </tr>
            <tr>
              <td>Longer Border</td>
              <td colspan="2" class="longer-highlight">${result.longerBorder}</td>
            </tr>
          </tbody>
        </table>
      `;
    }

    // Event listeners
    searchInput?.addEventListener("input", renderCards);
    btnCompare?.addEventListener("click", handleCompare);

    // Initialize
    renderCards();
    renderMap();
    populateCompareDropdowns();
  });
}
