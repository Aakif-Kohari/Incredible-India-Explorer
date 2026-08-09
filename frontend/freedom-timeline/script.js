// script.js - Freedom Struggle Timeline Logic
// Vanilla JavaScript with Leaflet Integration and Filtering

(function () {
    'use strict';

    if (typeof window.FREEDOM_TIMELINE_DATA === 'undefined') {
        console.error('Timeline data not loaded!');
        return;
    }

    // Chronologically ordered timeline events
    const allEvents = window.FREEDOM_TIMELINE_DATA.sort((a, b) => a.year - b.year);
    let filteredEvents = [...allEvents];
    let activeEventIndex = 0;

    // DOM Elements
    const timelineTrack = document.getElementById('timeline-track');
    const timelineContainer = document.getElementById('timeline-container');
    const themeBtn = document.getElementById('theme-toggle');
    const categoryFilter = document.getElementById('category-filter');
    const yearMinInput = document.getElementById('year-min');
    const yearMaxInput = document.getElementById('year-max');
    const yearRangeLabel = document.getElementById('year-range-label');
    const slideLeftBtn = document.getElementById('slide-left');
    const slideRightBtn = document.getElementById('slide-right');

    // Modal Elements
    const modal = document.getElementById('event-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalYear = document.getElementById('modal-year');
    const modalTitle = document.getElementById('modal-title');
    const modalImagePlaceholder = document.getElementById('modal-image-placeholder');
    const modalLeaders = document.getElementById('modal-leaders');
    const modalLocation = document.getElementById('modal-location');
    const modalDescription = document.getElementById('modal-description');
    const modalSignificance = document.getElementById('modal-significance');
    const modalDeepDiveLink = document.getElementById('modal-deep-dive-link');
    const btnModalPrev = document.getElementById('btn-modal-prev');
    const btnModalNext = document.getElementById('btn-modal-next');

    // Leaflet Map Reference
    let map;
    let markersLayer;

    // --- Theme Logic ---
    let isDarkMode = !document.body.classList.contains('light-theme');
    
    function syncThemeUI(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            themeBtn.textContent = '🌙';
            themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
        } else {
            document.body.classList.remove('light-theme');
            themeBtn.textContent = '☀️';
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        }
        if (window.updateMapTheme) {
            window.updateMapTheme(theme);
        }
    }

    themeBtn.addEventListener('click', () => {
        const light = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', light ? 'light' : 'dark');
        syncThemeUI(light ? 'light' : 'dark');
    });

    const initialTheme = localStorage.getItem('theme') || 'dark';
    syncThemeUI(initialTheme);

    // --- Initialize Leaflet Map ---
    function initMap() {
        const mapContainer = document.getElementById('timeline-map');
        if (!mapContainer || typeof L === 'undefined') return;

        // India coordinates
        map = L.map('timeline-map', {
            scrollWheelZoom: false,
            zoomControl: true
        }).setView([22.9734, 78.6569], 5);

        markersLayer = L.layerGroup().addTo(map);

        let tileLayer;
        window.updateMapTheme = function (theme) {
            if (tileLayer) map.removeLayer(tileLayer);
            const url = theme === 'light' 
                ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
                : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
            
            tileLayer = L.tileLayer(url, {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
            }).addTo(map);
        };

        window.updateMapTheme(localStorage.getItem('theme') || 'dark');
    }

    // Helper to get custom divIcon color based on category
    function getCategoryColor(category) {
        switch (category) {
            case "Early Resistance": return "#ef4444";
            case "Swadeshi": return "#d97706";
            case "Gandhian": return "#10b981";
            case "Revolutionary": return "#db2777";
            case "Armed/Military": return "#1e3a8a";
            case "Constitutional": return "#4b5563";
            default: return "#f97316";
        }
    }

    // Update Map Markers
    function updateMapMarkers() {
        if (!markersLayer) return;
        markersLayer.clearLayers();

        filteredEvents.forEach((event, idx) => {
            const color = getCategoryColor(event.category);
            const customIcon = L.divIcon({
                className: 'timeline-map-marker',
                html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.5);"></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7]
            });

            const marker = L.marker(event.coords, { icon: customIcon });
            marker.bindPopup(`<b>${event.year}: ${event.title}</b><br>${event.location}`);
            marker.on('click', () => {
                openModal(idx);
            });
            markersLayer.addLayer(marker);
        });
    }

    // --- Render Timeline Track ---
    function renderTimeline() {
        const existingNodes = timelineTrack.querySelectorAll('.timeline-node');
        existingNodes.forEach(node => node.remove());

        if (filteredEvents.length === 0) {
            const emptyNode = document.createElement('div');
            emptyNode.className = 'timeline-empty-message';
            emptyNode.textContent = 'No events match the selected filters.';
            timelineTrack.appendChild(emptyNode);
            return;
        }

        filteredEvents.forEach((event, index) => {
            const node = document.createElement('div');
            node.className = 'timeline-node';
            
            const marker = document.createElement('div');
            marker.className = 'node-marker';
            marker.style.backgroundColor = getCategoryColor(event.category);

            const connector = document.createElement('div');
            connector.className = 'node-connector';

            const card = document.createElement('div');
            card.className = 'timeline-card';
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `${event.title}, ${event.year}`);
            
            card.innerHTML = `
                <span class="card-year" style="color: ${getCategoryColor(event.category)}">${event.year}</span>
                <h3 class="card-title">${event.title}</h3>
                <p class="card-desc">${event.description.substring(0, 75)}...</p>
                <div class="card-footer">
                    <span class="card-category-badge" style="background-color: ${getCategoryColor(event.category)}22; color: ${getCategoryColor(event.category)}">${event.category}</span>
                </div>
            `;

            card.addEventListener('click', () => openModal(index));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(index);
                }
            });

            node.appendChild(connector);
            node.appendChild(marker);
            node.appendChild(card);
            
            timelineTrack.appendChild(node);
        });
    }

    // --- Modal Logic ---
    function openModal(index) {
        if (index < 0 || index >= filteredEvents.length) return;
        activeEventIndex = index;
        const event = filteredEvents[index];

        modalYear.textContent = event.year;
        modalTitle.textContent = event.title;
        modalLeaders.textContent = event.leaders.join(', ');
        modalLocation.textContent = event.location;
        modalDescription.textContent = event.description;
        modalSignificance.textContent = event.significance;
        
        modalImagePlaceholder.textContent = event.imageEmoji;
        modalImagePlaceholder.style.backgroundColor = event.imageColor || getCategoryColor(event.category);

        if (event.link) {
            modalDeepDiveLink.href = event.link;
            document.getElementById('modal-deep-dive-box').style.display = 'block';
        } else {
            document.getElementById('modal-deep-dive-box').style.display = 'none';
        }

        // Show Modal
        modal.showModal();
        document.body.style.overflow = 'hidden';

        // Update Prev/Next buttons visibility
        btnModalPrev.disabled = index === 0;
        btnModalNext.disabled = index === filteredEvents.length - 1;

        // Focus map on coordinates
        if (map && event.coords) {
            map.setView(event.coords, 7);
        }
    }

    function closeModal() {
        modal.close();
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    btnModalPrev.addEventListener('click', () => {
        if (activeEventIndex > 0) {
            openModal(activeEventIndex - 1);
        }
    });

    btnModalNext.addEventListener('click', () => {
        if (activeEventIndex < filteredEvents.length - 1) {
            openModal(activeEventIndex + 1);
        }
    });

    // --- Filtering Logic ---
    function applyFilters() {
        let minYear = parseInt(yearMinInput.value, 10);
        let maxYear = parseInt(yearMaxInput.value, 10);

        if (minYear > maxYear) {
            // Swap if min > max
            const temp = minYear;
            minYear = maxYear;
            maxYear = temp;
            yearMinInput.value = minYear;
            yearMaxInput.value = maxYear;
        }

        yearRangeLabel.textContent = `${minYear} - ${maxYear}`;

        const selectedCat = categoryFilter.value;

        filteredEvents = allEvents.filter(event => {
            const matchesCategory = selectedCat === 'all' || event.category === selectedCat;
            const matchesYear = event.year >= minYear && event.year <= maxYear;
            return matchesCategory && matchesYear;
        });

        renderTimeline();
        updateMapMarkers();
        updateActiveTimelineNode();
    }

    categoryFilter.addEventListener('change', applyFilters);
    yearMinInput.addEventListener('input', applyFilters);
    yearMaxInput.addEventListener('input', applyFilters);

    // --- Horizonal Scroll & Buttons ---
    slideLeftBtn.addEventListener('click', () => {
        timelineContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    slideRightBtn.addEventListener('click', () => {
        timelineContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Mouse Dragging
    let isDown = false;
    let startX;
    let scrollLeft;

    timelineContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        timelineContainer.classList.add('active');
        startX = e.pageX - timelineContainer.offsetLeft;
        scrollLeft = timelineContainer.scrollLeft;
    });

    timelineContainer.addEventListener('mouseleave', () => {
        isDown = false;
        timelineContainer.classList.remove('active');
    });

    timelineContainer.addEventListener('mouseup', () => {
        isDown = false;
        timelineContainer.classList.remove('active');
    });

    let isTicking = false;

    timelineContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                const x = e.pageX - timelineContainer.offsetLeft;
                const walk = (x - startX) * 2;
                timelineContainer.scrollLeft = scrollLeft - walk;
                isTicking = false;
            });
            isTicking = true;
        }
    });

    // Wheel Scroll to Horizontal
    timelineContainer.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    timelineContainer.scrollLeft += e.deltaY;
                    isTicking = false;
                });
                isTicking = true;
            }
        }
    }, { passive: false });

    // Active Node Highlight logic
    function updateActiveTimelineNode() {
        const containerCenter = timelineContainer.scrollLeft + timelineContainer.clientWidth / 2;
        const nodes = timelineTrack.querySelectorAll('.timeline-node');
        
        let closestNode = null;
        let minDistance = Infinity;

        nodes.forEach(node => {
            const nodeCenter = node.offsetLeft + node.clientWidth / 2;
            const distance = Math.abs(nodeCenter - containerCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestNode = node;
            }
            node.classList.remove('active-node');
        });

        if (closestNode) {
            closestNode.classList.add('active-node');
        }
    }

    timelineContainer.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                updateActiveTimelineNode();
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

    // --- Init ---
    initMap();
    applyFilters();

})();
