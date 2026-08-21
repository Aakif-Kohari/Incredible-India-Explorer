/**
 * Kolam Traditional Floor Art Interactive Studio Engine
 * Handles pattern switching, SVG mathematical path rendering,
 * drawing stroke animations, and dot/kaavi toggles.
 */

document.addEventListener('DOMContentLoaded', () => {
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

    // 3. Kolam Pattern Database & Geometry
    const patternData = {
        'brahma-mudi': {
            title: 'Brahma Mudi (The Endless Knot)',
            category: 'Category: Sikku Kolam (Continuous Loop) | Grid: 5×5 Dots',
            description: 'A mesmerizing continuous single loop drawn around a symmetric 5-dot matrix without breaking contact with the ground. It symbolizes eternity and the cosmic cycle of creation.',
            symmetry: 'Symmetry: 4-Fold Radial',
            occasion: 'Occasion: Daily Morning Ritual & Temple Sanctuaries',
            dots: [
                { cx: 80, cy: 80 }, { cx: 140, cy: 80 }, { cx: 200, cy: 80 }, { cx: 260, cy: 80 }, { cx: 320, cy: 80 },
                { cx: 80, cy: 140 }, { cx: 140, cy: 140 }, { cx: 200, cy: 140 }, { cx: 260, cy: 140 }, { cx: 320, cy: 140 },
                { cx: 80, cy: 200 }, { cx: 140, cy: 200 }, { cx: 200, cy: 200 }, { cx: 260, cy: 200 }, { cx: 320, cy: 200 },
                { cx: 80, cy: 260 }, { cx: 140, cy: 260 }, { cx: 200, cy: 260 }, { cx: 260, cy: 260 }, { cx: 320, cy: 260 },
                { cx: 80, cy: 320 }, { cx: 140, cy: 320 }, { cx: 200, cy: 320 }, { cx: 260, cy: 320 }, { cx: 320, cy: 320 }
            ],
            paths: [
                'M 200,50 C 130,50 80,100 80,200 C 80,300 130,350 200,350 C 270,350 320,300 320,200 C 320,100 270,50 200,50 Z',
                'M 140,140 Q 200,100 260,140 Q 300,200 260,260 Q 200,300 140,260 Q 100,200 140,140 Z',
                'M 200,100 L 260,200 L 200,300 L 140,200 Z'
            ],
            kaaviBorder: 'M 40,40 L 360,40 L 360,360 L 40,360 Z'
        },
        'lotus-kamalam': {
            title: 'Padma (8-Petal Sacred Lotus)',
            category: 'Category: Kambi / Kamalam Kolam | Grid: Hexagonal Radial',
            description: 'An iconic sacred geometry design representing the spiritual flowering of consciousness, purity, and welcoming Goddess Lakshmi into the household.',
            symmetry: 'Symmetry: 8-Fold Rotational',
            occasion: 'Occasion: Fridays, Varalakshmi Vratam & Navaratri',
            dots: [
                { cx: 200, cy: 200 },
                { cx: 200, cy: 120 }, { cx: 200, cy: 280 }, { cx: 120, cy: 200 }, { cx: 280, cy: 200 },
                { cx: 145, cy: 145 }, { cx: 255, cy: 145 }, { cx: 145, cy: 255 }, { cx: 255, cy: 255 }
            ],
            paths: [
                'M 200,120 Q 240,160 200,200 Q 160,160 200,120 Z',
                'M 200,200 Q 240,240 200,280 Q 160,240 200,200 Z',
                'M 120,200 Q 160,160 200,200 Q 160,240 120,200 Z',
                'M 200,200 Q 240,160 280,200 Q 240,240 200,200 Z',
                'M 145,145 Q 200,160 200,200 Q 160,200 145,145 Z',
                'M 255,145 Q 240,200 200,200 Q 200,160 255,145 Z',
                'M 145,255 Q 160,200 200,200 Q 200,240 145,255 Z',
                'M 255,255 Q 200,240 200,200 Q 240,200 255,255 Z',
                'M 200,70 Q 290,110 330,200 Q 290,290 200,330 Q 110,290 70,200 Q 110,110 200,70 Z'
            ],
            kaaviBorder: 'M 200,30 L 370,200 L 200,370 L 30,200 Z'
        },
        'diya-deepam': {
            title: 'Karthigai Deepam (Festival Lamp Grid)',
            category: 'Category: Festival Pulli Kolam | Grid: 7×7 Dot Matrix',
            description: 'Symbolizes the victory of light and divine wisdom over ignorance, customarily drawn on full moon evenings of Karthigai month with oil lamps placed upon the nodes.',
            symmetry: 'Symmetry: Bilateral & Diagonal',
            occasion: 'Occasion: Karthigai Deepam & Diwali',
            dots: [
                { cx: 100, cy: 100 }, { cx: 200, cy: 100 }, { cx: 300, cy: 100 },
                { cx: 100, cy: 200 }, { cx: 200, cy: 200 }, { cx: 300, cy: 200 },
                { cx: 100, cy: 300 }, { cx: 200, cy: 300 }, { cx: 300, cy: 300 }
            ],
            paths: [
                'M 150,250 Q 200,310 250,250 L 230,220 L 170,220 Z',
                'M 200,220 Q 220,160 200,120 Q 180,160 200,220 Z',
                'M 100,100 L 200,50 L 300,100 L 350,200 L 300,300 L 200,350 L 100,300 L 50,200 Z',
                'M 100,200 Q 150,150 200,200 Q 250,250 300,200'
            ],
            kaaviBorder: 'M 50,50 L 350,50 L 350,350 L 50,350 Z'
        },
        'pongal-ratham': {
            title: 'Sankranti Chariot (Ratham Kolam)',
            category: 'Category: Harvest Festival Ratham | Grid: Interlocking Square Grid',
            description: 'The chariot (Ratham) signifies the movement of the sun towards Uttarayana. Lines are drawn extending out into the street to symbolically guide the sun and prosperity directly into the home.',
            symmetry: 'Symmetry: Vertical Bilateral Axis',
            occasion: 'Occasion: Thai Pongal, Makar Sankranti & Rathasapthami',
            dots: [
                { cx: 120, cy: 120 }, { cx: 200, cy: 120 }, { cx: 280, cy: 120 },
                { cx: 120, cy: 200 }, { cx: 200, cy: 200 }, { cx: 280, cy: 200 },
                { cx: 120, cy: 280 }, { cx: 200, cy: 280 }, { cx: 280, cy: 280 }
            ],
            paths: [
                'M 200,60 L 270,140 L 130,140 Z',
                'M 130,140 L 270,140 L 270,260 L 130,260 Z',
                'M 110,280 A 30,30 0 1,0 170,280 A 30,30 0 1,0 110,280 Z',
                'M 230,280 A 30,30 0 1,0 290,280 A 30,30 0 1,0 230,280 Z',
                'M 200,260 L 200,360 L 220,380',
                'M 130,200 L 270,200'
            ],
            kaaviBorder: 'M 30,30 L 370,30 L 370,370 L 30,370 Z'
        }
    };

    let currentPatternKey = 'brahma-mudi';
    let showDots = true;
    let showKaavi = true;

    const svgCanvas = document.getElementById('kolam-canvas');
    const patternTabs = document.querySelectorAll('.pattern-tab');
    const metaTitle = document.getElementById('meta-title');
    const metaCategory = document.getElementById('meta-category');
    const metaDescription = document.getElementById('meta-description');
    const factSymmetry = document.getElementById('fact-symmetry');
    const factOccasion = document.getElementById('fact-occasion');

    const btnToggleDots = document.getElementById('btn-toggle-dots');
    const btnToggleKaavi = document.getElementById('btn-toggle-kaavi');
    const btnReplay = document.getElementById('btn-replay-animation');

    function renderKolam(patternKey, animate = true) {
        const data = patternData[patternKey];
        if (!data || !svgCanvas) return;

        svgCanvas.innerHTML = '';

        // 1. Kaavi Border
        if (data.kaaviBorder) {
            const kaaviPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            kaaviPath.setAttribute('d', data.kaaviBorder);
            kaaviPath.setAttribute('class', 'kolam-kaavi-border');
            kaaviPath.id = 'svg-kaavi-border';
            kaaviPath.style.opacity = showKaavi ? '0.85' : '0';
            svgCanvas.appendChild(kaaviPath);
        }

        // 2. Dots Layer
        const dotsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        dotsGroup.id = 'svg-dots-group';
        dotsGroup.style.opacity = showDots ? '1' : '0';

        data.dots.forEach(dot => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', dot.cx);
            circle.setAttribute('cy', dot.cy);
            circle.setAttribute('r', '4');
            circle.setAttribute('class', 'kolam-dot');
            dotsGroup.appendChild(circle);
        });
        svgCanvas.appendChild(dotsGroup);

        // 3. Kolam Lines/Stroke Layer
        data.paths.forEach((pathStr, index) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pathStr);
            path.setAttribute('class', 'kolam-path');

            if (animate) {
                // Trigger CSS stroke animation
                const length = 1200;
                path.style.strokeDasharray = `${length}`;
                path.style.strokeDashoffset = `${length}`;
                path.style.transition = `stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.25}s`;
                setTimeout(() => {
                    path.style.strokeDashoffset = '0';
                }, 50);
            }

            svgCanvas.appendChild(path);
        });

        // 4. Update Metadata Card
        if (metaTitle) metaTitle.textContent = data.title;
        if (metaCategory) metaCategory.textContent = data.category;
        if (metaDescription) metaDescription.textContent = data.description;
        if (factSymmetry) factSymmetry.textContent = data.symmetry;
        if (factOccasion) factOccasion.textContent = data.occasion;
    }

    // Tab Switching
    patternTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            patternTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            currentPatternKey = tab.getAttribute('data-pattern');
            renderKolam(currentPatternKey, true);
        });
    });

    // Control Buttons
    if (btnToggleDots) {
        btnToggleDots.addEventListener('click', () => {
            showDots = !showDots;
            const dotsEl = document.getElementById('svg-dots-group');
            if (dotsEl) {
                dotsEl.style.opacity = showDots ? '1' : '0';
            }
            btnToggleDots.textContent = showDots ? 'Hide Dot Grid' : 'Show Dot Grid';
        });
    }

    if (btnToggleKaavi) {
        btnToggleKaavi.addEventListener('click', () => {
            showKaavi = !showKaavi;
            const kaaviEl = document.getElementById('svg-kaavi-border');
            if (kaaviEl) {
                kaaviEl.style.opacity = showKaavi ? '0.85' : '0';
            }
            btnToggleKaavi.textContent = showKaavi ? 'Hide Kaavi Border' : 'Show Kaavi Border';
        });
    }

    if (btnReplay) {
        btnReplay.addEventListener('click', () => {
            renderKolam(currentPatternKey, true);
        });
    }

    // Initial render
    renderKolam(currentPatternKey, true);
});
