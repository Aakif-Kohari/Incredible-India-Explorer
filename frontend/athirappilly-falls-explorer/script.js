/**
 * Athirappilly Falls Explorer - Interactive Script
 * Handles section navigation, map interaction, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Map Point Data */
    const mapPoints = {
        athirappilly: {
            title: 'Athirappilly Falls',
            desc: 'Kerala\'s largest waterfall at 80 feet, dropping over a rocky escarpment on the Chalakudy River. Known as the "Niagara of India," it features a dramatic three-step vertical drop and is a popular filming location. Managed as part of the Athirappilly-Vazhachal ecotourism circuit.'
        },
        vazhachal: {
            title: 'Vazhachal Falls',
            desc: 'The cascading rapids of the Chalakudy River flowing over rocky terrain in dense forest, just 5 km upstream from Athirappilly. Unlike Athirappilly\'s vertical drop, Vazhachal features inclined cascades creating a series of rapids and pools. More serene and forested experience.'
        },
        thumboormuzhi: {
            title: 'Thumboormuzhi Dam & Ezhattumukham',
            desc: 'Historic check dam built in 1964 across the Chalakudy River. Features hanging bridge, garden, and the nearby Ezhattumukham Prakriti Gramam nature park with butterfly garden, tree houses, and adventure activities.'
        },
        sholayar: {
            title: 'Sholayar Dam',
            desc: 'One of Asia\'s deepest reservoirs surrounded by pristine forests in the Anaimalai range. Built in 1965, it\'s an engineering marvel offering boating, trekking, and stunning views. Part of the Sholayar forest division.'
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
        const navBar = document.getElementById('af-section-nav');
        const navLinks = document.querySelectorAll('.af-nav-link');
        if (!navBar) return;

        const sections = Array.from(navLinks).map(link => ({
            link,
            section: document.getElementById(link.getAttribute('href').replace('#', ''))
        })).filter(item => item.section);

        const setActive = (activeLink) => {
            navLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        };

        navLinks.forEach(link => {
            link.addEventListener('click', () => setActive(link));
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const match = navBar.querySelector(`[href="#${id}"]`);
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
            'frontend/athirappilly-falls-explorer/index.html',
            [
                {
                    id: 'athirappilly-main',
                    title: 'Athirappilly Falls Explorer',
                    description: 'Explore Athirappilly Falls on the Chalakudy River in Kerala - the "Niagara of India," an 80-foot cascade, pristine evergreen forests, rich biodiversity, and the complete river journey from Anaimalai Hills to Arabian Sea.',
                    link: 'frontend/athirappilly-falls-explorer/index.html'
                },
                {
                    id: 'athirappilly-viewpoints',
                    title: 'Athirappilly Falls Viewpoints',
                    description: 'The best spots to view Athirappilly Falls - the Main View Point, Upper View Point, Bridge Viewpoint, and the Vazhachal boat point upstream.',
                    link: 'frontend/athirappilly-falls-explorer/index.html#viewpoints'
                },
                {
                    id: 'athirappilly-ecosystem',
                    title: 'Athirappilly Forest Ecosystem',
                    description: 'Biodiversity hotspot in the Western Ghats near Athirappilly - tropical evergreen forests, endemic primates, 180+ bird species, Asian elephants, and 89 fish species in the Chalakudy River.',
                    link: 'frontend/athirappilly-falls-explorer/index.html#ecosystem'
                },
                {
                    id: 'athirappilly-river',
                    title: 'Chalakudy River Journey',
                    description: 'The 85 km journey of the Chalakudy River from Anaimalai Hills origin through Sholayar forests, Vazhachal cascades, Athirappilly falls, to the Arabian Sea.',
                    link: 'frontend/athirappilly-falls-explorer/index.html#river'
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