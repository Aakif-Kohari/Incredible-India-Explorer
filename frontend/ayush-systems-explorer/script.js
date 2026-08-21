/* ==========================================================================
   AYUSH TRADITIONAL MEDICINE SYSTEMS EXPLORER — INTERACTION LAYER
   Vanilla JS, no dependencies. Everything renders from data.js.
   ========================================================================== */

(function () {
  'use strict';

  const DEFAULT_FILTERS = { search: '', system: 'all', category: 'all' };

  let filters = Object.assign({}, DEFAULT_FILTERS);
  let quizState = { current: 0, score: 0, answered: false };
  let lastFocused = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof AY_SYSTEMS === 'undefined') {
      console.error('ayush-systems-explorer: data.js failed to load');
      return;
    }
    renderHeroStats();
    renderSystems();
    renderComparisonTable();
    renderChips('system-chips', 'system', AY_SYSTEMS.map(function (item) {
      return { value: item.key, label: item.name, icon: item.icon };
    }));
    renderChips('category-chips', 'category', AY_CATEGORIES.map(function (item) {
      return { value: item.key, label: item.name, icon: item.icon };
    }));
    renderPractices();
    renderTexts();
    renderTimeline();
    renderInstitutions();
    renderEvidence();
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

  /* ------------------------------------------------------------ hero stats */

  function renderHeroStats() {
    setText('stat-systems', AY_SYSTEMS.length);
    setText('stat-practices', AY_PRACTICES.length);
    setText('stat-texts', AY_TEXTS.length);
  }

  /* -------------------------------------------------------- system cards */

  function renderSystems() {
    const grid = document.getElementById('system-grid');
    if (!grid) return;

    grid.innerHTML = AY_SYSTEMS.map(function (system) {
      const count = AY_PRACTICES.filter(function (practice) {
        return practice.system === system.key;
      }).length;

      return '<article class="system-card animate-on-scroll" tabindex="0" role="button" ' +
          'data-system="' + escapeHtml(system.key) + '" ' +
          'aria-label="View details for ' + escapeHtml(system.name) + '">' +
        '<div class="system-head">' +
          '<span class="system-icon" aria-hidden="true">' + system.icon + '</span>' +
          '<span class="system-degree">' + escapeHtml(system.degree) + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(system.name) + '</h3>' +
        '<p class="system-meaning">' + escapeHtml(system.meaning) + '</p>' +
        '<p class="system-tagline">' + escapeHtml(system.tagline) + '</p>' +
        '<dl class="system-mini">' +
          '<dt>Origin</dt><dd>' + escapeHtml(system.origin) + '</dd>' +
          '<dt>Basis</dt><dd>' + escapeHtml(system.basis) + '</dd>' +
        '</dl>' +
        '<span class="system-count">' + count + ' practices catalogued</span>' +
        '<span class="system-cta">Full profile →</span>' +
        '</article>';
    }).join('');
  }

  /* ----------------------------------------------------- comparison table */

  function renderComparisonTable() {
    const body = document.getElementById('compare-body');
    if (!body) return;

    body.innerHTML = AY_COMPARISON.map(function (row) {
      return '<tr>' +
        '<th scope="row">' + escapeHtml(row.system) + '</th>' +
        '<td>' + escapeHtml(row.origin) + '</td>' +
        '<td>' + escapeHtml(row.period) + '</td>' +
        '<td>' + escapeHtml(row.theory) + '</td>' +
        '<td>' + escapeHtml(row.diagnosis) + '</td>' +
        '<td>' + escapeHtml(row.materia) + '</td>' +
        '<td class="cell-degree">' + escapeHtml(row.degree) + '</td>' +
        '</tr>';
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
    renderPractices();
  }

  function syncChips() {
    ['system', 'category'].forEach(function (key) {
      const chips = document.querySelectorAll('[data-filter="' + key + '"]');
      Array.prototype.forEach.call(chips, function (chip) {
        const active = chip.getAttribute('data-value') === filters[key];
        chip.classList.toggle('active', active);
        chip.setAttribute('aria-pressed', String(active));
      });
    });
  }

  function bindSearch() {
    const input = document.getElementById('ay-search');
    const reset = document.getElementById('reset-filters');

    if (input) {
      input.addEventListener('input', function () {
        filters.search = input.value.trim().toLowerCase();
        renderPractices();
      });
    }

    if (reset) {
      reset.addEventListener('click', function () {
        filters = Object.assign({}, DEFAULT_FILTERS);
        if (input) input.value = '';
        syncChips();
        renderPractices();
      });
    }
  }

  /* -------------------------------------------------------- practice cards */

  function matchesFilters(practice) {
    if (filters.system !== 'all' && practice.system !== filters.system) return false;
    if (filters.category !== 'all' && practice.category !== filters.category) return false;
    if (!filters.search) return true;

    const haystack = [practice.name, practice.term, practice.desc,
      lookup(AY_SYSTEMS, practice.system, 'name'),
      lookup(AY_CATEGORIES, practice.category, 'name')]
      .join(' ')
      .toLowerCase();

    return haystack.indexOf(filters.search) !== -1;
  }

  function renderPractices() {
    const grid = document.getElementById('practice-grid');
    const empty = document.getElementById('empty-state');
    const counter = document.getElementById('result-count');
    if (!grid) return;

    const matches = AY_PRACTICES.filter(matchesFilters);

    if (counter) {
      counter.textContent = matches.length === AY_PRACTICES.length
        ? 'Showing all ' + AY_PRACTICES.length + ' practices'
        : 'Showing ' + matches.length + ' of ' + AY_PRACTICES.length + ' practices';
    }
    if (empty) empty.hidden = matches.length !== 0;

    grid.innerHTML = matches.map(function (practice) {
      return '<article class="practice-card animate-on-scroll system-' + escapeHtml(practice.system) + '">' +
        '<div class="practice-head">' +
          '<h3>' + escapeHtml(practice.name) + '</h3>' +
          '<span class="practice-term">' + escapeHtml(practice.term) + '</span>' +
        '</div>' +
        '<p>' + escapeHtml(practice.desc) + '</p>' +
        '<div class="practice-meta">' +
          '<span class="pill pill-system">' + lookup(AY_SYSTEMS, practice.system, 'icon') + ' ' +
            escapeHtml(lookup(AY_SYSTEMS, practice.system, 'name')) + '</span>' +
          '<span class="pill pill-category">' + lookup(AY_CATEGORIES, practice.category, 'icon') + ' ' +
            escapeHtml(lookup(AY_CATEGORIES, practice.category, 'name')) + '</span>' +
        '</div>' +
        '</article>';
    }).join('');

    revealVisible();
  }

  /* ------------------------------------------------------------- sections */

  function renderTexts() {
    const grid = document.getElementById('text-grid');
    if (!grid) return;

    grid.innerHTML = AY_TEXTS.map(function (text) {
      return '<article class="text-card animate-on-scroll">' +
        '<span class="text-system">' + escapeHtml(text.system) + '</span>' +
        '<h3>' + escapeHtml(text.title) + '</h3>' +
        '<p class="text-author">' + escapeHtml(text.author) + ' · <em>' + escapeHtml(text.lang) + '</em></p>' +
        '<p>' + escapeHtml(text.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderTimeline() {
    const track = document.getElementById('timeline-track');
    if (!track) return;

    track.innerHTML = AY_TIMELINE.map(function (entry, index) {
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

  function renderInstitutions() {
    const grid = document.getElementById('institution-grid');
    if (!grid) return;

    grid.innerHTML = AY_INSTITUTIONS.map(function (item) {
      return '<article class="institution-card animate-on-scroll">' +
        '<div class="institution-icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.name) + '</h3>' +
        '<p class="institution-year">' + escapeHtml(item.year) + '</p>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderEvidence() {
    const grid = document.getElementById('evidence-grid');
    if (!grid) return;

    grid.innerHTML = AY_EVIDENCE.map(function (item) {
      return '<article class="evidence-card evidence-' + escapeHtml(item.tone) + ' animate-on-scroll">' +
        '<div class="evidence-icon">' + item.icon + '</div>' +
        '<h3>' + escapeHtml(item.title) + '</h3>' +
        '<p>' + escapeHtml(item.desc) + '</p>' +
        '</article>';
    }).join('');
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = AY_GALLERY.map(function (item) {
      return '<figure class="gallery-item animate-on-scroll">' +
        '<div class="gallery-visual" aria-hidden="true">' + item.icon + '</div>' +
        '<figcaption><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.caption) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  function renderFacts() {
    const grid = document.getElementById('facts-grid');
    if (!grid) return;

    grid.innerHTML = AY_FACTS.map(function (fact, index) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-number">' + (index + 1) + '</span>' +
        '<p>' + escapeHtml(fact) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ----------------------------------------------------------------- modal */

  function bindModal() {
    const grid = document.getElementById('system-grid');
    const modal = document.getElementById('ay-modal');
    if (!grid || !modal) return;

    grid.addEventListener('click', function (event) {
      const card = event.target.closest('.system-card');
      if (card) openModal(card.getAttribute('data-system'));
    });

    grid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('.system-card');
      if (!card) return;
      event.preventDefault();
      openModal(card.getAttribute('data-system'));
    });

    const close = document.getElementById('modal-close');
    const backdrop = document.getElementById('modal-backdrop');
    if (close) close.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  function openModal(key) {
    const system = AY_SYSTEMS.filter(function (item) { return item.key === key; })[0];
    const modal = document.getElementById('ay-modal');
    if (!system || !modal) return;

    lastFocused = document.activeElement;

    document.getElementById('modal-icon').textContent = system.icon;
    document.getElementById('modal-title').textContent = system.name;
    document.getElementById('modal-meaning').textContent = system.meaning;
    document.getElementById('modal-tagline').textContent = system.tagline;
    document.getElementById('modal-desc').textContent = system.desc;
    document.getElementById('modal-note').textContent = system.note;

    const specs = [
      { label: 'Origin', value: system.origin },
      { label: 'Period', value: system.period },
      { label: 'Theoretical basis', value: system.basis },
      { label: 'Diagnostic method', value: system.diagnosis },
      { label: 'Materia medica', value: system.materia },
      { label: 'Degree awarded', value: system.degree },
    ];

    document.getElementById('modal-specs').innerHTML = specs.map(function (spec) {
      return '<dt>' + escapeHtml(spec.label) + '</dt><dd>' + escapeHtml(spec.value) + '</dd>';
    }).join('');

    document.getElementById('modal-branches').innerHTML = system.branches.map(function (branch) {
      return '<li>' + escapeHtml(branch) + '</li>';
    }).join('');

    modal.hidden = false;
    document.body.classList.add('modal-open');
    const close = document.getElementById('modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    const modal = document.getElementById('ay-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ------------------------------------------------------------------ quiz */

  function renderQuiz() {
    const section = document.getElementById('quiz-section');
    if (!section) return;

    if (quizState.current >= AY_QUIZ.length) {
      const pct = Math.round((quizState.score / AY_QUIZ.length) * 100);
      const verdict = pct === 100 ? 'Perfect score. You have read the distinctions, not just the acronym.'
        : pct >= 75 ? 'Strong result — the comparison table is worth one more look.'
        : pct >= 50 ? 'A reasonable start. Try the six system cards again.'
        : 'Worth another pass through the sections above.';

      section.innerHTML =
        '<div class="quiz-result">' +
          '<div class="quiz-score">' + quizState.score + ' / ' + AY_QUIZ.length + '</div>' +
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

    const question = AY_QUIZ[quizState.current];
    section.innerHTML =
      '<div class="quiz-progress">Question ' + (quizState.current + 1) + ' of ' + AY_QUIZ.length +
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
        (quizState.current === AY_QUIZ.length - 1 ? 'See Result' : 'Next Question') + '</button>';

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
