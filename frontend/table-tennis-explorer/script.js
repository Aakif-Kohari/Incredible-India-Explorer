import { 
  ttEvolutionData, 
  mensSinglesHistory, 
  womensSinglesHistory, 
  doublesHistoryData, 
  majorChampionsData, 
  tacticsGuideData, 
  quizQuestions 
} from './tt-data.js';

// Global App State
let currentTab = 'mens-singles';
let currentQuizIndex = 0;
let quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initChampionshipsTable();
  initChampionsGrid();
  initTacticsShowcase();
  initQuizEngine();
  initSubnav();
  initThemeSupport();
});

/* --------------------------------------------------------------------------
   1. Evolution Timeline
   -------------------------------------------------------------------------- */
function initTimeline() {
  const container = document.getElementById('timeline-wrapper');
  if (!container) return;

  container.innerHTML = ttEvolutionData.map(item => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-card">
        <span class="timeline-period">${item.period}</span>
        <h3>${item.icon} ${item.title}</h3>
        <div class="subtitle">${item.subtitle}</div>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   2. National Championship Archive
   -------------------------------------------------------------------------- */
function initChampionshipsTable() {
  const mensBtn = document.getElementById('tab-mens-singles');
  const womensBtn = document.getElementById('tab-womens-singles');
  const doublesBtn = document.getElementById('tab-doubles');

  const searchInput = document.getElementById('tt-search');
  const stateFilter = document.getElementById('tt-state-filter');

  mensBtn?.addEventListener('click', () => {
    currentTab = 'mens-singles';
    setActiveTabBtn(mensBtn);
    renderTable();
  });

  womensBtn?.addEventListener('click', () => {
    currentTab = 'womens-singles';
    setActiveTabBtn(womensBtn);
    renderTable();
  });

  doublesBtn?.addEventListener('click', () => {
    currentTab = 'doubles';
    setActiveTabBtn(doublesBtn);
    renderTable();
  });

  searchInput?.addEventListener('input', renderTable);
  stateFilter?.addEventListener('change', renderTable);

  renderTable();
}

function setActiveTabBtn(activeBtn) {
  [document.getElementById('tab-mens-singles'), 
   document.getElementById('tab-womens-singles'), 
   document.getElementById('tab-doubles')].forEach(btn => {
    if (btn) btn.classList.remove('active');
  });
  if (activeBtn) activeBtn.classList.add('active');
}

function renderTable() {
  const tbody = document.getElementById('tt-tbody');
  const theadRow = document.getElementById('tt-table-head');
  if (!tbody || !theadRow) return;

  const searchVal = document.getElementById('tt-search')?.value.toLowerCase() || '';
  const selectedState = document.getElementById('tt-state-filter')?.value || 'all';

  if (currentTab === 'doubles') {
    theadRow.innerHTML = `
      <th>Event / Competition</th>
      <th>Champions</th>
      <th>Runner-Up / Opponents</th>
      <th>Historical Significance & Notes</th>
    `;

    const filtered = doublesHistoryData.filter(d => 
      d.event.toLowerCase().includes(searchVal) ||
      d.champions.toLowerCase().includes(searchVal) ||
      d.runnerUp.toLowerCase().includes(searchVal) ||
      d.notes.toLowerCase().includes(searchVal)
    );

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:30px; color:#94a3b8;">No doubles records match your search.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(item => `
      <tr>
        <td><span class="badge-blue">${item.event}</span></td>
        <td><strong style="color:#38bdf8;">${item.champions}</strong></td>
        <td>${item.runnerUp}</td>
        <td style="font-size:0.88rem; color:#cbd5e1;">${item.notes}</td>
      </tr>
    `).join('');
  } else {
    theadRow.innerHTML = `
      <th>Year</th>
      <th>Host Venue</th>
      <th>Champion</th>
      <th>Runner-Up</th>
      <th>State / Unit</th>
      <th>Notes & Milestones</th>
    `;

    const data = currentTab === 'mens-singles' ? mensSinglesHistory : womensSinglesHistory;

    const filtered = data.filter(item => {
      const matchesSearch = item.winner.toLowerCase().includes(searchVal) ||
                            item.venue.toLowerCase().includes(searchVal) ||
                            item.runnerUp.toLowerCase().includes(searchVal) ||
                            item.notes.toLowerCase().includes(searchVal) ||
                            item.year.toString().includes(searchVal);

      const matchesState = selectedState === 'all' || item.state.includes(selectedState);
      return matchesSearch && matchesState;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:#94a3b8;">No national championship records match your search criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(item => `
      <tr>
        <td><span class="badge-blue">${item.year}</span></td>
        <td><strong>${item.venue}</strong></td>
        <td><strong style="color:#38bdf8;">${item.winner}</strong></td>
        <td>${item.runnerUp}</td>
        <td>${item.state}</td>
        <td style="font-size:0.88rem; color:#cbd5e1;">${item.notes}</td>
      </tr>
    `).join('');
  }
}

/* --------------------------------------------------------------------------
   3. Champions & Hall of Fame
   -------------------------------------------------------------------------- */
function initChampionsGrid() {
  const mainContainer = document.getElementById('champions-container');
  const womensContainer = document.getElementById('womens-container');

  if (mainContainer) {
    mainContainer.innerHTML = majorChampionsData.slice(0, 6).map(c => renderChampionCard(c)).join('');
  }

  if (womensContainer) {
    womensContainer.innerHTML = majorChampionsData.filter(c => 
      ['Manika Batra', 'Indu Puri', 'Sreeja Akula', 'Ayhika & Sutirtha Mukherjee'].includes(c.name)
    ).map(c => renderChampionCard(c)).join('');
  }

  // Profile modal click listener
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.champion-card');
    if (card) {
      const name = card.getAttribute('data-name');
      const champion = majorChampionsData.find(item => item.name === name);
      if (champion) openChampionModal(champion);
    }
  });

  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('champion-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'champion-modal') closeModal();
  });
}

function renderChampionCard(champ) {
  return `
    <div class="champion-card" data-name="${champ.name}">
      <div class="card-header-banner" style="background:${champ.imageBg};">
        <div class="icon-avatar">🏓</div>
        <h3>${champ.name}</h3>
        <div class="title-tag">${champ.title}</div>
      </div>
      <div class="champion-card-body">
        <div>
          <div class="champion-meta">
            <span>📍 ${champ.state}</span>
            <span>⭐ Peak World Rank: #${champ.peakWorldRank}</span>
          </div>
          <p class="champion-summary">${champ.summary}</p>
        </div>
        <button class="view-profile-btn">View Detailed Bio & Achievements →</button>
      </div>
    </div>
  `;
}

function openChampionModal(champ) {
  const modal = document.getElementById('champion-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="background:${champ.imageBg}; padding:24px; border-radius:14px; color:#fff; margin-bottom:20px;">
      <h2 style="font-size:1.8rem; margin:0 0 4px;">${champ.name}</h2>
      <p style="opacity:0.9; margin-bottom:8px;">${champ.title}</p>
      <div style="font-size:0.85rem; display:flex; gap:16px;">
        <span>📍 ${champ.state}</span>
        <span>⭐ Peak World Rank: #${champ.peakWorldRank}</span>
        <span>🎂 Born: ${champ.birthYear}</span>
      </div>
    </div>

    <h4 style="color:#38bdf8; margin-bottom:8px; font-size:1.1rem;">Key Achievements & Milestones</h4>
    <ul style="padding-left:20px; color:#cbd5e1; line-height:1.6; margin-bottom:20px;">
      ${champ.achievements.map(a => `<li style="margin-bottom:6px;">${a}</li>`).join('')}
    </ul>

    <h4 style="color:#38bdf8; margin-bottom:8px; font-size:1.1rem;">Biography & Legacy</h4>
    <p style="color:#cbd5e1; line-height:1.6;">${champ.bio}</p>
  `;

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('champion-modal')?.classList.remove('active');
}

/* --------------------------------------------------------------------------
   4. Tactics Showcase
   -------------------------------------------------------------------------- */
function initTacticsShowcase() {
  const container = document.getElementById('tactics-container');
  if (!container) return;

  container.innerHTML = tacticsGuideData.map(t => `
    <div class="tactic-card">
      <div class="tactic-icon">${t.icon}</div>
      <h3>${t.title}</h3>
      <p>${t.description}</p>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   5. Quiz Engine
   -------------------------------------------------------------------------- */
function initQuizEngine() {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const box = document.getElementById('quiz-content');
  if (!box) return;

  if (currentQuizIndex >= quizQuestions.length) {
    box.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <h3 style="font-size:1.8rem; color:#38bdf8; margin-bottom:12px;">Quiz Complete! 🎉</h3>
        <p style="font-size:1.2rem; color:#fff; margin-bottom:20px;">Your Final Score: <strong>${quizScore} / ${quizQuestions.length}</strong></p>
        <button class="tab-btn active" id="quiz-restart-btn">Restart Quiz 🔄</button>
      </div>
    `;
    document.getElementById('quiz-restart-btn')?.addEventListener('click', initQuizEngine);
    return;
  }

  const q = quizQuestions[currentQuizIndex];
  box.innerHTML = `
    <div style="font-size:0.9rem; color:#38bdf8; font-weight:700; margin-bottom:10px;">Question ${currentQuizIndex + 1} of ${quizQuestions.length}</div>
    <h3 style="font-size:1.3rem; margin-bottom:20px; color:#fff; line-height:1.4;">${q.question}</h3>
    
    <div>
      ${q.options.map((opt, i) => `
        <button class="quiz-option" data-index="${i}">${opt}</button>
      `).join('')}
    </div>

    <div id="quiz-explanation" style="margin-top:20px; display:none; padding:14px; border-radius:10px; background:rgba(2,132,199,0.1); border-left:3px solid #38bdf8; font-size:0.95rem;"></div>
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
   6. Subnav Smooth Scrolling
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
   7. Theme Support
   -------------------------------------------------------------------------- */
function initThemeSupport() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });
}
