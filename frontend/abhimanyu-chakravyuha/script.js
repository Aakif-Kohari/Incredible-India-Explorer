/**
 * Abhimanyu Story Page Main Script
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
    if (typeof renderAbhimanyuTimeline === 'function') {
        renderAbhimanyuTimeline();
    }

    if (typeof renderCharacters === 'function') {
        renderCharacters();
    }

    if (typeof initCulturalContext === 'function') {
        initCulturalContext();
    }

    // 4. Register with global search
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('abhimanyu-chakravyuha/index.html', [{
            id: 'abhimanyu-story',
            title: 'Abhimanyu: The Young Warrior of Chakravyuha',
            description: 'The legendary story of Abhimanyu\'s bravery and sacrifice during the Kurukshetra war.',
            link: 'frontend/abhimanyu-chakravyuha/index.html'
        }]);
    }
});
