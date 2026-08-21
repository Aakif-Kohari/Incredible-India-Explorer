/**
 * script.js
 * Soochipara Falls Explorer Logic (#2172)
 */

(function () {
  'use strict';

  // TIER DATASET
  const TIER_DATA = {
    tier1: {
      title: "Tier 1: Upper Canopy Surge (70m)",
      sub: "Shola Forest Headwater Inflow",
      desc: "Originating from the pristine Chembra Peak watershed, the torrential streams cascade over ancient Western Ghats granulite rocks surrounded by tea estates and evergreen shola tree canopies.",
      drop: "Approx. 70 meters",
      habitat: "Wet Evergreen & Montane Shola Forests",
      highlight: "Roaring white curtain through tree ferns"
    },
    tier2: {
      title: "Tier 2: Sentinel Rock Funnel (65m)",
      sub: "Mid-Gorge Chasm & Needle Cliff",
      desc: "The cascade narrows forcefully alongside the iconic needle-pointed Sentinel Rock cliff face. High kinetic pressure creates continuous water spray and carved rock pools.",
      drop: "Approx. 65 meters",
      habitat: "Rocky Gorges & Wet Mossy Cliffs",
      highlight: "Sentinel Rock needle formation & rock climbing point"
    },
    tier3: {
      title: "Tier 3: Lower Plunge Pool Cascade (65m)",
      sub: "Bottom Plunge Basin & Swimming Zone",
      desc: "The final drop crashes into a wide, boulder-strewn natural pool before joining the Chaliyar River drainage network. Tourists can safely swim under lifeguard supervision.",
      drop: "Approx. 65 meters (Total 200m / 656 ft)",
      habitat: "Riparian Riverbank & Boulders",
      highlight: "Natural rock swimming pool & rafting launch"
    }
  };

  // FOREST MAP SPOTS DATASET
  const FOREST_SPOTS = {
    falls: {
      title: "Soochipara Main Cascade (200m Drop)",
      sub: "Sentinel Rock Waterfalls Core Drop",
      desc: "Surrounded by deciduous and wet evergreen forests in Meppadi panchayat, this multi-tier waterfall plunges into a refreshing rocky pool before flowing down as a tributary of the Chaliyar River.",
      loc: "Vellarimala, Meppadi, Wayanad",
      dist: "2 km (Paved forest trail with steps)",
      high: "Natural pool bath, mist spray, evergreen views"
    },
    'sentinel-rock': {
      title: "Sentinel Rock Peak",
      sub: "Needle-Pointed Granite Monolith",
      desc: "A massive needle-shaped rock protrusion standing guard over the waterfall gorge, offering world-class natural rock-climbing challenges and stunning horizon vistas.",
      loc: "Gorge Overlook Crest",
      dist: "Adjoining waterfall drop point",
      high: "Rock climbing, geological monolith, eagle roost"
    },
    'entry-gate': {
      title: "Forest Department Checkpoint & Parking",
      sub: "Trailhead & Eco-Tourism Counter",
      desc: "The starting point for the 2 km downhill forest trek. Features visitor vehicle parking, ticket counters, local spice shops, and plastic inspection security.",
      loc: "Soochipara Forest Gate, Meppadi",
      dist: "0 km (Trailhead start)",
      high: "Eco-passes, local snacks & cloakrooms"
    },
    chembra: {
      title: "Chembra Peak Watershed",
      sub: "Highest Peak in Wayanad (2,100 m)",
      desc: "The pristine mountain range directly replenishing the headstreams of Soochipara Falls, famous for its heart-shaped natural lake (Hridaya Saras).",
      loc: "Chembra Range, Meppadi",
      dist: "15 km via trekking ridge",
      high: "Heart lake, panoramic mountain trek"
    },
    meenmutty: {
      title: "Meenmutty Falls (300m)",
      sub: "Largest 3-Tier Waterfall in Wayanad",
      desc: "A monumental 300-meter three-stage cascade located 12 km from Soochipara, reachable through a challenging jungle trek near Banasura Sagar.",
      loc: "Near Korome, Wayanad",
      dist: "12 km along Vellarimala belt",
      high: "Largest 3-tier drop in Wayanad"
    }
  };

  // SEASONAL DATASET
  const SEASON_DATA = {
    'post-monsoon': {
      title: "Post-Monsoon & Winter Peak (September to February)",
      desc: "The ideal season to explore Soochipara Falls. The waterfall flows with immense volume and crystal-clear emerald water. Lush green shola forests thrive, trekking paths are safe and dry, and visitors can enjoy bathing under the lower plunge pool.",
      flow: "Flow: Robust, Clear & Roaring",
      trek: "Trek Trail: Safe, Dry & Picturesque",
      highlight: "Highlights: Natural pool swimming, rock photography & tea estate walk"
    },
    monsoon: {
      title: "Heavy Southwest Monsoon (June to August)",
      desc: "Torrential downpours in the Western Ghats cause the waterfall to surge with overwhelming fury. Rocks become slippery, flash floods can occur, and the forest department often closes the trail for public safety.",
      flow: "Flow: Extreme Thunderous Deluge",
      trek: "Trek Trail: Slippery with leeches; periodic entry closures",
      highlight: "Highlights: Untamed raw power & misty rainforest ambiance"
    },
    summer: {
      title: "Summer Exploration (March to May)",
      desc: "Water flow thins down into clear, gentle rivulets. The forest temperature remains pleasantly cool compared to plains, making it a peaceful getaway with easy wading in the plunge basin.",
      flow: "Flow: Moderate to Mild Streams",
      trek: "Trek Trail: Dry & accessible for all age groups",
      highlight: "Highlights: Relaxed family bathing & unhurried birdwatching"
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Tier Elements
    const tierBlocks = document.querySelectorAll('.tier-block');
    const tierTitle = document.getElementById('tier-title');
    const tierSub = document.getElementById('tier-sub');
    const tierBody = document.getElementById('tier-body');
    const tierDrop = document.getElementById('tier-drop');
    const tierHabitat = document.getElementById('tier-habitat');
    const tierHighlight = document.getElementById('tier-highlight');

    // Forest Map Elements
    const mapPins = document.querySelectorAll('.map-pin');
    const spotTitle = document.getElementById('spot-title');
    const spotSub = document.getElementById('spot-sub');
    const spotBody = document.getElementById('spot-body');
    const spotLoc = document.getElementById('spot-loc');
    const spotDist = document.getElementById('spot-dist');
    const spotHigh = document.getElementById('spot-high');

    // Seasonal Elements
    const seasonBtns = document.querySelectorAll('.season-btn');
    const sCardTitle = document.getElementById('s-card-title');
    const sCardDesc = document.getElementById('s-card-desc');
    const spFlow = document.getElementById('sp-flow');
    const spTrek = document.getElementById('sp-trek');
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
     * Tier Click Handlers
     */
    tierBlocks.forEach(function (block) {
      block.addEventListener('click', function () {
        tierBlocks.forEach(b => b.classList.remove('active'));
        block.classList.add('active');

        const tierKey = block.getAttribute('data-tier');
        const data = TIER_DATA[tierKey];
        if (!data) return;

        if (tierTitle) tierTitle.textContent = data.title;
        if (tierSub) tierSub.textContent = data.sub;
        if (tierBody) tierBody.innerHTML = `<p>${data.desc}</p>`;
        if (tierDrop) tierDrop.textContent = data.drop;
        if (tierHabitat) tierHabitat.textContent = data.habitat;
        if (tierHighlight) tierHighlight.textContent = data.highlight;
      });

      block.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          block.click();
        }
      });
    });

    /**
     * Forest Map Pin Click Handlers
     */
    mapPins.forEach(function (pin) {
      pin.addEventListener('click', function () {
        const spotKey = pin.getAttribute('data-spot');
        const data = FOREST_SPOTS[spotKey];
        if (!data) return;

        if (spotTitle) spotTitle.textContent = data.title;
        if (spotSub) spotSub.textContent = data.sub;
        if (spotBody) spotBody.innerHTML = `<p>${data.desc}</p>`;
        if (spotLoc) spotLoc.textContent = data.loc;
        if (spotDist) spotDist.textContent = data.dist;
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
          if (spTrek) spTrek.textContent = sdata.trek;
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
