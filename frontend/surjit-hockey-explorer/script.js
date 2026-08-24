/**
 * Surjit Hockey Explorer - Interactive Script (#2527)
 * Handles tab navigation, theme toggle, smooth scrolling, scroll animations,
 * hero count-up and the interactive player & tournament timeline.
 */
document.addEventListener('DOMContentLoaded', function () {
    initTabNavigation();
    initThemeToggle();
    initSmoothScroll();
    initMobileMenu();
    initCountUp();
    initScrollUI();
    initFooterTabs();
    initTyping();
    renderTeams();
    renderPlayers();
    renderWinners();
    renderMilestones();
    initTimeline();
});

/**
 * Activate a tab section by its id (shared by the tab bar and footer links)
 */
function activateTab(targetTab) {
    var tabs = document.querySelectorAll('.sh-tab');
    var sections = document.querySelectorAll('.sh-section');
    if (!tabs.length || !sections.length) return;

    tabs.forEach(function (t) { t.classList.remove('active'); });
    sections.forEach(function (s) { s.classList.remove('active'); });

    var tab = document.querySelector('.sh-tab[data-tab="' + targetTab + '"]');
    var section = document.getElementById(targetTab);
    if (tab) tab.classList.add('active');
    if (section) {
        section.classList.add('active');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Initialize tab navigation for the different sections
 */
function initTabNavigation() {
    document.querySelectorAll('.sh-tab').forEach(function (tab) {
        tab.addEventListener('click', function () { activateTab(tab.dataset.tab); });
    });
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    var themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    updateThemeIcon(localStorage.getItem('theme') || 'dark');

    themeToggle.addEventListener('click', function () {
        var body = document.body;
        var isLight = body.classList.contains('light-theme');

        if (isLight) {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }
    });
}

/**
 * Update theme toggle icon
 */
function updateThemeIcon(theme) {
    var themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    themeToggle.textContent = theme === 'light' ? '\uD83C\uDF19' : '\u2600\uFE0F';
}

/**
 * Initialize smooth scroll for internal anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    var menuToggle = document.getElementById('menu-toggle');
    var navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!isExpanded));
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * Animate count-up numbers when the hero enters the viewport
 */
function initCountUp() {
    var counters = document.querySelectorAll('.hero-stat .number[id]');
    if (!counters.length) return;

    var duration = 1600;
    var hero = document.querySelector('.sh-hero');

    var animate = function (counter) {
        var target = parseInt(counter.dataset.target, 10);
        if (isNaN(target)) return;
        var startTime = performance.now();

        var tick = function (now) {
            var progress = Math.min((now - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = String(Math.round(target * eased));
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                counter.textContent = String(target);
            }
        };
        requestAnimationFrame(tick);
    };

    var trigger = function (entries, obs) {
        var hasVisible = (entries || []).some(function (entry) { return entry.isIntersecting; });
        if (!hasVisible) return;
        if (obs && typeof obs.disconnect === 'function') obs.disconnect();
        counters.forEach(animate);
    };

    if (typeof IntersectionObserver !== 'undefined' && hero) {
        var observer = new IntersectionObserver(trigger, { threshold: 0.2 });
        observer.observe(hero);
    } else {
        counters.forEach(animate);
    }
}

/**
 * Scroll progress bar and back-to-top button
 */
function initScrollUI() {
    var progress = document.getElementById('scroll-progress');
    var btn = document.getElementById('btn-scroll-top');
    if (!progress && !btn) return;

    var update = function () {
        var doc = document.documentElement;
        var scrollTop = window.pageYOffset || doc.scrollTop;
        var max = doc.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = (max > 0 ? (scrollTop / max) * 100 : 0) + '%';
        if (btn) btn.classList.toggle('visible', scrollTop > 400);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();

    if (btn) {
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/**
 * Footer quick links activate the matching section tab
 */
function initFooterTabs() {
    document.querySelectorAll('.sh-footer-tab').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            activateTab(link.dataset.footerTab);
        });
    });
}

/**
 * Typewriter effect for rotating words in the hero
 */
function initTyping() {
    var el = document.querySelector('.sh-type[data-words]');
    if (!el) return;

    var words = [];
    try {
        words = JSON.parse(el.dataset.words);
    } catch (err) {
        return;
    }
    if (!Array.isArray(words) || !words.length) return;

    var prefersReducedMotion = typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        el.textContent = words[0];
        return;
    }

    var wordIdx = 0;
    var charIdx = 0;
    var deleting = false;

    var tick = function () {
        var word = words[wordIdx];
        el.textContent = word.slice(0, charIdx);

        if (!deleting && charIdx < word.length) {
            charIdx++;
            setTimeout(tick, 90);
        } else if (!deleting && charIdx === word.length) {
            setTimeout(function () {
                deleting = true;
                tick();
            }, 1700);
        } else if (deleting && charIdx > 0) {
            charIdx--;
            setTimeout(tick, 45);
        } else {
            deleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            setTimeout(tick, 350);
        }
    };

    tick();
}

var timelineMode = 'tournaments';

/**
 * Render team cards into #teams-grid
 */
function renderTeams() {
    var grid = document.getElementById('teams-grid');
    var data = window.SURJIT_DATA;
    if (!grid || !data || !Array.isArray(data.teams)) return;

    data.teams.forEach(function (t) {
        var card = document.createElement('article');
        card.className = 'team-card glass-card';

        var category = document.createElement('span');
        category.className = 'team-category';
        category.textContent = t.category;
        card.appendChild(category);

        var name = document.createElement('h3');
        name.className = 'team-name';
        name.textContent = t.name;
        card.appendChild(name);

        var note = document.createElement('p');
        note.textContent = t.note;
        card.appendChild(note);

        grid.appendChild(card);
    });
}

/**
 * Render the notable player cards into #players-grid
 */
function renderPlayers() {
    var grid = document.getElementById('players-grid');
    var data = window.SURJIT_DATA;
    if (!grid || !data || !Array.isArray(data.players)) return;

    data.players.forEach(function (p) {
        var card = document.createElement('article');
        card.className = 'player-card glass-card';

        var avatar = document.createElement('span');
        avatar.className = 'player-avatar';
        avatar.setAttribute('aria-hidden', 'true');
        avatar.textContent = p.initials || p.name.charAt(0);
        card.appendChild(avatar);

        var name = document.createElement('h3');
        name.className = 'player-name';
        name.textContent = p.name;
        card.appendChild(name);

        var meta = document.createElement('p');
        meta.className = 'player-meta';
        meta.textContent = p.role + ' \u00B7 Era: ' + (p.era || '-');
        card.appendChild(meta);

        var highlight = document.createElement('p');
        highlight.className = 'player-highlight';
        highlight.textContent = p.highlight;
        card.appendChild(highlight);

        grid.appendChild(card);
    });
}

/**
 * Build one result row element for a tournament edition
 */
function buildResultItem(t) {
    var item = document.createElement('article');
    item.className = 'timeline-item result-item glass-card';

    var year = document.createElement('span');
    year.className = 'timeline-year';
    year.textContent = t.edition ? t.year + ' \u00B7 ' + t.edition : String(t.year);
    item.appendChild(year);

    var venue = document.createElement('h3');
    venue.textContent = t.venue;
    item.appendChild(venue);

    var champ = document.createElement('p');
    champ.className = 'champion-line';
    champ.innerHTML = '<strong>Champion:</strong> ' + t.champion;
    item.appendChild(champ);

    var runner = document.createElement('p');
    runner.innerHTML = '<strong>Runner-up:</strong> ' + t.runnerUp;
    item.appendChild(runner);

    var note = document.createElement('p');
    note.className = 'result-note';
    note.textContent = t.note;
    item.appendChild(note);

    return item;
}

/**
 * Render winners into #winners-list
 */
function renderWinners() {
    var list = document.getElementById('winners-list');
    var data = window.SURJIT_DATA;
    if (!list || !data || !Array.isArray(data.tournaments)) return;

    data.tournaments.forEach(function (t) {
        list.appendChild(buildResultItem(t));
    });
}

/**
 * Render milestones into #milestones-list
 */
function renderMilestones() {
    var list = document.getElementById('milestones-list');
    var data = window.SURJIT_DATA;
    if (!list || !data || !Array.isArray(data.milestones)) return;

    data.milestones.forEach(function (m) {
        var li = document.createElement('li');
        li.className = 'milestone-item glass-card';

        var year = document.createElement('span');
        year.className = 'milestone-year';
        year.textContent = m.year;
        li.appendChild(year);

        var title = document.createElement('h3');
        title.textContent = m.title;
        li.appendChild(title);

        var text = document.createElement('p');
        text.textContent = m.text;
        li.appendChild(text);

        list.appendChild(li);
    });
}

/**
 * Show details for a selected timeline entry in the detail panel
 */
function showTimelineDetail(entry) {
    var panel = document.getElementById('timeline-detail');
    if (!panel) return;

    panel.innerHTML = '';
    Object.keys(entry).forEach(function (key) {
        var value = entry[key];
        if (value === null || value === undefined || value === '') return;
        var line = document.createElement('p');
        line.className = 'detail-' + key;
        line.innerHTML = '<strong>' + key.toUpperCase() + ':</strong> ' + value;
        panel.appendChild(line);
    });

    panel.hidden = false;
}

/**
 * Select handler shared by both timeline modes
 */
function selectTimelineEntry(mode, index) {
    var data = window.SURJIT_DATA;
    if (!data) return;

    var collection = mode === 'players' ? data.players : data.tournaments;
    if (!Array.isArray(collection) || !collection[index]) return;

    showTimelineDetail(collection[index]);

    document.querySelectorAll('#timeline-container .timeline-entry').forEach(function (el, i) {
        el.classList.toggle('selected', i === index);
    });

    var panel = document.getElementById('timeline-detail');
    if (panel) panel.focus({ preventScroll: true });
}

/**
 * Render the tournament timeline into #timeline-container
 */
function renderTournamentTimeline() {
    var container = document.getElementById('timeline-container');
    var data = window.SURJIT_DATA;
    if (!container || !data || !Array.isArray(data.tournaments)) return;

    container.innerHTML = '';
    data.tournaments.forEach(function (t, i) {
        var el = buildResultItem(t);
        el.classList.add('timeline-entry');
        el.classList.toggle('selected', timelineMode === 'tournaments' && i === 0);

        var actionHint = document.createElement('button');
        actionHint.type = 'button';
        actionHint.className = 'timeline-open-btn';
        actionHint.dataset.index = String(i);
        actionHint.textContent = 'View details';
        actionHint.setAttribute('aria-label', 'View details of the ' + t.year + ' Surjit Hockey final');
        el.appendChild(actionHint);

        container.appendChild(el);
    });
}

/**
 * Render the player timeline into #timeline-container
 */
function renderPlayerTimeline() {
    var container = document.getElementById('timeline-container');
    var data = window.SURJIT_DATA;
    if (!container || !data || !Array.isArray(data.players)) return;

    container.innerHTML = '';
    data.players.forEach(function (p, i) {
        var el = document.createElement('article');
        el.className = 'timeline-item timeline-entry player-timeline-item glass-card';
        el.classList.toggle('selected', timelineMode === 'players' && i === 0);

        var head = document.createElement('div');
        head.className = 'timeline-head';

        var avatar = document.createElement('span');
        avatar.className = 'player-avatar small';
        avatar.setAttribute('aria-hidden', 'true');
        avatar.textContent = p.initials || p.name.charAt(0);
        head.appendChild(avatar);

        var name = document.createElement('h3');
        name.textContent = p.name;
        head.appendChild(name);

        var role = document.createElement('span');
        role.className = 'timeline-role';
        role.textContent = p.role;
        head.appendChild(role);

        el.appendChild(head);

        var era = document.createElement('p');
        era.innerHTML = '<strong>Era:</strong> ' + (p.era || '-');
        el.appendChild(era);

        var actionHint = document.createElement('button');
        actionHint.type = 'button';
        actionHint.className = 'timeline-open-btn';
        actionHint.dataset.index = String(i);
        actionHint.textContent = 'View details';
        actionHint.setAttribute('aria-label', 'View details of ' + p.name);
        el.appendChild(actionHint);

        container.appendChild(el);
    });
}

/**
 * Initialize the interactive Punjab hockey timeline:
 * mode toggle buttons plus delegated click handling on entries
 */
function initTimeline() {
    var btnTournaments = document.getElementById('btn-mode-tournaments');
    var btnPlayers = document.getElementById('btn-mode-players');
    var container = document.getElementById('timeline-container');
    if (!btnTournaments || !btnPlayers || !container) return;

    var setMode = function (mode) {
        timelineMode = mode;

        var isTournaments = mode === 'tournaments';
        btnTournaments.classList.toggle('active', isTournaments);
        btnPlayers.classList.toggle('active', !isTournaments);
        btnTournaments.setAttribute('aria-pressed', String(isTournaments));
        btnPlayers.setAttribute('aria-pressed', String(!isTournaments));

        var panel = document.getElementById('timeline-detail');
        if (panel) panel.hidden = true;

        if (isTournaments) {
            renderTournamentTimeline();
        } else {
            renderPlayerTimeline();
        }
    };

    btnTournaments.addEventListener('click', function () { setMode('tournaments'); });
    btnPlayers.addEventListener('click', function () { setMode('players'); });

    container.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('.timeline-open-btn') : null;
        if (!btn) return;
        var entryEl = btn.closest('.timeline-entry');
        var index = Array.prototype.indexOf.call(container.querySelectorAll('.timeline-entry'), entryEl);
        if (index >= 0) selectTimelineEntry(timelineMode, index);
    });

    renderTournamentTimeline();
}
