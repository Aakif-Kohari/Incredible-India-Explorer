/**
 * River Trace Challenge Engine
 * Provides waypoint click/drag tracing on SVG map canvas for 5 major Indian rivers,
 * dynamic distance/accuracy scoring algorithm, and post-trace river info cards.
 */

export const RIVERS_DATA = {
  ganga: {
    id: "ganga",
    name: "Ganga",
    subtitle: "From Gangotri Glacier (Uttarakhand) to Bay of Bengal (Sundarbans)",
    length: "2,525 km",
    statesCrossed: ["Uttarakhand", "Uttar Pradesh", "Bihar", "Jharkhand", "West Bengal"],
    tributaries: ["Yamuna", "Ghaghara", "Gandak", "Kosi", "Son"],
    significance: "National river of India, sacred to over a billion people, supporting one of the world's most populous river basins.",
    actualWaypoints: [
      { x: 300, y: 120 }, // Gangotri
      { x: 360, y: 190 }, // Haridwar / Prayagraj
      { x: 480, y: 220 }, // Varanasi / Patna
      { x: 580, y: 250 }, // Farakka
      { x: 620, y: 310 }  // Sundarbans Bay of Bengal
    ],
    svgPathD: "M 300 120 L 360 190 L 480 220 L 580 250 L 620 310"
  },

  yamuna: {
    id: "yamuna",
    name: "Yamuna",
    subtitle: "From Yamunotri Glacier (Uttarakhand) to Triveni Sangam (Prayagraj)",
    length: "1,376 km",
    statesCrossed: ["Uttarakhand", "Himachal Pradesh", "Haryana", "Delhi", "Uttar Pradesh"],
    tributaries: ["Chambal", "Betwa", "Ken", "Tons", "Hindon"],
    significance: "Largest tributary of Ganga, flowing past Delhi and Agra, uniting with Ganga at Triveni Sangam in Prayagraj.",
    actualWaypoints: [
      { x: 280, y: 110 }, // Yamunotri
      { x: 270, y: 170 }, // Delhi
      { x: 310, y: 200 }, // Agra
      { x: 360, y: 220 }, // Etawah
      { x: 420, y: 230 }  // Prayagraj Sangam
    ],
    svgPathD: "M 280 110 L 270 170 L 310 200 L 360 220 L 420 230"
  },

  godavari: {
    id: "godavari",
    name: "Godavari",
    subtitle: "From Trimbakeshwar (Maharashtra) to Bay of Bengal (Andhra Pradesh)",
    length: "1,465 km",
    statesCrossed: ["Maharashtra", "Telangana", "Andhra Pradesh", "Chhattisgarh", "Odisha"],
    tributaries: ["Pranhita", "Indravati", "Manjira", "Sabari", "Bindusara"],
    significance: "Known as Dakshin Ganga (Ganges of the South), second longest river in India forming a fertile coastal delta.",
    actualWaypoints: [
      { x: 240, y: 340 }, // Trimbakeshwar
      { x: 320, y: 360 }, // Nanded
      { x: 420, y: 370 }, // Nizamabad / Bhadrachalam
      { x: 490, y: 390 }, // Rajahmundry
      { x: 530, y: 420 }  // Bay of Bengal
    ],
    svgPathD: "M 240 340 L 320 360 L 420 370 L 490 390 L 530 420"
  },

  krishna: {
    id: "krishna",
    name: "Krishna",
    subtitle: "From Mahabaleshwar (Maharashtra) to Hamsaladeevi (Andhra Pradesh)",
    length: "1,400 km",
    statesCrossed: ["Maharashtra", "Karnataka", "Telangana", "Andhra Pradesh"],
    tributaries: ["Tungabhadra", "Bhima", "Koyna", "Ghataprabha", "Malaprabha"],
    significance: "Major source of irrigation for Southern India, fed by heavy Western Ghats monsoon rains.",
    actualWaypoints: [
      { x: 230, y: 380 }, // Mahabaleshwar
      { x: 300, y: 410 }, // Almatti / Raichur
      { x: 390, y: 420 }, // Srisailam
      { x: 460, y: 430 }, // Vijayawada
      { x: 510, y: 450 }  // Hamsaladeevi Bay of Bengal
    ],
    svgPathD: "M 230 380 L 300 410 L 390 420 L 460 430 L 510 450"
  },

  brahmaputra: {
    id: "brahmaputra",
    name: "Brahmaputra",
    subtitle: "From Angsi Glacier (Tibet) through Arunachal Pradesh & Assam to Bay of Bengal",
    length: "2,900 km",
    statesCrossed: ["Arunachal Pradesh", "Assam", "West Bengal (basin)", "Bangladesh"],
    tributaries: ["Subansiri", "Teesta", "Manas", "Dibang", "Lohit"],
    significance: "One of Asia's major transboundary rivers, famous for immense water discharge, Majuli river island, and Kaziranga wetlands.",
    actualWaypoints: [
      { x: 650, y: 100 }, // Arunachal Entry (Siang)
      { x: 620, y: 150 }, // Dibrugarh
      { x: 550, y: 180 }, // Guwahati
      { x: 530, y: 220 }, // Dhubri
      { x: 560, y: 280 }  // Bangladesh / Bay of Bengal
    ],
    svgPathD: "M 650 100 L 620 150 L 550 180 L 530 220 L 560 280"
  }
};

export function calculateAccuracy(userWaypoints, targetWaypoints) {
  if (!userWaypoints || !targetWaypoints || !userWaypoints.length || !targetWaypoints.length) {
    return 0;
  }

  let totalDist = 0;
  const count = Math.min(userWaypoints.length, targetWaypoints.length);

  for (let i = 0; i < count; i++) {
    const u = userWaypoints[i];
    const t = targetWaypoints[i];
    const dx = u.x - t.x;
    const dy = u.y - t.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    totalDist += dist;
  }

  const avgDist = totalDist / count;
  // Maximum tolerance distance of 150px corresponds to 0% accuracy
  const maxTolerance = 150;
  const accuracy = Math.max(0, Math.min(100, Math.round(100 * (1 - avgDist / maxTolerance))));
  return accuracy;
}

export function renderFactSheet(river, accuracy) {
  if (!river) return '';

  return `
    <div class="fact-sheet-card" id="fact-sheet-${river.id}">
      <div class="fact-header">
        <div>
          <h3>🌊 ${river.name} River Fact Sheet</h3>
          <p style="color:#94a3b8">${river.subtitle}</p>
        </div>
        <div class="accuracy-pill">
          Tracing Accuracy: ${accuracy}%
        </div>
      </div>
      <div class="fact-grid">
        <div class="fact-item">
          <h4>📏 Total Length</h4>
          <p><strong>${river.length}</strong></p>
        </div>
        <div class="fact-item">
          <h4>🗺️ States & Regions Crossed</h4>
          <p>${river.statesCrossed.join(', ')}</p>
        </div>
        <div class="fact-item">
          <h4>🌿 Major Tributaries</h4>
          <p>${river.tributaries.join(', ')}</p>
        </div>
        <div class="fact-item">
          <h4>✨ Ecological & Cultural Importance</h4>
          <p>${river.significance}</p>
        </div>
      </div>
    </div>
  `;
}

// DOM Setup
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    let currentRiverKey = 'ganga';
    let userWaypoints = [];

    const titleEl = document.getElementById('current-river-title');
    const subtitleEl = document.getElementById('current-river-subtitle');
    const waypointCountEl = document.getElementById('waypoint-count');
    const accuracyScoreEl = document.getElementById('accuracy-score');
    const actualPathEl = document.getElementById('actual-river-path');
    const polylineEl = document.getElementById('user-trace-polyline');
    const clickOverlay = document.getElementById('map-click-overlay');
    const clearBtn = document.getElementById('btn-clear-trace');
    const submitBtn = document.getElementById('btn-submit-trace');
    const factContainer = document.getElementById('fact-sheet-container');
    const tabs = document.querySelectorAll('.river-tab-btn');
    const sourceMarker = document.getElementById('source-marker');
    const mouthMarker = document.getElementById('mouth-marker');

    function selectRiver(riverKey) {
      currentRiverKey = riverKey;
      const river = RIVERS_DATA[riverKey];
      if (!river) return;

      userWaypoints = [];
      if (titleEl) titleEl.textContent = `River ${river.name}`;
      if (subtitleEl) subtitleEl.textContent = river.subtitle;
      if (waypointCountEl) waypointCountEl.textContent = `0 / ${river.actualWaypoints.length}`;
      if (accuracyScoreEl) accuracyScoreEl.textContent = '0%';
      if (factContainer) factContainer.innerHTML = '';
      if (polylineEl) polylineEl.setAttribute('points', '');

      if (actualPathEl) {
        actualPathEl.setAttribute('d', river.svgPathD);
      }

      // Render Source and Mouth markers
      if (river.actualWaypoints.length > 0) {
        const src = river.actualWaypoints[0];
        const mouth = river.actualWaypoints[river.actualWaypoints.length - 1];

        if (sourceMarker) {
          sourceMarker.setAttribute('transform', `translate(${src.x}, ${src.y})`);
          sourceMarker.classList.remove('hidden');
        }

        if (mouthMarker) {
          mouthMarker.setAttribute('transform', `translate(${mouth.x}, ${mouth.y})`);
          mouthMarker.classList.remove('hidden');
        }
      }

      tabs.forEach(tab => {
        const isActive = tab.getAttribute('data-river') === riverKey;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function updatePolyline() {
      const pointsStr = userWaypoints.map(p => `${p.x},${p.y}`).join(' ');
      if (polylineEl) polylineEl.setAttribute('points', pointsStr);

      const target = RIVERS_DATA[currentRiverKey];
      if (target && waypointCountEl) {
        waypointCountEl.textContent = `${userWaypoints.length} / ${target.actualWaypoints.length}`;
      }
    }

    if (clickOverlay) {
      clickOverlay.addEventListener('click', (e) => {
        const target = RIVERS_DATA[currentRiverKey];
        if (!target || userWaypoints.length >= target.actualWaypoints.length) return;

        const rect = clickOverlay.getBoundingClientRect();
        // Map viewBox scale factors
        const scaleX = 800 / rect.width;
        const scaleY = 600 / rect.height;

        const x = Math.round((e.clientX - rect.left) * scaleX);
        const y = Math.round((e.clientY - rect.top) * scaleY);

        userWaypoints.push({ x, y });
        updatePolyline();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        userWaypoints = [];
        updatePolyline();
        if (accuracyScoreEl) accuracyScoreEl.textContent = '0%';
        if (factContainer) factContainer.innerHTML = '';
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const river = RIVERS_DATA[currentRiverKey];
        if (!river) return;

        const accuracy = calculateAccuracy(userWaypoints, river.actualWaypoints);
        if (accuracyScoreEl) accuracyScoreEl.textContent = `${accuracy}%`;

        if (factContainer) {
          factContainer.innerHTML = renderFactSheet(river, accuracy);
        }
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        selectRiver(tab.getAttribute('data-river'));
      });
    });

    // Default select Ganga
    selectRiver('ganga');
  });
}
