/* ==========================================================================
   SAROJINI NAIDU EXPLORER — CLIENT-SIDE INTERACTIONS
   Issue #1872
   Handles: theme toggle, mobile menu, tab navigation, smooth section scroll.
   Mirrors the structure of padma-vibhushan-explorer/script.js.
   ========================================================================== */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initNavigation();
        initTabs();
        initSmoothScrollForTabs();
    });

    /* ---------------------------------------------------------------------
       Navigation: theme toggle + mobile menu
       --------------------------------------------------------------------- */
    function initNavigation() {
        // Theme toggle (dark / light)
        var themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function () {
                document.body.classList.toggle('light-theme');
                var isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                themeToggle.textContent = isLight ? '🌙' : '☀️';
            });

            // Sync icon with the persisted theme on load
            var isLightOnLoad = document.body.classList.contains('light-theme');
            themeToggle.textContent = isLightOnLoad ? '🌙' : '☀️';
        }

        // Mobile hamburger menu
        var menuToggle = document.getElementById('menu-toggle');
        var navMenu = document.getElementById('nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function () {
                var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', String(!expanded));
                navMenu.classList.toggle('active');
            });
        }

        // Navbar shadow on scroll
        var navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 20) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }, { passive: true });
        }
    }

    /* ---------------------------------------------------------------------
       Tabs: show / hide sections based on data-tab attribute
       --------------------------------------------------------------------- */
    function initTabs() {
        var tabBtns = document.querySelectorAll('.tab-btn');
        var sections = document.querySelectorAll('.sn-section');

        if (!tabBtns.length || !sections.length) return;

        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetTab = btn.getAttribute('data-tab');

                tabBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                sections.forEach(function (sec) {
                    if (sec.getAttribute('data-tab') === targetTab || sec.id === targetTab) {
                        sec.classList.add('active');
                    } else {
                        sec.classList.remove('active');
                    }
                });
            });
        });
    }

    /* ---------------------------------------------------------------------
       Smooth-scroll the tab nav into view when a tab is clicked on mobile
       (so the active tab button stays visible after the page jumps).
       --------------------------------------------------------------------- */
    function initSmoothScrollForTabs() {
        var tabNav = document.querySelector('.sn-tab-nav');
        if (!tabNav) return;

        document.querySelectorAll('.tab-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Only auto-scroll on small screens where tabs wrap.
                if (window.innerWidth <= 768) {
                    tabNav.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
})();
