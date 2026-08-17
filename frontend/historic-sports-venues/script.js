import { 
  venuesData, 
  venueQuizQuestions 
} from './venue-data.js';

// Global App State
let currentQuizIndex = 0;
let quizScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  initMapPins();
  initVenueCatalog();
  initQuizEngine();
  initSubnav();
  initThemeSupport();
});

/* --------------------------------------------------------------------------
   1. Interactive Map Pins Engine
   -------------------------------------------------------------------------- */
function initMapPins() {
  const container = document.getElementById('pins-container');
  if (!container) return;

  container.innerHTML = venuesData.map(v => `
    <div class="map-pin" style="top:${v.coordinates.top}%; left:${v.coordinates.left}%;" data-id="${v.id}">
      <div class="pin-pulse">${v.icon}</div>
      <div class="pin-label">${v.name}</div>
    </div>
  `).join('');

  container.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const id = pin.getAttribute('data-id');
      const venue = venuesData.find(item => item.id === id);
      if (venue) openVenueModal(venue);
    });
  });
}

/* --------------------------------------------------------------------------
   2. Venue Catalog & Search Filters
   -------------------------------------------------------------------------- */
function initVenueCatalog() {
  const searchInput = document.getElementById('venue-search');
  const sportFilter = document.getElementById('sport-filter');
  const stateFilter = document.getElementById('state-filter');

  searchInput?.addEventListener('input', renderVenueCards);
  sportFilter?.addEventListener('change', renderVenueCards);
  stateFilter?.addEventListener('change', renderVenueCards);

  // Modal close listeners
  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('venue-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'venue-modal') closeModal();
  });

  renderVenueCards();
}

function renderVenueCards() {
  const container = document.getElementById('venues-cards-container');
  if (!container) return;

  const searchVal = document.getElementById('venue-search')?.value.toLowerCase() || '';
  const selectedSport = document.getElementById('sport-filter')?.value || 'all';
  const selectedState = document.getElementById('state-filter')?.value || 'all';

  const filtered = venuesData.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchVal) ||
                          v.city.toLowerCase().includes(searchVal) ||
                          v.state.toLowerCase().includes(searchVal) ||
                          v.sport.toLowerCase().includes(searchVal) ||
                          v.description.toLowerCase().includes(searchVal);

    const matchesSport = selectedSport === 'all' || v.category.includes(selectedSport);
    const matchesState = selectedState === 'all' || v.state.includes(selectedState);

    return matchesSearch && matchesSport && matchesState;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#94a3b8;">No historic venues match your search filters.</div>`;
    return;
  }

  container.innerHTML = filtered.map(v => `
    <div class="venue-card" data-id="${v.id}">
      <div class="card-header-banner" style="background:${v.accentColor};">
        <div class="venue-icon">${v.icon}</div>
        <h3>${v.name}</h3>
        <span class="sport-tag">${v.sport} • Opened ${v.openingYear}</span>
      </div>
      <div class="venue-card-body">
        <div>
          <div class="venue-meta">
            <span>📍 ${v.city}, ${v.state}</span>
            <span>🏟️ Capacity: ${v.capacity}</span>
          </div>
          <p class="venue-summary">${v.description.substring(0, 140)}...</p>
        </div>
        <button class="view-details-btn">View Historic Matches & Events →</button>
      </div>
    </div>
  `).join('');

  // Attach card click listeners
  container.querySelectorAll('.venue-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const venue = venuesData.find(item => item.id === id);
      if (venue) openVenueModal(venue);
    });
  });
}

function openVenueModal(v) {
  const modal = document.getElementById('venue-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="background:${v.accentColor}; padding:24px; border-radius:14px; color:#fff; margin-bottom:20px;">
      <div style="font-size:2.8rem; margin-bottom:8px;">${v.icon}</div>
      <h2 style="font-size:1.8rem; margin:0 0 4px;">${v.name}</h2>
      <p style="opacity:0.9; margin-bottom:8px;">📍 ${v.city}, ${v.state} • Opened in ${v.openingYear}</p>
      <div style="font-size:0.85rem; font-weight:600; background:rgba(0,0,0,0.3); display:inline-block; padding:4px 12px; border-radius:20px;">
        Seating Capacity: ${v.capacity}
      </div>
    </div>

    <div style="background:rgba(2,132,199,0.1); border-left:3px solid #38bdf8; padding:14px; border-radius:10px; margin-bottom:20px;">
      <h4 style="color:#38bdf8; margin:0 0 4px; font-size:0.9rem; text-transform:uppercase;">Current Status & Role</h4>
      <p style="color:#fff; font-weight:600; margin:0;">${v.currentStatus}</p>
    </div>

    <h4 style="color:#38bdf8; margin-bottom:8px; font-size:1.1rem;">Historic Matches & Iconic Moments</h4>
    <ul style="padding-left:20px; color:#cbd5e1; line-height:1.6; margin-bottom:20px;">
      ${v.historicMatches.map(m => `<li style="margin-bottom:6px;">${m}</li>`).join('')}
    </ul>

    <h4 style="color:#38bdf8; margin-bottom:8px; font-size:1.1rem;">Major International Events Hosted</h4>
    <ul style="padding-left:20px; color:#cbd5e1; line-height:1.6; margin-bottom:20px;">
      ${v.majorEvents.map(e => `<li style="margin-bottom:6px;">${e}</li>`).join('')}
    </ul>

    <h4 style="color:#38bdf8; margin-bottom:8px; font-size:1.1rem;">History & Architectural Significance</h4>
    <p style="color:#cbd5e1; line-height:1.6;">${v.description}</p>
  `;

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('venue-modal')?.classList.remove('active');
}

/* --------------------------------------------------------------------------
   3. Quiz Engine
   -------------------------------------------------------------------------- */
function initQuizEngine() {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const box = document.getElementById('quiz-content');
  if (!box) return;

  if (currentQuizIndex >= venueQuizQuestions.length) {
    box.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <h3 style="font-size:1.8rem; color:#38bdf8; margin-bottom:12px;">Quiz Complete! 🎉</h3>
        <p style="font-size:1.2rem; color:#fff; margin-bottom:20px;">Your Final Score: <strong>${quizScore} / ${venueQuizQuestions.length}</strong></p>
        <button class="subnav-btn active" id="quiz-restart-btn">Restart Quiz 🔄</button>
      </div>
    `;
    document.getElementById('quiz-restart-btn')?.addEventListener('click', initQuizEngine);
    return;
  }

  const q = venueQuizQuestions[currentQuizIndex];
  box.innerHTML = `
    <div style="font-size:0.9rem; color:#38bdf8; font-weight:700; margin-bottom:10px;">Question ${currentQuizIndex + 1} of ${venueQuizQuestions.length}</div>
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
