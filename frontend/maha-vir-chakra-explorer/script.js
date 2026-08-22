(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initThemeAndNav();
        renderStats();
        renderHistory();
        renderMedalDesign();
        renderEligibility();
        renderOperations();
        renderAwardees('');
        renderTimeline();
        renderFacts();
        initSearch();
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
        if (!grid || !MVC_INFO.quickStats) return;

        grid.innerHTML = MVC_INFO.quickStats.map(stat => `
            <div class="stat-card glass-card">
                <span class="stat-icon">${stat.icon}</span>
                <span class="stat-value">${stat.value}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
    }

    function renderHistory() {
        const overviewEl = document.getElementById('mvc-overview');
        const sigEl = document.getElementById('mvc-significance');
        const mottoEl = document.getElementById('mvc-motto');

        if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${MVC_HISTORY.overview}`;
        if (sigEl) sigEl.innerHTML = `<strong>Wartime Significance:</strong> ${MVC_HISTORY.wartimeSignificance}`;
        if (mottoEl) mottoEl.innerHTML = `<strong>Valour Motto:</strong> ${MVC_HISTORY.motto}`;
    }

    function renderMedalDesign() {
        if (typeof MVC_MEDAL_DESIGN === 'undefined') return;
        const shape = document.getElementById('design-shape');
        const obverse = document.getElementById('design-obverse');
        const reverse = document.getElementById('design-reverse');
        const ribbon = document.getElementById('design-ribbon');

        if (shape) shape.textContent = MVC_MEDAL_DESIGN.shape;
        if (obverse) obverse.textContent = MVC_MEDAL_DESIGN.obverse;
        if (reverse) reverse.textContent = MVC_MEDAL_DESIGN.reverse;
        if (ribbon) ribbon.textContent = MVC_MEDAL_DESIGN.ribbon;
    }

    function renderEligibility() {
        const eligEl = document.getElementById('eligibility-content');
        if (!eligEl || typeof MVC_ELIGIBILITY === 'undefined') return;

        eligEl.innerHTML = `
            <p class="process-desc">${MVC_ELIGIBILITY.description}</p>
            <ul class="process-list">
                ${MVC_ELIGIBILITY.categories.map(c => `<li><strong>${c.title}:</strong> ${c.detail}</li>`).join('')}
            </ul>
        `;
    }

    function renderOperations() {
        const grid = document.getElementById('ops-grid');
        if (!grid || typeof MVC_OPERATIONS === 'undefined') return;

        grid.innerHTML = MVC_OPERATIONS.map(op => `
            <div class="op-card">
                <h4>${op.title}</h4>
                <p>${op.description}</p>
                <span class="op-hero">Key Hero: <strong>${op.keyHero}</strong></span>
            </div>
        `).join('');
    }

    function renderAwardees(queryVal) {
        const grid = document.getElementById('heroes-grid');
        if (!grid || !MVC_AWARDEES) return;

        const q = (queryVal || '').toLowerCase().trim();

        const filtered = MVC_AWARDEES.filter(hero => {
            const textContent = `${hero.name} ${hero.regiment} ${hero.rank} ${hero.citation} ${hero.famousWords}`.toLowerCase();
            return !q || textContent.includes(q);
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="no-results glass-card"><p>No Maha Vir Chakra awardees found matching your criteria.</p></div>`;
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
        if (!grid || !MVC_TIMELINE) return;

        grid.innerHTML = MVC_TIMELINE.map(item => `
            <div class="timeline-card glass-card">
                <span class="timeline-year">${item.year}</span>
                <h3>${item.title}</h3>
                <p class="timeline-desc">${item.text}</p>
            </div>
        `).join('');
    }

    function renderFacts() {
        const grid = document.getElementById('facts-grid');
        if (!grid || !MVC_FACTS) return;

        grid.innerHTML = MVC_FACTS.map(f => `
            <div class="fact-card glass-card">
                <h3>💡 ${f.title}</h3>
                <p>${f.detail}</p>
            </div>
        `).join('');
    }

    function initSearch() {
        const searchInput = document.getElementById('hero-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                renderAwardees(this.value);
            });
        }
    }
})();
