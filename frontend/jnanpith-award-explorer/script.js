/**
 * Jnanpith Award Explorer - Interactive Script
 * Handles tab navigation, theme toggle, smooth scrolling, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initThemeToggle();
    initSmoothScroll();
    initMobileMenu();
    initScrollAnimations();
    initCountUp();
    initScrollUI();
    initFooterTabs();
    initCardTilt();
    initTyping();
    initHeroParallax();
});

/**
 * Activate a tab section by its id (shared by tab bar and footer links)
 */
function activateTab(targetTab) {
    const tabs = document.querySelectorAll('.jn-tab');
    const sections = document.querySelectorAll('.jn-section');
    if (!tabs.length || !sections.length) return;

    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    const tab = document.querySelector(`.jn-tab[data-tab="${targetTab}"]`);
    const section = document.getElementById(targetTab);
    if (tab) tab.classList.add('active');
    if (section) {
        section.classList.add('active');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Initialize tab navigation for different sections
 */
function initTabNavigation() {
    document.querySelectorAll('.jn-tab').forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab.dataset.tab));
    });
}

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Set initial icon based on current theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const isLight = body.classList.contains('light-theme');

        if (isLight) {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }
    });
}

/**
 * Update theme toggle icon
 */
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    if (theme === 'light') {
        themeToggle.textContent = '🌙';
    } else {
        themeToggle.textContent = '☀️';
    }
}

/**
 * Initialize smooth scroll for internal links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * Add animation on scroll for elements
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                const el = entry.target;
                setTimeout(() => {
                    el.style.transitionDelay = '0ms';
                    el.classList.remove('animate-on-scroll');
                }, 700);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealVariant = (el) => {
        if (el.classList.contains('gallery-item')) {
            const siblings = Array.from(el.parentNode.children).filter(s => s.classList.contains('gallery-item'));
            return (siblings.indexOf(el) % 2 === 0) ? 'reveal-left' : 'reveal-right';
        }
        if (el.classList.contains('awardee-card') || el.classList.contains('category-card')) return 'reveal-scale';
        if (el.classList.contains('selection-step')) return 'reveal-right';
        if (el.classList.contains('eligibility-item') || el.classList.contains('timeline-item')) return 'reveal-left';
        return 'reveal-up';
    };

    // Observe cards and sections with a staggered reveal delay
    const targets = document.querySelectorAll('.eligibility-item, .category-card, .selection-step, .awardee-card, .gallery-item, .timeline-item, .jn-banner, .jn-content-card');
    targets.forEach(el => {
        el.classList.add('animate-on-scroll', revealVariant(el));
        const siblings = Array.from(el.parentNode.children).filter(s => s.classList.contains('animate-on-scroll'));
        const index = siblings.indexOf(el);
        el.style.transitionDelay = (index % 6) * 70 + 'ms';
        observer.observe(el);
    });
}

/**
 * Scroll progress bar and back-to-top button
 */
function initScrollUI() {
    const progress = document.getElementById('scroll-progress');
    const btn = document.getElementById('btn-scroll-top');
    if (!progress && !btn) return;

    const update = () => {
        const doc = document.documentElement;
        const scrollTop = window.pageYOffset || doc.scrollTop;
        const max = doc.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = (max > 0 ? (scrollTop / max) * 100 : 0) + '%';
        if (btn) btn.classList.toggle('visible', scrollTop > 400);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();

    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/**
 * Footer quick links activate the matching section tab
 */
function initFooterTabs() {
    document.querySelectorAll('.jn-footer-tab').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            activateTab(link.dataset.footerTab);
        });
    });
}

/**
 * Subtle 3D tilt on hover for cards (skipped for touch & reduced-motion)
 */
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
            card.classList.add('jn-card-tilt');
            card.style.transform = `perspective(600px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/**
 * Typewriter effect for the rotating art-form words in the hero
 */
function initTyping() {
    const el = document.querySelector('.jn-type[data-words]');
    if (!el) return;

    let words = [];
    try {
        words = JSON.parse(el.dataset.words);
    } catch (err) {
        return;
    }
    if (!Array.isArray(words) || !words.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = words[0];
        return;
    }

    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
        const word = words[wordIdx];
        el.textContent = word.slice(0, charIdx);

        if (!deleting && charIdx < word.length) {
            charIdx++;
            setTimeout(tick, 90);
        } else if (!deleting && charIdx === word.length) {
            setTimeout(() => {
                deleting = true;
                tick();
            }, 1700);
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

/**
 * Gentle parallax drift for the hero backdrop while scrolling past the top
 */
function initHeroParallax() {
    const bg = document.querySelector('.jn-hero-bg');
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

/**
 * Animate count-up numbers when the hero enters the viewport
 */
function initCountUp() {
    const counters = document.querySelectorAll('.jn-count');
    if (!counters.length) return;

    const duration = 1600;
    const hero = document.querySelector('.jn-hero');

    const animate = (counter) => {
        const target = parseInt(counter.dataset.target, 10);
        if (isNaN(target)) return;
        const startTime = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);
            counter.textContent = value.toLocaleString('en-IN');
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                counter.textContent = target.toLocaleString('en-IN');
            }
        };
        requestAnimationFrame(tick);
    };

    const trigger = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(animate);
                observer.disconnect();
            }
        });
    };

    if (hero) {
        const observer = new IntersectionObserver(trigger, { threshold: 0.2 });
        observer.observe(hero);
    } else {
        counters.forEach(animate);
    }
}

/**
 * Export functions for potential external use
 */
export {
    initTabNavigation,
    activateTab,
    initThemeToggle,
    initSmoothScroll,
    initMobileMenu,
    initScrollAnimations,
    initCountUp,
    initScrollUI,
    initFooterTabs,
    initCardTilt,
    initTyping,
    initHeroParallax
};
