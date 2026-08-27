/* =========================================================================
   I-League Trophy Explorer — Script Module
   Issue #2535
   Handles: tab navigation, theme toggle, mobile menu.
   ========================================================================= */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initTabs();
    });

    function initNavigation() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                try {
                    const storage = JSON.parse(localStorage.getItem('iie_storage') || '{}');
                    storage.theme = isLight ? 'light' : 'dark';
                    localStorage.setItem('iie_storage', JSON.stringify(storage));
                } catch(e) {
                    localStorage.setItem('theme', isLight ? 'light' : 'dark');
                }
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

    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const sections = document.querySelectorAll('.il-section');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                tabBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                sections.forEach(sec => {
                    if (sec.getAttribute('data-tab') === targetTab) {
                        sec.classList.add('active');
                    } else {
                        sec.classList.remove('active');
                    }
                });
            });
        });
    }
})();
