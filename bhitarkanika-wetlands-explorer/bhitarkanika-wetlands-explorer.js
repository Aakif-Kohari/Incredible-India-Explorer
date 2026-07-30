// bhitarkanika-wetlands-explorer.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Intersection Observer for Fade-In Effects
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Lazy load images
                const lazyImages = entry.target.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 2. Initialize Leaflet Map (Bhitarkanika, Odisha)
    const mapContainer = document.getElementById('map-container');
    if (mapContainer && typeof L !== 'undefined') {
        const bhitarkanikaCoords = [20.7333, 86.8667];
        
        const map = L.map('map-container', {
            scrollWheelZoom: false
        }).setView(bhitarkanikaCoords, 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18
        }).addTo(map);

        const markerIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Add markers
        L.marker([20.75, 86.85], {icon: markerIcon}).addTo(map)
            .bindPopup('<b>Bhitarkanika National Park</b><br>Core mangrove forest area.')
            .openPopup();

        L.marker([20.68, 86.88], {icon: markerIcon}).addTo(map)
            .bindPopup('<b>Dangmal Visitor Centre</b><br>Starting point for boat safaris.');

        L.marker([20.70, 86.95], {icon: markerIcon}).addTo(map)
            .bindPopup('<b>Gahirmatha Beach</b><br>Nearby Olive Ridley turtle nesting site.');

        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => { map.invalidateSize(); }, 200);
                }
            });
        });
        mapObserver.observe(mapContainer);
    }

    // 3. Lightbox functionality for Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox && lightboxImg && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const src = img.getAttribute('src') || img.getAttribute('data-src');
                if (src && !src.startsWith('data:image/svg+xml')) {
                    lightboxImg.src = src;
                    lightbox.classList.add('active');
                }
            });

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => { lightboxImg.src = ''; }, 300);
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }
});
