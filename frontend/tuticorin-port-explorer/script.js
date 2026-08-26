/**
 * Tuticorin Port Explorer - Interactive Script
 * Handles section navigation, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    function initSectionNav() {
        const navBar = document.getElementById('tt-section-nav');
        const navLinks = document.querySelectorAll('.tt-nav-link');
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

    function initJourney() {
        if (!window.Journey) return;
        window.Journey.registerSearchItems(
            'frontend/tuticorin-port-explorer/index.html',
            [
                {
                    id: 'tuticorin-main',
                    title: 'Tuticorin Ancient Port Explorer',
                    description: 'Explore Tuticorin (Thoothukudi), the historic Pearl City of Tamil Nadu — ancient maritime hub on the Gulf of Mannar renowned for pearl fisheries and trade with Rome, Greece, and Southeast Asia.',
                    link: 'frontend/tuticorin-port-explorer/index.html'
                },
                {
                    id: 'tuticorin-pearl',
                    title: 'Tuticorin Pearl Trade',
                    description: 'The pearl fisheries of the Gulf of Mannar — Paravar divers, royal Pandyan monopoly, global trade networks, and classical documentation by Pliny and the Periplus.',
                    link: 'frontend/tuticorin-port-explorer/index.html#pearl'
                },
                {
                    id: 'tuticorin-timeline',
                    title: 'Tuticorin Historical Timeline',
                    description: 'From 3rd BCE Sangam era through Roman trade peak, Arab trade expansion, Marco Polo\'s visit, Portuguese/Dutch/British colonial periods.',
                    link: 'frontend/tuticorin-port-explorer/index.html#timeline'
                }
            ]
        );
    }

    document.addEventListener('DOMContentLoaded', () => {
        initSectionNav();
        initReveal();
        initJourney();
    });
})();
