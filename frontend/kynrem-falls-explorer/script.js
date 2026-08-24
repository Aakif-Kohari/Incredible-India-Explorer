/**
 * script.js
 * Kynrem Falls Explorer Logic (#2168) - Expanded & Enhanced
 */

(function () {
  'use strict';

  // ==========================================================================
  // DATASETS
  // ==========================================================================

  const TIERS_DATA = {
    1: {
      title: "Tier 1: Upper Plunge (110 Meters Drop)",
      height: "Height Drop: ~110 Meters (360 ft)",
      desc: "Water cascades down steep sandstone ledges fed by plateau rainwater. Visible from Thangkharang Park lookout as a sheer white ribbon plunging into mist.",
      speed: "High Velocity Free-Plunge",
      vis: "Clear panoramic view from Thangkharang Park",
      geo: "Khasi Group Quartz Sandstone & Silicified Shales",
      eco: "Subtropical Moist Evergreen Canopy"
    },
    2: {
      title: "Tier 2: Middle Step & Interterranean Cascade (105 Meters)",
      height: "Height Drop: ~105 Meters (344 ft)",
      desc: "The second tier crashes onto a wide rocky shelf where the spray divides into twin channels across dense mossy cliffs.",
      speed: "Cascading Surge over Boulders",
      vis: "Visible along Sohra-Shella road bend",
      geo: "Sedimentary Sandstone Ledges & Limestone Faults",
      eco: "Epiphytic Orchids & Fern-draped cliffs"
    },
    3: {
      title: "Tier 3: Base Surge & Pool (90 Meters)",
      height: "Height Drop: ~90 Meters (295 ft)",
      desc: "The final plunge crashes into a rocky basin pool before flowing under the highway bridge into streams entering Bangladesh's Sylhet plains.",
      speed: "Turbulent Plunge Pool Outlet",
      vis: "Crossed directly by the motorable road bridge",
      geo: "Alluvial Stream Bed & Boulders",
      eco: "Riparian stream flora & hill stream fish"
    }
  };

  const HEIGHT_ITEMS = [
    { name: "Kynrem Falls", height: 305, unit: "305m", isKynrem: true },
    { name: "Nohkalikai Falls", height: 340, unit: "340m", isKynrem: false },
    { name: "Dudhsagar Falls", height: 310, unit: "310m", isKynrem: false },
    { name: "Jog Falls", height: 253, unit: "253m", isKynrem: false },
    { name: "Statue of Unity", height: 182, unit: "182m", isKynrem: false },
    { name: "Qutub Minar", height: 73, unit: "73m", isKynrem: false }
  ];

  const SEASON_DATA = {
    monsoon: {
      title: "Peak Monsoon Surge (June – September)",
      desc: "Receiving heavy monsoon downpours, Kynrem Falls explodes into a massive, roaring wall of water. Fog and spray blanket the gorge, generating vibrant double rainbows across Thangkharang Park.",
      flow: "Flow Volume: 100% Maximum Surge",
      vis: "Viewpoint: Thangkharang Park Gate & Bridge",
      tip: "Travel Tip: Carry heavy waterproof gear & raincoat"
    },
    post: {
      title: "Post-Monsoon Clarity (October – December)",
      desc: "Crisp blue skies offer crystal-clear photography of all three distinct tiers cascading amidst lush autumn green foliage.",
      flow: "Flow Volume: 60% Moderate Steady Stream",
      vis: "Viewpoint: Excellent visibility from all angles",
      tip: "Travel Tip: Best time for clear landscape photography"
    },
    dry: {
      title: "Dry Season Trickle (January – May)",
      desc: "Water flow shrinks to slim white threads across the three rocky cliffs, allowing visitors to inspect rock formations and boulder beds.",
      flow: "Flow Volume: 20% Low Seasonal Flow",
      vis: "Viewpoint: Accessible rock beds near base bridge",
      tip: "Travel Tip: Ideal for trekking & cave exploring nearby"
    }
  };

  const MAP_DATA = {
    kynrem: {
      title: "Kynrem Falls",
      desc: "The 7th highest waterfall in India, dropping 305 meters in three distinct stages through the lush greenery of Thangkharang Park.",
      distance: "0 km (Current Location)",
      type: "Natural Waterfall"
    },
    thangkharang: {
      title: "Thangkharang Park",
      desc: "A beautifully maintained state park offering the most iconic, unobstructed panoramic views of Kynrem Falls and the Bangladesh plains beyond.",
      distance: "~0.5 km from Falls",
      type: "Eco-Park & Viewpoint"
    },
    khohramhah: {
      title: "Khoh Ramhah (Pillar Rock)",
      desc: "A giant cone-shaped rock monolith resembling an inverted Khasi basket ('Khoh'). Steeped in local Khasi folklore and legend.",
      distance: "~1.2 km from Falls",
      type: "Geological Formation"
    }
  };

  // ==========================================================================
  // DOM ELEMENTS
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', function () {
    // Tier Elements
    const tierBlocks = document.querySelectorAll('.tier-block');
    const tierTitle = document.getElementById('tier-title');
    const tierHeight = document.getElementById('tier-height');
    const tierDesc = document.getElementById('tier-desc');
    const metaSpeed = document.getElementById('meta-speed');
    const metaVis = document.getElementById('meta-vis');
    const metaGeo = document.getElementById('meta-geo');
    const metaEco = document.getElementById('meta-eco');

    // Height Chart
    const heightChartGrid = document.getElementById('height-chart-grid');

    // Seasonal Elements
    const seasonBtns = document.querySelectorAll('.season-tab-btn');
    const seasonTitle = document.getElementById('season-title');
    const seasonDesc = document.getElementById('season-desc');
    const spillFlow = document.getElementById('spill-flow');
    const spillVis = document.getElementById('spill-vis');
    const spillTip = document.getElementById('spill-tip');

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn?.querySelector('.theme-icon');

    // Map Elements
    const mapPins = document.querySelectorAll('.map-pin');
    const mapDetailTitle = document.getElementById('map-detail-title');
    const mapDetailDesc = document.getElementById('map-detail-desc');
    const mapDetailMeta = document.getElementById('map-detail-meta');
    const mapMetaDistance = document.getElementById('map-meta-distance');
    const mapMetaType = document.getElementById('map-meta-type');

    // UI Utilities
    const backToTopBtn = document.getElementById('back-to-top');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // ==========================================================================
    // INITIALIZATION & RENDERING
    // ==========================================================================

    renderHeightChart();
    setupIntersectionObserver();
    setupThemeToggle();
    setupTierInteractions();
    setupSeasonalTabs();
    setupMapInteractions();
    setupScrollUtilities();
    setupMobileMenu();

    // ==========================================================================
    // FUNCTIONS
    // ==========================================================================

    function renderHeightChart() {
      if (!heightChartGrid) return;
      heightChartGrid.innerHTML = '';
      const maxHeight = 350; 

      HEIGHT_ITEMS.forEach(function (item, index) {
        const col = document.createElement('div');
        col.className = 'height-bar-col';
        const fillHeightPct = Math.round((item.height / maxHeight) * 100);

        col.innerHTML = `
          <span class="bar-val">${item.unit}</span>
          <div class="bar-fill ${item.isKynrem ? 'highlight' : ''}" style="height: 0%;" data-height="${fillHeightPct}%"></div>
          <span class="bar-name"><strong>${item.name}</strong></span>
        `;
        heightChartGrid.appendChild(col);

        // Staggered animation for bars
        setTimeout(() => {
          const bar = col.querySelector('.bar-fill');
          if (bar) bar.style.height = bar.getAttribute('data-height');
        }, 100 + (index * 150));
      });
    }

    function setupTierInteractions() {
      tierBlocks.forEach(function (block, index) {
        const tierNum = index + 1;
        
        const activateTier = () => {
          tierBlocks.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          block.classList.add('active');
          block.setAttribute('aria-pressed', 'true');

          const data = TIERS_DATA[tierNum];
          if (data) {
            // Simple fade effect for text change
            const panel = document.getElementById('tier-details-panel');
            panel.style.opacity = '0.5';
            
            setTimeout(() => {
              if (tierTitle) tierTitle.textContent = data.title;
              if (tierHeight) tierHeight.textContent = data.height;
              if (tierDesc) tierDesc.textContent = data.desc;
              if (metaSpeed) metaSpeed.textContent = data.speed;
              if (metaVis) metaVis.textContent = data.vis;
              if (metaGeo) metaGeo.textContent = data.geo;
              if (metaEco) metaEco.textContent = data.eco;
              panel.style.opacity = '1';
            }, 150);
          }
        };

        block.addEventListener('click', activateTier);
        block.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activateTier();
          }
        });
      });
    }

    function setupSeasonalTabs() {
      seasonBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          seasonBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');

          const seasonKey = btn.getAttribute('data-season');
          const sdata = SEASON_DATA[seasonKey];
          
          if (sdata) {
            const box = document.getElementById('season-info-box');
            box.style.opacity = '0.5';
            setTimeout(() => {
              if (seasonTitle) seasonTitle.textContent = sdata.title;
              if (seasonDesc) seasonDesc.textContent = sdata.desc;
              if (spillFlow) spillFlow.textContent = sdata.flow;
              if (spillVis) spillVis.textContent = sdata.vis;
              if (spillTip) spillTip.textContent = sdata.tip;
              box.style.opacity = '1';
            }, 150);
          }
        });
      });
    }

    function setupMapInteractions() {
      mapPins.forEach(pin => {
        const activatePin = () => {
          const pinId = pin.getAttribute('data-pin');
          const data = MAP_DATA[pinId];
          
          if (data && mapDetailTitle && mapDetailDesc) {
            mapDetailTitle.textContent = data.title;
            mapDetailDesc.textContent = data.desc;
            mapMetaDistance.textContent = data.distance;
            mapMetaType.textContent = data.type;
            mapDetailMeta.style.display = 'flex';
            
            // Visual feedback on map
            mapPins.forEach(p => p.style.opacity = '0.5');
            pin.style.opacity = '1';
          }
        };

        pin.addEventListener('click', activatePin);
        pin.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activatePin();
          }
        });
      });
    }

    function setupThemeToggle() {
      if (!themeToggleBtn) return;
      
      const updateIcon = (isLight) => {
        if (themeIcon) themeIcon.textContent = isLight ? '🌙' : '☀️';
      };

      updateIcon(document.body.classList.contains('light-theme'));

      themeToggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateIcon(isLight);
      });
    }

    function setupScrollUtilities() {
      // Back to top button visibility
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          backToTopBtn?.classList.add('visible');
        } else {
          backToTopBtn?.classList.remove('visible');
        }
      });

      backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    function setupIntersectionObserver() {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target); // Only animate once
          }
        });
      }, observerOptions);

      document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
      });
    }

    function setupMobileMenu() {
      if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
          const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
          menuToggle.setAttribute('aria-expanded', !isExpanded);
          navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
          });
        });
      }
    }
  });
})();