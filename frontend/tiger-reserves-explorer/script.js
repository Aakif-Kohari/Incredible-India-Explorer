/* ==========================================================================
   TIGER RESERVES OF INDIA EXPLORER — INTERACTION LAYER
   Vanilla JS, no dependencies. Everything renders from data.js.
   ========================================================================== */

(function () {
  'use strict';

  const DEFAULT_FILTERS = { search: '', landscape: 'all', category: 'all', sort: 'name' };

  let filters = Object.assign({}, DEFAULT_FILTERS);
  let quizState = { current: 0, score: 0, answered: false };
  let lastFocused = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof TIGER_RESERVES === 'undefined') {
      console.error('tiger-reserves-explorer: data.js failed to load');
      return;
    }
    renderHeroStats();
    renderComparisonTable();
    renderTimeline();
    renderLandscapes();
    renderChips('landscape-chips', 'landscape', TR_LANDSCAPES.map(function (item) {
      return { value: item.key, label: item.name, icon: item.icon };
    }));
    renderChips('category-chips', 'category', TR_CATEGORIES.map(function (item) {
      return { value: item.key, label: item.name, icon: item.icon };
    }));
    bindSortChips();
    renderReserves();
    renderMethod();
    renderCharts();
    renderThreats();
    renderWins();
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

  function totalArea(reserve) {
    return reserve.coreKm2 + reserve.bufferKm2;
  }

  function formatNumber(value) {
    return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /* ------------------------------------------------------------ hero stats */

  function renderHeroStats() {
    const states = {};
    let area = 0;

    TIGER_RESERVES.forEach(function (reserve) {
      area += totalArea(reserve);
      reserve.state.split('&').forEach(function (part) {
        states[part.trim()] = true;
      });
    });

    setText('stat-reserves', TIGER_RESERVES.length);
    setText('stat-area', formatNumber(area));
    setText('stat-states', Object.keys(states).length);
  }

  /* ----------------------------------------------------- comparison table */

  function renderComparisonTable() {
    const body = document.getElementById('compare-body');
    if (!body) return;
    body.innerHTML = TR_COMPARISON.map(function (row) {
      return '<tr>' +
        '<th scope="row">' + escapeHtml(row.aspect) + '</th>' +
        '<td class="cell-reserve">' + escapeHtml(row.reserve) + '</td>' +
        '<td>' + escapeHtml(row.park) + '</td>' +
        '<td>' + escapeHtml(row.sanctuary) + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ------------------------------------------------------------- timeline */

  function renderTimeline() {
    const track = document.getElementById('timeline-track');
    if (!track) return;
    track.innerHTML = TR_TIMELINE.map(function (entry, index) {
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

  /* ----------------------------------------------------------- landscapes */

  function renderLandscapes() {
    const grid = document.getElementById('landscape-grid');
    if (!grid) return;

    grid.innerHTML = TR_LANDSCAPES.map(function (landscape) {
      const members = TIGER_RESERVES.filter(function (reserve) {
        return reserve.landscape === landscape.key;
      });
      const tigers = members.reduce(function (sum, reserve) { return sum + reserve.tigers; }, 0);

      return '<button type="button" class="landscape-card animate-on-scroll" data-landscape="' +
          escapeHtml(landscape.key) + '">' +
        '<span class="landscape-icon" aria-hidden="true">' + landscape.icon + '</span>' +
        '<h3>' + escapeHtml(landscape.name) + '</h3>' +
        '<p>' + escapeHtml(landscape.blurb) + '</p>' +
        '<span class="landscape-count">' + members.length + ' reserves · ~' + formatNumber(tigers) + ' tigers</span>' +
        '</button>';
    }).join('');

    grid.addEventListener('click', function (event) {
      const card = event.target.closest('.landscape-card');
      if (!card) return;
      filters.landscape = card.getAttribute('data-landscape');
      syncChips();
      renderReserves();
      const explorer = document.getElementById('explorer');
      if (explorer) explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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
    renderReserves();
  }

  function bindSortChips() {
    const group = document.getElementById('sort-chips');
    if (!group) return;
    group.addEventListener('click', function (event) {
      const chip = event.target.closest('.chip');
      if (!chip) return;
      filters.sort = chip.getAttribute('data-sort');
      syncChips();
      renderReserves();
    });
  }

  function syncChips() {
    ['landscape', 'category'].forEach(function (key) {
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
    const input = document.getElementById('tr-search');
    const reset = document.getElementById('reset-filters');

    if (input) {
      input.addEventListener('input', function () {
        filters.search = input.value.trim().toLowerCase();
        renderReserves();
      });
    }

    if (reset) {
      reset.addEventListener('click', function () {
        filters = Object.assign({}, DEFAULT_FILTERS);
        if (input) input.value = '';
        syncChips();
        renderReserves();
      });
    }
  }

  /* ----------------------------------------------------------------- cards */

  function matchesFilters(reserve) {
    if (filters.landscape !== 'all' && reserve.landscape !== filters.landscape) return false;
    if (filters.category !== 'all' && reserve.category !== filters.category) return false;
    if (!filters.search) return true;

    const haystack = [reserve.name, reserve.state, reserve.tagline, reserve.desc, reserve.feature]
      .concat(reserve.species)
      .concat(reserve.rivers)
      .join(' ')
      .toLowerCase();

    return haystack.indexOf(filters.search) !== -1;
  }

  function sortReserves(list) {
    const sorted = list.slice();
    sorted.sort(function (a, b) {
      if (filters.sort === 'tigers') return b.tigers - a.tigers;
      if (filters.sort === 'area') return totalArea(b) - totalArea(a);
      if (filters.sort === 'notified') return a.notified - b.notified;
      return a.name.localeCompare(b.name);
    });
    return sorted;
  }

  function densityClass(reserve) {
    const density = reserve.tigers / (totalArea(reserve) / 100);
    if (density >= 8) return 'density-high';
    if (density >= 3) return 'density-mid';
    return 'density-low';
  }

  function renderReserves() {
    const grid = document.getElementById('reserve-grid');
    const empty = document.getElementById('empty-state');
    const counter = document.getElementById('result-count');
    if (!grid) return;

    const matches = sortReserves(TIGER_RESERVES.filter(matchesFilters));

    if (counter) {
      counter.textContent = matches.length === TIGER_RESERVES.length
        ? 'Showing all ' + TIGER_RESERVES.length + ' reserves'
        : 'Showing ' + matches.length + ' of ' + TIGER_RESERVES.length + ' reserves';
    }
    if (empty) empty.hidden = matches.length !== 0;

    grid.innerHTML = matches.map(function (reserve) {
      return '<article class="reserve-card animate-on-scroll ' + densityClass(reserve) + '" tabindex="0" role="button" ' +
          'data-name="' + escapeHtml(reserve.name) + '" ' +
          'aria-label="View details for ' + escapeHtml(reserve.name) + '">' +
        '<div class="reserve-head">' +
          '<span class="reserve-icon" aria-hidden="true">' + reserve.icon + '</span>' +
          '<span class="reserve-year">Notified ' + reserve.notified + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(reserve.name) + '</h3>' +
        '<p class="reserve-state">📍 ' + escapeHtml(reserve.state) + '</p>' +
        '<p class="reserve-tagline">' + escapeHtml(reserve.tagline) + '</p>' +
        '<div class="reserve-figures">' +
          '<span class="figure"><strong>~' + formatNumber(reserve.tigers) + '</strong>tigers</span>' +
          '<span class="figure"><strong>' + formatNumber(totalArea(reserve)) + '</strong>km² total</span>' +
        '</div>' +
        '<div class="reserve-meta">' +
          '<span class="pill pill-landscape">' + lookup(TR_LANDSCAPES, reserve.landscape, 'icon') + ' ' +
            escapeHtml(lookup(TR_LANDSCAPES, reserve.landscape, 'name')) + '</span>' +
          '<span class="pill pill-category">' + lookup(TR_CATEGORIES, reserve.category, 'icon') + ' ' +
            escapeHtml(lookup(TR_CATEGORIES, reserve.category, 'name')) + '</span>' +
        '</div>' +
        '<span class="reserve-cta">Full profile →</span>' +
        '</article>';
    }).join('');

    revealVisible();
  }

  /* ------------------------------------------------------- static sections */

  function renderMethod() {
    const grid = document.getElementById('method-grid');
    if (!grid) return;
    grid.innerHTML = TR_METHOD.map(function (item) {
      return '<article class="method-card animate-on-scroll">' +
        '<span class="method-step">' + escapeHtml(item.step) + '</span>' +
        '<span class="method-icon" aria-hidden="true">' + item.icon + '</span>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderThreats() {
    const grid = document.getElementById('threats-grid');
    if (!grid) return;
    grid.innerHTML = TR_THREATS.map(function (item) {
      return '<div class="info-card animate-on-scroll">' +
        '<div class="icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '<span class="severity severity-' + item.severity.toLowerCase() + '">' + escapeHtml(item.severity) + '</span>' +
        '</div>';
    }).join('');
  }

  function renderWins() {
    const grid = document.getElementById('wins-grid');
    if (!grid) return;
    grid.innerHTML = TR_WINS.map(function (item) {
      return '<article class="win-card animate-on-scroll">' +
        '<div class="win-icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p class="win-org">' + escapeHtml(item.org) + '</p>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = TR_GALLERY.map(function (item) {
      return '<figure class="gallery-item animate-on-scroll">' +
        '<div class="gallery-visual" aria-hidden="true">' + item.icon + '</div>' +
        '<figcaption><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.caption) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  function renderFacts() {
    const grid = document.getElementById('facts-grid');
    if (!grid) return;
    grid.innerHTML = TR_FACTS.map(function (fact, index) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-number">' + (index + 1) + '</span>' +
        '<p>' + escapeHtml(fact) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ---------------------------------------------------------------- charts */

  function renderCharts() {
    const byLandscape = TR_LANDSCAPES.map(function (landscape) {
      const members = TIGER_RESERVES.filter(function (reserve) {
        return reserve.landscape === landscape.key;
      });
      return {
        label: landscape.name,
        icon: landscape.icon,
        tigers: members.reduce(function (sum, reserve) { return sum + reserve.tigers; }, 0),
        area: members.reduce(function (sum, reserve) { return sum + totalArea(reserve); }, 0),
      };
    });

    drawChart('chart-tigers', byLandscape, 'tigers', function (value) {
      return '~' + formatNumber(value);
    });
    drawChart('chart-area', byLandscape, 'area', function (value) {
      return formatNumber(value) + ' km²';
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

  /* ----------------------------------------------------------------- modal */

  function bindModal() {
    const grid = document.getElementById('reserve-grid');
    const modal = document.getElementById('tr-modal');
    if (!grid || !modal) return;

    grid.addEventListener('click', function (event) {
      const card = event.target.closest('.reserve-card');
      if (card) openModal(card.getAttribute('data-name'));
    });

    grid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('.reserve-card');
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
    const reserve = TIGER_RESERVES.filter(function (item) { return item.name === name; })[0];
    const modal = document.getElementById('tr-modal');
    if (!reserve || !modal) return;

    lastFocused = document.activeElement;

    document.getElementById('modal-icon').textContent = reserve.icon;
    document.getElementById('modal-title').textContent = reserve.name;
    document.getElementById('modal-tagline').textContent = reserve.tagline;
    document.getElementById('modal-desc').textContent = reserve.desc;
    document.getElementById('modal-feature').textContent = reserve.feature;

    document.getElementById('modal-meta').innerHTML =
      '<span class="pill pill-state">📍 ' + escapeHtml(reserve.state) + '</span>' +
      '<span class="pill pill-landscape">' + lookup(TR_LANDSCAPES, reserve.landscape, 'icon') + ' ' +
        escapeHtml(lookup(TR_LANDSCAPES, reserve.landscape, 'name')) + '</span>' +
      '<span class="pill pill-category">' + lookup(TR_CATEGORIES, reserve.category, 'icon') + ' ' +
        escapeHtml(lookup(TR_CATEGORIES, reserve.category, 'name')) + '</span>';

    const specs = [
      { label: 'Year notified', value: String(reserve.notified) },
      { label: 'Core / critical tiger habitat', value: formatNumber(reserve.coreKm2) + ' km²' },
      { label: 'Buffer area', value: formatNumber(reserve.bufferKm2) + ' km²' },
      { label: 'Total area', value: formatNumber(totalArea(reserve)) + ' km²' },
      { label: 'Tiger estimate', value: '~' + formatNumber(reserve.tigers) },
      { label: 'Main rivers', value: reserve.rivers.join(', ') },
    ];

    document.getElementById('modal-specs').innerHTML = specs.map(function (spec) {
      return '<dt>' + escapeHtml(spec.label) + '</dt><dd>' + escapeHtml(spec.value) + '</dd>';
    }).join('');

    document.getElementById('modal-species').innerHTML = reserve.species.map(function (species) {
      return '<li>' + escapeHtml(species) + '</li>';
    }).join('');

    const caveat = document.getElementById('modal-caveat');
    if (caveat) {
      caveat.hidden = !reserve.tigerNote;
      caveat.textContent = reserve.tigerNote ? 'Note on the figure: ' + reserve.tigerNote : '';
    }

    modal.hidden = false;
    document.body.classList.add('modal-open');
    const close = document.getElementById('modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    const modal = document.getElementById('tr-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ------------------------------------------------------------------ quiz */

  function renderQuiz() {
    const section = document.getElementById('quiz-section');
    if (!section) return;

    if (quizState.current >= TR_QUIZ.length) {
      const pct = Math.round((quizState.score / TR_QUIZ.length) * 100);
      const verdict = pct === 100 ? 'Perfect score. You could sit on the technical committee.'
        : pct >= 75 ? 'Strong result — the estimation section is worth one more read.'
        : pct >= 50 ? 'A reasonable start. Try the reserve cards again.'
        : 'Worth another pass through the sections above.';

      section.innerHTML =
        '<div class="quiz-result">' +
          '<div class="quiz-score">' + quizState.score + ' / ' + TR_QUIZ.length + '</div>' +
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

    const question = TR_QUIZ[quizState.current];
    section.innerHTML =
      '<div class="quiz-progress">Question ' + (quizState.current + 1) + ' of ' + TR_QUIZ.length +
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
        (quizState.current === TR_QUIZ.length - 1 ? 'See Result' : 'Next Question') + '</button>';

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
