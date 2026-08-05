(function () {
    'use strict';

    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'light') body.classList.add('light-theme');
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
    });

    const wildlifeData = [
        { name: 'Painted Stork', emoji: '🦩', desc: 'A wading bird that frequents the shallow waters of the marsh.' },
        { name: 'Spot-billed Pelican', emoji: '🦤', desc: 'A large waterbird that nests in the marsh during breeding season.' },
        { name: 'Marsh Crocodile', emoji: '🐊', desc: 'Occasionally spotted in the deeper, undisturbed channels of the wetland.' },
        { name: 'Water Hyacinth', emoji: '🌿', desc: 'An invasive but visually striking aquatic plant that dominates certain zones.' },
        { name: 'Kingfisher', emoji: '🐦', desc: 'The white-throated kingfisher is a common sight hunting along the banks.' }
    ];

    const mapPoints = [
        { id: 'p1', name: 'Northern Wetland', x: 40, y: 30, desc: 'Primary bird nesting and foraging area.' },
        { id: 'p2', name: 'Central Marsh', x: 50, y: 50, desc: 'Dense aquatic vegetation and amphibian habitat.' },
        { id: 'p3', name: 'Southern Buffer', x: 60, y: 70, desc: 'Transition zone between the marsh and urban development.' }
    ];

    const galleryData = [
        { src: '../../assets/hero_banner.png', caption: 'Vast expanse of the freshwater marsh' },
        { src: '../../assets/travel_mountains.png', caption: 'Migratory birds in flight' },
        { src: '../../assets/heritage_forts.png', caption: 'Aquatic flora and vegetation' },
        { src: '../../assets/travel_hidden.png', caption: 'Wetland conservation efforts' }
    ];

    function renderWildlife() {
        const grid = document.getElementById('wildlife-grid');
        wildlifeData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'data-card';
            card.setAttribute('role', 'listitem');
            card.innerHTML = `<h3>${item.emoji} ${item.name}</h3><p>${item.desc}</p>`;
            grid.appendChild(card);
        });
    }

    function renderMap() {
        const mapContainer = document.getElementById('park-map');
        const infoPanel = document.getElementById('map-info');
        mapPoints.forEach(point => {
            const dot = document.createElement('button');
            dot.className = 'map-point';
            dot.style.left = point.x + '%';
            dot.style.top = point.y + '%';
            dot.setAttribute('aria-label', `View details for ${point.name}`);
            dot.addEventListener('click', () => {
                infoPanel.innerHTML = `<h3>${point.name}</h3><p>${point.desc}</p>`;
            });
            mapContainer.appendChild(dot);
        });
    }

    function renderGallery() {
        const grid = document.getElementById('gallery-grid');
        galleryData.forEach(img => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('role', 'listitem');
            item.innerHTML = `<img src="${img.src}" alt="${img.caption}" loading="lazy"><div class="gallery-caption">${img.caption}</div>`;
            grid.appendChild(item);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderWildlife();
        renderMap();
        renderGallery();
    });
})();
