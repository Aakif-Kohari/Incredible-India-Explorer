(function () {
    'use strict';

    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'light') body.classList.add('light-theme');
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
    });

    const birdsData = [
        { name: 'Greater Flamingo', emoji: '🦩', desc: 'Thousands gather in the shallow saline waters during winter migration.' },
        { name: 'Dalmatian Pelican', emoji: '🦤', desc: 'A globally near-threatened species that finds safe haven here.' },
        { name: 'Black-tailed Godwit', emoji: '🐦', desc: 'A long-distance migratory wader that feeds in the mudflats.' },
        { name: 'Eurasian Curlew', emoji: '🐦', desc: 'Recognizable by its long, down-curved bill, probing for invertebrates.' }
    ];

    const mapPoints = [
        { id: 'k1', name: 'Freshwater Inflow', x: 30, y: 40, desc: 'Where river water enters, creating a low-salinity nursery zone.' },
        { id: 'k2', name: 'Mangrove Belt', x: 50, y: 60, desc: 'Dense mangrove forests protecting the coast and hosting diverse life.' },
        { id: 'k3', name: 'Saline Mudflats', x: 70, y: 40, desc: 'Critical feeding grounds for migratory waders and flamingos.' }
    ];

    const galleryData = [
        { src: '../../assets/hero_banner.png', caption: 'Flocks of migratory birds at dawn' },
        { src: '../../assets/travel_mountains.png', caption: 'Lush mangrove forests' },
        { src: '../../assets/heritage_forts.png', caption: 'Shallow saline mudflats' },
        { src: '../../assets/travel_hidden.png', caption: 'Conservation signage and trails' }
    ];

    const factsData = [
        'Declared a Ramsar site in 2022, recognizing its international importance.',
        'It is one of the few places in India where freshwater and saltwater wetlands coexist.',
        'The wetland supports over 200 species of resident and migratory birds.',
        'Local communities are actively involved in eco-tourism and conservation efforts.'
    ];

    function renderBirds() {
        const grid = document.getElementById('birds-grid');
        birdsData.forEach(item => {
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

    function renderFacts() {
        const list = document.getElementById('facts-list');
        factsData.forEach(fact => {
            const li = document.createElement('li');
            li.textContent = fact;
            list.appendChild(li);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderBirds();
        renderMap();
        renderGallery();
        renderFacts();
    });
})();
