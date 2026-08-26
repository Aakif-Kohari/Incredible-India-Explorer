/**
 * Dinosaur Nesting Sites of India Profile Script
 * Interactive map, nest architecture exploration, and quiz
 */

(function () {
  'use strict';

  // Nesting Localities Map Data
  const NESTING_SITES = {
    dhar: {
      title: 'Dhar Basin, Madhya Pradesh',
      desc: 'Asia’s largest titanosaur nesting complex with 92 distinct nests and 256 eggs discovered across 6 palaeosol horizons.',
      formation: 'Lameta Formation (Bagh Beds)',
      count: '92 Nests, 256 Eggs',
      oospecies: 'Megaloolithus, Fusioolithus'
    },
    raiyoli: {
      title: 'Raiyoli Hatcheries, Gujarat',
      desc: 'Dense Cretaceous communal nesting grounds where sauropod clutches were laid in riverine sandstones alongside Rajasaurus predators.',
      formation: 'Lameta Formation (Calcareous Sandstone)',
      count: 'Hundreds of Clutches, 10,000+ Fragments',
      oospecies: 'Megaloolithus cylindricus'
    },
    jabalpur: {
      title: 'Jabalpur Lameta Beds, Madhya Pradesh',
      desc: 'The historic type locality where sauropod eggshell concentrations and titanosaur skeletons were first linked in the 19th century.',
      formation: 'Upper Lameta Chert & Marl',
      count: 'Dozens of Recorded Clutches',
      oospecies: 'Megaloolithus dhoriangadensis'
    },
    ariyalur: {
      title: 'Ariyalur Coast, Tamil Nadu',
      desc: 'Southern Indian coastal riverine nesting horizons documenting Late Cretaceous titanosaur reproductive ecology near the Tethyan coastline.',
      formation: 'Kallamedu Formation',
      count: 'Multiple Clutches & Broken Shell Beds',
      oospecies: 'Megaloolithus / Titanosauridae'
    }
  };

  // DOM Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const nestPins = document.querySelectorAll('.nest-pin');

  // Nest Info Box Elements
  const nestInfoTitle = document.getElementById('nest-info-title');
  const nestInfoDesc = document.getElementById('nest-info-desc');
  const nestInfoFormation = document.getElementById('nest-info-formation');
  const nestInfoCount = document.getElementById('nest-info-count');
  const nestInfoOospecies = document.getElementById('nest-info-oospecies');

  // Quiz Elements
  const quizOptsContainer = document.getElementById('nest-quiz-opts');
  const quizFeedback = document.getElementById('nest-quiz-feedback');

  function init() {
    setupTabs();
    setupNestMap();
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

  // 2. Interactive Nesting Map
  function setupNestMap() {
    nestPins.forEach(pin => {
      pin.addEventListener('click', () => {
        const siteKey = pin.dataset.site;
        selectNestSite(siteKey);
      });

      pin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectNestSite(pin.dataset.site);
        }
      });
    });
  }

  function selectNestSite(siteKey) {
    const data = NESTING_SITES[siteKey];
    if (!data) return;

    nestPins.forEach(p => p.classList.toggle('active', p.dataset.site === siteKey));

    nestInfoTitle.textContent = data.title;
    nestInfoDesc.textContent = data.desc;
    nestInfoFormation.textContent = data.formation;
    nestInfoCount.textContent = data.count;
    nestInfoOospecies.textContent = data.oospecies;
  }

  // 3. Quiz
  function setupQuiz() {
    if (!quizOptsContainer) return;

    const options = [
      { text: 'Their immense 15–20 metric ton body weight would instantly crush the eggs, so they buried them in sediment', correct: true },
      { text: 'They preferred to let volcanic lava flow over the eggs', correct: false },
      { text: 'They carried their eggs inside marsupial pouches', correct: false },
      { text: 'They laid soft-shelled eggs in open deep water', correct: false }
    ];

    quizOptsContainer.innerHTML = options.map((opt, i) => `
      <button class="nest-opt-btn" data-correct="${opt.correct}">${String.fromCharCode(65 + i)}. ${opt.text}</button>
    `).join('');

    quizOptsContainer.querySelectorAll('.nest-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.correct === 'true';
        quizOptsContainer.querySelectorAll('.nest-opt-btn').forEach(b => b.disabled = true);

        quizFeedback.style.display = 'block';
        if (isCorrect) {
          btn.style.borderColor = '#10b981';
          btn.style.color = '#34d399';
          quizFeedback.className = 'feedback-box success';
          quizFeedback.textContent = '🎉 Correct! Giant sauropod titanosaurs could not brood without crushing clutches. They dug shallow nest bowls, buried the eggs in decaying vegetation and damp sand, and relied on subterranean heat for incubation!';
        } else {
          btn.style.borderColor = '#ef4444';
          btn.style.color = '#f87171';
          quizFeedback.className = 'feedback-box error';
          quizFeedback.textContent = '❌ Incorrect. Sauropods were simply too massive (up to 20 tons) to incubate eggs directly without crushing the calcite shells.';
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

  window.DinosaurNestingExplorer = {
    sites: NESTING_SITES,
    selectSite: selectNestSite
  };
})();
