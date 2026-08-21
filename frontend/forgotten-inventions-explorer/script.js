/* ==========================================================================
   India's Forgotten Inventions Explorer Logic
   Handles search, category filters, timeline rendering, and Journey integration.
   ========================================================================== */

/**
 * Comprehensive dataset of Indian Inventions.
 * Pre-populated with Pingala's Binary Concepts for parallel PR #1807.
 * @type {Array<Object>}
 */
const inventionsData = [
    { id: 'pingala-binary', name: "Pingala's Binary System", inventor: 'Pingala', year: '-200', category: 'mathematics', desc: 'The first known description of a binary numeral system, used for poetic meters in Chandas Shastra.', img: 'https://placehold.co/400x300/064e3b/fff', link: '../pingala-binary-concepts/index.html', featured: true },
    { id: 'sushruta-surgery', name: 'Plastic Surgery & Rhinoplasty', inventor: 'Sushruta', year: '-600', category: 'medicine', desc: 'Sushruta Samhita details over 300 surgical procedures and the use of 120 surgical instruments.', img: 'https://placehold.co/400x300/991b1b/fff', featured: true },
    { id: 'zinc-smelting', name: 'Zinc Smelting', inventor: 'Zawar Miners', year: '1200', category: 'metallurgy', desc: 'India was the first to smelt zinc on an industrial scale using the downward distillation technique.', img: 'https://placehold.co/400x300/475569/fff', featured: true },
    { id: 'stepwell', name: 'Stepwell Architecture (Vav)', inventor: 'Ancient Engineers', year: '550', category: 'architecture', desc: 'Ingenious water harvesting structures that served as community hubs and cool retreats in arid regions.', img: 'https://placehold.co/400x300/b45309/fff', featured: false },
    { id: 'chess', name: 'Chaturanga (Chess)', inventor: 'Gupta Empire', year: '500', category: 'games', desc: 'The precursor to modern chess, simulating ancient Indian military strategy with infantry, cavalry, and elephants.', img: 'https://placehold.co/400x300/1e3a8a/fff', featured: false },
    { id: 'cotton-cultivation', name: 'Cotton Cultivation & Weaving', inventor: 'Indus Valley', year: '-3000', category: 'textiles', desc: 'The first civilization to cultivate and weave cotton, exporting fine muslin to the ancient world.', img: 'https://placehold.co/400x300/15803d/fff', featured: false },
    { id: 'aryabhata-zero', name: 'Place Value System & Zero', inventor: 'Aryabhata / Brahmagupta', year: '499', category: 'mathematics', desc: 'The conceptualization of zero as a number and the decimal place-value system that revolutionized math.', img: 'https://placehold.co/400x300/064e3b/fff', featured: true },
    { id: 'seamless-globe', name: 'Seamless Celestial Globe', inventor: 'Ali Kashmiri', year: '1584', category: 'astronomy', desc: 'A metallurgical marvel cast in a single piece without any seams, considered impossible by modern foundries until rediscovered.', img: 'https://placehold.co/400x300/475569/fff', featured: false }
];

const timelineEras = [
    { era: '3000 BCE', desc: 'Indus Valley urban planning, cotton cultivation, and early metallurgy.' },
    { era: '600 BCE', desc: 'Sushruta pioneers surgery; early texts on astronomy and mathematics emerge.' },
    { era: '200 BCE', desc: 'Pingala documents binary patterns; Panini formalizes Sanskrit grammar.' },
    { era: '500 CE', desc: 'The Golden Age: Aryabhata calculates pi, invents place-value, and Chaturanga is born.' },
    { era: '1200 CE', desc: 'Zinc smelting reaches industrial scale in Rajasthan; stepwell architecture peaks.' },
    { era: '1600 CE', desc: 'Mughal era metallurgy produces seamless celestial globes and Wootz steel.' }
];

let currentCategory = 'all';
let searchTerm = '';

function init() {
    renderTimeline();
    renderInventions();
    attachEventListeners();
    setupThemeToggle();
    setupScrollAnimations();
}

function renderTimeline() {
    const scroller = document.getElementById('timeline-scroller');
    if (!scroller) return;
    scroller.innerHTML = timelineEras.map(t => `
        <div class="timeline-node">
            <div class="timeline-era">${t.era}</div>
            <div class="timeline-desc">${t.desc}</div>
        </div>
    `).join('');
}

function renderInventions() {
    const grid = document.getElementById('invention-grid');
    if (!grid) return;

    const filtered = inventionsData.filter(inv => {
        const matchCat = currentCategory === 'all' || inv.category === currentCategory;
        const matchSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.inventor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.desc.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No inventions found matching your criteria.</p>';
        return;
    }

    grid.innerHTML = filtered.map(inv => `
        <div class="invention-card animate-on-scroll" role="listitem" tabindex="0" ${inv.link ? `onclick="window.location.href='${inv.link}'"` : ''}>
            <div class="card-img" style="background-image: url('${inv.img}')">
                <span class="card-category">${inv.category}</span>
            </div>
            <div class="card-content">
                <h3>${inv.name}</h3>
                <div class="card-inventor">${inv.inventor}</div>
                <p>${inv.desc}</p>
                <div class="card-footer">
                    <span>Est. ${inv.year > 0 ? inv.year + ' CE' : Math.abs(inv.year) + ' BCE'}</span>
                    ${inv.featured ? '<span style="color: var(--accent); font-weight: 600;">⭐ Featured</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');

    if (observer) document.querySelectorAll('.invention-card').forEach(el => observer.observe(el));
}

function attachEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            currentCategory = btn.dataset.category;
            renderInventions();
        });
    });

    const searchInput = document.getElementById('invention-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            searchTerm = e.target.value;
            renderInventions();
        }, 300));
    }
}

function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggle.textContent = isLight ? '☀️' : '🌙';
    });
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        toggle.textContent = '☀️';
    }
}

let observer;
function setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

document.addEventListener('DOMContentLoaded', init);
