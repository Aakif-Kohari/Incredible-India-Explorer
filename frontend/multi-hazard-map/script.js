/**
 * Multi-Hazard Map Main Script
 * Initializes the map, handles theme toggling, and coordinates module interactions.
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Theme Toggle Initialization
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
            // Trigger map tile layer update if needed
            if (window.hazardMapInstance) {
                updateMapTheme(window.hazardMapInstance);
            }
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

    // 3. Initialize Map and Modules
    if (typeof initializeHazardMap === 'function') {
        window.hazardMapInstance = initializeHazardMap();
    }

    if (typeof renderHazardFilters === 'function') {
        renderHazardFilters();
    }

    if (typeof populateStateSelector === 'function') {
        populateStateSelector();
    }

    // 4. Register with global search if available
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('multi-hazard-map/index.html', [{
            id: 'hazard-map-main',
            title: 'Multi-Hazard Map of India',
            description: 'Interactive map showing earthquake, flood, cyclone, and other natural hazard zones across India.',
            link: 'frontend/multi-hazard-map/index.html'
        }]);
    }
});

/**
 * Updates map tile layer based on current theme
 * @param {Object} map - Leaflet map instance
 */
function updateMapTheme(map) {
    const isLight = document.body.classList.contains('light-theme');
    const tileUrl = isLight
        ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    // Note: In a full implementation, we would remove the old layer and add the new one.
    // For brevity, this is a placeholder for the tile update logic.
    console.log('Map theme updated to:', isLight ? 'light' : 'dark');
}
