/* =========================================================================
   Aruna Asaf Ali Explorer — Tab Navigation
   Issue #1889
   ========================================================================= */

(function () {
    'use strict';

    function initNavigation() {
        var menuToggle = document.getElementById('menu-toggle');
        var navMenu = document.getElementById('nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function () {
                navMenu.classList.toggle('open');
                var expanded = navMenu.classList.contains('open');
                menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            });
        }
    }

    function initTabs() {
        var tabs = document.querySelectorAll('.aaa-tab');
        var sections = document.querySelectorAll('.aaa-section');
        if (!tabs.length || !sections.length) return;

        function activateTab(targetId) {
            tabs.forEach(function (tab) {
                var isActive = tab.getAttribute('data-tab') === targetId;
                tab.classList.toggle('active', isActive);
                tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
            sections.forEach(function (section) {
                section.classList.toggle('active', section.getAttribute('data-tab') === targetId);
            });
            if (history.replaceState) {
                history.replaceState(null, '', '#' + targetId);
            }
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = tab.getAttribute('data-tab');
                if (target) activateTab(target);
            });
        });

        // Deep link: open the tab named in the URL hash on load.
        var hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            activateTab(hash);
        }
    }

    function initSmoothScroll() {
        var heroLinks = document.querySelectorAll('.aaa-hero-cta a[href^="#"]');
        heroLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var href = link.getAttribute('href');
                if (!href || href === '#') return;
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    var tabId = target.getAttribute('data-tab');
                    if (tabId) {
                        var tabButton = document.querySelector('.aaa-tab[data-tab="' + tabId + '"]');
                        if (tabButton) tabButton.click();
                    }
                }
            });
        });
    }

    function initThemeToggle() {
        // Read the persisted theme on load and apply the light-theme class
        // to the page body. The landing page already exposes the same
        // convention; we mirror it so the explorer page respects the
        // visitor's choice.
        try {
            var theme = localStorage.getItem('theme') || 'dark';
            if (theme === 'light') {
                document.body.classList.add('light-theme');
            }
        } catch (e) {
            // localStorage may be unavailable (private mode); fall back to dark.
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        initThemeToggle();
        initNavigation();
        initTabs();
        initSmoothScroll();
    });

    // Expose for unit tests that load the script in Node/jsdom.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { initNavigation: initNavigation, initTabs: initTabs };
    }
})();
