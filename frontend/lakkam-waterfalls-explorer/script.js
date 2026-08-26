/**
 * Lakkam Waterfalls Explorer - Interactive Script (Enhanced)
 * Handles section navigation, map interaction, scroll reveal, Journey integration,
 * bookmarking, and UI enhancements.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Map Point Data */
    const mapPoints = {
        anamudi: {
            title: 'Anamudi Peak (2,695m)',
            desc: 'The highest mountain in South India and the Western Ghats, located within Eravikulam National Park. Source of the Pambar River that feeds Lakkam Falls. Trekking requires special permission from the forest department.'
        },
        eravikulam: {
            title: 'Eravikulam National Park',
            desc: 'UNESCO World Heritage Site and home to the world\'s largest population of the endangered Nilgiri Tahr (~750 individuals). The park protects high-altitude shola-grassland ecosystems and is the source region for several rivers.'
        },
        lakkam: {
            title: 'Lakkam Waterfalls',
            desc: 'A pristine high-range cascade at 2,730 metres elevation, fed by the Pambar River. Located near Marayoor in the Idukki district, surrounded by shola forests and tea estates. One of Kerala\'s most elevated waterfalls.'
        },
        marayoor: {
            title: 'Marayoor Village',
            desc: 'Historic village known for natural sandalwood forests, prehistoric megalithic dolmens (muniyaras) dating back 3,000 years, and traditional sugarcane cultivation. Gateway to Lakkam Falls, located just 8 km away.'
        },
        munnar: {
            title: 'Munnar Hill Station',
            desc: 'Popular hill station at 1,600 metres elevation famous for rolling tea estates, cool climate, and scenic beauty. Base for visiting Lakkam Falls (35 km) and other high-range attractions. Known as the "Kashmir of South India."'
        }
    };

    /* ------------------------------------------------------- Interactive Map */
    function initMap() {
        const markers = document.querySelectorAll('.map-marker');
        const titleEl = document.getElementById('map-info-title');
        const descEl = document.getElementById('map-info-desc');
        
        if (!titleEl || !descEl || markers.length === 0) return;

        const updateMapInfo = (key, markerElement) => {
            const data = mapPoints[key];
            if (data) {
                // Subtle fade-out, update, fade-in effect
                titleEl.style.opacity = '0';
                descEl.style.opacity = '0';
                
                setTimeout(() => {
                    titleEl.textContent = data.title;
                    descEl.textContent = data.desc;
                    titleEl.style.opacity = '1';
                    descEl.style.opacity = '1';
                }, 200);

                // Update active state on markers for visual feedback
                markers.forEach(m => m.classList.remove('active'));
                if (markerElement) markerElement.classList.add('active');
            }
        };

        markers.forEach(m => {
            const key = m.dataset.point;
            
            // Mouse interaction
            m.addEventListener('click', () => updateMapInfo(key, m));
            
            // Keyboard accessibility (Enter or Space)
            m.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateMapInfo(key, m);
                }
            });
        });

        // Set default active state on load (e.g., Lakkam)
        const defaultMarker = document.querySelector('.map-marker[data-point="lakkam"]');
        if (defaultMarker) {
            updateMapInfo('lakkam', defaultMarker);
        }
    }

    /* ------------------------------------------------------- Section Navigation (Scroll Spy + Smooth Scroll) */
    function initSectionNav() {
        const navBar = document.getElementById('lk-section-nav');
        const navLinks = document.querySelectorAll('.lk-nav-link');
        if (!navBar || navLinks.length === 0) return;

        const sections = Array.from(navLinks).map(link => ({
            link,
            section: document.getElementById(link.getAttribute('href').replace('#', ''))
        })).filter(item => item.section);

        const setActive = (activeLink) => {
            navLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        };

        // Smooth scroll on click
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerOffset = 80; // Adjust based on sticky header height
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    setActive(link);
                }
            });
        });

        // Intersection Observer for scroll spy
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const match = navBar.querySelector(`[href="#${entry.target.id}"]`);
                    if (match) setActive(match);
                }
            });
        }, { rootMargin: '-10% 0px -60% 0px', threshold: 0 });

        sections.forEach(item => observer.observe(item.section));
    }

    /* ------------------------------------------------------- Scroll Reveal */
    function initReveal() {
        const targets = document.querySelectorAll('.reveal');
        if (targets.length === 0) return;

        // Fallback for older browsers
        if (!('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once for performance
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        targets.forEach(el => observer.observe(el));
    }

    /* ------------------------------------------------------- Journey & Bookmark Integration */
    function initJourneyAndBookmarks() {
        // 1. Register Search Items for Global Search
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems(
                'frontend/lakkam-waterfalls-explorer/index.html',
                [
                    {
                        id: 'lakkam-main',
                        title: 'Lakkam Waterfalls Explorer',
                        description: 'Explore Lakkam Waterfalls in Munnar, Kerala - a pristine high-range cascade at 2,730m in the Anaimalai Hills.',
                        link: 'frontend/lakkam-waterfalls-explorer/index.html'
                    },
                    {
                        id: 'lakkam-structure',
                        title: 'Lakkam Waterfalls Structure',
                        description: 'Journey of the Pambar River from Anamudi Peak through Eravikulam National Park to Chinnar Wildlife Sanctuary.',
                        link: 'frontend/lakkam-waterfalls-explorer/index.html#structure'
                    },
                    {
                        id: 'lakkam-ecosystem',
                        title: 'Lakkam High-Range Ecosystem',
                        description: 'Unique biodiversity of the Anaimalai Hills - shola forests, Nilgiri Tahr, and montane grasslands.',
                        link: 'frontend/lakkam-waterfalls-explorer/index.html#ecosystem'
                    }
                ]
            );
        }

        // 2. Bookmark Button Logic
        const bookmarkBtn = document.getElementById('journey-bookmark-btn');
        if (bookmarkBtn) {
            const pageId = 'lakkam-waterfalls-explorer';
            const savedBookmarks = JSON.parse(localStorage.getItem('journeyBookmarks') || '[]');
            
            // Restore initial state
            if (savedBookmarks.some(b => b.id === pageId)) {
                bookmarkBtn.classList.add('saved');
                bookmarkBtn.innerHTML = '♥ Saved to Journey';
                bookmarkBtn.setAttribute('aria-pressed', 'true');
            }

            bookmarkBtn.addEventListener('click', () => {
                const currentBookmarks = JSON.parse(localStorage.getItem('journeyBookmarks') || '[]');
                const isSaved = currentBookmarks.some(b => b.id === pageId);

                if (isSaved) {
                    const updated = currentBookmarks.filter(b => b.id !== pageId);
                    localStorage.setItem('journeyBookmarks', JSON.stringify(updated));
                    bookmarkBtn.classList.remove('saved');
                    bookmarkBtn.innerHTML = '♡ Save to Journey';
                    bookmarkBtn.setAttribute('aria-pressed', 'false');
                    showNotification('Removed from your Journey', 'info');
                } else {
                    const newBookmark = {
                        id: pageId,
                        title: 'Lakkam Waterfalls Explorer',
                        category: 'Nature & Wildlife',
                        location: 'Munnar, Kerala',
                        savedAt: new Date().toISOString()
                    };
                    currentBookmarks.push(newBookmark);
                    localStorage.setItem('journeyBookmarks', JSON.stringify(currentBookmarks));
                    bookmarkBtn.classList.add('saved');
                    bookmarkBtn.innerHTML = '♥ Saved to Journey';
                    bookmarkBtn.setAttribute('aria-pressed', 'true');
                    showNotification('Added to your Journey!', 'success');
                }
            });
        }
    }

    /* ------------------------------------------------------- Back to Top Button */
    function initBackToTop() {
        const btn = document.getElementById('btn-back-to-top');
        if (!btn) return;

        const toggleVisibility = () => {
            if (window.pageYOffset > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        };

        // Passive listener for better scroll performance
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ------------------------------------------------------- Utility: Toast Notification */
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.lk-toast-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `lk-toast-notification lk-toast-${type}`;
        notification.textContent = message;
        
        // Inline styles to ensure it works without extra CSS dependencies
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: type === 'success' ? '#10b981' : '#3b82f6',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            fontWeight: '600',
            zIndex: '9999',
            animation: 'slideUp 0.4s ease forwards',
            fontFamily: 'inherit',
            fontSize: '0.95rem'
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideDown 0.4s ease forwards';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }

    // Inject toast animations dynamically into the document head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(100px); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    /* ------------------------------------------------------- Initialize */
    document.addEventListener('DOMContentLoaded', () => {
        try {
            initMap();
            initSectionNav();
            initReveal();
            initJourneyAndBookmarks();
            initBackToTop();
            console.log('🌿 Lakkam Waterfalls Explorer initialized successfully.');
        } catch (error) {
            console.error('Error initializing Lakkam Waterfalls Explorer:', error);
        }
    });
})();