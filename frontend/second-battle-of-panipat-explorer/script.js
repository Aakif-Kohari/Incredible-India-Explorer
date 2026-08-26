/* ==========================================================================
   SECOND BATTLE OF PANIPAT EXPLORER — CLIENT-SIDE INTERACTIONS
   Issue #1613
   Handles: theme toggle, mobile menu, tab navigation, smooth section scroll.
   ========================================================================== */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initNavigation();
        initTabs();
        initSmoothScrollForTabs();
    });

    function initNavigation() {
        var themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function () {
                document.body.classList.toggle('light-theme');
                var isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                themeToggle.textContent = isLight ? '🌙' : '☀️';
            });

            var isLightOnLoad = document.body.classList.contains('light-theme');
            themeToggle.textContent = isLightOnLoad ? '🌙' : '☀️';
        }

        var menuToggle = document.getElementById('menu-toggle');
        var navMenu = document.getElementById('nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function () {
                var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', String(!expanded));
                navMenu.classList.toggle('active');
            });
        }

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

    function initTabs() {
        var tabBtns = document.querySelectorAll('.tab-btn');
        var sections = document.querySelectorAll('.sbp-section');

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

    function initSmoothScrollForTabs() {
        var tabNav = document.querySelector('.sbp-tab-nav');
        if (!tabNav) return;

        document.querySelectorAll('.tab-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    tabNav.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
})();
