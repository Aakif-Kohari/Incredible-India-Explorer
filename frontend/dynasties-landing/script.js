/**
 * Dynasties of India Explorer Landing Page Logic
 * Handles search, filtering, dynamic card rendering, and smooth navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollTop();
    renderDynasties();
    initFilters();
});

/**
 * Ensure theme toggle works correctly with localStorage
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggle.textContent = isLight ? '☀️' : '🌙';
        });
    }
}

/**
 * Scroll to top button visibility and action
 */
function initScrollTop() {
    const btn = document.getElementById('btn-scroll-top');
    if (btn) {
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 400);
        });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/**
 * Historical data for Indian Dynasties
 * This acts as our local database for the landing page
 */
const dynastiesData = [
    {
        id: 'koppam',
        name: 'Battle of Koppam',
        region: 'deccan',
        period: 'medieval',
        religion: 'hinduism',
        capital: 'Koppam (Battlefield)',
        dates: '1050s CE',
        description: 'The fierce struggle for Deccan supremacy between the Cholas and the Western Chalukyas.',
        icon: '⚔️',
        link: '../battle-koppam/index.html'
    },
    {
        id: 'kakatiya',
        name: 'Kakatiya Dynasty',
        region: 'south',
        period: 'medieval',
        religion: 'hinduism',
        capital: 'Orugallu (Warangal)',
        dates: '1163 - 1323 CE',
        description: 'Renowned for architectural marvels like the Ramappa Temple and advanced irrigation systems in the Deccan.',
        icon: '🏛️',
        link: '../kakatiya-dynasty/index.html'
    },
    {
        id: 'eastern-ganga',
        name: 'Eastern Ganga Dynasty',
        region: 'east',
        period: 'medieval',
        religion: 'hinduism',
        capital: 'Kalingapatnam / Cuttack',
        dates: '1078 - 1434 CE',
        description: 'Master builders of Odisha, responsible for the Konark Sun Temple and the expansion of the Jagannath Temple.',
        icon: '☀️',
        link: '../eastern-ganga-dynasty/index.html'
    },
    {
        id: 'pala',
        name: 'Pala Dynasty',
        region: 'east',
        period: 'ancient',
        religion: 'buddhism',
        capital: 'Pataliputra / Gauda',
        dates: '750 - 1174 CE',
        description: 'Great patrons of Mahayana Buddhism, founders of universities like Vikramashila and Somapura Mahavihara.',
        icon: '☸️',
        link: '../pala-dynasty/index.html'
    },
    {
        id: 'chola',
        name: 'Chola Dynasty',
        region: 'south',
        period: 'medieval',
        religion: 'hinduism',
        capital: 'Thanjavur',
        dates: '848 - 1279 CE',
        description: 'A maritime empire that dominated the Indian Ocean, built the Brihadeeswarar Temple, and spread Indian culture to Southeast Asia.',
        icon: '⚓',
        link: '#'
    },
    {
        id: 'maurya',
        name: 'Maurya Empire',
        region: 'pan-india',
        period: 'ancient',
        religion: 'buddhism',
        capital: 'Pataliputra',
        dates: '322 - 185 BCE',
        description: 'The first pan-Indian empire, unified the subcontinent under Chandragupta and Ashoka, spreading Buddhism across Asia.',
        icon: '🦁',
        link: '#'
    },
    {
        id: 'gupta',
        name: 'Gupta Empire',
        region: 'north',
        period: 'ancient',
        religion: 'hinduism',
        capital: 'Pataliputra',
        dates: '320 - 550 CE',
        description: 'The Golden Age of India, marked by significant advancements in science, mathematics, astronomy, and classical art.',
        icon: '✨',
        link: '#'
    },
    {
        id: 'mughal',
        name: 'Mughal Empire',
        region: 'pan-india',
        period: 'early-modern',
        religion: 'islam',
        capital: 'Agra / Delhi',
        dates: '1526 - 1857 CE',
        description: 'Known for monumental architecture like the Taj Mahal, centralized administration, and cultural synthesis.',
        icon: '🕌',
        link: '#'
    },
    {
        id: 'maratha',
        name: 'Maratha Empire',
        region: 'west',
        period: 'early-modern',
        religion: 'hinduism',
        capital: 'Raigad / Pune',
        dates: '1674 - 1818 CE',
        description: 'Founded by Shivaji Maharaj, the Marathas challenged Mughal dominance and established a vast confederacy across India.',
        icon: '⚔️',
        link: '#'
    },
    {
        id: 'chalukya',
        name: 'Western Chalukya',
        region: 'deccan',
        period: 'medieval',
        religion: 'hinduism',
        capital: 'Kalyani',
        dates: '973 - 1189 CE',
        description: 'Patrons of Kannada and Sanskrit literature, known for the distinctive Vesara style of temple architecture.',
        icon: '🏰',
        link: '#'
    },
    {
        id: 'jodhpur-marwar',
        name: 'Kingdom of Jodhpur (Marwar)',
        region: 'west',
        period: 'medieval',
        religion: 'hinduism',
        capital: 'Jodhpur',
        dates: 'c. 1226 - 1949 CE',
        description: 'The Rathore Rajputs of Marwar built the mighty Mehrangarh Fort, fostered the Marwari trade network, and kept their desert kingdom unconquered for seven centuries.',
        icon: '🏰',
        link: '../Jodhpur-Marwar/JodhpurMarwar.html'
    },
    {
        id: 'vijayanagara',
        name: 'Vijayanagara Empire',
        region: 'south',
        period: 'medieval',
        religion: 'hinduism',
        capital: 'Hampi',
        dates: '1336 - 1646 CE',
        description: 'A wealthy and powerful empire that served as a bulwark against southern invasions, famous for the ruins of Hampi.',
        icon: '🐘',
        link: '#'
    }
];

/**
 * Render dynasty cards into the DOM based on current filters
 */
function renderDynasties() {
    const container = document.getElementById('dynasties-container');
    const countSpan = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');

    const searchTerm = document.getElementById('dynasty-search').value.toLowerCase();
    const regionFilter = document.getElementById('filter-region').value;
    const periodFilter = document.getElementById('filter-period').value;
    const religionFilter = document.getElementById('filter-religion').value;

    const filtered = dynastiesData.filter(d => {
        const matchSearch = d.name.toLowerCase().includes(searchTerm) ||
            d.capital.toLowerCase().includes(searchTerm) ||
            d.description.toLowerCase().includes(searchTerm);
        const matchRegion = regionFilter === 'all' || d.region === regionFilter;
        const matchPeriod = periodFilter === 'all' || d.period === periodFilter;
        const matchReligion = religionFilter === 'all' || d.religion === religionFilter;

        return matchSearch && matchRegion && matchPeriod && matchReligion;
    });

    if (filtered.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        countSpan.textContent = 'No dynasties found';
    } else {
        noResults.style.display = 'none';
        countSpan.textContent = `Showing ${filtered.length} dynasties`;

        container.innerHTML = filtered.map(d => `
            <div class="dynasty-card" onclick="window.location.href='${d.link}'">
                <div class="card-header">
                    <span class="card-region-badge">${d.region.replace('-', ' ')}</span>
                    <div class="card-icon">${d.icon}</div>
                </div>
                <div class="card-body">
                    <h3>${d.name}</h3>
                    <div class="card-period">${d.dates}</div>
                    <p class="card-description">${d.description}</p>
                    <div class="card-meta">
                        <span>🏛️ ${d.capital}</span>
                        <span>🛡️ ${d.religion}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Initialize event listeners for search and filter inputs
 */
function initFilters() {
    const inputs = ['dynasty-search', 'filter-region', 'filter-period', 'filter-religion'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', renderDynasties);
            el.addEventListener('change', renderDynasties);
        }
    });

    // Initial render
    renderDynasties();
}
