/**
 * script.js
 * Kynrem Falls Explorer Logic (#2168)
 */

(function () {
  'use strict';

  // TIER DATASET
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

  // HEIGHT COMPARISON DATASET
  const HEIGHT_ITEMS = [
    { name: "Kynrem Falls", height: 305, unit: "305m", isKynrem: true },
    { name: "Nohkalikai Falls", height: 340, unit: "340m", isKynrem: false },
    { name: "Dudhsagar Falls", height: 310, unit: "310m", isKynrem: false },
    { name: "Jog Falls", height: 253, unit: "253m", isKynrem: false },
    { name: "Statue of Unity", height: 182, unit: "182m", isKynrem: false },
    { name: "Qutub Minar", height: 73, unit: "73m", isKynrem: false }
  ];

  // SEASONAL DATASET
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

    // Height Chart Container
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
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      });
    }

    /**
     * Tier Block Click Handlers
     */
    tierBlocks.forEach(function (block, index) {
      const tierNum = index + 1;
      block.addEventListener('click', function () {
        tierBlocks.forEach(b => b.classList.remove('active'));
        block.classList.add('active');

        const data = TIERS_DATA[tierNum];
        if (data) {
          if (tierTitle) tierTitle.textContent = data.title;
          if (tierHeight) tierHeight.textContent = data.height;
          if (tierDesc) tierDesc.textContent = data.desc;
          if (metaSpeed) metaSpeed.textContent = data.speed;
          if (metaVis) metaVis.textContent = data.vis;
          if (metaGeo) metaGeo.textContent = data.geo;
          if (metaEco) metaEco.textContent = data.eco;
        }
      });
    });

    /**
     * Render Height Comparison Chart
     */
    function renderHeightChart() {
      if (!heightChartGrid) return;
      heightChartGrid.innerHTML = '';

      const maxHeight = 350; // max scale

      HEIGHT_ITEMS.forEach(function (item) {
        const col = document.createElement('div');
        col.className = 'height-bar-col';

        const fillHeightPct = Math.round((item.height / maxHeight) * 100);

        col.innerHTML = `
          <span class="bar-val">${item.unit}</span>
          <div class="bar-fill ${item.isKynrem ? 'highlight' : ''}" style="height: ${fillHeightPct}%;"></div>
          <span class="bar-name"><strong>${item.name}</strong></span>
        `;

        heightChartGrid.appendChild(col);
      });
    }

    /**
     * Setup Seasonal Explorer Tabs
     */
    seasonBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        seasonBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const seasonKey = btn.getAttribute('data-season');
        const sdata = SEASON_DATA[seasonKey];
        if (sdata) {
          if (seasonTitle) seasonTitle.textContent = sdata.title;
          if (seasonDesc) seasonDesc.textContent = sdata.desc;
          if (spillFlow) spillFlow.textContent = sdata.flow;
          if (spillVis) spillVis.textContent = sdata.vis;
          if (spillTip) spillTip.textContent = sdata.tip;
        }
      });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }

    // Initial Execution
    renderHeightChart();
  });
})();
