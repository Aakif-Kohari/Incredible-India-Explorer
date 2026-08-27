/**
 * Uttarakhand Forest Fire Hazards Page
 * Handles Leaflet Map with fire-prone districts, Theme Toggle, Mobile Menu.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    // NOTE: Match this to the site-wide IIEStorage / theme persistence
    // pattern used elsewhere in the codebase before merging.
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
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

    // 3. Leaflet Map — fire-prone districts (Garhwal & Kumaon divisions)
    const mapEl = document.getElementById('uk-fire-map');
    if (mapEl && window.L) {
        const map = L.map('uk-fire-map', { scrollWheelZoom: false }).setView([29.9, 79.4], 8);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        const districts = [
            { name: 'Nainital', coords: [29.3803, 79.4636], note: 'Kumaon division — 2024 saw major helicopter-assisted firefighting near Bhimtal Lake.' },
            { name: 'Almora', coords: [29.5892, 79.6467], note: 'Kumaon division — chir pine-dominated forest division, historically high fire frequency.' },
            { name: 'Pauri Garhwal', coords: [30.1462, 78.7807], note: 'Garhwal division — mixed chir pine and banj oak forests, frequent fire reports.' },
            { name: 'Chamoli', coords: [30.4000, 79.3200], note: 'Garhwal division — 66% forested, home to Nanda Devi, Satopanth, and Chaukhamba glaciers threatened by black-carbon deposition.' },
            { name: 'Uttarkashi', coords: [30.7268, 78.4354], note: 'Garhwal division — high-elevation forests near the Gangotri glacier region.' },
            { name: 'Bageshwar', coords: [29.8406, 79.7691], note: 'Kumaon division — chir pine-dominated forest division.' }
        ];

        districts.forEach(d => {
            L.marker(d.coords)
                .addTo(map)
                .bindPopup(`<strong>${d.name}</strong><br>${d.note}`);
        });
    }
});