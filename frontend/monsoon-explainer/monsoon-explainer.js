/**
 * monsoon-explainer.js
 * Scientific Animated Explainer: How the Indian Monsoon System Works
 *
 * IMD-backed scientific data model, SW vs NE monsoon mode switching,
 * SVG wind path dashoffset calculation, and interactive phase step controller.
 */

export const MONSOON_DATA = {
  sw: {
    id: "sw",
    title: "Southwest Monsoon (Summer / Advancing)",
    months: "June – September",
    rainfallShare: "75% – 90% of India's Total Annual Rainfall",
    direction: "South-West to North-East",
    origin: "Indian Ocean & Equatorial Waters",
    summary: "Created by intense differential heating over the Thar Desert and Indo-Gangetic Plains. Moisture-laden ocean winds sweep from the southwest, splitting into the Arabian Sea and Bay of Bengal branches.",
    mechanism: "During summer (May–June), intense solar radiation heats the northern Indian landmass far more rapidly than the surrounding ocean, establishing a powerful thermal low-pressure trough (ITCZ). Southeasterly trade winds crossing the equator deflect to the right due to the Coriolis Force, becoming moisture-rich Southwesterly winds.",
    branches: [
      {
        name: "Arabian Sea Branch",
        desc: "Strikes the Western Ghats perpendicularly, causing heavy orographic precipitation along the Konkan and Malabar coasts (over 250 cm rain), before crossing the Deccan Plateau."
      },
      {
        name: "Bay of Bengal Branch",
        desc: "Moves across the Bay of Bengal, hitting the Arakan Hills and Meghalaya Plateau (Mawsynram/Cherrapunji), then turns westward along the Himalayas across the Gangetic Plains."
      }
    ],
    phases: [
      {
        step: 1,
        title: "Phase 1: Differential Heating & ITCZ Northward Shift",
        period: "May – Early June",
        desc: "Land surface temperatures over North India exceed 45°C. The Intertropical Convergence Zone (ITCZ) shifts northward over the Gangetic Plain, generating an intense low-pressure cell that acts as a atmospheric vacuum."
      },
      {
        step: 2,
        title: "Phase 2: Monsoon Onset over Kerala",
        period: "June 1 – June 5",
        desc: "The monsoon officially arrives over the southern tip of Kerala ('Monsoon Burst'). Strong southwesterly winds (30–40 knots) bring thunderous rains and a sudden drop in regional temperatures."
      },
      {
        step: 3,
        title: "Phase 3: Dual Branch Advance Across India",
        period: "June 10 – July 15",
        desc: "The Arabian Sea branch advances up the west coast and central India, while the Bay of Bengal branch sweeps into the North-East and Ganga basin, uniting over Punjab and Rajasthan by mid-July."
      },
      {
        step: 4,
        title: "Phase 4: Peak Rainfall & Kharif Agriculture",
        period: "July – August",
        desc: "Widespread monsoon depressions bring critical rainfall to India's agricultural heartland, filling major river reservoirs and driving the sowing of Kharif crops (rice, cotton, sugarcane, pulses)."
      }
    ],
    windPaths: [
      { id: "sw-path-arabian", label: "Arabian Sea Branch Path", pathD: "M 150 480 Q 200 400 240 320 T 320 200" },
      { id: "sw-path-bay", label: "Bay of Bengal Branch Path", pathD: "M 320 480 Q 420 380 440 260 T 380 140" }
    ]
  },
  ne: {
    id: "ne",
    title: "Northeast Monsoon (Winter / Retreating)",
    months: "October – December",
    rainfallShare: "48% of Tamil Nadu's Annual Rainfall",
    direction: "North-East to South-West",
    origin: "Eurasian Landmass & Bay of Bengal",
    summary: "Triggered as the Indian landmass cools rapidly in autumn, establishing high pressure over Northern India. Dry continental winds reverse direction, pick up moisture over the Bay of Bengal, and deposit rain along the Coromandel Coast.",
    mechanism: "With the southward migration of the sun toward the Tropic of Capricorn in autumn, the ITCZ retreats southward. High atmospheric pressure forms over Tibet and Northwest India. Winds reverse direction, blowing from the cool northeast landmass toward the warm low-pressure ocean waters.",
    branches: [
      {
        name: "Continental Dry Branch",
        desc: "Blowing over the dry landmass of Northern and Central India, bringing clear skies and cool temperatures across North India."
      },
      {
        name: "Coromandel Coastal Branch",
        desc: "As winds cross the Bay of Bengal, they absorb significant ocean moisture, striking the Coromandel Coast (Tamil Nadu, Puducherry, Coastal Andhra Pradesh)."
      }
    ],
    phases: [
      {
        step: 1,
        title: "Phase 1: ITCZ Southward Retreat",
        period: "September 15 – October 1",
        desc: "Solar radiation shifts southward. The low-pressure trough weakens over Northern India and retreats from Rajasthan and Punjab."
      },
      {
        step: 2,
        title: "Phase 2: Wind Reversal & High Pressure Build-up",
        period: "October 1 – October 15",
        desc: "A high-pressure cell forms over the cold Eurasian and Tibetan landmass. Surface winds reverse direction from southwesterly to northeasterly."
      },
      {
        step: 3,
        title: "Phase 3: Bay of Bengal Moisture Absorption",
        period: "October 15 – November 15",
        desc: "Northeasterly winds sweep over the warm Bay of Bengal, picking up abundant water vapor before reaching southern India."
      },
      {
        step: 4,
        title: "Phase 4: Coromandel Coast Rainfall & Rabi Crops",
        period: "November – December",
        desc: "Heavy winter precipitation falls on Tamil Nadu, Puducherry, and Rayalaseema, recharging groundwater and supporting Rabi crop cultivation in Southern India."
      }
    ],
    windPaths: [
      { id: "ne-path-continental", label: "Continental Retreat Path", pathD: "M 380 140 Q 340 240 300 320" },
      { id: "ne-path-coastal", label: "Bay of Bengal Coastal Path", pathD: "M 460 220 Q 420 340 320 440" }
    ]
  }
};

/**
 * Gets mode dataset ('sw' vs 'ne').
 *
 * @param {string} mode - 'sw' or 'ne'
 * @param {Object} data - Dataset
 * @returns {Object} Mode data object
 */
export function getMonsoonModeData(mode = "sw", data = MONSOON_DATA) {
  const safeMode = (mode || "sw").toLowerCase().trim();
  return data[safeMode] || data.sw;
}

/**
 * Retrieves specific phase details for a given mode and phase step index (1 to 4).
 *
 * @param {string} mode - 'sw' or 'ne'
 * @param {number} stepIndex - 1-based step index
 * @param {Object} data - Dataset
 * @returns {Object|null} Phase detail object
 */
export function getPhaseDetails(mode = "sw", stepIndex = 1, data = MONSOON_DATA) {
  const modeData = getMonsoonModeData(mode, data);
  if (!modeData || !modeData.phases) return null;
  const idx = Math.max(0, Math.min(modeData.phases.length - 1, stepIndex - 1));
  return modeData.phases[idx];
}

/**
 * Calculates SVG stroke-dashoffset value for animated wind paths.
 *
 * @param {number} progressPct - 0 to 100
 * @param {number} pathLength - Total SVG path length in pixels
 * @returns {number} Dash offset value in pixels
 */
export function calculateWindPathDashOffset(progressPct = 0, pathLength = 500) {
  const pct = Math.max(0, Math.min(100, progressPct));
  const offset = pathLength * (1 - pct / 100);
  return Math.round(offset);
}

/**
 * Scientific data validator ensuring dataset completeness.
 *
 * @param {Object} data
 * @returns {Object} { isValid: boolean, errors: Array<string> }
 */
export function validateScientificData(data = MONSOON_DATA) {
  const errors = [];
  ["sw", "ne"].forEach(mode => {
    if (!data[mode]) {
      errors.push(`Missing monsoon mode: ${mode}`);
      return;
    }
    const m = data[mode];
    if (!m.title || !m.mechanism || !m.phases || !Array.isArray(m.phases)) {
      errors.push(`Incomplete structure in mode ${mode}`);
    } else if (m.phases.length < 4) {
      errors.push(`Mode ${mode} must contain at least 4 scientific phases`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

/* --- Interactive DOM Controller --- */

class MonsoonExplainerApp {
  constructor() {
    this.currentMode = "sw";
    this.currentStep = 1;

    this.initElements();
    this.bindEvents();
    this.renderActiveMode();
  }

  initElements() {
    this.btnModeSw = document.getElementById("btn-mode-sw");
    this.btnModeNe = document.getElementById("btn-mode-ne");

    this.heroTitleEl = document.getElementById("explainer-mode-title");
    this.heroSubtitleEl = document.getElementById("explainer-mode-sub");
    
    this.mechanismTextEl = document.getElementById("mechanism-text");
    this.branchesListEl = document.getElementById("branches-list");
    this.phasesContainerEl = document.getElementById("phases-container");

    this.svgWindGroupSw = document.getElementById("svg-wind-sw");
    this.svgWindGroupNe = document.getElementById("svg-wind-ne");

    this.stepPrevBtn = document.getElementById("step-prev");
    this.stepNextBtn = document.getElementById("step-next");
    this.stepIndicatorEl = document.getElementById("step-indicator");
  }

  bindEvents() {
    if (this.btnModeSw) {
      this.btnModeSw.addEventListener("click", () => this.switchMode("sw"));
    }
    if (this.btnModeNe) {
      this.btnModeNe.addEventListener("click", () => this.switchMode("ne"));
    }

    if (this.stepPrevBtn) {
      this.stepPrevBtn.addEventListener("click", () => this.changeStep(-1));
    }
    if (this.stepNextBtn) {
      this.stepNextBtn.addEventListener("click", () => this.changeStep(1));
    }

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
      });
    }
  }

  switchMode(newMode) {
    this.currentMode = newMode;
    this.currentStep = 1;

    if (this.btnModeSw && this.btnModeNe) {
      this.btnModeSw.classList.toggle("active", newMode === "sw");
      this.btnModeNe.classList.toggle("active", newMode === "ne");

      this.btnModeSw.setAttribute("aria-pressed", newMode === "sw");
      this.btnModeNe.setAttribute("aria-pressed", newMode === "ne");
    }

    this.renderActiveMode();
  }

  changeStep(delta) {
    const modeData = getMonsoonModeData(this.currentMode, MONSOON_DATA);
    const maxSteps = modeData.phases.length;
    this.currentStep = Math.max(1, Math.min(maxSteps, this.currentStep + delta));

    this.updateStepUI();
  }

  renderActiveMode() {
    const modeData = getMonsoonModeData(this.currentMode, MONSOON_DATA);

    if (this.heroTitleEl) this.heroTitleEl.textContent = modeData.title;
    if (this.heroSubtitleEl) this.heroSubtitleEl.textContent = `${modeData.months} • ${modeData.rainfallShare}`;
    if (this.mechanismTextEl) this.mechanismTextEl.textContent = modeData.mechanism;

    // Branches render
    if (this.branchesListEl) {
      this.branchesListEl.innerHTML = modeData.branches
        .map(b => `
          <div class="branch-card">
            <h4>${b.name}</h4>
            <p>${b.desc}</p>
          </div>
        `)
        .join("");
    }

    // Toggle SVG wind path visibility
    if (this.svgWindGroupSw && this.svgWindGroupNe) {
      if (this.currentMode === "sw") {
        this.svgWindGroupSw.style.display = "block";
        this.svgWindGroupNe.style.display = "none";
      } else {
        this.svgWindGroupSw.style.display = "none";
        this.svgWindGroupNe.style.display = "block";
      }
    }

    this.renderPhases(modeData);
    this.updateStepUI();
  }

  renderPhases(modeData) {
    if (!this.phasesContainerEl) return;
    this.phasesContainerEl.innerHTML = "";

    modeData.phases.forEach((p) => {
      const card = document.createElement("div");
      card.className = `phase-card ${p.step === this.currentStep ? 'active' : ''}`;
      card.dataset.step = p.step;

      card.innerHTML = `
        <div class="phase-header">
          <span class="phase-step-badge">Step ${p.step}</span>
          <span class="phase-period">${p.period}</span>
        </div>
        <h3 class="phase-title">${p.title}</h3>
        <p class="phase-desc">${p.desc}</p>
      `;

      card.addEventListener("click", () => {
        this.currentStep = p.step;
        this.updateStepUI();
      });

      this.phasesContainerEl.appendChild(card);
    });
  }

  updateStepUI() {
    const modeData = getMonsoonModeData(this.currentMode, MONSOON_DATA);
    const maxSteps = modeData.phases.length;

    if (this.stepIndicatorEl) {
      this.stepIndicatorEl.textContent = `Phase ${this.currentStep} of ${maxSteps}`;
    }

    if (this.stepPrevBtn) this.stepPrevBtn.disabled = this.currentStep === 1;
    if (this.stepNextBtn) this.stepNextBtn.disabled = this.currentStep === maxSteps;

    // Highlight active phase card
    const phaseCards = this.phasesContainerEl ? this.phasesContainerEl.querySelectorAll(".phase-card") : [];
    phaseCards.forEach(card => {
      const stepNum = parseInt(card.dataset.step, 10);
      card.classList.toggle("active", stepNum === this.currentStep);
    });

    // Animate SVG path dashoffset based on step
    const progressPct = (this.currentStep / maxSteps) * 100;
    const activePaths = (this.currentMode === "sw" ? this.svgWindGroupSw : this.svgWindGroupNe)
      .querySelectorAll(".animated-wind-path");

    activePaths.forEach(path => {
      const offset = calculateWindPathDashOffset(progressPct, 500);
      path.style.strokeDashoffset = `${offset}px`;
    });
  }
}

// Auto-initialize on DOM load in browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.MonsoonExplainer = {
    MONSOON_DATA,
    getMonsoonModeData,
    getPhaseDetails,
    calculateWindPathDashOffset,
    validateScientificData,
    MonsoonExplainerApp
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("explainer-mode-title")) {
      new MonsoonExplainerApp();
    }
  });
}
