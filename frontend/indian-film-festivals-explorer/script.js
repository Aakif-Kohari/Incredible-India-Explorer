/* ==========================================================================
   Indian Film Festivals Explorer Logic
   Handles dynamic rendering, filtering, and timeline generation.
   ========================================================================== */

const festivalsData = [
    { id: 'iffi', name: 'International Film Festival of India (IFFI)', location: 'Goa', region: 'west', month: 'November', desc: 'Asia\'s oldest film festival, founded in 1952. Now held annually in Goa, it showcases the best of global and Indian cinema.', img: 'https://placehold.co/400x300/111/d4af37', year: '1952' },
    { id: 'kiff', name: 'Kerala International Film Festival (KIFF)', location: 'Thiruvananthapuram', region: 'south', month: 'December', desc: 'One of the largest film festivals in India, known for its strong focus on art-house, parallel cinema, and retrospectives.', img: 'https://placehold.co/400x300/111/d4af37', year: '1996' },
    { id: 'mami', name: 'MAMI Mumbai Film Festival', location: 'Mumbai', region: 'west', month: 'October', desc: 'India\'s premier industry-facing festival, run by the Mumbai Academy of the Moving Image. A hub for Bollywood and indie filmmakers.', img: 'https://placehold.co/400x300/111/d4af37', year: '1997' },
    { id: 'dharamshala', name: 'Dharamshala International Film Festival (DIFF)', location: 'Himachal Pradesh', region: 'north', month: 'November', desc: 'A boutique mountain festival founded by filmmakers Ritu Sarin and Tenzing Sonam, focusing on independent and documentary cinema.', img: 'https://placehold.co/400x300/111/d4af37', year: '2012' },
    { id: 'kolkata', name: 'Kolkata International Film Festival', location: 'Kolkata', region: 'east', month: 'November', desc: 'Celebrating the cinematic heritage of Bengal, this festival honors the legacy of Satyajit Ray and Mrinal Sen.', img: 'https://placehold.co/400x300/111/d4af37', year: '1995' },
    { id: 'nyiff', name: 'New York Indian Film Festival (NYIFF)', location: 'New York (Global)', region: 'north', month: 'May', desc: 'The premier festival in North America dedicated to Indian and South Asian diaspora cinema.', img: 'https://placehold.co/400x300/111/d4af37', year: '2001' }
];

const timelineData = [
    { year: '1952', title: 'The Beginning', desc: 'The first IFFI is held in Bombay, Calcutta, and Madras, inaugurated by Prime Minister Jawaharlal Nehru.' },
    { year: '1965', title: 'National Film Awards Expansion', desc: 'The Directorate of Film Festivals is established to oversee IFFI and the National Film Awards.' },
    { year: '1995', title: 'Regional Boom', desc: 'Kolkata launches its international film festival, marking the rise of state-sponsored regional cinema events.' },
    { year: '2004', title: 'Goa Becomes Permanent Host', desc: 'IFFI shifts its permanent base to Goa, transforming it into a major international cinematic destination.' },
    { year: '2012', title: 'The Indie Wave', desc: 'Dharamshala Film Festival is founded, sparking a trend of boutique, location-specific indie festivals.' },
    { year: '2020', title: 'Digital Adaptation', desc: 'Due to the global pandemic, festivals like KIFF and MAMI pioneer hybrid and fully virtual screening models.' }
];

let currentRegion = 'all';

function init() {
    renderFestivals();
    renderTimeline();
    setupFilters();
    setupThemeToggle();
    setupScrollAnimations();
    setupJourneyIntegration();
}

function renderFestivals() {
    const grid = document.getElementById('festival-grid');
    if (!grid) return;

    const filtered = festivalsData.filter(f => currentRegion === 'all' || f.region === currentRegion);

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No festivals found for this region.</p>';
        return;
    }

    grid.innerHTML = filtered.map(f => `
        <div class="festival-card animate-on-scroll" role="listitem">
            <div class="card-img" style="background-image: url('${f.img}')">
                <span class="card-badge">${f.month}</span>
            </div>
            <div class="card-content">
                <h3>${f.name}</h3>
                <p>${f.desc}</p>
                <div class="card-meta">
                    <span>📍 ${f.location}</span>
                    <span>Est. ${f.year}</span>
                </div>
            </div>
        </div>
    `).join('');

    if (observer) document.querySelectorAll('.festival-card').forEach(el => observer.observe(el));
}

function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = '<div class="timeline-line"></div>' + timelineData.map(t => `
        <div class="timeline-item animate-on-scroll">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-year">${t.year}</div>
                <h4>${t.title}</h4>
                <p>${t.desc}</p>
            </div>
        </div>
    `).join('');

    if (observer) document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            currentRegion = btn.dataset.region;
            renderFestivals();
        });
    });
}

function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggle.textContent = isLight ? '☀️' : '🌙';
    });
    if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); toggle.textContent = '☀️'; }
}

let observer;
function setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function setupJourneyIntegration() {
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('frontend/indian-film-festivals-explorer/index.html', [
            { id: 'film-iffi', title: 'IFFI Goa', description: 'Asia\'s oldest film festival.', link: '#' },
            { id: 'film-mami', title: 'MAMI Mumbai', description: 'India\'s premier industry film festival.', link: '#' }
        ]);
    }
}

document.addEventListener('DOMContentLoaded', init);
