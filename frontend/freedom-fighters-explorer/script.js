/**
 * Freedom Fighters of India Explorer - JavaScript Module
 */

const FREEDOM_FIGHTERS_DATA = [
    {
        id: 'gandhi',
        name: 'Mahatma Gandhi',
        title: 'Father of the Nation',
        lifespan: '1869 – 1948',
        region: 'West',
        state: 'Gujarat',
        movement: 'Non-Violent',
        featured: true,
        bio: 'Mohandas Karamchand Gandhi led India\'s independence movement against British rule using nonviolent civil disobedience (Ahimsa and Satyagraha), inspiring civil rights movements globally.',
        contributions: 'Pioneered Satyagraha, led Dandi Salt March (1930), Quit India Movement (1942), unified millions across India.',
        quote: 'Be the change that you wish to see in the world.'
    },
    {
        id: 'netaji',
        name: 'Subhas Chandra Bose',
        title: 'Netaji',
        lifespan: '1897 – 1945',
        region: 'East',
        state: 'Odisha / Bengal',
        movement: 'INA',
        featured: true,
        bio: 'Netaji Subhas Chandra Bose established the Azad Hind Government and led the Indian National Army (INA) to fight British colonial rule militarily during WWII.',
        contributions: 'Formed Azad Hind Fauj (INA) and Rani of Jhansi Regiment; gave immortal slogans "Give me blood, and I shall give you freedom!" and "Jai Hind!".',
        quote: 'Give me blood, and I will give you freedom!'
    },
    {
        id: 'bhagat-singh',
        name: 'Bhagat Singh',
        title: 'Shaheed-e-Azam',
        lifespan: '1907 – 1931',
        region: 'North',
        state: 'Punjab',
        movement: 'Revolutionary',
        featured: true,
        bio: 'Bhagat Singh was a legendary revolutionary socialist whose martyrdom at age 23 galvanized youth across India to join the freedom movement.',
        contributions: 'Founded Naujawan Bharat Sabha, key leader of HSRA, popularized "Inquilab Zindabad!".',
        quote: 'They may kill me, but they cannot kill my ideas.'
    },
    {
        id: 'rani-lakshmibai',
        name: 'Rani Lakshmibai',
        title: 'Rani of Jhansi',
        lifespan: '1828 – 1858',
        region: 'Central',
        state: 'Uttar Pradesh / MP',
        movement: '1857 Revolt',
        featured: true,
        bio: 'Rani Lakshmibai was the courageous queen of Jhansi who became an eternal symbol of armed resistance during the 1857 Freedom Uprising.',
        contributions: 'Led forces against British siege at Jhansi and Gwalior, defying Lord Dalhousie\'s Doctrine of Lapse.',
        quote: 'I will not give up my Jhansi!'
    },
    {
        id: 'alluri-sitarama-raju',
        name: 'Alluri Sitarama Raju',
        title: 'Manyam Veerudu (Hero of the Jungles)',
        lifespan: '1897 – 1924',
        region: 'South',
        state: 'Andhra Pradesh',
        movement: 'Tribal',
        featured: false,
        bio: 'Alluri Sitarama Raju led the guerrilla Rampa Rebellion (1922-24) against British forest laws in the Eastern Ghats.',
        contributions: 'Organized tribal Adivasis, executed strategic police station raids, championed forest rights.',
        quote: 'We shall break the chains of foreign oppression in the hills and beyond.'
    },
    {
        id: 'birsa-munda',
        name: 'Birsa Munda',
        title: 'Dharti Aba (Father of the Earth)',
        lifespan: '1875 – 1900',
        region: 'East',
        state: 'Jharkhand',
        movement: 'Tribal',
        featured: false,
        bio: 'Birsa Munda spearheaded the tribal Ulgulan (Great Tumult) rebellion against British land grabbing and feudal exploitation.',
        contributions: 'Mobilized Munda tribal community, fought for indigenous rights, founded Birsaite faith.',
        quote: 'Let the kingdom of the Queen be ended and our kingdom be established.'
    },
    {
        id: 'sarojini-naidu',
        name: 'Sarojini Naidu',
        title: 'Nightingale of India',
        lifespan: '1879 – 1949',
        region: 'South',
        state: 'Telangana / AP',
        movement: 'Women Leaders',
        featured: false,
        bio: 'Sarojini Naidu was a renowned poet, freedom fighter, and the first Indian woman to serve as President of Indian National Congress.',
        contributions: 'Led Dharasana Salt Works protest, championed women\'s suffrage and civil rights across India.',
        quote: 'A country\'s greatness lies in its undying ideals of love and sacrifice.'
    },
    {
        id: 'matangini-hazra',
        name: 'Matangini Hazra',
        title: 'Gandhiburi',
        lifespan: '1870 – 1942',
        region: 'East',
        state: 'West Bengal',
        movement: 'Women Leaders',
        featured: false,
        bio: 'Matangini Hazra was an 73-year-old freedom fighter who was martyred during the Quit India Movement while holding the Indian National Flag high.',
        contributions: 'Led 6,000 supporters to takeover Tamluk police station; repeatedly shot while chanting Vande Mataram.',
        quote: 'Vande Mataram! Victory to free India!'
    },
    {
        id: 'lakshmi-sahgal',
        name: 'Captain Lakshmi Sahgal',
        title: 'Commander of Rani of Jhansi Regiment',
        lifespan: '1914 – 2012',
        region: 'South',
        state: 'Tamil Nadu',
        movement: 'INA',
        featured: false,
        bio: 'Captain Lakshmi Sahgal was a medical doctor and commander of the all-women combat regiment of the INA under Netaji Subhas Chandra Bose.',
        contributions: 'Led women combatants in Burma campaign, provided medical relief, championed women empowerment.',
        quote: 'We fought not just for freedom, but for equality and dignity.'
    },
    {
        id: 'chandra-shekhar-azad',
        name: 'Chandra Shekhar Azad',
        title: 'Azad',
        lifespan: '1906 – 1931',
        region: 'Central',
        state: 'Madhya Pradesh / UP',
        movement: 'Revolutionary',
        featured: false,
        bio: 'Chandra Shekhar Azad reorganized HSRA after Ram Prasad Bismil\'s execution and swore never to be captured alive by the British.',
        contributions: 'Trained young revolutionaries, mentored Bhagat Singh, fought to his last bullet at Alfred Park Allahabad.',
        quote: 'Dushman ki goliyon ka hum samna karenge, Azad hee rahe hain, Azad hee rahenge!'
    }
];

const TIMELINE_EVENTS = [
    { year: 1857, title: 'The First War of Independence', description: 'Sepoy Mutiny and widespread rebellion led by Mangal Pandey, Rani Lakshmibai, Bahadur Shah Zafar, and Tatya Tope.' },
    { year: 1885, title: 'Founding of Indian National Congress', description: 'Formed in Bombay by Allan Octavian Hume, W. C. Bonnerjee, and early nationalist leaders.' },
    { year: 1905, title: 'Partition of Bengal & Swadeshi Movement', description: 'Lord Curzon partitioned Bengal, triggering widespread boycott of British goods and national revival.' },
    { year: 1919, title: 'Jallianwala Bagh Massacre & Rowlatt Protests', description: 'General Dyer fired on peaceful gathering in Amritsar, igniting countrywide outrage.' },
    { year: 1920, title: 'Non-Cooperation Movement Launched', description: 'Mahatma Gandhi called for boycott of British titles, schools, courts, and cloth.' },
    { year: 1922, title: 'Rampa Rebellion Begins', description: 'Alluri Sitarama Raju mobilized Adivasi tribes in Eastern Ghats against colonial forest laws.' },
    { year: 1930, title: 'Dandi Salt March & Civil Disobedience', description: '240-mile march from Sabarmati to Dandi breaking salt tax law, inspiring millions.' },
    { year: 1942, title: 'Quit India Movement & INA Proclamation', description: 'Do or Die call by Gandhi; Subhas Chandra Bose reorganized Azad Hind Fauj.' },
    { year: 1947, title: 'Indian Independence Act & Partition', description: 'India attained independence on August 15, 1947, ending 190 years of British colonial rule.' }
];

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('ffe-search-input');
    const regionFilter = document.getElementById('ffe-region-filter');
    const movementFilter = document.getElementById('ffe-movement-filter');
    const resultsCount = document.getElementById('ffe-results-count');
    const resetBtn = document.getElementById('ffe-reset-btn');
    const cardsGrid = document.getElementById('ffe-cards-grid');
    const featuredGrid = document.getElementById('featured-heroes-grid');
    const noResults = document.getElementById('ffe-no-results');
    const timelineContainer = document.getElementById('ffe-timeline-container');
    const timelineSlider = document.getElementById('ffe-timeline-slider');
    const timelineYearVal = document.getElementById('ffe-timeline-year-val');

    // Modal elements
    const modal = document.getElementById('ffe-hero-modal');
    const modalClose = document.getElementById('ffe-modal-close');
    const modalOverlay = document.getElementById('ffe-modal-overlay');

    function renderFeatured() {
        if (!featuredGrid) return;
        const featured = FREEDOM_FIGHTERS_DATA.filter(h => h.featured);
        featuredGrid.innerHTML = featured.map(hero => `
            <div class="ffe-featured-card" onclick="openHeroModal('${hero.id}')">
                <div class="ffe-card-header">
                    <span class="ffe-card-badge">${hero.movement}</span>
                    <span style="font-size:1.2rem;">🇮🇳</span>
                </div>
                <div class="ffe-card-title">
                    <h3>${hero.name}</h3>
                    <div class="ffe-card-meta">${hero.title} (${hero.lifespan})</div>
                </div>
                <p style="font-size:0.9rem; color:var(--ffe-text-muted);">${hero.bio}</p>
            </div>
        `).join('');
    }

    function renderCards(filteredData) {
        if (!cardsGrid) return;
        resultsCount.textContent = `Showing ${filteredData.length} freedom fighters`;
        if (filteredData.length === 0) {
            cardsGrid.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }
        cardsGrid.style.display = 'grid';
        noResults.style.display = 'none';

        cardsGrid.innerHTML = filteredData.map(hero => `
            <div class="ffe-featured-card" onclick="openHeroModal('${hero.id}')">
                <div class="ffe-card-header">
                    <span class="ffe-card-badge">${hero.movement}</span>
                    <span class="ffe-card-meta">${hero.state}</span>
                </div>
                <div class="ffe-card-title">
                    <h3>${hero.name}</h3>
                    <div class="ffe-card-meta">${hero.title}</div>
                </div>
                <p style="font-size:0.875rem; color:var(--ffe-text-muted);">${hero.bio.substring(0, 100)}...</p>
            </div>
        `).join('');
    }

    function filterData() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const region = regionFilter ? regionFilter.value : 'all';
        const movement = movementFilter ? movementFilter.value : 'all';

        const filtered = FREEDOM_FIGHTERS_DATA.filter(hero => {
            const matchesQuery = !query || 
                hero.name.toLowerCase().includes(query) ||
                hero.title.toLowerCase().includes(query) ||
                hero.state.toLowerCase().includes(query) ||
                hero.bio.toLowerCase().includes(query);

            const matchesRegion = region === 'all' || hero.region === region;
            
            let matchesMovement = movement === 'all';
            if (movement === 'Women Leaders') {
                matchesMovement = hero.movement === 'Women Leaders' || hero.name.includes('Rani') || hero.name.includes('Sarojini') || hero.name.includes('Matangini') || hero.name.includes('Lakshmi');
            } else if (movement !== 'all') {
                matchesMovement = hero.movement === movement;
            }

            return matchesQuery && matchesRegion && matchesMovement;
        });

        renderCards(filtered);
    }

    function renderTimeline(selectedYear) {
        if (!timelineContainer) return;
        const filteredTimeline = TIMELINE_EVENTS.filter(e => e.year >= selectedYear);
        timelineContainer.innerHTML = filteredTimeline.map(ev => `
            <div class="ffe-timeline-item">
                <div class="ffe-timeline-year">${ev.year}</div>
                <div class="ffe-timeline-title">${ev.title}</div>
                <p style="margin:0; color:var(--ffe-text-muted); font-size:0.95rem;">${ev.description}</p>
            </div>
        `).join('');
    }

    window.openHeroModal = function(id) {
        const hero = FREEDOM_FIGHTERS_DATA.find(h => h.id === id);
        if (!hero || !modal) return;
        document.getElementById('modal-hero-name').textContent = hero.name;
        document.getElementById('modal-hero-title').textContent = hero.title;
        document.getElementById('modal-hero-lifespan').textContent = hero.lifespan;
        document.getElementById('modal-hero-movement').textContent = hero.movement;
        document.getElementById('modal-hero-state').textContent = hero.state;
        document.getElementById('modal-hero-region').textContent = hero.region;
        document.getElementById('modal-hero-bio').textContent = hero.bio;
        document.getElementById('modal-hero-contributions').textContent = hero.contributions;
        document.getElementById('modal-hero-quote').textContent = `"${hero.quote}"`;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    };

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    if (searchInput) searchInput.addEventListener('input', filterData);
    if (regionFilter) regionFilter.addEventListener('change', filterData);
    if (movementFilter) movementFilter.addEventListener('change', filterData);

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (regionFilter) regionFilter.value = 'all';
            if (movementFilter) movementFilter.value = 'all';
            filterData();
        });
    }

    if (timelineSlider && timelineYearVal) {
        timelineSlider.addEventListener('input', (e) => {
            const yr = parseInt(e.target.value, 10);
            timelineYearVal.textContent = yr;
            renderTimeline(yr);
        });
    }

    // Initial render
    renderFeatured();
    renderCards(FREEDOM_FIGHTERS_DATA);
    renderTimeline(1857);
});
