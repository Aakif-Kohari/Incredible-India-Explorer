/* ==========================================================================
   ABOUT US PAGE — script.js
   Vanilla JavaScript — IntersectionObserver scroll reveals, interactive
   timeline rendering, scroll-to-top, and site chrome helpers.
   ========================================================================== */

(function () {
    'use strict';

    /* --------------------------------------------------------------------
       0. TIMELINE DATA
       Project milestones displayed in the interactive timeline.
       Each entry: year, title, description, dotColor (css variable name)
       -------------------------------------------------------------------- */
    var TIMELINE_DATA = [
        {
            year: '2024',
            title: 'Project Launch',
            description: 'Incredible India Explorer is born — a single-page interactive map showcasing India\'s states with cuisine, festivals, and cultural highlights.',
            dotColor: 'about-tl-dot-saffron',
            side: 'left'
        },
        {
            year: '2024',
            title: 'First Major Release',
            description: 'Expanded from a map to a multi-module platform. Cuisine explorer, festival timeline, culture slider, and quiz section go live.',
            dotColor: 'about-tl-dot-gold',
            side: 'right'
        },
        {
            year: '2025',
            title: 'ECSoC Program Launch',
            description: 'Incredible India Explorer joins ECSoC (Eternal College Summer of Code), welcoming dozens of new contributors and 50+ new explorer modules.',
            dotColor: 'about-tl-dot-green',
            side: 'left'
        },
        {
            year: '2025',
            title: '100+ Explorer Modules',
            description: 'The project crosses 100+ modules covering heritage, wildlife, arts, games, timelines, and interactive learning experiences.',
            dotColor: 'about-tl-dot-gold',
            side: 'right'
        },
        {
            year: '2026',
            title: 'Community Growth Milestone',
            description: '120+ contributors, 1,000+ commits, and 200+ pull requests merged. A thriving open-source community spanning multiple continents.',
            dotColor: 'about-tl-dot-saffron',
            side: 'left'
        },
        {
            year: '2026+',
            title: 'The Road Ahead',
            description: 'Goals: 200+ modules, multilingual support, educational curriculum integration, and deeper interactive experiences for every learner.',
            dotColor: 'about-tl-dot-green',
            side: 'right'
        }
    ];

    /* --------------------------------------------------------------------
       1. TIMELINE RENDERER
       -------------------------------------------------------------------- */
    function renderTimeline() {
        var container = document.getElementById('about-timeline');
        if (!container) return;

        var html = '';

        for (var i = 0; i < TIMELINE_DATA.length; i++) {
            var entry = TIMELINE_DATA[i];
            var isLeft = entry.side === 'left';
            var sideClass = isLeft ? 'about-tl-left' : 'about-tl-right';

            html += '<div class="about-tl-entry" data-index="' + i + '">';

            if (isLeft) {
                // Left side: card first, then spacer
                html += '<div class="about-tl-left">';
                html += '<div class="about-tl-card">';
                html += '<span class="about-tl-year">' + escapeHtml(entry.year) + '</span>';
                html += '<h3>' + escapeHtml(entry.title) + '</h3>';
                html += '<p>' + escapeHtml(entry.description) + '</p>';
                html += '</div>';
                html += '</div>';

                html += '<div class="about-tl-dot ' + entry.dotColor + '"></div>';
                html += '<div class="about-tl-right"></div>';
            } else {
                // Right side: spacer first, then card
                html += '<div class="about-tl-left"></div>';
                html += '<div class="about-tl-dot ' + entry.dotColor + '"></div>';

                html += '<div class="about-tl-right">';
                html += '<div class="about-tl-card">';
                html += '<span class="about-tl-year">' + escapeHtml(entry.year) + '</span>';
                html += '<h3>' + escapeHtml(entry.title) + '</h3>';
                html += '<p>' + escapeHtml(entry.description) + '</p>';
                html += '</div>';
                html += '</div>';
            }

            html += '</div>';
        }

        container.innerHTML = html;
    }

    /* --------------------------------------------------------------------
       2. SIMPLE HTML ESCAPE (prevents XSS from timeline data)
       -------------------------------------------------------------------- */
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    /* --------------------------------------------------------------------
       3. INTERSECTION OBSERVER — SCROLL REVEALS
       Reveals elements with .ab-reveal class and timeline entries
       -------------------------------------------------------------------- */
    function initScrollReveals() {
        if (typeof IntersectionObserver === 'undefined') {
            // Fallback: reveal everything if IntersectionObserver is not supported
            var allReveal = document.querySelectorAll('.ab-reveal');
            for (var r = 0; r < allReveal.length; r++) {
                allReveal[r].classList.add('ab-visible');
            }
            var allTl = document.querySelectorAll('.about-tl-entry');
            for (var t = 0; t < allTl.length; t++) {
                allTl[t].classList.add('ab-tl-visible');
            }
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (entry.isIntersecting) {
                    var el = entry.target;

                    // Stagger delay for reveal cards
                    var delay = parseInt(el.getAttribute('data-delay'), 10) || 0;
                    if (delay > 0) {
                        setTimeout(function (target) {
                            target.classList.add('ab-visible');
                        }, delay, el);
                    } else {
                        el.classList.add('ab-visible');
                    }

                    // Add visible class to timeline entries
                    if (el.classList.contains('about-tl-entry')) {
                        el.classList.add('ab-tl-visible');
                    }

                    observer.unobserve(el);
                }
            }
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        // Observe reveal cards
        var revealElements = document.querySelectorAll('.ab-reveal');
        for (var j = 0; j < revealElements.length; j++) {
            observer.observe(revealElements[j]);
        }

        // Observe timeline entries
        var tlEntries = document.querySelectorAll('.about-tl-entry');
        for (var k = 0; k < tlEntries.length; k++) {
            observer.observe(tlEntries[k]);
        }
    }

    /* --------------------------------------------------------------------
       4. SCROLL-TO-TOP BUTTON
       -------------------------------------------------------------------- */
    function initScrollToTop() {
        var btn = document.getElementById('ab-scroll-top');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------------------------
       5. NAVBAR STICKY SHADOW (fallback for pages-common.js)
       -------------------------------------------------------------------- */
    function initNavShadow() {
        var navbar = document.getElementById('navbar');
        if (!navbar) return;

        // If pages-common.js handles it, skip
        // pages-common.js's initSiteChrome adds 'scrolled' class when scrollY > 50
        // Our navbar already has 'scrolled' class by default, so we add/remove based on top
        if (window.scrollY <= 50) {
            // At the very top — still add scrolled for slight shadow
            // Actually, the navbar has scrolled class by default in markup
        }

        // Safety toggle: if pages-common.js doesn't fire, we handle it
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            }
            // Don't remove scrolled — navbar always has scrolled class in our markup
        });
    }

    /* --------------------------------------------------------------------
       6. COUNTER ANIMATION FOR STAT CARDS
       -------------------------------------------------------------------- */
    function initCounterAnimation() {
        var statCards = document.querySelectorAll('.about-stat-card strong');
        if (statCards.length === 0) return;

        // Extract approximate numbers from existing text content
        var statValues = [];
        for (var i = 0; i < statCards.length; i++) {
            var text = statCards[i].textContent.trim();
            var num = parseInt(text.replace(/[,+]/g, ''), 10);
            statValues.push({
                element: statCards[i],
                target: isNaN(num) ? 0 : num,
                suffix: text.includes('+') ? '+' : ''
            });
        }

        // Use IntersectionObserver for counters
        if (typeof IntersectionObserver === 'undefined') return;

        var counterObserver = new IntersectionObserver(function (entries) {
            for (var e = 0; e < entries.length; e++) {
                if (entries[e].isIntersecting) {
                    var parent = entries[e].target;
                    counterObserver.unobserve(parent);

                    // Animate each stat within this parent
                    var stats = parent.querySelectorAll('strong');
                    for (var s = 0; s < stats.length; s++) {
                        var text = stats[s].textContent.trim();
                        var target = parseInt(text.replace(/[,+]/g, ''), 10);
                        if (isNaN(target)) continue;
                        animateCounter(stats[s], target);
                    }
                }
            }
        }, { threshold: 0.5 });

        var heroStats = document.getElementById('about-hero-stats');
        if (heroStats) {
            counterObserver.observe(heroStats);
        }
    }

    function animateCounter(element, target) {
        var duration = 1500;
        var startTime = null;
        var suffix = element.textContent.trim().includes('+') ? '+' : '';

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out quad
            var eased = 1 - (1 - progress) * (1 - progress);
            var current = Math.round(eased * target);
            element.textContent = current + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target + suffix;
            }
        }

        window.requestAnimationFrame(step);
    }

    /* --------------------------------------------------------------------
       7. INITIALIZATION
       -------------------------------------------------------------------- */
    function init() {
        renderTimeline();
        initScrollReveals();
        initScrollToTop();
        initNavShadow();
        initCounterAnimation();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
