/* ==========================================================================
   UNESCO INTANGIBLE CULTURAL HERITAGE OF INDIA — INTERACTION LAYER
   Vanilla JS, no dependencies. Everything renders from data.js.
   ========================================================================== */

(function () {
  'use strict';

  const DEFAULT_FILTERS = { search: '', domain: 'all', region: 'all', sort: 'year' };

  let filters = Object.assign({}, DEFAULT_FILTERS);
  let quizState = { current: 0, score: 0, answered: false };
  let lastFocused = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof ICH_ELEMENTS === 'undefined') {
      console.error('intangible-heritage-explorer: data.js failed to load');
      return;
    }
    renderHeroStats();
    renderComparisonTable();
    renderDomains();
    renderChips('domain-chips', 'domain', ICH_DOMAINS.map(toChip));
    renderChips('region-chips', 'region', ICH_REGIONS.map(toChip));
    bindSortChips();
    renderElements();
    renderTimeline();
    renderProcess();
    renderMyths();
    renderSafeguarding();
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

  /* ------------------------------------------------------------ hero stats */

  function renderHeroStats() {
    let earliest = Infinity;
    let latest = 0;

    ICH_ELEMENTS.forEach(function (element) {
      if (element.year < earliest) earliest = element.year;
      if (element.year > latest) latest = element.year;
    });

    setText('stat-elements', ICH_ELEMENTS.length);
    setText('stat-domains', ICH_DOMAINS.length);
    setText('stat-first', earliest);
    setText('stat-latest', latest);
  }

  /* ----------------------------------------------------- comparison table */

  function renderComparisonTable() {
    const body = document.getElementById('compare-body');
    if (!body) return;

    body.innerHTML = ICH_COMPARISON.map(function (row) {
      return '<tr>' +
        '<th scope="row">' + escapeHtml(row.aspect) + '</th>' +
        '<td>' + escapeHtml(row.tangible) + '</td>' +
        '<td class="cell-intangible">' + escapeHtml(row.intangible) + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ---------------------------------------------------------- domain cards */

  function renderDomains() {
    const grid = document.getElementById('domain-grid');
    if (!grid) return;

    grid.innerHTML = ICH_DOMAINS.map(function (domain) {
      const count = ICH_ELEMENTS.filter(function (element) {
        return element.domain === domain.key;
      }).length;

      return '<button type="button" class="domain-card animate-on-scroll" data-domain="' +
          escapeHtml(domain.key) + '">' +
        '<span class="domain-icon" aria-hidden="true">' + domain.icon + '</span>' +
        '<h3>' + escapeHtml(domain.name) + '</h3>' +
        '<p>' + escapeHtml(domain.blurb) + '</p>' +
        '<span class="domain-count">' + count + (count === 1 ? ' element' : ' elements') + '</span>' +
        '</button>';
    }).join('');

    grid.addEventListener('click', function (event) {
      const card = event.target.closest('.domain-card');
      if (!card) return;
      filters.domain = card.getAttribute('data-domain');
      syncChips();
      renderElements();
      const explorer = document.getElementById('explorer');
      if (explorer) explorer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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
    renderElements();
  }

  function bindSortChips() {
    const group = document.getElementById('sort-chips');
    if (!group) return;
    group.addEventListener('click', function (event) {
      const chip = event.target.closest('.chip');
      if (!chip) return;
      filters.sort = chip.getAttribute('data-sort');
      syncChips();
      renderElements();
    });
  }

  function syncChips() {
    ['domain', 'region'].forEach(function (key) {
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
    const input = document.getElementById('ic-search');
    const reset = document.getElementById('reset-filters');

    if (input) {
      input.addEventListener('input', function () {
        filters.search = input.value.trim().toLowerCase();
        renderElements();
      });
    }

    if (reset) {
      reset.addEventListener('click', function () {
        filters = Object.assign({}, DEFAULT_FILTERS);
        if (input) input.value = '';
        syncChips();
        renderElements();
      });
    }
  }

  /* --------------------------------------------------------- element cards */

  function matchesFilters(element) {
    if (filters.domain !== 'all' && element.domain !== filters.domain) return false;
    if (filters.region !== 'all' && element.region !== filters.region) return false;
    if (!filters.search) return true;

    const haystack = [element.name, element.state, element.community,
      element.tagline, element.desc, element.detail]
      .join(' ')
      .toLowerCase();

    return haystack.indexOf(filters.search) !== -1;
  }

  function sortElements(list) {
    const sorted = list.slice();
    sorted.sort(function (a, b) {
      if (filters.sort === 'name') return a.name.localeCompare(b.name);
      if (filters.sort === 'state') {
        const byState = a.state.localeCompare(b.state);
        return byState !== 0 ? byState : a.year - b.year;
      }
      return a.year - b.year;
    });
    return sorted;
  }

  function renderElements() {
    const grid = document.getElementById('element-grid');
    const empty = document.getElementById('empty-state');
    const counter = document.getElementById('result-count');
    if (!grid) return;

    const matches = sortElements(ICH_ELEMENTS.filter(matchesFilters));

    if (counter) {
      counter.textContent = matches.length === ICH_ELEMENTS.length
        ? 'Showing all ' + ICH_ELEMENTS.length + ' elements'
        : 'Showing ' + matches.length + ' of ' + ICH_ELEMENTS.length + ' elements';
    }
    if (empty) empty.hidden = matches.length !== 0;

    grid.innerHTML = matches.map(function (element) {
      const proclaimed = element.proclaimed
        ? '<span class="element-proclaimed">Proclaimed a Masterpiece in ' + element.proclaimed + '</span>'
        : '';

      return '<article class="element-card animate-on-scroll domain-' + escapeHtml(element.domain) + '" ' +
          'tabindex="0" role="button" data-name="' + escapeHtml(element.name) + '" ' +
          'aria-label="View details for ' + escapeHtml(element.name) + '">' +
        '<div class="element-head">' +
          '<span class="element-icon" aria-hidden="true">' + element.icon + '</span>' +
          '<span class="element-year">' + element.year + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(element.name) + '</h3>' +
        '<p class="element-state">📍 ' + escapeHtml(element.state) + '</p>' +
        '<p class="element-tagline">' + escapeHtml(element.tagline) + '</p>' +
        '<p class="element-community"><strong>Held by:</strong> ' + escapeHtml(element.community) + '</p>' +
        proclaimed +
        '<div class="element-meta">' +
          '<span class="pill pill-domain">' + lookup(ICH_DOMAINS, element.domain, 'icon') + ' ' +
            escapeHtml(lookup(ICH_DOMAINS, element.domain, 'name')) + '</span>' +
        '</div>' +
        '<span class="element-cta">Full profile →</span>' +
        '</article>';
    }).join('');

    revealVisible();
  }

  /* -------------------------------------------------------------- timeline */

  function renderTimeline() {
    const track = document.getElementById('timeline-track');
    if (!track) return;

    track.innerHTML = ICH_TIMELINE.map(function (entry, index) {
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

  /* ------------------------------------------------------- static sections */

  function renderProcess() {
    const grid = document.getElementById('process-grid');
    if (!grid) return;

    grid.innerHTML = ICH_PROCESS.map(function (item) {
      return '<article class="process-card animate-on-scroll">' +
        '<span class="process-step">' + escapeHtml(item.step) + '</span>' +
        '<span class="process-icon" aria-hidden="true">' + item.icon + '</span>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderMyths() {
    const grid = document.getElementById('myth-grid');
    if (!grid) return;

    grid.innerHTML = ICH_MYTHS.map(function (item) {
      return '<article class="myth-card animate-on-scroll">' +
        '<div class="myth-icon">' + item.icon + '</div>' +
        '<p class="myth-claim"><span class="myth-label">Claim</span>' + escapeHtml(item.myth) + '</p>' +
        '<p class="myth-reality"><span class="reality-label">Actually</span>' + escapeHtml(item.reality) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderSafeguarding() {
    const grid = document.getElementById('safeguard-grid');
    if (!grid) return;

    grid.innerHTML = ICH_SAFEGUARD.map(function (item) {
      return '<article class="safeguard-card animate-on-scroll">' +
        '<div class="safeguard-icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = ICH_GALLERY.map(function (item) {
      return '<figure class="gallery-item animate-on-scroll">' +
        '<div class="gallery-visual" aria-hidden="true">' + item.icon + '</div>' +
        '<figcaption><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.caption) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  function renderFacts() {
    const grid = document.getElementById('facts-grid');
    if (!grid) return;

    grid.innerHTML = ICH_FACTS.map(function (fact, index) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-number">' + (index + 1) + '</span>' +
        '<p>' + escapeHtml(fact) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ----------------------------------------------------------------- modal */

  function bindModal() {
    const grid = document.getElementById('element-grid');
    const modal = document.getElementById('ic-modal');
    if (!grid || !modal) return;

    grid.addEventListener('click', function (event) {
      const card = event.target.closest('.element-card');
      if (card) openModal(card.getAttribute('data-name'));
    });

    grid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('.element-card');
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
    const element = ICH_ELEMENTS.filter(function (item) { return item.name === name; })[0];
    const modal = document.getElementById('ic-modal');
    if (!element || !modal) return;

    lastFocused = document.activeElement;

    document.getElementById('modal-icon').textContent = element.icon;
    document.getElementById('modal-title').textContent = element.name;
    document.getElementById('modal-tagline').textContent = element.tagline;
    document.getElementById('modal-desc').textContent = element.desc;
    document.getElementById('modal-detail').textContent = element.detail;
    document.getElementById('modal-status').textContent = element.status;

    document.getElementById('modal-meta').innerHTML =
      '<span class="pill pill-year">Inscribed ' + element.year + '</span>' +
      '<span class="pill pill-domain">' + lookup(ICH_DOMAINS, element.domain, 'icon') + ' ' +
        escapeHtml(lookup(ICH_DOMAINS, element.domain, 'name')) + '</span>' +
      '<span class="pill pill-region">' + lookup(ICH_REGIONS, element.region, 'icon') + ' ' +
        escapeHtml(lookup(ICH_REGIONS, element.region, 'name')) + '</span>';

    const specs = [
      { label: 'Year inscribed', value: String(element.year) },
      { label: 'Domain', value: lookup(ICH_DOMAINS, element.domain, 'name') },
      { label: 'State / region', value: element.state },
      { label: 'Community', value: element.community },
    ];

    if (element.proclaimed) {
      specs.push({
        label: 'Earlier recognition',
        value: 'Proclaimed a Masterpiece of the Oral and Intangible Heritage of Humanity in ' + element.proclaimed,
      });
    }

    document.getElementById('modal-specs').innerHTML = specs.map(function (spec) {
      return '<dt>' + escapeHtml(spec.label) + '</dt><dd>' + escapeHtml(spec.value) + '</dd>';
    }).join('');

    modal.hidden = false;
    document.body.classList.add('modal-open');
    const close = document.getElementById('modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    const modal = document.getElementById('ic-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ------------------------------------------------------------------ quiz */

  function renderQuiz() {
    const section = document.getElementById('quiz-section');
    if (!section) return;

    if (quizState.current >= ICH_QUIZ.length) {
      const pct = Math.round((quizState.score / ICH_QUIZ.length) * 100);
      const verdict = pct === 100 ? 'Perfect score — including what inscription actually does.'
        : pct >= 75 ? 'Strong result. The comparison table is worth one more look.'
        : pct >= 50 ? 'A reasonable start. Try the fifteen element cards again.'
        : 'Worth another pass through the sections above.';

      section.innerHTML =
        '<div class="quiz-result">' +
          '<div class="quiz-score">' + quizState.score + ' / ' + ICH_QUIZ.length + '</div>' +
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

    const question = ICH_QUIZ[quizState.current];
    section.innerHTML =
      '<div class="quiz-progress">Question ' + (quizState.current + 1) + ' of ' + ICH_QUIZ.length +
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
        (quizState.current === ICH_QUIZ.length - 1 ? 'See Result' : 'Next Question') + '</button>';

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
