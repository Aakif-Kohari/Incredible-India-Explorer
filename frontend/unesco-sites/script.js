// script.js - UNESCO Sites Directory Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    if (!window.unescoData) {
        console.error("UNESCO data not found!");
        return;
    }

    let sites = [...window.unescoData];
    
    // DOM Elements
    const gridContainer = document.getElementById('unesco-grid');
    const noResults = document.getElementById('no-results');
    
    const searchInput = document.getElementById('search-input');
    const typeFilter = document.getElementById('type-filter');
    const sortSelect = document.getElementById('sort-select');
    const themeBtn = document.getElementById('theme-toggle');

    // Stat Elements
    const statTotal = document.getElementById('stat-total');
    const statCultural = document.getElementById('stat-cultural');
    const statNatural = document.getElementById('stat-natural');
    const statMixed = document.getElementById('stat-mixed');

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

    // --- Statistics ---
    function updateStatistics() {
        // Calculate based on the full dataset
        const total = window.unescoData.length;
        const cultural = window.unescoData.filter(s => s.type === 'Cultural').length;
        const natural = window.unescoData.filter(s => s.type === 'Natural').length;
        const mixed = window.unescoData.filter(s => s.type === 'Mixed').length;

        statTotal.textContent = total;
        statCultural.textContent = cultural;
        statNatural.textContent = natural;
        statMixed.textContent = mixed;
    }

    // --- Render Logic ---
    function renderGrid(dataToRender) {
        gridContainer.innerHTML = '';

        if (dataToRender.length === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
            
            dataToRender.forEach(site => {
                const card = document.createElement('article');
                card.className = 'unesco-card';
                card.tabIndex = 0; // keyboard accessibility
                card.setAttribute('aria-label', `${site.name}, ${site.type} heritage site in ${site.state}, added in ${site.year}`);
                
                const badgeClass = `badge-${site.type.toLowerCase()}`;
                
                // Using emoji as a placeholder for actual images
                card.innerHTML = `
                    <div class="card-image-placeholder" aria-hidden="true" title="${site.name}">
                        ${site.emoji}
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <h2 class="card-title">${site.name}</h2>
                            <span class="card-badge ${badgeClass}">${site.type}</span>
                        </div>
                        <div class="card-meta">
                            <span>📍 ${site.state}</span>
                            <span>🗓️ Added: ${site.year}</span>
                        </div>
                        <p class="card-description">${site.description}</p>
                    </div>
                `;
                
                gridContainer.appendChild(card);
            });
        }
    }

    // --- Filter & Sort Logic ---
    function applyFiltersAndSort() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const typeValue = typeFilter.value.toLowerCase();
        const sortValue = sortSelect.value; // 'oldest' or 'newest'

        let filteredSites = [...window.unescoData];

        // 1. Filter by Search
        if (searchTerm) {
            filteredSites = filteredSites.filter(site => 
                site.name.toLowerCase().includes(searchTerm) || 
                site.state.toLowerCase().includes(searchTerm)
            );
        }

        // 2. Filter by Type
        if (typeValue !== 'all') {
            filteredSites = filteredSites.filter(site => 
                site.type.toLowerCase() === typeValue
            );
        }

        // 3. Sort by Year
        if (sortValue === 'oldest') {
            filteredSites.sort((a, b) => a.year - b.year);
        } else if (sortValue === 'newest') {
            filteredSites.sort((a, b) => b.year - a.year);
        }

        renderGrid(filteredSites);
    }

    // --- Event Listeners ---
    searchInput.addEventListener('input', applyFiltersAndSort);
    typeFilter.addEventListener('change', applyFiltersAndSort);
    sortSelect.addEventListener('change', applyFiltersAndSort);

    // --- Initialization ---
    updateStatistics();
    applyFiltersAndSort(); // Triggers initial render based on default select values (Oldest First, All Types)

})();
