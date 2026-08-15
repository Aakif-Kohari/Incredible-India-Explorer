// script.js - Epic Mythology Map Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    const data = window.mythologyData;
    if (!data || !data.length) {
        console.error("Mythology data is missing.");
        return;
    }

    // DOM Elements
    const themeBtn = document.getElementById('theme-toggle');
    const markersLayer = document.getElementById('markers-layer');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('location-search');
    const searchResults = document.getElementById('search-results');
    
    // Panel Elements
    const emptyState = document.getElementById('empty-state');
    const contentState = document.getElementById('content-state');
    const panelName = document.getElementById('panel-name');
    const panelEpic = document.getElementById('panel-epic');
    const panelState = document.getElementById('panel-state');
    const panelCharacters = document.getElementById('panel-characters');
    const panelSignificance = document.getElementById('panel-significance');
    const panelDescription = document.getElementById('panel-description');

    let currentFilter = 'All';
    let markersMap = new Map(); // Store marker DOM elements by ID

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
            } else {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙';
            }
        });
    }

    // --- Security Helper ---
    // Strict text rendering, avoids innerHTML completely for data-driven fields
    function setSafeText(element, text) {
        if(element) element.textContent = text || '';
    }

    // --- Map Rendering ---
    function renderMarkers() {
        markersLayer.innerHTML = '';
        markersMap.clear();

        data.forEach((location, index) => {
            // Create Marker
            const marker = document.createElement('button');
            marker.className = 'map-marker';
            marker.style.left = `${location.coordinates.x}%`;
            marker.style.top = `${location.coordinates.y}%`;
            marker.dataset.epic = location.epic;
            marker.dataset.id = location.id;
            
            // Accessibility
            marker.setAttribute('aria-label', `${location.name}, ${location.epic} location`);
            marker.setAttribute('role', 'button');
            marker.setAttribute('tabindex', '0');

            // Tooltip
            const tooltip = document.createElement('span');
            tooltip.className = 'marker-tooltip';
            setSafeText(tooltip, location.name);
            marker.appendChild(tooltip);

            // Events
            marker.addEventListener('click', () => selectLocation(location.id));
            marker.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectLocation(location.id);
                }
            });

            markersLayer.appendChild(marker);
            markersMap.set(location.id, marker);
        });
    }

    // --- Filtering ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            const target = e.target;
            target.classList.add('active');
            
            currentFilter = target.getAttribute('data-filter');
            applyFilter();
        });
    });

    function applyFilter() {
        data.forEach(location => {
            const marker = markersMap.get(location.id);
            if (marker) {
                if (currentFilter === 'All' || location.epic === currentFilter) {
                    marker.classList.remove('hidden');
                } else {
                    marker.classList.add('hidden');
                }
            }
        });
        
        // Hide panel if current selection gets filtered out
        const activeMarker = document.querySelector('.map-marker.selected');
        if (activeMarker && activeMarker.classList.contains('hidden')) {
            clearSelection();
        }
    }

    // --- Selection and Panel Update ---
    function selectLocation(id) {
        // Find data
        const location = data.find(loc => loc.id === id);
        if (!location) return;

        // Visual Selection
        markersMap.forEach(m => m.classList.remove('selected'));
        const marker = markersMap.get(id);
        if (marker) {
            marker.classList.add('selected');
            // Ensure visible if filtered out (shouldn't happen through UI click, but through search)
            if (marker.classList.contains('hidden')) {
                // reset filter visually
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    if (b.dataset.filter === 'All') b.classList.add('active');
                });
                currentFilter = 'All';
                applyFilter();
                marker.classList.add('selected');
            }
        }

        // Securely Update Panel Content
        emptyState.classList.add('hidden');
        contentState.classList.remove('hidden');

        setSafeText(panelName, location.name);
        
        setSafeText(panelEpic, location.epic);
        panelEpic.className = 'epic-badge'; // reset
        if(location.epic === 'Ramayana') panelEpic.classList.add('rama-badge');
        if(location.epic === 'Mahabharata') panelEpic.classList.add('maha-badge');

        setSafeText(panelState, location.state);
        
        // Characters list securely generated
        panelCharacters.innerHTML = ''; // safe to clear
        location.characters.forEach(char => {
            const tag = document.createElement('span');
            tag.className = 'char-tag';
            setSafeText(tag, char);
            panelCharacters.appendChild(tag);
        });

        setSafeText(panelSignificance, location.significance);
        setSafeText(panelDescription, location.description);
        
        // Focus panel for screen readers implicitly by announcing via aria-live
    }

    function clearSelection() {
        markersMap.forEach(m => m.classList.remove('selected'));
        emptyState.classList.remove('hidden');
        contentState.classList.add('hidden');
    }

    // --- Search Functionality ---
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }

        // Filter data based on name, epic, or characters
        const matches = data.filter(loc => {
            return loc.name.toLowerCase().includes(query) ||
                   loc.epic.toLowerCase().includes(query) ||
                   loc.characters.some(c => c.toLowerCase().includes(query));
        });

        if (matches.length > 0) {
            searchResults.classList.remove('hidden');
            matches.forEach((match, idx) => {
                const li = document.createElement('li');
                li.className = 'search-item';
                li.setAttribute('role', 'option');
                li.setAttribute('tabindex', '-1');
                
                // Securely build text
                setSafeText(li, `${match.name} (${match.epic})`);
                
                li.addEventListener('click', () => {
                    selectLocation(match.id);
                    searchInput.value = '';
                    searchResults.classList.add('hidden');
                    
                    // Focus marker
                    const m = markersMap.get(match.id);
                    if(m) m.focus();
                });
                
                searchResults.appendChild(li);
            });
        } else {
            searchResults.classList.remove('hidden');
            const li = document.createElement('li');
            li.className = 'search-item';
            setSafeText(li, 'No locations found.');
            li.style.cursor = 'default';
            searchResults.appendChild(li);
        }
    });

    // Close search results on outside click
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });

    // --- Boot ---
    renderMarkers();

})();
