/* ==========================================================================
   INDIAN TRADITIONAL MARTIAL ARTS EXPLORER — INTERACTION LAYER
   Vanilla JS, no dependencies. Everything renders from data.js.
   ========================================================================== */

(function () {
  'use strict';

  var filters = { search: '', region: 'all', weapon: 'all', status: 'all' };
  var quizState = { current: 0, score: 0, answered: false };
  var lastFocused = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof MARTIAL_ARTS === 'undefined') {
      console.error('martial-arts-explorer: data.js failed to load');
      return;
    }
    renderHeroStats();
    renderStatusLegend();
    renderStatusChart();
    renderChips('region-chips', 'region', MA_REGIONS.map(toChip));
    renderChips('weapon-chips', 'weapon', MA_WEAPON_CLASSES.map(toChip));
    renderChips('status-chips', 'status', Object.keys(MA_STATUS).map(function (key) {
      return { value: key, label: MA_STATUS[key].label, icon: '' };
    }));
    renderArts();
    renderWeapons();
    renderTimeline();
    renderInfoGrid('revival-grid', MA_REVIVAL);
    renderInfoGrid('threats-grid', MA_THREATS);
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
    return { value: item.key, label: item.name, icon: item.icon || '' };
  }

  function regionName(key) {
    for (var i = 0; i < MA_REGIONS.length; i++) {
      if (MA_REGIONS[i].key === key) return MA_REGIONS[i].name;
    }
    return key;
  }

  function weaponClassName(key) {
    for (var i = 0; i < MA_WEAPON_CLASSES.length; i++) {
      if (MA_WEAPON_CLASSES[i].key === key) return MA_WEAPON_CLASSES[i].name;
    }
    return key;
  }

  function countByStatus(key) {
    return MARTIAL_ARTS.filter(function (art) { return art.status === key; }).length;
  }

  /* ------------------------------------------------------------ hero stats */

  function renderHeroStats() {
    var states = {};
    MARTIAL_ARTS.forEach(function (art) { states[art.state] = true; });

    setText('stat-arts', MARTIAL_ARTS.length);
    setText('stat-states', Object.keys(states).length);
    setText('stat-weapons', MA_WEAPONS.length);
    setText('stat-risk', countByStatus('endangered'));
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  /* ------------------------------------------------------ status sections */

  function renderStatusLegend() {
    var container = document.getElementById('status-legend');
    if (!container) return;
    container.innerHTML = Object.keys(MA_STATUS).map(function (key) {
      var status = MA_STATUS[key];
      return '<div class="status-card status-' + status.tone + ' animate-on-scroll">' +
        '<span class="status-dot" aria-hidden="true"></span>' +
        '<h3>' + escapeHtml(status.label) + '</h3>' +
        '<p>' + escapeHtml(status.desc) + '</p>' +
        '<span class="status-count">' + countByStatus(key) + ' of ' + MARTIAL_ARTS.length + '</span>' +
        '</div>';
    }).join('');
  }

  function renderStatusChart() {
    var bar = document.getElementById('status-bar');
    var key = document.getElementById('status-key');
    if (!bar || !key) return;

    var total = MARTIAL_ARTS.length || 1;
    bar.innerHTML = Object.keys(MA_STATUS).map(function (statusKey) {
      var count = countByStatus(statusKey);
      var pct = (count / total) * 100;
      return '<span class="stacked-seg seg-' + MA_STATUS[statusKey].tone + '" ' +
        'style="width:' + pct.toFixed(1) + '%" title="' + escapeHtml(MA_STATUS[statusKey].label) +
        ': ' + count + '"></span>';
    }).join('');

    key.innerHTML = Object.keys(MA_STATUS).map(function (statusKey) {
      var count = countByStatus(statusKey);
      return '<span class="key-item">' +
        '<span class="key-swatch seg-' + MA_STATUS[statusKey].tone + '"></span>' +
        escapeHtml(MA_STATUS[statusKey].label) + ' — ' + count +
        '</span>';
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
    renderArts();
  }

  function syncChips() {
    ['region', 'weapon', 'status'].forEach(function (key) {
      var chips = document.querySelectorAll('[data-filter="' + key + '"]');
      Array.prototype.forEach.call(chips, function (chip) {
        chip.classList.toggle('active', chip.getAttribute('data-value') === filters[key]);
      });
    });
  }

  function bindSearch() {
    var input = document.getElementById('ma-search');
    var reset = document.getElementById('reset-filters');
    if (input) {
      input.addEventListener('input', function () {
        filters.search = input.value.trim().toLowerCase();
        renderArts();
      });
    }
    if (reset) {
      reset.addEventListener('click', function () {
        filters = { search: '', region: 'all', weapon: 'all', status: 'all' };
        if (input) input.value = '';
        syncChips();
        renderArts();
      });
    }
  }

  /* ----------------------------------------------------------------- cards */

  function matchesFilters(art) {
    if (filters.region !== 'all' && art.region !== filters.region) return false;
    if (filters.status !== 'all' && art.status !== filters.status) return false;
    if (filters.weapon !== 'all' && art.weaponClasses.indexOf(filters.weapon) === -1) return false;
    if (!filters.search) return true;
    var haystack = [art.name, art.state, art.tagline, art.summary, art.era, art.where]
      .concat(art.weapons)
      .join(' ')
      .toLowerCase();
    return haystack.indexOf(filters.search) !== -1;
  }

  function renderArts() {
    var grid = document.getElementById('art-grid');
    var empty = document.getElementById('empty-state');
    var counter = document.getElementById('result-count');
    if (!grid) return;

    var matches = MARTIAL_ARTS.filter(matchesFilters);

    if (counter) {
      counter.textContent = matches.length === MARTIAL_ARTS.length
        ? 'Showing all ' + MARTIAL_ARTS.length + ' martial arts'
        : 'Showing ' + matches.length + ' of ' + MARTIAL_ARTS.length + ' martial arts';
    }
    if (empty) empty.hidden = matches.length !== 0;

    grid.innerHTML = matches.map(function (art) {
      var status = MA_STATUS[art.status];
      var classes = art.weaponClasses.map(function (key) {
        return '<span class="pill pill-weapon">' + escapeHtml(weaponClassName(key)) + '</span>';
      }).join('');
      return '<article class="art-card animate-on-scroll" tabindex="0" role="button" ' +
          'data-name="' + escapeHtml(art.name) + '" ' +
          'aria-label="View details for ' + escapeHtml(art.name) + '">' +
        '<div class="art-head">' +
          '<span class="art-icon" aria-hidden="true">' + art.icon + '</span>' +
          '<span class="status-badge status-' + status.tone + '">' + escapeHtml(status.label) + '</span>' +
        '</div>' +
        '<h3>' + escapeHtml(art.name) + '</h3>' +
        '<p class="art-tagline">' + escapeHtml(art.tagline) + '</p>' +
        '<p class="art-summary">' + escapeHtml(art.summary) + '</p>' +
        '<div class="art-meta">' +
          '<span class="pill pill-state">📍 ' + escapeHtml(art.state) + '</span>' +
          '<span class="pill pill-region">' + escapeHtml(regionName(art.region)) + '</span>' +
        '</div>' +
        '<div class="art-meta art-weapon-row">' + classes + '</div>' +
        '<span class="art-cta">View training stages →</span>' +
        '</article>';
    }).join('');

    revealVisible();
  }

  /* --------------------------------------------------------------- weapons */

  function renderWeapons() {
    var grid = document.getElementById('weapon-grid');
    if (!grid) return;
    grid.innerHTML = MA_WEAPONS.map(function (weapon) {
      return '<div class="weapon-card animate-on-scroll">' +
        '<div class="weapon-icon">' + weapon.icon + '</div>' +
        '<h3>' + escapeHtml(weapon.name) + '</h3>' +
        '<p class="weapon-origin">' + escapeHtml(weapon.origin) + ' · ' + escapeHtml(weapon.art) + '</p>' +
        '<p>' + escapeHtml(weapon.desc) + '</p>' +
        '</div>';
    }).join('');
  }

  /* -------------------------------------------------------------- timeline */

  function renderTimeline() {
    var timeline = document.getElementById('ma-timeline');
    if (!timeline) return;
    timeline.innerHTML = MA_TIMELINE.map(function (entry, index) {
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

  /* ---------------------------------------------------- info, facts, media */

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
    grid.innerHTML = MA_GALLERY.map(function (item) {
      return '<figure class="gallery-item animate-on-scroll">' +
        '<div class="gallery-visual" aria-hidden="true">' + item.icon + '</div>' +
        '<figcaption><strong>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.caption) + '</span></figcaption>' +
        '</figure>';
    }).join('');
  }

  function renderFacts() {
    var grid = document.getElementById('facts-grid');
    if (!grid) return;
    grid.innerHTML = MA_FACTS.map(function (fact, index) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-number">' + (index + 1) + '</span>' +
        '<p>' + escapeHtml(fact) + '</p>' +
        '</div>';
    }).join('');
  }

  /* ----------------------------------------------------------------- modal */

  function bindModal() {
    var grid = document.getElementById('art-grid');
    var modal = document.getElementById('ma-modal');
    if (!grid || !modal) return;

    grid.addEventListener('click', function (event) {
      var card = event.target.closest('.art-card');
      if (card) openModal(card.getAttribute('data-name'));
    });

    grid.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      var card = event.target.closest('.art-card');
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
    var art = MARTIAL_ARTS.filter(function (a) { return a.name === name; })[0];
    var modal = document.getElementById('ma-modal');
    if (!art || !modal) return;

    lastFocused = document.activeElement;
    var status = MA_STATUS[art.status];

    document.getElementById('modal-icon').textContent = art.icon;
    document.getElementById('modal-title').textContent = art.name;
    document.getElementById('modal-tagline').textContent = art.tagline;
    document.getElementById('modal-summary').textContent = art.summary;
    document.getElementById('modal-where').textContent = art.where;
    document.getElementById('modal-note').textContent = art.note;

    document.getElementById('modal-meta').innerHTML =
      '<span class="pill pill-state">📍 ' + escapeHtml(art.state) + '</span>' +
      '<span class="pill pill-region">' + escapeHtml(regionName(art.region)) + '</span>' +
      '<span class="status-badge status-' + status.tone + '">' + escapeHtml(status.label) + '</span>' +
      '<span class="pill pill-era">🕰️ ' + escapeHtml(art.era) + '</span>';

    document.getElementById('modal-stages').innerHTML = art.stages.map(function (stage) {
      return '<li><strong>' + escapeHtml(stage.name) + '</strong><span>' + escapeHtml(stage.desc) + '</span></li>';
    }).join('');

    document.getElementById('modal-weapons').innerHTML = art.weapons.map(function (weapon) {
      return '<li>' + escapeHtml(weapon) + '</li>';
    }).join('');

    modal.hidden = false;
    document.body.classList.add('modal-open');
    var close = document.getElementById('modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    var modal = document.getElementById('ma-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  /* ------------------------------------------------------------------ quiz */

  function renderQuiz() {
    var section = document.getElementById('quiz-section');
    if (!section) return;

    if (quizState.current >= MA_QUIZ.length) {
      var pct = Math.round((quizState.score / MA_QUIZ.length) * 100);
      var verdict = pct === 100 ? 'Perfect — you could teach this page.'
        : pct >= 75 ? 'Strong result. A couple of details to revisit.'
        : pct >= 50 ? 'Decent start — the timeline is worth a second read.'
        : 'Worth another pass through the cards above.';
      section.innerHTML =
        '<div class="quiz-result">' +
          '<div class="quiz-score">' + quizState.score + ' / ' + MA_QUIZ.length + '</div>' +
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

    var question = MA_QUIZ[quizState.current];
    section.innerHTML =
      '<div class="quiz-progress">Question ' + (quizState.current + 1) + ' of ' + MA_QUIZ.length +
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
        (quizState.current === MA_QUIZ.length - 1 ? 'See Result' : 'Next Question') + '</button>';

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
