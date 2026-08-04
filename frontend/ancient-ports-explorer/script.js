/**
 * Ancient Ports of India Explorer Landing Page JavaScript
 * Handles live search, multi-faceted filtering, interactive SVG map rendering,
 * and port data management.
 */

(function () {
  'use strict';

  // Master Ancient Ports Dataset
  const ANCIENT_PORTS = [
    {
      id: 'lothal',
      name: 'Lothal',
      state: 'Gujarat',
      dynasty: 'Indus Valley',
      timePeriod: 'Harappan',
      timeLabel: '2400 BCE - 1900 BCE',
      coast: 'West Coast',
      unescoStatus: 'UNESCO Tentative',
      image: '../assets/lothal_dockyard.png',
      fallbackImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      description: "World's earliest known tidal dockyard city of the Indus Valley Civilization. A premier center for carnelian bead making, copper, and Mesopotamian trade.",
      url: '../lothal-port-explorer/index.html'
    },
    {
      id: 'muziris',
      name: 'Muziris',
      state: 'Kerala',
      dynasty: 'Chera Kingdom',
      timePeriod: 'Classical',
      timeLabel: '300 BCE - 1341 CE',
      coast: 'West Coast',
      unescoStatus: 'ASI Protected',
      image: '../assets/muziris_port.png',
      fallbackImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
      description: "Legendary Malabar port celebrated as the 'Emperor of Ports'. Gateway for Indo-Roman black pepper trade and Greco-Roman spice fleets.",
      url: '../muziris-port-explorer/index.html'
    },
    {
      id: 'arikamedu',
      name: 'Arikamedu',
      state: 'Puducherry / Tamil Nadu',
      dynasty: 'Chola / Roman Trade',
      timePeriod: 'Classical',
      timeLabel: '200 BCE - 200 CE',
      coast: 'East Coast',
      unescoStatus: 'ASI Protected',
      image: '../assets/arikamedu_ruins.png',
      fallbackImage: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
      description: "Ancient Coromandel trade post identified as Poduke in Periplus. Famous for Sir Mortimer Wheeler's excavations of Roman amphorae, brick warehouses, and bead factories.",
      url: '../arikamedu-port-explorer/index.html'
    },
    {
      id: 'tamralipta',
      name: 'Tamralipta',
      state: 'West Bengal',
      dynasty: 'Maurya / Gupta',
      timePeriod: 'Classical',
      timeLabel: '6th Century BCE - 8th Century CE',
      coast: 'East Coast',
      unescoStatus: 'ASI Protected',
      image: '../assets/tamralipta_tamluk.png',
      fallbackImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      description: "Eastern terminus of the Maritime Silk Route in Bengal. Major embarkation port for Buddhist pilgrims Faxian and Xuanzang sailing to Sri Lanka and Southeast Asia.",
      url: '../tamralipta-port-explorer/index.html'
    },
    {
      id: 'kannur',
      name: 'Kannur',
      state: 'Kerala',
      dynasty: 'Kolathiri / Arakkal',
      timePeriod: 'Medieval',
      timeLabel: '1st Century CE - 18th Century CE',
      coast: 'West Coast',
      unescoStatus: 'ASI Protected',
      image: '../assets/kannur_fort_banner.png',
      fallbackImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
      description: "Principal seat of the Kolathiri Rajas and Fort St. Angelo. Renowned for its Malabar pepper trade, coir cordage, and ocean-going merchant fleets.",
      url: '../kannur-port-explorer/index.html'
    },
    {
      id: 'beypore',
      name: 'Beypore',
      state: 'Kerala',
      dynasty: 'Zamorin of Calicut',
      timePeriod: 'Medieval',
      timeLabel: '1st Century CE - Present',
      coast: 'West Coast',
      unescoStatus: 'ASI Protected',
      image: '../assets/beypore_uru.png',
      fallbackImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      description: "Famous ancient shipbuilding port of Malabar. World-renowned for handcrafted wooden Uru sailing vessels crafted for Arab merchants since antiquity.",
      url: '../beypore-port-explorer/index.html'
    },
    {
      id: 'dwarka',
      name: 'Dwarka',
      state: 'Gujarat',
      dynasty: 'Yadava / Ancient India',
      timePeriod: 'Harappan',
      timeLabel: '1500 BCE - 500 CE',
      coast: 'West Coast',
      unescoStatus: 'Underwater Heritage',
      image: '../assets/dwarka_submerged.png',
      fallbackImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      description: "Sunken ancient port city off the Saurashtra coast. Marine archaeology has uncovered stone anchors, submerged jetties, and ancient sea walls.",
      url: '../dwarka-port-explorer/index.html'
    },
    {
      id: 'motupalli',
      name: 'Motupalli',
      state: 'Andhra Pradesh',
      dynasty: 'Kakatiya Dynasty',
      timePeriod: 'Medieval',
      timeLabel: '1st Century CE - 14th Century CE',
      coast: 'East Coast',
      unescoStatus: 'ASI Protected',
      image: '../assets/motupalli_port.png',
      fallbackImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      description: "Historic trade port of the Kakatiya Kingdom. Celebrated in Queen Rudrama Devi's charter and visited by Marco Polo for its diamond and silk exports.",
      url: '../motupalli-port-explorer/index.html'
    },
    {
      id: 'satgaon',
      name: 'Satgaon (Saptagram)',
      state: 'West Bengal',
      dynasty: 'Bengal Sultanate',
      timePeriod: 'Medieval',
      timeLabel: '300 BCE - 16th Century CE',
      coast: 'East Coast',
      unescoStatus: 'ASI Protected',
      image: '../assets/satgaon_port.png',
      fallbackImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      description: "Ancient riverine trade port of Bengal situated on the Saraswati river. Known as Porto Grande by Portuguese traders prior to the rise of Hooghly.",
      url: '../satgaon-port-explorer/index.html'
    },
    {
      id: 'kodungallur',
      name: 'Kodungallur',
      state: 'Kerala',
      dynasty: 'Chera Kingdom',
      timePeriod: 'Classical',
      timeLabel: '300 BCE - 1500 CE',
      coast: 'West Coast',
      unescoStatus: 'ASI Protected',
      image: '../assets/kodungallur_port.png',
      fallbackImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
      description: "Historic Cranganore port at the mouth of the Periyar. Served as Chera capital and cradle of early Christian, Jewish, and Islamic trade arrivals in India.",
      url: '../kodungallur-port-explorer/index.html'
    },
    {
      id: 'karaikal',
      name: 'Karaikal',
      state: 'Puducherry / Tamil Nadu',
      dynasty: 'Chola / Roman Trade',
      timePeriod: 'Classical',
      timeLabel: '300 BCE - 17th Century CE',
      coast: 'East Coast',
      unescoStatus: 'ASI Protected',
      image: '../assets/karaikal_port.png',
      fallbackImage: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
      description: "Key Coromandel trading port under the Medieval Cholas. Connected Tamil country with Southeast Asian maritime kingdoms and Sri Lanka.",
      url: '../karaikal-port-explorer/index.html'
    },
    {
      id: 'kalingapatnam',
      name: 'Kalingapatnam',
      state: 'Andhra Pradesh',
      dynasty: 'Kalinga Dynasty',
      timePeriod: 'Classical',
      timeLabel: '300 BCE - 500 CE',
      coast: 'East Coast',
      unescoStatus: 'ASI Protected',
      image: '../assets/kalingapatnam_port.png',
      fallbackImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      description: "Ancient Kalinga port on the Vamsadhara river. Historic departure point for Kalingan sea merchants expanding trade and culture to Java, Sumatra, and Malaya.",
      url: '../kalingapatnam-port-explorer/index.html'
    }
  ];

  // DOM Element References
  let searchInput, clearSearchBtn, filterState, filterDynasty, filterTime, filterCoast, filterUnesco;
  let resultsCountText, resetFiltersBtn, portsCardGrid, noResultsMsg;

  function init() {
    searchInput = document.getElementById('port-search-input');
    clearSearchBtn = document.getElementById('clear-search-btn');
    filterState = document.getElementById('filter-state');
    filterDynasty = document.getElementById('filter-dynasty');
    filterTime = document.getElementById('filter-time');
    filterCoast = document.getElementById('filter-coast');
    filterUnesco = document.getElementById('filter-unesco');
    resultsCountText = document.getElementById('results-count-text');
    resetFiltersBtn = document.getElementById('reset-filters-btn');
    portsCardGrid = document.getElementById('ports-card-grid');
    noResultsMsg = document.getElementById('no-results-msg');

    if (!portsCardGrid) return;

    // Attach Event Listeners
    if (searchInput) searchInput.addEventListener('input', handleFilterChange);
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', function () {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        handleFilterChange();
      });
    }

    [filterState, filterDynasty, filterTime, filterCoast, filterUnesco].forEach(select => {
      if (select) select.addEventListener('change', handleFilterChange);
    });

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', resetFilters);
    }

    // Initial render
    renderPorts(ANCIENT_PORTS);
    setupMapInteractivity();
    setupThemeToggle();
  }

  function handleFilterChange() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (clearSearchBtn) {
      clearSearchBtn.style.display = query ? 'block' : 'none';
    }

    const stateVal = filterState ? filterState.value : 'all';
    const dynastyVal = filterDynasty ? filterDynasty.value : 'all';
    const timeVal = filterTime ? filterTime.value : 'all';
    const coastVal = filterCoast ? filterCoast.value : 'all';
    const unescoVal = filterUnesco ? filterUnesco.value : 'all';

    const filtered = ANCIENT_PORTS.filter(port => {
      // Search query filter
      const matchesQuery = !query || 
        port.name.toLowerCase().includes(query) ||
        port.state.toLowerCase().includes(query) ||
        port.dynasty.toLowerCase().includes(query) ||
        port.description.toLowerCase().includes(query);

      // Category filters
      const matchesState = stateVal === 'all' || port.state === stateVal;
      const matchesDynasty = dynastyVal === 'all' || port.dynasty === dynastyVal;
      const matchesTime = timeVal === 'all' || port.timePeriod === timeVal;
      const matchesCoast = coastVal === 'all' || port.coast === coastVal;
      const matchesUnesco = unescoVal === 'all' || port.unescoStatus === unescoVal;

      return matchesQuery && matchesState && matchesDynasty && matchesTime && matchesCoast && matchesUnesco;
    });

    renderPorts(filtered);
  }

  function renderPorts(ports) {
    if (!portsCardGrid) return;
    portsCardGrid.innerHTML = '';

    if (resultsCountText) {
      resultsCountText.textContent = `Showing ${ports.length} of ${ANCIENT_PORTS.length} ancient ports`;
    }

    if (ports.length === 0) {
      if (noResultsMsg) noResultsMsg.style.display = 'block';
      return;
    }

    if (noResultsMsg) noResultsMsg.style.display = 'none';

    ports.forEach(port => {
      const card = document.createElement('article');
      card.className = 'port-explorer-card';
      card.setAttribute('data-port-id', port.id);

      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${port.image}" alt="${port.name} Ancient Port" loading="lazy" onerror="this.onerror=null; this.src='${port.fallbackImage}';">
          <span class="badge-coast">🌊 ${port.coast}</span>
          <span class="badge-dynasty">👑 ${port.dynasty}</span>
        </div>
        <div class="card-body">
          <h3>${port.name} Ancient Port</h3>
          <div class="card-meta">
            <span>📍 ${port.state}</span>
            <span>⏳ ${port.timeLabel}</span>
          </div>
          <p class="card-desc">${port.description}</p>
          <a href="${port.url}" class="btn-card-explore" aria-label="Explore ${port.name} Ancient Port">
            Explore ${port.name} Port ➔
          </a>
        </div>
      `;

      portsCardGrid.appendChild(card);
    });
  }

  function resetFilters() {
    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    if (filterState) filterState.value = 'all';
    if (filterDynasty) filterDynasty.value = 'all';
    if (filterTime) filterTime.value = 'all';
    if (filterCoast) filterCoast.value = 'all';
    if (filterUnesco) filterUnesco.value = 'all';
    renderPorts(ANCIENT_PORTS);
  }

  function setupMapInteractivity() {
    const markers = document.querySelectorAll('.map-port-marker');
    const infoPanelTitle = document.getElementById('map-info-title');
    const infoPanelDesc = document.getElementById('map-info-desc');
    const infoDetailsBox = document.getElementById('map-info-details');
    const infoLoc = document.getElementById('map-info-loc');
    const infoEra = document.getElementById('map-info-era');
    const infoKingdom = document.getElementById('map-info-kingdom');
    const infoLink = document.getElementById('map-info-link');

    markers.forEach(marker => {
      marker.addEventListener('click', function () {
        const portId = this.getAttribute('data-port');
        const portData = ANCIENT_PORTS.find(p => p.id === portId);

        if (!portData) return;

        // Highlight marker
        markers.forEach(m => m.style.opacity = '0.6');
        this.style.opacity = '1.0';

        // Populate info panel
        if (infoPanelTitle) infoPanelTitle.textContent = `${portData.name} Ancient Port`;
        if (infoPanelDesc) infoPanelDesc.textContent = portData.description;
        if (infoLoc) infoLoc.textContent = portData.state;
        if (infoEra) infoEra.textContent = portData.timeLabel;
        if (infoKingdom) infoKingdom.textContent = portData.dynasty;

        if (infoDetailsBox) infoDetailsBox.style.display = 'block';
        if (infoLink) {
          infoLink.style.display = 'inline-block';
          infoLink.href = portData.url;
        }

        // Scroll smooth to card if existing
        const targetCard = document.querySelector(`[data-port-id="${portId}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          targetCard.style.outline = '2px solid var(--port-gold)';
          setTimeout(() => targetCard.style.outline = 'none', 2000);
        }
      });
    });
  }

  function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      });
    }
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global Export for testing
  window.AncientPorts = {
    ANCIENT_PORTS,
    renderPorts,
    resetFilters
  };
})();
