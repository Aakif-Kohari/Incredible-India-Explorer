/**
 * Nohsngithiang Falls Explorer
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ================================================================
       1. LEAFLET MAP INITIALIZATION
       ================================================================ */
    function initMap() {
        const mapContainer = document.getElementById('nohsngithiang-map');
        if (!mapContainer || typeof L === 'undefined') return;

        // Coordinates for Nohsngithiang Falls (Approx 25.2344, 91.7161)
        const fallsCoords = [25.2344, 91.7161];
        
        // Initialize map
        const map = L.map('nohsngithiang-map', {
            center: fallsCoords,
            zoom: 13,
            scrollWheelZoom: false // Prevent accidental scrolling
        });

        // Add tile layer (using standard OpenStreetMap for consistency)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        // Add marker for Nohsngithiang Falls
        const marker = L.marker(fallsCoords).addTo(map);
        
        // Add popup
        marker.bindPopup(`
            <div style="text-align: center;">
                <strong>Nohsngithiang Falls</strong><br>
                (Seven Sisters Falls)<br>
                <em>Cherrapunji, Meghalaya</em>
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

    /* ================================================================
       2. PANORAMA VIEWER ENHANCEMENT
       ================================================================ */
    const panoramaScroll = document.querySelector('.panorama-scroll');
    const panoramaHint = document.querySelector('.panorama-hint');

    if (panoramaScroll && panoramaHint) {
        // Hide hint once user starts scrolling
        panoramaScroll.addEventListener('scroll', function onScroll() {
            panoramaHint.style.opacity = '0';
            panoramaHint.style.transition = 'opacity 0.5s ease';
            // Remove listener after first interaction
            panoramaScroll.removeEventListener('scroll', onScroll);
        });
    }
});
