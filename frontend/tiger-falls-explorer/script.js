/**
 * script.js
 * Tiger Falls Explorer Logic (#2176)
 */

(function () {
  'use strict';

  // HEIGHT LADDER DATASET
  const HEIGHT_ZONES = {
    crest: {
      title: "Zone 1: Mountain Crest Inflow (95m Altitude)",
      sub: "Keraao Stream Watershed",
      desc: "Fed by perennial freshwater springs originating in the higher Chakrata-Deoban ridge, the stream travels through pristine coniferous woodlands before cleanly detaching from the vertical slate cliff.",
      height: "95 meters / 312 feet",
      source: "High-altitude Chakrata spring streams",
      local: "Keraao Pachad (Tiger Cascade)"
    },
    roar: {
      title: "Zone 2: Roaring Spray Column (50m Altitude)",
      sub: "Acoustic Resonance & Mist Dispersal",
      desc: "As the water column plunges through mid-air, it compresses air pockets within the narrow canyon amphitheater, producing a rhythmic, booming acoustic roar resembling a tiger's roar.",
      height: "Approx. 50 meters from base",
      source: "Mid-air atomized spray",
      local: "Valley acoustic echo chamber"
    },
    basin: {
      title: "Zone 3: Natural Slate Plunge Pool (0m Base)",
      sub: "Shallow Pebble Pool & Wading Basin",
      desc: "The cascade completes its descent into a crystal-clear mountain pool lined with slate stones and ferns, offering tourists a refreshing natural foot-soaking spot before running into the valley.",
      height: "0 meters (Basin floor)",
      source: "Pool runoff feeding Yamuna basin",
      local: "Natural Himalayan plunge bath"
    }
  };

  // FOREST MAP SPOTS DATASET
  const FOREST_SPOTS = {
    'tiger-falls': {
      title: "Tiger Falls Gorge (1,400 m)",
      sub: "Garhwal Coniferous Valley",
      desc: "Tucked in an amphitheater of tall deodars and rhododendrons, Tiger Falls is accessible either via a steep 5 km direct downhill nature trek from Chakrata town or by driving 20 km along a scenic mountain road followed by a 1 km walk.",
      dist: "5 km (Downhill trek) / 1 km (Road head)",
      time: "1.5 – 2 hours downhill, 2.5 hours return",
      surround: "Cedrus deodara, Quercus oaks, ferns"
    },
    chakrata: {
      title: "Chakrata Town (2,118 m)",
      sub: "British Colonial Cantonment & Trailhead",
      desc: "A serene hill station in the Jaunsar-Bawar region founded in 1866, surrounded by deep deodar forests, wooden Jaunsari architecture, and the trailhead for the 5 km trek.",
      dist: "0 km (Trailhead start)",
      time: "Base station for tours",
      surround: "Chakrata market & heritage wooden lodges"
    },
    deoban: {
      title: "Deoban Ridge (2,865 m)",
      sub: "God's Own Forest & Peak Viewpoint",
      desc: "A high-altitude ridge 13 km from Chakrata providing unobstructed 300-km views of snow-clad Himalayan giants including Trishul, Nanda Devi, and Bandarpoonch.",
      dist: "15 km from Tiger Falls",
      time: "45 min drive + nature walk",
      surround: "Dense mixed oak-conifer forest"
    },
    chilmiri: {
      title: "Chilmiri Neck Viewpoint",
      sub: "Panoramic Sunset Meadow",
      desc: "The highest plateau near Chakrata town, famous for 360-degree sunset colors, migratory birdwatching, and mountain breeze walks.",
      dist: "8 km from Tiger Falls",
      time: "20 min drive from Chakrata",
      surround: "Open grassy meadow atop deodar ridge"
    },
    kanasar: {
      title: "Kanasar Ancient Deodar Grove",
      sub: "Asia's Largest Trunk Deodar Sanctuary",
      desc: "A magical deodar forest grove 26 km from Chakrata hosting colossal ancient cedar trees with trunks measuring over 6 meters in circumference.",
      dist: "26 km from Chakrata",
      time: "1 hour scenic drive",
      surround: "Ancient Cedrus deodara grove"
    }
  };

  // SEASONAL DATASET
  const SEASON_DATA = {
    summer: {
      title: "Spring & Summer (April to June) — Ideal Trekking Season",
      desc: "Pleasant mountain weather with temperatures between 15°C and 28°C. Melting high Himalayan snowpack provides a strong, crystal-clear water torrent. The 5 km forest trek through flowering rhododendrons is exceptionally comfortable.",
      flow: "Flow: Crystal Clear & High Velocity",
      trail: "Trail: Completely dry, safe & easy",
      highlight: "Highlights: Natural pool foot soaking, birdwatching & blooming flora"
    },
    monsoon: {
      title: "Monsoon Surge (July to September)",
      desc: "Lush green mosses and heavy rain dramatically increase the waterfall volume, making the roar audible from kilometers away. The trekking path can be slippery, requiring good grip footwear.",
      flow: "Flow: Heavy Roaring Himalayan Torrent",
      trail: "Trail: Wet & slippery; caution advised on steps",
      highlight: "Highlights: Vibrant emerald valley, thunderous spray & mist"
    },
    autumn: {
      title: "Autumn & Winter (October to February)",
      desc: "Crisp mountain air, clear blue skies, and golden sunlight filtering through deodar branches. Water is cold and crystalline. Snowfall occasionally graces the higher Chakrata peaks in Jan-Feb.",
      flow: "Flow: Moderate Slender Column",
      trail: "Trail: Crisp dry weather; cold evenings (5°C to 12°C)",
      highlight: "Highlights: Clear Himalayan horizon views & cozy tea stalls"
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Height Ladder Elements
    const zoneCards = document.querySelectorAll('.h-zone-card');
    const hTitle = document.getElementById('h-title');
    const hSub = document.getElementById('h-sub');
    const hBody = document.getElementById('h-body');
    const hHeight = document.getElementById('h-height');
    const hSource = document.getElementById('h-source');
    const hLocal = document.getElementById('h-local');

    // Forest Map Elements
    const forestPins = document.querySelectorAll('.forest-pin');
    const spotTitle = document.getElementById('spot-title');
    const spotSub = document.getElementById('spot-sub');
    const spotBody = document.getElementById('spot-body');
    const spotDist = document.getElementById('spot-dist');
    const spotTime = document.getElementById('spot-time');
    const spotSurround = document.getElementById('spot-surround');

    // Seasonal Elements
    const seasonBtns = document.querySelectorAll('.season-btn');
    const sCardTitle = document.getElementById('s-card-title');
    const sCardDesc = document.getElementById('s-card-desc');
    const spFlow = document.getElementById('sp-flow');
    const spTrail = document.getElementById('sp-trail');
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
     * Height Ladder Zone Handler
     */
    zoneCards.forEach(function (card) {
      card.addEventListener('click', function () {
        zoneCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const zoneKey = card.getAttribute('data-zone');
        const data = HEIGHT_ZONES[zoneKey];
        if (!data) return;

        if (hTitle) hTitle.textContent = data.title;
        if (hSub) hSub.textContent = data.sub;
        if (hBody) hBody.innerHTML = `<p>${data.desc}</p>`;
        if (hHeight) hHeight.textContent = data.height;
        if (hSource) hSource.textContent = data.source;
        if (hLocal) hLocal.textContent = data.local;
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    /**
     * Forest Map Pin Handler
     */
    forestPins.forEach(function (pin) {
      pin.addEventListener('click', function () {
        const spotKey = pin.getAttribute('data-spot');
        const data = FOREST_SPOTS[spotKey];
        if (!data) return;

        if (spotTitle) spotTitle.textContent = data.title;
        if (spotSub) spotSub.textContent = data.sub;
        if (spotBody) spotBody.innerHTML = `<p>${data.desc}</p>`;
        if (spotDist) spotDist.textContent = data.dist;
        if (spotTime) spotTime.textContent = data.time;
        if (spotSurround) spotSurround.textContent = data.surround;
      });

      pin.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pin.click();
        }
      });
    });

    /**
     * Seasonal Toggle Handler
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
          if (spTrail) spTrail.textContent = sdata.trail;
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
