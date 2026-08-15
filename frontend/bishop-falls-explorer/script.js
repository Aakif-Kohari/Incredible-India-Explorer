/**
 * Bishop Falls Explorer
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ================================================================
       1. TWIN CASCADES COMPARISON INTERACTIVITY
       ================================================================ */
    const comparisonTabs = document.querySelectorAll('.comparison-tab');
    const comparisonPanels = document.querySelectorAll('.comparison-panel');

    comparisonTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            comparisonTabs.forEach(t => t.classList.remove('active'));
            comparisonPanels.forEach(p => {
                p.classList.remove('active');
                p.classList.add('hidden');
            });

            // Add active class to clicked
            tab.classList.add('active');
            
            // Show corresponding panel
            const targetId = `tab-${tab.dataset.tab}`;
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
                targetPanel.classList.add('active');
            }
        });
    });

    /* ================================================================
       2. LEAFLET MAP INITIALIZATION
       ================================================================ */
    function initMap() {
        const mapContainer = document.getElementById('bishop-map');
        if (!mapContainer || typeof L === 'undefined') return;

        // Coordinates for Bishop Falls (Approx 25.5905, 91.8841)
        const fallsCoords = [25.5905, 91.8841];
        
        // Initialize map
        const map = L.map('bishop-map', {
            center: fallsCoords,
            zoom: 13,
            scrollWheelZoom: false // Prevent accidental scrolling
        });

        // Add tile layer (using standard OpenStreetMap for consistency)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        // Add marker for Bishop Falls
        const marker = L.marker(fallsCoords).addTo(map);
        
        // Add popup
        marker.bindPopup(`
            <div style="text-align: center;">
                <strong>Bishop Falls & Beadon Falls</strong><br>
                <em>Shillong, Meghalaya</em>
            </div>
        `).openPopup();

        // Enable scroll wheel zoom when clicked
        map.on('click', () => {
            if (!map.scrollWheelZoom.enabled()) {
                map.scrollWheelZoom.enable();
            }
        });

        // Disable scroll wheel zoom when mouse leaves
        map.on('mouseout', () => {
            map.scrollWheelZoom.disable();
        });
    }

    // Delay map initialization slightly to ensure container is fully rendered
    setTimeout(initMap, 100);
});
