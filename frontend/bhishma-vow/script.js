/**
 * Bhishma Story Page Main Script
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

    if (typeof renderBhishmaTimeline === 'function') renderBhishmaTimeline();
    if (typeof initVowDetails === 'function') initVowDetails();
    if (typeof initCulturalSignificance === 'function') initCulturalSignificance();

    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('bhishma-vow/index.html', [{
            id: 'bhishma-story',
            title: 'Bhishma: The Vow That Changed a Dynasty',
            description: 'The story of Devavrata\'s terrible vow and his lifelong service to the Kuru throne.',
            link: 'frontend/bhishma-vow/index.html'
        }]);
    }
});
