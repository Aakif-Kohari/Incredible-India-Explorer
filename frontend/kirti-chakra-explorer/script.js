(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initThemeAndNav();
        renderStats();
        renderHistory();
        renderMedalDesign();
        renderEligibility();
        renderHeroicActs();
        renderRecipients('');
        renderTimeline();
        renderFaqs();
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
        if (!grid || !KC_INFO.quickStats) return;

        grid.innerHTML = KC_INFO.quickStats.map(stat => `
            <div class="stat-card glass-card">
                <span class="stat-icon">${stat.icon}</span>
                <span class="stat-value">${stat.value}</span>
                <span class="stat-label">${stat.label}</span>
            </div>
        `).join('');
    }

    function renderHistory() {
        const overviewEl = document.getElementById('kc-overview');
        const evolutionEl = document.getElementById('kc-evolution');
        const sigEl = document.getElementById('kc-significance');

        if (overviewEl) overviewEl.innerHTML = `<strong>Overview:</strong> ${KC_HISTORY.overview}`;
        if (evolutionEl) evolutionEl.innerHTML = `<strong>Evolution:</strong> ${KC_HISTORY.evolution}`;
        if (sigEl) sigEl.innerHTML = `<strong>Peacetime Significance:</strong> ${KC_HISTORY.peacetimeSignificance}`;
    }

    function renderMedalDesign() {
        if (typeof KC_MEDAL_DESIGN === 'undefined') return;
        const shape = document.getElementById('design-shape');
        const obverse = document.getElementById('design-obverse');
        const reverse = document.getElementById('design-reverse');
        const ribbon = document.getElementById('design-ribbon');

        if (shape) shape.textContent = KC_MEDAL_DESIGN.shape;
        if (obverse) obverse.textContent = KC_MEDAL_DESIGN.obverse;
        if (reverse) reverse.textContent = KC_MEDAL_DESIGN.reverse;
        if (ribbon) ribbon.textContent = KC_MEDAL_DESIGN.ribbon;
    }

    function renderEligibility() {
        const eligEl = document.getElementById('eligibility-content');
        if (!eligEl || typeof KC_ELIGIBILITY === 'undefined') return;

        eligEl.innerHTML = `
            <p class="process-desc">${KC_ELIGIBILITY.description}</p>
            <ul class="process-list">
                ${KC_ELIGIBILITY.categories.map(c => `<li><strong>${c.title}:</strong> ${c.detail}</li>`).join('')}
            </ul>
        `;
    }

    function renderHeroicActs() {
        const grid = document.getElementById('heroism-grid');
        if (!grid || typeof KC_HEROIC_ACTS === 'undefined') return;

        grid.innerHTML = KC_HEROIC_ACTS.map(h => `
            <div class="heroism-item">
                <span class="heroism-icon">${h.icon}</span>
                <h4>${h.title}</h4>
                <p>${h.description}</p>
            </div>
        `).join('');
    }

    function renderRecipients(queryVal) {
        const grid = document.getElementById('heroes-grid');
        if (!grid || !KC_RECIPIENTS) return;

        const q = (queryVal || '').toLowerCase().trim();

        const filtered = KC_RECIPIENTS.filter(hero => {
            const textContent = `${hero.name} ${hero.organization} ${hero.rank} ${hero.citation} ${hero.famousWords}`.toLowerCase();
            return !q || textContent.includes(q);
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div class="no-results glass-card"><p>No Kirti Chakra recipients matching your query.</p></div>`;
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
        if (!grid || !KC_TIMELINE) return;

        grid.innerHTML = KC_TIMELINE.map(item => `
            <div class="timeline-card glass-card">
                <span class="timeline-year">${item.year}</span>
                <h3>${item.title}</h3>
                <p class="timeline-desc">${item.text}</p>
            </div>
        `).join('');
    }

    function renderFaqs() {
        const container = document.getElementById('faq-accordion');
        if (!container || !KC_FAQS) return;

        container.innerHTML = KC_FAQS.map((faq, idx) => `
            <div class="faq-item glass-card">
                <button class="faq-toggle" aria-expanded="false" aria-controls="faq-ans-${idx}">
                    <span>❓ ${faq.question}</span>
                    <span class="faq-icon">+</span>
                </button>
                <div id="faq-ans-${idx}" class="faq-answer" style="display: none;">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');

        const toggles = container.querySelectorAll('.faq-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const expanded = this.getAttribute('aria-expanded') === 'true';
                
                this.setAttribute('aria-expanded', !expanded);
                this.querySelector('.faq-icon').textContent = expanded ? '+' : '−';
                answer.style.display = expanded ? 'none' : 'block';
            });
        });
    }

    function initSearch() {
        const searchInput = document.getElementById('hero-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                renderRecipients(this.value);
            });
        }
    }
})();
