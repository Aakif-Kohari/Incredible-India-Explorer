/**
 * Karna Story Page Main Script
 * Handles theme toggling, navigation, and module initialization.
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            themeBtn.innerHTML = '🌙';
        } else {
            themeBtn.innerHTML = '☀️';
        }

        themeBtn.addEventListener('click', function () {
            const isLight = document.body.classList.toggle('light-theme');
            themeBtn.innerHTML = isLight ? '🌙' : '☀️';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // 3. Initialize Modules
    if (typeof renderKarnaTimeline === 'function') renderKarnaTimeline();
    if (typeof renderRelationships === 'function') renderRelationships();
    if (typeof renderLiteraryPerspectives === 'function') renderLiteraryPerspectives();
    if (typeof initCulturalLegacy === 'function') initCulturalLegacy();

    // 4. Register with global search
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('karna-tragic-hero/index.html', [{
            id: 'karna-story',
            title: 'Karna: The Tragic Hero of the Mahabharata',
            description: 'Explore the life, struggles, generosity, and tragic destiny of Karna.',
            link: 'frontend/karna-tragic-hero/index.html'
        }]);
    }
});
