/**
 * Nilgiri Pipit Explorer - Interactive Script
 * Handles map interaction, section navigation, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Map Location Data */
    const mapLocations = {
        nilgiri: {
            title: 'Nilgiri Hills',
            desc: 'The core range of the Nilgiri Pipit. The montane grasslands around Ooty, Doddabetta, and Mukurthi support the largest known populations. Mukurthi National Park specifically protects high-altitude grassland habitat for both the pipit and the Nilgiri Tahr.'
        },
        eravikulam: {
            title: 'Eravikulam National Park',
            desc: 'Located in the Anaimalai Hills of Kerala, Eravikulam is famous for the Nilgiri Tahr but also supports a healthy population of Nilgiri Pipit in its high-altitude grasslands. The park\'s grassland restoration programme has directly benefited the pipit.'
        },
        mukurthi: {
            title: 'Mukurthi National Park',
            desc: 'A 78 km² protected area in the Nilgiri district specifically designated for shola-grassland conservation. The park is one of the most important strongholds for the Nilgiri Pipit, with its high-altitude plateaus providing ideal foraging and nesting habitat.'
        },
        anaimalai: {
            title: 'Anaimalai Hills',
            desc: 'The southern extension of the pipit\'s range. The high-altitude grasslands around Valparai and the Anaimalai Tiger Reserve periphery support scattered populations, though habitat loss from tea and cardamom plantations has reduced connectivity.'
        },
        palani: {
            title: 'Palani Hills',
            desc: 'The grasslands around Kodaikanal in the Palani Hills support an isolated population of Nilgiri Pipit. This population is genetically distinct from the Nilgiri population, suggesting long-term isolation on this separate sky island.'
        }
    };

    /* ------------------------------------------------------- Interactive Map */
    function initMap() {
        const markers = document.querySelectorAll('.map-marker');
        const titleEl = document.getElementById('map-info-title');
        const descEl = document.getElementById('map-info-desc');
        if (!titleEl || !descEl) return;

        const updateInfo = (key) => {
            const loc = mapLocations[key];
            if (!loc) return;
            titleEl.textContent = loc.title;
            descEl.textContent = loc.desc;
        };

        markers.forEach(m => {
            const key = m.dataset.location;
            m.addEventListener('click', () => updateInfo(key));
            m.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateInfo(key); }
            });
        });
    }

    /* ------------------------------------------------------- Section Navigation */
    function initSectionNav() {
        const navLinks = document.querySelectorAll('.np-nav-link');
        const navBar = document.getElementById('np-section-nav');
        if (!navBar) return;

        const sections = Array.from(navLinks).map(link => {
            const target = link.dataset.navTarget;
            return { link, section: document.getElementById(target) };
        }).filter(item => item.section);

        const setActive = (activeLink) => {
            navLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        };

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                setActive(link);
            });
        });

        /* Scroll spy */
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const matchingLink = navBar.querySelector(`[data-nav-target="${entry.target.id}"]`);
                    if (matchingLink) setActive(matchingLink);
                }
            });
        }, { rootMargin: '-40% 0px -50% 0px' });

        sections.forEach(item => observer.observe(item.section));
    }

    /* ------------------------------------------------------- Scroll Reveal */
    function initReveal() {
        const targets = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('visible'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        targets.forEach(el => observer.observe(el));
    }

    /* ------------------------------------------------------- Journey Integration */
    function initJourney() {
        if (!window.Journey) return;

        window.Journey.registerSearchItems(
            'frontend/nilgiri-pipit-explorer/index.html',
            [
                {
                    id: 'nilgiri-pipit-main',
                    title: 'Nilgiri Pipit Explorer',
                    description: 'Explore the Nilgiri Pipit (Anthus nilghiriensis) — an endemic bird of the montane grasslands of southern India\'s Western Ghats, covering taxonomy, habitat, diet, behaviour, conservation status, threats, and references.',
                    link: 'frontend/nilgiri-pipit-explorer/index.html'
                },
                {
                    id: 'nilgiri-pipit-classification',
                    title: 'Nilgiri Pipit Taxonomy',
                    description: 'Scientific classification of the Nilgiri Pipit — Kingdom Animalia, Order Passeriformes, Family Motacillidae, described by Sharpe in 1885.',
                    link: 'frontend/nilgiri-pipit-explorer/index.html#classification'
                },
                {
                    id: 'nilgiri-pipit-conservation',
                    title: 'Nilgiri Pipit Conservation Status',
                    description: 'IUCN Vulnerable (VU) — the Nilgiri Pipit faces threats from climate change, plantation invasion of grasslands, overgrazing, and habitat fragmentation.',
                    link: 'frontend/nilgiri-pipit-explorer/index.html#conservation'
                }
            ]
        );
    }

    /* ------------------------------------------------------- Initialize */
    document.addEventListener('DOMContentLoaded', () => {
        initMap();
        initSectionNav();
        initReveal();
        initJourney();
    });
})();
