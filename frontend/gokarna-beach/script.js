/**
 * Gokarna Beach Profile Interactive Features
 * Handles Tab Navigation, Leaflet Map Initialization,
 * Lightbox Gallery, Theme Switching, and Accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    // NOTE: Confirm this key ('theme') matches whatever key your site-wide
    // bootstrap script (e.g. pages-common.js or an inline <head> script)
    // reads on page load. If that script reads a different key (e.g.
    // 'iie_storage' or similar), rename BOTH the .setItem below and that
    // bootstrap reader to use the exact same key/format so theme state
    // doesn't go out of sync across pages.
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
    let mapInitPending = false; // guards against double-init when tab is clicked rapidly

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

            if (tabKey === 'map' && !mapInitialized && !mapInitPending) {
                mapInitPending = true;
                setTimeout(() => {
                    initMap();
                    mapInitialized = true;
                    mapInitPending = false;
                }, 100);
            }
        });
    });

    // 4. Leaflet Map Initialization
    function initMap() {
        if (!window.L) return;
        const mapEl = document.getElementById('gokarna-map');
        if (!mapEl) return;

        const map = L.map('gokarna-map', { scrollWheelZoom: false }).setView([14.5479, 74.3188], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        L.marker([14.5479, 74.3188])
            .addTo(map)
            .bindPopup('<strong>Gokarna Beach &amp; Mahabaleshwar Temple</strong><br>Uttara Kannada, Karnataka')
            .openPopup();

        const nearby = [
            { name: 'Kudle Beach', coords: [14.5350, 74.3200], note: '~2 km South' },
            { name: 'Om Beach', coords: [14.5160, 74.3170], note: '~5 km South' },
            { name: 'Half Moon Beach', coords: [14.5060, 74.3140], note: '~7 km South' },
            { name: 'Paradise Beach', coords: [14.4990, 74.3110], note: '~8 km South' }
        ];

        nearby.forEach(p => {
            L.marker(p.coords)
                .addTo(map)
                .bindPopup(`<strong>${p.name}</strong><br>${p.note}`);
        });
        // mapInitialized is now set by the tab-click handler above, right
        // after this function returns, so it isn't duplicated here.
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
                modalTitle.textContent = title ? title.textContent : 'Gokarna Beach Visual';
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