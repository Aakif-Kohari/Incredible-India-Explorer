/**
 * Regional Thali Guide Interactions
 * IIFE to avoid polluting global namespace.
 */
(function() {
    'use strict';

    // State
    let currentRegion = 'gujarati';
    
    // DOM Elements
    const regionButtons = document.querySelectorAll('.region-btn');
    const svgContainer = document.getElementById('svg-container');
    const emptyState = document.getElementById('empty-state');
    const dishDetails = document.getElementById('dish-details');
    const dishNameEl = document.getElementById('dish-name');
    const dishDescEl = document.getElementById('dish-description');
    const ingredientsListEl = document.getElementById('ingredients-list');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    /**
     * Initialize the application
     */
    function init() {
        setupTheme();
        bindRegionSelectors();
        loadRegion(currentRegion);
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
     * Bind click events to region selection buttons
     */
    function bindRegionSelectors() {
        regionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                regionButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                
                const targetBtn = e.currentTarget;
                targetBtn.classList.add('active');
                targetBtn.setAttribute('aria-pressed', 'true');

                const newRegion = targetBtn.getAttribute('data-region');
                if (newRegion !== currentRegion) {
                    currentRegion = newRegion;
                    loadRegion(currentRegion);
                }
            });
        });
    }

    /**
     * Load SVG and bind dish interactions for a given region
     * @param {string} regionKey - The key corresponding to THALI_DATA
     */
    function loadRegion(regionKey) {
        // Reset info panel
        resetInfoPanel();

        // Inject SVG template
        const svgHTML = window.SVG_TEMPLATES[regionKey];
        if (svgHTML) {
            svgContainer.innerHTML = svgHTML;
            bindDishInteractions(regionKey);
        } else {
            svgContainer.innerHTML = '<p>Error loading SVG.</p>';
        }
    }

    /**
     * Bind hover and keyboard events to all .dish elements in the current SVG
     */
    function bindDishInteractions(regionKey) {
        const dishes = svgContainer.querySelectorAll('.dish');
        const regionData = window.THALI_DATA[regionKey].dishes;

        dishes.forEach(dish => {
            const dishId = dish.getAttribute('id');
            const data = regionData[dishId];

            if (!data) return;

            // Mouse Events
            dish.addEventListener('mouseenter', () => updateInfoPanel(data, dish));
            // Optional: clear on leave, but keeping it visible is often better UX for reading
            // dish.addEventListener('mouseleave', resetInfoPanel); 
            
            // Touch/Click Events (for mobile)
            dish.addEventListener('click', () => updateInfoPanel(data, dish));

            // Keyboard Accessibility (Enter or Space)
            dish.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateInfoPanel(data, dish);
                }
            });
        });
    }

    /**
     * Update the info panel with dish details
     */
    function updateInfoPanel(dishData, dishElement) {
        // Remove active class from all dishes
        const allDishes = svgContainer.querySelectorAll('.dish');
        allDishes.forEach(d => d.classList.remove('active-dish'));

        // Add active class to current dish
        if (dishElement) {
            dishElement.classList.add('active-dish');
            
            // SVG transform origin trick: dynamically set transform-origin to the center of the bounding box
            const bbox = dishElement.getBBox();
            const cx = bbox.x + bbox.width / 2;
            const cy = bbox.y + bbox.height / 2;
            dishElement.style.transformOrigin = `${cx}px ${cy}px`;
        }

        // Update DOM
        dishNameEl.textContent = dishData.name;
        dishDescEl.textContent = dishData.description;
        
        ingredientsListEl.innerHTML = '';
        dishData.ingredients.forEach(ing => {
            const li = document.createElement('li');
            li.textContent = ing;
            ingredientsListEl.appendChild(li);
        });

        // Toggle visibility
        emptyState.classList.add('hidden');
        dishDetails.classList.remove('hidden');
    }

    /**
     * Reset the info panel to its empty state
     */
    function resetInfoPanel() {
        emptyState.classList.remove('hidden');
        dishDetails.classList.add('hidden');
    }

    // Run initialization
    document.addEventListener('DOMContentLoaded', init);

})();
