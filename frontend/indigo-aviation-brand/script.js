/**
 * IndiGo Brand Explorer Page
 * Handles Leaflet Route-Growth Map, Timeline Rendering, Theme Toggle, Mobile Menu.
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

    // 3. Route-Growth Map — major hubs and international gateway
    const mapEl = document.getElementById('indigo-route-map');
    if (mapEl && window.L) {
        const map = L.map('indigo-route-map', { scrollWheelZoom: false }).setView([22.5, 79.5], 4.5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        const hubs = [
            { name: 'Delhi (DEL)', coords: [28.5562, 77.1000], note: 'Primary hub. Site of IndiGo\'s first-ever flight (Delhi–Guwahati–Imphal), 4 August 2006.' },
            { name: 'Mumbai (BOM)', coords: [19.0896, 72.8656], note: 'Major operating base, one of IndiGo\'s busiest domestic and international gateways.' },
            { name: 'Bengaluru (BLR)', coords: [13.1986, 77.7066], note: 'Key operating base for South India\'s tech-hub travel demand.' },
            { name: 'Chennai (MAA)', coords: [12.9941, 80.1709], note: 'Operating base connecting South India to Southeast Asia routes.' },
            { name: 'Kolkata (CCU)', coords: [22.6520, 88.4463], note: 'Operating base serving Eastern India and the Northeast.' },
            { name: 'Hyderabad (HYD)', coords: [17.2403, 78.4294], note: 'Operating base for the Deccan region.' },
            { name: 'Kochi (COK)', coords: [10.1520, 76.4019], note: 'Operating base for Kerala and Gulf-bound international traffic.' },
            { name: 'Dubai (DXB)', coords: [25.2532, 55.3657], note: 'IndiGo\'s first international route, launched September 2011, after five years of domestic-only operations.' }
        ];

        hubs.forEach(h => {
            L.marker(h.coords)
                .addTo(map)
                .bindPopup(`<strong>${h.name}</strong><br>${h.note}`);
        });
    }

    // 4. Timeline
    const timelineEvents = [
        { year: '2005', title: 'InterGlobe Aviation Founded', desc: 'Rahul Bhatia and Rakesh Gangwal found the airline and place a firm order for 100 Airbus A320s at the Paris Air Show.' },
        { year: '2006', title: 'First Flight', desc: 'IndiGo commences operations on 4 August, flying Delhi–Guwahati–Imphal with a fleet of six brand-new A320s.' },
        { year: '2010', title: 'Most Profitable Carrier', desc: 'IndiGo becomes India\'s most profitable airline, driven by a lean cost base and strong load factors.' },
        { year: '2011', title: 'International Debut', desc: 'After completing five years of domestic service, IndiGo launches its first international route: Delhi–Dubai.' },
        { year: '2012', title: 'Market Leader', desc: 'On 17 August, IndiGo overtakes Jet Airways to become India\'s largest airline by passenger market share.' },
        { year: '2015', title: 'IPO', desc: 'InterGlobe Aviation goes public in one of the largest IPOs in Indian aviation history, valuing the company at roughly $4 billion.' },
        { year: '2016', title: 'First A320neo', desc: 'IndiGo receives its first Airbus A320neo, improving fuel efficiency and operating economics.' },
        { year: '2019', title: 'Record Aircraft Order', desc: 'IndiGo places its largest-ever order: 300 Airbus A320neo family aircraft.' },
        { year: 'Today', title: 'India\'s Largest Airline', desc: 'IndiGo operates 430+ aircraft on 2,700+ daily flights to 130+ destinations, still holding the top market-share position it won in 2012.' }
    ];

    const timelineTrack = document.getElementById('indigo-timeline');
    if (timelineTrack) {
        timelineTrack.innerHTML = timelineEvents.map(ev => `
            <div class="timeline-item">
                <span class="timeline-year">${ev.year}</span>
                <h4>${ev.title}</h4>
                <p>${ev.desc}</p>
            </div>
        `).join('');
    }
});