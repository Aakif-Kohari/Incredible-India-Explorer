/**
 * Cyclone Amphan 2020 Profile Interactive Features
 * Handles Tab Navigation, Leaflet Storm-Track Map,
 * Lightbox Gallery, Theme Switching, and Accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 0a. Scroll Reveal — tag sections and stagger their children
    const sections = document.querySelectorAll('.content-grid > .info-section');
    sections.forEach(sec => sec.classList.add('reveal'));

    const staggerGroups = [
        '.cards-duo', '.highlights-grid', '.guide-grid',
        '.gallery-grid', '.sources-list', '.timeline-list',
        '.features-list'
    ];
    staggerGroups.forEach(sel => {
        document.querySelectorAll(`${sel} > *`).forEach((child, i) => {
            child.classList.add('reveal-item');
            child.style.transitionDelay = `${Math.min(i * 90, 540)}ms`;
        });
    });

    function initReveal() {
        const els = document.querySelectorAll('.reveal, .reveal-item');
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('visible'));
            return;
        }
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        els.forEach(el => obs.observe(el));
    }
    initReveal();

    // 0b. Animated Stat Counters
    function initCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        const runCounter = el => {
            const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
            if (prefersReducedMotion) { el.textContent = target; return; }
            const duration = 1500;
            const start = performance.now();
            const tick = now => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased);
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        if (!('IntersectionObserver' in window)) {
            counters.forEach(runCounter);
            return;
        }
        const cObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    cObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        counters.forEach(c => cObs.observe(c));
    }
    initCounters();

    // 0c. Navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // 0d. Smooth scrolling for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const id = anchor.getAttribute('href').slice(1);
            const target = id ? document.getElementById(id) : null;
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
            }
        });
    });

    // 1. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.dataset.listenerBound = 'true';
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            if (isLight) {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // 3. Hub Tab Switching
    const tabBtns = document.querySelectorAll('.hub-tab-btn');
    const tabPanels = document.querySelectorAll('.hub-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(p => {
                p.classList.remove('active');
                p.hidden = true;
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const tabKey = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(`panel-${tabKey}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.hidden = false;
            }
        });
    });

    // 4. Leaflet Storm Track Map
    let amphanMap = null;
    let mapInitialized = false;
    let animTimer = null;
    const animatedMarker = { marker: null, idx: 0 };

    // Approximate IMD/RSMC best-track points: [lat, lng, stageKey]
    const trackPoints = [
        [10.8, 93.2, 'lpa'],
        [12.8, 91.8, 'dep'],
        [13.8, 90.6, 'dd'],
        [15.0, 89.4, 'cs'],
        [16.2, 88.3, 'vscs'],
        [17.5, 87.1, 'sucs'],
        [19.3, 86.6, 'escs'],
        [20.5, 86.9, 'vscs'],
        [21.55, 88.08, 'landfall'],
        [22.6, 88.7, 'cs'],
        [24.7, 89.5, 'cs'],
        [25.4, 90.2, 'dep']
    ];

    const stageMeta = {
        lpa:      { color: '#64748b', label: 'Low Pressure Area', when: '13–15 May' },
        dep:      { color: '#16a34a', label: 'Depression', when: '16 May' },
        dd:       { color: '#65a30d', label: 'Deep Depression', when: '16 May' },
        cs:       { color: '#f59e0b', label: 'Cyclonic Storm "Amphan"', when: '17 May · 20–21 May' },
        vscs:     { color: '#dc2626', label: 'Very Severe Cyclonic Storm', when: '17 May · 20 May' },
        sucs:     { color: '#7c3aed', label: 'Super Cyclonic Storm — Peak ~240 km/h', when: '18 May' },
        escs:     { color: '#991b1b', label: 'Extremely Severe Cyclonic Storm', when: '19 May' },
        landfall: { color: '#000000', label: '★ LANDFALL near Bakkhali / Sagar Island', when: '20 May, ~14:30 IST' }
    };

    const impactSites = [
        { coords: [21.56, 88.08], name: 'Bakkhali / Sagar Island', note: '<strong>Landfall zone</strong> — surge up to 4–5 m, embankments breached' },
        { coords: [21.95, 88.9], name: 'Sundarbans (West Bengal)', note: 'Mangrove buffer hit; villages flooded by saline surge; wildlife displaced' },
        { coords: [22.57, 88.36], name: 'Kolkata', note: 'Storm core passed after dark — trees uprooted, city-wide blackout, airport shut' },
        { coords: [21.63, 87.51], name: 'Digha', note: 'Western edge of the landfall corridor — heavy damage to seafront' },
        { coords: [21.78, 87.75], name: 'Contai (Kanthi)', note: 'Surge flooding and destroyed harvests in Purba Medinipur' },
        { coords: [21.49, 86.94], name: 'Balasore (Odisha)', note: 'Northern Odisha swathe — gales and rain as circulation crossed' },
        { coords: [20.32, 86.61], name: 'Paradip (Odisha)', note: 'Heavy rain bands along the Odisha coast; ports on alert' },
        { coords: [22.43, 91.1], name: 'Hatiya Island (Bangladesh)', note: 'Eastern edge of the landfall corridor' }
    ];

    function initMap() {
        if (!window.L) return;
        const mapEl = document.getElementById('amphan-map');
        if (!mapEl || mapEl._leaflet_id) return;

        amphanMap = L.map('amphan-map', { scrollWheelZoom: false }).setView([18.2, 88.0], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(amphanMap);

        // Dashed track polyline
        const latlngs = trackPoints.map(p => [p[0], p[1]]);
        L.polyline(latlngs, {
            color: '#e11d48',
            weight: 3,
            opacity: 0.85,
            dashArray: '8 10'
        }).addTo(amphanMap);

        // Stage markers
        trackPoints.forEach(pt => {
            const meta = stageMeta[pt[2]] || stageMeta.lpa;
            const isLandfall = pt[2] === 'landfall';
            L.circleMarker([pt[0], pt[1]], {
                radius: isLandfall ? 10 : 7,
                color: '#ffffff',
                weight: 2,
                fillColor: meta.color,
                fillOpacity: 0.95
            }).addTo(amphanMap)
              .bindPopup(`<strong>${meta.label}</strong><br>${meta.when}<br><em>~${pt[0]}°N, ${pt[1]}°E</em>`);
        });

        // Landfall star marker
        L.marker([21.55, 88.08]).addTo(amphanMap)
            .bindPopup('<strong>★ Landfall — 20 May 2020, ~14:30 IST</strong><br>Very Severe Cyclonic Storm<br>Winds 155–165 km/h, gusts ~185 km/h<br>Near Bakkhali / Sagar Island, West Bengal');

        // Impact sites
        impactSites.forEach(site => {
            L.marker(site.coords).addTo(amphanMap)
                .bindPopup(`<strong>${site.name}</strong><br>${site.note}`);
        });
    }

    function stopAnimation() {
        if (animTimer) {
            clearInterval(animTimer);
            animTimer = null;
        }
        if (animatedMarker.marker && amphanMap) {
            amphanMap.removeLayer(animatedMarker.marker);
            animatedMarker.marker = null;
        }
        animatedMarker.idx = 0;
    }

    function animateTrack() {
        if (!amphanMap) return;
        stopAnimation();
        animatedMarker.idx = 0;
        animatedMarker.marker = L.circleMarker([trackPoints[0][0], trackPoints[0][1]], {
            radius: 11,
            color: '#fbbf24',
            weight: 3,
            fillColor: '#ffffff',
            fillOpacity: 0.9
        }).addTo(amphanMap).bindPopup('Tracking Amphan…');

        animTimer = setInterval(() => {
            animatedMarker.idx += 1;
            if (animatedMarker.idx >= trackPoints.length) {
                stopAnimation();
                return;
            }
            const p = trackPoints[animatedMarker.idx];
            animatedMarker.marker.setLatLng([p[0], p[1]]);
            const meta = stageMeta[p[2]] || stageMeta.lpa;
            animatedMarker.marker.bindPopup(`<strong>${meta.label}</strong><br>${meta.when}`).openPopup();
        }, 900);
    }

    function setViewButtons(activeBtn) {
        document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    }

    const btnFullTrack = document.getElementById('btn-full-track');
    const btnLandfall = document.getElementById('btn-landfall');
    const btnKolkata = document.getElementById('btn-kolkata');
    const btnAnimate = document.getElementById('btn-animate');

    if (btnFullTrack) {
        btnFullTrack.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnFullTrack);
            if (amphanMap) amphanMap.setView([18.2, 88.0], 5);
        });
    }

    if (btnLandfall) {
        btnLandfall.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnLandfall);
            if (amphanMap) amphanMap.setView([21.55, 88.08], 9);
        });
    }

    if (btnKolkata) {
        btnKolkata.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnKolkata);
            if (amphanMap) amphanMap.setView([22.57, 88.36], 9);
        });
    }

    if (btnAnimate) {
        btnAnimate.addEventListener('click', () => {
            setViewButtons(btnAnimate);
            animateTrack();
        });
    }

    if (document.getElementById('amphan-map')) {
        setTimeout(initMap, 300);
    }

    // 5. Gallery Lightbox Modal
    const galleryItems = document.querySelectorAll('.gallery-card-item');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDesc = document.getElementById('lightbox-desc');
    const modalAttr = document.getElementById('lightbox-attr');
    const closeBtn = document.getElementById('lightbox-close-btn');

    galleryItems.forEach(item => {
        const openLightbox = () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4');
            const desc = item.querySelector('p');
            const attr = item.querySelector('.attribution-tag');

            if (img && modal && modalImg) {
                modalImg.src = img.src;
                modalImg.alt = img.alt || '';
                modalTitle.textContent = title ? title.textContent : 'Cyclone Amphan Visual';
                modalDesc.textContent = desc ? desc.textContent : '';
                modalAttr.textContent = attr ? attr.textContent : '';
                modal.hidden = false;
                if (closeBtn) closeBtn.focus();
            }
        };

        item.addEventListener('click', openLightbox);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox();
            }
        });
    });

    const closeModal = () => {
        if (modal) modal.hidden = true;
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hidden) {
            closeModal();
        }
    });
});
