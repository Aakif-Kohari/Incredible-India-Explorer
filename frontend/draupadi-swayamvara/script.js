/**
 * Draupadi's Swayamvara Page Main Script
 */

document.addEventListener('DOMContentLoaded', function () {

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

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    if (typeof renderArcheryChallenge === 'function') renderArcheryChallenge();
    if (typeof renderParticipants === 'function') renderParticipants();
    if (typeof initCulturalContextSwayamvara === 'function') initCulturalContextSwayamvara();

    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('draupadi-swayamvara/index.html', [{
            id: 'draupadi-swayamvara',
            title: 'Draupadi\'s Swayamvara: The Contest of the Great Archers',
            description: 'The legendary archery challenge and Arjuna\'s triumphant victory.',
            link: 'frontend/draupadi-swayamvara/index.html'
        }]);
    }
});
