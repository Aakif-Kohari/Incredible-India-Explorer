/* ==========================================================================
   HIMALAYAN GLACIERS OF INDIA EXPLORER — INTERACTION LAYER
   Vanilla JS, no dependencies. Everything renders from data.js.
   ========================================================================== */

(function () {
  'use strict';

  var filters = { search: '', basin: 'all', range: 'all', trend: 'all', sort: 'name' };
  var quizState = { current: 0, score: 0, answered: false };
  var lastFocused = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof GLACIERS === 'undefined') {
      console.error('glaciers-explorer: data.js failed to load');
      return;
    }
    renderHeroStats();
    renderBasins();
    renderChips('basin-chips', 'basin', GL_BASINS.map(function (b) {
      return { value: b.key, label: b.name, icon: b.icon };
    }));
    renderChips('range-chips', 'range', GL_RANGES.map(function (r) {
      return { value: r.key, label: r.name, icon: '' };
    }));
    renderChips('trend-chips', 'trend', Object.keys(GL_TRENDS).map(function (key) {
      return { value: key, label: GL_TRENDS[key].label, icon: '' };
    }));
    bindSortChips();
    renderGlaciers();
    renderRetreatChart();
    renderAnatomy();
    renderGlof();
    renderInfoGrid('impacts-grid', GL_IMPACTS);
    renderInfoGrid('monitoring-grid', GL_MONITORING.map(function (item) {
      return { title: item.title, icon: item.icon, desc: item.desc, tag: item.org };
    }));
    renderTimeline();
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

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  /* ------------------------------------------------------------ hero stats */

  function renderHeroStats() {
    var longest = GLACIERS.reduce(function (acc, g) { return Math.max(acc, g.lengthKm); }, 0);
    var rapid = GLACIERS.filter(function (g) { return g.trend === 'rapid'; }).length;

    setText('stat-glaciers', GLACIERS.length);
    setText('stat-basins', GL_BASINS.length);
    setText('stat-longest', longest);
    setText('stat-rapid', rapid);
  }

  /* ---------------------------------------------------------------- basins */

  function renderBasins() {
    var grid = document.getElementById('basin-grid');
    if (!grid) return;
    grid.innerHTML = GL_BASINS.map(function (basin) {
      var members = GLACIERS.filter(function (g) { return g.basin === basin.key; });
      return '<button type="button" class="basin-card animate-on-scroll" data-jump="' + escapeHtml(basin.key) + '">' +
        '<div class="icon">' + basin.icon + '</div>' +
        '<h3>' + escapeHtml(basin.name) + '</h3>' +
        '<p>' + escapeHtml(basin.desc) + '</p>' +
        '<span class="tag">' + members.length + ' glacier' + (members.length === 1 ? '' : 's') + ' featured</span>' +
        '</button>';
    }).join('');

    grid.addEventListener('click', function (event) {
      var card = event.target.closest('[data-jump]');
      if (!card) return;
      filters.basin = card.getAttribute('data-jump');
      syncChips();
      renderGlaciers();
      var explorer = document.getElementById('explorer');
      if (explorer) explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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

  function bindSortChips() {
    var group = document.getElementById('sort-chips');
    if (group) group.addEventListener('click', onChipClick);
  }

  function onChipClick(event) {
    var chip = event.target.closest('.chip');
    if (!chip) return;
    filters[chip.getAttribute('data-filter')] = chip.getAttribute('data-value');
    syncChips();
    renderGlaciers();
  }

  function syncChips() {
    ['basin', 'range', 'trend', 'sort'].forEach(function (key) {
      var chips = document.querySelectorAll('[data-filter="' + key + '"]');
      Array.prototype.forEach.call(chips, function (chip) {
        chip.classList.toggle('active', chip.getAttribute('data-value') === filters[key]);
      });
    });
  }

  function bindSearch() {
    var input = document.getElementById('gl-search');
    var reset = document.getElementById('reset-filters');
    if (input) {
      input.addEventListener('input', function () {
        filters.search = input.value.trim().toLowerCase();
        renderGlaciers();
      });
    }
    if (reset) {
      reset.addEventListener('click', function () {
        filters = { search: '', basin: 'all', range: 'all', trend: 'all', sort: 'name' };
        if (input) input.value = '';
        syncChips();
        renderGlaciers();
      });
    }
  }

  /* ----------------------------------------------------------------- cards */

  function matchesFilters(glacier) {
    if (filters.basin !== 'all' && glacier.basin !== filters.basin) return false;
    if (filters.range !== 'all' && glacier.range !== filters.range) return false;
    if (filters.trend !== 'all' && glacier.trend !== filters.trend) return false;
    if (!filters.search) return true;
    var haystack = [glacier.name, glacier.state, glacier.river, glacier.tagline, glacier.desc,
      lookupName(GL_RANGES, glacier.range), lookupName(GL_BASINS, glacier.basin)]
      .join(' ')
      .toLowerCase();
    return haystack.indexOf(filters.search) !== -1;
  }

  function sortGlaciers(list) {
    var sorted = list.slice();
    if (filters.sort === 'length') {
      sorted.sort(function (a, b) { return b.lengthKm - a.lengthKm; });
    } else if (filters.sort === 'retreat') {
      sorted.sort(function (a, b) { return b.retreatMPerYear - a.retreatMPerYear; });
    } else {
      sorted.sort(function (a, b) { return a.name.localeCompare(b.name); });
    }
    return sorted;
  }

  function renderGlaciers() {
    var grid = document.getElementById('glacier-grid');
    var empty = document.getElementById('empty-state');
    var counter = document.getElementById('result-count');
    if (!grid) return;

    var matches = sortGlaciers(GLACIERS.filter(matchesFilters));

    if (counter) {
      counter.textContent = matches.length === GLACIERS.length
        ? 'Showing all ' + GLACIERS.length + ' glaciers'
        : 'Showing ' + matches.length + ' of ' + GLACIERS.length + ' glaciers';
    }
    if (empty) empty.hidden = matches.length !== 0;

    grid.innerHTML = matches.map(function (glacier) {
      var trend = GL_TRENDS[glacier.trend];
      return '<article class="glacier-card animate-on-scroll" tabindex="0" role="button" ' +
          'data-name="' + escapeHtml(glacier.name) + '" ' +
          'aria-label="View details for ' + escapeHtml(glacier.name) + '">' +
        '<div class="glacier-head">' +
          '<span class="glacier-icon" aria-hidden="true">' + glacier.icon + '</span>' +
          '<span class="trend-badge trend-' + trend.tone + '">' + escapeHtml(trend.label) + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(glacier.name) + '</h3>' +
        '<p class="glacier-tagline">' + escapeHtml(glacier.tagline) + '</p>' +
        '<div class="quick-specs">' +
          '<span><strong>' + glacier.lengthKm + ' km</strong>length</span>' +
          '<span><strong>~' + glacier.retreatMPerYear + ' m/yr</strong>retreat</span>' +
        '</div>' +
        '<p class="glacier-desc">' + escapeHtml(glacier.desc) + '</p>' +
        '<div class="glacier-meta">' +
          '<span class="pill pill-state">📍 ' + escapeHtml(glacier.state) + '</span>' +
          '<span class="pill pill-basin">' + escapeHtml(lookupName(GL_BASINS, glacier.basin)) + '</span>' +
          '<span class="pill pill-range">' + escapeHtml(lookupName(GL_RANGES, glacier.range)) + '</span>' +
        '</div>' +
        '<span class="glacier-cta">View full profile →</span>' +
        '</article>';
    }).join('');

    revealVisible();
  }

  /* ---------------------------------------------------------------- charts */

  function renderRetreatChart() {
    var container = document.getElementById('retreat-chart');
    if (!container) return;

    var rows = GLACIERS.slice().sort(function (a, b) {
      return b.retreatMPerYear - a.retreatMPerYear;
    });
    var max = rows.reduce(function (acc, g) { return Math.max(acc, g.retreatMPerYear); }, 0) || 1;

    container.innerHTML = rows.map(function (glacier) {
      var pct = Math.round((glacier.retreatMPerYear / max) * 100);
      var tone = GL_TRENDS[glacier.trend].tone;
      return '<div class="bar-row">' +
        '<span class="bar-label">' + escapeHtml(glacier.name) + '</span>' +
        '<span class="bar-track"><span class="bar-fill fill-' + tone + '" style="width:' + pct + '%"></span></span>' +
        '<span class="bar-value">~' + glacier.retreatMPerYear + ' m</span>' +
        '</div>';
    }).join('');
  }

  /* --------------------------------------------------------------- anatomy */

  function renderAnatomy() {
    var grid = document.getElementById('anatomy-grid');
    if (!grid) return;
    grid.innerHTML = GL_ANATOMY.map(function (item) {
      return '<div class="anatomy-card animate-on-scroll">' +
        '<div class="anatomy-icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.term) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ------------------------------------------------------------------ glof */

  function renderGlof() {
    var grid = document.getElementById('glof-grid');
    if (!grid) return;
    grid.innerHTML = GL_GLOF.map(function (event) {
      return '<article class="glof-card animate-on-scroll">' +
        '<div class="glof-head">' +
          '<span class="glof-icon">' + event.icon + '</span>' +
          '<div>' +
            '<h3>' + escapeHtml(event.name) + '</h3>' +
            '<p class="glof-place">' + escapeHtml(event.year) + ' · ' + escapeHtml(event.place) + '</p>' +
          '</div>' +
        '</div>' +
        '<p class="glof-desc">' + escapeHtml(event.desc) + '</p>' +
        '<p class="glof-lesson"><strong>What it showed:</strong> ' + escapeHtml(event.lesson) + '</p>' +
        '</article>';
    }).join('');
  }

  /* ---------------------------------------------------- info, facts, media */

  function renderInfoGrid(containerId, items) {
    var grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = items.map(function (item) {
      var badge = '';
      if (item.severity) {
        badge = '<span class="severity severity-' + item.severity.toLowerCase() + '">' +
          escapeHtml(item.severity) + '</span>';
      } else if (item.tag) {
        badge = '<span class="org-tag">' + escapeHtml(item.tag) + '</span>';
      }
      return '<div class="info-card animate-on-scroll">' +
        '<div class="icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        badge +
        '</div>';
    }).join('');
  }

  function renderTimeline() {
    var timeline = document.getElementById('gl-timeline');
    if (!timeline) return;
    timeline.innerHTML = GL_TIMELINE.map(function (entry, index) {
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

  function renderGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = GL_GALLERY.map(function (item) {
      return '<figure class="gallery-item animate-on-scroll">' +
        '<div class="gallery-visual" aria-hidden="true">' + item.icon + '</div>' +
        '<figcaption><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.caption) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  function renderFacts() {
    var grid = document.getElementById('facts-grid');
    if (!grid) return;
    grid.innerHTML = GL_FACTS.map(function (fact, index) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-number">' + (index + 1) + '</span>' +
        '<p>' + escapeHtml(fact) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ----------------------------------------------------------------- modal */

  function bindModal() {
    var grid = document.getElementById('glacier-grid');
    var modal = document.getElementById('gl-modal');
    if (!grid || !modal) return;

    grid.addEventListener('click', function (event) {
      var card = event.target.closest('.glacier-card');
      if (card) openModal(card.getAttribute('data-name'));
    });

    grid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      var card = event.target.closest('.glacier-card');
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
    var glacier = GLACIERS.filter(function (g) { return g.name === name; })[0];
    var modal = document.getElementById('gl-modal');
    if (!glacier || !modal) return;

    lastFocused = document.activeElement;
    var trend = GL_TRENDS[glacier.trend];

    document.getElementById('modal-icon').textContent = glacier.icon;
    document.getElementById('modal-title').textContent = glacier.name;
    document.getElementById('modal-tagline').textContent = glacier.tagline;
    document.getElementById('modal-desc').textContent = glacier.desc;
    document.getElementById('modal-source').textContent = glacier.sourceNote;

    document.getElementById('modal-meta').innerHTML =
      '<span class="pill pill-state">📍 ' + escapeHtml(glacier.state) + '</span>' +
      '<span class="pill pill-basin">' + escapeHtml(lookupName(GL_BASINS, glacier.basin)) + '</span>' +
      '<span class="pill pill-range">' + escapeHtml(lookupName(GL_RANGES, glacier.range)) + '</span>' +
      '<span class="trend-badge trend-' + trend.tone + '">' + escapeHtml(trend.label) + '</span>';

    var specs = [
      { label: 'Approximate length', value: glacier.lengthKm + ' km' },
      { label: 'Altitude range', value: glacier.altitude },
      { label: 'River fed', value: glacier.river },
      { label: 'Mountain range', value: lookupName(GL_RANGES, glacier.range) },
      { label: 'Indicative retreat', value: '~' + glacier.retreatMPerYear + ' m per year' },
    ];
    document.getElementById('modal-specs').innerHTML = specs.map(function (spec) {
      return '<dt>' + escapeHtml(spec.label) + '</dt><dd>' + escapeHtml(spec.value) + '</dd>';
    }).join('');

    document.getElementById('modal-facts').innerHTML = glacier.facts.map(function (fact) {
      return '<li>' + escapeHtml(fact) + '</li>';
    }).join('');

    modal.hidden = false;
    document.body.classList.add('modal-open');
    var close = document.getElementById('modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    var modal = document.getElementById('gl-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ------------------------------------------------------------------ quiz */

  function renderQuiz() {
    var section = document.getElementById('quiz-section');
    if (!section) return;

    if (quizState.current >= GL_QUIZ.length) {
      var pct = Math.round((quizState.score / GL_QUIZ.length) * 100);
      var verdict = pct === 100 ? 'Perfect score — solid glaciology.'
        : pct >= 75 ? 'Strong result. Worth revisiting the anatomy section.'
        : pct >= 50 ? 'A reasonable start — the GLOF case studies are worth a re-read.'
        : 'Try another pass through the overview and anatomy sections.';
      section.innerHTML =
        '<div class="quiz-result">' +
          '<div class="quiz-score">' + quizState.score + ' / ' + GL_QUIZ.length + '</div>' +
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

    var question = GL_QUIZ[quizState.current];
    section.innerHTML =
      '<div class="quiz-progress">Question ' + (quizState.current + 1) + ' of ' + GL_QUIZ.length +
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
        (quizState.current === GL_QUIZ.length - 1 ? 'See Result' : 'Next Question') + '</button>';

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
