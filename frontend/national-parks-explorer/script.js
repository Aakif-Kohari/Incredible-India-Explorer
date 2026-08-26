/**
 * National Parks of India Explorer — Application Logic
 * Renders stats, searchable/filterable park cards, an interactive India map,
 * featured parks, and a rotating "Did You Know?" fact carousel.
 */

(function () {
  'use strict';

  const FALLBACK_IMG = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80';

  // India bounding box projection (viewBox 612 x 420)
  const MAP_BOUNDS = { latMin: 8, latMax: 37, lngMin: 68, lngMax: 97 };

  function init() {
    const root = document.getElementById('np-root');
    if (!root || typeof NATIONAL_PARKS === 'undefined') return;

    renderStats();
    renderFilters();
    renderCards(NATIONAL_PARKS, true);
    renderMap();
    renderFacts();
    bindEvents();
    observeReveals();
  }

  function project(lat, lng) {
    const x = ((lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)) * 900;
    const y = ((MAP_BOUNDS.latMax - lat) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) * 420;
    return { x: x.toFixed(2), y: y.toFixed(2) };
  }

  /* ---- Stats ---- */
  function renderStats() {
    const states = new Set(NATIONAL_PARKS.map(p => p.state));
    const tigers = NATIONAL_PARKS.filter(p => p.isTigerReserve).length;
    const unesco = NATIONAL_PARKS.filter(p => p.isUNESCO).length;

    const data = [
      { value: NATIONAL_PARKS.length + '+', label: 'Featured National Parks', icon: '🌳' },
      { value: tigers, label: 'Tiger Reserves', icon: '🐅' },
      { value: unesco, label: 'UNESCO Sites', icon: '🏛️' },
      { value: states.size, label: 'States & UTs Covered', icon: '🗺️' }
    ];
    const grid = document.getElementById('stats-cards');
    grid.innerHTML = data.map(s => `
      <div class="stat-card reveal">
        <div class="stat-icon">${s.icon}</div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  /* ---- Filters ---- */
  function renderFilters() {
    const stateSelect = document.getElementById('filter-state');
    const states = [...new Set(NATIONAL_PARKS.map(p => p.state))].sort();
    stateSelect.innerHTML =
      '<option value="all">All States & UTs</option>' +
      states.map(s => `<option value="${s}">${s}</option>`).join('');

    const typeSelect = document.getElementById('filter-type');
    const types = [...new Set(NATIONAL_PARKS.map(p => p.type))];
    typeSelect.innerHTML =
      '<option value="all">All Categories</option>' +
      types.map(t => `<option value="${t}">${t}</option>`).join('');
  }

  /* ---- Cards ---- */
  function renderCards(list, featured) {
    const grid = document.getElementById('parks-grid');
    if (!grid) return;

    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🍃</div>
          <h3>No Parks Found</h3>
          <p>Try adjusting your search or filters to discover national parks.</p>
        </div>`;
      const results = document.getElementById('results-count');
      if (results) results.textContent = 'No parks match';
      return;
    }

    grid.innerHTML = list.map(p => `
      <article class="park-card reveal" data-id="${p.id}" data-state="${p.state}" data-type="${p.type}">
        <div class="park-card-media">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="window.__npOnErr(this)">
          ${p.isUNESCO ? '<span class="badge badge-unesco">UNESCO</span>' : ''}
          ${p.isTigerReserve ? '<span class="badge badge-tiger">Tiger Reserve</span>' : ''}
        </div>
        <div class="park-card-body">
          <h3 class="park-card-name">${p.name}</h3>
          <div class="park-card-meta">
            <span class="park-meta" title="State">📍 ${p.state}</span>
            <span class="park-meta" title="Established">🗓️ Est. ${p.established}</span>
          </div>
          <p class="park-card-desc">${p.description}</p>
          <a href="${p.explorerUrl ? p.explorerUrl : '#'}" class="park-explore-btn" data-explore="1">Explore ${p.name.split(' ')[0]} Park &rarr;</a>
        </div>
      </article>
    `).join('');

    const results = document.getElementById('results-count');
    if (results) results.textContent = `Showing ${list.length} of ${NATIONAL_PARKS.length} parks`;
  }

  /* ---- Map ---- */
  function renderMap() {
    const body = document.getElementById('map-markers');
    if (!body) return;
    body.innerHTML = NATIONAL_PARKS.map(p => {
      const pos = project(p.coordinates.lat, p.coordinates.lng);
      const type = p.isTigerReserve ? 'tiger' : p.isUNESCO ? 'unesco' : 'park';
      return `<button type="button" class="map-dot map-dot-${type}" data-id="${p.id}"
                style="left:${pos.x/900*100}%; top:${pos.y/420*100}%"
                aria-label="${p.name}" title="${p.name}"></button>`;
    }).join('');

    body.addEventListener('click', (e) => {
      const dot = e.target.closest('.map-dot');
      if (!dot) return;
      selectPark(dot.getAttribute('data-id'));
    });
  }


  function selectPark(id) {
    const card = document.querySelector(`.park-card[data-id="${id}"]`);
    if (!card) return;
    document.querySelectorAll('.park-card').forEach(c => c.classList.remove('park-card-active'));
    card.classList.add('park-card-active');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---- Did You Know ---- */
  function renderFacts() {
    const track = document.getElementById('fact-track');
    if (!track || typeof NATIONAL_PARK_FACTS === 'undefined') return;

    track.innerHTML = NATIONAL_PARK_FACTS.map(f => `
      <div class="fact-slide">
        <div class="fact-icon">${f.icon}</div>
        <h4>${f.title}</h4>
        <p>${f.text}</p>
      </div>
    `).join('');

    let i = 0;
    const slides = track.children;
    function show() {
      for (let s = 0; s < slides.length; s++) slides[s].style.display = s === i ? 'block' : 'none';
    }
    show();
    setInterval(() => { i = (i + 1) % slides.length; show(); }, 5000);

    const prev = document.getElementById('fact-prev');
    const next = document.getElementById('fact-next');
    if (prev) prev.addEventListener('click', () => { i = (i - 1 + slides.length) % slides.length; show(); });
    if (next) next.addEventListener('click', () => { i = (i + 1) % slides.length; show(); });
  }

  /* ---- Events ---- */
  function bindEvents() {
    const search = document.getElementById('search-parks');
    const stateFilter = document.getElementById('filter-state');
    const typeFilter = document.getElementById('filter-type');
    const reset = document.getElementById('btn-reset');

    const apply = () => {
      const q = (search.value || '').toLowerCase().trim();
      const state = stateFilter.value;
      const type = typeFilter.value;
      const filtered = NATIONAL_PARKS.filter(p => {
        const matchesQ =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        const matchesState = state === 'all' || p.state === state;
        const matchesType = type === 'all' || p.type === type;
        return matchesQ && matchesState && matchesType;
      });
      renderCards(filtered);
    };

    search.addEventListener('input', apply);
    stateFilter.addEventListener('change', apply);
    typeFilter.addEventListener('change', apply);
    if (reset) reset.addEventListener('click', () => {
      search.value = '';
      stateFilter.value = 'all';
      typeFilter.value = 'all';
      renderCards(NATIONAL_PARKS);
    });
  }

  function observeReveals() {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('reveal-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  window.__npOnErr = renderErr;
  function renderErr(img) {
    if (!img) return;
    if (!img.dataset.fallback) { img.dataset.fallback = '1'; img.src = FALLBACK_IMG; }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();