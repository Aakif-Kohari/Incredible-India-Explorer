(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initThemeAndNav();
        renderStats();
        renderHistory();
        renderMedalDesign();
        renderEligibility();
        renderHeroismTypes();
        renderHeroes('');
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
        if (!grid || !AC_INFO.quickStats) return;

        grid.innerHTML = AC_INFO.quickStats.map(stat => `
            <div class="stat-card glass-card">
                <span class="stat-icon">${stat.icon}</span>
                <span class="stat-value">${stat.value}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
    }

    function renderHistory() {
        const overviewEl = document.getElementById('ac-overview');
        const evolutionEl = document.getElementById('ac-evolution');
        const sigEl = document.getElementById('ac-significance');

        if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${AC_HISTORY.overview}`;
        if (evolutionEl) evolutionEl.innerHTML = `<strong>Evolution & Classification:</strong> ${AC_HISTORY.evolution}`;
        if (sigEl) sigEl.innerHTML = `<strong>Peacetime Significance:</strong> ${AC_HISTORY.peacetimeSignificance}`;
    }

    function renderMedalDesign() {
        if (typeof AC_MEDAL_DESIGN === 'undefined') return;
        const shape = document.getElementById('design-shape');
        const obverse = document.getElementById('design-obverse');
        const reverse = document.getElementById('design-reverse');
        const ribbon = document.getElementById('design-ribbon');

        if (shape) shape.textContent = AC_MEDAL_DESIGN.shape;
        if (obverse) obverse.textContent = AC_MEDAL_DESIGN.obverse;
        if (reverse) reverse.textContent = AC_MEDAL_DESIGN.reverse;
        if (ribbon) ribbon.textContent = AC_MEDAL_DESIGN.ribbon;
    }

    function renderEligibility() {
        const eligEl = document.getElementById('eligibility-content');
        if (!eligEl || typeof AC_ELIGIBILITY === 'undefined') return;

        eligEl.innerHTML = `
            <p class="process-desc">${AC_ELIGIBILITY.description}</p>
            <ul class="process-list">
                ${AC_ELIGIBILITY.categories.map(c => `<li><strong>${c.title}:</strong> ${c.detail}</li>`).join('')}
            </ul>
        `;
    }

    function renderHeroismTypes() {
        const grid = document.getElementById('heroism-grid');
        if (!grid || typeof AC_HEROISM_TYPES === 'undefined') return;

        grid.innerHTML = AC_HEROISM_TYPES.map(h => `
            <div class="heroism-item">
                <span class="heroism-icon">${h.icon}</span>
                <h4>${h.title}</h4>
                <p>${h.description}</p>
            </div>
        `).join('');
    }

    function renderHeroes(queryVal) {
        const grid = document.getElementById('heroes-grid');
        if (!grid || !AC_HEROES) return;

        const q = (queryVal || '').toLowerCase().trim();

        const filtered = AC_HEROES.filter(hero => {
            const textContent = `${hero.name} ${hero.organization} ${hero.rank} ${hero.citation} ${hero.famousWords}`.toLowerCase();
            return !q || textContent.includes(q);
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="no-results glass-card"><p>No Ashoka Chakra recipients found matching your search.</p></div>`;
            return;
        }

        grid.innerHTML = filtered.map(hero => `
            <div class="hero-card glass-card">
                <div class="hero-card-header">
                    <span class="hero-badge ${hero.posthumous ? 'badge-posthumous' : 'badge-living'}">
                        ${hero.posthumous ? '🌹 Posthumous' : '🎖️ Living Hero'}
                    </span>
                    <span class="hero-year">${hero.year}</span>
                </div>
                <h3>${hero.name}</h3>
                <p class="hero-rank-regiment"><strong>${hero.rank}</strong> • ${hero.organization}</p>
                <div class="hero-citation">
                    <p><strong>Citation:</strong> ${hero.citation}</p>
                </div>
                ${hero.famousWords ? `<blockquote class="hero-quote">${hero.famousWords}</blockquote>` : ''}
            </div>
        `).join('');
    }

    function renderTimeline() {
        const grid = document.getElementById('timeline-grid');
        if (!grid || !AC_TIMELINE) return;

        grid.innerHTML = AC_TIMELINE.map(item => `
            <div class="timeline-card glass-card">
                <span class="timeline-year">${item.year}</span>
                <h3>${item.title}</h3>
                <p class="timeline-desc">${item.text}</p>
            </div>
        `).join('');
    }

    function renderFacts() {
        const grid = document.getElementById('facts-grid');
        if (!grid || !AC_FACTS) return;

        grid.innerHTML = AC_FACTS.map(f => `
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
                renderHeroes(this.value);
            });
        }
    }
})();
