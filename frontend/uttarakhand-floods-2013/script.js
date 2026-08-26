/**
 * Uttarakhand Floods 2013 Profile Interactive Features
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
    let ukdMap = null;
    let mapInitialized = false;
    let animTimer = null;
    const animatedMarker = { marker: null, idx: 0 };

    const catMeta = {
        severe:     { color: '#dc2626', label: 'Severely Affected District' },
        impact:     { color: '#ea580c', label: 'Major Impact Site' },
        confluence: { color: '#0284c7', label: 'Confluence / River Town' },
        dam:        { color: '#7c3aed', label: 'Key Infrastructure / Dam' },
        landslide:  { color: '#65a30d', label: 'Landslide / GLOF Site' },
        rescue:     { color: '#eab308', label: '★ Rescue Hub' }
    };

    // Affected sites: [lat, lng, category, name, note]
    const floodSites = [
        [30.7346, 79.0669, 'severe', 'Kedarnath', 'Town obliterated except temple; Chorabari Tal breach sent debris flows through the settlement'],
        [30.2833, 78.9833, 'severe', 'Rudraprayag', 'Confluence of Mandakini and Alaknanda; gateway to Kedarnath; severely flooded'],
        [30.5520, 79.5529, 'severe', 'Joshimath', 'Major gateway to Badrinath; landslides and road damage; thousands stranded'],
        [30.7333, 78.4500, 'severe', 'Uttarkashi', 'Gateway to Gangotri and Yamunotri; 1,356% excess rainfall in critical week'],
        [29.5828, 80.2180, 'severe', 'Pithoragarh', 'Gori and Kali river valleys devastated; ITBP evacuated thousands from remote areas'],
        [30.3165, 78.0322, 'impact', 'Dehradun', '370 mm in 24 hours — highest on record; 1,436% excess rainfall in critical week'],
        [30.4700, 79.4400, 'impact', 'Chamoli District', 'Badrinath, Govindghat, Valley of Flowers access severely hit; Alaknanda and Dhauliganga flooded'],
        [30.7433, 79.4933, 'impact', 'Badrinath', 'Char Dham temple; thousands of pilgrims stranded for days; road access severed'],
        [30.2222, 78.7797, 'impact', 'Srinagar Garhwal', 'HNBGU campus area flooded; Mandakini and Alaknanda confluence impact'],
        [30.1461, 78.5972, 'confluence', 'Devprayag', 'Alaknanda-Bhagirathi confluence forming the Ganga; flood peaks merged here'],
        [30.3830, 79.2670, 'confluence', 'Karnaprayag', 'Pindar-Alaknanda confluence; downstream of Nandprayag; severely flooded'],
        [30.6500, 79.1200, 'landslide', 'Gaurikund', 'Base camp for Kedarnath trek; severely damaged; key rescue staging point'],
        [30.7628, 79.0483, 'landslide', 'Chorabari Tal (Gandhi Sarovar)', 'Glacial lake at ~3,900 m that breached on 17 June, triggering the catastrophic Kedarnath flood'],
        [30.6180, 79.5330, 'dam', 'Vishnuprayag HEP', 'Hydropower barrage on Dhauliganga; heavily silted and damaged by flood debris'],
        [30.3757, 78.4803, 'dam', 'Tehri Dam', 'Absorbed Bhagirathi flood wave on 16 June, mitigating downstream damage — functioned as designed'],
        [30.2667, 79.1000, 'rescue', 'Guptakashi', '★ Key Army and IAF rescue staging point; helicopters deployed from here to Kedarnath'],
        [30.0869, 78.2676, 'rescue', 'Rishikesh / Haridwar', '★ Major relief camp hub; injured and evacuees received here; state response coordination'],
        [30.6860, 79.5460, 'rescue', 'Govindghat', '★ Base for Badrinath/Valley of Flowers rescues; Army and NDRF staging point'],
        [29.8700, 80.5400, 'rescue', 'Dharchula', '★ ITBP base for Kumaon border area evacuations; thousands evacuated on foot from remote villages']
    ];

    // Schematic river courses: [name, colour, [[lat,lng], ...]]
    const riverCourses = [
        ['Mandakini (schematic)', '#0ea5e9', [
            [30.75, 79.05], [30.70, 79.09], [30.62, 79.12],
            [30.53, 79.10], [30.40, 79.03], [30.28, 78.98]
        ]],
        ['Alaknanda (schematic)', '#2563eb', [
            [30.74, 79.50], [30.61, 79.53], [30.47, 79.44],
            [30.40, 79.27], [30.28, 79.00], [30.22, 78.78], [30.15, 78.60]
        ]]
    ];

    // Timeline animation waypoints: [lat, lng, catKey, when]
    const timelinePoints = [
        [30.31, 78.03, 'impact', 'Early Jun · Monsoon arrives two weeks early; soils saturate across Garhwal'],
        [30.42, 79.20, 'impact', '13–15 Jun · Heavy rain intensifies; IMD issues warnings; pilgrims continue to Kedarnath'],
        [30.73, 79.07, 'landslide', '16 Jun ~20:15 · First catastrophic flood surge reaches Kedarnath'],
        [30.76, 79.05, 'landslide', '17 Jun ~03:00–07:00 · Chorabari Tal breaches; wall of water sweeps through Kedarnath'],
        [30.31, 78.03, 'impact', '17 Jun · Dehradun records 370 mm in 24 hours; roads across Garhwal vanish'],
        [30.27, 79.10, 'rescue', '19–21 Jun · Operation Surya Hope launched; ITBP reaches Gaurikund; IAF airlift begins'],
        [30.73, 79.07, 'severe', '25 Jun · Mi-17V5 rescue helicopter crashes — 20 rescue personnel killed'],
        [30.28, 78.98, 'severe', 'Late Jun–Jul · Kedarnath temple found intact; town flattened; PM announces ₹1,000 crore relief'],
        [30.15, 78.60, 'confluence', 'Aug–2014 · JRDNA published; Chopra Committee reviews hydro projects; reforms begin']
    ];

    function initMap() {
        if (!window.L) return;
        const mapEl = document.getElementById('ukd-map');
        if (!mapEl || mapEl._leaflet_id) return;
        mapInitialized = true;

        ukdMap = L.map('ukd-map', { scrollWheelZoom: false }).setView([30.3, 79.0], 8);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(ukdMap);

        riverCourses.forEach(river => {
            L.polyline(river[2], {
                color: river[1],
                weight: 3,
                opacity: 0.75
            }).addTo(ukdMap)
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
            }).addTo(ukdMap)
              .bindPopup(`<strong>${site[3]}</strong><br><em>${meta.label}</em><br>${site[4]}<br><em>~${site[0]}°N, ${site[1]}°E</em>`);
        });

        const bounds = L.latLngBounds(floodSites.map(s => [s[0], s[1]]));
        ukdMap.fitBounds(bounds.pad(0.12));
    }

    function stopAnimation() {
        if (animTimer) {
            clearInterval(animTimer);
            animTimer = null;
        }
        if (animatedMarker.marker && ukdMap) {
            ukdMap.removeLayer(animatedMarker.marker);
            animatedMarker.marker = null;
        }
        animatedMarker.idx = 0;
    }

    function animateTimeline() {
        if (!ukdMap) return;
        stopAnimation();
        animatedMarker.idx = 0;
        const first = timelinePoints[0];
        animatedMarker.marker = L.circleMarker([first[0], first[1]], {
            radius: 11,
            color: '#fbbf24',
            weight: 3,
            fillColor: '#ffffff',
            fillOpacity: 0.9
        }).addTo(ukdMap).bindPopup('Playing flood timeline…').openPopup();

        animTimer = setInterval(() => {
            animatedMarker.idx += 1;
            if (animatedMarker.idx >= timelinePoints.length) {
                stopAnimation();
                return;
            }
            const p = timelinePoints[animatedMarker.idx];
            animatedMarker.marker.setLatLng([p[0], p[1]]);
            animatedMarker.marker.bindPopup(`<strong>${p[3]}</strong>`).openPopup();
            ukdMap.panTo([p[0], p[1]]);
        }, 1600);
    }

    function setViewButtons(activeBtn) {
        document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    }

    const btnFullState = document.getElementById('btn-full-state');
    const btnMandakini = document.getElementById('btn-mandakini');
    const btnAlaknanda = document.getElementById('btn-alaknanda');
    const btnAnimate = document.getElementById('btn-animate');

    if (btnFullState) {
        btnFullState.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnFullState);
            if (ukdMap && mapInitialized) {
                const bounds = L.latLngBounds(floodSites.map(s => [s[0], s[1]]));
                ukdMap.fitBounds(bounds.pad(0.12));
            }
        });
    }

    if (btnMandakini) {
        btnMandakini.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnMandakini);
            if (ukdMap) ukdMap.setView([30.50, 79.08], 9);
        });
    }

    if (btnAlaknanda) {
        btnAlaknanda.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnAlaknanda);
            if (ukdMap) ukdMap.setView([30.50, 79.35], 9);
        });
    }

    if (btnAnimate) {
        btnAnimate.addEventListener('click', () => {
            setViewButtons(btnAnimate);
            animateTimeline();
        });
    }

    if (document.getElementById('ukd-map')) {
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
                modalTitle.textContent = title ? title.textContent : 'Uttarakhand Floods 2013 Visual';
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
