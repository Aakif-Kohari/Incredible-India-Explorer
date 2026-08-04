(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initJourneySearch();
    });

    function initNavigation() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
        }

        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !expanded);
                navMenu.classList.toggle('active');
            });
        }
    }

    function initJourneySearch() {
        document.addEventListener("app:route-changed", () => {
            if (!window.Journey) return;

            window.Journey.registerSearchItems("frontend/dynasties-of-india-explorer/index.html", [
                {
                    id: "dynasties-of-india-main",
                    title: "Dynasties of India Explorer",
                    description: "Explore the great ruling houses of the subcontinent - their origin legends, greatest rulers, temple masterpieces, and cultural legacies.",
                    link: "frontend/dynasties-of-india-explorer/index.html"
                },
                {
                    id: "dynasties-of-india-hoysala",
                    title: "Hoysala Dynasty Explorer",
                    description: "Discover the Hoysala Dynasty of Karnataka, the tiger-slayer origin legend, and the star-shaped temple masterpieces of Belur, Halebidu, and Somanathapura.",
                    link: "frontend/hoysala-dynasty-explorer/index.html"
                }
            ]);
        });
    }
})();
