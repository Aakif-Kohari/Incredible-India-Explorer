/**
 * Nuranang Falls Explorer
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ================================================================
       1. GEOGRAPHIC FLOW INTERACTIVITY
       ================================================================ */
    const flowStages = document.querySelectorAll('.flow-stage');
    const flowPanels = document.querySelectorAll('.flow-panel');

    flowStages.forEach(stage => {
        stage.addEventListener('click', () => {
            // Remove active classes
            flowStages.forEach(s => s.classList.remove('active'));
            flowPanels.forEach(p => {
                p.classList.remove('active');
                p.classList.add('hidden');
            });

            // Add active class to clicked
            stage.classList.add('active');
            
            // Show corresponding panel
            const targetId = `panel-${stage.dataset.stage}`;
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
        const mapContainer = document.getElementById('nuranang-map');
        if (!mapContainer || typeof L === 'undefined') return;

        // Coordinates for Nuranang Falls (Approx 27.5833, 92.1167)
        const fallsCoords = [27.5831, 92.0573]; // Adjusted closer to Jang
        
        // Initialize map
        const map = L.map('nuranang-map', {
            center: fallsCoords,
            zoom: 12,
            scrollWheelZoom: false // Prevent accidental scrolling
        });

        // Add tile layer (using standard OpenStreetMap for consistency)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        // Add marker for Nuranang Falls
        const marker = L.marker(fallsCoords).addTo(map);
        
        // Add popup
        marker.bindPopup(`
            <div style="text-align: center;">
                <strong>Nuranang Falls</strong><br>
                Tawang District, Arunachal Pradesh<br>
                <em>(Bong Bong Falls)</em>
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
