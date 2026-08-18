import cinemaData from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const { eras, films, regionalIndustries, facts } = cinemaData;
  
  // DOM Elements
  const timelineContainer = document.getElementById('era-timeline');
  const filmGrid = document.getElementById('film-grid');
  const regionalGrid = document.getElementById('regional-grid');
  const industryFilter = document.getElementById('industry-filter');
  const noResults = document.getElementById('no-results');
  
  const modalOverlay = document.getElementById('film-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalBody = document.getElementById('modal-body');
  
  const factText = document.getElementById('fact-text');

  // State
  let currentEra = 'all';

  // --- Initialize Trivia ---
  const rotateFact = () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factText.textContent = randomFact;
  };
  rotateFact();
  setInterval(rotateFact, 8000);

  // --- Render Regional Explorer ---
  const renderRegionalIndustries = () => {
    regionalGrid.innerHTML = '';
    regionalIndustries.forEach(region => {
      const card = document.createElement('div');
      card.className = 'regional-card';
      card.innerHTML = `
        <h4>${region.name}</h4>
        <span class="regional-alias">${region.alias}</span>
        <p>${region.description}</p>
      `;
      regionalGrid.appendChild(card);
    });
  };

  // --- Render Era Timeline ---
  const renderTimeline = () => {
    timelineContainer.innerHTML = '';
    eras.forEach(era => {
      const btn = document.createElement('button');
      btn.className = `timeline-btn ${currentEra === era.id ? 'active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', currentEra === era.id);
      btn.innerHTML = `<span>${era.icon}</span> ${era.name}`;
      
      btn.addEventListener('click', () => {
        currentEra = era.id;
        document.querySelectorAll('.timeline-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        filterAndRenderFilms();
      });
      
      timelineContainer.appendChild(btn);
    });
  };

  // --- Render Films ---
  const filterAndRenderFilms = () => {
    const selectedIndustry = industryFilter.value;
    
    const filtered = films.filter(film => {
      const matchEra = currentEra === 'all' || film.era === currentEra;
      const matchIndustry = selectedIndustry === 'All' || film.industry === selectedIndustry;
      return matchEra && matchIndustry;
    });

    renderFilmGallery(filtered);
  };

  const renderFilmGallery = (filteredFilms) => {
    filmGrid.innerHTML = '';
    
    if (filteredFilms.length === 0) {
      noResults.style.display = 'block';
      return;
    }
    
    noResults.style.display = 'none';

    filteredFilms.forEach((film) => {
      const card = document.createElement('article');
      card.className = 'film-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View details for ${film.title}`);

      card.innerHTML = `
        <div class="film-poster-placeholder" aria-hidden="true">
          ${film.icon}
          <div class="film-year-badge">${film.year}</div>
        </div>
        <div class="film-info">
          <h4>${film.title}</h4>
          <div class="film-meta">
            <span class="film-lang"><i class="fas fa-language"></i> ${film.language}</span>
            <span class="film-director"><i class="fas fa-video"></i> ${film.director}</span>
          </div>
          <p class="film-desc">${film.description}</p>
        </div>
      `;

      card.addEventListener('click', () => openModal(film));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(film);
        }
      });

      filmGrid.appendChild(card);
    });
  };

  // --- Modal Logic ---
  const openModal = (film) => {
    const eraObj = eras.find(e => e.id === film.era) || { name: 'Unknown Era' };
    
    modalBody.innerHTML = `
      <div class="modal-hero" aria-hidden="true">${film.icon}</div>
      <div class="modal-details">
        <h2 class="modal-title">${film.title} (${film.year})</h2>
        <div class="modal-meta-bar">
          <span><i class="fas fa-video" style="color: var(--cinema-gold-light);"></i> ${film.director}</span>
          <span><i class="fas fa-language" style="color: #38bdf8;"></i> ${film.language} (${film.industry})</span>
          <span><i class="fas fa-tag" style="color: #a78bfa;"></i> ${film.genre}</span>
          <span><i class="fas fa-clock" style="color: #fca5a5;"></i> ${eraObj.name}</span>
        </div>
        
        <div class="modal-section">
          <h4><i class="fas fa-info-circle"></i> About the Film</h4>
          <p>${film.description}</p>
        </div>
        
        <div class="significance-box">
          <h4><i class="fas fa-star" style="color: var(--cinema-gold);"></i> Historical Significance</h4>
          <p>${film.significance}</p>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    closeModalBtn.focus();
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Event Listeners
  industryFilter.addEventListener('change', filterAndRenderFilms);
  
  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Init
  renderRegionalIndustries();
  renderTimeline();
  filterAndRenderFilms();
});
