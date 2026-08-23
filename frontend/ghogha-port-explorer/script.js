/**
 * Ghogha Port Explorer - Interactive Script
 * Handles section navigation, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    function initSectionNav() {
        const navBar = document.getElementById('gh-section-nav');
        const navLinks = document.querySelectorAll('.gh-nav-link');
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
            'frontend/ghogha-port-explorer/index.html',
            [
                {
                    id: 'ghogha-main',
                    title: 'Ghogha Ancient Port Explorer',
                    description: 'Explore Ghogha, one of Gujarat\'s oldest ports with 4,000 years of Arabian Sea trade history from Harappan to colonial periods, on the Gulf of Khambhat.',
                    link: 'frontend/ghogha-port-explorer/index.html'
                },
                {
                    id: 'ghogha-trade',
                    title: 'Ghogha Maritime Trade',
                    description: 'Trade commodities including salt, cotton textiles, Arabian horses, gems, and ivory. Maritime routes connecting to Arabian Gulf, Persia, and East Africa.',
                    link: 'frontend/ghogha-port-explorer/index.html#trade'
                },
                {
                    id: 'ghogha-timeline',
                    title: 'Ghogha Historical Timeline',
                    description: '4,000-year chronological history from Harappan era (2000 BCE) through Mauryan, Solanki, Mughal, and British colonial periods to present day.',
                    link: 'frontend/ghogha-port-explorer/index.html#timeline'
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
