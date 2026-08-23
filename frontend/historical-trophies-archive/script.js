import { 
  trophiesData, 
  matchingPairsData, 
  trophyQuizQuestions 
} from './trophy-data.js';

// Global App State
let selectedTrophyTile = null;
let selectedNamesakeTile = null;
let matchedCount = 0;

let currentQuizIndex = 0;
let quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  initTrophyCatalog();
  initMatchingGame();
  initQuizEngine();
  initSubnav();
  initThemeSupport();
});

/* --------------------------------------------------------------------------
   1. Trophy Catalog & Search Filters
   -------------------------------------------------------------------------- */
function initTrophyCatalog() {
  const searchInput = document.getElementById('trophy-search');
  const sportFilter = document.getElementById('sport-filter');
  const namesakeFilter = document.getElementById('namesake-filter');

  searchInput?.addEventListener('input', renderTrophyCards);
  sportFilter?.addEventListener('change', renderTrophyCards);
  namesakeFilter?.addEventListener('change', renderTrophyCards);

  // Modal close listeners
  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('trophy-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'trophy-modal') closeModal();
  });

  renderTrophyCards();
}

function renderTrophyCards() {
  const container = document.getElementById('trophy-cards-container');
  if (!container) return;

  const searchVal = document.getElementById('trophy-search')?.value.toLowerCase() || '';
  const selectedSport = document.getElementById('sport-filter')?.value || 'all';
  const selectedNamesake = document.getElementById('namesake-filter')?.value || 'all';

  const filtered = trophiesData.filter(t => {
    const matchesSearch = t.trophy.toLowerCase().includes(searchVal) ||
                          t.namesake.toLowerCase().includes(searchVal) ||
                          t.sport.toLowerCase().includes(searchVal) ||
                          t.tournament.toLowerCase().includes(searchVal) ||
                          t.historicalBackground.toLowerCase().includes(searchVal);

    const matchesSport = selectedSport === 'all' || t.category === selectedSport;
    const matchesNamesake = selectedNamesake === 'all' || t.namesakeCategory.includes(selectedNamesake);

    return matchesSearch && matchesSport && matchesNamesake;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#94a3b8;">No historical trophies match your search filters.</div>`;
    return;
  }

  container.innerHTML = filtered.map(t => `
    <div class="trophy-card" data-id="${t.id}">
      <div class="card-header-banner" style="background:${t.accentColor};">
        <div class="trophy-icon">${t.icon}</div>
        <h3>${t.trophy}</h3>
        <span class="sport-badge">${t.sport} • Instituted ${t.yearInstituted}</span>
      </div>
      <div class="trophy-card-body">
        <div class="namesake-box">
          <div class="label">Historical Namesake</div>
          <div class="name">${t.namesake}</div>
        </div>
        <div class="tournament-name">
          <strong>Tournament:</strong> ${t.tournament}
        </div>
        <button class="view-details-btn">View Historical Significance & Bio →</button>
      </div>
    </div>
  `).join('');

  // Attach card click listeners
  container.querySelectorAll('.trophy-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const trophy = trophiesData.find(item => item.id === id);
      if (trophy) openTrophyModal(trophy);
    });
  });
}

function openTrophyModal(t) {
  const modal = document.getElementById('trophy-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="background:${t.accentColor}; padding:24px; border-radius:14px; color:#fff; margin-bottom:20px;">
      <div style="font-size:2.5rem; margin-bottom:8px;">${t.icon}</div>
      <h2 style="font-size:1.8rem; margin:0 0 4px;">${t.trophy}</h2>
      <p style="opacity:0.9; margin-bottom:8px;">${t.sport} • Instituted in ${t.yearInstituted}</p>
      <div style="font-size:0.85rem; font-weight:600; background:rgba(0,0,0,0.3); display:inline-block; padding:4px 12px; border-radius:20px;">
        Tournament: ${t.tournament}
      </div>
    </div>

    <div style="background:rgba(255,176,31,0.1); border-left:3px solid var(--primary-gold); padding:14px; border-radius:10px; margin-bottom:20px;">
      <h4 style="color:var(--primary-gold); margin:0 0 4px; font-size:0.9rem; text-transform:uppercase;">Historical Namesake</h4>
      <p style="color:#fff; font-weight:700; font-size:1.1rem; margin:0;">${t.namesake}</p>
      <span style="font-size:0.85rem; color:#cbd5e1;">Category: ${t.namesakeCategory}</span>
    </div>

    <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size:1.1rem;">Historical Background & Namesake Biography</h4>
    <p style="color:#cbd5e1; line-height:1.6; margin-bottom:20px;">${t.historicalBackground}</p>

    <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size:1.1rem;">Sporting Significance & Impact</h4>
    <p style="color:#cbd5e1; line-height:1.6;">${t.significance}</p>
  `;

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('trophy-modal')?.classList.remove('active');
}

/* --------------------------------------------------------------------------
   2. Interactive Trophy-to-Namesake Matching Game
   -------------------------------------------------------------------------- */
function initMatchingGame() {
  const trophyCol = document.getElementById('trophies-tiles-container');
  const namesakeCol = document.getElementById('namesakes-tiles-container');
  if (!trophyCol || !namesakeCol) return;

  selectedTrophyTile = null;
  selectedNamesakeTile = null;
  matchedCount = 0;
  updateMatchScore();

  // Shuffle trophies and namesakes independently
  const trophies = matchingPairsData.map(p => ({ id: p.trophy, text: p.trophy, pair: p.namesake })).sort(() => Math.random() - 0.5);
  const namesakes = matchingPairsData.map(p => ({ id: p.namesake, text: p.namesake, pair: p.trophy })).sort(() => Math.random() - 0.5);

  trophyCol.innerHTML = trophies.map(t => `
    <div class="matching-tile trophy-tile" data-pair="${t.pair}" data-val="${t.text}">
      🏆 <strong>${t.text}</strong>
    </div>
  `).join('');

  namesakeCol.innerHTML = namesakes.map(n => `
    <div class="matching-tile namesake-tile" data-pair="${n.pair}" data-val="${n.text}">
      👤 <strong>${n.text}</strong>
    </div>
  `).join('');

  // Event handlers
  trophyCol.querySelectorAll('.trophy-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      trophyCol.querySelectorAll('.trophy-tile').forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      selectedTrophyTile = tile;
      checkMatchAttempt();
    });
  });

  namesakeCol.querySelectorAll('.namesake-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      namesakeCol.querySelectorAll('.namesake-tile').forEach(n => n.classList.remove('selected'));
      tile.classList.add('selected');
      selectedNamesakeTile = tile;
      checkMatchAttempt();
    });
  });
}

function checkMatchAttempt() {
  if (!selectedTrophyTile || !selectedNamesakeTile) return;

  const trophyPairNeeded = selectedTrophyTile.getAttribute('data-pair');
  const selectedNamesakeVal = selectedNamesakeTile.getAttribute('data-val');

  if (trophyPairNeeded === selectedNamesakeVal) {
    // Match success!
    selectedTrophyTile.classList.remove('selected');
    selectedNamesakeTile.classList.remove('selected');

    selectedTrophyTile.classList.add('matched');
    selectedNamesakeTile.classList.add('matched');

    selectedTrophyTile = null;
    selectedNamesakeTile = null;
    matchedCount++;
    updateMatchScore();

    if (matchedCount === matchingPairsData.length) {
      setTimeout(() => {
        alert("🎉 Congratulations! You have successfully matched all historical trophies with their namesakes!");
      }, 300);
    }
  } else {
    // Incorrect match highlight shake
    selectedTrophyTile.style.borderColor = "#ef4444";
    selectedNamesakeTile.style.borderColor = "#ef4444";

    setTimeout(() => {
      if (selectedTrophyTile) selectedTrophyTile.style.borderColor = "rgba(255,255,255,0.1)";
      if (selectedNamesakeTile) selectedNamesakeTile.style.borderColor = "rgba(255,255,255,0.1)";
      selectedTrophyTile?.classList.remove('selected');
      selectedNamesakeTile?.classList.remove('selected');
      selectedTrophyTile = null;
      selectedNamesakeTile = null;
    }, 600);
  }
}

function updateMatchScore() {
  const badge = document.getElementById('match-score-badge');
  if (badge) badge.innerText = `Score: ${matchedCount} / ${matchingPairsData.length}`;
}

/* --------------------------------------------------------------------------
   3. Trophy Heritage Quiz Engine
   -------------------------------------------------------------------------- */
function initQuizEngine() {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const box = document.getElementById('quiz-content');
  if (!box) return;

  if (currentQuizIndex >= trophyQuizQuestions.length) {
    box.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <h3 style="font-size:1.8rem; color:var(--primary-gold); margin-bottom:12px;">Quiz Complete! 🎉</h3>
        <p style="font-size:1.2rem; color:#fff; margin-bottom:20px;">Your Final Score: <strong>${quizScore} / ${trophyQuizQuestions.length}</strong></p>
        <button class="subnav-btn active" id="quiz-restart-btn">Restart Quiz 🔄</button>
      </div>
    `;
    document.getElementById('quiz-restart-btn')?.addEventListener('click', initQuizEngine);
    return;
  }

  const q = trophyQuizQuestions[currentQuizIndex];
  box.innerHTML = `
    <div style="font-size:0.9rem; color:var(--primary-gold); font-weight:700; margin-bottom:10px;">Question ${currentQuizIndex + 1} of ${trophyQuizQuestions.length}</div>
    <h3 style="font-size:1.3rem; margin-bottom:20px; color:#fff; line-height:1.4;">${q.question}</h3>
    
    <div>
      ${q.options.map((opt, i) => `
        <button class="quiz-option" data-index="${i}">${opt}</button>
      `).join('')}
    </div>

    <div id="quiz-explanation" style="margin-top:20px; display:none; padding:14px; border-radius:10px; background:rgba(255,176,31,0.1); border-left:3px solid var(--primary-gold); font-size:0.95rem;"></div>
  `;

  box.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      handleQuizAnswer(idx, q.answer, q.explanation);
    });
  });
}

function handleQuizAnswer(selectedIdx, correctIdx, explanation) {
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, i) => {
    opt.disabled = true;
    if (i === correctIdx) opt.classList.add('correct');
    if (i === selectedIdx && i !== correctIdx) opt.classList.add('incorrect');
  });

  if (selectedIdx === correctIdx) quizScore++;

  const expBox = document.getElementById('quiz-explanation');
  if (expBox) {
    expBox.style.display = 'block';
    expBox.innerHTML = `<strong>${selectedIdx === correctIdx ? '✅ Correct!' : '❌ Incorrect.'}</strong> ${explanation}`;
  }

  setTimeout(() => {
    currentQuizIndex++;
    renderQuizQuestion();
  }, 3200);
}

/* --------------------------------------------------------------------------
   4. Subnav Smooth Scrolling
   -------------------------------------------------------------------------- */
function initSubnav() {
  const btns = document.querySelectorAll('.subnav-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Theme Support
   -------------------------------------------------------------------------- */
function initThemeSupport() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });
}
