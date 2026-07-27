/**
 * biodiversity-hotspots script.js
 * Animated Infographic: India's Biodiversity Hotspots (#579).
 * Highlights the 4 internationally recognized global biodiversity hotspots in India.
 */

const BIODIVERSITY_HOTSPOTS_DATA = [
  {
    id: "himalaya",
    name: "The Himalaya Hotspot",
    tagline: "Roof of the World & Alpine Sanctuary",
    statesCovered: "Jammu & Kashmir, Ladakh, Himachal Pradesh, Uttarakhand, Sikkim, Arunachal Pradesh",
    areaKm2: "750,000 km² (Entire arc)",
    endemicSpeciesCount: "3,160+ Endemic Plant Species",
    threatLevel: "High (Climate Warming & Melting Glaciers)",
    mapRegionKey: "himalayan-arc",
    svgHighlightD: "M 150 80 Q 300 120 550 160 L 530 190 Q 300 140 140 110 Z",
    color: "#38bdf8",
    description: "Stretching in a 3,000 km crescent across northern India, the Himalaya hotspot spans alpine meadows, temperate conifer forests, and subtropical foothills. It harbors extraordinary botanical and faunal endemism adapted to extreme elevation gradients.",
    keyFloraFauna: [
      { name: "Snow Leopard (Panthera uncia)", icon: "fa-cat", status: "Vulnerable", note: "Apex predator of alpine scree slopes" },
      { name: "Red Panda (Ailurus fulgens)", icon: "fa-paw", status: "Endangered", note: "Lives in eastern Himalayan bamboo thickets" },
      { name: "Himalayan Blue Poppy (Meconopsis)", icon: "fa-seedling", status: "Rare", note: "Queen of Himalayan alpine wildflowers" },
      { name: "Golden Langur (Trachypithecus geei)", icon: "fa-monkey", status: "Endangered", note: "Endemic to Assam-Bhutan border foothills" }
    ],
    ecologicalCriteria: {
      endemicPlants: 3160,
      habitatLossPercent: 75,
      protectedAreaPercent: 28
    },
    threats: [
      "Glacial retreat & altered hydrological regimes due to climate change",
      "Unplanned infrastructure and steep-slope road construction",
      "Poaching and Illegal trade of medicinal alpine herbs (e.g., Cordyceps)"
    ]
  },
  {
    id: "western-ghats",
    name: "Western Ghats & Sri Lanka",
    tagline: "Moist Deciduous & Evergreen Biodiversity Wall",
    statesCovered: "Gujarat, Maharashtra, Goa, Karnataka, Kerala, Tamil Nadu",
    areaKm2: "160,000 km²",
    endemicSpeciesCount: "2,000+ Endemic Plant & Amphibian Species",
    threatLevel: "Critical (Habitat Fragmentation & Mining)",
    mapRegionKey: "western-coastal-ridge",
    svgHighlightD: "M 190 280 L 220 310 L 240 430 L 210 440 L 175 320 Z",
    color: "#4ade80",
    description: "Running parallel to India's western coast, the Sahyadri mountains block monsoon winds, creating dense tropical rain forests. Older than the Himalayas, the region is a UNESCO World Heritage site and home to over 500 tree species found nowhere else.",
    keyFloraFauna: [
      { name: "Lion-tailed Macaque (Macaca silenus)", icon: "fa-paw", status: "Endangered", note: "Arboreal primate restricted to rainforest canopy" },
      { name: "Purple Frog (Nasikabatrachus sahyadrensis)", icon: "fa-frog", status: "Endangered", note: "Living fossil spending 50 weeks/year underground" },
      { name: "Nilgiri Tahr (Nilgiritragus hylocrius)", icon: "fa-mountain", status: "Endangered", note: "Mountain goat endemic to high montane shola grasslands" },
      { name: "Malabar Giant Squirrel (Ratufa indica)", icon: "fa-tree", status: "Least Concern", note: "Multicolored canopy dwelling rodent" }
    ],
    ecologicalCriteria: {
      endemicPlants: 2000,
      habitatLossPercent: 74,
      protectedAreaPercent: 15
    },
    threats: [
      "Monoculture plantations (Tea, Coffee, Rubber, Eucalyptus)",
      "Iron ore and bauxite mining in Goa and Karnataka ridges",
      "Subdivision of forest corridors by linear infrastructure"
    ]
  },
  {
    id: "indo-burma",
    name: "Indo-Burma Hotspot",
    tagline: "Tropical Rainforests & Ancient River Valleys",
    statesCovered: "Assam (South of Brahmaputra), Meghalaya, Manipur, Mizoram, Nagaland, Tripura",
    areaKm2: "2,373,000 km² (Global region)",
    endemicSpeciesCount: "7,000+ Vascular Plant Species",
    threatLevel: "High (Deforestation & Agricultural Shift)",
    mapRegionKey: "northeast-hills",
    svgHighlightD: "M 520 200 L 590 190 L 610 260 L 540 280 Z",
    color: "#facc15",
    description: "Encompassing India's Northeastern states south of the Brahmaputra, Indo-Burma is exceptionally rich in orchid diversity and primate species. Its complex mountain topography created micro-climates for rapid speciation.",
    keyFloraFauna: [
      { name: "Western Hoolock Gibbon (Hoolock hoolock)", icon: "fa-paw", status: "Endangered", note: "India's only ape species, famed for loud vocal calls" },
      { name: "Sangai Deer (Rucervus eldii eldii)", icon: "fa-feather", status: "Endangered", note: "The 'Dancing Deer' of Loktak Lake's floating phumdis" },
      { name: "Great Indian Hornbill (Buceros bicornis)", icon: "fa-dove", status: "Vulnerable", note: "Keystone seed disperser of dense tropical evergreen forests" },
      { name: "Nepenthes khasiana (Pitcher Plant)", icon: "fa-seedling", status: "Endangered", note: "Carnivorous pitcher plant endemic to Meghalaya hills" }
    ],
    ecologicalCriteria: {
      endemicPlants: 7000,
      habitatLossPercent: 95,
      protectedAreaPercent: 10
    },
    threats: [
      "Jhum (slash-and-burn) agricultural shifting cycles shortening",
      "Commercial timber extraction and forest conversion to oil palm",
      "Poaching for wildlife trade along international border regions"
    ]
  },
  {
    id: "sundaland-nicobar",
    name: "Sundaland (Nicobar Islands)",
    tagline: "Insular Marine & Rainforest Realm",
    statesCovered: "Nicobar Island Chain (Andaman & Nicobar Islands UT)",
    areaKm2: "1,500,000 km² (Global region)",
    endemicSpeciesCount: "15,000+ Plant Species (Sundaland Realm)",
    threatLevel: "Critical (Tsunami Vulnerability & Coastal Shifts)",
    mapRegionKey: "nicobar-archipelago",
    svgHighlightD: "M 570 380 L 590 380 L 595 440 L 575 440 Z",
    color: "#e879f9",
    description: "The Nicobar Islands mark the northernmost boundary of the vast Sundaland hotspot. Isolated from continental Asia for millions of years, these oceanic islands boast unique coastal mangroves, lowland rainforests, and coral reefs.",
    keyFloraFauna: [
      { name: "Nicobar Megapode (Megapodius nicobariensis)", icon: "fa-kiwi-bird", status: "Vulnerable", note: "Mound-building bird that uses geothermal heat for incubation" },
      { name: "Nicobar Tree Shrew (Tupaia nicobarica)", icon: "fa-paw", status: "Endangered", note: "Diurnal arboreal mammal endemic to Great Nicobar" },
      { name: "Coconut Crab (Birgus latro)", icon: "fa-disease", status: "Vulnerable", note: "World's largest land-living arthropod" },
      { name: "Dugong / Sea Cow (Dugong dugon)", icon: "fa-fish", status: "Vulnerable", note: "Marine herbivore feeding on pristine island seagrass beds" }
    ],
    ecologicalCriteria: {
      endemicPlants: 15000,
      habitatLossPercent: 92,
      protectedAreaPercent: 18
    },
    threats: [
      "Coastal erosion and habitat inundation from extreme weather events",
      "Encroachment on fragile island ecosystems and introduction of invasive species",
      "Plastic pollution in marine corridors and sea turtle nesting beaches"
    ]
  }
];

/**
 * Validates dataset.
 */
function validateBiodiversityData(data) {
  if (!Array.isArray(data)) return { isValid: false, errors: ["Data is not an array"] };
  const errors = [];
  data.forEach((item, idx) => {
    if (!item.id) errors.push(`Hotspot at index ${idx} missing id`);
    if (!item.name) errors.push(`Hotspot ${item.id || idx} missing name`);
    if (!Array.isArray(item.keyFloraFauna) || item.keyFloraFauna.length === 0) {
      errors.push(`Hotspot ${item.id || idx} missing keyFloraFauna`);
    }
    if (!item.ecologicalCriteria || !item.ecologicalCriteria.endemicPlants) {
      errors.push(`Hotspot ${item.id || idx} missing ecologicalCriteria`);
    }
  });
  return { isValid: errors.length === 0, errors };
}

/**
 * Retrieves hotspot by ID.
 */
function getHotspotById(id, dataset = BIODIVERSITY_HOTSPOTS_DATA) {
  if (!id) return dataset[0];
  const match = dataset.find(h => h.id.toLowerCase() === id.toLowerCase().trim());
  return match || dataset[0];
}

/**
 * Calculates conservation priority score based on habitat loss and endemic plants.
 */
function calculateHotspotPriorityScore(habitatLossPercent, endemicPlants) {
  const lossScore = Math.min(100, Math.max(0, habitatLossPercent));
  const endemicBonus = Math.min(50, (endemicPlants / 500) * 5);
  return Math.round((lossScore * 0.7 + endemicBonus * 0.3) * 10) / 10;
}

// Browser Interactive UI Logic
let activeHotspotId = "himalaya";

function renderHotspotUI(hotspotId) {
  const hotspot = getHotspotById(hotspotId);
  activeHotspotId = hotspot.id;

  const card = document.getElementById('hotspot-detail-card');
  const svgPath = document.getElementById('map-region-highlight');

  if (svgPath) {
    svgPath.setAttribute('d', hotspot.svgHighlightD);
    svgPath.setAttribute('fill', hotspot.color);
    svgPath.setAttribute('stroke', hotspot.color);
  }

  if (card) {
    const priorityScore = calculateHotspotPriorityScore(hotspot.ecologicalCriteria.habitatLossPercent, hotspot.ecologicalCriteria.endemicPlants);
    card.innerHTML = `
      <div class="hotspot-badge" style="background: ${hotspot.color}22; color: ${hotspot.color}; border: 1px solid ${hotspot.color}55;">
        ${hotspot.threatLevel}
      </div>
      <h2 class="hotspot-title">${hotspot.name}</h2>
      <p class="hotspot-tagline">${hotspot.tagline}</p>

      <div class="hotspot-meta-bar">
        <div><strong>States/UTs:</strong> ${hotspot.statesCovered}</div>
        <div><strong>Endemic Plants:</strong> ${hotspot.endemicSpeciesCount}</div>
        <div><strong>Priority Score:</strong> ${priorityScore} / 100</div>
      </div>

      <p class="hotspot-desc">${hotspot.description}</p>

      <div class="flora-fauna-grid">
        <h3><i class="fas fa-leaf"></i> Key Endemic Species</h3>
        <div class="species-list">
          ${hotspot.keyFloraFauna.map(sp => `
            <div class="species-card" style="border-left: 3px solid ${hotspot.color};">
              <div class="species-name"><i class="fas ${sp.icon}"></i> ${sp.name}</div>
              <div class="species-status">IUCN: <span class="badge-status">${sp.status}</span></div>
              <div class="species-note">${sp.note}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="threats-section">
        <h3><i class="fas fa-exclamation-triangle"></i> Key Ecological Threats</h3>
        <ul>
          ${hotspot.threats.map(t => `<li><i class="fas fa-chevron-right" style="color: ${hotspot.color}"></i> ${t}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Update tabs active state
  document.querySelectorAll('.hotspot-tab-btn').forEach(btn => {
    if (btn.dataset.id === hotspot.id) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });
}

function initBiodiversityApp() {
  const tabsNav = document.getElementById('hotspots-tab-nav');
  if (tabsNav) {
    tabsNav.innerHTML = BIODIVERSITY_HOTSPOTS_DATA.map((h, idx) => `
      <button class="hotspot-tab-btn ${idx === 0 ? 'active' : ''}" data-id="${h.id}" aria-label="Select ${h.name}">
        <span class="tab-color-dot" style="background: ${h.color};"></span>
        <span class="tab-title">${h.name}</span>
      </button>
    `).join('');

    tabsNav.addEventListener('click', e => {
      const btn = e.target.closest('.hotspot-tab-btn');
      if (btn) {
        renderHotspotUI(btn.dataset.id);
      }
    });
  }

  // SVG Region click handlers
  document.querySelectorAll('.map-clickable-region').forEach(reg => {
    reg.addEventListener('click', () => {
      const id = reg.dataset.hotspotId;
      if (id) renderHotspotUI(id);
    });
  });

  renderHotspotUI("himalaya");
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initBiodiversityApp);
}

export {
  BIODIVERSITY_HOTSPOTS_DATA,
  validateBiodiversityData,
  getHotspotById,
  calculateHotspotPriorityScore
};
