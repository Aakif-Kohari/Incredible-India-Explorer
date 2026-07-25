/**
 * green-revolution.js
 * Animated Explainer: The Green Revolution in India - Dataset & Interactive Engine
 * Pure Vanilla JavaScript with ESM export support for Vitest unit testing.
 */

// Historical Yield Comparison Dataset (Pre vs Post Green Revolution)
export const yieldComparisonData = [
  {
    crop: "Wheat",
    unit: "kg / hectare",
    pre1960: 850,
    post1980: 1850,
    modern2020: 3500,
    growthPercent: 311,
    icon: "🌾",
    description: "Wheat experienced the most dramatic yield surge, transforming India from a grain importer to a net exporter."
  },
  {
    crop: "Rice (Paddy)",
    unit: "kg / hectare",
    pre1960: 1000,
    post1980: 1350,
    modern2020: 2700,
    growthPercent: 170,
    icon: "🍚",
    description: "Introduction of semi-dwarf IR8 and IR20 varieties doubled paddy production in irrigated river basins."
  },
  {
    crop: "Total Foodgrain Production",
    unit: "Million Tonnes",
    pre1960: 82,
    post1980: 130,
    modern2020: 315,
    growthPercent: 284,
    icon: "📦",
    description: "Overall national foodgrain output multiplied nearly fourfold, securing national food reserves."
  },
  {
    crop: "Tubewell & Irrigation Coverage",
    unit: "Million Hectares",
    pre1960: 24,
    post1980: 38,
    modern2020: 68,
    growthPercent: 183,
    icon: "💧",
    description: "Expansive electric & diesel tubewell installation replaced reliance on erratic monsoon rainfall."
  }
];

// Key Technological Pillars
export const pillarsOfRevolution = [
  {
    id: "p-1",
    title: "High-Yielding Variety (HYV) Seeds",
    icon: "🌱",
    keyFigures: "Dr. M.S. Swaminathan & Dr. Norman Borlaug",
    description: "Semidwarf, high-response wheat strains (Kalyan Sona, Sonalika) and miracle rice (IR8) that matured faster and resisted wind lodging.",
    techDetails: "Bred short, sturdy stems allowing plants to support heavy grain heads without falling over during monsoon storms."
  },
  {
    id: "p-2",
    title: "Expansion of Controlled Irrigation",
    icon: "💧",
    keyFigures: "Canal & Ground Water Engineers",
    description: "Construction of major canal networks (Bhakra Nangal) and rapid deployment of deep diesel & electric tubewells.",
    techDetails: "Shifted agriculture from rainfed uncertainty to guaranteed multi-cropping cycles per year."
  },
  {
    id: "p-3",
    title: "Chemical Fertilizers & Protection",
    icon: "🧪",
    keyFigures: "Ministry of Food & Agriculture",
    description: "Subsidized distribution of Nitrogen-Phosphorus-Potassium (NPK) fertilizers and chemical pesticides.",
    techDetails: "HYV seeds required high nutrient inputs to achieve full genetic yield potential."
  },
  {
    id: "p-4",
    title: "Price Support & Institutional Buffer",
    icon: "🏛️",
    keyFigures: "Food Corporation of India (FCI) & CACP",
    description: "Establishment of Minimum Support Price (MSP) and FCI grain silos to ensure fair farmer returns and national grain security.",
    techDetails: "Guaranteed government procurement eliminated price crash risks during harvest gluts."
  }
];

// Balanced Impact Analysis (Documented Benefits vs Documented Ecological & Social Concerns)
export const impactAnalysis = {
  benefits: [
    {
      id: "b-1",
      title: "Elimination of Famines & Ship-to-Mouth Crisis",
      icon: "🛡️",
      summary: "Ended India's dependence on US PL-480 food grain imports, achieving national food self-sufficiency by 1974."
    },
    {
      id: "b-2",
      title: "Rural Prosperity & Buffer Stocks",
      icon: "🌾",
      summary: "Boosted farmer incomes in Punjab, Haryana, and Western UP, creating national strategic grain reserves for drought years."
    },
    {
      id: "b-3",
      title: "Agro-Industrial Multiplier",
      icon: "🚜",
      summary: "Spurred indigenous tractor manufacturing, pump-set engineering, chemical processing, and transport logistics."
    }
  ],
  drawbacks: [
    {
      id: "d-1",
      title: "Groundwater Depletion & Water Table Crisis",
      icon: "🚰",
      summary: "Intensive water requirements of paddy-wheat crop rotations led to critical water table decline in Punjab and Haryana."
    },
    {
      id: "d-2",
      title: "Soil Salinization & Chemical Overuse",
      icon: "⚠️",
      summary: "Excessive NPK fertilizer use without organic matter caused soil micronutrient imbalance and soil crusting."
    },
    {
      id: "d-3",
      title: "Loss of Crop Diversity (Monoculture)",
      icon: "🍂",
      summary: "Displaced nutrient-dense traditional coarse cereals and millets (Jowar, Bajra, Ragi) in favor of paddy and wheat."
    },
    {
      id: "d-4",
      title: "Inter-Regional Economic Disparities",
      icon: "⚖️",
      summary: "Initial gains concentrated in irrigated northwest regions, leaving rain-fed smallholders initially lagging behind."
    }
  ]
};

// Historical Timeline Eras
export const timelineEras = [
  {
    year: "1965–1966",
    title: "Food Crisis & Famine Threat",
    description: "Back-to-back severe droughts forced India to import wheat under PL-480. Leaders prioritized agricultural transformation."
  },
  {
    year: "1967–1978",
    title: "First Phase: HYV Wheat Revolution",
    description: "High-Yielding wheat varieties introduced across Punjab, Haryana, and Western UP, resulting in record harvests."
  },
  {
    year: "1980s",
    title: "Second Phase: Rice & Geographical Expansion",
    description: "Technological adoption extended into Andhra Pradesh, Tamil Nadu, West Bengal, and Bihar."
  },
  {
    year: "2000s–Present",
    title: "Evergreen Revolution & Sustainable Agriculture",
    description: "Renewed focus on natural farming, millet revival (International Year of Millets), micro-irrigation, and soil health."
  }
];

/**
 * Calculate yield growth percentage.
 */
export function calculateYieldGrowth(preValue, postValue) {
  if (!preValue || preValue <= 0) return 0;
  return Math.round(((postValue - preValue) / preValue) * 100);
}

/**
 * Get crop yield profile by crop name.
 */
export function getYieldDataByCrop(cropName, list = yieldComparisonData) {
  if (!cropName || !Array.isArray(list)) return undefined;
  const target = cropName.trim().toLowerCase();
  return list.find(c => c.crop.toLowerCase().includes(target));
}

/**
 * Get impact items by type ('benefits' or 'drawbacks').
 */
export function getImpactsByCategory(category, data = impactAnalysis) {
  if (!category || !data) return [];
  const target = category.trim().toLowerCase();
  if (target === "benefits") return data.benefits || [];
  if (target === "drawbacks" || target === "concerns") return data.drawbacks || [];
  return [...(data.benefits || []), ...(data.drawbacks || [])];
}

/**
 * Filter topics across yield data, pillars, and impacts.
 */
export function filterGreenRevolutionTopics(query = "") {
  const q = query.trim().toLowerCase();
  if (!q) {
    return {
      yields: yieldComparisonData,
      pillars: pillarsOfRevolution,
      benefits: impactAnalysis.benefits,
      drawbacks: impactAnalysis.drawbacks
    };
  }

  return {
    yields: yieldComparisonData.filter(y => y.crop.toLowerCase().includes(q) || y.description.toLowerCase().includes(q)),
    pillars: pillarsOfRevolution.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    benefits: impactAnalysis.benefits.filter(b => b.title.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q)),
    drawbacks: impactAnalysis.drawbacks.filter(d => d.title.toLowerCase().includes(q) || d.summary.toLowerCase().includes(q))
  };
}

/* ==========================================================================
   BROWSER DOM & ANIMATED CHART ENGINE
   ========================================================================== */

if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.greenRevYieldData = yieldComparisonData;
  window.greenRevPillars = pillarsOfRevolution;
  window.greenRevImpacts = impactAnalysis;
  window.greenRevEras = timelineEras;
  window.calculateYieldGrowth = calculateYieldGrowth;
  window.getYieldDataByCrop = getYieldDataByCrop;
  window.getImpactsByCategory = getImpactsByCategory;
  window.filterGreenRevolutionTopics = filterGreenRevolutionTopics;

  document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const searchInput = document.getElementById("explainer-search");
    const chartContainer = document.getElementById("animated-chart-bars");
    const tabBtns = document.querySelectorAll(".btn-impact-tab");
    const impactCardsContainer = document.getElementById("impact-cards-grid");
    const animatedFieldWater = document.getElementById("animated-field-water");

    let currentImpactTab = "all";

    // Render Animated Yield Comparison Chart
    function renderYieldChart() {
      if (!chartContainer) return;
      chartContainer.innerHTML = "";

      yieldComparisonData.forEach(item => {
        const maxVal = Math.max(item.pre1960, item.post1980, item.modern2020);

        const group = document.createElement("div");
        group.className = "chart-crop-group";

        group.innerHTML = `
          <div class="crop-group-header">
            <span class="crop-icon">${item.icon}</span>
            <h3>${item.crop} <span class="crop-unit">(${item.unit})</span></h3>
            <span class="growth-tag">+${item.growthPercent}% Total Growth</span>
          </div>

          <div class="bars-wrapper">
            <div class="bar-col">
              <span class="bar-val">${item.pre1960}</span>
              <div class="bar-fill bar-pre" style="height: ${(item.pre1960 / maxVal) * 100}%"></div>
              <span class="bar-label">1960 (Pre-Green)</span>
            </div>

            <div class="bar-col">
              <span class="bar-val">${item.post1980}</span>
              <div class="bar-fill bar-post" style="height: ${(item.post1980 / maxVal) * 100}%"></div>
              <span class="bar-label">1980 (Post-HYV)</span>
            </div>

            <div class="bar-col">
              <span class="bar-val">${item.modern2020}</span>
              <div class="bar-fill bar-modern" style="height: ${(item.modern2020 / maxVal) * 100}%"></div>
              <span class="bar-label">2020 (Modern)</span>
            </div>
          </div>
          <p class="crop-desc">${item.description}</p>
        `;

        chartContainer.appendChild(group);
      });
    }

    // Render Impact Analysis Cards (Balanced Dual Framing)
    function renderImpactCards() {
      if (!impactCardsContainer) return;
      impactCardsContainer.innerHTML = "";

      const query = searchInput ? searchInput.value : "";
      const filtered = filterGreenRevolutionTopics(query);

      let itemsToRender = [];
      if (currentImpactTab === "all" || currentImpactTab === "benefits") {
        itemsToRender.push(...filtered.benefits.map(b => ({ ...b, type: "benefit" })));
      }
      if (currentImpactTab === "all" || currentImpactTab === "drawbacks") {
        itemsToRender.push(...filtered.drawbacks.map(d => ({ ...d, type: "drawback" })));
      }

      if (itemsToRender.length === 0) {
        impactCardsContainer.innerHTML = `
          <div class="empty-msg-card">
            <h3>No Analysis Found</h3>
            <p>Try searching for keywords like food security, groundwater, NPK, or rice.</p>
          </div>
        `;
        return;
      }

      itemsToRender.forEach(item => {
        const card = document.createElement("div");
        card.className = `impact-card ${item.type === "benefit" ? "card-benefit" : "card-drawback"}`;

        card.innerHTML = `
          <div class="card-header">
            <span class="impact-icon">${item.icon}</span>
            <span class="impact-tag">${item.type === "benefit" ? "✅ Benefit" : "⚠️ Ecological Concern"}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
        `;

        impactCardsContainer.appendChild(card);
      });
    }

    // Interactive Tab Listener
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentImpactTab = btn.dataset.tab;
        renderImpactCards();
      });
    });

    // Search Listener
    searchInput?.addEventListener("input", renderImpactCards);

    // Initializations
    renderYieldChart();
    renderImpactCards();
  });
}
