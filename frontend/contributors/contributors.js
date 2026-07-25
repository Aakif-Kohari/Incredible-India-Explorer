(function () {
    'use strict';

    var API_BASE = 'https://api.github.com/repos/Eshajha19/Incredible-India-Explorer';
    var CONTRIBUTORS_API = API_BASE + '/contributors';
    var REPO_API = API_BASE;
    var PER_PAGE = 100;
    var PAGE_SIZE = 15;
    var REFRESH_INTERVAL = 5 * 60 * 1000;

    var MAINTAINERS = [
        {
            login: 'Eshajha19',
            role: 'Project Owner',
            bio: 'Creator and lead maintainer of Incredible India Explorer.'
        }
    ];

    var HALL_OF_FAME = {
        ecsoc: {
            label: 'ECSoC 2026',
            desc: 'Elite Coders Summer of Code \u2014 contributors who participated in the 2026 edition.',
            participants: ['Eshajha19']
        }
    };

    var ECSOC_LOGO = 'https://github.com/elite-coders-xyz.png';

    var state = {
        all: [],
        filtered: [],
        sort: 'contributions',
        query: '',
        badge: 'all',
        page: 1,
        repo: null,
        refreshTimer: null
    };

    /* ---- DOM ---- */
    function $(id) {
        return document.getElementById(id);
    }

    function selAll(selector) {
        return document.querySelectorAll(selector);
    }

    /* ---- Helpers ---- */
    function show(el) {
        if (el) el.classList.remove('hidden');
    }

    function hide(el) {
        if (el) el.classList.add('hidden');
    }

    function esc(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str || ''));
        return div.innerHTML;
    }

    function findContributor(login) {
        for (var i = 0; i < state.all.length; i++) {
            if (state.all[i].login === login) return state.all[i];
        }
        return null;
    }

    /* ---- Animated Counter ---- */
    function animateCounter(el, target, duration) {
        if (!el || !target) {
            if (el) el.textContent = '0';
            return;
        }
        var startTime = null;
        function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString();
            }
        }
        requestAnimationFrame(step);
    }

    /* ---- Filter & Sort ---- */
    function applyFilters() {
        var query = state.query.toLowerCase().trim();
        var data = state.all.slice();

        if (query) {
            data = data.filter(function (c) {
                return c.login && c.login.toLowerCase().indexOf(query) !== -1;
            });
        }

        if (state.badge === 'maintainer') {
            var logins = MAINTAINERS.map(function (m) {
                return m.login;
            });
            data = data.filter(function (c) {
                return logins.indexOf(c.login) !== -1;
            });
        } else if (state.badge === 'ecsoc') {
            var ecsocLogins = HALL_OF_FAME.ecsoc.participants;
            data = data.filter(function (c) {
                return ecsocLogins.indexOf(c.login) !== -1;
            });
        }

        if (state.sort === 'contributions') {
            data.sort(function (a, b) {
                return (b.contributions || 0) - (a.contributions || 0);
            });
        } else if (state.sort === 'recent') {
            data.sort(function (a, b) {
                return (b.id || 0) - (a.id || 0);
            });
        } else if (state.sort === 'username') {
            data.sort(function (a, b) {
                return (a.login || '').toLowerCase().localeCompare((b.login || '').toLowerCase());
            });
        }

        state.filtered = data;
        state.page = 1;
        renderTable();
    }

    /* ---- Data Fetching ---- */
    function fetchAll() {
        var loading = $('clb-loading');
        var error = $('clb-error');
        var empty = $('clb-empty');
        var tableWrap = $('clb-table-wrap');

        show(loading);
        hide(error);
        hide(empty);
        hide(tableWrap);

        fetch(CONTRIBUTORS_API + '?per_page=' + PER_PAGE)
            .then(function (response) {
                if (!response.ok) throw new Error('GitHub API returned ' + response.status);
                return response.json();
            })
            .then(function (data) {
                if (!Array.isArray(data) || data.length === 0) {
                    state.all = [];
                    state.filtered = [];
                    hide(loading);
                    show(empty);
                    return;
                }

                state.all = data;
                state.filtered = data.slice();
                sortFiltered();
                hide(loading);

                renderPodium();
                renderHall();
                renderMaintainers();
                renderRecent();
                renderTable();
                fillHeroStats();
                fetchRepoStats();
            })
            .catch(function (err) {
                hide(loading);
                var errorMsg = $('clb-error-msg');
                if (errorMsg) errorMsg.textContent = err.message || 'Network error.';
                show(error);
            });
    }

    function fetchRepoStats() {
        fetch(REPO_API)
            .then(function (r) {
                return r.json();
            })
            .then(function (repo) {
                state.repo = repo;
                animateCounter($('cs-stars'), repo.stargazers_count || 0, 1400);
                animateCounter($('cs-forks'), repo.forks_count || 0, 1400);
                animateCounter($('cs-issues'), repo.open_issues_count || 0, 1400);
            })
            .catch(function () {});
    }

    function sortFiltered() {
        if (state.sort === 'contributions') {
            state.filtered.sort(function (a, b) {
                return (b.contributions || 0) - (a.contributions || 0);
            });
        } else if (state.sort === 'recent') {
            state.filtered.sort(function (a, b) {
                return (b.id || 0) - (a.id || 0);
            });
        } else if (state.sort === 'username') {
            state.filtered.sort(function (a, b) {
                return (a.login || '').toLowerCase().localeCompare((b.login || '').toLowerCase());
            });
        }
    }

    /* ---- Auto-Refresh ---- */
    function startAutoRefresh() {
        if (state.refreshTimer) clearInterval(state.refreshTimer);
        state.refreshTimer = setInterval(function () {
            fetch(CONTRIBUTORS_API + '?per_page=' + PER_PAGE + '&t=' + Date.now())
                .then(function (r) {
                    return r.json();
                })
                .then(function (data) {
                    if (Array.isArray(data) && data.length > 0) {
                        state.all = data;
                        state.filtered = data.slice();
                        sortFiltered();
                        applyFilters();
                        renderPodium();
                        renderHall();
                        renderMaintainers();
                        renderRecent();
                        fillHeroStats();
                    }
                })
                .catch(function () {});
        }, REFRESH_INTERVAL);
    }

    /* ---- Hero Stats ---- */
    function fillHeroStats() {
        var total = state.all.length;
        var totalContributions = 0;
        var activeCount = 0;

        for (var i = 0; i < total; i++) {
            totalContributions += state.all[i].contributions || 0;
            if (state.all[i].contributions > 1) activeCount++;
        }

        animateCounter($('hs-contributors'), total, 1200);
        animateCounter($('hs-commits'), totalContributions, 1600);
        animateCounter($('hs-active'), activeCount, 1200);
        animateCounter($('hs-prs'), totalContributions, 1400);

        animateCounter($('cs-contributors'), total, 1200);
        animateCounter($('cs-commits'), totalContributions, 1600);
        animateCounter($('cs-prs'), Math.floor(totalContributions * 0.7), 1400);
    }

    /* ---- Podium ---- */
    function renderPodium() {
        var sorted = state.all.slice().sort(function (a, b) {
            return (b.contributions || 0) - (a.contributions || 0);
        });

        var top3 = sorted.slice(0, 3);

        for (var i = 0; i < 3; i++) {
            var contributor = top3[i];
            var rank = i + 1;
            var nameEl = $('podium-' + rank + '-name');
            var userEl = $('podium-' + rank + '-user');
            var contribsEl = $('podium-' + rank + '-contribs');
            var prsEl = $('podium-' + rank + '-prs');
            var avatarEl = document.querySelector('#podium-' + rank + ' .clb-podium-avatar');

            if (!contributor) {
                if (nameEl) nameEl.textContent = '\u2014';
                continue;
            }

            if (nameEl) nameEl.textContent = contributor.login;
            if (userEl) userEl.textContent = '@' + contributor.login;
            if (contribsEl) contribsEl.textContent = (contributor.contributions || 0).toLocaleString();
            if (prsEl) prsEl.textContent = (contributor.contributions || 0).toLocaleString();
            if (avatarEl) {
                avatarEl.src = contributor.avatar_url;
                avatarEl.alt = contributor.login;
            }
        }

        var goldCard = $('podium-1');
        if (goldCard && !goldCard.querySelector('.clb-gold-sparkles')) {
            var sparkles = document.createElement('div');
            sparkles.className = 'clb-gold-sparkles';
            for (var s = 0; s < 8; s++) {
                sparkles.appendChild(document.createElement('span'));
            }
            goldCard.appendChild(sparkles);
        }
    }

    /* ---- Table ---- */
    function renderTable() {
        var data = state.filtered;
        var total = data.length;
        var totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
        if (state.page > totalPages) state.page = totalPages;

        var start = (state.page - 1) * PAGE_SIZE;
        var pageData = data.slice(start, start + PAGE_SIZE);

        var tableWrap = $('clb-table-wrap');
        var empty = $('clb-empty');
        var tbody = $('clb-tbody');
        var tableInfo = $('clb-table-info');

        if (total === 0) {
            hide(tableWrap);
            show(empty);
            return;
        }

        show(tableWrap);
        hide(empty);

        var maintainerLogins = MAINTAINERS.map(function (m) {
            return m.login;
        });
        var ecsocLogins = HALL_OF_FAME.ecsoc.participants;
        var topLogins = data.slice(0, 3).map(function (c) {
            return c.login;
        });

        var html = '';
        for (var i = 0; i < pageData.length; i++) {
            var c = pageData[i];
            var rank = start + i + 1;
            var profileUrl = 'https://github.com/' + c.login;
            var isTop = rank <= 3;

            html += '<tr>';
            html += '<td class="clb-td-rank' + (isTop ? ' clb-rank-top' : '') + '">' + rank + '</td>';
            html += '<td><div class="clb-td-contributor">';
            html +=
                '<img class="clb-td-avatar" src="' +
                esc(c.avatar_url) +
                '" alt="' +
                esc(c.login) +
                '" loading="lazy" onerror="this.src=\'https://ui-avatars.com/api/?name=' +
                encodeURIComponent(c.login) +
                '&background=ff9933&color=fff&size=80\'">';
            html += '<div class="clb-td-info">';
            html += '<div class="clb-td-name">' + esc(c.login) + '</div>';
            html += '<div class="clb-td-user">@' + esc(c.login) + '</div>';
            html += '</div></div></td>';
            html += '<td class="clb-td-contribs">' + (c.contributions || 0) + '</td>';
            html += '<td class="clb-td-prs">' + (c.contributions || 0) + '</td>';
            html += '<td class="clb-td-issues">\u2014</td>';

            html += '<td class="clb-td-badges">';
            if (maintainerLogins.indexOf(c.login) !== -1) {
                html += '<span class="clb-mini-badge maintainer">MAINTAINER</span>';
            }
            if (ecsocLogins.indexOf(c.login) !== -1) {
                html += '<span class="clb-mini-badge ecsoc">ECSoC</span>';
            }
            if (topLogins.indexOf(c.login) !== -1) {
                html += '<span class="clb-mini-badge top">TOP</span>';
            }
            html += '</td>';

            html += '<td class="clb-td-action">';
            html +=
                '<a href="' +
                profileUrl +
                '" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub"><i class="fa-brands fa-github"></i></a>';
            html += '</td>';
            html += '</tr>';
        }

        if (tbody) tbody.innerHTML = html;
        renderPagination(totalPages);
        if (tableInfo) {
            tableInfo.textContent =
                'Showing ' +
                (start + 1) +
                '\u2013' +
                Math.min(start + PAGE_SIZE, total) +
                ' of ' +
                total +
                ' contributors';
        }
    }

    function renderPagination(totalPages) {
        var pagination = $('clb-pagination');
        if (!pagination) return;

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        var html = '';
        html +=
            '<button class="clb-page-btn" data-page="prev"' +
            (state.page <= 1 ? ' disabled' : '') +
            '><i class="fa-solid fa-chevron-left"></i></button>';

        var startP = Math.max(1, state.page - 2);
        var endP = Math.min(totalPages, state.page + 2);

        if (startP > 1) {
            html += '<button class="clb-page-btn" data-page="1">1</button>';
            if (startP > 2) {
                html += '<span class="clb-page-ellipsis">\u2026</span>';
            }
        }

        for (var i = startP; i <= endP; i++) {
            html +=
                '<button class="clb-page-btn' +
                (i === state.page ? ' active' : '') +
                '" data-page="' +
                i +
                '">' +
                i +
                '</button>';
        }

        if (endP < totalPages) {
            if (endP < totalPages - 1) {
                html += '<span class="clb-page-ellipsis">\u2026</span>';
            }
            html += '<button class="clb-page-btn" data-page="' + totalPages + '">' + totalPages + '</button>';
        }

        html +=
            '<button class="clb-page-btn" data-page="next"' +
            (state.page >= totalPages ? ' disabled' : '') +
            '><i class="fa-solid fa-chevron-right"></i></button>';

        pagination.innerHTML = html;
    }

    /* ---- Hall of Fame ---- */
    function renderHall() {
        var grid = $('clb-hall-grid');
        if (!grid) return;

        var html = '';
        for (var key in HALL_OF_FAME) {
            if (!Object.prototype.hasOwnProperty.call(HALL_OF_FAME, key)) continue;
            var program = HALL_OF_FAME[key];

            html += '<div class="clb-hall-card">';
            if (key === 'ecsoc') {
                html +=
                    '<div class="clb-hall-logo-wrap"><img src="' +
                    ECSOC_LOGO +
                    '" alt="ECSoC Logo" class="clb-hall-logo" loading="lazy" onerror="this.style.display=\'none\'"></div>';
            }
            html +=
                '<h3><i class="fa-solid fa-code" style="margin-right:8px;color:var(--clb-neon-purple)"></i>' +
                esc(program.label) +
                '</h3>';
            html += '<p>' + esc(program.desc) + '</p>';
            html += '<div class="clb-hall-participants">';
            for (var i = 0; i < program.participants.length; i++) {
                var username = program.participants[i];
                var contributor = findContributor(username);
                var avatar = contributor
                    ? contributor.avatar_url
                    : 'https://ui-avatars.com/api/?name=' +
                      encodeURIComponent(username) +
                      '&background=a78bfa&color=fff&size=72';
                html += '<a href="https://github.com/' + esc(username) + '" target="_blank" rel="noopener noreferrer">';
                html +=
                    '<img class="clb-hall-avatar" src="' +
                    avatar +
                    '" alt="' +
                    esc(username) +
                    '" title="@' +
                    esc(username) +
                    '" loading="lazy">';
                html += '</a>';
            }
            html += '</div></div>';
        }
        grid.innerHTML = html;
    }

    /* ---- Maintainers ---- */
    function renderMaintainers() {
        var grid = $('clb-maintainers-grid');
        if (!grid) return;

        var html = '';
        for (var i = 0; i < MAINTAINERS.length; i++) {
            var m = MAINTAINERS[i];
            var c = findContributor(m.login);
            var avatar = c ? c.avatar_url : '';
            var contribs = c ? c.contributions : 0;

            html +=
                '<a class="clb-maintainer-card" href="https://github.com/' +
                esc(m.login) +
                '" target="_blank" rel="noopener noreferrer">';
            html +=
                '<img class="clb-maintainer-avatar" src="' +
                avatar +
                '" alt="' +
                esc(m.login) +
                '" loading="lazy" onerror="this.src=\'https://ui-avatars.com/api/?name=' +
                encodeURIComponent(m.login) +
                '&background=facc15&color=fff&size=128\'">';
            html += '<div class="clb-maintainer-info">';
            html += '<div class="clb-maintainer-name">' + esc(m.login) + '</div>';
            html += '<div class="clb-maintainer-role">' + esc(m.role) + '</div>';
            if (m.bio) html += '<div class="clb-maintainer-bio">' + esc(m.bio) + '</div>';
            html +=
                '<div class="clb-maintainer-contribs"><i class="fa-solid fa-code-commit"></i> ' +
                contribs +
                ' contributions</div>';
            html += '</div></a>';
        }
        grid.innerHTML = html;
    }

    /* ---- Recent Contributors ---- */
    function renderRecent() {
        var scroll = $('clb-recent-scroll');
        if (!scroll) return;

        var sorted = state.all.slice().sort(function (a, b) {
            return (b.id || 0) - (a.id || 0);
        });
        var recent = sorted.slice(0, 12);

        var html = '';
        for (var i = 0; i < recent.length; i++) {
            var c = recent[i];
            html +=
                '<a class="clb-recent-card" href="https://github.com/' +
                esc(c.login) +
                '" target="_blank" rel="noopener noreferrer">';
            html +=
                '<img class="clb-recent-avatar" src="' +
                esc(c.avatar_url) +
                '" alt="' +
                esc(c.login) +
                '" loading="lazy">';
            html += '<div class="clb-recent-name">' + esc(c.login) + '</div>';
            html +=
                '<div class="clb-recent-contribs"><i class="fa-solid fa-code-commit"></i> ' +
                (c.contributions || 0) +
                '</div>';
            html += '</a>';
        }
        scroll.innerHTML = html;
    }

    /* ---- Events ---- */
    function setupEvents() {
        var search = $('clb-search');
        var sort = $('clb-sort');
        var reset = $('clb-reset');
        var scrollTopBtn = $('clb-scroll-top');
        var menuToggle = $('clb-menu-toggle');
        var navLinks = $('clb-nav-links');
        var badgeBtns = selAll('.clb-badge-btn');
        var retryBtn = $('clb-retry');
        var pagination = $('clb-pagination');
        var tableWrap = $('clb-table-wrap');

        if (search) {
            var debounceTimer;
            search.addEventListener('input', function () {
                var val = this.value;
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(function () {
                    state.query = val;
                    applyFilters();
                }, 250);
            });
        }

        if (sort) {
            sort.addEventListener('change', function () {
                state.sort = this.value;
                applyFilters();
            });
        }

        for (var i = 0; i < badgeBtns.length; i++) {
            badgeBtns[i].addEventListener('click', function () {
                for (var j = 0; j < badgeBtns.length; j++) badgeBtns[j].classList.remove('active');
                this.classList.add('active');
                state.badge = this.getAttribute('data-badge');
                applyFilters();
            });
        }

        if (reset) {
            reset.addEventListener('click', function () {
                state.query = '';
                state.sort = 'contributions';
                state.badge = 'all';
                state.page = 1;
                if (search) search.value = '';
                if (sort) sort.value = 'contributions';
                for (var j = 0; j < badgeBtns.length; j++) badgeBtns[j].classList.remove('active');
                if (badgeBtns.length > 0) badgeBtns[0].classList.add('active');
                applyFilters();
            });
        }

        if (pagination) {
            pagination.addEventListener('click', function (e) {
                var btn = e.target.closest('.clb-page-btn');
                if (!btn || btn.disabled) return;
                var pageAttr = btn.getAttribute('data-page');
                if (pageAttr === 'prev') {
                    state.page--;
                } else if (pageAttr === 'next') {
                    state.page++;
                } else {
                    state.page = parseInt(pageAttr, 10);
                }
                renderTable();
                if (tableWrap) {
                    var tableTop = tableWrap.getBoundingClientRect().top + window.pageYOffset - 140;
                    window.scrollTo({ top: tableTop, behavior: 'smooth' });
                }
            });
        }

        if (scrollTopBtn) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 500) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });
            scrollTopBtn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function () {
                navLinks.classList.toggle('open');
            });
        }

        if (retryBtn) {
            retryBtn.addEventListener('click', function () {
                fetchAll();
            });
        }
    }

    /* ---- Scroll Reveal ---- */
    function setupScrollReveal() {
        var sections = document.querySelectorAll(
            '.clb-podium-section, .clb-table-section, .clb-hall-section, .clb-maintainers-section, .clb-recent-section, .clb-stats-section, .clb-cta-section'
        );
        if (!sections.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('clb-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );

        sections.forEach(function (section) {
            section.classList.add('clb-reveal');
            observer.observe(section);
        });
    }

    /* ---- Floating Particles ---- */
    function setupParticles() {
        var hero = document.querySelector('.clb-hero');
        if (!hero) return;

        var container = document.createElement('div');
        container.className = 'clb-particles';
        hero.appendChild(container);

        var colors = ['#ff9933', '#facc15', '#4ade80', '#22d3ee', '#a78bfa', '#f472b6', '#fb923c', '#fbbf24'];

        function spawnParticle() {
            var p = document.createElement('div');
            p.className = 'clb-particle';
            var size = Math.random() * 8 + 2;
            var color = colors[Math.floor(Math.random() * colors.length)];
            var glowSize = size * 3;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.background = color;
            p.style.boxShadow = '0 0 ' + glowSize + 'px ' + color + ', 0 0 ' + glowSize * 2 + 'px ' + color;
            p.style.left = Math.random() * 100 + '%';
            p.style.bottom = '-10px';
            p.style.animationDuration = Math.random() * 10 + 5 + 's';
            p.style.animationDelay = Math.random() * 1.5 + 's';
            container.appendChild(p);
            setTimeout(function () {
                if (p.parentNode) p.parentNode.removeChild(p);
            }, 18000);
        }

        for (var i = 0; i < 30; i++) {
            setTimeout(spawnParticle, i * 200);
        }
        setInterval(spawnParticle, 400);
    }

    /* ---- Scroll Progress Bar ---- */
    function setupScrollProgress() {
        var bar = document.createElement('div');
        bar.className = 'clb-scroll-progress';
        document.body.appendChild(bar);

        window.addEventListener('scroll', function () {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = pct + '%';
        });
    }

    /* ---- Init ---- */
    function init() {
        setupEvents();
        setupScrollReveal();
        setupParticles();
        setupScrollProgress();
        fetchAll();
        startAutoRefresh();
    }

    window.initContributorsPage = init;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
