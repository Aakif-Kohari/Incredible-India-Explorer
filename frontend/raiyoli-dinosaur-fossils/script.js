/**
 * Dinosaur Fossils of Raiyoli Gujarat Profile Script
 * Interactive paleontological exploration, stratigraphy, virtual excavation, and quiz
 */

(function () {
  'use strict';

  // Zone Information Database
  const ZONE_INFO = {
    rajasaurus: {
      title: '1. Rajasaurus Discovery Quarry',
      desc: 'The precise location where GSI paleontologist Suresh Srivastava excavated the holotype cranial bones, braincase, and postcranial skeleton of Rajasaurus narmadensis between 1982 and 1984.'
    },
    nesting: {
      title: '2. Egg Clutch Field (Hatchery Ground)',
      desc: 'A dense sedimentary bedding plane containing hundreds of fossilized sauropod eggs arranged in circular clusters of 4 to 12 eggs, preserved in Late Cretaceous palaeosols.'
    },
    rahiolisaurus: {
      title: '3. Rahiolisaurus Bonebed Quarry',
      desc: 'A rich multi-individual bonebed containing skeletal remains from at least seven different Rahiolisaurus gujaratensis specimens of various growth stages.'
    },
    museum: {
      title: '4. Museum & Interpretation Center',
      desc: 'The 25,000 sq ft Dinosaur Museum featuring 10 interactive galleries, 3D theaters, fossil touch tables, and life-size animatronic models.'
    }
  };

  // Virtual Excavation Lab Elements
  const LAB_TILES_DATA = [
    { id: 0, fossil: 'horn', name: '🦴 Cranial Horn', icon: '🦖' },
    { id: 1, fossil: null, name: 'Calcareous Sandstone Matrix', icon: '🪨' },
    { id: 2, fossil: 'jaw', name: '🦷 Serrated Dentary Tooth', icon: '🦷' },
    { id: 3, fossil: null, name: 'Marl Sediments', icon: '🪨' },
    { id: 4, fossil: 'egg', name: '🥚 Titanosaur Egg', icon: '🥚' },
    { id: 5, fossil: null, name: 'Nodular Limestone', icon: '🪨' },
    { id: 6, fossil: 'vertebra', name: '🦴 Cervical Vertebra', icon: '🦴' },
    { id: 7, fossil: null, name: 'Chert Nodule', icon: '🪨' },
    { id: 8, fossil: null, name: 'Basal Conglomerate', icon: '🪨' },
    { id: 9, fossil: 'femur', name: '🦴 Robust Femur', icon: '🦴' },
    { id: 10, fossil: null, name: 'Fluvial Sandstone', icon: '🪨' },
    { id: 11, fossil: 'claw', name: '🐾 Theropod Ungual Claw', icon: '🐾' },
    { id: 12, fossil: null, name: 'Caliche Crust', icon: '🪨' },
    { id: 13, fossil: null, name: 'Sandy Clay', icon: '🪨' },
    { id: 14, fossil: null, name: 'Siltstone', icon: '🪨' },
    { id: 15, fossil: null, name: 'Weathered Basalt', icon: '🪨' }
  ];

  // DOM Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const zoneNodes = document.querySelectorAll('.zone-node');
  const zoneTitle = document.getElementById('zone-title');
  const zoneDesc = document.getElementById('zone-desc');

  // Lab Elements
  const labTools = document.querySelectorAll('.btn-lab-tool:not(.btn-reset-lab)');
  const btnResetLab = document.getElementById('btn-reset-lab');
  const excavationGrid = document.getElementById('excavation-grid');
  const labProgress = document.getElementById('lab-progress');

  // Quiz Elements
  const quizOptsContainer = document.getElementById('r-quiz-opts');
  const quizFeedback = document.getElementById('r-quiz-feedback');

  // State
  let activeTool = 'brush';
  let uncoveredFossilsCount = 0;
  const totalFossilsCount = 6;
  const excavatedTileIds = new Set();

  function init() {
    setupTabs();
    setupZoneMap();
    setupExcavationLab();
    setupQuiz();
    setupThemeToggle();
    setupMobileMenu();
  }

  // 1. Tab Switching
  function setupTabs() {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;

        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const activePane = document.getElementById(`tab-${targetTab}`);
        if (activePane) {
          activePane.classList.add('active');
        }
      });
    });
  }

  // 2. Zone Map Interaction
  function setupZoneMap() {
    zoneNodes.forEach(node => {
      node.addEventListener('click', () => {
        const zoneKey = node.dataset.zone;
        if (ZONE_INFO[zoneKey]) {
          zoneTitle.textContent = ZONE_INFO[zoneKey].title;
          zoneDesc.textContent = ZONE_INFO[zoneKey].desc;
        }
      });

      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          node.click();
        }
      });
    });
  }

  // 3. Virtual Excavation Lab
  function setupExcavationLab() {
    // Tool buttons
    labTools.forEach(btn => {
      btn.addEventListener('click', () => {
        labTools.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTool = btn.dataset.tool;
      });
    });

    renderExcavationGrid();

    if (btnResetLab) {
      btnResetLab.addEventListener('click', resetExcavationLab);
    }
  }

  function renderExcavationGrid() {
    if (!excavationGrid) return;
    excavationGrid.innerHTML = LAB_TILES_DATA.map(tile => `
      <div class="excavation-tile ${excavatedTileIds.has(tile.id) ? 'excavated' : ''}" data-id="${tile.id}" tabindex="0" role="button" aria-label="Excavation Block ${tile.id + 1}">
        <span class="tile-overlay">🪨 Sedimentary Bed #${tile.id + 1}</span>
        <span class="tile-fossil-icon">${tile.icon}</span>
      </div>
    `).join('');

    excavationGrid.querySelectorAll('.excavation-tile').forEach(tileEl => {
      tileEl.addEventListener('click', () => {
        const tileId = parseInt(tileEl.dataset.id, 10);
        handleTileExcavate(tileId, tileEl);
      });
    });
  }

  function handleTileExcavate(tileId, tileEl) {
    if (excavatedTileIds.has(tileId)) return;

    excavatedTileIds.add(tileId);
    tileEl.classList.add('excavated');

    const data = LAB_TILES_DATA.find(t => t.id === tileId);
    if (data && data.fossil) {
      uncoveredFossilsCount++;
      labProgress.textContent = `Fossils Uncovered: ${uncoveredFossilsCount} / ${totalFossilsCount} elements`;

      const invEl = document.getElementById(`inv-${data.fossil}`);
      if (invEl) {
        invEl.classList.add('found');
      }

      if (uncoveredFossilsCount === totalFossilsCount) {
        labProgress.textContent = `🎉 Excavation Complete! You recovered the full Rajasaurus assemblage!`;
      }
    }
  }

  function resetExcavationLab() {
    excavatedTileIds.clear();
    uncoveredFossilsCount = 0;
    if (labProgress) {
      labProgress.textContent = `Fossils Uncovered: 0 / ${totalFossilsCount} elements`;
    }
    document.querySelectorAll('.inv-item').forEach(el => el.classList.remove('found'));
    renderExcavationGrid();
  }

  // 4. Raiyoli Quiz Setup
  function setupQuiz() {
    if (!quizOptsContainer) return;

    const options = [
      { text: 'A single rounded horn crest on its nasal-frontal bones', correct: true },
      { text: 'Three long forward-pointing horns like Triceratops', correct: false },
      { text: 'A hollow duck-like bill for water filtration', correct: false },
      { text: 'Sail-backed dorsal crest spines like Spinosaurus', correct: false }
    ];

    quizOptsContainer.innerHTML = options.map((opt, i) => `
      <button class="r-opt-btn" data-correct="${opt.correct}">${String.fromCharCode(65 + i)}. ${opt.text}</button>
    `).join('');

    quizOptsContainer.querySelectorAll('.r-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        quizOptsContainer.querySelectorAll('.r-opt-btn').forEach(b => b.disabled = true);

        quizFeedback.style.display = 'block';
        if (isCorrect) {
          btn.style.borderColor = '#10b981';
          btn.style.color = '#34d399';
          quizFeedback.className = 'r-feedback success';
          quizFeedback.textContent = '🎉 Correct! Rajasaurus is famously recognized for its prominent nasal-frontal horn crest, marking it as a distinct Gondwanan abelisaurid predator!';
        } else {
          btn.style.borderColor = '#ef4444';
          btn.style.color = '#f87171';
          quizFeedback.className = 'r-feedback error';
          quizFeedback.textContent = '❌ Incorrect. Rajasaurus possessed a single rounded cranial horn on its nasal-frontal bones.';
        }
      });
    });
  }

  // 5. Theme Toggle
  function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? '🌙' : '☀️';
    });
  }

  // 6. Mobile Menu Toggle
  function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.RaiyoliExplorer = {
    zones: ZONE_INFO,
    labTiles: LAB_TILES_DATA,
    resetLab: resetExcavationLab
  };
})();
