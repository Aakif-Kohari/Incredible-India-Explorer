/**
 * Lala Lajpat Rai Explorer - Interactive Script (Expanded & Enhanced)
 * Handles tab navigation, theme toggle, smooth scroll, mobile menu, count-up stats,
 * scroll animations, gallery lightbox, scrollspy, and accessibility features.
 */

(function () {
    'use strict';

    // ==========================================================================
    // CONFIGURATION & STATE
    // ==========================================================================
    const CONFIG = {
        validTabs: ['biography', 'timeline', 'simon-commission', 'legacy', 'gallery', 'references'],
        scrollOffset: 80, // Offset for sticky header
        animationThreshold: 0.15,
        countUpDuration: 1500 // ms for count-up animation
    };

    const STATE = {
        currentTheme: localStorage.getItem('theme') || 'dark',
        activeTab: localStorage.getItem('activeTab') || 'biography'
    };

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', () => {
        initThemeToggle();
        initTabNavigation();
        initSmoothScroll();
        initMobileMenu();
        initCountUp();
        initScrollAnimations();
        initScrollSpy();
        initGalleryLightbox();
        initBackToTop();
        initAccessibilityEnhancements();
    });

    // ==========================================================================
    // 1. TAB NAVIGATION (Enhanced with Keyboard & State)
    // ==========================================================================
    function initTabNavigation() {
        const tabs = document.querySelectorAll('.lajpat-rai-tab');
        const sections = document.querySelectorAll('.lajpat-rai-section');
        if (!tabs.length || !sections.length) return;

        // Activate initial tab from hash or saved state
        const initialHash = window.location.hash.replace('#', '');
        const targetTab = CONFIG.validTabs.includes(initialHash) ? initialHash : STATE.activeTab;
        activateTab(targetTab, false);

        tabs.forEach(tab => {
            // Click handler
            tab.addEventListener('click', () => {
                activateTab(tab.dataset.tab, true);
            });

            // Keyboard navigation (Arrow keys, Home, End) for a11y
            tab.addEventListener('keydown', (e) => {
                const tabArray = Array.from(tabs);
                const currentIndex = tabArray.indexOf(tab);
                let nextIndex = currentIndex;

                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % tabArray.length;
                } else if (e.key === 'ArrowLeft') {
                    nextIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
                } else if (e.key === 'Home') {
                    nextIndex = 0;
                } else if (e.key === 'End') {
                    nextIndex = tabArray.length - 1;
                } else {
                    return;
                }

                e.preventDefault();
                tabArray[nextIndex].focus();
                activateTab(tabArray[nextIndex].dataset.tab, true);
            });
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.replace('#', '');
            if (CONFIG.validTabs.includes(hash)) {
                activateTab(hash, false);
            }
        });
    }

    function activateTab(targetTab, updateHistory = true) {
        const tabs = document.querySelectorAll('.lajpat-rai-tab');
        const sections = document.querySelectorAll('.lajpat-rai-section');

        tabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });
        sections.forEach(s => s.classList.remove('active'));

        const tab = document.querySelector(`.lajpat-rai-tab[data-tab="${targetTab}"]`);
        const section = document.getElementById(targetTab);

        if (tab && section) {
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');
            section.classList.add('active');
            
            // Save state
            STATE.activeTab = targetTab;
            localStorage.setItem('activeTab', targetTab);

            if (updateHistory) {
                history.pushState(null, null, `#${targetTab}`);
            }

            // Smooth scroll to section if triggered by click
            if (updateHistory) {
                setTimeout(() => {
                    const elementPosition = section.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - CONFIG.scrollOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }, 50);
            }
        }
    }

    // ==========================================================================
    // 2. THEME TOGGLE (Enhanced with System Preference)
    // ==========================================================================
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Check system preference if no local storage
        if (!localStorage.getItem('theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            STATE.currentTheme = prefersDark ? 'dark' : 'light';
        }

        applyTheme(STATE.currentTheme);

        themeToggle.addEventListener('click', () => {
            STATE.currentTheme = STATE.currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(STATE.currentTheme);
            localStorage.setItem('theme', STATE.currentTheme);
        });

        // Listen for system theme changes dynamically
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                STATE.currentTheme = e.matches ? 'dark' : 'light';
                applyTheme(STATE.currentTheme);
            }
        });
    }

    function applyTheme(theme) {
        const body = document.body;
        if (theme === 'light') {
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
        }
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
        }
    }

    // ==========================================================================
    // 3. SMOOTH SCROLL (Enhanced with Offset)
    // ==========================================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - CONFIG.scrollOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==========================================================================
    // 4. MOBILE MENU (Enhanced with Escape key & outside click)
    // ==========================================================================
    function initMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (menuToggle && navMenu) {
            const toggleMenu = (forceState) => {
                const isOpen = forceState !== undefined ? forceState : !navMenu.classList.contains('active');
                navMenu.classList.toggle('active', isOpen);
                menuToggle.setAttribute('aria-expanded', String(isOpen));
                menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            };

            menuToggle.addEventListener('click', () => toggleMenu());

            // Close menu when clicking a link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => toggleMenu(false));
            });

            // Close menu on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    toggleMenu(false);
                    menuToggle.focus();
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                    toggleMenu(false);
                }
            });
        }
    }

    // ==========================================================================
    // 5. COUNT UP ANIMATION (Enhanced with Easing & Formatting)
    // ==========================================================================
    function initCountUp() {
        const counters = document.querySelectorAll('.lajpat-rai-count');
        if (!counters.length) return;

        // Easing function for smooth animation
        const easeOutQuad = t => t * (2 - t);

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    const prefix = el.getAttribute('data-prefix') || '';
                    
                    if (isNaN(target)) return;

                    const startTime = performance.now();
                    
                    const updateCount = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / CONFIG.countUpDuration, 1);
                        const easedProgress = easeOutQuad(progress);
                        
                        const current = Math.floor(easedProgress * target);
                        el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
                        }
                    };
                    
                    requestAnimationFrame(updateCount);
                    obs.unobserve(el); // Animate only once
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    // ==========================================================================
    // 6. SCROLL ANIMATIONS (Intersection Observer)
    // ==========================================================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.reveal-on-scroll, .fade-in-up, .slide-in-left');
        if (!animatedElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: unobserve after animation to save resources
                    // observer.unobserve(entry.target); 
                }
            });
        }, { 
            threshold: CONFIG.animationThreshold,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // ==========================================================================
    // 7. SCROLL SPY (Active Tab Highlighting on Scroll)
    // ==========================================================================
    function initScrollSpy() {
        const sections = document.querySelectorAll('.lajpat-rai-section');
        const tabs = document.querySelectorAll('.lajpat-rai-tab');
        if (!sections.length || !tabs.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (CONFIG.validTabs.includes(id)) {
                        tabs.forEach(t => {
                            t.classList.remove('active');
                            t.setAttribute('aria-selected', 'false');
                        });
                        const activeTab = document.querySelector(`.lajpat-rai-tab[data-tab="${id}"]`);
                        if (activeTab) {
                            activeTab.classList.add('active');
                            activeTab.setAttribute('aria-selected', 'true');
                            STATE.activeTab = id;
                        }
                    }
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '-80px 0px -70% 0px' // Adjust based on header height and section size
        });

        sections.forEach(section => observer.observe(section));
    }

    // ==========================================================================
    // 8. GALLERY LIGHTBOX (New Feature)
    // ==========================================================================
    function initGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (!galleryItems.length) return;

        // Create lightbox DOM elements dynamically
        const lightbox = document.createElement('div');
        lightbox.className = 'lajpat-rai-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close gallery">&times;</button>
                <img src="" alt="" class="lightbox-image">
                <div class="lightbox-caption"></div>
                <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
                <button class="lightbox-next" aria-label="Next image">&#10095;</button>
            </div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        const images = Array.from(galleryItems).map(item => ({
            src: item.querySelector('img')?.src || item.dataset.src,
            alt: item.querySelector('img')?.alt || 'Gallery image',
            caption: item.dataset.caption || ''
        }));

        const openLightbox = (index) => {
            currentIndex = index;
            updateLightboxContent();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            closeBtn.focus();
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            galleryItems[currentIndex]?.focus(); // Return focus to triggering element
        };

        const updateLightboxContent = () => {
            const item = images[currentIndex];
            lightboxImg.src = item.src;
            lightboxImg.alt = item.alt;
            lightboxCaption.textContent = item.caption;
        };

        const nextImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxContent();
        };

        const prevImage = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxContent();
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Keyboard navigation for lightbox
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }

    // ==========================================================================
    // 9. BACK TO TOP BUTTON (New Feature)
    // ==========================================================================
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 10. ACCESSIBILITY ENHANCEMENTS
    // ==========================================================================
    function initAccessibilityEnhancements() {
        // Skip to main content link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        }

        // Ensure all interactive icon-only elements have aria-labels
        document.querySelectorAll('button.icon-only, a.icon-only').forEach(el => {
            if (!el.getAttribute('aria-label')) {
                el.setAttribute('aria-label', el.textContent.trim() || 'Interactive element');
            }
        });
    }

})();