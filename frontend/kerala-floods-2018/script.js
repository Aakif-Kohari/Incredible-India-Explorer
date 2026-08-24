/**
 * Kerala Floods 2018 Profile Interactive Features
 * Handles Tab Navigation, Leaflet Flood Map,
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
            if (prefersReducedMotion) { el.textContent = target.toLocaleString('en-IN'); return; }
            const duration = 1500;
            const start = performance.now();
            const tick = now => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(target * eased).toLocaleString('en-IN');
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

    // 4. Leaflet Flood Map
    let keralaMap = null;
    let mapInitialized = false;
    let animTimer = null;
    const animatedMarker = { marker: null, idx: 0 };

    // Category colours
    const catMeta = {
        severe:     { color: '#dc2626', label: 'Severely Affected District' },
        impact:     { color: '#ea580c', label: 'Major Impact Zone' },
        dam:        { color: '#0284c7', label: 'Dam / Reservoir System' },
        infra:      { color: '#7c3aed', label: 'Key Infrastructure' },
        landslide:  { color: '#65a30d', label: 'Landslide Hotspot' },
        rescue:     { color: '#eab308', label: '★ Rescue Hub' }
    };

    // Affected districts and sites: [lat, lng, category, name, note]
    const floodSites = [
        [11.71, 76.13, 'severe', 'Wayanad', 'Plateau cut off for days; Banasura Sagar releases; plantation landslides'],
        [9.87, 76.80, 'severe', 'Idukki', 'Extreme high-range rainfall; Adimali &amp; Murickassery landslides; dam operations epicentre'],
        [9.98, 76.28, 'severe', 'Ernakulam (Kochi)', 'Periyar flooding at Aluva &amp; Kalady; airport flooded; city suburbs submerged'],
        [10.52, 76.21, 'severe', 'Thrissur', 'Karuvannur river overflowed and changed course through dozens of villages'],
        [9.26, 76.79, 'severe', 'Pathanamthitta', 'Pamba–Achankovil confluence flooding; Chengannur cut off'],
        [11.07, 76.07, 'severe', 'Malappuram', 'Kavalappara hillside collapse near Nilambur; Chaliyar basin flooding'],
        [10.78, 76.65, 'impact', 'Palakkad', 'Gayathripuzha &amp; Mangalam dam releases; Nelliyampathy landslips; +75% rainfall'],
        [9.59, 76.52, 'impact', 'Kottayam', 'Meenachil flooding; Kuttanad lowlands inundated for weeks'],
        [9.50, 76.34, 'impact', 'Alappuzha', 'Backwater drainage bottleneck; Kuttanad rice bowl under water'],
        [9.845, 76.967, 'dam', 'Idukki–Cheruthoni Dam', 'All 5 gates opened 9–10 Aug — first time ever, after 26 years'],
        [9.53, 77.15, 'dam', 'Mullaperiyar Dam', 'Record inflows; additional shutters lifted by Tamil Nadu into the Periyar basin'],
        [10.30, 76.70, 'dam', 'Idamalayar Dam', 'Gates opened 9 Aug, adding releases to the Periyar system'],
        [11.66, 75.93, 'dam', 'Banasura Sagar Dam', 'India\'s largest earthen dam released heavy Kabini-headwater inflows'],
        [10.152, 76.402, 'infra', 'Cochin International Airport', 'Flooded by the Periyar; closed 15–29 August 2018'],
        [11.28, 76.23, 'landslide', 'Kavalappara (Nilambur)', 'Hillside buried a settlement on 18 August, claiming dozens of lives'],
        [10.52, 76.69, 'landslide', 'Nelliyampathy Ghats', 'Repeated landslips severed the ghat road through the season'],
        [9.32, 76.61, 'rescue', 'Chengannur', '★ Mass evacuation hub — Army, Navy and volunteers rowed whole wards to safety'],
        [10.10, 76.35, 'rescue', 'Aluva', '★ Periyar riverside town at the centre of boat rescues and relief airlifts']
    ];

    // Schematic river courses: [name, colour, [[lat,lng], ...]]
    const riverCourses = [
        ['Periyar (schematic)', '#0ea5e9', [
            [9.84, 76.99], [9.95, 76.90], [10.03, 76.80], [10.06, 76.69],
            [10.11, 76.48], [10.10, 76.36], [10.01, 76.27]
        ]],
        ['Pamba (schematic)', '#2563eb', [
            [9.44, 77.09], [9.40, 76.92], [9.37, 76.79], [9.33, 76.68],
            [9.31, 76.58], [9.29, 76.49]
        ]]
    ];

    // Timeline animation waypoints: [lat, lng, catKey, when]
    const timelinePoints = [
        [9.9, 76.6, 'severe', 'Jun – Jul 2018 · First two rain waves fill reservoirs'],
        [9.87, 76.90, 'landslide', '8 Aug · Cloudburst-scale rain triggers Idukki landslides'],
        [9.845, 76.967, 'dam', '9 Aug · First Cheruthoni shutter opens after 26 years'],
        [10.30, 76.70, 'dam', '9 Aug · Idamalayar gates open; red alert in all 14 districts'],
        [10.152, 76.402, 'infra', '15 Aug · Cochin airport shuts as Periyar water spills in'],
        [10.10, 76.35, 'rescue', '15–17 Aug · Peak deluge; Aluva and Kalady underwater'],
        [9.32, 76.61, 'rescue', '16–18 Aug · Chengannur mass evacuation by boats'],
        [11.28, 76.23, 'landslide', '18 Aug · Kavalappara hillside collapse'],
        [10.05, 76.3, 'impact', '20–30 Aug · Rain abates, waters recede, Rebuild Kerala begins']
    ];

    function initMap() {
        if (!window.L) return;
        const mapEl = document.getElementById('kerala-map');
        if (!mapEl || mapEl._leaflet_id) return;
        mapInitialized = true;

        keralaMap = L.map('kerala-map', { scrollWheelZoom: false }).setView([10.3, 76.4], 8);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(keralaMap);

        // Schematic river courses
        riverCourses.forEach(river => {
            L.polyline(river[2], {
                color: river[1],
                weight: 3,
                opacity: 0.75
            }).addTo(keralaMap)
              .bindPopup(`<strong>${river[0]}</strong><br>River course shown schematically`);
        });

        // Site markers
        floodSites.forEach(site => {
            const meta = catMeta[site[2]] || catMeta.impact;
            const isStar = site[2] === 'rescue';
            L.circleMarker([site[0], site[1]], {
                radius: isStar ? 9 : 7,
                color: '#ffffff',
                weight: 2,
                fillColor: meta.color,
                fillOpacity: 0.95
            }).addTo(keralaMap)
              .bindPopup(`<strong>${site[3]}</strong><br><em>${meta.label}</em><br>${site[4]}<br><em>~${site[0]}°N, ${site[1]}°E</em>`);
        });

        // Star marker for the airport as headline infrastructure loss
        L.marker([10.152, 76.402]).addTo(keralaMap)
            .bindPopup('<strong>Cochin International Airport</strong><br>Closed 15–29 August 2018<br>First civilian airport in India shut by inland flooding of this scale');

        // Fit bounds to all sites
        const bounds = L.latLngBounds(floodSites.map(s => [s[0], s[1]]));
        keralaMap.fitBounds(bounds.pad(0.12));
    }

    function stopAnimation() {
        if (animTimer) {
            clearInterval(animTimer);
            animTimer = null;
        }
        if (animatedMarker.marker && keralaMap) {
            keralaMap.removeLayer(animatedMarker.marker);
            animatedMarker.marker = null;
        }
        animatedMarker.idx = 0;
    }

    function animateTimeline() {
        if (!keralaMap) return;
        stopAnimation();
        animatedMarker.idx = 0;
        const first = timelinePoints[0];
        animatedMarker.marker = L.circleMarker([first[0], first[1]], {
            radius: 11,
            color: '#fbbf24',
            weight: 3,
            fillColor: '#ffffff',
            fillOpacity: 0.9
        }).addTo(keralaMap).bindPopup('Playing flood timeline…').openPopup();

        animTimer = setInterval(() => {
            animatedMarker.idx += 1;
            if (animatedMarker.idx >= timelinePoints.length) {
                stopAnimation();
                return;
            }
            const p = timelinePoints[animatedMarker.idx];
            animatedMarker.marker.setLatLng([p[0], p[1]]);
            animatedMarker.marker.bindPopup(`<strong>${p[3]}</strong>`).openPopup();
            keralaMap.panTo([p[0], p[1]]);
        }, 1600);
    }

    function setViewButtons(activeBtn) {
        document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    }

    const btnFullState = document.getElementById('btn-full-state');
    const btnPeriyar = document.getElementById('btn-periyar');
    const btnPamba = document.getElementById('btn-pamba');
    const btnAnimate = document.getElementById('btn-animate');

    if (btnFullState) {
        btnFullState.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnFullState);
            if (keralaMap && mapInitialized) {
                const bounds = L.latLngBounds(floodSites.map(s => [s[0], s[1]]));
                keralaMap.fitBounds(bounds.pad(0.12));
            }
        });
    }

    if (btnPeriyar) {
        btnPeriyar.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnPeriyar);
            if (keralaMap) keralaMap.setView([10.0, 76.62], 9);
        });
    }

    if (btnPamba) {
        btnPamba.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnPamba);
            if (keralaMap) keralaMap.setView([9.35, 76.70], 10);
        });
    }

    if (btnAnimate) {
        btnAnimate.addEventListener('click', () => {
            setViewButtons(btnAnimate);
            animateTimeline();
        });
    }

    if (document.getElementById('kerala-map')) {
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
                modalTitle.textContent = title ? title.textContent : 'Kerala Floods 2018 Visual';
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
