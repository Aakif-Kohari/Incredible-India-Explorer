/**
 * script.js
 * Hogenakkal Falls Explorer Logic (#2170)
 */

(function () {
  'use strict';

  // RIVER SPOTS DATASET
  const SPOTS_DATA = {
    'main-falls': {
      title: "Main Smoke Cascade (Hogenakkal)",
      sub: "Primary 20m Multi-Stream Plunge",
      desc: "Where the Kaveri River narrows through carbonatite bedrock and drops 20 meters. The sheer impact generates perpetual vapor clouds resembling smoke (Hoge), giving the falls its historic name.",
      loc: "Pennagaram Taluk, Dharmapuri District",
      river: "Kaveri River (Cauvery)",
      high: "Smoking mist, deep cylindrical potholes, roaring sound"
    },
    'coracle-jetty': {
      title: "Parisal Coracle Launch Jetty",
      sub: "Traditional Circular Bamboo Boat Hub",
      desc: "The designated TTDC boarding wharf where licensed coracle pilots guide circular bamboo and hide boats into the gorge, offering close-up encounters with misty side-streams.",
      loc: "Hogenakkal Riverfront Pier",
      river: "Lower Kaveri Gorge Channel",
      high: "Parisal navigation, water-level photography, spinning ride"
    },
    'cine-falls': {
      title: "Cine Falls & Rock Canyon",
      sub: "Deep Vertical Gorge & Film Heritage",
      desc: "A vertical rock amphitheater made world-famous by Indian cinema directors. Features sheer carbonatite cliff faces and secluded water coves only accessible via coracle.",
      loc: "Downstream Kaveri Canyon",
      river: "Mid-Gorge Chasm",
      high: "Cinematic gorge walls, ancient rock strata, serene coves"
    },
    'hanging-bridge': {
      title: "Suspension Hanging Bridge & Watchtower",
      sub: "High-Elevation Aerial Observation Platform",
      desc: "A suspension footbridge spanning across the roaring stream, allowing visitors to walk directly above the turbulent Kaveri channels and capture panoramic photographs.",
      loc: "Gorge Crossing Ridge",
      river: "Overlooking Primary Falls Network",
      high: "360-degree gorge views, secure pedestrian railing"
    },
    'melagiri': {
      title: "Melagiri Forest Hills",
      sub: "Eastern-Western Ghats Ecological Corridor",
      desc: "Dense deciduous forests encompassing the waterfall valley, home to wild elephant herds, medicinal shrub flora, and rich biodiversity bordering Karnataka and Tamil Nadu.",
      loc: "Melagiri Wildlife Sanctuary Range",
      river: "Kaveri Catchment Basin",
      high: "Elephant corridor, medicinal plants, birdwatching"
    }
  };

  // SEASONAL DATASET
  const SEASON_DATA = {
    'post-monsoon': {
      title: "Post-Monsoon Peak & Coracle Safaris (October – February)",
      desc: "The ideal time to explore Hogenakkal. River flow is robust yet calm enough for licensed parisal (coracle) boat rides to navigate through the deep gorge. Weather is pleasant, fish markets are vibrant, and all viewpoints and footbridges are accessible.",
      flow: "Flow: Moderate, Crystal & Roaring",
      boat: "Boating: 100% Operational (Full Gorge Circuit)",
      highlight: "Highlights: Parisal rides, Oil massage & Fresh river fish"
    },
    'monsoon': {
      title: "Heavy Monsoon Inflow (July – September)",
      desc: "During intense Southwest Monsoon releases from upstream Karnataka dams (KRS & Kabini), the Kaveri swells dramatically. Water covers entire rock ledges in an awe-inspiring deluge. Coracle rides are suspended for safety.",
      flow: "Flow: Extremely High Torrents & Surging Rapids",
      boat: "Boating: Suspended for public safety",
      highlight: "Highlights: Monumental roaring spectacle & hanging bridge views"
    },
    'summer': {
      title: "Summer Placid Pools & Geological Study (March – May)",
      desc: "Water volume subsides, exposing the billion-year-old carbonatite rock beds, deep cylindrical erosion potholes, and gentle rock pools suitable for peaceful foot dipping and scientific examination.",
      flow: "Flow: Gentle Clear Streams",
      boat: "Boating: Partial shallow-water rides available",
      highlight: "Highlights: Carbonatite rock inspection & peaceful bathing"
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Map Elements
    const riverPins = document.querySelectorAll('.river-pin');
    const spotTitle = document.getElementById('spot-title');
    const spotSub = document.getElementById('spot-sub');
    const spotBody = document.getElementById('spot-body');
    const spotLoc = document.getElementById('spot-loc');
    const spotRiver = document.getElementById('spot-river');
    const spotHigh = document.getElementById('spot-high');

    // Seasonal Elements
    const seasonBtns = document.querySelectorAll('.season-btn');
    const sCardTitle = document.getElementById('s-card-title');
    const sCardDesc = document.getElementById('s-card-desc');
    const spFlow = document.getElementById('sp-flow');
    const spBoat = document.getElementById('sp-boat');
    const spHighlight = document.getElementById('sp-highlight');

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
     * Map Pin Click Handlers
     */
    riverPins.forEach(function (pin) {
      pin.addEventListener('click', function () {
        const spotKey = pin.getAttribute('data-spot');
        const data = SPOTS_DATA[spotKey];
        if (!data) return;

        if (spotTitle) spotTitle.textContent = data.title;
        if (spotSub) spotSub.textContent = data.sub;
        if (spotBody) spotBody.innerHTML = `<p>${data.desc}</p>`;
        if (spotLoc) spotLoc.textContent = data.loc;
        if (spotRiver) spotRiver.textContent = data.river;
        if (spotHigh) spotHigh.textContent = data.high;
      });

      pin.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pin.click();
        }
      });
    });

    /**
     * Seasonal Toggle Handlers
     */
    seasonBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        seasonBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const seasonKey = btn.getAttribute('data-season');
        const sdata = SEASON_DATA[seasonKey];
        if (sdata) {
          if (sCardTitle) sCardTitle.textContent = sdata.title;
          if (sCardDesc) sCardDesc.textContent = sdata.desc;
          if (spFlow) spFlow.textContent = sdata.flow;
          if (spBoat) spBoat.textContent = sdata.boat;
          if (spHighlight) spHighlight.textContent = sdata.highlight;
        }
      });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }
  });
})();
