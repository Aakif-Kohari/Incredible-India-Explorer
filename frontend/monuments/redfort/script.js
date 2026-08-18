/**
 * Red Fort Page JavaScript
 * Handles theme toggle, scroll animations, and interactive elements
 */

(function() {
    'use strict';

    // ============================================================
    // THEME TOGGLE
    // ============================================================

    const themeToggle = document.getElementById('themeToggleFloating');
    const navThemeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        document.body.classList.toggle('light-theme', theme === 'light');
        document.body.classList.toggle('dark-theme', theme === 'dark');

        const icon = theme === 'dark' ? '☀️' : '🌙';
        if (themeToggle) themeToggle.textContent = icon;
        if (navThemeToggle) navThemeToggle.textContent = icon;

        try {
            const storage = JSON.parse(localStorage.getItem('iie_storage') || '{}');
            storage.theme = theme;
            localStorage.setItem('iie_storage', JSON.stringify(storage));
            localStorage.setItem('red-fort-theme', theme);
        } catch (e) {}
    }

    // Load saved theme
    let savedTheme = 'dark';
    try {
        const siteStorage = JSON.parse(localStorage.getItem('iie_storage') || '{}');
        savedTheme = siteStorage.theme || localStorage.getItem('red-fort-theme') || 'dark';
    } catch (e) {
        savedTheme = localStorage.getItem('red-fort-theme') || 'dark';
    }
    applyTheme(savedTheme);

    function toggleTheme() {
        const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(current);
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (navThemeToggle) navThemeToggle.addEventListener('click', toggleTheme);

    // ============================================================
    // MOBILE MENU TOGGLE
    // ============================================================

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const expanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded);
        });
    }

    // Close menu when clicking a link (mobile)
    document.querySelectorAll('.nav-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ============================================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================================

    const revealElements = document.querySelectorAll('.history-card, .arch-card, .structure-card, .fact-card-monument, .gallery-item, .about-content, .unesco-content, .timeline-item');

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
        el.classList.add('animate-on-scroll');
        revealObserver.observe(el);
    });

    // ============================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================================

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ============================================================
    // GALLERY LIGHTBOX
    // ============================================================

    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const overlay = document.createElement('div');
                overlay.className = 'lightbox-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.9);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    padding: 40px;
                    animation: fadeIn 0.3s ease;
                `;

                const enlargedImg = document.createElement('img');
                enlargedImg.src = img.src;
                enlargedImg.alt = img.alt || 'Red Fort image';
                enlargedImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 8px;
                    box-shadow: 0 8px 40px rgba(0,0,0,0.5);
                    object-fit: contain;
                `;

                const closeBtn = document.createElement('button');
                closeBtn.textContent = '✕';
                closeBtn.style.cssText = `
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    background: none;
                    border: none;
                    color: #fff;
                    font-size: 2rem;
                    cursor: pointer;
                    z-index: 10000;
                    font-family: 'Outfit', sans-serif;
                `;

                overlay.appendChild(enlargedImg);
                overlay.appendChild(closeBtn);

                overlay.addEventListener('click', function(e) {
                    if (e.target === overlay || e.target === closeBtn) {
                        this.remove();
                        document.body.style.overflow = '';
                    }
                });

                document.body.appendChild(overlay);
                document.body.style.overflow = 'hidden';

                // Close on Escape key
                document.addEventListener('keydown', function closeOnEscape(e) {
                    if (e.key === 'Escape') {
                        if (document.querySelector('.lightbox-overlay')) {
                            document.querySelector('.lightbox-overlay').remove();
                            document.body.style.overflow = '';
                            document.removeEventListener('keydown', closeOnEscape);
                        }
                    }
                });
            }
        });
    });

    // ============================================================
    // DYNAMIC YEAR IN FOOTER
    // ============================================================

    const footerYear = document.querySelector('.footer-credits p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
    }

    // ============================================================
    // ADD KEYFRAMES FOR ANIMATIONS
    // ============================================================

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        .animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
        .animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
        .animate-on-scroll:nth-child(4) { transition-delay: 0.3s; }
        .animate-on-scroll:nth-child(5) { transition-delay: 0.4s; }
        .animate-on-scroll:nth-child(6) { transition-delay: 0.5s; }

        /* Lightbox styles */
        .lightbox-overlay {
            animation: fadeIn 0.3s ease;
        }
    `;
    document.head.appendChild(styleSheet);

    // ============================================================
    // KEYBOARD SHORTCUT
    // ============================================================

    document.addEventListener('keydown', function(e) {
        // Press 't' to toggle theme
        if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey && !e.altKey) {
            toggleTheme();
            e.preventDefault();
        }

        // Press 'r' to scroll to top
        if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey && !e.altKey) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            e.preventDefault();
        }
    });

    // ============================================================
    // CONSOLE WELCOME
    // ============================================================

    console.log('%c🏰 Red Fort Explorer', 'font-size: 24px; font-weight: bold; color: #B22222;');
    console.log('%cIncredible India Explorer — Red Fort Monument Page', 'font-size: 14px; color: #C9A063;');
    console.log('%cExplore Delhi\'s Mughal imperial fortress.', 'font-size: 12px; color: #8a7a6a;');

})();