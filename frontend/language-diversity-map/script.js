/**
 * language-diversity-map script.js
 * Data Viz: Language Diversity Map (Animated Reveal) (#582).
 * Progressive 3-layer animated reveal based on Census of India language data.
 */

const CENSUS_YEAR = 2011;

const LANGUAGE_REVEAL_LAYERS = [
  {
    layer: 1,
    title: "Layer 1: Top 5 National Languages",
    subtitle: "Languages spoken by >50 Million speakers each (Census of India)",
    description: "Covers the top 5 most spoken scheduled languages of India, accounting for over 65% of the total population.",
    languagesCount: 5,
    languages: [
      { id: "hindi", name: "Hindi", speakers: "528.3 Million", percent: "43.6%", family: "Indo-Aryan", script: "Devanagari", regions: "North & Central India (UP, MP, Bihar, Rajasthan, Delhi, HR, HP, UK)", color: "#38bdf8" },
      { id: "bengali", name: "Bengali", speakers: "97.2 Million", percent: "8.0%", family: "Indo-Aryan", script: "Bengali", regions: "West Bengal, Tripura, Andaman & Nicobar Islands", color: "#4ade80" },
      { id: "marathi", name: "Marathi", speakers: "83.0 Million", percent: "6.9%", family: "Indo-Aryan", script: "Devanagari", regions: "Maharashtra, Goa, Dadra & Nagar Haveli", color: "#facc15" },
      { id: "telugu", name: "Telugu", speakers: "81.1 Million", percent: "6.7%", family: "Dravidian", script: "Telugu", regions: "Andhra Pradesh, Telangana, Puducherry", color: "#e879f9" },
      { id: "tamil", name: "Tamil", speakers: "69.0 Million", percent: "5.7%", family: "Dravidian", script: "Tamil", regions: "Tamil Nadu, Puducherry, Andaman & Nicobar Islands", color: "#f87171" }
    ]
  },
  {
    layer: 2,
    title: "Layer 2: Major Regional Languages",
    subtitle: "Languages spoken by 10M to 60M speakers",
    description: "Adds 7 major regional scheduled languages representing distinct state linguistic identities.",
    languagesCount: 7,
    languages: [
      { id: "gujarati", name: "Gujarati", speakers: "55.5 Million", percent: "4.6%", family: "Indo-Aryan", script: "Gujarati", regions: "Gujarat, Daman & Diu", color: "#fb923c" },
      { id: "urdu", name: "Urdu", speakers: "50.7 Million", percent: "4.2%", family: "Indo-Aryan", script: "Perso-Arabic", regions: "Pan-India, Telangana, UP, Bihar, J&K", color: "#a855f7" },
      { id: "kannada", name: "Kannada", speakers: "43.7 Million", percent: "3.6%", family: "Dravidian", script: "Kannada", regions: "Karnataka, Goa, Maharashtra border", color: "#34d399" },
      { id: "odia", name: "Odia", speakers: "37.5 Million", percent: "3.1%", family: "Indo-Aryan", script: "Odia", regions: "Odisha, Jharkhand, Chhattisgarh border", color: "#60a5fa" },
      { id: "malayalam", name: "Malayalam", speakers: "34.8 Million", percent: "2.9%", family: "Dravidian", script: "Malayalam", regions: "Kerala, Lakshadweep, Puducherry", color: "#c084fc" },
      { id: "punjabi", name: "Punjabi", speakers: "33.1 Million", percent: "2.7%", family: "Indo-Aryan", script: "Gurmukhi", regions: "Punjab, Chandigarh, Delhi, Haryana", color: "#f43f5e" },
      { id: "assamese", name: "Assamese", speakers: "15.3 Million", percent: "1.3%", family: "Indo-Aryan", script: "Assamese-Bengali", regions: "Assam, Arunachal Pradesh border", color: "#818cf8" }
    ]
  },
  {
    layer: 3,
    title: "Layer 3: Full Linguistic Diversity & Heritage",
    subtitle: "Classical, Tribal, Sino-Tibetan & Austroasiatic languages",
    description: "Reveals India's rich mosaic of 22 Scheduled languages, 6 Classical languages, and indigenous tribal tongues.",
    languagesCount: 10,
    languages: [
      { id: "maithili", name: "Maithili", speakers: "13.6 Million", percent: "1.1%", family: "Indo-Aryan", script: "Tirhuta / Devanagari", regions: "Mithila region of Bihar & Jharkhand", color: "#a3e635" },
      { id: "santali", name: "Santali", speakers: "7.4 Million", percent: "0.6%", family: "Austroasiatic", script: "Ol Chiki", regions: "Jharkhand, Odisha, West Bengal, Bihar", color: "#eab308" },
      { id: "kashmiri", name: "Kashmiri", speakers: "6.8 Million", percent: "0.6%", family: "Dardic (Indo-Aryan)", script: "Perso-Arabic / Sharada", regions: "Kashmir Valley (J&K)", color: "#38bdf8" },
      { id: "nepali", name: "Nepali", speakers: "2.9 Million", percent: "0.2%", family: "Indo-Aryan", script: "Devanagari", regions: "Sikkim, West Bengal (Darjeeling), Assam", color: "#ec4899" },
      { id: "konkani", name: "Konkani", speakers: "2.3 Million", percent: "0.2%", family: "Indo-Aryan", script: "Devanagari / Roman", regions: "Goa, Karnataka coast, Maharashtra", color: "#22c55e" },
      { id: "dogri", name: "Dogri", speakers: "2.6 Million", percent: "0.2%", family: "Indo-Aryan", script: "Devanagari", regions: "Jammu region (J&K), Himachal Pradesh", color: "#f97316" },
      { id: "manipuri", name: "Manipuri (Meitei)", speakers: "1.8 Million", percent: "0.15%", family: "Tibeto-Burman", script: "Meitei Mayek", regions: "Manipur, Assam, Tripura", color: "#8b5cf6" },
      { id: "bodo", name: "Bodo", speakers: "1.5 Million", percent: "0.12%", family: "Tibeto-Burman", script: "Devanagari", regions: "Bodoland Territorial Region (Assam)", color: "#14b8a6" },
      { id: "sanskrit", name: "Sanskrit", speakers: "24,821 Speakers", percent: "<0.01%", family: "Indo-Aryan (Classical)", script: "Devanagari", regions: "Pan-India Classical & Liturgical language", color: "#e11d48" },
      { id: "khasi-mizo", name: "Khasi & Mizo", speakers: "2.4 Million combined", percent: "0.2%", family: "Austroasiatic & Tibeto-Burman", script: "Roman", regions: "Meghalaya & Mizoram", color: "#06b6d4" }
    ]
  }
];

const CLASSICAL_LANGUAGES = [
  "Tamil (2004)", "Sanskrit (2005)", "Telugu (2008)", "Kannada (2008)", "Malayalam (2013)", "Odia (2014)", "Pali, Prakrit, Assamese, Bengali, Marathi (2024)"
];

/**
 * Validates language diversity dataset.
 */
function validateLanguageData(layers) {
  if (!Array.isArray(layers)) return { isValid: false, errors: ["Layers is not an array"] };
  const errors = [];
  if (layers.length < 3) errors.push("Fewer than 3 reveal layers");

  layers.forEach((ly, idx) => {
    if (!ly.layer) errors.push(`Layer ${idx} missing layer number`);
    if (!Array.isArray(ly.languages) || ly.languages.length === 0) {
      errors.push(`Layer ${ly.layer || idx} missing languages`);
    }
  });

  return { isValid: errors.length === 0, errors };
}

/**
 * Gets accumulated languages up to active layer number (1, 2, or 3).
 */
function getLanguagesUpToLayer(targetLayer, dataset = LANGUAGE_REVEAL_LAYERS) {
  const boundedLayer = Math.max(1, Math.min(3, targetLayer));
  let result = [];
  for (let i = 0; i < boundedLayer; i++) {
    result = result.concat(dataset[i].languages);
  }
  return result;
}

/**
 * Counts total accumulated languages for specified layer.
 */
function countAccumulatedLanguages(targetLayer, dataset = LANGUAGE_REVEAL_LAYERS) {
  return getLanguagesUpToLayer(targetLayer, dataset).length;
}

// Browser Interactive UI Logic
let activeLayer = 1;

function renderLanguageMapUI(layerNum) {
  activeLayer = Math.max(1, Math.min(3, layerNum));
  const layerData = LANGUAGE_REVEAL_LAYERS[activeLayer - 1];
  const accumulatedLanguages = getLanguagesUpToLayer(activeLayer);

  const titleEl = document.getElementById('active-layer-title');
  const descEl = document.getElementById('active-layer-desc');
  const countEl = document.getElementById('accumulated-count');
  const gridEl = document.getElementById('language-cards-grid');

  if (titleEl) titleEl.textContent = layerData.title;
  if (descEl) descEl.textContent = layerData.description;
  if (countEl) countEl.textContent = `${accumulatedLanguages.length} Languages Revealed`;

  if (gridEl) {
    gridEl.innerHTML = accumulatedLanguages.map(lang => `
      <div class="lang-card" style="border-top: 3px solid ${lang.color};">
        <div class="lang-header">
          <h3 class="lang-title">${lang.name}</h3>
          <span class="lang-badge" style="background: ${lang.color}22; color: ${lang.color}; border: 1px solid ${lang.color}55;">${lang.family}</span>
        </div>
        <div class="lang-stats">
          <div><strong>Speakers:</strong> ${lang.speakers} (${lang.percent})</div>
          <div><strong>Script:</strong> ${lang.script}</div>
        </div>
        <div class="lang-regions"><strong>Regions:</strong> ${lang.regions}</div>
      </div>
    `).join('');
  }

  // Update step buttons active state
  document.querySelectorAll('.layer-step-btn').forEach((btn, idx) => {
    const l = idx + 1;
    if (l === activeLayer) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });

  // Animate SVG map dots/paths opacity
  document.querySelectorAll('.map-lang-overlay').forEach(el => {
    const elLayer = parseInt(el.dataset.layer, 10);
    if (elLayer <= activeLayer) {
      el.style.opacity = '1';
      el.style.transform = 'scale(1)';
    } else {
      el.style.opacity = '0';
      el.style.transform = 'scale(0.5)';
    }
  });
}

function initLanguageMapApp() {
  const stepperNav = document.getElementById('layer-stepper-nav');
  if (stepperNav) {
    stepperNav.innerHTML = LANGUAGE_REVEAL_LAYERS.map((ly, idx) => `
      <button class="layer-step-btn ${idx === 0 ? 'active' : ''}" data-layer="${ly.layer}" aria-label="Show ${ly.title}">
        <span class="step-num">Layer ${ly.layer}</span>
        <span class="step-label">${ly.languagesCount} Languages</span>
      </button>
    `).join('');

    stepperNav.addEventListener('click', e => {
      const btn = e.target.closest('.layer-step-btn');
      if (btn) {
        renderLanguageMapUI(parseInt(btn.dataset.layer, 10));
      }
    });
  }

  const nextBtn = document.getElementById('next-layer-btn');
  const prevBtn = document.getElementById('prev-layer-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (activeLayer < 3) renderLanguageMapUI(activeLayer + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeLayer > 1) renderLanguageMapUI(activeLayer - 1);
    });
  }

  // Scroll trigger reveal logic
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent < 35 && activeLayer !== 1) {
      renderLanguageMapUI(1);
    } else if (scrollPercent >= 35 && scrollPercent < 70 && activeLayer !== 2) {
      renderLanguageMapUI(2);
    } else if (scrollPercent >= 70 && activeLayer !== 3) {
      renderLanguageMapUI(3);
    }
  }, { passive: true });

  renderLanguageMapUI(1);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initLanguageMapApp);
}

export {
  CENSUS_YEAR,
  LANGUAGE_REVEAL_LAYERS,
  CLASSICAL_LANGUAGES,
  validateLanguageData,
  getLanguagesUpToLayer,
  countAccumulatedLanguages
};
