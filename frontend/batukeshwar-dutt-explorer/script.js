/**
 * Batukeshwar Dutt Explorer - Interactive Script
 * Handles tab navigation, theme toggle, smooth scroll, mobile menu, and count-up stats.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initThemeToggle();
    initSmoothScroll();
    initMobileMenu();
    initCountUp();
});

/**
 * Activate a tab section by its id (shared by tab bar and hash links)
 */
function activateTab(targetTab) {
    const tabs = document.querySelectorAll('.bdutt-tab');
    const sections = document.querySelectorAll('.bdutt-section');
    if (!tabs.length || !sections.length) return;

    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    const tab = document.querySelector(`.bdutt-tab[data-tab="${targetTab}"]`);
    const section = document.getElementById(targetTab);
    if (tab) tab.classList.add('active');
    if (section) {
        section.classList.add('active');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Initialize tab navigation for the explorer sections
 */
function initTabNavigation() {
    const tabs = document.querySelectorAll('.bdutt-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab.dataset.tab));
    });

    // Activate tab from hash if present (e.g. #timeline)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const valid = ['biography', 'timeline', 'assembly-bombing', 'imprisonment', 'legacy', 'references'];
        if (valid.includes(hash)) activateTab(hash);
    }
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const isLight = body.classList.contains('light-theme');

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
 * Update theme toggle icon based on the active theme
 */
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

/**
 * Initialize smooth scroll for internal anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!isExpanded));
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * Animate numeric statistics on the hero banner
 */
function initCountUp() {
    const counters = document.querySelectorAll('.bdutt-count');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                if (isNaN(target)) return;

                let current = 0;
                const increment = Math.max(1, Math.floor(target / 60));
                const update = () => {
                    current += increment;
                    if (current > target) current = target;
                    el.textContent = current;
                    if (current < target) requestAnimationFrame(update);
                };
                update();
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(c => observer.observe(c));
}