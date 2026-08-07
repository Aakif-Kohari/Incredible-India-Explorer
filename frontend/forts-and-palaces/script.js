// script.js - Forts & Palaces Gallery Logic
// Encapsulated in IIFE to prevent global namespace pollution

(function () {
    'use strict';

    // --- Gallery Data ---
    const galleryData = [
        // Rajput
        {
            id: 'amber-fort',
            name: 'Amber Fort',
            dynasty: 'rajput',
            dynastyLabel: 'Rajput',
            location: 'Jaipur, Rajasthan',
            period: '16th Century',
            materials: 'Red sandstone and marble',
            features: ['Suraj Pol (Sun Gate)', 'Sheesh Mahal (Mirror Palace)', 'Diwan-e-Aam', 'Maota Lake'],
            emoji: '🕌'
        },
        {
            id: 'mehrangarh-fort',
            name: 'Mehrangarh Fort',
            dynasty: 'rajput',
            dynastyLabel: 'Rajput',
            location: 'Jodhpur, Rajasthan',
            period: '15th Century',
            materials: 'Red sandstone',
            features: ['Massive defensive walls', 'Pol courtyards', 'Carved balconies', 'Cannon bastions'],
            emoji: '🏰'
        },
        {
            id: 'city-palace-udaipur',
            name: 'City Palace',
            dynasty: 'rajput',
            dynastyLabel: 'Rajput',
            location: 'Udaipur, Rajasthan',
            period: '16th Century',
            materials: 'Granite and marble',
            features: ['Lake Pichola views', 'Peacock Square (Mor Chowk)', 'Intricate mirror work', 'Hanging gardens'],
            emoji: '🛕'
        },
        // Maratha
        {
            id: 'raigad-fort',
            name: 'Raigad Fort',
            dynasty: 'maratha',
            dynastyLabel: 'Maratha',
            location: 'Raigad, Maharashtra',
            period: '17th Century',
            materials: 'Basalt rock',
            features: ['Maha Darwaja', 'Hirakani Buruj', 'King\'s Durbar', 'Strategic hilltop location'],
            emoji: '⛰️'
        },
        {
            id: 'shaniwar-wada',
            name: 'Shaniwar Wada',
            dynasty: 'maratha',
            dynastyLabel: 'Maratha',
            location: 'Pune, Maharashtra',
            period: '18th Century',
            materials: 'Stone, brick, and teakwood',
            features: ['Dilli Darwaza (Delhi Gate)', 'Lotus-shaped fountain', 'Intricate teak carvings', 'Fortified walls'],
            emoji: '🏯'
        },
        // Mughal
        {
            id: 'red-fort',
            name: 'Red Fort',
            dynasty: 'mughal',
            dynastyLabel: 'Mughal',
            location: 'Delhi',
            period: '17th Century',
            materials: 'Red sandstone',
            features: ['Lahori Gate', 'Diwan-i-Khas', 'Rang Mahal', 'Mughal gardens (Hayat Bakhsh Bagh)'],
            emoji: '🧱'
        },
        {
            id: 'agra-fort',
            name: 'Agra Fort',
            dynasty: 'mughal',
            dynastyLabel: 'Mughal',
            location: 'Agra, Uttar Pradesh',
            period: '16th Century',
            materials: 'Red sandstone and white marble',
            features: ['Jahangiri Mahal', 'Khas Mahal', 'Musamman Burj', 'Double ramparts'],
            emoji: '🛡️'
        }
    ];

    // --- DOM Elements ---
    const gridContainer = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const themeBtn = document.getElementById('theme-toggle');

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

    // --- Render Gallery ---
    function renderGallery(filter = 'all') {
        // Clear grid
        gridContainer.innerHTML = '';

        // Filter data
        const filteredData = filter === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.dynasty === filter);

        // Generate HTML
        filteredData.forEach(item => {
            const card = document.createElement('article');
            card.className = 'gallery-card';
            card.tabIndex = 0; // Make focusable for keyboard navigation
            card.setAttribute('aria-label', `${item.name}, ${item.dynastyLabel} architecture`);

            // In a real app, you would load `<img src="assets/${item.id}.jpg" class="card-image" alt="${item.name}">`
            // Since we don't have images, we use an emoji placeholder with aspect-ratio
            
            let featuresHtml = item.features.map(f => `<li>${f}</li>`).join('');

            card.innerHTML = `
                <!-- Image Container with Aspect Ratio (4/5) -->
                <div class="card-image-container">
                    <!-- Placeholder for object-fit image -->
                    <div class="card-image" style="display: flex; align-items: center; justify-content: center; background: var(--gallery-ivory); width: 100%; height: 100%;">
                        ${item.emoji}
                    </div>
                </div>

                <!-- Card Content -->
                <div class="card-content">
                    <div class="card-header">
                        <h2 class="card-title">${item.name}</h2>
                        <span class="dynasty-badge dynasty-${item.dynasty}">${item.dynastyLabel}</span>
                    </div>
                    <div class="card-meta">
                        <span>📍 ${item.location}</span>
                        <span>⏳ ${item.period}</span>
                    </div>
                </div>

                <!-- Hover/Focus Overlay -->
                <div class="card-overlay">
                    <h3 class="overlay-title">${item.name}</h3>
                    <div class="overlay-details">
                        <p><strong>Dynasty:</strong> ${item.dynastyLabel}</p>
                        <p><strong>Materials:</strong> ${item.materials}</p>
                        <p><strong>Built:</strong> ${item.period}</p>
                        <p><strong>Architectural Features:</strong></p>
                        <ul class="features-list">
                            ${featuresHtml}
                        </ul>
                    </div>
                </div>
            `;

            // Mobile/touch support: toggle focus on click so overlay triggers without hover
            card.addEventListener('click', () => {
                card.focus();
            });

            gridContainer.appendChild(card);
        });
    }

    // --- Filtering Logic ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            const target = e.currentTarget;
            target.classList.add('active');
            
            // Render filtered
            const filterValue = target.getAttribute('data-filter');
            renderGallery(filterValue);
        });
    });

    // Initialize
    renderGallery();

})();
