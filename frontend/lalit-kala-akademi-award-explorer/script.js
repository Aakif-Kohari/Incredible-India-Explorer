/**
 * Lalit Kala Akademi Award Explorer - Interactive Script (Expanded & Production-Ready)
 * Handles tab navigation, theme toggle, smooth scrolling, scroll animations, 
 * gallery lightbox, FAQ accordion, awardee filtering, and advanced accessibility.
 */

(function () {
    'use strict';

    // ==========================================================================
    // CONFIGURATION & STATE
    // ==========================================================================
    const CONFIG = {
        scrollOffset: 80,
        animationThreshold: 0.1,
        countUpDuration: 1600,
        validTabs: ['history', 'timeline', 'eligibility', 'painting', 'sculpture', 'printmaking', 'ceramics', 'selection', 'awardees', 'gallery', 'faq']
    };

    const STATE = {
        currentTheme: localStorage.getItem('theme') || 'dark',
        activeTab: localStorage.getItem('lka_active_tab') || 'history'
    };

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', () => {
        initThemeToggle();
        initTabNavigation();
        initSmoothScroll();
        initMobileMenu();
        initScrollAnimations();
        initCountUp();
        initScrollUI();
        initFooterTabs();
        initCardTilt();
        initTyping();
        initHeroParallax();
        
        // NEW FEATURES
        initGalleryLightbox();
        initFaqAccordion();
        initAwardeeFilter();
        initScrollSpy();
        initDynamicYear();
        initAccessibilityEnhancements();
    });

    // ==========================================================================
    // 1. TAB NAVIGATION (Enhanced with Hash, State & Keyboard)
    // ==========================================================================
    function initTabNavigation() {
        const tabs = document.querySelectorAll('.lka-tab');
        if (!tabs.length) return;

        // Activate initial tab from hash or saved state
        const hash = window.location.hash.replace('#', '');
        const targetTab = CONFIG.validTabs.includes(hash) ? hash : STATE.activeTab;
        activateTab(targetTab, false);

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                activateTab(tab.dataset.tab, true);
            });

            // Keyboard navigation for tabs (Arrow keys, Home, End)
            tab.addEventListener('keydown', (e) => {
                const tabArray = Array.from(tabs);
                const currentIndex = tabArray.indexOf(tab);
                let nextIndex = currentIndex;

                if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabArray.length;
                else if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
                else if (e.key === 'Home') nextIndex = 0;
                else if (e.key === 'End') nextIndex = tabArray.length - 1;
                else return;

                e.preventDefault();
                tabArray[nextIndex].focus();
                activateTab(tabArray[nextIndex].dataset.tab, true);
            });
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            const currentHash = window.location.hash.replace('#', '');
            if (CONFIG.validTabs.includes(currentHash)) {
                activateTab(currentHash, false);
            }
        });
    }

    function activateTab(targetTab, updateHistory = true) {
        const tabs = document.querySelectorAll('.lka-tab');
        const sections = document.querySelectorAll('.lka-section');
        if (!tabs.length || !sections.length) return;

        tabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
        });
        sections.forEach(s => {
            s.classList.remove('active');
            s.setAttribute('hidden', 'true');
        });

        const tab = document.querySelector(`.lka-tab[data-tab="${targetTab}"]`);
        const section = document.getElementById(targetTab);
        
        if (tab && section) {
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');
            section.classList.add('active');
            section.removeAttribute('hidden');
            
            STATE.activeTab = targetTab;
            localStorage.setItem('lka_active_tab', targetTab);

            if (updateHistory) {
                history.pushState(null, null, `#${targetTab}`);
            }

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
            themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
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
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });
    }

    // ==========================================================================
    // 4. MOBILE MENU (Enhanced with Escape & Outside Click)
    // ==========================================================================
    function initMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (!menuToggle || !navMenu) return;

        const toggleMenu = (forceState) => {
            const isOpen = forceState !== undefined ? forceState : !navMenu.classList.contains('active');
            navMenu.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        };

        menuToggle.addEventListener('click', () => toggleMenu());

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu(false);
                menuToggle.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        });
    }

    // ==========================================================================
    // 5. SCROLL ANIMATIONS (Refined Stagger)
    // ==========================================================================
    function initScrollAnimations() {
        const observerOptions = { threshold: CONFIG.animationThreshold, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const targets = document.querySelectorAll('.eligibility-item, .category-card, .selection-step, .awardee-card, .gallery-item, .lka-banner, .lka-content-card, .timeline-item');
        targets.forEach(el => {
            el.classList.add('animate-on-scroll');
            const siblings = Array.from(el.parentNode.children).filter(s => s.classList.contains('animate-on-scroll'));
            const index = siblings.indexOf(el);
            el.style.transitionDelay = `${(index % 6) * 70}ms`;
            observer.observe(el);
        });
    }

    // ==========================================================================
    // 6. COUNT UP (Eased)
    // ==========================================================================
    function initCountUp() {
        const counters = document.querySelectorAll('.lka-count');
        if (!counters.length) return;

        const animate = (counter) => {
            const target = parseInt(counter.dataset.target, 10);
            if (isNaN(target)) return;
            const startTime = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - startTime) / CONFIG.countUpDuration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                const value = Math.round(target * eased);
                counter.textContent = value.toLocaleString('en-IN');
                if (progress < 1) requestAnimationFrame(tick);
                else counter.textContent = target.toLocaleString('en-IN');
            };
            requestAnimationFrame(tick);
        };

        const hero = document.querySelector('.lka-hero');
        if (hero) {
            const observer = new IntersectionObserver((entries, obs) => {
                if (entries[0].isIntersecting) {
                    counters.forEach(animate);
                    obs.disconnect();
                }
            }, { threshold: 0.2 });
            observer.observe(hero);
        } else {
            counters.forEach(animate);
        }
    }

    // ==========================================================================
    // 7. SCROLL UI (Progress & Back to Top)
    // ==========================================================================
    function initScrollUI() {
        const progress = document.getElementById('scroll-progress');
        const progressBar = progress ? progress.querySelector('.lka-scroll-progress-bar') : null;
        const btn = document.getElementById('btn-scroll-top');

        const update = () => {
            const doc = document.documentElement;
            const scrollTop = window.pageYOffset || doc.scrollTop;
            const max = doc.scrollHeight - window.innerHeight;
            
            if (progressBar) {
                progressBar.style.width = (max > 0 ? (scrollTop / max) * 100 : 0) + '%';
            }
            if (btn) {
                btn.classList.toggle('visible', scrollTop > 400);
            }
        };

        window.addEventListener('scroll', update, { passive: true });
        update();

        if (btn) {
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // ==========================================================================
    // 8. FOOTER TABS
    // ==========================================================================
    function initFooterTabs() {
        document.querySelectorAll('.lka-footer-tab').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').replace('#', '');
                activateTab(target, true);
            });
        });
    }

    // ==========================================================================
    // 9. CARD TILT (Pointer only)
    // ==========================================================================
    function initCardTilt() {
        const cards = document.querySelectorAll('.category-card, .awardee-card, .gallery-item');
        if (!cards.length) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const coarse = window.matchMedia('(pointer: coarse)').matches;
        if (reduced || coarse) return;

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (!card.classList.contains('animate-in')) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--spot-x', x + 'px');
                card.style.setProperty('--spot-y', y + 'px');
                const px = x / rect.width;
                const py = y / rect.height;
                const rx = (0.5 - py) * 8;
                const ry = (px - 0.5) * 10;
                card.classList.add('lka-card-tilt');
                card.style.transform = `perspective(600px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.classList.remove('lka-card-tilt');
            });
        });
    }

    // ==========================================================================
    // 10. TYPING EFFECT
    // ==========================================================================
    function initTyping() {
        const el = document.querySelector('.lka-type[data-words]');
        if (!el) return;

        let words = [];
        try { words = JSON.parse(el.dataset.words); } catch (err) { return; }
        if (!Array.isArray(words) || !words.length) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = words[0];
            return;
        }

        let wordIdx = 0, charIdx = 0, deleting = false;

        const tick = () => {
            const word = words[wordIdx];
            el.textContent = word.slice(0, charIdx);

            if (!deleting && charIdx < word.length) {
                charIdx++;
                setTimeout(tick, 90);
            } else if (!deleting && charIdx === word.length) {
                setTimeout(() => { deleting = true; tick(); }, 1700);
            } else if (deleting && charIdx > 0) {
                charIdx--;
                setTimeout(tick, 45);
            } else {
                deleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                setTimeout(tick, 350);
            }
        };
        tick();
    }

    // ==========================================================================
    // 11. HERO PARALLAX
    // ==========================================================================
    function initHeroParallax() {
        const bg = document.querySelector('.lka-hero-bg');
        if (!bg) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let ticking = false;
        const update = () => {
            const y = window.pageYOffset;
            if (y < window.innerHeight) {
                bg.style.backgroundPosition = `center calc(50% + ${y * 0.35}px)`;
            }
        };

        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                update();
                ticking = false;
            });
        }, { passive: true });
        update();
    }

    // ==========================================================================
    // NEW FEATURE 1: GALLERY LIGHTBOX
    // ==========================================================================
    function initGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (!galleryItems.length) return;

        // Create lightbox DOM dynamically
        const lightbox = document.createElement('div');
        lightbox.className = 'lka-lightbox';
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
            caption: item.querySelector('figcaption')?.textContent?.trim() || ''
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
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Open ${item.querySelector('h3')?.textContent || 'image'} in lightbox`);
            
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
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }

    // ==========================================================================
    // NEW FEATURE 2: FAQ ACCORDION
    // ==========================================================================
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all others
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.faq-answer').setAttribute('hidden', 'true');
                });

                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                    answer.removeAttribute('hidden');
                }
            });
        });
    }

    // ==========================================================================
    // NEW FEATURE 3: AWARDEE FILTER
    // ==========================================================================
    function initAwardeeFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const awardeeCards = document.querySelectorAll('.awardee-card');
        if (!filterBtns.length || !awardeeCards.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                awardeeCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => card.classList.add('animate-in'), 50); // Trigger animation
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('animate-in');
                    }
                });
            });
        });
    }

    // ==========================================================================
    // NEW FEATURE 4: SCROLL SPY
    // ==========================================================================
    function initScrollSpy() {
        const sections = document.querySelectorAll('.lka-section');
        const tabs = document.querySelectorAll('.lka-tab');
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
                        const activeTab = document.querySelector(`.lka-tab[data-tab="${id}"]`);
                        if (activeTab) {
                            activeTab.classList.add('active');
                            activeTab.setAttribute('aria-selected', 'true');
                        }
                    }
                }
            });
        }, { threshold: 0.3, rootMargin: '-80px 0px -70% 0px' });

        sections.forEach(section => observer.observe(section));
    }

    // ==========================================================================
    // NEW FEATURE 5: DYNAMIC YEAR
    // ==========================================================================
    function initDynamicYear() {
        const yearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    // ==========================================================================
    // NEW FEATURE 6: ACCESSIBILITY ENHANCEMENTS
    // ==========================================================================
    function initAccessibilityEnhancements() {
        // Skip link focus management
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
    }

    // ==========================================================================
    // EXPORTS (for module usage)
    // ==========================================================================
    window.LKAExplorer = {
        activateTab,
        initTabNavigation,
        initThemeToggle,
        initSmoothScroll,
        initMobileMenu,
        initScrollAnimations,
        initCountUp,
        initScrollUI,
        initFooterTabs,
        initCardTilt,
        initTyping,
        initHeroParallax,
        initGalleryLightbox,
        initFaqAccordion,
        initAwardeeFilter,
        initScrollSpy
    };

})();