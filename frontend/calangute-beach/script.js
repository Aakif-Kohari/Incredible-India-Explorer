/**
 * Calangute Beach Profile Interactive Features
 * Handles Tab Navigation, Gallery Filtering, Lightbox Modal,
 * Leaflet Map, Theme Toggle, and Accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Interactive Explorer Hub Tabs ---
    const tabBtns = document.querySelectorAll('.hub-tab-btn');
    const tabPanels = document.querySelectorAll('.hub-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const panelId = btn.getAttribute('aria-controls');
            const targetPanel = document.getElementById(panelId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });

        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // --- 2. Gallery Category Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-card-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.4s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 3. Lightbox Modal Gallery Viewer ---
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDesc = document.getElementById('lightbox-desc');
    const closeBtn = document.getElementById('lightbox-close-btn');

    galleryItems.forEach(item => {
        const openLightbox = () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4');
            const desc = item.querySelector('p');

            if (img && modal && modalImg) {
                modalImg.src = img.src;
                modalImg.alt = img.alt || '';
                modalTitle.textContent = title ? title.textContent : 'Calangute Beach Visual';
                modalDesc.textContent = desc ? desc.textContent : '';
                modal.classList.add('active');
                if (closeBtn) closeBtn.focus();
            }
        };

        item.addEventListener('click', openLightbox);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox();
            }
        });
    });

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- 4. Leaflet Map ---
    function initMap() {
        if (!window.L) return;
        const mapEl = document.getElementById('calangute-map');
        if (!mapEl) return;

        const map = L.map('calangute-map', { scrollWheelZoom: false }).setView([15.5449, 73.7553], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        L.marker([15.5449, 73.7553])
            .addTo(map)
            .bindPopup('<strong>Calangute Beach</strong><br>North Goa, India')
            .openPopup();

        const nearby = [
            { name: 'Baga Beach', coords: [15.5585, 73.7520], note: '~2 km north' },
            { name: 'Candolim Beach', coords: [15.5289, 73.7634], note: '~2 km south' },
            { name: 'Anjuna Beach', coords: [15.5749, 73.7410], note: '~5 km north' },
            { name: 'Fort Aguada', coords: [15.4919, 73.7758], note: '~6 km south' }
        ];

        nearby.forEach(place => {
            L.marker(place.coords)
                .addTo(map)
                .bindPopup(`<strong>${place.name}</strong><br>${place.note}`);
        });
    }

    initMap();

    // --- 5. Theme Toggle ---
    // app.js exposes initThemeToggle on window and router-init.js invokes it on
    // route change. It toggles data-theme but not body.light-theme, which would
    // fight this page's CSS. Claim listenerBound so that handler bails out, and
    // keep data-theme + body.light-theme in sync here.
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.dataset.listenerBound = 'true';

        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            if (isLight) {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
});
