/**
 * union-territory-sorter.js
 * Union Territory Sorter for Incredible India Explorer
 *
 * Provides complete dataset of 28 States and 8 Union Territories of India,
 * classification checking, scoring engine, drag-and-drop & tap sorting controls.
 */

export const REGIONS_DATASET = [
  // --- 28 STATES ---
  { id: "AP", name: "Andhra Pradesh", type: "state", capital: "Amaravati", info: "Southern coastal state known for Kuchipudi classical dance and Tirupati." },
  { id: "AR", name: "Arunachal Pradesh", type: "state", capital: "Itanagar", info: "North-Eastern border state known as the Land of Dawn-Lit Mountains." },
  { id: "AS", name: "Assam", type: "state", capital: "Dispur", info: "State famous for tea plantations, Muga silk, and Kaziranga rhinos." },
  { id: "BR", name: "Bihar", type: "state", capital: "Patna", info: "Eastern state rich in ancient history, birthplace of Buddhism and Jainism." },
  { id: "CT", name: "Chhattisgarh", type: "state", capital: "Raipur", info: "Central state known for dense forests, waterfalls, and tribal heritage." },
  { id: "GA", name: "Goa", type: "state", capital: "Panaji", info: "India's smallest state by land area, famous for beaches and Portuguese history." },
  { id: "GJ", name: "Gujarat", type: "state", capital: "Gandhinagar", info: "Westernmost state with longest coastline, home to Gir Asiatic lions." },
  { id: "HR", name: "Haryana", type: "state", capital: "Chandigarh", info: "North Indian agrarian state surrounding Delhi on three sides." },
  { id: "HP", name: "Himachal Pradesh", type: "state", capital: "Shimla", info: "Himalayan mountain state popular for scenic hill stations and valleys." },
  { id: "JH", name: "Jharkhand", type: "state", capital: "Ranchi", info: "Eastern mineral-rich state carved out of Bihar in 2000." },
  { id: "KA", name: "Karnataka", type: "state", capital: "Bengaluru", info: "Southern tech & heritage state famous for Hampi and Mysuru Palace." },
  { id: "KL", name: "Kerala", type: "state", capital: "Thiruvananthapuram", info: "Southern coastal state known as God's Own Country, famous for backwaters." },
  { id: "MP", name: "Madhya Pradesh", type: "state", capital: "Bhopal", info: "Heart of India central state famous for Khajuraho temples and tiger reserves." },
  { id: "MH", name: "Maharashtra", type: "state", capital: "Mumbai", info: "India's financial hub state featuring Ajanta-Ellora caves and Western Ghats." },
  { id: "MN", name: "Manipur", type: "state", capital: "Imphal", info: "North-Eastern state known for Manipuri classical dance and Loktak Lake." },
  { id: "ML", name: "Meghalaya", type: "state", capital: "Shillong", info: "Abode of Clouds state home to Cherrapunji and living root bridges." },
  { id: "MZ", name: "Mizoram", type: "state", capital: "Aizawl", info: "North-Eastern hilly state famous for bamboo dance (Cheraw)." },
  { id: "NL", name: "Nagaland", type: "state", capital: "Kohima", info: "North-Eastern state celebrated for Hornbill Festival and diverse tribes." },
  { id: "OR", name: "Odisha", type: "state", capital: "Bhubaneswar", info: "Eastern coastal state famous for Jagannath Temple and Konark Sun Temple." },
  { id: "PB", name: "Punjab", type: "state", capital: "Bhagalpur", capital: "Chandigarh", info: "Land of Five Rivers state famous for the Golden Temple and Bhangra." },
  { id: "RJ", name: "Rajasthan", type: "state", capital: "Jaipur", info: "India's largest state by land area, famous for royal forts and Thar Desert." },
  { id: "SK", name: "Sikkim", type: "state", capital: "Gangtok", info: "Himalayan organic state home to Kangchenjunga peak." },
  { id: "TN", name: "Tamil Nadu", type: "state", capital: "Chennai", info: "Southern state famed for Dravidian temples, Bharatanatyam, and cuisine." },
  { id: "TS", name: "Telangana", type: "state", capital: "Hyderabad", info: "India's 28th state formed in 2014, famous for Charminar and Biryani." },
  { id: "TR", name: "Tripura", type: "state", capital: "Agartala", info: "North-Eastern state surrounded by Bangladesh on three sides." },
  { id: "UP", name: "Uttar Pradesh", type: "state", capital: "Lucknow", info: "India's most populous state, home to Taj Mahal, Varanasi, and Ganga." },
  { id: "UK", name: "Uttarakhand", type: "state", capital: "Dehradun", info: "Devbhumi (Land of Gods) state featuring Char Dham and Jim Corbett." },
  { id: "WB", name: "West Bengal", type: "state", capital: "Kolkata", info: "Eastern cultural state featuring Sundarbans, Darjeeling, and Durga Puja." },

  // --- 8 UNION TERRITORIES ---
  { id: "AN", name: "Andaman and Nicobar Islands", type: "ut", capital: "Port Blair", info: "Tropical island archipelago UT in Bay of Bengal featuring Cellular Jail." },
  { id: "CH", name: "Chandigarh", type: "ut", capital: "Chandigarh", info: "Planned modern city UT serving as joint capital for Punjab & Haryana." },
  { id: "DH", name: "Dadra & Nagar Haveli and Daman & Diu", type: "ut", capital: "Daman", info: "Western coastal UT formed by merger of two territories in Jan 2020." },
  { id: "DL", name: "Delhi (NCT)", type: "ut", capital: "New Delhi", info: "National Capital Territory UT housing India's parliament and historic monuments." },
  { id: "JK", name: "Jammu and Kashmir", type: "ut", capital: "Srinagar (Summer) / Jammu (Winter)", info: "Reorganized from a state into a Union Territory in October 2019." },
  { id: "LA", name: "Ladakh", type: "ut", capital: "Leh", info: "High-altitude cold desert UT established in October 2019." },
  { id: "LD", name: "Lakshadweep", type: "ut", capital: "Kavaratti", info: "Coral island archipelago UT in the Arabian Sea." },
  { id: "PY", name: "Puducherry", type: "ut", capital: "Puducherry", info: "Union Territory comprising former French colonial enclaves." }
];

/**
 * Validates the dataset integrity (checks 28 states + 8 UTs count).
 *
 * @param {Array<Object>} dataset - Dataset array
 * @returns {Object} Validation summary { isValid: boolean, statesCount: number, utCount: number }
 */
export function validateDataset(dataset = REGIONS_DATASET) {
  let statesCount = 0;
  let utCount = 0;
  const ids = new Set();
  const duplicateIds = [];

  dataset.forEach(item => {
    if (ids.has(item.id)) {
      duplicateIds.push(item.id);
    }
    ids.add(item.id);

    if (item.type === "state") statesCount++;
    if (item.type === "ut") utCount++;
  });

  const isValid = statesCount === 28 && utCount === 8 && duplicateIds.length === 0;

  return {
    isValid,
    statesCount,
    utCount,
    totalCount: dataset.length,
    duplicateIds
  };
}

/**
 * Checks whether a given target choice ('state' vs 'ut') matches the region's actual type.
 *
 * @param {string} regionId - ID of region (e.g. 'JK')
 * @param {string} targetType - Choice ('state' or 'ut')
 * @param {Array<Object>} dataset - Regions dataset
 * @returns {Object} Classification result
 */
export function checkClassification(regionId, targetType, dataset = REGIONS_DATASET) {
  const region = dataset.find(r => r.id === regionId);

  if (!region) {
    return {
      isValidRegion: false,
      isCorrect: false,
      expectedType: null,
      regionName: "Unknown Region",
      info: ""
    };
  }

  const normalizedTarget = (targetType || "").toLowerCase().trim();
  const isCorrect = region.type === normalizedTarget;

  return {
    isValidRegion: true,
    isCorrect,
    expectedType: region.type,
    regionName: region.name,
    capital: region.capital,
    info: region.info
  };
}

/**
 * Returns a non-mutated, randomly shuffled copy of the dataset.
 *
 * @param {Array<Object>} dataset
 * @returns {Array<Object>} Shuffled dataset
 */
export function shuffleDataset(dataset = REGIONS_DATASET) {
  return [...dataset].sort(() => 0.5 - Math.random());
}

/**
 * Calculates final score and grade for the sorting game round.
 *
 * @param {number} correctCount - Correctly classified regions count
 * @param {number} totalCount - Total regions sorted (e.g. 36)
 * @param {number} timeElapsedSeconds - Time taken in seconds
 * @returns {Object} Performance summary
 */
export function calculateSorterScore(correctCount, totalCount = 36, timeElapsedSeconds = 0) {
  const safeTotal = Math.max(1, totalCount);
  const safeCorrect = Math.min(safeTotal, Math.max(0, correctCount));
  const accuracyPct = Math.round((safeCorrect / safeTotal) * 100);

  // Time bonus (up to 200 pts bonus for fast completion under 120s)
  let speedBonus = 0;
  if (accuracyPct >= 80 && timeElapsedSeconds > 0 && timeElapsedSeconds <= 180) {
    speedBonus = Math.max(0, Math.round((180 - timeElapsedSeconds) * 1.5));
  }

  const basePoints = safeCorrect * 100;
  const totalScore = basePoints + speedBonus;

  let grade = "C";
  let title = "Explorer Trainee";

  if (accuracyPct === 100) {
    grade = "S";
    title = "Master Geographer";
  } else if (accuracyPct >= 90) {
    grade = "A+";
    title = "Territory Expert";
  } else if (accuracyPct >= 75) {
    grade = "A";
    title = "Regional Scholar";
  } else if (accuracyPct >= 60) {
    grade = "B";
    title = "Map Navigator";
  }

  return {
    correctCount: safeCorrect,
    totalCount: safeTotal,
    accuracyPct,
    basePoints,
    speedBonus,
    totalScore,
    grade,
    title
  };
}

/* --- Interactive DOM Game Controller --- */

class UnionTerritorySorterApp {
  constructor() {
    this.deck = [];
    this.currentIndex = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.streak = 0;
    this.startTime = 0;
    this.timerInterval = null;
    this.timeElapsedSeconds = 0;

    this.initElements();
    this.bindEvents();
    this.startGame();
  }

  initElements() {
    this.deckContainer = document.getElementById("active-card-container");
    this.stateBin = document.getElementById("state-bin");
    this.utBin = document.getElementById("ut-bin");
    
    this.sortStateBtn = document.getElementById("sort-state-btn");
    this.sortUtBtn = document.getElementById("sort-ut-btn");
    
    this.scoreValueEl = document.getElementById("score-value");
    this.streakValueEl = document.getElementById("streak-value");
    this.timerValueEl = document.getElementById("timer-value");
    this.progressFillEl = document.getElementById("progress-fill");
    this.cardCounterEl = document.getElementById("card-counter");
    
    this.feedbackBannerEl = document.getElementById("instant-feedback");
    
    this.gameScreenEl = document.getElementById("game-screen");
    this.summaryScreenEl = document.getElementById("summary-screen");
    this.retryBtn = document.getElementById("retry-btn");
  }

  bindEvents() {
    // Tap sorting buttons
    if (this.sortStateBtn) {
      this.sortStateBtn.addEventListener("click", () => this.handleClassification("state"));
    }
    if (this.sortUtBtn) {
      this.sortUtBtn.addEventListener("click", () => this.handleClassification("ut"));
    }

    // HTML5 Drag & Drop on bins
    [this.stateBin, this.utBin].forEach(bin => {
      if (!bin) return;

      bin.addEventListener("dragover", (e) => {
        e.preventDefault();
        bin.classList.add("drag-over");
      });

      bin.addEventListener("dragleave", () => {
        bin.classList.remove("drag-over");
      });

      bin.addEventListener("drop", (e) => {
        e.preventDefault();
        bin.classList.remove("drag-over");
        const targetType = bin.dataset.binType;
        if (targetType) {
          this.handleClassification(targetType);
        }
      });
    });

    if (this.retryBtn) {
      this.retryBtn.addEventListener("click", () => this.startGame());
    }

    // Keyboard accessibility shortcuts (Left Arrow / 'S' for State, Right Arrow / 'U' for UT)
    document.addEventListener("keydown", (e) => {
      if (this.currentIndex >= this.deck.length) return;
      if (e.key === "ArrowLeft" || e.key === "s" || e.key === "S") {
        this.handleClassification("state");
      } else if (e.key === "ArrowRight" || e.key === "u" || e.key === "U") {
        this.handleClassification("ut");
      }
    });

    // Theme toggle if present
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
      });
    }
  }

  startGame() {
    this.deck = shuffleDataset(REGIONS_DATASET);
    this.currentIndex = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.streak = 0;
    this.timeElapsedSeconds = 0;

    if (this.gameScreenEl && this.summaryScreenEl) {
      this.gameScreenEl.style.display = "block";
      this.summaryScreenEl.style.display = "none";
    }

    this.startTimer();
    this.updateStatsUI();
    this.renderCurrentCard();
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.timeElapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
      if (this.timerValueEl) {
        const mins = Math.floor(this.timeElapsedSeconds / 60);
        const secs = this.timeElapsedSeconds % 60;
        this.timerValueEl.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateStatsUI() {
    if (this.scoreValueEl) this.scoreValueEl.textContent = `${this.correctCount * 100}`;
    if (this.streakValueEl) this.streakValueEl.textContent = `${this.streak} 🔥`;
    if (this.cardCounterEl) this.cardCounterEl.textContent = `${this.currentIndex + 1} / ${this.deck.length}`;

    if (this.progressFillEl) {
      const pct = (this.currentIndex / this.deck.length) * 100;
      this.progressFillEl.style.width = `${pct}%`;
    }
  }

  renderCurrentCard() {
    if (!this.deckContainer) return;
    this.deckContainer.innerHTML = "";

    if (this.currentIndex >= this.deck.length) {
      this.finishGame();
      return;
    }

    const currentRegion = this.deck[this.currentIndex];

    const card = document.createElement("div");
    card.className = "region-card";
    card.draggable = true;
    card.id = "active-card";
    card.setAttribute("aria-label", `Region card: ${currentRegion.name}`);

    card.innerHTML = `
      <div class="card-drag-handle">:: Drag or Tap to Sort ::</div>
      <div class="card-badge">${this.currentIndex + 1} of 36</div>
      <h3 class="card-title">${currentRegion.name}</h3>
      <div class="card-capital">Capital: ${currentRegion.capital}</div>
      <div class="card-hint">💡 ${currentRegion.info}</div>
    `;

    // HTML5 dragstart listener
    card.addEventListener("dragstart", (e) => {
      card.classList.add("dragging");
      e.dataTransfer.setData("text/plain", currentRegion.id);
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });

    this.deckContainer.appendChild(card);
    this.updateStatsUI();
  }

  handleClassification(targetType) {
    if (this.currentIndex >= this.deck.length) return;

    const currentRegion = this.deck[this.currentIndex];
    const result = checkClassification(currentRegion.id, targetType, REGIONS_DATASET);

    const activeCard = document.getElementById("active-card");

    if (result.isCorrect) {
      this.correctCount++;
      this.streak++;
      if (activeCard) activeCard.classList.add("animate-correct");
      this.showFeedback(true, `Correct! ${currentRegion.name} is a ${result.expectedType === 'state' ? 'State 🏛️' : 'Union Territory 🏰'}.`);
    } else {
      this.wrongCount++;
      this.streak = 0;
      if (activeCard) activeCard.classList.add("animate-wrong");
      const correctTypeName = result.expectedType === 'state' ? 'State' : 'Union Territory';
      this.showFeedback(false, `Oops! ${currentRegion.name} is actually a ${correctTypeName}.`);
    }

    // Advance to next card after brief transition
    setTimeout(() => {
      this.currentIndex++;
      this.renderCurrentCard();
    }, 450);
  }

  showFeedback(isCorrect, message) {
    if (!this.feedbackBannerEl) return;

    this.feedbackBannerEl.className = `feedback-toast ${isCorrect ? 'toast-success' : 'toast-error'}`;
    this.feedbackBannerEl.textContent = message;

    setTimeout(() => {
      this.feedbackBannerEl.className = "feedback-toast hidden";
    }, 2000);
  }

  finishGame() {
    this.stopTimer();

    if (this.gameScreenEl) this.gameScreenEl.style.display = "none";
    if (this.summaryScreenEl) this.summaryScreenEl.style.display = "block";

    const summary = calculateSorterScore(this.correctCount, this.deck.length, this.timeElapsedSeconds);

    const scorePctEl = document.getElementById("summary-accuracy");
    const totalScoreEl = document.getElementById("summary-score");
    const gradeBadgeEl = document.getElementById("summary-grade");
    const titleBadgeEl = document.getElementById("summary-title");
    const timeTakenEl = document.getElementById("summary-time");

    if (scorePctEl) scorePctEl.textContent = `${summary.accuracyPct}%`;
    if (totalScoreEl) totalScoreEl.textContent = `${summary.totalScore} pts`;
    if (gradeBadgeEl) gradeBadgeEl.textContent = `Grade ${summary.grade}`;
    if (titleBadgeEl) titleBadgeEl.textContent = summary.title;
    
    if (timeTakenEl) {
      const mins = Math.floor(this.timeElapsedSeconds / 60);
      const secs = this.timeElapsedSeconds % 60;
      timeTakenEl.textContent = `${mins}m ${secs}s`;
    }
  }
}

// Auto-initialize on DOM load in browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
  window.UnionTerritorySorter = {
    REGIONS_DATASET,
    validateDataset,
    checkClassification,
    shuffleDataset,
    calculateSorterScore,
    UnionTerritorySorterApp
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("active-card-container")) {
      new UnionTerritorySorterApp();
    }
  });
}
