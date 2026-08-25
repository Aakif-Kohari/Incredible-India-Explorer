/**
 * script.js
 * Logic for India's Coins Through Time Landing Page (#2076)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const coinsData = window.COINS_DATA || [];
    
    // UI Elements
    const grid = document.getElementById('coin-cards-grid');
    const searchInput = document.getElementById('coin-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const resultsCounter = document.getElementById('results-counter');
    const periodFilter = document.getElementById('period-filter');
    const dynastyFilter = document.getElementById('dynasty-filter');
    const regionFilter = document.getElementById('region-filter');
    const metalFilter = document.getElementById('metal-filter');
    const noResultsMsg = document.getElementById('no-results-msg');
    const resetFiltersBtn = document.getElementById('btn-reset-filters');
    const statCountCoins = document.getElementById('stat-count-coins');

    // Map UI
    const mintHotspots = document.querySelectorAll('.mint-hotspot');
    const mapInfoDesc = document.getElementById('map-info-desc');
    const mapInfoDetails = document.getElementById('map-info-details');
    const resetMapFilterBtn = document.getElementById('btn-reset-map-filter');

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      });
    }

    // Update initial coin count stat
    if (statCountCoins) {
      statCountCoins.textContent = `${coinsData.length}+`;
    }

    /**
     * Create a reusable Coin Card HTML Element
     */
    function createCoinCard(coin) {
      const card = document.createElement('article');
      card.className = 'coin-card';
      card.setAttribute('data-id', coin.id);

      const metalClass = coin.metal ? coin.metal.toLowerCase() : 'silver';

      card.innerHTML = `
        <div class="coin-card-header">
          <span class="coin-metal-badge badge-${metalClass}">${coin.metal} · ${coin.denomination}</span>
          <span class="coin-region-badge">📍 ${coin.region}</span>
        </div>
        <div class="coin-card-visual">
          <div class="coin-card-img-placeholder" style="background: radial-gradient(circle, #fef08a 0%, #d97706 100%);">
            <span style="font-size: 2rem;">🪙</span>
            <span style="font-size: 0.65rem; font-weight: bold; color: #78350f;">${coin.dynasty.toUpperCase()}</span>
          </div>
        </div>
        <h3 class="coin-card-title">${coin.name}</h3>
        <div class="coin-card-meta">${coin.ruler} (${coin.dateRange})</div>
        <p class="coin-card-desc">${coin.description}</p>
        <div class="coin-card-footer">
          <span style="font-size: 0.8rem; color: var(--text-secondary);">Dynasty: <strong>${coin.dynasty}</strong></span>
          <a href="${coin.explorerUrl}" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;" aria-label="Explore ${coin.name}">
            <span>Explore</span> ➔
          </a>
        </div>
      `;

      return card;
    }

    /**
     * Filter & Render Coins Grid
     */
    function renderCoins() {
      if (!grid) return;

      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const periodVal = periodFilter ? periodFilter.value : 'all';
      const dynastyVal = dynastyFilter ? dynastyFilter.value : 'all';
      const regionVal = regionFilter ? regionFilter.value : 'all';
      const metalVal = metalFilter ? metalFilter.value : 'all';

      const filtered = coinsData.filter(function (coin) {
        // Text Search
        const matchesQuery = !query || 
          coin.name.toLowerCase().includes(query) ||
          coin.ruler.toLowerCase().includes(query) ||
          coin.dynasty.toLowerCase().includes(query) ||
          coin.description.toLowerCase().includes(query) ||
          (coin.tags && coin.tags.some(t => t.toLowerCase().includes(query)));

        // Period filter
        const matchesPeriod = periodVal === 'all' || coin.period === periodVal;

        // Dynasty filter
        const matchesDynasty = dynastyVal === 'all' || coin.dynasty.toLowerCase() === dynastyVal.toLowerCase();

        // Region filter
        const matchesRegion = regionVal === 'all' || coin.region.toLowerCase() === regionVal.toLowerCase();

        // Metal filter
        const matchesMetal = metalVal === 'all' || coin.metal.toLowerCase() === metalVal.toLowerCase();

        return matchesQuery && matchesPeriod && matchesDynasty && matchesRegion && matchesMetal;
      });

      // Clear current grid
      grid.innerHTML = '';

      if (filtered.length === 0) {
        if (noResultsMsg) noResultsMsg.style.display = 'block';
        if (resultsCounter) resultsCounter.textContent = 'Showing 0 coins';
      } else {
        if (noResultsMsg) noResultsMsg.style.display = 'none';
        if (resultsCounter) resultsCounter.textContent = `Showing ${filtered.length} of ${coinsData.length} coins`;

        filtered.forEach(function (coin) {
          grid.appendChild(createCoinCard(coin));
        });
      }

      // Show/hide search clear button
      if (clearSearchBtn) {
        clearSearchBtn.style.display = query ? 'block' : 'none';
      }
    }

    // Event Listeners for Filters
    if (searchInput) searchInput.addEventListener('input', renderCoins);
    if (periodFilter) periodFilter.addEventListener('change', renderCoins);
    if (dynastyFilter) dynastyFilter.addEventListener('change', renderCoins);
    if (regionFilter) regionFilter.addEventListener('change', renderCoins);
    if (metalFilter) metalFilter.addEventListener('change', renderCoins);

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', function () {
        searchInput.value = '';
        renderCoins();
      });
    }

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        if (periodFilter) periodFilter.value = 'all';
        if (dynastyFilter) dynastyFilter.value = 'all';
        if (regionFilter) regionFilter.value = 'all';
        if (metalFilter) metalFilter.value = 'all';
        renderCoins();
      });
    }

    // Category Card Clicks (Discover Section)
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(function (card) {
      card.addEventListener('click', function () {
        const cat = card.getAttribute('data-category');
        if (periodFilter) {
          periodFilter.value = cat;
          renderCoins();
          const explorerSection = document.getElementById('explorer');
          if (explorerSection) {
            explorerSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Map Hotspot Clicks
    mintHotspots.forEach(function (hotspot) {
      hotspot.addEventListener('click', function () {
        const region = hotspot.getAttribute('data-region');
        const dynasty = hotspot.getAttribute('data-dynasty');
        const label = hotspot.querySelector('.hotspot-label') ? hotspot.querySelector('.hotspot-label').textContent : 'Mint Location';

        if (regionFilter) regionFilter.value = region;
        renderCoins();

        if (mapInfoDesc && mapInfoDetails) {
          mapInfoDesc.textContent = `Active Location: ${label}`;
          mapInfoDetails.innerHTML = `
            <div style="color: var(--coin-gold); font-weight: bold; margin-bottom: 6px;">📍 ${label}</div>
            <p style="font-size: 0.9rem; color: var(--text-primary); margin-bottom: 8px;">
              Primary Numismatic Hub associated with <strong>${dynasty}</strong> coinage in the <strong>${region} India</strong> region.
            </p>
            <span style="font-size: 0.8rem; color: var(--text-secondary);">Collection filtered by ${region} region!</span>
          `;
        }
      });
    });

    if (resetMapFilterBtn) {
      resetMapFilterBtn.addEventListener('click', function () {
        if (regionFilter) regionFilter.value = 'all';
        renderCoins();
        if (mapInfoDesc) mapInfoDesc.textContent = 'Click any pulsing marker on the map to inspect historical minting activities and filter the collection.';
        if (mapInfoDetails) mapInfoDetails.innerHTML = '<span class="placeholder-text">Select a location on the map to begin.</span>';
      });
    }

    // Navigation Menu Toggle (Mobile)
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
      });
    }

    // Initial Render
    renderCoins();
  });
})();
