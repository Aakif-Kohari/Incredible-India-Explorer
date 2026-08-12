/**
 * Shivanasamudra Falls Explorer - Interactive Script
 * Handles section navigation, map interaction, scroll reveal, and Journey integration.
 */
(function () {
    'use strict';

    /* Map point data */
    const mapPoints = {
        split: { title: 'The Split Point', desc: 'Where the Kaveri River divides around a rocky island, creating the twin falls. The island hosts the ancient Ranganathaswamy temple and separates Gaganachukki (north) from Bharachukki (south).' },
        gaga: { title: 'Gaganachukki Falls', desc: 'The western branch plunges 98 metres in a wide segmented cascade. During monsoon, the spray creates rainbows visible from the Darga viewpoint. The name means "Sky Fall" in Kannada.' },
        bhara: { title: 'Bharachukki Falls', desc: 'The eastern branch descends 69 metres through rocky channels into natural pools. More picturesque than Gaganachukki, with visible individual streams during low-water seasons. Name means "Earth Fall."' }
    };

    /* Interactive Map */
    function initMap() {
        const markers = document.querySelectorAll('.map-marker');
        const titleEl = document.getElementById('map-info-title');
        const descEl = document.getElementById('map-info-desc');
        if (!titleEl || !descEl) return;
        markers.forEach(m => {
            const key = m.dataset.point;
            const update = () => { const d = mapPoints[key]; if (d) { titleEl.textContent = d.title; descEl.textContent = d.desc; } };
            m.addEventListener('click', update);
            m.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); update(); } });
        });
    }

    /* Section Navigation */
    function initSectionNav() {
        const navBar = document.getElementById('sf-section-nav');
        const navLinks = document.querySelectorAll('.sf-nav-link');
        if (!navBar) return;
        const sections = Array.from(navLinks).map(link => ({ link, section: document.getElementById(link.getAttribute('href').replace('#', '')) })).filter(i => i.section);
        const setActive = (activeLink) => { navLinks.forEach(l => l.classList.remove('active')); activeLink.classList.add('active'); };
        navLinks.forEach(link => link.addEventListener('click', () => setActive(link)));
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => { if (entry.isIntersecting) { const match = navBar.querySelector(`[href="#${entry.target.id}"]`); if (match) setActive(match); } });
        }, { rootMargin: '-40% 0px -50% 0px' });
        sections.forEach(item => observer.observe(item.section));
    }

    /* Scroll Reveal */
    function initReveal() {
        const targets = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) { targets.forEach(el => el.classList.add('visible')); return; }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        targets.forEach(el => observer.observe(el));
    }

    /* Journey Integration */
    function initJourney() {
        if (!window.Journey) return;
        window.Journey.registerSearchItems('frontend/shivanasamudra-falls-explorer/index.html', [
            { id: 'shivanasamudra-main', title: 'Shivanasamudra Falls Explorer', description: 'Explore Shivanasamudra Falls on the Kaveri River — Gaganachukki and Bharachukki twin falls, hydroelectric history, seasonal flow patterns, and nearby attractions in Karnataka.', link: 'frontend/shivanasamudra-falls-explorer/index.html' },
            { id: 'shivanasamudra-comparison', title: 'Gaganachukki vs Bharachukki Comparison', description: 'Side-by-side comparison of the twin falls — heights, characteristics, viewpoints, and access details for both Gaganachukki (98m) and Bharachukki (69m).', link: 'frontend/shivanasamudra-falls-explorer/index.html#comparison' },
            { id: 'shivanasamudra-history', title: 'Shivanasamudra Historical Timeline', description: 'From ancient sacred site to Asia\'s first hydroelectric station (1902) — the complete historical timeline of Shivanasamudra Falls.', link: 'frontend/shivanasamudra-falls-explorer/index.html#history' }
        ]);
    }

    document.addEventListener('DOMContentLoaded', () => { initMap(); initSectionNav(); initReveal(); initJourney(); });
})();
