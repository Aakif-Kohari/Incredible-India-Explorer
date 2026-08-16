(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initThemeAndNav();
        renderStats();
        renderHistory();
        renderEligibilityAndSelection();
        renderBattles();
        renderHeroes('all', '');
        renderTimeline();
        initSearchAndFilter();
    });

    function initThemeAndNav() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
        }

        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !expanded);
                navMenu.classList.toggle('active');
            });
        }
    }

    function renderStats() {
        const grid = document.getElementById('stats-grid');
        if (!grid || !PVC_INFO.quickStats) return;

        grid.innerHTML = PVC_INFO.quickStats.map(stat => `
            <div class="stat-card glass-card">
                <span class="stat-icon">${stat.icon}</span>
                <span class="stat-value">${stat.value}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
    }

    function renderHistory() {
        const overviewEl = document.getElementById('pvc-overview');
        const designEl = document.getElementById('pvc-design');
        const mottoEl = document.getElementById('pvc-motto');

        if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${MEDAL_HISTORY.overview}`;
        if (designEl) designEl.innerHTML = `<strong>Medal Design & Mythological Origin:</strong> ${MEDAL_HISTORY.designOrigin}`;
        if (mottoEl) mottoEl.innerHTML = `<strong>Valour Motto:</strong> ${MEDAL_HISTORY.motto}`;
    }

    function renderEligibilityAndSelection() {
        const eligEl = document.getElementById('eligibility-content');
        const selEl = document.getElementById('selection-content');

        if (eligEl && typeof PVC_ELIGIBILITY !== 'undefined') {
            eligEl.innerHTML = `
                <p class="process-desc">${PVC_ELIGIBILITY.description}</p>
                <ul class="process-list">
                    ${PVC_ELIGIBILITY.categories.map(c => `<li><strong>${c.title}:</strong> ${c.detail}</li>`).join('')}
                </ul>
            `;
        }

        if (selEl && typeof PVC_SELECTION_PROCESS !== 'undefined') {
            selEl.innerHTML = `
                <ol class="process-steps">
                    ${PVC_SELECTION_PROCESS.steps.map(s => `<li><strong>${s.step}:</strong> ${s.text}</li>`).join('')}
                </ol>
            `;
        }
    }

    function renderBattles() {
        const grid = document.getElementById('battles-grid');
        if (!grid || typeof PVC_BATTLES === 'undefined') return;

        grid.innerHTML = PVC_BATTLES.map(battle => `
            <div class="battle-card glass-card">
                <span class="battle-tag">${battle.conflict}</span>
                <h3>${battle.title}</h3>
                <p class="battle-hero"><strong>Key Hero:</strong> ${battle.hero}</p>
                <p class="battle-desc">${battle.description}</p>
            </div>
        `).join('');
    }

    function renderHeroes(filterVal, queryVal) {
        const grid = document.getElementById('heroes-grid');
        if (!grid || !PVC_HEROES) return;

        const q = (queryVal || '').toLowerCase().trim();

        const filtered = PVC_HEROES.filter(hero => {
            const matchesFilter = filterVal === 'all' || hero.year.toString().includes(filterVal) || hero.conflict.toLowerCase().includes(filterVal.toLowerCase());
            const textContent = `${hero.name} ${hero.regiment} ${hero.rank} ${hero.conflict} ${hero.citation} ${hero.famousWords}`.toLowerCase();
            const matchesQuery = !q || textContent.includes(q);
            return matchesFilter && matchesQuery;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="no-results glass-card"><p>No Param Vir Chakra heroes matching your criteria.</p></div>`;
            return;
        }

        grid.innerHTML = filtered.map(hero => `
            <div class="hero-card glass-card">
                <div class="hero-card-header">
                    <span class="hero-badge ${hero.posthumous ? 'badge-posthumous' : 'badge-living'}">
                        ${hero.posthumous ? '🌹 Posthumous' : '🎖️ Living Legend'}
                    </span>
                    <span class="hero-year">${hero.year}</span>
                </div>
                <h3>${hero.name}</h3>
                <p class="hero-rank-regiment"><strong>${hero.rank}</strong> • ${hero.regiment}</p>
                <p class="hero-conflict">⚔️ ${hero.conflict}</p>
                <div class="hero-citation">
                    <p><strong>Citation:</strong> ${hero.citation}</p>
                </div>
                ${hero.famousWords ? `<blockquote class="hero-quote">${hero.famousWords}</blockquote>` : ''}
            </div>
        `).join('');
    }

    function renderTimeline() {
        const grid = document.getElementById('timeline-grid');
        if (!grid || !CONFLICTS_TIMELINE) return;

        grid.innerHTML = CONFLICTS_TIMELINE.map(item => `
            <div class="timeline-card glass-card">
                <span class="timeline-year">${item.year}</span>
                <h3>${item.title}</h3>
                <p class="timeline-count">🎖️ <strong>${item.recipients}</strong> PVC Awarded</p>
            </div>
        `).join('');
    }

    function initSearchAndFilter() {
        const searchInput = document.getElementById('hero-search');
        const filterBtns = document.querySelectorAll('.filter-pill');

        let currentFilter = 'all';

        if (searchInput) {
            searchInput.addEventListener('input', function() {
                renderHeroes(currentFilter, this.value);
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.getAttribute('data-filter') || 'all';
                renderHeroes(currentFilter, searchInput ? searchInput.value : '');
            });
        });
    }
})();
