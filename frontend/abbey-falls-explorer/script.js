(() => {
    const seasons = {
        monsoon: {
            label: 'JUL–SEP',
            title: 'Powerful, rain-fed flow',
            description:
                'The falls are most dramatic during and just after the southwest monsoon, when the Kaveri catchment is saturated and the broad cascade carries a heavy curtain of water.',
            flow: 'High flow',
            crowds: 'Popular',
            trail: 'Wet trail',
            level: 92
        },
        post: {
            label: 'OCT–DEC',
            title: 'Strong flow with clearer access',
            description:
                'Post-monsoon conditions can retain a strong cascade while the surrounding vegetation stays richly green. Early visits usually make the viewing route more comfortable.',
            flow: 'Strong flow',
            crowds: 'Popular',
            trail: 'Damp trail',
            level: 72
        },
        winter: {
            label: 'JAN–FEB',
            title: 'Calmer cascade, crisp greenery',
            description:
                'The falls typically settle from their monsoon peak. Cooler weather and greener plantation scenery make this a comfortable season for a short Coorg outing.',
            flow: 'Moderate flow',
            crowds: 'Moderate',
            trail: 'Comfortable',
            level: 48
        },
        summer: {
            label: 'MAR–MAY',
            title: 'Lean-season character',
            description:
                'Hotter, drier conditions can reduce the volume of the cascade. The site remains a scenic stop, but it is less representative of the waterfall at peak flow.',
            flow: 'Lower flow',
            crowds: 'Quieter',
            trail: 'Drier trail',
            level: 28
        }
    };
    const layers = {
        plantation: {
            eyebrow: 'PLANTATION EDGE',
            title: 'Coffee & spice estates',
            description:
                'The access route threads through private coffee plantations, with pepper vines and humid forest vegetation adding the layered green character associated with Coorg.',
            art: '🌿☕💧'
        },
        gorge: {
            eyebrow: 'ROCK & WATER',
            title: 'The gorge opens around the fall',
            description:
                'Water drops over a broad rocky face and gathers below, with the viewing bridge giving visitors a higher perspective over the gorge and cascade.',
            art: '🪨💧🌳'
        },
        river: {
            eyebrow: 'DOWNSTREAM',
            title: 'A Kaveri-connected landscape',
            description:
                'Abbey Falls belongs to the Kaveri river system. Follow the water story outward from the plantation gorge toward the wider Kodagu landscape.',
            art: '⛰️💧🌊'
        }
    };
    const places = {
        abbey: { name: 'Abbey Falls', lat: 12.4582, lng: 75.7169, zoom: 14 },
        raja: { name: "Raja's Seat", lat: 12.4211, lng: 75.7382, zoom: 14 },
        omkareshwara: { name: 'Omkareshwara Temple', lat: 12.4216, lng: 75.7398, zoom: 14 },
        nisargadhama: { name: 'Kaveri Nisargadhama', lat: 12.472, lng: 75.9587, zoom: 11 }
    };

    function updateSeason(key) {
        const data = seasons[key];
        if (!data) return;
        document.querySelectorAll('.season-btn').forEach(b => b.classList.toggle('active', b.dataset.season === key));
        document.getElementById('season-label').textContent = data.label;
        document.getElementById('season-title').textContent = data.title;
        document.getElementById('season-description').textContent = data.description;
        document.getElementById('season-flow').textContent = data.flow;
        document.getElementById('season-crowds').textContent = data.crowds;
        document.getElementById('season-trail').textContent = data.trail;
        document.getElementById('flow-level').style.height = `${data.level}%`;
    }
    function initSeasons() {
        document
            .querySelectorAll('.season-btn')
            .forEach(b => b.addEventListener('click', () => updateSeason(b.dataset.season)));
    }
    function initLandscape() {
        document.querySelectorAll('.landscape-tab').forEach(b =>
            b.addEventListener('click', () => {
                const d = layers[b.dataset.layer];
                document.querySelectorAll('.landscape-tab').forEach(x => x.classList.toggle('active', x === b));
                document.getElementById('landscape-eyebrow').textContent = d.eyebrow;
                document.getElementById('landscape-title').textContent = d.title;
                document.getElementById('landscape-description').textContent = d.description;
                document.getElementById('landscape-art').textContent = d.art;
            })
        );
    }
    function makeMap(id, center, zoom) {
        if (!window.L) return null;
        const map = L.map(id, { scrollWheelZoom: false }).setView(center, zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
        return map;
    }
    function initMaps() {
        const main = makeMap('abbey-map', [12.4582, 75.7169], 13);
        if (main) {
            L.marker([12.4582, 75.7169])
                .addTo(main)
                .bindPopup('<strong>Abbey Falls</strong><br>Kodagu, Karnataka')
                .openPopup();
            L.marker([12.4211, 75.7382]).addTo(main).bindPopup("Raja's Seat");
            L.marker([12.4216, 75.7398]).addTo(main).bindPopup('Omkareshwara Temple');
        }
        const nearby = makeMap('nearby-map', [12.4582, 75.7169], 11);
        if (!nearby) return;
        const markers = {};
        Object.entries(places).forEach(([key, p]) => {
            markers[key] = L.marker([p.lat, p.lng]).addTo(nearby).bindPopup(`<strong>${p.name}</strong>`);
        });
        document.querySelectorAll('.nearby-item').forEach(btn =>
            btn.addEventListener('click', () => {
                const p = places[btn.dataset.place];
                document.querySelectorAll('.nearby-item').forEach(x => x.classList.toggle('active', x === btn));
                nearby.setView([p.lat, p.lng], p.zoom);
                markers[btn.dataset.place].openPopup();
            })
        );
    }
    function initReveal() {
        const els = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            els.forEach(e => e.classList.add('visible'));
            return;
        }
        const obs = new IntersectionObserver(
            entries =>
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        obs.unobserve(e.target);
                    }
                }),
            { threshold: 0.08 }
        );
        els.forEach(e => obs.observe(e));
    }
    function initNav() {
        const links = [...document.querySelectorAll('.af-nav-link')];
        const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
        const obs = new IntersectionObserver(
            entries =>
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
                    }
                }),
            { rootMargin: '-35% 0px -55% 0px' }
        );
        sections.forEach(s => obs.observe(s));
    }
    document.addEventListener('DOMContentLoaded', () => {
        initSeasons();
        initLandscape();
        initMaps();
        initReveal();
        initNav();
    });
})();
