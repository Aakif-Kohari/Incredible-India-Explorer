/**
 * The Lameta Formation and India's Dinosaur Record Profile Script
 * Interactive Stratigraphic Column Explorer, Lithology Analyzer, and Quiz
 */

(function () {
  'use strict';

  // Stratigraphic Column Data
  const STRAT_LAYERS = [
    {
      id: 'deccan',
      title: 'Deccan Traps Flood Basalts',
      badge: 'Volcanic Cap Horizon',
      color: '#ef4444',
      age: '66.0 – 65.5 Million Years Ago',
      lithology: 'Tholeiitic Columnar Basalt, Pahoehoe & Aa Lava Flows',
      fossils: 'Intertrappean frogs (Indobatrachus), freshwater gastropods, charophytes',
      desc: 'Extensive flood basalt lavas covering over 500,000 km² across Western and Central India, marking the catastrophic Cretaceous-Paleogene extinction boundary.'
    },
    {
      id: 'mottled',
      title: 'Mottled Nodular Limestone & Calcrete Beds',
      badge: 'Upper Lameta Horizon',
      color: '#f59e0b',
      age: '66.8 – 66.2 Million Years Ago',
      lithology: 'Pedogenic Calcretes, Nodular Carbonate Rocks, Sandy Marls',
      fossils: 'Sauropod egg clutches (Megaloolithus, Fusioolithus), pathological eggs',
      desc: 'Formed in ancient floodplain palaeosol settings subject to seasonal wet-dry cycles; primary horizon containing titanosaur nesting colonies.'
    },
    {
      id: 'greensand',
      title: 'Green Sandstone & Sandy Clay Horizon',
      badge: 'Main Dinosaur Bonebed',
      color: '#10b981',
      age: '67.5 – 66.8 Million Years Ago',
      lithology: 'Glauconitic Calcareous Sandstone, Siltstone, Channel Sands',
      fossils: 'Rajasaurus, Indosuchus, Isisaurus, Jainosaurus, Sanajeh snake',
      desc: 'Deposited by Cretaceous meandering stream channels and point bars; preserves articulated skeletal elements, teeth, and coprolites.'
    },
    {
      id: 'chert',
      title: 'Cherty Limestone & Lacustrine Jasperoid Beds',
      badge: 'Lower Lameta Horizon',
      color: '#06b6d4',
      age: '68.5 – 67.5 Million Years Ago',
      lithology: 'Silicified Freshwater Limestone, Bedded Chert, Jasper',
      fossils: 'Physa prinsepii gastropods, fish scales, ostracods, plant stems',
      desc: 'Ancient shallow alkaline freshwater lakes and wetland swamps that covered Central India before the onset of intense volcanism.'
    },
    {
      id: 'basement',
      title: 'Basal Conglomerate & Pre-Cambrian Craton',
      badge: 'Basal Unconformity',
      color: '#8b5cf6',
      age: '> 1.0 Billion Years (Precambrian Basement)',
      lithology: 'Quartzite Conglomerate resting on Granitic/Gneissic Craton',
      fossils: 'Non-fossiliferous crystalline metamorphic and igneous bedrock',
      desc: 'The ancient crystalline continental crust of the Indian Shield that forms the basement floor beneath the Lameta sedimentary basin.'
    }
  ];

  // DOM Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const stratColumnList = document.getElementById('strat-column-list');

  // Column Detail Panel Elements
  const cdpBadge = document.getElementById('cdp-badge');
  const cdpTitle = document.getElementById('cdp-title');
  const cdpAge = document.getElementById('cdp-age');
  const cdpLithology = document.getElementById('cdp-lithology');
  const cdpFossils = document.getElementById('cdp-fossils');
  const cdpDesc = document.getElementById('cdp-desc');

  // Quiz Elements
  const quizOpts = document.getElementById('lameta-quiz-opts');
  const quizFeedback = document.getElementById('lameta-quiz-feedback');

  function init() {
    setupTabs();
    renderStratColumn();
    setupQuiz();
    setupThemeToggle();
    setupMobileMenu();
  }

  // 1. Tab Navigation
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

  // 2. Interactive Stratigraphic Column
  function renderStratColumn() {
    if (!stratColumnList) return;

    stratColumnList.innerHTML = STRAT_LAYERS.map((layer, idx) => `
      <button class="column-layer-btn ${idx === 0 ? 'active' : ''}" data-id="${layer.id}" style="border-left-color: ${layer.color};">
        <span class="layer-btn-title">${layer.title}</span>
        <span class="layer-btn-age">⏳ ${layer.age}</span>
      </button>
    `).join('');

    stratColumnList.querySelectorAll('.column-layer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const layerId = btn.dataset.id;
        selectStratLayer(layerId);
      });
    });
  }

  function selectStratLayer(layerId) {
    const layer = STRAT_LAYERS.find(l => l.id === layerId);
    if (!layer) return;

    stratColumnList.querySelectorAll('.column-layer-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.id === layerId);
    });

    cdpBadge.textContent = layer.badge;
    cdpBadge.style.backgroundColor = `${layer.color}22`;
    cdpBadge.style.color = layer.color;
    cdpTitle.textContent = layer.title;
    cdpAge.textContent = layer.age;
    cdpLithology.textContent = layer.lithology;
    cdpFossils.textContent = layer.fossils;
    cdpDesc.textContent = layer.desc;
  }

  // 3. Quiz
  function setupQuiz() {
    if (!quizOpts) return;

    const options = [
      { text: 'It sits directly beneath (infratrappean) and interbedded with the basalts, capturing the final dinosaurs before the eruptions', correct: true },
      { text: 'It was formed millions of years after the Himalayas were fully formed', correct: false },
      { text: 'It is a modern coral reef in the Indian Ocean', correct: false },
      { text: 'It has no connection to volcanic activity', correct: false }
    ];

    quizOpts.innerHTML = options.map((opt, i) => `
      <button class="lam-opt-btn" data-correct="${opt.correct}">${String.fromCharCode(65 + i)}. ${opt.text}</button>
    `).join('');

    quizOpts.querySelectorAll('.lam-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        quizOpts.querySelectorAll('.lam-opt-btn').forEach(b => b.disabled = true);

        quizFeedback.style.display = 'block';
        if (isCorrect) {
          btn.style.borderColor = '#10b981';
          btn.style.color = '#34d399';
          quizFeedback.className = 'feedback-box success';
          quizFeedback.textContent = '🎉 Correct! The Lameta Formation is classic infratrappean/intertrappean sediment, directly recording Indian dinosaur fauna in the final moments before the Deccan volcanic flood basalt eruptions!';
        } else {
          btn.style.borderColor = '#ef4444';
          btn.style.color = '#f87171';
          quizFeedback.className = 'feedback-box error';
          quizFeedback.textContent = '❌ Incorrect. The Lameta beds are immediately infratrappean to the Deccan Traps basalt flows, capturing the Cretaceous-Paleogene boundary.';
        }
      });
    });
  }

  // 4. Theme Toggle
  function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? '🌙' : '☀️';
    });
  }

  // 5. Mobile Menu Toggle
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

  window.LametaExplorer = {
    layers: STRAT_LAYERS,
    selectLayer: selectStratLayer
  };
})();
