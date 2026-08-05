(function () {
    'use strict';

    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'light') body.classList.add('light-theme');
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
    });

    const floraData = [
        { name: 'Oak & Rhododendron', emoji: '🌳', desc: 'Dominant tree species forming the dense temperate forest canopy.' },
        { name: 'Himalayan Yew', emoji: '🌿', desc: 'A rare, medicinal coniferous tree found in the higher altitudes.' },
        { name: 'Orchids', emoji: '🌸', desc: 'Numerous endemic orchid species thrive in the moist, shaded undergrowth.' }
    ];

    const trekkingData = [
        { name: 'Rechila Danda', difficulty: 'Moderate', desc: 'A scenic ridge walk offering panoramic views of the Kanchenjunga range.' },
        { name: 'Samsing to Suntalekhola', difficulty: 'Easy', desc: 'A gentle trail through tea gardens and riverine forests.' },
        { name: 'Todey Tangla', difficulty: 'Hard', desc: 'A challenging high-altitude trek through dense rhododendron forests.' }
    ];

    const mapPoints = [
        { id: 'n1', name: 'Rechila Danda', x: 40, y: 30, desc: 'Highest point in the park, offering spectacular mountain views.' },
        { id: 'n2', name: 'Red Panda Zone', x: 60, y: 50, desc: 'Core habitat area with dense bamboo thickets.' },
        { id: 'n3', name: 'Suntalekhola River', x: 30, y: 70, desc: 'A pristine river flowing through the valley, vital for local ecology.' }
    ];

    const galleryData = [
        { src: '../../assets/hero_banner.png', caption: 'Dense temperate forest canopy' },
        { src: '../../assets/travel_mountains.png', caption: 'Panoramic views from Rechila Danda' },
        { src: '../../assets/heritage_forts.png', caption: 'Suntalekhola river valley' },
        { src: '../../assets/travel_hidden.png', caption: 'Rhododendron blooms in spring' }
    ];

    function renderFlora() {
        const grid = document.getElementById('flora-grid');
        floraData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'data-card';
            card.setAttribute('role', 'listitem');
            card.innerHTML = `<h3>${item.emoji} ${item.name}</h3><p>${item.desc}</p>`;
            grid.appendChild(card);
        });
    }

    function renderTrekking() {
        const grid = document.getElementById('trekking-grid');
        trekkingData.forEach(trail => {
            const card = document.createElement('div');
            card.className = 'data-card';
            card.setAttribute('role', 'listitem');
            card.innerHTML = `<h3>${trail.name}</h3><span class="badge" style="margin-bottom:0.5rem;display:inline-block;">${trail.difficulty}</span><p>${trail.desc}</p>`;
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
        renderFlora();
        renderTrekking();
        renderMap();
        renderGallery();
    });
})();
