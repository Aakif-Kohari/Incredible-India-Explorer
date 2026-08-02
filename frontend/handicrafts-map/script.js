// script.js - Handicrafts & Weaves Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    let data = window.handicraftsData;
    if (!data || !data.length) {
        console.error("Handicrafts data is missing.");
        return;
    }

    // Sort data alphabetically by name
    data.sort((a, b) => a.name.localeCompare(b.name));

    // DOM Elements
    const themeBtn = document.getElementById('theme-toggle');
    const galleryContainer = document.getElementById('craft-gallery');
    const alphabetNav = document.getElementById('alphabet-nav');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // State
    let currentFilter = 'all';

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

    // --- Filter Logic ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            const target = e.target;
            target.classList.add('active');
            currentFilter = target.getAttribute('data-filter');
            renderDirectory();
        });
    });

    // --- Rendering Logic ---
    function renderDirectory() {
        galleryContainer.innerHTML = '';
        
        // Filter Data
        const filteredData = currentFilter === 'all' 
            ? data 
            : data.filter(item => item.category === currentFilter);

        if (filteredData.length === 0) {
            galleryContainer.innerHTML = `<div class="no-results">No crafts found in this category.</div>`;
            updateSidebar(new Set());
            return;
        }

        // Group by starting letter
        const groups = {};
        filteredData.forEach(item => {
            const letter = item.name.charAt(0).toUpperCase();
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(item);
        });

        // Render groups
        const activeLetters = new Set(Object.keys(groups));
        
        // Create fragments for performance
        const fragment = document.createDocumentFragment();

        Object.keys(groups).sort().forEach(letter => {
            const section = document.createElement('div');
            section.className = 'alpha-section';
            section.id = `section-${letter}`;

            const header = document.createElement('h2');
            header.className = 'alpha-header';
            header.textContent = letter;
            section.appendChild(header);

            const grid = document.createElement('div');
            grid.className = 'cards-grid';

            groups[letter].forEach(craft => {
                grid.appendChild(createCard(craft));
            });

            section.appendChild(grid);
            fragment.appendChild(section);
        });

        galleryContainer.appendChild(fragment);
        updateSidebar(activeLetters);
    }

    function createCard(craft) {
        const card = document.createElement('article');
        card.className = 'craft-card';

        // Using placeholder for actual images
        card.innerHTML = `
            <div class="card-image-wrapper">
                <span class="card-image-text">[ Image: ${craft.name} ]</span>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${craft.name}</h3>
                    <span class="card-category">${craft.category}</span>
                </div>
                <div class="card-state">📍 ${craft.state}</div>
                <p class="card-description">${craft.description}</p>
                
                <div class="card-meta">
                    <div class="meta-row">
                        <span class="meta-label">Materials</span>
                        <span class="meta-value">${craft.materials.join(', ')}</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-label">Technique</span>
                        <span class="meta-value">${craft.technique}</span>
                    </div>
                </div>
            </div>
        `;
        return card;
    }

    // --- Sidebar Navigation ---
    function updateSidebar(activeLetters) {
        alphabetNav.innerHTML = '';
        
        // Generate A-Z
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const isActive = activeLetters.has(letter);
            
            const link = document.createElement('a');
            link.href = `#section-${letter}`;
            link.className = `alpha-link ${isActive ? '' : 'disabled'}`;
            link.textContent = letter;
            link.setAttribute('aria-label', `Jump to ${letter}`);
            
            // Smooth Scroll
            if (isActive) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetSection = document.getElementById(`section-${letter}`);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Push state to history for accessibility and UX
                        history.pushState(null, null, `#section-${letter}`);
                    }
                });
            }

            alphabetNav.appendChild(link);
        }
    }

    // --- Boot ---
    renderDirectory();

})();
