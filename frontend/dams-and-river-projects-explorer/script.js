/* ==========================================================================
   MAJOR DAMS & RIVER VALLEY PROJECTS EXPLORER — INTERACTION LAYER
   Vanilla JS, no dependencies. Everything renders from data.js.
   ========================================================================== */

(function () {
  'use strict';

  const DEFAULT_FILTERS = { search: '', basin: 'all', purpose: 'all', type: 'all', sort: 'name' };

  let filters = Object.assign({}, DEFAULT_FILTERS);
  let quizState = { current: 0, score: 0, answered: false };
  let lastFocused = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof DAMS === 'undefined') {
      console.error('dams-and-river-projects-explorer: data.js failed to load');
      return;
    }
    renderHeroStats();
    renderTypes();
    renderSuperlatives();
    renderChips('basin-chips', 'basin', DM_BASINS.map(toChip));
    renderChips('purpose-chips', 'purpose', DM_PURPOSES.map(toChip));
    renderChips('type-chips', 'type', DM_TYPES.map(toChip));
    bindSortChips();
    renderDams();
    renderTimeline();
    renderCharts();
    renderInfoGrid('benefits-grid', DM_BENEFITS);
    renderInfoGrid('costs-grid', DM_COSTS);
    renderSafety();
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

  function formatYear(dam) {
    if (!dam.commissioned) return 'Under construction';
    if (dam.commissioned < 1000) return 'c. ' + dam.commissioned + ' CE';
    return String(dam.commissioned);
  }

  function formatCapacity(dam) {
    return dam.capacityMW > 0 ? formatNumber(dam.capacityMW) + ' MW' : 'No generation';
  }

  function formatStorage(dam) {
    return dam.storageMcm > 0 ? formatNumber(dam.storageMcm) + ' million m³' : 'Run-of-river / negligible';
  }

  /* ------------------------------------------------------------ hero stats */

  function renderHeroStats() {
    let capacity = 0;
    DAMS.forEach(function (dam) { capacity += dam.capacityMW; });

    setText('stat-projects', DAMS.length);
    setText('stat-capacity', formatNumber(capacity));
    setText('stat-basins', DM_BASINS.length);
  }

  /* ------------------------------------------------------------ dam types */

  function renderTypes() {
    const grid = document.getElementById('type-grid');
    if (!grid) return;

    grid.innerHTML = DM_TYPES.map(function (type) {
      const count = DAMS.filter(function (dam) { return dam.type === type.key; }).length;
      return '<article class="type-card animate-on-scroll type-' + escapeHtml(type.key) + '">' +
        '<span class="type-icon" aria-hidden="true">' + type.icon + '</span>' +
        '<h3>' + escapeHtml(type.name) + '</h3>' +
        '<p>' + escapeHtml(type.desc) + '</p>' +
        '<p class="type-examples"><strong>Here:</strong> ' + escapeHtml(type.examples) + '</p>' +
        '<span class="type-count">' + count + ' profiled</span>' +
        '</article>';
    }).join('');
  }

  /* --------------------------------------------------------- superlatives */

  function renderSuperlatives() {
    const grid = document.getElementById('super-grid');
    if (!grid) return;

    grid.innerHTML = DM_SUPERLATIVES.map(function (item) {
      return '<article class="super-card animate-on-scroll">' +
        '<span class="super-icon" aria-hidden="true">' + item.icon + '</span>' +
        '<h3>' + escapeHtml(item.label) + '</h3>' +
        '<p class="super-value">' + escapeHtml(item.value) + '</p>' +
        '<p class="super-note">' + escapeHtml(item.note) + '</p>' +
        '</article>';
    }).join('');
  }

  /* ----------------------------------------------------------------- chips */

  function renderChips(containerId, filterKey, items) {
    const group = document.getElementById(containerId);
    if (!group) return;

    let html = '<button type="button" class="chip active" data-filter="' + filterKey + '" data-value="all" aria-pressed="true">All</button>';
    html += items.map(function (item) {
      const icon = item.icon ? item.icon + ' ' : '';
      return '<button type="button" class="chip" data-filter="' + filterKey + '" data-value="' +
        escapeHtml(item.value) + '" aria-pressed="false">' + icon + escapeHtml(item.label) + '</button>';
    }).join('');

    group.innerHTML = html;
    group.addEventListener('click', onChipClick);
  }

  function onChipClick(event) {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    filters[chip.getAttribute('data-filter')] = chip.getAttribute('data-value');
    syncChips();
    renderDams();
  }

  function bindSortChips() {
    const group = document.getElementById('sort-chips');
    if (!group) return;
    group.addEventListener('click', function (event) {
      const chip = event.target.closest('.chip');
      if (!chip) return;
      filters.sort = chip.getAttribute('data-sort');
      syncChips();
      renderDams();
    });
  }

  function syncChips() {
    ['basin', 'purpose', 'type'].forEach(function (key) {
      const chips = document.querySelectorAll('[data-filter="' + key + '"]');
      Array.prototype.forEach.call(chips, function (chip) {
        const active = chip.getAttribute('data-value') === filters[key];
        chip.classList.toggle('active', active);
        chip.setAttribute('aria-pressed', String(active));
      });
    });

    const sortChips = document.querySelectorAll('[data-sort]');
    Array.prototype.forEach.call(sortChips, function (chip) {
      const active = chip.getAttribute('data-sort') === filters.sort;
      chip.classList.toggle('active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
  }

  function bindSearch() {
    const input = document.getElementById('dm-search');
    const reset = document.getElementById('reset-filters');

    if (input) {
      input.addEventListener('input', function () {
        filters.search = input.value.trim().toLowerCase();
        renderDams();
      });
    }

    if (reset) {
      reset.addEventListener('click', function () {
        filters = Object.assign({}, DEFAULT_FILTERS);
        if (input) input.value = '';
        syncChips();
        renderDams();
      });
    }
  }

  /* ------------------------------------------------------------- dam cards */

  function matchesFilters(dam) {
    if (filters.basin !== 'all' && dam.basin !== filters.basin) return false;
    if (filters.purpose !== 'all' && dam.purpose !== filters.purpose) return false;
    if (filters.type !== 'all' && dam.type !== filters.type) return false;
    if (!filters.search) return true;

    const haystack = [dam.name, dam.river, dam.state, dam.reservoir, dam.tagline, dam.desc, dam.impact]
      .join(' ')
      .toLowerCase();

    return haystack.indexOf(filters.search) !== -1;
  }

  function sortDams(list) {
    const sorted = list.slice();
    sorted.sort(function (a, b) {
      if (filters.sort === 'height') return b.heightM - a.heightM;
      if (filters.sort === 'capacity') return b.capacityMW - a.capacityMW;
      if (filters.sort === 'storage') return b.storageMcm - a.storageMcm;
      if (filters.sort === 'year') {
        // Projects still under construction carry commissioned === 0; sort them last.
        const ay = a.commissioned || Infinity;
        const by = b.commissioned || Infinity;
        return ay - by;
      }
      return a.name.localeCompare(b.name);
    });
    return sorted;
  }

  function renderDams() {
    const grid = document.getElementById('dam-grid');
    const empty = document.getElementById('empty-state');
    const counter = document.getElementById('result-count');
    if (!grid) return;

    const matches = sortDams(DAMS.filter(matchesFilters));

    if (counter) {
      counter.textContent = matches.length === DAMS.length
        ? 'Showing all ' + DAMS.length + ' projects'
        : 'Showing ' + matches.length + ' of ' + DAMS.length + ' projects';
    }
    if (empty) empty.hidden = matches.length !== 0;

    grid.innerHTML = matches.map(function (dam) {
      return '<article class="dam-card animate-on-scroll type-' + escapeHtml(dam.type) + '" tabindex="0" role="button" ' +
          'data-name="' + escapeHtml(dam.name) + '" ' +
          'aria-label="View details for ' + escapeHtml(dam.name) + '">' +
        '<div class="dam-head">' +
          '<span class="dam-icon" aria-hidden="true">' + dam.icon + '</span>' +
          '<span class="dam-year">' + escapeHtml(formatYear(dam)) + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(dam.name) + '</h3>' +
        '<p class="dam-river">🌊 ' + escapeHtml(dam.river) + ' · ' + escapeHtml(dam.state) + '</p>' +
        '<p class="dam-tagline">' + escapeHtml(dam.tagline) + '</p>' +
        '<div class="dam-figures">' +
          '<span class="figure"><strong>' + formatNumber(dam.heightM) + ' m</strong>height</span>' +
          '<span class="figure"><strong>' + (dam.capacityMW > 0 ? formatNumber(dam.capacityMW) : '—') + '</strong>MW</span>' +
        '</div>' +
        '<div class="dam-meta">' +
          '<span class="pill pill-basin">' + lookup(DM_BASINS, dam.basin, 'icon') + ' ' +
            escapeHtml(lookup(DM_BASINS, dam.basin, 'name')) + '</span>' +
          '<span class="pill pill-purpose">' + lookup(DM_PURPOSES, dam.purpose, 'icon') + ' ' +
            escapeHtml(lookup(DM_PURPOSES, dam.purpose, 'name')) + '</span>' +
        '</div>' +
        '<span class="dam-cta">Full profile →</span>' +
        '</article>';
    }).join('');

    revealVisible();
  }

  /* -------------------------------------------------------------- timeline */

  function renderTimeline() {
    const track = document.getElementById('timeline-track');
    if (!track) return;

    track.innerHTML = DM_TIMELINE.map(function (entry, index) {
      const side = index % 2 === 0 ? 'left' : 'right';
      return '<div class="timeline-item timeline-' + side + ' animate-on-scroll">' +
        '<div class="timeline-dot" aria-hidden="true"></div>' +
        '<div class="timeline-body">' +
          '<span class="timeline-year">' + escapeHtml(entry.year) + '</span>' +
          '<h3>' + escapeHtml(entry.title) + '</h3>' +
          '<p>' + escapeHtml(entry.desc) + '</p>' +
        '</div>' +
        '</div>';
    }).join('');
  }

  /* ---------------------------------------------------------------- charts */

  function renderCharts() {
    const byBasin = DM_BASINS.map(function (basin) {
      const members = DAMS.filter(function (dam) { return dam.basin === basin.key; });
      return {
        label: basin.name,
        icon: basin.icon,
        capacity: members.reduce(function (sum, dam) { return sum + dam.capacityMW; }, 0),
        storage: members.reduce(function (sum, dam) { return sum + dam.storageMcm; }, 0),
      };
    });

    drawChart('chart-capacity', byBasin, 'capacity', function (value) {
      return formatNumber(value) + ' MW';
    });
    drawChart('chart-storage', byBasin, 'storage', function (value) {
      return formatNumber(value) + ' Mm³';
    });
    drawDecadeChart();
  }

  function drawDecadeChart() {
    const buckets = {};

    DAMS.forEach(function (dam) {
      if (!dam.commissioned) return;
      const key = dam.commissioned < 1900
        ? 'Pre-1900'
        : String(Math.floor(dam.commissioned / 10) * 10) + 's';
      buckets[key] = (buckets[key] || 0) + 1;
    });

    const rows = Object.keys(buckets)
      .sort(function (a, b) {
        if (a === 'Pre-1900') return -1;
        if (b === 'Pre-1900') return 1;
        return parseInt(a, 10) - parseInt(b, 10);
      })
      .map(function (key) {
        return { label: key, icon: '📅', count: buckets[key] };
      });

    drawChart('chart-decade', rows, 'count', function (value) {
      return value + (value === 1 ? ' project' : ' projects');
    });
  }

  function drawChart(containerId, rows, field, formatter) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let max = 0;
    rows.forEach(function (row) {
      if (row[field] > max) max = row[field];
    });
    if (max === 0) max = 1;

    container.innerHTML = rows.map(function (row) {
      const pct = Math.max(2, Math.round((row[field] / max) * 100));
      return '<div class="bar-row">' +
        '<span class="bar-label">' + row.icon + ' ' + escapeHtml(row.label) + '</span>' +
        '<span class="bar-track"><span class="bar-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="bar-value">' + escapeHtml(formatter(row[field])) + '</span>' +
        '</div>';
    }).join('');
  }

  /* ------------------------------------------------------- static sections */

  function renderInfoGrid(containerId, items) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = items.map(function (item) {
      const severity = item.severity
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

  function renderSafety() {
    const grid = document.getElementById('safety-grid');
    if (!grid) return;

    grid.innerHTML = DM_SAFETY.map(function (item) {
      return '<article class="safety-card animate-on-scroll">' +
        '<div class="safety-icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = DM_GALLERY.map(function (item) {
      return '<figure class="gallery-item animate-on-scroll">' +
        '<div class="gallery-visual" aria-hidden="true">' + item.icon + '</div>' +
        '<figcaption><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.caption) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  function renderFacts() {
    const grid = document.getElementById('facts-grid');
    if (!grid) return;

    grid.innerHTML = DM_FACTS.map(function (fact, index) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-number">' + (index + 1) + '</span>' +
        '<p>' + escapeHtml(fact) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ----------------------------------------------------------------- modal */

  function bindModal() {
    const grid = document.getElementById('dam-grid');
    const modal = document.getElementById('dm-modal');
    if (!grid || !modal) return;

    grid.addEventListener('click', function (event) {
      const card = event.target.closest('.dam-card');
      if (card) openModal(card.getAttribute('data-name'));
    });

    grid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('.dam-card');
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
    const dam = DAMS.filter(function (item) { return item.name === name; })[0];
    const modal = document.getElementById('dm-modal');
    if (!dam || !modal) return;

    lastFocused = document.activeElement;

    document.getElementById('modal-icon').textContent = dam.icon;
    document.getElementById('modal-title').textContent = dam.name;
    document.getElementById('modal-tagline').textContent = dam.tagline;
    document.getElementById('modal-desc').textContent = dam.desc;
    document.getElementById('modal-impact').textContent = dam.impact;

    document.getElementById('modal-meta').innerHTML =
      '<span class="pill pill-basin">' + lookup(DM_BASINS, dam.basin, 'icon') + ' ' +
        escapeHtml(lookup(DM_BASINS, dam.basin, 'name')) + '</span>' +
      '<span class="pill pill-purpose">' + lookup(DM_PURPOSES, dam.purpose, 'icon') + ' ' +
        escapeHtml(lookup(DM_PURPOSES, dam.purpose, 'name')) + '</span>' +
      '<span class="pill pill-type">' + lookup(DM_TYPES, dam.type, 'icon') + ' ' +
        escapeHtml(lookup(DM_TYPES, dam.type, 'name')) + '</span>';

    const specs = [
      { label: 'River', value: dam.river },
      { label: 'State', value: dam.state },
      { label: 'Reservoir', value: dam.reservoir },
      { label: 'Structure type', value: lookup(DM_TYPES, dam.type, 'name') },
      { label: 'Height', value: formatNumber(dam.heightM) + ' m' },
      { label: 'Installed capacity', value: formatCapacity(dam) },
      { label: 'Gross storage', value: formatStorage(dam) },
      { label: 'Commissioned', value: formatYear(dam) },
    ];

    document.getElementById('modal-specs').innerHTML = specs.map(function (spec) {
      return '<dt>' + escapeHtml(spec.label) + '</dt><dd>' + escapeHtml(spec.value) + '</dd>';
    }).join('');

    const note = document.getElementById('modal-note');
    if (note) {
      note.hidden = !dam.note;
      note.textContent = dam.note ? 'Note: ' + dam.note : '';
    }

    modal.hidden = false;
    document.body.classList.add('modal-open');
    const close = document.getElementById('modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    const modal = document.getElementById('dm-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ------------------------------------------------------------------ quiz */

  function renderQuiz() {
    const section = document.getElementById('quiz-section');
    if (!section) return;

    if (quizState.current >= DM_QUIZ.length) {
      const pct = Math.round((quizState.score / DM_QUIZ.length) * 100);
      const verdict = pct === 100 ? 'Perfect score — including the two-superlative trap.'
        : pct >= 75 ? 'Strong result. The superlatives section is worth another look.'
        : pct >= 50 ? 'A reasonable start. Try the project cards again.'
        : 'Worth another pass through the sections above.';

      section.innerHTML =
        '<div class="quiz-result">' +
          '<div class="quiz-score">' + quizState.score + ' / ' + DM_QUIZ.length + '</div>' +
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

    const question = DM_QUIZ[quizState.current];
    section.innerHTML =
      '<div class="quiz-progress">Question ' + (quizState.current + 1) + ' of ' + DM_QUIZ.length +
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
        (quizState.current === DM_QUIZ.length - 1 ? 'See Result' : 'Next Question') + '</button>';

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
