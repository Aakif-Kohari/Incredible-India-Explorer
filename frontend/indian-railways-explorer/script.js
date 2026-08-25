(function () {
    'use strict';

    // Projection mapping for the specific India SVG viewBox (0 0 612 696)
    function project(lat, lng) {
        var minLng = 68.1;
        var maxLng = 97.4;
        var minLat = 6.7;
        var maxLat = 37.4;

        var x = ((lng - minLng) / (maxLng - minLng)) * 612;
        var y = ((maxLat - lat) / (maxLat - minLat)) * 696;
        return { x: x, y: y };
    }

    function init() {
        renderTimeline();
        renderTrains();
        renderHeritage();
        initMap();
    }

    function renderTimeline() {
        var container = document.getElementById('timeline-container');
        if (!container) return;

        var html = '';
        RAILWAY_MILESTONES.forEach(function (item) {
            html += `
                <div class="timeline-item">
                    <div class="timeline-year">${item.year}</div>
                    <div class="timeline-content">
                        <h3 class="timeline-title">${item.title}</h3>
                        <div class="timeline-loc">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            ${item.location}
                        </div>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function renderTrains() {
        var container = document.getElementById('trains-grid');
        if (!container) return;

        var html = '';
        ICONIC_TRAINS.forEach(function (train) {
            html += `
                <div class="train-card">
                    <img src="${train.image}" alt="${train.name}" class="train-img" loading="lazy">
                    <div class="train-content">
                        <div class="train-category">${train.category}</div>
                        <h3 class="train-name">${train.name}</h3>
                        <div class="train-route">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                            <span>${train.route}</span>
                        </div>
                        <p class="train-desc">${train.feature}</p>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function renderHeritage() {
        var container = document.getElementById('heritage-gallery');
        if (!container) return;

        var html = '';
        HERITAGE_ITEMS.forEach(function (item) {
            html += `
                <div class="heritage-card">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="heritage-overlay">
                        <div class="heritage-type">${item.type}</div>
                        <h3 class="heritage-title">${item.title}</h3>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function initMap() {
        var container = document.getElementById('map-container');
        if (!container) return;

        var statesData = typeof INDIA_MAP_STATES !== 'undefined' ? INDIA_MAP_STATES : [];
        if (!statesData.length) {
            container.innerHTML = '<p>Error loading map data.</p>';
            return;
        }

        var svgHtml = '<svg viewBox="0 0 612 696" class="india-svg-map" xmlns="http://www.w3.org/2000/svg">';
        
        // Draw base states
        statesData.forEach(function (state) {
            svgHtml += `<path d="${state.d}" id="${state.id}" class="map-state" title="${state.n}"></path>`;
        });

        // Draw routes (paths)
        MAJOR_ROUTES.forEach(function (route) {
            var pathData = '';
            route.coordinates.forEach(function (coord, index) {
                var pos = project(coord.lat, coord.lng);
                pathData += (index === 0 ? 'M' : ' L') + pos.x + ',' + pos.y;
            });
            svgHtml += `<path d="${pathData}" class="map-route" data-route-id="${route.id}" title="${route.name}"></path>`;
        });

        // Draw important stations (circles)
        IMPORTANT_STATIONS.forEach(function (station) {
            var pos = project(station.coordinates.lat, station.coordinates.lng);
            svgHtml += `<circle cx="${pos.x}" cy="${pos.y}" r="6" class="map-station" data-station-id="${station.id}" title="${station.name}"></circle>`;
        });

        svgHtml += '</svg>';
        container.innerHTML = svgHtml;

        bindMapEvents();
    }

    function bindMapEvents() {
        var routes = document.querySelectorAll('.map-route');
        var stations = document.querySelectorAll('.map-station');

        routes.forEach(function (routeEl) {
            routeEl.addEventListener('click', function () {
                clearActiveMap();
                routeEl.classList.add('active');
                var routeId = routeEl.getAttribute('data-route-id');
                var routeData = MAJOR_ROUTES.find(r => r.id === routeId);
                if (routeData) {
                    showRouteInfo(routeData);
                }
            });
        });

        stations.forEach(function (stationEl) {
            stationEl.addEventListener('click', function () {
                clearActiveMap();
                stationEl.classList.add('active');
                var stationId = stationEl.getAttribute('data-station-id');
                var stationData = IMPORTANT_STATIONS.find(s => s.id === stationId);
                if (stationData) {
                    showStationInfo(stationData);
                }
            });
        });
    }

    function clearActiveMap() {
        document.querySelectorAll('.map-route.active, .map-station.active').forEach(function(el) {
            el.classList.remove('active');
        });
    }

    function showRouteInfo(data) {
        var panel = document.getElementById('route-info-panel');
        var stopsHtml = data.cities.map(function(city) {
            return `<span class="stop-badge">${city}</span>`;
        }).join('');

        panel.innerHTML = `
            <div class="info-header">
                <span class="info-region">${data.region}</span>
                <h3 class="info-title">${data.name}</h3>
            </div>
            <p>${data.description}</p>
            <div class="info-section-title">Major Stops</div>
            <div class="info-stops">
                ${stopsHtml}
            </div>
        `;
    }

    function showStationInfo(data) {
        var panel = document.getElementById('route-info-panel');
        panel.innerHTML = `
            <div class="info-header">
                <span class="info-region">${data.city}, ${data.state}</span>
                <h3 class="info-title">${data.name}</h3>
            </div>
            <p>${data.significance}</p>
        `;
    }

    document.addEventListener('DOMContentLoaded', init);

})();
