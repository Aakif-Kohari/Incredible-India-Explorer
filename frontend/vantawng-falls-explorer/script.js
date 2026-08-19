/**
 * Vantawng Falls Explorer
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ================================================================
       1. LANDSCAPE TABS INTERACTIVITY
       ================================================================ */
    const landscapeTabs = document.querySelectorAll('.landscape-tab');
    const landscapePanels = document.querySelectorAll('.landscape-panel');

    landscapeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            landscapeTabs.forEach(t => t.classList.remove('active'));
            landscapePanels.forEach(p => {
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
        const mapContainer = document.getElementById('vantawng-map');
        if (!mapContainer || typeof L === 'undefined') return;

        // Coordinates for Vantawng Falls (Approx 23.2333, 92.7500)
        const fallsCoords = [23.2333, 92.7500];
        
        // Initialize map
        const map = L.map('vantawng-map', {
            center: fallsCoords,
            zoom: 12,
            scrollWheelZoom: false // Prevent accidental scrolling
        });

        // Add tile layer (using standard OpenStreetMap for consistency)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        // Add marker for Vantawng Falls
        const marker = L.marker(fallsCoords).addTo(map);
        
        // Add popup
        marker.bindPopup(`
            <div style="text-align: center;">
                <strong>Vantawng Falls</strong><br>
                Mizoram's tallest waterfall (229m)<br>
                <em>Vanva River</em>
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
