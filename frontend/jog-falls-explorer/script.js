/**
 * script.js
 * Jog Falls Explorer Logic
 */

(function () {
  'use strict';

  // MONSOON VS DRY-SEASON DATASET
  const SEASON_DATA = {
    monsoon: {
      title: "Monsoon (July to September) — Peak Volume",
      desc: "Heavy Western Ghats rainfall pushes the Linganamakki reservoir toward capacity, forcing spillway releases that send all four cascades into full, thunderous flow. This is when Jog Falls looks most like its famous photographs — but mist, slippery viewpoints, and closed lower steps are common.",
      flow: "Flow: Maximum, All Four Cascades Roaring",
      access: "Access: Lower viewpoint steps often closed for safety",
      highlight: "Highlights: Most dramatic volume of the year"
    },
    postmonsoon: {
      title: "Post-Monsoon (October to November) — Strong & Clearer",
      desc: "Reservoir releases continue as monsoon runoff tapers off, so flow stays strong while skies clear and access to viewpoints reopens. A good balance of drama and comfort.",
      flow: "Flow: Strong, Gradually Tapering",
      access: "Access: Most viewpoints and steps reopen",
      highlight: "Highlights: Good photography with fewer weather disruptions"
    },
    winter: {
      title: "Winter (December to February) — Moderate, Dam-Dependent",
      desc: "Natural rainfall is minimal, so what you see largely reflects Linganamakki Dam's release schedule for power generation. Flow can vary noticeably from one visit to the next.",
      flow: "Flow: Moderate, Depends on Dam Releases",
      access: "Access: Fully open, cool and comfortable weather",
      highlight: "Highlights: Pleasant weather, quieter crowds"
    },
    summer: {
      title: "Summer (March to June) — Trickle / Dry",
      desc: "With the reservoir prioritized for irrigation and power, very little water is released over the falls in peak summer, and Jog Falls can shrink to a thin trickle across bare rock faces.",
      flow: "Flow: Minimal to Near-Dry",
      access: "Access: Fully open, but the falls themselves may be underwhelming",
      highlight: "Highlights: See the exposed rock formation and cliff geology up close"
    }
  };

  // VIEWPOINT / MAP SPOTS DATASET
  const LOCATION_SPOTS = {
    mainview: {
      title: "Jog Falls Main Gallery Viewpoint",
      sub: "Sagar Taluk, Shimoga District, Karnataka",
      desc: "The primary railed platform gives a wide, head-on view of all four cascades — Raja, Roarer, Rocket, and Rani — side by side.",
      dist: "~30 km from Sagar town, ~100 km from Shimoga city",
      vehicle: "Paved road directly to the viewpoint parking and gallery",
      rail: "Shimoga (rail) / Sagar (bus stand and taxis)"
    },
    watchtower: {
      title: "Watchtower / Upper Deck",
      sub: "Escarpment Rim, above the Falls",
      desc: "An elevated vantage point giving a broader view across the valley and the top of the escarpment where the Sharavathi takes its plunge.",
      dist: "~500 m walk from the main gallery",
      vehicle: "Walking path from the main viewpoint parking",
      rail: "Sagar (~30 km)"
    },
    basesteps: {
      title: "Base of the Falls (Valley Steps)",
      sub: "Valley Floor Trail",
      desc: "A steep stepped trail descends to the valley floor for a close-up view of the plunge pool — seasonally closed during heavy monsoon flow for visitor safety.",
      dist: "~1,400 steps down from the main viewpoint",
      vehicle: "On foot only, via maintained stepped trail",
      rail: "Sagar (~30 km)"
    },
    honnemaradu: {
      title: "Honnemaradu Backwaters",
      sub: "Sharavathi Reservoir",
      desc: "A scenic reservoir-side spot upstream of the falls, popular for kayaking and camping, and a relaxed add-on to a Jog Falls day trip.",
      dist: "~35 km from Jog Falls",
      vehicle: "Car or taxi via Sagar",
      rail: "Sagar (~35 km)"
    },
    sigandur: {
      title: "Sigandur Chowdeshwari Temple",
      sub: "Reservoir-Edge Pilgrimage Site",
      desc: "A popular temple on the banks of the Sharavathi reservoir, reached partly by a short boat crossing, and commonly combined with a Jog Falls visit.",
      dist: "~40 km from Jog Falls",
      vehicle: "Car to the jetty, then a short ferry crossing",
      rail: "Sagar (~40 km)"
    },
    sagar: {
      title: "Sagar Town",
      sub: "Main Local Base & Transport Hub",
      desc: "The nearest town with hotels, restaurants, and bus connections, serving as the launch point for most visits to Jog Falls and the wider Sharavathi valley.",
      dist: "~30 km from Jog Falls",
      vehicle: "Main hub for taxis, buses, and local transport",
      rail: "Shimoga (nearest railhead, ~70 km from Sagar)"
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Seasonal Elements
    const seasonBtns = document.querySelectorAll('.season-btn');
    const sCardTitle = document.getElementById('s-card-title');
    const sCardDesc = document.getElementById('s-card-desc');
    const spFlow = document.getElementById('sp-flow');
    const spAccess = document.getElementById('sp-access');
    const spHighlight = document.getElementById('sp-highlight');

    // Viewpoint Cards
    const viewpointCards = document.querySelectorAll('.viewpoint-card');

    // Map Elements
    const circuitPins = document.querySelectorAll('.circuit-pin');
    const locTitle = document.getElementById('loc-title');
    const locSub = document.getElementById('loc-sub');
    const locBody = document.getElementById('loc-body');
    const locDist = document.getElementById('loc-dist');
    const locVehicle = document.getElementById('loc-vehicle');
    const locRail = document.getElementById('loc-rail');

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
     * Monsoon vs Dry-Season Toggle Handler
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
          if (spAccess) spAccess.textContent = sdata.access;
          if (spHighlight) spHighlight.textContent = sdata.highlight;
        }
      });
    });

    /**
     * Shared updater for location/viewpoint info card
     */
    function updateLocationCard(spotKey) {
      const data = LOCATION_SPOTS[spotKey];
      if (!data) return;

      if (locTitle) locTitle.textContent = data.title;
      if (locSub) locSub.textContent = data.sub;
      if (locBody) locBody.innerHTML = `<p>${data.desc}</p>`;
      if (locDist) locDist.textContent = data.dist;
      if (locVehicle) locVehicle.textContent = data.vehicle;
      if (locRail) locRail.textContent = data.rail;
    }

    /**
     * Viewpoint Explorer Card Handler
     */
    viewpointCards.forEach(function (card) {
      card.addEventListener('click', function () {
        viewpointCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const spotKey = card.getAttribute('data-spot');
        updateLocationCard(spotKey);

        // Sync the map pin highlight, if present
        circuitPins.forEach(function (pin) {
          pin.classList.toggle('active', pin.getAttribute('data-spot') === spotKey);
        });

        // Scroll the map into gentle view context on smaller screens
        const mapSection = document.getElementById('map-section');
        if (mapSection && window.innerWidth < 768) {
          mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /**
     * Location Map Pin Handler
     */
    circuitPins.forEach(function (pin) {
      pin.addEventListener('click', function () {
        const spotKey = pin.getAttribute('data-spot');
        updateLocationCard(spotKey);

        // Sync matching viewpoint card, if present
        viewpointCards.forEach(function (card) {
          card.classList.toggle('active', card.getAttribute('data-spot') === spotKey);
        });
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