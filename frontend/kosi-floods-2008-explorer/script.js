/**
 * 2008 Kosi Floods Profile Interactive Features
 * Handles Tab Navigation, Leaflet Flood Map,
 * Theme Switching, Scroll Reveal, and Accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 0a. Scroll Reveal — tag sections and stagger their children
    const sections = document.querySelectorAll('.content-grid > .info-section');
    sections.forEach(sec => sec.classList.add('reveal'));

    const staggerGroups = [
        '.cards-duo', '.highlights-grid', '.guide-grid',
        '.sources-list', '.timeline-list', '.features-list'
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
    let kosiMap = null;
    let mapInitialized = false;
    let animTimer = null;
    const animatedMarker = { marker: null, idx: 0 };

    const catMeta = {
        severe:     { color: '#dc2626', label: 'Severely Affected District' },
        impact:     { color: '#ea580c', label: 'Breach Point / Key Impact' },
        river:      { color: '#0284c7', label: 'River Course' },
        infrastructure: { color: '#7c3aed', label: 'Key Infrastructure' },
        relief:     { color: '#65a30d', label: 'Relief Camp / Response' },
        rescue:     { color: '#eab308', label: '★ Rescue Hub' }
    };

    // Affected sites: [lat, lng, category, name, note]
    const floodSites = [
        // Breach point
        [26.5833, 86.9833, 'impact', 'Kusaha Breach Site', 'Eastern embankment breached on 18 Aug 2008, ~7–12 km upstream of Kosi Barrage. Water discharged at 2,832–3,675 m³/s.'],

        // Severely affected districts
        [26.2300, 86.5800, 'severe', 'Supaul (Worst Hit)', '~893,790 people in 243 villages affected. 1,000 km² of farmland swamped. Basantpur, Triveniganj blocks devastated.'],
        [25.9200, 86.7500, 'severe', 'Madhepura', '~1,022,000 people in 378 villages affected — largest population hit. 126 Panchayats severely impacted. 3–8 feet water in worst areas.'],
        [26.1500, 87.3000, 'severe', 'Araria', '~250,000 people in 30 villages affected. Farbishganj, Raniganj worst hit. Railway tracks submerged.'],
        [25.8800, 86.6000, 'severe', 'Saharsa', '~250,000 people across 7 Panchayats and 35 villages affected. Main road submerged cutting off headquarters.'],
        [25.4500, 87.4700, 'severe', 'Katihar', '~62,015 people across 13 blocks affected. Floodwaters spread as Kosi moved eastward.'],
        [25.7800, 87.4700, 'severe', 'Purnia', 'Increasing inundation as waters spread downstream. Ganga and Mahananda above danger levels.'],
        [25.2500, 86.1300, 'severe', 'Khagaria', 'Downstream flooding as Kosi and Ganga both above danger levels.'],
        [25.2500, 86.9800, 'severe', 'Bhagalpur', 'Ganga above danger level; floodwaters from Kosi spread into low-lying areas.'],

        // Nepal
        [26.5500, 87.0200, 'impact', 'Kosi Barrage, Birpur', 'Barrage completed 1963. Downstream control point for the Kosi. Bridge across the river connecting India and Nepal.'],
        [26.4800, 87.2600, 'severe', 'Sunsari District, Nepal', '~53,800 Nepalese (11,572 households) affected. Koshi Wildlife Reserve severely impacted.'],

        // Key infrastructure
        [26.5000, 86.9500, 'infrastructure', 'Eastern Embankment', 'Eastern bund of the Kosi breached at Kusaha. Part of the 246 km embankment system built 1955–56.'],
        [26.3500, 86.6500, 'infrastructure', 'Western Embankment', 'Western bund remained intact but the river was forced back to this channel after the breach was repaired.'],

        // Relief and rescue
        [26.2300, 86.5800, 'rescue', '★ Supaul Relief Hub', '★ Major NDRF and Army staging point. 16 NDRF teams deployed across the district.'],
        [25.9200, 86.7500, 'rescue', '★ Madhepura Relief Hub', '★ Multiple army boats deployed. 45 relief camps established. Directly in the path of the new channel.'],
        [26.1500, 87.3000, 'relief', 'Araria Relief Camps', '60 relief camps housing 60,000 people. NDRF and SSB boats in operation.'],
        [25.8800, 86.6000, 'relief', 'Saharsa Relief Camps', '41 relief camps established. Road access cut off — supplies airlifted.'],
        [26.6100, 86.9600, 'rescue', '★ Birpur Rescue Point', '★ Near Kosi Barrage. First response point for breach assessment and rescue coordination.'],
        [25.6200, 85.1300, 'rescue', '★ Patna Coordination Centre', '★ State capital. CM Nitish Kumar coordinated disaster response. PM declared natural calamity from here.'],

        // Nepal sites
        [26.5200, 87.0000, 'infrastructure', 'Barahkshetra Gorge', 'Narrow gorge where Kosi exits the Himalayas. Site of the 1979 landslide that pushed the river eastward.'],
        [26.6000, 87.2000, 'relief', 'Koshi Wildlife Reserve', 'Severely impacted by floods. Biodiversity and habitat destroyed along the Kosi in Nepal.']
    ];

    // Schematic river courses: [name, colour, [[lat,lng], ...]]
    const riverCourses = [
        ['Kosi River — Old Western Course (Pre-2008)', '#64748b', [
            [26.60, 86.95], [26.48, 86.88], [26.35, 86.80],
            [26.20, 86.70], [26.05, 86.58], [25.90, 86.48],
            [25.75, 86.40], [25.60, 86.35], [25.45, 86.30],
            [25.35, 86.25]
        ]],
        ['Kosi River — New Eastern Course (Post-Breach Aug 2008)', '#3b82f6', [
            [26.58, 86.98], [26.45, 87.05], [26.30, 87.10],
            [26.15, 87.15], [26.00, 87.10], [25.85, 87.05],
            [25.70, 87.00], [25.55, 86.95], [25.40, 86.90],
            [25.30, 86.85], [25.20, 86.80]
        ]],
        ['Ganga River (Schematic)', '#06b6d4', [
            [25.35, 85.20], [25.32, 85.60], [25.28, 86.00],
            [25.25, 86.40], [25.25, 86.80], [25.25, 87.20],
            [25.25, 87.60]
        ]]
    ];

    // Timeline animation waypoints: [lat, lng, catKey, when]
    const timelinePoints = [
        [26.52, 87.00, 'impact', 'Pre-2008 · Kosi confined within 246 km embankments since 1955–56; riverbed rises 4–5m above floodplain'],
        [26.60, 86.95, 'impact', 'Mid-Aug 2008 · Heavy monsoon rainfall across Kosi catchment; engineers send warning faxes about embankment condition'],
        [26.58, 86.98, 'impact', '18 Aug 2008 · Eastern embankment breaches at Kusaha, Nepal — 2,832 m³/s discharge through the breach'],
        [26.48, 87.05, 'severe', '18–20 Aug · River shifts 120 km eastward, reverting to abandoned 1892–1921 channel'],
        [26.23, 86.58, 'severe', '19–21 Aug · Supaul and Madhepura devastated; 893,790 and 1,022,000 people affected respectively'],
        [26.15, 87.30, 'severe', 'Late Aug · Araria, Saharsa, Katihar hit as flood spreads eastward across North Bihar'],
        [25.62, 85.13, 'rescue', '28 Aug · PM declares "natural calamity"; US $230 million aid released; Army and NDRF deploy'],
        [25.78, 87.47, 'severe', 'Sep–Oct · Waters spread to Purnia, Khagaria, Bhagalpur; Ganga and tributaries above danger level'],
        [25.25, 86.80, 'impact', 'Oct–Nov · Waters slowly recede; 3.3 million affected; World Bank needs assessment begins']
    ];

    function initMap() {
        if (!window.L) return;
        const mapEl = document.getElementById('kosi-map');
        if (!mapEl || mapEl._leaflet_id) return;
        mapInitialized = true;

        kosiMap = L.map('kosi-map', { scrollWheelZoom: false }).setView([25.9, 86.7], 7);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(kosiMap);

        riverCourses.forEach(river => {
            L.polyline(river[2], {
                color: river[1],
                weight: 3,
                opacity: 0.75,
                dashArray: river[0].includes('Old') ? '8, 6' : null
            }).addTo(kosiMap)
              .bindPopup(`<strong>${river[0]}</strong><br>River course shown schematically`);
        });

        floodSites.forEach(site => {
            const meta = catMeta[site[2]] || catMeta.impact;
            const isStar = site[2] === 'rescue';
            L.circleMarker([site[0], site[1]], {
                radius: isStar ? 9 : 7,
                color: '#ffffff',
                weight: 2,
                fillColor: meta.color,
                fillOpacity: 0.95
            }).addTo(kosiMap)
              .bindPopup(`<strong>${site[3]}</strong><br><em>${meta.label}</em><br>${site[4]}<br><em>~${site[0]}°N, ${site[1]}°E</em>`);
        });

        const bounds = L.latLngBounds(floodSites.map(s => [s[0], s[1]]));
        kosiMap.fitBounds(bounds.pad(0.12));
    }

    function stopAnimation() {
        if (animTimer) {
            clearInterval(animTimer);
            animTimer = null;
        }
        if (animatedMarker.marker && kosiMap) {
            kosiMap.removeLayer(animatedMarker.marker);
            animatedMarker.marker = null;
        }
        animatedMarker.idx = 0;
    }

    function animateTimeline() {
        if (!kosiMap) return;
        stopAnimation();
        animatedMarker.idx = 0;
        const first = timelinePoints[0];
        animatedMarker.marker = L.circleMarker([first[0], first[1]], {
            radius: 11,
            color: '#fbbf24',
            weight: 3,
            fillColor: '#ffffff',
            fillOpacity: 0.9
        }).addTo(kosiMap).bindPopup('Playing flood timeline…').openPopup();

        animTimer = setInterval(() => {
            animatedMarker.idx += 1;
            if (animatedMarker.idx >= timelinePoints.length) {
                stopAnimation();
                return;
            }
            const p = timelinePoints[animatedMarker.idx];
            animatedMarker.marker.setLatLng([p[0], p[1]]);
            animatedMarker.marker.bindPopup(`<strong>${p[3]}</strong>`).openPopup();
            kosiMap.panTo([p[0], p[1]]);
        }, 1600);
    }

    function setViewButtons(activeBtn) {
        document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    }

    const btnFullView = document.getElementById('btn-full-view');
    const btnBreach = document.getElementById('btn-breach');
    const btnAffected = document.getElementById('btn-affected');
    const btnAnimate = document.getElementById('btn-animate');

    if (btnFullView) {
        btnFullView.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnFullView);
            if (kosiMap && mapInitialized) {
                const bounds = L.latLngBounds(floodSites.map(s => [s[0], s[1]]));
                kosiMap.fitBounds(bounds.pad(0.12));
            }
        });
    }

    if (btnBreach) {
        btnBreach.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnBreach);
            if (kosiMap) kosiMap.setView([26.50, 86.97], 9);
        });
    }

    if (btnAffected) {
        btnAffected.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnAffected);
            if (kosiMap) kosiMap.setView([25.95, 86.85], 8);
        });
    }

    if (btnAnimate) {
        btnAnimate.addEventListener('click', () => {
            setViewButtons(btnAnimate);
            animateTimeline();
        });
    }

    if (document.getElementById('kosi-map')) {
        setTimeout(initMap, 300);
    }
});
