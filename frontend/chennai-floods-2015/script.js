/**
 * Chennai Floods 2015 Profile Interactive Features
 * Handles Tab Navigation, Leaflet Waterways & Flood Map,
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

    // 0b+. Cinematic Hero Ambience — rain, lightning, parallax
    const heroSection = document.querySelector('.hero-section.chennai-hero');

    function buildRain() {
        const rainLayer = document.getElementById('rain-layer');
        if (!rainLayer || prefersReducedMotion) return;
        const dropCount = window.innerWidth < 720 ? 34 : 64;
        const frag = document.createDocumentFragment();
        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('span');
            drop.className = 'raindrop';
            drop.style.left = `${(Math.random() * 104 - 2).toFixed(2)}%`;
            drop.style.height = `${Math.round(58 + Math.random() * 82)}px`;
            drop.style.animationDuration = `${(0.55 + Math.random() * 0.5).toFixed(2)}s`;
            drop.style.animationDelay = `-${(Math.random() * 1.3).toFixed(2)}s`;
            drop.style.opacity = (0.35 + Math.random() * 0.45).toFixed(2);
            frag.appendChild(drop);
        }
        rainLayer.appendChild(frag);
    }
    buildRain();

    function scheduleLightning() {
        const flash = heroSection && heroSection.querySelector('.lightning-flash');
        if (!flash || prefersReducedMotion) return;
        setTimeout(() => {
            flash.classList.remove('flash');
            void flash.offsetWidth;
            flash.classList.add('flash');
            scheduleLightning();
        }, 7000 + Math.random() * 6000);
    }
    scheduleLightning();

    if (heroSection && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            heroSection.style.setProperty('--px', px.toFixed(3));
            heroSection.style.setProperty('--py', py.toFixed(3));
        }, { passive: true });
        heroSection.addEventListener('mouseleave', () => {
            heroSection.style.setProperty('--px', '0');
            heroSection.style.setProperty('--py', '0');
        });
    }

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

    // 4. Leaflet Flood Map — waterways, reservoirs, marsh & flood hotspots
    let chennaiMap = null;
    let mapInitialized = false;
    let animTimer = null;
    const animatedWave = { marker: null, idx: 0 };

    // Approximate course of the Adyar River: Chembarambakkam → Bay of Bengal
    const adyarPath = [
        [13.0445, 80.0388],
        [13.0475, 80.0931],
        [13.0330, 80.1352],
        [13.0210, 80.1795],
        [13.0105, 80.2012],
        [13.0125, 80.2231],
        [13.0158, 80.2413],
        [13.0062, 80.2576],
        [13.0006, 80.2684]
    ];

    // Approximate course of the Cooum River: west of the city → Marina mouth
    const cooumPath = [
        [13.1002, 79.9851],
        [13.0905, 80.1204],
        [13.0832, 80.1899],
        [13.0790, 80.2248],
        [13.0758, 80.2553],
        [13.0643, 80.2867]
    ];

    // Approximate north–south alignment of the Buckingham Canal
    const canalPath = [
        [13.2203, 80.3201],
        [13.1602, 80.3002],
        [13.1148, 80.2781],
        [13.0722, 80.2718],
        [13.0298, 80.2642],
        [12.9988, 80.2621],
        [12.9597, 80.2503],
        [12.9204, 80.2452]
    ];

    const reservoirs = [
        { coords: [13.0439, 80.0388], name: 'Chembarambakkam Reservoir', note: '<strong>The trigger</strong> — outflow jumped from ~900 to ~29,000 cusecs into the Adyar on the night of 1 December 2015' },
        { coords: [13.1698, 80.1852], name: 'Puzhal (Red Hills) Lake', note: 'Major drinking-water reservoir for North Chennai; stood near full after successive rain spells' },
        { coords: [13.3976, 79.8483], name: 'Poondi Reservoir', note: 'Head of the city\'s drinking-water chain on the Kosasthalaiyar' },
        { coords: [13.2302, 80.1296], name: 'Cholavaram Lake', note: 'Mid-way storage in the Poondi–Red Hills water supply system' },
        { coords: [12.9748, 80.2201], name: 'Velachery Lake', note: 'One of the surviving lakebeds in the southern suburbs — its fringes flooded repeatedly in 2015' }
    ];

    // Pallikaranai Marsh — approximate outline of the remnant wetland
    const pallikaranaiPolygon = [
        [12.9502, 80.2296],
        [12.9455, 80.2601],
        [12.9248, 80.2622],
        [12.9048, 80.2452],
        [12.9102, 80.2251],
        [12.9351, 80.2183]
    ];

    const floodHotspots = [
        { coords: [12.9962, 80.0931], name: 'Mudichur', note: 'Submerged within hours of the Chembarambakkam release; rooftop rescues by boat' },
        { coords: [13.0171, 80.1781], name: 'Manapakkam & MIOT Hospital belt', note: 'Adyar backwaters surged through; hospital backup power failed with fatal consequences' },
        { coords: [13.0352, 80.2119], name: 'Jafferkhanpet & Ashok Nagar', note: 'Low-lying Adyar-adjacent blocks flooded overnight while residents slept' },
        { coords: [13.0123, 80.2229], name: 'Saidapet', note: 'Riverside neighbourhood beside the swollen Adyar; among the first to go under' },
        { coords: [13.0159, 80.2412], name: 'Kotturpuram', note: 'Premium riverside area inundated as the Adyar spilled across its banks' },
        { coords: [12.9789, 80.2209], name: 'Velachery', note: 'Built over lakebeds and marsh fringes — cut off for days even after rains eased' },
        { coords: [12.9621, 80.1992], name: 'Madipakkam', note: 'Former paddy and lake land turned into an inland sea during the deluge' },
        { coords: [12.9009, 80.2271], name: 'Sholinganallur (IT Corridor)', note: 'IT-belt offices and homes stranded by Pallikaranai fringe flooding' },
        { coords: [12.8861, 80.0619], name: 'Guduvancheri', note: 'Corridor suburb along the flooded GST Road axis; trains and roads severed' },
        { coords: [13.0582, 80.2382], name: 'Vyasarpadi & Kodungaiyur', note: 'North Chennai lowlands along the Buckingham Canal flooded repeatedly through November' }
    ];

    const reliefHubs = [
        { coords: [12.9941, 80.1709], name: 'Chennai International Airport', note: 'Shut ~3 days as runways went under; ~3,500 passengers stranded before evacuation' },
        { coords: [13.0827, 80.2707], name: 'Chennai City Centre', note: 'Power cut as a safety measure on 2 December; ATMs, mobile networks down; volunteers ran rescue networks' }
    ];

    function initMap() {
        if (!window.L) return;
        const mapEl = document.getElementById('chennai-map');
        if (!mapEl || mapEl._leaflet_id) return;

        chennaiMap = L.map('chennai-map', { scrollWheelZoom: false }).setView([13.02, 80.15], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(chennaiMap);

        // Adyar — the flood wave path (dashed blue)
        L.polyline(adyarPath, {
            color: '#2563eb',
            weight: 5,
            opacity: 0.85,
            dashArray: '8 10'
        }).addTo(chennaiMap)
          .bindPopup('<strong>Adyar River</strong><br>Carried the ~29,000-cusec Chembarambakkam release on 1 Dec night<br><em>Silted and encroached — capacity far below design</em>');

        // Cooum
        L.polyline(cooumPath, {
            color: '#ea580c',
            weight: 4,
            opacity: 0.8
        }).addTo(chennaiMap)
          .bindPopup('<strong>Cooum River</strong><br>Flooded central Chennai pockets through November<br><em>Heavily silted and polluted city-centre river</em>');

        // Buckingham Canal
        L.polyline(canalPath, {
            color: '#7c3aed',
            weight: 3,
            opacity: 0.7,
            dashArray: '4 7'
        }).addTo(chennaiMap)
          .bindPopup('<strong>Buckingham Canal (approx.)</strong><br>The choked north–south relief valve of the city\'s drainage');

        // Pallikaranai Marsh polygon
        L.polygon(pallikaranaiPolygon, {
            color: '#16a34a',
            weight: 2,
            fillColor: '#16a34a',
            fillOpacity: 0.25
        }).addTo(chennaiMap)
          .bindPopup('<strong>Pallikaranai Marsh</strong><br>Chennai\'s largest natural flood sink — reduced to a fraction of its original extent by dumping and construction');

        // Reservoirs / lakes
        reservoirs.forEach(site => {
            L.circleMarker(site.coords, {
                radius: 9,
                color: '#ffffff',
                weight: 2,
                fillColor: '#0891b2',
                fillOpacity: 0.95
            }).addTo(chennaiMap)
              .bindPopup(`<strong>${site.name}</strong><br>${site.note}`);
        });

        // Flood hotspots
        floodHotspots.forEach(site => {
            L.circleMarker(site.coords, {
                radius: 7,
                color: '#ffffff',
                weight: 1.5,
                fillColor: '#dc2626',
                fillOpacity: 0.92
            }).addTo(chennaiMap)
              .bindPopup(`<strong>${site.name}</strong><br>${site.note}`);
        });

        // Airport / relief hubs
        reliefHubs.forEach(site => {
            L.marker(site.coords).addTo(chennaiMap)
                .bindPopup(`<strong>${site.name}</strong><br>${site.note}`);
        });

        mapInitialized = true;
    }

    function stopAnimation() {
        if (animTimer) {
            clearInterval(animTimer);
            animTimer = null;
        }
        if (animatedWave.marker && chennaiMap) {
            chennaiMap.removeLayer(animatedWave.marker);
            animatedWave.marker = null;
        }
        animatedWave.idx = 0;
    }

    function animateFloodWave() {
        if (!chennaiMap) return;
        stopAnimation();
        animatedWave.idx = 0;
        animatedWave.marker = L.circleMarker(adyarPath[0], {
            radius: 11,
            color: '#fbbf24',
            weight: 3,
            fillColor: '#2563eb',
            fillOpacity: 0.9
        }).addTo(chennaiMap).bindPopup('<strong>~29,000 cusecs released from Chembarambakkam…</strong>').openPopup();

        animTimer = setInterval(() => {
            animatedWave.idx += 1;
            if (animatedWave.idx >= adyarPath.length) {
                stopAnimation();
                return;
            }
            const p = adyarPath[animatedWave.idx];
            animatedWave.marker.setLatLng(p);
            animatedWave.marker.bindPopup(
                `<strong>Flood wave travelling down the Adyar</strong><br>Reached ${p[0].toFixed(3)}°N, ${p[1].toFixed(3)}°E within hours of the release`
            ).openPopup();
        }, 1100);
    }

    function setViewButtons(activeBtn) {
        document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    }

    const btnOverview = document.getElementById('btn-city-overview');
    const btnAdyar = document.getElementById('btn-adyar');
    const btnWaterBodies = document.getElementById('btn-water-bodies');
    const btnAnimate = document.getElementById('btn-animate');

    if (btnOverview) {
        btnOverview.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnOverview);
            if (chennaiMap) chennaiMap.setView([13.02, 80.15], 10);
        });
    }

    if (btnAdyar) {
        btnAdyar.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnAdyar);
            if (chennaiMap) chennaiMap.setView([13.02, 80.14], 12);
        });
    }

    if (btnWaterBodies) {
        btnWaterBodies.addEventListener('click', () => {
            stopAnimation();
            setViewButtons(btnWaterBodies);
            if (chennaiMap) chennaiMap.setView([12.98, 80.21], 11);
        });
    }

    if (btnAnimate) {
        btnAnimate.addEventListener('click', () => {
            setViewButtons(btnAnimate);
            animateFloodWave();
        });
    }

    if (document.getElementById('chennai-map')) {
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
                modalTitle.textContent = title ? title.textContent : 'Chennai Floods Visual';
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
