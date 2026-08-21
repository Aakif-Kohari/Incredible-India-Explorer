/**
 * Lakkam Waterfalls Explorer - Interactive Script
 * Handles section navigation, map interaction, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Map Point Data */
    const mapPoints = {
        anamudi: {
            title: 'Anamudi Peak (2,695m)',
            desc: 'The highest mountain in South India and the Western Ghats, located within Eravikulam National Park. Source of the Pambar River that feeds Lakkam Falls. Trekking requires special permission from the forest department.'
        },
        eravikulam: {
            title: 'Eravikulam National Park',
            desc: 'UNESCO World Heritage Site and home to the world\'s largest population of the endangered Nilgiri Tahr (~750 individuals). The park protects high-altitude shola-grassland ecosystems and is the source region for several rivers.'
        },
        lakkam: {
            title: 'Lakkam Waterfalls',
            desc: 'A pristine high-range cascade at 2,730 metres elevation, fed by the Pambar River. Located near Marayoor in the Idukki district, surrounded by shola forests and tea estates. One of Kerala\'s most elevated waterfalls.'
        },
        marayoor: {
            title: 'Marayoor Village',
            desc: 'Historic village known for natural sandalwood forests, prehistoric megalithic dolmens (muniyaras) dating back 3,000 years, and traditional sugarcane cultivation. Gateway to Lakkam Falls, located just 8 km away.'
        },
        munnar: {
            title: 'Munnar Hill Station',
            desc: 'Popular hill station at 1,600 metres elevation famous for rolling tea estates, cool climate, and scenic beauty. Base for visiting Lakkam Falls (35 km) and other high-range attractions. Known as the "Kashmir of South India."'
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
        const navBar = document.getElementById('lk-section-nav');
        const navLinks = document.querySelectorAll('.lk-nav-link');
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
            'frontend/lakkam-waterfalls-explorer/index.html',
            [
                {
                    id: 'lakkam-main',
                    title: 'Lakkam Waterfalls Explorer',
                    description: 'Explore Lakkam Waterfalls in Munnar, Kerala - a pristine high-range cascade at 2,730m in the Anaimalai Hills, featuring shola forests, tea estate landscapes, and rich mountain biodiversity.',
                    link: 'frontend/lakkam-waterfalls-explorer/index.html'
                },
                {
                    id: 'lakkam-structure',
                    title: 'Lakkam Waterfalls Structure',
                    description: 'Journey of the Pambar River from Anamudi Peak (2,695m) through Eravikulam National Park, Lakkam cascade, and tea estates to Chinnar Wildlife Sanctuary.',
                    link: 'frontend/lakkam-waterfalls-explorer/index.html#structure'
                },
                {
                    id: 'lakkam-ecosystem',
                    title: 'Lakkam High-Range Ecosystem',
                    description: 'Unique biodiversity of the Anaimalai Hills - shola forests, Nilgiri Tahr, endemic birds, Neelakurinji blooms, and montane grasslands around Lakkam Waterfalls.',
                    link: 'frontend/lakkam-waterfalls-explorer/index.html#ecosystem'
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
