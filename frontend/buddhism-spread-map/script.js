/**
 * Historical Transmission of Buddhism Engine
 * Interactive map vectors, historical era stepper, and neutral, scholarly fact cards.
 */

export const BUDDHISM_ERAS_DATA = [
  {
    id: 0,
    title: "Origins in Ancient Magadha & Ganges Basin",
    timeframe: "5th Century BCE",
    summary: "Following the enlightenment of Siddhartha Gautama at Bodh Gaya and first sermon at Sarnath, monastic communities (Sangha) formed across ancient Magadha, Kashi, and Kosala in northern India.",
    routes: [],
    highlights: [
      { title: "Bodh Gaya & Sarnath", desc: "Core monastic learning centers in the Ganges plain." },
      { title: "First Council at Rajgir", desc: "Monastic assembly compiling initial oral sutra traditions." }
    ]
  },
  {
    id: 1,
    title: "Mauryan Expansion under Emperor Ashoka",
    timeframe: "3rd Century BCE (c. 268–232 BCE)",
    summary: "Emperor Ashoka unified major parts of the Indian subcontinent and dispatched diplomatic emissaries (Dharmamahatras) to Sri Lanka, Gandhara, Central Asia, and Hellenistic kingdoms in the Mediterranean.",
    routes: [
      { d: "M 360 260 Q 380 340 388 455", label: "To Sri Lanka (Mahinda & Sanghamitta)" },
      { d: "M 360 260 Q 300 200 280 150", label: "To Gandhara & Silk Road" }
    ],
    highlights: [
      { title: "Edicts of Ashoka", desc: "Inscribed pillars and rock edicts promoting ethics across India." },
      { title: "Mission to Sri Lanka", desc: "Ashoka's son Mahinda established the Mahavihara tradition in Anuradhapura." }
    ]
  },
  {
    id: 2,
    title: "Southern Maritime & Terrestrial Routes",
    timeframe: "3rd Century BCE – 5th Century CE",
    summary: "Theravada traditions spread along ancient maritime trade routes across the Bay of Bengal into Myanmar, Thailand, Cambodia, and the Indonesian archipelago.",
    routes: [
      { d: "M 360 260 Q 380 340 388 455", label: "Sri Lanka Route" },
      { d: "M 360 260 Q 460 320 560 320", label: "Maritime Southeast Asia Route" }
    ],
    highlights: [
      { title: "Suvarnabhumi Transmission", desc: "Early maritime trade links connecting Kalinga and South Indian ports with Southeast Asia." },
      { title: "Pali Canon Preservation", desc: "Preservation of foundational Theravada scriptures in Sri Lanka." }
    ]
  },
  {
    id: 3,
    title: "Silk Road & Transmission to East Asia",
    timeframe: "1st Century – 7th Century CE",
    summary: "Through Kushan empire trade networks across the Pamir Mountains and Taklamakan desert, Buddhist texts were translated into Chinese at Dunhuang, Luoyang, and Chang'an, eventually reaching Korea and Japan.",
    routes: [
      { d: "M 360 260 Q 300 200 280 150", label: "Northwest India to Central Asia" },
      { d: "M 280 150 Q 420 120 580 160", label: "Silk Road to Chang'an" },
      { d: "M 580 160 Q 680 150 740 180", label: "To Korea & Japan" }
    ],
    highlights: [
      { title: "Scholar-Translators", desc: "Kumarajiva and Xuanzang translated hundreds of Sanskrit manuscripts into Chinese." },
      { title: "Mogao Caves at Dunhuang", desc: "Vast cave temple library and mural complex along the Silk Road." }
    ]
  },
  {
    id: 4,
    title: "Himalayan & Tibetan Transmission",
    timeframe: "7th Century – 8th Century CE",
    summary: "Tantric and Vajrayana scholarly traditions from Nalanda and Vikramashila universities were invited to Tibet under King Songtsen Gampo and King Trisong Detsen, establishing Himalayan Buddhism.",
    routes: [
      { d: "M 360 260 Q 370 210 390 190", label: "Nalanda to Lhasa (Tibet)" }
    ],
    highlights: [
      { title: "Nalanda Scholastic Tradition", desc: "Scholars like Shantarakshita and Padmasambhava founded Samye Monastery." },
      { title: "Tibetan Kanjur & Tanjur", desc: "Systematic translation and preservation of Indian philosophical treatises." }
    ]
  }
];

export function getCumulativeRoutes(eraIndex) {
  const selectedIndex = Math.max(0, Math.min(eraIndex, BUDDHISM_ERAS_DATA.length - 1));
  let combinedRoutes = [];
  for (let i = 0; i <= selectedIndex; i++) {
    combinedRoutes = combinedRoutes.concat(BUDDHISM_ERAS_DATA[i].routes);
  }
  return combinedRoutes;
}

export function renderEraDetails(eraIndex) {
  const era = BUDDHISM_ERAS_DATA[eraIndex] || BUDDHISM_ERAS_DATA[0];

  const highlightsHtml = era.highlights.map(h => `
    <div class="highlight-card">
      <h3>${h.title}</h3>
      <p>${h.desc}</p>
    </div>
  `).join('');

  return `
    <div class="era-detail-card">
      <h2>${era.title}</h2>
      <div class="timeframe">🗓️ Time Period: ${era.timeframe}</div>
      <p>${era.summary}</p>
      <div class="key-highlights-grid">
        ${highlightsHtml}
      </div>
    </div>
  `;
}

// DOM Setup
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    let currentEra = 0;

    const routesLayer = document.getElementById('routes-layer');
    const detailContainer = document.getElementById('era-detail-container');
    const eraBtns = document.querySelectorAll('.era-btn');

    function updateView(eraIdx) {
      currentEra = eraIdx;
      const routes = getCumulativeRoutes(currentEra);

      if (routesLayer) {
        routesLayer.innerHTML = routes.map((r, idx) => `
          <path class="route-vector" d="${r.d}" fill="none" stroke="url(#routeGrad)" stroke-width="4" stroke-linecap="round" marker-end="url(#arrow)" filter="url(#glow-effect)" />
        `).join('');
      }

      if (detailContainer) {
        detailContainer.innerHTML = renderEraDetails(currentEra);
      }

      eraBtns.forEach(btn => {
        const isActive = parseInt(btn.getAttribute('data-era'), 10) === currentEra;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    eraBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-era'), 10);
        updateView(idx);
      });
    });

    // Initial view
    updateView(0);
  });
}
