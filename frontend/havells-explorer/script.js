const categories = [
    {
        id: 'switchgear',
        category: 'core',
        icon: '⚡',
        title: 'Switches & Switchgear',
        desc: 'Circuit protection, modular switches, distribution boards and related electrical infrastructure.'
    },
    {
        id: 'wires',
        category: 'core',
        icon: '🔌',
        title: 'Wires & Cables',
        desc: 'Domestic and industrial wires and cables form a foundational part of the electrical portfolio.'
    },
    {
        id: 'fans',
        category: 'home',
        icon: '🌀',
        title: 'Fans & Air Circulation',
        desc: 'Ceiling, pedestal, wall, exhaust and other fan formats, including energy-efficient designs.'
    },
    {
        id: 'water',
        category: 'home',
        icon: '💧',
        title: 'Water Heaters & Purifiers',
        desc: 'Water heating and purification products for everyday household use.'
    },
    {
        id: 'appliances',
        category: 'appliances',
        icon: '🍳',
        title: 'Kitchen & Small Appliances',
        desc: 'Appliances such as irons, kitchen devices, coolers and other small domestic products.'
    },
    {
        id: 'cooling',
        category: 'appliances',
        icon: '❄️',
        title: 'Air Conditioners & Consumer Durables',
        desc: 'Lloyd-led expansion into air conditioners and a wider consumer-durables portfolio.'
    },
    {
        id: 'lighting',
        category: 'lighting',
        icon: '💡',
        title: 'Consumer & Professional Lighting',
        desc: 'LED lamps, luminaires and lighting systems for domestic, commercial and industrial applications.'
    },
    {
        id: 'solar',
        category: 'smart',
        icon: '☀️',
        title: 'Solar & Energy Solutions',
        desc: 'Solar lighting and solar consumer/industrial solutions alongside energy-efficient products.'
    },
    {
        id: 'smart',
        category: 'smart',
        icon: '📱',
        title: 'Smart Controls & Connected Living',
        desc: 'Smart switches, regulators, sensors and connected electrical controls for modern homes.'
    }
];
const milestones = [
    {
        year: 1958,
        era: '1958-1989',
        title: 'Electrical trading begins',
        desc: 'Qimat Rai Gupta starts trading electrical goods in Delhi, building the commercial foundation for the future group.'
    },
    {
        year: 1971,
        era: '1958-1989',
        title: 'Havells brand acquired',
        desc: 'Gupta acquires the Havells brand and begins building a manufacturing-led electrical business around it.'
    },
    {
        year: 1976,
        era: '1958-1989',
        title: 'First manufacturing unit',
        desc: 'The first manufacturing unit is documented at Kirti Nagar, Delhi, marking the shift from trading toward production.'
    },
    {
        year: 1983,
        era: '1958-1989',
        title: 'Havells India incorporated',
        desc: 'Havells India Limited is incorporated, creating the corporate structure for subsequent expansion.'
    },
    {
        year: 1990,
        era: '1990-2009',
        title: 'Manufacturing and distribution scale',
        desc: 'Plants and distribution capabilities expand through the 1990s as the company competes with global electrical brands.'
    },
    {
        year: 2003,
        era: '1990-2009',
        title: 'Fans become a major category',
        desc: 'Havells enters fans, helping push the business further into consumer-facing electrical products.'
    },
    {
        year: 2007,
        era: '1990-2009',
        title: 'Sylvania acquisition',
        desc: 'The acquisition of European lighting company Sylvania expands the group’s international lighting footprint.'
    },
    {
        year: 2015,
        era: '2010-present',
        title: 'Promptec Renewable acquisition',
        desc: 'Havells acquires a majority stake in Promptec Renewable, strengthening its solar and energy-solutions presence.'
    },
    {
        year: 2020,
        era: '2010-present',
        title: 'Consumer ecosystem broadens',
        desc: 'The portfolio spans electrical infrastructure, lighting, fans, appliances, water solutions, cooling and smart products.'
    }
];
const plants = ['Haridwar', 'Baddi', 'Sahibabad', 'Faridabad', 'Alwar', 'Ghiloth', 'Neemrana'];
let activeCategory = 'all',
    activeEra = 'all';
function renderCategories() {
    const grid = document.getElementById('category-grid');
    if (!grid) return;
    const items = activeCategory === 'all' ? categories : categories.filter(x => x.category === activeCategory);
    grid.innerHTML = items
        .map(
            x =>
                `<article class="category-card animate-on-scroll" role="listitem"><span class="category-icon" aria-hidden="true">${x.icon}</span><span class="tag">${x.category}</span><h3>${x.title}</h3><p>${x.desc}</p></article>`
        )
        .join('');
}
function renderTimeline() {
    const list = document.getElementById('timeline-list');
    if (!list) return;
    const items = activeEra === 'all' ? milestones : milestones.filter(x => x.era === activeEra);
    list.innerHTML = items
        .map(
            x =>
                `<article class="timeline-item"><span class="timeline-dot" aria-hidden="true"></span><span class="timeline-year">${x.year}</span><h3>${x.title}</h3><p>${x.desc}</p></article>`
        )
        .join('');
}
function initPlants() {
    const grid = document.getElementById('plant-grid');
    if (!grid) return;
    grid.innerHTML = plants.map(p => `<span class="plant">${p}</span>`).join('');
}
function setup() {
    renderCategories();
    renderTimeline();
    initPlants();
    document.querySelectorAll('.category-btn').forEach(btn =>
        btn.addEventListener('click', () => {
            activeCategory = btn.dataset.category;
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.toggle('active', b === btn);
                b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
            });
            renderCategories();
        })
    );
    document.querySelectorAll('.timeline-btn').forEach(btn =>
        btn.addEventListener('click', () => {
            activeEra = btn.dataset.era;
            document.querySelectorAll('.timeline-btn').forEach(b => {
                b.classList.toggle('active', b === btn);
                b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
            });
            renderTimeline();
        })
    );
    const theme = document.getElementById('theme-toggle');
    theme?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        theme.textContent = document.body.classList.contains('dark-mode') ? '☀' : '◐';
    });
    const bookmark = document.getElementById('bookmark-btn');
    bookmark?.addEventListener('click', () => {
        bookmark.textContent = '✓ Saved to My Journey';
        bookmark.classList.add('saved');
        try {
            localStorage.setItem('havells-explorer-bookmarked', 'true');
        } catch (e) {}
    });
    if (localStorage.getItem('havells-explorer-bookmarked')) {
        bookmark.textContent = '✓ Saved to My Journey';
        bookmark.classList.add('saved');
    }
}
document.addEventListener('DOMContentLoaded', setup);
