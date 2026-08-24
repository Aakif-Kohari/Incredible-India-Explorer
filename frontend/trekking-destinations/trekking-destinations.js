const treks = [
    {
        name: 'Chadar Trek',
        state: 'Ladakh',
        difficulty: 'Expert',
        days: 9,
        season: ['Winter'],
        description:
            'A winter high-altitude trek along the frozen Zanskar River, known for extreme cold and icy terrain.',
        url: 'https://www.incredibleindia.gov.in/en/ladakh'
    },
    {
        name: 'Markha Valley Trek',
        state: 'Ladakh',
        difficulty: 'Difficult',
        days: 7,
        season: ['Summer', 'Autumn'],
        description: 'A classic Ladakh route through high valleys, villages and mountain passes.',
        url: 'https://www.incredibleindia.gov.in/en/ladakh'
    },
    {
        name: 'Hampta Pass',
        state: 'Himachal Pradesh',
        difficulty: 'Moderate',
        days: 5,
        season: ['Summer', 'Autumn'],
        description: 'A dramatic crossover route linking green valleys with the stark landscapes around the pass.',
        url: 'https://www.incredibleindia.gov.in/en/himachal-pradesh'
    },
    {
        name: 'Triund',
        state: 'Himachal Pradesh',
        difficulty: 'Easy',
        days: 2,
        season: ['Spring', 'Summer', 'Autumn'],
        description: 'A popular short Himalayan hike above Dharamshala with broad views toward the Dhauladhar range.',
        url: 'https://www.incredibleindia.gov.in/en/himachal-pradesh'
    },
    {
        name: 'Valley of Flowers',
        state: 'Uttarakhand',
        difficulty: 'Difficult',
        days: 4,
        season: ['Summer', 'Monsoon'],
        description: 'A high-altitude valley celebrated for alpine flowers, waterfalls and Himalayan scenery.',
        url: 'https://www.prod.incredibleindia.gov.in/content/incredible-india-v2/en/destinations/dehradun/valley-of-flowers.html'
    },
    {
        name: 'Gaumukh Tapovan',
        state: 'Uttarakhand',
        difficulty: 'Difficult',
        days: 5,
        season: ['Summer', 'Autumn'],
        description: 'A rugged route from Gangotri toward the Gangotri Glacier and high Himalayan landscapes.',
        url: 'https://www.incredibleindia.gov.in/en/uttarakhand/gangotri'
    },
    {
        name: 'Kedarkantha',
        state: 'Uttarakhand',
        difficulty: 'Moderate',
        days: 5,
        season: ['Winter', 'Spring'],
        description: 'A snow-season Himalayan trek with forest trails, meadows and summit views.',
        url: 'https://www.incredibleindia.gov.in/en/uttarakhand'
    },
    {
        name: 'Tarsar Marsar',
        state: 'Jammu and Kashmir',
        difficulty: 'Difficult',
        days: 7,
        season: ['Summer'],
        description: 'A Kashmir alpine-lake route around Tarsar and Marsar, accessed through the Aru/Pahalgam region.',
        url: 'https://www.incredibleindia.gov.in/en/rural-tourism/aru'
    },
    {
        name: 'Sandakphu',
        state: 'West Bengal',
        difficulty: 'Difficult',
        days: 6,
        season: ['Spring', 'Autumn', 'Winter'],
        description: "A Singalila Ridge trek to West Bengal's highest point with sweeping Himalayan views.",
        url: 'https://www.incredibleindia.gov.in/en/west-bengal/darjeeling/sandakphu'
    },
    {
        name: 'Goechala',
        state: 'Sikkim',
        difficulty: 'Expert',
        days: 8,
        season: ['Spring', 'Autumn'],
        description: 'A high Himalayan route in Sikkim with views toward the Kanchenjunga massif.',
        url: 'https://www.incredibleindia.gov.in/en/sikkim'
    },
    {
        name: 'Rajmachi',
        state: 'Maharashtra',
        difficulty: 'Easy',
        days: 2,
        season: ['Monsoon', 'Winter'],
        description: 'A Sahyadri trail to the historic Rajmachi fort, especially atmospheric during the monsoon.',
        url: 'https://www.incredibleindia.gov.in/en/maharashtra'
    },
    {
        name: 'Kaas Plateau Trail',
        state: 'Maharashtra',
        difficulty: 'Easy',
        days: 1,
        season: ['Monsoon'],
        description: 'A nature trail around the seasonal wildflowers of Kaas Plateau near Satara.',
        url: 'https://www.incredibleindia.gov.in/en/maharashtra/satara/kaas-plateau'
    },
    {
        name: 'Kudremukh',
        state: 'Karnataka',
        difficulty: 'Moderate',
        days: 2,
        season: ['Monsoon', 'Autumn'],
        description: 'A Western Ghats trek through grasslands and forest landscapes around Kudremukh.',
        url: 'https://www.incredibleindia.gov.in/en/karnataka'
    },
    {
        name: 'Meesapulimala',
        state: 'Kerala',
        difficulty: 'Moderate',
        days: 2,
        season: ['Winter', 'Spring'],
        description: 'A high Western Ghats route through rolling grasslands near Munnar.',
        url: 'https://www.incredibleindia.gov.in/en/kerala'
    },
    {
        name: 'Chembra Peak',
        state: 'Kerala',
        difficulty: 'Moderate',
        days: 1,
        season: ['Autumn', 'Winter', 'Spring'],
        description: 'A trek up Wayanad’s highest peak featuring tea gardens, Shola forests, and a perennial heart-shaped lake.',
        url: 'https://www.keralatourism.org/destination/chembra-peak-wayanad/185'
    }
];

const searchEl = document.getElementById('search'),
    stateEl = document.getElementById('state'),
    diffEl = document.getElementById('difficulty'),
    durationEl = document.getElementById('duration'),
    seasonEl = document.getElementById('season'),
    cardsEl = document.getElementById('cards'),
    metaEl = document.getElementById('results-meta'),
    emptyEl = document.getElementById('empty');

[...new Set(treks.map(t => t.state))].sort().forEach(state => {
    const o = document.createElement('option');
    o.value = state;
    o.textContent = state;
    stateEl.appendChild(o);
});

function durationGroup(days) {
    return days <= 3 ? 'short' : days <= 7 ? 'medium' : 'long';
}
function card(t) {
    return `<article class="card"><div class="card-top"><span class="location">${t.state}</span><span class="difficulty">${t.difficulty}</span></div><h3>${t.name}</h3><p>${t.description}</p><div class="tags"><span class="tag">${t.days} day${t.days === 1 ? '' : 's'}</span>${t.season.map(s => `<span class="tag">${s}</span>`).join('')}</div><a href="${t.url}" target="_blank" rel="noopener">Open destination source ↗</a></article>`;
}
function render() {
    const q = searchEl.value.trim().toLowerCase(),
        st = stateEl.value,
        d = diffEl.value,
        dur = durationEl.value,
        s = seasonEl.value;
    const filtered = treks.filter(
        t =>
            (!q || `${t.name} ${t.state}`.toLowerCase().includes(q)) &&
            (!st || t.state === st) &&
            (!d || t.difficulty === d) &&
            (!dur || durationGroup(t.days) === dur) &&
            (!s || t.season.includes(s))
    );
    cardsEl.innerHTML = filtered.map(card).join('');
    metaEl.textContent = `Showing ${filtered.length} of ${treks.length} treks`;
    emptyEl.hidden = filtered.length !== 0;
}
function clearFilters() {
    searchEl.value = '';
    stateEl.value = '';
    diffEl.value = '';
    durationEl.value = '';
    seasonEl.value = '';
    document.querySelectorAll('.pin').forEach(p => p.classList.remove('active'));
    render();
}
[searchEl, stateEl, diffEl, durationEl, seasonEl].forEach(el =>
    el.addEventListener(el === searchEl ? 'input' : 'change', render)
);
document.getElementById('clear').addEventListener('click', clearFilters);
document.querySelectorAll('.pin').forEach(pin =>
    pin.addEventListener('click', () => {
        stateEl.value = pin.dataset.state;
        document.querySelectorAll('.pin').forEach(p => p.classList.toggle('active', p === pin));
        render();
        document.getElementById('cards').scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
);
document.getElementById('trek-count').textContent = treks.length;
document.getElementById('state-count').textContent = new Set(treks.map(t => t.state)).size;
render();
