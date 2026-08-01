/* ==========================================================================
   INDIAN MARITIME HERITAGE & MAJOR PORTS EXPLORER — INTERACTION LAYER
   Vanilla JS, no dependencies. Everything renders from data.js.
   ========================================================================== */

(function () {
  'use strict';

  var filters = { search: '', era: 'all', coast: 'all' };
  var quizState = { current: 0, score: 0, answered: false };
  var lastFocused = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof MH_PORTS === 'undefined') {
      console.error('maritime-heritage-explorer: data.js failed to load');
      return;
    }
    renderHeroStats();
    renderTimeline();
    renderCoastChips();
    bindEraToggle();
    renderPorts();
    renderShipbuilding();
    renderInfoGrid('navigation-grid', MH_NAVIGATION);
    renderInfoGrid('institutions-grid', MH_INSTITUTIONS.map(function (item) {
      return { title: item.title, icon: item.icon, desc: item.desc, tag: item.org };
    }));
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

  function countByEra(era) {
    return MH_PORTS.filter(function (port) { return port.era === era; }).length;
  }

  /* ------------------------------------------------------------ hero stats */

  function renderHeroStats() {
    setText('stat-ancient', countByEra('ancient'));
    setText('stat-modern', countByEra('modern'));
  }

  /* -------------------------------------------------------------- timeline */

  function renderTimeline() {
    var timeline = document.getElementById('mh-timeline');
    if (!timeline) return;
    timeline.innerHTML = MH_TIMELINE.map(function (entry, index) {
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

  /* -------------------------------------------------------- filter controls */

  function renderCoastChips() {
    var group = document.getElementById('coast-chips');
    if (!group) return;
    var html = '<button type="button" class="chip active" data-filter="coast" data-value="all">All Coasts</button>';
    html += MH_COASTS.map(function (coast) {
      return '<button type="button" class="chip" data-filter="coast" data-value="' +
        escapeHtml(coast.key) + '">' + coast.icon + ' ' + escapeHtml(coast.name) + '</button>';
    }).join('');
    group.innerHTML = html;
    group.addEventListener('click', onFilterClick);
  }

  function bindEraToggle() {
    var toggle = document.querySelector('.era-toggle');
    if (toggle) toggle.addEventListener('click', onFilterClick);
  }

  function onFilterClick(event) {
    var button = event.target.closest('[data-filter]');
    if (!button) return;
    filters[button.getAttribute('data-filter')] = button.getAttribute('data-value');
    syncControls();
    renderPorts();
  }

  function syncControls() {
    ['era', 'coast'].forEach(function (key) {
      var controls = document.querySelectorAll('[data-filter="' + key + '"]');
      Array.prototype.forEach.call(controls, function (control) {
        control.classList.toggle('active', control.getAttribute('data-value') === filters[key]);
      });
    });
  }

  function bindSearch() {
    var input = document.getElementById('mh-search');
    var reset = document.getElementById('reset-filters');
    if (input) {
      input.addEventListener('input', function () {
        filters.search = input.value.trim().toLowerCase();
        renderPorts();
      });
    }
    if (reset) {
      reset.addEventListener('click', function () {
        filters = { search: '', era: 'all', coast: 'all' };
        if (input) input.value = '';
        syncControls();
        renderPorts();
      });
    }
  }

  /* ----------------------------------------------------------------- cards */

  function matchesFilters(port) {
    if (filters.era !== 'all' && port.era !== filters.era) return false;
    if (filters.coast !== 'all' && port.coast !== filters.coast) return false;
    if (!filters.search) return true;
    var haystack = [port.name, port.state, port.period, port.tagline, port.desc]
      .concat(port.traded)
      .join(' ')
      .toLowerCase();
    return haystack.indexOf(filters.search) !== -1;
  }

  function renderPorts() {
    var grid = document.getElementById('port-grid');
    var empty = document.getElementById('empty-state');
    var counter = document.getElementById('result-count');
    if (!grid) return;

    var matches = MH_PORTS.filter(matchesFilters);

    if (counter) {
      counter.textContent = matches.length === MH_PORTS.length
        ? 'Showing all ' + MH_PORTS.length + ' ports'
        : 'Showing ' + matches.length + ' of ' + MH_PORTS.length + ' ports';
    }
    if (empty) empty.hidden = matches.length !== 0;

    grid.innerHTML = matches.map(function (port) {
      var goods = port.traded.slice(0, 3).map(function (item) {
        return '<span class="good-chip">' + escapeHtml(item) + '</span>';
      }).join('');
      return '<article class="port-card era-' + port.era + ' animate-on-scroll" tabindex="0" role="button" ' +
          'data-name="' + escapeHtml(port.name) + '" ' +
          'aria-label="View details for ' + escapeHtml(port.name) + '">' +
        '<div class="port-head">' +
          '<span class="port-icon" aria-hidden="true">' + port.icon + '</span>' +
          '<span class="era-badge era-badge-' + port.era + '">' +
            escapeHtml(lookupName(MH_ERAS, port.era)) + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(port.name) + '</h3>' +
        '<p class="port-period">' + escapeHtml(port.period) + '</p>' +
        '<p class="port-tagline">' + escapeHtml(port.tagline) + '</p>' +
        '<p class="port-desc">' + escapeHtml(port.desc) + '</p>' +
        '<div class="goods-row">' + goods + '</div>' +
        '<div class="port-meta">' +
          '<span class="pill pill-state">📍 ' + escapeHtml(port.state) + '</span>' +
          '<span class="pill pill-coast">' + lookupIcon(MH_COASTS, port.coast) + ' ' +
            escapeHtml(lookupName(MH_COASTS, port.coast)) + '</span>' +
        '</div>' +
        '<span class="port-cta">Full profile →</span>' +
        '</article>';
    }).join('');

    revealVisible();
  }

  /* --------------------------------------------------------- shipbuilding */

  function renderShipbuilding() {
    var grid = document.getElementById('ship-grid');
    if (!grid) return;
    grid.innerHTML = MH_SHIPBUILDING.map(function (craft) {
      return '<article class="ship-card animate-on-scroll">' +
        '<div class="ship-icon">' + craft.icon + '</div>' +
        '<h3>' + escapeHtml(craft.name) + '</h3>' +
        '<p class="ship-place">' + escapeHtml(craft.place) + '</p>' +
        '<p>' + escapeHtml(craft.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  /* ---------------------------------------------------- info, facts, media */

  function renderInfoGrid(containerId, items) {
    var grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = items.map(function (item) {
      var tag = item.tag ? '<span class="org-tag">' + escapeHtml(item.tag) + '</span>' : '';
      return '<div class="info-card animate-on-scroll">' +
        '<div class="icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        tag +
        '</div>';
    }).join('');
  }

  function renderGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = MH_GALLERY.map(function (item) {
      return '<figure class="gallery-item animate-on-scroll">' +
        '<div class="gallery-visual" aria-hidden="true">' + item.icon + '</div>' +
        '<figcaption><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.caption) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  function renderFacts() {
    var grid = document.getElementById('facts-grid');
    if (!grid) return;
    grid.innerHTML = MH_FACTS.map(function (fact, index) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-number">' + (index + 1) + '</span>' +
        '<p>' + escapeHtml(fact) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ----------------------------------------------------------------- modal */

  function bindModal() {
    var grid = document.getElementById('port-grid');
    var modal = document.getElementById('mh-modal');
    if (!grid || !modal) return;

    grid.addEventListener('click', function (event) {
      var card = event.target.closest('.port-card');
      if (card) openModal(card.getAttribute('data-name'));
    });

    grid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      var card = event.target.closest('.port-card');
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
    var port = MH_PORTS.filter(function (p) { return p.name === name; })[0];
    var modal = document.getElementById('mh-modal');
    if (!port || !modal) return;

    lastFocused = document.activeElement;

    document.getElementById('modal-icon').textContent = port.icon;
    document.getElementById('modal-title').textContent = port.name;
    document.getElementById('modal-tagline').textContent = port.tagline;
    document.getElementById('modal-desc').textContent = port.desc;
    document.getElementById('modal-note').textContent = port.note;

    document.getElementById('modal-meta').innerHTML =
      '<span class="pill pill-state">📍 ' + escapeHtml(port.state) + '</span>' +
      '<span class="pill pill-coast">' + lookupIcon(MH_COASTS, port.coast) + ' ' +
        escapeHtml(lookupName(MH_COASTS, port.coast)) + '</span>' +
      '<span class="era-badge era-badge-' + port.era + '">' +
        escapeHtml(lookupName(MH_ERAS, port.era)) + '</span>' +
      '<span class="pill pill-period">🕰️ ' + escapeHtml(port.period) + '</span>';

    document.getElementById('modal-goods').innerHTML = port.traded.map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');

    modal.hidden = false;
    document.body.classList.add('modal-open');
    var close = document.getElementById('modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    var modal = document.getElementById('mh-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ------------------------------------------------------------------ quiz */

  function renderQuiz() {
    var section = document.getElementById('quiz-section');
    if (!section) return;

    if (quizState.current >= MH_QUIZ.length) {
      var pct = Math.round((quizState.score / MH_QUIZ.length) * 100);
      var verdict = pct === 100 ? 'Perfect score — you could pilot this coast.'
        : pct >= 75 ? 'Strong result. Worth another look at the timeline.'
        : pct >= 50 ? 'A reasonable start — revisit the port cards.'
        : 'Try another pass through the sections above.';
      section.innerHTML =
        '<div class="quiz-result">' +
          '<div class="quiz-score">' + quizState.score + ' / ' + MH_QUIZ.length + '</div>' +
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

    var question = MH_QUIZ[quizState.current];
    section.innerHTML =
      '<div class="quiz-progress">Question ' + (quizState.current + 1) + ' of ' + MH_QUIZ.length +
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
        (quizState.current === MH_QUIZ.length - 1 ? 'See Result' : 'Next Question') + '</button>';

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
