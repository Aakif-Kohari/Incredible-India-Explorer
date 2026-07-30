/**
 * Scrollytelling: The Making of the Taj Mahal Engine
 * Layer-by-layer architectural build-up animation synced to scroll,
 * historical material sourcing, structural engineering details,
 * and verified myth-busting analysis.
 */

export const TAJ_BUILD_STAGES = [
  {
    id: 'stage-wells',
    stepNumber: 1,
    title: '1631–1632: Riverbank Site & Well Foundations',
    theme: 'Engineering & Hydrogeology',
    summary: 'Engineers excavated deep wells along the Yamuna riverbank, filling them with stone, mortar, and timber columns to create a subterranean flood-resistant platform.',
    details: 'To stabilize the soft alluvial soil of Agra along the river, architects constructed a series of deep masonry wells lined with sal wood. The timber remains permanently preserved underground due to the high water table, creating an indestructible subterranean foundation raft.',
    materials: ['Sal Wood', 'Rubble Masonry', 'Lime Mortar', 'Red Sandstone'],
    progressPercentage: 16
  },
  {
    id: 'stage-plinth',
    stepNumber: 2,
    title: '1632–1635: Plinth Terrace & Sandstone Platform',
    theme: 'Structural Architecture',
    summary: 'A massive 300-meter-wide red sandstone terrace and elevated square marble plinth were raised above flood levels.',
    details: 'The lower terrace was constructed using heavy red sandstone quarried from Tantpur and Fatehpur Sikri. Atop this sandstone terrace, a secondary 7-meter-high square platform clad in white Makrana marble was built to isolate the mausoleum from moisture.',
    materials: ['Red Sandstone (Tantpur)', 'Makrana Marble (Rajasthan)'],
    progressPercentage: 33
  },
  {
    id: 'stage-core',
    stepNumber: 3,
    title: '1635–1640: Octagonal Core & Brick Scaffolding',
    theme: 'Masonry & Logistics',
    summary: 'The main octagonal tomb structure was built around a brick core, serviced by a 15-kilometer rammed-earth slope for haulage.',
    details: 'Instead of bamboo scaffolding, master builders constructed a massive brick scaffolding network matching the size of the tomb itself. Legend says Shah Jahan allowed peasants to keep any bricks they dismantled, clearing the scaffolding in a single day. A 15-km earth ramp allowed bullock teams to haul marble blocks to the upper levels.',
    materials: ['Lakhori Bricks', 'Lime Mortar (Surkhi)', 'Pulleys & Ramps'],
    progressPercentage: 50
  },
  {
    id: 'stage-dome-minarets',
    stepNumber: 4,
    title: '1640–1648: Double-Dome & Tilted Minarets',
    theme: 'Acoustics & Seismic Safety',
    summary: 'Construction of the 35-meter inner acoustic vault, 44-meter outer onion dome, and four minarets engineered to tilt slightly outward.',
    details: 'The double-dome design provides both an intimate inner ceiling scale and a majestic outer skyline presence. The four 40-meter minarets were deliberately constructed leaning outward at a slight angle (~2 degrees) so that in the event of a catastrophic earthquake, they would fall away from the main tomb.',
    materials: ['Copper Finial', 'Makrana Marble Slabs', 'Iron Straps'],
    progressPercentage: 68
  },
  {
    id: 'stage-inlay',
    stepNumber: 5,
    title: '1648–1650: Parchin Kari (Pietra Dura) & Calligraphy',
    theme: 'Artistry & Geometry',
    summary: 'Master artisans inlaid 28 varieties of gemstones into marble and carved Thuluth script Quranic verses that optically adjust for height.',
    details: 'Calligrapher Amanat Khan designed Quranic inscriptions around the iwan arches, progressively enlarging the letters higher up so they appear uniform from ground view. Over 28 semi-precious stone types were sourced from across Asia.',
    materials: ['Lapis Lazuli (Afghanistan)', 'Jade (China)', 'Turquoise (Tibet)', 'Carnelian (Arabia)', 'Jasper (Punjab)'],
    progressPercentage: 85
  },
  {
    id: 'stage-gardens',
    stepNumber: 6,
    title: '1650–1653: Charbagh Paradise Gardens & Completion',
    theme: 'Symbolism & Landscape Architecture',
    summary: 'Completion of the four-quadrant Paradise garden, reflecting pool, mosque, and Jawab guest house.',
    details: 'The Charbagh garden is divided into four quadrants representing the four rivers of Paradise mentioned in Quranic tradition (water, milk, wine, honey). The central elevated lotus pool (Al-Kawthar) mirrors the white marble monument across seasons.',
    materials: ['Cypress Trees', 'Reflecting Basin', 'Red Sandstone Mosque'],
    progressPercentage: 100
  }
];

export const TAJ_MATERIALS_ORIGINS = [
  { stone: 'White Marble', origin: 'Makrana, Rajasthan (India)', distanceKm: 400, use: 'Exterior cladding & domes' },
  { stone: 'Lapis Lazuli', origin: 'Badakhshan (Afghanistan)', distanceKm: 1800, use: 'Floral inlay leaves' },
  { stone: 'Jade & Crystal', origin: 'Hetian (China)', distanceKm: 2500, use: 'Center flowers & scrollwork' },
  { stone: 'Turquoise', origin: 'Tibet', distanceKm: 1400, use: 'Calligraphic accents' },
  { stone: 'Carnelian', origin: 'Yemen / Arabia', distanceKm: 3200, use: 'Red floral petals' },
  { stone: 'Sapphire & Corundum', origin: 'Sri Lanka', distanceKm: 2200, use: 'Intricate borders' }
];

export const HISTORICAL_MYTHS_FLAGGED = [
  {
    id: 'myth-mutilation',
    claim: 'Shah Jahan ordered the hands/eyes of artisans cut off after completion.',
    verdict: 'DISPUTED / UNFOUNDED MYTH',
    statusClass: 'myth-false',
    explanation: 'Zero contemporary 17th-century Mughal historical records (such as Abdul Hamid Lahori\'s official court chronicle Badshahnama) mention any mutilation. On the contrary, craftsmen received generous pensions, land grants, and subsequently worked on building Shahjahanabad (Old Delhi) and the Red Fort.'
  },
  {
    id: 'myth-black-taj',
    claim: 'Shah Jahan planned a identical Black Marble Taj Mahal across the Yamuna.',
    verdict: 'DISPUTED / LEGENDARY MYTH',
    statusClass: 'myth-false',
    explanation: 'Popularized by European traveler Jean-Baptiste Tavernier in 1665. Archaeological excavations conducted by the Archaeological Survey of India (ASI) at Mahtab Bagh in the 1990s revealed that the "black marble" ruins were actually blackened white marble stones and reflections in the octagonal pool.'
  },
  {
    id: 'myth-tejo-mahalaya',
    claim: 'The Taj Mahal was originally an ancient Hindu temple called Tejo Mahalaya.',
    verdict: 'DISPUTED / HISTORICALLY DEBUNKED',
    statusClass: 'myth-false',
    explanation: 'Thoroughly rejected by historians and legal rulings of Indian courts. Mughal land acquisition deeds (Farman) show Shah Jahan purchased the land plot from Raja Jai Singh of Amber in exchange for four other mansions in Agra.'
  }
];

/**
 * Get active build stage index based on scroll position
 */
export function getActiveStageIndex(scrollProgress, totalStages) {
  if (totalStages <= 0) return 0;
  const step = 100 / totalStages;
  const index = Math.floor(scrollProgress / step);
  return Math.max(0, Math.min(totalStages - 1, index));
}

/**
 * Filter material origins by search term
 */
export function filterMaterials(materials, query) {
  if (!query || query.trim() === '') return [...materials];
  const q = query.toLowerCase();
  return materials.filter(m =>
    m.stone.toLowerCase().includes(q) ||
    m.origin.toLowerCase().includes(q) ||
    m.use.toLowerCase().includes(q)
  );
}

/**
 * Stats summary calculation
 */
export function getTajConstructionStats() {
  return {
    constructionPeriod: '1631 – 1653 (22 Years)',
    workforceEstimate: '~20,000 Craftsmen',
    chiefArchitect: 'Ustad Ahmad Lahori',
    totalCostHistoric: '~32 Million Rupees (c. 1653)',
    materialsOriginsCount: TAJ_MATERIALS_ORIGINS.length,
    buildStagesCount: TAJ_BUILD_STAGES.length
  };
}

// Browser DOM initializer
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initTajScrollytelling();
  });
}

export function initTajScrollytelling() {
  const container = document.getElementById('scrollytellingContainer');
  const stageDetailsCard = document.getElementById('stageDetailsCard');
  const progressBar = document.getElementById('tajProgressBar');
  const svgLayers = document.querySelectorAll('.taj-layer-group');
  const materialsGrid = document.getElementById('materialsGrid');
  const materialSearch = document.getElementById('materialSearch');

  if (!container) return;

  function updateActiveStage(index) {
    const stage = TAJ_BUILD_STAGES[index] || TAJ_BUILD_STAGES[0];

    // Update progress bar
    if (progressBar) {
      progressBar.style.width = `${stage.progressPercentage}%`;
    }

    // Highlight active SVG illustration layers
    if (svgLayers && svgLayers.length > 0) {
      svgLayers.forEach((layer, idx) => {
        if (idx <= index) {
          layer.classList.add('visible-layer');
        } else {
          layer.classList.remove('visible-layer');
        }
      });
    }

    // Render detail card
    if (stageDetailsCard) {
      stageDetailsCard.innerHTML = `
        <div class="stage-badge">Step ${stage.stepNumber} of 6</div>
        <h2 class="stage-title">${stage.title}</h2>
        <div class="stage-theme">📍 Focus: ${stage.theme}</div>
        <p class="stage-summary">${stage.summary}</p>
        <div class="stage-details-box">
          <h4>Architectural & Engineering Deep-Dive</h4>
          <p>${stage.details}</p>
        </div>
        <div class="stage-materials-tags">
          <strong>Key Materials & Tools:</strong>
          <div class="tags-container">
            ${stage.materials.map(m => `<span class="mat-tag">${m}</span>`).join('')}
          </div>
        </div>
      `;
    }
  }

  // Handle scroll syncing
  window.addEventListener('scroll', () => {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScroll = rect.height - windowHeight;

    if (totalScroll > 0) {
      const currentScroll = Math.max(0, -rect.top);
      const percentage = Math.max(0, Math.min(100, (currentScroll / totalScroll) * 100));
      const activeIdx = getActiveStageIndex(percentage, TAJ_BUILD_STAGES.length);
      updateActiveStage(activeIdx);
    }
  });

  // Render material origins table/grid
  function renderMaterials(list) {
    if (!materialsGrid) return;
    materialsGrid.innerHTML = list.map(m => `
      <div class="material-card">
        <div class="mat-name">💎 ${m.stone}</div>
        <div class="mat-origin">📍 Origin: ${m.origin}</div>
        <div class="mat-distance">🚗 Transport Distance: ~${m.distanceKm} km</div>
        <p class="mat-use">${m.use}</p>
      </div>
    `).join('');
  }

  if (materialSearch) {
    materialSearch.addEventListener('input', (e) => {
      const filtered = filterMaterials(TAJ_MATERIALS_ORIGINS, e.target.value);
      renderMaterials(filtered);
    });
  }

  // Initial calls
  updateActiveStage(0);
  renderMaterials(TAJ_MATERIALS_ORIGINS);
}
