/* harike-wetland.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Map
    const map = L.map('map-container').setView([31.1667, 74.9500], 12); // Coordinates for Harike Wetland

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom markers
    L.marker([31.1667, 74.9500]).addTo(map)
        .bindPopup('<b>Harike Wetland</b><br>Punjab\'s largest wetland and Ramsar Site.').openPopup();

    L.marker([31.1750, 74.9450]).addTo(map)
        .bindPopup('<b>Harike Barrage</b><br>Built in 1953 at the Beas-Sutlej confluence.');

    L.marker([31.1550, 74.9600]).addTo(map)
        .bindPopup('<b>Beas-Sutlej Confluence</b><br>The meeting point of the two rivers.');

    L.marker([31.1600, 74.9400]).addTo(map)
        .bindPopup('<b>Bird Sanctuary Zone</b><br>Prime habitat for migratory waterbirds.');

    // 2. Image Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            openLightbox(img.src, img.alt);
        });

        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = item.querySelector('img');
                openLightbox(img.src, img.alt);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});