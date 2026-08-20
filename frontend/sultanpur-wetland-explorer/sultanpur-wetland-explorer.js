// sultanpur-wetland-explorer.js

const birdsData = [
    { name: "Painted Stork", group: "waterbirds" },
    { name: "Northern Pintail", group: "ducks" },
    { name: "Bar-headed Goose", group: "ducks" },
    { name: "Eurasian Spoonbill", group: "waders" },
    { name: "Common Teal", group: "ducks" },
    { name: "Purple Heron", group: "herons" },
    { name: "Black-necked Stork", group: "waterbirds" },
    { name: "White-throated Kingfisher", group: "kingfishers" },
    { name: "Shikra", group: "raptors" },
    { name: "Indian Spot-billed Duck", group: "ducks" },
    { name: "Black-winged Stilt", group: "waders" },
    { name: "Little Egret", group: "herons" }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fade-In Effects
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                const lazyImages = entry.target.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.15 });

    document.querySelectorAll('.fade-in-section').forEach(section => sectionObserver.observe(section));

    // 2. Initialize Map (Sultanpur, Haryana)
    const mapContainer = document.getElementById('map-container');
    if (mapContainer && typeof L !== 'undefined') {
        const sultanpurCoords = [28.4614, 76.8925];
        const map = L.map('map-container', { scrollWheelZoom: false }).setView(sultanpurCoords, 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap',
            maxZoom: 18
        }).addTo(map);

        const icon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/frontend/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/frontend/dist/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34]
        });

        L.marker([28.4614, 76.8925], {icon}).addTo(map).bindPopup('<b>Sultanpur National Park</b><br>Bird Sanctuary').openPopup();
        L.marker([28.4630, 76.8950], {icon}).addTo(map).bindPopup('<b>Observation Tower</b>');
        L.marker([28.4590, 76.8900], {icon}).addTo(map).bindPopup('<b>Main Gate & Visitor Centre</b>');

        const mapObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) setTimeout(() => map.invalidateSize(), 200);
        });
        mapObserver.observe(mapContainer);
    }

    // 3. Lightbox Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const src = item.querySelector('img').getAttribute('src') || item.querySelector('img').getAttribute('data-src');
            if (src && !src.startsWith('data:image/svg')) {
                lightboxImg.src = src;
                lightbox.classList.add('active');
            }
        });
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); }
        });
    });

    if(lightbox) {
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('active'); });
    }

    // 4. Checklist Functionality
    const grid = document.getElementById('checklist-grid');
    const search = document.getElementById('bird-search');
    const filter = document.getElementById('bird-filter');

    const renderChecklist = (query = '', group = 'all') => {
        grid.innerHTML = '';
        birdsData.filter(b => {
            const matchesQuery = b.name.toLowerCase().includes(query.toLowerCase());
            const matchesGroup = group === 'all' || b.group === group;
            return matchesQuery && matchesGroup;
        }).forEach((b, index) => {
            const div = document.createElement('div');
            div.className = 'checklist-item';
            div.innerHTML = `<input type="checkbox" id="bird-${index}"> <label for="bird-${index}">${b.name}</label>`;
            div.querySelector('input').addEventListener('change', (e) => {
                if (e.target.checked) div.classList.add('checked');
                else div.classList.remove('checked');
            });
            grid.appendChild(div);
        });
    };

    if (grid) {
        renderChecklist();
        search.addEventListener('input', (e) => renderChecklist(e.target.value, filter.value));
        filter.addEventListener('change', (e) => renderChecklist(search.value, e.target.value));
    }
});
