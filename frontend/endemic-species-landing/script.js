/* Endemic Species Landing Page Logic */
const speciesData = [
    { id: 'lion-tailed-macaque', name: 'Lion-tailed Macaque', category: 'mammals', habitat: 'western-ghats', desc: 'An Old World monkey endemic to the Western Ghats. Characterized by its silver-white mane and long, tufted tail.', img: 'https://placehold.co/400x300/10b981/fff' },
    { id: 'nilgiri-tahr', name: 'Nilgiri Tahr', category: 'mammals', habitat: 'western-ghats', desc: 'A stocky goat-antelope found in the Nilgiri Hills and the southern Western Ghats. State animal of Tamil Nadu.', img: 'https://placehold.co/400x300/10b981/fff' },
    { id: 'purple-frog', name: 'Purple Frog', category: 'amphibians', habitat: 'western-ghats', desc: 'A unique frog species that spends most of its life underground, emerging only for a few weeks to breed.', img: 'https://placehold.co/400x300/10b981/fff' },
    { id: 'neelakurinji', name: 'Neelakurinji', category: 'plants', habitat: 'western-ghats', desc: 'A flower that blooms once every 12 years, turning the hills of the Western Ghats into a sea of blue.', img: 'https://placehold.co/400x300/10b981/fff' },
    { id: 'white-bellied-blue-robin', name: 'White-bellied Blue Robin', category: 'birds', habitat: 'western-ghats', desc: 'A rare endemic bird of the Western Ghats.', img: 'https://placehold.co/400x300/3b82f6/fff', link: '../white-bellied-blue-robin-explorer/index.html' },
    { id: 'travancore-wolf-snake', name: 'Travancore Wolf Snake', category: 'reptiles', habitat: 'western-ghats', desc: 'An endemic non-venomous snake found in the Western Ghats.', img: 'https://placehold.co/400x300/8b5cf6/fff', link: '../travancore-wolf-snake-explorer/index.html' },
    { id: 'andaman-shrew', name: 'Andaman White-toothed Shrew', category: 'mammals', habitat: 'andaman-nicobar', desc: 'A highly elusive endemic mammal of the Andaman Islands.', img: 'https://placehold.co/400x300/f59e0b/fff', link: '../andaman-white-toothed-shrew-explorer/index.html' },
    { id: 'nilgiri-laughingthrush', name: 'Nilgiri Laughingthrush', category: 'birds', habitat: 'western-ghats', desc: 'An endemic bird species of the Nilgiri Hills known for its restricted range.', img: 'https://placehold.co/400x300/ec4899/fff', link: '../nilgiri-laughingthrush-explorer/index.html' },
];

let currentCategory = 'all';
let currentHabitat = 'all';
let searchTerm = '';

function init() {
    renderStats();
    renderGrid();
    attachEventListeners();
    setupScrollAnimations();
    setupJourneyIntegration();
}

function renderStats() {
    const counts = { mammals: 0, birds: 0, reptiles: 0, amphibians: 0, plants: 0, fish: 0 };
    speciesData.forEach(s => { if (counts[s.category] !== undefined) counts[s.category]++; });
    document.getElementById('stat-mammals').textContent = counts.mammals;
    document.getElementById('stat-birds').textContent = counts.birds;
    document.getElementById('stat-reptiles').textContent = counts.reptiles;
    document.getElementById('stat-amphibians').textContent = counts.amphibians;
    document.getElementById('stat-plants').textContent = counts.plants;
}

function renderGrid() {
    const grid = document.getElementById('species-grid');
    grid.innerHTML = '';
    const filtered = speciesData.filter(s => {
        const matchCat = currentCategory === 'all' || s.category === currentCategory;
        const matchHab = currentHabitat === 'all' || s.habitat === currentHabitat;
        const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCat && matchHab && matchSearch;
    });
    filtered.forEach(s => {
        const card = document.createElement('div');
        card.className = 'species-card animate-on-scroll';
        card.onclick = () => { if (s.link) window.location.href = s.link; };
        card.innerHTML = `
            <div class="card-img" style="background-image: url('${s.img}')"></div>
            <div class="card-content">
                <h3>${s.name}</h3>
                <p>${s.desc}</p>
                <div class="card-tags">
                    <span class="tag">${s.category}</span>
                    <span class="tag">${s.habitat.replace('-', ' ')}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    document.querySelectorAll('.species-card').forEach(el => observer.observe(el));
}

function attachEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderGrid();
        });
    });
    document.getElementById('habitat-filter').addEventListener('change', (e) => {
        currentHabitat = e.target.value;
        renderGrid();
    });
    document.getElementById('species-search').addEventListener('input', debounce((e) => {
        searchTerm = e.target.value;
        renderGrid();
    }, 300));
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        document.getElementById('theme-toggle').textContent = isLight ? '☀️' : '🌙';
    });
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-toggle').textContent = '☀️';
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

let observer;
function setupScrollAnimations() {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function setupJourneyIntegration() {
    if (window.Journey && window.Journey.registerSearchItems) {
        const items = speciesData.map(s => ({
            id: 'endemic-' + s.id,
            title: s.name,
            description: s.desc,
            link: s.link || 'frontend/endemic-species-landing/index.html'
        }));
        window.Journey.registerSearchItems('frontend/endemic-species-landing/index.html', items);
    }
}

document.addEventListener('DOMContentLoaded', init);
