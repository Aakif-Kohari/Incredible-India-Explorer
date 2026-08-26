import { 
  evolutionTimelineData, 
  designMaterialsComparison, 
  namingChangesArchive, 
  quizQuestions 
} from './evolution-data.js';

// Global App State
let currentEraFilter = 'all';
let currentQuizIndex = 0;
let quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initComparisonSection();
  initRenamingTable();
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

  const btnAll = document.getElementById('filter-all');
  const btnEarliest = document.getElementById('filter-earliest');
  const btnColonial = document.getElementById('filter-colonial');
  const btnPost = document.getElementById('filter-post');
  const btnModern = document.getElementById('filter-modern');

  const filterBtns = [btnAll, btnEarliest, btnColonial, btnPost, btnModern];

  btnAll?.addEventListener('click', () => setFilter('all', btnAll, filterBtns));
  btnEarliest?.addEventListener('click', () => setFilter('Earliest & Traditional', btnEarliest, filterBtns));
  btnColonial?.addEventListener('click', () => setFilter('Colonial Era', btnColonial, filterBtns));
  btnPost?.addEventListener('click', () => setFilter('Post-Independence Era', btnPost, filterBtns));
  btnModern?.addEventListener('click', () => setFilter('Modern Era', btnModern, filterBtns));

  // Modal close listeners
  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('timeline-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'timeline-modal') closeModal();
  });

  renderTimeline();
}

function setFilter(era, activeBtn, allBtns) {
  currentEraFilter = era;
  allBtns.forEach(btn => btn?.classList.remove('active'));
  activeBtn?.classList.add('active');
  renderTimeline();
}

function renderTimeline() {
  const container = document.getElementById('timeline-wrapper');
  if (!container) return;

  const filtered = evolutionTimelineData.filter(item => {
    return currentEraFilter === 'all' || item.era.includes(currentEraFilter);
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="padding:30px; color:#94a3b8;">No trophy milestones found for this era.</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="timeline-item" data-year="${item.year}">
      <div class="timeline-marker"></div>
      <div class="timeline-card">
        <span class="timeline-era-tag">${item.era} • ${item.period}</span>
        <h3>${item.icon} ${item.title}</h3>
        <div class="subtitle">${item.subtitle}</div>
        <div class="materials-badge">🛠️ Materials: ${item.materials}</div>
        <p>${item.description}</p>
        <div style="margin-top:12px; font-size:0.85rem; color:var(--primary-gold); font-weight:600;">Click card for full design features & history →</div>
      </div>
    </div>
  `).join('');

  // Add click handlers for modals
  container.querySelectorAll('.timeline-card').forEach((card, idx) => {
    card.addEventListener('click', () => {
      openTimelineModal(filtered[idx]);
    });
  });
}

function openTimelineModal(item) {
  const modal = document.getElementById('timeline-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="background:linear-gradient(135deg, #1e293b, #0f172a); padding:24px; border-radius:14px; color:#fff; margin-bottom:20px; border:1px solid rgba(255,176,31,0.3);">
      <div style="font-size:2.8rem; margin-bottom:8px;">${item.icon}</div>
      <span style="background:rgba(255,176,31,0.2); color:var(--primary-gold); font-size:0.8rem; font-weight:700; padding:4px 12px; border-radius:12px; text-transform:uppercase;">${item.era} (${item.period})</span>
      <h2 style="font-size:1.8rem; margin:10px 0 4px;">${item.title}</h2>
      <p style="color:var(--primary-saffron); font-weight:500;">${item.subtitle}</p>
    </div>

    <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size:1.1rem;">Design Features & Aesthetics</h4>
    <p style="color:#cbd5e1; line-height:1.6; margin-bottom:16px;"><strong>🎨 Key Feature:</strong> ${item.designFeature}</p>

    <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size:1.1rem;">Materials & Craftsmanship</h4>
    <p style="color:#cbd5e1; line-height:1.6; margin-bottom:16px;"><strong>🔨 Construction:</strong> ${item.materials}</p>

    <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size:1.1rem;">Historical Narrative & Legacy</h4>
    <p style="color:#cbd5e1; line-height:1.6;">${item.description}</p>
  `;

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('timeline-modal')?.classList.remove('active');
}

/* --------------------------------------------------------------------------
   2. Design & Material Comparison
   -------------------------------------------------------------------------- */
function initComparisonSection() {
  const container = document.getElementById('comparison-container');
  if (!container) return;

  container.innerHTML = designMaterialsComparison.map(c => `
    <div class="comparison-card">
      <h3>${c.era}</h3>
      <div class="comp-row"><strong>🛠️ Primary Materials:</strong> ${c.primaryMaterials}</div>
      <div class="comp-row"><strong>🎨 Design Aesthetics:</strong> ${c.designStyle}</div>
      <div class="comp-row"><strong>🏛️ Symbolism:</strong> ${c.symbolism}</div>
      <div class="comp-row"><strong>🏆 Iconic Examples:</strong> ${c.keyExamples}</div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   3. Renaming Archive Table
   -------------------------------------------------------------------------- */
function initRenamingTable() {
  const tbody = document.getElementById('renaming-tbody');
  if (!tbody) return;

  tbody.innerHTML = namingChangesArchive.map(n => `
    <tr>
      <td><strong style="color:#ef4444;">${n.originalName}</strong></td>
      <td><strong style="color:#10b981;">${n.newName}</strong></td>
      <td style="font-size:0.9rem; color:#cbd5e1; line-height:1.5;">${n.reason}</td>
    </tr>
  `).join('');
}

/* --------------------------------------------------------------------------
   4. Quiz Engine
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
        <h3 style="font-size:1.8rem; color:var(--primary-gold); margin-bottom:12px;">Quiz Complete! 🎉</h3>
        <p style="font-size:1.2rem; color:#fff; margin-bottom:20px;">Your Final Score: <strong>${quizScore} / ${quizQuestions.length}</strong></p>
        <button class="subnav-btn active" id="quiz-restart-btn">Restart Quiz 🔄</button>
      </div>
    `;
    document.getElementById('quiz-restart-btn')?.addEventListener('click', initQuizEngine);
    return;
  }

  const q = quizQuestions[currentQuizIndex];
  box.innerHTML = `
    <div style="font-size:0.9rem; color:var(--primary-gold); font-weight:700; margin-bottom:10px;">Question ${currentQuizIndex + 1} of ${quizQuestions.length}</div>
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
   5. Subnav Smooth Scrolling
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
   6. Theme Support
   -------------------------------------------------------------------------- */
function initThemeSupport() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });
}
