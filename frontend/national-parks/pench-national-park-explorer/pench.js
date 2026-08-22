/**
 * Pench National Park Explorer — Interactive Logic
 * Handles DOM rendering, theme toggling, and interactive map/gallery features.
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    renderQuickStats();
    renderHistory();
    renderJungleBook();
    renderPenchRiver();
    renderWildlife();
    renderSafariInfo();
    renderInteractiveMap();
    renderGalleryGrid();
    bindEvents();
  });

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    }
  }

  function bindEvents() {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeBtn.textContent = isLight ? '🌙' : '☀️';
      });
    }

    const lbClose = document.getElementById('lightbox-close');
    if (lbClose) lbClose.addEventListener('click', closeLightbox);

    const lbModal = document.getElementById('lightbox-modal');
    if (lbModal) {
      lbModal.addEventListener('click', function(e) {
        if (e.target === lbModal) closeLightbox();
      });
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function renderQuickStats() {
    const container = document.getElementById('stats-grid');
    if (!container || typeof PENCH_INFO === 'undefined') return;

    let html = '';
    PENCH_INFO.quickStats.forEach(function(st) {
      html += `
        <div class="glass-card stat-card">
          <div class="stat-icon">${st.icon}</div>
          <span class="stat-value">${st.value}</span>
          <span class="stat-label">${st.label}</span>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderHistory() {
    const container = document.getElementById('history-timeline');
    if (!container || typeof HISTORY === 'undefined') return;

    let html = '';
    HISTORY.forEach(function(item) {
      html += `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="glass-card">
            <div style="font-weight:800; font-size:1.2rem; color:var(--pench-accent-bright); margin-bottom:0.4rem;">${item.year}</div>
            <h4 style="margin-bottom:0.5rem;">${item.title}</h4>
            <p style="font-size:0.92rem; color:var(--pench-muted); line-height:1.6;">${item.description}</p>
          </div>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderJungleBook() {
    const container = document.getElementById('jungle-book-box');
    if (!container || typeof JUNGLE_BOOK === 'undefined') return;

    const highlightsHtml = JUNGLE_BOOK.keyHighlights.map(i => `<li>${i}</li>`).join('');

    container.innerHTML = `
      <h3 style="font-size:1.5rem; color:var(--pench-accent-bright); margin-bottom:0.5rem;">📖 ${JUNGLE_BOOK.title}</h3>
      <p style="line-height:1.7; margin-bottom:1rem;">${JUNGLE_BOOK.description}</p>
      <h4 style="margin-top:1.5rem; margin-bottom:0.5rem;">Kipling Connection Highlights:</h4>
      <ul class="initiatives-list">${highlightsHtml}</ul>
    `;
  }

  function renderPenchRiver() {
    const container = document.getElementById('pench-river-box');
    if (!container || typeof PENCH_RIVER === 'undefined') return;

    container.innerHTML = `
      <h3 style="font-size:1.5rem; color:var(--pench-accent-bright); margin-bottom:0.5rem;">💧 ${PENCH_RIVER.title}</h3>
      <p style="line-height:1.7; color:var(--pench-muted);">${PENCH_RIVER.description}</p>
    `;
  }

  function renderWildlife() {
    const container = document.getElementById('wildlife-grid');
    if (!container || typeof WILDLIFE === 'undefined') return;

    let html = '';
    WILDLIFE.forEach(function(w) {
      html += `
        <div class="glass-card wildlife-card">
          <img src="${w.image}" alt="${w.name}" loading="lazy" onerror="this.style.display='none'">
          <h3 style="font-size:1.3rem; margin-bottom:0.2rem;">${w.icon} ${w.name}</h3>
          <div style="font-style:italic; font-size:0.85rem; color:var(--pench-accent-bright); margin-bottom:0.8rem;">${w.scientificName}</div>
          <span style="display:inline-block; padding:0.2rem 0.6rem; background:rgba(220,38,38,0.2); color:#f87171; border-radius:999px; font-size:0.75rem; font-weight:700; margin-bottom:0.8rem;">${w.status}</span>
          <p style="font-size:0.9rem; color:var(--pench-muted); line-height:1.5;">${w.description}</p>
        </div>`;
    });
    container.innerHTML = html;
  }

  function renderSafariInfo() {
    const container = document.getElementById('safari-info-box');
    if (!container || typeof SAFARI_INFO === 'undefined') return;

    const zonesHtml = SAFARI_INFO.zones.map(z => `
      <div class="glass-card safari-zone-card">
        <h4 style="margin-bottom:0.5rem; color:var(--pench-accent-bright);">${z.name}</h4>
        <p style="font-size:0.9rem; color:var(--pench-muted); line-height:1.5;">${z.description}</p>
      </div>`).join('');

    container.innerHTML = `
      <p style="line-height:1.7; margin-bottom:1rem;">${SAFARI_INFO.description}</p>
      <div class="safari-zone-grid">${zonesHtml}</div>
      <ul class="safari-meta-list">
        <li><strong>Timings:</strong> ${SAFARI_INFO.timings}</li>
        <li><strong>Vehicles:</strong> ${SAFARI_INFO.vehicleTypes}</li>
        <li><strong>Closed:</strong> ${SAFARI_INFO.closedDays}</li>
        <li><strong>Tip:</strong> ${SAFARI_INFO.bookingTip}</li>
      </ul>
    `;
  }

  function renderInteractiveMap() {
    const container = document.getElementById('map-hotspots-layer');
    const infoPopup = document.getElementById('map-info-popup');
    if (!container || typeof MAP_HOTSPOTS === 'undefined') return;

    let html = '';
    MAP_HOTSPOTS.forEach(function(spot) {
      const icon = spot.category === 'gate' ? '🚪' : spot.category === 'water' ? '💧' : '📍';
      html += `<button type="button" class="map-hotspot-pin" style="left:${spot.x}%; top:${spot.y}%;" data-spot-id="${spot.id}" aria-label="${spot.name}">${icon}</button>`;
    });
    container.innerHTML = html;

    container.querySelectorAll('.map-hotspot-pin').forEach(function(pin) {
      pin.addEventListener('click', function() {
        const spot = MAP_HOTSPOTS.find(s => s.id === pin.dataset.spotId);
        if (spot && infoPopup) {
          infoPopup.innerHTML = `<h4 style="color:var(--pench-accent-bright); margin-bottom:0.3rem;">${spot.name}</h4><p style="font-size:0.85rem; color:var(--pench-muted);">${spot.description}</p>`;
          infoPopup.classList.remove('hidden');
        }
      });
    });
  }

  function renderGalleryGrid() {
    const container = document.getElementById('gallery-grid');
    if (!container || typeof GALLERY_IMAGES === 'undefined') return;

    let html = '';
    GALLERY_IMAGES.forEach(function(img, idx) {
      html += `
        <div class="gallery-item" data-idx="${idx}">
          <img class="gallery-img" src="${img.url}" alt="${img.title}" loading="lazy">
          <div class="gallery-overlay">
            <h4 style="margin-bottom:0.2rem;">${img.title}</h4>
            <p style="font-size:0.8rem; opacity:0.9;">${img.caption}</p>
          </div>
        </div>`;
    });
    container.innerHTML = html;

    container.querySelectorAll('.gallery-item').forEach(function(item) {
      item.addEventListener('click', function() {
        openLightbox(parseInt(item.dataset.idx, 10));
      });
    });
  }

  function openLightbox(idx) {
    if (typeof GALLERY_IMAGES === 'undefined' || !GALLERY_IMAGES[idx]) return;
    const modal = document.getElementById('lightbox-modal');
    const imgEl = document.getElementById('lightbox-img');
    const capEl = document.getElementById('lightbox-caption');
    if (!modal || !imgEl || !capEl) return;

    imgEl.src = GALLERY_IMAGES[idx].url;
    capEl.textContent = GALLERY_IMAGES[idx].title + ' — ' + GALLERY_IMAGES[idx].caption;
    modal.classList.remove('hidden');
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.add('hidden');
  }
})();