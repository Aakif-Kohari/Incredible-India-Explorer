/**
 * Chandraketugarh Port Explorer - Interactive Script
 * Handles section navigation, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Section Navigation */
    function initSectionNav() {
        const navBar = document.getElementById('cg-section-nav');
        const navLinks = document.querySelectorAll('.cg-nav-link');
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
            'frontend/chandraketugarh-port-explorer/index.html',
            [
                {
                    id: 'chandraketugarh-main',
                    title: 'Chandraketugarh River Port Explorer',
                    description: 'Explore Chandraketugarh, an ancient river port in West Bengal associated with the Gangaridai kingdom, featuring 1,500 years of continuous settlement from Mauryan to Pala periods.',
                    link: 'frontend/chandraketugarh-port-explorer/index.html'
                },
                {
                    id: 'chandraketugarh-archaeology',
                    title: 'Chandraketugarh Archaeological Discoveries',
                    description: 'Major excavations revealing fortification walls, Buddhist monastery, 10,000+ terracotta plaques, Roman coins, and sophisticated water management systems.',
                    link: 'frontend/chandraketugarh-port-explorer/index.html#archaeology'
                },
                {
                    id: 'chandraketugarh-timeline',
                    title: 'Chandraketugarh Historical Timeline',
                    description: 'Chronological history from 4th century BCE Mauryan foundation through Roman trade peak to 12th century CE Pala-Sena decline.',
                    link: 'frontend/chandraketugarh-port-explorer/index.html#timeline'
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
