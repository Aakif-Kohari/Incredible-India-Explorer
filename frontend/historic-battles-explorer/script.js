/**
 * Historic Battles Explorer Landing Page Script
 * Manages battle cards, dynamic search, multi-faceted filtering, timeline rendering, and statistics.
 */

const battlesData = [
  {
    id: 'hydaspes',
    name: 'Battle of the Hydaspes',
    year: -326,
    date: 'May 326 BCE',
    century: '4th BCE',
    dynasty: 'Paurava / Alexander',
    region: 'North',
    winner: 'Macedonian Victory',
    location: 'Hydaspes River (Jhelum)',
    summary: 'Tactical clash between Alexander the Great and King Porus featuring war elephant charges and monsoon river crossing.',
    link: '../battle-of-hydaspes-explorer/index.html'
  },
  {
    id: 'pataliputra',
    name: 'Battle of Pataliputra',
    year: -322,
    date: 'c. 322 BCE',
    century: '4th BCE',
    dynasty: 'Maurya / Nanda',
    region: 'East',
    winner: 'Maurya',
    location: 'Pataliputra (Patna, Bihar)',
    summary: 'Strategic siege by Chandragupta Maurya and Chanakya toppling the Nanda Dynasty and establishing the Mauryan Empire.',
    link: '../battle-of-pataliputra-explorer/index.html'
  },
  {
    id: 'mauryan-seleucid',
    name: 'Mauryan–Seleucid War',
    year: -305,
    date: '305–303 BCE',
    century: '4th BCE',
    dynasty: 'Maurya',
    region: 'North',
    winner: 'Maurya',
    location: 'Indus Valley',
    summary: 'Emperor Chandragupta Maurya defeated Seleucus I Nicator, gaining four satrapies and establishing imperial boundary peace.',
    link: '../mauryan-seleucid-war-explorer/index.html'
  },
  {
    id: 'kalinga',
    name: 'Battle of Kalinga',
    year: -261,
    date: '261 BCE',
    century: '3rd BCE',
    dynasty: 'Maurya',
    region: 'East',
    winner: 'Maurya',
    location: 'Kalinga (Odisha)',
    summary: 'Transformative battle that led Emperor Ashoka to renounce military conquest and embrace Buddhist Dhamma.',
    link: '../kalinga-war-explorer/index.html'
  },
  {
    id: 'chandawar',
    name: 'Battle of Chandawar',
    year: 1194,
    date: '1194 CE',
    century: '12th CE',
    dynasty: 'Ghurid / Sultanate',
    region: 'North',
    winner: 'Sultanate',
    location: 'Yamuna River near Etawah',
    summary: 'Decisive Ghurid victory by Muhammad Ghori over King Jayachandra of the Gahadavala Dynasty.',
    link: '../battle-of-chandawar-explorer/index.html'
  },
  {
    id: 'devagiri',
    name: 'Battle of Devagiri',
    year: 1296,
    date: '1296 CE',
    century: '13th CE',
    dynasty: 'Ghurid / Sultanate',
    region: 'Central',
    winner: 'Sultanate',
    location: 'Devagiri (Maharashtra)',
    summary: 'Alauddin Khalji’s surprise raid across the Vindhyas opening South India to Delhi Sultanate campaigns.',
    link: '../battle-of-devagiri-explorer/index.html'
  },
  {
    id: 'kili',
    name: 'Battle of Kili',
    year: 1299,
    date: '1299 CE',
    century: '13th CE',
    dynasty: 'Ghurid / Sultanate',
    region: 'North',
    winner: 'Sultanate',
    location: 'Kili, near Delhi',
    summary: 'Sultan Alauddin Khalji repelled Qutlugh Khwaja’s 200,000-strong Chagatai Mongol invasion force.',
    link: '../battle-of-kili-explorer/index.html'
  },
  {
    id: 'first-panipat',
    name: 'First Battle of Panipat',
    year: 1526,
    date: '21 April 1526',
    century: '16th CE',
    dynasty: 'Mughal',
    region: 'North',
    winner: 'Mughal',
    location: 'Panipat, Haryana',
    summary: 'Babur used field artillery and Tulughma tactics to defeat Ibrahim Lodi and establish the Mughal Empire.',
    link: '../first-battle-of-panipat-explorer/index.html'
  },
  {
    id: 'haldighati',
    name: 'Battle of Haldighati',
    year: 1576,
    date: '18 June 1576',
    century: '16th CE',
    dynasty: 'Mughal',
    region: 'West',
    winner: 'Mughal',
    location: 'Haldighati, Rajasthan',
    summary: 'Legendary clash between Maharana Pratap of Mewar and Akbar’s army led by Man Singh I.',
    link: '../battle-of-haldighati-explorer/index.html'
  },
  {
    id: 'colachel',
    name: 'Battle of Colachel',
    year: 1741,
    date: '10 August 1741',
    century: '18th CE',
    dynasty: 'Travancore',
    region: 'South',
    winner: 'Travancore Victory',
    location: 'Colachel, Kanyakumari',
    summary: 'King Marthanda Varma of Travancore defeated the Dutch East India Company, ending Dutch naval dominance.',
    link: '../battle-of-colachel-explorer/index.html'
  },
  {
    id: 'plassey',
    name: 'Battle of Plassey',
    year: 1757,
    date: '23 June 1757',
    century: '18th CE',
    dynasty: 'East India Company',
    region: 'East',
    winner: 'Company',
    location: 'Palashi, Bengal',
    summary: 'Robert Clive defeated Nawab Siraj-ud-Daulah, initiating British political hegemony over Bengal and India.',
    link: '../battle-of-plassey-explorer/index.html'
  },
  {
    id: 'buxar',
    name: 'Battle of Buxar',
    year: 1764,
    date: '22 October 1764',
    century: '18th CE',
    dynasty: 'East India Company',
    region: 'East',
    winner: 'Company',
    location: 'Buxar, Bihar',
    summary: 'Hector Munro routed the combined forces of Bengal, Awadh, and Mughal Emperor Shah Alam II.',
    link: '../battle-of-buxar-explorer/index.html'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFilterListeners();
  renderBattles();
  renderTimeline();
});

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

function initFilterListeners() {
  ['battle-search', 'filter-century', 'filter-dynasty', 'filter-region', 'filter-winner'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', renderBattles);
      el.addEventListener('change', renderBattles);
    }
  });
}

function renderBattles() {
  const container = document.getElementById('battles-container');
  const countEl = document.getElementById('results-count');
  const noResults = document.getElementById('no-results');

  const searchVal = document.getElementById('battle-search').value.toLowerCase();
  const centuryVal = document.getElementById('filter-century').value;
  const dynastyVal = document.getElementById('filter-dynasty').value;
  const regionVal = document.getElementById('filter-region').value;
  const winnerVal = document.getElementById('filter-winner').value;

  const filtered = battlesData.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(searchVal) ||
                        b.location.toLowerCase().includes(searchVal) ||
                        b.summary.toLowerCase().includes(searchVal);
    const matchCentury = centuryVal === 'all' || b.century === centuryVal;
    const matchDynasty = dynastyVal === 'all' || b.dynasty.includes(dynastyVal);
    const matchRegion = regionVal === 'all' || b.region === regionVal;
    const matchWinner = winnerVal === 'all' || b.winner.includes(winnerVal);

    return matchSearch && matchCentury && matchDynasty && matchRegion && matchWinner;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    noResults.style.display = 'block';
    countEl.textContent = 'No matching battles found';
  } else {
    noResults.style.display = 'none';
    countEl.textContent = `Showing ${filtered.length} of ${battlesData.length} battles`;

    container.innerHTML = filtered.map(b => `
      <div class="battle-card">
        <div>
          <div class="card-header-meta">
            <span class="badge-century">${b.century}</span>
            <span class="badge-region">📍 ${b.region} India</span>
          </div>
          <h3>${b.name}</h3>
          <div class="battle-card-date">🗓️ ${b.date}</div>
          <p class="battle-card-summary">${b.summary}</p>
        </div>
        <div>
          <div class="battle-card-meta">
            <div><strong>Location:</strong> ${b.location}</div>
            <div><strong>Outcome:</strong> ${b.winner}</div>
          </div>
          <a href="${b.link}" class="btn-explore">Explore Battle Details →</a>
        </div>
      </div>
    `).join('');
  }
}

function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  const sorted = [...battlesData].sort((a, b) => a.year - b.year);

  container.innerHTML = sorted.map(b => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-year">${b.date}</span>
        <h4>${b.name}</h4>
        <p>${b.summary}</p>
      </div>
    </div>
  `).join('');
}
