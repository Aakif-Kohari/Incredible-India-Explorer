/**
 * script.js
 * Nohkalikai Falls Explorer Logic
 */

(function () {
  'use strict';

  // SEASONAL DATASET
  const SEASON_DATA = {
    monsoon: {
      title: "Monsoon (June to September) — Maximum Volume, Low Visibility",
      desc: "Cherrapunji receives some of the heaviest rainfall on Earth during this window. The falls thunder at maximum volume, but thick cloud cover and mist frequently obscure the view from the plateau rim.",
      flow: "Flow: Maximum, Thunderous",
      visibility: "Visibility: Low, Frequent Cloud Cover",
      highlight: "Highlights: Most dramatic volume, lush green plateau"
    },
    postmonsoon: {
      title: "Post-Monsoon (October to November) — Best Season",
      desc: "The heaviest rains have passed, skies clear more often, and the falls still carry strong, clean volume. This is the sweet spot for unobstructed views of both the plunge and the plateau's long-range valley vistas.",
      flow: "Flow: Strong, Clear Water",
      visibility: "Visibility: High, Fewer Clouds",
      highlight: "Highlights: Best photography window of the year"
    },
    winter: {
      title: "Winter (December to February) — Cool & Clear",
      desc: "Rainfall drops sharply, the air turns crisp and dry, and long-distance views across the plateau escarpment are often at their clearest, though the water volume is comparatively modest.",
      flow: "Flow: Moderate, Steady",
      visibility: "Visibility: Excellent, Dry Air",
      highlight: "Highlights: Clear valley panoramas, cool comfortable weather"
    },
    summer: {
      title: "Pre-Monsoon (March to May) — Building Up",
      desc: "Water levels are at their lowest before the monsoon arrives, with warm, humid days building toward the rains. The falls still flow, since the region rarely dries out completely, but with noticeably less force.",
      flow: "Flow: Reduced, Thinner Stream",
      visibility: "Visibility: Good, Occasional Haze",
      highlight: "Highlights: Fewer crowds, pleasant early mornings"
    }
  };

  // VIEWPOINT / LANDSCAPE MAP SPOTS DATASET
  const LOCATION_SPOTS = {
    mainview: {
      title: "Nohkalikai Falls Main Viewpoint",
      sub: "East Khasi Hills, Meghalaya",
      desc: "A paved lookout park on the plateau rim gives an uninterrupted head-on view of the full 340m plunge and its emerald plunge pool far below.",
      dist: "7 km from Cherrapunji (Sohra) town, ~55 km from Shillong",
      vehicle: "Paved road directly to the viewpoint parking area",
      rail: "Shillong (nearest major town with rail/air links onward)"
    },
    valleyview: {
      title: "Valley Edge Overlook",
      sub: "Plateau Escarpment, near Sohra",
      desc: "A short walk from the main park along the plateau edge, offering a wider panoramic sweep across the escarpment and the plains toward Bangladesh on clear days.",
      dist: "~1 km walk from the main viewpoint",
      vehicle: "Walking path from the main parking area",
      rail: "Shillong (~55 km)"
    },
    mawsmai: {
      title: "Mawsmai Cave",
      sub: "Limestone Show Cave",
      desc: "A well-lit, walkable limestone cave a short drive from Nohkalikai, popular as an easy add-on stop on the same day trip from Sohra.",
      dist: "~10 km from Nohkalikai Falls",
      vehicle: "Car or taxi via Sohra town road",
      rail: "Shillong (~50 km)"
    },
    sevensisters: {
      title: "Seven Sisters (Nohsngithiang) Falls",
      sub: "Seven-Segment Monsoon Waterfall",
      desc: "A dramatic seven-strand waterfall dropping off the same plateau escarpment, best seen in full spate during the monsoon months.",
      dist: "~12 km from Nohkalikai Falls",
      vehicle: "Car or taxi toward Sohra town",
      rail: "Shillong (~50 km)"
    },
    rootbridge: {
      title: "Double Decker Living Root Bridge",
      sub: "Nongriat Village Trek",
      desc: "A famous hand-grown root bridge reached via a steep multi-hour trek down into the valley, one of Meghalaya's signature living-root structures.",
      dist: "~15 km to trailhead, plus a multi-hour trek",
      vehicle: "Car to trailhead, then trekking on foot",
      rail: "Shillong (~65 km)"
    },
    sohra: {
      title: "Cherrapunji (Sohra) Town",
      sub: "Main Local Base & Market Town",
      desc: "The historic plateau town that gives the region its name, with markets, guesthouses, and the main road junctions for reaching all nearby attractions.",
      dist: "7 km from Nohkalikai Falls",
      vehicle: "Main hub for taxis and local transport",
      rail: "Shillong (~55 km, nearest rail/air connections)"
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Seasonal Elements
    const seasonBtns = document.querySelectorAll('.season-btn');
    const sCardTitle = document.getElementById('s-card-title');
    const sCardDesc = document.getElementById('s-card-desc');
    const spFlow = document.getElementById('sp-flow');
    const spVisibility = document.getElementById('sp-visibility');
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
          if (spVisibility) spVisibility.textContent = sdata.visibility;
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
     * Landscape Map Pin Handler
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