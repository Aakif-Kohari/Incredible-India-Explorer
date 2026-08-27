/**
 * Belum Caves Geological History Page
 * Handles Geological Timeline, Leaflet Location Map, Theme Toggle, Mobile Menu.
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

    // 3. Geological Timeline
    const timelineEvents = [
        { year: 'Proterozoic Era', title: 'Narji Limestone Deposited', desc: 'Marine and near-shore sediments accumulate in the Cuddapah Basin, later lithifying into the Narji Limestone of the Kurnool Group.' },
        { year: 'Uplift & Exposure', title: 'Limestone Reaches the Surface', desc: 'Tectonic uplift and erosion expose the Kurnool Group rocks, including the limestone that would eventually host the cave system.' },
        { year: 'Tens of Thousands of Years Ago', title: 'Karst Dissolution Begins', desc: 'The now-vanished Chitravathi River seeps through cracks in the limestone, slowly dissolving passages, chambers, and galleries underground.' },
        { year: 'c. 4500 BCE', title: 'Earliest Human Use', desc: 'Clay vessels, mortars, and pestles recovered from the caves point to early human presence and use, likely for shelter or ritual purposes.' },
        { year: '1884', title: 'Foote\u2019s Discovery', desc: 'British geologist Robert Bruce Foote documents the caves, the first recorded scientific mention of the site.' },
        { year: '1884–1982', title: 'Decades of Neglect', desc: 'Despite Foote\u2019s discovery, the caves are largely forgotten and even used as a local garbage dump.' },
        { year: '1982–1983', title: 'Gebauer Expedition', desc: 'German speleologist H. Daniel Gebauer, with Indian geologists, conducts the first detailed exploration and mapping of the full cave system.' },
        { year: '2002', title: 'Opened to the Public', desc: 'The Andhra Pradesh Tourism Development Corporation develops roughly 1.5 km of the cave system for public access.' },
        { year: '2006', title: 'Musical Chamber Opens', desc: 'The Saptasvarala Guha (Musical Chamber), with its acoustically distinctive stalactites, is opened to visitors.' }
    ];

    const timelineTrack = document.getElementById('belum-timeline');
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
    const mapEl = document.getElementById('belum-map');
    if (mapEl && window.L) {
        const map = L.map('belum-map', { scrollWheelZoom: false }).setView([15.10417, 78.13056], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        L.marker([15.10417, 78.13056])
            .addTo(map)
            .bindPopup('<strong>Belum Caves</strong><br>Second-largest cave system on the Indian subcontinent, formed in Narji Limestone.')
            .openPopup();

        L.marker([15.1167, 78.1500])
            .addTo(map)
            .bindPopup('<strong>Kolimigundla</strong><br>Nearest town, Nandyal district, Andhra Pradesh.');
    }
});