/**
 * script.js
 * Dhuandhar Falls Explorer Logic (#2169)
 */

(function () {
  'use strict';

  // RIVER SPOTS DATASET
  const SPOTS_DATA = {
    falls: {
      title: "Dhuandhar Falls Plunge Rim (30m Drop)",
      sub: "Main Waterfall Drop & Misty Plunge Basin",
      desc: "Where the Narmada River narrows dramatically into a rock chasm and drops 30 meters. The sheer impact generates perpetual mist clouds resembling smoke (Dhuan).",
      loc: "Bhedaghat, Jabalpur (35 km)",
      river: "Narmada River Main Channel",
      high: "30m Plunge, East Promenade View"
    },
    canyon: {
      title: "Bhedaghat Marble Rocks Canyon (3 km)",
      sub: "Magnesium Limestone Cliffs & Boating Stretch",
      desc: "A 3-kilometer stretch of towering 100-foot white, cream, and blue-tinted marble cliffs carved over millennia. Popular for rowboat tours, especially during full moon nights.",
      loc: "Panchvati Ghat to Bandar Kudini",
      river: "Narmada Gorge",
      high: "Rowboat tours, Moonlight vistas"
    },
    ropeway: {
      title: "Overhead Cable Ropeway Line",
      sub: "Aerial Viewpoint Across Narmada River",
      desc: "Connects the East and West banks of Bhedaghat gorge, taking tourists high above the roaring waterfall rim for panoramic aerial photography.",
      loc: "East Bank to West Bank Span",
      river: "Narmada Gorge Crossing",
      high: "360-degree aerial panorama"
    },
    temple: {
      title: "Chausath Yogini Temple (10th Century)",
      sub: "Kalachuri Dynasty Heritage Site",
      desc: "Perched on a hilltop overlooking the Narmada River, this ancient circular shrine houses 64 hand-carved stone Yogini images and a Gauri-Shankar temple.",
      loc: "Hilltop above Bhedaghat",
      river: "Overlooking Narmada Basin",
      high: "Ancient Kalachuri sculpture & river vistas"
    }
  };

  // SEASONAL DATASET
  const SEASON_DATA = {
    monsoon: {
      title: "Monsoon Roaring Spray (July – October)",
      desc: "The Narmada River swells dramatically with rainwater. Water gushes through the marble notch with immense kinetic energy, producing towering mist plumes. Boating is suspended for safety, but ropeway and promenade views are spectacular.",
      flow: "Flow: Heavy High-Volume Torrent",
      boat: "Boating: Suspended due to high currents",
      highlight: "Highlight: Cable Car Aerial View & Mist Plumes"
    },
    winter: {
      title: "Winter Moonlight Boating (November – March)",
      desc: "Cool temperatures and calm emerald-blue waters make winter the peak tourist season. Guided rowboat trips navigate through 100ft white marble cliffs, specially during Sharad Purnima full moon nights.",
      flow: "Flow: Moderate Clear Blue Flow",
      boat: "Boating: Full rowboat operations at Panchvati Ghat",
      highlight: "Highlight: Full Moon Night Boating & Marble Glow"
    },
    summer: {
      title: "Summer Crystal Clarity (April – June)",
      desc: "Water levels drop, revealing intricate water-carved marble formations, pothole erosion, and ancient rock strata along the riverbed.",
      flow: "Flow: Low Water Level",
      boat: "Boating: Morning and evening boat rides",
      highlight: "Highlight: Geological Rock Strata Inspection"
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
