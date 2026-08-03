/* ==========================================================================
   HIMALAYAN MOUNTAIN PASSES EXPLORER — INTERACTION LAYER
   Vanilla JS, no dependencies. Everything renders from data.js.
   ========================================================================== */

(function () {
  'use strict';

  /* The elevation chart is scaled from this baseline rather than from zero,
     so that the differences between high passes stay legible. */
  const CHART_BASELINE_M = 3000;

  const DEFAULT_FILTERS = { search: '', range: 'all', status: 'all', sort: 'elevation' };

  let filters = Object.assign({}, DEFAULT_FILTERS);
  let quizState = { current: 0, score: 0, answered: false };
  let lastFocused = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof MOUNTAIN_PASSES === 'undefined') {
      console.error('mountain-passes-explorer: data.js failed to load');
      return;
    }
    renderHeroStats();
    renderNamesTable();
    renderChips('range-chips', 'range', MP_RANGES.map(toChip));
    renderChips('status-chips', 'status', MP_STATUS.map(toChip));
    bindSortChips();
    renderPasses();
    renderElevationChart();
    renderRoutes();
    renderTunnels();
    renderSafety();
    renderPermits();
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

  function toChip(item) {
    return { value: item.key, label: item.name, icon: item.icon };
  }

  function lookup(list, key, field) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].key === key) return list[i][field];
    }
    return field === 'icon' ? '' : key;
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function formatNumber(value) {
    return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function formatFeet(metres) {
    return formatNumber(metres * 3.28084) + ' ft';
  }

  /* ------------------------------------------------------------ hero stats */

  function renderHeroStats() {
    let highest = 0;
    let motorable = 0;

    MOUNTAIN_PASSES.forEach(function (pass) {
      if (pass.elevationM > highest) highest = pass.elevationM;
      if (pass.status === 'motorable') motorable++;
    });

    setText('stat-passes', MOUNTAIN_PASSES.length);
    setText('stat-highest', formatNumber(highest));
    setText('stat-ranges', MP_RANGES.length);
    setText('stat-motorable', motorable);
  }

  /* ----------------------------------------------------------- names table */

  function renderNamesTable() {
    const body = document.getElementById('names-body');
    if (!body) return;

    body.innerHTML = MP_NAMES.map(function (row) {
      return '<tr>' +
        '<th scope="row" class="term-cell">' + escapeHtml(row.term) + '</th>' +
        '<td class="lang-cell">' + escapeHtml(row.language) + '</td>' +
        '<td>' + escapeHtml(row.note) + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ----------------------------------------------------------------- chips */

  function renderChips(containerId, filterKey, items) {
    const group = document.getElementById(containerId);
    if (!group) return;

    let html = '<button type="button" class="chip active" data-filter="' + filterKey + '" data-value="all">All</button>';
    html += items.map(function (item) {
      const icon = item.icon ? item.icon + ' ' : '';
      return '<button type="button" class="chip" data-filter="' + filterKey + '" data-value="' +
        escapeHtml(item.value) + '">' + icon + escapeHtml(item.label) + '</button>';
    }).join('');

    group.innerHTML = html;
    group.addEventListener('click', onChipClick);
  }

  function onChipClick(event) {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    filters[chip.getAttribute('data-filter')] = chip.getAttribute('data-value');
    syncChips();
    renderPasses();
  }

  function bindSortChips() {
    const group = document.getElementById('sort-chips');
    if (!group) return;
    group.addEventListener('click', function (event) {
      const chip = event.target.closest('.chip');
      if (!chip) return;
      filters.sort = chip.getAttribute('data-sort');
      syncChips();
      renderPasses();
    });
  }

  function syncChips() {
    ['range', 'status'].forEach(function (key) {
      const chips = document.querySelectorAll('[data-filter="' + key + '"]');
      Array.prototype.forEach.call(chips, function (chip) {
        chip.classList.toggle('active', chip.getAttribute('data-value') === filters[key]);
      });
    });

    const sortChips = document.querySelectorAll('[data-sort]');
    Array.prototype.forEach.call(sortChips, function (chip) {
      chip.classList.toggle('active', chip.getAttribute('data-sort') === filters.sort);
    });
  }

  function bindSearch() {
    const input = document.getElementById('mp-search');
    const reset = document.getElementById('reset-filters');

    if (input) {
      input.addEventListener('input', function () {
        filters.search = input.value.trim().toLowerCase();
        renderPasses();
      });
    }

    if (reset) {
      reset.addEventListener('click', function () {
        filters = Object.assign({}, DEFAULT_FILTERS);
        if (input) input.value = '';
        syncChips();
        renderPasses();
      });
    }
  }

  /* ------------------------------------------------------------ pass cards */

  function matchesFilters(pass) {
    if (filters.range !== 'all' && pass.range !== filters.range) return false;
    if (filters.status !== 'all' && pass.status !== filters.status) return false;
    if (!filters.search) return true;

    const haystack = [pass.name, pass.localName, pass.state, pass.connects,
      pass.tagline, pass.desc, pass.history]
      .join(' ')
      .toLowerCase();

    return haystack.indexOf(filters.search) !== -1;
  }

  function sortPasses(list) {
    const sorted = list.slice();
    sorted.sort(function (a, b) {
      if (filters.sort === 'name') return a.name.localeCompare(b.name);
      if (filters.sort === 'state') {
        const byState = a.state.localeCompare(b.state);
        return byState !== 0 ? byState : b.elevationM - a.elevationM;
      }
      return b.elevationM - a.elevationM;
    });
    return sorted;
  }

  function elevationBand(pass) {
    if (pass.elevationM >= 5000) return 'band-extreme';
    if (pass.elevationM >= 4000) return 'band-high';
    return 'band-mid';
  }

  function renderPasses() {
    const grid = document.getElementById('pass-grid');
    const empty = document.getElementById('empty-state');
    const counter = document.getElementById('result-count');
    if (!grid) return;

    const matches = sortPasses(MOUNTAIN_PASSES.filter(matchesFilters));

    if (counter) {
      counter.textContent = matches.length === MOUNTAIN_PASSES.length
        ? 'Showing all ' + MOUNTAIN_PASSES.length + ' passes'
        : 'Showing ' + matches.length + ' of ' + MOUNTAIN_PASSES.length + ' passes';
    }
    if (empty) empty.hidden = matches.length !== 0;

    grid.innerHTML = matches.map(function (pass) {
      return '<article class="pass-card animate-on-scroll ' + elevationBand(pass) + '" tabindex="0" role="button" ' +
          'data-name="' + escapeHtml(pass.name) + '" ' +
          'aria-label="View details for ' + escapeHtml(pass.name) + '">' +
        '<div class="pass-head">' +
          '<span class="pass-icon" aria-hidden="true">' + pass.icon + '</span>' +
          '<span class="pass-elev">' + formatNumber(pass.elevationM) + ' m</span>' +
        '</div>' +
        '<h3>' + escapeHtml(pass.name) + '</h3>' +
        '<p class="pass-state">📍 ' + escapeHtml(pass.state) + '</p>' +
        '<p class="pass-tagline">' + escapeHtml(pass.tagline) + '</p>' +
        '<p class="pass-connects"><strong>Connects:</strong> ' + escapeHtml(pass.connects) + '</p>' +
        '<div class="pass-meta">' +
          '<span class="pill pill-range">' + lookup(MP_RANGES, pass.range, 'icon') + ' ' +
            escapeHtml(lookup(MP_RANGES, pass.range, 'name')) + '</span>' +
          '<span class="pill pill-status status-' + escapeHtml(pass.status) + '">' +
            lookup(MP_STATUS, pass.status, 'icon') + ' ' +
            escapeHtml(lookup(MP_STATUS, pass.status, 'name')) + '</span>' +
        '</div>' +
        '<span class="pass-cta">Full profile →</span>' +
        '</article>';
    }).join('');

    revealVisible();
  }

  /* ------------------------------------------------------- elevation chart */

  function renderElevationChart() {
    const chart = document.getElementById('elev-chart');
    if (!chart) return;

    const ordered = MOUNTAIN_PASSES.slice().sort(function (a, b) {
      return b.elevationM - a.elevationM;
    });

    let max = 0;
    ordered.forEach(function (pass) {
      const above = pass.elevationM - CHART_BASELINE_M;
      if (above > max) max = above;
    });
    if (max <= 0) max = 1;

    chart.innerHTML = ordered.map(function (pass) {
      const above = Math.max(0, pass.elevationM - CHART_BASELINE_M);
      const pct = Math.max(2, Math.round((above / max) * 100));
      return '<div class="elev-row ' + elevationBand(pass) + '">' +
        '<span class="elev-name">' + escapeHtml(pass.name) + '</span>' +
        '<span class="elev-track"><span class="elev-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="elev-value">' + formatNumber(pass.elevationM) + ' m</span>' +
        '</div>';
    }).join('');
  }

  /* ------------------------------------------------------- static sections */

  function renderRoutes() {
    const grid = document.getElementById('route-grid');
    if (!grid) return;

    grid.innerHTML = MP_ROUTES.map(function (route) {
      return '<article class="route-card animate-on-scroll">' +
        '<div class="route-icon">' + route.icon + '</div>' +
        '<h3>' + escapeHtml(route.title) + '</h3>' +
        '<p class="route-era">' + escapeHtml(route.era) + '</p>' +
        '<p>' + escapeHtml(route.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderTunnels() {
    const grid = document.getElementById('tunnel-grid');
    if (!grid) return;

    grid.innerHTML = MP_TUNNELS.map(function (tunnel) {
      return '<article class="tunnel-card animate-on-scroll">' +
        '<div class="tunnel-icon">' + tunnel.icon + '</div>' +
        '<h3>' + escapeHtml(tunnel.name) + '</h3>' +
        '<div class="tunnel-facts">' +
          '<span>' + escapeHtml(tunnel.year) + '</span>' +
          '<span>' + escapeHtml(tunnel.length) + '</span>' +
        '</div>' +
        '<p class="tunnel-pass">' + escapeHtml(tunnel.pass) + '</p>' +
        '<p>' + escapeHtml(tunnel.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderSafety() {
    const grid = document.getElementById('safety-grid');
    if (!grid) return;

    grid.innerHTML = MP_SAFETY.map(function (item) {
      const slug = item.severity.toLowerCase().replace(/[^a-z]/g, '');
      return '<article class="safety-card severity-' + slug + ' animate-on-scroll">' +
        '<div class="safety-icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<span class="severity severity-' + slug + '">' + escapeHtml(item.severity) + '</span>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderPermits() {
    const grid = document.getElementById('permit-grid');
    if (!grid) return;

    grid.innerHTML = MP_PERMITS.map(function (item) {
      return '<article class="permit-card animate-on-scroll">' +
        '<div class="permit-icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = MP_GALLERY.map(function (item) {
      return '<figure class="gallery-item animate-on-scroll">' +
        '<div class="gallery-visual" aria-hidden="true">' + item.icon + '</div>' +
        '<figcaption><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.caption) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  function renderFacts() {
    const grid = document.getElementById('facts-grid');
    if (!grid) return;

    grid.innerHTML = MP_FACTS.map(function (fact, index) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-number">' + (index + 1) + '</span>' +
        '<p>' + escapeHtml(fact) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ----------------------------------------------------------------- modal */

  function bindModal() {
    const grid = document.getElementById('pass-grid');
    const modal = document.getElementById('mp-modal');
    if (!grid || !modal) return;

    grid.addEventListener('click', function (event) {
      const card = event.target.closest('.pass-card');
      if (card) openModal(card.getAttribute('data-name'));
    });

    grid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('.pass-card');
      if (!card) return;
      event.preventDefault();
      openModal(card.getAttribute('data-name'));
    });

    const close = document.getElementById('modal-close');
    const backdrop = document.getElementById('modal-backdrop');
    if (close) close.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  function openModal(name) {
    const pass = MOUNTAIN_PASSES.filter(function (item) { return item.name === name; })[0];
    const modal = document.getElementById('mp-modal');
    if (!pass || !modal) return;

    lastFocused = document.activeElement;

    document.getElementById('modal-icon').textContent = pass.icon;
    document.getElementById('modal-title').textContent = pass.name;
    document.getElementById('modal-local').textContent = pass.localName;
    document.getElementById('modal-tagline').textContent = pass.tagline;
    document.getElementById('modal-desc').textContent = pass.desc;
    document.getElementById('modal-history').textContent = pass.history;

    document.getElementById('modal-meta').innerHTML =
      '<span class="pill pill-range">' + lookup(MP_RANGES, pass.range, 'icon') + ' ' +
        escapeHtml(lookup(MP_RANGES, pass.range, 'name')) + '</span>' +
      '<span class="pill pill-status status-' + escapeHtml(pass.status) + '">' +
        lookup(MP_STATUS, pass.status, 'icon') + ' ' +
        escapeHtml(lookup(MP_STATUS, pass.status, 'name')) + '</span>' +
      '<span class="pill pill-state">📍 ' + escapeHtml(pass.state) + '</span>';

    const specs = [
      { label: 'Elevation', value: formatNumber(pass.elevationM) + ' m (' + formatFeet(pass.elevationM) + ')' },
      { label: 'Range', value: lookup(MP_RANGES, pass.range, 'name') },
      { label: 'State / UT', value: pass.state },
      { label: 'Connects', value: pass.connects },
      { label: 'Access', value: lookup(MP_STATUS, pass.status, 'name') },
      { label: 'Typical season', value: pass.season },
    ];

    document.getElementById('modal-specs').innerHTML = specs.map(function (spec) {
      return '<dt>' + escapeHtml(spec.label) + '</dt><dd>' + escapeHtml(spec.value) + '</dd>';
    }).join('');

    const caution = document.getElementById('modal-caution');
    if (caution) {
      caution.hidden = !pass.caution;
      caution.textContent = pass.caution ? 'Caution: ' + pass.caution : '';
    }

    modal.hidden = false;
    document.body.classList.add('modal-open');
    const close = document.getElementById('modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    const modal = document.getElementById('mp-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ------------------------------------------------------------------ quiz */

  function renderQuiz() {
    const section = document.getElementById('quiz-section');
    if (!section) return;

    if (quizState.current >= MP_QUIZ.length) {
      const pct = Math.round((quizState.score / MP_QUIZ.length) * 100);
      const verdict = pct === 100 ? 'Perfect score — including the elevation-disagreement question.'
        : pct >= 75 ? 'Strong result. The altitude safety section is worth another read regardless.'
        : pct >= 50 ? 'A reasonable start. Try the pass cards again.'
        : 'Worth another pass through the sections above.';

      section.innerHTML =
        '<div class="quiz-result">' +
          '<div class="quiz-score">' + quizState.score + ' / ' + MP_QUIZ.length + '</div>' +
          '<p class="quiz-verdict">' + verdict + '</p>' +
          '<button type="button" class="btn-quiz" id="quiz-restart">Try Again</button>' +
        '</div>';

      const restart = document.getElementById('quiz-restart');
      if (restart) {
        restart.addEventListener('click', function () {
          quizState = { current: 0, score: 0, answered: false };
          renderQuiz();
        });
      }
      return;
    }

    const question = MP_QUIZ[quizState.current];
    section.innerHTML =
      '<div class="quiz-progress">Question ' + (quizState.current + 1) + ' of ' + MP_QUIZ.length +
        '<span class="quiz-running-score">Score: ' + quizState.score + '</span></div>' +
      '<h3 class="quiz-question">' + escapeHtml(question.q) + '</h3>' +
      '<div class="quiz-options" id="quiz-options">' +
        question.options.map(function (option, index) {
          return '<button type="button" class="quiz-option" data-index="' + index + '">' +
            escapeHtml(option) + '</button>';
        }).join('') +
      '</div>' +
      '<div class="quiz-explain" id="quiz-explain" hidden></div>';

    const options = document.getElementById('quiz-options');
    options.addEventListener('click', function (event) {
      const button = event.target.closest('.quiz-option');
      if (!button || quizState.answered) return;
      quizState.answered = true;

      const chosen = parseInt(button.getAttribute('data-index'), 10);
      const correct = question.answer;
      if (chosen === correct) quizState.score++;

      Array.prototype.forEach.call(options.querySelectorAll('.quiz-option'), function (opt, index) {
        opt.disabled = true;
        if (index === correct) opt.classList.add('correct');
        else if (index === chosen) opt.classList.add('wrong');
      });

      const explain = document.getElementById('quiz-explain');
      explain.hidden = false;
      explain.innerHTML = '<p>' + escapeHtml(question.explain) + '</p>' +
        '<button type="button" class="btn-quiz" id="quiz-next">' +
        (quizState.current === MP_QUIZ.length - 1 ? 'See Result' : 'Next Question') + '</button>';

      document.getElementById('quiz-next').addEventListener('click', function () {
        quizState.current++;
        quizState.answered = false;
        renderQuiz();
      });
    });
  }

  /* ------------------------------------------------------------ animations */

  function revealVisible() {
    const targets = document.querySelectorAll('.animate-on-scroll:not(.animate-visible)');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('animate-visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
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
