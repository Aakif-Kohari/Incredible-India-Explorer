/* ==========================================================================
   GEOGRAPHICAL INDICATION (GI) TAGS OF INDIA — INTERACTION LAYER
   Vanilla JS, no dependencies. Everything renders from data.js.
   ========================================================================== */

(function () {
  'use strict';

  var filters = { search: '', category: 'all', state: 'all' };
  var quizState = { current: 0, score: 0, answered: false };
  var lastFocused = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof GI_PRODUCTS === 'undefined') {
      console.error('gi-tags-explorer: data.js failed to load');
      return;
    }
    renderComparison();
    renderProcess();
    renderTimeline();
    renderCategoryCards();
    renderCategoryChips();
    renderStateChips();
    renderProducts();
    renderCharts();
    renderInfoGrid('benefits-grid', GI_BENEFITS);
    renderInfoGrid('challenges-grid', GI_CHALLENGES);
    renderQuiz();
    renderGallery();
    renderFacts();
    bindSearch();
    bindModal();
    initScrollAnimations();
  });

  /* ---------------------------------------------------------------- utils */

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function categoryByKey(key) {
    for (var i = 0; i < GI_CATEGORIES.length; i++) {
      if (GI_CATEGORIES[i].key === key) return GI_CATEGORIES[i];
    }
    return { key: key, name: key, icon: '🏷️' };
  }

  /* ------------------------------------------------------- static sections */

  function renderComparison() {
    var body = document.querySelector('#compare-table tbody');
    if (!body) return;
    body.innerHTML = GI_COMPARISON.map(function (row) {
      return '<tr>' +
        '<th scope="row">' + escapeHtml(row.aspect) + '</th>' +
        '<td class="highlight-cell">' + escapeHtml(row.gi) + '</td>' +
        '<td>' + escapeHtml(row.trademark) + '</td>' +
        '<td>' + escapeHtml(row.patent) + '</td>' +
        '</tr>';
    }).join('');
  }

  function renderProcess() {
    var grid = document.querySelector('#process .process-grid');
    if (!grid) return;
    grid.innerHTML = GI_PROCESS.map(function (item) {
      return '<div class="process-card animate-on-scroll">' +
        '<span class="process-step">Step ' + item.step + '</span>' +
        '<div class="process-icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</div>';
    }).join('');
  }

  function renderTimeline() {
    var timeline = document.getElementById('gi-timeline');
    if (!timeline) return;
    timeline.innerHTML = GI_TIMELINE.map(function (entry, index) {
      return '<div class="timeline-item animate-on-scroll ' + (index % 2 === 0 ? 'left' : 'right') + '">' +
        '<div class="timeline-dot" aria-hidden="true"></div>' +
        '<div class="timeline-content">' +
          '<span class="timeline-year">' + escapeHtml(entry.year) + '</span>' +
          '<h3>' + escapeHtml(entry.title) + '</h3>' +
          '<p>' + escapeHtml(entry.desc) + '</p>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  function renderCategoryCards() {
    var grid = document.querySelector('#categories .category-grid');
    if (!grid) return;
    grid.innerHTML = GI_CATEGORIES.map(function (cat) {
      var count = GI_PRODUCTS.filter(function (p) { return p.category === cat.key; }).length;
      return '<button type="button" class="category-card animate-on-scroll" data-jump="' + escapeHtml(cat.key) + '">' +
        '<div class="icon">' + cat.icon + '</div>' +
        '<h3>' + escapeHtml(cat.name) + '</h3>' +
        '<p>' + escapeHtml(cat.desc) + '</p>' +
        '<span class="tag">' + count + ' featured here</span>' +
        '</button>';
    }).join('');

    grid.addEventListener('click', function (event) {
      var card = event.target.closest('[data-jump]');
      if (!card) return;
      filters.category = card.getAttribute('data-jump');
      syncChips();
      renderProducts();
      var explorer = document.getElementById('explorer');
      if (explorer) explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function renderInfoGrid(containerId, items) {
    var grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = items.map(function (item) {
      var severity = item.severity
        ? '<span class="severity severity-' + item.severity.toLowerCase() + '">' + escapeHtml(item.severity) + '</span>'
        : '';
      return '<div class="info-card animate-on-scroll">' +
        '<div class="icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        severity +
        '</div>';
    }).join('');
  }

  function renderGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = GI_GALLERY.map(function (item) {
      return '<figure class="gallery-item animate-on-scroll">' +
        '<div class="gallery-visual" aria-hidden="true">' + item.icon + '</div>' +
        '<figcaption><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.caption) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  function renderFacts() {
    var grid = document.getElementById('facts-grid');
    if (!grid) return;
    grid.innerHTML = GI_FACTS.map(function (fact, index) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-number">' + (index + 1) + '</span>' +
        '<p>' + escapeHtml(fact) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ------------------------------------------------------- filter + search */

  function uniqueStates() {
    var seen = {};
    var list = [];
    GI_PRODUCTS.forEach(function (p) {
      if (!seen[p.state]) {
        seen[p.state] = true;
        list.push(p.state);
      }
    });
    return list.sort();
  }

  function renderCategoryChips() {
    var group = document.getElementById('category-chips');
    if (!group) return;
    var html = '<button type="button" class="chip active" data-filter="category" data-value="all">All</button>';
    html += GI_CATEGORIES.map(function (cat) {
      return '<button type="button" class="chip" data-filter="category" data-value="' + escapeHtml(cat.key) + '">' +
        cat.icon + ' ' + escapeHtml(cat.name) + '</button>';
    }).join('');
    group.innerHTML = html;
    group.addEventListener('click', onChipClick);
  }

  function renderStateChips() {
    var group = document.getElementById('state-chips');
    if (!group) return;
    var html = '<button type="button" class="chip active" data-filter="state" data-value="all">All</button>';
    html += uniqueStates().map(function (state) {
      return '<button type="button" class="chip" data-filter="state" data-value="' + escapeHtml(state) + '">' +
        escapeHtml(state) + '</button>';
    }).join('');
    group.innerHTML = html;
    group.addEventListener('click', onChipClick);
  }

  function onChipClick(event) {
    var chip = event.target.closest('.chip');
    if (!chip) return;
    filters[chip.getAttribute('data-filter')] = chip.getAttribute('data-value');
    syncChips();
    renderProducts();
  }

  function syncChips() {
    ['category', 'state'].forEach(function (key) {
      var chips = document.querySelectorAll('[data-filter="' + key + '"]');
      Array.prototype.forEach.call(chips, function (chip) {
        chip.classList.toggle('active', chip.getAttribute('data-value') === filters[key]);
      });
    });
  }

  function bindSearch() {
    var input = document.getElementById('gi-search');
    var reset = document.getElementById('reset-filters');
    if (input) {
      input.addEventListener('input', function () {
        filters.search = input.value.trim().toLowerCase();
        renderProducts();
      });
    }
    if (reset) {
      reset.addEventListener('click', function () {
        filters = { search: '', category: 'all', state: 'all' };
        if (input) input.value = '';
        syncChips();
        renderProducts();
      });
    }
  }

  function matchesFilters(product) {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.state !== 'all' && product.state !== filters.state) return false;
    if (!filters.search) return true;
    var haystack = [product.name, product.state, product.tagline, product.desc, categoryByKey(product.category).name]
      .join(' ')
      .toLowerCase();
    return haystack.indexOf(filters.search) !== -1;
  }

  function renderProducts() {
    var grid = document.getElementById('product-grid');
    var empty = document.getElementById('empty-state');
    var counter = document.getElementById('result-count');
    if (!grid) return;

    var matches = GI_PRODUCTS.filter(matchesFilters);

    if (counter) {
      counter.textContent = matches.length === GI_PRODUCTS.length
        ? 'Showing all ' + GI_PRODUCTS.length + ' featured products'
        : 'Showing ' + matches.length + ' of ' + GI_PRODUCTS.length + ' featured products';
    }
    if (empty) empty.hidden = matches.length !== 0;

    grid.innerHTML = matches.map(function (product) {
      var cat = categoryByKey(product.category);
      return '<article class="product-card animate-on-scroll" tabindex="0" role="button" ' +
          'data-name="' + escapeHtml(product.name) + '" ' +
          'aria-label="View details for ' + escapeHtml(product.name) + '">' +
        '<div class="product-head">' +
          '<span class="product-icon" aria-hidden="true">' + product.icon + '</span>' +
          '<span class="product-year">GI ' + product.year + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(product.name) + '</h3>' +
        '<p class="product-tagline">' + escapeHtml(product.tagline) + '</p>' +
        '<p class="product-desc">' + escapeHtml(product.desc) + '</p>' +
        '<div class="product-meta">' +
          '<span class="pill pill-state">📍 ' + escapeHtml(product.state) + '</span>' +
          '<span class="pill pill-cat">' + cat.icon + ' ' + escapeHtml(cat.name) + '</span>' +
        '</div>' +
        '</article>';
    }).join('');

    revealVisible();
  }

  /* ------------------------------------------------------------- charts */

  function renderCharts() {
    renderBarChart('category-chart', GI_CATEGORIES.map(function (cat) {
      return {
        label: cat.icon + ' ' + cat.name,
        value: GI_PRODUCTS.filter(function (p) { return p.category === cat.key; }).length,
      };
    }));

    var byState = {};
    GI_PRODUCTS.forEach(function (p) { byState[p.state] = (byState[p.state] || 0) + 1; });
    var stateRows = Object.keys(byState)
      .map(function (state) { return { label: state, value: byState[state] }; })
      .sort(function (a, b) { return b.value - a.value || a.label.localeCompare(b.label); })
      .slice(0, 8);
    renderBarChart('state-chart', stateRows);
  }

  function renderBarChart(containerId, rows) {
    var container = document.getElementById(containerId);
    if (!container || !rows.length) return;
    var max = rows.reduce(function (acc, row) { return Math.max(acc, row.value); }, 0) || 1;
    container.innerHTML = rows.map(function (row) {
      var pct = Math.round((row.value / max) * 100);
      return '<div class="bar-row">' +
        '<span class="bar-label">' + escapeHtml(row.label) + '</span>' +
        '<span class="bar-track"><span class="bar-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="bar-value">' + row.value + '</span>' +
        '</div>';
    }).join('');
  }

  /* -------------------------------------------------------------- modal */

  function bindModal() {
    var grid = document.getElementById('product-grid');
    var modal = document.getElementById('gi-modal');
    if (!grid || !modal) return;

    grid.addEventListener('click', function (event) {
      var card = event.target.closest('.product-card');
      if (card) openModal(card.getAttribute('data-name'));
    });

    grid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      var card = event.target.closest('.product-card');
      if (!card) return;
      event.preventDefault();
      openModal(card.getAttribute('data-name'));
    });

    var close = document.getElementById('modal-close');
    var backdrop = document.getElementById('modal-backdrop');
    if (close) close.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  function openModal(name) {
    var product = GI_PRODUCTS.filter(function (p) { return p.name === name; })[0];
    var modal = document.getElementById('gi-modal');
    if (!product || !modal) return;

    lastFocused = document.activeElement;
    var cat = categoryByKey(product.category);

    document.getElementById('modal-icon').textContent = product.icon;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-tagline').textContent = product.tagline;
    document.getElementById('modal-desc').textContent = product.desc;
    document.getElementById('modal-meta').innerHTML =
      '<span class="pill pill-state">📍 ' + escapeHtml(product.state) + '</span>' +
      '<span class="pill pill-cat">' + cat.icon + ' ' + escapeHtml(cat.name) + '</span>' +
      '<span class="pill pill-year">🏷️ Registered ' + product.year + '</span>';

    modal.hidden = false;
    document.body.classList.add('modal-open');
    var close = document.getElementById('modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    var modal = document.getElementById('gi-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* --------------------------------------------------------------- quiz */

  function renderQuiz() {
    var section = document.getElementById('quiz-section');
    if (!section) return;

    if (quizState.current >= GI_QUIZ.length) {
      var pct = Math.round((quizState.score / GI_QUIZ.length) * 100);
      var verdict = pct === 100 ? 'Perfect score — you know your GIs.'
        : pct >= 75 ? 'Strong result. A few details to revisit.'
        : pct >= 50 ? 'A reasonable start — scroll back through the timeline.'
        : 'Worth another read through the sections above.';
      section.innerHTML =
        '<div class="quiz-result">' +
          '<div class="quiz-score">' + quizState.score + ' / ' + GI_QUIZ.length + '</div>' +
          '<p class="quiz-verdict">' + verdict + '</p>' +
          '<button type="button" class="btn-quiz" id="quiz-restart">Try Again</button>' +
        '</div>';
      var restart = document.getElementById('quiz-restart');
      if (restart) {
        restart.addEventListener('click', function () {
          quizState = { current: 0, score: 0, answered: false };
          renderQuiz();
        });
      }
      return;
    }

    var question = GI_QUIZ[quizState.current];
    section.innerHTML =
      '<div class="quiz-progress">Question ' + (quizState.current + 1) + ' of ' + GI_QUIZ.length +
        '<span class="quiz-running-score">Score: ' + quizState.score + '</span></div>' +
      '<h3 class="quiz-question">' + escapeHtml(question.q) + '</h3>' +
      '<div class="quiz-options" id="quiz-options">' +
        question.options.map(function (option, index) {
          return '<button type="button" class="quiz-option" data-index="' + index + '">' +
            escapeHtml(option) + '</button>';
        }).join('') +
      '</div>' +
      '<div class="quiz-explain" id="quiz-explain" hidden></div>';

    var options = document.getElementById('quiz-options');
    options.addEventListener('click', function (event) {
      var button = event.target.closest('.quiz-option');
      if (!button || quizState.answered) return;
      quizState.answered = true;

      var chosen = parseInt(button.getAttribute('data-index'), 10);
      var correct = question.answer;
      if (chosen === correct) quizState.score++;

      Array.prototype.forEach.call(options.querySelectorAll('.quiz-option'), function (opt, index) {
        opt.disabled = true;
        if (index === correct) opt.classList.add('correct');
        else if (index === chosen) opt.classList.add('wrong');
      });

      var explain = document.getElementById('quiz-explain');
      explain.hidden = false;
      explain.innerHTML = '<p>' + escapeHtml(question.explain) + '</p>' +
        '<button type="button" class="btn-quiz" id="quiz-next">' +
        (quizState.current === GI_QUIZ.length - 1 ? 'See Result' : 'Next Question') + '</button>';

      document.getElementById('quiz-next').addEventListener('click', function () {
        quizState.current++;
        quizState.answered = false;
        renderQuiz();
      });
    });
  }

  /* --------------------------------------------------------- animations */

  function revealVisible() {
    var targets = document.querySelectorAll('.animate-on-scroll:not(.animate-visible)');
    if (!targets.length) return;
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('animate-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(targets, function (el) { observer.observe(el); });
  }

  function initScrollAnimations() {
    revealVisible();
  }
})();
