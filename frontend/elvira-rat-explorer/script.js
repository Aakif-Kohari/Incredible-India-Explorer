/**
 * Elvira Rat Explorer - Interactive Script
 * Handles section navigation, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Section Navigation */
    function initSectionNav() {
        const navBar = document.getElementById('er-section-nav');
        const navLinks = document.querySelectorAll('.er-nav-link');
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
            'frontend/elvira-rat-explorer/index.html',
            [
                {
                    id: 'elvira-rat-main',
                    title: 'Elvira Rat Explorer',
                    description: 'Explore the Elvira Rat (Cremnomys elvira) — a rare endemic rodent of southern India\'s rocky hills, covering its taxonomy, distribution, behaviour, conservation status (Endangered), and threats from quarrying.',
                    link: 'frontend/elvira-rat-explorer/index.html'
                },
                {
                    id: 'elvira-rat-conservation',
                    title: 'Elvira Rat Conservation Status',
                    description: 'IUCN Endangered (EN) — the Elvira Rat has an extremely small range (under 500 km²) across three isolated hill ranges in southern India, threatened primarily by granite quarrying.',
                    link: 'frontend/elvira-rat-explorer/index.html#conservation'
                },
                {
                    id: 'elvira-rat-protected',
                    title: 'Elvira Rat Protected Areas',
                    description: 'Biligiri Rangaswamy Tiger Reserve and proposed Rock Rat Reserves — the known and proposed protected habitats for India\'s rarest rock-dwelling rodent.',
                    link: 'frontend/elvira-rat-explorer/index.html#protected'
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
