/**
 * Street Food Map Interactions
 * IIFE to avoid polluting global namespace.
 */
(function() {
    'use strict';

    // DOM Elements
    const searchInput = document.getElementById('search-input');
    const stateFilter = document.getElementById('state-filter');
    const ingredientFilter = document.getElementById('ingredient-filter');
    const resultsCount = document.getElementById('results-count');
    const markersLayer = document.getElementById('markers-layer');
    
    // Detail Panel Elements
    const emptyState = document.getElementById('empty-state');
    const foodDetails = document.getElementById('food-details');
    const foodImageEl = document.getElementById('food-image');
    const foodNameEl = document.getElementById('food-name');
    const foodStateEl = document.getElementById('food-state');
    const foodCityEl = document.getElementById('food-city');
    const foodPopularityEl = document.getElementById('food-popularity');
    const foodFlavorEl = document.getElementById('food-flavor');
    const foodDescriptionEl = document.getElementById('food-description');
    const ingredientsListEl = document.getElementById('ingredients-list');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Data references
    const foodData = window.STREET_FOOD_DATA || [];
    const uniqueStates = window.UNIQUE_STATES || [];
    const uniqueIngredients = window.UNIQUE_INGREDIENTS || [];

    /**
     * Initialize the application
     */
    function init() {
        setupTheme();
        populateFilters();
        renderMarkers();
        bindEvents();
        updateResultsCount(foodData.length);
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

    /**
     * Populate the select dropdowns dynamically
     */
    function populateFilters() {
        uniqueStates.forEach(state => {
            const option = document.createElement('option');
            option.value = state.toLowerCase();
            option.textContent = state;
            stateFilter.appendChild(option);
        });

        uniqueIngredients.forEach(ing => {
            const option = document.createElement('option');
            option.value = ing.toLowerCase();
            option.textContent = ing;
            ingredientFilter.appendChild(option);
        });
    }

    /**
     * Render map markers based on data
     */
    function renderMarkers() {
        markersLayer.innerHTML = ''; // Clear existing
        
        foodData.forEach(food => {
            const marker = document.createElement('div');
            marker.className = 'food-marker';
            marker.id = `marker-${food.id}`;
            marker.setAttribute('tabindex', '0');
            marker.setAttribute('role', 'button');
            marker.setAttribute('aria-label', `${food.name}, ${food.state}`);
            
            // Set position based on coordinates
            marker.style.left = `${food.coordinates.x}%`;
            marker.style.top = `${food.coordinates.y}%`;
            
            marker.textContent = food.image; // Using emoji as icon

            // Tooltip
            const tooltip = document.createElement('span');
            tooltip.className = 'marker-tooltip';
            tooltip.textContent = `${food.name}`;
            marker.appendChild(tooltip);

            // Interaction events
            marker.addEventListener('click', () => selectFood(food, marker));
            marker.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectFood(food, marker);
                }
            });

            markersLayer.appendChild(marker);
        });
    }

    /**
     * Bind search and filter events
     */
    function bindEvents() {
        searchInput.addEventListener('input', applyFilters);
        stateFilter.addEventListener('change', applyFilters);
        ingredientFilter.addEventListener('change', applyFilters);
    }

    /**
     * Filter data based on search and dropdowns, then update map visibility
     */
    function applyFilters() {
        const query = searchInput.value.toLowerCase().trim();
        const selectedState = stateFilter.value;
        const selectedIngredient = ingredientFilter.value;

        let visibleCount = 0;

        foodData.forEach(food => {
            const marker = document.getElementById(`marker-${food.id}`);
            if (!marker) return;

            // Check State
            const matchState = selectedState === 'all' || food.state.toLowerCase() === selectedState;
            
            // Check Ingredient
            const matchIngredient = selectedIngredient === 'all' || 
                food.ingredients.some(ing => ing.toLowerCase() === selectedIngredient);
            
            // Check Query (name, state, ingredients, flavor)
            let matchQuery = true;
            if (query) {
                const searchString = `
                    ${food.name.toLowerCase()} 
                    ${food.state.toLowerCase()} 
                    ${food.ingredients.join(' ').toLowerCase()} 
                    ${food.flavor.join(' ').toLowerCase()}
                `;
                matchQuery = searchString.includes(query);
            }

            // Determine visibility
            if (matchState && matchIngredient && matchQuery) {
                marker.style.display = 'flex';
                visibleCount++;
            } else {
                marker.style.display = 'none';
                // If the hidden marker was active, reset panel
                if (marker.classList.contains('active-marker')) {
                    resetDetailPanel();
                }
            }
        });

        updateResultsCount(visibleCount);
    }

    function updateResultsCount(count) {
        resultsCount.textContent = `Showing ${count} food${count !== 1 ? 's' : ''}`;
    }

    /**
     * Handle marker selection and populate the detail panel
     */
    function selectFood(food, markerElement) {
        // Remove active class from all markers
        document.querySelectorAll('.food-marker').forEach(m => m.classList.remove('active-marker'));
        
        // Add to selected
        markerElement.classList.add('active-marker');

        // Populate details
        foodImageEl.textContent = food.image;
        foodNameEl.textContent = food.name;
        foodStateEl.textContent = food.state;
        foodCityEl.textContent = food.city;
        foodPopularityEl.textContent = food.popularity;
        foodFlavorEl.textContent = food.flavor.join(' • ');
        foodDescriptionEl.textContent = food.description;

        ingredientsListEl.innerHTML = '';
        food.ingredients.forEach(ing => {
            const li = document.createElement('li');
            li.textContent = ing;
            ingredientsListEl.appendChild(li);
        });

        // Toggle UI
        emptyState.classList.add('hidden');
        foodDetails.classList.remove('hidden');
    }

    /**
     * Reset the detail panel
     */
    function resetDetailPanel() {
        document.querySelectorAll('.food-marker').forEach(m => m.classList.remove('active-marker'));
        emptyState.classList.remove('hidden');
        foodDetails.classList.add('hidden');
    }

    // Run initialization
    document.addEventListener('DOMContentLoaded', init);

})();
