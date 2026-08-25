/**
 * Thalaiyar Falls Explorer - Interactive Script
 * Handles section navigation, map interaction, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Map Point Data */
    const mapPoints = {
        kodaikanal: {
            title: 'Kodaikanal Hill Station',
            desc: 'Known as the "Princess of Hill Stations," Kodaikanal sits at 2,133 metres elevation in the Palani Hills. Founded in 1845 by American missionaries, it serves as the base for visiting Thalaiyar Falls and other attractions.'
        },
        thalaiyar: {
            title: 'Thalaiyar Falls (Rat Tail Falls)',
            desc: 'At 297 metres, this is Tamil Nadu\'s highest waterfall. The thin stream resembles a rat\'s tail as it plunges down the vertical cliff face. Best viewed from Telescope House viewpoint, 3.6 km away.'
        },
        meghamalai: {
            title: 'Meghamalai Plateau',
            desc: 'The water source for Thalaiyar Falls. This high-altitude plateau (1,500+ metres) features tea estates, shola forests, and grasslands. The plateau receives heavy monsoon rainfall that feeds the waterfall.'
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
        const navBar = document.getElementById('tf-section-nav');
        const navLinks = document.querySelectorAll('.tf-nav-link');
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
            'frontend/thalaiyar-falls-explorer/index.html',
            [
                {
                    id: 'thalaiyar-main',
                    title: 'Thalaiyar Falls Explorer',
                    description: 'Explore Thalaiyar Falls (Rat Tail Falls) - Tamil Nadu\'s highest waterfall at 297m in the Palani Hills, featuring height comparisons, mountain maps, seasonal flow patterns, and nearby attractions.',
                    link: 'frontend/thalaiyar-falls-explorer/index.html'
                },
                {
                    id: 'thalaiyar-height',
                    title: 'Thalaiyar Falls Height Comparison',
                    description: 'Visualize 297 metres - compare Thalaiyar\'s height with Qutub Minar, Statue of Liberty, and Taj Mahal. Equivalent to a 97-storey building.',
                    link: 'frontend/thalaiyar-falls-explorer/index.html#height'
                },
                {
                    id: 'thalaiyar-seasonal',
                    title: 'Thalaiyar Falls Seasonal Flow',
                    description: 'When to visit Thalaiyar Falls - peak monsoon flow (June-September), good post-monsoon conditions, and reduced summer flow with the distinctive "rat tail" appearance.',
                    link: 'frontend/thalaiyar-falls-explorer/index.html#seasonal'
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
