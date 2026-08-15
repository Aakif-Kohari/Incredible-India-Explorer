// script.js - Regional Folk Dances Interaction Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    const data = window.folkDanceData;
    if (!data) {
        console.error("Folk dance data is missing.");
        return;
    }

    // DOM Elements
    const mapArea = document.getElementById('map-area');
    const themeBtn = document.getElementById('theme-toggle');
    const emptyState = document.getElementById('empty-state');
    const danceDetails = document.getElementById('dance-details');
    
    // Panel Elements
    const elDanceName = document.getElementById('dance-name');
    const elDanceState = document.getElementById('dance-state');
    const elDanceDesc = document.getElementById('dance-desc');
    const elDanceCostume = document.getElementById('dance-costume');
    const elDanceFestival = document.getElementById('dance-festival');
    const elDanceInstruments = document.getElementById('dance-instruments');
    const elDanceImage = document.getElementById('dance-image');

    // --- Theme Logic ---
    if (themeBtn) {
        let isDarkMode = localStorage.getItem('theme') === 'dark';
        if (isDarkMode) {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeBtn.textContent = '☀️';
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        }

        themeBtn.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '☀️';
                themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
            } else {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙';
                themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
            }
        });
    }

    // --- Tooltip Setup ---
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    document.body.appendChild(tooltip);

    // --- SVG Loading & Interaction ---
    function initMap() {
        // Fetch the SVG file and inject it inline so we can manipulate its paths
        fetch('assets/india-map.svg')
            .then(response => {
                if (!response.ok) throw new Error("Failed to load SVG map");
                return response.text();
            })
            .then(svgText => {
                mapArea.innerHTML = svgText;
                setupMapInteractions();
            })
            .catch(err => {
                console.error(err);
                mapArea.innerHTML = `<p style="color:var(--text-muted);">Failed to load map.</p>`;
            });
    }

    function setupMapInteractions() {
        const states = document.querySelectorAll('.state:not(.non-interactive)');
        
        // Use event delegation on the SVG container for better performance
        const svgContainer = document.querySelector('#india-map-svg');
        if (!svgContainer) return;

        // Hover events for tooltip
        svgContainer.addEventListener('mousemove', (e) => {
            const target = e.target;
            if (target.classList.contains('state') && !target.classList.contains('non-interactive')) {
                const stateId = target.id;
                const stateData = data[stateId];
                
                if (stateData) {
                    tooltip.textContent = `${stateData.state} - ${stateData.dance}`;
                    tooltip.style.left = e.pageX + 'px';
                    tooltip.style.top = e.pageY + 'px';
                    tooltip.style.opacity = '1';
                }
            } else {
                tooltip.style.opacity = '0';
            }
        });

        svgContainer.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('state')) {
                tooltip.style.opacity = '0';
            }
        });

        // Click and Keyboard events for selection
        states.forEach(statePath => {
            // Handle Click
            statePath.addEventListener('click', () => {
                selectState(statePath);
            });

            // Handle Keyboard (Enter / Space)
            statePath.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectState(statePath);
                }
            });
            
            // Focus events for accessibility tooltip
            statePath.addEventListener('focus', (e) => {
                const stateData = data[statePath.id];
                if (stateData) {
                    const rect = statePath.getBoundingClientRect();
                    tooltip.textContent = `${stateData.state} - ${stateData.dance}`;
                    tooltip.style.left = (rect.left + rect.width / 2 + window.scrollX) + 'px';
                    tooltip.style.top = (rect.top + window.scrollY) + 'px';
                    tooltip.style.opacity = '1';
                }
            });
            
            statePath.addEventListener('blur', () => {
                tooltip.style.opacity = '0';
            });
        });
    }

    function selectState(selectedPath) {
        const stateId = selectedPath.id;
        const stateData = data[stateId];

        if (!stateData) return;

        // Update active class on SVG paths
        document.querySelectorAll('.state').forEach(p => p.classList.remove('active'));
        selectedPath.classList.add('active');

        // Update Panel Data
        updateInfoPanel(stateData);
    }

    function updateInfoPanel(stateData) {
        // Hide empty state, show details
        emptyState.style.display = 'none';
        danceDetails.classList.remove('hidden');

        // Force reflow to re-trigger CSS animation
        danceDetails.style.animation = 'none';
        void danceDetails.offsetWidth;
        danceDetails.style.animation = null;

        // Populate text
        elDanceName.textContent = stateData.dance;
        elDanceState.textContent = stateData.state;
        elDanceDesc.textContent = stateData.description;
        elDanceCostume.textContent = stateData.costume;
        elDanceFestival.textContent = stateData.festival;
        elDanceInstruments.textContent = stateData.instruments.join(', ');

        // Handle Image
        elDanceImage.src = stateData.image;
        elDanceImage.alt = `${stateData.dance} folk dance of ${stateData.state}`;

        // Image error handling (for missing local assets)
        elDanceImage.onerror = function() {
            this.style.opacity = '0';
        };
        elDanceImage.onload = function() {
            this.style.opacity = '1';
        };

        // Scroll on mobile
        if (window.innerWidth <= 992) {
            document.getElementById('info-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // --- Initialization ---
    initMap();

})();
