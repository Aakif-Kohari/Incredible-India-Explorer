/**
 * Crop Journey Game Engine
 * Incredible India Explorer
 * Educational matching game for Indian crops, farming seasons (Kharif, Rabi, Zaid), climate, and producing states.
 */

// Dataset of 12 Major Indian Crops
export const CROPS_DATABASE = [
  {
    id: "rice",
    name: "Paddy / Rice",
    season: "kharif",
    seasonLabel: "🌧️ Kharif (Monsoon)",
    climate: "High Temp (>25°C), Heavy Rainfall (>100cm), Alluvial/Clayey Soil",
    states: "West Bengal, Uttar Pradesh, Punjab, Andhra Pradesh",
    harvestWindow: "Sown: June-July | Harvest: Oct-Nov",
    icon: "🌾",
    educationalInsight: "Rice is India's staple food crop, occupying one-third of the total cultivated area. India is the world's 2nd largest producer of rice after China."
  },
  {
    id: "wheat",
    name: "Wheat",
    season: "rabi",
    seasonLabel: "❄️ Rabi (Winter)",
    climate: "Cool Season (10-15°C), Bright Sunshine Harvest (20-25°C), Loamy Soil",
    states: "Uttar Pradesh, Punjab, Haryana, Madhya Pradesh",
    harvestWindow: "Sown: Oct-Nov | Harvest: April-May",
    icon: "🍞",
    educationalInsight: "Wheat is the second most important cereal crop in India, thriving in the fertile Indo-Gangetic plains during dry, cool winter weather."
  },
  {
    id: "cotton",
    name: "Cotton",
    season: "kharif",
    seasonLabel: "🌧️ Kharif (Monsoon)",
    climate: "Warm Semi-Arid (21-30°C), 210 Frost-Free Days, Regur Black Soil",
    states: "Gujarat, Maharashtra, Telangana, Rajasthan",
    harvestWindow: "Sown: May-June | Harvest: Oct-Jan",
    icon: "🧶",
    educationalInsight: "Known as 'White Gold', cotton requires deep moisture-retentive black soil (Regur) found extensively in the Deccan Trap region."
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    season: "kharif",
    seasonLabel: "🌧️ Kharif / Long-crop",
    climate: "Hot & Humid (21-27°C), 75-100cm Rainfall, Deep Loamy Soil",
    states: "Uttar Pradesh, Maharashtra, Karnataka, Tamil Nadu",
    harvestWindow: "Sown: Jan-March | Harvest: Dec-March (Annual)",
    icon: "🎋",
    educationalInsight: "Sugarcane is a tropical as well as sub-tropical crop taking nearly a full year to mature. India is the second-largest sugar producer globally."
  },
  {
    id: "watermelon",
    name: "Watermelon",
    season: "zaid",
    seasonLabel: "☀️ Zaid (Summer)",
    climate: "Hot Dry Summer (25-35°C), Long Sunlight, Sandy Riverbed Soil",
    states: "Uttar Pradesh, Andhra Pradesh, Karnataka, Tamil Nadu",
    harvestWindow: "Sown: Feb-March | Harvest: May-June",
    icon: "🍉",
    educationalInsight: "Watermelon is a classic Zaid crop grown in the warm summer months between Rabi harvest and Kharif monsoon sowing in riverbed soils."
  },
  {
    id: "mustard",
    name: "Mustard & Rapeseed",
    season: "rabi",
    seasonLabel: "❄️ Rabi (Winter)",
    climate: "Cool Dry Climate (15-25°C), Low Moisture, Well-drained Loam",
    states: "Rajasthan, Haryana, Madhya Pradesh, Uttar Pradesh",
    harvestWindow: "Sown: Oct-Nov | Harvest: Feb-March",
    icon: "🌼",
    educationalInsight: "Mustard is India's prime edible oilseed crop grown in dry sub-tropical winter regions. Rajasthan accounts for over 40% of national mustard production."
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    season: "kharif",
    seasonLabel: "🌧️ Kharif (Monsoon)",
    climate: "Moderate Temp (21-27°C), 50-100cm Rain, Old Alluvial Soil",
    states: "Karnataka, Madhya Pradesh, Bihar, Maharashtra",
    harvestWindow: "Sown: June-July | Harvest: Sept-Oct",
    icon: "🌽",
    educationalInsight: "Maize is a versatile cereal used both as food grain and poultry fodder. It responds exceptionally well to modern hybrid seeds and fertilizers."
  },
  {
    id: "soyabean",
    name: "Soyabean",
    season: "kharif",
    seasonLabel: "🌧️ Kharif (Monsoon)",
    climate: "Warm Moist Monsoon (20-30°C), Well-drained Black/Grey Soil",
    states: "Madhya Pradesh, Maharashtra, Rajasthan",
    harvestWindow: "Sown: June-July | Harvest: Sept-Oct",
    icon: "🫘",
    educationalInsight: "Madhya Pradesh is nicknamed the 'Soya State' of India, producing over 50% of India's protein-rich soyabean crop."
  },
  {
    id: "groundnut",
    name: "Groundnut (Peanut)",
    season: "kharif",
    seasonLabel: "🌧️ Kharif (Monsoon)",
    climate: "Warm Climate (20-30°C), Light Sandy Loam, 50-75cm Rainfall",
    states: "Gujarat, Rajasthan, Tamil Nadu, Andhra Pradesh",
    harvestWindow: "Sown: June-July | Harvest: Oct-Nov",
    icon: "🥜",
    educationalInsight: "Groundnut is a rain-fed oilseed crop. Gujarat leads the nation in peanut production, essential for cooking oils and snacks."
  },
  {
    id: "gram",
    name: "Gram (Chickpea)",
    season: "rabi",
    seasonLabel: "❄️ Rabi (Winter)",
    climate: "Mild Cool Winter (15-25°C), Light Irrigation, Loamy Soil",
    states: "Madhya Pradesh, Maharashtra, Rajasthan, Karnataka",
    harvestWindow: "Sown: Oct-Nov | Harvest: March-April",
    icon: "🧆",
    educationalInsight: "Gram is the premier pulse crop of India, fixing atmospheric nitrogen to enrich soil fertility naturally during winter rotations."
  },
  {
    id: "jute",
    name: "Jute (Golden Fibre)",
    season: "kharif",
    seasonLabel: "🌧️ Kharif (Monsoon)",
    climate: "High Temp (>25°C), High Humidity, Floodplain Alluvial Soil",
    states: "West Bengal, Bihar, Assam, Odisha",
    harvestWindow: "Sown: March-May | Harvest: July-Sept",
    icon: "🧺",
    educationalInsight: "Known as the 'Golden Fibre', jute requires high humidity and heavy rainfall. West Bengal's Ganga delta is the world's leading jute-growing hub."
  },
  {
    id: "cucumber",
    name: "Cucumber",
    season: "zaid",
    seasonLabel: "☀️ Zaid (Summer)",
    climate: "Warm Sunny Weather (20-32°C), Moist Well-Drained Soil",
    states: "Karnataka, Tamil Nadu, Uttar Pradesh, Andhra Pradesh",
    harvestWindow: "Sown: Feb-March | Harvest: April-June",
    icon: "🥒",
    educationalInsight: "Cucumbers mature rapidly in 40-50 days during hot summer Zaid months, serving as hydrating food and vital cash crops for smallholders."
  }
];

// Game State Engine
let gameState = {
  score: 0,
  streak: 0,
  highScore: 0,
  pairsMatched: 0,
  totalCropsInRound: 4,
  timerSeconds: 0,
  timerInterval: null,
  currentLevel: 1, // 1 to 4
  seasonFilter: "all",
  activeCrops: [],
  selectedCard: null,
  matchedCropIds: new Set()
};

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
  loadHighScore();
  initNavigationTabs();
  initDifficultyLevels();
  initGameControls();
  startNewHarvestRound();
  initAtlasView();

  // Modals
  document.getElementById("btn-close-edu").addEventListener("click", hideEduModal);
  document.getElementById("btn-edu-continue").addEventListener("click", hideEduModal);
  document.getElementById("btn-next-round-modal").addEventListener("click", () => {
    hideVictoryModal();
    if (gameState.currentLevel < 4) {
      setLevel(gameState.currentLevel + 1);
    } else {
      startNewHarvestRound();
    }
  });
  document.getElementById("btn-explore-atlas-modal").addEventListener("click", () => {
    hideVictoryModal();
    switchTab("atlas");
  });
});

// Load HighScore
function loadHighScore() {
  const saved = localStorage.getItem("crop_journey_highscore");
  if (saved) {
    gameState.highScore = parseInt(saved, 10) || 0;
  }
  updateScoreboardUI();
}

function saveHighScore() {
  if (gameState.score > gameState.highScore) {
    gameState.highScore = gameState.score;
    localStorage.setItem("crop_journey_highscore", gameState.highScore.toString());
  }
}

// Navigation Tabs
function initNavigationTabs() {
  document.querySelectorAll(".mode-tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      switchTab(tab.getAttribute("data-mode"));
    });
  });
}

function switchTab(mode) {
  document.querySelectorAll(".mode-tab-btn").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".game-view").forEach(v => v.classList.remove("active-view"));

  const targetTab = document.querySelector(`.mode-tab-btn[data-mode="${mode}"]`);
  const targetView = document.getElementById(`view-${mode}`);

  if (targetTab && targetView) {
    targetTab.classList.add("active");
    targetView.classList.add("active-view");
  }
}

// Progressive Difficulty Levels
function initDifficultyLevels() {
  document.querySelectorAll(".level-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const lvl = parseInt(btn.getAttribute("data-level"), 10);
      setLevel(lvl);
    });
  });
}

function setLevel(lvl) {
  gameState.currentLevel = lvl;
  document.querySelectorAll(".level-btn").forEach(b => {
    if (parseInt(b.getAttribute("data-level"), 10) === lvl) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });
  startNewHarvestRound();
}

// Game Controls
function initGameControls() {
  document.getElementById("btn-next-harvest").addEventListener("click", startNewHarvestRound);
  document.getElementById("btn-reset-game").addEventListener("click", resetFullGame);
  document.getElementById("season-filter").addEventListener("change", (e) => {
    gameState.seasonFilter = e.target.value;
    startNewHarvestRound();
  });
}

function resetFullGame() {
  gameState.score = 0;
  gameState.streak = 0;
  saveHighScore();
  updateScoreboardUI();
  startNewHarvestRound();
  if (window.showToast) {
    window.showToast("Harvest score reset. Fresh round started!");
  }
}

// Timer
function startTimer() {
  clearInterval(gameState.timerInterval);
  gameState.timerSeconds = 0;
  updateTimerUI();
  gameState.timerInterval = setInterval(() => {
    gameState.timerSeconds++;
    updateTimerUI();
  }, 1000);
}

function stopTimer() {
  clearInterval(gameState.timerInterval);
}

function updateTimerUI() {
  const mins = Math.floor(gameState.timerSeconds / 60).toString().padStart(2, '0');
  const secs = (gameState.timerSeconds % 60).toString().padStart(2, '0');
  document.getElementById("timer-display").textContent = `${mins}:${secs}`;
}

function updateScoreboardUI() {
  document.getElementById("score-display").textContent = gameState.score;
  document.getElementById("streak-display").textContent = `🌾 ${gameState.streak}x`;
  document.getElementById("progress-display").textContent = `${gameState.matchedCropIds.size} / ${gameState.totalCropsInRound}`;
  document.getElementById("highscore-display").textContent = gameState.highScore;

  // Rank titles based on score
  let rank = "Apprentice";
  if (gameState.score >= 1200) rank = "Krishi Guru";
  else if (gameState.score >= 700) rank = "Granary Master";
  else if (gameState.score >= 300) rank = "Agronomist";
  document.getElementById("rank-display").textContent = rank;
}

// Start New Harvest Round
function startNewHarvestRound() {
  stopTimer();
  startTimer();

  gameState.matchedCropIds.clear();
  gameState.selectedCard = null;

  // Filter crops by season if needed
  let pool = [...CROPS_DATABASE];
  if (gameState.seasonFilter !== "all") {
    pool = pool.filter(c => c.season === gameState.seasonFilter);
  }

  // Shuffle and pick 4 crops
  pool.sort(() => Math.random() - 0.5);
  gameState.activeCrops = pool.slice(0, gameState.totalCropsInRound);

  updateScoreboardUI();
  renderChallengeBoard();
}

// Render Challenge Board based on Progressive Level
function renderChallengeBoard() {
  const cropContainer = document.getElementById("crop-cards-container");
  const seasonsPool = document.getElementById("seasons-pool");
  const climatePool = document.getElementById("climate-pool");
  const statesPool = document.getElementById("states-pool");
  const harvestPool = document.getElementById("harvest-pool");

  const sSec = document.getElementById("pool-seasons-section");
  const cSec = document.getElementById("pool-climate-section");
  const stSec = document.getElementById("pool-states-section");
  const hSec = document.getElementById("pool-harvest-section");

  const lvl = gameState.currentLevel;

  // Show/Hide pools according to difficulty level
  sSec.style.display = (lvl === 1 || lvl === 4) ? "block" : "none";
  cSec.style.display = (lvl === 2 || lvl === 4) ? "block" : "none";
  stSec.style.display = (lvl === 3 || lvl === 4) ? "block" : "none";
  hSec.style.display = (lvl === 4) ? "block" : "none";

  // Update instruction text
  const instrText = document.getElementById("instruction-text");
  if (lvl === 1) instrText.textContent = "Level 1: Drag or tap Season cards into matching Crop Season dropzones!";
  else if (lvl === 2) instrText.textContent = "Level 2: Match crops with their required Climate & Soil conditions!";
  else if (lvl === 3) instrText.textContent = "Level 3: Match crops with their primary Producing States!";
  else instrText.textContent = "Level 4 Master Farmer: Match Season, Climate, States, AND Harvest Months!";

  // Clear containers
  cropContainer.innerHTML = "";
  seasonsPool.innerHTML = "";
  climatePool.innerHTML = "";
  statesPool.innerHTML = "";
  harvestPool.innerHTML = "";

  // 1. Render Target Crops
  gameState.activeCrops.forEach(crop => {
    const cardEl = document.createElement("div");
    cardEl.className = "target-crop-card";
    cardEl.id = `target-crop-${crop.id}`;
    cardEl.setAttribute("data-crop-id", crop.id);

    let seasonBadgeClass = "badge-kharif";
    if (crop.season === "rabi") seasonBadgeClass = "badge-rabi";
    if (crop.season === "zaid") seasonBadgeClass = "badge-zaid";

    cardEl.innerHTML = `
      <div class="crop-card-header">
        <h3 class="crop-name">${crop.icon} ${crop.name}</h3>
        <span class="crop-season-badge ${seasonBadgeClass}">${crop.season}</span>
      </div>
      <div class="crop-dropzone-grid">
        ${(lvl === 1 || lvl === 4) ? `
        <div class="dropzone-container">
          <span class="dropzone-label">🗓️ Farming Season</span>
          <div class="drop-slot" data-slot-type="season" data-crop-id="${crop.id}">
            Drop Season Here
          </div>
        </div>
        ` : ''}
        ${(lvl === 2 || lvl === 4) ? `
        <div class="dropzone-container">
          <span class="dropzone-label">☀️ Climate & Soil</span>
          <div class="drop-slot" data-slot-type="climate" data-crop-id="${crop.id}">
            Drop Climate Needs Here
          </div>
        </div>
        ` : ''}
        ${(lvl === 3 || lvl === 4) ? `
        <div class="dropzone-container">
          <span class="dropzone-label">🏛️ Producing States</span>
          <div class="drop-slot" data-slot-type="state" data-crop-id="${crop.id}">
            Drop States Here
          </div>
        </div>
        ` : ''}
        ${(lvl === 4) ? `
        <div class="dropzone-container">
          <span class="dropzone-label">🌽 Sowing/Harvest</span>
          <div class="drop-slot" data-slot-type="harvest" data-crop-id="${crop.id}">
            Drop Harvest Months Here
          </div>
        </div>
        ` : ''}
      </div>
    `;

    cropContainer.appendChild(cardEl);
  });

  // 2. Prepare Shuffled Attribute Cards
  const seasonsData = gameState.activeCrops.map(c => ({ id: c.id, type: "season", label: c.seasonLabel }));
  const climateData = gameState.activeCrops.map(c => ({ id: c.id, type: "climate", label: c.climate }));
  const statesData = gameState.activeCrops.map(c => ({ id: c.id, type: "state", label: c.states }));
  const harvestData = gameState.activeCrops.map(c => ({ id: c.id, type: "harvest", label: c.harvestWindow }));

  seasonsData.sort(() => Math.random() - 0.5);
  climateData.sort(() => Math.random() - 0.5);
  statesData.sort(() => Math.random() - 0.5);
  harvestData.sort(() => Math.random() - 0.5);

  if (lvl === 1 || lvl === 4) {
    seasonsData.forEach(item => seasonsPool.appendChild(createDragCard(item)));
  }
  if (lvl === 2 || lvl === 4) {
    climateData.forEach(item => climatePool.appendChild(createDragCard(item)));
  }
  if (lvl === 3 || lvl === 4) {
    statesData.forEach(item => statesPool.appendChild(createDragCard(item)));
  }
  if (lvl === 4) {
    harvestData.forEach(item => harvestPool.appendChild(createDragCard(item)));
  }

  setupDropzones();
}

// Create Draggable Card Element
function createDragCard(item) {
  const card = document.createElement("div");
  card.className = "drag-card";
  card.draggable = true;
  card.setAttribute("data-crop-id", item.id);
  card.setAttribute("data-card-type", item.type);
  card.id = `card-${item.type}-${item.id}`;
  card.textContent = item.label;

  card.addEventListener("dragstart", (e) => {
    card.classList.add("is-dragging");
    e.dataTransfer.setData("text/plain", JSON.stringify({
      cropId: item.id,
      cardType: item.type,
      cardId: card.id
    }));
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("is-dragging");
  });

  // Touch / Click fallback
  card.addEventListener("click", () => {
    if (card.classList.contains("is-used")) return;

    if (gameState.selectedCard === card) {
      card.classList.remove("selected-card");
      gameState.selectedCard = null;
    } else {
      if (gameState.selectedCard) {
        gameState.selectedCard.classList.remove("selected-card");
      }
      gameState.selectedCard = card;
      card.classList.add("selected-card");
      highlightMatchingDropzones(item.type);
    }
  });

  return card;
}

function highlightMatchingDropzones(cardType) {
  document.querySelectorAll(".drop-slot").forEach(slot => {
    if (slot.getAttribute("data-slot-type") === cardType && !slot.classList.contains("matched-correct")) {
      slot.classList.add("active-dropzone");
    } else {
      slot.classList.remove("active-dropzone");
    }
  });
}

function clearDropzoneHighlights() {
  document.querySelectorAll(".drop-slot").forEach(slot => {
    slot.classList.remove("active-dropzone", "drag-over");
  });
}

// Setup Dropzones Handler
function setupDropzones() {
  document.querySelectorAll(".drop-slot").forEach(slot => {
    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      slot.classList.add("drag-over");
    });

    slot.addEventListener("dragleave", () => {
      slot.classList.remove("drag-over");
    });

    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      slot.classList.remove("drag-over");

      try {
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        handleMatchAttempt(data.cropId, data.cardType, data.cardId, slot);
      } catch (err) {
        console.error("Drop error:", err);
      }
    });

    slot.addEventListener("click", () => {
      if (!gameState.selectedCard) return;

      const cropId = gameState.selectedCard.getAttribute("data-crop-id");
      const cardType = gameState.selectedCard.getAttribute("data-card-type");
      const cardId = gameState.selectedCard.id;

      handleMatchAttempt(cropId, cardType, cardId, slot);
    });
  });
}

// Validate Match Attempt
function handleMatchAttempt(cardCropId, cardType, cardId, slot) {
  const targetCropId = slot.getAttribute("data-crop-id");
  const slotType = slot.getAttribute("data-slot-type");

  if (slotType !== cardType) {
    if (window.showToast) window.showToast("⚠️ Wrong slot type!");
    return;
  }

  const cardElement = document.getElementById(cardId);
  if (!cardElement || cardElement.classList.contains("is-used")) return;

  if (cardCropId === targetCropId) {
    // Correct Match
    slot.classList.remove("matched-incorrect", "active-dropzone");
    slot.classList.add("matched-correct", "slot-filled");
    slot.textContent = cardElement.textContent;

    cardElement.classList.add("is-used");
    cardElement.classList.remove("selected-card");
    gameState.selectedCard = null;
    clearDropzoneHighlights();

    gameState.streak++;
    const points = 100 + (gameState.streak * 25);
    gameState.score += points;

    if (window.showToast) {
      window.showToast(`✨ Harvest matched! +${points} pts (Streak: ${gameState.streak}x)`);
    }

    checkCropCompletion(targetCropId);
    updateScoreboardUI();
    saveHighScore();

  } else {
    // Incorrect Match
    slot.classList.add("matched-incorrect");
    gameState.streak = 0;
    gameState.score = Math.max(0, gameState.score - 20);

    if (window.showToast) {
      window.showToast("❌ Incorrect match! Try again.");
    }

    setTimeout(() => {
      slot.classList.remove("matched-incorrect");
    }, 600);

    updateScoreboardUI();
  }
}

// Check if all slots of a crop card are matched
function checkCropCompletion(cropId) {
  const targetCard = document.getElementById(`target-crop-${cropId}`);
  if (!targetCard) return;

  const slots = targetCard.querySelectorAll(".drop-slot");
  const allMatched = Array.from(slots).every(s => s.classList.contains("matched-correct"));

  if (allMatched && !gameState.matchedCropIds.has(cropId)) {
    gameState.matchedCropIds.add(cropId);
    targetCard.classList.add("all-matched");

    const cropData = CROPS_DATABASE.find(c => c.id === cropId);
    showEduSpotlightModal(cropData);

    updateScoreboardUI();

    if (gameState.matchedCropIds.size >= gameState.totalCropsInRound) {
      stopTimer();
      setTimeout(showVictoryModal, 600);
    }
  }
}

// Show Educational Modal
function showEduSpotlightModal(crop) {
  if (!crop) return;
  const modal = document.getElementById("edu-modal");
  const title = document.getElementById("edu-modal-title");
  const subtitle = document.getElementById("edu-modal-subtitle");
  const body = document.getElementById("edu-modal-body");

  title.textContent = `${crop.icon} ${crop.name} Agronomy Profile`;
  subtitle.textContent = `Season: ${crop.seasonLabel}`;

  body.innerHTML = `
    <div class="edu-body-item">
      <strong>🗓️ Farming Season:</strong> ${crop.seasonLabel}
    </div>
    <div class="edu-body-item">
      <strong>☀️ Climate & Soil:</strong> ${crop.climate}
    </div>
    <div class="edu-body-item">
      <strong>🏛️ Key Producing States:</strong> ${crop.states}
    </div>
    <div class="edu-body-item">
      <strong>🌽 Harvest Schedule:</strong> ${crop.harvestWindow}
    </div>
    <div class="edu-body-item" style="border-left-color: var(--crop-gold);">
      <strong>💡 Agricultural Insight:</strong> ${crop.educationalInsight}
    </div>
  `;

  modal.classList.remove("hidden");
}

function hideEduModal() {
  document.getElementById("edu-modal").classList.add("hidden");
}

// Victory Modal
function showVictoryModal() {
  saveHighScore();
  const modal = document.getElementById("victory-modal");
  const scoreVal = document.getElementById("vstat-score");
  const timeVal = document.getElementById("vstat-time");
  const streakVal = document.getElementById("vstat-streak");
  const badgeTitle = document.getElementById("badge-title");
  const badgeDesc = document.getElementById("badge-desc");

  scoreVal.textContent = `+${gameState.score}`;
  timeVal.textContent = document.getElementById("timer-display").textContent;
  streakVal.textContent = `🌾 ${gameState.streak}`;

  if (gameState.currentLevel === 4) {
    badgeTitle.textContent = "🏆 Legendary Krishi Master";
    badgeDesc.textContent = "Conquered all 4 dimensions of Indian agriculture under peak harvest timing!";
  } else if (gameState.score >= 600) {
    badgeTitle.textContent = "🥇 Granary Specialist";
    badgeDesc.textContent = "Outstanding mastery of seasons, climate needs, and producing states!";
  } else {
    badgeTitle.textContent = "🥈 Harvester Apprentice";
    badgeDesc.textContent = "Great job! Keep practicing to advance to higher progressive levels.";
  }

  modal.classList.remove("hidden");
}

function hideVictoryModal() {
  document.getElementById("victory-modal").classList.add("hidden");
}

// Atlas View
function initAtlasView() {
  const grid = document.getElementById("atlas-grid");
  const searchInput = document.getElementById("atlas-search-input");
  let activeSeasonFilter = "all";

  document.querySelectorAll(".atlas-season-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".atlas-season-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeSeasonFilter = btn.getAttribute("data-filter");
      renderAtlasCards(searchInput.value, activeSeasonFilter);
    });
  });

  function renderAtlasCards(filterText = "", seasonFilter = "all") {
    grid.innerHTML = "";
    const term = filterText.toLowerCase();

    const filtered = CROPS_DATABASE.filter(c => {
      const matchesSeason = (seasonFilter === "all" || c.season === seasonFilter);
      const matchesSearch = (
        c.name.toLowerCase().includes(term) ||
        c.states.toLowerCase().includes(term) ||
        c.climate.toLowerCase().includes(term) ||
        c.seasonLabel.toLowerCase().includes(term)
      );
      return matchesSeason && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #a7f3d0;">No crops match your search term "${filterText}".</p>`;
      return;
    }

    filtered.forEach(crop => {
      const card = document.createElement("div");
      card.className = "atlas-card";
      card.innerHTML = `
        <div class="atlas-card-title">
          <span>${crop.icon} ${crop.name}</span>
          <span style="font-size: 0.8rem; color: var(--crop-accent);">${crop.seasonLabel}</span>
        </div>
        <div class="atlas-meta-grid">
          <div class="atlas-meta-item">
            <strong>☀️ Climate & Soil</strong>
            ${crop.climate}
          </div>
          <div class="atlas-meta-item">
            <strong>🏛️ Key Producing States</strong>
            ${crop.states}
          </div>
        </div>
        <div class="atlas-meta-grid" style="margin-top: -0.4rem;">
          <div class="atlas-meta-item">
            <strong>🌽 Harvest Window</strong>
            ${crop.harvestWindow}
          </div>
          <div class="atlas-meta-item">
            <strong>🌾 Farming Type</strong>
            ${crop.season.toUpperCase()} Crop
          </div>
        </div>
        <div class="atlas-card-desc">${crop.educationalInsight}</div>
      `;
      grid.appendChild(card);
    });
  }

  renderAtlasCards();

  searchInput.addEventListener("input", (e) => {
    renderAtlasCards(e.target.value, activeSeasonFilter);
  });
}
