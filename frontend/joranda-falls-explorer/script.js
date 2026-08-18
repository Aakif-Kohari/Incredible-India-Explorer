/**
 * script.js
 * Joranda Falls Explorer Logic (#2174)
 */

(function () {
  'use strict';

  // HEIGHT LADDER DATASET
  const HEIGHT_ZONES = {
    crest: {
      title: "Zone 1: Plateau Crest (181m Altitude)",
      sub: "Similipal High Plateau Lip",
      desc: "Draining the high Meghasani catchment, the crystal stream glides over ancient polished basalt bedrock before leaping clean off the sheer vertical precipice in an unbroken drop.",
      height: "181 meters (594 feet)",
      velocity: "High acceleration over basalt threshold",
      phenomenon: "Clean free-fall separation from rock face"
    },
    midair: {
      title: "Zone 2: Mid-Air Freefall Spray (90m Altitude)",
      sub: "Braided Stream & Atmospheric Aeration",
      desc: "Halfway through the vertical fall, the descending water ribbon aerates into fine silver droplets and misty plumes, creating miniature circular rainbows in afternoon sunlight.",
      height: "Approx. 90 meters from base",
      velocity: "Terminal water drop velocity",
      phenomenon: "Pervasive mist halos & spray suspension"
    },
    pool: {
      title: "Zone 3: Plunge Basin (0m Base)",
      sub: "Volcanic Rock Cauldron & Mist Vortex",
      desc: "The torrential column crashes onto massive Precambrian boulders at the base of the gorge, generating a permanent upward vapor vortex that nourishes endemic mosses and orchids.",
      height: "0 meters (Basin floor)",
      velocity: "High-impact kinetic dispersion",
      phenomenon: "Perpetual upward mist vortex & lush moss blanket"
    }
  };

  // SEASONAL DATASET
  const SEASON_DATA = {
    winter: {
      title: "Winter Splendor (November – February) — Prime Visiting Period",
      desc: "Following the southwest monsoon, Joranda Falls roars with magnificent volume. The vertical white column stands out brilliantly against the dark mossy rock wall, surrounded by flowering wild orchids and crisp 12°C forest breezes.",
      flow: "Flow: Thick, Roaring Silver Column",
      vis: "Visibility: Crystal clear with vibrant rainbows",
      highlight: "Highlights: Viewpoint photography, tiger safaris & birding"
    },
    summer: {
      title: "Summer Subdued Stream (March – June)",
      desc: "Flow thins into a graceful silver thread. Sal trees shed foliage across Similipal, offering exceptional visibility for wildlife sightings (wild elephants, leopards, deer) around the stream beds.",
      flow: "Flow: Moderate Slender Column",
      vis: "Visibility: Golden dry forest ambiance",
      highlight: "Highlights: Peak wildlife viewing around forest watering holes"
    },
    monsoon: {
      title: "Monsoon Surge (July – October) — Sanctuary Closed",
      desc: "Monsoon deluges swell the stream into an impassable torrent. The national park is strictly closed to the public for tiger breeding and conservation safety.",
      flow: "Flow: Furious Reddish Flood Cascade",
      vis: "Visibility: Completely shrouded in dense rain clouds",
      highlight: "Highlights: Ecological rejuvenation & forest replenishment"
    }
  };

  // MAP DATASET
  const MAP_SPOTS = {
    joranda: {
      title: "Joranda Falls Pavilion & Viewpoint",
      sub: "Direct Head-On Observation Tower (181m)",
      desc: "Constructed opposite the falls chasm, the official forest viewing gazebo offers an unobstructed, direct line of sight to the 181m perpendicular waterfall and its mist-shrouded base.",
      dist: "60 km from Jashipur Gate / 100 km from Baripada",
      vehicle: "Registered 4WD Forest Gypsy Only",
      permit: "Mandatory STR permit issued at entry gates"
    },
    barehipani: {
      title: "Barehipani Falls (399m)",
      sub: "India's 2nd Tallest 2-Tier Cascade",
      desc: "Situated 20 km east of Joranda on the Budhabalanga River, this giant cascade plunges 399m across two massive cliff shelves.",
      dist: "20 km along central Similipal track",
      vehicle: "4x4 Safari Track",
      permit: "Included in Similipal entry pass"
    },
    jashipur: {
      title: "Jashipur Entry Gate & Booking Counter",
      sub: "North-Western Gateway on NH-49",
      desc: "Main entry counter for tourists travelling from Kolkata, Rourkela, or Ranchi. Permits, mandatory guides, and registered Gypsy rentals are arranged here.",
      dist: "60 km to Joranda Falls",
      vehicle: "Highway access on NH-49",
      permit: "Daily permits from 6:00 AM to 9:00 AM"
    },
    chahala: {
      title: "Chahala Wildlife Core Zone",
      sub: "Historical Royal Hunting Lodge & Salt Lick",
      desc: "A renowned wildlife viewing clearing inside Similipal where herds of wild elephants, deer, and gaur gather around the natural salt licks.",
      dist: "25 km from Joranda",
      vehicle: "Core safari route",
      permit: "Day safari permit required"
    },
    pithabata: {
      title: "Pithabata Entry Gate (Baripada)",
      sub: "Eastern Similipal Park Gateway",
      desc: "Located 22 km from district headquarters Baripada, serving visitors arriving from coastal Odisha and Balasore.",
      dist: "100 km to Joranda",
      vehicle: "Paved road to Baripada",
      permit: "Morning permit counter open daily"
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Ladder Elements
    const ladderSteps = document.querySelectorAll('.ladder-step');
    const hTitle = document.getElementById('h-title');
    const hSub = document.getElementById('h-sub');
    const hBody = document.getElementById('h-body');
    const hHeight = document.getElementById('h-height');
    const hVelocity = document.getElementById('h-velocity');
    const hPhenomenon = document.getElementById('h-phenomenon');

    // Seasonal Elements
    const seasonBtns = document.querySelectorAll('.season-btn');
    const sCardTitle = document.getElementById('s-card-title');
    const sCardDesc = document.getElementById('s-card-desc');
    const spFlow = document.getElementById('sp-flow');
    const spVis = document.getElementById('sp-vis');
    const spHighlight = document.getElementById('sp-highlight');

    // Map Elements
    const jorandaPins = document.querySelectorAll('.joranda-pin');
    const mTitle = document.getElementById('m-title');
    const mSub = document.getElementById('m-sub');
    const mBody = document.getElementById('m-body');
    const mDist = document.getElementById('m-dist');
    const mVehicle = document.getElementById('m-vehicle');
    const mPermit = document.getElementById('m-permit');

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
     * Height Ladder Click Handler
     */
    ladderSteps.forEach(function (step) {
      step.addEventListener('click', function () {
        ladderSteps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');

        const zoneKey = step.getAttribute('data-zone');
        const data = HEIGHT_ZONES[zoneKey];
        if (!data) return;

        if (hTitle) hTitle.textContent = data.title;
        if (hSub) hSub.textContent = data.sub;
        if (hBody) hBody.innerHTML = `<p>${data.desc}</p>`;
        if (hHeight) hHeight.textContent = data.height;
        if (hVelocity) hVelocity.textContent = data.velocity;
        if (hPhenomenon) hPhenomenon.textContent = data.phenomenon;
      });

      step.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          step.click();
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
          if (spVis) spVis.textContent = sdata.vis;
          if (spHighlight) spHighlight.textContent = sdata.highlight;
        }
      });
    });

    /**
     * Map Pin Handler
     */
    jorandaPins.forEach(function (pin) {
      pin.addEventListener('click', function () {
        const spotKey = pin.getAttribute('data-spot');
        const data = MAP_SPOTS[spotKey];
        if (!data) return;

        if (mTitle) mTitle.textContent = data.title;
        if (mSub) mSub.textContent = data.sub;
        if (mBody) mBody.innerHTML = `<p>${data.desc}</p>`;
        if (mDist) mDist.textContent = data.dist;
        if (mVehicle) mVehicle.textContent = data.vehicle;
        if (mPermit) mPermit.textContent = data.permit;
      });

      pin.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pin.click();
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
