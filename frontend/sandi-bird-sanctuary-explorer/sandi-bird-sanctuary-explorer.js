// sandi-bird-sanctuary-explorer.js

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

    // 2. Initialize Leaflet Map (Sandi, Hardoi coordinates)
    const mapContainer = document.getElementById('map-container');
    if (mapContainer && typeof L !== 'undefined') {
        const sandiCoords = [27.2833, 79.9667];
        
        const map = L.map('map-container', {
            scrollWheelZoom: false 
        }).setView(sandiCoords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        const markerIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/frontend/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/frontend/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // Add markers
        L.marker([27.2833, 79.9667], {icon: markerIcon}).addTo(map)
            .bindPopup('<b>Sandi Bird Sanctuary</b><br>Main wetland and birdwatching area.')
            .openPopup();

        L.marker([27.2900, 79.9700], {icon: markerIcon}).addTo(map)
            .bindPopup('<b>Sanctuary Entrance</b><br>Visitor facilities and starting point.');

        L.marker([27.2800, 79.9600], {icon: markerIcon}).addTo(map)
            .bindPopup('<b>Nature Trails & Viewing Points</b><br>Excellent locations for photography.');

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
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});
