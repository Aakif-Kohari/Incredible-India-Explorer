/**
 * Kurnool Caves Prehistoric Heritage Page
 * Handles Discovery Timeline, Leaflet Map, Theme Toggle, Mobile Menu.
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

    // 3. Chronology of Discovery Timeline
    const timelineEvents = [
        { year: '1844', title: 'First Reported by Newbold', desc: 'T. J. Newbold is the first to report fossiliferous caves at Billa Surgam, southeast of Betamcherla.' },
        { year: '1884–85', title: "Foote's Landmark Excavations", desc: 'Robert Bruce Foote and his son Henry excavate the Cathedral, Charnel House, and Purgatory caves at Billa Surgam, recovering ~1,700 archaeological and ~3,000 palaeontological specimens.' },
        { year: '1886', title: 'Faunal Remains Studied', desc: 'Palaeontologist Richard Lydekker examines the fossil fauna recovered from Foote\u2019s Billa Surgam excavations.' },
        { year: '1927', title: 'Cammiade Expands the Picture', desc: 'L. A. Cammiade documents further caves near Betamcherla and Banaganapalli, and later classifies regional stone-tool industries with M. C. Burkitt.' },
        { year: '1957', title: 'Allchins Revisit the Spoil Heaps', desc: 'F. R. and B. Allchin recover fragments of a Neolithic pot from Foote\u2019s old excavation spoil heaps, later reconstructed at the British Museum.' },
        { year: '1974–1980', title: 'Murty and Thimma Reddy', desc: 'M. L. K. Murty and K. Thimma Reddy conduct fresh excavations at Muchchatla Chintamanu Gavi and other caves, confirming and extending Foote\u2019s findings.' },
        { year: '2007 onward', title: 'Renewed Vertebrate Studies', desc: 'Later research re-examines Kurnool Cave faunal remains to reconstruct Late Pleistocene–Holocene climate and vegetation change.' },
        { year: 'Recent', title: 'Ongoing Research & Preservation', desc: 'Archaeologists continue work at Billa Surgam, now also assessing the site\u2019s preservation against threats from local mining activity.' }
    ];

    const timelineTrack = document.getElementById('kurnool-timeline');
    if (timelineTrack) {
        timelineTrack.innerHTML = timelineEvents.map(ev => `
            <div class="timeline-item">
                <span class="timeline-year">${ev.year}</span>
                <h4>${ev.title}</h4>
                <p>${ev.desc}</p>
            </div>
        `).join('');
    }

    // 4. Leaflet Map — cave locations
    const mapEl = document.getElementById('kurnool-map');
    if (mapEl && window.L) {
        const map = L.map('kurnool-map', { scrollWheelZoom: false }).setView([15.4667, 78.2333], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        const sites = [
            { name: 'Billa Surgam Caves', coords: [15.4667, 78.2333], note: 'The main excavated cave complex; site of Foote\u2019s 1884-85 Cathedral, Charnel House, and Purgatory Cave excavations.' },
            { name: 'Betamcherla', coords: [15.4894, 78.2075], note: 'Nearest town, on the Kurnool basin\u2019s western limestone plateau.' },
            { name: 'Banaganapalli Cave Cluster', coords: [15.3167, 78.2167], note: 'Includes Yaganti, Yerrazarigabbi, and Billam caves, also explored by Foote.' }
        ];

        sites.forEach(s => {
            L.marker(s.coords)
                .addTo(map)
                .bindPopup(`<strong>${s.name}</strong><br>${s.note}`);
        });
    }
});