/* =========================================================================
   Geeta Chopra Award Explorer — Script Module
   Issue #1114
   Handles: tab navigation, theme toggle, mobile menu, and gallery lightbox.
   ========================================================================= */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initTabs();
        initLightbox();
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
        const sections = document.querySelectorAll('.gc-section');

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

    function initLightbox() {
        const modal = document.getElementById('lightbox-modal');
        const closeBtn = document.getElementById('lightbox-close');
        const imgEl = document.getElementById('lightbox-img');
        const titleEl = document.getElementById('lightbox-title');
        const captionEl = document.getElementById('lightbox-caption');
        if (!modal || !imgEl) return;

        document.querySelectorAll('.gallery-item').forEach(item => {
            const img = item.querySelector('img');
            const figcaption = item.querySelector('figcaption');
            if (!img) return;

            item.addEventListener('click', function() {
                imgEl.src = img.src;
                imgEl.alt = img.alt;
                if (titleEl) titleEl.textContent = img.alt || '';
                if (captionEl) captionEl.textContent = figcaption ? figcaption.textContent : '';
                modal.hidden = false;
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            modal.hidden = true;
            imgEl.src = '';
            document.body.style.overflow = '';
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeLightbox();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.hidden) closeLightbox();
        });
    }
})();
