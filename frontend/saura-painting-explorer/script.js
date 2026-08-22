/**
 * Saura Painting Explorer — Script
 * Issue: #1690
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavTabs();
  initSymbols();
  initGallery();
  initPalette();
  initMaterials();
  initQuiz();
  initReferences();
  initModalClose();
  initMobileMenu();
});

// ── Theme Toggle ────────────────────────────────────────────────
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;
  const savedTheme = localStorage.getItem('saura_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeBtn.textContent = '🌙';
  } else {
    themeBtn.textContent = '☀️';
  }
  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    themeBtn.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('saura_theme', isLight ? 'light' : 'dark');
  });
}

// ── Nav Tab Scroll-Spy ──────────────────────────────────────────
function initNavTabs() {
  const tabs = document.querySelectorAll('.saura-tab-link');
  if (tabs.length === 0) return;
  const sections = document.querySelectorAll('.saura-section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('href') === `#${current}`) {
        tab.classList.add('active');
      }
    });
  });
}

// ── Symbols ─────────────────────────────────────────────────────
function initSymbols() {
  const container = document.getElementById('symbols-container');
  if (!container || !window.SAURA_DATA) return;
  container.innerHTML = window.SAURA_DATA.symbols.map(s => `
    <div class="symbol-card" data-id="${s.id}" data-testid="symbol-card-${s.id}">
      <span class="symbol-glyph">${s.glyph}</span>
      <h3 class="symbol-name">${s.name}</h3>
    </div>
  `).join('');

  container.querySelectorAll('.symbol-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const sym = window.SAURA_DATA.symbols.find(s => s.id === id);
      if (sym) openSymbolModal(sym);
    });
  });
}

function openSymbolModal(s) {
  const modal = document.getElementById('symbol-modal');
  const body = document.getElementById('modal-body-content');
  if (!modal || !body) return;
  body.innerHTML = `
    <span class="modal-glyph">${s.glyph}</span>
    <h2 class="modal-name">${s.name}</h2>
    <div class="modal-section">
      <h4>Meaning</h4>
      <p>${s.meaning}</p>
    </div>
    <div class="modal-section">
      <h4>Cultural Significance</h4>
      <p>${s.significance}</p>
    </div>
  `;
  modal.classList.add('active');
  body.scrollTop = 0;
}

// ── Gallery ─────────────────────────────────────────────────────
function initGallery() {
  const container = document.getElementById('gallery-container');
  if (!container || !window.SAURA_DATA) return;
  container.innerHTML = window.SAURA_DATA.gallery.map(g => `
    <div class="gallery-card" data-testid="gallery-card-${g.id}">
      <span class="gallery-emoji">${g.emoji}</span>
      <h3 class="gallery-title">${g.title}</h3>
      <p class="gallery-desc">${g.description}</p>
      <p class="gallery-palette">🎨 ${g.palette}</p>
    </div>
  `).join('');
}

// ── Palette ─────────────────────────────────────────────────────
function initPalette() {
  const container = document.getElementById('palette-container');
  if (!container || !window.SAURA_DATA) return;
  container.innerHTML = window.SAURA_DATA.palette.map(p => `
    <div class="palette-swatch" data-testid="palette-swatch-${p.hex.replace('#','')}">
      <div class="swatch-color" style="background:${p.hex};"></div>
      <div class="swatch-info">
        <h4 class="swatch-name">${p.name}</h4>
        <p class="swatch-source">${p.source}</p>
        <p class="swatch-sig">${p.significance}</p>
      </div>
    </div>
  `).join('');
}

// ── Materials ───────────────────────────────────────────────────
function initMaterials() {
  const container = document.getElementById('materials-container');
  if (!container || !window.SAURA_DATA) return;
  container.innerHTML = window.SAURA_DATA.materials.map(m => `
    <div class="material-card" data-testid="material-card-${m.icon}">
      <span class="material-icon">${m.icon}</span>
      <div>
        <h4 class="material-name">${m.name}</h4>
        <p class="material-desc">${m.desc}</p>
      </div>
    </div>
  `).join('');
}

// ── Quiz ────────────────────────────────────────────────────────
let currentQuizIndex = 0;
let quizScore = 0;

function initQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const box = document.getElementById('quiz-content');
  if (!box || !window.SAURA_DATA) return;
  const questions = window.SAURA_DATA.quiz;

  if (currentQuizIndex >= questions.length) {
    box.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <h3 style="font-size:1.8rem; color:var(--saura-secondary); margin-bottom:12px;">Quiz Complete! 🎉</h3>
        <p style="font-size:1.2rem; color:var(--saura-text); margin-bottom:20px;">
          Your Final Score: <strong>${quizScore} / ${questions.length}</strong>
        </p>
        <button class="quiz-restart" id="quiz-restart-btn">Restart Quiz 🔄</button>
      </div>
    `;
    document.getElementById('quiz-restart-btn')?.addEventListener('click', initQuiz);
    return;
  }

  const q = questions[currentQuizIndex];
  box.innerHTML = `
    <div class="quiz-progress">Question ${currentQuizIndex + 1} of ${questions.length}</div>
    <h3 class="quiz-question">${q.question}</h3>
    <div>
      ${q.options.map((opt, i) => `<button class="quiz-option" data-index="${i}">${opt}</button>`).join('')}
    </div>
    <div class="quiz-explanation" id="quiz-explanation"></div>
  `;

  box.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
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
  }, 3000);
}

// ── References ──────────────────────────────────────────────────
function initReferences() {
  const container = document.getElementById('references-container');
  if (!container || !window.SAURA_DATA) return;
  container.innerHTML = window.SAURA_DATA.references.map(r => `
    <div class="reference-item">
      <a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.title}</a>
      <span class="reference-note">${r.note}</span>
    </div>
  `).join('');
}

// ── Modal Close ─────────────────────────────────────────────────
function initModalClose() {
  const modal = document.getElementById('symbol-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });
  modal?.addEventListener('click', (e) => {
    if (e.target.id === 'symbol-modal') modal.classList.remove('active');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal?.classList.remove('active');
  });
}

// ── Mobile Menu ─────────────────────────────────────────────────
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });
}
