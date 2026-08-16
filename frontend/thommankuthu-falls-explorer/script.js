/**
 * Thommankuthu Falls Explorer - Interactive Script
 * Handles cascade explorer, section navigation, map interaction, scroll reveal, and Journey integration.
 */

(function () {
    'use strict';

    /* ------------------------------------------------------- Cascade Data */
    const cascadeData = {
        7: {
            icon: '💧',
            title: 'Upper Cascade (Step 7)',
            subtitle: 'The highest point of the series',
            description: [
                'The uppermost cascade sits deep within evergreen forest, where sunlight filters through the dense canopy. Water emerges from a narrow rock fissure, creating a powerful jet that plunges 15 metres into a deep emerald pool below.',
                'This step is the least accessible and most pristine — reaching it requires a challenging trek through dense forest. The pool is cold and deep, surrounded by moss-covered boulders and hanging ferns.'
            ],
            drop: '15 metres', access: 'Difficult', swimming: 'Not recommended'
        },
        6: {
            icon: '🌊',
            title: 'Rapid Cascade (Step 6)',
            subtitle: 'Powerful white-water section',
            description: [
                'Below the upper cascade, the river accelerates through a narrow rocky channel creating turbulent rapids. The water churns white as it hits successive rock shelves, producing a continuous roar audible from afar.',
                'This section is photogenic but dangerous — strong undercurrents make swimming extremely hazardous. Best viewed from the elevated trail viewpoint that provides a safe panoramic view.'
            ],
            drop: '12 metres', access: 'Moderate', swimming: 'Prohibited'
        },
        5: {
            icon: '🏞️',
            title: 'Chute Cascade (Step 5)',
            subtitle: 'Smooth rock water slide',
            description: [
                'The river flows over a smooth inclined rock face, creating a natural water slide approximately 10 metres long. This geological feature was formed by millennia of water polishing the laterite rock.',
                'The chute is one of the most photographed sections due to its elegant flow pattern. The rock surface is slippery — approach with care and only during low-flow periods.'
            ],
            drop: '8 metres', access: 'Moderate', swimming: 'With caution'
        },
        4: {
            icon: '💎',
            title: 'Pool Cascade (Step 4)',
            subtitle: 'The emerald swimming hole',
            description: [
                'A wide, deep pool forms at the base of the chute, surrounded by smooth boulders. The water is crystal clear and emerald-green due to the depth and mineral content. This is the most popular swimming spot.',
                'The pool reaches depths of 4-5 metres in the centre. Rocks provide natural seating areas. Popular with locals for bathing, especially during post-monsoon months when water clarity is highest.'
            ],
            drop: '5 metres', access: 'Easy', swimming: 'Popular spot'
        },
        3: {
            icon: '⬇️',
            title: 'Drop Cascade (Step 3)',
            subtitle: 'Classic vertical waterfall',
            description: [
                'A vertical drop of approximately 8 metres where the river plunges over a laterite cliff. This is the most "traditional" waterfall appearance in the series and features a curtain of water during monsoon.',
                'A rocky ledge behind the waterfall creates a natural cave where visitors can stand and watch the water cascade over them — a memorable experience during low-flow periods.'
            ],
            drop: '8 metres', access: 'Moderate', swimming: 'With caution'
        },
        2: {
            icon: '🏊',
            title: 'Basin Cascade (Step 2)',
            subtitle: 'Wide natural amphitheatre',
            description: [
                'The river spreads into a wide, shallow basin flanked by moss-covered cliffs. The water cascades gently across the basin floor, creating a series of small riffles and quiet eddies ideal for wading.',
                'This is the family-friendly section with gentle water and easy access. Picnic spots are available on the surrounding boulders. Safe for children under adult supervision.'
            ],
            drop: '3 metres', access: 'Easy', swimming: 'Safe for families'
        },
        1: {
            icon: '🌿',
            title: 'Lower Cascade (Step 1)',
            subtitle: 'The accessible entrance cascade',
            description: [
                'The lowest and most accessible cascade sits near the trail entrance. A gentle 4-metre drop into a shallow pool marks the official start of the Thommankuthu experience. Easy to reach for all visitors.',
                'This section serves as the introduction to the cascade series. A small viewing platform provides comfortable seating. Many visitors photograph this cascade as their "first impression" before trekking upward.'
            ],
            drop: '4 metres', access: 'Very easy', swimming: 'Safe'
        }
    };

    /* ------------------------------------------------------- Cascade Explorer */
    function initCascadeExplorer() {
        const steps = document.querySelectorAll('.cascade-step');
        const titleEl = document.getElementById('cascade-title');
        const subtitleEl = document.getElementById('cascade-subtitle');
        const descEl = document.getElementById('cascade-description');
        const iconEl = document.getElementById('cascade-icon');
        const metaEl = document.getElementById('cascade-meta');

        if (!titleEl) return;

        const setActive = (step) => {
            const num = step.dataset.step;
            const data = cascadeData[num];
            if (!data) return;

            steps.forEach(s => {
                s.classList.remove('active');
                s.setAttribute('aria-pressed', 'false');
            });
            step.classList.add('active');
            step.setAttribute('aria-pressed', 'true');

            iconEl.textContent = data.icon;
            titleEl.textContent = data.title;
            subtitleEl.textContent = data.subtitle;
            descEl.innerHTML = data.description.map(p => `<p>${p}</p>`).join('');
            metaEl.innerHTML = `
                <div class="meta-item"><strong>Drop:</strong> <span>${data.drop}</span></div>
                <div class="meta-item"><strong>Access:</strong> <span>${data.access}</span></div>
                <div class="meta-item"><strong>Swimming:</strong> <span>${data.swimming}</span></div>
            `;
        };

        steps.forEach(step => {
            const handler = () => setActive(step);
            step.addEventListener('click', handler);
            step.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handler();
                }
            });
        });
    }

    /* ------------------------------------------------------- Map Data */
    const mapPoints = {
        thodupuzha: {
            title: 'Thodupuzha Town',
            desc: 'The nearest major town to Thommankuthu Falls, located 16 km away. Gateway to Idukki district with bus connections to Kochi and other Kerala cities. Good base for accommodation and supplies.'
        },
        thommankuthu: {
            title: 'Thommankuthu Falls',
            desc: 'The seven-step cascade on the Keezharkuthu River, featuring 300 metres of total drop over 2.5 km. Each step has its own character — from roaring rapids to tranquil swimming pools.'
        },
        idukki: {
            title: 'Idukki Arch Dam',
            desc: 'Asia\'s first arch dam and India\'s tallest at 168 metres. Built between Kuravan and Kurathi mountains, creating a spectacular reservoir. Offers boating and scenic viewpoints.'
        },
        munnar: {
            title: 'Munnar Hill Station',
            desc: 'Famous tea-growing hill station at 1,600 metres elevation. Known for rolling tea estates, Eravikulam National Park (Nilgiri Tahr habitat), and pleasant climate. Popular weekend destination.'
        },
        keezharkuthu: {
            title: 'Keezharkuthu Village',
            desc: 'Small village near the falls that gives the river its name. Traditional Kerala village with paddy fields, coconut groves, and local temples. Offers authentic rural Kerala experience.'
        }
    };

    function initMap() {
        const markers = document.querySelectorAll('.map-marker');
        const titleEl = document.getElementById('map-info-title');
        const descEl = document.getElementById('map-info-desc');
        if (!titleEl || !descEl) return;

        markers.forEach(m => {
            const key = m.dataset.point;
            const update = () => {
                const data = mapPoints[key];
                if (data) { titleEl.textContent = data.title; descEl.textContent = data.desc; }
            };
            m.addEventListener('click', update);
            m.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); update(); }
            });
        });
    }

    /* ------------------------------------------------------- Section Navigation */
    function initSectionNav() {
        const navBar = document.getElementById('tm-section-nav');
        const navLinks = document.querySelectorAll('.tm-nav-link');
        if (!navBar) return;

        const sections = Array.from(navLinks).map(link => ({
            link,
            section: document.getElementById(link.getAttribute('href').replace('#', ''))
        })).filter(item => item.section);

        const setActive = (activeLink) => {
            navLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        };

        navLinks.forEach(link => link.addEventListener('click', () => setActive(link)));

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const match = navBar.querySelector(`[href="#${entry.target.id}"]`);
                    if (match) setActive(match);
                }
            });
        }, { rootMargin: '-40% 0px -50% 0px' });

        sections.forEach(item => observer.observe(item.section));
    }

    /* ------------------------------------------------------- Scroll Reveal */
    function initReveal() {
        const targets = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('visible'));
            return;
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        targets.forEach(el => observer.observe(el));
    }

    /* ------------------------------------------------------- Journey Integration */
    function initJourney() {
        if (!window.Journey) return;
        window.Journey.registerSearchItems(
            'frontend/thommankuthu-falls-explorer/index.html',
            [
                {
                    id: 'thommankuthu-main',
                    title: 'Thommankuthu Falls Explorer',
                    description: 'Explore Thommankuthu Falls in Kerala - a seven-step cascade in the Western Ghats featuring forest trails, natural pools, and pristine wilderness of Idukki district.',
                    link: 'frontend/thommankuthu-falls-explorer/index.html'
                },
                {
                    id: 'thommankuthu-cascade',
                    title: 'Thommankuthu Seven-Step Cascade',
                    description: 'Interactive explorer of the seven cascade steps - from upper rapids (15m drop) through chute, pool, drop, and basin sections to the accessible lower cascade.',
                    link: 'frontend/thommankuthu-falls-explorer/index.html#cascade'
                },
                {
                    id: 'thommankuthu-access',
                    title: 'Thommankuthu Trail & Access',
                    description: 'How to reach Thommankuthu Falls - 2.5km moderate trek from Thodupuzha side, 2-3 hour round trip, best visited post-monsoon (October-February).',
                    link: 'frontend/thommankuthu-falls-explorer/index.html#access'
                }
            ]
        );
    }

    /* ------------------------------------------------------- Initialize */
    document.addEventListener('DOMContentLoaded', () => {
        initCascadeExplorer();
        initMap();
        initSectionNav();
        initReveal();
        initJourney();
    });
})();
