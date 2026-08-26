/**
 * Cherai Beach Profile Interactive Features
 * Handles Tab Navigation, Leaflet Map Initialization,
 * Lightbox Gallery, Theme Switching, and Accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
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

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // 3. Hub Tab Switching
    const tabBtns = document.querySelectorAll('.hub-tab-btn');
    const tabPanels = document.querySelectorAll('.hub-panel');
    let mapInitialized = false;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(p => {
                p.classList.remove('active');
                p.hidden = true;
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const tabKey = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(`panel-${tabKey}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.hidden = false;
            }

            if (tabKey === 'map' && !mapInitialized) {
                setTimeout(initMap, 100);
            }
        });
    });

    // 4. Leaflet Map Initialization
    function initMap() {
        if (!window.L) return;
        const mapEl = document.getElementById('cherai-map');
        if (!mapEl) return;

        const map = L.map('cherai-map', { scrollWheelZoom: false }).setView([10.1416, 76.1783], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        L.marker([10.1416, 76.1783])
            .addTo(map)
            .bindPopup('<strong>Cherai Beach</strong><br>Vypin Island, Ernakulam, Kerala')
            .openPopup();

        const nearby = [
            { name: 'Munambam Fishing Harbour', coords: [10.1812, 76.1740], note: '~4 km North' },
            { name: 'Pallipuram Fort (1503 CE)', coords: [10.1630, 76.1950], note: '~5 km Northeast' },
            { name: 'Kuzhupilly Beach', coords: [10.1060, 76.1860], note: '~4 km South' },
            { name: 'Veeranpuzha Lagoon / Backwaters', coords: [10.1350, 76.1920], note: '~1 km East' }
        ];

        nearby.forEach(p => {
            L.marker(p.coords)
                .addTo(map)
                .bindPopup(`<strong>${p.name}</strong><br>${p.note}`);
        });

        mapInitialized = true;
    }

    // Auto-init map on first load if map tab is default visible
    if (document.getElementById('cherai-map')) {
        setTimeout(initMap, 300);
    }

    // 5. Gallery Lightbox Modal
    const galleryItems = document.querySelectorAll('.gallery-card-item');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDesc = document.getElementById('lightbox-desc');
    const modalAttr = document.getElementById('lightbox-attr');
    const closeBtn = document.getElementById('lightbox-close-btn');

    galleryItems.forEach(item => {
        const openLightbox = () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4');
            const desc = item.querySelector('p');
            const attr = item.querySelector('.attribution-tag');

            if (img && modal && modalImg) {
                modalImg.src = img.src;
                modalImg.alt = img.alt || '';
                modalTitle.textContent = title ? title.textContent : 'Cherai Beach Visual';
                modalDesc.textContent = desc ? desc.textContent : '';
                modalAttr.textContent = attr ? attr.textContent : '';
                modal.hidden = false;
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
        if (modal) modal.hidden = true;
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hidden) {
            closeModal();
        }
    });
});
