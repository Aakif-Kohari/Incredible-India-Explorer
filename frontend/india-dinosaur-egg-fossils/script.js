/**
 * Dinosaur Egg Fossils Profile Script
 * Interactive clutch analyzer, ootaxonomy explorer, and oology quiz
 */

(function () {
  'use strict';

  // Clutch Eggs Data
  const CLUTCH_EGGS = [
    {
      id: 1,
      title: 'Clutch Egg #1 (Spherical Sauropod)',
      oospecies: 'Megaloolithus cylindricus',
      diameter: '16.4 cm',
      thickness: '2.1 mm',
      pore: 'Tubocanaliculate (High density)',
      parent: 'Titanosaur Sauropod (Isisaurus / Jainosaurus)',
      cx: 140,
      cy: 130,
      r: 34,
      fill: '#f59e0b'
    },
    {
      id: 2,
      title: 'Clutch Egg #2 (Sub-spherical)',
      oospecies: 'Megaloolithus dhoriangadensis',
      diameter: '15.8 cm',
      thickness: '1.9 mm',
      pore: 'Angusticanaliculate',
      parent: 'Titanosaur Sauropod',
      cx: 210,
      cy: 110,
      r: 32,
      fill: '#fbbf24'
    },
    {
      id: 3,
      title: 'Clutch Egg #3 (Thick-Shelled Sauropod)',
      oospecies: 'Fusioolithus baghensis',
      diameter: '18.2 cm',
      thickness: '2.6 mm',
      pore: 'Tubocanaliculate',
      parent: 'Large Titanosaurid',
      cx: 270,
      cy: 150,
      r: 36,
      fill: '#d97706'
    },
    {
      id: 4,
      title: 'Clutch Egg #4 (Double-Shelled Pathology)',
      oospecies: 'Pathological Megaloolithus',
      diameter: '17.0 cm',
      thickness: '3.8 mm (Double Shell)',
      pore: 'Occluded/Irregular Pores',
      parent: 'Stressed Titanosaur (Volcanic Impact)',
      cx: 240,
      cy: 220,
      r: 35,
      fill: '#ef4444'
    },
    {
      id: 5,
      title: 'Clutch Egg #5 (Central Incubation Egg)',
      oospecies: 'Megaloolithus cylindricus',
      diameter: '16.1 cm',
      thickness: '2.0 mm',
      pore: 'Tubocanaliculate',
      parent: 'Titanosaur Sauropod',
      cx: 160,
      cy: 210,
      r: 33,
      fill: '#f59e0b'
    },
    {
      id: 6,
      title: 'Clutch Egg #6 (Outer Perimeter Egg)',
      oospecies: 'Megaloolithus cylindricus',
      diameter: '16.5 cm',
      thickness: '2.2 mm',
      pore: 'Tubocanaliculate',
      parent: 'Titanosaur Sauropod',
      cx: 110,
      cy: 190,
      r: 31,
      fill: '#f59e0b'
    }
  ];

  // DOM Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const clutchVisual = document.getElementById('clutch-visual');

  // Clutch Data Panel Elements
  const eggSelectTitle = document.getElementById('egg-select-title');
  const eggOospecies = document.getElementById('egg-oospecies');
  const eggDiameter = document.getElementById('egg-diameter');
  const eggThickness = document.getElementById('egg-thickness');
  const eggPore = document.getElementById('egg-pore');
  const eggParent = document.getElementById('egg-parent');

  // Quiz Elements
  const quizOpts = document.getElementById('egg-quiz-opts');
  const quizFeedback = document.getElementById('egg-quiz-feedback');

  function init() {
    setupTabs();
    renderClutchAnalyzer();
    setupQuiz();
    setupThemeToggle();
    setupMobileMenu();
  }

  // Tab Navigation
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

  // Clutch Analyzer
  function renderClutchAnalyzer() {
    if (!clutchVisual) return;

    clutchVisual.innerHTML = `
      <svg viewBox="0 0 380 320" class="clutch-svg" aria-label="Interactive Dinosaur Egg Clutch">
        <defs>
          <radialGradient id="eggGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#fef3c7"/>
            <stop offset="70%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#b45309"/>
          </radialGradient>
        </defs>
        <!-- Sandy Nest Scoop Boundary -->
        <ellipse cx="190" cy="170" rx="160" ry="120" fill="#1e293b" stroke="#f59e0b" stroke-dasharray="6,4" stroke-width="2"/>
        <text x="110" y="40" fill="#94a3b8" font-size="12" font-weight="700">Fossilized Nest Depression</text>

        <!-- Eggs -->
        ${CLUTCH_EGGS.map((egg, idx) => `
          <g class="interactive-egg ${idx === 0 ? 'active' : ''}" data-id="${egg.id}" tabindex="0" role="button" aria-label="${egg.title}">
            <circle cx="${egg.cx}" cy="${egg.cy}" r="${egg.r}" fill="${egg.fill}" stroke="#0f172a" stroke-width="2"/>
            <text x="${egg.cx - 6}" y="${egg.cy + 5}" fill="#ffffff" font-size="14" font-weight="800">${egg.id}</text>
          </g>
        `).join('')}
      </svg>
    `;

    clutchVisual.querySelectorAll('.interactive-egg').forEach(eggEl => {
      eggEl.addEventListener('click', () => {
        const eggId = parseInt(eggEl.dataset.id, 10);
        selectClutchEgg(eggId);
      });
    });
  }

  function selectClutchEgg(eggId) {
    const egg = CLUTCH_EGGS.find(e => e.id === eggId);
    if (!egg) return;

    clutchVisual.querySelectorAll('.interactive-egg').forEach(el => {
      el.classList.toggle('active', parseInt(el.dataset.id, 10) === eggId);
    });

    eggSelectTitle.textContent = egg.title;
    eggOospecies.textContent = egg.oospecies;
    eggDiameter.textContent = egg.diameter;
    eggThickness.textContent = egg.thickness;
    eggPore.textContent = egg.pore;
    eggParent.textContent = egg.parent;
  }

  // Quiz
  function setupQuiz() {
    if (!quizOpts) return;

    const options = [
      { text: 'The eggs were buried in damp, organic-rich soil to prevent dehydration and enable gas exchange', correct: true },
      { text: 'The eggs were laid in deep ocean water like modern fish', correct: false },
      { text: 'The parents continuously sat on them without any sediment covering', correct: false },
      { text: 'The eggs were made of metal to withstand lava', correct: false }
    ];

    quizOpts.innerHTML = options.map((opt, i) => `
      <button class="q-opt-btn" data-correct="${opt.correct}">${String.fromCharCode(65 + i)}. ${opt.text}</button>
    `).join('');

    quizOpts.querySelectorAll('.q-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        quizOpts.querySelectorAll('.q-opt-btn').forEach(b => b.disabled = true);

        quizFeedback.style.display = 'block';
        if (isCorrect) {
          btn.style.borderColor = '#10b981';
          btn.style.color = '#34d399';
          quizFeedback.className = 'feedback-msg success';
          quizFeedback.textContent = '🎉 Correct! High pore canal conductance proves titanosaurs buried their eggs in moist riverine sediments and decomposing vegetation for incubation, similar to modern crocodiles and mound-building birds!';
        } else {
          btn.style.borderColor = '#ef4444';
          btn.style.color = '#f87171';
          quizFeedback.className = 'feedback-msg error';
          quizFeedback.textContent = '❌ Incorrect. High pore density is an evolutionary adaptation for subterranean gas diffusion in humid, buried nesting substrate.';
        }
      });
    });
  }

  // Theme Toggle
  function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? '🌙' : '☀️';
    });
  }

  // Mobile Menu Toggle
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

  window.DinosaurEggExplorer = {
    eggs: CLUTCH_EGGS,
    selectEgg: selectClutchEgg
  };
})();
