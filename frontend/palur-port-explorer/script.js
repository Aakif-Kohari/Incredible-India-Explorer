/**
 * Palur Port Explorer - Interactive Script
 * Handles section navigation, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Section Navigation */
    function initSectionNav() {
        const navBar = document.getElementById('pl-section-nav');
        const navLinks = document.querySelectorAll('.pl-nav-link');
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
            'frontend/palur-port-explorer/index.html',
            [
                {
                    id: 'palur-main',
                    title: 'Palur Ancient Port Explorer',
                    description: 'Explore Palur, an ancient port in Odisha mentioned by Ptolemy and Pliny, serving as a critical gateway for maritime trade between India and Southeast Asia from 3rd century BCE to 8th century CE.',
                    link: 'frontend/palur-port-explorer/index.html'
                },
                {
                    id: 'palur-trade',
                    title: 'Palur Maritime Trade',
                    description: 'Trade significance of Palur port - export of textiles, ivory, spices; import of Roman wine, Chinese silk; maritime routes connecting Mediterranean to Southeast Asia.',
                    link: 'frontend/palur-port-explorer/index.html#trade'
                },
                {
                    id: 'palur-timeline',
                    title: 'Palur Historical Timeline',
                    description: 'Chronological history from Mauryan period (3rd BCE) through Roman trade peak (1st CE), Gupta prosperity, to Eastern Ganga decline (8th CE).',
                    link: 'frontend/palur-port-explorer/index.html#timeline'
                }
            ]
        );
    }

    /* ------------------------------------------------------- Initialize */
    document.addEventListener('DOMContentLoaded', () => {
        initSectionNav();
        initReveal();
        initJourney();
    });
})();
