/* =========================================
   Natural Disasters & Hazards of India Explorer
   — Controller with animations
   Consumes window.DisastersData (see disasters-data.js)
   ========================================= */
(function () {
    'use strict';

    var DATA = (typeof window !== 'undefined' && window.DisastersData) || null;

    /* ===== Helpers ===== */
    function el(tag, cls, html) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        if (html) e.innerHTML = html;
        return e;
    }

    function findHazard(id) {
        if (!DATA) return null;
        return DATA.hazardTypes.find(function (h) { return h.id === id; }) || null;
    }

    function findState(id) {
        if (!DATA) return null;
        return DATA.states.find(function (s) { return s.id === id; }) || null;
    }

    /* ===== Header: scroll detection, mobile menu, active section ===== */
    var header = document.getElementById('nd-header');
    var mobileToggle = document.getElementById('nd-mobile-toggle');
    var mobileNav = document.getElementById('nd-mobile-nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            var open = this.classList.toggle('is-open');
            this.setAttribute('aria-expanded', open);
            mobileNav.classList.toggle('is-open', open);
            mobileNav.setAttribute('aria-hidden', !open);
        });
        mobileNav.querySelectorAll('.nd-mobile-link').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileToggle.classList.remove('is-open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileNav.classList.remove('is-open');
                mobileNav.setAttribute('aria-hidden', 'true');
            });
        });
    }

    /* Scroll class on header */
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
        var st = window.scrollY;
        header.classList.toggle('is-scrolled', st > 60);
        lastScroll = st;
    }, { passive: true });

    /* Active nav link on scroll */
    var navLinks = document.querySelectorAll('.nd-nav-link');
    var sectionIds = [];
    navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href && href.startsWith('#')) sectionIds.push(href.slice(1));
    });

    function updateActiveNav() {
        var scrollY = window.scrollY + 120;
        var current = '';
        sectionIds.forEach(function (id) {
            var sec = document.getElementById(id);
            if (sec && sec.offsetTop <= scrollY) current = id;
        });
        navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            link.classList.toggle('is-active', href === '#' + current);
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    /* Scroll to top */
    var scrollTopBtn = document.getElementById('nd-scroll-top-btn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* Smooth anchor scrolling for CTA buttons */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href').slice(1);
            var target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* CTA button hover glow tracking */
    document.querySelectorAll('.nd-cta-btn').forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
            var rect = this.getBoundingClientRect();
            this.style.setProperty('--x', ((e.clientX - rect.left) / rect.width * 100) + '%');
            this.style.setProperty('--y', ((e.clientY - rect.top) / rect.height * 100) + '%');
        });
    });

    /* ===== Hero Particles ===== */
    var particlesContainer = document.getElementById('nd-hero-particles');
    if (particlesContainer) {
        for (var i = 0; i < 25; i++) {
            var p = document.createElement('div');
            p.className = 'nd-particle';
            var size = Math.random() * 4 + 2;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDuration = (Math.random() * 8 + 6) + 's';
            p.style.animationDelay = (Math.random() * 10) + 's';
            particlesContainer.appendChild(p);
        }
    }

    /* ===== Hero Stats Counter Animation ===== */
    function animateCounter(el, target, duration) {
        var start = 0;
        var startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    var statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var statEls = entry.target.querySelectorAll('.nd-stat');
                statEls.forEach(function (stat, idx) {
                    var numEl = stat.querySelector('.nd-stat-number');
                    var count = parseInt(stat.getAttribute('data-count'), 10);
                    if (numEl && count) {
                        setTimeout(function () {
                            animateCounter(numEl, count, 1200);
                        }, idx * 150);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    var heroStats = document.querySelector('.nd-hero-stats');
    if (heroStats) statsObserver.observe(heroStats);

    /* ===== Section Scroll Reveal (IntersectionObserver) ===== */
    var revealSections = document.querySelectorAll('.anim-section');
    var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    revealSections.forEach(function (sec) { sectionObserver.observe(sec); });

    /* Footer reveal */
    var footer = document.querySelector('.nd-footer');
    if (footer) {
        var footerObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    footerObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        footerObs.observe(footer);
    }

    /* ===== Filter Buttons Ripple ===== */
    document.querySelectorAll('.nd-filter-btn, .nd-region-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var ripple = document.createElement('span');
            ripple.className = 'nd-ripple';
            var rect = this.getBoundingClientRect();
            var size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(function () { ripple.remove(); }, 600);
        });
    });

    /* ===== Populate Hazard Filter Buttons ===== */
    var filterGroup = document.querySelector('.nd-filter-group');
    if (DATA && filterGroup) {
        DATA.hazardTypes.forEach(function (h) {
            var btn = el('button', 'nd-filter-btn', '<i class="' + h.icon + '" aria-hidden="true"></i> ' + h.name);
            btn.type = 'button';
            btn.dataset.filter = h.id;
            btn.setAttribute('aria-pressed', 'false');
            btn.style.setProperty('--card-accent', h.color);
            filterGroup.appendChild(btn);
        });
    }

    /* ===== Interactive SVG Map ===== */
    var STATES_MAP = {
        'jammu-kashmir': { x: 225, y: 55, name: 'Jammu & Kashmir', color: '#f44336' },
        ladakh: { x: 260, y: 42, name: 'Ladakh', color: '#26c6da' },
        himachal: { x: 215, y: 80, name: 'Himachal Pradesh', color: '#8d6e63' },
        punjab: { x: 190, y: 92, name: 'Punjab', color: '#2196f3' },
        haryana: { x: 210, y: 110, name: 'Haryana', color: '#ff9800' },
        'uttarakhand': { x: 235, y: 88, name: 'Uttarakhand', color: '#8d6e63' },
        'uttar-pradesh': { x: 265, y: 120, name: 'Uttar Pradesh', color: '#2196f3' },
        rajasthan: { x: 160, y: 135, name: 'Rajasthan', color: '#ff9800' },
        bihar: { x: 305, y: 135, name: 'Bihar', color: '#2196f3' },
        sikkim: { x: 340, y: 96, name: 'Sikkim', color: '#26c6da' },
        arunachal: { x: 385, y: 78, name: 'Arunachal Pradesh', color: '#26c6da' },
        assam: { x: 375, y: 102, name: 'Assam', color: '#2196f3' },
        nagaland: { x: 405, y: 100, name: 'Nagaland', color: '#8d6e63' },
        manipur: { x: 405, y: 120, name: 'Manipur', color: '#8d6e63' },
        mizoram: { x: 395, y: 142, name: 'Mizoram', color: '#8d6e63' },
        tripura: { x: 378, y: 138, name: 'Tripura', color: '#2196f3' },
        meghalaya: { x: 365, y: 112, name: 'Meghalaya', color: '#2196f3' },
        'west-bengal': { x: 338, y: 148, name: 'West Bengal', color: '#0097a7' },
        jharkhand: { x: 328, y: 152, name: 'Jharkhand', color: '#2196f3' },
        odisha: { x: 330, y: 182, name: 'Odisha', color: '#0097a7' },
        chhattisgarh: { x: 298, y: 180, name: 'Chhattisgarh', color: '#4caf50' },
        'madhya-pradesh': { x: 240, y: 170, name: 'Madhya Pradesh', color: '#ff9800' },
        gujarat: { x: 145, y: 180, name: 'Gujarat', color: '#ff9800' },
        'maharashtra': { x: 195, y: 230, name: 'Maharashtra', color: '#2196f3' },
        goa: { x: 185, y: 260, name: 'Goa', color: '#8d6e63' },
        karnataka: { x: 210, y: 285, name: 'Karnataka', color: '#ff9800' },
        telangana: { x: 260, y: 255, name: 'Telangana', color: '#2196f3' },
        andhra: { x: 280, y: 280, name: 'Andhra Pradesh', color: '#0097a7' },
        tamil: { x: 250, y: 325, name: 'Tamil Nadu', color: '#0097a7' },
        kerala: { x: 210, y: 335, name: 'Kerala', color: '#2196f3' }
    };

    var mapContainer = document.getElementById('nd-india-map');
    var mapTooltip = document.getElementById('nd-map-tooltip');
    var stateDetail = document.getElementById('nd-state-detail');

    if (mapContainer) {
        var svgNS = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 480 400');
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', 'Interactive map of India showing hazard zones');

        var outline = document.createElementNS(svgNS, 'path');
        outline.setAttribute('d', 'M170,30 L300,20 L380,60 L420,80 L430,105 L420,140 L410,150 L420,165 L410,200 L400,210 L360,195 L340,210 L330,240 L310,260 L300,290 L280,310 L260,340 L240,360 L220,370 L200,360 L185,330 L170,310 L155,280 L145,250 L135,220 L125,190 L130,170 L140,150 L130,130 L120,110 L130,80 L145,60 L170,30Z');
        outline.setAttribute('fill', 'none');
        outline.setAttribute('stroke', '#30363d');
        outline.setAttribute('stroke-width', '1.5');
        svg.appendChild(outline);

        Object.keys(STATES_MAP).forEach(function (key) {
            var st = STATES_MAP[key];
            var risk = '';
            if (DATA) {
                var s = findState(key);
                if (s && s.hazards && s.hazards.length) {
                    var firstHazard = findHazard(s.hazards[0]);
                    risk = firstHazard ? firstHazard.name : (s.hazards[0] || '');
                }
            }
            var g = document.createElementNS(svgNS, 'g');
            g.setAttribute('class', 'nd-map-dot');
            g.setAttribute('tabindex', '0');
            g.setAttribute('role', 'button');
            g.setAttribute('aria-label', st.name + ' — dominant hazard: ' + (risk || 'Mixed'));
            g.dataset.state = key;

            var circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('cx', st.x);
            circle.setAttribute('cy', st.y);
            circle.setAttribute('r', '5');
            circle.setAttribute('fill', st.color);
            circle.setAttribute('stroke', '#0d1117');
            circle.setAttribute('stroke-width', '1.5');

            var label = document.createElementNS(svgNS, 'text');
            label.setAttribute('x', st.x + 8);
            label.setAttribute('y', st.y + 3);
            label.setAttribute('class', 'nd-map-label');
            label.textContent = st.name;

            g.appendChild(circle);
            g.appendChild(label);

            g.addEventListener('mouseenter', function () {
                mapTooltip.innerHTML = '<strong>' + st.name + '</strong><br><span style="color:' + st.color + '">' + (risk || 'Mixed hazards') + '</span>';
                mapTooltip.style.opacity = '1';
                mapTooltip.setAttribute('aria-hidden', 'false');
            });
            g.addEventListener('mousemove', function (e) {
                var wrap = mapContainer.closest('.nd-map-wrapper');
                if (!wrap) return;
                var rect = wrap.getBoundingClientRect();
                mapTooltip.style.left = (e.clientX - rect.left + 14) + 'px';
                mapTooltip.style.top = (e.clientY - rect.top - 10) + 'px';
            });
            g.addEventListener('mouseleave', function () {
                mapTooltip.style.opacity = '0';
                mapTooltip.setAttribute('aria-hidden', 'true');
            });

            function showStateDetail() {
                showStatePanel(key);
            }
            g.addEventListener('click', showStateDetail);
            g.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showStateDetail();
                }
            });

            svg.appendChild(g);
        });

        mapContainer.appendChild(svg);
    }

    /* Build legend */
    var legendEl = document.getElementById('nd-map-legend');
    if (legendEl && DATA) {
        var legendHtml = '<div class="nd-legend-title">Dominant Hazard</div>';
        DATA.hazardTypes.forEach(function (h) {
            legendHtml += '<div class="nd-legend-item"><span class="nd-legend-dot" style="color:' + h.color + ';background:' + h.color + '"></span>' + h.name + '</div>';
        });
        legendEl.innerHTML = legendHtml;
    }

    /* State detail panel */
    function showStatePanel(stateKey) {
        if (!DATA) return;
        var state = findState(stateKey);
        if (!state || !stateDetail) return;

        var summary = state.summary || ('Explore the natural hazard risks facing ' + state.name + ' across ' + state.hazards.length + ' hazard categories.');

        var html = '<button class="nd-state-panel-close" aria-label="Close panel"><i class="fa-solid fa-xmark"></i></button>';
        html += '<div class="nd-state-panel-name">' + state.name + '</div>';
        html += '<div class="nd-state-panel-meta">' + cap(state.region) + ' India &middot; ' + (state.type || 'State') + '</div>';
        html += '<div class="nd-state-panel-risk-title">Primary Hazard Risks</div>';
        html += '<div class="nd-state-risk-tags">';
        state.hazards.forEach(function (hid) {
            var hazard = findHazard(hid);
            if (hazard) {
                html += '<span class="nd-state-risk-tag" style="color:' + hazard.color + ';border-color:' + hazard.color + '"><i class="' + hazard.icon + '" aria-hidden="true"></i> ' + hazard.name + '</span>';
            }
        });
        html += '</div>';
        html += '<div class="nd-state-panel-summary">' + summary + '</div>';

        stateDetail.innerHTML = html;
        stateDetail.style.display = 'block';
        stateDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        stateDetail.querySelector('.nd-state-panel-close').addEventListener('click', function () {
            stateDetail.style.display = 'none';
        });
    }

    function cap(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /* ===== Hazard Cards ===== */
    var hazardsGrid = document.getElementById('nd-hazards-grid');
    if (hazardsGrid && DATA) {
        DATA.hazardTypes.forEach(function (h) {
            var card = el('div', 'nd-hazard-card', '');
            card.style.setProperty('--card-accent', h.color);
            card.setAttribute('role', 'listitem');

            var statesNames = (h.highRiskStates || []).slice(0, 6);
            var overview = h.description || (h.profile && h.profile.overview) || h.name;
            var typeLabel = h.riskLevel || 'Hazard';

            card.innerHTML =
                '<div class="nd-hazard-card-header">' +
                    '<div class="nd-hazard-icon"><i class="' + h.icon + '" aria-hidden="true"></i></div>' +
                    '<div><div class="nd-hazard-name">' + h.name + '</div>' +
                    '<div class="nd-hazard-tag">' + typeLabel + '</div></div>' +
                '</div>' +
                '<p class="nd-hazard-overview">' + overview + '</p>' +
                '<div class="nd-hazard-states-label">Key Risk Regions</div>' +
                '<div class="nd-hazard-states-list">' +
                    statesNames.map(function (n) { return '<span class="nd-hazard-state">' + n + '</span>'; }).join('') +
                '</div>';

            hazardsGrid.appendChild(card);
        });
    }

    /* ===== State Cards ===== */
    var statesGrid = document.getElementById('nd-states-grid');
    function renderStates(region) {
        if (!statesGrid || !DATA) return;
        statesGrid.innerHTML = '';
        var states = DATA.states;
        if (region !== 'all') {
            states = states.filter(function (s) { return s.region === region; });
        }
        states.forEach(function (s, i) {
            var card = el('div', 'nd-state-card', '');
            card.setAttribute('role', 'listitem');
            card.style.setProperty('--i', i);

            var riskChips = s.hazards.map(function (hid) {
                var h = findHazard(hid);
                if (!h) return '';
                return '<span class="nd-state-risk-chip" style="color:' + h.color + ';border-color:' + h.color + '">' + h.name + '</span>';
            }).join('');

            card.innerHTML =
                '<div class="nd-state-name">' + s.name + '</div>' +
                '<div class="nd-state-meta">' + cap(s.region) + ' India &middot; ' + (s.type || 'State') + '</div>' +
                '<div class="nd-state-risk-tags">' + riskChips + '</div>';

            card.addEventListener('click', function () { showStatePanel(s.id); });
            statesGrid.appendChild(card);
        });
    }

    renderStates('all');

    /* Region filter */
    var regionBtns = document.querySelectorAll('.nd-region-btn');
    regionBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            regionBtns.forEach(function (b) {
                b.classList.remove('is-active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('is-active');
            this.setAttribute('aria-pressed', 'true');
            renderStates(this.dataset.region);
        });
    });

    /* ===== Timeline ===== */
    var timelineContainer = document.getElementById('nd-timeline-container');
    var timelineFilter = document.getElementById('nd-timeline-filter');

    if (timelineContainer && DATA) {
        var disasters = DATA.historicalDisasters;

        /* Build decade filter */
        var decades = {};
        disasters.forEach(function (d) {
            var decade = d.decade || (Math.floor(parseInt(d.year, 10) / 10) * 10 + 's');
            decades[decade] = true;
        });

        var allBtn = el('button', 'nd-filter-btn is-active', 'All Events');
        allBtn.type = 'button';
        allBtn.dataset.decade = 'all';
        allBtn.setAttribute('aria-pressed', 'true');
        timelineFilter.appendChild(allBtn);

        Object.keys(decades).sort().forEach(function (dec) {
            var btn = el('button', 'nd-filter-btn', dec);
            btn.type = 'button';
            btn.dataset.decade = dec;
            btn.setAttribute('aria-pressed', 'false');
            timelineFilter.appendChild(btn);
        });

        function renderTimeline(decade) {
            timelineContainer.innerHTML = '';
            var filtered = disasters;
            if (decade !== 'all') {
                filtered = disasters.filter(function (d) {
                    return (d.decade || (Math.floor(parseInt(d.year, 10) / 10) * 10 + 's')) === decade;
                });
            }
            filtered.forEach(function (d, i) {
                var item = el('div', 'nd-timeline-item', '');
                item.style.setProperty('--i', i);

                var hazard = findHazard(d.hazardType);
                var color = hazard ? hazard.color : 'var(--nd-accent)';
                var kind = d.hazardType ? (d.hazardType.charAt(0).toUpperCase() + d.hazardType.slice(1).replace(/-/g, ' ')) : '';

                var linkHtml = d.link
                    ? '<a class="nd-timeline-link" href="' + d.link + '" target="_blank" rel="noopener noreferrer">View detailed profile <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>'
                    : '';

                item.innerHTML =
                    '<div class="nd-timeline-node" style="border-color:' + color + ';background:' + color + '"></div>' +
                    '<div class="nd-timeline-year">' + d.year + '</div>' +
                    '<div class="nd-timeline-name">' + d.title + '</div>' +
                    '<div class="nd-timeline-meta">' + d.location +
                    (kind ? ' &middot; ' + kind : '') +
                    (d.casualties ? ' &middot; ' + d.casualties : '') + '</div>' +
                    '<p class="nd-timeline-desc">' + d.description + '</p>' +
                    (d.significance ? '<p class="nd-timeline-significance"><strong>Significance:</strong> ' + d.significance + '</p>' : '') +
                    linkHtml;

                timelineContainer.appendChild(item);
            });
        }

        renderTimeline('all');

        timelineFilter.addEventListener('click', function (e) {
            var btn = e.target.closest('.nd-filter-btn');
            if (!btn) return;
            timelineFilter.querySelectorAll('.nd-filter-btn').forEach(function (b) {
                b.classList.remove('is-active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-pressed', 'true');
            renderTimeline(btn.dataset.decade);
        });
    }

    /* ===== Preparedness Cards ===== */
    var prepGrid = document.getElementById('nd-preparedness-grid');
    if (prepGrid && DATA) {
        DATA.preparedness.forEach(function (p) {
            var card = el('div', 'nd-prep-card', '');
            var hazard = findHazard(p.hazardId);
            if (hazard) card.style.setProperty('--card-accent', hazard.color);

            var tips = [];
            if (p.before && p.before.length) tips = tips.concat(p.before);
            if (p.during && p.during.length) tips = tips.concat(p.during);
            if (p.after && p.after.length) tips = tips.concat(p.after);

            card.innerHTML =
                '<div class="nd-prep-card-header">' +
                    '<div class="nd-prep-icon"><i class="' + (p.icon || (hazard ? hazard.icon : 'fa-solid fa-shield-halved')) + '" aria-hidden="true"></i></div>' +
                    '<div class="nd-prep-name">' + p.title + '</div>' +
                '</div>' +
                '<ul class="nd-prep-list">' +
                    tips.map(function (t) { return '<li>' + t + '</li>'; }).join('') +
                '</ul>';

            prepGrid.appendChild(card);
        });
    }

    /* ===== Profiles Cards ===== */
    var profilesGrid = document.getElementById('nd-profiles-grid');
    if (profilesGrid && DATA) {
        DATA.hazardTypes.forEach(function (h) {
            var card = el('div', 'nd-profile-card', '');
            card.style.setProperty('--card-accent', h.color);

            var regionsNames = (h.highRiskStates || []).slice(0, 8);
            var profile = h.profile || {};
            var overview = h.description || profile.overview || h.name;
            var mitigation = profile.mitigation || [];

            var linkHtml = h.link
                ? '<a class="nd-profile-cta" href="' + h.link + '" target="_blank" rel="noopener noreferrer">Explore in depth <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>'
                : '';

            card.innerHTML =
                '<div class="nd-profile-card-top">' +
                    '<div class="nd-profile-header">' +
                        '<div class="nd-profile-icon"><i class="' + h.icon + '" aria-hidden="true"></i></div>' +
                        '<div><div class="nd-profile-title">' + h.name + '</div>' +
                        '<div class="nd-profile-sub">' + (h.riskLevel || 'Natural Hazard') + '</div></div>' +
                    '</div>' +
                '</div>' +
                '<div class="nd-profile-card-body">' +
                    '<p class="nd-profile-text">' + overview + '</p>' +
                    (profile.caseStudy ? '<div class="nd-profile-section-title">Case Study</div><p class="nd-profile-text">' + profile.caseStudy + '</p>' : '') +
                    '<div class="nd-profile-section-title">High-Risk Regions</div>' +
                    '<div class="nd-profile-regions">' +
                        regionsNames.map(function (n) { return '<span class="nd-profile-region">' + n + '</span>'; }).join('') +
                    '</div>' +
                    (mitigation.length ? '<div class="nd-profile-section-title">Mitigation</div><ul class="nd-profile-mitigation">' + mitigation.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul>' : '') +
                    linkHtml +
                '</div>';

            profilesGrid.appendChild(card);
        });
    }

    /* ===== Search ===== */
    var searchInput = document.getElementById('nd-search-input');
    var searchClear = document.getElementById('nd-search-clear');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            var q = this.value.trim().toLowerCase();
            searchClear.style.display = q ? 'flex' : 'none';
            filterAll(q);
        });
    }

    if (searchClear) {
        searchClear.addEventListener('click', function () {
            searchInput.value = '';
            this.style.display = 'none';
            filterAll('');
        });
    }

    function filterAll(q) {
        document.querySelectorAll('.nd-hazard-card').forEach(function (card) {
            card.style.display = !q || card.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
        document.querySelectorAll('.nd-state-card').forEach(function (card) {
            card.style.display = !q || card.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
        document.querySelectorAll('.nd-prep-card').forEach(function (card) {
            card.style.display = !q || card.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
        document.querySelectorAll('.nd-profile-card').forEach(function (card) {
            card.style.display = !q || card.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    }

    /* ===== Hazard Filter Buttons ===== */
    var hazardFilterBtns = document.querySelectorAll('.nd-filter-group .nd-filter-btn');
    hazardFilterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            hazardFilterBtns.forEach(function (b) {
                b.classList.remove('is-active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('is-active');
            this.setAttribute('aria-pressed', 'true');

            var filter = this.dataset.filter;
            document.querySelectorAll('.nd-hazard-card').forEach(function (card, i) {
                var hazard = DATA && DATA.hazardTypes[i];
                card.style.display = (filter === 'all' || (hazard && hazard.id === filter)) ? '' : 'none';
            });
        });
    });

    /* ===== Sources ===== */
    var sourcesList = document.getElementById('nd-sources-list');
    if (sourcesList && DATA) {
        DATA.sources.forEach(function (src) {
            var li = el('li', '');
            if (src.url) {
                li.innerHTML = '<span class="nd-src-name">' + src.title + '</span>';
            } else {
                li.innerHTML = '<span class="nd-src-name">' + src.title + '</span>';
            }
            sourcesList.appendChild(li);
        });
    }

})();
