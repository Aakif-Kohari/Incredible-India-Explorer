/* ==========================================================================
   SACRED GROVES OF INDIA EXPLORER — INTERACTION LAYER
   Vanilla JS, no dependencies. Everything renders from data.js.
   ========================================================================== */

(function () {
  'use strict';

  var filters = { search: '', region: 'all', ecosystem: 'all' };
  var quizState = { current: 0, score: 0, answered: false };
  var lastFocused = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof SACRED_GROVES === 'undefined') {
      console.error('sacred-groves-explorer: data.js failed to load');
      return;
    }
    renderHeroStats();
    renderNamesTable();
    renderChips('region-chips', 'region', SG_REGIONS.map(function (r) {
      return { value: r.key, label: r.name, icon: r.icon };
    }));
    renderChips('ecosystem-chips', 'ecosystem', SG_ECOSYSTEMS.map(function (e) {
      return { value: e.key, label: e.name, icon: e.icon };
    }));
    renderGroves();
    renderInfoGrid('values-grid', SG_VALUES);
    renderInfoGrid('threats-grid', SG_THREATS);
    renderPractices();
    renderConservation();
    renderQuiz();
    renderGallery();
    renderFacts();
    bindSearch();
    bindModal();
    revealVisible();
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

  function lookupName(list, key) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].key === key) return list[i].name;
    }
    return key;
  }

  function lookupIcon(list, key) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].key === key) return list[i].icon;
    }
    return '';
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function formatArea(hectares) {
    if (hectares >= 1000) {
      return (hectares / 1000).toFixed(1).replace(/\.0$/, '') + 'k ha';
    }
    return hectares + ' ha';
  }

  /* ------------------------------------------------------------ hero stats */

  function renderHeroStats() {
    var states = {};
    SACRED_GROVES.forEach(function (grove) { states[grove.state] = true; });

    setText('stat-profiled', SACRED_GROVES.length);
    setText('stat-names', SG_LOCAL_NAMES.length);
    setText('stat-states', Object.keys(states).length);
  }

  /* ----------------------------------------------------------- names table */

  function renderNamesTable() {
    var body = document.getElementById('names-body');
    if (!body) return;
    body.innerHTML = SG_LOCAL_NAMES.map(function (row) {
      return '<tr>' +
        '<th scope="row">' + escapeHtml(row.state) + '</th>' +
        '<td class="name-cell">' + escapeHtml(row.names) + '</td>' +
        '<td>' + escapeHtml(row.note) + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ----------------------------------------------------------------- chips */

  function renderChips(containerId, filterKey, items) {
    var group = document.getElementById(containerId);
    if (!group) return;
    var html = '<button type="button" class="chip active" data-filter="' + filterKey + '" data-value="all">All</button>';
    html += items.map(function (item) {
      var icon = item.icon ? item.icon + ' ' : '';
      return '<button type="button" class="chip" data-filter="' + filterKey + '" data-value="' +
        escapeHtml(item.value) + '">' + icon + escapeHtml(item.label) + '</button>';
    }).join('');
    group.innerHTML = html;
    group.addEventListener('click', onChipClick);
  }

  function onChipClick(event) {
    var chip = event.target.closest('.chip');
    if (!chip) return;
    filters[chip.getAttribute('data-filter')] = chip.getAttribute('data-value');
    syncChips();
    renderGroves();
  }

  function syncChips() {
    ['region', 'ecosystem'].forEach(function (key) {
      var chips = document.querySelectorAll('[data-filter="' + key + '"]');
      Array.prototype.forEach.call(chips, function (chip) {
        chip.classList.toggle('active', chip.getAttribute('data-value') === filters[key]);
      });
    });
  }

  function bindSearch() {
    var input = document.getElementById('sg-search');
    var reset = document.getElementById('reset-filters');
    if (input) {
      input.addEventListener('input', function () {
        filters.search = input.value.trim().toLowerCase();
        renderGroves();
      });
    }
    if (reset) {
      reset.addEventListener('click', function () {
        filters = { search: '', region: 'all', ecosystem: 'all' };
        if (input) input.value = '';
        syncChips();
        renderGroves();
      });
    }
  }

  /* ----------------------------------------------------------------- cards */

  function matchesFilters(grove) {
    if (filters.region !== 'all' && grove.region !== filters.region) return false;
    if (filters.ecosystem !== 'all' && grove.ecosystem !== filters.ecosystem) return false;
    if (!filters.search) return true;
    var haystack = [grove.name, grove.localName, grove.state, grove.deity, grove.community,
      grove.tagline, grove.desc]
      .concat(grove.species)
      .join(' ')
      .toLowerCase();
    return haystack.indexOf(filters.search) !== -1;
  }

  function renderGroves() {
    var grid = document.getElementById('grove-grid');
    var empty = document.getElementById('empty-state');
    var counter = document.getElementById('result-count');
    if (!grid) return;

    var matches = SACRED_GROVES.filter(matchesFilters);

    if (counter) {
      counter.textContent = matches.length === SACRED_GROVES.length
        ? 'Showing all ' + SACRED_GROVES.length + ' groves'
        : 'Showing ' + matches.length + ' of ' + SACRED_GROVES.length + ' groves';
    }
    if (empty) empty.hidden = matches.length !== 0;

    grid.innerHTML = matches.map(function (grove) {
      return '<article class="grove-card animate-on-scroll" tabindex="0" role="button" ' +
          'data-name="' + escapeHtml(grove.name) + '" ' +
          'aria-label="View details for ' + escapeHtml(grove.name) + '">' +
        '<div class="grove-head">' +
          '<span class="grove-icon" aria-hidden="true">' + grove.icon + '</span>' +
          '<span class="grove-area">' + formatArea(grove.areaHa) + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(grove.name) + '</h3>' +
        '<p class="grove-local">' + escapeHtml(grove.localName) + '</p>' +
        '<p class="grove-tagline">' + escapeHtml(grove.tagline) + '</p>' +
        '<p class="grove-desc">' + escapeHtml(grove.desc) + '</p>' +
        '<div class="grove-meta">' +
          '<span class="pill pill-state">📍 ' + escapeHtml(grove.state) + '</span>' +
          '<span class="pill pill-eco">' + lookupIcon(SG_ECOSYSTEMS, grove.ecosystem) + ' ' +
            escapeHtml(lookupName(SG_ECOSYSTEMS, grove.ecosystem)) + '</span>' +
        '</div>' +
        '<span class="grove-cta">Deity, taboos &amp; species →</span>' +
        '</article>';
    }).join('');

    revealVisible();
  }

  /* ------------------------------------------------------- static sections */

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

  function renderPractices() {
    var grid = document.getElementById('practices-grid');
    if (!grid) return;
    grid.innerHTML = SG_PRACTICES.map(function (item) {
      return '<div class="practice-card animate-on-scroll">' +
        '<span class="practice-icon">' + item.icon + '</span>' +
        '<div>' +
          '<h3>' + escapeHtml(item.title) + '</h3>' +
          '<p>' + escapeHtml(item.desc) + '</p>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  function renderConservation() {
    var grid = document.getElementById('conservation-grid');
    if (!grid) return;
    grid.innerHTML = SG_CONSERVATION.map(function (item) {
      return '<article class="law-card animate-on-scroll">' +
        '<div class="law-icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p class="law-org">' + escapeHtml(item.org) + '</p>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = SG_GALLERY.map(function (item) {
      return '<figure class="gallery-item animate-on-scroll">' +
        '<div class="gallery-visual" aria-hidden="true">' + item.icon + '</div>' +
        '<figcaption><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.caption) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  function renderFacts() {
    var grid = document.getElementById('facts-grid');
    if (!grid) return;
    grid.innerHTML = SG_FACTS.map(function (fact, index) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-number">' + (index + 1) + '</span>' +
        '<p>' + escapeHtml(fact) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ----------------------------------------------------------------- modal */

  function bindModal() {
    var grid = document.getElementById('grove-grid');
    var modal = document.getElementById('sg-modal');
    if (!grid || !modal) return;

    grid.addEventListener('click', function (event) {
      var card = event.target.closest('.grove-card');
      if (card) openModal(card.getAttribute('data-name'));
    });

    grid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      var card = event.target.closest('.grove-card');
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
    var grove = SACRED_GROVES.filter(function (g) { return g.name === name; })[0];
    var modal = document.getElementById('sg-modal');
    if (!grove || !modal) return;

    lastFocused = document.activeElement;

    document.getElementById('modal-icon').textContent = grove.icon;
    document.getElementById('modal-title').textContent = grove.name;
    document.getElementById('modal-local').textContent = grove.localName;
    document.getElementById('modal-desc').textContent = grove.desc;
    document.getElementById('modal-taboo').textContent = grove.taboo;

    document.getElementById('modal-meta').innerHTML =
      '<span class="pill pill-state">📍 ' + escapeHtml(grove.state) + '</span>' +
      '<span class="pill pill-eco">' + lookupIcon(SG_ECOSYSTEMS, grove.ecosystem) + ' ' +
        escapeHtml(lookupName(SG_ECOSYSTEMS, grove.ecosystem)) + '</span>' +
      '<span class="pill pill-region">' + escapeHtml(lookupName(SG_REGIONS, grove.region)) + '</span>';

    var specs = [
      { label: 'Deity', value: grove.deity },
      { label: 'Community', value: grove.community },
      { label: 'Approximate area', value: formatArea(grove.areaHa) },
      { label: 'Ecosystem type', value: lookupName(SG_ECOSYSTEMS, grove.ecosystem) },
    ];
    document.getElementById('modal-specs').innerHTML = specs.map(function (spec) {
      return '<dt>' + escapeHtml(spec.label) + '</dt><dd>' + escapeHtml(spec.value) + '</dd>';
    }).join('');

    document.getElementById('modal-species').innerHTML = grove.species.map(function (species) {
      return '<li>' + escapeHtml(species) + '</li>';
    }).join('');

    modal.hidden = false;
    document.body.classList.add('modal-open');
    var close = document.getElementById('modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    var modal = document.getElementById('sg-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ------------------------------------------------------------------ quiz */

  function renderQuiz() {
    var section = document.getElementById('quiz-section');
    if (!section) return;

    if (quizState.current >= SG_QUIZ.length) {
      var pct = Math.round((quizState.score / SG_QUIZ.length) * 100);
      var verdict = pct === 100 ? 'Perfect score — you know your groves.'
        : pct >= 75 ? 'Strong result. The names table is worth another look.'
        : pct >= 50 ? 'A reasonable start — revisit the twelve grove cards.'
        : 'Worth another pass through the sections above.';
      section.innerHTML =
        '<div class="quiz-result">' +
          '<div class="quiz-score">' + quizState.score + ' / ' + SG_QUIZ.length + '</div>' +
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

    var question = SG_QUIZ[quizState.current];
    section.innerHTML =
      '<div class="quiz-progress">Question ' + (quizState.current + 1) + ' of ' + SG_QUIZ.length +
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
        (quizState.current === SG_QUIZ.length - 1 ? 'See Result' : 'Next Question') + '</button>';

      document.getElementById('quiz-next').addEventListener('click', function () {
        quizState.current++;
        quizState.answered = false;
        renderQuiz();
      });
    });
  }

  /* ------------------------------------------------------------ animations */

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
})();
