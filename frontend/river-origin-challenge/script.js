/**
 * River Origin Challenge Engine
 * Incredible India Explorer
 * Interactive geography game for matching Indian rivers with origins, tributaries, and destinations.
 */

// Dataset of 10 Major Indian River Systems
export const RIVERS_DATABASE = [
  {
    id: "ganga",
    name: "Ganga",
    length: "2,525 km",
    origin: "Gangotri Glacier (Gaumukh), Uttarkashi, Uttarakhand",
    originCoords: [30.9224, 79.0821],
    elevation: "3,892 meters",
    tributaries: "Yamuna, Ghaghara, Gandak, Kosi, Son",
    tribCoords: [25.4358, 81.8463], // Prayagraj Sangam
    destination: "Bay of Bengal (Sundarbans Delta)",
    destCoords: [21.8400, 89.0400],
    states: "Uttarakhand, Uttar Pradesh, Bihar, Jharkhand, West Bengal",
    dams: "Tehri Dam, Farakka Barrage",
    significance: "National River of India and sacred waterway supporting over 400 million people across the Indo-Gangetic basin.",
    educationalExplanation: "The Ganga originates as the Bhagirathi River at Gaumukh glacier in Uttarakhand. It unites with the Alaknanda River at Devprayag to officially become the Ganga. It creates the world's largest river delta, the Sundarbans, before discharging into the Bay of Bengal."
  },
  {
    id: "yamuna",
    name: "Yamuna",
    length: "1,376 km",
    origin: "Yamunotri Glacier, Uttarkashi, Uttarakhand",
    originCoords: [31.0140, 78.4599],
    elevation: "6,387 meters",
    tributaries: "Chambal, Betwa, Ken, Tons, Hindon",
    tribCoords: [26.6800, 79.2500], // Etawah Chambal confluence
    destination: "Triveni Sangam (Prayagraj) -> Ganga",
    destCoords: [25.4358, 81.8463],
    states: "Uttarakhand, Himachal Pradesh, Haryana, Delhi, Uttar Pradesh",
    dams: "Hathnikund Barrage, Lakhwar Dam",
    significance: "The longest and second-largest tributary river of the Ganga in India, flowing past Delhi and Agra's Taj Mahal.",
    educationalExplanation: "Originating at the Yamunotri glacier in the Lower Himalayas, the Yamuna flows parallel to the Ganga before merging at the sacred Triveni Sangam in Prayagraj. Its major tributary, the Chambal, is famous for its untouched river ravines."
  },
  {
    id: "brahmaputra",
    name: "Brahmaputra",
    length: "2,900 km",
    origin: "Angsi Glacier / Chemayungdung, Tibet",
    originCoords: [30.5500, 82.1500],
    elevation: "5,210 meters",
    tributaries: "Teesta, Subansiri, Manas, Dibang, Lohit",
    tribCoords: [27.4728, 94.9120], // Dibrugarh confluence
    destination: "Bay of Bengal (via Bangladesh Padma/Meghna)",
    destCoords: [22.0500, 90.5000],
    states: "Arunachal Pradesh, Assam, West Bengal (Basin)",
    dams: "Ranganadi Dam, Subansiri Lower HE Project",
    significance: "One of Asia's major transboundary rivers, known for immense water volume, Majuli (world's largest river island), and annual fertile silt deposition.",
    educationalExplanation: "Known as Yarlung Tsangpo in Tibet, it carves the Grand Canyon of Yarlung Tsangpo before entering Arunachal Pradesh as the Siang. Joining the Dibang and Lohit in Assam, it becomes the Brahmaputra, flowing westwards through Assam's floodplains."
  },
  {
    id: "godavari",
    name: "Godavari",
    length: "1,465 km",
    origin: "Trimbakeshwar, Nashik, Maharashtra",
    originCoords: [19.9300, 73.5300],
    elevation: "920 meters",
    tributaries: "Indravati, Pranhita, Manjira, Sabari, Purna",
    tribCoords: [18.8000, 79.8000], // Pranhita confluence
    destination: "Bay of Bengal (Andhra Pradesh Coast)",
    destCoords: [16.7300, 82.3400],
    states: "Maharashtra, Telangana, Andhra Pradesh, Chhattisgarh, Odisha",
    dams: "Kaleshwaram Lift Irrigation, Jayakwadi Dam, Dowleswaram Barrage",
    significance: "Known as Dakshin Ganga ('Ganga of the South'), the second-longest river in India with the third-largest river basin.",
    educationalExplanation: "Emerging in the Brahmagiri Hills at Trimbakeshwar near Nashik, Godavari flows eastwards across the Deccan Plateau. It splits into two main distributaries (Gautami and Vasishta) forming a rich agricultural delta in Andhra Pradesh."
  },
  {
    id: "krishna",
    name: "Krishna",
    length: "1,400 km",
    origin: "Mahabaleshwar, Western Ghats, Maharashtra",
    originCoords: [17.9237, 73.6586],
    elevation: "1,337 meters",
    tributaries: "Tungabhadra, Bhima, Koyna, Ghataprabha, Malaprabha",
    tribCoords: [15.8800, 76.9200], // Tungabhadra confluence
    destination: "Bay of Bengal (Hamsaladeevi, Andhra Pradesh)",
    destCoords: [15.7500, 80.9300],
    states: "Maharashtra, Karnataka, Telangana, Andhra Pradesh",
    dams: "Nagarjuna Sagar Dam, Srisailam Dam, Almatti Dam",
    significance: "The fourth-longest river in India, crucial for sugarcane and paddy irrigation in Southern India.",
    educationalExplanation: "Rising near Mahabaleshwar in Maharashtra, the Krishna river flows across Karnataka and Andhra Pradesh. Its major tributary, the Tungabhadra, was the lifeline of the historical Vijayanagara Empire."
  },
  {
    id: "narmada",
    name: "Narmada",
    length: "1,312 km",
    origin: "Amarkantak Plateau, Anuppur, Madhya Pradesh",
    originCoords: [22.6756, 81.7523],
    elevation: "1,048 meters",
    tributaries: "Tawa, Hiran, Sher, Shakkar, Burhner",
    tribCoords: [22.5800, 77.7500], // Tawa confluence
    destination: "Arabian Sea (Gulf of Khambhat, Bharuch, Gujarat)",
    destCoords: [21.6300, 72.5800],
    states: "Madhya Pradesh, Maharashtra, Gujarat",
    dams: "Sardar Sarovar Dam, Indira Sagar Dam, Omkareshwar Dam",
    significance: "The largest west-flowing river of Peninsular India, flowing through a rift valley between the Vindhya and Satpura ranges.",
    educationalExplanation: "Unlike most east-flowing rivers, Narmada flows westward in a tectonic rift valley. It is famous for the stunning Dhuandhar Falls and Marble Rocks at Bhedaghat near Jabalpur."
  },
  {
    id: "kaveri",
    name: "Kaveri",
    length: "800 km",
    origin: "Talakaveri, Brahmagiri Range, Kodagu, Karnataka",
    originCoords: [12.3856, 75.4878],
    elevation: "1,341 meters",
    tributaries: "Shimsha, Hemavati, Arkavathy, Kabini, Bhavani, Amaravathi",
    tribCoords: [11.4800, 77.7300], // Bhavani confluence
    destination: "Bay of Bengal (Poompuhar, Tamil Nadu)",
    destCoords: [11.1400, 79.8500],
    states: "Karnataka, Tamil Nadu, Kerala, Puducherry",
    dams: "Krishna Raja Sagara (KRS) Dam, Mettur Dam",
    significance: "The 'Dakshina Ganga' of Tamil Nadu & Karnataka, revered for its fertile delta supporting ancient Chola civilization.",
    educationalExplanation: "Originating at Talakaveri in the Western Ghats of Kodagu district, Kaveri forms two river islands (Seringapatam and Sivasamudram) and drops in spectacular waterfalls before nourishing the rice bowl of Tamil Nadu."
  },
  {
    id: "mahanadi",
    name: "Mahanadi",
    length: "858 km",
    origin: "Sihawa, Dhamtari, Chhattisgarh",
    originCoords: [20.3500, 81.9700],
    elevation: "442 meters",
    tributaries: "Seonath, Hasdeo, Mand, Ib, Tel, Ong",
    tribCoords: [21.7200, 83.0500], // Seonath/Hasdeo junction
    destination: "Bay of Bengal (False Point, Odisha)",
    destCoords: [20.3300, 86.7200],
    states: "Chhattisgarh, Odisha",
    dams: "Hirakud Dam (World's longest earthen dam)",
    significance: "Vital river system for Chhattisgarh and Odisha plains, famous for Hirakud Dam reservoir.",
    educationalExplanation: "Mahanadi rises in the highlands of Chhattisgarh and flows east through Odisha into the Bay of Bengal. The colossal Hirakud Dam built across it forms one of the largest artificial reservoirs in Asia."
  },
  {
    id: "indus",
    name: "Indus",
    length: "3,180 km",
    origin: "Lake Manasarovar / Sengge Zangbo, Tibet",
    originCoords: [31.2500, 81.7500],
    elevation: "5,182 meters",
    tributaries: "Jhelum, Chenab, Ravi, Beas, Sutlej, Shyok",
    tribCoords: [29.3500, 71.0100], // Panjnad confluence
    destination: "Arabian Sea (South of Karachi, Pakistan)",
    destCoords: [24.0000, 67.5000],
    states: "Ladakh (India), Jammu & Kashmir (Basin)",
    dams: "Nimoo Bazgo Dam, Chutak Hydroelectric Plant",
    significance: "Cradle of the ancient Indus Valley Civilization and namesake of India.",
    educationalExplanation: "The Indus originates in Tibet near Lake Manasarovar and enters India in Ladakh, flowing through dramatic gorges between the Karakoram and Zanskar ranges before traversing Pakistan to the Arabian Sea."
  },
  {
    id: "tapti",
    name: "Tapti (Tapi)",
    length: "724 km",
    origin: "Multai, Betul District, Satpura Range, Madhya Pradesh",
    originCoords: [21.7700, 78.2500],
    elevation: "752 meters",
    tributaries: "Purna, Girna, Panjhra, Bori, Aner",
    tribCoords: [21.0500, 75.7500], // Purna confluence
    destination: "Arabian Sea (Gulf of Khambhat, Surat, Gujarat)",
    destCoords: [21.1200, 72.6800],
    states: "Madhya Pradesh, Maharashtra, Gujarat",
    dams: "Ukai Dam, Kakrapar Dam",
    significance: "Major west-flowing Peninsular river running parallel to Narmada south of the Satpura range.",
    educationalExplanation: "Tapti originates in the dense Satpura hill forests of Betul, Madhya Pradesh. It flows westward through the Khandesh region of Maharashtra and Surat in Gujarat before entering the Gulf of Khambhat."
  }
];

// Game State Engine
let gameState = {
  score: 0,
  streak: 0,
  highScore: 0,
  pairsMatched: 0,
  totalPairsInRound: 5,
  timerSeconds: 0,
  timerInterval: null,
  activeRivers: [],
  selectedCard: null,
  difficulty: "full", // "origin" or "full"
  matchedRiverIds: new Set()
};

// Leaflet Map Instance
let leafletMap = null;
let mapMarkers = [];
let mapPolyline = null;

// DOM Elements Initialization
document.addEventListener("DOMContentLoaded", () => {
  loadHighScore();
  initNavigationTabs();
  initGameControls();
  startNewRound();
  initAtlasView();
  initMapLeaflet();

  // Modal Close buttons
  document.getElementById("btn-close-edu").addEventListener("click", hideEduModal);
  document.getElementById("btn-edu-continue").addEventListener("click", hideEduModal);
  document.getElementById("btn-next-round-modal").addEventListener("click", () => {
    hideVictoryModal();
    startNewRound();
  });
  document.getElementById("btn-explore-map-modal").addEventListener("click", () => {
    hideVictoryModal();
    switchTab("map");
  });
});

// Load High Score from LocalStorage
function loadHighScore() {
  const saved = localStorage.getItem("river_origin_challenge_highscore");
  if (saved) {
    gameState.highScore = parseInt(saved, 10) || 0;
  }
  updateScoreboardUI();
}

function saveHighScore() {
  if (gameState.score > gameState.highScore) {
    gameState.highScore = gameState.score;
    localStorage.setItem("river_origin_challenge_highscore", gameState.highScore.toString());
  }
}

// Navigation Tabs
function initNavigationTabs() {
  const tabs = document.querySelectorAll(".mode-tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const mode = tab.getAttribute("data-mode");
      switchTab(mode);
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

    if (mode === "map" && leafletMap) {
      setTimeout(() => {
        leafletMap.invalidateSize();
      }, 200);
    }
  }
}

// Game Controls
function initGameControls() {
  document.getElementById("btn-next-round").addEventListener("click", startNewRound);
  document.getElementById("btn-reset-score").addEventListener("click", resetFullGame);
  document.getElementById("difficulty-select").addEventListener("change", (e) => {
    gameState.difficulty = e.target.value;
    startNewRound();
  });
}

// Reset Score & Game
function resetFullGame() {
  gameState.score = 0;
  gameState.streak = 0;
  saveHighScore();
  updateScoreboardUI();
  startNewRound();
  if (window.showToast) {
    window.showToast("Game score has been reset! Starting fresh round.");
  }
}

// Timer Logic
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
  document.getElementById("streak-display").textContent = `🔥 ${gameState.streak}x`;
  document.getElementById("progress-display").textContent = `${gameState.matchedRiverIds.size} / ${gameState.totalPairsInRound}`;
  document.getElementById("highscore-display").textContent = gameState.highScore;
}

// Start New Round
function startNewRound() {
  stopTimer();
  startTimer();

  gameState.matchedRiverIds.clear();
  gameState.selectedCard = null;

  // Shuffle rivers & pick 5 for round
  const shuffled = [...RIVERS_DATABASE].sort(() => Math.random() - 0.5);
  gameState.activeRivers = shuffled.slice(0, gameState.totalPairsInRound);

  updateScoreboardUI();
  renderDragDropBoard();
}

// Render Drag & Drop Board
function renderDragDropBoard() {
  const riverContainer = document.getElementById("river-cards-container");
  const originsPool = document.getElementById("origins-pool");
  const tributariesPool = document.getElementById("tributaries-pool");
  const destinationsPool = document.getElementById("destinations-pool");

  const tribSection = document.getElementById("tributaries-pool-section");
  const destSection = document.getElementById("destinations-pool-section");

  if (gameState.difficulty === "origin") {
    tribSection.style.display = "none";
    destSection.style.display = "none";
    document.getElementById("instruction-text").textContent = "Drag Origin cards onto the matching River Target card!";
  } else {
    tribSection.style.display = "block";
    destSection.style.display = "block";
    document.getElementById("instruction-text").textContent = "Drag cards into matching River Origin, Tributary & Destination dropzones! (Or tap a card, then tap target slot!)";
  }

  // Clear containers
  riverContainer.innerHTML = "";
  originsPool.innerHTML = "";
  tributariesPool.innerHTML = "";
  destinationsPool.innerHTML = "";

  // 1. Render Target Rivers
  gameState.activeRivers.forEach(river => {
    const cardEl = document.createElement("div");
    cardEl.className = "target-river-card";
    cardEl.id = `target-river-${river.id}`;
    cardEl.setAttribute("data-river-id", river.id);

    const isFullMode = gameState.difficulty === "full";

    cardEl.innerHTML = `
      <div class="river-card-header">
        <h3 class="river-name">🌊 ${river.name}</h3>
        <span class="river-length-badge">${river.length}</span>
      </div>
      <div class="river-dropzone-grid">
        <div class="dropzone-container">
          <span class="dropzone-label">🏔️ Origin</span>
          <div class="drop-slot" data-slot-type="origin" data-river-id="${river.id}">
            Drop Origin Card Here
          </div>
        </div>
        ${isFullMode ? `
        <div class="dropzone-container">
          <span class="dropzone-label">🌿 Key Tributary</span>
          <div class="drop-slot" data-slot-type="tributary" data-river-id="${river.id}">
            Drop Tributary Card Here
          </div>
        </div>
        <div class="dropzone-container">
          <span class="dropzone-label">🌊 Destination</span>
          <div class="drop-slot" data-slot-type="destination" data-river-id="${river.id}">
            Drop Mouth Card Here
          </div>
        </div>
        ` : ''}
      </div>
    `;

    riverContainer.appendChild(cardEl);
  });

  // 2. Prepare Shuffled Attributes for Pools
  const originsData = gameState.activeRivers.map(r => ({ id: r.id, type: "origin", label: r.origin }));
  const tribsData = gameState.activeRivers.map(r => ({ id: r.id, type: "tributary", label: r.tributaries }));
  const destsData = gameState.activeRivers.map(r => ({ id: r.id, type: "destination", label: r.destination }));

  originsData.sort(() => Math.random() - 0.5);
  tribsData.sort(() => Math.random() - 0.5);
  destsData.sort(() => Math.random() - 0.5);

  // Render Origin Pool
  originsData.forEach(item => {
    originsPool.appendChild(createDragCard(item));
  });

  // Render Tributary & Destination Pools
  if (gameState.difficulty === "full") {
    tribsData.forEach(item => {
      tributariesPool.appendChild(createDragCard(item));
    });
    destsData.forEach(item => {
      destinationsPool.appendChild(createDragCard(item));
    });
  }

  // Setup Event Listeners for Dropzones
  setupDropzones();
}

// Create Draggable Card Element
function createDragCard(item) {
  const card = document.createElement("div");
  card.className = "drag-card";
  card.draggable = true;
  card.setAttribute("data-river-id", item.id);
  card.setAttribute("data-card-type", item.type);
  card.id = `card-${item.type}-${item.id}`;
  card.textContent = item.label;

  // HTML5 Drag Event Listeners
  card.addEventListener("dragstart", (e) => {
    card.classList.add("is-dragging");
    e.dataTransfer.setData("text/plain", JSON.stringify({
      riverId: item.id,
      cardType: item.type,
      cardId: card.id
    }));
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("is-dragging");
  });

  // Touch / Click fallback for selection
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

// Highlight dropzones when a card is selected
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
  const slots = document.querySelectorAll(".drop-slot");

  slots.forEach(slot => {
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
        handleMatchAttempt(data.riverId, data.cardType, data.cardId, slot);
      } catch (err) {
        console.error("Drop error:", err);
      }
    });

    // Touch / Click placement fallback
    slot.addEventListener("click", () => {
      if (!gameState.selectedCard) return;

      const riverId = gameState.selectedCard.getAttribute("data-river-id");
      const cardType = gameState.selectedCard.getAttribute("data-card-type");
      const cardId = gameState.selectedCard.id;

      handleMatchAttempt(riverId, cardType, cardId, slot);
    });
  });
}

// Validate Match Attempt
function handleMatchAttempt(cardRiverId, cardType, cardId, slot) {
  const targetRiverId = slot.getAttribute("data-river-id");
  const slotType = slot.getAttribute("data-slot-type");

  if (slotType !== cardType) {
    if (window.showToast) window.showToast("⚠️ Wrong slot type! Place origin cards in Origin slots.");
    return;
  }

  const cardElement = document.getElementById(cardId);
  if (!cardElement || cardElement.classList.contains("is-used")) return;

  if (cardRiverId === targetRiverId) {
    // CORRECT MATCH!
    slot.classList.remove("matched-incorrect", "active-dropzone");
    slot.classList.add("matched-correct", "slot-filled");
    slot.textContent = cardElement.textContent;

    cardElement.classList.add("is-used");
    cardElement.classList.remove("selected-card");
    gameState.selectedCard = null;
    clearDropzoneHighlights();

    // Update Score & Streak
    gameState.streak++;
    const points = 100 + (gameState.streak * 25);
    gameState.score += points;

    if (window.showToast) {
      window.showToast(`✨ Correct match! +${points} pts (Streak: ${gameState.streak}x)`);
    }

    checkRiverCompletion(targetRiverId);
    updateScoreboardUI();
    saveHighScore();

  } else {
    // INCORRECT MATCH
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

// Check if all slots of a river card are matched
function checkRiverCompletion(riverId) {
  const targetCard = document.getElementById(`target-river-${riverId}`);
  if (!targetCard) return;

  const slots = targetCard.querySelectorAll(".drop-slot");
  const allMatched = Array.from(slots).every(s => s.classList.contains("matched-correct"));

  if (allMatched && !gameState.matchedRiverIds.has(riverId)) {
    gameState.matchedRiverIds.add(riverId);
    targetCard.classList.add("all-matched");

    const riverData = RIVERS_DATABASE.find(r => r.id === riverId);
    showEduSpotlightModal(riverData);

    updateScoreboardUI();

    // Check if entire round complete
    if (gameState.matchedRiverIds.size >= gameState.totalPairsInRound) {
      stopTimer();
      setTimeout(showVictoryModal, 600);
    }
  }
}

// Show Educational Modal for River
function showEduSpotlightModal(river) {
  if (!river) return;
  const modal = document.getElementById("edu-modal");
  const title = document.getElementById("edu-modal-title");
  const subtitle = document.getElementById("edu-modal-subtitle");
  const body = document.getElementById("edu-modal-body");

  title.textContent = `🌊 River ${river.name} Hydrological Insight`;
  subtitle.textContent = `Length: ${river.length} | Source Elevation: ${river.elevation}`;

  body.innerHTML = `
    <div class="edu-body-item">
      <strong>🏔️ Origin & Glacier:</strong> ${river.origin}
    </div>
    <div class="edu-body-item">
      <strong>🌿 Tributary Network:</strong> ${river.tributaries}
    </div>
    <div class="edu-body-item">
      <strong>🌊 Mouth / Destination:</strong> ${river.destination}
    </div>
    <div class="edu-body-item">
      <strong>🏛️ Major Dams / Projects:</strong> ${river.dams}
    </div>
    <div class="edu-body-item">
      <strong>💡 Geographical Significance:</strong> ${river.significance}
    </div>
    <div class="edu-body-item" style="border-left-color: var(--river-green);">
      <strong>📖 Educational Overview:</strong> ${river.educationalExplanation}
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
  streakVal.textContent = `🔥 ${gameState.streak}`;

  // Award badges based on score
  if (gameState.score >= 800) {
    badgeTitle.textContent = "🏅 River Hydro Scholar";
    badgeDesc.textContent = "Phenomenal geography knowledge! Flawless origin & tributary matching.";
  } else if (gameState.score >= 500) {
    badgeTitle.textContent = "🥇 Master Navigator";
    badgeDesc.textContent = "Great job! You navigated India's major river basins accurately.";
  } else {
    badgeTitle.textContent = "🥈 River Explorer";
    badgeDesc.textContent = "Good attempt! Keep practicing to master all river sources.";
  }

  modal.classList.remove("hidden");
}

function hideVictoryModal() {
  document.getElementById("victory-modal").classList.add("hidden");
}

// Hydrological Atlas View
function initAtlasView() {
  const grid = document.getElementById("atlas-grid");
  const searchInput = document.getElementById("atlas-search-input");

  function renderAtlasCards(filterText = "") {
    grid.innerHTML = "";
    const term = filterText.toLowerCase();

    const filtered = RIVERS_DATABASE.filter(r => 
      r.name.toLowerCase().includes(term) ||
      r.origin.toLowerCase().includes(term) ||
      r.tributaries.toLowerCase().includes(term) ||
      r.states.toLowerCase().includes(term)
    );

    if (filtered.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">No rivers match your search term "${filterText}".</p>`;
      return;
    }

    filtered.forEach(river => {
      const card = document.createElement("div");
      card.className = "atlas-card";
      card.innerHTML = `
        <div class="atlas-card-title">
          <span>🌊 River ${river.name}</span>
          <span class="atlas-card-tag">${river.length}</span>
        </div>
        <div class="atlas-meta-grid">
          <div class="atlas-meta-item">
            <strong>🏔️ Source / Origin</strong>
            ${river.origin}
          </div>
          <div class="atlas-meta-item">
            <strong>🌊 Destination / Mouth</strong>
            ${river.destination}
          </div>
        </div>
        <div class="atlas-meta-grid" style="margin-top: -0.4rem;">
          <div class="atlas-meta-item">
            <strong>🌿 Tributaries</strong>
            ${river.tributaries}
          </div>
          <div class="atlas-meta-item">
            <strong>🏞️ States Drained</strong>
            ${river.states}
          </div>
        </div>
        <div class="atlas-card-desc">${river.educationalExplanation}</div>
      `;
      grid.appendChild(card);
    });
  }

  renderAtlasCards();

  searchInput.addEventListener("input", (e) => {
    renderAtlasCards(e.target.value);
  });
}

// Leaflet Map Initialization
function initMapLeaflet() {
  const mapContainer = document.getElementById("interactive-river-map");
  if (!mapContainer) return;

  // Center on India
  leafletMap = L.map("interactive-river-map").setView([22.5937, 78.9629], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(leafletMap);

  // Populate Map River Select dropdown
  const select = document.getElementById("map-river-select");
  select.innerHTML = "";
  RIVERS_DATABASE.forEach(r => {
    const opt = document.createElement("option");
    opt.value = r.id;
    opt.textContent = `🌊 River ${r.name}`;
    select.appendChild(opt);
  });

  select.addEventListener("change", (e) => {
    displayRiverOnMap(e.target.value);
  });

  // Display initial river on map
  displayRiverOnMap(RIVERS_DATABASE[0].id);
}

// Display Selected River on Leaflet Map
function displayRiverOnMap(riverId) {
  if (!leafletMap) return;

  const river = RIVERS_DATABASE.find(r => r.id === riverId);
  if (!river) return;

  // Clear previous markers & line
  mapMarkers.forEach(m => leafletMap.removeLayer(m));
  mapMarkers = [];
  if (mapPolyline) {
    leafletMap.removeLayer(mapPolyline);
    mapPolyline = null;
  }

  // Custom Icon Creator
  function createCustomIcon(className) {
    return L.divIcon({
      className: "custom-leaflet-marker",
      html: `<div class="marker-pin-inner ${className}"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  }

  // 1. Origin Marker
  const originMarker = L.marker(river.originCoords, {
    icon: createCustomIcon("marker-origin")
  }).addTo(leafletMap);
  originMarker.bindPopup(`<b>🏔️ ${river.name} Source</b><br>${river.origin}<br>Elevation: ${river.elevation}`);
  mapMarkers.push(originMarker);

  // 2. Tributary Marker
  const tribMarker = L.marker(river.tribCoords, {
    icon: createCustomIcon("marker-tributary")
  }).addTo(leafletMap);
  tribMarker.bindPopup(`<b>🌿 Key Tributary Confluence</b><br>${river.tributaries}`);
  mapMarkers.push(tribMarker);

  // 3. Destination Marker
  const destMarker = L.marker(river.destCoords, {
    icon: createCustomIcon("marker-destination")
  }).addTo(leafletMap);
  destMarker.bindPopup(`<b>🌊 Sea Mouth / Outflow</b><br>${river.destination}`);
  mapMarkers.push(destMarker);

  // Draw River Flow Polyline
  const latLngs = [river.originCoords, river.tribCoords, river.destCoords];
  mapPolyline = L.polyline(latLngs, {
    color: "#0ea5e9",
    weight: 5,
    opacity: 0.8,
    dashArray: "8, 8"
  }).addTo(leafletMap);

  // Fit bounds to show entire river route
  leafletMap.fitBounds(mapPolyline.getBounds(), { padding: [40, 40] });

  // Update Side Panel Info Card
  document.getElementById("map-info-title").textContent = `🌊 River ${river.name}`;
  document.getElementById("map-info-subtitle").textContent = `${river.length} flow path across ${river.states}`;
  document.getElementById("map-val-origin").textContent = river.origin;
  document.getElementById("map-val-elevation").textContent = river.elevation;
  document.getElementById("map-val-length").textContent = river.length;
  document.getElementById("map-val-tributaries").textContent = river.tributaries;
  document.getElementById("map-val-mouth").textContent = river.destination;
  document.getElementById("map-val-states").textContent = river.states;
  document.getElementById("map-val-desc").textContent = river.educationalExplanation;
}
