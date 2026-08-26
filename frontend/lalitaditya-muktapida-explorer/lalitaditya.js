/**
 * Lalitaditya Muktapida Explorer - Main Application Logic
 * Handles dynamic rendering, UI interactions, accessibility, and animations.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initThemeToggle();
    initMobileMenu();
    initScrollToTop();
    initScrollAnimations();
    
    // Render dynamic content with slight delays for staggered animation effect
    renderStats();
    setTimeout(renderMartandCard, 100);
    setTimeout(renderCampaigns, 200);
    setTimeout(renderTimeline, 300);
    setTimeout(renderReferences, 400);
});

/**
 * Helper: Safely render HTML with a fade-in animation class
 */
function renderWithAnimation(elementId, htmlContent) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element #${elementId} not found.`);
        return;
    }
    
    // Remove loading state if it exists
    const loader = element.querySelector('.loading-text');
    if (loader) loader.remove();

    element.innerHTML = htmlContent;
    
    // Trigger CSS animation for child elements
    const children = element.children;
    Array.from(children).forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
        }, index * 100); // Staggered delay
    });
}

/**
 * 1. Render Quick Stats
 */
function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof LALITADITYA_INFO === 'undefined' || !LALITADITYA_INFO.quickStats) {
        if (grid) grid.innerHTML = '<p class="loading-text">Historical data currently unavailable.</p>';
        return;
    }

    const html = LALITADITYA_INFO.quickStats.map(stat => `
        <div class="stat-card" role="group" aria-label="${stat.label}: ${stat.value}">
            <span class="stat-icon" aria-hidden="true">${stat.icon}</span>
            <div class="stat-val">${stat.value}</div>
            <div class="stat-lbl">${stat.label}</div>
        </div>
    `).join('');

    renderWithAnimation('stats-grid', html);
}

/**
 * 2. Render Martand Sun Temple Card
 */
function renderMartandCard() {
    const card = document.getElementById('martand-card');
    if (!card || typeof MARTAND_SUN_TEMPLE === 'undefined') {
        if (card) card.innerHTML = '<p class="loading-text">Architectural details currently unavailable.</p>';
        return;
    }

    const highlightsHtml = MARTAND_SUN_TEMPLE.highlights && MARTAND_SUN_TEMPLE.highlights.length > 0 
        ? MARTAND_SUN_TEMPLE.highlights.map(h => `<li>✨ ${h}</li>`).join('') 
        : '<li>No specific highlights recorded.</li>';

    const html = `
        <div class="martand-inner">
            <div class="martand-content">
                <h3>☀️ ${MARTAND_SUN_TEMPLE.title}</h3>
                <p><strong>Commissioned:</strong> ${MARTAND_SUN_TEMPLE.builtYear || 'Unknown'}</p>
                <p><strong>Architectural Synthesis:</strong> ${MARTAND_SUN_TEMPLE.architecturalStyle || 'Unknown'}</p>
                <p><strong>Principal Deity:</strong> ${MARTAND_SUN_TEMPLE.deity || 'Unknown'}</p>
                <ul class="highlights-list">
                    ${highlightsHtml}
                </ul>
            </div>
        </div>
    `;

    renderWithAnimation('martand-card', html);
}

/**
 * 3. Render Campaigns Grid
 */
function renderCampaigns() {
    const grid = document.getElementById('campaigns-grid');
    if (!grid || typeof CAMPAIGNS_AND_HISTORIOGRAPHY === 'undefined' || !Array.isArray(CAMPAIGNS_AND_HISTORIOGRAPHY)) {
        if (grid) grid.innerHTML = '<p class="loading-text">Campaign records currently unavailable.</p>';
        return;
    }

    const html = CAMPAIGNS_AND_HISTORIOGRAPHY.map(c => `
        <article class="campaign-card">
            <span class="category-tag">${c.category || 'Historical Event'}</span>
            <h3>📍 ${c.title}</h3>
            <p>${c.detail}</p>
        </article>
    `).join('');

    renderWithAnimation('campaigns-grid', html);
}

/**
 * 4. Render Timeline
 */
function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container || typeof TIMELINE_EVENTS === 'undefined' || !Array.isArray(TIMELINE_EVENTS)) {
        if (container) container.innerHTML = '<p class="loading-text">Timeline data currently unavailable.</p>';
        return;
    }

    const html = TIMELINE_EVENTS.map(item => `
        <div class="timeline-card">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');

    renderWithAnimation('timeline-container', html);
}

/**
 * 5. Render References
 */
function renderReferences() {
    const list = document.getElementById('references-list');
    // Note: We keep static HTML fallbacks, so we only append/replace if data exists
    if (!list || typeof REFERENCES === 'undefined' || !Array.isArray(REFERENCES)) return;

    const html = REFERENCES.map(r => `
        <li>
            <a href="${r.link || '#'}" target="_blank" rel="noopener noreferrer">
                📚 ${r.text} <span class="sr-only">(opens in a new tab)</span>
            </a>
        </li>
    `).join('');

    list.innerHTML = html;
}

/**
 * 6. Theme Toggle with Accessibility & System Preference
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // Check system preference if no local storage is set
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.body.classList.add('light-theme');
        updateThemeButton(toggleBtn, true);
    }

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeButton(toggleBtn, isLight);
    });
}

function updateThemeButton(btn, isLight) {
    btn.textContent = isLight ? '🌙' : '☀️';
    btn.setAttribute('aria-label', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    btn.setAttribute('aria-pressed', isLight);
    btn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
}

/**
 * 7. Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active'); // Ensure .active is defined in your global styles.css
    });

    // Close menu when clicking a link (mobile UX)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });
}

/**
 * 8. Scroll to Top Button
 */
function initScrollToTop() {
    const scrollBtn = document.getElementById('btn-scroll-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 9. Scroll Animations (Intersection Observer)
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in-view');
                observerInstance.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all major sections
    const sections = document.querySelectorAll('.lalitaditya-info-section, .references-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
}

// Add global CSS for the scroll animation dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .animate-in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(styleSheet);

console.log('👑 Lalitaditya Muktapida Explorer initialized successfully.');