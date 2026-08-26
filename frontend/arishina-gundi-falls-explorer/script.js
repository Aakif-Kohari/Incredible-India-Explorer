/**
 * Arishina Gundi Falls Explorer - Interactive Script
 * Handles section navigation, map interaction, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Map Point Data */
    const mapPoints = {
        kollur: {
            title: 'Kollur (Mookambika Temple)',
            desc: 'Pilgrim town famous for the ancient Mookambika Temple, one of South India\'s most revered Shakti shrines. Located on the banks of the Souparnika River. Gateway to Arishina Gundi Falls, just 12 km away. Offers accommodation and local eateries.'
        },
        arishina: {
            title: 'Arishina Gundi Falls',
            desc: 'The "turmeric pit" waterfall hidden deep in evergreen forests. A pristine cascade plunges into a natural pool with a distinctive golden-yellow hue after rains. Accessible via 1 km moderate trek through dense Western Ghats forest.'
        },
        kudremukh: {
            title: 'Kudremukh National Park',
            desc: 'UNESCO World Heritage Site known for its rolling grasslands and shola forests. Named after the "horse-face" shaped peak. Critical habitat for the endangered lion-tailed macaque. Trekking permits required from forest department.'
        },
        kundapur: {
            title: 'Kundapur Town',
            desc: 'Coastal town in Udupi district serving as the base for visiting Arishina Gundi Falls (40 km). Connected by rail and road to Mangaluru and Bengaluru. Offers wider range of accommodation and services than Kollur.'
        },
        maravanthe: {
            title: 'Maravanthe Beach',
            desc: 'Unique beach where the Souparnika River flows parallel to the Arabian Sea, separated only by the NH66 highway. Spectacular sunset views. Considered one of Karnataka\'s most beautiful beaches. 30 km from Kollur.'
        }
    };

    /* ------------------------------------------------------- Interactive Map */
    function initMap() {
        const markers = document.querySelectorAll('.map-marker');
        const titleEl = document.getElementById('map-info-title');
        const descEl = document.getElementById('map-info-desc');
        if (!titleEl || !descEl) return;

        markers.forEach(m => {
            const key = m.dataset.point;
            const update = () => {
                const data = mapPoints[key];
                if (data) {
                    titleEl.textContent = data.title;
                    descEl.textContent = data.desc;
                }
            };
            m.addEventListener('click', update);
            m.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    update();
                }
            });
        });
    }

    /* ------------------------------------------------------- Section Navigation */
    function initSectionNav() {
        const navBar = document.getElementById('ag-section-nav');
        const navLinks = document.querySelectorAll('.ag-nav-link');
        if (!navBar) return;

        const sections = Array.from(navLinks).map(link => ({
            link,
            section: document.getElementById(link.getAttribute('href').replace('#', ''))
        })).filter(item => item.section);

        const setActive = (activeLink) => {
            navLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        };

        navLinks.forEach(link => link.addEventListener('click', () => setActive(link)));

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const match = navBar.querySelector(`[href="#${entry.target.id}"]`);
                    if (match) setActive(match);
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
        const observer = new IntersectionObserver(entries => {
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
            'frontend/arishina-gundi-falls-explorer/index.html',
            [
                {
                    id: 'arishina-main',
                    title: 'Arishina Gundi Falls Explorer',
                    description: 'Explore Arishina Gundi Falls in Karnataka - a hidden forest cascade near Kollur in the Western Ghats, featuring pristine evergreen forests, trek trails, and responsible tourism guidance.',
                    link: 'frontend/arishina-gundi-falls-explorer/index.html'
                },
                {
                    id: 'arishina-trek',
                    title: 'Arishina Gundi Trek Route',
                    description: 'Detailed 1 km trek from Kollur road trailhead through evergreen forest, stream crossing, and descent section to reach the hidden cascade and natural pool.',
                    link: 'frontend/arishina-gundi-falls-explorer/index.html#trek'
                },
                {
                    id: 'arishina-tourism',
                    title: 'Responsible Tourism at Arishina Gundi',
                    description: 'Comprehensive guidance for ethical visiting - do\'s and don\'ts, safety tips, and cultural respect guidelines for preserving this hidden Western Ghats gem.',
                    link: 'frontend/arishina-gundi-falls-explorer/index.html#tourism'
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
