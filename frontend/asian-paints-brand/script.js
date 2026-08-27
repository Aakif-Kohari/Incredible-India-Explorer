/**
 * Asian Paints Brand Explorer Page
 * Handles the Colour-and-Brand Timeline, Theme Toggle, Mobile Menu.
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

    // 3. Visual Colour-and-Brand Timeline
    // Each milestone is paired with a representative colour swatch,
    // giving the timeline a "colour journey" feel alongside the brand history.
    const timelineEvents = [
        { year: '1942', color: '#c1121f', title: 'Founded in a Mumbai Garage', desc: 'Four friends — Choksey, Choksi, Dani, and Vakil — start "The Asian Oil & Paint Company" in Girgaon, Mumbai.' },
        { year: '1945', color: '#7c2d12', title: 'Becomes a Private Company', desc: 'The original partnership firm converts into a private limited company as the business grows.' },
        { year: '1950s–70s', color: '#eab308', title: 'The Gattu Era', desc: 'Cartoonist R. K. Laxman\u2019s impish mascot Gattu becomes the face of Asian Paints\u2019 print advertising.' },
        { year: '1967', color: '#0d7a6c', title: "India's Largest Paint Company", desc: 'Just 25 years after starting in a garage, Asian Paints becomes the leading paint manufacturer in India.' },
        { year: '1973', color: '#0369a1', title: 'Asian Paints Ltd.', desc: 'The company adopts its modern name, Asian Paints Ltd., as it scales into a public limited company.' },
        { year: '1978', color: '#7e22ce', title: 'First Overseas Subsidiary', desc: 'Asian Paints begins its international expansion, planting the first seeds of its global footprint.' },
        { year: '2000s', color: '#db2777', title: '"Har Ghar Kuch Kehta Hai"', desc: 'Piyush Pandey and Ogilvy & Mather launch the brand\u2019s most iconic campaign, shifting from mascot-led ads to emotional storytelling.' },
        { year: '2023', color: '#0891b2', title: '"Mera Wala Mood"', desc: 'A face-scanning digital campaign personalises colour recommendations to a viewer\u2019s mood, extending "Har Ghar" into the tech age.' },
        { year: '2025', color: '#ea580c', title: 'White Teak Acquisition', desc: 'Asian Paints acquires premium decorative lighting brand White Teak, extending its reach from walls to full interior solutions.' },
        { year: 'Today', color: '#c1121f', title: 'A Global Coatings Company', desc: 'Operating 26 manufacturing facilities across 14 countries, with roughly 59% share of the Indian decorative-paints market.' }
    ];

    const timelineTrack = document.getElementById('ap-timeline');
    if (timelineTrack) {
        timelineTrack.innerHTML = timelineEvents.map(ev => `
            <div class="timeline-item">
                <span class="timeline-swatch" style="background:${ev.color}"></span>
                <span class="timeline-year">${ev.year}</span>
                <h4>${ev.title}</h4>
                <p>${ev.desc}</p>
            </div>
        `).join('');
    }
});