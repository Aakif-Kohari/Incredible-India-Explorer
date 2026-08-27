/**
 * script.js
 * Dudhsagar Falls Explorer Logic
 */

(function () {
  'use strict';

  // 5-STEP JOURNEY DATASET
  // Waterfall -> Height/Tiers -> Landscape -> Season -> Location
  const JOURNEY_STEPS = {
    waterfall: {
      badge: "Step 1: The Sea of Milk",
      title: "Why It's Called \"Dudhsagar\"",
      desc: "As monsoon-fed water crashes down the sheer granite face and breaks apart on rocky ledges, it froths into a milky-white torrent visible from kilometers away — earning the falls its Konkani name, Dudhsagar, meaning \"Sea of Milk\".",
      img: "https://images.unsplash.com/photo-1667760334198-d3958029a08b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RHVkaHNhZ2FyfGVufDB8fDB8fHww",
      caption: "Full-scale view of Dudhsagar's milky-white cascade over Western Ghats granite",
      meta: [
        { label: "River", val: "Headwater stream of the Mandovi River" },
        { label: "Type", val: "Four-tiered segmented plunge waterfall" },
        { label: "Rank", val: "Among India's tallest waterfalls (310m / 1,017 ft)" }
      ]
    },
    height: {
      badge: "Step 2: Four Dramatic Tiers",
      title: "310 Meters Across Four Stages",
      desc: "The cascade descends in four distinct segments carved into the granite of the Western Ghats, each stage widening or narrowing depending on rainfall, before crashing into a plunge pool beside the historic railway viaduct.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKZaLl7yMySTVDhZkcD47H5s072E--gji2-r7nLf-3xg&s=10",
      caption: "The four-tiered plunge structure of Dudhsagar Falls, viewed from the base pool",
      meta: [
        { label: "Total Height", val: "310 meters (1,017 feet)" },
        { label: "Tiers", val: "Four segmented drops of roughly 110m, 80m, 60m, 60m" },
        { label: "Base Feature", val: "Natural plunge pool beside the railway viaduct" }
      ]
    },
    landscape: {
      badge: "Step 3: Bhagwan Mahavir Wildlife Sanctuary",
      title: "Mandovi Headwaters & Western Ghats Rainforest",
      desc: "The falls lie inside the Bhagwan Mahavir Wildlife Sanctuary and Mollem National Park, part of the UNESCO-recognized Western Ghats, feeding a headwater stream that eventually joins the Mandovi River, Goa's principal waterway.",
      img: "https://plus.unsplash.com/premium_photo-1661832611972-b6ee1aba3581?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmhhZ3dhbiUyME1haGF2aXIlMjBXaWxkbGlmZSUyMFNhbmN0dWFyeXxlbnwwfHwwfHx8MA%3D%3D",
      caption: "Evergreen Western Ghats forest surrounding the Mandovi headwaters near Dudhsagar",
      meta: [
        { label: "Protected Area", val: "Bhagwan Mahavir Wildlife Sanctuary & Mollem National Park" },
        { label: "Key Wildlife", val: "Gaur, sambar deer, giant squirrels, leopards" },
        { label: "River System", val: "Feeds into the Mandovi River basin" }
      ]
    },
    season: {
      badge: "Step 4: Seasonal Transformation",
      title: "Monsoon Torrent to Post-Monsoon Calm",
      desc: "June to September brings the falls to full milky-white flood, though jeep access is restricted for safety. October to February offers the best balance of strong flow and open access, while March to May sees the falls reduced to a slender trickle.",
      img: "https://images.unsplash.com/photo-1652120704209-14cbc87b603f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RHVkaHNhZ2FyfGVufDB8fDB8fHww",
      caption: "Post-monsoon view of Dudhsagar with clear skies and full jeep-safari access",
      meta: [
        { label: "Best Visiting Season", val: "October to February" },
        { label: "Monsoon Access", val: "Jeep tracks often closed for safety (Jun-Sep)" },
        { label: "Summer Flow", val: "Reduced to a slender stream (Mar-May)" }
      ]
    },
    location: {
      badge: "Step 5: Geographic Setting",
      title: "Goa-Karnataka Border, Western Ghats",
      desc: "Dudhsagar sits on the Goa-Karnataka border inside Dharbandora taluka, roughly 60 km from Panaji, reached via jeep safari from Kulem or Sonaulim, or by rail along the scenic Castle Rock-Kulem line.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUNq5KqnCVKdSbN16l0tkIuv-3Wk4YzhMfFPZnHP3Jvg&s=10",
      caption: "Western Ghats terrain along the Goa-Karnataka border near Dudhsagar",
      meta: [
        { label: "District", val: "South Goa, Dharbandora taluka" },
        { label: "Entry Points", val: "Kulem / Sonaulim (jeep) & Castle Rock (rail/trek)" },
        { label: "Nearest Hub", val: "Panaji (60 km) / Kulem Railway Station (10 km)" }
      ]
    }
  };

  // SEASONAL DATASET
  const SEASON_DATA = {
    monsoon: {
      title: "Monsoon (June to September) — Limited Access",
      desc: "The falls reach their most spectacular, thunderous volume, living up to the 'Sea of Milk' name. However, jeep safari tracks and forest trails are frequently closed by the forest department for visitor safety during heavy rain.",
      flow: "Flow: Maximum, Thunderous, Milky White",
      access: "Access: Jeep Safaris Often Suspended for Safety",
      highlight: "Highlights: Most dramatic volume, lush green surroundings"
    },
    postmonsoon: {
      title: "Post-Monsoon (October to February) — Best Season",
      desc: "With the rains easing off, the falls still carry a strong, clear volume of water while jeep safaris from Kulem and Sonaulim run at full capacity. Cool, comfortable weather makes this the most popular and safest window to visit.",
      flow: "Flow: Strong, Clear, Photogenic",
      access: "Access: Jeep Safaris & Trekking Fully Open",
      highlight: "Highlights: Best photography, safe swimming pools"
    },
    summer: {
      title: "Summer (March to May) — Reduced Flow",
      desc: "The stream thins into a slender ribbon as the dry season sets in. Fewer crowds and cooler forest shade make it a quieter visit, though the milky cascade effect is far less pronounced than in other seasons.",
      flow: "Flow: Thin, Slender Ribbon",
      access: "Access: Open, Lower Water Levels at Base Pool",
      highlight: "Highlights: Fewer crowds, easier forest trekking"
    }
  };

  // NEARBY ATTRACTIONS / LOCATION MAP SPOTS DATASET
  const LOCATION_SPOTS = {
    dudhsagar: {
      title: "Dudhsagar Falls Viewpoint",
      sub: "Bhagwan Mahavir Wildlife Sanctuary, Goa",
      desc: "The main viewing platform sits at the base of the fourth tier, offering close-up views of the plunge pool and the railway viaduct arching overhead.",
      dist: "60 km from Panaji, 10 km from Kulem",
      vehicle: "Authorized open jeep safari from Kulem or Sonaulim",
      rail: "Kulem / Collem (10 km) / Castle Rock (14 km)"
    },
    tambdisurla: {
      title: "Tambdi Surla Temple",
      sub: "Goa's Oldest Surviving Stone Temple",
      desc: "A 12th-century Kadamba-Yadava era basalt temple dedicated to Lord Mahadev, tucked deep in the forest and reachable via a separate forest road from the main jeep circuit.",
      dist: "~18 km from Dudhsagar Falls",
      vehicle: "Car or bike via forest road",
      rail: "Kulem Railway Station (~20 km)"
    },
    devilscanyon: {
      title: "Devil's Canyon",
      sub: "Turquoise Rock-Pool Gorge",
      desc: "A striking rock gorge carved by the same headwater stream, with clear turquoise pools popular for a short, scenic stop along the jeep safari route.",
      dist: "~5 km from Dudhsagar Falls",
      vehicle: "Included on most jeep safari routes",
      rail: "Kulem Railway Station (~12 km)"
    },
    mollem: {
      title: "Mollem National Park",
      sub: "Goa's Core Protected Rainforest",
      desc: "The wider protected area surrounding the falls, with hiking trails, a small deer park, and rich birdlife across its evergreen and moist deciduous forest.",
      dist: "Falls lie within the park boundary",
      vehicle: "Forest department entry gate at Mollem",
      rail: "Kulem / Collem Railway Station (~8 km)"
    },
    castlerock: {
      title: "Castle Rock",
      sub: "Scenic Karnataka Border Railway Village",
      desc: "A quiet hill village and railway station just across the Goa-Karnataka border, popular as a starting point for treks along the scenic rail line toward the falls.",
      dist: "~14 km from Dudhsagar Falls",
      vehicle: "Rail or forest trekking trail",
      rail: "Castle Rock Railway Station"
    },
    kulem: {
      title: "Kulem / Sonaulim Jeep Entry Point",
      sub: "Main Jeep Safari Starting Point",
      desc: "The primary staging area where visitors board authorized open jeeps for the rugged ride up to the falls, with ticket counters and parking facilities.",
      dist: "10 km to Dudhsagar Falls",
      vehicle: "Jeep safari boarding point",
      rail: "Kulem (Collem) Railway Station"
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Stepper Elements
    const stepBtns = document.querySelectorAll('.step-btn');
    const jStepBadge = document.getElementById('j-step-badge');
    const jTitle = document.getElementById('j-title');
    const jDesc = document.getElementById('j-desc');
    const jMeta = document.getElementById('j-meta');
    const jImg = document.getElementById('j-img');
    const jCaption = document.getElementById('j-caption');

    // Seasonal Elements
    const seasonBtns = document.querySelectorAll('.season-btn');
    const sCardTitle = document.getElementById('s-card-title');
    const sCardDesc = document.getElementById('s-card-desc');
    const spFlow = document.getElementById('sp-flow');
    const spAccess = document.getElementById('sp-access');
    const spHighlight = document.getElementById('sp-highlight');

    // Attraction Cards
    const attractionCards = document.querySelectorAll('.attraction-card');

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
     * 5-Step Journey Stepper Handler
     */
    stepBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        stepBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const stepKey = btn.getAttribute('data-step');
        const data = JOURNEY_STEPS[stepKey];
        if (!data) return;

        if (jStepBadge) jStepBadge.textContent = data.badge;
        if (jTitle) jTitle.textContent = data.title;
        if (jDesc) jDesc.textContent = data.desc;
        if (jImg) {
          jImg.src = data.img;
          jImg.alt = data.caption;
        }
        if (jCaption) jCaption.textContent = data.caption;

        if (jMeta) {
          jMeta.innerHTML = data.meta
            .map(m => `<div><strong>${m.label}:</strong> <span>${m.val}</span></div>`)
            .join('');
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
          if (spAccess) spAccess.textContent = sdata.access;
          if (spHighlight) spHighlight.textContent = sdata.highlight;
        }
      });
    });

    /**
     * Shared updater for location/attraction info card
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
     * Nearby Attraction Explorer Card Handler
     */
    attractionCards.forEach(function (card) {
      card.addEventListener('click', function () {
        attractionCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const spotKey = card.getAttribute('data-spot');
        updateLocationCard(spotKey);

        // Sync the map pin highlight, if present
        circuitPins.forEach(function (pin) {
          pin.classList.toggle('active', pin.getAttribute('data-spot') === spotKey);
        });

        // Scroll the map into gentle view context on smaller screens
        const mapSection = document.getElementById('location-map-section');
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

        // Sync matching attraction card, if present
        attractionCards.forEach(function (card) {
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