/**
 * Neelakurinji Explorer - Interactive Script
 * Handles section navigation, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Section Navigation */
    function initSectionNav() {
        const navBar = document.getElementById('nk-section-nav');
        const navLinks = document.querySelectorAll('.nk-nav-link');
        if (!navBar) return;

        const sections = Array.from(navLinks).map(link => {
            const target = link.getAttribute('href').replace('#', '');
            return { link, section: document.getElementById(target) };
        }).filter(item => item.section);

        const setActive = (activeLink) => {
            navLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        };

        navLinks.forEach(link => {
            link.addEventListener('click', () => setActive(link));
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const matchingLink = navBar.querySelector(`[href="#${id}"]`);
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
            'frontend/neelakurinji-explorer/index.html',
            [
                {
                    id: 'neelakurinji-main',
                    title: 'Neelakurinji Explorer',
                    description: 'Explore Neelakurinji (Strobilanthes kunthiana) — the famous flowering shrub endemic to the Western Ghats that blooms once every twelve years, painting hillsides in violet-blue.',
                    link: 'frontend/neelakurinji-explorer/index.html'
                },
                {
                    id: 'neelakurinji-flowering',
                    title: 'Neelakurinji 12-Year Flowering Cycle',
                    description: 'The plietesial flowering cycle of Neelakurinji — from 1838 through the 2018 mass bloom to the next expected flowering in 2030.',
                    link: 'frontend/neelakurinji-explorer/index.html#flowering'
                },
                {
                    id: 'neelakurinji-ecology',
                    title: 'Neelakurinji Ecological Importance',
                    description: 'How Neelakurinji supports pollinators, stabilises soil, provides wildlife food, and acts as a cultural keystone species in the Western Ghats.',
                    link: 'frontend/neelakurinji-explorer/index.html#ecology'
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
