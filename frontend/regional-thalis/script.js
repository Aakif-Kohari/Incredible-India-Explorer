/**
 * Regional Thali Guide Interactions
 * IIFE to avoid polluting global namespace.
 */
(function () {
    'use strict';

    // DOM Elements — Map
    const markersLayer = document.getElementById('markers-layer');
    const resultsCount = document.getElementById('results-count');

    // DOM Elements — Region info panel
    const regionEmptyState = document.getElementById('region-empty-state');
    const regionDetails = document.getElementById('region-details');
    const regionTitleEl = document.getElementById('region-title');
    const regionStateEl = document.getElementById('region-state');
    const regionDescriptionEl = document.getElementById('region-description');
    const regionServingEl = document.getElementById('region-serving');
    const regionFestivalEl = document.getElementById('region-festival');
    const regionCultureEl = document.getElementById('region-culture');

    // DOM Elements — Thali plate + dish panel
    const thaliLayout = document.getElementById('thali-layout');
    const svgContainer = document.getElementById('svg-container');
    const emptyState = document.getElementById('empty-state');
    const dishDetails = document.getElementById('dish-details');
    const dishNameEl = document.getElementById('dish-name');
    const dishDescEl = document.getElementById('dish-description');
    const ingredientsListEl = document.getElementById('ingredients-list');

    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Data
    const thaliData = window.THALI_DATA || {};
    const svgTemplates = window.SVG_TEMPLATES || {};

    let currentRegion = null;

    /**
     * Initialize the application
     */
    function init() {
        setupTheme();
        renderMarkers();
        updateResultsCount();
    }

    /**
     * Set up the light/dark mode toggle
     */
    function setupTheme() {
        const savedTheme = localStorage.getItem('iie-theme') || 'light-theme';
        body.className = savedTheme;
        updateThemeIcon(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-theme');
            const newTheme = isDark ? 'light-theme' : 'dark-theme';

            body.className = newTheme;
            localStorage.setItem('iie-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        themeToggleBtn.textContent = theme === 'dark-theme' ? '☀️' : '🌙';
    }

    function updateResultsCount() {
        const count = Object.keys(thaliData).length;
        resultsCount.textContent = `Showing ${count} regional thali${count !== 1 ? 's' : ''}`;
    }

    /**
     * Render one map marker per regional thali, positioned by mapCoordinates
     */
    function renderMarkers() {
        markersLayer.innerHTML = '';

        Object.keys(thaliData).forEach(key => {
            const region = thaliData[key];
            if (!region.mapCoordinates) return;

            const marker = document.createElement('div');
            marker.className = 'food-marker';
            marker.id = `marker-${key}`;
            marker.setAttribute('tabindex', '0');
            marker.setAttribute('role', 'button');
            marker.setAttribute('aria-label', `${region.title}, ${region.state}`);

            marker.style.left = `${region.mapCoordinates.x}%`;
            marker.style.top = `${region.mapCoordinates.y}%`;

            marker.textContent = '🍽️';

            const tooltip = document.createElement('span');
            tooltip.className = 'marker-tooltip';
            tooltip.textContent = `${region.state}: ${region.title}`;
            marker.appendChild(tooltip);

            marker.addEventListener('click', () => selectRegion(key, marker));
            marker.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectRegion(key, marker);
                }
            });

            markersLayer.appendChild(marker);
        });
    }

    /**
     * Handle marker selection: populate region info panel and load the thali plate
     */
    function selectRegion(regionKey, markerElement) {
        currentRegion = regionKey;
        const region = thaliData[regionKey];
        if (!region) return;

        // Update marker active state
        document.querySelectorAll('.food-marker').forEach(m => m.classList.remove('active-marker'));
        if (markerElement) markerElement.classList.add('active-marker');

        // Populate region info panel
        regionTitleEl.textContent = region.title;
        regionStateEl.textContent = `📍 ${region.state}`;
        regionDescriptionEl.textContent = region.description;
        regionServingEl.textContent = region.servingTradition || 'Not documented.';
        regionFestivalEl.textContent = region.festivalConnection || 'Not documented.';
        regionCultureEl.textContent = region.culturalSignificance || 'Not documented.';

        regionEmptyState.classList.add('hidden');
        regionDetails.classList.remove('hidden');

        // Load the thali plate + reset dish panel
        loadThaliPlate(regionKey);
        thaliLayout.classList.remove('hidden');
        thaliLayout.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Load SVG and bind dish interactions for a given region
     */
    function loadThaliPlate(regionKey) {
        resetDishPanel();

        const svgHTML = svgTemplates[regionKey];
        if (svgHTML) {
            svgContainer.innerHTML = svgHTML;
            bindDishInteractions(regionKey);
        } else {
            svgContainer.innerHTML = '<p>Error loading thali illustration.</p>';
        }
    }

    /**
     * Bind hover and keyboard events to all .dish elements in the current SVG
     */
    function bindDishInteractions(regionKey) {
        const dishes = svgContainer.querySelectorAll('.dish');
        const regionDishes = thaliData[regionKey].dishes;

        dishes.forEach(dish => {
            const dishId = dish.getAttribute('id');
            const data = regionDishes[dishId];

            if (!data) return;

            dish.addEventListener('mouseenter', () => updateDishPanel(data, dish));
            dish.addEventListener('click', () => updateDishPanel(data, dish));
            dish.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateDishPanel(data, dish);
                }
            });
        });
    }

    /**
     * Update the dish info panel with dish details
     */
    function updateDishPanel(dishData, dishElement) {
        const allDishes = svgContainer.querySelectorAll('.dish');
        allDishes.forEach(d => d.classList.remove('active-dish'));

        if (dishElement) {
            dishElement.classList.add('active-dish');
            const bbox = dishElement.getBBox();
            const cx = bbox.x + bbox.width / 2;
            const cy = bbox.y + bbox.height / 2;
            dishElement.style.transformOrigin = `${cx}px ${cy}px`;
        }

        dishNameEl.textContent = dishData.name;
        dishDescEl.textContent = dishData.description;

        ingredientsListEl.innerHTML = '';
        dishData.ingredients.forEach(ing => {
            const li = document.createElement('li');
            li.textContent = ing;
            ingredientsListEl.appendChild(li);
        });

        emptyState.classList.add('hidden');
        dishDetails.classList.remove('hidden');
    }

    /**
     * Reset the dish info panel to its empty state
     */
    function resetDishPanel() {
        emptyState.classList.remove('hidden');
        dishDetails.classList.add('hidden');
    }

    // Run initialization
    document.addEventListener('DOMContentLoaded', init);

})();