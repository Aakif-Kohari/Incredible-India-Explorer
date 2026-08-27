/**
 * Burzahom Neolithic Settlement Page
 * Handles Chronology Timeline, Leaflet Location Map, Theme Toggle, Mobile Menu.
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

    // 3. Chronology Timeline
    const timelineEvents = [
        { year: 'c. 3000 BCE', title: 'Period I — Earliest Pit Dwellings', desc: 'Neolithic settlers dig subterranean pit houses, using stone tools and coarse, hand-made gray-black burnished pottery.' },
        { year: 'c. 2500 BCE', title: 'Period I — Bone Tool Industry Flourishes', desc: 'A well-developed bone-tool industry (harpoons, needles, arrowheads) and ground stone tools become widespread across the settlement.' },
        { year: 'c. 2000 BCE', title: 'Period II — Shift to Ground Level', desc: 'People begin building mud huts at ground level instead of digging pits; structured burials (often with red ochre) appear under house floors, alongside dog burials.' },
        { year: 'c. 1700 BCE', title: 'Period II — Harappan Contact', desc: 'Pottery styles show influence from Harappan-related ceramic traditions, suggesting trade or cultural contact beyond the valley.' },
        { year: 'c. 1500–1000 BCE', title: 'Period III — Megalithic Phase', desc: 'Large stone menhirs appear, and wheel-turned red pottery replaces the earlier hand-made wares — a major technological shift.' },
        { year: 'Post-1000 BCE', title: 'Period IV — Early Historic', desc: 'The site transitions into the Early Historical (post-Megalithic) period, marking the end of the classic pit-dwelling Neolithic culture.' },
        { year: '1935', title: 'First Excavation', desc: 'H. de Terra and T. T. Paterson of the Yale–Cambridge Expedition carry out the earliest documented excavation at Burzahom.' },
        { year: '1960–1971', title: 'ASI Excavations', desc: 'The Archaeological Survey of India, led by T. N. Khazanchi, conducts extensive excavations, uncovering most of what is known about the site today.' },
        { year: 'Present', title: 'Protected National Monument', desc: 'Burzahom is a protected site under the ASI and features on India\u2019s UNESCO World Heritage Tentative List.' }
    ];

    const timelineTrack = document.getElementById('burzahom-timeline');
    if (timelineTrack) {
        timelineTrack.innerHTML = timelineEvents.map(ev => `
            <div class="timeline-item">
                <span class="timeline-year">${ev.year}</span>
                <h4>${ev.title}</h4>
                <p>${ev.desc}</p>
            </div>
        `).join('');
    }

    // 4. Leaflet Location Map
    const mapEl = document.getElementById('burzahom-map');
    if (mapEl && window.L) {
        const map = L.map('burzahom-map', { scrollWheelZoom: false }).setView([34.169883, 74.866841], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        L.marker([34.169883, 74.866841])
            .addTo(map)
            .bindPopup('<strong>Burzahom Archaeological Site</strong><br>Neolithic pit-dwelling settlement, c. 3000–1000 BCE')
            .openPopup();

        L.marker([34.0837, 74.7973])
            .addTo(map)
            .bindPopup('<strong>Srinagar</strong><br>Roughly 16 km southwest of Burzahom');
    }
});